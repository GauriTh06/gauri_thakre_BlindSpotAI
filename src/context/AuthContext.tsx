'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, signInWithPopup, signOut as firebaseSignOut, onAuthStateChanged } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase/config';

interface AuthContextType {
  user: User | null;
  guestId: string;
  effectiveUserId: string;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  isGuest: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  guestId: 'guest-demo-user',
  effectiveUserId: 'guest-demo-user',
  loading: false,
  signInWithGoogle: async () => {},
  signOut: async () => {},
  isGuest: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [guestId, setGuestId] = useState<string>('guest-demo-user');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Generate or fetch local guest ID
    let localId = localStorage.getItem('blindspot_guest_id');
    if (!localId) {
      localId = `guest-${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem('blindspot_guest_id', localId);
    }
    setGuestId(localId);

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const [authError, setAuthError] = useState<string | null>(null);

  const signInWithGoogle = async () => {
    try {
      setAuthError(null);
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      console.warn('Google Sign-In fallback:', err);
      if (err?.code === 'auth/invalid-api-key' || err?.code === 'auth/api-key-not-valid' || process.env.NEXT_PUBLIC_FIREBASE_API_KEY === 'mock_firebase_api_key') {
        setAuthError('Placeholder Firebase API Key detected. Please add your real Firebase API Key in .env.local.');
      } else if (err?.code === 'auth/operation-not-allowed') {
        setAuthError('Google Sign-In provider is not enabled in Firebase Console for project promptwars-e8b41.');
      } else {
        setAuthError(err?.message || 'Failed to sign in with Google');
      }
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (err) {
      console.warn('Sign out fallback:', err);
    }
  };

  const effectiveUserId = user ? user.uid : guestId;

  return (
    <AuthContext.Provider
      value={{
        user,
        guestId,
        effectiveUserId,
        loading,
        signInWithGoogle,
        signOut,
        isGuest: !user,
      }}
    >
      {children}

      {/* Auth Setup Guidance Modal */}
      {authError && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center space-x-2 text-amber-600 dark:text-amber-400">
              <span className="font-bold text-lg">Firebase Setup Required for promptwars-e8b41</span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {authError}
            </p>

            <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs space-y-2 font-mono">
              <p className="font-bold text-slate-900 dark:text-white">Quick 3-step setup in .env.local:</p>
              <ol className="list-decimal pl-4 space-y-1 text-slate-600 dark:text-slate-400">
                <li>Go to Firebase Console &gt; Project Settings</li>
                <li>Copy your Web App firebaseConfig keys</li>
                <li>Paste in <code>.env.local</code> and restart server</li>
              </ol>
            </div>

            <button
              onClick={() => setAuthError(null)}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              Got It / Continue as Guest Demo Mode
            </button>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


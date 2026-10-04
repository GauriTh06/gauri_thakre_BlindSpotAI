import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  updateDoc, 
  deleteDoc, 
  addDoc 
} from 'firebase/firestore';
import { db } from './config';
import { Decision, DecisionAnalysis, ChatMessage, DecisionJournalEntry } from '@/types';

// In-Memory & LocalStorage persistent stores for high-reliability hackathon demo
const LOCAL_STORAGE_KEY_DECISIONS = 'blindspot_decisions_v1';
const LOCAL_STORAGE_KEY_ANALYSES = 'blindspot_analyses_v1';
const LOCAL_STORAGE_KEY_CHAT = 'blindspot_chat_v1';
const LOCAL_STORAGE_KEY_JOURNALS = 'blindspot_journals_v1';

function getLocalData<T>(key: string): T[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    return [];
  }
}

function setLocalData<T>(key: string, data: T[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error('LocalStorage write error:', err);
  }
}

// -------------------------------------------------------------
// DECISIONS COLLECTION
// -------------------------------------------------------------

export async function saveDecision(decision: Decision): Promise<void> {
  // Update local storage
  const existing = getLocalData<Decision>(LOCAL_STORAGE_KEY_DECISIONS);
  const index = existing.findIndex(d => d.id === decision.id);
  if (index >= 0) {
    existing[index] = decision;
  } else {
    existing.unshift(decision);
  }
  setLocalData(LOCAL_STORAGE_KEY_DECISIONS, existing);

  // Try Firestore doc write
  try {
    const ref = doc(db, 'decisions', decision.id);
    await setDoc(ref, decision, { merge: true });
  } catch (err) {
    console.warn('Firestore fallback: Saved locally', err);
  }
}

export async function getUserDecisions(userId: string): Promise<Decision[]> {
  const localDecisions = getLocalData<Decision>(LOCAL_STORAGE_KEY_DECISIONS);
  
  try {
    const q = query(collection(db, 'decisions'), where('userId', '==', userId), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const fsData = snapshot.docs.map(doc => doc.data() as Decision);
      return fsData;
    }
  } catch (err) {
    console.warn('Firestore read fallback: Using local store', err);
  }

  return localDecisions.length > 0 ? localDecisions : [];
}

export async function getDecisionById(decisionId: string): Promise<Decision | null> {
  const localDecisions = getLocalData<Decision>(LOCAL_STORAGE_KEY_DECISIONS);
  const foundLocal = localDecisions.find(d => d.id === decisionId);
  if (foundLocal) return foundLocal;

  try {
    const ref = doc(db, 'decisions', decisionId);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      return snap.data() as Decision;
    }
  } catch (err) {
    console.warn('Firestore read doc fallback:', err);
  }

  return null;
}

// -------------------------------------------------------------
// ANALYSES COLLECTION
// -------------------------------------------------------------

export async function saveAnalysis(analysis: DecisionAnalysis): Promise<void> {
  const existing = getLocalData<DecisionAnalysis>(LOCAL_STORAGE_KEY_ANALYSES);
  const index = existing.findIndex(a => a.decisionId === analysis.decisionId);
  if (index >= 0) {
    existing[index] = analysis;
  } else {
    existing.unshift(analysis);
  }
  setLocalData(LOCAL_STORAGE_KEY_ANALYSES, existing);

  try {
    const ref = doc(db, 'analyses', analysis.id);
    await setDoc(ref, analysis, { merge: true });
  } catch (err) {
    console.warn('Firestore analysis save fallback:', err);
  }
}

export async function getAnalysisByDecisionId(decisionId: string): Promise<DecisionAnalysis | null> {
  const localAnalyses = getLocalData<DecisionAnalysis>(LOCAL_STORAGE_KEY_ANALYSES);
  const foundLocal = localAnalyses.find(a => a.decisionId === decisionId);
  if (foundLocal) return foundLocal;

  try {
    const q = query(collection(db, 'analyses'), where('decisionId', '==', decisionId));
    const snap = await getDocs(q);
    if (!snap.empty) {
      return snap.docs[0].data() as DecisionAnalysis;
    }
  } catch (err) {
    console.warn('Firestore read analysis fallback:', err);
  }

  return null;
}

// -------------------------------------------------------------
// CHAT HISTORY COLLECTION (Reflection Coach)
// -------------------------------------------------------------

export async function saveChatMessage(msg: ChatMessage): Promise<void> {
  const existing = getLocalData<ChatMessage>(LOCAL_STORAGE_KEY_CHAT);
  existing.push(msg);
  setLocalData(LOCAL_STORAGE_KEY_CHAT, existing);

  try {
    const ref = doc(db, 'chatHistory', msg.id);
    await setDoc(ref, msg);
  } catch (err) {
    console.warn('Firestore chat msg fallback:', err);
  }
}

export async function getChatHistory(decisionId: string): Promise<ChatMessage[]> {
  const localChat = getLocalData<ChatMessage>(LOCAL_STORAGE_KEY_CHAT);
  const filtered = localChat.filter(c => c.decisionId === decisionId);

  try {
    const q = query(collection(db, 'chatHistory'), where('decisionId', '==', decisionId), orderBy('timestamp', 'asc'));
    const snap = await getDocs(q);
    if (!snap.empty) {
      return snap.docs.map(doc => doc.data() as ChatMessage);
    }
  } catch (err) {
    console.warn('Firestore chat read fallback:', err);
  }

  return filtered;
}

// -------------------------------------------------------------
// JOURNALS COLLECTION
// -------------------------------------------------------------

export async function saveJournalEntry(entry: DecisionJournalEntry): Promise<void> {
  const existing = getLocalData<DecisionJournalEntry>(LOCAL_STORAGE_KEY_JOURNALS);
  const idx = existing.findIndex(j => j.id === entry.id);
  if (idx >= 0) {
    existing[idx] = entry;
  } else {
    existing.unshift(entry);
  }
  setLocalData(LOCAL_STORAGE_KEY_JOURNALS, existing);

  try {
    const ref = doc(db, 'journals', entry.id);
    await setDoc(ref, entry, { merge: true });
  } catch (err) {
    console.warn('Firestore journal save fallback:', err);
  }
}

export async function getUserJournals(userId: string): Promise<DecisionJournalEntry[]> {
  const localJournals = getLocalData<DecisionJournalEntry>(LOCAL_STORAGE_KEY_JOURNALS);

  try {
    const q = query(collection(db, 'journals'), where('userId', '==', userId), orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    if (!snap.empty) {
      return snap.docs.map(doc => doc.data() as DecisionJournalEntry);
    }
  } catch (err) {
    console.warn('Firestore journal read fallback:', err);
  }

  return localJournals;
}

// -------------------------------------------------------------
// ANALYTICS COLLECTION (Google Firebase Analytics logger)
// -------------------------------------------------------------

export async function logEvent(userId: string, eventName: string, metadata: Record<string, any>): Promise<void> {
  const payload = {
    eventId: `evt-${Date.now()}`,
    userId,
    eventName,
    metadata,
    timestamp: new Date().toISOString()
  };

  try {
    await addDoc(collection(db, 'analytics'), payload);
  } catch (err) {
    // Silent fail for analytics
  }
}

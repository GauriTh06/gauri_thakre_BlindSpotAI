'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { GlassCard } from '../ui/GlassCard';
import { DecisionJournalEntry } from '@/types';
import { getUserJournals, saveJournalEntry } from '@/lib/firebase/firestore';
import { BookOpen, Calendar, ArrowRight, Gauge, CheckCircle2, Sparkles, Plus } from 'lucide-react';

interface DecisionJournalViewProps {
  userId: string;
}

export const DecisionJournalView: React.FC<DecisionJournalViewProps> = ({ userId }) => {
  const [journals, setJournals] = useState<DecisionJournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEntry, setSelectedEntry] = useState<DecisionJournalEntry | null>(null);
  const [reflectionInput, setReflectionInput] = useState('');
  const [revisedConfidence, setRevisedConfidence] = useState<number>(7);

  useEffect(() => {
    async function load() {
      const data = await getUserJournals(userId);
      setJournals(data);
      setLoading(false);
    }
    load();
  }, [userId]);

  const handleUpdateJournal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEntry) return;

    const updated: DecisionJournalEntry = {
      ...selectedEntry,
      reflectionNotes: reflectionInput,
      revisedConfidence,
      updatedAt: new Date().toISOString(),
      status: 'reviewed',
    };

    await saveJournalEntry(updated);
    setJournals(journals.map(j => (j.id === updated.id ? updated : j)));
    setSelectedEntry(null);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center space-x-3">
            <BookOpen className="w-8 h-8 text-emerald-500" />
            <span>Decision Journal & Reflection History</span>
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Review past decision analyses, track confidence shifts over time, and log post-mortem reflections.
          </p>
        </div>
        <Link
          href="/dashboard"
          className="px-4 py-2.5 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white shadow-sm flex items-center space-x-1.5 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Decision Analysis</span>
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20 text-slate-500 text-sm space-x-2">
          <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <span>Loading Firestore Decision Journal entries...</span>
        </div>
      ) : journals.length === 0 ? (
        <GlassCard padding="lg" className="text-center py-16 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
            <BookOpen className="w-8 h-8" />
          </div>
          <div className="max-w-md mx-auto space-y-2">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              No Journal Entries Found Yet
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              When you complete a decision analysis in the workspace, it is automatically archived in your Firestore Decision Journal.
            </p>
          </div>
          <Link
            href="/dashboard"
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm"
          >
            <span>Analyze Your First Decision</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </GlassCard>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Journal Entries List */}
          <div className="lg:col-span-7 space-y-4">
            {journals.map((entry) => (
              <GlassCard
                key={entry.id}
                padding="md"
                className={`cursor-pointer transition-all hover:-translate-y-0.5 ${
                  selectedEntry?.id === entry.id ? 'border-emerald-500 ring-2 ring-emerald-500/20' : ''
                }`}
                onClick={() => {
                  setSelectedEntry(entry);
                  setReflectionInput(entry.reflectionNotes || '');
                  setRevisedConfidence(entry.revisedConfidence || entry.originalConfidence);
                }}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      {entry.status}
                    </span>
                    <div className="flex items-center space-x-1 text-xs text-slate-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{new Date(entry.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-slate-900 dark:text-white text-base">
                    {entry.originalDecisionTitle}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                    {entry.summary}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800 text-xs">
                    <div className="flex items-center space-x-4">
                      <span className="text-slate-500">
                        Initial Confidence: <strong className="text-slate-900 dark:text-white">{entry.originalConfidence}/10</strong>
                      </span>
                      {entry.revisedConfidence && (
                        <span className="text-emerald-600 dark:text-emerald-400">
                          Revised: <strong>{entry.revisedConfidence}/10</strong>
                        </span>
                      )}
                    </div>

                    <span className="font-bold text-blue-600 dark:text-blue-400 flex items-center space-x-1">
                      <span>View & Reflect</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>

          {/* Reflection Editor Sidebar */}
          <div className="lg:col-span-5">
            {selectedEntry ? (
              <GlassCard glow="emerald" padding="md" className="sticky top-20 space-y-4">
                <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-emerald-500" />
                  <span>Log Reflection Notes</span>
                </h3>

                <div className="text-xs space-y-1">
                  <span className="font-semibold text-slate-500">Selected Decision:</span>
                  <p className="font-bold text-slate-900 dark:text-white">
                    {selectedEntry.originalDecisionTitle}
                  </p>
                </div>

                <form onSubmit={handleUpdateJournal} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Revised Confidence Level (Post-Analysis)
                    </label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={revisedConfidence}
                        onChange={(e) => setRevisedConfidence(Number(e.target.value))}
                        className="flex-1 accent-emerald-500"
                      />
                      <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                        {revisedConfidence}/10
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Post-Analysis Reflections & Learnings
                    </label>
                    <textarea
                      rows={5}
                      value={reflectionInput}
                      onChange={(e) => setReflectionInput(e.target.value)}
                      placeholder="Record what assumptions were proven right/wrong, what blind spots shifted your perspective, and what lessons apply to future decisions..."
                      className="w-full p-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-colors"
                  >
                    Save Journal Reflection
                  </button>
                </form>
              </GlassCard>
            ) : (
              <GlassCard padding="md" className="sticky top-20 text-center py-12 text-slate-500 space-y-2">
                <BookOpen className="w-8 h-8 text-slate-400 mx-auto" />
                <p className="text-xs font-medium">Select a decision entry from the list to add reflection notes and update confidence shifts.</p>
              </GlassCard>
            )}
          </div>

        </div>
      )}
    </div>
  );
};

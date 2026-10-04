'use client';

import React, { useState } from 'react';
import { GlassCard } from '../ui/GlassCard';
import { DecisionCanvasData } from '@/types';
import { LayoutGrid, Save, Plus, X, Check, Target, AlertTriangle, Sparkles, HelpCircle, Users, Search, Lightbulb } from 'lucide-react';

interface DecisionCanvasProps {
  initialData: DecisionCanvasData;
  onSave: (updatedCanvas: DecisionCanvasData) => void;
}

export const DecisionCanvas: React.FC<DecisionCanvasProps> = ({ initialData, onSave }) => {
  const [canvas, setCanvas] = useState<DecisionCanvasData>(initialData);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const sections: { key: keyof DecisionCanvasData; label: string; icon: React.ReactNode; color: string }[] = [
    { key: 'goals', label: 'Primary Goals', icon: <Target className="w-4 h-4 text-blue-500" />, color: 'border-blue-500/30' },
    { key: 'assumptions', label: 'Hidden Assumptions', icon: <Sparkles className="w-4 h-4 text-indigo-500" />, color: 'border-indigo-500/30' },
    { key: 'risks', label: 'Identified Risks', icon: <AlertTriangle className="w-4 h-4 text-rose-500" />, color: 'border-rose-500/30' },
    { key: 'opportunities', label: 'Growth Opportunities', icon: <Lightbulb className="w-4 h-4 text-emerald-500" />, color: 'border-emerald-500/30' },
    { key: 'missingInformation', label: 'Missing Information', icon: <HelpCircle className="w-4 h-4 text-amber-500" />, color: 'border-amber-500/30' },
    { key: 'missingEvidence', label: 'Required Empirical Evidence', icon: <Search className="w-4 h-4 text-teal-500" />, color: 'border-teal-500/30' },
    { key: 'stakeholders', label: 'Impacted Stakeholders', icon: <Users className="w-4 h-4 text-purple-500" />, color: 'border-purple-500/30' },
    { key: 'reflectionQuestions', label: 'Socratic Reflection Questions', icon: <HelpCircle className="w-4 h-4 text-cyan-500" />, color: 'border-cyan-500/30' },
  ];

  const handleItemChange = (key: keyof DecisionCanvasData, index: number, val: string) => {
    const updated = [...canvas[key]];
    updated[index] = val;
    setCanvas({ ...canvas, [key]: updated });
  };

  const addItem = (key: keyof DecisionCanvasData) => {
    setCanvas({ ...canvas, [key]: [...canvas[key], ''] });
  };

  const removeItem = (key: keyof DecisionCanvasData, index: number) => {
    setCanvas({ ...canvas, [key]: canvas[key].filter((_, i) => i !== index) });
  };

  const handleSaveCanvas = () => {
    onSave(canvas);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <LayoutGrid className="w-5 h-5 text-indigo-500" />
            <span>Interactive Decision Canvas</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            A single-page visual workspace to map, edit, and consolidate your decision architecture.
          </p>
        </div>

        <button
          onClick={handleSaveCanvas}
          className="px-4 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-md flex items-center space-x-1.5 transition-all"
        >
          {savedSuccess ? (
            <>
              <Check className="w-4 h-4 text-emerald-300" />
              <span>Canvas Saved to Firestore!</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Canvas State</span>
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {sections.map((sec) => (
          <GlassCard key={sec.key} padding="md" className={`space-y-3 flex flex-col justify-between border ${sec.color}`}>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/60 pb-2">
                <div className="flex items-center space-x-1.5 font-bold text-xs text-slate-900 dark:text-white">
                  {sec.icon}
                  <span>{sec.label}</span>
                </div>
                <button
                  type="button"
                  onClick={() => addItem(sec.key)}
                  className="p-1 rounded-md text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors"
                  title={`Add ${sec.label}`}
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
                {canvas[sec.key].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-1.5 group">
                    <textarea
                      rows={2}
                      value={item}
                      onChange={(e) => handleItemChange(sec.key, idx, e.target.value)}
                      className="flex-1 p-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:ring-1 focus:ring-blue-500 outline-none resize-none leading-snug"
                    />
                    <button
                      type="button"
                      onClick={() => removeItem(sec.key, idx)}
                      className="p-1 text-slate-400 hover:text-rose-500 transition-colors opacity-60 group-hover:opacity-100"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

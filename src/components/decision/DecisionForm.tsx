'use client';

import React, { useState } from 'react';
import { Plus, X, Sparkles, BookTemplate, HelpCircle, ArrowRight, Gauge } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { DECISION_TEMPLATES, STARTER_EXAMPLES } from '@/lib/templates';
import { DecisionTemplate } from '@/types';

interface DecisionFormProps {
  onSubmit: (data: {
    title: string;
    context: string;
    goals: string[];
    constraints: string[];
    confidenceLevel: number;
    templateId?: string;
  }) => void;
  isLoading: boolean;
}

export const DecisionForm: React.FC<DecisionFormProps> = ({ onSubmit, isLoading }) => {
  const [title, setTitle] = useState('');
  const [context, setContext] = useState('');
  const [goals, setGoals] = useState<string[]>(['']);
  const [constraints, setConstraints] = useState<string[]>(['']);
  const [confidenceLevel, setConfidenceLevel] = useState<number>(7);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [showTemplatesModal, setShowTemplatesModal] = useState(false);

  const handleGoalChange = (index: number, val: string) => {
    const updated = [...goals];
    updated[index] = val;
    setGoals(updated);
  };

  const addGoal = () => setGoals([...goals, '']);
  const removeGoal = (index: number) => setGoals(goals.filter((_, i) => i !== index));

  const handleConstraintChange = (index: number, val: string) => {
    const updated = [...constraints];
    updated[index] = val;
    setConstraints(updated);
  };

  const addConstraint = () => setConstraints([...constraints, '']);
  const removeConstraint = (index: number) => setConstraints(constraints.filter((_, i) => i !== index));

  const loadTemplate = (tmpl: DecisionTemplate) => {
    setTitle(tmpl.starterTitle);
    setContext(tmpl.starterContext);
    setGoals(tmpl.starterGoals);
    setConstraints(tmpl.starterConstraints);
    setConfidenceLevel(tmpl.starterConfidence);
    setSelectedTemplate(tmpl.id);
    setShowTemplatesModal(false);
  };

  const loadStarterExample = (example: typeof STARTER_EXAMPLES[0]) => {
    setTitle(example.title);
    setContext(example.context);
    setGoals(['Evaluate upside vs long-term burn', 'Validate target audience interest']);
    setConstraints(['Limited initial operational runway', 'Keep existing workload commitments']);
    setConfidenceLevel(example.confidence);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanGoals = goals.map(g => g.trim()).filter(Boolean);
    const cleanConstraints = constraints.map(c => c.trim()).filter(Boolean);

    onSubmit({
      title: title.trim(),
      context: context.trim(),
      goals: cleanGoals.length > 0 ? cleanGoals : ['Make an informed, high-clarity choice'],
      constraints: cleanConstraints,
      confidenceLevel,
      templateId: selectedTemplate || undefined,
    });
  };

  return (
    <div className="space-y-6">
      {/* Starter Examples & Templates Selector */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-gradient-to-r from-blue-50/70 via-indigo-50/50 to-purple-50/70 dark:from-slate-900/90 dark:via-blue-950/40 dark:to-slate-900/90 border border-blue-100 dark:border-blue-900/40">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
            Quick Starter Examples:
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {STARTER_EXAMPLES.map((ex, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => loadStarterExample(ex)}
              className="text-xs px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              "{ex.title.slice(0, 30)}..."
            </button>
          ))}
          <button
            type="button"
            onClick={() => setShowTemplatesModal(true)}
            className="text-xs font-semibold px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-1 transition-colors shadow-xs"
          >
            <BookTemplate className="w-3.5 h-3.5" />
            <span>Browse Templates</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <GlassCard glow="blue" padding="lg">
          <div className="space-y-6">
            
            {/* Title Input */}
            <div>
              <label htmlFor="decision-title" className="block text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2">
                Decision Title <span className="text-rose-500">*</span>
              </label>
              <input
                id="decision-title"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Pivot our core product from B2C to enterprise B2B"
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Full Context Textarea */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="decision-context" className="block text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Full Decision Context & Background <span className="text-rose-500">*</span>
                </label>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Be as detailed as possible
                </span>
              </div>
              <textarea
                id="decision-context"
                required
                rows={5}
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder="Describe your current situation, options considered, background context, key assumptions, stakeholders, timelines, and why this decision matters now..."
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm leading-relaxed"
              />
            </div>

            {/* Goals Tag Manager */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Primary Goals & Desired Outcomes
                </label>
                <button
                  type="button"
                  onClick={addGoal}
                  className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center space-x-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Goal</span>
                </button>
              </div>
              <div className="space-y-2">
                {goals.map((goal, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={goal}
                      onChange={(e) => handleGoalChange(idx, e.target.value)}
                      placeholder={`Goal #${idx + 1} (e.g. Reach profitability in 12 months)`}
                      className="flex-1 px-3.5 py-2 rounded-lg bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    {goals.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeGoal(idx)}
                        aria-label={`Remove goal ${idx + 1}`}
                        className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Constraints Tag Manager */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Key Constraints & Non-Negotiables
                </label>
                <button
                  type="button"
                  onClick={addConstraint}
                  className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center space-x-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Constraint</span>
                </button>
              </div>
              <div className="space-y-2">
                {constraints.map((constraint, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={constraint}
                      onChange={(e) => handleConstraintChange(idx, e.target.value)}
                      placeholder={`Constraint #${idx + 1} (e.g. Maximum budget of \$50k, 6-month deadline)`}
                      className="flex-1 px-3.5 py-2 rounded-lg bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    {constraints.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeConstraint(idx)}
                        aria-label={`Remove constraint ${idx + 1}`}
                        className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Confidence Slider */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <label htmlFor="confidence-slider" className="text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center space-x-2">
                  <Gauge className="w-4 h-4 text-indigo-500" />
                  <span>Current Confidence Level</span>
                </label>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  {confidenceLevel} / 10
                </span>
              </div>
              <input
                id="confidence-slider"
                type="range"
                min="1"
                max="10"
                step="1"
                value={confidenceLevel}
                onChange={(e) => setConfidenceLevel(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                <span>1 - Very Uncertain</span>
                <span>5 - Moderately Confident</span>
                <span>10 - Fully Certain</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !title.trim() || !context.trim()}
              className="w-full py-4 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-lg shadow-blue-500/25 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-base"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Analyzing Blind Spots & AI Council...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Uncover Blind Spots & Analyze Decision</span>
                  <ArrowRight className="w-5 h-5 ml-1" />
                </>
              )}
            </button>
          </div>
        </GlassCard>
      </form>

      {/* Templates Modal */}
      {showTemplatesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-2xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                <BookTemplate className="w-5 h-5 text-blue-500" />
                <span>Select a Decision Template</span>
              </h3>
              <button
                onClick={() => setShowTemplatesModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {DECISION_TEMPLATES.map((tmpl) => (
                <div
                  key={tmpl.id}
                  onClick={() => loadTemplate(tmpl)}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 bg-slate-50/50 dark:bg-slate-950/50 cursor-pointer transition-all hover:-translate-y-0.5"
                >
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                      {tmpl.title}
                    </h4>
                    <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                      {tmpl.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                    {tmpl.description}
                  </p>
                  <div className="text-xs font-mono text-slate-500 italic truncate">
                    Starter: "{tmpl.starterTitle}"
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

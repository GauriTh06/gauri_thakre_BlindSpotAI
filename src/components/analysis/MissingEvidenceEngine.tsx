import React from 'react';
import { GlassCard } from '../ui/GlassCard';
import { MissingEvidenceItem, EvidenceCategory } from '@/types';
import { Search, Users, BarChart3, DollarSign, History, Award, Wrench, ArrowUpRight } from 'lucide-react';

interface MissingEvidenceEngineProps {
  items: MissingEvidenceItem[];
}

export const MissingEvidenceEngine: React.FC<MissingEvidenceEngineProps> = ({ items }) => {
  const getCategoryIcon = (category: EvidenceCategory) => {
    switch (category) {
      case 'Customer Interviews':
        return <Users className="w-4 h-4 text-blue-500" />;
      case 'Market Research':
        return <BarChart3 className="w-4 h-4 text-emerald-500" />;
      case 'Financial Projections':
        return <DollarSign className="w-4 h-4 text-amber-500" />;
      case 'Historical Examples':
        return <History className="w-4 h-4 text-purple-500" />;
      case 'Expert Opinions':
        return <Award className="w-4 h-4 text-indigo-500" />;
      case 'Technical Validation':
        return <Wrench className="w-4 h-4 text-rose-500" />;
      default:
        return <Search className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <Search className="w-5 h-5 text-emerald-500" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Missing Evidence Engine
            </h3>
            <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              Core Differentiator
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Mapping unverified assumptions directly to the empirical data required for ground-truth clarity.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => (
          <GlassCard key={item.id} glow="emerald" padding="md" className="space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              
              {/* Category Badge & Assumption */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800">
                  {getCategoryIcon(item.category)}
                  <span>{item.category}</span>
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  Evidence Gap
                </span>
              </div>

              {/* Assumption */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-0.5">
                  Core Assumption
                </span>
                <p className="text-xs font-semibold text-slate-900 dark:text-white leading-snug">
                  "{item.assumption}"
                </p>
              </div>

              {/* Missing Empirical Evidence */}
              <div className="p-3 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/60 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 block">
                  What Evidence Is Missing?
                </span>
                <p className="text-xs font-medium text-slate-800 dark:text-emerald-100 leading-relaxed">
                  {item.missingEvidence}
                </p>
              </div>

              {/* Impact on Decision */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-0.5">
                  Impact On Judgment
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.impactOnDecision}
                </p>
              </div>

            </div>

            {/* Verification Action */}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400 font-medium">
                Verification Step:
              </span>
              <span className="font-semibold text-emerald-700 dark:text-emerald-400 flex items-center space-x-1">
                <span>{item.suggestedActionToVerify}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

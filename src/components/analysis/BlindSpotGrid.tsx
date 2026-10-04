import React from 'react';
import { GlassCard } from '../ui/GlassCard';
import { BlindSpotFinding, BlindSpotCategoryType } from '@/types';
import { AlertCircle, ShieldAlert, FileQuestion, HelpCircle, Link2, GitFork, Eye } from 'lucide-react';

interface BlindSpotGridProps {
  blindSpots: BlindSpotFinding[];
}

export const BlindSpotGrid: React.FC<BlindSpotGridProps> = ({ blindSpots }) => {
  const getCategoryIcon = (category: BlindSpotCategoryType) => {
    switch (category) {
      case 'Hidden Assumptions':
        return <Eye className="w-5 h-5 text-indigo-500" />;
      case 'Risks':
        return <ShieldAlert className="w-5 h-5 text-rose-500" />;
      case 'Missing Information':
        return <FileQuestion className="w-5 h-5 text-amber-500" />;
      case 'Unknown Factors':
        return <HelpCircle className="w-5 h-5 text-purple-500" />;
      case 'Dependencies':
        return <Link2 className="w-5 h-5 text-blue-500" />;
      case 'Potential Consequences':
        return <GitFork className="w-5 h-5 text-emerald-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-blue-500" />;
    }
  };

  const getSeverityBadge = (severity: BlindSpotFinding['severity']) => {
    switch (severity) {
      case 'critical':
        return 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-rose-300 dark:border-rose-800';
      case 'high':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-300 dark:border-amber-800';
      case 'medium':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border-blue-300 dark:border-blue-800';
      case 'low':
        return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border-slate-300 dark:border-slate-700';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center space-x-2">
          <Eye className="w-5 h-5 text-blue-500" />
          <span>Blind Spot Analyzer</span>
        </h3>
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
          6 Core Categories Covered
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blindSpots.map((spot) => (
          <GlassCard key={spot.id} padding="md" className="flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              
              {/* Card Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
                    {getCategoryIcon(spot.category)}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    {spot.category}
                  </span>
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${getSeverityBadge(spot.severity)}`}>
                  {spot.severity}
                </span>
              </div>

              {/* Finding Headline */}
              <h4 className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
                {spot.finding}
              </h4>

              {/* Explanation */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Explanation
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {spot.explanation}
                </p>
              </div>

            </div>

            {/* Why It Matters Callout */}
            <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800/80 bg-blue-50/50 dark:bg-blue-950/20 -mx-6 -mb-6 p-4 rounded-b-2xl">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 dark:text-blue-300 block mb-1">
                Why It Matters
              </span>
              <p className="text-xs font-medium text-slate-700 dark:text-slate-200">
                {spot.whyItMatters}
              </p>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

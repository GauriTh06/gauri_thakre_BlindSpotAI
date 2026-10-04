import React from 'react';
import { GlassCard } from '../ui/GlassCard';
import { AlertBanner } from '../ui/AlertBanner';
import { READINESS_WARNING_BANNER, getReadinessInsights } from '@/lib/readinessCalculator';
import { ReadinessBreakdown } from '@/types';
import { Gauge, CheckCircle2, AlertTriangle, HelpCircle } from 'lucide-react';

interface ReadinessGaugeProps {
  score: number;
  breakdown: ReadinessBreakdown;
}

export const ReadinessGauge: React.FC<ReadinessGaugeProps> = ({ score, breakdown }) => {
  const insights = getReadinessInsights(breakdown);

  // Score color tiers
  const getScoreColor = (val: number) => {
    if (val >= 80) return 'from-emerald-500 to-teal-400 text-emerald-500';
    if (val >= 60) return 'from-blue-500 to-indigo-400 text-blue-500';
    if (val >= 40) return 'from-amber-500 to-orange-400 text-amber-500';
    return 'from-rose-500 to-red-400 text-rose-500';
  };

  const pillars = [
    { label: 'Evidence Completeness', val: breakdown.evidenceCompleteness, weight: '25%' },
    { label: 'Risk Awareness', val: breakdown.riskAwareness, weight: '25%' },
    { label: 'Assumption Coverage', val: breakdown.assumptionCoverage, weight: '20%' },
    { label: 'Perspective Diversity', val: breakdown.perspectiveDiversity, weight: '15%' },
    { label: 'Bias Exploration', val: breakdown.biasExploration, weight: '15%' },
  ];

  return (
    <GlassCard glow="blue" padding="lg" className="space-y-6">
      
      {/* Mandatory Disclaimer Banner */}
      <AlertBanner
        type="disclaimer"
        title="Decision Exploration Notice"
        message={READINESS_WARNING_BANNER}
      />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        
        {/* Readiness Meter Dial */}
        <div className="md:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-b from-slate-50 to-slate-100/50 dark:from-slate-950/80 dark:to-slate-900/50 border border-slate-200 dark:border-slate-800 text-center">
          <div className="relative flex items-center justify-center w-36 h-36 my-2">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-200 dark:text-slate-800"
                strokeWidth="3.8"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-blue-500 transition-all duration-1000 ease-out"
                strokeDasharray={`${score}, 100`}
                strokeWidth="3.8"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {score}
              </span>
              <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">
                / 100 Readiness
              </span>
            </div>
          </div>

          <h4 className="font-bold text-sm text-slate-900 dark:text-white mt-2 flex items-center space-x-1.5">
            <Gauge className="w-4 h-4 text-blue-500" />
            <span>Exploration Maturity</span>
          </h4>

          {/* Insights Badges */}
          <div className="flex flex-wrap justify-center gap-1.5 mt-3">
            {insights.map((insobj, idx) => (
              <span
                key={idx}
                className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${
                  insobj.status === 'good'
                    ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                    : insobj.status === 'warning'
                    ? 'bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-200 dark:border-amber-800'
                    : 'bg-rose-50 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-rose-200 dark:border-rose-800'
                }`}
              >
                {insobj.label}
              </span>
            ))}
          </div>
        </div>

        {/* 5 Pillars Breakdown Bars */}
        <div className="md:col-span-7 space-y-3.5">
          <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
            Readiness Pillar Breakdown
          </h4>
          {pillars.map((pillar, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-xs font-medium text-slate-700 dark:text-slate-300">
                <span>{pillar.label} <span className="text-[10px] text-slate-400 font-mono">({pillar.weight})</span></span>
                <span className="font-bold">{pillar.val}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full transition-all duration-700"
                  style={{ width: `${pillar.val}%` }}
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </GlassCard>
  );
};

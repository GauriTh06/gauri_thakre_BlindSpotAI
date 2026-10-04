import React from 'react';
import { GlassCard } from '../ui/GlassCard';
import { AiCouncilPerspective, AiCouncilRole } from '@/types';
import { TrendingUp, ShieldAlert, Microscope, Flame, HelpCircle, CheckCircle2 } from 'lucide-react';

interface AiCouncilViewProps {
  perspectives: AiCouncilPerspective[];
}

export const AiCouncilView: React.FC<AiCouncilViewProps> = ({ perspectives }) => {
  const getRoleConfig = (role: AiCouncilRole) => {
    switch (role) {
      case 'Optimist':
        return {
          icon: <TrendingUp className="w-5 h-5 text-emerald-500" />,
          glow: 'emerald' as const,
          badgeBg: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
          accentBorder: 'border-l-4 border-l-emerald-500',
        };
      case 'Skeptic':
        return {
          icon: <ShieldAlert className="w-5 h-5 text-rose-500" />,
          glow: 'rose' as const,
          badgeBg: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-rose-200 dark:border-rose-800',
          accentBorder: 'border-l-4 border-l-rose-500',
        };
      case 'Researcher':
        return {
          icon: <Microscope className="w-5 h-5 text-blue-500" />,
          glow: 'blue' as const,
          badgeBg: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border-blue-200 dark:border-blue-800',
          accentBorder: 'border-l-4 border-l-blue-500',
        };
      case 'Challenger':
        return {
          icon: <Flame className="w-5 h-5 text-amber-500" />,
          glow: 'amber' as const,
          badgeBg: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-200 dark:border-amber-800',
          accentBorder: 'border-l-4 border-l-amber-500',
        };
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <Microscope className="w-5 h-5 text-purple-500" />
            <span>AI Multi-Perspective Council</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            4 Independent analytical viewpoints. Zero prescription or final recommendation.
          </p>
        </div>
        <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
          Non-Prescriptive Framework
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {perspectives.map((p) => {
          const config = getRoleConfig(p.role);
          return (
            <GlassCard
              key={p.role}
              glow={config.glow}
              padding="md"
              className={`space-y-4 ${config.accentBorder}`}
            >
              {/* Perspective Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800">
                    {config.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-base">
                      {p.role} Perspective
                    </h4>
                    <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                      Focus: {p.focus}
                    </span>
                  </div>
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${config.badgeBg}`}>
                  {p.role}
                </span>
              </div>

              {/* Analysis Text */}
              <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed bg-slate-50/50 dark:bg-slate-950/40 p-3.5 rounded-xl border border-slate-200/50 dark:border-slate-800/50 font-medium">
                {p.analysis}
              </p>

              {/* Key Questions */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center space-x-1">
                  <HelpCircle className="w-3 h-3" />
                  <span>Probing Questions</span>
                </span>
                <ul className="space-y-1.5">
                  {p.keyQuestions.map((q, idx) => (
                    <li key={idx} className="text-xs text-slate-600 dark:text-slate-300 flex items-start space-x-2">
                      <span className="text-blue-500 font-bold">•</span>
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key Factors */}
              {p.opportunitiesOrRisks && p.opportunitiesOrRisks.length > 0 && (
                <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-wrap gap-1.5">
                  {p.opportunitiesOrRisks.map((item, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              )}
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
};

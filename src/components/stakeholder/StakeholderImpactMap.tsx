import React from 'react';
import { GlassCard } from '../ui/GlassCard';
import { StakeholderImpact, StakeholderGroup } from '@/types';
import { Users, Heart, ShieldAlert, CheckCircle2, HelpCircle, UserCheck } from 'lucide-react';

interface StakeholderImpactMapProps {
  impacts: StakeholderImpact[];
}

export const StakeholderImpactMap: React.FC<StakeholderImpactMapProps> = ({ impacts }) => {
  const getStakeholderBadge = (group: StakeholderGroup) => {
    switch (group) {
      case 'User':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border-blue-200 dark:border-blue-800';
      case 'Family':
        return 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-rose-200 dark:border-rose-800';
      case 'Team':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 border-purple-200 dark:border-purple-800';
      case 'Customers':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
      case 'Investors':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-200 dark:border-amber-800';
      case 'Society':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <Users className="w-5 h-5 text-indigo-500" />
            <span>Stakeholder Impact Map</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Systematic ripple-effect analysis across 6 core human and organization groups.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {impacts.map((imp) => (
          <GlassCard key={imp.stakeholder} padding="md" className="space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              
              {/* Header */}
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getStakeholderBadge(imp.stakeholder)}`}>
                  {imp.stakeholder}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  Impact Group
                </span>
              </div>

              {/* Benefits */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center space-x-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Benefits</span>
                </span>
                <ul className="space-y-1">
                  {imp.benefits.map((b, idx) => (
                    <li key={idx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start space-x-1.5">
                      <span className="text-emerald-500 font-bold">+</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Risks & Concerns */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center space-x-1">
                  <ShieldAlert className="w-3 h-3" />
                  <span>Risks & Concerns</span>
                </span>
                <ul className="space-y-1">
                  {imp.risks.concat(imp.concerns).map((r, idx) => (
                    <li key={idx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start space-x-1.5">
                      <span className="text-rose-500 font-bold">-</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Unknowns */}
              {imp.unknowns && imp.unknowns.length > 0 && (
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center space-x-1">
                    <HelpCircle className="w-3 h-3" />
                    <span>Unmapped Unknowns</span>
                  </span>
                  <ul className="space-y-1">
                    {imp.unknowns.map((u, idx) => (
                      <li key={idx} className="text-xs text-slate-600 dark:text-slate-400 flex items-start space-x-1.5">
                        <span className="text-amber-500 font-bold">?</span>
                        <span>{u}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

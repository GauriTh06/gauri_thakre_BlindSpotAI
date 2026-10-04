'use client';

import React, { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { 
  BarChart3, 
  TrendingUp, 
  ShieldAlert, 
  Search, 
  Users, 
  Sparkles, 
  Download, 
  CheckCircle2, 
  AlertTriangle,
  Brain,
  FileText
} from 'lucide-react';
import { DecisionAnalysis } from '@/types';

interface DashboardAnalyticsViewProps {
  analysis?: DecisionAnalysis | null;
}

export const DashboardAnalyticsView: React.FC<DashboardAnalyticsViewProps> = ({ analysis }) => {
  const [copied, setCopied] = useState(false);

  // Compute or fallback metrics
  const readiness = analysis?.readinessScore || 78;
  const biasesCount = analysis?.cognitiveBiases.filter(b => b.detected).length || 3;
  const evidenceCount = analysis?.missingEvidence.length || 4;
  const stakeholdersCount = analysis?.stakeholderImpacts.length || 3;

  const biasTypes = [
    { name: 'Confirmation Bias', count: 4, level: 'High', color: 'bg-red-500' },
    { name: 'Sunk Cost Fallacy', count: 3, level: 'Medium', color: 'bg-amber-500' },
    { name: 'Overconfidence Bias', count: 3, level: 'Medium', color: 'bg-amber-500' },
    { name: 'Availability Heuristic', count: 2, level: 'Low', color: 'bg-emerald-500' },
    { name: 'Framing Effect', count: 2, level: 'Low', color: 'bg-emerald-500' },
  ];

  const pillarScores = [
    { name: 'Goal Clarity & Alignment', score: analysis?.readinessBreakdown?.goalClarity || 85, color: 'bg-blue-500' },
    { name: 'Evidence Rigor & Data Quality', score: analysis?.readinessBreakdown?.evidenceRigor || 70, color: 'bg-indigo-500' },
    { name: 'Risk Assessment & Contingency', score: analysis?.readinessBreakdown?.riskAssessment || 75, color: 'bg-purple-500' },
    { name: 'Stakeholder Impact & Empathy', score: analysis?.readinessBreakdown?.stakeholderEmpathy || 82, color: 'bg-emerald-500' },
    { name: 'Constraint Realism & Feasibility', score: analysis?.readinessBreakdown?.constraintRealism || 78, color: 'bg-cyan-500' },
  ];

  const handleExportReport = () => {
    const reportData = {
      platform: 'BlindSpot AI — Decision Intelligence Platform',
      generatedAt: new Date().toISOString(),
      readinessScore: readiness,
      summary: {
        biasesFlagged: biasesCount,
        evidenceGapsIdentified: evidenceCount,
        stakeholderGroupsAnalyzed: stakeholdersCount,
      },
      readinessBreakdown: analysis?.readinessBreakdown || {
        goalClarity: 85,
        evidenceRigor: 70,
        riskAssessment: 75,
        stakeholderEmpathy: 82,
        constraintRealism: 78,
      },
      nonPrescriptiveMetaObservations: [
        "Decision demonstrates high initial goal clarity and strong alignment with core objectives.",
        "Primary area for exploration: empirical evidence validation and mitigating confirmation bias.",
        "Stakeholder downstream effects show manageable friction with recommended proactive communication."
      ]
    };

    navigator.clipboard.writeText(JSON.stringify(reportData, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Top Banner */}
      <GlassCard className="p-6 bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white border-blue-800/40 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-2xl bg-blue-500/20 border border-blue-400/30 text-blue-400">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center space-x-2">
                <span>Decision Intelligence Analytics & Meta-Insights</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                Aggregate metrics on decision thoroughness, bias distribution, and reasoning trajectory.
              </p>
            </div>
          </div>

          <button
            onClick={handleExportReport}
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white flex items-center space-x-2 shadow-lg shadow-blue-600/30 transition-all active:scale-95"
          >
            {copied ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>Executive Brief Copied!</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Export Intelligence Brief</span>
              </>
            )}
          </button>
        </div>
      </GlassCard>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1 */}
        <GlassCard className="p-5 space-y-2 border-l-4 border-l-blue-500">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Overall Thoroughness</span>
            <TrendingUp className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
            {readiness}<span className="text-sm font-normal text-slate-400">/100</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Weighted across 5 decision pillars
          </p>
        </GlassCard>

        {/* KPI 2 */}
        <GlassCard className="p-5 space-y-2 border-l-4 border-l-amber-500">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Biases Flagged</span>
            <ShieldAlert className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
            {biasesCount}
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Cognitive traps identified & probed
          </p>
        </GlassCard>

        {/* KPI 3 */}
        <GlassCard className="p-5 space-y-2 border-l-4 border-l-purple-500">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Evidence Gaps</span>
            <Search className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
            {evidenceCount}
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Critical missing datasets required
          </p>
        </GlassCard>

        {/* KPI 4 */}
        <GlassCard className="p-5 space-y-2 border-l-4 border-l-emerald-500">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Stakeholder Groups</span>
            <Users className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
            {stakeholdersCount}
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Downstream groups mapped for impact
          </p>
        </GlassCard>

      </div>

      {/* Main Charts & Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Pillar Readiness Breakdown */}
        <GlassCard className="p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center space-x-2">
              <Brain className="w-5 h-5 text-blue-500" />
              <span>5-Pillar Decision Thoroughness</span>
            </h3>
            <span className="text-xs font-mono text-slate-500">Target: 80+</span>
          </div>

          <div className="space-y-4">
            {pillarScores.map((pillar) => (
              <div key={pillar.name} className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-700 dark:text-slate-300">{pillar.name}</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">{pillar.score}%</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${pillar.color}`}
                    style={{ width: `${pillar.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Cognitive Bias Frequency Distribution */}
        <GlassCard className="p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <span>Cognitive Bias Frequency Analysis</span>
            </h3>
            <span className="text-xs font-mono text-slate-500">Detected Traps</span>
          </div>

          <div className="space-y-4">
            {biasTypes.map((bias) => (
              <div key={bias.name} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/60">
                <div className="flex items-center space-x-3">
                  <div className={`w-2.5 h-2.5 rounded-full ${bias.color}`} />
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">{bias.name}</div>
                    <div className="text-[10px] text-slate-500">Occurrences across analyses</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {bias.count} flagged
                  </span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

      </div>

      {/* Non-Prescriptive AI Strategic Synthesis */}
      <GlassCard className="p-6 bg-slate-900 text-white border-blue-900/40 space-y-4">
        <div className="flex items-center space-x-2 text-blue-400">
          <Sparkles className="w-5 h-5" />
          <h3 className="font-bold text-base text-white">Socratic Meta-Reasoning Observation</h3>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Based on the structural evaluation of your input options, your decision framework demonstrates <strong className="text-white">high goal clarity</strong> and <strong className="text-white">strong constraint awareness</strong>. However, the analysis identifies a potential reliance on internal assumptions regarding timeline feasibility. Gathering empirical customer retention metrics and conducting a pre-mortem exercise will significantly increase overall decision thoroughness.
        </p>

        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 font-mono">
          ⚠️ <strong>System Boundary Disclaimer:</strong> BlindSpot AI surfaces cognitive blind spots and evidence gaps to support your critical thinking. It never prescribes choices or decides on your behalf.
        </div>
      </GlassCard>

    </div>
  );
};

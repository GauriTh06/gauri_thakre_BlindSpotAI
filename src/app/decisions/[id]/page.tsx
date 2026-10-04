'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getDecisionById, getAnalysisByDecisionId } from '@/lib/firebase/firestore';
import { Decision, DecisionAnalysis } from '@/types';
import { ReadinessGauge } from '@/components/analysis/ReadinessGauge';
import { BlindSpotGrid } from '@/components/analysis/BlindSpotGrid';
import { AiCouncilView } from '@/components/analysis/AiCouncilView';
import { BiasDetector } from '@/components/analysis/BiasDetector';
import { MissingEvidenceEngine } from '@/components/analysis/MissingEvidenceEngine';
import { DecisionCanvas } from '@/components/canvas/DecisionCanvas';
import { StakeholderImpactMap } from '@/components/stakeholder/StakeholderImpactMap';
import { ReflectionCoachChat } from '@/components/coach/ReflectionCoachChat';
import { useAuth } from '@/context/AuthContext';
import { GlassCard } from '@/components/ui/GlassCard';
import Link from 'next/link';
import { ArrowLeft, Brain } from 'lucide-react';

export default function SingleDecisionPage() {
  const params = useParams();
  const id = params.id as string;
  const { effectiveUserId } = useAuth();

  const [decision, setDecision] = useState<Decision | null>(null);
  const [analysis, setAnalysis] = useState<DecisionAnalysis | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!id) return;
      const dec = await getDecisionById(id);
      const ana = await getAnalysisByDecisionId(id);
      setDecision(dec);
      setAnalysis(ana);
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-slate-500 text-sm space-x-2">
        <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <span>Loading Decision Architecture from Firestore...</span>
      </div>
    );
  }

  if (!decision || !analysis) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center space-y-4">
        <GlassCard padding="lg" className="space-y-4">
          <Brain className="w-12 h-12 text-slate-400 mx-auto" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Decision Architecture Not Found
          </h2>
          <p className="text-xs text-slate-500">
            The decision ID requested was not found in Firestore or local storage.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Workspace</span>
          </Link>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Link
        href="/dashboard"
        className="inline-flex items-center space-x-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Workspace</span>
      </Link>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white shadow-xl space-y-3">
        <h1 className="text-2xl font-bold">{decision.title}</h1>
        <p className="text-xs sm:text-sm text-slate-300">{decision.context}</p>
      </div>

      <ReadinessGauge score={analysis.readinessScore} breakdown={analysis.readinessBreakdown} />
      <BlindSpotGrid blindSpots={analysis.blindSpots} />
      <AiCouncilView perspectives={analysis.aiCouncil} />
      <BiasDetector biases={analysis.cognitiveBiases} />
      <MissingEvidenceEngine items={analysis.missingEvidence} />
      <StakeholderImpactMap impacts={analysis.stakeholderImpacts} />
      <DecisionCanvas initialData={analysis.canvasData} onSave={() => {}} />
      <ReflectionCoachChat
        decisionId={decision.id}
        userId={effectiveUserId}
        decisionTitle={decision.title}
        decisionContext={decision.context}
      />
    </div>
  );
}

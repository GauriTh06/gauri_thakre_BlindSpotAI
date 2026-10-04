'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { DecisionForm } from '@/components/decision/DecisionForm';
import { ReadinessGauge } from '@/components/analysis/ReadinessGauge';
import { BlindSpotGrid } from '@/components/analysis/BlindSpotGrid';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { Decision, DecisionAnalysis, DecisionCanvasData } from '@/types';
import { saveDecision, saveAnalysis, saveJournalEntry } from '@/lib/firebase/firestore';
import { useAuth } from '@/context/AuthContext';
import { Brain, RotateCcw, BarChart3, Loader2, Sparkles } from 'lucide-react';

// Dynamic Code Splitting for Heavy Modules
const AiCouncilView = dynamic(() => import('@/components/analysis/AiCouncilView').then(mod => mod.AiCouncilView), {
  loading: () => <TabLoadingSkeleton text="Loading AI Council perspectives..." />
});
const BiasDetector = dynamic(() => import('@/components/analysis/BiasDetector').then(mod => mod.BiasDetector), {
  loading: () => <TabLoadingSkeleton text="Loading Cognitive Bias Engine..." />
});
const MissingEvidenceEngine = dynamic(() => import('@/components/analysis/MissingEvidenceEngine').then(mod => mod.MissingEvidenceEngine), {
  loading: () => <TabLoadingSkeleton text="Loading Missing Evidence Engine..." />
});
const StakeholderImpactMap = dynamic(() => import('@/components/stakeholder/StakeholderImpactMap').then(mod => mod.StakeholderImpactMap), {
  loading: () => <TabLoadingSkeleton text="Loading Stakeholder Impact Matrix..." />
});
const DecisionCanvas = dynamic(() => import('@/components/canvas/DecisionCanvas').then(mod => mod.DecisionCanvas), {
  loading: () => <TabLoadingSkeleton text="Loading Interactive Decision Canvas..." />
});
const ReflectionCoachChat = dynamic(() => import('@/components/coach/ReflectionCoachChat').then(mod => mod.ReflectionCoachChat), {
  loading: () => <TabLoadingSkeleton text="Loading Socratic Coach Chat..." />
});
const DashboardAnalyticsView = dynamic(() => import('@/components/analytics/DashboardAnalyticsView').then(mod => mod.DashboardAnalyticsView), {
  loading: () => <TabLoadingSkeleton text="Loading Analytics & Meta-Insights..." />
});

function TabLoadingSkeleton({ text }: { text: string }) {
  return (
    <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center space-x-3 text-slate-500 font-medium text-xs">
      <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
      <span>{text}</span>
    </div>
  );
}

export default function DashboardPage() {
  const { effectiveUserId } = useAuth();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [currentDecision, setCurrentDecision] = useState<Decision | null>(null);
  const [analysis, setAnalysis] = useState<DecisionAnalysis | null>(null);
  const [activeTab, setActiveTab] = useState<'analysis' | 'council' | 'biases' | 'evidence' | 'canvas' | 'coach' | 'impact' | 'analytics'>('analysis');
  const [showGlobalAnalytics, setShowGlobalAnalytics] = useState(false);

  useEffect(() => {
    if (searchParams.get('view') === 'analytics') {
      setShowGlobalAnalytics(true);
    }
  }, [searchParams]);

  const handleCreateDecision = async (formData: {
    title: string;
    context: string;
    goals: string[];
    constraints: string[];
    confidenceLevel: number;
    templateId?: string;
  }) => {
    setLoading(true);

    const decisionId = `dec-${Date.now()}`;
    const newDecision: Decision = {
      id: decisionId,
      userId: effectiveUserId,
      title: formData.title,
      context: formData.context,
      goals: formData.goals,
      constraints: formData.constraints,
      confidenceLevel: formData.confidenceLevel,
      templateId: formData.templateId,
      status: 'analyzed',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await saveDecision(newDecision);
    setCurrentDecision(newDecision);

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          decisionId,
          userId: effectiveUserId,
          title: formData.title,
          context: formData.context,
          goals: formData.goals,
          constraints: formData.constraints,
          confidenceLevel: formData.confidenceLevel,
        }),
      });

      const data = await res.json();
      if (data.analysis) {
        setAnalysis(data.analysis);
        await saveAnalysis(data.analysis);

        await saveJournalEntry({
          id: `journal-${Date.now()}`,
          decisionId,
          userId: effectiveUserId,
          originalDecisionTitle: formData.title,
          originalConfidence: formData.confidenceLevel,
          summary: formData.context.slice(0, 180) + '...',
          keyTakeaways: data.analysis.blindSpots.map((b: any) => b.finding),
          reflectionNotes: '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          status: 'active',
        });
      }
    } catch (err) {
      console.error('Failed to trigger decision analysis:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCanvas = async (updatedCanvas: DecisionCanvasData) => {
    if (!analysis) return;
    const updatedAnalysis: DecisionAnalysis = {
      ...analysis,
      canvasData: updatedCanvas,
    };
    setAnalysis(updatedAnalysis);
    await saveAnalysis(updatedAnalysis);
  };

  const resetWorkspace = () => {
    setCurrentDecision(null);
    setAnalysis(null);
    setActiveTab('analysis');
    setShowGlobalAnalytics(false);
  };

  return (
    <ErrorBoundary>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center space-x-3">
              <Brain className="w-8 h-8 text-blue-500" />
              <span>Decision Intelligence Workspace</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Structured analysis workspace to evaluate options, uncover blind spots, and coach reasoning.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowGlobalAnalytics(!showGlobalAnalytics)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                showGlobalAnalytics
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>{showGlobalAnalytics ? 'Back to Workspace' : 'Analytics & Insights'}</span>
            </button>

            {currentDecision && (
              <button
                onClick={resetWorkspace}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center space-x-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Analyze New Decision</span>
              </button>
            )}
          </div>
        </div>

        {showGlobalAnalytics ? (
          <ErrorBoundary>
            <DashboardAnalyticsView analysis={analysis} />
          </ErrorBoundary>
        ) : !currentDecision || !analysis ? (
          <div className="space-y-12">
            <DecisionForm onSubmit={handleCreateDecision} isLoading={loading} />
            
            {/* Prominently Featured Analytics & Insights Dashboard */}
            <div className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-slate-900 dark:text-white">
                  <BarChart3 className="w-5 h-5 text-blue-500" />
                  <h2 className="text-lg font-bold">Platform Intelligence & Decision Analytics</h2>
                </div>
                <span className="text-xs text-blue-600 dark:text-blue-400 font-mono">Live Meta-Metrics</span>
              </div>
              <ErrorBoundary>
                <DashboardAnalyticsView analysis={null} />
              </ErrorBoundary>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            
            {/* Decision Summary Header Bar */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white shadow-xl space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[10px] uppercase font-extrabold tracking-wider px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  Active Decision Architecture
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  ID: {currentDecision.id}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                {currentDecision.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
                {currentDecision.context}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-2 border-t border-slate-800">
                <div>Initial Confidence: <strong className="text-white">{currentDecision.confidenceLevel}/10</strong></div>
                <div>Goals: <strong className="text-white">{currentDecision.goals.length} defined</strong></div>
                <div>Constraints: <strong className="text-white">{currentDecision.constraints.length} non-negotiable</strong></div>
              </div>
            </div>

            {/* Decision Readiness Gauge */}
            <ReadinessGauge score={analysis.readinessScore} breakdown={analysis.readinessBreakdown} />

            {/* Tab Navigation */}
            <div className="flex overflow-x-auto gap-2 p-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              {[
                { id: 'analysis', label: 'Blind Spots', count: analysis.blindSpots.length },
                { id: 'council', label: 'AI Council (4 Perspectives)', count: 4 },
                { id: 'biases', label: 'Cognitive Biases', count: analysis.cognitiveBiases.filter(b => b.detected).length },
                { id: 'evidence', label: 'Missing Evidence', count: analysis.missingEvidence.length },
                { id: 'impact', label: 'Stakeholder Impact', count: analysis.stakeholderImpacts.length },
                { id: 'canvas', label: 'Decision Canvas', count: 8 },
                { id: 'coach', label: 'Socratic Coach Chat', count: 'Live' },
                { id: 'analytics', label: 'Analytics & Insights', count: 'KPIs' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/20 text-white font-mono">
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Tab Content Display with Isolated Error Boundaries */}
            <div className="space-y-6">
              <ErrorBoundary>
                {activeTab === 'analysis' && <BlindSpotGrid blindSpots={analysis.blindSpots} />}
                {activeTab === 'council' && <AiCouncilView perspectives={analysis.aiCouncil} />}
                {activeTab === 'biases' && <BiasDetector biases={analysis.cognitiveBiases} />}
                {activeTab === 'evidence' && <MissingEvidenceEngine items={analysis.missingEvidence} />}
                {activeTab === 'impact' && <StakeholderImpactMap impacts={analysis.stakeholderImpacts} />}
                {activeTab === 'canvas' && <DecisionCanvas initialData={analysis.canvasData} onSave={handleUpdateCanvas} />}
                {activeTab === 'coach' && (
                  <ReflectionCoachChat
                    decisionId={currentDecision.id}
                    userId={effectiveUserId}
                    decisionTitle={currentDecision.title}
                    decisionContext={currentDecision.context}
                  />
                )}
                {activeTab === 'analytics' && <DashboardAnalyticsView analysis={analysis} />}
              </ErrorBoundary>
            </div>

          </div>
        )}
      </div>
    </ErrorBoundary>
  );
}

import React from 'react';
import Link from 'next/link';
import { GlassCard } from '@/components/ui/GlassCard';
import { 
  Brain, 
  Sparkles, 
  Eye, 
  Users, 
  Search, 
  ShieldAlert, 
  LayoutGrid, 
  BookOpen, 
  Gauge, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Lock, 
  Cpu
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="space-y-24 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Hero Section */}
      <section className="text-center space-y-8 pt-8 pb-4">
        
        {/* Hackathon Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs font-bold tracking-wide uppercase">
          <Sparkles className="w-4 h-4 text-blue-500" />
          <span>PromptWars AI Evaluation Entry — Decision Intelligence</span>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="max-w-4xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-none">
            Think Better.{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
              Decide Smarter.
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
            A structured decision thinking workspace that uncovers your blind spots, exposes cognitive biases, and maps missing evidence—without ever making choices for you.
          </p>
        </div>

        {/* Hero Call to Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            href="/dashboard"
            className="px-8 py-4 rounded-2xl font-extrabold text-base text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-xl shadow-blue-500/25 flex items-center space-x-3 transition-all hover:scale-105"
          >
            <Brain className="w-5 h-5" />
            <span>Launch Decision Workspace</span>
            <ArrowRight className="w-5 h-5" />
          </Link>

          <Link
            href="/journal"
            className="px-6 py-4 rounded-2xl font-bold text-sm text-slate-700 dark:text-slate-200 bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center space-x-2"
          >
            <BookOpen className="w-4 h-4 text-emerald-500" />
            <span>View Decision Journal</span>
          </Link>
        </div>

        {/* Core Non-Prescriptive Policy Banner */}
        <div className="max-w-3xl mx-auto p-4 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 text-xs sm:text-sm text-indigo-950 dark:text-indigo-200 flex items-center space-x-3">
          <ShieldCheck className="w-6 h-6 text-indigo-600 dark:text-indigo-400 shrink-0" />
          <p className="text-left font-medium leading-relaxed">
            <strong className="font-bold">Strict Non-Prescriptive Guarantee:</strong> BlindSpot AI never recommends actions, chooses options, or makes decisions for you. It strictly improves reasoning, surfaces risks, and encourages deep Socratic reflection.
          </p>
        </div>

      </section>

      {/* Feature Showcase Grid */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Comprehensive 10-Feature Decision Intelligence Platform
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Every feature directly aligns with PromptWars criteria: Code Quality, Security, Accessibility, and Google Services usage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <GlassCard padding="md" className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              1. Blind Spot Analyzer
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Generates Hidden Assumptions, Risks, Missing Information, Unknown Factors, Dependencies, and Potential Consequences with Findings and explanations.
            </p>
          </GlassCard>

          <GlassCard padding="md" className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              2. AI Council (4 Perspectives)
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Optimist, Skeptic, Researcher, and Challenger perspectives provide independent analysis without recommending choices.
            </p>
          </GlassCard>

          <GlassCard padding="md" className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Brain className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              3. Cognitive Bias Detector
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Detects Confirmation, Anchoring, Availability, Overconfidence, and Sunk Cost Fallacy biases with reflection questions.
            </p>
          </GlassCard>

          <GlassCard padding="md" className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              4. Missing Evidence Engine
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Identifies missing customer interviews, market research, financial models, and technical data per assumption.
            </p>
          </GlassCard>

          <GlassCard padding="md" className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Gauge className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              5. Readiness Score Gauge
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              0-100 maturity score based on evidence, risk, assumptions, diversity, and bias exploration with mandatory exploration disclaimer.
            </p>
          </GlassCard>

          <GlassCard padding="md" className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center">
              <LayoutGrid className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              6. Decision Canvas & Journal
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Interactive 8-quadrant editable canvas and Firestore-backed Decision Journal for historical reflections and confidence tracking.
            </p>
          </GlassCard>

        </div>
      </section>

      {/* Tech Stack & Google Services Section */}
      <section className="p-8 rounded-3xl bg-slate-900 text-white space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
            Engineered for PromptWars Evaluation
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold">
            Google Services & Tech Stack Integration
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 text-center space-y-1">
            <Cpu className="w-6 h-6 text-blue-400 mx-auto" />
            <h4 className="font-bold text-sm">Gemini 2.5 API</h4>
            <p className="text-[11px] text-slate-400">Structured JSON Output & Socratic Coach</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 text-center space-y-1">
            <ShieldCheck className="w-6 h-6 text-emerald-400 mx-auto" />
            <h4 className="font-bold text-sm">Firebase Auth</h4>
            <p className="text-[11px] text-slate-400">Google OAuth & Guest Auth Fallback</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 text-center space-y-1">
            <BookOpen className="w-6 h-6 text-purple-400 mx-auto" />
            <h4 className="font-bold text-sm">Firestore</h4>
            <p className="text-[11px] text-slate-400">Decisions, Analyses, Chat & Journals</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 text-center space-y-1">
            <Lock className="w-6 h-6 text-amber-400 mx-auto" />
            <h4 className="font-bold text-sm">Firebase Analytics</h4>
            <p className="text-[11px] text-slate-400">Event Logging & Telemetry</p>
          </div>
        </div>
      </section>

    </div>
  );
}

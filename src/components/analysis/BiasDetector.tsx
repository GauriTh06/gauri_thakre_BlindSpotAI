import React from 'react';
import { GlassCard } from '../ui/GlassCard';
import { CognitiveBias, CognitiveBiasType } from '@/types';
import { Brain, AlertCircle, CheckCircle2, HelpCircle, Lightbulb } from 'lucide-react';

interface BiasDetectorProps {
  biases: CognitiveBias[];
}

export const BiasDetector: React.FC<BiasDetectorProps> = ({ biases }) => {
  const getBiasDescription = (name: CognitiveBiasType) => {
    switch (name) {
      case 'Confirmation Bias':
        return 'Searching for or favoring information that confirms pre-existing beliefs while ignoring counter-evidence.';
      case 'Anchoring Bias':
        return 'Relying too heavily on an initial piece of information (the "anchor") when making decisions.';
      case 'Availability Bias':
        return 'Overestimating the likelihood of events based on how easily recent or vivid examples come to mind.';
      case 'Overconfidence Bias':
        return 'Holding a subjective certainty in judgment that is higher than objective accuracy warrants.';
      case 'Sunk Cost Fallacy':
        return 'Continuing an endeavor due to previously invested resources (time, money, effort) rather than future value.';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <Brain className="w-5 h-5 text-amber-500" />
            <span>Cognitive Bias Detector</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Psychological heuristics that secretly shape decision-making under uncertainty.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {biases.map((bias) => (
          <GlassCard
            key={bias.name}
            glow={bias.detected ? 'amber' : 'none'}
            padding="md"
            className={`transition-all ${
              bias.detected 
                ? 'border-amber-400/50 dark:border-amber-600/50 bg-amber-50/20 dark:bg-amber-950/10' 
                : 'opacity-75 grayscale-30'
            }`}
          >
            <div className="space-y-3">
              
              {/* Bias Header */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center space-x-2.5">
                  <div className={`p-2 rounded-xl ${bias.detected ? 'bg-amber-100 dark:bg-amber-950 text-amber-600' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                    <Brain className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-base">
                      {bias.name}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {getBiasDescription(bias.name)}
                    </p>
                  </div>
                </div>

                <span
                  className={`text-[11px] font-bold px-3 py-1 rounded-full border flex items-center space-x-1 ${
                    bias.detected
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-300 dark:border-amber-700'
                      : 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                  }`}
                >
                  {bias.detected ? (
                    <>
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>Potential Indicator Detected</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Low Detection Risk</span>
                    </>
                  )}
                </span>
              </div>

              {/* Analysis & Evidence */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                
                {/* Why it might exist */}
                <div className="p-3 rounded-xl bg-white/70 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/60 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 flex items-center space-x-1">
                    <Lightbulb className="w-3 h-3" />
                    <span>Why It Might Exist</span>
                  </span>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {bias.whyItMightExist}
                  </p>
                </div>

                {/* Evidence from Context */}
                <div className="p-3 rounded-xl bg-white/70 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/60 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center space-x-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>Contextual Indicator / Evidence</span>
                  </span>
                  <p className="text-xs font-mono text-slate-600 dark:text-slate-300 leading-relaxed">
                    "{bias.evidence}"
                  </p>
                </div>

              </div>

              {/* Reflection Questions */}
              {bias.reflectionQuestions && bias.reflectionQuestions.length > 0 && (
                <div className="pt-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center space-x-1 mb-1.5">
                    <HelpCircle className="w-3 h-3" />
                    <span>Socratic Reflection Questions</span>
                  </span>
                  <div className="space-y-1">
                    {bias.reflectionQuestions.map((q, idx) => (
                      <p key={idx} className="text-xs text-slate-700 dark:text-slate-200 font-medium pl-3 border-l-2 border-indigo-400 dark:border-indigo-600">
                        {q}
                      </p>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

import React from 'react';
import { Shield, Cpu, Accessibility, Award } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-950 py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              BlindSpot AI
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              A structured decision intelligence workspace designed to reveal hidden assumptions, cognitive biases, and unexamined risks without prescribing choices.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              Google Services Integrated
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
              <li className="flex items-center space-x-2">
                <Cpu className="w-3.5 h-3.5 text-blue-500" />
                <span>Google Gemini 2.5 API</span>
              </li>
              <li className="flex items-center space-x-2">
                <Shield className="w-3.5 h-3.5 text-emerald-500" />
                <span>Firebase Firestore & Auth</span>
              </li>
              <li className="flex items-center space-x-2">
                <Award className="w-3.5 h-3.5 text-purple-500" />
                <span>Firebase Analytics</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              Strict Non-Prescriptive Policy
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              This system never chooses options or makes decisions for users. It strictly improves reasoning, surfaces missing evidence, and encourages deep Socratic reflection.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              Accessibility & Security
            </h4>
            <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
              <li className="flex items-center space-x-2">
                <Accessibility className="w-3.5 h-3.5 text-amber-500" />
                <span>WCAG 2.1 AA Compliant</span>
              </li>
              <li>Zod Schema Input Sanitization</li>
              <li>Rate Limited API Endpoints</li>
              <li>Dark / Light Mode High Contrast</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© 2026 BlindSpot AI. Built for PromptWars Hackathon Challenge.</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <span className="hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              PromptWars Evaluation Edition
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

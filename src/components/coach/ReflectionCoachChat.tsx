'use client';

import React, { useState, useEffect, useRef } from 'react';
import { GlassCard } from '../ui/GlassCard';
import { ChatMessage } from '@/types';
import { saveChatMessage, getChatHistory } from '@/lib/firebase/firestore';
import { MessageSquare, Send, Sparkles, HelpCircle, ShieldCheck, User } from 'lucide-react';

interface ReflectionCoachChatProps {
  decisionId: string;
  userId: string;
  decisionTitle: string;
  decisionContext: string;
}

export const ReflectionCoachChat: React.FC<ReflectionCoachChatProps> = ({
  decisionId,
  userId,
  decisionTitle,
  decisionContext,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadHistory() {
      const history = await getChatHistory(decisionId);
      if (history.length > 0) {
        setMessages(history);
      } else {
        // Initial Socratic welcome message
        const welcomeMsg: ChatMessage = {
          id: `welcome-${Date.now()}`,
          decisionId,
          userId,
          role: 'model',
          content: `Welcome to your Socratic Reflection Session. I am BlindSpot AI.

My purpose is solely to help you examine your reasoning, challenge hidden premises, and uncover unexamined perspectives.

I will **never** recommend what choice you should make or make decisions for you.

To start our dialogue: What is the most critical assumption underlying "${decisionTitle}" that, if proven wrong, would make you reconsider your position?`,
          timestamp: new Date().toISOString(),
        };
        setMessages([welcomeMsg]);
        saveChatMessage(welcomeMsg);
      }
    }
    loadHistory();
  }, [decisionId, userId, decisionTitle]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || loading) return;

    const userMsgText = inputMessage.trim();
    setInputMessage('');

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      decisionId,
      userId,
      role: 'user',
      content: userMsgText,
      timestamp: new Date().toISOString(),
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    saveChatMessage(userMsg);

    setLoading(true);

    try {
      const res = await fetch('/api/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          decisionTitle,
          decisionContext,
          userMessage: userMsgText,
          history: updatedMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await res.json();

      if (data.reply) {
        const coachMsg: ChatMessage = {
          id: `model-${Date.now()}`,
          decisionId,
          userId,
          role: 'model',
          content: data.reply,
          timestamp: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, coachMsg]);
        saveChatMessage(coachMsg);
      }
    } catch (err) {
      console.error('Reflection Coach Chat error:', err);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    'What if my top goal is achieved but causes secondary friction?',
    'How can I test my core premise without spending money?',
    'What are the strongest counterarguments to my plan?',
  ];

  return (
    <GlassCard glow="blue" padding="lg" className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Socratic Reflection Coach
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Interactive Socratic dialogue to challenge logic and reveal hidden assumptions.
            </p>
          </div>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
          Non-Prescriptive Policy Enforced
        </span>
      </div>

      {/* Messages Scroll Area */}
      <div 
        aria-live="polite"
        className="h-96 overflow-y-auto space-y-4 p-4 rounded-xl bg-slate-50/70 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start space-x-2.5 ${
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.role === 'model' && (
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shrink-0 mt-0.5 shadow-sm">
                <Sparkles className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-[85%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white rounded-tr-none shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 rounded-tl-none shadow-xs whitespace-pre-wrap'
              }`}
            >
              {msg.content}
            </div>

            {msg.role === 'user' && (
              <div className="w-8 h-8 rounded-xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 shrink-0 mt-0.5">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-center space-x-2 text-slate-400 text-xs p-2">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <span>BlindSpot AI is formulating Socratic questions...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompt Chips */}
      <div className="flex flex-wrap gap-2">
        {quickPrompts.map((qp, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setInputMessage(qp)}
            className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors"
          >
            "{qp}"
          </button>
        ))}
      </div>

      {/* Input Box */}
      <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Reflect on your reasoning or answer the coach's question..."
          className="flex-1 px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <button
          type="submit"
          disabled={loading || !inputMessage.trim()}
          aria-label="Send reflection message"
          className="p-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium disabled:opacity-50 transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </GlassCard>
  );
};

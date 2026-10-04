import React from 'react';
import { cn } from '@/lib/utils/cn';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glow?: 'blue' | 'emerald' | 'amber' | 'rose' | 'purple' | 'none';
  hoverEffect?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  glow = 'none',
  hoverEffect = true,
  padding = 'md',
  ...props
}) => {
  const glowStyles = {
    blue: 'shadow-[0_0_30px_-5px_rgba(59,130,246,0.15)] border-blue-500/20 dark:border-blue-500/30',
    emerald: 'shadow-[0_0_30px_-5px_rgba(16,185,129,0.15)] border-emerald-500/20 dark:border-emerald-500/30',
    amber: 'shadow-[0_0_30px_-5px_rgba(245,158,11,0.15)] border-amber-500/20 dark:border-amber-500/30',
    rose: 'shadow-[0_0_30px_-5px_rgba(244,63,94,0.15)] border-rose-500/20 dark:border-rose-500/30',
    purple: 'shadow-[0_0_30px_-5px_rgba(168,85,247,0.15)] border-purple-500/20 dark:border-purple-500/30',
    none: 'border-slate-200/80 dark:border-slate-800/80 shadow-sm',
  };

  const paddingStyles = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={cn(
        'rounded-2xl bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border transition-all duration-200',
        glowStyles[glow],
        hoverEffect && 'hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 hover:-translate-y-0.5',
        paddingStyles[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

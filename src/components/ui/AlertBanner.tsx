import React from 'react';
import { AlertTriangle, Info, CheckCircle2, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface AlertBannerProps {
  type?: 'warning' | 'info' | 'success' | 'disclaimer';
  title?: string;
  message: string;
  className?: string;
}

export const AlertBanner: React.FC<AlertBannerProps> = ({
  type = 'warning',
  title,
  message,
  className,
}) => {
  const styles = {
    warning: 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700/60 text-amber-900 dark:text-amber-200',
    info: 'bg-blue-50 dark:bg-blue-950/40 border-blue-300 dark:border-blue-700/60 text-blue-900 dark:text-blue-200',
    success: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700/60 text-emerald-900 dark:text-emerald-200',
    disclaimer: 'bg-indigo-50/80 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800/60 text-indigo-900 dark:text-indigo-200 shadow-sm',
  };

  const icons = {
    warning: <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />,
    info: <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />,
    success: <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />,
    disclaimer: <ShieldAlert className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />,
  };

  return (
    <div
      role="alert"
      className={cn(
        'p-4 rounded-xl border flex items-start space-x-3 transition-colors',
        styles[type],
        className
      )}
    >
      {icons[type]}
      <div className="flex-1 text-xs sm:text-sm">
        {title && <h5 className="font-semibold mb-0.5 leading-snug">{title}</h5>}
        <p className="leading-relaxed">{message}</p>
      </div>
    </div>
  );
};

import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  pill?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, pill = false, className = '', type = 'text', ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-200">
            {label}
          </label>
        )}
        <input
          type={type}
          ref={ref}
          className={`w-full px-3.5 py-2.5 bg-white dark:bg-[#1e1f20] border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 focus:border-google-blue dark:focus:border-blue-500 focus:ring-1 focus:ring-google-blue/20 text-slate-900 dark:text-slate-100 ${
            pill ? 'rounded-full' : 'rounded-xl'
          } text-sm outline-none placeholder-slate-400 dark:placeholder-slate-500 disabled:opacity-50 transition-colors ${className}`}
          {...props}
        />
        {error && (
          <span className="text-xs text-google-red font-medium">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

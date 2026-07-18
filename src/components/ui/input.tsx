import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        'flex h-12 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 text-sm text-white shadow-inner shadow-black/20 outline-none placeholder:text-slate-500 transition focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/25',
        className,
      )}
      {...props}
    />
  );
});
Input.displayName = 'Input';

export { Input };

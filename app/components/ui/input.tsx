import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, hasError = false, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex w-full px-4 py-3 text-base font-body',
          'bg-bg-secondary border border-gray-700',
          'text-text-primary placeholder:text-text-tertiary',
          'transition-all duration-normal',
          'focus-visible:outline-none focus-visible:border-accent-primary focus-visible:shadow-glow',
          'hover:border-gray-600',
          'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-bg-tertiary',
          hasError && 'border-accent-error focus-visible:border-accent-error focus-visible:shadow-[0_0_20px_rgba(239,68,68,0.3)]',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input }

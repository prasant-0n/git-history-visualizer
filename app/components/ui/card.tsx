import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean
  variant?: 'default' | 'elevated' | 'glass'
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverable = false, variant = 'default', ...props }, ref) => {
    const baseStyles = 'bg-bg-secondary border border-gray-700 transition-all duration-normal rounded-lg overflow-hidden'
    
    const variantStyles = {
      default: 'shadow-md',
      elevated: 'shadow-lg',
      glass: 'glass',
    }

    const hoverStyles = hoverable ? 'hover:border-accent-primary hover:shadow-lg cursor-pointer hover-lift' : ''

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          hoverStyles,
          className
        )}
        {...props}
      />
    )
  }
)
Card.displayName = 'Card'

const CardHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('p-6 pb-4 border-b border-gray-700', className)} {...props} />
    )
  }
)
CardHeader.displayName = 'CardHeader'

const CardContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('p-6', className)} {...props} />
    )
  }
)
CardContent.displayName = 'CardContent'

const CardFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('p-6 pt-4 border-t border-gray-700', className)} {...props} />
    )
  }
)
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardContent, CardFooter }

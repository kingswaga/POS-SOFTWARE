import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, forwardedRef) => {
    const describedBy = error && id ? `${id}-error` : undefined

    // react-hook-form provides a `ref` in props; we need to merge it with the forwarded ref
    const registerRef = (props as any).ref
    // Remove the ref from props before spreading to avoid React warnings
    if ((props as any).ref) delete (props as any).ref

    const composedRef = (el: HTMLInputElement | null) => {
      if (typeof forwardedRef === 'function') forwardedRef(el)
      else if (forwardedRef && 'current' in forwardedRef) (forwardedRef as any).current = el

      if (typeof registerRef === 'function') registerRef(el)
      else if (registerRef && 'current' in registerRef) (registerRef as any).current = el
    }

    return (
      <div className="space-y-1">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <input
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(
            'w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500',
            error && 'border-red-500',
            className
          )}
          ref={composedRef}
          {...props}
        />
        {error && (
          <p id={describedBy} className="text-sm text-red-500" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'
export { Input }
import Link from 'next/link'

type Variant = 'primary' | 'outline-white' | 'outline-dark' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps {
  href?: string
  onClick?: () => void
  variant?: Variant
  size?: Size
  children: React.ReactNode
  className?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  external?: boolean
}

const variants: Record<Variant, string> = {
  primary: 'bg-olive text-white hover:bg-olive-dark',
  'outline-white': 'border-2 border-white text-white hover:bg-white hover:text-dark-olive',
  'outline-dark': 'border-2 border-dark-olive text-dark-olive hover:bg-dark-olive hover:text-white',
  ghost: 'text-olive hover:text-olive-dark underline underline-offset-4',
}

const sizes: Record<Size, string> = {
  sm: 'px-5 py-2 text-xs',
  md: 'px-8 py-3.5 text-xs',
  lg: 'px-10 py-4 text-sm',
}

const base =
  'inline-flex items-center justify-center gap-2 font-heading font-semibold tracking-wider uppercase transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0'

export default function Button({
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  type = 'button',
  disabled = false,
  external = false,
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className} ${
    disabled ? 'opacity-50 cursor-not-allowed' : ''
  }`

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {children}
        </a>
      )
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  )
}

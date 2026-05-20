interface SectionTitleProps {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  light?: boolean
}

export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  light = false,
}: SectionTitleProps) {
  return (
    <div className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <p
          className={`font-heading font-semibold text-xs tracking-widest uppercase mb-4 ${
            light ? 'text-cream/60' : 'text-olive'
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-heading font-bold text-3xl md:text-4xl lg:text-5xl leading-tight ${
          light ? 'text-white' : 'text-dark-olive'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-5 text-base md:text-lg leading-relaxed font-sans ${
            light ? 'text-cream/70' : 'text-olive'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}

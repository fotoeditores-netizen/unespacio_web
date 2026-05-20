const stats = [
  { value: '+20', unit: 'años', label: 'de experiencia\ncombinada' },
  { value: '6', unit: 'tipologías', label: 'de arquitectura\nespecializada' },
  { value: '41K', unit: 'm²', label: 'proyecto de\nmayor escala' },
  { value: '2021', unit: '', label: 'año de\nfundación' },
]

export default function StatsSection() {
  return (
    <div className="bg-dark-olive">
      <div className="container-custom">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/8 divide-y lg:divide-y-0">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="px-8 py-10 lg:py-12 group hover:bg-dark-olive-light transition-colors duration-300"
            >
              <div className="flex items-end gap-1.5 mb-3">
                <span className="font-heading font-bold text-4xl lg:text-5xl text-white leading-none">
                  {stat.value}
                </span>
                {stat.unit && (
                  <span className="font-heading font-semibold text-sm text-olive mb-1">
                    {stat.unit}
                  </span>
                )}
              </div>
              <p className="font-sans text-xs text-cream/40 leading-relaxed whitespace-pre-line">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

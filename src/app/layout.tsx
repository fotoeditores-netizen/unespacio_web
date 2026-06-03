import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'UnEspacio Arquitectos | Diseñamos los lugares donde ocurre la vida',
    template: '%s | UnEspacio Arquitectos',
  },
  description:
    'Firma de arquitectura fundada por Laura Maya y Juan Esteban Ramírez. Más de 20 años de experiencia combinada en arquitectura educativa, corporativa, cultural, de salud, comercial y residencial.',
  keywords: [
    'arquitectura',
    'diseño arquitectónico',
    'arquitectura educativa',
    'arquitectura corporativa',
    'UnEspacio Arquitectos',
    'Laura Maya',
    'Juan Esteban Ramírez',
  ],
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    siteName: 'UnEspacio Arquitectos',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Montserrat:wght@600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}


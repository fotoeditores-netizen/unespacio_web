import createImageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { client } from './client'

const builder = createImageUrlBuilder(client)

/**
 * Genera URL optimizada de imagen desde Sanity CDN.
 * Uso: urlFor(image).width(800).auto('format').url()
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

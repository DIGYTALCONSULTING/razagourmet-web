import fs from 'fs/promises'
import path from 'path'
import sharp from 'sharp'

const rootDir = path.resolve(import.meta.dirname, '..')
const productsDir = path.join(rootDir, 'public/images/products')
const publicImagesDir = path.join(rootDir, 'public/images')

const jobs = [
  [path.join(productsDir, 'hero_dog.webp'), path.join(productsDir, 'hero_dog-640.webp'), 640, 70],
  [path.join(productsDir, 'hero_dog_siberiano.webp'), path.join(productsDir, 'hero_dog_siberiano-640.webp'), 640, 70],
  [path.join(productsDir, 'gato_banner.webp'), path.join(productsDir, 'gato_banner-640.webp'), 640, 70],
  [path.join(publicImagesDir, 'logo_site_header.webp'), path.join(publicImagesDir, 'logo_site_header-small.webp'), 220, 78]
]

await fs.mkdir(productsDir, { recursive: true })

for (const [input, output, width, quality] of jobs) {
  await sharp(input)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality, effort: 6 })
    .toFile(output)
}

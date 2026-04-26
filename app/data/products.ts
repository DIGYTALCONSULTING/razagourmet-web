export type ProductCategory = 'galletas' | 'helados' | 'otros'

export interface ProductVariant {
  id: string
  name: string
  price: number
  unitLabel: string
}

export interface Product {
  id: string
  category: ProductCategory
  name: string
  image: string
  description: string
  bestFor: string
  highlights: string[]
  variants: ProductVariant[]
}

export const productCategories: Array<{ id: ProductCategory | 'todos'; label: string }> = [
  { id: 'todos', label: 'Todos' },
  { id: 'galletas', label: 'Galletas' },
  { id: 'helados', label: 'Helados' },
  { id: 'otros', label: 'Otros productos' }
]

export const products: Product[] = [
  {
    id: 'galleta-pollo',
    category: 'galletas',
    name: 'Galletas Horno Casero',
    image: '/images/products/galletas-horno-casero.svg',
    description: 'Snacks horneados con textura crocante para consentir sin complicarte.',
    bestFor: 'Premios diarios y paseos',
    highlights: ['Horneadas', 'Textura crocante', 'Porciones prácticas'],
    variants: [
      { id: 'bolsa-120g', name: 'Bolsa 120 g', price: 18000, unitLabel: 'bolsa' },
      { id: 'bolsa-250g', name: 'Bolsa 250 g', price: 32000, unitLabel: 'bolsa' }
    ]
  },
  {
    id: 'galleta-mixta',
    category: 'galletas',
    name: 'Bites de Avena y Zanahoria',
    image: '/images/products/bites-avena-zanahoria.svg',
    description: 'Bocados pequeños para entrenamiento, rutinas de recompensa y snacks rápidos.',
    bestFor: 'Entrenamiento y recompensa',
    highlights: ['Tamaño mini', 'Fácil de llevar', 'Formato práctico'],
    variants: [
      { id: 'frasco-90g', name: 'Frasco 90 g', price: 16000, unitLabel: 'frasco' },
      { id: 'frasco-180g', name: 'Frasco 180 g', price: 28000, unitLabel: 'frasco' }
    ]
  },
  {
    id: 'helado-yogurt',
    category: 'helados',
    name: 'Heladitos Gourmet',
    image: '/images/products/heladitos-gourmet.svg',
    description: 'Snack frío para días calurosos o momentos especiales, listo para servir.',
    bestFor: 'Días calurosos y celebración',
    highlights: ['Porción individual', 'Momento especial', 'Listo para servir'],
    variants: [
      { id: 'pack-4', name: 'Pack x4', price: 24000, unitLabel: 'pack' },
      { id: 'pack-8', name: 'Pack x8', price: 44000, unitLabel: 'pack' }
    ]
  },
  {
    id: 'mix-fiesta',
    category: 'otros',
    name: 'Box Celebración',
    image: '/images/products/box-celebracion.svg',
    description: 'Selección surtida para regalos, cumpleaños y fechas especiales.',
    bestFor: 'Regalos y cumpleaños',
    highlights: ['Presentación premium', 'Para regalo', 'Selección surtida'],
    variants: [
      { id: 'box-mini', name: 'Box Mini', price: 39000, unitLabel: 'box' },
      { id: 'box-completa', name: 'Box Completa', price: 69000, unitLabel: 'box' }
    ]
  }
]

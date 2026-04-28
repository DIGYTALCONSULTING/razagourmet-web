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
  { id: 'otros', label: 'Especiales' }
]

export const products: Product[] = [
  {
    id: 'galleta-proteina',
    category: 'galletas',
    name: 'Galletas de proteina',
    image: '/images/products/galletas_proteina.webp',
    description: 'Antioxidante y fuente de ácidos grasos Omega 6. Ideales si tienes un perro nervioso debidoa que son un calmante natural.',
    bestFor: 'Comida diara y premio',
    highlights: ['Pollo', 'Hígado', 'Remolacha','Jengibre'],
    variants: [
      { id: 'paquete-240g', name: 'Paquete 240 g', price: 9000, unitLabel: 'paquete' },
      { id: 'paquete-480g', name: 'Paquete 480 g', price: 18000, unitLabel: 'paquete' }
    ]
  },
  {
    id: 'galleta-frutas',
    category: 'galletas',
    name: 'Galletas de frutas',
    image: '/images/products/galletas_frutas_.webp',
    description: 'Fuente de fibra, ayudaa mantener niveles de colesterol bajos, previene enfermedades cardíacas, otorga más brillo a su pelaje.',
    bestFor: 'Comida diaria,Entrenamiento y Recompensa',
    highlights: ['Manzana', 'Canela', 'Abano', 'Coco'],
    variants: [
        { id: 'paquete-240g', name: 'Paquete 240 g', price: 9000, unitLabel: 'paquete' },
      { id: 'paquete-480g', name: 'Paquete 480 g', price: 18000, unitLabel: 'paquete' }
    ]
  },
  {
    id: 'helado-proteina',
    category: 'helados',
    name: 'Helados de Proteína',
    image: '/images/products/paletas_proteina.webp',
    description: 'Antioxidante y fuente de ácidos grasos Omega 6. Vitaminas A y B, hierroy cobre. Mantiene los huesos, piel y pelaje sanos',
    bestFor: 'Días calurosos y celebración',
    highlights: ['Pollo', 'Hígado', 'Remolacha','Jengibre'],
    variants: [
      { id: 'pequeño', name: 'Pequeño 15g', price: 2000, unitLabel: 'pack' },
      { id: 'mediano', name: 'Mediano 25g', price: 3000, unitLabel: 'pack' },
      { id: 'grande', name: 'Grande 50g', price: 5000, unitLabel: 'pack' },
    ]
  },
{
    id: 'helado-frutas',
    category: 'helados',
    name: 'Helados de Frutas',
    image: '/images/products/paletas_fruta.webp',
    description: 'Refrescante, contiene vitaminas A, E y C, fibra dietética, aporta a la visión y la piel, mejora la digestión e inflamación',
    bestFor: 'Días calurosos y celebración',
    highlights: ['Mango', 'Arándanos', 'Melón','Hierbabuena'],
    variants: [
      { id: 'pequeño', name: 'Pequeño 15g', price: 2000, unitLabel: 'pack' },
      { id: 'mediano', name: 'Mediano 25g', price: 3000, unitLabel: 'pack' },
      { id: 'grande', name: 'Grande 50g', price: 5000, unitLabel: 'pack' },
    ]
  },
  {
    id: 'Brownies',
    category:'otros',
    name: 'Brownies',
    image: '/images/products/brownies.webp',
    description: 'Es una excelente fuente de nutrientes, rica en ácido pantoténico, hierro, zinc, proteínas, vitaminas y minerales. Ayuda a combatir el estrés, promover la producción de glóbulosrojos y prevenir la anemia.',
    bestFor: 'Regalos y cumpleaños',
    highlights: ['ingrediente 1', 'ingrediente 2', 'Ingrediente 3'],
    variants: [
      { id: 'medianos', name: 'Mediano 120 gr', price: 4000, unitLabel: 'box' },
      { id: 'grandes', name: 'Grande 230 gr', price: 5500, unitLabel: 'box' }
    ]
  },
{
    id: 'Gimitas de Colageno',
    category: 'otros',
    name: 'Gimitas de Colageno',
    image: '/images/products/gomitas.webp',
    description: 'Fuente natural de carbohidratos, vitaminas y minerales, beneficia la salud cardiovascular, ocular y dental.',
    bestFor: 'Snacks y Regalo de cumpleaños',
    highlights: ['ingrediente 1', 'ingrediente 2', 'Ingrediente 3'],
    variants: [
      { id: 'pequeña', name: 'Mediano 120 gr', price: 1000, unitLabel: 'box' },
      { id: 'grandes', name: 'Grande 230 gr', price: 2500, unitLabel: 'box' }
    ]
  },
  {
    id: 'Tortas',
    category: 'otros',
    name: 'Tortas',
    image: '/images/products/tortas.webp',
    description: 'Contienen aminoácidos esenciales, recupera tejidos, el pelo, los músculos y tendones. Vitaminas minerales y nutrientes esenciales..',
    bestFor: 'Regalos y cumpleaños',
    highlights: ['ingrediente 1', 'ingrediente 2', 'Ingrediente 3'],
    variants: [
      { id: 'pequeñas', name: 'Pequeña 180 gr', price: 25000, unitLabel: 'box' },
      { id: 'medianas', name: 'Mediana 250 gr', price: 50000, unitLabel: 'box' },
      { id: 'grandes', name: 'Grande 500 gr', price: 80000, unitLabel: 'box' }
    ]
  }
]

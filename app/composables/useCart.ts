import type { Product, ProductVariant } from '../data/products'

export interface CartItem {
  key: string
  productId: string
  productName: string
  productImage: string
  variantId: string
  variantName: string
  unitLabel: string
  price: number
  quantity: number
}

export const useCart = () => {
  const items = useState<CartItem[]>('cart-items', () => [])

  const totalItems = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  )

  const subtotal = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  )

  const addItem = (product: Product, variant: ProductVariant, quantity = 1) => {
    const key = `${product.id}:${variant.id}`
    const existing = items.value.find(item => item.key === key)

    if (existing) {
      existing.quantity += quantity
      return
    }

    items.value.push({
      key,
      productId: product.id,
      productName: product.name,
      productImage: product.image,
      variantId: variant.id,
      variantName: variant.name,
      unitLabel: variant.unitLabel,
      price: variant.price,
      quantity
    })
  }

  const updateQuantity = (key: string, quantity: number) => {
    const item = items.value.find(entry => entry.key === key)

    if (!item) {
      return
    }

    if (quantity <= 0) {
      items.value = items.value.filter(entry => entry.key !== key)
      return
    }

    item.quantity = quantity
  }

  const removeItem = (key: string) => {
    items.value = items.value.filter(item => item.key !== key)
  }

  const clearCart = () => {
    items.value = []
  }

  return {
    items,
    totalItems,
    subtotal,
    addItem,
    updateQuantity,
    removeItem,
    clearCart
  }
}

<script setup lang="ts">
import ProductCard from '../shop/ProductCard.vue'
import ProductFilters from '../shop/ProductFilters.vue'
import { productCategories, products } from '../../data/products'
import type { Product, ProductCategory } from '../../data/products'

const emit = defineEmits<{
  added: []
}>()

const selectedCategory = ref<ProductCategory | 'todos'>('todos')
const { addItem } = useCart()

const filteredProducts = computed(() => {
  if (selectedCategory.value === 'todos') {
    return products
  }

  return products.filter(product => product.category === selectedCategory.value)
})

const handleAdd = (payload: { product: Product; variantId: string; quantity: number }) => {
  const variant = payload.product.variants.find(item => item.id === payload.variantId)

  if (!variant) {
    return
  }

  addItem(payload.product, variant, payload.quantity)
  emit('added')
}
</script>

<template>
  <section id="catalogo" class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
    <div class="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(20rem,0.55fr)] lg:items-end">
      <div>
        <p class="text-sm font-black uppercase tracking-[0.22em] text-amber-700">Catálogo</p>
        <h2 class="mt-3 max-w-3xl text-3xl font-black tracking-tight text-stone-950 sm:text-4xl lg:text-5xl">
          Elige productos, arma tu carrito y envía el pedido listo a ventas.
        </h2>
        <p class="mt-4 max-w-2xl text-base leading-7 text-stone-700">
          Cada precio es una referencia comercial. El equipo confirma disponibilidad, cobertura, forma de pago y recomendaciones antes de cerrar.
        </p>
      </div>

      <div class="rounded-[1.5rem] border border-amber-100 bg-amber-50 p-4 text-sm leading-6 text-stone-700">
        <strong class="block text-stone-950">Compra asistida, no impersonal.</strong>
        Tu pedido llega con datos de contacto para que la fuerza de ventas responda rápido y sin perder contexto.
      </div>
    </div>

    <div class="mt-8">
      <ProductFilters
        v-model="selectedCategory"
        :categories="productCategories"
      />
    </div>

    <div class="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
        @add="handleAdd"
      />
    </div>
  </section>
</template>

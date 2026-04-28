<script setup lang="ts">
import type { Product } from '../../data/products'

const props = defineProps<{
  product: Product
}>()

const emit = defineEmits<{
  add: [payload: { product: Product; variantId: string; quantity: number }]
}>()

const selectedVariantId = ref(props.product.variants[0]?.id ?? '')
const quantity = ref(1)
const assetPath = useAssetPath()

const selectedVariant = computed(
  () => props.product.variants.find(variant => variant.id === selectedVariantId.value) ?? props.product.variants[0]
)

const imagePositionClass = computed(() =>
  props.product.category === 'helados' ? 'object-top' : 'object-center'
)

const formatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0
})

const increase = () => {
  quantity.value += 1
}

const decrease = () => {
  quantity.value = Math.max(1, quantity.value - 1)
}

const submit = () => {
  if (!selectedVariant.value) {
    return
  }

  emit('add', {
    product: props.product,
    variantId: selectedVariant.value.id,
    quantity: quantity.value
  })
}
</script>

<template>
  <article class="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
    <div class="relative overflow-hidden bg-amber-50">
      <img
        :src="assetPath(product.image)"
        :alt="`Producto ${product.name} de Raza & Gourmet`"
        :class="['h-52 w-full object-cover transition duration-500 group-hover:scale-105', imagePositionClass]"
        loading="lazy"
      >
      <div class="absolute left-3 top-3 rounded-full bg-white/92 px-3 py-1 text-[0.68rem] font-black uppercase tracking-[0.16em] text-stone-700 shadow-sm">
        {{ product.category }}
      </div>
    </div>

    <div class="flex flex-1 flex-col gap-4 p-4">
      <div>
        <h3 class="text-lg font-black leading-snug text-stone-950">{{ product.name }}</h3>
        <p class="mt-2 text-justify text-sm leading-5 text-stone-600">{{ product.description }}</p>
        <div class="mt-3 rounded-2xl bg-stone-100 px-3 py-2 text-stone-700">
          <p class="text-[0.65rem] font-black uppercase tracking-[0.16em] text-stone-500">Ideal para</p>
          <p class="mt-1 text-sm font-semibold leading-snug">{{ product.bestFor }}</p>
        </div>
      </div>

      <ul class="flex flex-wrap gap-1.5 text-[0.68rem] font-bold text-stone-700">
        <li
          v-for="highlight in product.highlights"
          :key="highlight"
          class="rounded-full bg-amber-50 px-2 py-1 text-amber-900"
        >
          {{ highlight }}
        </li>
      </ul>

      <div class="mt-auto space-y-4">
        <label class="block">
          <span class="mb-2 block text-sm font-bold text-stone-800">Formato</span>
          <select
            v-model="selectedVariantId"
            class="w-full rounded-2xl border border-stone-300 bg-stone-50 px-4 py-3 text-sm font-semibold text-stone-900 outline-none transition focus:border-stone-900"
          >
            <option
              v-for="variant in product.variants"
              :key="variant.id"
              :value="variant.id"
            >
              {{ variant.name }} · {{ formatter.format(variant.price) }}
            </option>
          </select>
        </label>

        <div class="flex items-end justify-between gap-3">
          <div>
            <span class="mb-2 block text-sm font-bold text-stone-800">Cantidad</span>
            <div class="flex h-12 items-center rounded-2xl border border-stone-300 bg-stone-50 p-1">
              <button type="button" class="grid h-10 w-10 place-items-center rounded-xl bg-white text-lg font-black text-stone-900 shadow-sm" @click="decrease">
                -
              </button>
              <span class="min-w-10 text-center text-sm font-black text-stone-950">{{ quantity }}</span>
              <button type="button" class="grid h-10 w-10 place-items-center rounded-xl bg-white text-lg font-black text-stone-900 shadow-sm" @click="increase">
                +
              </button>
            </div>
          </div>

          <div class="text-right">
            <p class="text-xs font-bold uppercase tracking-[0.16em] text-stone-500">Desde</p>
            <p class="text-xl font-black text-stone-950">
              {{ selectedVariant ? formatter.format(selectedVariant.price) : '' }}
            </p>
          </div>
        </div>

        <button
          type="button"
          class="w-full rounded-2xl bg-stone-950 px-5 py-3.5 text-sm font-black text-white transition hover:bg-amber-500 hover:text-stone-950"
          @click="submit"
        >
          Agregar y revisar pedido
        </button>
      </div>
    </div>
  </article>
</template>

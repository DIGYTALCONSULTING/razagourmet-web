<script setup lang="ts">
import type { ProductCategory } from '../../data/products'

defineProps<{
  modelValue: ProductCategory | 'todos'
  categories: Array<{ id: ProductCategory | 'todos'; label: string }>
}>()

defineEmits<{
  'update:modelValue': [value: ProductCategory | 'todos']
}>()
</script>

<template>
  <div class="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible">
    <button
      v-for="category in categories"
      :key="category.id"
      type="button"
      class="shrink-0 rounded-2xl border px-4 py-2.5 text-sm font-black transition"
      :class="
        modelValue === category.id
          ? 'border-amber-500 bg-amber-500 text-stone-950'
          : 'border-stone-300 bg-white text-stone-700 hover:border-stone-900 hover:text-stone-950'
      "
      @click="$emit('update:modelValue', category.id)"
    >
      {{ category.label }}
    </button>
  </div>
</template>

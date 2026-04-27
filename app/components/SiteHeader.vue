<script setup lang="ts">
import { siteData } from '../data/site'

defineProps<{
  cartCount: number
}>()

defineEmits<{
  openCart: []
}>()

const isMenuOpen = ref(false)
const { whatsappUrl } = useWhatsAppOrder()
const assetPath = useAssetPath()

watch(isMenuOpen, value => {
  if (import.meta.client) {
    document.body.style.overflow = value ? 'hidden' : ''
  }
})

onBeforeUnmount(() => {
  if (import.meta.client) {
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <header class="sticky top-0 z-40 bg-[#fffaf4]/92 backdrop-blur-xl">
    <div class="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
      <a href="#inicio" class="flex min-w-0 items-center gap-3" @click="isMenuOpen = false">
        <img :src="assetPath('/images/logo_site_header-small.webp')" alt="Raza & Gourmet" class="h-12 w-auto sm:h-14" />
      </a>

      <nav class="hidden items-center gap-6 lg:flex">
        <a
          v-for="item in siteData.navigation"
          :key="item.href"
          :href="item.href"
          class="text-sm font-bold text-stone-600 transition hover:text-stone-950"
        >
          {{ item.label }}
        </a>
      </nav>

      <div class="flex items-center gap-2">
        <a
          :href="whatsappUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="hidden rounded-2xl bg-emerald-700 px-4 py-2.5 text-sm font-black text-white transition hover:bg-emerald-600 sm:inline-flex"
        >
          WhatsApp
        </a>
        <button
          type="button"
          class="inline-flex min-h-11 items-center gap-2 rounded-2xl bg-stone-950 px-4 py-2 text-sm font-black text-white transition hover:bg-amber-500 hover:text-stone-950"
          @click="$emit('openCart')"
        >
          Carrito
          <span class="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-white/15 px-2 text-xs">
            {{ cartCount }}
          </span>
        </button>
        <button
          type="button"
          class="grid h-11 w-11 place-items-center rounded-2xl border border-stone-200 bg-white text-stone-950 lg:hidden"
          :aria-label="isMenuOpen ? 'Cerrar menú' : 'Abrir menú'"
          :aria-expanded="isMenuOpen"
          @click="isMenuOpen = !isMenuOpen"
        >
          <span class="grid gap-1.5">
            <span class="block h-0.5 w-5 bg-current transition" :class="isMenuOpen ? 'translate-y-2 rotate-45' : ''" />
            <span class="block h-0.5 w-5 bg-current transition" :class="isMenuOpen ? 'opacity-0' : ''" />
            <span class="block h-0.5 w-5 bg-current transition" :class="isMenuOpen ? '-translate-y-2 -rotate-45' : ''" />
          </span>
        </button>
      </div>
    </div>

    <div v-if="isMenuOpen" class="border-t border-stone-200 bg-[#fffaf4] px-4 py-4 shadow-xl lg:hidden">
      <nav class="grid gap-2">
        <a
          v-for="item in siteData.navigation"
          :key="item.href"
          :href="item.href"
          class="rounded-2xl bg-white px-4 py-3 text-base font-black text-stone-900 shadow-sm"
          @click="isMenuOpen = false"
        >
          {{ item.label }}
        </a>
        <a
          :href="whatsappUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="rounded-2xl bg-emerald-700 px-4 py-3 text-center text-base font-black text-white"
          @click="isMenuOpen = false"
        >
          Pedir por WhatsApp
        </a>
      </nav>
    </div>
  </header>
</template>

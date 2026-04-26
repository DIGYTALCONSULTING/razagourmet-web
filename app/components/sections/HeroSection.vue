<script setup lang="ts">
import { siteData } from '../../data/site'

const heroSlides = [
  {
    image: '/images/products/hero_dog-640.webp',
    alt: 'Perro con snack de Raza & Gourmet',
    title: 'Premios naturales para todos los días',
    label: 'Favoritos',
    width: 399,
    height: 399,
    objectPosition: '50% 50%'
  },
  {
    image: '/images/products/gato_banner-640.webp',
    alt: 'Gato junto a producto gourmet para mascotas',
    title: 'Heladitos y snacks para momentos especiales',
    label: 'Refrescantes',
    width: 640,
    height: 365,
    objectPosition: '78% 50%'
  },
  {
    image: '/images/products/hero_dog_siberiano-640.webp',
    alt: 'Perro siberiano con detalle de celebración',
    title: 'Boxes para celebrar con tu mascota',
    label: 'Celebración',
    width: 300,
    height: 450,
    objectPosition: '50% 50%'
  }
] as const

const activeSlide = ref(0)
let autoplayInterval: ReturnType<typeof setInterval> | null = null
const activeHeroSlide = computed(() => heroSlides[activeSlide.value] ?? heroSlides[0])

const startAutoplay = () => {
  stopAutoplay()
  autoplayInterval = setInterval(() => {
    activeSlide.value = (activeSlide.value + 1) % heroSlides.length
  }, 4800)
}

const stopAutoplay = () => {
  if (autoplayInterval) {
    clearInterval(autoplayInterval)
    autoplayInterval = null
  }
}

onMounted(startAutoplay)
onBeforeUnmount(stopAutoplay)
</script>

<template>
  <section id="inicio" class="relative overflow-hidden bg-[#fffaf4]">
    <div class="absolute inset-x-0 top-0 h-32 bg-[linear-gradient(180deg,#f5e2bd_0%,rgba(255,250,244,0)_100%)]" />

    <div class="relative mx-auto grid max-w-7xl gap-8 px-4 pb-12 pt-8 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12 lg:px-8 lg:pb-20 lg:pt-14">
      <div class="flex flex-col justify-center">
        <div class="inline-flex w-fit items-center gap-2 rounded-full border border-amber-200 bg-white/80 px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-amber-800 shadow-sm">
          <span class="h-2 w-2 rounded-full bg-emerald-500" />
          {{ siteData.coverage }}
        </div>

        <h1 class="mt-5 max-w-2xl text-4xl font-black leading-[1.03] tracking-tight text-stone-950 sm:text-5xl lg:text-6xl">
          Snacks naturales para consentir a tu mascota sin complicarte.
        </h1>

        <p class="mt-5 max-w-xl text-base leading-7 text-stone-700 sm:text-lg">
          Galletas, heladitos y detalles gourmet para perros y gatos. Arma tu pedido, envíalo al equipo de ventas y confirma disponibilidad por WhatsApp.
        </p>

        <div class="mt-7 grid gap-3 sm:grid-cols-[auto_auto] sm:justify-start">
          <a
            href="#catalogo"
            class="inline-flex min-h-12 items-center justify-center rounded-2xl bg-stone-950 px-6 py-3 text-sm font-black text-white shadow-[0_18px_40px_rgba(28,25,23,0.18)] transition hover:-translate-y-0.5 hover:bg-amber-500 hover:text-stone-950"
          >
            {{ siteData.primaryCta }}
          </a>
          <a
            href="#proceso"
            class="inline-flex min-h-12 items-center justify-center rounded-2xl border border-stone-300 bg-white px-6 py-3 text-sm font-black text-stone-800 transition hover:-translate-y-0.5 hover:border-stone-950"
          >
            Cómo comprar
          </a>
        </div>

        <ul class="mt-7 grid gap-3 text-sm text-stone-700 sm:grid-cols-3">
          <li
            v-for="item in siteData.salesHighlights"
            :key="item"
            class="rounded-2xl border border-stone-200 bg-white/85 p-4 shadow-sm"
          >
            <span class="mb-3 block h-1.5 w-8 rounded-full bg-amber-500" />
            {{ item }}
          </li>
        </ul>

        <dl class="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
          <div
            v-for="stat in siteData.heroStats"
            :key="stat.label"
            class="rounded-2xl border border-amber-100 bg-amber-50/80 px-3 py-4 text-center"
          >
            <dt class="text-[0.62rem] font-bold uppercase tracking-[0.12em] text-stone-500">{{ stat.label }}</dt>
            <dd class="mt-1 text-sm font-black text-stone-950 sm:text-base">{{ stat.value }}</dd>
          </div>
        </dl>
      </div>

      <div class="relative min-h-[30rem] lg:min-h-[38rem]">
        <div class="absolute -right-10 top-8 h-40 w-40 rounded-full bg-amber-300/40 blur-3xl" />
        <div class="absolute -bottom-8 left-4 h-44 w-44 rounded-full bg-emerald-200/50 blur-3xl" />

        <div class="relative h-full overflow-hidden rounded-[2rem] border border-white/70 bg-[#c99a39] shadow-[0_30px_80px_rgba(89,56,12,0.24)]">
          <article class="absolute inset-0">
            <img
              :src="activeHeroSlide.image"
              :alt="activeHeroSlide.alt"
              :width="activeHeroSlide.width"
              :height="activeHeroSlide.height"
              sizes="(min-width: 1024px) 54vw, 100vw"
              class="h-full w-full object-cover"
              :style="{ objectPosition: activeHeroSlide.objectPosition }"
              fetchpriority="high"
              decoding="async"
            >
            <div class="absolute inset-0 bg-[linear-gradient(180deg,rgba(28,25,23,0.04)_0%,rgba(28,25,23,0.12)_42%,rgba(28,25,23,0.82)_100%)]" />
            <div class="absolute inset-x-4 bottom-4 rounded-[1.5rem] border border-white/20 bg-stone-950/62 p-5 text-white shadow-2xl backdrop-blur-md sm:inset-x-6 sm:bottom-6 sm:p-6">
              <p class="text-xs font-black uppercase tracking-[0.2em] text-amber-200">{{ activeHeroSlide.label }}</p>
              <h2 class="mt-2 max-w-md text-2xl font-black leading-tight sm:text-3xl">{{ activeHeroSlide.title }}</h2>
              <a href="#catalogo" class="mt-4 inline-flex rounded-xl bg-white px-4 py-2 text-sm font-black text-stone-950 transition hover:bg-amber-200">
                Ver productos
              </a>
            </div>
          </article>
        </div>

        <div class="absolute right-4 top-4 flex gap-2">
          <button
            v-for="(slide, index) in heroSlides"
            :key="`${slide.image}-dot`"
            type="button"
            class="grid h-7 w-7 place-items-center rounded-full bg-stone-950/20 transition hover:bg-stone-950/35"
            :aria-label="`Ver imagen ${index + 1}`"
            @click="activeSlide = index"
          >
            <span
              class="h-2.5 rounded-full bg-white/90 transition-all"
              :class="activeSlide === index ? 'w-4' : 'w-2.5 opacity-70'"
            />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

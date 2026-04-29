<script setup lang="ts">
import { siteData } from '../../data/site'
import { useScrollAnimation } from '../../../composables/useScrollAnimation'

const heroSlides = [
  {
    image: '/images/products/hero_dog-640.webp',
    alt: 'Perro con snack de Raza & Gourmet',
    title: 'Premios naturales para todos los días',
    label: 'Favoritos',
    width: 399,
    height: 399,
    objectPosition: '50% 50%',
    imageClass: 'object-cover'
  },
  {
    image: '/images/products/gato_banner.webp',
    alt: 'Gato junto a producto gourmet para mascotas',
    title: 'Helados para premiar a tu peludito ',
    label: 'Refrescantes',
    width: 661,
    height: 377,
    objectPosition: '50% 50%',
    imageClass: 'object-contain scale-90 lg:scale-100 xl:scale-105'
  },
  {
    image: '/images/products/hero_dog_siberiano-640.webp',
    alt: 'Perro siberiano con detalle de celebración',
    title: 'Tortas para celebrar con tu peludito',
    label: 'Celebración',
    width: 300,
    height: 450,
    objectPosition: '50% 50%',
    imageClass: 'object-cover'
  }
] as const

const activeSlide = ref(0)
let autoplayInterval: ReturnType<typeof setInterval> | null = null
const assetPath = useAssetPath()
const activeHeroSlide = computed(() => heroSlides[activeSlide.value] ?? heroSlides[0])

const sectionRef = ref<HTMLElement | null>(null)
useScrollAnimation(sectionRef, 'animate-fade-in-up')

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

    <div ref="sectionRef" class="relative mx-auto grid max-w-7xl gap-6 px-4 pb-10 pt-4 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10 lg:px-8 lg:pb-10 lg:pt-6 opacity-0 translate-y-8">
      <div class="flex flex-col justify-center">
        <div class="inline-flex w-fit items-center gap-2 rounded-full border border-amber-200 bg-white/80 px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-amber-800 shadow-sm">
          <span class="h-2 w-2 rounded-full bg-emerald-500" />
          {{ siteData.coverage }}
        </div>

        <h1 class="mt-4 text-4xl font-black leading-[1.02] tracking-tight text-stone-950 sm:text-5xl lg:text-[3.25rem] xl:text-[3.5rem]">
          Comida y Snacks 100% naturales para consentir a tu mascota sin complicarte.
        </h1>

        <p class="mt-4 max-w-xl text-base leading-7 text-stone-700 sm:text-lg lg:text-base">
          Galletas, Helados, Brownies, Tortas y detalles gourmet para perros y gatos. Arma tu pedido, envíalo al equipo de ventas y confirma disponibilidad por WhatsApp.
        </p>

        <div class="mt-5 grid gap-3 sm:grid-cols-[auto_auto] sm:justify-start">
          <a
            href="#catalogo"
            class="inline-flex min-h-12 items-center justify-center rounded-2xl bg-stone-950 px-6 py-3 text-sm font-black text-white shadow-[0_18px_40px_rgba(28,25,23,0.18)] transition hover:-translate-y-0.5 hover:bg-amber-500 hover:text-stone-950 hover-glow"
          >
            {{ siteData.primaryCta }}
          </a>
          <a
            href="#proceso"
            class="inline-flex min-h-12 items-center justify-center rounded-2xl border border-stone-300 bg-white px-6 py-3 text-sm font-black text-stone-800 transition hover:-translate-y-0.5 hover:border-stone-950 hover-lift"
          >
            Cómo comprar
          </a>
        </div>

        <ul class="mt-5 grid gap-3 text-sm text-stone-700 sm:grid-cols-3">
          <li
            v-for="item in siteData.salesHighlights"
            :key="item"
            class="rounded-2xl border border-stone-200 bg-white/85 p-3 shadow-sm"
          >
            <span class="mb-2 block h-1.5 w-8 rounded-full bg-amber-500" />
            {{ item }}
          </li>
        </ul>

        <dl class="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
          <div
            v-for="stat in siteData.heroStats"
            :key="stat.label"
            class="rounded-2xl border border-amber-100 bg-amber-50/80 px-3 py-3 text-center"
          >
            <dt class="text-[0.62rem] font-bold uppercase tracking-[0.12em] text-stone-500">{{ stat.label }}</dt>
            <dd class="mt-1 text-sm font-black text-stone-950 sm:text-base">{{ stat.value }}</dd>
          </div>
        </dl>
      </div>

      <div class="relative min-h-[22rem] lg:min-h-[34rem] lg:max-w-[30rem]">
        <div class="absolute -right-10 top-8 h-40 w-40 rounded-full bg-amber-300/40 blur-3xl" />
        <div class="absolute -bottom-8 left-4 h-44 w-44 rounded-full bg-emerald-200/50 blur-3xl" />

        <div class="relative h-full overflow-hidden rounded-[2rem] border border-white/70 bg-[#c99a39] shadow-[0_30px_80px_rgba(89,56,12,0.24)]">
          <article class="absolute inset-0">
            <img
              :src="assetPath(activeHeroSlide.image)"
              :alt="activeHeroSlide.alt"
              :width="activeHeroSlide.width"
              :height="activeHeroSlide.height"
              sizes="(min-width: 1024px) 38vw, 100vw"
              class="h-full w-full"
              :class="activeHeroSlide.imageClass"
              :style="{ objectPosition: activeHeroSlide.objectPosition }"
              fetchpriority="high"
              decoding="async"
            >
            <div class="absolute inset-0 bg-[linear-gradient(180deg,rgba(28,25,23,0.04)_0%,rgba(28,25,23,0.12)_42%,rgba(28,25,23,0.82)_100%)]" />
            <div class="absolute inset-x-4 bottom-4 rounded-[1.5rem] border border-white/20 bg-stone-950/62 p-4 text-white shadow-2xl backdrop-blur-md sm:inset-x-5 sm:bottom-5">
              <p class="text-xs font-black uppercase tracking-[0.2em] text-amber-200">{{ activeHeroSlide.label }}</p>
              <h2 class="mt-2 max-w-md text-xl font-black leading-tight sm:text-2xl">{{ activeHeroSlide.title }}</h2>
              <a href="#catalogo" class="mt-3 inline-flex rounded-xl bg-white px-4 py-2 text-sm font-black text-stone-950 transition hover:bg-amber-200">
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

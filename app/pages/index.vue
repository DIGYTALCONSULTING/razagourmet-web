<script setup lang="ts">
import HeroSection from '../components/sections/HeroSection.vue'
import BenefitsSection from '../components/sections/BenefitsSection.vue'
import ProductsSection from '../components/sections/ProductsSection.vue'
import TrustSection from '../components/sections/TrustSection.vue'
import ProcessSection from '../components/sections/ProcessSection.vue'
import FaqSection from '../components/sections/FaqSection.vue'
import ContactSection from '../components/sections/ContactSection.vue'
import CartDrawer from '../components/shop/CartDrawer.vue'
import { siteData } from '../data/site'

const { totalItems } = useCart()
const config = useRuntimeConfig()
const isCartOpen = ref(false)
const cartCount = computed(() => totalItems.value)

const siteUrl = String(config.public.siteUrl || '').replace(/\/$/, '')
const canonicalUrl = siteUrl ? `${siteUrl}/` : ''
const heroImage = siteUrl ? `${siteUrl}/images/products/hero_dog.webp` : '/images/products/hero_dog.webp'

const openCart = () => {
  isCartOpen.value = true
}

const jsonLd: Array<Record<string, unknown>> = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteData.brand,
    url: canonicalUrl || '/',
    logo: siteUrl ? `${siteUrl}/images/logo_site_header.webp` : '/images/logo_site_header.webp',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: String(config.public.whatsappNumber),
        contactType: 'customer support',
        areaServed: 'CO',
        availableLanguage: ['es']
      }
    ]
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteData.brand,
    url: canonicalUrl || '/',
    description: siteData.description,
    inLanguage: 'es-CO'
  }
]

useSeoMeta({
  title: 'Raza & Gourmet | Snacks naturales y detalles para mascotas',
  description:
    'Snacks naturales, heladitos y detalles gourmet para perros y gatos. Arma tu pedido y confirma disponibilidad por WhatsApp.',
  ogTitle: 'Raza & Gourmet | Snacks naturales y detalles para mascotas',
  ogDescription:
    'Descubre galletas, heladitos y boxes para mascotas con pedido asistido por WhatsApp.',
  ogType: 'website',
  ogUrl: canonicalUrl || undefined,
  ogImage: heroImage,
  twitterCard: 'summary_large_image',
  twitterTitle: 'Raza & Gourmet | Snacks naturales y detalles para mascotas',
  twitterDescription:
    'Arma tu pedido, envíalo a ventas y confirma cobertura por WhatsApp.',
  twitterImage: heroImage
})

useHead({
  link: canonicalUrl ? [{ rel: 'canonical', href: canonicalUrl }] : [],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(jsonLd)
    }
  ]
})
</script>

<template>
  <div class="bg-[#fffaf4] text-stone-900">
    <SiteHeader :cart-count="cartCount" @open-cart="openCart" />

    <main>
      <HeroSection />
      <BenefitsSection />
      <ProductsSection @added="openCart" />
      <TrustSection />
      <ProcessSection />
      <FaqSection />
      <ContactSection />
    </main>

    <SiteFooter />
    <FloatingActions :cart-count="cartCount" @open-cart="openCart" />
    <CartDrawer :open="isCartOpen" @close="isCartOpen = false" />
  </div>
</template>

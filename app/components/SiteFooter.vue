<script setup lang="ts">
import { siteData } from '../data/site'

const assetPath = useAssetPath()
</script>

<template>
  <footer class="border-t border-stone-200 bg-white">
    <div class="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_auto] lg:px-8">
      <div>
        <img :src="assetPath('/images/logo_site_header-small.webp')" alt="Raza & Gourmet" class="h-14 w-auto" loading="lazy">
        <p class="mt-4 max-w-xl text-sm font-semibold leading-6 text-stone-600">{{ siteData.description }}</p>
      </div>

      <div class="flex flex-col gap-3 text-sm font-semibold text-stone-600 lg:items-end">
        <a
          v-for="link in siteData.socialLinks"
          :key="link.label"
          :href="link.href"
          class="transition hover:text-stone-950"
        >
          {{ link.label }}
        </a>
        <p>{{ siteData.email }}</p>
        <p>{{ siteData.phoneDisplay }}</p>
      </div>
    </div>
  </footer>
</template>

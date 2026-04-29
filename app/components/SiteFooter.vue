<script setup lang="ts">
import { siteData } from '../data/site'

const assetPath = useAssetPath()
</script>

<template>
  <footer class="border-t border-stone-200 bg-white">
    <div class="mx-auto max-w-7xl px-4 py-10 pb-32 sm:pb-10 sm:px-6 lg:px-8">
      <!-- Logo and description - visible on all sizes -->
      <div class="text-center lg:mb-8">
        <img :src="assetPath('/images/logo_site_header-small.webp')" alt="Raza & Gourmet" class="mx-auto h-12 w-auto" loading="lazy">
        <p class="mx-auto mt-4 max-w-md text-sm font-semibold leading-6 text-stone-600">{{ siteData.description }}</p>
      </div>

      <!-- Social links, email, and phone - centered on all sizes -->
      <div class="flex flex-col items-center gap-6 text-sm font-semibold text-stone-600 lg:flex-row lg:justify-center lg:gap-12">
        <div class="flex gap-3 lg:flex-row">
          <a
            v-for="link in siteData.socialLinks"
            :key="link.label"
            :href="link.href"
            class="inline-flex items-center gap-2 transition hover:text-stone-950"
            target="_blank"
            rel="noreferrer noopener"
          >
            <svg
              v-if="link.label === 'Instagram'"
              class="h-5 w-5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="instaGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" style="stop-color:#feda75;stop-opacity:1" />
                  <stop offset="5%" style="stop-color:#fa7e1e;stop-opacity:1" />
                  <stop offset="45%" style="stop-color:#d92e7f;stop-opacity:1" />
                  <stop offset="60%" style="stop-color:#9b36b7;stop-opacity:1" />
                  <stop offset="90%" style="stop-color:#515bd4;stop-opacity:1" />
                </linearGradient>
              </defs>
              <path fill="url(#instaGradient)" d="M7.75 2h8.5C19.55 2 22 4.45 22 7.75v8.5C22 19.55 19.55 22 16.25 22h-8.5C4.45 22 2 19.55 2 16.25v-8.5C2 4.45 4.45 2 7.75 2zm0 1.5C5.68 3.5 4 5.18 4 7.25v9.5C4 18.32 5.68 20 7.75 20h8.5c2.07 0 3.75-1.68 3.75-3.75v-9.5C20 5.18 18.32 3.5 16.25 3.5h-8.5z" />
              <path fill="url(#instaGradient)" d="M12 7.25a4.75 4.75 0 1 1 0 9.5 4.75 4.75 0 0 1 0-9.5zm0 1.5a3.25 3.25 0 1 0 0 6.5 3.25 3.25 0 0 0 0-6.5z" />
              <circle cx="17.5" cy="6.5" r="1" fill="url(#instaGradient)" />
            </svg>
            <svg
              v-else-if="link.label === 'Facebook'"
              class="h-5 w-5 text-[#1877F2]"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.84c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.77l-.44 2.91h-2.33V22C18.34 21.24 22 17.08 22 12.06Z" />
            </svg>
            {{ link.label }}
          </a>
        </div>
        <div class="flex flex-col items-center gap-1 lg:flex-row lg:gap-6">
          <p class="inline-flex items-center gap-2">
            <svg
              class="h-5 w-5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path fill="#EA4335" d="M3.5 6.75A2.25 2.25 0 0 1 5.75 4.5h12.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25H5.75a2.25 2.25 0 0 1-2.25-2.25V6.75Z" />
              <path fill="#FBBC04" d="M3.5 8.1v9.15A2.25 2.25 0 0 0 5.75 19.5h1.3V10.7L3.5 8.1Z" />
              <path fill="#34A853" d="M16.95 19.5h1.3a2.25 2.25 0 0 0 2.25-2.25V8.1l-3.55 2.6v8.8Z" />
              <path fill="#4285F4" d="M7.05 19.5V10.7L12 14.33l4.95-3.63v8.8H7.05Z" />
              <path fill="#FFFFFF" d="M12 12.25 3.72 6.17A2.25 2.25 0 0 1 5.75 4.5h12.5c.83 0 1.55.45 1.94 1.12L12 12.25Z" />
            </svg>
            {{ siteData.email }}
          </p>
          <p class="hidden lg:block">•</p>
          <p class="inline-flex items-center gap-2">
            <svg
              class="h-5 w-5 text-[#25D366]"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.34 4.96L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.44 9.91-9.9C21.96 6.46 17.51 2 12.04 2Zm0 18.16h-.01a8.22 8.22 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.25-4.39c0-4.53 3.7-8.23 8.25-8.23a8.24 8.24 0 0 1-.01 16.48Zm4.52-6.16c-.25-.12-1.47-.73-1.7-.81-.23-.08-.39-.12-.56.12-.16.25-.64.81-.78.98-.14.16-.29.19-.54.06-.25-.12-1.05-.39-2-1.24-.74-.66-1.24-1.48-1.38-1.73-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.35-.76-1.85-.2-.48-.4-.41-.56-.42h-.48c-.16 0-.43.06-.66.31-.23.25-.87.85-.87 2.07s.89 2.4 1.01 2.56c.12.16 1.75 2.67 4.24 3.75.59.25 1.05.4 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.16-.48-.28Z" />
            </svg>
            {{ siteData.phoneDisplay }}
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { siteData } from '../../data/site'
</script>

<template>
  <section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
    <div class="grid gap-4 lg:grid-cols-3">
      <article
        v-for="benefit in siteData.benefits"
        :key="benefit.title"
        class="rounded-[1.5rem] border border-stone-200 bg-white p-6 shadow-sm"
      >
        <span class="mb-5 block h-1.5 w-12 rounded-full bg-amber-500" />
        <h2 class="text-2xl font-black leading-tight text-stone-950">{{ benefit.title }}</h2>
        <p class="mt-3 text-sm leading-6 text-stone-600">{{ benefit.description }}</p>
      </article>
    </div>
  </section>
</template>

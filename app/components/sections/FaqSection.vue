<script setup lang="ts">
import { faqs } from '../../data/faqs'
</script>

<template>
  <section id="faq" class="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
    <div class="text-center">
      <p class="text-sm font-semibold uppercase tracking-[0.28em] text-amber-700">FAQ</p>
      <h2 class="mt-4 text-3xl font-semibold tracking-tight text-stone-950 sm:text-4xl">
        Respuestas rápidas para consultas frecuentes.
      </h2>
    </div>

    <div class="mt-10 space-y-4">
      <details
        v-for="faq in faqs"
        :key="faq.question"
        class="group rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm"
      >
        <summary class="cursor-pointer list-none text-left text-lg font-semibold text-stone-950">
          {{ faq.question }}
        </summary>
        <p class="mt-4 text-sm leading-7 text-stone-600">{{ faq.answer }}</p>
      </details>
    </div>
  </section>
</template>

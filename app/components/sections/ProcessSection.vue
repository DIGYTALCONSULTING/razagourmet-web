<script setup lang="ts">
import { siteData } from '../../data/site'
</script>

<template>
  <section id="proceso" class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
    <div class="max-w-2xl">
      <p class="text-sm font-black uppercase tracking-[0.22em] text-amber-700">Cómo funciona</p>
      <h2 class="mt-3 text-3xl font-black tracking-tight text-stone-950 sm:text-4xl lg:text-5xl">
        De antojo a pedido listo en tres pasos.
      </h2>
    </div>

    <div class="mt-8 grid gap-5 lg:grid-cols-3">
      <article
        v-for="(step, index) in siteData.processSteps"
        :key="step.title"
        class="rounded-[1.5rem] border border-stone-200 bg-white p-6 shadow-sm"
      >
        <span class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-lg font-black text-amber-800">
          0{{ index + 1 }}
        </span>
        <h3 class="mt-5 text-2xl font-black text-stone-950">{{ step.title }}</h3>
        <p class="mt-3 text-sm leading-6 text-stone-600">{{ step.description }}</p>
      </article>
    </div>
  </section>
</template>

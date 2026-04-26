<script setup lang="ts">
import { siteData } from '../../data/site'
</script>

<template>
  <section class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
    <div class="overflow-hidden rounded-[2rem] bg-stone-950 text-white shadow-2xl">
      <div class="grid gap-8 p-6 sm:p-8 lg:grid-cols-[0.85fr_1.15fr] lg:p-10">
        <div>
          <p class="text-sm font-black uppercase tracking-[0.22em] text-amber-300">Confianza</p>
          <h2 class="mt-4 text-3xl font-black leading-tight sm:text-4xl">
            Una compra asistida reduce dudas y aumenta cierres.
          </h2>
          <p class="mt-4 text-sm leading-6 text-stone-300">
            La página no intenta reemplazar al equipo de ventas: le entrega mejores conversaciones, con productos y datos claros desde el primer mensaje.
          </p>
        </div>

        <ul class="grid gap-4 sm:grid-cols-3">
          <li
            v-for="item in siteData.trustItems"
            :key="item"
            class="rounded-[1.25rem] border border-white/10 bg-white/5 p-5 text-sm font-semibold leading-6 text-stone-100"
          >
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

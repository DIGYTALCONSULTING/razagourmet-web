<script setup lang="ts">
import { siteData } from '../../data/site'
</script>

<template>
  <section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
    <div class="relative overflow-hidden rounded-[2.5rem] bg-slate-950 text-white shadow-2xl">
      <div class="pointer-events-none absolute -right-10 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-amber-400/10 blur-3xl"></div>
      <div class="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-violet-500/10 blur-3xl"></div>
      <div class="relative grid gap-10 px-6 py-10 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10 lg:py-14">
        <div class="max-w-xl">
          <p class="text-sm font-black uppercase tracking-[0.22em] text-amber-300">Confianza</p>
          <h2 class="mt-4 text-4xl font-black leading-tight text-white sm:text-5xl">
            Compra guiada, con respaldo humano y sin sorpresas.
          </h2>
          <p class="mt-6 text-base leading-8 text-stone-300">
            Arma tu pedido en el catálogo, comparte el resumen por WhatsApp y recibe confirmación de cobertura, entrega y recomendaciones antes de pagar.
          </p>

          <div class="mt-8 grid gap-4 sm:grid-cols-2">
            <div class="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 shadow-xl backdrop-blur-xl">
              <p class="text-xs font-black uppercase tracking-[0.2em] text-amber-200">Listo para comprar</p>
              <p class="mt-3 text-sm leading-6 text-stone-200">
                Productos claros, formato visible y precio de referencia como primer paso hacia un pedido confiable.
              </p>
            </div>
            <div class="rounded-[1.75rem] border border-white/10 bg-slate-900/90 p-5 shadow-xl backdrop-blur-xl">
              <p class="text-xs font-black uppercase tracking-[0.2em] text-emerald-200">Sin pago automático</p>
              <p class="mt-3 text-sm leading-6 text-stone-200">
                La compra se concreta solo después de validar disponibilidad y coordinar entrega con nuestro equipo.
              </p>
            </div>
          </div>
        </div>

        <div class="grid gap-4 sm:grid-cols-2 sm:grid-rows-[auto_auto]">
          <article class="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-xl">
            <div class="absolute -right-6 top-6 h-20 w-20 rounded-full bg-amber-400/10"></div>
            <span class="inline-flex items-center rounded-full bg-amber-300/15 px-3 py-2 text-[0.65rem] font-black uppercase tracking-[0.18em] text-amber-200">
              Atención directa
            </span>
            <h3 class="mt-5 text-lg font-black leading-tight text-white">Resuelve dudas antes del pedido</h3>
            <p class="mt-3 text-sm leading-6 text-stone-300">{{ siteData.trustItems[0] }}</p>
          </article>

          <article class="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-900/90 p-6 shadow-xl backdrop-blur-xl">
            <div class="absolute -left-6 bottom-4 h-24 w-24 rounded-full bg-slate-50/5"></div>
            <span class="inline-flex items-center rounded-full bg-emerald-400/10 px-3 py-2 text-[0.65rem] font-black uppercase tracking-[0.18em] text-emerald-200">
              Momentos especiales
            </span>
            <h3 class="mt-5 text-lg font-black leading-tight text-white">Productos para regalos y celebraciones</h3>
            <p class="mt-3 text-sm leading-6 text-stone-300">{{ siteData.trustItems[1] }}</p>
          </article>

          <article class="relative col-span-full overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-xl">
            <div class="absolute inset-x-0 top-0 h-1 rounded-full bg-gradient-to-r from-amber-300 via-orange-300 to-rose-300"></div>
            <h3 class="mt-6 text-lg font-black leading-tight text-white">Confirmación antes de cerrar</h3>
            <p class="mt-3 text-sm leading-6 text-stone-300">{{ siteData.trustItems[2] }}</p>
            <div class="mt-6 flex flex-wrap gap-2">
              <span class="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-stone-200">Cobertura</span>
              <span class="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-stone-200">Entrega</span>
              <span class="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-stone-200">Revisión</span>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

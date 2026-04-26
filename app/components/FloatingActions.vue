<script setup lang="ts">
defineProps<{
  cartCount: number
}>()

const emit = defineEmits<{
  openCart: []
}>()

const { whatsappUrl } = useWhatsAppOrder()
</script>

<template>
  <div class="fixed inset-x-3 bottom-3 z-40 grid grid-cols-[1fr_auto] gap-2 rounded-[1.35rem] border border-white/60 bg-white/86 p-2 shadow-2xl backdrop-blur-xl sm:inset-x-auto sm:right-5 sm:grid-cols-none sm:bg-transparent sm:p-0 sm:shadow-none sm:backdrop-blur-0">
    <a
      :href="whatsappUrl"
      target="_blank"
      rel="noopener noreferrer"
      class="inline-flex min-h-12 items-center justify-center rounded-2xl bg-emerald-700 px-4 py-3 text-sm font-black text-white shadow-lg transition hover:bg-emerald-600"
    >
      Pedir por WhatsApp
    </a>
    <button
      type="button"
      class="inline-flex min-h-12 items-center justify-center rounded-2xl bg-stone-950 px-4 py-3 text-sm font-black text-white shadow-lg transition hover:bg-amber-500 hover:text-stone-950"
      @click="emit('openCart')"
    >
      Carrito ({{ cartCount }})
    </button>
  </div>
</template>

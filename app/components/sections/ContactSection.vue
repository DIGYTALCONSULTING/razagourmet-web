<script setup lang="ts">
import { siteData } from '../../data/site'

const { whatsappUrl } = useWhatsAppOrder()

const form = reactive({
  name: '',
  email: '',
  petType: '',
  message: ''
})

const pending = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const submitForm = async () => {
  pending.value = true
  successMessage.value = ''
  errorMessage.value = ''

  try {
    const response = await $fetch<{ ok: boolean; message: string }>('/api/contact', {
      method: 'POST',
      body: form
    })

    successMessage.value = response.message
    form.name = ''
    form.email = ''
    form.petType = ''
    form.message = ''
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'No fue posible enviar el formulario. Escríbenos por WhatsApp.'
  } finally {
    pending.value = false
  }
}
</script>

<template>
  <section id="contacto" class="mx-auto max-w-7xl px-4 py-14 pb-28 sm:px-6 lg:px-8 lg:py-20">
    <div class="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div class="rounded-[2rem] bg-stone-950 p-6 text-white sm:p-8">
        <p class="text-sm font-black uppercase tracking-[0.22em] text-amber-300">Ventas</p>
        <h2 class="mt-4 text-3xl font-black leading-tight sm:text-4xl">
          ¿Tienes dudas antes de pedir?
        </h2>
        <p class="mt-4 text-base leading-7 text-stone-200">
          Escríbenos por WhatsApp o deja tus datos. La fuerza de ventas puede responder con disponibilidad, cobertura, tiempos y recomendaciones.
        </p>

        <a
          :href="whatsappUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-emerald-700 px-6 py-3.5 text-sm font-black text-white transition hover:bg-emerald-600 sm:w-auto"
        >
          Abrir WhatsApp
        </a>

        <dl class="mt-8 grid gap-4 text-sm text-stone-200">
          <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
            <dt class="font-black text-white">Ubicación</dt>
            <dd class="mt-1">{{ siteData.location }}</dd>
          </div>
          <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
            <dt class="font-black text-white">Correo de ventas</dt>
            <dd class="mt-1">{{ siteData.email }}</dd>
          </div>
          <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
            <dt class="font-black text-white">WhatsApp</dt>
            <dd class="mt-1">{{ siteData.phoneDisplay }}</dd>
          </div>
        </dl>
      </div>

      <form class="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm sm:p-8" @submit.prevent="submitForm">
        <div>
          <p class="text-sm font-black uppercase tracking-[0.22em] text-amber-700">Lead rápido</p>
          <h3 class="mt-3 text-2xl font-black text-stone-950">Enviar una consulta</h3>
          <p class="mt-2 text-sm leading-6 text-stone-600">
            Útil para alianzas, pedidos especiales o dudas antes de armar carrito.
          </p>
        </div>

        <div class="mt-6 grid gap-4 sm:grid-cols-2">
          <label class="block">
            <span class="mb-2 block text-sm font-bold text-stone-700">Nombre</span>
            <input
              v-model="form.name"
              type="text"
              required
              class="w-full rounded-2xl border border-stone-300 bg-stone-50 px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-stone-900"
            >
          </label>

          <label class="block">
            <span class="mb-2 block text-sm font-bold text-stone-700">Correo</span>
            <input
              v-model="form.email"
              type="email"
              required
              class="w-full rounded-2xl border border-stone-300 bg-stone-50 px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-stone-900"
            >
          </label>
        </div>

        <label class="mt-4 block">
          <span class="mb-2 block text-sm font-bold text-stone-700">Mascota o interés</span>
          <input
            v-model="form.petType"
            type="text"
            placeholder="Ej. perro pequeño, box de regalo, alianza"
            class="w-full rounded-2xl border border-stone-300 bg-stone-50 px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-stone-900"
          >
        </label>

        <label class="mt-4 block">
          <span class="mb-2 block text-sm font-bold text-stone-700">Mensaje</span>
          <textarea
            v-model="form.message"
            rows="5"
            required
            class="w-full rounded-2xl border border-stone-300 bg-stone-50 px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-stone-900"
          ></textarea>
        </label>

        <p v-if="successMessage" class="mt-4 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
          {{ successMessage }}
        </p>
        <p v-if="errorMessage" class="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {{ errorMessage }}
        </p>

        <button
          type="submit"
          class="mt-6 w-full rounded-2xl bg-stone-950 px-6 py-3.5 text-sm font-black text-white transition hover:bg-amber-500 hover:text-stone-950 disabled:cursor-not-allowed disabled:opacity-60"
          :disabled="pending"
        >
          {{ pending ? 'Enviando...' : 'Enviar consulta a ventas' }}
        </button>
      </form>
    </div>
  </section>
</template>

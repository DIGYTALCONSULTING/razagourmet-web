<script setup lang="ts">
import { siteData } from '../../data/site'

const { openWhatsAppOrder } = useWhatsAppOrder()

const form = reactive({
  name: '',
  phone: '',
  interest: '',
  message: '',
  consent: false
})

const pending = ref(false)
const successMessage = ref('')
const errorMessage = ref('')
const toastMessage = ref('')
const toastType = ref<'success' | 'error'>('success')
const showToast = ref(false)
const showPolicyModal = ref(false)
let toastTimeout: number | undefined

const canSubmit = computed(() =>
  form.name.trim().length > 0 &&
  form.phone.trim().length > 0 &&
  form.message.trim().length > 0 &&
  form.consent
)

const openToast = (message: string, type: 'success' | 'error') => {
  toastMessage.value = message
  toastType.value = type
  showToast.value = true
  window.clearTimeout(toastTimeout)
  toastTimeout = window.setTimeout(() => {
    showToast.value = false
  }, 4200)
}

const openPolicyModal = () => {
  showPolicyModal.value = true
}

const closePolicyModal = () => {
  showPolicyModal.value = false
}

const acceptPolicy = () => {
  form.consent = true
  closePolicyModal()
  openToast('Política de datos aceptada. Ya puedes enviar tu solicitud.', 'success')
}

const submitForm = () => {
  pending.value = true
  successMessage.value = ''
  errorMessage.value = ''

  if (!form.consent) {
    errorMessage.value = 'Debes autorizar el tratamiento de datos personales para continuar.'
    openToast(errorMessage.value, 'error')
    pending.value = false
    return
  }

  if (!form.name.trim() || !form.phone.trim()) {
    errorMessage.value = 'Por favor ingresa tu nombre y celular para que podamos escribirte.'
    openToast(errorMessage.value, 'error')
    pending.value = false
    return
  }

  try {
    openWhatsAppOrder({
      name: form.name.trim(),
      phone: form.phone.trim(),
      notes: `${form.interest.trim() ? `Interés: ${form.interest.trim()}. ` : ''}${form.message.trim()}`
    })

    successMessage.value = 'Perfecto, abrimos WhatsApp con tu consulta. Te escribimos en breve.'
    openToast(successMessage.value, 'success')
    form.name = ''
    form.phone = ''
    form.interest = ''
    form.message = ''
    form.consent = false
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'No fue posible abrir WhatsApp. Intenta de nuevo.'
    openToast(errorMessage.value, 'error')
  } finally {
    pending.value = false
  }
}
</script>

<template>
  <section id="contacto" class="relative mx-auto max-w-7xl px-4 py-14 pb-28 sm:px-6 lg:px-8 lg:py-20">
    <div class="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <div class="rounded-[2rem] bg-stone-950 p-8 text-white shadow-2xl sm:p-10">
        <p class="text-sm font-black uppercase tracking-[0.22em] text-amber-300">Ventas</p>
        <h2 class="mt-4 text-4xl font-black leading-tight sm:text-5xl">
          ¿Quieres que te escribamos ya?
        </h2>
        <p class="mt-5 text-base leading-8 text-stone-300">
          Deja tu nombre y celular, autoriza el uso responsable de tus datos y recibe una respuesta comercial por WhatsApp con opción de pedido guiado.
        </p>

        <div class="mt-10 grid gap-4">
          <div class="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-xl">
            <p class="text-xs font-black uppercase tracking-[0.18em] text-amber-200">Atención express</p>
            <p class="mt-3 text-sm leading-6 text-stone-200">Recibe respuesta rápida por WhatsApp, sin mensajes automáticos.</p>
          </div>
          <div class="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-xl">
            <p class="text-xs font-black uppercase tracking-[0.18em] text-emerald-200">Protección de datos</p>
            <p class="mt-3 text-sm leading-6 text-stone-200">Tus datos se usan solo para esta consulta, según Ley 1581 de 2012, Decreto 1377 de 2013 y normas vigentes en Colombia.</p>
          </div>
          <div class="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-xl">
            <p class="text-xs font-black uppercase tracking-[0.18em] text-sky-200">Sin compromiso</p>
            <p class="mt-3 text-sm leading-6 text-stone-200">No hay pagos adelantados: primero confirmamos disponibilidad y cobertura.</p>
          </div>
        </div>
      </div>

      <form class="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm sm:p-10" @submit.prevent="submitForm">
        <div>
          <p class="text-sm font-black uppercase tracking-[0.22em] text-amber-700">Lead rápido</p>
          <h3 class="mt-3 text-3xl font-black text-stone-950">Escríbenos por WhatsApp</h3>
          <p class="mt-2 text-sm leading-6 text-stone-600">Deja tus datos y te abrimos un chat con nuestro equipo de ventas.</p>
        </div>

        <div class="mt-6 grid gap-4 sm:grid-cols-2">
          <label class="block">
            <span class="mb-2 block text-sm font-bold text-stone-700">Nombre</span>
            <input
              v-model="form.name"
              type="text"
              autocomplete="name"
              placeholder="Andrés"
              required
              class="w-full rounded-3xl border border-stone-300 bg-stone-50 px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-stone-900"
            />
          </label>

          <label class="block">
            <span class="mb-2 block text-sm font-bold text-stone-700">Celular</span>
            <input
              v-model="form.phone"
              type="tel"
              autocomplete="tel"
              placeholder="+57 300 123 4567"
              required
              class="w-full rounded-3xl border border-stone-300 bg-stone-50 px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-stone-900"
            />
          </label>
        </div>

        <label class="mt-4 block">
          <span class="mb-2 block text-sm font-bold text-stone-700">Mascota o interés</span>
          <input
            v-model="form.interest"
            type="text"
            placeholder="Ej. perro pequeño, regalo, alianza"
            class="w-full rounded-3xl border border-stone-300 bg-stone-50 px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-stone-900"
          />
        </label>

        <label class="mt-4 block">
          <span class="mb-2 block text-sm font-bold text-stone-700">Cuéntanos tu pregunta</span>
          <textarea
            v-model="form.message"
            rows="5"
            placeholder="Ej. Estoy buscando snacks para cumpleaños de mi perrita."
            required
            class="w-full rounded-3xl border border-stone-300 bg-stone-50 px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-stone-900"
          ></textarea>
        </label>

        <label class="mt-5 flex items-start gap-3">
          <input
            type="checkbox"
            v-model="form.consent"
            class="mt-2 h-5 w-5 rounded border-stone-300 text-emerald-600 outline-none transition focus:ring-emerald-600"
          />
          <div>
            <p class="text-sm leading-6 text-stone-700">
              Autorizo el tratamiento de mis datos personales para atención comercial, conforme a la Ley 1581 de 2012, Decreto 1377 de 2013 y demás normas vigentes en Colombia.
            </p>
            <button
              type="button"
              @click="openPolicyModal"
              class="mt-2 inline-flex rounded-full border border-amber-500 bg-amber-50 px-3 py-1 text-[0.75rem] font-black uppercase tracking-[0.18em] text-amber-700 transition hover:bg-amber-100"
            >
              Ver política de datos
            </button>
          </div>
        </label>
        <p class="mt-2 text-xs text-stone-500">Solo usaremos tus datos para responder esta consulta y coordinar tu pedido.</p>

        <p v-if="successMessage" class="mt-5 rounded-3xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
          {{ successMessage }}
        </p>
        <p v-if="errorMessage" class="mt-5 rounded-3xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {{ errorMessage }}
        </p>

        <button
          type="submit"
          class="mt-6 w-full rounded-3xl px-6 py-3.5 text-sm font-black text-white transition hover:bg-amber-500 hover:text-stone-950 disabled:cursor-not-allowed disabled:opacity-60"
          :class="canSubmit ? 'bg-stone-950' : 'bg-stone-300 text-stone-500 hover:bg-stone-300 hover:text-stone-500'"
          :disabled="pending || !canSubmit"
        >
          {{ pending ? 'Preparando WhatsApp...' : 'Enviar por WhatsApp' }}
        </button>
      </form>

      <transition name="fade">
        <div
          v-if="showPolicyModal"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-8"
        >
          <div class="w-full max-w-2xl overflow-hidden rounded-[2rem] bg-white p-6 shadow-2xl sm:p-8">
            <div class="flex items-start justify-between gap-4">
              <div>
                <p class="text-xs font-black uppercase tracking-[0.22em] text-amber-700">Política de datos</p>
                <h4 class="mt-3 text-2xl font-black text-stone-950">Tratamiento de datos personales</h4>
              </div>
              <button
                type="button"
                @click="closePolicyModal"
                class="rounded-full bg-stone-100 px-3 py-2 text-stone-700 transition hover:bg-stone-200"
              >
                Cerrar
              </button>
            </div>
            <div class="mt-6 grid gap-4 text-sm leading-7 text-stone-700">
              <p>Al enviar este formulario autorizo a Raza & Gourmet a recolectar, almacenar y usar mis datos personales únicamente para gestionar esta consulta comercial y coordinar el pedido por WhatsApp.</p>
              <p>La información recolectada se maneja de acuerdo con la Ley 1581 de 2012, Decreto 1377 de 2013 y demás normas vigentes en Colombia para la protección de datos personales.</p>
              <p>Los datos no serán utilizados para otros fines ni cedidos a terceros sin autorización previa. El titular puede ejercer sus derechos de consulta, actualización, rectificación y supresión ante el responsable del tratamiento.</p>
              <p>Al aceptar, confirmo que conozco y autorizo el uso de mis datos de contacto para recibir respuesta comercial y seguimiento de mi solicitud.</p>
            </div>
            <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                @click="closePolicyModal"
                class="rounded-3xl border border-stone-300 bg-stone-100 px-5 py-3 text-sm font-black text-stone-700 transition hover:bg-stone-200"
              >
                Cerrar
              </button>
              <button
                type="button"
                @click="acceptPolicy"
                class="rounded-3xl bg-emerald-700 px-5 py-3 text-sm font-black text-white transition hover:bg-emerald-600"
              >
                Aceptar y continuar
              </button>
            </div>
          </div>
        </div>
      </transition>
    </div>

      <div
        v-show="showToast"
        class="pointer-events-none absolute right-6 bottom-6 z-50 w-full max-w-sm rounded-[1.75rem] border px-5 py-4 shadow-2xl backdrop-blur-xl transition-all duration-300 ease-out"
        :class="[
          showToast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
          toastType === 'success'
            ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
            : 'border-red-200 bg-red-50 text-red-900'
        ]"
      >
        <div class="flex items-center gap-3">
          <span class="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/80 text-lg shadow-sm">
            {{ toastType === 'success' ? '✅' : '⚠️' }}
          </span>
          <div>
            <p class="text-sm font-black uppercase tracking-[0.2em]">
              {{ toastType === 'success' ? 'Solicitud enviada' : 'Error' }}
            </p>
            <p class="mt-1 max-w-xs text-sm leading-6">{{ toastMessage }}</p>
          </div>
        </div>
      </div>
  </section>
</template>

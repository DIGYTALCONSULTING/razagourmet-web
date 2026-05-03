<script setup lang="ts">
import { siteData } from '../../data/site'
import { useScrollAnimation } from '../../../composables/useScrollAnimation'

const { getWhatsAppUrl } = useWhatsAppOrder()

const form = reactive({
  name: '',
  phone: '',
  email: '',
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

const sectionRef = ref<HTMLElement | null>(null)
useScrollAnimation(sectionRef, 'animate-fade-in-up')

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

const submitForm = async () => {
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

  const customer = {
    name: form.name.trim(),
    phone: form.phone.trim(),
    notes: `${form.interest.trim() ? `Interés: ${form.interest.trim()}. ` : ''}${form.message.trim()}`
  }
  const whatsappUrl = getWhatsAppUrl(customer)
  const whatsappWindow = import.meta.client ? window.open('', '_blank', 'noopener,noreferrer') : null

  try {
    const response = await $fetch<{ ok: boolean; emailSent?: boolean; message: string }>('/api/contact', {
      method: 'POST',
      body: {
        name: customer.name,
        phone: customer.phone,
        email: form.email.trim(),
        interest: form.interest.trim(),
        message: form.message.trim(),
        consent: form.consent
      }
    })

    if (whatsappWindow) {
      whatsappWindow.location.href = whatsappUrl
    } else if (import.meta.client) {
      window.location.href = whatsappUrl
    }

    successMessage.value = response.message || 'Perfecto, recibimos tu solicitud y abrimos WhatsApp con tu consulta.'
    openToast(successMessage.value, 'success')
    form.name = ''
    form.phone = ''
    form.email = ''
    form.interest = ''
    form.message = ''
    form.consent = false
  } catch (error) {
    whatsappWindow?.close()
    errorMessage.value = error instanceof Error ? error.message : 'No fue posible abrir WhatsApp. Intenta de nuevo.'
    openToast(errorMessage.value, 'error')
  } finally {
    pending.value = false
  }
}
</script>

<template>
  <section ref="sectionRef" id="contacto" class="relative mx-auto max-w-7xl px-4 py-14 pb-28 sm:px-6 lg:px-8 lg:py-20 opacity-0 translate-y-8">
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
          <span class="mb-2 block text-sm font-bold text-stone-700">Correo electrónico opcional</span>
          <input
            v-model="form.email"
            type="email"
            autocomplete="email"
            placeholder="correo@ejemplo.com"
            class="w-full rounded-3xl border border-stone-300 bg-stone-50 px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-stone-900"
          />
        </label>

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
          class="mt-6 w-full rounded-3xl px-6 py-3.5 text-sm font-black text-white transition hover:bg-amber-500 hover:text-stone-950 hover-scale disabled:cursor-not-allowed disabled:opacity-60"
          :class="canSubmit ? 'bg-stone-950' : 'bg-stone-300 text-stone-500 hover:bg-stone-300 hover:text-stone-500'"
          :disabled="pending || !canSubmit"
        >
          {{ pending ? 'Enviando solicitud...' : 'Enviar solicitud' }}
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
            <div class="mt-6 max-h-[68vh] overflow-y-auto pr-2 text-sm leading-7 text-stone-700 text-justify">
              <p class="font-black uppercase tracking-[0.18em] text-stone-900">HABEAS DATA COLOMBIA</p>
              <p class="mt-3 font-black text-lg text-stone-950">Política de tratamiento y seguridad de datos personales</p>
              <p class="mt-4">Última actualización: abril de 2026</p>
              <p class="mt-4">Esta política informa cómo Raza & Gourmet, en calidad de Responsable del Tratamiento, recolecta, almacena, usa, conserva, consulta, actualiza, transmite, elimina y protege los datos personales enviados mediante este formulario de contacto.</p>
              <p class="mt-4 font-semibold">1. Marco normativo aplicable</p>
              <p>El tratamiento se realiza conforme a la Constitución Política de Colombia, la Ley Estatutaria 1581 de 2012, el Decreto 1377 de 2013, las normas incorporadas en el Decreto Único Reglamentario 1074 de 2015, las instrucciones de la Superintendencia de Industria y Comercio y las normas que las modifiquen, adicionen o sustituyan.</p>
              <p class="mt-4 font-semibold">2. Datos personales recolectados</p>
              <p>A través del formulario se solicitan únicamente datos necesarios para atender una solicitud comercial: nombre, correo electrónico, número de WhatsApp o celular, servicio de interés y descripción del proyecto. No se solicitan datos sensibles, datos de niñas, niños o adolescentes, datos financieros, datos de salud, datos biométricos ni información sujeta a reserva especial.</p>
              <p class="mt-4 font-semibold">3. Finalidades del tratamiento</p>
              <ul class="ml-5 list-disc space-y-2">
                <li>Contactar al titular para responder su solicitud de información.</li>
                <li>Entender el servicio requerido y preparar una orientación, propuesta o cotización.</li>
                <li>Gestionar comunicaciones por correo electrónico, llamada, mensaje o WhatsApp.</li>
                <li>Dar seguimiento a la conversación comercial iniciada por el titular.</li>
                <li>Conservar soporte de la autorización otorgada y de la gestión realizada.</li>
                <li>Cumplir obligaciones legales, contractuales, contables o administrativas aplicables.</li>
                <li>Prevenir usos no autorizados, fraude, incidentes de seguridad o accesos indebidos.</li>
              </ul>
              <p class="mt-4 font-semibold">4. Autorización</p>
              <p>Al marcar la casilla de aceptación y enviar el formulario, el titular otorga autorización previa, expresa e informada para el tratamiento de sus datos personales de acuerdo con esta política. La autorización podrá ser consultada posteriormente y podrá ser revocada cuando no exista un deber legal o contractual que obligue a conservar la información.</p>
              <p class="mt-4 font-semibold">5. Derechos del titular</p>
              <ul class="ml-5 list-disc space-y-2">
                <li>Conocer, actualizar, rectificar y consultar sus datos personales.</li>
                <li>Solicitar prueba de la autorización otorgada.</li>
                <li>Ser informado sobre el uso dado a sus datos.</li>
                <li>Solicitar la supresión de sus datos o revocar la autorización, cuando proceda.</li>
                <li>Presentar consultas, reclamos o quejas ante el responsable del tratamiento.</li>
                <li>Acudir ante la Superintendencia de Industria y Comercio cuando corresponda.</li>
                <li>Acceder gratuitamente a los datos personales que hayan sido objeto de tratamiento.</li>
              </ul>
              <p class="mt-4 font-semibold">6. Procedimiento para consultas y reclamos</p>
              <p>El titular puede ejercer sus derechos mediante el canal de contacto disponible en este sitio web, indicando su nombre, documento de identificación si es necesario para validar la titularidad, descripción de la solicitud y datos de contacto para responder.</p>
              <p>Las consultas serán atendidas en un término máximo de diez (10) días hábiles, prorrogable hasta por cinco (5) días hábiles adicionales cuando sea necesario.</p>
              <p>Los reclamos serán atendidos en un término máximo de quince (15) días hábiles, prorrogable hasta por ocho (8) días hábiles adicionales conforme a la Ley 1581 de 2012.</p>
              <p class="mt-4 font-semibold">7. Seguridad y confidencialidad</p>
              <p>Raza & Gourmet aplicará medidas técnicas, humanas y administrativas razonables para proteger los datos contra adulteración, pérdida, consulta, uso, acceso no autorizado o fraudulento. El acceso estará limitado a personas autorizadas que necesiten la información para cumplir las finalidades descritas.</p>
              <p class="mt-4 font-semibold">8. Circulación, encargados y terceros</p>
              <p>Los datos podrán ser tratados por personal autorizado, proveedores tecnológicos, herramientas de hosting, correo, mensajería, CRM, analítica o automatización que actúen como encargados del tratamiento, siempre bajo deberes de seguridad, confidencialidad y uso limitado a las finalidades autorizadas. También podrán suministrarse a autoridades públicas o judiciales cuando exista obligación legal.</p>
              <p class="mt-4 font-semibold">9. Transferencias o transmisiones internacionales</p>
              <p>Si se usan servicios tecnológicos alojados fuera de Colombia, podrá existir transmisión o transferencia internacional de datos. En ese caso se procurará que el tercero ofrezca medidas adecuadas de seguridad y confidencialidad, y que el tratamiento se mantenga limitado a las finalidades autorizadas.</p>
              <p class="mt-4 font-semibold">10. Vigencia y conservación</p>
              <p>Los datos se conservarán durante el tiempo razonable y necesario para gestionar la solicitud, mantener la relación comercial si se llega a concretar, cumplir obligaciones legales o contractuales y atender eventuales consultas o reclamos. Cumplidas las finalidades, se procederá a su supresión, anonimización o archivo seguro cuando corresponda.</p>
              <p class="mt-4 font-semibold">11. Cambios de la política</p>
              <p>Cualquier cambio sustancial en esta política será informado por medios razonables y oportunos. Si el cambio afecta finalidades previamente autorizadas, se solicitará una nueva autorización cuando la ley lo exija.</p>
              <p class="mt-4 font-semibold">12. Responsable del tratamiento</p>
              <p>Responsable: Raza & Gourmet.</p>
              <p>Canal de atención: <a :href="'mailto:' + siteData.email" class="font-semibold text-amber-700 hover:text-amber-900">{{ siteData.email }}</a> / <a :href="'tel:' + siteData.phoneDisplay.replace(/\D+/g, '')" class="font-semibold text-amber-700 hover:text-amber-900">{{ siteData.phoneDisplay }}</a>.</p>
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

<script setup lang="ts">
const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const { items, subtotal, totalItems, updateQuantity, removeItem, clearCart } = useCart()
const { openWhatsAppOrder, buildMessage, formatCurrency } = useWhatsAppOrder()
const assetPath = useAssetPath()

const form = reactive({
  name: '',
  phone: '',
  city: '',
  deliveryPreference: 'Quiero coordinar entrega por WhatsApp',
  notes: ''
})

const pending = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const hasItems = computed(() => items.value.length > 0)
const subtotalAmount = computed(() => subtotal.value)
const totalItemsCount = computed(() => totalItems.value)

const customerPayload = computed(() => ({
  name: form.name.trim(),
  phone: form.phone.trim(),
  city: form.city.trim(),
  deliveryPreference: form.deliveryPreference,
  notes: form.notes.trim()
}))

const sendOrder = async () => {
  if (!hasItems.value) {
    return
  }

  pending.value = true
  successMessage.value = ''
  errorMessage.value = ''

  try {
    const response = await $fetch<{ ok: boolean; message: string }>('/api/orders', {
      method: 'POST',
      body: {
        customer: customerPayload.value,
        items: items.value,
        subtotal: subtotal.value,
        whatsappMessage: buildMessage(customerPayload.value)
      }
    })

    successMessage.value = response.message
    openWhatsAppOrder(customerPayload.value)
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'No fue posible enviar el pedido. Puedes continuar por WhatsApp.'
    openWhatsAppOrder(customerPayload.value)
  } finally {
    pending.value = false
  }
}

watch(
  () => props.open,
  value => {
    if (!import.meta.client) {
      return
    }

    document.body.style.overflow = value ? 'hidden' : ''
  }
)

onBeforeUnmount(() => {
  if (import.meta.client) {
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-50 bg-stone-950/55 backdrop-blur-sm"
      @click.self="emit('close')"
    >
      <aside class="ml-auto flex h-full w-full max-w-xl flex-col bg-[#fffaf4] shadow-2xl">
        <div class="flex items-center justify-between border-b border-stone-200 px-5 py-4 sm:px-6">
          <div>
            <p class="text-xs font-black uppercase tracking-[0.2em] text-amber-700">Pedido asistido</p>
            <h2 class="text-2xl font-black text-stone-950">Carrito y datos</h2>
          </div>
          <button
            type="button"
            class="rounded-2xl border border-stone-300 bg-white px-3 py-2 text-sm font-black text-stone-700"
            @click="emit('close')"
          >
            Cerrar
          </button>
        </div>

        <div class="flex-1 overflow-y-auto px-5 py-5 sm:px-6">
          <div v-if="hasItems" class="space-y-4">
            <article
              v-for="item in items"
              :key="item.key"
              class="rounded-[1.5rem] border border-stone-200 bg-white p-4 shadow-sm"
            >
              <div class="flex gap-4">
                <img
                  :src="assetPath(item.productImage)"
                  :alt="`Producto ${item.productName}`"
                  class="h-20 w-20 rounded-2xl bg-amber-50 object-cover"
                >
                <div class="min-w-0 flex-1">
                  <h3 class="text-sm font-black text-stone-950">{{ item.productName }}</h3>
                  <p class="mt-1 text-sm text-stone-600">{{ item.variantName }}</p>
                  <p class="mt-2 text-sm font-black text-stone-950">{{ formatCurrency(item.price) }}</p>
                </div>
              </div>

              <div class="mt-4 flex items-center justify-between gap-3">
                <div class="flex items-center gap-2">
                  <button
                    type="button"
                    class="grid h-9 w-9 place-items-center rounded-full border border-stone-300 text-stone-700"
                    @click="updateQuantity(item.key, item.quantity - 1)"
                  >
                    -
                  </button>
                  <span class="min-w-8 text-center text-sm font-black text-stone-900">{{ item.quantity }}</span>
                  <button
                    type="button"
                    class="grid h-9 w-9 place-items-center rounded-full border border-stone-300 text-stone-700"
                    @click="updateQuantity(item.key, item.quantity + 1)"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  class="text-sm font-black text-stone-500 transition hover:text-red-600"
                  @click="removeItem(item.key)"
                >
                  Eliminar
                </button>
              </div>
            </article>

            <form class="rounded-[1.5rem] border border-amber-100 bg-amber-50 p-4" @submit.prevent="sendOrder">
              <h3 class="text-lg font-black text-stone-950">Datos para ventas</h3>
              <p class="mt-1 text-sm leading-6 text-stone-700">
                Estos datos llegan con el resumen del pedido para responder más rápido.
              </p>

              <div class="mt-4 grid gap-3 sm:grid-cols-2">
                <label>
                  <span class="mb-1.5 block text-sm font-bold text-stone-800">Nombre</span>
                  <input v-model="form.name" required type="text" class="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none focus:border-stone-950">
                </label>
                <label>
                  <span class="mb-1.5 block text-sm font-bold text-stone-800">WhatsApp</span>
                  <input v-model="form.phone" required type="tel" class="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none focus:border-stone-950">
                </label>
              </div>

              <label class="mt-3 block">
                <span class="mb-1.5 block text-sm font-bold text-stone-800">Ciudad o zona</span>
                <input v-model="form.city" required type="text" placeholder="Ej. Bogotá, Cedritos" class="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none focus:border-stone-950">
              </label>

              <label class="mt-3 block">
                <span class="mb-1.5 block text-sm font-bold text-stone-800">Preferencia de entrega</span>
                <select v-model="form.deliveryPreference" class="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none focus:border-stone-950">
                  <option>Quiero coordinar entrega por WhatsApp</option>
                  <option>Lo necesito para una fecha especial</option>
                  <option>Quiero recomendación antes de confirmar</option>
                  <option>Quiero recoger si está disponible</option>
                </select>
              </label>

              <label class="mt-3 block">
                <span class="mb-1.5 block text-sm font-bold text-stone-800">Notas</span>
                <textarea v-model="form.notes" rows="3" placeholder="Nombre de la mascota, alergias, fecha especial, dudas..." class="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none focus:border-stone-950"></textarea>
              </label>

              <p v-if="successMessage" class="mt-4 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">
                {{ successMessage }}
              </p>
              <p v-if="errorMessage" class="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                {{ errorMessage }}
              </p>

              <button
                type="submit"
                class="mt-4 w-full rounded-2xl bg-emerald-700 px-5 py-3.5 text-sm font-black text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
                :disabled="pending"
              >
                {{ pending ? 'Enviando pedido...' : 'Enviar pedido a ventas y WhatsApp' }}
              </button>
            </form>
          </div>

          <div
            v-else
            class="rounded-[1.5rem] border border-dashed border-stone-300 bg-white px-6 py-12 text-center"
          >
            <p class="text-xl font-black text-stone-950">Tu carrito está vacío</p>
            <p class="mt-2 text-sm leading-6 text-stone-600">
              Agrega productos del catálogo para generar tu pedido asistido por WhatsApp.
            </p>
            <a href="#catalogo" class="mt-5 inline-flex rounded-2xl bg-stone-950 px-5 py-3 text-sm font-black text-white" @click="emit('close')">
              Ver productos
            </a>
          </div>
        </div>

        <div class="border-t border-stone-200 bg-white px-5 py-4 sm:px-6">
          <div class="mb-4 flex items-center justify-between text-sm text-stone-600">
            <span>{{ totalItemsCount }} item(s)</span>
            <span class="text-xl font-black text-stone-950">{{ formatCurrency(subtotalAmount) }}</span>
          </div>
          <button
            type="button"
            class="w-full rounded-2xl border border-stone-300 px-5 py-3 text-sm font-black text-stone-700 transition hover:border-stone-950 hover:text-stone-950 disabled:cursor-not-allowed disabled:opacity-50"
            :disabled="!hasItems"
            @click="clearCart"
          >
            Vaciar carrito
          </button>
        </div>
      </aside>
    </div>
  </Teleport>
</template>

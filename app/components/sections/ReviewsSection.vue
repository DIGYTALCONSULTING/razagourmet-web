<script setup lang="ts">
import { useScrollAnimation } from '../../../composables/useScrollAnimation'

type Review = {
  id: number
  name: string
  petName: string
  rating: number
  comment: string
}

const sectionRef = ref<HTMLElement | null>(null)
useScrollAnimation(sectionRef, 'animate-fade-in-up')

const form = reactive({
  name: '',
  petName: '',
  rating: 5,
  comment: ''
})

const showAllReviews = ref(false)

const reviews = ref<Review[]>([
  {
    id: 1,
    name: 'Laura M.',
    petName: 'Milo',
    rating: 5,
    comment: 'El pedido llegó muy bien presentado y nos ayudaron a elegir snacks según el tamaño de Milo.'
  },
  {
    id: 2,
    name: 'Camila R.',
    petName: 'Nala',
    rating: 5,
    comment: 'La atención por WhatsApp fue clara, rápida y confirmaron todo antes de cerrar la compra.'
  },
  {
    id: 3,
    name: 'Andrés P.',
    petName: 'Luna',
    rating: 4,
    comment: 'Me gustó que explicaran formatos, recomendaciones y tiempos antes de preparar el pedido.'
  }
])

const canSubmit = computed(() =>
  form.name.trim().length > 0 &&
  form.petName.trim().length > 0 &&
  form.comment.trim().length >= 10
)

const displayedReviews = computed(() =>
  showAllReviews.value ? reviews.value : reviews.value.slice(0, 3)
)

const hasMoreReviews = computed(() => reviews.value.length > 3)

const submitReview = () => {
  if (!canSubmit.value) {
    return
  }

  reviews.value.unshift({
    id: Date.now(),
    name: form.name.trim(),
    petName: form.petName.trim(),
    rating: form.rating,
    comment: form.comment.trim()
  })

  form.name = ''
  form.petName = ''
  form.rating = 5
  form.comment = ''
  showAllReviews.value = false
}
</script>

<template>
  <section ref="sectionRef" class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20 opacity-0 translate-y-8">
    <div class="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
      <div>
        <p class="text-sm font-black uppercase tracking-[0.22em] text-amber-700">Experiencias</p>
        <h2 class="mt-3 max-w-2xl text-3xl font-black tracking-tight text-stone-950 sm:text-4xl lg:text-5xl">
          Lo que cuentan quienes ya consintieron a sus mascotas.
        </h2>
        <p class="mt-4 max-w-2xl text-base leading-7 text-stone-700">
          Las reseñas ayudan a otros clientes a decidir con más confianza antes de armar su pedido.
        </p>

        <form class="mt-8 rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm sm:p-8" @submit.prevent="submitReview">
          <div class="grid gap-4 sm:grid-cols-2">
            <label class="block">
              <span class="mb-2 block text-sm font-bold text-stone-700">Nombre</span>
              <input
                v-model="form.name"
                type="text"
                autocomplete="name"
                placeholder="Tu nombre"
                class="w-full rounded-3xl border border-stone-300 bg-stone-50 px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-stone-900"
              />
            </label>

            <label class="block">
              <span class="mb-2 block text-sm font-bold text-stone-700">Mascota</span>
              <input
                v-model="form.petName"
                type="text"
                placeholder="Nombre de tu mascota"
                class="w-full rounded-3xl border border-stone-300 bg-stone-50 px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-stone-900"
              />
            </label>
          </div>

          <div class="mt-5">
            <span class="mb-2 block text-sm font-bold text-stone-700">Calificación</span>
            <div class="flex gap-2">
              <button
                v-for="value in 5"
                :key="value"
                type="button"
                class="flex h-12 w-12 items-center justify-center transition hover:scale-110"
                :class="value <= form.rating ? 'text-amber-900' : 'text-stone-300 hover:text-amber-800'"
                :aria-label="`${value} huellitas`"
                @click="form.rating = value"
              >
                <svg
                  class="h-8 w-8 rotate-[30deg]"
                  viewBox="0 0 64 64"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <ellipse cx="14.5" cy="27" rx="6.5" ry="9.6" transform="rotate(-27 14.5 27)" />
                  <ellipse cx="27" cy="13.2" rx="6.8" ry="10" transform="rotate(-6 27 13.2)" />
                  <ellipse cx="42" cy="13.2" rx="6.8" ry="10" transform="rotate(10 42 13.2)" />
                  <ellipse cx="54.5" cy="27" rx="6.5" ry="9.6" transform="rotate(27 54.5 27)" />
                  <path d="M34.5 32.2c7.2 0 13.5 8.9 16.1 16.2 2 5.8-1.7 11.3-7.7 10.5-3.1-.4-5.1-2.2-8.4-2.2s-5.3 1.8-8.4 2.2c-6 .8-9.7-4.7-7.7-10.5 2.6-7.3 8.9-16.2 16.1-16.2Z" />
                </svg>
              </button>
            </div>
          </div>

          <label class="mt-5 block">
            <span class="mb-2 block text-sm font-bold text-stone-700">Reseña</span>
            <textarea
              v-model="form.comment"
              rows="4"
              placeholder="Cuéntanos cómo fue tu experiencia de compra"
              class="w-full rounded-3xl border border-stone-300 bg-stone-50 px-4 py-3 text-sm text-stone-900 outline-none transition focus:border-stone-900"
            ></textarea>
          </label>

          <button
            type="submit"
            class="mt-5 w-full rounded-3xl px-6 py-3.5 text-sm font-black text-white transition hover:bg-amber-500 hover:text-stone-950 disabled:cursor-not-allowed disabled:opacity-60"
            :class="canSubmit ? 'bg-stone-950' : 'bg-stone-300 text-stone-500 hover:bg-stone-300 hover:text-stone-500'"
            :disabled="!canSubmit"
          >
            Publicar reseña
          </button>
        </form>
      </div>

      <div>
        <div
          class="grid gap-4"
          :class="showAllReviews ? 'max-h-[36rem] overflow-y-auto pr-2' : ''"
        >
          <article
            v-for="review in displayedReviews"
            :key="review.id"
            class="rounded-[1.5rem] border border-stone-200 bg-white p-6 shadow-sm"
          >
            <div class="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 class="text-lg font-black text-stone-950">{{ review.name }}</h3>
                <p class="mt-1 text-sm font-semibold text-stone-500">{{ review.petName }}</p>
              </div>
              <p class="flex gap-1.5 text-amber-900" :aria-label="`${review.rating} huellitas`">
                <svg
                  v-for="value in review.rating"
                  :key="value"
                  class="h-6 w-6 rotate-[30deg]"
                  viewBox="0 0 64 64"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <ellipse cx="14.5" cy="27" rx="6.5" ry="9.6" transform="rotate(-27 14.5 27)" />
                  <ellipse cx="27" cy="13.2" rx="6.8" ry="10" transform="rotate(-6 27 13.2)" />
                  <ellipse cx="42" cy="13.2" rx="6.8" ry="10" transform="rotate(10 42 13.2)" />
                  <ellipse cx="54.5" cy="27" rx="6.5" ry="9.6" transform="rotate(27 54.5 27)" />
                  <path d="M34.5 32.2c7.2 0 13.5 8.9 16.1 16.2 2 5.8-1.7 11.3-7.7 10.5-3.1-.4-5.1-2.2-8.4-2.2s-5.3 1.8-8.4 2.2c-6 .8-9.7-4.7-7.7-10.5 2.6-7.3 8.9-16.2 16.1-16.2Z" />
                </svg>
              </p>
            </div>
            <p class="mt-4 text-sm leading-6 text-stone-600">{{ review.comment }}</p>
          </article>
        </div>

        <button
          v-if="hasMoreReviews"
          type="button"
          class="mt-5 w-full rounded-3xl border border-stone-300 bg-white px-6 py-3 text-sm font-black text-stone-900 transition hover:border-amber-400 hover:bg-amber-50"
          @click="showAllReviews = !showAllReviews"
        >
          {{ showAllReviews ? 'Ver menos reseñas' : `Ver ${reviews.length - 3} reseñas más` }}
        </button>
      </div>
    </div>
  </section>
</template>

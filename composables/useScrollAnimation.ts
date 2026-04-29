import { ref, onMounted, onUnmounted, type Ref } from 'vue'

export function useScrollAnimation(target: Ref<HTMLElement | null>, animationClass: string) {
  const isVisible = ref(false)
  let observer: IntersectionObserver | null = null

  const addAnimationClass = (element: HTMLElement) => {
    if (!isVisible.value) {
      isVisible.value = true
      element.classList.remove('opacity-0', 'translate-y-8', 'translate-y-4')
      element.classList.add(animationClass)
    }
  }

  const isInViewport = (element: HTMLElement) => {
    const rect = element.getBoundingClientRect()
    return rect.top < window.innerHeight * 0.9 && rect.bottom > 0
  }

  const handleScroll = () => {
    if (!target.value || isVisible.value) {
      return
    }

    if (isInViewport(target.value)) {
      addAnimationClass(target.value)
    }
  }

  const createObserver = () => {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
      return null
    }

    return new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible.value) {
            addAnimationClass(entry.target as HTMLElement)
          }
        })
      },
      {
        threshold: 0.1, // Activar cuando el 10% del elemento es visible
        rootMargin: '0px 0px -50px 0px'
      }
    )
  }

  onMounted(() => {
    if (!target.value) {
      return
    }

    observer = createObserver()

    if (observer) {
      observer.observe(target.value)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
  })

  onUnmounted(() => {
    if (observer && target.value) {
      observer.unobserve(target.value)
    }

    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('resize', handleScroll)
  })

  return {
    isVisible
  }
}
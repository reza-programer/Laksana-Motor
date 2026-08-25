import '../css/app.css'

import { createApp, type Directive } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const app = createApp(App)

// Global Scroll Reveal Directive using native IntersectionObserver
const vReveal: Directive<HTMLElement, { delay?: number }> = {
  mounted(el, binding) {
    el.classList.add('reveal-init')
    if (binding.value?.delay) {
      el.style.transitionDelay = `${binding.value.delay}ms`
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('reveal-active')
            observer.unobserve(el)
          }
        })
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    )

    observer.observe(el)
  },
}

app.directive('reveal', vReveal)

app.use(createPinia())
app.use(router)

app.mount('#app')

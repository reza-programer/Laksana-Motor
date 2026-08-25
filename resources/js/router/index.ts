import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import CustomerLayout from '@/layouts/CustomerLayout.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'

const routes: RouteRecordRaw[] = [
  // ─── Customer Routes ────────────────────────
  {
    path: '/',
    component: CustomerLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/pages/HomePage.vue'),
      },
      {
        path: 'katalog',
        name: 'katalog',
        component: () => import('@/pages/KatalogPage.vue'),
      },
      {
        path: 'motor/:id',
        name: 'motor-detail',
        component: () => import('@/pages/MotorDetailPage.vue'),
        props: true,
      },
    ],
  },

  // ─── Admin Routes ───────────────────────────
  {
    path: '/admin/login',
    name: 'admin-login',
    component: () => import('@/pages/admin/LoginPage.vue'),
  },
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        redirect: '/admin/dashboard',
      },
      {
        path: 'dashboard',
        name: 'admin-dashboard',
        component: () => import('@/pages/admin/DashboardPage.vue'),
      },
      {
        path: 'logo',
        name: 'admin-logo',
        component: () => import('@/pages/admin/LogoSettingsPage.vue'),
      },
      {
        path: 'settings',
        name: 'admin-settings',
        component: () => import('@/pages/admin/SettingsPage.vue'),
      },
      {
        path: 'motors',
        name: 'admin-motors',
        component: () => import('@/pages/admin/MotorListPage.vue'),
      },
      {
        path: 'motors/create',
        name: 'admin-motor-create',
        component: () => import('@/pages/admin/MotorFormPage.vue'),
      },
      {
        path: 'motors/:id/edit',
        name: 'admin-motor-edit',
        component: () => import('@/pages/admin/MotorFormPage.vue'),
        props: true,
      },
      {
        path: 'promos',
        name: 'admin-promos',
        component: () => import('@/pages/admin/PromoListPage.vue'),
      },
      {
        path: 'promos/create',
        name: 'admin-promo-create',
        component: () => import('@/pages/admin/PromoFormPage.vue'),
      },
      {
        path: 'promos/:id/edit',
        name: 'admin-promo-edit',
        component: () => import('@/pages/admin/PromoFormPage.vue'),
        props: true,
      },
      {
        path: 'testimonials',
        name: 'admin-testimonials',
        component: () => import('@/pages/admin/TestimonialListPage.vue'),
      },
      {
        path: 'testimonials/create',
        name: 'admin-testimonial-create',
        component: () => import('@/pages/admin/TestimonialFormPage.vue'),
      },
      {
        path: 'testimonials/:id/edit',
        name: 'admin-testimonial-edit',
        component: () => import('@/pages/admin/TestimonialFormPage.vue'),
        props: true,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            el: to.hash,
            behavior: 'smooth',
            top: 80,
          })
        }, 150)
      })
    }
    return { top: 0, behavior: 'smooth' }
  },
})

// Navigation guard for admin routes
router.beforeEach((to, _from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const isLoggedIn = localStorage.getItem('admin_token')
    if (!isLoggedIn) {
      next({ name: 'admin-login' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router

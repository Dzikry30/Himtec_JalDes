import { createRouter, createWebHistory } from 'vue-router'

// Import Views Publik
import HomeView from '../views/publik/HomeView.vue'
import KatalogView from '../views/publik/KatalogView.vue'
import DetailView from '../views/publik/DetailView.vue'
import JelajahView from '../views/publik/JelajahView.vue'
import AboutView from '../views/publik/AboutView.vue'
import LoginView from '../views/auth/LoginView.vue'
import RegisterView from '../views/auth/RegisterView.vue'

// Import Agensi
import AgencyDashboard from '../views/agensi/AgencyDashboard.vue'
import WisataSaya from '../views/agensi/WisataSaya.vue'
import DraftPromosi from '../views/agensi/DraftPromosi.vue'
import RiwayatView from '../views/agensi/RiwayatView.vue'

// Import Kades
import KadesDashboard from '../views/kades/KadesDashboard.vue'
import KadesModerasi from '../views/kades/KadesModerasi.vue'
import KadesDataWisata from '../views/kades/KadesDataWisata.vue'

// Import Admin
import AdminDashboard from '../views/admin/AdminDashboard.vue'
import DataKadesView from '../views/admin/DataKadesView.vue'
import DataDesaView from '../views/admin/DataDesaView.vue'
import DataAgensiView from '../views/admin/DataAgensiView.vue'

const routes = [
  // ================= PUBLIK =================
  
  // 1. UBAH ROOT (/) JADI JELAJAH (REELS)
  { path: '/', name: 'jelajah', component: JelajahView },
  
  // 2. HOME DIPINDAH KE /home
  { path: '/home', name: 'home', component: HomeView },
  
  { path: '/katalog', name: 'katalog', component: KatalogView },
  { path: '/destinasi/:id', name: 'detail', component: DetailView, props: true },
  { path: '/tentang', name: 'tentang', component: AboutView },

  // ================= AUTH =================
  { path: '/login', name: 'login', component: LoginView },
  { path: '/register', name: 'register', component: RegisterView },

  // ================= AGENSI =================
  { path: '/agensi/dashboard', name: 'agensi-dashboard', component: AgencyDashboard },
  { path: '/agensi/wisata', name: 'agensi-wisata', component: WisataSaya },
  { path: '/agensi/promosi', name: 'agensi-promosi', component: DraftPromosi },
  { path: '/agensi/riwayat', name: 'agensi-riwayat', component: RiwayatView },

  // ================= KADES =================
  { path: '/kades/dashboard', name: 'kades-dashboard', component: KadesDashboard },
  { path: '/kades/data-wisata', name: 'kades-data-wisata', component: KadesDataWisata },
  { path: '/kades/moderasi', name: 'kades-moderasi', component: KadesModerasi },

  // ================= ADMIN =================
  { path: '/admin/dashboard', name: 'admin-dashboard', component: AdminDashboard },
  { path: '/admin/desa', name: 'admin-desa', component: DataDesaView },
  { path: '/admin/kades', name: 'admin-kades', component: DataKadesView },
  { path: '/admin/agensi', name: 'admin-agensi', component: DataAgensiView },

  // Fallback
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// ================= SATPAM ROUTER =================
router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user') || 'null')
  
  const isProtected = to.path.startsWith('/kades') || to.path.startsWith('/agensi') || to.path.startsWith('/admin')

  if (isProtected && !user) {
    alert('Anda harus login terlebih dahulu!')
    return next('/login')
  }

  if (user) {
    // 1. Cek Kades
    if (to.path.startsWith('/kades') && user.role !== 'kd') {
      alert('Akses Ditolak! Anda bukan Kepala Desa.')
      if (user.role === 'admin') return next('/admin/dashboard')
      if (user.role === 'agensi') return next('/agensi/dashboard')
      return next('/')
    }

    // 2. Cek Agensi
    if (to.path.startsWith('/agensi') && user.role !== 'agensi') {
      alert('Akses Ditolak! Anda bukan Agensi.')
      if (user.role === 'admin') return next('/admin/dashboard')
      if (user.role === 'kd') return next('/kades/dashboard')
      return next('/')
    }

    // 3. Cek Admin
    if (to.path.startsWith('/admin') && user.role !== 'admin') {
      alert('Akses Ditolak! Anda bukan Admin.')
      if (user.role === 'kd') return next('/kades/dashboard')
      if (user.role === 'agensi') return next('/agensi/dashboard')
      return next('/')
    }

    // 4. Redirect kalau buka /login atau /register padahal udah login
    if (to.path === '/login' || to.path === '/register') {
      if (user.role === 'admin') return next('/admin/dashboard')
      if (user.role === 'kd') return next('/kades/dashboard')
      if (user.role === 'agensi') return next('/agensi/dashboard')
    }
  }

  next()
})

export default router
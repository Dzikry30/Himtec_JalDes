<template>
  <div class="flex flex-col min-h-screen">
    <Navbar v-if="showNavbar" />
    <main class="flex-1">
      <router-view />
    </main>
    <Footer v-if="showNavbar" />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: { Navbar, Footer },
  computed: {
    showNavbar() {
      const path = this.$route.path
      
      // 1. Sembunyikan di halaman Dashboard (Agensi, Kades, Admin)
      const isDashboard = path.startsWith('/agensi') || path.startsWith('/kades') || path.startsWith('/admin')
      
      // 2. Sembunyikan di halaman Reels (/) karena full screen
      const isReels = path === '/' 
      
      // Tampilkan Navbar di semua halaman SELAIN Dashboard & Reels (termasuk Login & Register)
      return !isDashboard && !isReels
    }
  }
}
</script>
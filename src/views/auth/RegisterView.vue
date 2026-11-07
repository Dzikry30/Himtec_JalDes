<template>
  <div class="min-h-screen relative flex items-center justify-center overflow-hidden bg-gray-900 pt-20 pb-10">
    
    <!-- BACKGROUND -->
    <div class="absolute inset-0 z-0">
      <video autoplay loop muted playsinline class="w-full h-full object-cover object-center" poster="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop">
        <source src="https://cdn.coverr.co/videos/coverr-a-village-in-the-mountains-1573/1080p.mp4" type="video/mp4" />
      </video>
      <div class="absolute inset-0 bg-black/70"></div>
    </div>

    <!-- LAYOUT UTAMA -->
    <div class="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex h-full items-center justify-between gap-12 py-10">
      
      <!-- KIRI (QUOTE) -->
      <div class="hidden lg:flex flex-col justify-center w-1/2 text-white">
        <h2 class="text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-6 drop-shadow-xl">
          Bergabunglah, <br /> Jadikan Desa Anda Terkenal.
        </h2>
        <p class="text-gray-200 text-xl drop-shadow-lg max-w-md leading-relaxed">
          Daftarkan agensi atau potensi wisata desa Anda sekarang. Gratis, mudah, dan langsung terhubung dengan wisatawan.
        </p>
      </div>

      <!-- KANAN (KARTU PUTIH) -->
      <div class="w-full lg:w-[550px] bg-white rounded-3xl shadow-2xl relative max-h-[85vh] overflow-y-auto custom-scrollbar">
        
        <div class="p-8 sm:p-10">
          <div class="text-center mb-8">
            <div class="lg:hidden inline-flex items-center gap-2 mb-4">
              <img :src="logo" alt="Logo" class="w-10 h-10 rounded-full object-cover" />
              <span class="font-extrabold text-lg text-gray-900">DesaWisata</span>
            </div>
            <h2 class="text-3xl font-extrabold text-gray-900 mb-2">Daftar Agensi Baru</h2>
            <p class="text-gray-500 text-sm">Lengkapi profil agensi dan akun pengguna Anda.</p>
          </div>

          <!-- Error Message -->
          <div v-if="errorMessage" class="mb-5 bg-red-50 text-red-600 p-3 rounded-xl text-sm border border-red-200">
            {{ errorMessage }}
          </div>

          <!-- Form -->
          <form @submit.prevent="handleRegister" class="space-y-6">
            
            <!-- 1. PROFIL AGENSI -->
            <div class="bg-gray-50 border border-gray-200 rounded-2xl p-6">
              <h3 class="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span class="bg-forest-100 text-forest-700 w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
                Profil Agensi
              </h3>
              
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-1.5">Nama Agensi <span class="text-red-500">*</span></label>
                  <input v-model="agency.nama_agensi" type="text" required placeholder="Contoh: Pesona Alam Wisata" class="block w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-forest-500 focus:border-forest-500 transition-all text-sm" />
                </div>
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-1.5">Nomor Telepon / WA <span class="text-red-500">*</span></label>
                  <input v-model="agency.nomor_telepon" type="text" required placeholder="Contoh: 08123456789" class="block w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-forest-500 focus:border-forest-500 transition-all text-sm" />
                </div>
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-1.5">NPWP Agensi <span class="text-gray-400 font-normal">(Opsional)</span></label>
                  <input v-model="agency.npwp" type="text" placeholder="Contoh: 01.234.567.8-123.000" class="block w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-forest-500 focus:border-forest-500 transition-all text-sm" />
                </div>
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-1.5">Deskripsi Agensi <span class="text-gray-400 font-normal">(Opsional)</span></label>
                  <textarea v-model="agency.deskripsi" rows="3" placeholder="Profil singkat agensi tour & travel..." class="block w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-forest-500 focus:border-forest-500 transition-all text-sm"></textarea>
                </div>
              </div>
            </div>

            <!-- 2. AKUN PENGGUNA -->
            <div class="bg-gray-50 border border-gray-200 rounded-2xl p-6">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <h3 class="font-bold text-gray-900 flex items-center gap-2">
                  <span class="bg-forest-100 text-forest-700 w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
                  Akun Pengguna
                </h3>
                <button type="button" @click="addUser" class="text-xs font-bold text-forest-700 bg-forest-100 hover:bg-forest-200 px-3 py-2 rounded-lg transition-colors">
                  + Tambah User
                </button>
              </div>
              <p class="text-xs text-gray-500 mb-4">User pertama otomatis menjadi akun utama (penanggung jawab).</p>

              <div v-for="(user, index) in users" :key="index" class="bg-white border border-gray-300 rounded-xl p-4 mb-3 relative">
                <div class="flex justify-between items-center mb-3">
                  <strong class="text-sm text-gray-800">User {{ index + 1 }} {{ index === 0 ? '(Akun Utama)' : '' }}</strong>
                  <span class="bg-forest-50 text-forest-700 text-[10px] font-bold px-2 py-1 rounded-md border border-forest-200">Role: Agensi</span>
                </div>
                
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label class="block text-xs font-bold text-gray-700 mb-1">Username <span class="text-red-500">*</span></label>
                    <input v-model="user.username" type="text" required placeholder="Username unik" class="block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-forest-500 transition-all text-xs" />
                  </div>
                  <div>
                    <label class="block text-xs font-bold text-gray-700 mb-1">Email <span class="text-red-500">*</span></label>
                    <input v-model="user.email" type="email" required placeholder="email@agensi.com" class="block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-forest-500 transition-all text-xs" />
                  </div>
                  <div>
                    <label class="block text-xs font-bold text-gray-700 mb-1">Password <span class="text-red-500">*</span></label>
                    <input v-model="user.password" type="password" required placeholder="Min. 6 karakter" class="block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-forest-500 transition-all text-xs" />
                  </div>
                </div>

                <button v-if="users.length > 1" type="button" @click="removeUser(index)" class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-xs shadow-md transition-colors" title="Hapus User">
                  ×
                </button>
              </div>
            </div>

            <!-- Tombol Submit -->
            <button type="submit" :disabled="isLoading" class="w-full flex justify-center items-center gap-2 py-4 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-forest-600 hover:bg-forest-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-forest-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed">
              <svg v-if="isLoading" class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              {{ isLoading ? 'Mendaftarkan...' : 'Daftar Sebagai Agensi Baru' }}
            </button>
          </form>

          <div class="mt-6 text-center">
            <p class="text-sm text-gray-600">
              Sudah punya akun? 
              <router-link to="/login" class="font-bold text-forest-600 hover:text-forest-700 hover:underline">Masuk di sini</router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import logo from '../../assets/logo.png'
import api from '../../services/api' // Import Jembatan Axios

export default { 
  name: 'RegisterView',
  data() {
    return {
      logo,
      agency: { nama_agensi: '', nomor_telepon: '', npwp: '', deskripsi: '' },
      users: [{ username: '', email: '', password: '' }],
      isLoading: false,
      errorMessage: ''
    }
  },
  methods: {
    addUser() {
      this.users.push({ username: '', email: '', password: '' })
    },
    removeUser(index) {
      if (this.users.length > 1) {
        this.users.splice(index, 1)
      }
    },
    async handleRegister() {
      this.isLoading = true
      this.errorMessage = ''

      try {
        // Gabungin data agensi & users jadi satu objek buat dikirim ke Laravel
        const payload = {
          ...this.agency,
          users: this.users
        }

        // Nembak API Register di Laravel
        const response = await api.post('/register-agensi', payload)

        // Jika sukses
        alert(response.data.message) // "Pendaftaran Agensi Berhasil! Silakan login."
        this.$router.push('/login')

      } catch (error) {
        // Tangkap pesan error validasi dari Laravel
        if (error.response && error.response.data && error.response.data.message) {
          this.errorMessage = error.response.data.message
          
          // Kalau error validasi (misal username udah dipakai), tampilin list errornya
          if (error.response.data.errors) {
            const firstError = Object.values(error.response.data.errors)[0][0];
            this.errorMessage = firstError;
          }
        } else {
          this.errorMessage = 'Gagal terhubung ke server. Coba lagi nanti.'
        }
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>

<style scoped>
/* Custom scrollbar */
.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 10px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
</style>
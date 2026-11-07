<template>
  <div class="bg-gray-50 min-h-screen pb-20">
    
    <!-- ================= HEADER KATALOG ================= -->
    <div class="bg-white border-b border-gray-200 pt-28 pb-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">Jelajahi Potensi Desa</h1>
        <p class="text-gray-500 text-base">Pilih desa, temukan keindahan alam, kuliner, dan kerajinan autentiknya.</p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
      
      <!-- ================= FILTER SECTION ================= -->
      <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-10">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">Pilih Desa Wisata</label>
            <div class="relative">
              <select class="w-full appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-xl focus:ring-forest-500 focus:border-forest-500 block p-4 pr-10 cursor-pointer">
                <option value="">Semua Desa</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">Cari Nama Destinasi / Wisata</label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" /></svg>
              </div>
              <input type="text" placeholder="Ketik nama tempat..." class="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-xl focus:ring-forest-500 focus:border-forest-500 block w-full pl-11 p-4" />
            </div>
          </div>
        </div>

        <!-- Filter Kategori -->
        <div class="mt-6 pt-6 border-t border-gray-100">
          <p class="text-sm font-bold text-gray-700 mb-3">Kategori Potensi:</p>
          <div class="flex flex-wrap gap-3">
            <button @click="setKategori('')" :class="['inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold border-2 transition-colors duration-200', activeKategori === '' ? 'bg-forest-800 text-white border-forest-800 shadow-md hover:bg-forest-900' : 'bg-white text-gray-600 border-gray-200 hover:border-forest-400 hover:text-forest-700 hover:bg-forest-50']">
              Semua Kategori
            </button>
            <button @click="setKategori('wisata')" :class="['inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold border-2 transition-colors duration-200', activeKategori === 'wisata' ? 'bg-forest-800 text-white border-forest-800 shadow-md hover:bg-forest-900' : 'bg-white text-gray-600 border-gray-200 hover:border-forest-400 hover:text-forest-700 hover:bg-forest-50']">
              Wisata Alam
            </button>
            <button @click="setKategori('kuliner')" :class="['inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold border-2 transition-colors duration-200', activeKategori === 'kuliner' ? 'bg-forest-800 text-white border-forest-800 shadow-md hover:bg-forest-900' : 'bg-white text-gray-600 border-gray-200 hover:border-forest-400 hover:text-forest-700 hover:bg-forest-50']">
              Kuliner Khas
            </button>
            <button @click="setKategori('kerajinan')" :class="['inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold border-2 transition-colors duration-200', activeKategori === 'kerajinan' ? 'bg-forest-800 text-white border-forest-800 shadow-md hover:bg-forest-900' : 'bg-white text-gray-600 border-gray-200 hover:border-forest-400 hover:text-forest-700 hover:bg-forest-50']">
              Kerajinan
            </button>
          </div>
        </div>
      </div>

      <!-- ================= HASIL KATALOG ================= -->
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-bold text-gray-900">Menampilkan Hasil</h2>
        <span v-if="isLoading" class="text-sm text-gray-500 font-medium">Memuat data dari server...</span>
        <span v-else class="text-sm text-gray-500 font-medium">{{ filteredDestinations.length }} Destinasi Ditemukan</span>
      </div>

      <!-- Loading Spinner -->
      <div v-if="isLoading" class="flex justify-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-forest-600"></div>
      </div>

      <!-- Grid Card -->
      <div v-else-if="filteredDestinations.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <DestinationCard 
          v-for="dest in filteredDestinations" 
          :key="dest.id" 
          :item="dest" 
        />
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300 mt-6">
        <svg class="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" /></svg>
        <h3 class="text-lg font-bold text-gray-800 mb-2">Destinasi tidak ditemukan</h3>
        <p class="text-sm text-gray-500">Data belum tersedia atau server Laravel mati.</p>
      </div>

    </div>
  </div>
</template>

<script>
import DestinationCard from '../../components/DestinationCard.vue'
import api from '../../services/api'

export default {
  name: 'KatalogView',
  components: { DestinationCard },
  data() {
    return {
      activeKategori: '',
      destinations: [],
      isLoading: true
    }
  },
  computed: {
    filteredDestinations() {
      if (!this.activeKategori) return this.destinations
      // Filter berdasarkan categorySlug
      return this.destinations.filter(
        (dest) => dest.categorySlug === this.activeKategori
      )
    }
  },
  mounted() {
    this.fetchData()
    this.activeKategori = this.$route.query.kategori || ''
  },
  watch: {
    '$route.query.kategori'(newKategori) {
      this.activeKategori = newKategori || ''
    }
  },
  methods: {
    async fetchData() {
      try {
        this.isLoading = true
        const response = await api.get('/wisata')
        
        this.destinations = response.data.data.map(item => {
          
          // ================= LOGIKA FALLBACK DATA =================
          
          // 1. Fallback Gambar
          // Kalau item.gambar kosong (null/""), pakai gambar dari Unsplash
          let gambarUrl = item.gambar;
          if (!gambarUrl || gambarUrl.trim() === '') {
            gambarUrl = 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?q=80&w=800&auto=format&fit=crop';
          }

          // 2. Fallback Kategori Slug
          // Ubah nama kategori "Wisata Alam" jadi "wisata" buat filter
          let slug = 'wisata';
          if (item.kategori) {
            const lowerKat = item.kategori.toLowerCase();
            if (lowerKat.includes('kuliner')) slug = 'kuliner';
            else if (lowerKat.includes('kerajinan')) slug = 'kerajinan';
          }

          // 3. Fallback WA
          let waNumber = item.no_wa || '6281234567890';

          return {
            id: item.id,
            title: item.nama_wisata || 'Tanpa Nama', 
            village: item.desa ? item.desa.nama : 'Desa Wisata', 
            category: item.kategori || 'Wisata',
            categorySlug: slug, // Hasil dari logika di atas
            description: item.deskripsi || 'Belum ada deskripsi untuk destinasi ini.',
            image: gambarUrl, // Hasil dari logika fallback gambar
            mapsUrl: item.link_maps || 'https://maps.google.com', // Fallback Maps
            waUrl: `https://wa.me/${waNumber}?text=Halo,%20saya%20tertarik%20dengan%20${item.nama_wisata || 'wisata%20ini'}`
          }
        })

      } catch (error) {
        console.error("Gagal ambil data dari Laravel:", error)
        alert("Gagal memuat data. Pastikan server Laravel nyala dan CORS udah di-setting.")
      } finally {
        this.isLoading = false
      }
    },
    setKategori(kategori) {
      this.activeKategori = kategori
      this.$router.push({ 
        path: '/katalog', 
        query: kategori ? { kategori: kategori } : {} 
      })
    }
  }
}
</script>
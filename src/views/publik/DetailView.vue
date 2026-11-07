<template>
  <div class="bg-gray-50 min-h-screen pb-20 pt-28">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- ================= BREADCRUMB ================= -->
      <nav class="flex items-center gap-2 text-sm font-medium text-gray-500 mb-6">
        <router-link to="/katalog" class="hover:text-forest-600 transition-colors flex items-center gap-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Katalog
        </router-link>
        <span class="text-gray-300">/</span>
        <span class="text-gray-900 font-bold truncate">{{ destination ? destination.title : 'Detail Destinasi' }}</span>
      </nav>

      <!-- ================= LOADING ================= -->
      <div v-if="isLoading" class="flex flex-col items-center justify-center py-32">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-forest-600 mb-4"></div>
        <p class="text-gray-500 text-sm animate-pulse">Memuat detail destinasi...</p>
      </div>

      <!-- ================= KONTEN UTAMA ================= -->
      <div v-else-if="destination" class="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        
        <!-- ================= HERO VIDEO ================= -->
        <div class="relative w-full aspect-video sm:aspect-[21/9] bg-black group">
          <!-- Video Dinamis -->
          <video 
            controls 
            autoplay 
            muted 
            loop 
            class="w-full h-full object-cover"
            :poster="destination.image"
          >
            <source :src="destination.videoUrl" type="video/mp4" />
            <!-- Teks fallback kalau browser nggak support video -->
            Browser Anda tidak mendukung tag video.
          </video>
          
          <!-- Overlay Gelap (Biar teks kebaca) -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>
          
          <!-- Judul di Atas Video -->
          <div class="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 pointer-events-none">
            <div>
              <span class="inline-block px-3 py-1 mb-2 rounded-full text-[10px] uppercase tracking-wider font-bold text-white bg-forest-600 shadow-sm">
                {{ destination.category || 'Kategori' }}
              </span>
              <h1 class="text-3xl sm:text-5xl font-extrabold text-white leading-tight drop-shadow-lg">
                {{ destination.title }}
              </h1>
              <div class="flex items-center gap-1.5 mt-2 text-white/90 text-sm font-medium">
                <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                {{ destination.village }}
              </div>
            </div>
          </div>
        </div>

        <!-- ================= KONTEN BAWAH (FOTO + TEKS) ================= -->
        <div class="p-6 sm:p-10">
          
          <!-- GALERI FOTO (Bento Grid) -->
          <div class="mb-10">
            <h3 class="text-lg font-bold text-gray-900 mb-4">Galeri Foto</h3>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              
              <!-- Foto 1 (Besar) -> Ambil dari gambar utama destinasi -->
              <div class="col-span-2 md:col-span-2 aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
                <img :src="destination.image" class="w-full h-full object-cover hover:scale-110 transition-transform duration-500 cursor-pointer" alt="Galeri Utama" />
              </div>
              
              <!-- Foto 2 s/d 6 (Dummy Unsplash karena DB belum punya galeri) -->
              <div class="aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
                <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=400&auto=format&fit=crop" class="w-full h-full object-cover hover:scale-110 transition-transform duration-500 cursor-pointer" alt="Galeri 2" />
              </div>
              <div class="aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
                <img src="https://images.unsplash.com/photo-1518182170546-076616fd4afc?q=80&w=400&auto=format&fit=crop" class="w-full h-full object-cover hover:scale-110 transition-transform duration-500 cursor-pointer" alt="Galeri 3" />
              </div>
              <div class="aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
                <img src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=400&auto=format&fit=crop" class="w-full h-full object-cover hover:scale-110 transition-transform duration-500 cursor-pointer" alt="Galeri 4" />
              </div>
              <div class="aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
                <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=400&auto=format&fit=crop" class="w-full h-full object-cover hover:scale-110 transition-transform duration-500 cursor-pointer" alt="Galeri 5" />
              </div>
              <div class="col-span-2 md:col-span-2 aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
                <img src="https://images.unsplash.com/photo-1530866495561-507c9faab2ed?q=80&w=800&auto=format&fit=crop" class="w-full h-full object-cover hover:scale-110 transition-transform duration-500 cursor-pointer" alt="Galeri 6" />
              </div>

            </div>
          </div>

          <!-- DESKRIPSI & TOMBOL AKSI (2 Kolom) -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            
            <!-- Kiri: Deskripsi -->
            <div class="lg:col-span-2">
              <h3 class="text-lg font-bold text-gray-900 mb-3 border-b border-gray-100 pb-2 flex items-center gap-2">
                <svg class="w-5 h-5 text-forest-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Tentang Destinasi
              </h3>
              <div class="prose prose-sm sm:prose-base prose-forest max-w-none text-gray-600 leading-relaxed">
                {{ destination.description }}
              </div>
            </div>

            <!-- Kanan: Tombol Aksi (Sticky Card) -->
            <div class="lg:col-span-1">
              <div class="bg-gray-50 rounded-2xl p-5 border border-gray-100 sticky top-28">
                <h4 class="text-sm font-bold text-gray-900 mb-4">Tertarik Berkunjung?</h4>
                
                <div class="flex flex-col gap-3">
                  <!-- Tombol Maps -->
                  <a 
                    :href="destination.mapsUrl" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="group flex items-center justify-between bg-white hover:bg-gray-100 text-forest-700 border border-gray-200 font-bold px-5 py-3.5 rounded-xl shadow-sm transition-all"
                  >
                    <div class="flex items-center gap-3">
                      <svg class="w-5 h-5 text-forest-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      <span>Buka Maps</span>
                    </div>
                    <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </a>

                  <!-- Tombol WhatsApp -->
                  <a 
                    :href="destination.waUrl" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="group flex items-center justify-between bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold px-5 py-3.5 rounded-xl shadow-md transition-all"
                  >
                    <div class="flex items-center gap-3">
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                      <span>WhatsApp</span>
                    </div>
                    <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
      
      <!-- ================= ERROR STATE ================= -->
      <div v-else class="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300 shadow-sm mt-6 max-w-2xl mx-auto">
        <div class="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">Destinasi Tidak Ditemukan</h3>
        <p class="text-sm text-gray-500 mb-6 max-w-md mx-auto">Maaf, data destinasi dengan ID {{ id }} tidak tersedia di server.</p>
        <router-link to="/katalog" class="inline-flex items-center gap-2 bg-forest-600 hover:bg-forest-700 text-white font-bold px-6 py-3 rounded-xl shadow-md transition-colors">
          Kembali ke Katalog
        </router-link>
      </div>

    </div>
  </div>
</template>

<script>
import api from '../../services/api'

export default { 
  name: 'DetailView',
  props: {
    id: { type: [String, Number], required: true }
  },
  data() {
    return {
      destination: null,
      isLoading: true
    }
  },
  mounted() {
    this.fetchDetail()
  },
  methods: {
    async fetchDetail() {
      try {
        this.isLoading = true
        const response = await api.get(`/wisata/${this.id}`)
        const item = response.data.data

        // ================= LOGIKA FALLBACK =================
        
        // 1. Fallback Gambar
        let gambarUrl = item.gambar;
        if (!gambarUrl || gambarUrl.trim() === '') {
          gambarUrl = 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?q=80&w=1200&auto=format&fit=crop';
        }

        // 2. Fallback Video Promosi
        let videoUrl = item.video_url;
        if (!videoUrl || videoUrl.trim() === '') {
          // Pakai video sampel kalau database kosong
          videoUrl = 'https://cdn.coverr.co/videos/coverr-a-village-in-the-mountains-1573/1080p.mp4';
        }

        this.destination = {
          id: item.id,
          title: item.nama_wisata || 'Tanpa Nama', 
          category: item.kategori || 'Wisata',
          village: item.desa ? item.desa.nama_desa : 'Lokasi Desa',
          description: item.deskripsi || 'Tidak ada deskripsi.',
          image: gambarUrl,
          videoUrl: videoUrl,
          mapsUrl: item.link_maps || 'https://maps.google.com',
          waUrl: `https://wa.me/${item.no_wa || '6281234567890'}?text=Halo,%20saya%20tertarik%20dengan%20${item.nama_wisata || 'wisata%20ini'}`
        }
      } catch (error) {
        console.error("Gagal ambil detail dari Laravel:", error)
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>
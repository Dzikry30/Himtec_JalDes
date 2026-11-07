<template>
  <div class="bg-white">
    
    <!-- ================= HERO ABOUT ================= -->
    <header class="relative bg-forest-50 pt-36 pb-24 overflow-hidden border-b border-forest-100">
      <!-- Ornamen Latar -->
      <div class="absolute inset-0 opacity-40">
        <div class="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-forest-200 blur-3xl"></div>
        <div class="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-emerald-200 blur-3xl"></div>
      </div>
      
      <!-- Pola Titik (Dot Pattern) -->
      <div class="absolute inset-0" style="background-image: radial-gradient(#3f5c44 1px, transparent 1px); background-size: 32px 32px; opacity: 0.05;"></div>

      <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span class="inline-flex items-center gap-2 bg-white text-forest-800 text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full mb-6 shadow-sm border border-forest-100">
          <svg class="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          Tentang Kami
        </span>
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
          Menghubungkan Wisatawan <br class="hidden sm:block" />
          dengan <span class="text-emerald-500">Pengelola Desa</span>
        </h1>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          JALDES adalah direktori wisata desa yang dibangun untuk mempromosikan keindahan, kuliner, dan kerajinan autentik langsung dari sumbernya.
        </p>
      </div>
    </header>

    <!-- ================= VISI & MISI ================= -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <!-- Gambar Kiri -->
        <div class="relative group">
          <!-- Bingkai Hijau -->
          <div class="absolute inset-0 bg-forest-600 translate-x-4 translate-y-4 rounded-3xl transition-transform duration-500 group-hover:translate-x-6 group-hover:translate-y-6"></div>
          <!-- Gambar -->
          <img 
            src="https://images.unsplash.com/photo-1542718610-a1d656d1884c?q=80&w=1000&auto=format&fit=crop" 
            alt="Pemandangan Desa" 
            class="relative z-10 w-full h-[450px] object-cover rounded-3xl shadow-xl"
          />
          <!-- Badge Melayang -->
          <div class="absolute -bottom-6 -right-6 z-20 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-gray-100 hidden sm:flex">
            <div class="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" /></svg>
            </div>
            <div>
              <p class="text-xs text-gray-500 font-bold uppercase">Mendukung</p>
              <p class="text-lg font-extrabold text-gray-900">Desa Lokal</p>
            </div>
          </div>
        </div>

        <!-- Teks Kanan -->
        <div>
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Mengapa JALDES Hadir?</h2>
          <p class="text-gray-600 leading-relaxed mb-6 text-lg">
            Banyak potensi desa yang luar biasa — mulai dari air terjun tersembunyi, kuliner khas warisan nenek moyang, hingga kerajinan tangan yang dibuat dengan penuh cinta — namun belum terpublikasi dengan baik. 
          </p>
          <p class="text-gray-600 leading-relaxed mb-10 text-lg">
            Kami hadir sebagai jembatan. Platform ini dirancang <b class="text-gray-900">tanpa sistem transaksi</b> di dalam web. Tugas kami hanya mempertemukan Anda dengan pengelola lokal.
          </p>

          <div class="space-y-6">
            <!-- Poin 1 -->
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-2xl bg-forest-50 flex items-center justify-center shrink-0 border border-forest-100">
                <svg class="w-6 h-6 text-forest-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
              </div>
              <div>
                <h4 class="text-lg font-bold text-gray-900 mb-1">Tanpa Perantara</h4>
                <p class="text-gray-500 leading-relaxed">Hubungi pengelola desa langsung via WhatsApp tanpa potongan biaya.</p>
              </div>
            </div>
            <!-- Poin 2 -->
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-2xl bg-forest-50 flex items-center justify-center shrink-0 border border-forest-100">
                <svg class="w-6 h-6 text-forest-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div>
                <h4 class="text-lg font-bold text-gray-900 mb-1">Pemberdayaan Ekonomi Lokal</h4>
                <p class="text-gray-500 leading-relaxed">100% keuntungan kembali ke masyarakat desa untuk kesejahteraan bersama.</p>
              </div>
            </div>
            <!-- Poin 3 -->
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-2xl bg-forest-50 flex items-center justify-center shrink-0 border border-forest-100">
                <svg class="w-6 h-6 text-forest-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" /></svg>
              </div>
              <div>
                <h4 class="text-lg font-bold text-gray-900 mb-1">Autentik & Alami</h4>
                <p class="text-gray-500 leading-relaxed">Menampilkan potensi asli desa tanpa rekayasa, apa adanya dan apa yang terbaik.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- ================= CARA KERJA (3 LANGKAH) ================= -->
    <section class="bg-gray-50 py-24 border-y border-gray-200 relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Bagaimana Cara Kerjanya?</h2>
          <p class="text-gray-500 max-w-2xl mx-auto text-lg">Tiga langkah mudah untuk memulai petualangan Anda menjelajahi desa.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          <!-- Garis Penghubung (Desktop Only) -->
          <div class="hidden md:block absolute top-10 left-[15%] right-[15%] h-0.5 border-t-2 border-dashed border-forest-300 z-0"></div>

          <!-- Langkah 1 -->
          <div class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center relative z-10 hover:-translate-y-2 transition-transform duration-300">
            <div class="w-20 h-20 bg-forest-50 border-4 border-white shadow-sm text-forest-600 rounded-full flex items-center justify-center mx-auto mb-6 relative">
              <span class="text-3xl font-extrabold">1</span>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Pilih Desa</h3>
            <p class="text-gray-500 leading-relaxed">
              Jelajahi katalog atau tonton Reels untuk menemukan desa yang menarik hati Anda.
            </p>
          </div>

          <!-- Langkah 2 -->
          <div class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center relative z-10 hover:-translate-y-2 transition-transform duration-300">
            <div class="w-20 h-20 bg-forest-50 border-4 border-white shadow-sm text-forest-600 rounded-full flex items-center justify-center mx-auto mb-6 relative">
              <span class="text-3xl font-extrabold">2</span>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Lihat Potensi</h3>
            <p class="text-gray-500 leading-relaxed">
              Cek destinasi wisata, kuliner khas, dan kerajinan yang ditawarkan oleh desa tersebut.
            </p>
          </div>

          <!-- Langkah 3 -->
          <div class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center relative z-10 hover:-translate-y-2 transition-transform duration-300">
            <div class="w-20 h-20 bg-forest-50 border-4 border-white shadow-sm text-forest-600 rounded-full flex items-center justify-center mx-auto mb-6 relative">
              <span class="text-3xl font-extrabold">3</span>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Hubungi Pengelola</h3>
            <p class="text-gray-500 leading-relaxed">
              Klik tombol WhatsApp untuk berkomunikasi langsung dengan pengelola lokal dan atur kunjungan.
            </p>
          </div>

        </div>
      </div>
    </section>

    <!-- ================= CTA JOIN AGENCY ================= -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div class="bg-gradient-to-br from-forest-800 to-forest-900 rounded-[3rem] p-10 sm:p-20 text-center relative overflow-hidden shadow-2xl">
        <!-- Ornamen Glow -->
        <div class="absolute top-0 right-0 w-80 h-80 bg-emerald-500 rounded-full mix-blend-screen filter blur-[100px] opacity-30"></div>
        <div class="absolute bottom-0 left-0 w-80 h-80 bg-emerald-400 rounded-full mix-blend-screen filter blur-[100px] opacity-20"></div>
        
        <div class="relative z-10">
          <span class="inline-block bg-white/10 border border-emerald-500 text-emerald-300 text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-6">
            Kolaborasi
          </span>
          <h2 class="text-3xl sm:text-5xl font-extrabold text-dark mb-6 leading-tight">
            Apakah Anda Pengelola <br class="hidden sm:block" /> Desa Wisata?
          </h2>
          <p class="text-forest-100 text-lg mb-10 max-w-2xl mx-auto">
            Bergabunglah dengan kami. Daftarkan potensi desa Anda secara gratis dan jangkau wisatawan dari seluruh Indonesia.
          </p>
          <router-link to="/register" class="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-8 py-4 rounded-full transition-all shadow-lg hover:shadow-emerald-500/25 group">
            Daftar Jadi Agensi Sekarang
            <svg class="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </router-link>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
export default {
  name: 'AboutView'
}
</script>
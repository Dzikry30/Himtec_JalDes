<template>
  <DashboardLayout pageTitle="Data Wisata Desa">
    
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h2 class="text-2xl font-bold text-gray-900 mb-1">Data Wisata Desa</h2>
        <p class="text-sm text-gray-500">Daftar destinasi yang sudah disetujui dan tayang.</p>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="isLoading" class="flex justify-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-forest-600"></div>
    </div>

    <!-- Tabel -->
    <div v-else class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <table class="w-full text-sm text-left">
        <thead class="bg-gray-50 text-gray-500 font-bold">
          <tr>
            <th class="px-6 py-4">Nama Wisata</th>
            <th class="px-6 py-4">Kategori</th>
            <th class="px-6 py-4">Lokasi</th>
            <th class="px-6 py-4">Agensi Pengelola</th>
            <th class="px-6 py-4">Status</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="w in approvedWisata" :key="w.id" class="hover:bg-gray-50 transition-colors">
            <td class="px-6 py-4 font-bold text-gray-900">{{ w.nama_wisata }}</td>
            <td class="px-6 py-4">
              <span class="text-xs font-semibold px-2 py-1 rounded-md"
                :class="{
                  'text-emerald-700 bg-emerald-50': w.kategori === 'wisata',
                  'text-orange-700 bg-orange-50': w.kategori === 'kuliner',
                  'text-blue-700 bg-blue-50': w.kategori === 'kerajinan',
                  'text-gray-600 bg-gray-100': !['wisata', 'kuliner', 'kerajinan'].includes(w.kategori)
                }"
              >
                {{ w.kategori || 'Wisata' }}
              </span>
            </td>
            <td class="px-6 py-4 text-gray-600">{{ w.jalan || '-' }}</td>
            <td class="px-6 py-4 text-gray-600">{{ w.agensi?.nama_agensi || '-' }}</td>
            <td class="px-6 py-4">
              <span class="bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full">Tayang</span>
            </td>
          </tr>

          <!-- Empty State -->
          <tr v-if="approvedWisata.length === 0">
            <td colspan="5" class="px-6 py-12 text-center text-gray-400">
              Belum ada wisata yang disetujui.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  </DashboardLayout>
</template>

<script>
import DashboardLayout from '../../layouts/DashboardLayout.vue'
import api from '../../services/api'

export default { 
  name: 'KadesDataWisata',
  components: { DashboardLayout },
  data() {
    return {
      wisataList: [],
      isLoading: true
    }
  },
  computed: {
    // Filter data yang statusnya true (Tayang)
    approvedWisata() {
      return this.wisataList.filter(w => w.status === true)
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      try {
        this.isLoading = true
        const res = await api.get('/wisata')
        this.wisataList = res.data.data
      } catch (error) {
        console.error("Gagal memuat data:", error)
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>
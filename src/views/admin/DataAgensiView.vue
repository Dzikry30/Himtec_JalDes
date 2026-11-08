<template>
  <DashboardLayout pageTitle="Data Agensi">
    
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-1">Data Agensi</h2>
      <p class="text-sm text-gray-500">Daftar semua Agensi yang terdaftar di sistem.</p>
    </div>

    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      
      <!-- Loading State -->
      <div v-if="isLoading" class="p-10 text-center text-gray-500">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-forest-600 mx-auto mb-3"></div>
        Memuat data...
      </div>

      <!-- Tabel Data -->
      <table v-else class="w-full text-sm text-left">
        <thead class="bg-gray-50 text-gray-500 font-bold">
          <tr>
            <th class="px-6 py-4">Nama Agensi</th>
            <th class="px-6 py-4">Username</th>
            <th class="px-6 py-4">Email</th>
            <th class="px-6 py-4">No. Telepon</th>
            <th class="px-6 py-4">NPWP</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <!-- Looping pakai optional chaining (?) biar aman -->
          <tr v-for="(a, index) in agensiList" :key="a?.id || index" class="hover:bg-gray-50 transition-colors">
            <td class="px-6 py-4 font-medium text-gray-900">
              {{ a?.nama_agensi || '-' }}
              <p class="text-xs text-gray-400 mt-1 line-clamp-1" v-if="a?.deskripsi">{{ a.deskripsi }}</p>
            </td>
            <td class="px-6 py-4 text-gray-600">{{ a?.user?.username || '-' }}</td>
            <td class="px-6 py-4 text-gray-600">{{ a?.user?.email || '-' }}</td>
            <td class="px-6 py-4">{{ a?.nomor_telepon || '-' }}</td>
            <td class="px-6 py-4 text-gray-600">{{ a?.npwp || '-' }}</td>
          </tr>
          
          <!-- Empty State -->
          <tr v-if="agensiList.length === 0">
            <td colspan="5" class="px-6 py-12 text-center text-gray-400">
              Belum ada data Agensi yang terdaftar.
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
  name: 'DataAgensiView',
  components: { DashboardLayout },
  data() {
    return {
      agensiList: [],
      isLoading: true
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      try {
        this.isLoading = true
        const res = await api.get('/agensi')
        
        console.log("Response dari Laravel:", res.data)

        // Antisipasi format response (kadang dibungkus { data: [...] }, kadang array langsung)
        let data = res.data.data ? res.data.data : res.data
        
        // Pastiin data yang masuk beneran array
        if (Array.isArray(data)) {
          this.agensiList = data
        } else {
          this.agensiList = []
        }

      } catch (error) {
        console.error("Gagal ambil data:", error)
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>
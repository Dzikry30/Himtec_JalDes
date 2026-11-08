<template>
  <DashboardLayout pageTitle="Wisata Saya">
    
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h2 class="text-2xl font-bold text-gray-900 mb-1">Daftar Wisata</h2>
        <p class="text-sm text-gray-500">Kelola destinasi wisata yang Anda daftarkan.</p>
      </div>
      <button @click="openModal()" class="inline-flex items-center gap-2 bg-forest-600 hover:bg-forest-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-md transition-colors">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
        Tambah Wisata
      </button>
    </div>

    <!-- Tabel -->
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div v-if="isLoading" class="p-10 text-center text-gray-500">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-forest-600 mx-auto mb-3"></div>
        Memuat data...
      </div>
      
      <table v-else class="w-full text-sm text-left">
        <thead class="bg-gray-50 text-gray-500 font-bold">
          <tr>
            <th class="px-6 py-4">Nama Wisata</th>
            <th class="px-6 py-4">Lokasi</th>
            <th class="px-6 py-4">Status</th>
            <th class="px-6 py-4 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="w in wisataList" :key="w.id" class="hover:bg-gray-50 transition-colors">
            <td class="px-6 py-4 font-bold text-gray-900">{{ w.nama_wisata }}</td>
            <td class="px-6 py-4 text-gray-600">{{ w.jalan || '-' }}</td>
            <td class="px-6 py-4">
              <span v-if="w.status === true" class="bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full">Approved</span>
              <span v-else-if="w.status === false" class="bg-red-100 text-red-700 text-xs font-bold px-2.5 py-1 rounded-full">Rejected</span>
              <span v-else class="bg-orange-100 text-orange-700 text-xs font-bold px-2.5 py-1 rounded-full">Pending</span>
            </td>
            <td class="px-6 py-4 text-right space-x-2">
              <button @click="openModal(w)" class="text-emerald-600 hover:text-emerald-800 font-semibold text-xs">Edit</button>
              <button @click="confirmDelete(w)" class="text-red-600 hover:text-red-800 font-semibold text-xs">Hapus</button>
            </td>
          </tr>
          <tr v-if="wisataList.length === 0">
            <td colspan="4" class="px-6 py-12 text-center text-gray-400">
              Belum ada data wisata. Klik "Tambah Wisata" untuk mulai.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- MODAL TAMBAH/EDIT -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div class="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden">
        <div class="bg-forest-800 text-white px-6 py-4 flex justify-between items-center">
          <h3 class="font-bold text-lg">{{ isEdit ? 'Edit Data Wisata' : 'Tambah Data Wisata' }}</h3>
          <button @click="closeModal" class="text-white/80 hover:text-white text-2xl">&times;</button>
        </div>
        
        <div class="p-6 max-h-[70vh] overflow-y-auto">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="sm:col-span-2">
              <label class="block text-sm font-bold text-gray-700 mb-1">Nama Wisata *</label>
              <input v-model="form.nama_wisata" type="text" placeholder="Nama Destinasi" class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-500" />
            </div>
            <div class="sm:col-span-2">
              <label class="block text-sm font-bold text-gray-700 mb-1">Alamat / Jalan *</label>
              <input v-model="form.jalan" type="text" placeholder="Alamat lengkap" class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-500" />
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1">Kode Pos *</label>
              <select v-model="form.kode_pos" class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-500">
                <option value="">Pilih Desa</option>
                <option v-for="d in desaList" :key="d.kode_pos" :value="d.kode_pos">
                  {{ d.nama_desa }} ({{ d.kode_pos }})
                </option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1">Kategori</label>
              <select v-model="form.kategori" class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-500">
                <option value="wisata">Wisata Alam</option>
                <option value="kuliner">Kuliner Khas</option>
                <option value="kerajinan">Kerajinan</option>
              </select>
            </div>
            <div class="sm:col-span-2">
              <label class="block text-sm font-bold text-gray-700 mb-1">Deskripsi</label>
              <textarea v-model="form.deskripsi" rows="3" placeholder="Ceritakan keunikan destinasi..." class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-500"></textarea>
            </div>
            <div class="sm:col-span-2">
              <label class="block text-sm font-bold text-gray-700 mb-1">Gambar URL *</label>
              <input v-model="form.gambar" type="text" placeholder="https://..." class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-500" />
            </div>
            <div class="sm:col-span-2">
              <label class="block text-sm font-bold text-gray-700 mb-1">Video URL *</label>
              <input v-model="form.video" type="text" placeholder="https://..." class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-500" />
            </div>
            <div class="sm:col-span-2">
              <label class="block text-sm font-bold text-gray-700 mb-1">Video Promosi URL *</label>
              <input v-model="form.video_promosi" type="text" placeholder="https://..." class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-500" />
            </div>
          </div>
        </div>

        <div class="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
          <button @click="closeModal" class="px-5 py-2.5 font-bold text-gray-600 hover:text-gray-900 bg-white border border-gray-300 rounded-xl">Batal</button>
          <button @click="saveData" :disabled="isSaving" class="px-5 py-2.5 font-bold text-white bg-forest-600 hover:bg-forest-700 rounded-xl shadow-md disabled:opacity-70">
            {{ isSaving ? 'Menyimpan...' : 'Simpan Data' }}
          </button>
        </div>
      </div>
    </div>

    <!-- MODAL HAPUS -->
    <div v-if="showDeleteModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
        <div class="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">Hapus Data Wisata?</h3>
        <p class="text-sm text-gray-500 mb-6">Yakin ingin menghapus <b>{{ deleteTarget?.nama_wisata }}</b>?</p>
        <div class="flex gap-3">
          <button @click="showDeleteModal = false" class="flex-1 py-2.5 font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl">Batal</button>
          <button @click="deleteData" class="flex-1 py-2.5 font-bold text-white bg-red-500 hover:bg-red-600 rounded-xl">Ya, Hapus</button>
        </div>
      </div>
    </div>

  </DashboardLayout>
</template>

<script>
import DashboardLayout from '../../layouts/DashboardLayout.vue'
import api from '../../services/api'

export default {
  name: 'WisataSaya',
  components: { DashboardLayout },
  data() {
    return {
      wisataList: [],
      desaList: [],
      isLoading: true,
      showModal: false,
      showDeleteModal: false,
      isEdit: false,
      isSaving: false,
      deleteTarget: null,
      form: {
        id: '',
        nama_wisata: '',
        jalan: '',
        kode_pos: '',
        kategori: 'wisata',
        deskripsi: '',
        gambar: '',
        video: '',
        video_promosi: ''
      }
    }
  },
  mounted() {
    this.fetchData()
    this.fetchDesa()
  },
  methods: {
    async fetchData() {
      try {
        this.isLoading = true
        const res = await api.get('/wisata')
        this.wisataList = res.data.data
      } catch (error) {
        console.error(error)
        alert("Gagal memuat data wisata.")
      } finally {
        this.isLoading = false
      }
    },
    async fetchDesa() {
      try {
        const res = await api.get('/desa')
        this.desaList = res.data.data
      } catch (error) {
        console.error("Gagal ambil data desa:", error)
      }
    },
    openModal(data = null) {
      this.showModal = true
      if (data) {
        this.isEdit = true
        this.form = {
          id: data.id,
          nama_wisata: data.nama_wisata,
          jalan: data.jalan,
          kode_pos: data.kode_pos,
          kategori: data.kategori || 'wisata',
          deskripsi: data.deskripsi || '',
          gambar: data.gambar || '',
          video: data.video || '',
          video_promosi: data.video_promosi || ''
        }
      } else {
        this.isEdit = false
        this.form = {
          id: '',
          nama_wisata: '',
          jalan: '',
          kode_pos: '',
          kategori: 'wisata',
          deskripsi: '',
          gambar: '',
          video: '',
          video_promosi: ''
        }
      }
    },
    closeModal() {
      this.showModal = false
    },
    async saveData() {
      this.isSaving = true
      try {
        if (this.isEdit) {
          await api.put(`/wisata/${this.form.id}`, this.form)
        } else {
          await api.post('/wisata', this.form)
        }
        this.closeModal()
        this.fetchData()
      } catch (error) {
        alert(error.response?.data?.message || 'Terjadi kesalahan saat menyimpan.')
      } finally {
        this.isSaving = false
      }
    },
    confirmDelete(data) {
      this.deleteTarget = data
      this.showDeleteModal = true
    },
    async deleteData() {
      try {
        await api.delete(`/wisata/${this.deleteTarget.id}`)
        this.showDeleteModal = false
        this.fetchData()
      } catch (error) {
        alert('Gagal menghapus data.')
      }
    }
  }
}
</script>
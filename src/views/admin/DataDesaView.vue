<template>
  <DashboardLayout pageTitle="Data Desa">
    
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h2 class="text-2xl font-bold text-gray-900 mb-1">Data Desa</h2>
        <p class="text-sm text-gray-500">Kelola semua data Desa yang terdaftar di sistem.</p>
      </div>
      <button @click="openModal()" class="inline-flex items-center gap-2 bg-forest-600 hover:bg-forest-700 text-dark text-sm font-bold px-5 py-2.5 rounded-xl shadow-md transition-colors">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
        Tambah Desa
      </button>
    </div>

    <!-- Tabel -->
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div v-if="isLoading" class="p-10 text-center text-gray-500">Memuat data...</div>
      <table v-else class="w-full text-sm text-left">
        <thead class="bg-gray-50 text-gray-500 font-bold">
          <tr>
            <th class="px-6 py-4">Kode Pos</th>
            <th class="px-6 py-4">Nama Desa</th>
            <th class="px-6 py-4">Kecamatan</th>
            <th class="px-6 py-4">Kota / Provinsi</th>
            <th class="px-6 py-4">Kepala Desa</th>
            <th class="px-6 py-4 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="d in desaList" :key="d.kode_pos" class="hover:bg-gray-50 transition-colors">
            <td class="px-6 py-4 font-medium text-gray-900">{{ d.kode_pos }}</td>
            <td class="px-6 py-4 font-semibold text-emerald-700">{{ d.nama_desa }}</td>
            <td class="px-6 py-4">{{ d.kecamatan }}</td>
            <td class="px-6 py-4">{{ d.kota }}, {{ d.provinsi }}</td>
            <td class="px-6 py-4 text-gray-600">{{ d.kepala_desa?.nama || '-' }}</td>
            <td class="px-6 py-4 text-right space-x-2">
              <button @click="openModal(d)" class="text-emerald-600 hover:text-emerald-800 font-semibold text-xs">Edit</button>
              <button @click="confirmDelete(d)" class="text-red-600 hover:text-red-800 font-semibold text-xs">Hapus</button>
            </td>
          </tr>
          <tr v-if="desaList.length === 0">
            <td colspan="6" class="px-6 py-12 text-center text-gray-400">Belum ada data Desa.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- MODAL TAMBAH/EDIT -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div class="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden">
        <div class="bg-forest-800 text-white px-6 py-4 flex justify-between items-center">
          <h3 class="font-bold text-lg">{{ isEdit ? 'Edit Data Desa' : 'Tambah Data Desa' }}</h3>
          <button @click="closeModal" class="text-white/80 hover:text-white text-2xl">&times;</button>
        </div>
        
        <div class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-1">Kode Pos *</label>
            <input v-model="form.kode_pos" :disabled="isEdit" type="text" placeholder="Contoh: 40395" class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-500 disabled:opacity-60" />
          </div>
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-1">Nama Desa *</label>
            <input v-model="form.nama_desa" type="text" placeholder="Nama Desa" class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-500" />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1">Kecamatan *</label>
              <input v-model="form.kecamatan" type="text" placeholder="Kecamatan" class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-500" />
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1">Kota / Kab *</label>
              <input v-model="form.kota" type="text" placeholder="Kota/Kabupaten" class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-500" />
            </div>
          </div>
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-1">Provinsi *</label>
            <input v-model="form.provinsi" type="text" placeholder="Provinsi" class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-500" />
          </div>
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-1">NIPD Kepala Desa (Opsional)</label>
            <input v-model="form.nipd" type="text" placeholder="NIPD Kepala Desa (Jika sudah ada)" class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-500" />
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
        <h3 class="text-xl font-bold text-gray-900 mb-2">Hapus Data Desa?</h3>
        <p class="text-sm text-gray-500 mb-6">Anda yakin ingin menghapus <b>{{ deleteTarget?.nama_desa }}</b>?</p>
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
  name: 'DataDesaView',
  components: { DashboardLayout },
  data() {
    return {
      desaList: [],
      isLoading: true,
      showModal: false,
      showDeleteModal: false,
      isEdit: false,
      isSaving: false,
      deleteTarget: null,
      form: {
        kode_pos: '', nama_desa: '', kecamatan: '', kota: '', provinsi: '', nipd: ''
      }
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      try {
        this.isLoading = true
        const res = await api.get('/desa')
        this.desaList = res.data.data
      } catch (error) {
        alert("Gagal memuat data dari server.")
      } finally {
        this.isLoading = false
      }
    },
    openModal(data = null) {
      this.showModal = true
      if (data) {
        this.isEdit = true
        this.form = {
          kode_pos: data.kode_pos,
          nama_desa: data.nama_desa,
          kecamatan: data.kecamatan,
          kota: data.kota,
          provinsi: data.provinsi,
          nipd: data.nipd || ''
        }
      } else {
        this.isEdit = false
        this.form = {
          kode_pos: '', nama_desa: '', kecamatan: '', kota: '', provinsi: '', nipd: ''
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
          await api.put(`/desa/${this.form.kode_pos}`, this.form)
        } else {
          await api.post('/desa', this.form)
        }
        this.closeModal()
        this.fetchData()
      } catch (error) {
        alert(error.response?.data?.message || 'Terjadi kesalahan.')
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
        await api.delete(`/desa/${this.deleteTarget.kode_pos}`)
        this.showDeleteModal = false
        this.fetchData()
      } catch (error) {
        alert('Gagal menghapus data.')
      }
    }
  }
}
</script>
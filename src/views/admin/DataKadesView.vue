<template>
  <DashboardLayout pageTitle="Data Kepala Desa">
    
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h2 class="text-2xl font-bold text-gray-900 mb-1">Data Kepala Desa</h2>
        <p class="text-sm text-gray-500">Kelola data Kepala Desa yang terdaftar di sistem.</p>
      </div>
      <button @click="openModal()" class="inline-flex items-center gap-2 bg-forest-600 hover:bg-forest-700 text-dark text-sm font-bold px-5 py-2.5 rounded-xl shadow-md transition-colors">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
        Tambah Kades
      </button>
    </div>

    <!-- Tabel -->
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div v-if="isLoading" class="p-10 text-center text-gray-500">Memuat data...</div>
      <table v-else class="w-full text-sm text-left">
        <thead class="bg-gray-50 text-gray-500 font-bold">
          <tr>
            <th class="px-6 py-4">NIPD</th>
            <th class="px-6 py-4">Nama Kades</th>
            <th class="px-6 py-4">Username</th>
            <th class="px-6 py-4">No. Telepon</th>
            <th class="px-6 py-4 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="k in kadesList" :key="k.nipd" class="hover:bg-gray-50 transition-colors">
            <td class="px-6 py-4 font-medium text-gray-900">{{ k.nipd }}</td>
            <td class="px-6 py-4">{{ k.nama }}</td>
            <td class="px-6 py-4 text-gray-600">{{ k.user?.username || '-' }}</td>
            <td class="px-6 py-4 text-gray-600">{{ k.nomor_telepon }}</td>
            <td class="px-6 py-4 text-right space-x-2">
              <button @click="openModal(k)" class="text-emerald-600 hover:text-emerald-800 font-semibold text-xs">Edit</button>
              <button @click="confirmDelete(k)" class="text-red-600 hover:text-red-800 font-semibold text-xs">Hapus</button>
            </td>
          </tr>
          <tr v-if="kadesList.length === 0">
            <td colspan="5" class="px-6 py-12 text-center text-gray-400">Belum ada data Kepala Desa.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- MODAL TAMBAH/EDIT -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div class="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden">
        <div class="bg-forest-800 text-white px-6 py-4 flex justify-between items-center">
          <h3 class="font-bold text-lg">{{ isEdit ? 'Edit Data Kades' : 'Tambah Data Kades' }}</h3>
          <button @click="closeModal" class="text-white/80 hover:text-white text-2xl">&times;</button>
        </div>
        
        <div class="p-6 max-h-[70vh] overflow-y-auto">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="sm:col-span-2">
              <label class="block text-sm font-bold text-gray-700 mb-1">NIPD *</label>
              <input v-model="form.nipd" :disabled="isEdit" type="text" placeholder="Nomor Induk Pegawai Desa" class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-500 disabled:opacity-60" />
            </div>
            <div class="sm:col-span-2">
              <label class="block text-sm font-bold text-gray-700 mb-1">Nama Lengkap *</label>
              <input v-model="form.nama" type="text" placeholder="Nama Kepala Desa" class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-500" />
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1">NIK *</label>
              <input v-model="form.nik" type="text" placeholder="NIK Kades" class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-500" />
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1">No. Telepon *</label>
              <input v-model="form.nomor_telepon" type="text" placeholder="0812..." class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-500" />
            </div>
            <div class="sm:col-span-2 border-t border-gray-100 mt-4 pt-4">
              <h4 class="text-sm font-bold text-gray-900 mb-3">Akun Login Pengguna</h4>
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1">Username *</label>
              <input v-model="form.username" type="text" placeholder="Username unik" class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-500" />
            </div>
            <div>
              <label class="block text-sm font-bold text-gray-700 mb-1">Email *</label>
              <input v-model="form.email" type="email" placeholder="email@desa.com" class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-500" />
            </div>
            <div class="sm:col-span-2">
              <label class="block text-sm font-bold text-gray-700 mb-1">Password {{ isEdit ? '(Opsional)' : '*' }}</label>
              <input v-model="form.password" type="password" placeholder="Minimal 6 karakter" class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-forest-500" />
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
        <h3 class="text-xl font-bold text-gray-900 mb-2">Hapus Data?</h3>
        <p class="text-sm text-gray-500 mb-6">Yakin ingin menghapus <b>{{ deleteTarget?.nama }}</b>? Tindakan ini permanen.</p>
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
  name: 'DataKadesView',
  components: { DashboardLayout },
  data() {
    return {
      kadesList: [],
      isLoading: true,
      showModal: false,
      showDeleteModal: false,
      isEdit: false,
      isSaving: false,
      deleteTarget: null,
      form: {
        nipd: '', nama: '', nik: '', nomor_telepon: '',
        username: '', email: '', password: ''
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
        const res = await api.get('/kades')
        this.kadesList = res.data.data
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
          nipd: data.nipd,
          nama: data.nama,
          nik: data.nik,
          nomor_telepon: data.nomor_telepon,
          username: data.user?.username || '',
          email: data.user?.email || '',
          password: ''
        }
      } else {
        this.isEdit = false
        this.form = {
          nipd: '', nama: '', nik: '', nomor_telepon: '',
          username: '', email: '', password: ''
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
          await api.put(`/kades/${this.form.nipd}`, this.form)
        } else {
          await api.post('/kades', this.form)
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
        await api.delete(`/kades/${this.deleteTarget.nipd}`)
        this.showDeleteModal = false
        this.fetchData()
      } catch (error) {
        alert('Gagal menghapus data.')
      }
    }
  }
}
</script>
<template>
  <DashboardLayout role="agensi" :userName="userName" pageTitle="Draft Promosi">
    
    <!-- ================= FILTER / SEARCH ================= -->
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
      <form @submit.prevent="handleSearch" class="flex flex-col sm:flex-row gap-3">
        <div class="relative flex-1">
          <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
            </svg>
          </div>
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Cari prompt atau nama wisata..." 
            class="block w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
          />
        </div>
        <div class="flex items-center gap-2">
          <button 
            type="submit" 
            class="px-5 py-2.5 bg-gray-900 hover:bg-black text-white text-sm font-bold rounded-xl transition-colors shadow-sm"
          >
            Cari
          </button>
          <button 
            v-if="searchQuery" 
            type="button" 
            @click="resetSearch" 
            class="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-semibold rounded-xl transition-colors"
          >
            Reset
          </button>
        </div>
      </form>
    </div>

    <!-- Alert / Notifikasi -->
    <div v-if="successMessage" class="mb-5 bg-emerald-50 text-emerald-700 p-4 rounded-xl text-sm font-medium border border-emerald-200 flex items-center justify-between">
      <span>{{ successMessage }}</span>
      <button @click="successMessage = ''" class="text-emerald-500 hover:text-emerald-800 font-bold">&times;</button>
    </div>
    <div v-if="errorMessage" class="mb-5 bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium border border-red-200 flex items-center justify-between">
      <span>{{ errorMessage }}</span>
      <button @click="errorMessage = ''" class="text-red-500 hover:text-red-800 font-bold">&times;</button>
    </div>

    <!-- ================= TABEL DRAFT PROMPT ================= -->
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left">
          <thead class="bg-gray-50 text-gray-600 font-bold text-xs uppercase tracking-wider border-b border-gray-100">
            <tr>
              <th scope="col" class="px-6 py-4">Objek Wisata</th>
              <th scope="col" class="px-6 py-4">Isi Promosi</th>
              <th scope="col" class="px-6 py-4">Waktu Dibuat</th>
              <th scope="col" class="px-6 py-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            
            <!-- Loading State -->
            <tr v-if="isLoading">
              <td colspan="4" class="px-6 py-12 text-center text-gray-500">
                <div class="flex flex-col items-center justify-center gap-2">
                  <svg class="animate-spin h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Memuat data draft prompt...</span>
                </div>
              </td>
            </tr>

            <!-- Data List -->
            <tr 
              v-else-if="filteredDrafts.length > 0" 
              v-for="draft in filteredDrafts" 
              :key="draft.id"
              class="hover:bg-gray-50/70 transition-colors"
            >
              <!-- Objek Wisata -->
              <td class="px-6 py-4 align-top">
                <div class="font-bold text-gray-900 text-base">
                  {{ draft.wisata?.nama_wisata || '(Wisata Tidak Ditemukan)' }}
                </div>
                <div class="text-xs text-gray-500 mt-0.5">
                  {{ draft.wisata?.jalan || '-' }}
                </div>
                <div v-if="draft.agensi?.nama_agensi" class="mt-1">
                  <span class="inline-flex items-center text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                    {{ draft.agensi.nama_agensi }}
                  </span>
                </div>
              </td>

              <!-- Isi Prompt Promosi -->
              <td class="px-6 py-4 align-top">
                <p class="italic text-gray-700 bg-gray-50/80 p-3 rounded-xl border border-gray-100 text-sm leading-relaxed">
                  "{{ draft.prompt_message }}"
                </p>
                <div v-if="draft.job_status" class="mt-2 flex items-center gap-2">
                  <span class="text-[11px] font-bold uppercase tracking-wider text-gray-400">Status:</span>
                  <span 
                    class="text-xs font-semibold px-2 py-0.5 rounded-full"
                    :class="draft.job_status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'"
                  >
                    {{ draft.job_status }}
                  </span>
                </div>
              </td>

              <!-- Waktu Dibuat -->
              <td class="px-6 py-4 align-top whitespace-nowrap text-gray-500 text-xs">
                {{ formatDate(draft.timestamp || draft.created_at) }}
              </td>

              <!-- Aksi -->
              <td class="px-6 py-4 align-top text-center whitespace-nowrap">
                <div class="inline-flex items-center gap-2">
                  <button 
                    @click="showDetail(draft)" 
                    class="px-3 py-1.5 text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    Detail
                  </button>
                  <button 
                    v-if="canDelete(draft)" 
                    @click="deleteDraft(draft.id)" 
                    class="px-3 py-1.5 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                  >
                    Hapus
                  </button>
                </div>
              </td>
            </tr>

            <!-- Empty State -->
            <tr v-else>
              <td colspan="4" class="px-6 py-12 text-center text-gray-400">
                <div class="flex flex-col items-center justify-center gap-2">
                  <svg class="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p class="font-medium text-gray-500">Belum ada draft promosi yang dibuat.</p>
                </div>
              </td>
            </tr>

          </tbody>
        </table>
      </div>
    </div>

    <!-- ================= MODAL DETAIL PROMPT ================= -->
    <div v-if="selectedDraft" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div class="bg-white rounded-3xl max-w-lg w-full shadow-2xl p-6 sm:p-8 relative animate-in fade-in zoom-in duration-200">
        <div class="flex items-start justify-between border-b border-gray-100 pb-4 mb-4">
          <div>
            <h3 class="text-xl font-extrabold text-gray-900">Detail Prompt Promosi</h3>
            <span class="text-xs text-gray-400">ID Draft: #{{ selectedDraft.id }}</span>
          </div>
          <button @click="selectedDraft = null" class="text-gray-400 hover:text-gray-600 font-bold text-2xl leading-none">&times;</button>
        </div>

        <div class="space-y-4 text-sm">
          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Destinasi Wisata</label>
            <p class="font-bold text-gray-900 text-base">{{ selectedDraft.wisata?.nama_wisata || '-' }}</p>
            <p class="text-xs text-gray-500">{{ selectedDraft.wisata?.jalan || '-' }}</p>
          </div>

          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Pesan Promosi</label>
            <p class="bg-gray-50 p-3 rounded-xl border border-gray-200 text-gray-800 italic">
              "{{ selectedDraft.prompt_message }}"
            </p>
          </div>

          <div class="grid grid-cols-2 gap-4 pt-2">
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Agensi Pengelola</label>
              <p class="font-medium text-gray-800">{{ selectedDraft.agensi?.nama_agensi || '-' }}</p>
            </div>
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">Waktu Dibuat</label>
              <p class="font-medium text-gray-800">{{ formatDate(selectedDraft.timestamp || selectedDraft.created_at) }}</p>
            </div>
          </div>
        </div>

        <div class="mt-6 pt-4 border-t border-gray-100 flex justify-end">
          <button 
            @click="selectedDraft = null" 
            class="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-sm rounded-xl transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>

  </DashboardLayout>
</template>

<script>
import DashboardLayout from '../../layouts/DashboardLayout.vue'
import api from '../../services/api'

export default {
  name: 'DraftPromosi',
  components: { DashboardLayout },
  data() {
    return {
      drafts: [],
      searchQuery: '',
      isLoading: false,
      selectedDraft: null,
      successMessage: '',
      errorMessage: '',
      currentUser: null
    }
  },
  computed: {
    userName() {
      return this.currentUser?.name || 'Agensi Travel'
    },
    filteredDrafts() {
      if (!this.searchQuery) return this.drafts
      const q = this.searchQuery.toLowerCase()
      return this.drafts.filter(d => {
        const wisataName = d.wisata?.nama_wisata?.toLowerCase() || ''
        const promptMsg = d.prompt_message?.toLowerCase() || ''
        const jalan = d.wisata?.jalan?.toLowerCase() || ''
        return wisataName.includes(q) || promptMsg.includes(q) || jalan.includes(q)
      })
    }
  },
  mounted() {
    try {
      this.currentUser = JSON.parse(localStorage.getItem('user') || 'null')
    } catch (e) {
      this.currentUser = null
    }
    this.fetchDraftPrompts()
  },
  methods: {
    async fetchDraftPrompts() {
      this.isLoading = true
      this.errorMessage = ''
      try {
        const response = await api.get('/draft-prompt', {
          params: this.searchQuery ? { search: this.searchQuery } : {}
        })

        // Menyesuaikan berbagai bentuk response dari Laravel:
        // response.data langsung array, atau response.data.data
        if (Array.isArray(response.data)) {
          this.drafts = response.data
        } else if (response.data && Array.isArray(response.data.data)) {
          this.drafts = response.data.data
        } else {
          this.drafts = []
        }
      } catch (error) {
        console.error('Gagal mengambil draft prompt:', error)
        this.errorMessage = 'Gagal memuat data draft prompt dari server.'
      } finally {
        this.isLoading = false
      }
    },

    handleSearch() {
      // Filter lokal atau hit kembali API jika endpoint support query search
      this.fetchDraftPrompts()
    },

    resetSearch() {
      this.searchQuery = ''
      this.fetchDraftPrompts()
    },

    showDetail(draft) {
      this.selectedDraft = draft
    },

    canDelete(draft) {
      if (!this.currentUser) return false
      // Admin atau pemilik agensi dari draft terkait
      if (this.currentUser.role === 'admin') return true
      if (this.currentUser.role === 'agensi') {
        const userAgensiId = this.currentUser.agensi?.id || this.currentUser.agensi_id
        if (userAgensiId && draft.agensi_id) {
          return userAgensiId === draft.agensi_id
        }
        return true
      }
      return false
    },

    async deleteDraft(id) {
      if (!confirm('Hapus draft prompt ini?')) return
      try {
        await api.delete(`/draft-prompt/${id}`)
        this.successMessage = 'Draft prompt berhasil dihapus.'
        this.fetchDraftPrompts()
      } catch (error) {
        console.error('Gagal menghapus draft prompt:', error)
        this.errorMessage = error.response?.data?.message || 'Gagal menghapus draft prompt.'
      }
    },

    formatDate(dateStr) {
      if (!dateStr) return '-'
      try {
        const d = new Date(dateStr)
        return d.toLocaleDateString('id-ID', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      } catch (e) {
        return dateStr
      }
    }
  }
}
</script>

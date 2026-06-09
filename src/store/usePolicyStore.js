import { create } from 'zustand'
import { fetchPolicies, fetchSummary, flagPolicies } from '../services/policyService'

const initialFilters = {
  searchTerm: '',
  status: '',
  lineOfBusiness: '',
  region: '',
  dateFrom: '',
  dateTo: '',
}

const initialPagination = {
  page: 1,
  pageSize: 10,
}

const initialSort = {
  field: 'policyNumber',
  order: 'asc',
}

export const usePolicyStore = create((set, get) => ({
  policies: [],
  summaryData: [],
  selectedIds: [],
  loading: false,
  error: null,
  message: '',
  totalCount: 0,
  filters: initialFilters,
  pagination: initialPagination,
  sort: initialSort,

  setFilter(name, value) {
    set((state) => ({
      filters: {
        ...state.filters,
        [name]: value,
      },
      pagination: {
        ...state.pagination,
        page: 1,
      },
    }))
  },

  setPage(page) {
    set((state) => ({
      pagination: {
        ...state.pagination,
        page,
      },
    }))
  },

  setPageSize(pageSize) {
    set((state) => ({
      pagination: {
        ...state.pagination,
        pageSize,
        page: 1,
      },
    }))
  },

  setSort(field, order) {
    set({ sort: { field, order } })
  },

  togglePolicy(policyId) {
    set((state) => ({
      selectedIds: state.selectedIds.includes(policyId)
        ? state.selectedIds.filter((id) => id !== policyId)
        : [...state.selectedIds, policyId],
    }))
  },

  selectAll() {
    set((state) => ({
      selectedIds: state.policies.map((policy) => policy.id),
    }))
  },

  deselectAll() {
    set({ selectedIds: [] })
  },

  resetFilters() {
    set({
      filters: initialFilters,
      pagination: { ...initialPagination },
      sort: { ...initialSort },
      message: '',
      error: null,
    })
  },

  async loadPolicies() {
    set({ loading: true, error: null, message: '' })

    try {
      const state = get()
      const { filters, pagination, sort } = state
      const [{ policies, totalCount }, summaryData] = await Promise.all([
        fetchPolicies({
          ...filters,
          page: pagination.page,
          pageSize: pagination.pageSize,
          sortField: sort.field,
          sortOrder: sort.order,
        }),
        fetchSummary(filters),
      ])

      set({
        policies,
        summaryData,
        totalCount,
        selectedIds: [],
        loading: false,
      })
    } catch (fetchError) {
      set({ loading: false, error: fetchError.message || 'Unable to load policies.' })
    }
  },

  async flagSelected() {
    const state = get()
    if (!state.selectedIds.length) {
      set({ message: 'Select at least one policy to flag for review.' })
      return
    }

    set({ loading: true, error: null, message: '' })

    try {
      await flagPolicies(state.selectedIds)
      set({ message: `${state.selectedIds.length} policy(ies) flagged for review.`, selectedIds: [] })
      await get().loadPolicies()
    } catch (updateError) {
      set({ loading: false, error: updateError.message || 'Unable to flag selected policies.' })
    }
  },
}))

import { describe, expect, it, beforeEach, vi } from 'vitest'
import { usePolicyStore } from './usePolicyStore'

const defaultState = {
  policies: [
    { id: 'policy1', policyNumber: 'POL-100000' },
    { id: 'policy2', policyNumber: 'POL-100001' },
  ],
  selectedIds: [],
  filters: {
    searchTerm: '',
    status: '',
    lineOfBusiness: '',
    region: '',
    dateFrom: '',
    dateTo: '',
  },
  pagination: { page: 1, pageSize: 10 },
  sort: { field: 'policyNumber', order: 'asc' },
  loading: false,
  error: null,
  message: '',
}

describe('usePolicyStore', () => {
  beforeEach(() => {
    usePolicyStore.setState({
      policies: defaultState.policies,
      selectedIds: defaultState.selectedIds,
      filters: defaultState.filters,
      pagination: defaultState.pagination,
      sort: defaultState.sort,
      loading: defaultState.loading,
      error: defaultState.error,
      message: defaultState.message,
      totalCount: 0,
    })
  })

  it('toggles policy selection', () => {
    const { togglePolicy, selectedIds } = usePolicyStore.getState()

    togglePolicy('policy1')
    expect(usePolicyStore.getState().selectedIds).toContain('policy1')

    togglePolicy('policy1')
    expect(usePolicyStore.getState().selectedIds).not.toContain('policy1')
    expect(usePolicyStore.getState().selectedIds).toEqual([])
  })

  it('selects and deselects all policies', () => {
    const { selectAll, deselectAll } = usePolicyStore.getState()

    selectAll()
    expect(usePolicyStore.getState().selectedIds).toEqual(['policy1', 'policy2'])

    deselectAll()
    expect(usePolicyStore.getState().selectedIds).toEqual([])
  })
})

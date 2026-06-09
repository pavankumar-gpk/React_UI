import { useEffect, useMemo } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { usePolicyStore } from '../../core/state/usePolicyStore'
import DashboardPage from './DashboardPage'

const statusOptions = ['Active', 'Expired', 'Pending', 'Cancelled']
const businessOptions = ['Property', 'Casualty', 'A&H', 'Marine']
const regionOptions = ['Singapore', 'Hong Kong', 'Australia', 'Japan', 'Thailand', 'Indonesia', 'Malaysia', 'Philippines']
const sortFields = [
  { value: 'policyNumber', label: 'Policy Number' },
  { value: 'policyholderName', label: 'Policyholder' },
  { value: 'premiumAmount', label: 'Premium Amount' },
  { value: 'effectiveDate', label: 'Effective Date' },
  { value: 'expiryDate', label: 'Expiry Date' },
]
const pageSizeOptions = [10, 20, 50]

export default function DashboardContainer() {
  const {
    policies,
    summaryData,
    selectedIds,
    filters,
    pagination,
    sort,
    loading,
    error,
    message,
    totalCount,
    loadPolicies,
    flagSelected,
    setFilter,
    setPage,
    setPageSize,
    setSort,
    resetFilters,
    togglePolicy,
    selectAll,
    deselectAll,
  } = usePolicyStore(
    useShallow((state) => ({
      policies: state.policies,
      summaryData: state.summaryData,
      selectedIds: state.selectedIds,
      filters: state.filters,
      pagination: state.pagination,
      sort: state.sort,
      loading: state.loading,
      error: state.error,
      message: state.message,
      totalCount: state.totalCount,
      loadPolicies: state.loadPolicies,
      flagSelected: state.flagSelected,
      setFilter: state.setFilter,
      setPage: state.setPage,
      setPageSize: state.setPageSize,
      setSort: state.setSort,
      resetFilters: state.resetFilters,
      togglePolicy: state.togglePolicy,
      selectAll: state.selectAll,
      deselectAll: state.deselectAll,
    })),
  )

  useEffect(() => {
    loadPolicies()
  }, [pagination.page, pagination.pageSize, sort.field, sort.order])

  const pageCount = Math.max(1, Math.ceil(totalCount / pagination.pageSize))
  const allSelected = policies.length > 0 && policies.every((policy) => selectedIds.includes(policy.id))

  const summary = useMemo(() => {
    const counts = statusOptions.reduce((acc, item) => ({ ...acc, [item]: 0 }), {})
    const premiumByLob = businessOptions.reduce((acc, item) => ({ ...acc, [item]: 0 }), {})
    const expiringSoon = summaryData.reduce((count, policy) => {
      const expiry = new Date(policy.expiryDate)
      const now = new Date()
      const threshold = new Date(now)
      threshold.setDate(now.getDate() + 30)
      if (expiry >= now && expiry <= threshold) {
        count += 1
      }
      return count
    }, 0)

    summaryData.forEach((policy) => {
      counts[policy.status] = (counts[policy.status] || 0) + 1
      premiumByLob[policy.lineOfBusiness] = (premiumByLob[policy.lineOfBusiness] || 0) + policy.premiumAmount
    })

    return { counts, premiumByLob, expiringSoon }
  }, [summaryData])

  return (
    <DashboardPage
      policies={policies}
      selectedIds={selectedIds}
      allSelected={allSelected}
      statusOptions={statusOptions}
      businessOptions={businessOptions}
      regionOptions={regionOptions}
      sortFields={sortFields}
      pageSizeOptions={pageSizeOptions}
      filters={filters}
      pagination={pagination}
      sort={sort}
      summary={summary}
      loading={loading}
      error={error}
      message={message}
      pageCount={pageCount}
      onFilterChange={setFilter}
      onSortChange={(field, order) => setSort(field, order)}
      onPageChange={setPage}
      onPageSizeChange={setPageSize}
      onResetFilters={resetFilters}
      onApplyFilters={loadPolicies}
      onFlagSelected={flagSelected}
      onTogglePolicy={togglePolicy}
      onSelectAll={(checked) => (checked ? selectAll() : deselectAll())}
    />
  )
}

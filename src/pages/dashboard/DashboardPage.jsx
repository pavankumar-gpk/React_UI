import FilterPanel from '../../components/dashboard/FilterPanel'
import SummaryPanel from '../../components/dashboard/SummaryPanel'
import TableControls from '../../components/dashboard/TableControls'
import ThemeToggle from '../../components/dashboard/ThemeToggle'
import PolicyTable from '../../components/dashboard/PolicyTable'

export default function DashboardPage({
  policies,
  selectedIds,
  allSelected,
  statusOptions,
  businessOptions,
  regionOptions,
  sortFields,
  pageSizeOptions,
  filters,
  pagination,
  sort,
  summary,
  loading,
  error,
  message,
  pageCount,
  onFilterChange,
  onSortChange,
  onPageChange,
  onPageSizeChange,
  onResetFilters,
  onApplyFilters,
  onFlagSelected,
  onTogglePolicy,
  onSelectAll,
}) {
  return (
    <main>
      <header className="dashboard-header">
        <div className="dashboard-header__content">
          <h1>Policy Overview Dashboard</h1>
          <p>View and manage APAC insurance policies with filters, sorting, bulk actions, and summary insights.</p>
        </div>
        <ThemeToggle />
      </header>

      <section className="dashboard-grid">
        <SummaryPanel summary={summary} businessOptions={businessOptions} />
        <FilterPanel
          statusOptions={statusOptions}
          businessOptions={businessOptions}
          regionOptions={regionOptions}
          sortFields={sortFields}
          pageSizeOptions={pageSizeOptions}
          filters={filters}
          pagination={pagination}
          sort={sort}
          onFilterChange={onFilterChange}
          onSortChange={onSortChange}
          onPageSizeChange={onPageSizeChange}
          onResetFilters={onResetFilters}
          onApplyFilters={onApplyFilters}
        />
      </section>

      {message && <div className="info-state">{message}</div>}
      {error && <div className="error-state">Error loading policies: {error}</div>}
      {loading && <div className="loading-state">Loading policies...</div>}

      {!loading && !error && (
        <TableControls
          selectedCount={selectedIds.length}
          onFlagSelected={onFlagSelected}
          page={pagination.page}
          pageCount={pageCount}
          onPrevious={() => onPageChange(Math.max(1, pagination.page - 1))}
          onNext={() => onPageChange(Math.min(pageCount, pagination.page + 1))}
          disabled={selectedIds.length === 0 || loading}
        />
      )}

      {!loading && !error && (
        <PolicyTable
          policies={policies}
          selectedIds={selectedIds}
          onToggleSelect={onTogglePolicy}
          onSelectAll={onSelectAll}
          allSelected={allSelected}
        />
      )}
    </main>
  )
}

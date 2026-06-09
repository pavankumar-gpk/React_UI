export default function FilterPanel({
  statusOptions,
  businessOptions,
  regionOptions,
  sortFields,
  pageSizeOptions,
  filters,
  pagination,
  sort,
  onFilterChange,
  onSortChange,
  onPageSizeChange,
  onResetFilters,
  onApplyFilters,
}) {
  return (
    <div className="filter-panel" aria-label="Filters">
      <h2>Filters</h2>
      <div className="filter-row">
        <label>
          Search
          <input
            type="search"
            value={filters.searchTerm}
            placeholder="Policy #, name, underwriter"
            onChange={(event) => onFilterChange('searchTerm', event.target.value)}
          />
        </label>
        <label>
          Status
          <select value={filters.status} onChange={(event) => onFilterChange('status', event.target.value)}>
            <option value="">All</option>
            {statusOptions.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>
        <label>
          Line of Business
          <select value={filters.lineOfBusiness} onChange={(event) => onFilterChange('lineOfBusiness', event.target.value)}>
            <option value="">All</option>
            {businessOptions.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="filter-row">
        <label>
          Region
          <select value={filters.region} onChange={(event) => onFilterChange('region', event.target.value)}>
            <option value="">All</option>
            {regionOptions.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>
        <label>
          Effective From
          <input type="date" value={filters.dateFrom} onChange={(event) => onFilterChange('dateFrom', event.target.value)} />
        </label>
        <label>
          Effective To
          <input type="date" value={filters.dateTo} onChange={(event) => onFilterChange('dateTo', event.target.value)} />
        </label>
      </div>

      <div className="filter-row">
        <label>
          Sort by
          <select value={sort.field} onChange={(event) => onSortChange(event.target.value, sort.order)}>
            {sortFields.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <label>
          Order
          <select value={sort.order} onChange={(event) => onSortChange(sort.field, event.target.value)}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
        <label>
          Page size
          <select value={pagination.pageSize} onChange={(event) => onPageSizeChange(Number(event.target.value))}>
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="filter-actions">
        <button type="button" onClick={onApplyFilters}>
          Apply filters
        </button>
        <button type="button" onClick={onResetFilters}>
          Reset
        </button>
      </div>
    </div>
  )
}

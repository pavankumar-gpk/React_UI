import { useEffect, useMemo, useState } from 'react'
import PolicyTable from './PolicyTable'

const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
const statusOptions = ['Active', 'Expired', 'Pending', 'Cancelled']
const businessOptions = ['Property', 'Casualty', 'A&H', 'Marine']
const regionOptions = ['Singapore', 'Hong Kong', 'Australia', 'Japan', 'Thailand', 'Indonesia', 'Malaysia', 'Philippines']
const pageSizeOptions = [10, 20, 50]
const sortFields = [
  { value: 'policyNumber', label: 'Policy Number' },
  { value: 'policyholderName', label: 'Policyholder' },
  { value: 'premiumAmount', label: 'Premium Amount' },
  { value: 'effectiveDate', label: 'Effective Date' },
  { value: 'expiryDate', label: 'Expiry Date' },
]

export default function Dashboard() {
  const [policies, setPolicies] = useState([])
  const [summaryData, setSummaryData] = useState([])
  const [selectedIds, setSelectedIds] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [status, setStatus] = useState('')
  const [lineOfBusiness, setLineOfBusiness] = useState('')
  const [region, setRegion] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [pageSize, setPageSize] = useState(10)
  const [page, setPage] = useState(1)
  const [sortField, setSortField] = useState('policyNumber')
  const [sortOrder, setSortOrder] = useState('asc')
  const [message, setMessage] = useState('')
  const [totalCount, setTotalCount] = useState(0)

  const queryString = useMemo(() => {
    const params = new URLSearchParams()
    if (searchTerm.trim()) params.set('q', searchTerm.trim())
    if (status) params.set('status', status)
    if (lineOfBusiness) params.set('lineOfBusiness', lineOfBusiness)
    if (region) params.set('region', region)
    if (dateFrom) params.set('effectiveDate_gte', dateFrom)
    if (dateTo) params.set('effectiveDate_lte', dateTo)
    params.set('_page', String(page))
    params.set('_limit', String(pageSize))
    params.set('_sort', sortField)
    params.set('_order', sortOrder)
    return params.toString()
  }, [searchTerm, status, lineOfBusiness, region, dateFrom, dateTo, pageSize, page, sortField, sortOrder])

  const summaryQuery = useMemo(() => {
    const params = new URLSearchParams()
    if (searchTerm.trim()) params.set('q', searchTerm.trim())
    if (status) params.set('status', status)
    if (lineOfBusiness) params.set('lineOfBusiness', lineOfBusiness)
    if (region) params.set('region', region)
    if (dateFrom) params.set('effectiveDate_gte', dateFrom)
    if (dateTo) params.set('effectiveDate_lte', dateTo)
    params.set('_limit', '1000')
    return params.toString()
  }, [searchTerm, status, lineOfBusiness, region, dateFrom, dateTo])

  useEffect(() => {
    async function loadData() {
      setLoading(true)
      setError(null)
      setMessage('')

      try {
        const pageUrl = `${apiBase}/policies?${queryString}`
        const summaryUrl = `${apiBase}/policies?${summaryQuery}`

        const [pageResponse, summaryResponse] = await Promise.all([
          fetch(pageUrl),
          fetch(summaryUrl),
        ])

        if (!pageResponse.ok || !summaryResponse.ok) {
          throw new Error('Unable to load policy data from API')
        }

        const pageResult = await pageResponse.json()
        const summaryResult = await summaryResponse.json()

        const total = Number(pageResponse.headers.get('x-total-count') || summaryResult.length)
        setPolicies(pageResult)
        setSummaryData(summaryResult)
        setTotalCount(total)
        setSelectedIds([])
      } catch (fetchError) {
        setError(fetchError.message)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [queryString, summaryQuery])

  const pageCount = Math.max(1, Math.ceil(totalCount / pageSize))
  const allSelected = policies.length > 0 && policies.every((policy) => selectedIds.includes(policy.id))

  const summary = useMemo(() => {
    const counts = statusOptions.reduce((acc, next) => ({ ...acc, [next]: 0 }), {})
    const premiumByLob = businessOptions.reduce((acc, next) => ({ ...acc, [next]: 0 }), {})
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

  function handleSelectAll(event) {
    if (event.target.checked) {
      setSelectedIds(policies.map((policy) => policy.id))
      return
    }
    setSelectedIds([])
  }

  function handleToggleSelect(policyId) {
    setSelectedIds((current) =>
      current.includes(policyId)
        ? current.filter((id) => id !== policyId)
        : [...current, policyId],
    )
  }

  async function handleFlagSelected() {
    if (!selectedIds.length) {
      setMessage('Select at least one policy to flag for review.')
      return
    }

    setLoading(true)
    setError(null)
    setMessage('')

    try {
      await Promise.all(
        selectedIds.map((policyId) =>
          fetch(`${apiBase}/policies/${policyId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ flaggedForReview: true }),
          }),
        ),
      )

      setMessage(`${selectedIds.length} policy(ies) flagged for review.`)
      setSelectedIds([])
      setPage(page) // refresh current page after action
    } catch (updateError) {
      setError('Unable to flag selected policies. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  function handleResetFilters() {
    setStatus('')
    setLineOfBusiness('')
    setRegion('')
    setSearchTerm('')
    setDateFrom('')
    setDateTo('')
    setPage(1)
    setSortField('policyNumber')
    setSortOrder('asc')
  }

  return (
    <main>
      <header className="dashboard-header">
        <h1>Policy Overview Dashboard</h1>
        <p>View and manage APAC insurance policies with filters, sorting, bulk actions, and summary insights.</p>
      </header>

      <section className="dashboard-grid">
        <div className="summary-panel" aria-label="Summary statistics">
          <h2>Summary</h2>
          <div className="summary-cards">
            {statusOptions.map((item) => (
              <div key={item} className="summary-card">
                <span className="summary-card-label">{item}</span>
                <strong>{summary.counts[item] || 0}</strong>
              </div>
            ))}
            <div className="summary-card wide">
              <span className="summary-card-label">Expiring in 30 days</span>
              <strong>{summary.expiringSoon}</strong>
            </div>
          </div>
          <div className="summary-section">
            <h3>Total Premium by Line of Business</h3>
            <ul>
              {businessOptions.map((item) => (
                <li key={item}>
                  <span>{item}</span>
                  <strong>{formatCurrency(summary.premiumByLob[item] || 0)}</strong>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="filter-panel" aria-label="Filters">
          <h2>Filters</h2>
          <div className="filter-row">
            <label>
              Search
              <input
                type="search"
                value={searchTerm}
                placeholder="Policy #, name, underwriter"
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </label>
            <label>
              Status
              <select value={status} onChange={(event) => setStatus(event.target.value)}>
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
              <select value={lineOfBusiness} onChange={(event) => setLineOfBusiness(event.target.value)}>
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
              <select value={region} onChange={(event) => setRegion(event.target.value)}>
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
              <input type="date" value={dateFrom} onChange={(event) => setDateFrom(event.target.value)} />
            </label>
            <label>
              Effective To
              <input type="date" value={dateTo} onChange={(event) => setDateTo(event.target.value)} />
            </label>
          </div>

          <div className="filter-row">
            <label>
              Sort by
              <select value={sortField} onChange={(event) => setSortField(event.target.value)}>
                {sortFields.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Order
              <select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)}>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </label>
            <label>
              Page size
              <select value={pageSize} onChange={(event) => { setPageSize(Number(event.target.value)); setPage(1) }}>
                {pageSizeOptions.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="filter-actions">
            <button type="button" onClick={() => setPage(1)} disabled={loading}>
              Apply filters
            </button>
            <button type="button" onClick={handleResetFilters} disabled={loading}>
              Reset
            </button>
          </div>
        </div>
      </section>

      {message && <div className="info-state">{message}</div>}
      {error && <div className="error-state">Error loading policies: {error}</div>}
      {loading && <div className="loading-state">Loading policies…</div>}

      {!loading && !error && (
        <section className="table-controls">
          <div className="bulk-actions">
            <button type="button" onClick={handleFlagSelected} disabled={selectedIds.length === 0 || loading}>
              Flag selected for review
            </button>
            <span>{selectedIds.length} selected</span>
          </div>
          <div className="pagination-controls">
            <span>
              Page {page} of {pageCount}
            </span>
            <div>
              <button type="button" onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={page === 1}>
                Previous
              </button>
              <button type="button" onClick={() => setPage((current) => Math.min(pageCount, current + 1))} disabled={page === pageCount}>
                Next
              </button>
            </div>
          </div>
        </section>
      )}

      {!loading && !error && <PolicyTable policies={policies} selectedIds={selectedIds} onToggleSelect={handleToggleSelect} onSelectAll={handleSelectAll} allSelected={allSelected} />}
    </main>
  )
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

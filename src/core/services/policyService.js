const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

function buildQuery({ searchTerm, status, lineOfBusiness, region, dateFrom, dateTo, page, pageSize, sortField, sortOrder, forSummary = false }) {
  const params = new URLSearchParams()

  if (searchTerm?.trim()) {
    params.set('q', searchTerm.trim())
  }

  if (status) {
    params.set('status', status)
  }

  if (lineOfBusiness) {
    params.set('lineOfBusiness', lineOfBusiness)
  }

  if (region) {
    params.set('region', region)
  }

  if (dateFrom) {
    params.set('effectiveDate_gte', dateFrom)
  }

  if (dateTo) {
    params.set('effectiveDate_lte', dateTo)
  }

  if (!forSummary) {
    params.set('_page', String(page || 1))
    params.set('_limit', String(pageSize || 10))
    params.set('_sort', sortField || 'policyNumber')
    params.set('_order', sortOrder || 'asc')
  } else {
    params.set('_limit', '1000')
  }

  return params.toString()
}

async function fetchJson(url) {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }
  const data = await response.json()
  return { data, headers: response.headers }
}

export async function fetchPolicies(options = {}) {
  const query = buildQuery(options)
  const { data, headers } = await fetchJson(`${API_BASE}/policies?${query}`)
  const totalCount = Number(headers.get('x-total-count') || data.length)
  return { policies: data, totalCount }
}

export async function fetchSummary(options = {}) {
  const query = buildQuery({ ...options, forSummary: true })
  const { data } = await fetchJson(`${API_BASE}/policies?${query}`)
  return data
}

export async function flagPolicies(policyIds = []) {
  const results = await Promise.all(
    policyIds.map((policyId) =>
      fetch(`${API_BASE}/policies/${policyId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ flaggedForReview: true }),
      }),
    ),
  )

  const errors = results.filter((response) => !response.ok)
  if (errors.length > 0) {
    throw new Error('Unable to flag one or more policies.')
  }

  return results.map((response) => response.ok)
}

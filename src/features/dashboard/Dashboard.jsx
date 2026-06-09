import { useEffect, useState } from 'react'
import PolicyTable from './PolicyTable'

const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

export default function Dashboard() {
  const [policies, setPolicies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadPolicies() {
      try {
        const response = await fetch(`${apiBase}/policies`)
        if (!response.ok) {
          throw new Error(`Failed to load policies: ${response.status}`)
        }
        const data = await response.json()
        setPolicies(data)
      } catch (fetchError) {
        setError(fetchError.message)
      } finally {
        setLoading(false)
      }
    }

    loadPolicies()
  }, [])

  return (
    <main>
      <header className="dashboard-header">
        <h1>Policy Overview Dashboard</h1>
        <p>Live policy table powered by JSON Server mock data.</p>
      </header>

      {loading && <div className="loading-state">Loading policies…</div>}
      {error && <div className="error-state">Error loading policies: {error}</div>}
      {!loading && !error && <PolicyTable policies={policies} />}
    </main>
  )
}

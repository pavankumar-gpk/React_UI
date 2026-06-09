import PolicyRow from './PolicyRow'

export default function PolicyTable({ policies, selectedIds, onToggleSelect, onSelectAll, allSelected }) {
  if (!policies.length) {
    return (
      <div className="empty-state" role="status">
        No policy records are available.
      </div>
    )
  }

  return (
    <section className="policy-table-section">
      <table className="policy-table">
        <caption>Policy overview table</caption>
        <thead>
          <tr>
            <th scope="col">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={(event) => onSelectAll(event.target.checked)}
                aria-label={allSelected ? 'Deselect all policies' : 'Select all policies'}
              />
            </th>
            <th scope="col">Policy #</th>
            <th scope="col">Policyholder</th>
            <th scope="col">LOB</th>
            <th scope="col">Status</th>
            <th scope="col">Premium</th>
            <th scope="col">Effective</th>
            <th scope="col">Expiry</th>
            <th scope="col">Region</th>
            <th scope="col">Review</th>
          </tr>
        </thead>
        <tbody>
          {policies.map((policy) => (
            <PolicyRow
              key={policy.id}
              policy={policy}
              selected={selectedIds.includes(policy.id)}
              onToggleSelect={onToggleSelect}
            />
          ))}
        </tbody>
      </table>
    </section>
  )
}

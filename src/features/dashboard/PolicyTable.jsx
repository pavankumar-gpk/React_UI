import React from 'react'

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
                onChange={onSelectAll}
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
            <tr key={policy.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(policy.id)}
                  onChange={() => onToggleSelect(policy.id)}
                  aria-label={`Select policy ${policy.policyNumber}`}
                />
              </td>
              <td>{policy.policyNumber}</td>
              <td>{policy.policyholderName}</td>
              <td>{policy.lineOfBusiness}</td>
              <td>{policy.status}</td>
              <td>{formatCurrency(policy.premiumAmount, policy.currency)}</td>
              <td>{formatDate(policy.effectiveDate)}</td>
              <td>{formatDate(policy.expiryDate)}</td>
              <td>{policy.region}</td>
              <td>{policy.flaggedForReview ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

function formatCurrency(amount, currency) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-GB')
}

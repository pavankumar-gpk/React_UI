import { formatCurrency, formatDate } from '../../utils/formatters'

export default function PolicyRow({ policy, selected, onToggleSelect }) {
  return (
    <tr>
      <td>
        <input
          type="checkbox"
          checked={selected}
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
  )
}

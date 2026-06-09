export default function SummaryPanel({ summary, businessOptions }) {
  return (
    <div className="summary-panel" aria-label="Summary statistics">
      <h2>Summary</h2>
      <div className="summary-cards">
        {Object.entries(summary.counts).map(([label, amount]) => (
          <div key={label} className="summary-card">
            <span className="summary-card-label">{label}</span>
            <strong>{amount}</strong>
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
              <strong>{summary.premiumByLob[item] || 0}</strong>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

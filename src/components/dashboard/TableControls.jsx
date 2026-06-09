export default function TableControls({
  selectedCount,
  onFlagSelected,
  page,
  pageCount,
  onPrevious,
  onNext,
  disabled,
}) {
  return (
    <section className="table-controls">
      <div className="bulk-actions">
        <button type="button" onClick={onFlagSelected} disabled={disabled}>
          Flag selected for review
        </button>
        <span>{selectedCount} selected</span>
      </div>
      <div className="pagination-controls">
        <span>
          Page {page} of {pageCount}
        </span>
        <div>
          <button type="button" onClick={onPrevious} disabled={page === 1}>
            Previous
          </button>
          <button type="button" onClick={onNext} disabled={page === pageCount}>
            Next
          </button>
        </div>
      </div>
    </section>
  )
}

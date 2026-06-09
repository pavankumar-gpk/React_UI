import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import PolicyTable from './PolicyTable'

const policies = [
  {
    id: 'policy1',
    policyNumber: 'POL-100000',
    policyholderName: 'Tan Wei Ming',
    lineOfBusiness: 'Property',
    status: 'Active',
    premiumAmount: 120000,
    currency: 'SGD',
    effectiveDate: '2026-01-01',
    expiryDate: '2027-01-01',
    region: 'Singapore',
    flaggedForReview: false,
  },
]

describe('PolicyTable', () => {
  afterEach(() => {
    cleanup()
  })

  it('renders column headers and policy row', () => {
    render(
      <PolicyTable
        policies={policies}
        selectedIds={[]}
        onToggleSelect={vi.fn()}
        onSelectAll={vi.fn()}
        allSelected={false}
      />,
    )

    expect(screen.getByRole('table')).toBeTruthy()
    expect(screen.getByText('Policy #')).toBeTruthy()
    expect(screen.getByText('POL-100000')).toBeTruthy()
    expect(screen.getByText('Tan Wei Ming')).toBeTruthy()
  })

  it('calls toggle and select all callbacks', () => {
    const onToggleSelect = vi.fn()
    const onSelectAll = vi.fn()

    render(
      <PolicyTable
        policies={policies}
        selectedIds={[]}
        onToggleSelect={onToggleSelect}
        onSelectAll={onSelectAll}
        allSelected={false}
      />,
    )

    const selectAllCheckbox = screen.getAllByLabelText('Select all policies')[0]
    fireEvent.click(selectAllCheckbox)
    expect(onSelectAll).toHaveBeenCalledWith(true)

    const rowCheckbox = screen.getByLabelText('Select policy POL-100000')
    fireEvent.click(rowCheckbox)
    expect(onToggleSelect).toHaveBeenCalledWith('policy1')
  })
})

import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { VehicleAdminTable } from './VehicleAdminTable'
import type { VehicleRecord } from '../vehicles.types'

const vehicles: VehicleRecord[] = [
  {
    id: 'veh-1',
    registrationNumber: 'ABC-123',
    make: 'Toyota',
    model: 'Corolla',
    year: 2022,
    status: 'Available',
    department: 'Operations',
    driver: 'Amina Yusuf',
    lastServiceDate: '2026-04-15'
  },
  {
    id: 'veh-2',
    registrationNumber: 'XYZ-789',
    make: 'Honda',
    model: 'Civic',
    year: 2021,
    status: 'In Use',
    department: 'Research',
    driver: 'Kelechi Okafor',
    lastServiceDate: '2026-02-10'
  }
]

describe('VehicleAdminTable', () => {
  it('renders vehicle rows for provided data', () => {
    const { getByText } = render(<VehicleAdminTable vehicles={vehicles} />)

    expect(getByText('ABC-123')).toBeInTheDocument()
    expect(getByText('Toyota Corolla')).toBeInTheDocument()
    expect(getByText('Operations')).toBeInTheDocument()
  })
})

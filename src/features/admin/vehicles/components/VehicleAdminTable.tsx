import type { VehicleRecord } from '../vehicles.types'

const sampleVehicles: VehicleRecord[] = [
  {
    id: 'V-001',
    registrationNumber: 'ABC-123',
    make: 'Toyota',
    model: 'Hilux',
    year: 2022,
    status: 'Available',
    department: 'Operations',
    driver: 'Amina Yusuf',
    lastServiceDate: '2026-01-15',
  },
]

type VehicleAdminTableProps = {
  vehicles?: VehicleRecord[]
}

export function VehicleAdminTable({ vehicles = sampleVehicles }: VehicleAdminTableProps) {
  return (
    <div>
      <h2>Vehicle Admin Table</h2>
      <ul>
        {vehicles.map((vehicle) => (
          <li key={vehicle.id}>
            {vehicle.registrationNumber} - {vehicle.make} {vehicle.model}
          </li>
        ))}
      </ul>
    </div>
  )
}

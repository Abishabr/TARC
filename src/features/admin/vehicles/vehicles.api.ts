import { vehiclesSchema } from './vehicles.schema'
import type { VehicleRecord } from './vehicles.types'

const fallbackVehicles: VehicleRecord[] = [
  {
    id: 'veh-1',
    registrationNumber: 'ABC-123',
    make: 'Toyota',
    model: 'Corolla',
    year: 2022,
    status: 'Available',
    department: 'Operations',
    driver: 'Amina Yusuf',
    lastServiceDate: '2026-04-15',
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
    lastServiceDate: '2026-02-10',
  },
  {
    id: 'veh-3',
    registrationNumber: 'LMN-456',
    make: 'Ford',
    model: 'Transit',
    year: 2020,
    status: 'Maintenance',
    department: 'Logistics',
    driver: 'Moses Ali',
    lastServiceDate: '2026-05-01',
  },
]

export const fetchVehicles = async (): Promise<VehicleRecord[]> => {
  const parsed = vehiclesSchema.safeParse(fallbackVehicles)

  return parsed.success ? parsed.data : fallbackVehicles
}

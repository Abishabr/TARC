export interface VehicleRecord {
  id: string
  registrationNumber: string
  make: string
  model: string
  year: number
  status: 'Available' | 'In Use' | 'Maintenance' | 'Reserved'
  department: string
  driver: string
  lastServiceDate: string
}

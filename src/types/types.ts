// Types for the RajaOngkir-like API

export interface Province {
  id: number
  name: string
}

export interface City {
  id: number
  province_id: number
  name: string
  type: string
}

export interface Courier {
  code: string
  name: string
  services: CourierService[]
}

export interface CourierService {
  service: string
  description: string
}

export interface ShippingCost {
  service: string
  description: string
  cost: {
    value: number
    etd: string
    note: string
  }[]
}

export interface ApiResponse<T> {
  status: {
    code: number
    description: string
  }
  results: T
}

export interface CostRequest {
  origin: string
  destination: string
  weight: number
  courier: string
}

export interface CostResponse {
  code: string
  name: string
  costs: ShippingCost[]
}

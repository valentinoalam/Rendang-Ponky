// Province data structure
export interface Province {
  province_id: string
  province: string
}

// City data structure
export interface City {
  city_id: string
  province_id: string
  province: string
  type: string
  city_name: string
  postal_code: string
}

// Courier service details
export interface CourierService {
  service: string
  description: string
  cost: {
    value: number
    etd: string
    note: string
  }[]
}

// Shipping cost response structure
export interface ShippingCostResult {
  code: string
  name: string
  costs: CourierService[]
}

// RajaOngkir API response structure for provinces
export interface ProvinceResponse {
  rajaongkir: {
    status: {
      code: number
      description: string
    }
    results: Province[]
  }
}

// RajaOngkir API response structure for cities
export interface CityResponse {
  rajaongkir: {
    status: {
      code: number
      description: string
    }
    results: City[]
  }
}

// RajaOngkir API response structure for shipping costs
export interface ShippingCostResponse {
  rajaongkir: {
    status: {
      code: number
      description: string
    }
    origin_details: {
      city_id: string
      province_id: string
      province: string
      type: string
      city_name: string
      postal_code: string
    }
    destination_details: {
      city_id: string
      province_id: string
      province: string
      type: string
      city_name: string
      postal_code: string
    }
    results: ShippingCostResult[]
  }
}

// Request payload for shipping cost calculation
export interface ShippingCostRequest {
  origin: string
  destination: string
  weight: number
  courier: string
  // Optional dimensions for volumetric weight calculation
  length?: number
  width?: number
  height?: number
}

// Saved address structure
export interface SavedAddress {
  id: string
  name: string
  provinceId: string
  provinceName: string
  cityId: string
  cityName: string
  address: string
  postalCode: string
  isDefault?: boolean
}

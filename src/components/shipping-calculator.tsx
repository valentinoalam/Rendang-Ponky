import { useState, useEffect, useCallback } from "react"
import { Check, ChevronsUpDown, AlertCircle, Package, Truck, MapPin } from "lucide-react"

// Mock data for demonstration
const mockCities = [
  { city_id: "1", city_name: "Jakarta", province: "DKI Jakarta", postal_code: "10110", type: "Kota" },
  { city_id: "2", city_name: "Surabaya", province: "Jawa Timur", postal_code: "60111", type: "Kota" },
  { city_id: "3", city_name: "Bandung", province: "Jawa Barat", postal_code: "40111", type: "Kota" },
  { city_id: "4", city_name: "Medan", province: "Sumatera Utara", postal_code: "20111", type: "Kota" },
  { city_id: "5", city_name: "Semarang", province: "Jawa Tengah", postal_code: "50111", type: "Kota" },
]

const mockShippingData = {
  jne: [
    { service: "REG", description: "Layanan Reguler", cost: 15000, etd: "2-3", note: "Ekonomis" },
    { service: "OKE", description: "Ongkos Kirim Ekonomis", cost: 12000, etd: "3-4", note: "Termurah" },
    { service: "YES", description: "Yakin Esok Sampai", cost: 25000, etd: "1-2", note: "Express" },
  ],
  pos: [
    { service: "Paket Kilat Khusus", description: "Layanan Kilat", cost: 18000, etd: "1-2", note: "Express" },
    { service: "Express Next Day", description: "Sameday Service", cost: 30000, etd: "1", note: "Same Day" },
    { service: "Reguler", description: "Layanan Reguler", cost: 13000, etd: "2-4", note: "Ekonomis" },
  ],
  tiki: [
    { service: "REG", description: "Regular Service", cost: 16000, etd: "2-3", note: "Standard" },
    { service: "ECO", description: "Economy Service", cost: 11000, etd: "3-5", note: "Termurah" },
    { service: "ONS", description: "Over Night Service", cost: 28000, etd: "1", note: "Express" },
  ]
}

// Origin constants
const ORIGIN = {
  city: "BEKASI",
  district: "BEKASI BARAT",
  subdistrict: "JAKA SAMPURNA",
  province: "JAWA BARAT",
  postalCode: "17145",
}

// Shipping services
const COURIER_SERVICES = [
  { id: "jne", name: "JNE", logo: "🚚", color: "bg-red-500" },
  { id: "pos", name: "POS Indonesia", logo: "📮", color: "bg-blue-500" },
  { id: "tiki", name: "TIKI", logo: "📦", color: "bg-green-500" },
]

export type ShippingOption = {
  service: string
  description: string
  cost: number
  etd: string
  courier: string
  note?: string
}

type City = {
  city_id: string
  city_name: string
  province: string
  postal_code: string
  type: string
}

type ShippingDataItem = {
  service: string
  description: string
  cost: number
  etd: string
  note: string
}

type ShippingCalculatorProps = {
  weight: number
  destination: {
    city: string
    postalCode: string
  }
  onSelectShipping: (option: ShippingOption | null) => void
  onDestinationChange?: (destination: { city: string; postalCode: string }) => void
}

export default function ShippingCalculator({ 
  weight, 
  destination, 
  onSelectShipping,
  onDestinationChange 
}: ShippingCalculatorProps) {
  const [open, setOpen] = useState(false)
  const [cities, setCities] = useState<City[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingCities, setLoadingCities] = useState(false)
  const [selectedCourier, setSelectedCourier] = useState<string>("jne")
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([])
  const [selectedShipping, setSelectedShipping] = useState<ShippingOption | null>(null)
  const [error, setError] = useState<string>("")
  const [searchTerm, setSearchTerm] = useState("")

  // Input validation
  const isValidWeight = weight > 0 && weight <= 30000 // Max 30kg
  const hasDestination = destination.city && destination.postalCode

  // Fetch cities with error handling and retry logic
  const fetchCities = useCallback(async (retryCount = 0) => {
    const maxRetries = 3
    try {
      setLoadingCities(true)
      setError("")
      
      // Mock API call for demonstration
      await new Promise(resolve => setTimeout(resolve, 500))
      setCities(mockCities)
      
      /* Real API implementation:
      const response = await fetch("/api/cities", {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      if (data.status?.code === 200 && data.results) {
        setCities(data.results)
      } else {
        throw new Error(data.message || 'Failed to fetch cities')
      }
      */
    } catch (error) {
      console.error("Failed to fetch cities:", error)
      if (retryCount < maxRetries) {
        setTimeout(() => fetchCities(retryCount + 1), 1000 * (retryCount + 1))
      } else {
        setError("Failed to load cities. Please refresh the page.")
      }
    } finally {
      setLoadingCities(false)
    }
  }, [])

  // Initialize cities on mount
  useEffect(() => {
    fetchCities()
  }, [fetchCities])

  // Calculate shipping with improved logic
  const calculateShipping = useCallback(async () => {
    if (!hasDestination || !isValidWeight) {
      setShippingOptions([])
      setSelectedShipping(null)
      onSelectShipping(null)
      return
    }

    try {
      setLoading(true)
      setError("")

      // Mock API call with weight-based pricing
      await new Promise(resolve => setTimeout(resolve, 800))
      const baseOptions = mockShippingData[selectedCourier as keyof typeof mockShippingData] || []
      
      const options = baseOptions.map((item: ShippingDataItem) => {
        // Calculate weight-based pricing (more realistic)
        const weightMultiplier = Math.ceil(weight / 1000) // Per kg
        const distanceMultiplier = destination.city === "Jakarta" ? 1 : 1.2 // Distance factor
        const calculatedCost = Math.round(item.cost * weightMultiplier * distanceMultiplier)
        
        return {
          service: item.service,
          description: item.description,
          cost: calculatedCost,
          etd: item.etd,
          courier: selectedCourier.toUpperCase(),
          note: item.note
        }
      })

      setShippingOptions(options)

      // Smart auto-selection logic
      if (options.length > 0) {
        let autoSelectedOption
        
        // If user previously had a selection, try to maintain similar service level
        if (selectedShipping) {
          const similarService = options.find(opt => 
            opt.service === selectedShipping.service || 
            opt.note === selectedShipping.note
          )
          autoSelectedOption = similarService || options[0]
        } else {
          // Default to the most balanced option (not cheapest, not most expensive)
          const sortedByCost = [...options].sort((a, b) => a.cost - b.cost)
          autoSelectedOption = sortedByCost[Math.floor(sortedByCost.length / 2)] || sortedByCost[0]
        }

        setSelectedShipping(autoSelectedOption)
        onSelectShipping(autoSelectedOption)
      }

      /* Real API implementation:
      const response = await fetch("/api/rajaongkir/cost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          origin: ORIGIN.postalCode,
          destination: destination.postalCode,
          weight: weight,
          courier: selectedCourier,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.success && data.data && Array.isArray(data.data)) {
        // Process the response...
      } else {
        throw new Error(data.message || 'Invalid response format')
      }
      */

    } catch (error) {
      console.error("Failed to calculate shipping:", error)
      setError("Failed to calculate shipping costs. Please try again.")
      setShippingOptions([])
      setSelectedShipping(null)
      onSelectShipping(null)
    } finally {
      setLoading(false)
    }
  }, [destination, selectedCourier, weight, isValidWeight, hasDestination, selectedShipping, onSelectShipping])

  // Recalculate when dependencies change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      calculateShipping()
    }, 300) // Debounce to prevent excessive API calls

    return () => clearTimeout(timeoutId)
  }, [calculateShipping])

  // Handle city selection with validation
  const handleSelectCity = (cityId: string) => {
    const selectedCity = cities.find((city) => city.city_id === cityId)
    if (selectedCity) {
      const newDestination = {
        city: selectedCity.city_name,
        postalCode: selectedCity.postal_code,
      }

      // Update destination and reset shipping selection
      onDestinationChange?.(newDestination)
      setSelectedShipping(null)
      onSelectShipping(null)
      setShippingOptions([])
      setOpen(false)
    }
  }

  // Handle shipping selection with validation
  const handleSelectShipping = (option: ShippingOption) => {
    if (!option || option.cost <= 0) return
    
    setSelectedShipping(option)
    onSelectShipping(option)
  }

  // Handle courier change with state cleanup
  const handleCourierChange = (courierId: string) => {
    setSelectedCourier(courierId)
    setSelectedShipping(null)
    onSelectShipping(null)
    setShippingOptions([])
    setError("")
  }

  // Filter cities based on search
  const filteredCities = cities.filter(city =>
    city.city_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    city.province.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-sm border">
      <div className="flex items-center space-x-2 pb-4 border-b">
        <Package className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-semibold">Shipping Calculator</h3>
      </div>

      {/* Origin Info */}
      <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
        <div className="flex items-center space-x-2 mb-2">
          <MapPin className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-medium text-blue-800">Shipping From:</span>
        </div>
        <p className="text-sm text-blue-700">
          {ORIGIN.city}, {ORIGIN.district}, {ORIGIN.province} ({ORIGIN.postalCode})
        </p>
      </div>

      {/* Weight Info */}
      <div className="bg-gray-50 p-3 rounded-lg">
        <span className="text-sm text-gray-600">Package Weight: </span>
        <span className="font-semibold text-gray-900">
          {weight >= 1000 ? `${(weight/1000).toFixed(1)} kg` : `${weight} g`}
        </span>
        {!isValidWeight && (
          <div className="flex items-center space-x-2 mt-2 text-red-600">
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm">Weight must be between 1g and 30kg</span>
          </div>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <p className="text-red-800 text-sm">{error}</p>
          </div>
          <button
            onClick={() => {
              setError("")
              if (!cities.length) fetchCities()
              else calculateShipping()
            }}
            className="mt-2 text-sm text-red-700 underline hover:text-red-800"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Destination Selector */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Destination City *</label>
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            disabled={loadingCities}
            className={`w-full flex items-center justify-between px-3 py-2 border rounded-lg text-left transition-colors
              ${loadingCities ? 'bg-gray-100 cursor-not-allowed' : 'bg-white hover:border-gray-400'}
              ${destination.city ? 'text-gray-900' : 'text-gray-500'}
              ${!destination.city ? 'border-gray-300' : 'border-gray-400'}
            `}
          >
            <span>
              {loadingCities ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin h-4 w-4 border-2 border-gray-300 border-t-blue-600 rounded-full"></div>
                  <span>Loading cities...</span>
                </div>
              ) : destination.city ? (
                <div>
                  <span className="font-medium">{destination.city}</span>
                  <span className="text-sm text-gray-500 ml-2">({destination.postalCode})</span>
                </div>
              ) : (
                "Select destination city..."
              )}
            </span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </button>
          
          {open && !loadingCities && (
            <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border rounded-lg shadow-lg">
              <div className="p-3 border-b">
                <input
                  type="text"
                  placeholder="Search cities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="max-h-60 overflow-y-auto">
                {filteredCities.length === 0 ? (
                  <div className="p-3 text-center text-gray-500 text-sm">
                    {searchTerm ? "No cities found" : "No cities available"}
                  </div>
                ) : (
                  filteredCities.map((city) => (
                    <button
                      key={city.city_id}
                      onClick={() => handleSelectCity(city.city_id)}
                      className={`w-full text-left px-3 py-2 hover:bg-gray-100 transition-colors text-sm
                        ${destination.city === city.city_name ? 'bg-blue-50 text-blue-700' : 'text-gray-900'}
                      `}
                    >
                      <div className="flex items-center">
                        {destination.city === city.city_name && <Check className="mr-2 h-4 w-4" />}
                        <div>
                          <div className="font-medium">{city.city_name}</div>
                          <div className="text-gray-500">{city.province} • {city.postal_code}</div>
                        </div>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Courier Selection */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-700">Choose Courier Service *</label>
        <div className="grid grid-cols-3 gap-3">
          {COURIER_SERVICES.map((courier) => (
            <button
              key={courier.id}
              onClick={() => handleCourierChange(courier.id)}
              disabled={!isValidWeight || !hasDestination}
              className={`p-3 rounded-lg border transition-all text-center
                ${selectedCourier === courier.id 
                  ? 'border-blue-500 bg-blue-50 text-blue-700' 
                  : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }
                ${(!isValidWeight || !hasDestination) && 'opacity-50 cursor-not-allowed'}
              `}
            >
              <div className="text-2xl mb-1">{courier.logo}</div>
              <div className="text-sm font-medium">{courier.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Shipping Options */}
      {loading ? (
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Truck className="h-4 w-4 text-gray-400" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
          </div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="border rounded-lg p-4">
              <div className="flex justify-between items-center">
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-40"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
              </div>
            </div>
          ))}
        </div>
      ) : shippingOptions.length > 0 ? (
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Truck className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-gray-700">Available Shipping Options</span>
          </div>
          <div className="space-y-2">
            {shippingOptions
              .sort((a, b) => a.cost - b.cost)
              .map((option) => (
              <button
                key={`${option.courier}-${option.service}`}
                onClick={() => handleSelectShipping(option)}
                className={`w-full p-4 rounded-lg border transition-all text-left
                  ${selectedShipping?.service === option.service && selectedShipping?.courier === option.courier
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full border-2 transition-colors
                      ${selectedShipping?.service === option.service && selectedShipping?.courier === option.courier
                        ? 'border-blue-500 bg-blue-500' 
                        : 'border-gray-300'
                      }
                    `}>
                      {selectedShipping?.service === option.service && selectedShipping?.courier === option.courier && (
                        <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900">
                          {option.courier} - {option.service}
                        </span>
                        {option.note && (
                          <span className={`px-2 py-1 rounded-full text-xs font-medium
                            ${option.note === 'Termurah' ? 'bg-green-100 text-green-800' :
                              option.note === 'Express' ? 'bg-red-100 text-red-800' :
                              option.note === 'Same Day' ? 'bg-purple-100 text-purple-800' :
                              'bg-blue-100 text-blue-800'
                            }
                          `}>
                            {option.note}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {option.description} • Estimated {option.etd} day{option.etd !== '1' ? 's' : ''}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">{formatCurrency(option.cost)}</div>
                    <div className="text-xs text-gray-500">
                      {weight >= 1000 ? `${formatCurrency(Math.round(option.cost / (weight/1000)))}/kg` : ''}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : hasDestination && isValidWeight ? (
        <div className="text-center py-8 text-gray-500">
          <Truck className="h-8 w-8 mx-auto mb-3 opacity-50" />
          <p className="text-sm">Select a courier to view shipping options</p>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-400">
          <Package className="h-8 w-8 mx-auto mb-3 opacity-50" />
          <p className="text-sm">Complete destination and weight to calculate shipping</p>
        </div>
      )}

      {/* Selected Shipping Summary */}
      {selectedShipping && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Check className="h-5 w-5 text-green-600" />
            <span className="font-medium text-green-800">Selected Shipping Method</span>
          </div>
          <div className="text-sm text-green-700">
            <p><strong>{selectedShipping.courier} - {selectedShipping.service}</strong></p>
            <p>{selectedShipping.description}</p>
            <p>Cost: <strong>{formatCurrency(selectedShipping.cost)}</strong> • Delivery: {selectedShipping.etd} day{selectedShipping.etd !== '1' ? 's' : ''}</p>
          </div>
        </div>
      )}
    </div>
  )
}
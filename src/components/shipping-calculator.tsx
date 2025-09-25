"use client"

import { useState, useEffect } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"

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
  { id: "jne", name: "JNE" },
  { id: "pos", name: "POS Indonesia" },
  { id: "tiki", name: "TIKI" },
]

export type ShippingOption = {
  service: string
  description: string
  cost: number
  etd: string
  courier: string
}

type ShippingCalculatorProps = {
  weight: number
  destination: {
    city: string
    postalCode: string
  }
  onSelectShipping: (option: ShippingOption | null) => void
}

export default function ShippingCalculator({ weight, destination, onSelectShipping }: ShippingCalculatorProps) {
  const [open, setOpen] = useState(false)
  const [cities, setCities] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingCities, setLoadingCities] = useState(false)
  const [selectedCourier, setSelectedCourier] = useState<string>("jne")
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([])
  const [selectedShipping, setSelectedShipping] = useState<ShippingOption | null>(null)

  // Fetch cities on component mount
  useEffect(() => {
    const fetchCities = async () => {
      try {
        setLoadingCities(true)
        const response = await fetch("/api/cities")
        const data = await response.json()
        if (data.status.code === 200 && data.results) {
          setCities(data.results)
        }
        
      } catch (error) {
        console.error("Failed to fetch cities:", error)
      } finally {
        setLoadingCities(false)
      }
    }

    fetchCities()
  }, [])
  useEffect(()=>{if(cities) console.log(cities)},[cities])
  // Calculate shipping when courier, destination or weight changes
  useEffect(() => {
    if (destination.city && selectedCourier && weight > 0) {
      calculateShipping()
    } else {
      setShippingOptions([])
      setSelectedShipping(null)
      onSelectShipping(null)
    }
  }, [destination.city, selectedCourier, weight])

  const calculateShipping = async () => {
    if (!destination.city) return

    try {
      setLoading(true)
      const response = await fetch("/api/rajaongkir/cost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          origin: ORIGIN.postalCode,
          destination: destination.postalCode || destination.city,
          weight: weight,
          courier: selectedCourier,
        }),
      })

      const data = await response.json()

      if (data.success && data.data) {
        const options = data.data.map((item: any) => ({
          service: item.service,
          description: item.description,
          cost: item.cost[0].value,
          etd: item.cost[0].etd,
          courier: selectedCourier.toUpperCase(),
        }))

        setShippingOptions(options)

        // Auto-select the cheapest option
        if (options.length > 0) {
          const cheapestOption = options.reduce((prev: any, curr: any) => (prev.cost < curr.cost ? prev : curr))
          setSelectedShipping(cheapestOption)
          onSelectShipping(cheapestOption)
        }
      }
    } catch (error) {
      console.error("Failed to calculate shipping:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSelectCity = (cityId: string) => {
    const selectedCity = cities.find((city) => city.city_id === cityId)
    if (selectedCity) {
      const newDestination = {
        city: selectedCity.city_name,
        postalCode: selectedCity.postal_code,
      }

      // This will trigger the useEffect to recalculate shipping
      onSelectShipping(null)
      setSelectedShipping(null)
      setShippingOptions([])
    }
  }

  const handleSelectShipping = (option: ShippingOption) => {
    setSelectedShipping(option)
    onSelectShipping(option)
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Destination City</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
              disabled={loadingCities}
            >
              {loadingCities ? <Skeleton className="h-4 w-[150px]" /> : destination.city || "Select city..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Search city..." />
              <CommandList>
                <CommandEmpty>No city found.</CommandEmpty>
                <CommandGroup className="max-h-64 overflow-y-auto">
                  {cities.map((city) => (
                    <CommandItem key={city.id} value={city.name} onSelect={handleSelectCity}>
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          destination.city === city.name ? "opacity-100" : "opacity-0",
                        )}
                      />
                      {city.name}, {city.province_id}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label>Choose a shipping method</Label>
        </div>
        <div className="flex space-x-2">
          {COURIER_SERVICES.map((courier) => (
            <Button
              key={courier.id}
              variant={selectedCourier === courier.id ? "default" : "outline"}
              onClick={() => setSelectedCourier(courier.id)}
              className="flex-1"
            >
              {courier.name}
            </Button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      ) : shippingOptions.length > 0 ? (
        <div className="space-y-2">
          <Label>Shipping Options</Label>
          <RadioGroup value={selectedShipping?.service} className="space-y-2">
            {shippingOptions.map((option) => (
              <div
                key={option.service}
                className={cn(
                  "flex items-center justify-between rounded-md border p-3",
                  selectedShipping?.service === option.service && "border-primary bg-primary/5",
                )}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={option.service}
                    id={option.service}
                    onClick={() => handleSelectShipping(option)}
                  />
                  <div>
                    <Label htmlFor={option.service} className="font-medium">
                      {option.courier} - {option.service}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {option.description} • Est. {option.etd} days
                    </p>
                  </div>
                </div>
                <div className="font-medium">Rp {option.cost.toLocaleString("id-ID")}</div>
              </div>
            ))}
          </RadioGroup>
        </div>
      ) : destination.city ? (
        <div className="text-sm text-muted-foreground">Select a courier to view shipping options</div>
      ) : null}
    </div>
  )
}

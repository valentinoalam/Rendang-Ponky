"use client"

import { useState } from "react"
import type { City } from "@/types/rajaongkir"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface CityAutocompleteProps {
  cities: City[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
}

export function CityAutocomplete({
  cities,
  value,
  onChange,
  placeholder = "Pilih kota",
  disabled = false,
}: CityAutocompleteProps) {
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Filter cities based on search query
  const filteredCities =
    searchQuery === ""
      ? cities
      : cities.filter((city) => `${city.type} ${city.city_name}`.toLowerCase().includes(searchQuery.toLowerCase()))

  // Get the selected city name for display
  const selectedCity = cities.find((city) => city.city_id === value)
  const displayValue = selectedCity ? `${selectedCity.type} ${selectedCity.city_name}` : ""

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          disabled={disabled}
        >
          {value ? displayValue : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Cari kota..." value={searchQuery} onValueChange={setSearchQuery} />
          <CommandList>
            <CommandEmpty>Kota tidak ditemukan.</CommandEmpty>
            <CommandGroup>
              {filteredCities.map((city) => (
                <CommandItem
                  key={city.city_id}
                  value={city.city_id}
                  onSelect={(currentValue) => {
                    onChange(currentValue)
                    setOpen(false)
                    setSearchQuery("")
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", value === city.city_id ? "opacity-100" : "opacity-0")} />
                  {city.type} {city.city_name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

"use client"

// Update the AddressForm component to include city selection for shipping
import type React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { Destination } from "@/types/shipping"
import ShippingCalculator, { type ShippingOption } from "./shipping-calculator"

type AddressFormProps = {
  name: string
  setName: (name: string) => void
  phone: string
  setPhone: (phone: string) => void
  address: string
  setAddress: (address: string) => void
  destination: Destination
  setDestination: (destination: Destination) => void
  selectedShipping: ShippingOption | null
  setSelectedShipping: (option: ShippingOption | null) => void
  totalWeight: number
}

const AddressForm: React.FC<AddressFormProps> = ({
  name,
  setName,
  phone,
  setPhone,
  address,
  setAddress,
  destination,
  // setDestination,
  // selectedShipping,
  setSelectedShipping,
  totalWeight,
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" />
        </div>
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Your phone number" />
        </div>
      </div>

      <div>
        <Label htmlFor="address">Street Address</Label>
        <Textarea
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Your complete address"
          rows={3}
        />
      </div>

      <div className="border p-4 rounded-md bg-rendang-darkbrown">
        <h3 className="font-medium mb-2">Shipping Calculator</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Choose your location and shipping method to calculate delivery costs
        </p>
        <p className="text-sm text-muted-foreground mb-4">
          Shipping from: JAKA SAMPURNA, BEKASI BARAT, BEKASI, JAWA BARAT, 17145
          <br />
          Total weight: {totalWeight} gram
        </p>
        <ShippingCalculator weight={totalWeight} destination={destination} onSelectShipping={setSelectedShipping} />
      </div>
    </div>
  )
}

export default AddressForm

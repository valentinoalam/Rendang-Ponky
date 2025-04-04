import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface AddressFormProps {
  name: string;
  setName: (name: string) => void;
  phone: string;
  setPhone: (phone: string) => void;
  address: string;
  setAddress: (address: string) => void;
}

const AddressForm: React.FC<AddressFormProps> = ({
  name,
  setName,
  phone,
  setPhone,
  address,
  setAddress
}) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          placeholder="Your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          placeholder="Your WhatsApp number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          type="tel"
        />
      </div>
      
      <div>
        <Label htmlFor="address">Delivery Address</Label>
        <Textarea
          id="address"
          placeholder="Your complete delivery address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          rows={3}
        />
      </div>
    </div>
  );
};

export default AddressForm;

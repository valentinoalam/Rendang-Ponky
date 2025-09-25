"use client"

import type React from "react"

import { useState } from "react"
import type { SavedAddress } from "@/types/rajaongkir"
import { useSavedAddresses } from "@/hooks/use-saved-addresses"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PlusCircle, Edit, Trash2, MapPin, Check } from "lucide-react"

interface SavedAddressesProps {
  onSelectAddress: (address: SavedAddress) => void
}

export function SavedAddresses({ onSelectAddress }: SavedAddressesProps) {
  const { addresses, addAddress, updateAddress, deleteAddress, setDefaultAddress } = useSavedAddresses()
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentAddress, setCurrentAddress] = useState<SavedAddress | null>(null)

  // Form state for new/edit address
  const [formData, setFormData] = useState<Partial<SavedAddress>>({
    name: "",
    provinceId: "",
    provinceName: "",
    cityId: "",
    cityName: "",
    address: "",
    postalCode: "",
    isDefault: false,
  })

  // Reset form data
  const resetForm = () => {
    setFormData({
      name: "",
      provinceId: "",
      provinceName: "",
      cityId: "",
      cityName: "",
      address: "",
      postalCode: "",
      isDefault: false,
    })
  }

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle checkbox change
  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, isDefault: checked }))
  }

  // Handle add address
  const handleAddAddress = () => {
    if (formData.name && formData.provinceId && formData.cityId) {
      addAddress(formData as Omit<SavedAddress, "id">)
      resetForm()
      setIsAddDialogOpen(false)
    }
  }

  // Handle edit address
  const handleEditAddress = () => {
    if (currentAddress && formData.name) {
      updateAddress(currentAddress.id, formData)
      resetForm()
      setCurrentAddress(null)
      setIsEditDialogOpen(false)
    }
  }

  // Open edit dialog with address data
  const openEditDialog = (address: SavedAddress) => {
    setCurrentAddress(address)
    setFormData({
      name: address.name,
      provinceId: address.provinceId,
      provinceName: address.provinceName,
      cityId: address.cityId,
      cityName: address.cityName,
      address: address.address,
      postalCode: address.postalCode,
      isDefault: address.isDefault,
    })
    setIsEditDialogOpen(true)
  }

  // Handle delete address
  const handleDeleteAddress = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus alamat ini?")) {
      deleteAddress(id)
    }
  }

  // Handle set as default
  const handleSetDefault = (id: string) => {
    setDefaultAddress(id)
  }

  // Handle select address
  const handleSelectAddress = (address: SavedAddress) => {
    onSelectAddress(address)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Alamat Tersimpan</h3>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline">
              <PlusCircle className="h-4 w-4 mr-2" />
              Tambah Alamat
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah Alamat Baru</DialogTitle>
              <DialogDescription>Tambahkan alamat baru untuk mempercepat proses pengisian form.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nama Alamat</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Rumah, Kantor, dll."
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Alamat Lengkap</Label>
                <Input
                  id="address"
                  name="address"
                  placeholder="Jl. Contoh No. 123"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="postalCode">Kode Pos</Label>
                <Input
                  id="postalCode"
                  name="postalCode"
                  placeholder="12345"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="isDefault" checked={formData.isDefault} onCheckedChange={handleCheckboxChange} />
                <Label htmlFor="isDefault">Jadikan alamat utama</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Batal
              </Button>
              <Button onClick={handleAddAddress}>Simpan</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {addresses.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center text-muted-foreground">Belum ada alamat tersimpan.</CardContent>
        </Card>
      ) : (
        <ScrollArea className="h-[200px]">
          <div className="space-y-2">
            {addresses.map((address) => (
              <Card key={address.id} className={address.isDefault ? "border-primary" : ""}>
                <CardHeader className="p-4 pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-base flex items-center">
                        {address.name}
                        {address.isDefault && (
                          <span className="ml-2 bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
                            Utama
                          </span>
                        )}
                      </CardTitle>
                      <CardDescription className="text-sm mt-1">
                        {address.address}, {address.cityName}, {address.provinceName} {address.postalCode}
                      </CardDescription>
                    </div>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="icon" onClick={() => openEditDialog(address)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteAddress(address.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardFooter className="p-4 pt-2 flex justify-between">
                  <Button variant="ghost" size="sm" onClick={() => handleSelectAddress(address)}>
                    <MapPin className="h-4 w-4 mr-2" />
                    Gunakan Alamat
                  </Button>
                  {!address.isDefault && (
                    <Button variant="ghost" size="sm" onClick={() => handleSetDefault(address.id)}>
                      <Check className="h-4 w-4 mr-2" />
                      Jadikan Utama
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </ScrollArea>
      )}

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Alamat</DialogTitle>
            <DialogDescription>Ubah detail alamat tersimpan.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Nama Alamat</Label>
              <Input
                id="edit-name"
                name="name"
                placeholder="Rumah, Kantor, dll."
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-address">Alamat Lengkap</Label>
              <Input
                id="edit-address"
                name="address"
                placeholder="Jl. Contoh No. 123"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-postalCode">Kode Pos</Label>
              <Input
                id="edit-postalCode"
                name="postalCode"
                placeholder="12345"
                value={formData.postalCode}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="edit-isDefault" checked={formData.isDefault} onCheckedChange={handleCheckboxChange} />
              <Label htmlFor="edit-isDefault">Jadikan alamat utama</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleEditAddress}>Simpan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

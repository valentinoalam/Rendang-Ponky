"use client"

import { useState, useEffect } from "react"
import type { SavedAddress } from "@/types/rajaongkir"
import { v4 as uuidv4 } from "uuid"

const STORAGE_KEY = "shipping-saved-addresses"

export function useSavedAddresses() {
  const [addresses, setAddresses] = useState<SavedAddress[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load saved addresses from localStorage on component mount
  useEffect(() => {
    const savedAddresses = localStorage.getItem(STORAGE_KEY)
    if (savedAddresses) {
      try {
        setAddresses(JSON.parse(savedAddresses))
      } catch (error) {
        console.error("Error parsing saved addresses:", error)
        setAddresses([])
      }
    }
    setIsLoaded(true)
  }, [])

  // Save addresses to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(addresses))
    }
  }, [addresses, isLoaded])

  // Add a new address
  const addAddress = (address: Omit<SavedAddress, "id">) => {
    const newAddress: SavedAddress = {
      ...address,
      id: uuidv4(),
    }

    // If this is the first address or marked as default, make it the default
    if (addresses.length === 0 || address.isDefault) {
      // Clear default flag from all other addresses
      const updatedAddresses = addresses.map((addr) => ({
        ...addr,
        isDefault: false,
      }))
      setAddresses([...updatedAddresses, { ...newAddress, isDefault: true }])
    } else {
      setAddresses([...addresses, newAddress])
    }
  }

  // Update an existing address
  const updateAddress = (id: string, address: Partial<SavedAddress>) => {
    const updatedAddresses = addresses.map((addr) => {
      if (addr.id === id) {
        return { ...addr, ...address }
      }
      // If this address is being set as default, remove default from others
      if (address.isDefault && addr.id !== id) {
        return { ...addr, isDefault: false }
      }
      return addr
    })
    setAddresses(updatedAddresses)
  }

  // Delete an address
  const deleteAddress = (id: string) => {
    const filteredAddresses = addresses.filter((addr) => addr.id !== id)

    // If we deleted the default address and there are other addresses, make the first one default
    const deletedDefault = !filteredAddresses.some((addr) => addr.isDefault) && filteredAddresses.length > 0

    if (deletedDefault) {
      filteredAddresses[0].isDefault = true
    }

    setAddresses(filteredAddresses)
  }

  // Set an address as default
  const setDefaultAddress = (id: string) => {
    const updatedAddresses = addresses.map((addr) => ({
      ...addr,
      isDefault: addr.id === id,
    }))
    setAddresses(updatedAddresses)
  }

  // Get the default address
  const getDefaultAddress = () => {
    return addresses.find((addr) => addr.isDefault) || addresses[0]
  }

  return {
    addresses,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
    getDefaultAddress,
    isLoaded,
  }
}

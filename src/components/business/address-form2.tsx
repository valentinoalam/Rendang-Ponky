'use client';

import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

type Province = {
  id: string,
  name: string
}
type City = {
  id: string,
  province_id: string,
  name: string
}
type District = {
  id: string,
  regency_id: string,
  name: string
}
type Village = {
  id: string,
  district_id: string,
  name: string
}
export default function AddressForm() {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [subdistricts, setSubdistricts] = useState<Village[]>([]);

  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedSubdistrict, setSelectedSubdistrict] = useState('');

  useEffect(() => {
    // Fetch provinces
    fetch('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json')
      .then((res) => res.json())
      .then((data) => setProvinces(data));
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      // Fetch cities based on selected province
      fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selectedProvince}.json`)
        .then((res) => res.json())
        .then((data) => setCities(data));
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedCity) {
      // Fetch districts based on selected city
      fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${selectedCity}.json`)
        .then((res) => res.json())
        .then((data) => setDistricts(data));
    }
  }, [selectedCity]);

  useEffect(() => {
    if (selectedDistrict) {
      // Fetch subdistricts based on selected district
      fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/villages/${selectedDistrict}.json`)
        .then((res) => res.json())
        .then((data) => setSubdistricts(data));
    }
  }, [selectedDistrict]);

  return (
    <form className="space-y-4">
      <div>
        <Label htmlFor="province">Province</Label>
        <Select onValueChange={(value) => setSelectedProvince(value)} value={selectedProvince}>
          <SelectTrigger id="province">
            <SelectValue placeholder="Select a province" />
          </SelectTrigger>
          <SelectContent>
            {provinces.map((province) => (
              <SelectItem key={province.id} value={province.id}>
                {province.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="city">City</Label>
        <Select onValueChange={(value) => setSelectedCity(value)} value={selectedCity} disabled={!selectedProvince}>
          <SelectTrigger id="city">
            <SelectValue placeholder="Select a city" />
          </SelectTrigger>
          <SelectContent>
            {cities.map((city) => (
              <SelectItem key={city.id} value={city.id}>
                {city.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="district">District</Label>
        <Select onValueChange={(value) => setSelectedDistrict(value)} value={selectedDistrict} disabled={!selectedCity}>
          <SelectTrigger id="district">
            <SelectValue placeholder="Select a district" />
          </SelectTrigger>
          <SelectContent>
            {districts.map((district) => (
              <SelectItem key={district.id} value={district.id}>
                {district.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="subdistrict">Subdistrict</Label>
        <Select
          onValueChange={(value) => setSelectedSubdistrict(value)}
          value={selectedSubdistrict}
          disabled={!selectedDistrict}
        >
          <SelectTrigger id="subdistrict">
            <SelectValue placeholder="Select a subdistrict" />
          </SelectTrigger>
          <SelectContent>
            {subdistricts.map((subdistrict) => (
              <SelectItem key={subdistrict.id} value={subdistrict.id}>
                {subdistrict.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
        disabled={!selectedSubdistrict}
      >
        Submit
      </button>
    </form>
  );
}
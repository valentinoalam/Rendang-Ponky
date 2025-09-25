import { NextResponse } from "next/server"

// Mock data for cities in Indonesia
const cities = [
  { id: 1, province_id: 6, name: "Jakarta Pusat", type: "Kota" },
  { id: 2, province_id: 6, name: "Jakarta Utara", type: "Kota" },
  { id: 3, province_id: 6, name: "Jakarta Barat", type: "Kota" },
  { id: 4, province_id: 6, name: "Jakarta Selatan", type: "Kota" },
  { id: 5, province_id: 6, name: "Jakarta Timur", type: "Kota" },
  { id: 6, province_id: 9, name: "Bandung", type: "Kota" },
  { id: 7, province_id: 9, name: "Bekasi", type: "Kota" },
  { id: 8, province_id: 9, name: "Bogor", type: "Kota" },
  { id: 9, province_id: 9, name: "Cimahi", type: "Kota" },
  { id: 10, province_id: 9, name: "Cirebon", type: "Kota" },
  { id: 11, province_id: 9, name: "Depok", type: "Kota" },
  { id: 12, province_id: 9, name: "Sukabumi", type: "Kota" },
  { id: 13, province_id: 9, name: "Tasikmalaya", type: "Kota" },
  { id: 14, province_id: 9, name: "Banjar", type: "Kota" },
  { id: 15, province_id: 11, name: "Surabaya", type: "Kota" },
]

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const provinceId = searchParams.get("province")

    let filteredCities = cities

    if (provinceId) {
      filteredCities = cities.filter((city) => city.province_id === Number.parseInt(provinceId))
    }

    return NextResponse.json({
      status: {
        code: 200,
        description: "OK",
      },
      results: filteredCities,
    })
  } catch (error) {
    console.error('Cities API error:', error);
    return NextResponse.json(
      {
        status: {
          code: 500,
          description: "Error",
        },
        results: null,
      },
      { status: 500 },
    )
  }
}

import { NextResponse } from "next/server"

// Mock data for provinces in Indonesia
const provinces = [
  { id: 1, name: "Bali" },
  { id: 2, name: "Bangka Belitung" },
  { id: 3, name: "Banten" },
  { id: 4, name: "Bengkulu" },
  { id: 5, name: "DI Yogyakarta" },
  { id: 6, name: "DKI Jakarta" },
  { id: 7, name: "Gorontalo" },
  { id: 8, name: "Jambi" },
  { id: 9, name: "Jawa Barat" },
  { id: 10, name: "Jawa Tengah" },
  { id: 11, name: "Jawa Timur" },
  { id: 12, name: "Kalimantan Barat" },
  { id: 13, name: "Kalimantan Selatan" },
  { id: 14, name: "Kalimantan Tengah" },
  { id: 15, name: "Kalimantan Timur" },
]

export async function GET() {
  try {
    return NextResponse.json({
      status: {
        code: 200,
        description: "OK",
      },
      results: provinces,
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: {
          code: 500,
          description: error,
        },
        results: null,
      },
      { status: 500 },
    )
  }
}

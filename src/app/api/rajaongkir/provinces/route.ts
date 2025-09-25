import { NextResponse } from "next/server"
import type { ProvinceResponse } from "@/types/rajaongkir"

// Set cache control headers for 24 hours
export const revalidate = 86400

export async function GET() {
  try {
    const response = await fetch("https://api.rajaongkir.com/starter/province", {
      headers: {
        key: process.env.RAJAONGKIR_API_KEY || "",
      },
      next: {
        revalidate: 86400, // Cache for 24 hours
      },
    })

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Rajaongkir API Error: ${JSON.stringify(errorData)}`);
    }

    const data: ProvinceResponse = await response.json()
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200",
      },
    })
  } catch (error) {
    console.error("Error fetching provinces:", error)
    return NextResponse.json({ error: "Failed to fetch provinces" }, { status: 500 })
  }
}

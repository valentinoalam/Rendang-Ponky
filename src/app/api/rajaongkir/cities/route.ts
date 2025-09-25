import { NextResponse } from "next/server"

export async function GET() {
  try {
    const response = await fetch("https://rajaongkir.komerce.id/api/v1/cities", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        key: process.env.RAJAONGKIR_API_KEY || "",
      },
    })

    const data = await response.json()

    if (data.rajaongkir && data.rajaongkir.status.code === 200) {
      return NextResponse.json({
        success: true,
        data: data.rajaongkir.results,
      })
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch cities",
      },
      { status: 400 },
    )
  } catch (error) {
    console.error("Error fetching cities:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    )
  }
}

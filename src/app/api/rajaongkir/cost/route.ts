import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { origin, destination, weight, courier } = body

    if (!origin || !destination || !weight || !courier) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required parameters",
        },
        { status: 400 },
      )
    }

    const response = await fetch("https://rajaongkir.komerce.id/api/v1/cost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        key: process.env.RAJAONGKIR_API_KEY || "",
      },
      body: JSON.stringify({
        origin,
        destination,
        weight,
        courier,
      }),
    })

    const data = await response.json()

    if (data.rajaongkir && data.rajaongkir.status.code === 200) {
      return NextResponse.json({
        success: true,
        data: data.rajaongkir.results[0].costs,
      })
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to calculate shipping cost",
      },
      { status: 400 },
    )
  } catch (error) {
    console.error("Error calculating shipping cost:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    )
  }
}

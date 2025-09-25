import { NextResponse } from "next/server"

// Mock courier data
const couriers = [
  {
    code: "jne",
    name: "JNE",
    services: [
      { service: "OKE", description: "Ongkos Kirim Ekonomis" },
      { service: "REG", description: "Layanan Reguler" },
      { service: "YES", description: "Yakin Esok Sampai" },
    ],
  },
  {
    code: "pos",
    name: "POS Indonesia",
    services: [
      { service: "Pos Reguler", description: "Pos Reguler" },
      { service: "Pos Kilat Khusus", description: "Pos Kilat Khusus" },
      { service: "Pos Express", description: "Pos Express" },
    ],
  },
  {
    code: "tiki",
    name: "TIKI",
    services: [
      { service: "ECO", description: "Ekonomis" },
      { service: "REG", description: "Reguler Service" },
      { service: "ONS", description: "Over Night Service" },
    ],
  },
]

// Simple distance matrix between cities (city_id to city_id)
const distanceMatrix: Record<string, Record<string, number>> = {
  "1": { "6": 150, "15": 800 },
  "2": { "6": 30, "15": 780 },
  "3": { "6": 20, "15": 820 },
  "4": { "6": 15, "15": 810 },
  "5": { "6": 25, "15": 790 },
  "6": { "1": 150, "15": 700 },
  "15": { "1": 800, "6": 700 },
}

// Calculate shipping cost based on weight, distance, and courier
function calculateShippingCost(originId: string, destinationId: string, weight: number, courier: string): any[] {
  // Get distance between cities
  const distance = distanceMatrix[originId]?.[destinationId] || 500 // Default distance if not found

  // Find courier
  const courierData = couriers.find((c) => c.code === courier.toLowerCase())
  if (!courierData) return []

  // Calculate costs for each service
  return courierData.services.map((service) => {
    // Base rate per kg
    let ratePerKg = 0

    switch (courierData.code) {
      case "jne":
        ratePerKg = service.service === "OKE" ? 10000 : service.service === "REG" ? 12000 : 15000
        break
      case "pos":
        ratePerKg = service.service === "Pos Reguler" ? 9000 : service.service === "Pos Kilat Khusus" ? 11000 : 14000
        break
      case "tiki":
        ratePerKg = service.service === "ECO" ? 9500 : service.service === "REG" ? 11500 : 16000
        break
    }

    // Calculate cost based on weight and distance
    const baseCost = weight * ratePerKg
    const distanceFactor = distance / 100 // Every 100km adds to the cost
    const totalCost = Math.round(baseCost * (1 + distanceFactor * 0.1))

    // Calculate estimated days
    let etd = "1-1"
    if (distance < 50) {
      etd = "1-1"
    } else if (distance < 200) {
      etd = service.service.includes("REG")
        ? "1-2"
        : service.service.includes("ECO") || service.service.includes("OKE")
          ? "2-3"
          : "1-1"
    } else {
      etd = service.service.includes("REG")
        ? "2-3"
        : service.service.includes("ECO") || service.service.includes("OKE")
          ? "3-5"
          : "1-2"
    }

    return {
      service: service.service,
      description: service.description,
      cost: [
        {
          value: totalCost,
          etd: etd,
          note: "",
        },
      ],
    }
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { origin, destination, weight, courier } = body

    if (!origin || !destination || !weight || !courier) {
      return NextResponse.json(
        {
          status: {
            code: 400,
            description: "Bad Request - Missing required parameters",
          },
          results: null,
        },
        { status: 400 },
      )
    }

    const costs = calculateShippingCost(origin, destination, weight, courier)

    return NextResponse.json({
      status: {
        code: 200,
        description: "OK",
      },
      results: {
        code: courier.toUpperCase(),
        name: couriers.find((c) => c.code === courier.toLowerCase())?.name || courier,
        costs: costs,
      },
    })
  } catch (error) {
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

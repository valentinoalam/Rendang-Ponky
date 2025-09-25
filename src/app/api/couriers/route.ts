import { NextResponse } from "next/server"

// List of available couriers
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

export async function GET() {
  try {
    return NextResponse.json({
      status: {
        code: 200,
        description: "OK",
      },
      results: couriers,
    })
  } catch (error) {
    console.error('Couriers API error:', error);
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

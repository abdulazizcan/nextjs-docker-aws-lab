import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const data = {
    message: "Merhaba! Bu mesaj API üzerinden geldi.",
    timestamp: new Date().toISOString(),
  };
  return NextResponse.json(data);
}

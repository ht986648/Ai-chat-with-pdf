import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ 
    message: "Test API is working!", 
    timestamp: new Date().toISOString() 
  });
}

export async function POST(req: Request) {
  const body = await req.json();
  return NextResponse.json({ 
    message: "Test POST is working!", 
    receivedData: body,
    timestamp: new Date().toISOString() 
  });
} 
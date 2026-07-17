import { NextResponse } from "next/server";
import { generateSalesReply, type ChatMessage } from "@/lib/sales-agent";
import { getAllVehicles } from "@/lib/inventory";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      messages?: ChatMessage[];
    };

    const messages = Array.isArray(body.messages) ? body.messages.slice(-12) : [];
    if (!messages.length) {
      return NextResponse.json({ error: "messages required" }, { status: 400 });
    }

    const vehicles = await getAllVehicles();
    const result = await generateSalesReply(messages, vehicles);

    return NextResponse.json(result);
  } catch (error) {
    console.error("[api/chat]", error);
    return NextResponse.json(
      {
        reply:
          "I’m having trouble right now — please call us and we’ll help you right away.",
        cta: { label: "Contact us", href: "/contact" },
      },
      { status: 200 },
    );
  }
}

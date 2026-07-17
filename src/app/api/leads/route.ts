import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const type = String(body.type ?? "contact");
    const email = String(body.email ?? "").trim();
    const phone = String(body.phone ?? "").trim();

    if (!email && !phone) {
      return NextResponse.json(
        { error: "Email or phone is required" },
        { status: 400 },
      );
    }

    // Lead capture — wire to CRM / email / Frazer customer create as needed
    console.info("[lead]", {
      type,
      receivedAt: new Date().toISOString(),
      vehicleSlug: body.vehicleSlug ?? null,
      payload: {
        ...body,
        // Avoid logging sensitive extras in production aggregators if undesired
      },
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

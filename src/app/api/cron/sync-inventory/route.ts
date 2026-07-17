import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { syncFrazerInventory } from "@/lib/frazer/client";

export async function GET(request: Request) {
  const auth = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret) {
    const token = auth?.replace(/^Bearer\s+/i, "");
    if (token !== cronSecret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    const result = await syncFrazerInventory();
    revalidateTag("inventory", "max");
    return NextResponse.json({
      ok: true,
      syncedAt: new Date().toISOString(),
      ...result,
    });
  } catch (error) {
    console.error("[cron/sync-inventory]", error);
    return NextResponse.json(
      { ok: false, error: "Sync failed" },
      { status: 500 },
    );
  }
}

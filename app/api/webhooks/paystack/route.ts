import { NextResponse } from "next/server";
import crypto from "crypto";
import { createAdminClient } from "@/utils/supabase/admin";

export async function POST(req: Request) {
  try {
    console.log("Paystack Webhook Pinged!");
    // 1. Get the raw body for signature verification
    const rawBody = await req.text();
    const signature = req.headers.get("x-paystack-signature");
    const secret = process.env.PAYSTACK_SECRET_KEY;

    if (!secret || !signature) {
      console.error(
        "Webhook Error: Missing signature or secret in .env.local",
        { hasSecret: !!secret, hasSignature: !!signature },
      );
      return NextResponse.json(
        { error: "Missing signature or secret" },
        { status: 400 },
      );
    }

    // 2. Verify the Paystack signature using HMAC SHA512
    const hash = crypto
      .createHmac("sha512", secret)
      .update(rawBody)
      .digest("hex");

    if (hash !== signature) {
      console.error("Invalid Paystack signature!");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    // 3. Parse the body safely now that it's verified
    const event = JSON.parse(rawBody);

    // 4. Handle successful charge events
    if (event.event === "charge.success") {
      const reference = event.data.reference;
      console.log(`Verified successful payment for reference: ${reference}`);

      // 5. Update the order in the database to "paid" using Admin client (bypasses RLS)
      const supabase = createAdminClient();

      const { data: existingOrder, error: fetchError } = await supabase
        .from("orders")
        .select("status")
        .eq("paystack_reference", reference)
        .maybeSingle();

      if (!existingOrder) {
        console.warn(`No order found for reference: ${reference}`);
        return NextResponse.json({ received: true });
      }

      if (existingOrder.status === "paid" || existingOrder.status === "completed") {
        console.log(`Order ${reference} already processed — skipping`);
        return NextResponse.json({ received: true });
      }

      const { error } = await supabase
        .from("orders")
        .update({ status: "paid" })
        .eq("paystack_reference", reference);

      if (error) {
        console.error("Failed to update order status:", error);
        return NextResponse.json(
          { error: "Database update failed" },
          { status: 500 },
        );
      }

      console.log(`Order ${reference} successfully marked as paid!`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

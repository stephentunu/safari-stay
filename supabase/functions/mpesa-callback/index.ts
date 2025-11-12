import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.81.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    console.log("M-Pesa callback received:", JSON.stringify(body, null, 2));

    const { Body } = body;
    const { stkCallback } = Body;

    if (!stkCallback) {
      throw new Error("Invalid callback data");
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const checkoutRequestId = stkCallback.CheckoutRequestID;
    const resultCode = stkCallback.ResultCode;

    // Find payment by transaction_id
    const { data: payment, error: paymentError } = await supabase
      .from("payments")
      .select("*, booking:bookings(*)")
      .eq("transaction_id", checkoutRequestId)
      .single();

    if (paymentError) {
      console.error("Payment not found:", paymentError);
      throw paymentError;
    }

    if (resultCode === 0) {
      // Payment successful
      const callbackMetadata = stkCallback.CallbackMetadata?.Item || [];
      const mpesaReceiptNumber = callbackMetadata.find(
        (item: any) => item.Name === "MpesaReceiptNumber"
      )?.Value;

      console.log("Payment successful. Receipt:", mpesaReceiptNumber);

      // Update payment status
      await supabase
        .from("payments")
        .update({
          payment_status: "completed",
          mpesa_receipt_number: mpesaReceiptNumber,
        })
        .eq("id", payment.id);

      // Update booking status
      await supabase
        .from("bookings")
        .update({
          status: "confirmed",
        })
        .eq("id", payment.booking_id);

      console.log("Payment and booking updated successfully");
    } else {
      // Payment failed
      console.log("Payment failed with code:", resultCode);

      await supabase
        .from("payments")
        .update({
          payment_status: "failed",
        })
        .eq("id", payment.id);

      await supabase
        .from("bookings")
        .update({
          status: "cancelled",
        })
        .eq("id", payment.booking_id);
    }

    return new Response(
      JSON.stringify({
        ResultCode: 0,
        ResultDesc: "Success",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error: any) {
    console.error("Error processing M-Pesa callback:", error);
    return new Response(
      JSON.stringify({
        ResultCode: 1,
        ResultDesc: error.message,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});

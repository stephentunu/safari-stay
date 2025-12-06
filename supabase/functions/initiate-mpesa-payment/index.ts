import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.81.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface MpesaRequest {
  phone_number: string;
  amount: number;
  booking_id: string;
  payment_id: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { phone_number, amount, booking_id, payment_id }: MpesaRequest = await req.json();

    // Format phone number to 254XXXXXXXXX format (M-Pesa requires this format without +)
    let formattedPhone = phone_number.replace(/\s+/g, '').replace(/-/g, '');
    if (formattedPhone.startsWith('+')) {
      formattedPhone = formattedPhone.substring(1);
    }
    if (formattedPhone.startsWith('0')) {
      formattedPhone = '254' + formattedPhone.substring(1);
    }
    if (!formattedPhone.startsWith('254')) {
      formattedPhone = '254' + formattedPhone;
    }

    console.log("Initiating M-Pesa payment for booking:", booking_id, "Phone:", formattedPhone);

    // Get M-Pesa access token
    const consumerKey = Deno.env.get("MPESA_CONSUMER_KEY");
    const consumerSecret = Deno.env.get("MPESA_CONSUMER_SECRET");
    const auth = btoa(`${consumerKey}:${consumerSecret}`);

    const tokenResponse = await fetch(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    );

    const { access_token } = await tokenResponse.json();
    console.log("Access token obtained");

    // Initiate STK Push
    const shortcode = Deno.env.get("MPESA_SHORTCODE");
    const passkey = Deno.env.get("MPESA_PASSKEY");
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, "").slice(0, 14);
    const password = btoa(`${shortcode}${passkey}${timestamp}`);

    const callbackUrl = `${Deno.env.get("SUPABASE_URL")}/functions/v1/mpesa-callback`;

    const stkPushResponse = await fetch(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          BusinessShortCode: shortcode,
          Password: password,
          Timestamp: timestamp,
          TransactionType: "CustomerPayBillOnline",
          Amount: Math.round(amount),
          PartyA: formattedPhone,
          PartyB: shortcode,
          PhoneNumber: formattedPhone,
          CallBackURL: callbackUrl,
          AccountReference: "McDone Enterprices",
          TransactionDesc: `Booking ${booking_id.substring(0, 8)}`,
        }),
      }
    );

    const stkPushData = await stkPushResponse.json();
    console.log("STK Push response:", stkPushData);

    if (stkPushData.ResponseCode !== "0") {
      throw new Error(stkPushData.ResponseDescription || "Failed to initiate payment");
    }

    // Update payment with checkout request ID
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    await supabase
      .from("payments")
      .update({
        transaction_id: stkPushData.CheckoutRequestID,
      })
      .eq("id", payment_id);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Payment initiated successfully",
        checkout_request_id: stkPushData.CheckoutRequestID,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error: any) {
    console.error("Error initiating M-Pesa payment:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});

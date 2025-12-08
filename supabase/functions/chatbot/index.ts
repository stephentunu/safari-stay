import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

const systemPrompts: Record<string, string> = {
  en: `You are McDone's helpful booking assistant. McDone is a Kenyan accommodation and experience booking platform. 
You help users with:
- Finding properties (hotels, apartments, villas, guesthouses)
- Understanding the booking process
- M-Pesa payment guidance
- Property listing for hosts
- General questions about McDone

Keep responses concise, friendly, and helpful. If asked about specific properties, suggest using the search feature.`,
  
  sw: `Wewe ni msaidizi wa McDone anayesaidia na uhifadhi. McDone ni jukwaa la Kenya la kuhifadhi malazi na matukio.
Unasaidia watumiaji na:
- Kupata mali (hoteli, vyumba, villa, nyumba za wageni)
- Kuelewa mchakato wa kuhifadhi
- Mwongozo wa malipo ya M-Pesa
- Uorodheshaji wa mali kwa wenyeji
- Maswali ya jumla kuhusu McDone

Weka majibu yako mafupi, ya kirafiki, na yenye kusaidia.`,

  fr: `Vous êtes l'assistant de réservation utile de McDone. McDone est une plateforme kényane de réservation d'hébergements et d'expériences.
Vous aidez les utilisateurs avec:
- Trouver des propriétés (hôtels, appartements, villas, maisons d'hôtes)
- Comprendre le processus de réservation
- Conseils de paiement M-Pesa
- Inscription de propriété pour les hôtes
- Questions générales sur McDone

Gardez les réponses concises, amicales et utiles.`,

  ar: `أنت مساعد الحجز المفيد لـ McDone. McDone هي منصة كينية لحجز الإقامة والتجارب.
أنت تساعد المستخدمين في:
- العثور على العقارات (الفنادق والشقق والفلل ودور الضيافة)
- فهم عملية الحجز
- إرشادات الدفع عبر M-Pesa
- إدراج العقارات للمضيفين
- الأسئلة العامة حول McDone

اجعل الردود موجزة وودية ومفيدة.`,

  am: `እርስዎ የMcDone ረዳት ናቸው። McDone የኬንያ የመኖሪያ እና ተሞክሮ ማስያዝ መድረክ ነው።
ተጠቃሚዎችን በሚከተሉት ይረዱ:
- ንብረቶችን ማግኘት (ሆቴሎች, አፓርታማዎች, ቪላዎች, የእንግዳ ቤቶች)
- የማስያዝ ሂደቱን መረዳት
- የM-Pesa ክፍያ መመሪያ
- ለአስተናጋጆች ንብረት ማስመዝገብ
- ስለ McDone አጠቃላይ ጥያቄዎች

ምላሾችን አጭር፣ ተወዳጅ እና ጠቃሚ ያድርጉ።`,
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, language = "en" } = await req.json();

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = systemPrompts[language] || systemPrompts.en;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content || "I'm sorry, I couldn't process your request.";

    return new Response(JSON.stringify({ response: aiResponse }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Chatbot error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

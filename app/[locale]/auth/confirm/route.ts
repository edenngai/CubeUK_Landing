import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest } from "next/server";
import { getURL } from "@/utils/getURL";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const redirectTo = searchParams.get("redirect");

  console.log("Request URL:", request.url);
  console.log("Site URL:", getURL());
  console.log("Redirect parameter:", redirectTo);
  console.log("Token Hash:", token_hash);
  console.log("Type:", type);

  const locale = await getLocale();
  console.log("Locale:", locale);

  if (token_hash && type) {
    const supabase = await createClient();

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });
    if (!error) {
      // redirect user to specified redirect URL or root of app
      const redirectPath = redirectTo || "/onboarding";
      console.log("Redirecting to:", { href: redirectPath, locale });
      redirect({ href: redirectPath, locale });
    }
  }

  // redirect the user to an error page with some instructions
  redirect({ href: "/error", locale });
}

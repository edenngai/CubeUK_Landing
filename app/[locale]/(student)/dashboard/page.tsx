import { redirect } from "@/i18n/navigation";
import { createClient } from "@/utils/supabase/server";
import { getLocale } from "next-intl/server";

export default async function Home() {
  const supabase = await createClient();
  const locale = await getLocale();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect({ href: "/login", locale });
  }

  return <div>hi</div>;
}

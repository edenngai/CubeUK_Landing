"use server";

import { redirect } from "@/i18n/navigation";
import { createClient } from "@/utils/supabase/server";
import { getLocale } from "next-intl/server";
import { revalidatePath } from "next/cache";

export async function purchaseCourse(courseId: string) {
  const supabase = await createClient();
  const locale = await getLocale();

  try {
    // Get the current user
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData.user) {
      redirect({ href: `/login`, locale });
    }

    // Check if the user has already purchased the course
    const { data: existingPurchase, error: purchaseCheckError } = await supabase
      .from("Purchase")
      .select("*")
      .eq("user_id", userData?.user?.id)
      .eq("course_id", courseId)
      .maybeSingle();

    if (existingPurchase) {
      return { success: true, alreadyPurchased: true };
    }

    // Insert a new purchase record
    const { error: purchaseError } = await supabase
      .from("Purchase")
      .insert([{ user_id: userData?.user?.id, course_id: courseId }])
      .select();

    if (purchaseError) {
      throw purchaseError;
    }

    // Revalidate all relevant paths
    revalidatePath(`/dashboard/[courseId]`, "layout");
    revalidatePath(`/courses/[courseId]`, "layout");
    revalidatePath(`/dashboard`, "layout");

    return { success: true, alreadyPurchased: false };
  } catch (error) {
    console.error("Error purchasing course:", error);
    return { success: false, error: "Failed to purchase course" };
  }
}

"use server";

import { z } from "zod";

import { createClient } from "@/utils/supabase/server";
import { phoneNumberSchema } from "@/validation/phoneNumberSchema";
// import { redirect } from "next/navigation";

const onboardSchema = z.object({
  firstName: z.string().min(2).max(150),
  lastName: z.string().min(2).max(150),
  contact: phoneNumberSchema,
  school: z.string().min(3).max(150),
});

export const onboardUser = async ({
  firstName,
  lastName,
  contact,
  school,
}: {
  firstName: string;
  lastName: string;
  contact: string;
  school: string;
}) => {
  const onboardUserValidation = onboardSchema.safeParse({
    firstName,
    lastName,
    contact,
    school,
  });

  if (!onboardUserValidation.success) {
    return {
      error: true,
      message:
        onboardUserValidation.error.issues[0]?.message ?? "An error occured",
    };
  }

  // supabase authentication from here
  const supabase = await createClient();

  // Get the current user's ID
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData.user) {
    return {
      error: true,
      message: "User not authenticated",
    };
  }

  const userId = userData.user.id;

  // Update or insert the profile data into the `profiles` table
  const { data, error } = await supabase
    .from("profiles")
    .update({
      first_name: firstName,
      last_name: lastName,
      contact,
      school,
    })
    .eq("id", userId)
    .select();

  if (error) {
    return {
      error: true,
      message: error.message,
    };
  }

  // User successfully logged in
  return {
    success: true,
    message: "Login successful",
    data,
  };
};

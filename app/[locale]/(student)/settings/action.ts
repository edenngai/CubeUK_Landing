'use server';

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function updateProfile(formData: {
  userId: string;
  first_name?: string;
  last_name?: string;
  contact?: string;
  school?: string;
}) {
  try {
    const { userId, ...profileData } = formData;
    
    // Create server-side Supabase client
    const supabase = await createClient();
    
    // Update the profile
    const { error } = await supabase
      .from('profiles')
      .update(profileData)
      .eq('id', userId);
    
    if (error) {
      console.error("Profile update error:", error);
      return { success: false, error: error.message };
    }
    
    // Revalidate the profile page to show updated data
    revalidatePath('/[locale]/(student)/profile');
    
    return { success: true };
  } catch (error) {
    console.error("Server action error:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "An unknown error occurred" 
    };
  }
}

export async function logoutUser() {
  const supabase = await createClient();
  
  // Sign out the user
  await supabase.auth.signOut();
  
  // Clear cookies
  
  // Redirect to home page or login page
  redirect('/');
} 
import { createClient } from "@supabase/supabase-js";

// Ensure these environment variables are set in .env
// VITE_SUPABASE_URL="your-supabase-url"
// VITE_SUPABASE_ANON_KEY="your-supabase-anon-key"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://placeholder-url.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "placeholder-key";

// Initialize the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Utility functions for user data management
 */
export const saveUserResult = async (userId: string, resultData: any) => {
  if (supabaseUrl.includes("placeholder")) {
    console.warn("Supabase is not configured yet. Returning early.");
    return null;
  }

  const { data, error } = await supabase
    .from("user_results")
    .upsert({ user_id: userId, result_data: resultData, updated_at: new Date().toISOString() });

  if (error) {
    console.error("Error saving result to Supabase:", error);
    throw error;
  }

  return data;
};

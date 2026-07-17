import { createClient } from "@supabase/supabase-js";

// Ensure these environment variables are set in .env
// VITE_SUPABASE_URL="your-supabase-url"
// VITE_SUPABASE_ANON_KEY="your-supabase-anon-key"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://placeholder-url.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "placeholder-key";
const isPlaceholder = supabaseUrl.includes("placeholder");

// Initialize the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/* ==========================================
 * 1. AUTHENTICATION FUNCTIONS
 * ========================================== */

// Sign in with Google OAuth
export const signInWithGoogle = async () => {
  if (isPlaceholder) {
    console.warn("Supabase not configured. Simulating Google Login.");
    return { data: { url: "#" }, error: null };
  }
  return await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin
    }
  });
};

// Sign up with Email and Password
export const signUpWithEmail = async (email: string, password: string, fullName: string) => {
  if (isPlaceholder) {
    console.warn("Supabase not configured. Simulating Email Sign Up.");
    return { data: { user: { id: "dummy-user-id", email } }, error: null };
  }
  return await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      }
    }
  });
};

// Sign in with Email and Password
export const signInWithEmail = async (email: string, password: string) => {
  if (isPlaceholder) {
    console.warn("Supabase not configured. Simulating Email Sign In.");
    return { data: { user: { id: "dummy-user-id", email } }, error: null };
  }
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
};

// Sign out
export const signOut = async () => {
  if (isPlaceholder) {
    console.warn("Supabase not configured. Simulating Sign Out.");
    return { error: null };
  }
  return await supabase.auth.signOut();
};

// Get current session
export const getCurrentSession = async () => {
  if (isPlaceholder) return { data: { session: null }, error: null };
  return await supabase.auth.getSession();
};


/* ==========================================
 * 2. CRUD FUNCTIONS FOR TEST RESULTS
 * ========================================== */

// CREATE / UPDATE: Save a test result
export const saveUserResult = async (userId: string, categoryId: string, resultData: any) => {
  if (isPlaceholder) {
    console.warn("Supabase not configured. Simulating saving result for category:", categoryId);
    return { data: null, error: null };
  }

  const { data, error } = await supabase
    .from("user_results")
    .upsert({ 
      user_id: userId, 
      category_id: categoryId,
      result_data: resultData, 
      updated_at: new Date().toISOString() 
    }, {
      onConflict: 'user_id, category_id' // Ensures one result per category per user (if you want history, change this design)
    });

  if (error) {
    console.error("Error saving result to Supabase:", error);
    throw error;
  }

  return data;
};

// CREATE: Save a new test result (keeps history)
export const insertUserResult = async (userId: string, categoryId: string, resultData: any) => {
  if (isPlaceholder) {
    console.warn("Supabase not configured. Simulating inserting result for category:", categoryId);
    return { data: null, error: null };
  }

  const { data, error } = await supabase
    .from("user_results")
    .insert({ 
      user_id: userId, 
      category_id: categoryId,
      result_data: resultData, 
    });

  if (error) {
    console.error("Error inserting result to Supabase:", error);
    throw error;
  }

  return data;
};


// READ: Get user's test history
export const getUserHistory = async (userId: string) => {
  if (isPlaceholder) {
    console.warn("Supabase not configured. Simulating getting history.");
    return { data: [], error: null };
  }

  const { data, error } = await supabase
    .from("user_results")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching history from Supabase:", error);
    throw error;
  }

  return { data, error };
};

// DELETE: Delete a specific test result
export const deleteUserResult = async (resultId: string) => {
  if (isPlaceholder) {
    console.warn("Supabase not configured. Simulating delete result.");
    return { data: null, error: null };
  }

  const { data, error } = await supabase
    .from("user_results")
    .delete()
    .eq("id", resultId);

  if (error) {
    console.error("Error deleting result from Supabase:", error);
    throw error;
  }

  return { data, error };
};

/* ==========================================
 * 3. SUPABASE SQL SETUP SCRIPT
 * ==========================================
 * 
 * Run this SQL query in your Supabase SQL Editor to create the necessary tables and RLS policies:
 * 
 * CREATE TABLE public.user_results (
 *     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
 *     user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
 *     category_id TEXT NOT NULL,
 *     result_data JSONB NOT NULL,
 *     created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
 *     updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
 * );
 * 
 * -- Optional: if you want to ensure a user only has ONE result per category, add a unique constraint:
 * -- ALTER TABLE public.user_results ADD CONSTRAINT unique_user_category UNIQUE (user_id, category_id);
 * 
 * -- Enable Row Level Security (RLS)
 * ALTER TABLE public.user_results ENABLE ROW LEVEL SECURITY;
 * 
 * -- Policy: Users can only select/read their own results
 * CREATE POLICY "Users can view their own results" 
 * ON public.user_results FOR SELECT 
 * USING (auth.uid() = user_id);
 * 
 * -- Policy: Users can only insert their own results
 * CREATE POLICY "Users can insert their own results" 
 * ON public.user_results FOR INSERT 
 * WITH CHECK (auth.uid() = user_id);
 * 
 * -- Policy: Users can only update their own results
 * CREATE POLICY "Users can update their own results" 
 * ON public.user_results FOR UPDATE 
 * USING (auth.uid() = user_id);
 * 
 * -- Policy: Users can only delete their own results
 * CREATE POLICY "Users can delete their own results" 
 * ON public.user_results FOR DELETE 
 * USING (auth.uid() = user_id);
 */

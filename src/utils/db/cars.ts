import { createClient } from "@supabase/supabase-js";

import { projectId, publicAnonKey } from "../supabase/info";

// Ініціалізація Supabase client (singleton)
let supabaseClient: ReturnType<typeof createClient> | null =
  null;

export function getSupabaseClient() {
  if (!supabaseClient) {
    const supabaseUrl = `https://${projectId}.supabase.co`;
    supabaseClient = createClient(supabaseUrl, publicAnonKey);
  }
  return supabaseClient;
}

export async function fetchCars() {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("data")
    .select("*")
    .order("id", { ascending: false });
  if (error) {
    console.error(
      "Error fetching cars from data table:",
      error,
    );
    throw error;
  }
  return data && data?.length ? [...data] : [];
}
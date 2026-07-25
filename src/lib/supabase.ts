import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

function createSupabaseClient() {
  if (!isSupabaseConfigured) return null as unknown as ReturnType<typeof createClient>;

  const isServer = typeof window === "undefined";

  if (isServer && typeof globalThis !== "undefined" && !globalThis.WebSocket) {
    class DummyWebSocket {}
    (globalThis as unknown as Record<string, unknown>).WebSocket = DummyWebSocket;
  }

  return createClient(supabaseUrl!, supabaseAnonKey!, {
    auth: {
      persistSession: !isServer,
      autoRefreshToken: !isServer,
      detectSessionInUrl: !isServer,
    },
    global: {
      fetch: fetch.bind(globalThis),
    },
  });
}

export const supabase = createSupabaseClient();

export async function uploadFile(file: File, folder: string = "assets"): Promise<string> {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error("Supabase is not configured. Please check your environment variables.");
  }

  const fileExt = file.name.split(".").pop();
  const randomId = Math.random().toString(36).substring(2, 8);
  const fileName = `${Date.now()}_${randomId}.${fileExt}`;
  const filePath = `${folder}/${fileName}`;

  const { error } = await supabase.storage
    .from("portfolio")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) {
    throw new Error(
      `${error.message}. (Ensure a bucket named "portfolio" exists and is public in Supabase Storage dashboard)`
    );
  }

  const { data: urlData } = supabase.storage.from("portfolio").getPublicUrl(filePath);
  return urlData.publicUrl;
}

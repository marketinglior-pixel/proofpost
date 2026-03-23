// Placeholder — will be replaced by `npx supabase gen types typescript`
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string | null;
          display_name: string | null;
          plan: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email?: string | null;
          display_name?: string | null;
          plan?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string | null;
          display_name?: string | null;
          plan?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      brand_kits: {
        Row: {
          id: string;
          user_id: string;
          company_name: string;
          logo_url: string | null;
          primary_color: string;
          secondary_color: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          company_name: string;
          logo_url?: string | null;
          primary_color?: string;
          secondary_color?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          company_name?: string;
          logo_url?: string | null;
          primary_color?: string;
          secondary_color?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      generated_content: {
        Row: {
          id: string;
          user_id: string;
          raw_input: string;
          llm_output: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          raw_input: string;
          llm_output?: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          raw_input?: string;
          llm_output?: Json;
          created_at?: string;
        };
        Relationships: [];
      };
      widgets: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          content_ids: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name?: string;
          content_ids?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          content_ids?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

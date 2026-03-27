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
          style: Json | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name?: string;
          content_ids?: string[];
          style?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          content_ids?: string[];
          style?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      impressions: {
        Row: {
          id: string;
          user_id: string;
          content_id: string | null;
          widget_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          content_id?: string | null;
          widget_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          content_id?: string | null;
          widget_id?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      collection_forms: {
        Row: {
          id: string;
          user_id: string;
          brand_kit_id: string | null;
          title: string;
          description: string | null;
          questions: Json;
          slug: string;
          active: boolean;
          auto_approve: boolean;
          linked_widget_id: string | null;
          thank_you_message: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          brand_kit_id?: string | null;
          title?: string;
          description?: string | null;
          questions?: Json;
          slug: string;
          active?: boolean;
          auto_approve?: boolean;
          linked_widget_id?: string | null;
          thank_you_message?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          brand_kit_id?: string | null;
          title?: string;
          description?: string | null;
          questions?: Json;
          slug?: string;
          active?: boolean;
          auto_approve?: boolean;
          linked_widget_id?: string | null;
          thank_you_message?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      submissions: {
        Row: {
          id: string;
          form_id: string;
          user_id: string;
          reviewer_name: string;
          reviewer_title: string | null;
          reviewer_company: string | null;
          reviewer_photo_url: string | null;
          review_text: string;
          rating: number;
          status: string;
          generated_content_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          form_id: string;
          user_id: string;
          reviewer_name: string;
          reviewer_title?: string | null;
          reviewer_company?: string | null;
          reviewer_photo_url?: string | null;
          review_text: string;
          rating?: number;
          status?: string;
          generated_content_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          form_id?: string;
          user_id?: string;
          reviewer_name?: string;
          reviewer_title?: string | null;
          reviewer_company?: string | null;
          reviewer_photo_url?: string | null;
          review_text?: string;
          rating?: number;
          status?: string;
          generated_content_id?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      case_studies: {
        Row: {
          id: string;
          user_id: string;
          content_id: string;
          title: string;
          body: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          content_id: string;
          title: string;
          body: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          content_id?: string;
          title?: string;
          body?: Json;
          created_at?: string;
        };
        Relationships: [];
      };
      hook_events: {
        Row: {
          id: string;
          content_id: string;
          widget_id: string | null;
          hook_variant_id: string;
          event_type: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          content_id: string;
          widget_id?: string | null;
          hook_variant_id: string;
          event_type: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          content_id?: string;
          widget_id?: string | null;
          hook_variant_id?: string;
          event_type?: string;
          created_at?: string;
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

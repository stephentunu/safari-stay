export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      bookings: {
        Row: {
          adults: number | null
          bed_type: string | null
          board_type: string | null
          check_in_date: string
          check_out_date: string
          children_details: Json | null
          created_at: string
          guests: number
          host_id: string
          id: string
          loyalty_discount_percent: number | null
          original_price: number | null
          property_id: string
          room_category: string | null
          special_requests: string | null
          status: Database["public"]["Enums"]["booking_status"]
          total_price: number
          traveler_id: string
          updated_at: string
        }
        Insert: {
          adults?: number | null
          bed_type?: string | null
          board_type?: string | null
          check_in_date: string
          check_out_date: string
          children_details?: Json | null
          created_at?: string
          guests: number
          host_id: string
          id?: string
          loyalty_discount_percent?: number | null
          original_price?: number | null
          property_id: string
          room_category?: string | null
          special_requests?: string | null
          status?: Database["public"]["Enums"]["booking_status"]
          total_price: number
          traveler_id: string
          updated_at?: string
        }
        Update: {
          adults?: number | null
          bed_type?: string | null
          board_type?: string | null
          check_in_date?: string
          check_out_date?: string
          children_details?: Json | null
          created_at?: string
          guests?: number
          host_id?: string
          id?: string
          loyalty_discount_percent?: number | null
          original_price?: number | null
          property_id?: string
          room_category?: string | null
          special_requests?: string | null
          status?: Database["public"]["Enums"]["booking_status"]
          total_price?: number
          traveler_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_host_id_fkey"
            columns: ["host_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_traveler_id_fkey"
            columns: ["traveler_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      experiences: {
        Row: {
          category: string
          created_at: string
          created_by: string | null
          description: string
          duration: string
          id: string
          image_url: string | null
          is_active: boolean | null
          location: string
          price: string
          rating: number | null
          reviews: number | null
          title: string
          updated_at: string
        }
        Insert: {
          category?: string
          created_at?: string
          created_by?: string | null
          description: string
          duration: string
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          location: string
          price: string
          rating?: number | null
          reviews?: number | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          created_by?: string | null
          description?: string
          duration?: string
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          location?: string
          price?: string
          rating?: number | null
          reviews?: number | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      fraud_flags: {
        Row: {
          created_at: string
          flag_type: string
          id: string
          reason: string
          reference_id: string
          review_notes: string | null
          reviewed_by: string | null
          severity: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          flag_type: string
          id?: string
          reason: string
          reference_id: string
          review_notes?: string | null
          reviewed_by?: string | null
          severity?: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          flag_type?: string
          id?: string
          reason?: string
          reference_id?: string
          review_notes?: string | null
          reviewed_by?: string | null
          severity?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fraud_flags_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      newsletter_subscribers: {
        Row: {
          email: string
          id: string
          is_active: boolean
          subscribed_at: string
        }
        Insert: {
          email: string
          id?: string
          is_active?: boolean
          subscribed_at?: string
        }
        Update: {
          email?: string
          id?: string
          is_active?: boolean
          subscribed_at?: string
        }
        Relationships: []
      }
      online_users: {
        Row: {
          created_at: string
          id: string
          is_online: boolean | null
          last_seen: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_online?: boolean | null
          last_seen?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_online?: boolean | null
          last_seen?: string
          user_id?: string
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          booking_id: string
          created_at: string
          id: string
          mpesa_receipt_number: string | null
          payment_method: Database["public"]["Enums"]["payment_method"]
          payment_status: Database["public"]["Enums"]["payment_status"]
          transaction_id: string | null
          updated_at: string
        }
        Insert: {
          amount: number
          booking_id: string
          created_at?: string
          id?: string
          mpesa_receipt_number?: string | null
          payment_method: Database["public"]["Enums"]["payment_method"]
          payment_status?: Database["public"]["Enums"]["payment_status"]
          transaction_id?: string | null
          updated_at?: string
        }
        Update: {
          amount?: number
          booking_id?: string
          created_at?: string
          id?: string
          mpesa_receipt_number?: string | null
          payment_method?: Database["public"]["Enums"]["payment_method"]
          payment_status?: Database["public"]["Enums"]["payment_status"]
          transaction_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          email: string
          full_name: string | null
          host_since: string | null
          id: string
          is_verified_host: boolean | null
          languages: string[] | null
          phone: string | null
          response_rate: number | null
          response_time: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          host_since?: string | null
          id: string
          is_verified_host?: boolean | null
          languages?: string[] | null
          phone?: string | null
          response_rate?: number | null
          response_time?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          host_since?: string | null
          id?: string
          is_verified_host?: boolean | null
          languages?: string[] | null
          phone?: string | null
          response_rate?: number | null
          response_time?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      properties: {
        Row: {
          address: string
          amenities: string[] | null
          attraction_details: Json | null
          bathrooms: number
          bed_types: string[] | null
          bedrooms: number
          board_type: string | null
          cancellation_policy: string | null
          child_free_age: number | null
          created_at: string
          custom_board_types: Json | null
          description: string
          food_types: string[] | null
          host_id: string
          id: string
          image_labels: string[] | null
          images: string[] | null
          is_active: boolean | null
          is_approved: boolean | null
          latitude: number | null
          location: string
          longitude: number | null
          max_guests: number
          nearby_attractions: string[] | null
          price_per_night: number
          property_rules: string[] | null
          property_type: Database["public"]["Enums"]["property_type"]
          room_categories: Json | null
          services: string[] | null
          title: string
          transport_modes: string[] | null
          updated_at: string
        }
        Insert: {
          address: string
          amenities?: string[] | null
          attraction_details?: Json | null
          bathrooms: number
          bed_types?: string[] | null
          bedrooms: number
          board_type?: string | null
          cancellation_policy?: string | null
          child_free_age?: number | null
          created_at?: string
          custom_board_types?: Json | null
          description: string
          food_types?: string[] | null
          host_id: string
          id?: string
          image_labels?: string[] | null
          images?: string[] | null
          is_active?: boolean | null
          is_approved?: boolean | null
          latitude?: number | null
          location: string
          longitude?: number | null
          max_guests: number
          nearby_attractions?: string[] | null
          price_per_night: number
          property_rules?: string[] | null
          property_type: Database["public"]["Enums"]["property_type"]
          room_categories?: Json | null
          services?: string[] | null
          title: string
          transport_modes?: string[] | null
          updated_at?: string
        }
        Update: {
          address?: string
          amenities?: string[] | null
          attraction_details?: Json | null
          bathrooms?: number
          bed_types?: string[] | null
          bedrooms?: number
          board_type?: string | null
          cancellation_policy?: string | null
          child_free_age?: number | null
          created_at?: string
          custom_board_types?: Json | null
          description?: string
          food_types?: string[] | null
          host_id?: string
          id?: string
          image_labels?: string[] | null
          images?: string[] | null
          is_active?: boolean | null
          is_approved?: boolean | null
          latitude?: number | null
          location?: string
          longitude?: number | null
          max_guests?: number
          nearby_attractions?: string[] | null
          price_per_night?: number
          property_rules?: string[] | null
          property_type?: Database["public"]["Enums"]["property_type"]
          room_categories?: Json | null
          services?: string[] | null
          title?: string
          transport_modes?: string[] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "properties_host_id_fkey"
            columns: ["host_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      property_requests: {
        Row: {
          bedrooms: number | null
          budget_max: number | null
          budget_min: number | null
          created_at: string
          description: string | null
          email: string
          id: string
          location: string
          name: string
          phone: string | null
          property_type: string
          status: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          bedrooms?: number | null
          budget_max?: number | null
          budget_min?: number | null
          created_at?: string
          description?: string | null
          email: string
          id?: string
          location: string
          name: string
          phone?: string | null
          property_type: string
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          bedrooms?: number | null
          budget_max?: number | null
          budget_min?: number | null
          created_at?: string
          description?: string | null
          email?: string
          id?: string
          location?: string
          name?: string
          phone?: string | null
          property_type?: string
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "property_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      property_views: {
        Row: {
          id: string
          property_id: string
          session_id: string | null
          viewed_at: string
          viewer_id: string | null
        }
        Insert: {
          id?: string
          property_id: string
          session_id?: string | null
          viewed_at?: string
          viewer_id?: string | null
        }
        Update: {
          id?: string
          property_id?: string
          session_id?: string | null
          viewed_at?: string
          viewer_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "property_views_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "property_views_viewer_id_fkey"
            columns: ["viewer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      referral_codes: {
        Row: {
          code: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          code: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          code?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "referral_codes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      referrals: {
        Row: {
          created_at: string
          id: string
          referral_code_id: string
          referred_user_id: string
          referrer_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          referral_code_id: string
          referred_user_id: string
          referrer_id: string
        }
        Update: {
          created_at?: string
          id?: string
          referral_code_id?: string
          referred_user_id?: string
          referrer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "referrals_referral_code_id_fkey"
            columns: ["referral_code_id"]
            isOneToOne: false
            referencedRelation: "referral_codes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referrals_referred_user_id_fkey"
            columns: ["referred_user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "referrals_referrer_id_fkey"
            columns: ["referrer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          booking_id: string
          cleanliness_score: number | null
          comment: string | null
          created_at: string
          facilities_score: number | null
          id: string
          location_score: number | null
          property_id: string
          rating: number
          reviewer_id: string
          service_score: number | null
          value_score: number | null
        }
        Insert: {
          booking_id: string
          cleanliness_score?: number | null
          comment?: string | null
          created_at?: string
          facilities_score?: number | null
          id?: string
          location_score?: number | null
          property_id: string
          rating: number
          reviewer_id: string
          service_score?: number | null
          value_score?: number | null
        }
        Update: {
          booking_id?: string
          cleanliness_score?: number | null
          comment?: string | null
          created_at?: string
          facilities_score?: number | null
          id?: string
          location_score?: number | null
          property_id?: string
          rating?: number
          reviewer_id?: string
          service_score?: number | null
          value_score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      user_credits: {
        Row: {
          amount: number
          created_at: string
          id: string
          reason: string
          user_id: string
        }
        Insert: {
          amount?: number
          created_at?: string
          id?: string
          reason: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          reason?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_credits_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_loyalty_discount: { Args: { _user_id: string }; Returns: number }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "traveler" | "host" | "admin"
      booking_status: "pending" | "confirmed" | "cancelled" | "completed"
      payment_method: "mpesa" | "card"
      payment_status: "pending" | "completed" | "failed" | "refunded"
      property_type:
        | "hotel"
        | "apartment"
        | "house"
        | "villa"
        | "guesthouse"
        | "hostel"
        | "airbnb"
        | "rental"
        | "resort"
        | "motel"
        | "restaurant"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["traveler", "host", "admin"],
      booking_status: ["pending", "confirmed", "cancelled", "completed"],
      payment_method: ["mpesa", "card"],
      payment_status: ["pending", "completed", "failed", "refunded"],
      property_type: [
        "hotel",
        "apartment",
        "house",
        "villa",
        "guesthouse",
        "hostel",
        "airbnb",
        "rental",
        "resort",
        "motel",
        "restaurant",
      ],
    },
  },
} as const

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
          id: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          phone?: string | null
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
      reviews: {
        Row: {
          booking_id: string
          comment: string | null
          created_at: string
          id: string
          property_id: string
          rating: number
          reviewer_id: string
        }
        Insert: {
          booking_id: string
          comment?: string | null
          created_at?: string
          id?: string
          property_id: string
          rating: number
          reviewer_id: string
        }
        Update: {
          booking_id?: string
          comment?: string | null
          created_at?: string
          id?: string
          property_id?: string
          rating?: number
          reviewer_id?: string
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

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin_sessions: {
        Row: {
          admin_id: string
          id: string
          ip_address: string | null
          login_time: string
          logout_time: string | null
          user_agent: string | null
        }
        Insert: {
          admin_id: string
          id?: string
          ip_address?: string | null
          login_time?: string
          logout_time?: string | null
          user_agent?: string | null
        }
        Update: {
          admin_id?: string
          id?: string
          ip_address?: string | null
          login_time?: string
          logout_time?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      donations: {
        Row: {
          amount: number
          created_at: string
          currency: string
          donor_country: string
          donor_email: string
          donor_name: string
          id: string
          notes: string | null
          payment_method: string
          receipt_url: string | null
          status: string
          user_id: string | null
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string
          donor_country: string
          donor_email: string
          donor_name: string
          id?: string
          notes?: string | null
          payment_method: string
          receipt_url?: string | null
          status?: string
          user_id?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          donor_country?: string
          donor_email?: string
          donor_name?: string
          id?: string
          notes?: string | null
          payment_method?: string
          receipt_url?: string | null
          status?: string
          user_id?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: []
      }
      help_requests: {
        Row: {
          category: string
          created_at: string
          description: string
          id: string
          location: string
          requester_email: string
          requester_name: string
          requester_phone: string
          status: string
          updated_at: string
          urgency_level: string
        }
        Insert: {
          category: string
          created_at?: string
          description: string
          id?: string
          location: string
          requester_email: string
          requester_name: string
          requester_phone: string
          status?: string
          updated_at?: string
          urgency_level?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          id?: string
          location?: string
          requester_email?: string
          requester_name?: string
          requester_phone?: string
          status?: string
          updated_at?: string
          urgency_level?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          is_read: boolean
          message: string
          title: string
          type: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          is_read?: boolean
          message: string
          title: string
          type?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean
          message?: string
          title?: string
          type?: string
          user_id?: string | null
        }
        Relationships: []
      }
      our_work: {
        Row: {
          amount_spent: number | null
          beneficiaries_count: number | null
          category: string
          created_at: string
          date_completed: string | null
          description: string
          id: string
          image_url: string | null
          location: string
          title: string
          video_url: string | null
        }
        Insert: {
          amount_spent?: number | null
          beneficiaries_count?: number | null
          category: string
          created_at?: string
          date_completed?: string | null
          description: string
          id?: string
          image_url?: string | null
          location: string
          title: string
          video_url?: string | null
        }
        Update: {
          amount_spent?: number | null
          beneficiaries_count?: number | null
          category?: string
          created_at?: string
          date_completed?: string | null
          description?: string
          id?: string
          image_url?: string | null
          location?: string
          title?: string
          video_url?: string | null
        }
        Relationships: []
      }
      payment_methods: {
        Row: {
          account_details: Json
          created_at: string
          display_order: number
          id: string
          is_active: boolean
          method_name: string
          method_type: string
          qr_code_url: string | null
          updated_at: string
        }
        Insert: {
          account_details: Json
          created_at?: string
          display_order?: number
          id?: string
          is_active?: boolean
          method_name: string
          method_type: string
          qr_code_url?: string | null
          updated_at?: string
        }
        Update: {
          account_details?: Json
          created_at?: string
          display_order?: number
          id?: string
          is_active?: boolean
          method_name?: string
          method_type?: string
          qr_code_url?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          country: string | null
          created_at: string
          full_name: string | null
          id: string
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
        }
        Insert: {
          country?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Update: {
          country?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number
          category: string
          created_at: string
          created_by: string | null
          description: string
          id: string
          reference_id: string | null
          type: string
        }
        Insert: {
          amount: number
          category: string
          created_at?: string
          created_by?: string | null
          description: string
          id?: string
          reference_id?: string | null
          type: string
        }
        Update: {
          amount?: number
          category?: string
          created_at?: string
          created_by?: string | null
          description?: string
          id?: string
          reference_id?: string | null
          type?: string
        }
        Relationships: []
      }
      user_donation_stats: {
        Row: {
          created_at: string
          donation_count: number
          id: string
          last_donation_date: string | null
          rank_position: number | null
          total_donated: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          donation_count?: number
          id?: string
          last_donation_date?: string | null
          rank_position?: number | null
          total_donated?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          donation_count?: number
          id?: string
          last_donation_date?: string | null
          rank_position?: number | null
          total_donated?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      user_role: ["admin", "moderator", "user"],
    },
  },
} as const

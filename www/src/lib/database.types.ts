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
      computer: {
        Row: {
          created_at: string
          is_added: boolean
          is_allowed: boolean
          one_time_key: string | null
          org_unit_id: number | null
          uuid: string
        }
        Insert: {
          created_at?: string
          is_added?: boolean
          is_allowed?: boolean
          one_time_key?: string | null
          org_unit_id?: number | null
          uuid?: string
        }
        Update: {
          created_at?: string
          is_added?: boolean
          is_allowed?: boolean
          one_time_key?: string | null
          org_unit_id?: number | null
          uuid?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_computer_org_unit_id_fkey"
            columns: ["org_unit_id"]
            isOneToOne: false
            referencedRelation: "org_unit"
            referencedColumns: ["id"]
          },
        ]
      }
      org_unit: {
        Row: {
          created_at: string
          id: number
          org_unit_name: string
        }
        Insert: {
          created_at?: string
          id?: number
          org_unit_name?: string
        }
        Update: {
          created_at?: string
          id?: number
          org_unit_name?: string
        }
        Relationships: []
      }
      system_info: {
        Row: {
          computer_name: string | null
          computer_uuid: string
          created_at: string
          kernel_version: string | null
          last_bootup_time: string | null
          machine_type: Database["public"]["Enums"]["machine_type"]
          os_name: string | null
          os_version: string | null
          pending_reboot: boolean | null
        }
        Insert: {
          computer_name?: string | null
          computer_uuid?: string
          created_at?: string
          kernel_version?: string | null
          last_bootup_time?: string | null
          machine_type?: Database["public"]["Enums"]["machine_type"]
          os_name?: string | null
          os_version?: string | null
          pending_reboot?: boolean | null
        }
        Update: {
          computer_name?: string | null
          computer_uuid?: string
          created_at?: string
          kernel_version?: string | null
          last_bootup_time?: string | null
          machine_type?: Database["public"]["Enums"]["machine_type"]
          os_name?: string | null
          os_version?: string | null
          pending_reboot?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "public_system_info_computer_uuid_fkey"
            columns: ["computer_uuid"]
            isOneToOne: true
            referencedRelation: "computer"
            referencedColumns: ["uuid"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      machine_type: "LXC" | "VM" | "Physical" | "Unknown"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never


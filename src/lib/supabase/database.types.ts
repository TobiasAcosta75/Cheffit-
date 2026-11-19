
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  
  "public": {
          Tables: {
            "foods": {
                  Row: {
                    "carbs_100": number,"category": string,"created_at": string,"fat_100": number,"fiber_100": number,"id": string,"kcal_100": number,"name": string,"overrides_food_id": string | null,"owner_id": string | null,"protein_100": number,"search_name": string,"source": string,"source_ref": string | null
                  }
                  ComputedFields: never
                  Insert: {
                    "carbs_100": number,"category"?: string,"created_at"?: string,"fat_100": number,"fiber_100"?: number,"id"?: string,"kcal_100": number,"name": string,"overrides_food_id"?: string | null,"owner_id"?: string | null,"protein_100": number,"search_name": string,"source": string,"source_ref"?: string | null
                  }
                  Update: {
                    "carbs_100"?: number,"category"?: string,"created_at"?: string,"fat_100"?: number,"fiber_100"?: number,"id"?: string,"kcal_100"?: number,"name"?: string,"overrides_food_id"?: string | null,"owner_id"?: string | null,"protein_100"?: number,"search_name"?: string,"source"?: string,"source_ref"?: string | null
                  }
                  Relationships: [
                    {
      foreignKeyName: "foods_overrides_food_id_fkey"
      columns: ["overrides_food_id"]
isOneToOne: false
      referencedRelation: "foods"
      referencedColumns: ["id"]
    }
                  ]
                },"household_measures": {
                  Row: {
                    "created_at": string,"food_id": string,"grams": number,"id": string,"label": string
                  }
                  ComputedFields: never
                  Insert: {
                    "created_at"?: string,"food_id": string,"grams": number,"id"?: string,"label": string
                  }
                  Update: {
                    "created_at"?: string,"food_id"?: string,"grams"?: number,"id"?: string,"label"?: string
                  }
                  Relationships: [
                    {
      foreignKeyName: "household_measures_food_id_fkey"
      columns: ["food_id"]
isOneToOne: false
      referencedRelation: "foods"
      referencedColumns: ["id"]
    }
                  ]
                },"meal_logs": {
                  Row: {
                    "carbs_g": number,"created_at": string,"date": string,"fat_g": number,"food_id": string | null,"food_name": string,"grams": number,"id": string,"kcal": number,"protein_g": number,"slot": string,"user_id": string
                  }
                  ComputedFields: never
                  Insert: {
                    "carbs_g": number,"created_at"?: string,"date": string,"fat_g": number,"food_id"?: string | null,"food_name": string,"grams": number,"id"?: string,"kcal": number,"protein_g": number,"slot": string,"user_id": string
                  }
                  Update: {
                    "carbs_g"?: number,"created_at"?: string,"date"?: string,"fat_g"?: number,"food_id"?: string | null,"food_name"?: string,"grams"?: number,"id"?: string,"kcal"?: number,"protein_g"?: number,"slot"?: string,"user_id"?: string
                  }
                  Relationships: [
                    {
      foreignKeyName: "meal_logs_food_id_fkey"
      columns: ["food_id"]
isOneToOne: false
      referencedRelation: "foods"
      referencedColumns: ["id"]
    }
                  ]
                },"profiles": {
                  Row: {
                    "activity_level": string | null,"avoided_foods": (string)[],"birth_date": string | null,"created_at": string,"display_name": string | null,"goal": string | null,"height_cm": number | null,"id": string,"is_admin": boolean,"max_cook_minutes": number | null,"meal_slots": (string)[],"onboarded": boolean,"reference_weight_kg": number | null,"restrictions": (string)[],"sex": string | null,"timezone": string
                  }
                  ComputedFields: never
                  Insert: {
                    "activity_level"?: string | null,"avoided_foods"?: (string)[],"birth_date"?: string | null,"created_at"?: string,"display_name"?: string | null,"goal"?: string | null,"height_cm"?: number | null,"id": string,"is_admin"?: boolean,"max_cook_minutes"?: number | null,"meal_slots"?: (string)[],"onboarded"?: boolean,"reference_weight_kg"?: number | null,"restrictions"?: (string)[],"sex"?: string | null,"timezone"?: string
                  }
                  Update: {
                    "activity_level"?: string | null,"avoided_foods"?: (string)[],"birth_date"?: string | null,"created_at"?: string,"display_name"?: string | null,"goal"?: string | null,"height_cm"?: number | null,"id"?: string,"is_admin"?: boolean,"max_cook_minutes"?: number | null,"meal_slots"?: (string)[],"onboarded"?: boolean,"reference_weight_kg"?: number | null,"restrictions"?: (string)[],"sex"?: string | null,"timezone"?: string
                  }
                  Relationships: [
                    
                  ]
                },"stages": {
                  Row: {
                    "carbs_rest_g_per_kg": number,"carbs_training_g_per_kg": number,"created_at": string,"end_date": string | null,"fat_g_per_kg": number,"goal": string,"id": string,"mode": string,"name": string,"notes": string | null,"protein_g_per_kg": number,"start_date": string,"user_id": string
                  }
                  ComputedFields: never
                  Insert: {
                    "carbs_rest_g_per_kg": number,"carbs_training_g_per_kg": number,"created_at"?: string,"end_date"?: string | null,"fat_g_per_kg": number,"goal": string,"id"?: string,"mode": string,"name": string,"notes"?: string | null,"protein_g_per_kg": number,"start_date": string,"user_id": string
                  }
                  Update: {
                    "carbs_rest_g_per_kg"?: number,"carbs_training_g_per_kg"?: number,"created_at"?: string,"end_date"?: string | null,"fat_g_per_kg"?: number,"goal"?: string,"id"?: string,"mode"?: string,"name"?: string,"notes"?: string | null,"protein_g_per_kg"?: number,"start_date"?: string,"user_id"?: string
                  }
                  Relationships: [
                    
                  ]
                },"training_overrides": {
                  Row: {
                    "created_at": string,"date": string,"intensity": string | null,"time": string | null,"trains": boolean,"user_id": string
                  }
                  ComputedFields: never
                  Insert: {
                    "created_at"?: string,"date": string,"intensity"?: string | null,"time"?: string | null,"trains": boolean,"user_id": string
                  }
                  Update: {
                    "created_at"?: string,"date"?: string,"intensity"?: string | null,"time"?: string | null,"trains"?: boolean,"user_id"?: string
                  }
                  Relationships: [
                    
                  ]
                },"training_week": {
                  Row: {
                    "created_at": string,"intensity": string | null,"time": string | null,"trains": boolean,"user_id": string,"weekday": number
                  }
                  ComputedFields: never
                  Insert: {
                    "created_at"?: string,"intensity"?: string | null,"time"?: string | null,"trains"?: boolean,"user_id": string,"weekday": number
                  }
                  Update: {
                    "created_at"?: string,"intensity"?: string | null,"time"?: string | null,"trains"?: boolean,"user_id"?: string,"weekday"?: number
                  }
                  Relationships: [
                    
                  ]
                },"weight_entries": {
                  Row: {
                    "created_at": string,"date": string,"id": string,"user_id": string,"weight_kg": number
                  }
                  ComputedFields: never
                  Insert: {
                    "created_at"?: string,"date": string,"id"?: string,"user_id": string,"weight_kg": number
                  }
                  Update: {
                    "created_at"?: string,"date"?: string,"id"?: string,"user_id"?: string,"weight_kg"?: number
                  }
                  Relationships: [
                    
                  ]
                }
          }
          Views: {
            [_ in never]: never
          }
          Functions: {
            "is_admin":
{ Args: Record<PropertyKey, never>; Returns: boolean
                           }
          }
          Enums: {
            [_ in never]: never
          }
          CompositeTypes: {
            [_ in never]: never
          }
        }
}

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>

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
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
  ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
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
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
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
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
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
    : never = never
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
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
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
  ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never

export const Constants = {
  "public": {
          Enums: {
            
          }
        }
} as const

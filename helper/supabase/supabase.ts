export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      block: {
        Row: {
          created_at: string
          from_user_id: string
          id: string
          to_user_id: string
        }
        Insert: {
          created_at?: string
          from_user_id: string
          id?: string
          to_user_id: string
        }
        Update: {
          created_at?: string
          from_user_id?: string
          id?: string
          to_user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "block_from_user_id_fkey"
            columns: ["from_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "block_to_user_id_fkey"
            columns: ["to_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      follow: {
        Row: {
          created_at: string
          from_user_id: string
          id: string
          to_user_id: string
        }
        Insert: {
          created_at?: string
          from_user_id: string
          id?: string
          to_user_id: string
        }
        Update: {
          created_at?: string
          from_user_id?: string
          id?: string
          to_user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "follow_from_user_id_fkey"
            columns: ["from_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "follow_to_user_id_fkey"
            columns: ["to_user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      notifications: {
        Row: {
          content: Json
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          content: Json
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          content?: Json
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      tokens: {
        Row: {
          created_at: string
          id: string
          token: string
          user_agent: string | null
          user_id: string | null
          valid_until: string
        }
        Insert: {
          created_at?: string
          id?: string
          token: string
          user_agent?: string | null
          user_id?: string | null
          valid_until: string
        }
        Update: {
          created_at?: string
          id?: string
          token?: string
          user_agent?: string | null
          user_id?: string | null
          valid_until?: string
        }
        Relationships: [
          {
            foreignKeyName: "tokens_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          allow_followers: boolean
          allow_text: boolean
          bio: string | null
          created_at: string
          disabled_till: string | null
          email: string
          id: string
          image_url: string | null
          is_admin: boolean
          name: string
          password_hash: string
          premium_till: string | null
          username: string
          verified_at: string | null
        }
        Insert: {
          allow_followers?: boolean
          allow_text?: boolean
          bio?: string | null
          created_at?: string
          disabled_till?: string | null
          email: string
          id?: string
          image_url?: string | null
          is_admin: boolean
          name: string
          password_hash: string
          premium_till?: string | null
          username: string
          verified_at?: string | null
        }
        Update: {
          allow_followers?: boolean
          allow_text?: boolean
          bio?: string | null
          created_at?: string
          disabled_till?: string | null
          email?: string
          id?: string
          image_url?: string | null
          is_admin?: boolean
          name?: string
          password_hash?: string
          premium_till?: string | null
          username?: string
          verified_at?: string | null
        }
        Relationships: []
      }
      verification: {
        Row: {
          attempt: number | null
          block_till: string | null
          code: number
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          attempt?: number | null
          block_till?: string | null
          code: number
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          attempt?: number | null
          block_till?: string | null
          code?: number
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "verification_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

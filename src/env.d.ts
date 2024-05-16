/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
import type { SuperMemoItem } from "supermemo";


// declare module '@/*'
// declare module '@env'
// declare module '@layouts/*'
// declare module '@components/*'
// declare module '@sections/*'

interface ImportMetaEnv {
  readonly SUPABASE_URL: string
  readonly SUPABASE_ANON_KEY: string
  readonly TTS_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}


export interface SPB_UserData {
  id: string
  user_name: string
  role: string
  is_anonymous: boolean
}

export interface UserMetadata {
  avatar_url: string
  email: string
  email_verified: boolean
  full_name: string
  iss: string
  name: string
  phone_verified: boolean
  preferred_username: string
  provider_id: string
  sub: string
  user_name: string
}

export interface AppMetadata {
  provider: string
  providers: string[]
}



export interface SPB_UserBook {
  id: number
  name: string
}


export interface SPB_FlashCard   {
  id: number,
  created_at: string,
  user_book_id: 23,

  expression_id: number,
  expression_name: string,
  user_own_id: string

  fails: number,

  interval: number,
  repetition: number,
  efactor: number,
  last_review: string,
  next_review: string,
}
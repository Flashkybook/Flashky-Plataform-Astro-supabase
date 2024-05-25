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




export interface SPB_UserBook {
  id: number
  name: string
}

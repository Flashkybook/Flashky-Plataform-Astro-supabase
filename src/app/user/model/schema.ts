
export interface SPB_UserData {
  id: string
  user_name: string
  role: string | undefined
  is_anonymous: boolean | undefined
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
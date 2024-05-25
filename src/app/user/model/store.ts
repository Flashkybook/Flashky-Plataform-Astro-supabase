import type { SPB_UserData } from './schema';
import { persistentAtom } from '@nanostores/persistent'
import type { User } from '@supabase/supabase-js'


export const $user = persistentAtom<undefined | SPB_UserData>("user", undefined, {
  encode: JSON.stringify,
  decode: JSON.parse,
})




export const adapterResSupabaseAuth_to_store = (user: User) => {

  const user_data: SPB_UserData = {
    id: user.id,
    user_name: user.user_metadata?.preferred_username,
    role: user.role,
    is_anonymous: user.is_anonymous
  }

  return user_data
}
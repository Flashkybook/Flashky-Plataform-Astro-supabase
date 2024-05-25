import type { SPB_UserData } from './schema';
import { persistentAtom } from '@nanostores/persistent'


export const $user = persistentAtom<undefined | SPB_UserData>("user", undefined, {
  encode: JSON.stringify,
  decode: JSON.parse,
})


import type { User } from '@supabase/supabase-js'


const adapterResSupabaseAuth_to_store = (user: User) => {

  const user_data: SPB_UserData = {
    id: user.id,
    user_name: user.user_metadata?.full_name,
    role: user.app_metadata?.role,
    is_anonymous: user.app_metadata?.is_anonymous
  }

  return user_data

}
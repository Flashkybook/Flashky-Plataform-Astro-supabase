import type { SPB_UserData } from '@env';
import { persistentAtom } from '@nanostores/persistent'


export const $user = persistentAtom<undefined | SPB_UserData>("user", undefined, {
  encode: JSON.stringify,
  decode: JSON.parse,
})


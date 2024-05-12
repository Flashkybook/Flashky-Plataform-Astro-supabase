import type { SPB_UserData } from '@env';
import { atom } from 'nanostores'

export const $users = atom<SPB_UserData | undefined>()

export function addUser(user: SPB_UserData) {
  $users.set(user);
}
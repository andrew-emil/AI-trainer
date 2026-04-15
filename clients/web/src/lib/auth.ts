import { getMyUser, IUser } from '@/services/user';
import { AuthStatus } from '@/types/auth';

/* ---------- Types ---------- */

export type AuthState = {
  status: AuthStatus;
  user: IUser | null;
};

/* ---------- Module Cache ---------- */

let cachedUser: IUser | null = null;
let inflight: Promise<IUser | null> | null = null;

/* ---------- Auth Resolver ---------- */

export async function getAuth(): Promise<AuthState> {
  if (cachedUser) {
    return { status: AuthStatus.AUTHENTICATED, user: cachedUser };
  }

  if (!inflight) {
    inflight = getMyUser()
      .then((data) => {
        if (!data) return null;
        return data;
      })
      .catch(() => null)
      .finally(() => {
        inflight = null;
      });
  }

  const user = await inflight;

  if (!user) {
    cachedUser = null;
    return { status: AuthStatus.UNAUTHENTICATED, user: null };
  }

  cachedUser = user;
  return { status: AuthStatus.AUTHENTICATED, user };
}

/* ---------- Utilities ---------- */

export function clearAuthCache() {
  cachedUser = null;
  inflight = null;
}

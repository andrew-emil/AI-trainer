import { getMyUser } from '@/services/user';
import { AuthStatus } from '@/types/auth';
import { SafeUser } from '@/types/user';

/* ---------- Types ---------- */

export type AuthState = {
  status: AuthStatus;
  user: SafeUser | null;
};

/* ---------- Module Cache ---------- */

let cachedUser: SafeUser | null = null;
let inflight: Promise<SafeUser | null> | null = null;

/* ---------- Auth Resolver ---------- */

export async function getAuth(): Promise<AuthState> {
  if (cachedUser) {
    return { status: AuthStatus.AUTHENTICATED, user: cachedUser };
  }

  if (!inflight) {
    inflight = getMyUser()
      .then(({ data, error }) => {
        if (error || !data) return null;
        return data;
      })
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

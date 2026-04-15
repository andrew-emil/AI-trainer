import { getMyUser, IUser } from '@/services/user';
import { AuthStatus } from '@/types/auth';

/* ---------- Types ---------- */

export type AuthState = {
  status: AuthStatus;
  user: IUser | null;
};

/* ---------- Storage Key ---------- */

const AUTH_USER_KEY = 'fr3on-fit:auth_user';

/* ---------- localStorage Helpers ---------- */

export function getStoredUser(): IUser | null {
  try {
    const raw = localStorage.getItem(AUTH_USER_KEY);
    return raw ? (JSON.parse(raw) as IUser) : null;
  } catch {
    return null;
  }
}

export function setStoredUser(user: IUser | null): void {
  if (user) {
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(AUTH_USER_KEY);
  }
}

/* ---------- Module-Level Memory Cache ---------- */

let cachedUser: IUser | null = null;
let inflight: Promise<IUser | null> | null = null;

/* ---------- Auth Resolver ---------- */

export async function getAuth(): Promise<AuthState> {
  // 1. In-memory cache (fastest)
  if (cachedUser) {
    return { status: AuthStatus.AUTHENTICATED, user: cachedUser };
  }

  // 2. localStorage — avoids network round-trip on page load/refresh
  const storedUser = getStoredUser();
  if (storedUser) {
    cachedUser = storedUser;
    return { status: AuthStatus.AUTHENTICATED, user: storedUser };
  }

  // 3. Network call — tokens are sent automatically via httpOnly cookies
  if (!inflight) {
    inflight = getMyUser()
      .then((data) => data ?? null)
      .catch(() => null)
      .finally(() => {
        inflight = null;
      });
  }

  const user = await inflight;

  if (!user) {
    setStoredUser(null);
    cachedUser = null;
    return { status: AuthStatus.UNAUTHENTICATED, user: null };
  }

  cachedUser = user;
  setStoredUser(user);
  return { status: AuthStatus.AUTHENTICATED, user };
}

/* ---------- Utilities ---------- */

export function clearAuthCache(): void {
  cachedUser = null;
  inflight = null;
  setStoredUser(null);
}

/** Call after a successful login to hydrate state without a refetch. */
export function persistAuth(user: IUser): AuthState {
  cachedUser = user;
  setStoredUser(user);
  return { status: AuthStatus.AUTHENTICATED, user };
}
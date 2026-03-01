import { getMyUser } from '@/services/user';
import { tokenStore } from '@/store/tokenStore';
import { AuthStatus } from '@/types/auth';
import { SafeUser } from '@/types/user';

/* ---------- Types ---------- */

export type AuthState = {
  status: AuthStatus;
  token: string | null;
  user: SafeUser | null;
};

/* ---------- Module Cache ---------- */

let cachedToken: string | null = null;
let cachedUser: SafeUser | null = null;
let inflight: Promise<SafeUser> | null = null;

/* ---------- Auth Resolver ---------- */

export async function getAuth(): Promise<AuthState> {
  const token = tokenStore.get();

  if (!token) {
    resetCache();
    return { status: AuthStatus.UNAUTHENTICATED, token: null, user: null };
  }

  // Token unchanged → reuse cached user
  if (cachedToken === token && cachedUser) {
    return {
      status: AuthStatus.AUTHENTICATED,
      token,
      user: cachedUser,
    };
  }

  try {
    cachedToken = token;

    // Single-flight request
    inflight ??= getMyUser().then(res => {
      if (res.error) throw res.error;
      return res.data as SafeUser; // safe because we threw on error
    });


    const user = await inflight;

    cachedUser = user;
    inflight = null;

    return {
      status: AuthStatus.AUTHENTICATED,
      token,
      user,
    };
  } catch {
    tokenStore.clear();
    resetCache();
    return { status: AuthStatus.UNAUTHENTICATED, token: null, user: null };
  }
}

/* ---------- Utilities ---------- */

function resetCache() {
  cachedToken = null;
  cachedUser = null;
  inflight = null;
}

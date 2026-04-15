import { redirect } from 'react-router';
import { getAuth } from '@/lib/auth';
import { AuthStatus } from '@/types/auth';
import { UserRole } from '@/services/user';

export function requireAuthLoader(roles?: UserRole[]) {
  return async ({ request }: { request: Request }) => {
    const { status, user } = await getAuth();

    const url = new URL(request.url);
    const next = url.pathname + url.search;

    if (status === AuthStatus.UNAUTHENTICATED || !user) {
      throw redirect(`/login?next=${encodeURIComponent(next)}`);
    }

    if (roles?.length && !roles.includes(user.role)) {
      throw redirect('/');
    }

    return null;
  };
}

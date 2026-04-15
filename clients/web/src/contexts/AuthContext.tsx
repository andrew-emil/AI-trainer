import {
    AuthState,
    clearAuthCache,
    getAuth,
    persistAuth,
} from '@/lib/auth';
import {
    logout as apiLogout,
    refreshAccessToken,
} from '@/services/auth';
import { IUser } from '@/services/user';
import { AuthStatus } from '@/types/auth';
import React, { createContext, useEffect, useRef, useState } from 'react';

export type AuthContextValue = {
    auth: AuthState | undefined;
    loading: boolean;
    error?: unknown;
    refresh: () => Promise<AuthState>;
    logout: () => Promise<void>;
    setAuthDirect: (user: IUser) => void;
};

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

type Props = { children: React.ReactNode };

export const AuthProvider: React.FC<Props> = ({ children }) => {
    const [auth, setAuth] = useState<AuthState | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<unknown>();
    const inflightRef = useRef<Promise<AuthState> | null>(null);

    const fetchAuth = async (): Promise<AuthState> => {
        if (inflightRef.current) return inflightRef.current;

        const p = (async () => {
            setLoading(true);
            setError(undefined);
            try {
                const result = await getAuth();
                setAuth(result);
                return result;
            } catch (err) {
                setError(err);
                const unauth: AuthState = { status: AuthStatus.UNAUTHENTICATED, user: null };
                setAuth(unauth);
                return unauth;
            } finally {
                setLoading(false);
                inflightRef.current = null;
            }
        })();

        inflightRef.current = p;
        return p;
    };

    /**
     * Calls /auth/refresh to rotate the access token via httpOnly cookie,
     * then re-fetches the user to sync context with any updated claims.
     */
    const refresh = async (): Promise<AuthState> => {
        try {
            await refreshAccessToken();
        } catch {
            // Refresh token is expired/invalid — treat as logged out
            clearAuthCache();
            const unauth: AuthState = { status: AuthStatus.UNAUTHENTICATED, user: null };
            setAuth(unauth);
            return unauth;
        }
        // Token is fresh — re-fetch user to sync context
        clearAuthCache();
        return fetchAuth();
    };

    /**
     * Invalidates the httpOnly cookie server-side, then wipes all local state.
     * Fire-and-forget the API call so the UI clears immediately even if the
     * network is slow.
     */
    const logout = async (): Promise<void> => {
        clearAuthCache();
        setAuth({ status: AuthStatus.UNAUTHENTICATED, user: null });
        try {
            await apiLogout();
        } catch {
            // Cookie may already be expired — not a fatal error
        }
    };

    const setAuthDirect = (user: IUser) => {
        const next = persistAuth(user);
        setAuth(next);
    };

    useEffect(() => {
        fetchAuth().catch(() => { });
    }, []);

    return (
        <AuthContext.Provider value={{ auth, loading, error, refresh, logout, setAuthDirect }}>
            {children}
        </AuthContext.Provider>
    );
};
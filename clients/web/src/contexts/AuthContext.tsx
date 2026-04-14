import { AuthState, clearAuthCache, getAuth } from "@/lib/auth";
import { AuthStatus } from "@/types/auth";
import React, {
    createContext,
    useEffect,
    useRef,
    useState
} from "react";

export type AuthContextValue = {
    auth: AuthState | undefined;
    loading: boolean;
    error?: unknown;
    refresh: () => Promise<AuthState>;
    logout: () => void;
    setAuthDirect?: (a: AuthState) => void;
};

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

type Props = {
    children: React.ReactNode;
};

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
                const unauth: AuthState = {
                    status: AuthStatus.UNAUTHENTICATED,
                    user: null,
                };
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

    const refresh = async () => {
        clearAuthCache();
        return fetchAuth();
    };

    const logout = () => {
        clearAuthCache();
        setAuth({
            status: AuthStatus.UNAUTHENTICATED,
            user: null,
        });
    };

    useEffect(() => {
        if (auth === undefined) {
            fetchAuth().catch(() => {
                /* handled inside fetchAuth */
            });
        } else {
            setLoading(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const value: AuthContextValue = {
        auth,
        loading,
        error,
        refresh,
        logout,
        setAuthDirect: setAuth,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

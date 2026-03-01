import { AuthState, getAuth } from "@/lib/auth";
import { tokenStore } from "@/store/tokenStore";
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
    initialAuth?: AuthState | null;
};

export const AuthProvider: React.FC<Props> = ({ children, initialAuth }) => {
    const [auth, setAuth] = useState<AuthState | undefined>(
        initialAuth ?? undefined
    );
    const [loading, setLoading] = useState<boolean>(initialAuth ? false : true);
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
                    token: null,
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
        return fetchAuth();
    };

    const logout = () => {
        tokenStore.clear();
        const unauth: AuthState = {
            status: AuthStatus.UNAUTHENTICATED,
            token: null,
            user: null,
        };
        setAuth(unauth);
    };

    useEffect(() => {
        if (auth === undefined) {
            fetchAuth().catch(() => {
                /* handled inside fetchAuth */
            });
        } else {
            setLoading(false);
        }
    }, [auth]);

    // useEffect(() => {
    //     const onFocus = () => {
    //         if (!auth) return;
    //         if (auth.user === null) {
    //             fetchAuth().catch(() => { });
    //         }
    //     };

    //     window.addEventListener("focus", onFocus);
    //     document.addEventListener("visibilitychange", () => {
    //         if (document.visibilityState === "visible") onFocus();
    //     });

    //     return () => {
    //         window.removeEventListener("focus", onFocus);
    //     };
    // }, [auth]);

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

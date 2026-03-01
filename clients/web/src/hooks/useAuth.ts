import { useContext } from "react";
import { AuthContext, AuthContextValue } from "../contexts/AuthContext";

export const useAuth = (): AuthContextValue => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside an AuthProvider");
    return ctx;
};

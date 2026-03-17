import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { AUTH_MODES, type AuthMode } from "../model/auth-mode";

export const useAuthRoute = () => {
    const location = useLocation();

    const isLoginRoute = useMemo(
        () => location.pathname.endsWith(`/${AUTH_MODES.LOGIN}`),
        [location.pathname]
    );

    const nextMode: AuthMode = isLoginRoute
        ? AUTH_MODES.REGISTER
        : AUTH_MODES.LOGIN;

    return {
        isLoginRoute,
        nextMode,
    };
};

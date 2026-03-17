export const AUTH_MODES = {
    LOGIN: "login",
    REGISTER: "register",
} as const;

export type AuthMode = (typeof AUTH_MODES)[keyof typeof AUTH_MODES];

export const isAuthMode = (value: string | undefined): value is AuthMode =>
    value === AUTH_MODES.LOGIN || value === AUTH_MODES.REGISTER;

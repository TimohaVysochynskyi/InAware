const TRANSPARENT_HEADER_PATTERNS: RegExp[] = [/^\/$/, /^\/auth(?:\/.*)?$/];

export const hasTransparentHeaderAtTop = (pathname: string) => {
    return TRANSPARENT_HEADER_PATTERNS.some((pattern) => pattern.test(pathname));
};

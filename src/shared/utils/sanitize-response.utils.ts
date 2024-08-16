export function sanitizeResponse<T extends Record<string, any>, K extends keyof T>(obj: T, keysToRemove: K[] = []): Omit<T, K> {
    const newObj = { ...obj };

    if (keysToRemove) {
        for (const key of keysToRemove) {
            if (key in newObj) {
                delete newObj[key];
            }
        }
    }

    return newObj;
}
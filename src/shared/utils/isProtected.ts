/**
 * Normalizes a given path by removing leading and trailing slashes.
 * @param path - The path to normalize.
 * @returns The normalized path.
 */
function normalizePath(path: string): string {
    return path.replace(/\/+$/, '').replace(/^\//, '');
}

/**
 * Compares an array of protected URLs against the current pathname to determine if there is a match.
 * @param protectedUrls - An array of protected URL patterns.
 * @param currentPath - The current pathname to compare against.
 * @returns True if there is a match, false otherwise.
 */
export default function matchProtectedUrls(protectedUrls: string[], currentPath: string): boolean {
    // Normalize the current pathname
    const normalizedCurrentPath = normalizePath(currentPath);
    console.log(normalizedCurrentPath)
    
    return protectedUrls.some((url) => {
        // Normalize the protected URL
        const normalizedUrl = normalizePath(url);


        // Handle wildcard matching
        if (normalizedUrl.endsWith('/*')) {
            const base = normalizedUrl.slice(0, -2); // Remove '/*' from the end
            return normalizedCurrentPath.startsWith(base);
        }

        // Exact match or ignoring trailing slashes
        return normalizedCurrentPath === normalizedUrl;
    });
}



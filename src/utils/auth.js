export const checkToken = () => {
    // Check if we're in browser environment
    if (typeof window === "undefined") {
        return { isValid: false, token: null };
    }

    const token = localStorage.getItem("token");
    if (!token) return { isValid: false, token: null };

    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const currentTime = Math.floor(Date.now() / 1000);

        if (payload.exp && payload.exp > currentTime) {
            return { isValid: true, token, payload };
        } else {
            localStorage.removeItem("token");
            return { isValid: false, token: null };
        }
    } catch {
        localStorage.removeItem("token");
        return { isValid: false, token: null };
    }
};

export const isLoggedIn = () => {
    return checkToken().isValid;
};

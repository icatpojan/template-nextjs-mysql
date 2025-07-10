"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLoading } from "../contexts/LoadingContext";
import { checkToken } from "../utils/auth";
import LoadingScreen from "./LoadingScreen";

export default function RouteGuard({ children, requireAuth = false, requireGuest = false }) {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isChecking, setIsChecking] = useState(true);
    const router = useRouter();
    const { setInitialized } = useLoading();

    useEffect(() => {
        const checkAuth = () => {
            const { isValid } = checkToken();

            if (requireAuth && !isValid) {
                // User harus login tapi belum login
                router.push("/login");
                return;
            }

            if (requireGuest && isValid) {
                // User harus guest (belum login) tapi sudah login
                router.push("/dashboard");
                return;
            }

            // User authorized untuk mengakses halaman ini
            setIsAuthorized(true);
            setInitialized();
        };

        // Delay sedikit untuk memastikan router sudah siap
        const timer = setTimeout(() => {
            checkAuth();
            setIsChecking(false);
        }, 100);

        return () => clearTimeout(timer);
    }, [requireAuth, requireGuest, router, setInitialized]);

    // Show loading screen while checking authentication
    if (isChecking) {
        return <LoadingScreen />;
    }

    // Show children only if authorized
    return isAuthorized ? children : null;
}

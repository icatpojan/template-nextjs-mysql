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
            console.log("RouteGuard: Checking authentication...");
            const { isValid, token } = checkToken();
            console.log("RouteGuard: Token valid:", isValid, "requireAuth:", requireAuth, "requireGuest:", requireGuest);

            if (requireAuth) {
                if (!isValid) {
                    // User harus login tapi belum login atau token expired
                    // Token sudah dihapus oleh checkToken() jika expired
                    console.log("RouteGuard: User not authenticated, redirecting to login");
                    setIsChecking(false);
                    router.push("/login");
                    return;
                }
                // User sudah login dan token valid
                console.log("RouteGuard: User authenticated, showing dashboard");
                setIsAuthorized(true);
                setIsChecking(false);
                setInitialized();
                return;
            }

            if (requireGuest) {
                if (isValid) {
                    // User harus guest (belum login) tapi sudah login
                    console.log("RouteGuard: User already logged in, redirecting to dashboard");
                    setIsChecking(false);
                    router.push("/dashboard");
                    return;
                }
                // User belum login, bisa akses halaman guest
                console.log("RouteGuard: User not logged in, showing guest page");
                setIsAuthorized(true);
                setIsChecking(false);
                setInitialized();
                return;
            }

            // Halaman public (tidak ada requireAuth atau requireGuest)
            console.log("RouteGuard: Public page, showing content");
            setIsAuthorized(true);
            setIsChecking(false);
            setInitialized();
        };

        // Delay sedikit untuk memastikan router sudah siap
        const timer = setTimeout(() => {
            checkAuth();
        }, 100);

        return () => clearTimeout(timer);
    }, [requireAuth, requireGuest, router, setInitialized]);

    // Show loading screen while checking authentication
    if (isChecking) {
        console.log("RouteGuard: Still checking, showing loading screen");
        return <LoadingScreen />;
    }

    // Show children only if authorized
    console.log("RouteGuard: Check complete, authorized:", isAuthorized);
    return isAuthorized ? children : null;
}

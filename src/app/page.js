"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import RouteGuard from "../components/RouteGuard";
import { checkToken } from "../utils/auth";

export default function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    // Check login status for UI rendering
    const { isValid } = checkToken();
    if (isValid !== isLoggedIn) {
        setIsLoggedIn(isValid);
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
    };

    return (
        <RouteGuard>
            <div
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "#f9f9f9",
                }}
            >
                <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 24 }}>Selamat Datang di Aplikasi!</h1>
                <div style={{ display: "flex", gap: 16 }}>
                    {isLoggedIn ? (
                        <>
                            <a
                                href="/dashboard"
                                style={{
                                    padding: "12px 32px",
                                    background: "#0070f3",
                                    color: "#fff",
                                    borderRadius: 8,
                                    textDecoration: "none",
                                    fontWeight: 600,
                                }}
                            >
                                Dashboard
                            </a>
                            <button
                                onClick={handleLogout}
                                style={{
                                    padding: "12px 32px",
                                    background: "#dc3545",
                                    color: "#fff",
                                    borderRadius: 8,
                                    border: "none",
                                    fontWeight: 600,
                                    cursor: "pointer",
                                }}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <a
                                href="/login"
                                style={{
                                    padding: "12px 32px",
                                    background: "#0070f3",
                                    color: "#fff",
                                    borderRadius: 8,
                                    textDecoration: "none",
                                    fontWeight: 600,
                                }}
                            >
                                Login
                            </a>
                            <a
                                href="/register"
                                style={{
                                    padding: "12px 32px",
                                    background: "#eaeaea",
                                    color: "#222",
                                    borderRadius: 8,
                                    textDecoration: "none",
                                    fontWeight: 600,
                                    border: "1px solid #ccc",
                                }}
                            >
                                Register
                            </a>
                        </>
                    )}
                </div>
            </div>
        </RouteGuard>
    );
}

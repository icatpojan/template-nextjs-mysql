import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
    return (
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
            </div>
        </div>
    );
}

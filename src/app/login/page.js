"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        setLoading(false);
        if (data.token) {
            localStorage.setItem("token", data.token);
            router.push("/dashboard");
        } else {
            setError(data.error || "Login gagal");
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
            <div
                className="card shadow"
                style={{ minWidth: 350, maxWidth: 400 }}
            >
                <div className="card-body">
                    <h2 className="mb-4 text-center">Login</h2>
                    {error && <div className="alert alert-danger py-2">{error}</div>}
                    <form
                        onSubmit={handleSubmit}
                        autoComplete="off"
                    >
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Masukkan email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Masukkan password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                            disabled={loading}
                        >
                            {loading ? "Loading..." : "Login"}
                        </button>
                    </form>
                    <div className="text-center mt-3">
                        <a
                            href="/register"
                            className="text-decoration-none"
                        >
                            Belum punya akun? Register
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

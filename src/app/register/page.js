"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        setLoading(false);
        if (res.status === 201) {
            router.push("/login");
        } else {
            setError(data.error || "Register gagal");
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
            <div
                className="card shadow"
                style={{ minWidth: 350, maxWidth: 400 }}
            >
                <div className="card-body">
                    <h2 className="mb-4 text-center">Register</h2>
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
                            {loading ? "Loading..." : "Register"}
                        </button>
                    </form>
                    <div className="text-center mt-3">
                        <a
                            href="/login"
                            className="text-decoration-none"
                        >
                            Sudah punya akun? Login
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

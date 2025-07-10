"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLoading } from "../../contexts/LoadingContext";
import { checkToken } from "../../utils/auth";
import RouteGuard from "../../components/RouteGuard";

export default function Dashboard() {
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [userId, setUserId] = useState(null);
    const [isClient, setIsClient] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editingPost, setEditingPost] = useState(null);
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const router = useRouter();
    const { showLoading, hideLoading, setInitialized } = useLoading();

    const fetchPosts = async () => {
        const { token } = checkToken();
        if (!token) {
            router.push("/login");
            return;
        }
        try {
            const res = await fetch("/api/posts", {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.status === 401) {
                localStorage.removeItem("token");
                router.push("/login");
                return;
            }
            const data = await res.json();
            if (data) setPosts(data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    useEffect(() => {
        setIsClient(true);
        showLoading(); // Show loading when dashboard loads

        const { payload } = checkToken();
        setUserId(payload.id);
        fetchPosts().finally(() => {
            hideLoading();
            setInitialized();
        });
    }, [showLoading, hideLoading, setInitialized]);

    const handleAdd = async () => {
        setLoading(true);
        setError("");
        const { token } = checkToken();
        const res = await fetch("/api/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ title, content }),
        });
        setLoading(false);
        if (res.status === 401) {
            localStorage.removeItem("token");
            router.push("/login");
            return;
        }
        if (!res.ok) {
            const data = await res.json();
            setError(data.error || "Gagal menambah post");
            return;
        }
        setTitle("");
        setContent("");
        setShowModal(false);
        await fetchPosts();
    };

    const handleEdit = async () => {
        if (!editingPost) return;

        setLoading(true);
        setError("");
        const { token } = checkToken();
        const res = await fetch(`/api/posts/${editingPost.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ title, content }),
        });
        setLoading(false);
        if (res.status === 401) {
            localStorage.removeItem("token");
            router.push("/login");
            return;
        }
        if (!res.ok) {
            const data = await res.json();
            setError(data.error || "Gagal mengupdate post");
            return;
        }
        setTitle("");
        setContent("");
        setEditingPost(null);
        setShowModal(false);
        await fetchPosts();
    };

    const handleDelete = async (postId) => {
        setLoading(true);
        setError("");
        const { token } = checkToken();
        const res = await fetch(`/api/posts/${postId}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        });
        setLoading(false);
        if (res.status === 401) {
            localStorage.removeItem("token");
            router.push("/login");
            return;
        }
        if (!res.ok) {
            const data = await res.json();
            setError(data.error || "Gagal menghapus post");
            return;
        }
        setDeleteConfirm(null);
        await fetchPosts();
    };

    const openEditModal = (post) => {
        setEditingPost(post);
        setTitle(post.title);
        setContent(post.content);
        setShowModal(true);
        setError("");
    };

    const openAddModal = () => {
        setEditingPost(null);
        setTitle("");
        setContent("");
        setShowModal(true);
        setError("");
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingPost(null);
        setTitle("");
        setContent("");
        setError("");
    };

    if (!isClient) return null;

    return (
        <RouteGuard requireAuth={true}>
            <div className="container py-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="mb-0">Dashboard</h1>
                    <div>
                        <button
                            className="btn btn-primary me-2"
                            onClick={openAddModal}
                        >
                            <i className="bi bi-plus-circle"></i> Tambah Post
                        </button>
                        <button
                            className="btn btn-outline-danger"
                            onClick={() => {
                                localStorage.removeItem("token");
                                router.push("/login");
                            }}
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {/* Posts Table */}
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title mb-3">Daftar Post</h5>
                        <div className="table-responsive">
                            <table className="table table-bordered table-hover">
                                <thead className="table-light">
                                    <tr>
                                        <th style={{ width: 60 }}>#</th>
                                        <th>Title</th>
                                        <th>Content</th>
                                        <th style={{ width: 150 }}>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {posts.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={4}
                                                className="text-center text-muted"
                                            >
                                                Belum ada post
                                            </td>
                                        </tr>
                                    ) : (
                                        posts.map((post, i) => (
                                            <tr key={post.id}>
                                                <td>{i + 1}</td>
                                                <td>{post.title}</td>
                                                <td>{post.content}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-sm btn-warning me-1"
                                                        onClick={() => openEditModal(post)}
                                                    >
                                                        <i className="bi bi-pencil"></i> Edit
                                                    </button>
                                                    <button
                                                        className="btn btn-sm btn-danger"
                                                        onClick={() => setDeleteConfirm(post)}
                                                    >
                                                        <i className="bi bi-trash"></i> Hapus
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Add/Edit Modal */}
                {showModal && (
                    <div
                        className="modal fade show"
                        style={{ display: "block" }}
                        tabIndex="-1"
                    >
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">{editingPost ? "Edit Post" : "Tambah Post Baru"}</h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={closeModal}
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    {error && <div className="alert alert-danger py-2">{error}</div>}
                                    <div className="mb-3">
                                        <label className="form-label">Title</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            placeholder="Masukkan title"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Content</label>
                                        <textarea
                                            className="form-control"
                                            rows="4"
                                            value={content}
                                            onChange={(e) => setContent(e.target.value)}
                                            placeholder="Masukkan content"
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={closeModal}
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={editingPost ? handleEdit : handleAdd}
                                        disabled={loading || !title.trim() || !content.trim()}
                                    >
                                        {loading ? "Loading..." : editingPost ? "Update" : "Simpan"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                {deleteConfirm && (
                    <div
                        className="modal fade show"
                        style={{ display: "block" }}
                        tabIndex="-1"
                    >
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Konfirmasi Hapus</h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={() => setDeleteConfirm(null)}
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    <p>Apakah Anda yakin ingin menghapus post ini?</p>
                                    <p>
                                        <strong>Title:</strong> {deleteConfirm.title}
                                    </p>
                                    <p>
                                        <strong>Content:</strong> {deleteConfirm.content}
                                    </p>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => setDeleteConfirm(null)}
                                    >
                                        Batal
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(deleteConfirm.id)}
                                        disabled={loading}
                                    >
                                        {loading ? "Loading..." : "Hapus"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal Backdrop */}
                {(showModal || deleteConfirm) && <div className="modal-backdrop fade show"></div>}
            </div>
        </RouteGuard>
    );
}

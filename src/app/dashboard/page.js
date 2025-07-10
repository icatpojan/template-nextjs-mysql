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

        // RouteGuard sudah memastikan user sudah login, jadi token pasti valid
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
            <div className="dashboard-container">
                {/* Header */}
                <header className="dashboard-header">
                    <div className="container-fluid">
                        <div className="row align-items-center">
                            <div className="col">
                                <h1 className="dashboard-title">
                                    <i className="bi bi-speedometer2 me-2"></i>
                                    Dashboard
                                </h1>
                            </div>
                            <div className="col-auto">
                                <div className="d-flex gap-2">
                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={openAddModal}
                                    >
                                        <i className="bi bi-plus-circle me-1"></i>
                                        Tambah Post
                                    </button>
                                    <button
                                        className="btn btn-outline-danger btn-sm"
                                        onClick={() => {
                                            localStorage.removeItem("token");
                                            router.push("/login");
                                        }}
                                    >
                                        <i className="bi bi-box-arrow-right me-1"></i>
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="dashboard-main">
                    <div className="container-fluid">
                        {/* Stats Cards */}
                        <div className="row mb-4">
                            <div className="col-md-4">
                                <div className="stats-card">
                                    <div className="stats-icon">
                                        <i className="bi bi-file-text"></i>
                                    </div>
                                    <div className="stats-content">
                                        <h3 className="stats-number">{posts.length}</h3>
                                        <p className="stats-label">Total Posts</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="stats-card">
                                    <div className="stats-icon">
                                        <i className="bi bi-calendar3"></i>
                                    </div>
                                    <div className="stats-content">
                                        <h3 className="stats-number">{new Date().getDate()}</h3>
                                        <p className="stats-label">Hari Ini</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="stats-card">
                                    <div className="stats-icon">
                                        <i className="bi bi-person-circle"></i>
                                    </div>
                                    <div className="stats-content">
                                        <h3 className="stats-number">1</h3>
                                        <p className="stats-label">User Active</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Posts Table */}
                        <div className="content-card">
                            <div className="content-header">
                                <h5 className="content-title">
                                    <i className="bi bi-list-ul me-2"></i>
                                    Daftar Post
                                </h5>
                                <button
                                    className="btn btn-primary btn-sm"
                                    onClick={openAddModal}
                                >
                                    <i className="bi bi-plus-circle me-1"></i>
                                    Tambah Baru
                                </button>
                            </div>
                            <div className="content-body">
                                {posts.length === 0 ? (
                                    <div className="empty-state">
                                        <i className="bi bi-inbox empty-icon"></i>
                                        <h4>Belum ada post</h4>
                                        <p>Mulai dengan membuat post pertama Anda</p>
                                        <button
                                            className="btn btn-primary"
                                            onClick={openAddModal}
                                        >
                                            <i className="bi bi-plus-circle me-1"></i>
                                            Buat Post Pertama
                                        </button>
                                    </div>
                                ) : (
                                    <div className="table-responsive">
                                        <table className="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th width="60">#</th>
                                                    <th>Title</th>
                                                    <th>Content</th>
                                                    <th width="120">Aksi</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {posts.map((post, i) => (
                                                    <tr key={post.id}>
                                                        <td className="text-muted">{i + 1}</td>
                                                        <td>
                                                            <strong>{post.title}</strong>
                                                        </td>
                                                        <td>
                                                            <span
                                                                className="text-truncate d-inline-block"
                                                                style={{ maxWidth: "300px" }}
                                                            >
                                                                {post.content}
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <div className="btn-group btn-group-sm">
                                                                <button
                                                                    className="btn btn-outline-warning"
                                                                    onClick={() => openEditModal(post)}
                                                                    title="Edit"
                                                                >
                                                                    <i className="bi bi-pencil"></i>
                                                                </button>
                                                                <button
                                                                    className="btn btn-outline-danger"
                                                                    onClick={() => setDeleteConfirm(post)}
                                                                    title="Hapus"
                                                                >
                                                                    <i className="bi bi-trash"></i>
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </main>

                {/* Add/Edit Modal */}
                {showModal && (
                    <div
                        className="modal fade show"
                        style={{ display: "block" }}
                        tabIndex="-1"
                    >
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">
                                        <i
                                            className={`bi ${editingPost ? "bi-pencil-square" : "bi-plus-circle"} me-2`}
                                        ></i>
                                        {editingPost ? "Edit Post" : "Tambah Post Baru"}
                                    </h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={closeModal}
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    {error && (
                                        <div className="alert alert-danger py-2 mb-3">
                                            <i className="bi bi-exclamation-triangle me-2"></i>
                                            {error}
                                        </div>
                                    )}
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Title</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            placeholder="Masukkan title post"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Content</label>
                                        <textarea
                                            className="form-control"
                                            rows="4"
                                            value={content}
                                            onChange={(e) => setContent(e.target.value)}
                                            placeholder="Masukkan content post"
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={closeModal}
                                    >
                                        <i className="bi bi-x-circle me-1"></i>
                                        Batal
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={editingPost ? handleEdit : handleAdd}
                                        disabled={loading || !title.trim() || !content.trim()}
                                    >
                                        {loading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2"></span>
                                                Loading...
                                            </>
                                        ) : (
                                            <>
                                                <i
                                                    className={`bi ${
                                                        editingPost ? "bi-check-circle" : "bi-plus-circle"
                                                    } me-1`}
                                                ></i>
                                                {editingPost ? "Update" : "Simpan"}
                                            </>
                                        )}
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
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title text-danger">
                                        <i className="bi bi-exclamation-triangle me-2"></i>
                                        Konfirmasi Hapus
                                    </h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={() => setDeleteConfirm(null)}
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    <p>Apakah Anda yakin ingin menghapus post ini?</p>
                                    <div className="alert alert-warning">
                                        <strong>Title:</strong> {deleteConfirm.title}
                                        <br />
                                        <strong>Content:</strong> {deleteConfirm.content}
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => setDeleteConfirm(null)}
                                    >
                                        <i className="bi bi-x-circle me-1"></i>
                                        Batal
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(deleteConfirm.id)}
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2"></span>
                                                Loading...
                                            </>
                                        ) : (
                                            <>
                                                <i className="bi bi-trash me-1"></i>
                                                Hapus
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal Backdrop */}
                {(showModal || deleteConfirm) && <div className="custom-modal-backdrop"></div>}
            </div>

            <style jsx>{`
                .dashboard-container {
                    min-height: 100vh;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                }

                .dashboard-header {
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(10px);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
                    padding: 1rem 0;
                    position: sticky;
                    top: 0;
                    z-index: 1000;
                }

                .dashboard-title {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: #2d3748;
                    margin: 0;
                }

                .dashboard-main {
                    padding: 2rem 0;
                }

                .stats-card {
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(10px);
                    border-radius: 16px;
                    padding: 1.5rem;
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                    transition: transform 0.2s ease;
                }

                .stats-card:hover {
                    transform: translateY(-2px);
                }

                .stats-icon {
                    width: 60px;
                    height: 60px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 1.5rem;
                }

                .stats-number {
                    font-size: 2rem;
                    font-weight: 700;
                    color: #2d3748;
                    margin: 0;
                }

                .stats-label {
                    color: #718096;
                    margin: 0;
                    font-size: 0.875rem;
                }

                .content-card {
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(10px);
                    border-radius: 16px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                    overflow: hidden;
                }

                .content-header {
                    padding: 1.5rem;
                    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .content-title {
                    font-weight: 600;
                    color: #2d3748;
                    margin: 0;
                }

                .content-body {
                    padding: 1.5rem;
                }

                .empty-state {
                    text-align: center;
                    padding: 3rem 1rem;
                }

                .empty-icon {
                    font-size: 4rem;
                    color: #cbd5e0;
                    margin-bottom: 1rem;
                }

                .table {
                    margin: 0;
                }

                .table th {
                    border-top: none;
                    font-weight: 600;
                    color: #4a5568;
                    background: rgba(0, 0, 0, 0.02);
                }

                .table td {
                    vertical-align: middle;
                    border-top: 1px solid rgba(0, 0, 0, 0.05);
                }

                .btn-group-sm .btn {
                    padding: 0.25rem 0.5rem;
                }

                .modal-content {
                    border-radius: 16px;
                    border: none;
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
                    backdrop-filter: none;
                    filter: none;
                }

                .modal-header {
                    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                    padding: 1.5rem;
                }

                .modal-body {
                    padding: 1.5rem;
                }

                .modal-footer {
                    border-top: 1px solid rgba(0, 0, 0, 0.1);
                    padding: 1.5rem;
                }

                .form-control {
                    border-radius: 8px;
                    border: 1px solid rgba(0, 0, 0, 0.1);
                    padding: 0.75rem;
                }

                .form-control:focus {
                    border-color: #667eea;
                    box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
                }

                .btn {
                    border-radius: 8px;
                    font-weight: 500;
                    padding: 0.5rem 1rem;
                }

                .btn-primary {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    border: none;
                }

                .btn-primary:hover {
                    background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
                    transform: translateY(-1px);
                }

                .modal {
                    z-index: 1050 !important;
                }

                .modal.show {
                    display: block !important;
                }

                .modal-dialog {
                    z-index: 1055 !important;
                }
            `}</style>
        </RouteGuard>
    );
}

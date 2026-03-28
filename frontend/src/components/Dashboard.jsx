import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import ShowBlog from "./ShowBlog";
import { authFetch, createBlog, deleteBlog, getAuthenticatedUser, getBlogs, updateBlog } from "../utils/auth";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: "", text: "" });
  const [editingId, setEditingId] = useState(null);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const [userData, blogData] = await Promise.all([
        getAuthenticatedUser(),
        getBlogs(),
      ]);

      setUser(userData.user);
      setBlogs(blogData.blogs || []);
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleEdit = (blog) => {
    setEditingId(blog._id);
    setForm({
      title: blog.title,
      text: blog.text,
    });
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({ title: "", text: "" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.title.trim() || !form.text.trim()) {
      toast.error("Title and content are required");
      return;
    }

    try {
      const data = editingId
        ? await updateBlog(editingId, {
            title: form.title.trim(),
            text: form.text.trim(),
          })
        : await createBlog({
            title: form.title.trim(),
            text: form.text.trim(),
          });

      toast.success(data.message || "Blog saved successfully");
      resetForm();
      await loadDashboard();
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const data = await deleteBlog(id);
      toast.success(data.message || "Blog deleted successfully");
      if (editingId === id) {
        resetForm();
      }
      await loadDashboard();
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    }
  };

  const handleLogout = async () => {
    try {
      const data = await authFetch("/logout", {
        method: "POST",
        body: JSON.stringify({}),
      });
      toast.success(data.message || "Logged out successfully");
      navigate("/login");
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 text-lg font-semibold text-slate-700">
        Loading dashboard...
      </div>
    );
  }

  const isAdmin = user?.role === "admin";

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto w-full max-w-6xl space-y-8">
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="mt-2 text-3xl font-bold text-slate-900">
                Dashboard
              </h1>
              <p className="mt-2 text-slate-600">
                Welcome {user?.username || user?.email}. {isAdmin ? "You can create, update, and delete blogs." : "You can browse all blogs here."}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className={`rounded-full px-4 py-2 text-sm font-semibold ${isAdmin ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"}`}>
                {isAdmin ? "Admin access" : "User access"}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg bg-slate-900 px-4 py-2 font-medium text-white transition hover:bg-slate-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {isAdmin ? (
          <section className="rounded-2xl bg-white p-8 shadow-lg">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900">
                {editingId ? "Update blog" : "Create a new blog"}
              </h2>
              <p className="mt-2 text-slate-600">
                Publish blog content for all authenticated users to read.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Enter blog title"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Content
                </label>
                <textarea
                  name="text"
                  value={form.text}
                  onChange={handleChange}
                  placeholder="Write your blog content"
                  rows="6"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                  {editingId ? "Update blog" : "Create blog"}
                </button>
                {editingId ? (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    Cancel editing
                  </button>
                ) : null}
              </div>
            </form>
          </section>
        ) : null}

        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Blogs</h2>
            <p className="mt-2 text-slate-600">
              {isAdmin ? "Manage the blog collection below." : "Read the latest posts shared by the admin team."}
            </p>
          </div>

          {blogs.length === 0 ? (
            <div className="rounded-2xl bg-white p-8 text-slate-600 shadow-sm">
              No blogs available yet.
            </div>
          ) : (
            blogs.map((blog) => (
              <ShowBlog
                key={blog._id}
                blog={blog}
                isAdmin={isAdmin}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          )}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;

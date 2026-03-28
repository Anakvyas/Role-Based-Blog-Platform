const ShowBlog = ({ blog, isAdmin, onEdit, onDelete }) => {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-900">{blog.title}</h3>
          <p className="mt-2 text-sm text-slate-500">
            {blog.author?.username ? `By ${blog.author.username}` : "Starter blog"} 
          </p>
        </div>

        {isAdmin ? (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onEdit(blog)}
              className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-100"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => onDelete(blog._id)}
              className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100"
            >
              Delete
            </button>
          </div>
        ) : null}
      </div>

      <p className="mt-4 leading-7 text-slate-700">{blog.text}</p>
    </article>
  );
};

export default ShowBlog;

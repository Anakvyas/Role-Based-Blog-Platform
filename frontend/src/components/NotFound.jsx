import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-xl rounded-3xl bg-white p-10 text-center shadow-lg">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">
          404 Error
        </p>
        <h1 className="mt-4 text-4xl font-bold text-slate-900">
          Page not found
        </h1>
        <p className="mt-4 text-slate-600">
          The page you are looking for does not exist or may have been moved.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-700"
          >
            Go to dashboard
          </Link>
          <Link
            to="/login"
            className="rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Go to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

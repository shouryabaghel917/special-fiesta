export const dynamic = "force-dynamic";

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-6">
        <h1 className="text-2xl font-semibold">Admin Login</h1>
        <p className="mt-2 text-sm text-zinc-300">
          Enter the admin password to access the dashboard.
        </p>

        <form className="mt-6 grid gap-4" method="POST" action="/api/admin/login">
          <label className="grid gap-2 text-sm">
            <span className="text-zinc-200">Password</span>
            <input
              name="password"
              type="password"
              required
              className="rounded-2xl border border-white/10 bg-zinc-950/50 px-4 py-3 text-zinc-50 outline-none focus:border-fuchsia-300/60"
              placeholder="••••••••"
            />
          </label>

          <button
            type="submit"
            className="rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-zinc-950 hover:bg-zinc-100 transition"
          >
            Sign in
          </button>

          <p className="text-xs text-zinc-500">
            If you’re unauthorized, you’ll be redirected back here.
          </p>
        </form>
      </div>
    </main>
  );
}

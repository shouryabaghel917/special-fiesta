import { getSupabaseServerClient } from "@/lib/supabase";
import { getEventConfig } from "@/config/event";

export const dynamic = "force-dynamic";

type Row = {
  id?: number;
  name: string;
  email: string;
  guests: number;
  note: string | null;
  created_at: string;
};

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

export default async function AdminPage() {
  const cfg = getEventConfig();
  const supabase = getSupabaseServerClient();

  let rows: Row[] = [];
  let errorText: string | null = null;

  if (!supabase) {
    errorText = "Supabase is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.";
  } else {
    const { data, error } = await supabase
      .from("rsvps")
      .select("id,name,email,guests,note,created_at")
      .order("created_at", { ascending: false })
      .limit(200);

    if (error) errorText = error.message;
    rows = (data as Row[]) || [];
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50 px-4 py-10">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs text-zinc-400">Admin</p>
            <h1 className="text-3xl font-semibold">{cfg.brand.name} RSVPs</h1>
            <p className="mt-2 text-sm text-zinc-300">
              Showing up to 200 most recent submissions.
            </p>
          </div>

          <form action="/api/admin/logout" method="POST">
            <button
              type="submit"
              className="rounded-2xl border border-white/15 bg-white/5 px-5 py-2 text-sm font-semibold text-white hover:bg-white/10 transition"
            >
              Logout
            </button>
          </form>
        </div>

        {errorText ? (
          <div className="mt-8 rounded-3xl border border-rose-400/20 bg-rose-500/10 p-6 text-rose-200">
            <div className="font-semibold">Could not load RSVPs</div>
            <div className="mt-2 text-sm opacity-90">{errorText}</div>
          </div>
        ) : rows.length === 0 ? (
          <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 text-zinc-300">
            No RSVPs yet.
          </div>
        ) : (
          <div className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-white/5">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-zinc-950/40 text-zinc-200">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Name</th>
                    <th className="px-4 py-3 text-left font-semibold">Email</th>
                    <th className="px-4 py-3 text-left font-semibold">Guests</th>
                    <th className="px-4 py-3 text-left font-semibold">Note</th>
                    <th className="px-4 py-3 text-left font-semibold">Created</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {rows.map((r) => (
                    <tr key={(r.id ?? `${r.email}-${r.created_at}`) as any} className="text-zinc-100">
                      <td className="px-4 py-3 whitespace-nowrap">{r.name}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-zinc-300">{r.email}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{r.guests}</td>
                      <td className="px-4 py-3 min-w-[260px] text-zinc-300">
                        {r.note || <span className="text-zinc-500">—</span>}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-zinc-300">
                        {formatDate(r.created_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

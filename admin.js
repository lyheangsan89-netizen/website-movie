/* ═══════════════════════════════════════════════════════════════
   StreamVault — Admin Dashboard + Movie CRUD
   -----------------------------------------------------------------
   Components:
     • ToastStack      — global notification popups (used by App)
     • AccessDenied    — shown when a guest / regular user hits the
                         admin section (defense-in-depth; the nav
                         link is already hidden for non-admins)
     • MovieFormModal  — Add / Edit movie form
     • AdminDashboard  — stats + searchable movie table + CRUD

   Video URL note: your catalog stores video URLs Base64-encoded
   (they are decoded by `getUrlInfo()` in app.js before playback).
   The form below encodes admin-entered URLs the same way so the
   existing player works with zero changes.
   ═══════════════════════════════════════════════════════════════ */

/* ─── VIDEO URL ENCODE/DECODE HELPERS ────────────────────────── */
const encodeVideoUrl = (url) => {
  try {
    return btoa(url.trim()); // matches the Base64 format of moviesData
  } catch (e) {
    return null; // URL contained non-Latin1 characters
  }
};

const decodeVideoUrl = (encoded) => {
  try {
    return atob(encoded);
  } catch (e) {
    return "";
  }
};

/* ─── GENRE OPTIONS ──────────────────────────────────────────── */
const ADMIN_CATEGORIES = [
  "Action", "Animation", "Sci-Fi", "Drama", "Thriller",
  "Horror", "Comedy", "Romance", "Crime", "Fantasy", "Documentary",
];

/* ─── TOAST STACK ────────────────────────────────────────────── */
const ToastStack = ({ toasts }) => (
  <div className="fixed bottom-5 right-5 z-[120] flex flex-col gap-2 pointer-events-none">
    {toasts.map((t) => (
      <div
        key={t.id}
        className={`toast-item px-4 py-3 rounded-xl text-sm font-medium shadow-2xl border animate-slide-up max-w-xs ${
          t.type === "error"
            ? "bg-red-950/95 border-red-500/40 text-red-300"
            : t.type === "info"
              ? "bg-dark-800/95 border-white/15 text-gray-200"
              : "bg-emerald-950/95 border-emerald-500/40 text-emerald-300"
        }`}
      >
        {t.message}
      </div>
    ))}
  </div>
);

/* ─── ACCESS DENIED (guest or regular user → admin section) ──── */
const AccessDenied = ({ isLoggedIn, onLogin, onGoHome }) => (
  <div className="pt-32 pb-24 px-4 flex items-center justify-center">
    <div className="max-w-md w-full bg-dark-800 border border-white/10 rounded-2xl p-10 text-center animate-scale-in">
      <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center">
        <AuthIcon name="shield" size={28} className="text-accent-red" />
      </div>
      <h2 className="text-2xl font-black text-white mb-2">Access Denied</h2>
      <p className="text-gray-400 text-sm mb-7">
        {isLoggedIn
          ? "This area is restricted to administrators. Your account does not have the required permissions."
          : "Please login with an administrator account to access the dashboard."}
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {isLoggedIn ? (
          <button
            onClick={onGoHome}
            className="px-6 py-3 bg-accent-red text-white rounded-xl font-bold text-sm hover:bg-red-600 transition-colors"
          >
            Back to Home
          </button>
        ) : (
          <>
            <button
              onClick={onLogin}
              className="px-6 py-3 bg-accent-red text-white rounded-xl font-bold text-sm hover:bg-red-600 transition-colors"
            >
              Login as Admin
            </button>
            <button
              onClick={onGoHome}
              className="px-6 py-3 bg-white/5 border border-white/10 text-gray-300 rounded-xl font-bold text-sm hover:bg-white/10 transition-colors"
            >
              Back to Home
            </button>
          </>
        )}
      </div>
    </div>
  </div>
);

/* ─── MOVIE FORM MODAL (Add / Edit) ──────────────────────────── */
const MovieFormModal = ({ initial, onClose, onSubmit }) => {
  const isEdit = !!(initial && initial.id);
  const defaults = {
    title: "", year: new Date().getFullYear(), rating: "",
    poster: "", backdrop: "", video: "",
    category: "Action", synopsis: "",
    runtime: "", director: "", cast: "",
    trending: false, popular: false, topRated: false,
  };
  const [form, setForm] = React.useState(() => ({
    ...defaults,
    ...(initial || {}),
    // Decode Base64 video URL for display; join cast array for editing
    video: initial ? decodeVideoUrl(initial.video) : "",
    cast: initial && Array.isArray(initial.cast) ? initial.cast.join(", ") : "",
  }));
  const [errors, setErrors] = React.useState({});
  const [saving, setSaving] = React.useState(false);

  const set = (key) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = "Title is required.";
    if (!form.poster.trim()) errs.poster = "Poster URL is required.";
    else if (!/^https?:\/\/.+/i.test(form.poster.trim()))
      errs.poster = "Must be a valid http(s) URL.";
    if (!form.video.trim()) errs.video = "Stream link is required.";
    else if (!/^https?:\/\/.+/i.test(form.video.trim()))
      errs.video = "Must be a valid http(s) URL.";
    if (!form.synopsis.trim()) errs.synopsis = "Description is required.";
    const encoded = encodeVideoUrl(form.video);
    if (form.video.trim() && !encoded)
      errs.video = "URL contains unsupported characters.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    setTimeout(() => {
      onSubmit({
        title: form.title.trim(),
        year: parseInt(form.year, 10) || new Date().getFullYear(),
        rating: Math.min(10, Math.max(0, parseFloat(form.rating) || 0)),
        genre: form.category,          // full genre string used by filters
        category: form.category,
        synopsis: form.synopsis.trim(),
        runtime: form.runtime.trim() || "N/A",
        director: form.director.trim() || "Unknown",
        cast: form.cast.split(",").map((s) => s.trim()).filter(Boolean),
        poster: form.poster.trim(),
        backdrop: form.backdrop.trim() || form.poster.trim(),
        video: encodeVideoUrl(form.video), // Base64, like moviesData
        trending: !!form.trending,
        popular: !!form.popular,
        topRated: !!form.topRated,
      });
      setSaving(false);
      onClose();
    }, 300);
  };

  const inputCls = (hasError) =>
    `w-full bg-dark-900 border ${
      hasError ? "border-red-500/60" : "border-white/10"
    } rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-accent-red/60 focus:ring-1 focus:ring-accent-red/40 transition-all`;

  const labelCls =
    "block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5";
  const err = (hasError) =>
    hasError ? <p className="text-red-400 text-xs mt-1">{hasError}</p> : null;

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 modal-backdrop animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-dark-800 border border-white/10 rounded-2xl shadow-2xl animate-scale-in max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <h3 className="text-lg font-bold text-white">
            {isEdit ? "Edit Movie" : "Add New Movie"}
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-scroll overflow-y-auto px-6 py-5 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className={labelCls}>Title *</label>
              <input className={inputCls(errors.title)} value={form.title}
                onChange={set("title")} placeholder="Movie title" />
              {err(errors.title)}
            </div>

            <div>
              <label className={labelCls}>Category / Genre *</label>
              <select className={inputCls()} value={form.category} onChange={set("category")}>
                {ADMIN_CATEGORIES.map((c) => (
                  <option key={c} value={c} className="bg-dark-800">{c}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Year</label>
                <input type="number" className={inputCls()} value={form.year}
                  onChange={set("year")} placeholder="2024" />
              </div>
              <div>
                <label className={labelCls}>Rating (0-10)</label>
                <input type="number" step="0.1" min="0" max="10" className={inputCls()}
                  value={form.rating} onChange={set("rating")} placeholder="7.5" />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className={labelCls}>Poster URL *</label>
              <input className={inputCls(errors.poster)} value={form.poster}
                onChange={set("poster")} placeholder="https://example.com/poster.jpg" />
              {err(errors.poster)}
            </div>

            <div className="sm:col-span-2">
              <label className={labelCls}>Backdrop URL (optional — falls back to poster)</label>
              <input className={inputCls()} value={form.backdrop}
                onChange={set("backdrop")} placeholder="https://example.com/backdrop.jpg" />
            </div>

            <div className="sm:col-span-2">
              <label className={labelCls}>Video / Stream Link *</label>
              <input className={inputCls(errors.video)} value={form.video}
                onChange={set("video")}
                placeholder="https://ok.ru/video/… or direct .mp4 / .m3u8 link" />
              {err(errors.video)}
              <p className="text-gray-600 text-[11px] mt-1">
                Supports OK.ru, Dailymotion, Google Drive, archive.org, direct MP4/M3U8.
              </p>
            </div>

            <div className="sm:col-span-2">
              <label className={labelCls}>Description *</label>
              <textarea rows="3" className={`${inputCls(errors.synopsis)} resize-none`}
                value={form.synopsis} onChange={set("synopsis")}
                placeholder="Short synopsis…" />
              {err(errors.synopsis)}
            </div>

            <div>
              <label className={labelCls}>Runtime</label>
              <input className={inputCls()} value={form.runtime}
                onChange={set("runtime")} placeholder="120 min" />
            </div>
            <div>
              <label className={labelCls}>Director</label>
              <input className={inputCls()} value={form.director}
                onChange={set("director")} placeholder="Director name" />
            </div>

            <div className="sm:col-span-2">
              <label className={labelCls}>Cast (comma-separated)</label>
              <input className={inputCls()} value={form.cast}
                onChange={set("cast")} placeholder="Actor One, Actor Two" />
            </div>
          </div>

          {/* Feature flags */}
          <div>
            <label className={labelCls}>Featured in rows</label>
            <div className="flex flex-wrap gap-2">
              {[
                ["trending", "Trending Now"],
                ["popular", "Popular"],
                ["topRated", "Top Rated"],
              ].map(([key, label]) => (
                <label key={key}
                  className={`toggle-pill ${form[key] ? "toggle-pill-on" : ""}`}>
                  <input type="checkbox" className="hidden"
                    checked={!!form[key]} onChange={set(key)} />
                  {label}
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving}
              className="flex-1 py-3 bg-accent-red hover:bg-red-600 disabled:opacity-60 text-white rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2">
              <AuthIcon name="save" size={16} />
              {saving ? "Saving…" : isEdit ? "Save Changes" : "Add Movie"}
            </button>
            <button type="button" onClick={onClose}
              className="px-6 py-3 bg-white/5 border border-white/10 text-gray-300 rounded-xl font-bold text-sm hover:bg-white/10 transition-colors">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* ─── ADMIN DASHBOARD ────────────────────────────────────────── */
const AdminDashboard = ({ movies, userCount, onAdd, onUpdate, onDelete }) => {
  const [search, setSearch] = React.useState("");
  const [formState, setFormState] = React.useState(null); // null | "new" | movie
  const [confirmDeleteId, setConfirmDeleteId] = React.useState(null);

  const filtered = movies.filter((m) => {
    const q = search.toLowerCase();
    return (
      m.title.toLowerCase().includes(q) ||
      (m.genre || "").toLowerCase().includes(q) ||
      (m.category || "").toLowerCase().includes(q)
    );
  });

  const genreCount = new Set(
    movies.map((m) => m.category || m.genre).filter(Boolean),
  ).size;

  const stats = [
    { label: "Total Movies", value: movies.length, icon: "film", tone: "red" },
    { label: "Total Users", value: userCount, icon: "users", tone: "purple" },
    { label: "Genres", value: genreCount, icon: "chart", tone: "pink" },
  ];

  const toneClasses = {
    red: "from-red-500/20 to-red-500/5 border-red-500/20 text-accent-red",
    purple: "from-purple-500/20 to-purple-500/5 border-purple-500/20 text-accent-purple",
    pink: "from-pink-500/20 to-pink-500/5 border-pink-500/20 text-accent-pink",
  };

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <AuthIcon name="shield" size={26} className="text-accent-red" />
            Admin Dashboard
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage the StreamVault catalog and monitor platform stats.
          </p>
        </div>
        <button
          onClick={() => setFormState("new")}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-accent-red hover:bg-red-600 text-white rounded-xl font-bold text-sm transition-all transform active:scale-[0.98]"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
          Add Movie
        </button>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label}
            className={`rounded-2xl border bg-gradient-to-br p-5 flex items-center gap-4 ${toneClasses[s.tone]}`}>
            <div className="w-12 h-12 rounded-xl bg-black/30 flex items-center justify-center">
              <AuthIcon name={s.icon} size={22} />
            </div>
            <div>
              <p className="text-2xl font-black text-white leading-none">{s.value}</p>
              <p className="text-gray-400 text-xs font-medium mt-1">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table card */}
      <div className="bg-dark-800 border border-white/10 rounded-2xl overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-5 border-b border-white/10">
          <h2 className="text-base font-bold text-white">Movie Catalog</h2>
          <div className="relative w-full sm:w-72">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search movies…"
              className="auth-input !py-2 !pl-10"
            />
          </div>
        </div>

        <div className="overflow-x-auto admin-table-scroll">
          <table className="admin-table">
            <thead>
              <tr>
                <th className="w-16">Poster</th>
                <th>Title</th>
                <th>Year</th>
                <th>Genre</th>
                <th>Rating</th>
                <th>Featured</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-12 text-gray-500">
                    {movies.length === 0
                      ? "No movies yet — click “Add Movie” to create the first one."
                      : `No results for “${search}”.`}
                  </td>
                </tr>
              )}
              {filtered.map((m) => (
                <tr key={m.id}>
                  <td>
                    <img src={m.poster} alt={m.title}
                      className="w-10 h-14 object-cover rounded-md bg-dark-600"
                      onError={(e) => { e.target.style.opacity = 0.2; }} />
                  </td>
                  <td>
                    <p className="font-semibold text-white text-sm max-w-[280px] truncate">
                      {m.title}
                    </p>
                    <p className="text-gray-500 text-xs max-w-[280px] truncate">
                      {m.director}
                    </p>
                  </td>
                  <td className="text-gray-300 text-sm">{m.year}</td>
                  <td>
                    <span className="admin-badge">{m.category || m.genre}</span>
                  </td>
                  <td className="text-gray-300 text-sm">
                    <span className="inline-flex items-center gap-1">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="#facc15"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                      {m.rating}
                    </span>
                  </td>
                  <td>
                    <div className="flex flex-wrap gap-1">
                      {m.trending && <span className="admin-badge admin-badge-red">Trending</span>}
                      {m.popular && <span className="admin-badge admin-badge-purple">Popular</span>}
                      {m.topRated && <span className="admin-badge admin-badge-pink">Top Rated</span>}
                      {!m.trending && !m.popular && !m.topRated && (
                        <span className="text-gray-600 text-xs">—</span>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setFormState(m)}
                        title="Edit"
                        className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-colors">
                        <AuthIcon name="edit" size={15} />
                      </button>
                      {confirmDeleteId === m.id ? (
                        <button
                          onClick={() => { onDelete(m.id); setConfirmDeleteId(null); }}
                          onMouseLeave={() => setConfirmDeleteId(null)}
                          title="Click again to confirm"
                          className="px-3 py-2 rounded-lg bg-red-600 text-white text-xs font-bold hover:bg-red-500 transition-colors animate-fade-in">
                          Confirm?
                        </button>
                      ) : (
                        <button
                          onClick={() => setConfirmDeleteId(m.id)}
                          title="Delete"
                          className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-red-400 hover:border-red-500/40 transition-colors">
                          <AuthIcon name="trash" size={15} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-5 py-3 border-t border-white/10 text-xs text-gray-500">
          Showing {filtered.length} of {movies.length} movies
        </div>
      </div>

      {/* Add / Edit modal */}
      {formState && (
        <MovieFormModal
          initial={formState === "new" ? null : formState}
          onClose={() => setFormState(null)}
          onSubmit={(payload) =>
            formState === "new"
              ? onAdd(payload)
              : onUpdate(formState.id, payload)
          }
        />
      )}
    </div>
  );
};

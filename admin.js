const { useState, useEffect, useMemo, useCallback } = React;

const logout = () => {
  if (window.SV_AUTH) {
    SV_AUTH.logout();
  } else {
    sessionStorage.removeItem("sv_admin_auth");
    localStorage.removeItem("sv_session");
  }
  window.location.replace("login.html");
};

const STORAGE_KEY = "sv_movies";
const DEFAULT_CATEGORIES = ["Action", "Animation", "Horror", "Romance", "Drama", "Thriller", "Adventure", "Crime"];

const decodeVideo = (encoded) => {
  if (!encoded) return "";
  const value = String(encoded).trim();
  if (/^(https?:)?\/\//i.test(value) || /^(blob:|data:)/i.test(value)) return value;

  const compact = value.replace(/[\r\n\t]/g, "").trim().replace(/ /g, "+");
  try {
    const normalized = compact.replace(/-/g, "+").replace(/_/g, "/");
    const padding = (4 - (normalized.length % 4)) % 4;
    const decoded = atob(normalized + "===".slice(0, padding)).trim();
    if (/^(https?:|blob:|data:|\/\/)/i.test(decoded)) return decoded;
  } catch (e) { }
  return value;
};

const encodeVideo = (url) => {
  const trimmed = (url || "").trim().replace(/\s+/g, "");
  if (!trimmed) return "";
  if (/^(?:https?:\/\/|\/\/)/i.test(trimmed)) {
    try {
      return btoa(trimmed);
    } catch (e) {
      return trimmed;
    }
  }
  // Already Base64 (or another format) — keep it as entered.
  return trimmed;
};

async function loadMovies() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (Array.isArray(stored) && stored.length) return stored;

    const src = await (await fetch("app.js")).text();
    const start = src.indexOf("const _baseMoviesData = [");
    if (start !== -1) {
      const end = src.indexOf("\n];", start);
      if (end !== -1) {
        const extract = new Function(
          src.slice(start, end + 3) + "\nreturn _baseMoviesData;"
        );
        const base = extract();
        if (Array.isArray(base) && base.length) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(base));
          return base;
        }
      }
    }
  } catch (e) {}
  return [];
}

const saveMovies = (movies) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
};

const Icon = ({ d, className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d={d} />
  </svg>
);

const ICONS = {
  dashboard: "M3 12l9-9 9 9M5 10v10h5v-6h4v6h5V10",
  movies: "M7 4v16M17 4v16M3 8h18M3 16h18M3 4h18v16H3z",
  plus: "M12 4v16m8-8H4",
  search: "M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z",
  edit: "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7m-9.5-9.5a2.121 2.121 0 013-3L21 8.5a2.121 2.121 0 01-3 3L9.5 5.5z",
  trash: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M4 7h16m-4-4H8m3 4V4a1 1 0 011-1h1a1 1 0 011 1v3",
  logout: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1",
  close: "M6 18L18 6M6 6l12 12",
  star: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
  film: "M7 4v16M17 4v16M3 8h18M3 16h18M3 4h18v16H3z",
  fire: "M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.5-7 1 2 5 4.5 5 9a5.5 5.5 0 01-1.343 3.657z",
  download: "M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2",
  refresh: "M4 4v5h5M20 20v-5h-5M4 9a8 8 0 0114.93-3M20 15a8 8 0 01-14.93 3",
  menu: "M4 6h16M4 12h16M4 18h16",
};

const Toast = ({ message, type, onDone }) => {
  useEffect(() => {
    const t = setTimeout(onDone, 2500);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className={`fixed bottom-6 right-6 z-[60] animate-slide-up px-5 py-3 rounded-xl text-sm font-medium shadow-2xl border ${
      type === "error"
        ? "bg-accent-red/15 border-accent-red/40 text-red-300"
        : "bg-emerald-500/15 border-emerald-500/40 text-emerald-300"
    }`}>
      {message}
    </div>
  );
};

const StatCard = ({ label, value, icon, accent }) => (
  <div className="bg-dark-800 border border-dark-600 rounded-2xl p-5 flex items-center gap-4 hover:border-dark-500 transition animate-scale-in">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${accent}`}>
      <Icon d={icon} className="w-6 h-6" />
    </div>
    <div>
      <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">{label}</p>
      <p className="text-2xl font-bold mt-0.5">{value}</p>
    </div>
  </div>
);

const Dashboard = ({ movies, onGoMovies }) => {
  const stats = useMemo(() => {
    const cats = {};
    movies.forEach((m) => {
      const c = (m.category || "Other").trim();
      cats[c] = (cats[c] || 0) + 1;
    });
    const ratings = movies.filter((m) => typeof m.rating === "number");
    return {
      total: movies.length,
      categories: Object.keys(cats).length,
      trending: movies.filter((m) => m.trending).length,
      avgRating: ratings.length
        ? (ratings.reduce((s, m) => s + m.rating, 0) / ratings.length).toFixed(1)
        : "—",
      cats,
      recent: [...movies].sort((a, b) => (b.id || 0) - (a.id || 0)).slice(0, 5),
    };
  }, [movies]);

  const maxCat = Math.max(1, ...Object.values(stats.cats));

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Total Movies" value={stats.total} icon={ICONS.film} accent="bg-accent-red/15 text-accent-red" />
        <StatCard label="Categories" value={stats.categories} icon={ICONS.dashboard} accent="bg-accent-purple/15 text-accent-purple" />
        <StatCard label="Trending" value={stats.trending} icon={ICONS.fire} accent="bg-orange-500/15 text-orange-400" />
        <StatCard label="Avg Rating" value={stats.avgRating} icon={ICONS.star} accent="bg-yellow-500/15 text-yellow-400" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-dark-800 border border-dark-600 rounded-2xl p-6">
          <h3 className="font-semibold mb-5">Movies by Category</h3>
          <div className="space-y-3">
            {Object.entries(stats.cats)
              .sort((a, b) => b[1] - a[1])
              .map(([cat, count]) => (
                <div key={cat} className="flex items-center gap-3">
                  <span className="text-sm text-gray-400 w-24 truncate">{cat}</span>
                  <div className="flex-1 bg-dark-700 rounded-full h-2.5 overflow-hidden">
                    <div className="bg-gradient-to-r from-accent-red to-accent-pink h-full rounded-full transition-all duration-500"
                      style={{ width: `${(count / maxCat) * 100}%` }} />
                  </div>
                  <span className="text-sm font-semibold w-8 text-right">{count}</span>
                </div>
              ))}
          </div>
        </div>

        <div className="bg-dark-800 border border-dark-600 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold">Recently Added</h3>
            <button onClick={onGoMovies} className="text-xs text-accent-red hover:text-red-400 font-medium transition">
              View all →
            </button>
          </div>
          <div className="space-y-3">
            {stats.recent.map((m) => (
              <div key={m.id} className="flex items-center gap-3 bg-dark-700/50 rounded-xl p-2.5">
                <img src={m.poster} alt={m.title} className="w-9 h-12 rounded-lg object-cover flex-shrink-0"
                  onError={(e) => { e.target.style.visibility = "hidden"; }} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">{m.title}</p>
                  <p className="text-xs text-gray-500">{m.year} · {m.category}</p>
                </div>
                <span className="text-xs font-bold text-yellow-400 flex items-center gap-1">
                  <Icon d={ICONS.star} className="w-3.5 h-3.5" />{m.rating}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const MovieModal = ({ movie, onClose, onSave }) => {
  const isEdit = !!movie;
  const [form, setForm] = useState(() => ({
    title: movie?.title || "",
    year: movie?.year || new Date().getFullYear(),
    rating: movie?.rating || 7.0,
    genre: movie?.genre || "",
    category: movie?.category || "Action",
    poster: movie?.poster || "",
    backdrop: movie?.backdrop || "",
    synopsis: movie?.synopsis || "",
    runtime: movie?.runtime || "",
    director: movie?.director || "",
    cast: movie?.cast ? movie.cast.join(", ") : "",
    videoUrl: decodeVideo(movie?.video),
    trending: movie?.trending ?? true,
    popular: movie?.popular ?? true,
    topRated: movie?.topRated ?? false,
  }));
  const [errors, setErrors] = useState({});

  const set = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.title.trim()) errs.title = "Title is required";
    if (!form.poster.trim()) errs.poster = "Poster URL is required";
    if (!form.videoUrl.trim()) errs.videoUrl = "Video URL is required";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    const data = {
      title: form.title.trim(),
      year: Number(form.year) || new Date().getFullYear(),
      rating: Number(form.rating) || 0,
      genre: form.genre.trim(),
      category: form.category.trim() || "Action",
      poster: form.poster.trim(),
      backdrop: (form.backdrop.trim() || form.poster.trim()),
      synopsis: form.synopsis.trim(),
      runtime: form.runtime.trim(),
      director: form.director.trim() || "Unknown",
      cast: form.cast.split(",").map((s) => s.trim()).filter(Boolean),
      trending: form.trending,
      popular: form.popular,
      topRated: form.topRated,
      video: encodeVideo(form.videoUrl),
    };
    onSave(data, isEdit);
  };

  const field = "w-full bg-dark-700 border border-dark-500 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-accent-red focus:ring-2 focus:ring-accent-red/20 transition placeholder-gray-600";
  const label = "block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1.5";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <form onSubmit={submit}
        className="bg-dark-800 border border-dark-600 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-scale-in"
        onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-dark-800/95 backdrop-blur border-b border-dark-600 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-lg font-bold">{isEdit ? "Edit Movie" : "Add New Movie"}</h2>
          <button type="button" onClick={onClose} className="text-gray-500 hover:text-white transition p-1 rounded-lg hover:bg-dark-700">
            <Icon d={ICONS.close} />
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className={label}>Title *</label>
            <input className={field} placeholder="Movie title" value={form.title} onChange={set("title")} />
            {errors.title && <p className="text-accent-red text-xs mt-1">{errors.title}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={label}>Year</label>
              <input type="number" className={field} value={form.year} onChange={set("year")} />
            </div>
            <div>
              <label className={label}>Rating (0-10)</label>
              <input type="number" step="0.1" min="0" max="10" className={field} value={form.rating} onChange={set("rating")} />
            </div>
          </div>

          <div>
            <label className={label}>Category</label>
            <select className={field} value={form.category} onChange={set("category")}>
              {[...new Set([...DEFAULT_CATEGORIES, form.category])].filter(Boolean).map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className={label}>Genre</label>
            <input className={field} placeholder="Action, Drama, Sci-Fi" value={form.genre} onChange={set("genre")} />
          </div>

          <div>
            <label className={label}>Poster URL *</label>
            <input className={field} placeholder="https://..." value={form.poster} onChange={set("poster")} />
            {errors.poster && <p className="text-accent-red text-xs mt-1">{errors.poster}</p>}
          </div>

          <div>
            <label className={label}>Backdrop URL</label>
            <input className={field} placeholder="Leave empty to use poster" value={form.backdrop} onChange={set("backdrop")} />
          </div>

          <div className="md:col-span-2">
            <label className={label}>Synopsis</label>
            <textarea rows="3" className={field + " resize-none"} placeholder="Movie description..." value={form.synopsis} onChange={set("synopsis")} />
          </div>

          <div>
            <label className={label}>Runtime</label>
            <input className={field} placeholder="120 min" value={form.runtime} onChange={set("runtime")} />
          </div>

          <div>
            <label className={label}>Director</label>
            <input className={field} placeholder="Director name" value={form.director} onChange={set("director")} />
          </div>

          <div className="md:col-span-2">
            <label className={label}>Cast (comma separated)</label>
            <input className={field} placeholder="Actor 1, Actor 2, Actor 3" value={form.cast} onChange={set("cast")} />
          </div>

          <div className="md:col-span-2">
            <label className={label}>Video URL (direct link / embed) *</label>
            <input className={field} placeholder="https://... or embed URL (auto-encoded on save)" value={form.videoUrl} onChange={set("videoUrl")} />
            {errors.videoUrl && <p className="text-accent-red text-xs mt-1">{errors.videoUrl}</p>}
          </div>

          <div className="md:col-span-2 flex flex-wrap gap-6 pt-1">
            {[["trending", "Trending"], ["popular", "Popular"], ["topRated", "Top Rated"]].map(([key, text]) => (
              <label key={key} className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer select-none">
                <input type="checkbox" checked={form[key]} onChange={set(key)}
                  className="w-4 h-4 rounded bg-dark-700 border-dark-500 accent-red-600" />
                {text}
              </label>
            ))}
          </div>
        </div>

        <div className="sticky bottom-0 bg-dark-800/95 backdrop-blur border-t border-dark-600 px-6 py-4 flex justify-end gap-3">
          <button type="button" onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-dark-700 transition">
            Cancel
          </button>
          <button type="submit"
            className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-accent-red hover:bg-red-700 shadow-lg shadow-accent-red/20 transition">
            {isEdit ? "Save Changes" : "Add Movie"}
          </button>
        </div>
      </form>
    </div>
  );
};

const MoviesView = ({ movies, search, setSearch, onEdit, onDelete, onAdd }) => {
  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return movies;
    return movies.filter(
      (m) =>
        (m.title || "").toLowerCase().includes(q) ||
        (m.category || "").toLowerCase().includes(q) ||
        (m.genre || "").toLowerCase().includes(q)
    );
  }, [movies, search]);

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Icon d={ICONS.search} className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, category or genre..."
            className="w-full bg-dark-800 border border-dark-600 rounded-xl pl-11 pr-4 py-2.5 text-sm outline-none focus:border-accent-red focus:ring-2 focus:ring-accent-red/20 transition placeholder-gray-600"
          />
        </div>
        <button onClick={onAdd}
          className="flex items-center justify-center gap-2 bg-accent-red hover:bg-red-700 px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-accent-red/20 transition active:scale-[0.98]">
          <Icon d={ICONS.plus} className="w-4 h-4" /> Add Movie
        </button>
      </div>

      <div className="bg-dark-800 border border-dark-600 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[720px]">
            <thead>
              <tr className="text-left text-gray-500 text-xs uppercase tracking-wider border-b border-dark-600">
                <th className="px-5 py-3.5 font-medium">Movie</th>
                <th className="px-3 py-3.5 font-medium">Category</th>
                <th className="px-3 py-3.5 font-medium">Year</th>
                <th className="px-3 py-3.5 font-medium">Rating</th>
                <th className="px-3 py-3.5 font-medium">Flags</th>
                <th className="px-5 py-3.5 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((m) => (
                <tr key={m.id} className="border-b border-dark-700 last:border-0 hover:bg-dark-700/40 transition">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <img src={m.poster} alt="" className="w-9 h-12 rounded-lg object-cover flex-shrink-0"
                        onError={(e) => { e.target.style.visibility = "hidden"; }} />
                      <div className="min-w-0 max-w-[280px]">
                        <p className="font-medium truncate">{m.title}</p>
                        <p className="text-xs text-gray-500 truncate">{m.genre}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <span className="bg-dark-700 border border-dark-500 text-gray-300 text-xs px-2.5 py-1 rounded-full">{m.category}</span>
                  </td>
                  <td className="px-3 py-3 text-gray-400">{m.year}</td>
                  <td className="px-3 py-3">
                    <span className="text-yellow-400 font-semibold flex items-center gap-1">
                      <Icon d={ICONS.star} className="w-3.5 h-3.5" />{m.rating}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex gap-1.5 flex-wrap">
                      {m.trending && <span className="bg-orange-500/15 text-orange-400 text-[10px] font-bold px-2 py-0.5 rounded">T</span>}
                      {m.popular && <span className="bg-accent-pink/15 text-accent-pink text-[10px] font-bold px-2 py-0.5 rounded">P</span>}
                      {m.topRated && <span className="bg-emerald-500/15 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded">TR</span>}
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => onEdit(m)} title="Edit"
                        className="p-2 rounded-lg bg-dark-700 border border-dark-500 text-gray-400 hover:text-white hover:border-accent-purple transition">
                        <Icon d={ICONS.edit} className="w-4 h-4" />
                      </button>
                      <button onClick={() => onDelete(m)} title="Delete"
                        className="p-2 rounded-lg bg-dark-700 border border-dark-500 text-gray-400 hover:text-accent-red hover:border-accent-red/50 transition">
                        <Icon d={ICONS.trash} className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {!filtered.length && (
                <tr>
                  <td colSpan="6" className="px-5 py-16 text-center text-gray-500">
                    {movies.length ? "No movies match your search." : "No movies yet. Click “Add Movie” to get started."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <p className="text-xs text-gray-600 mt-3 text-center">
        Showing {filtered.length} of {movies.length} movies
      </p>
    </div>
  );
};

const ConfirmDelete = ({ movie, onClose, onConfirm }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
    <div className="bg-dark-800 border border-dark-600 rounded-2xl p-6 w-full max-w-sm animate-scale-in" onClick={(e) => e.stopPropagation()}>
      <div className="w-12 h-12 rounded-full bg-accent-red/15 text-accent-red flex items-center justify-center mx-auto mb-4">
        <Icon d={ICONS.trash} className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-bold text-center">Delete movie?</h3>
      <p className="text-gray-500 text-sm text-center mt-2">
        “{movie.title}” will be permanently removed from your site.
      </p>
      <div className="flex gap-3 mt-6">
        <button onClick={onClose}
          className="flex-1 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-dark-700 transition">
          Cancel
        </button>
        <button onClick={() => onConfirm(movie.id)}
          className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-accent-red hover:bg-red-700 shadow-lg shadow-accent-red/20 transition">
          Delete
        </button>
      </div>
    </div>
  </div>
);

const App = () => {
  const [movies, setMovies] = useState([]);
  const [view, setView] = useState("dashboard");
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [toast, setToast] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    loadMovies().then(setMovies);
  }, []);

  const persist = useCallback((next) => {
    setMovies(next);
    saveMovies(next);
  }, []);

  const showToast = (message, type = "success") => setToast({ message, type });

  const handleSave = (data, isEdit) => {
    if (isEdit) {
      persist(movies.map((m) => (m.id === editing.id ? { ...m, ...data } : m)));
      showToast("Movie updated successfully");
    } else {
      const maxId = movies.reduce((max, m) => Math.max(max, m.id || 0), 0);
      persist([{ ...data, id: maxId + 1 }, ...movies]);
      showToast("Movie added successfully");
    }
    setModalOpen(false);
    setEditing(null);
  };

  const handleDelete = (id) => {
    persist(movies.filter((m) => m.id !== id));
    setDeleting(null);
    showToast("Movie deleted");
  };

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(movies, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "streamvault-movies.json";
    a.click();
    URL.revokeObjectURL(a.href);
    showToast("Movies exported as JSON");
  };

  const resetDefaults = () => {
    localStorage.removeItem(STORAGE_KEY);
    loadMovies().then((base) => {
      setMovies(base);
      showToast("Reset to site defaults");
    });
  };

  const navItems = [
    { key: "dashboard", label: "Dashboard", icon: ICONS.dashboard },
    { key: "movies", label: "Movies", icon: ICONS.movies },
  ];

  const sessionUser = window.SV_AUTH ? SV_AUTH.getUser() : null;
  const username = (sessionUser && (sessionUser.name || sessionUser.username)) || "admin";

  return (
    <div className="flex min-h-screen">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/70 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`fixed lg:sticky top-0 z-40 h-screen w-64 bg-dark-800 border-r border-dark-600 flex flex-col transition-transform duration-200 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0`}>
        <div className="flex items-center gap-3 px-5 py-5 border-b border-dark-600">
          <img src="logo (2).png" alt="" className="w-10 h-10 rounded-xl object-contain" onError={(e) => { e.target.style.display = "none"; }} />
          <div>
            <p className="font-extrabold leading-tight">Stream<span className="text-accent-red">Vault</span></p>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest">Admin Panel</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <button key={item.key}
              onClick={() => { setView(item.key); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition ${
                view === item.key
                  ? "bg-accent-red/15 text-accent-red border border-accent-red/25"
                  : "text-gray-400 hover:text-white hover:bg-dark-700 border border-transparent"
              }`}>
              <Icon d={item.icon} />
              {item.label}
            </button>
          ))}

          <div className="pt-3 mt-3 border-t border-dark-600 space-y-1">
            <button onClick={exportJson}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-dark-700 transition">
              <Icon d={ICONS.download} /> Export JSON
            </button>
            <button onClick={resetDefaults}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-dark-700 transition">
              <Icon d={ICONS.refresh} /> Reset to Defaults
            </button>
          </div>
        </nav>

        <div className="p-4 border-t border-dark-600">
          <button onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-accent-red hover:bg-accent-red/10 transition">
            <Icon d={ICONS.logout} /> Log out
          </button>
        </div>
      </aside>

      <main className="flex-1 min-w-0">
        <header className="sticky top-0 z-20 bg-dark-900/90 backdrop-blur border-b border-dark-600 px-5 sm:px-8 py-4 flex items-center gap-4">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-400 hover:text-white transition">
            <Icon d={ICONS.menu} />
          </button>
          <h1 className="text-xl font-bold capitalize flex-1">{view}</h1>
          <div className="flex items-center gap-3">
            <a href="index.html" target="_blank"
              className="hidden sm:flex items-center gap-2 text-xs text-gray-400 hover:text-white border border-dark-600 hover:border-dark-500 rounded-lg px-3 py-2 transition">
              <Icon d={ICONS.film} className="w-3.5 h-3.5" /> View Site
            </a>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent-red to-accent-purple flex items-center justify-center font-bold text-sm">
              {username.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        <div className="p-5 sm:p-8">
          {view === "dashboard" ? (
            <Dashboard movies={movies} onGoMovies={() => setView("movies")} />
          ) : (
            <MoviesView
              movies={movies}
              search={search}
              setSearch={setSearch}
              onAdd={() => { setEditing(null); setModalOpen(true); }}
              onEdit={(m) => { setEditing(m); setModalOpen(true); }}
              onDelete={(m) => setDeleting(m)}
            />
          )}
        </div>
      </main>

      {modalOpen && (
        <MovieModal
          movie={editing}
          onClose={() => { setModalOpen(false); setEditing(null); }}
          onSave={handleSave}
        />
      )}

      {deleting && (
        <ConfirmDelete movie={deleting} onClose={() => setDeleting(null)} onConfirm={handleDelete} />
      )}

      {toast && <Toast message={toast.message} type={toast.type} onDone={() => setToast(null)} />}
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

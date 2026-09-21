/* ═══════════════════════════════════════════════════════════════
   StreamVault — Auth Service + Auth Modal
   -----------------------------------------------------------------
   A complete LocalStorage-based mock authentication system.

   ⚠️  SECURITY NOTICE (read before deploying):
   This module exists so the frontend can be developed and tested
   without a backend. Passwords are hashed with a fast, NON-secure
   hash and stored in the browser's LocalStorage — anyone with
   access to the machine can read/modify them. For production,
   replace `AuthService`'s internals with calls to a real backend
   (Node.js + Express + bcrypt/JWT, or Supabase/ Firebase Auth).
   The rest of the app only talks to `AuthService`, so nothing
   else needs to change.

   Storage layout:
     sv_users   → [{ id, name, email, role, salt, passwordHash, createdAt }]
     sv_session → { token, userId, createdAt, expiresAt }
   ═══════════════════════════════════════════════════════════════ */

/* ─── STORAGE KEYS ─────────────────────────────────────────────
   Single source of truth, also consumed by app.js / admin.js   */
const STORAGE_KEYS = {
  USERS: "sv_users",
  SESSION: "sv_session",
  MOVIES: "sv_movies",
};

const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const ADMIN_EMAIL = "lyheangsan89@gmail.com";
const ADMIN_PASSWORD = "sanlyheang123"; // seeded on first launch only

/* ─── PASSWORD HASHING (mock — NOT cryptographically secure) ─── */
const makeSalt = () =>
  Math.random().toString(36).slice(2) + Date.now().toString(36);

const hashPassword = (password, salt) => {
  const str = salt + "::" + password;
  let h1 = 0xdeadbeef;
  let h2 = 0x41c6ce57;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 =
    Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^
    Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 =
    Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^
    Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (h2 >>> 0).toString(16) + (h1 >>> 0).toString(16);
};

/* ─── AUTH SERVICE ─────────────────────────────────────────────
   All authentication logic lives behind this single object.
   Swap these methods with API calls when a backend is added.   */
const AuthService = {
  /* Seed an admin account on first launch so the dashboard is
     reachable immediately (admin@streamvault.com / admin123).  */
  seedAdmin() {
    const users = this.getUsers();
    if (users.some((u) => u.role === "admin")) return;
    const salt = makeSalt();
    users.push({
      id: "admin-" + Date.now(),
      name: "Admin",
      email: ADMIN_EMAIL,
      role: "admin",
      salt,
      passwordHash: hashPassword(ADMIN_PASSWORD, salt),
      createdAt: new Date().toISOString(),
    });
    this._saveUsers(users);
  },

  getUsers() {
    try {
      const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS));
      return Array.isArray(users) ? users : [];
    } catch (e) {
      return [];
    }
  },

  _saveUsers(users) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  },

  /* Strip sensitive fields before handing a user to the UI.    */
  _publicUser(user) {
    if (!user) return null;
    const { salt, passwordHash, ...safe } = user;
    return safe;
  },

  register({ name, email, password }) {
    this.seedAdmin();
    const users = this.getUsers();
    const normalizedEmail = email.trim().toLowerCase();

    if (users.some((u) => u.email === normalizedEmail)) {
      return { ok: false, error: "An account with this email already exists." };
    }

    const salt = makeSalt();
    const user = {
      id: "user-" + Date.now(),
      name: name.trim(),
      email: normalizedEmail,
      role: "user", // new sign-ups are always regular viewers
      salt,
      passwordHash: hashPassword(password, salt),
      createdAt: new Date().toISOString(),
    };
    users.push(user);
    this._saveUsers(users);
    this._startSession(user);
    return { ok: true, user: this._publicUser(user) };
  },

  login({ email, password }) {
    this.seedAdmin();
    const normalizedEmail = email.trim().toLowerCase();
    const user = this.getUsers().find((u) => u.email === normalizedEmail);

    if (!user || user.passwordHash !== hashPassword(password, user.salt)) {
      return { ok: false, error: "Invalid email or password." };
    }

    this._startSession(user);
    return { ok: true, user: this._publicUser(user) };
  },

  logout() {
    localStorage.removeItem(STORAGE_KEYS.SESSION);
  },

  _startSession(user) {
    const session = {
      token:
        Math.random().toString(36).slice(2) +
        Math.random().toString(36).slice(2) +
        Date.now().toString(36),
      userId: user.id,
      createdAt: Date.now(),
      expiresAt: Date.now() + SESSION_DURATION_MS,
    };
    localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));
  },

  /* Returns the logged-in user (sanitized) or null. Validates
     the session token and its expiry on every call.            */
  getSession() {
    this.seedAdmin();
    try {
      const session = JSON.parse(localStorage.getItem(STORAGE_KEYS.SESSION));
      if (!session || session.expiresAt < Date.now()) return null;
      const user = this.getUsers().find((u) => u.id === session.userId);
      return this._publicUser(user);
    } catch (e) {
      return null;
    }
  },

  /* Helper: promote/demote an account (use from the console:
     AuthService.setRole("someone@mail.com", "admin") )          */
  setRole(email, role) {
    const users = this.getUsers();
    const user = users.find((u) => u.email === email.toLowerCase());
    if (!user) return false;
    user.role = role === "admin" ? "admin" : "user";
    this._saveUsers(users);
    return true;
  },
};

/* ─── EXTRA ICONS (auth + admin UI) ──────────────────────────── */
const AuthIcon = ({ name, size = 20, className = "" }) => {
  const icons = {
    mail: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></svg>
    ),
    lock: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
    ),
    eye: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
    ),
    eyeOff: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 10 8 10 8a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 8 10 8a9.74 9.74 0 0 0 5.39-1.61" /><path d="m2 2 20 20" /><path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" /></svg>
    ),
    logout: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="m16 17 5-5-5-5" /><path d="M21 12H9" /></svg>
    ),
    shield: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /></svg>
    ),
    users: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
    ),
    edit: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /></svg>
    ),
    trash: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 6h18" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
    ),
    chart: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 3v16a2 2 0 0 0 2 2h16" /><path d="M18 17V9" /><path d="M13 17V5" /><path d="M8 17v-3" /></svg>
    ),
    save: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" /><path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7" /><path d="M7 3v4a1 1 0 0 0 1 1h7" /></svg>
    ),
  };
  return icons[name] || null;
};

/* ─── AUTH MODAL (Login / Register) ────────────────────────────
   `initialMode` = "login" | "register"                          */
const AuthModal = ({ initialMode = "login", onClose, onSuccess }) => {
  const [mode, setMode] = React.useState(initialMode);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  // Reset the form whenever the user switches tabs.
  React.useEffect(() => {
    setError("");
  }, [mode]);

  const validate = () => {
    if (mode === "register" && name.trim().length < 2)
      return "Please enter your name (min. 2 characters).";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      return "Please enter a valid email address.";
    if (password.length < 6)
      return "Password must be at least 6 characters long.";
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setLoading(true);
    // Simulate a short network round-trip for realistic UX.
    setTimeout(() => {
      const result =
        mode === "login"
          ? AuthService.login({ email, password })
          : AuthService.register({ name, email, password });
      setLoading(false);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      onSuccess(result.user);
    }, 400);
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setError("");
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 modal-backdrop animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-dark-800 border border-white/10 rounded-2xl shadow-2xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-accent-red to-accent-pink rounded-lg flex items-center justify-center">
              <AuthIcon name="shield" size={16} className="text-white" />
            </div>
            <span className="text-lg font-bold text-white">
              Stream<span className="text-accent-red">Vault</span>
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Mode tabs */}
        <div className="mx-6 mt-5 flex bg-dark-900 rounded-xl p-1 border border-white/5">
          {["login", "register"].map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => switchMode(m)}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold capitalize transition-all ${mode === m
                ? "bg-accent-red text-white"
                : "text-gray-400 hover:text-white"
                }`}
            >
              {m === "login" ? "Login" : "Register"}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
          {mode === "register" && (
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                Full name
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="auth-input"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
              Email
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500">
                <AuthIcon name="mail" size={18} />
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="auth-input"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500">
                <AuthIcon name="lock" size={18} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={mode === "register" ? "Min. 6 characters" : "Your password"}
                className="auth-input pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <AuthIcon name={showPassword ? "eyeOff" : "eye"} size={18} />
              </button>
            </div>
          </div>

          {error && (
            <div className="px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm animate-fade-in">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-accent-red hover:bg-red-600 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-xl font-bold text-sm transition-all transform active:scale-[0.98]"
          >
            {loading
              ? "Please wait..."
              : mode === "login"
                ? "Login"
                : "Create account"}
          </button>

          <p className="text-center text-xs text-gray-500">
            {mode === "login" ? (
              <>
                New to StreamVault?{" "}
                <button
                  type="button"
                  onClick={() => switchMode("register")}
                  className="text-accent-red font-semibold hover:underline"
                >
                  Create an account
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => switchMode("login")}
                  className="text-accent-red font-semibold hover:underline"
                >
                  Login
                </button>
              </>
            )}
          </p>

          {/* Dev hint — remove in production */}
          <p className="text-center text-[11px] text-gray-600 border-t border-white/5 pt-3">
            Welcome to StreamVault!
          </p>
        </form>
      </div>
    </div>
  );
};

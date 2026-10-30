/* StreamVault shared auth service.
 *
 * Plain JavaScript (no JSX) so it can be loaded by login.html, admin.html and
 * index.html/app.js. Load it BEFORE admin.js / app.js on every page.
 *
 * Passwords are never stored or shipped in clear text: only a SHA-256 digest is
 * kept, both for the built-in admin account and for accounts saved in the
 * browser. The public build is minified + obfuscated (see scripts/obfuscate.js).
 *
 * NOTE: this is still a front-end only demo. Anyone with access to the device
 * can read localStorage and inspect the loaded scripts, so real protection
 * requires checking credentials on a server.
 */
(function (global) {
  "use strict";

  const SESSION_KEY = "sv_session";
  const USERS_KEY = "sv_users";
  const LEGACY_KEY = "sv_admin_auth"; // written by the old login page

  // ─── SHA-256 (small, dependency-free) ─────────────────────
  const sha256 = (function () {
    const K = [
      0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1,
      0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
      0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786,
      0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
      0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147,
      0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
      0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b,
      0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
      0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a,
      0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
      0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
    ];
    const rotr = (x, n) => (x >>> n) | (x << (32 - n));

    return function (input) {
      const text = unescape(encodeURIComponent(String(input)));
      const bytes = [];
      for (let i = 0; i < text.length; i++) bytes.push(text.charCodeAt(i));

      const bitLength = bytes.length * 8;
      bytes.push(0x80);
      while (bytes.length % 64 !== 56) bytes.push(0);
      const high = Math.floor(bitLength / 4294967296);
      bytes.push(
        (high >>> 24) & 0xff,
        (high >>> 16) & 0xff,
        (high >>> 8) & 0xff,
        high & 0xff,
        (bitLength >>> 24) & 0xff,
        (bitLength >>> 16) & 0xff,
        (bitLength >>> 8) & 0xff,
        bitLength & 0xff,
      );

      let H = [
        0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
        0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19,
      ];
      const w = new Array(64);

      for (let offset = 0; offset < bytes.length; offset += 64) {
        for (let i = 0; i < 16; i++) {
          const j = offset + i * 4;
          w[i] =
            ((bytes[j] << 24) |
              (bytes[j + 1] << 16) |
              (bytes[j + 2] << 8) |
              bytes[j + 3]) >>>
            0;
        }
        for (let i = 16; i < 64; i++) {
          const x = w[i - 15];
          const y = w[i - 2];
          const s0 = rotr(x, 7) ^ rotr(x, 18) ^ (x >>> 3);
          const s1 = rotr(y, 17) ^ rotr(y, 19) ^ (y >>> 10);
          w[i] = (w[i - 16] + s0 + w[i - 7] + s1) >>> 0;
        }

        let a = H[0], b = H[1], c = H[2], d = H[3];
        let e = H[4], f = H[5], g = H[6], h = H[7];

        for (let i = 0; i < 64; i++) {
          const S1 = rotr(e, 6) ^ rotr(e, 11) ^ rotr(e, 25);
          const ch = (e & f) ^ (~e & g);
          const t1 = (h + S1 + ch + K[i] + w[i]) >>> 0;
          const S0 = rotr(a, 2) ^ rotr(a, 13) ^ rotr(a, 22);
          const maj = (a & b) ^ (a & c) ^ (b & c);
          const t2 = (S0 + maj) >>> 0;

          h = g;
          g = f;
          f = e;
          e = (d + t1) >>> 0;
          d = c;
          c = b;
          b = a;
          a = (t1 + t2) >>> 0;
        }

        H = [
          (H[0] + a) >>> 0,
          (H[1] + b) >>> 0,
          (H[2] + c) >>> 0,
          (H[3] + d) >>> 0,
          (H[4] + e) >>> 0,
          (H[5] + f) >>> 0,
          (H[6] + g) >>> 0,
          (H[7] + h) >>> 0,
        ];
      }

      let out = "";
      for (let i = 0; i < 8; i++) {
        out += ("0000000" + H[i].toString(16)).slice(-8);
      }
      return out;
    };
  })();

  // Only the digest of the built-in admin password lives in the source.
  const DEFAULT_ADMIN = {
    username: "admin",
    passwordHash: "b3bebdf6e110856d3b12e922cc2ca1db04fa0ed56a0800981111d4ecb64006f3",
    name: "Administrator",
    role: "admin",
  };

  const readJson = (storage, key) => {
    try {
      return JSON.parse(storage.getItem(key) || "null");
    } catch (e) {
      return null;
    }
  };

  const writeUsers = (users) => {
    try {
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    } catch (e) {}
  };

  // Remove any clear-text password left by older versions.
  const upgradeAccount = (account) => {
    if (!account) return account;
    if (!account.passwordHash && account.password) {
      account.passwordHash = sha256(account.password);
      delete account.password;
      return account;
    }
    if (account.password) delete account.password;
    return account;
  };

  const readUsers = () => {
    let stored = readJson(localStorage, USERS_KEY);
    if (!Array.isArray(stored) || !stored.length) {
      stored = [{ ...DEFAULT_ADMIN }];
      writeUsers(stored);
      return stored;
    }

    let changed = false;
    const users = stored.map((account) => {
      if (account && account.password) {
        changed = true;
        return upgradeAccount(account);
      }
      return account;
    });
    if (changed) writeUsers(users);
    return users;
  };

  const emit = () => {
    try {
      global.dispatchEvent(new CustomEvent("sv:auth", { detail: getUser() }));
    } catch (e) {}
  };

  const getUser = () => {
    const session = readJson(localStorage, SESSION_KEY);
    if (!session || !session.username) return null;
    return session;
  };

  const startSession = (account) => {
    const session = {
      username: account.username,
      name: account.name || account.username,
      role: account.role || "user",
      t: Date.now(),
    };
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      if (session.role === "admin") {
        localStorage.setItem(
          LEGACY_KEY,
          btoa(JSON.stringify({ u: session.username, t: session.t })),
        );
      } else {
        localStorage.removeItem(LEGACY_KEY);
      }
    } catch (e) {}
    emit();
    return session;
  };

  const checkPassword = (account, password) => {
    if (account.passwordHash) return sha256(password) === account.passwordHash;
    if (account.password) return account.password === password;
    return false;
  };

  const login = (username, password) => {
    const name = (username || "").trim();
    if (!name || !password) {
      return { ok: false, error: "Enter your username and password." };
    }
    const users = readUsers();
    const account = users.find(
      (u) => u.username.toLowerCase() === name.toLowerCase(),
    );
    if (!account || !checkPassword(account, password)) {
      return { ok: false, error: "Invalid username or password." };
    }
    upgradeAccount(account);
    writeUsers(users);
    return { ok: true, user: startSession(account) };
  };

  const register = (username, password, displayName) => {
    const name = (username || "").trim();
    if (name.length < 3) {
      return { ok: false, error: "Username must be at least 3 characters." };
    }
    if ((password || "").length < 6) {
      return { ok: false, error: "Password must be at least 6 characters." };
    }
    const users = readUsers();
    if (users.some((u) => u.username.toLowerCase() === name.toLowerCase())) {
      return { ok: false, error: "That username is already taken." };
    }
    const account = {
      username: name,
      passwordHash: sha256(password),
      name: (displayName || "").trim() || name,
      role: "user",
    };
    writeUsers([...users, account]);
    return { ok: true, user: startSession(account) };
  };

  const logout = () => {
    try {
      localStorage.removeItem(SESSION_KEY);
      localStorage.removeItem(LEGACY_KEY);
    } catch (e) {}
    emit();
  };

  const isAdmin = () => {
    const user = getUser();
    return !!user && user.role === "admin";
  };

  const onChange = (callback) => {
    if (typeof callback !== "function") return () => {};
    const handler = () => callback(getUser());
    global.addEventListener("sv:auth", handler);
    global.addEventListener("storage", handler);
    return () => {
      global.removeEventListener("sv:auth", handler);
      global.removeEventListener("storage", handler);
    };
  };

  // Migrate a session created by the old login.html (sessionStorage, base64).
  const migrateLegacySession = () => {
    if (getUser()) return;
    try {
      const raw =
        sessionStorage.getItem(LEGACY_KEY) || localStorage.getItem(LEGACY_KEY);
      if (!raw) return;
      const parsed = JSON.parse(atob(raw));
      if (parsed && parsed.u) {
        startSession({
          username: parsed.u,
          name: "Administrator",
          role: "admin",
        });
      }
    } catch (e) {}
  };

  readUsers();
  migrateLegacySession();

  global.SV_AUTH = {
    SESSION_KEY,
    USERS_KEY,
    getUser,
    login,
    register,
    logout,
    isAdmin,
    onChange,
  };
})(window);

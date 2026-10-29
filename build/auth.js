function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, e) { if ("object" != _typeof(t) || !t) return t; var r; if ("undefined" != typeof Symbol && void 0 !== (r = t[Symbol.toPrimitive])) { var i = r.call(t, e || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === e ? String : Number)(t); }
/* StreamVault shared auth service.
 *
 * Plain JavaScript (no JSX) so it can be loaded by login.html, admin.html and
 * index.html/app.js. Load it BEFORE admin.js / app.js on every page.
 *
 * NOTE: this is a front-end demo. Accounts and sessions live in the browser's
 * localStorage, so this is not real security — a real app must validate
 * credentials on a server.
 */
(function (global) {
  "use strict";

  var SESSION_KEY = "sv_session";
  var USERS_KEY = "sv_users";
  var LEGACY_KEY = "sv_admin_auth"; // written by the old login page

  var DEFAULT_ADMIN = {
    username: "admin",
    password: "streamvault123",
    name: "Administrator",
    role: "admin"
  };
  var readJson = function readJson(storage, key) {
    try {
      return JSON.parse(storage.getItem(key) || "null");
    } catch (e) {
      return null;
    }
  };
  var readUsers = function readUsers() {
    var stored = readJson(localStorage, USERS_KEY);
    if (Array.isArray(stored) && stored.length) return stored;
    var fresh = [_objectSpread({}, DEFAULT_ADMIN)];
    try {
      localStorage.setItem(USERS_KEY, JSON.stringify(fresh));
    } catch (e) {}
    return fresh;
  };
  var writeUsers = function writeUsers(users) {
    try {
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    } catch (e) {}
  };
  var emit = function emit() {
    try {
      global.dispatchEvent(new CustomEvent("sv:auth", {
        detail: getUser()
      }));
    } catch (e) {}
  };
  var getUser = function getUser() {
    var session = readJson(localStorage, SESSION_KEY);
    if (!session || !session.username) return null;
    return session;
  };
  var startSession = function startSession(account) {
    var session = {
      username: account.username,
      name: account.name || account.username,
      role: account.role || "user",
      t: Date.now()
    };
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      if (session.role === "admin") {
        localStorage.setItem(LEGACY_KEY, btoa(JSON.stringify({
          u: session.username,
          t: session.t
        })));
      } else {
        localStorage.removeItem(LEGACY_KEY);
      }
    } catch (e) {}
    emit();
    return session;
  };
  var login = function login(username, password) {
    var name = (username || "").trim();
    if (!name || !password) {
      return {
        ok: false,
        error: "Enter your username and password."
      };
    }
    var account = readUsers().find(function (u) {
      return u.username.toLowerCase() === name.toLowerCase();
    });
    if (!account || account.password !== password) {
      return {
        ok: false,
        error: "Invalid username or password."
      };
    }
    return {
      ok: true,
      user: startSession(account)
    };
  };
  var register = function register(username, password, displayName) {
    var name = (username || "").trim();
    if (name.length < 3) {
      return {
        ok: false,
        error: "Username must be at least 3 characters."
      };
    }
    if ((password || "").length < 6) {
      return {
        ok: false,
        error: "Password must be at least 6 characters."
      };
    }
    var users = readUsers();
    if (users.some(function (u) {
      return u.username.toLowerCase() === name.toLowerCase();
    })) {
      return {
        ok: false,
        error: "That username is already taken."
      };
    }
    var account = {
      username: name,
      password,
      name: (displayName || "").trim() || name,
      role: "user"
    };
    writeUsers([].concat(_toConsumableArray(users), [account]));
    return {
      ok: true,
      user: startSession(account)
    };
  };
  var logout = function logout() {
    try {
      localStorage.removeItem(SESSION_KEY);
      localStorage.removeItem(LEGACY_KEY);
    } catch (e) {}
    emit();
  };
  var isAdmin = function isAdmin() {
    var user = getUser();
    return !!user && user.role === "admin";
  };
  var onChange = function onChange(callback) {
    if (typeof callback !== "function") return function () {};
    var handler = function handler() {
      return callback(getUser());
    };
    global.addEventListener("sv:auth", handler);
    global.addEventListener("storage", handler);
    return function () {
      global.removeEventListener("sv:auth", handler);
      global.removeEventListener("storage", handler);
    };
  };

  // Migrate a session created by the old login.html (sessionStorage, base64).
  var migrateLegacySession = function migrateLegacySession() {
    if (getUser()) return;
    try {
      var raw = sessionStorage.getItem(LEGACY_KEY) || localStorage.getItem(LEGACY_KEY);
      if (!raw) return;
      var parsed = JSON.parse(atob(raw));
      if (parsed && parsed.u) {
        startSession({
          username: parsed.u,
          name: "Administrator",
          role: "admin"
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
    onChange
  };
})(window);
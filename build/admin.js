function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, e) { if ("object" != _typeof(t) || !t) return t; var r; if ("undefined" != typeof Symbol && void 0 !== (r = t[Symbol.toPrimitive])) { var i = r.call(t, e || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === e ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var _React = React,
  useState = _React.useState,
  useEffect = _React.useEffect,
  useMemo = _React.useMemo,
  useCallback = _React.useCallback;
var logout = function logout() {
  if (window.SV_AUTH) {
    SV_AUTH.logout();
  } else {
    sessionStorage.removeItem("sv_admin_auth");
    localStorage.removeItem("sv_session");
  }
  window.location.replace("login.html");
};
var STORAGE_KEY = "sv_movies";
var DEFAULT_CATEGORIES = ["Action", "Animation", "Horror", "Romance", "Drama", "Thriller", "Adventure", "Crime"];
var decodeVideo = function decodeVideo(encoded) {
  if (!encoded) return "";
  try {
    return atob(encoded);
  } catch (e) {
    return encoded;
  }
};
var encodeVideo = function encodeVideo(url) {
  var trimmed = (url || "").trim();
  if (!trimmed) return "";
  if (trimmed.startsWith("http")) {
    try {
      return btoa(trimmed);
    } catch (e) {
      return trimmed;
    }
  }
  return trimmed;
};
function loadMovies() {
  return _loadMovies.apply(this, arguments);
}
function _loadMovies() {
  _loadMovies = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
    var stored, src, start, end, extract, base, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          _context.p = 0;
          stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
          if (!(Array.isArray(stored) && stored.length)) {
            _context.n = 1;
            break;
          }
          return _context.a(2, stored);
        case 1:
          _context.n = 2;
          return fetch("app.js");
        case 2:
          _context.n = 3;
          return _context.v.text();
        case 3:
          src = _context.v;
          start = src.indexOf("const _baseMoviesData = [");
          if (!(start !== -1)) {
            _context.n = 4;
            break;
          }
          end = src.indexOf("\n];", start);
          if (!(end !== -1)) {
            _context.n = 4;
            break;
          }
          extract = new Function(src.slice(start, end + 3) + "\nreturn _baseMoviesData;");
          base = extract();
          if (!(Array.isArray(base) && base.length)) {
            _context.n = 4;
            break;
          }
          localStorage.setItem(STORAGE_KEY, JSON.stringify(base));
          return _context.a(2, base);
        case 4:
          _context.n = 6;
          break;
        case 5:
          _context.p = 5;
          _t = _context.v;
        case 6:
          return _context.a(2, []);
      }
    }, _callee, null, [[0, 5]]);
  }));
  return _loadMovies.apply(this, arguments);
}
var saveMovies = function saveMovies(movies) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
};
var Icon = function Icon(_ref) {
  var d = _ref.d,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? "w-5 h-5" : _ref$className;
  return /*#__PURE__*/React.createElement("svg", {
    className: className,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    d: d
  }));
};
var ICONS = {
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
  menu: "M4 6h16M4 12h16M4 18h16"
};
var Toast = function Toast(_ref2) {
  var message = _ref2.message,
    type = _ref2.type,
    onDone = _ref2.onDone;
  useEffect(function () {
    var t = setTimeout(onDone, 2500);
    return function () {
      return clearTimeout(t);
    };
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: `fixed bottom-6 right-6 z-[60] animate-slide-up px-5 py-3 rounded-xl text-sm font-medium shadow-2xl border ${type === "error" ? "bg-accent-red/15 border-accent-red/40 text-red-300" : "bg-emerald-500/15 border-emerald-500/40 text-emerald-300"}`
  }, message);
};
var StatCard = function StatCard(_ref3) {
  var label = _ref3.label,
    value = _ref3.value,
    icon = _ref3.icon,
    accent = _ref3.accent;
  return /*#__PURE__*/React.createElement("div", {
    className: "bg-dark-800 border border-dark-600 rounded-2xl p-5 flex items-center gap-4 hover:border-dark-500 transition animate-scale-in"
  }, /*#__PURE__*/React.createElement("div", {
    className: `w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${accent}`
  }, /*#__PURE__*/React.createElement(Icon, {
    d: icon,
    className: "w-6 h-6"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-gray-500 text-xs font-medium uppercase tracking-wider"
  }, label), /*#__PURE__*/React.createElement("p", {
    className: "text-2xl font-bold mt-0.5"
  }, value)));
};
var Dashboard = function Dashboard(_ref4) {
  var movies = _ref4.movies,
    onGoMovies = _ref4.onGoMovies;
  var stats = useMemo(function () {
    var cats = {};
    movies.forEach(function (m) {
      var c = (m.category || "Other").trim();
      cats[c] = (cats[c] || 0) + 1;
    });
    var ratings = movies.filter(function (m) {
      return typeof m.rating === "number";
    });
    return {
      total: movies.length,
      categories: Object.keys(cats).length,
      trending: movies.filter(function (m) {
        return m.trending;
      }).length,
      avgRating: ratings.length ? (ratings.reduce(function (s, m) {
        return s + m.rating;
      }, 0) / ratings.length).toFixed(1) : "—",
      cats,
      recent: _toConsumableArray(movies).sort(function (a, b) {
        return (b.id || 0) - (a.id || 0);
      }).slice(0, 5)
    };
  }, [movies]);
  var maxCat = Math.max.apply(Math, [1].concat(_toConsumableArray(Object.values(stats.cats))));
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-6 animate-fade-in"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
  }, /*#__PURE__*/React.createElement(StatCard, {
    label: "Total Movies",
    value: stats.total,
    icon: ICONS.film,
    accent: "bg-accent-red/15 text-accent-red"
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Categories",
    value: stats.categories,
    icon: ICONS.dashboard,
    accent: "bg-accent-purple/15 text-accent-purple"
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Trending",
    value: stats.trending,
    icon: ICONS.fire,
    accent: "bg-orange-500/15 text-orange-400"
  }), /*#__PURE__*/React.createElement(StatCard, {
    label: "Avg Rating",
    value: stats.avgRating,
    icon: ICONS.star,
    accent: "bg-yellow-500/15 text-yellow-400"
  })), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-2 gap-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-dark-800 border border-dark-600 rounded-2xl p-6"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-semibold mb-5"
  }, "Movies by Category"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, Object.entries(stats.cats).sort(function (a, b) {
    return b[1] - a[1];
  }).map(function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
      cat = _ref6[0],
      count = _ref6[1];
    return /*#__PURE__*/React.createElement("div", {
      key: cat,
      className: "flex items-center gap-3"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-sm text-gray-400 w-24 truncate"
    }, cat), /*#__PURE__*/React.createElement("div", {
      className: "flex-1 bg-dark-700 rounded-full h-2.5 overflow-hidden"
    }, /*#__PURE__*/React.createElement("div", {
      className: "bg-gradient-to-r from-accent-red to-accent-pink h-full rounded-full transition-all duration-500",
      style: {
        width: `${count / maxCat * 100}%`
      }
    })), /*#__PURE__*/React.createElement("span", {
      className: "text-sm font-semibold w-8 text-right"
    }, count));
  }))), /*#__PURE__*/React.createElement("div", {
    className: "bg-dark-800 border border-dark-600 rounded-2xl p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-5"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-semibold"
  }, "Recently Added"), /*#__PURE__*/React.createElement("button", {
    onClick: onGoMovies,
    className: "text-xs text-accent-red hover:text-red-400 font-medium transition"
  }, "View all \u2192")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, stats.recent.map(function (m) {
    return /*#__PURE__*/React.createElement("div", {
      key: m.id,
      className: "flex items-center gap-3 bg-dark-700/50 rounded-xl p-2.5"
    }, /*#__PURE__*/React.createElement("img", {
      src: m.poster,
      alt: m.title,
      className: "w-9 h-12 rounded-lg object-cover flex-shrink-0",
      onError: function onError(e) {
        e.target.style.visibility = "hidden";
      }
    }), /*#__PURE__*/React.createElement("div", {
      className: "min-w-0 flex-1"
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-sm font-medium truncate"
    }, m.title), /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-gray-500"
    }, m.year, " \xB7 ", m.category)), /*#__PURE__*/React.createElement("span", {
      className: "text-xs font-bold text-yellow-400 flex items-center gap-1"
    }, /*#__PURE__*/React.createElement(Icon, {
      d: ICONS.star,
      className: "w-3.5 h-3.5"
    }), m.rating));
  })))));
};
var MovieModal = function MovieModal(_ref7) {
  var movie = _ref7.movie,
    onClose = _ref7.onClose,
    onSave = _ref7.onSave;
  var isEdit = !!movie;
  var _useState = useState(function () {
      var _movie$trending, _movie$popular, _movie$topRated;
      return {
        title: (movie === null || movie === void 0 ? void 0 : movie.title) || "",
        year: (movie === null || movie === void 0 ? void 0 : movie.year) || new Date().getFullYear(),
        rating: (movie === null || movie === void 0 ? void 0 : movie.rating) || 7.0,
        genre: (movie === null || movie === void 0 ? void 0 : movie.genre) || "",
        category: (movie === null || movie === void 0 ? void 0 : movie.category) || "Action",
        poster: (movie === null || movie === void 0 ? void 0 : movie.poster) || "",
        backdrop: (movie === null || movie === void 0 ? void 0 : movie.backdrop) || "",
        synopsis: (movie === null || movie === void 0 ? void 0 : movie.synopsis) || "",
        runtime: (movie === null || movie === void 0 ? void 0 : movie.runtime) || "",
        director: (movie === null || movie === void 0 ? void 0 : movie.director) || "",
        cast: movie !== null && movie !== void 0 && movie.cast ? movie.cast.join(", ") : "",
        videoUrl: decodeVideo(movie === null || movie === void 0 ? void 0 : movie.video),
        trending: (_movie$trending = movie === null || movie === void 0 ? void 0 : movie.trending) !== null && _movie$trending !== void 0 ? _movie$trending : true,
        popular: (_movie$popular = movie === null || movie === void 0 ? void 0 : movie.popular) !== null && _movie$popular !== void 0 ? _movie$popular : true,
        topRated: (_movie$topRated = movie === null || movie === void 0 ? void 0 : movie.topRated) !== null && _movie$topRated !== void 0 ? _movie$topRated : false
      };
    }),
    _useState2 = _slicedToArray(_useState, 2),
    form = _useState2[0],
    setForm = _useState2[1];
  var _useState3 = useState({}),
    _useState4 = _slicedToArray(_useState3, 2),
    errors = _useState4[0],
    setErrors = _useState4[1];
  var set = function set(key) {
    return function (e) {
      return setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value
        });
      });
    };
  };
  var submit = function submit(e) {
    e.preventDefault();
    var errs = {};
    if (!form.title.trim()) errs.title = "Title is required";
    if (!form.poster.trim()) errs.poster = "Poster URL is required";
    if (!form.videoUrl.trim()) errs.videoUrl = "Video URL is required";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    var data = {
      title: form.title.trim(),
      year: Number(form.year) || new Date().getFullYear(),
      rating: Number(form.rating) || 0,
      genre: form.genre.trim(),
      category: form.category.trim() || "Action",
      poster: form.poster.trim(),
      backdrop: form.backdrop.trim() || form.poster.trim(),
      synopsis: form.synopsis.trim(),
      runtime: form.runtime.trim(),
      director: form.director.trim() || "Unknown",
      cast: form.cast.split(",").map(function (s) {
        return s.trim();
      }).filter(Boolean),
      trending: form.trending,
      popular: form.popular,
      topRated: form.topRated,
      video: encodeVideo(form.videoUrl)
    };
    onSave(data, isEdit);
  };
  var field = "w-full bg-dark-700 border border-dark-500 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-accent-red focus:ring-2 focus:ring-accent-red/20 transition placeholder-gray-600";
  var label = "block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1.5";
  return /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("form", {
    onSubmit: submit,
    className: "bg-dark-800 border border-dark-600 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-scale-in",
    onClick: function onClick(e) {
      return e.stopPropagation();
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "sticky top-0 bg-dark-800/95 backdrop-blur border-b border-dark-600 px-6 py-4 flex items-center justify-between z-10"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-lg font-bold"
  }, isEdit ? "Edit Movie" : "Add New Movie"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClose,
    className: "text-gray-500 hover:text-white transition p-1 rounded-lg hover:bg-dark-700"
  }, /*#__PURE__*/React.createElement(Icon, {
    d: ICONS.close
  }))), /*#__PURE__*/React.createElement("div", {
    className: "p-6 grid grid-cols-1 md:grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "md:col-span-2"
  }, /*#__PURE__*/React.createElement("label", {
    className: label
  }, "Title *"), /*#__PURE__*/React.createElement("input", {
    className: field,
    placeholder: "Movie title",
    value: form.title,
    onChange: set("title")
  }), errors.title && /*#__PURE__*/React.createElement("p", {
    className: "text-accent-red text-xs mt-1"
  }, errors.title)), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: label
  }, "Year"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    className: field,
    value: form.year,
    onChange: set("year")
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: label
  }, "Rating (0-10)"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    step: "0.1",
    min: "0",
    max: "10",
    className: field,
    value: form.rating,
    onChange: set("rating")
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: label
  }, "Category"), /*#__PURE__*/React.createElement("select", {
    className: field,
    value: form.category,
    onChange: set("category")
  }, _toConsumableArray(new Set([].concat(DEFAULT_CATEGORIES, [form.category]))).filter(Boolean).map(function (c) {
    return /*#__PURE__*/React.createElement("option", {
      key: c,
      value: c
    }, c);
  }))), /*#__PURE__*/React.createElement("div", {
    className: "md:col-span-2"
  }, /*#__PURE__*/React.createElement("label", {
    className: label
  }, "Genre"), /*#__PURE__*/React.createElement("input", {
    className: field,
    placeholder: "Action, Drama, Sci-Fi",
    value: form.genre,
    onChange: set("genre")
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: label
  }, "Poster URL *"), /*#__PURE__*/React.createElement("input", {
    className: field,
    placeholder: "https://...",
    value: form.poster,
    onChange: set("poster")
  }), errors.poster && /*#__PURE__*/React.createElement("p", {
    className: "text-accent-red text-xs mt-1"
  }, errors.poster)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: label
  }, "Backdrop URL"), /*#__PURE__*/React.createElement("input", {
    className: field,
    placeholder: "Leave empty to use poster",
    value: form.backdrop,
    onChange: set("backdrop")
  })), /*#__PURE__*/React.createElement("div", {
    className: "md:col-span-2"
  }, /*#__PURE__*/React.createElement("label", {
    className: label
  }, "Synopsis"), /*#__PURE__*/React.createElement("textarea", {
    rows: "3",
    className: field + " resize-none",
    placeholder: "Movie description...",
    value: form.synopsis,
    onChange: set("synopsis")
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: label
  }, "Runtime"), /*#__PURE__*/React.createElement("input", {
    className: field,
    placeholder: "120 min",
    value: form.runtime,
    onChange: set("runtime")
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: label
  }, "Director"), /*#__PURE__*/React.createElement("input", {
    className: field,
    placeholder: "Director name",
    value: form.director,
    onChange: set("director")
  })), /*#__PURE__*/React.createElement("div", {
    className: "md:col-span-2"
  }, /*#__PURE__*/React.createElement("label", {
    className: label
  }, "Cast (comma separated)"), /*#__PURE__*/React.createElement("input", {
    className: field,
    placeholder: "Actor 1, Actor 2, Actor 3",
    value: form.cast,
    onChange: set("cast")
  })), /*#__PURE__*/React.createElement("div", {
    className: "md:col-span-2"
  }, /*#__PURE__*/React.createElement("label", {
    className: label
  }, "Video URL (direct link / embed) *"), /*#__PURE__*/React.createElement("input", {
    className: field,
    placeholder: "https://... or embed URL (auto-encoded on save)",
    value: form.videoUrl,
    onChange: set("videoUrl")
  }), errors.videoUrl && /*#__PURE__*/React.createElement("p", {
    className: "text-accent-red text-xs mt-1"
  }, errors.videoUrl)), /*#__PURE__*/React.createElement("div", {
    className: "md:col-span-2 flex flex-wrap gap-6 pt-1"
  }, [["trending", "Trending"], ["popular", "Popular"], ["topRated", "Top Rated"]].map(function (_ref8) {
    var _ref9 = _slicedToArray(_ref8, 2),
      key = _ref9[0],
      text = _ref9[1];
    return /*#__PURE__*/React.createElement("label", {
      key: key,
      className: "flex items-center gap-2 text-sm text-gray-300 cursor-pointer select-none"
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      checked: form[key],
      onChange: set(key),
      className: "w-4 h-4 rounded bg-dark-700 border-dark-500 accent-red-600"
    }), text);
  }))), /*#__PURE__*/React.createElement("div", {
    className: "sticky bottom-0 bg-dark-800/95 backdrop-blur border-t border-dark-600 px-6 py-4 flex justify-end gap-3"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClose,
    className: "px-5 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-dark-700 transition"
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "px-6 py-2.5 rounded-xl text-sm font-semibold bg-accent-red hover:bg-red-700 shadow-lg shadow-accent-red/20 transition"
  }, isEdit ? "Save Changes" : "Add Movie"))));
};
var MoviesView = function MoviesView(_ref0) {
  var movies = _ref0.movies,
    search = _ref0.search,
    setSearch = _ref0.setSearch,
    onEdit = _ref0.onEdit,
    onDelete = _ref0.onDelete,
    onAdd = _ref0.onAdd;
  var filtered = useMemo(function () {
    var q = search.toLowerCase().trim();
    if (!q) return movies;
    return movies.filter(function (m) {
      return (m.title || "").toLowerCase().includes(q) || (m.category || "").toLowerCase().includes(q) || (m.genre || "").toLowerCase().includes(q);
    });
  }, [movies, search]);
  return /*#__PURE__*/React.createElement("div", {
    className: "animate-fade-in"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col sm:flex-row gap-3 mb-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative flex-1"
  }, /*#__PURE__*/React.createElement(Icon, {
    d: ICONS.search,
    className: "w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
  }), /*#__PURE__*/React.createElement("input", {
    value: search,
    onChange: function onChange(e) {
      return setSearch(e.target.value);
    },
    placeholder: "Search by title, category or genre...",
    className: "w-full bg-dark-800 border border-dark-600 rounded-xl pl-11 pr-4 py-2.5 text-sm outline-none focus:border-accent-red focus:ring-2 focus:ring-accent-red/20 transition placeholder-gray-600"
  })), /*#__PURE__*/React.createElement("button", {
    onClick: onAdd,
    className: "flex items-center justify-center gap-2 bg-accent-red hover:bg-red-700 px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-accent-red/20 transition active:scale-[0.98]"
  }, /*#__PURE__*/React.createElement(Icon, {
    d: ICONS.plus,
    className: "w-4 h-4"
  }), " Add Movie")), /*#__PURE__*/React.createElement("div", {
    className: "bg-dark-800 border border-dark-600 rounded-2xl overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "overflow-x-auto"
  }, /*#__PURE__*/React.createElement("table", {
    className: "w-full text-sm min-w-[720px]"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    className: "text-left text-gray-500 text-xs uppercase tracking-wider border-b border-dark-600"
  }, /*#__PURE__*/React.createElement("th", {
    className: "px-5 py-3.5 font-medium"
  }, "Movie"), /*#__PURE__*/React.createElement("th", {
    className: "px-3 py-3.5 font-medium"
  }, "Category"), /*#__PURE__*/React.createElement("th", {
    className: "px-3 py-3.5 font-medium"
  }, "Year"), /*#__PURE__*/React.createElement("th", {
    className: "px-3 py-3.5 font-medium"
  }, "Rating"), /*#__PURE__*/React.createElement("th", {
    className: "px-3 py-3.5 font-medium"
  }, "Flags"), /*#__PURE__*/React.createElement("th", {
    className: "px-5 py-3.5 font-medium text-right"
  }, "Actions"))), /*#__PURE__*/React.createElement("tbody", null, filtered.map(function (m) {
    return /*#__PURE__*/React.createElement("tr", {
      key: m.id,
      className: "border-b border-dark-700 last:border-0 hover:bg-dark-700/40 transition"
    }, /*#__PURE__*/React.createElement("td", {
      className: "px-5 py-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-3"
    }, /*#__PURE__*/React.createElement("img", {
      src: m.poster,
      alt: "",
      className: "w-9 h-12 rounded-lg object-cover flex-shrink-0",
      onError: function onError(e) {
        e.target.style.visibility = "hidden";
      }
    }), /*#__PURE__*/React.createElement("div", {
      className: "min-w-0 max-w-[280px]"
    }, /*#__PURE__*/React.createElement("p", {
      className: "font-medium truncate"
    }, m.title), /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-gray-500 truncate"
    }, m.genre)))), /*#__PURE__*/React.createElement("td", {
      className: "px-3 py-3"
    }, /*#__PURE__*/React.createElement("span", {
      className: "bg-dark-700 border border-dark-500 text-gray-300 text-xs px-2.5 py-1 rounded-full"
    }, m.category)), /*#__PURE__*/React.createElement("td", {
      className: "px-3 py-3 text-gray-400"
    }, m.year), /*#__PURE__*/React.createElement("td", {
      className: "px-3 py-3"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-yellow-400 font-semibold flex items-center gap-1"
    }, /*#__PURE__*/React.createElement(Icon, {
      d: ICONS.star,
      className: "w-3.5 h-3.5"
    }), m.rating)), /*#__PURE__*/React.createElement("td", {
      className: "px-3 py-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex gap-1.5 flex-wrap"
    }, m.trending && /*#__PURE__*/React.createElement("span", {
      className: "bg-orange-500/15 text-orange-400 text-[10px] font-bold px-2 py-0.5 rounded"
    }, "T"), m.popular && /*#__PURE__*/React.createElement("span", {
      className: "bg-accent-pink/15 text-accent-pink text-[10px] font-bold px-2 py-0.5 rounded"
    }, "P"), m.topRated && /*#__PURE__*/React.createElement("span", {
      className: "bg-emerald-500/15 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded"
    }, "TR"))), /*#__PURE__*/React.createElement("td", {
      className: "px-5 py-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex justify-end gap-2"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return onEdit(m);
      },
      title: "Edit",
      className: "p-2 rounded-lg bg-dark-700 border border-dark-500 text-gray-400 hover:text-white hover:border-accent-purple transition"
    }, /*#__PURE__*/React.createElement(Icon, {
      d: ICONS.edit,
      className: "w-4 h-4"
    })), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return onDelete(m);
      },
      title: "Delete",
      className: "p-2 rounded-lg bg-dark-700 border border-dark-500 text-gray-400 hover:text-accent-red hover:border-accent-red/50 transition"
    }, /*#__PURE__*/React.createElement(Icon, {
      d: ICONS.trash,
      className: "w-4 h-4"
    })))));
  }), !filtered.length && /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: "6",
    className: "px-5 py-16 text-center text-gray-500"
  }, movies.length ? "No movies match your search." : "No movies yet. Click “Add Movie” to get started.")))))), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-gray-600 mt-3 text-center"
  }, "Showing ", filtered.length, " of ", movies.length, " movies"));
};
var ConfirmDelete = function ConfirmDelete(_ref1) {
  var movie = _ref1.movie,
    onClose = _ref1.onClose,
    onConfirm = _ref1.onConfirm;
  return /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-dark-800 border border-dark-600 rounded-2xl p-6 w-full max-w-sm animate-scale-in",
    onClick: function onClick(e) {
      return e.stopPropagation();
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-12 h-12 rounded-full bg-accent-red/15 text-accent-red flex items-center justify-center mx-auto mb-4"
  }, /*#__PURE__*/React.createElement(Icon, {
    d: ICONS.trash,
    className: "w-6 h-6"
  })), /*#__PURE__*/React.createElement("h3", {
    className: "text-lg font-bold text-center"
  }, "Delete movie?"), /*#__PURE__*/React.createElement("p", {
    className: "text-gray-500 text-sm text-center mt-2"
  }, "\u201C", movie.title, "\u201D will be permanently removed from your site."), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-3 mt-6"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "flex-1 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-dark-700 transition"
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return onConfirm(movie.id);
    },
    className: "flex-1 py-2.5 rounded-xl text-sm font-semibold bg-accent-red hover:bg-red-700 shadow-lg shadow-accent-red/20 transition"
  }, "Delete"))));
};
var App = function App() {
  var _useState5 = useState([]),
    _useState6 = _slicedToArray(_useState5, 2),
    movies = _useState6[0],
    setMovies = _useState6[1];
  var _useState7 = useState("dashboard"),
    _useState8 = _slicedToArray(_useState7, 2),
    view = _useState8[0],
    setView = _useState8[1];
  var _useState9 = useState(""),
    _useState0 = _slicedToArray(_useState9, 2),
    search = _useState0[0],
    setSearch = _useState0[1];
  var _useState1 = useState(null),
    _useState10 = _slicedToArray(_useState1, 2),
    editing = _useState10[0],
    setEditing = _useState10[1];
  var _useState11 = useState(false),
    _useState12 = _slicedToArray(_useState11, 2),
    modalOpen = _useState12[0],
    setModalOpen = _useState12[1];
  var _useState13 = useState(null),
    _useState14 = _slicedToArray(_useState13, 2),
    deleting = _useState14[0],
    setDeleting = _useState14[1];
  var _useState15 = useState(null),
    _useState16 = _slicedToArray(_useState15, 2),
    toast = _useState16[0],
    setToast = _useState16[1];
  var _useState17 = useState(false),
    _useState18 = _slicedToArray(_useState17, 2),
    sidebarOpen = _useState18[0],
    setSidebarOpen = _useState18[1];
  useEffect(function () {
    loadMovies().then(setMovies);
  }, []);
  var persist = useCallback(function (next) {
    setMovies(next);
    saveMovies(next);
  }, []);
  var showToast = function showToast(message) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "success";
    return setToast({
      message,
      type
    });
  };
  var handleSave = function handleSave(data, isEdit) {
    if (isEdit) {
      persist(movies.map(function (m) {
        return m.id === editing.id ? _objectSpread(_objectSpread({}, m), data) : m;
      }));
      showToast("Movie updated successfully");
    } else {
      var maxId = movies.reduce(function (max, m) {
        return Math.max(max, m.id || 0);
      }, 0);
      persist([_objectSpread(_objectSpread({}, data), {}, {
        id: maxId + 1
      })].concat(_toConsumableArray(movies)));
      showToast("Movie added successfully");
    }
    setModalOpen(false);
    setEditing(null);
  };
  var handleDelete = function handleDelete(id) {
    persist(movies.filter(function (m) {
      return m.id !== id;
    }));
    setDeleting(null);
    showToast("Movie deleted");
  };
  var exportJson = function exportJson() {
    var blob = new Blob([JSON.stringify(movies, null, 2)], {
      type: "application/json"
    });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "streamvault-movies.json";
    a.click();
    URL.revokeObjectURL(a.href);
    showToast("Movies exported as JSON");
  };
  var resetDefaults = function resetDefaults() {
    localStorage.removeItem(STORAGE_KEY);
    loadMovies().then(function (base) {
      setMovies(base);
      showToast("Reset to site defaults");
    });
  };
  var navItems = [{
    key: "dashboard",
    label: "Dashboard",
    icon: ICONS.dashboard
  }, {
    key: "movies",
    label: "Movies",
    icon: ICONS.movies
  }];
  var sessionUser = window.SV_AUTH ? SV_AUTH.getUser() : null;
  var username = sessionUser && (sessionUser.name || sessionUser.username) || "admin";
  return /*#__PURE__*/React.createElement("div", {
    className: "flex min-h-screen"
  }, sidebarOpen && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 bg-black/70 z-30 lg:hidden",
    onClick: function onClick() {
      return setSidebarOpen(false);
    }
  }), /*#__PURE__*/React.createElement("aside", {
    className: `fixed lg:sticky top-0 z-40 h-screen w-64 bg-dark-800 border-r border-dark-600 flex flex-col transition-transform duration-200 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 px-5 py-5 border-b border-dark-600"
  }, /*#__PURE__*/React.createElement("img", {
    src: "logo (2).png",
    alt: "",
    className: "w-10 h-10 rounded-xl object-contain",
    onError: function onError(e) {
      e.target.style.display = "none";
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "font-extrabold leading-tight"
  }, "Stream", /*#__PURE__*/React.createElement("span", {
    className: "text-accent-red"
  }, "Vault")), /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] text-gray-500 uppercase tracking-widest"
  }, "Admin Panel"))), /*#__PURE__*/React.createElement("nav", {
    className: "flex-1 p-4 space-y-1"
  }, navItems.map(function (item) {
    return /*#__PURE__*/React.createElement("button", {
      key: item.key,
      onClick: function onClick() {
        setView(item.key);
        setSidebarOpen(false);
      },
      className: `w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition ${view === item.key ? "bg-accent-red/15 text-accent-red border border-accent-red/25" : "text-gray-400 hover:text-white hover:bg-dark-700 border border-transparent"}`
    }, /*#__PURE__*/React.createElement(Icon, {
      d: item.icon
    }), item.label);
  }), /*#__PURE__*/React.createElement("div", {
    className: "pt-3 mt-3 border-t border-dark-600 space-y-1"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: exportJson,
    className: "w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-dark-700 transition"
  }, /*#__PURE__*/React.createElement(Icon, {
    d: ICONS.download
  }), " Export JSON"), /*#__PURE__*/React.createElement("button", {
    onClick: resetDefaults,
    className: "w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-dark-700 transition"
  }, /*#__PURE__*/React.createElement(Icon, {
    d: ICONS.refresh
  }), " Reset to Defaults"))), /*#__PURE__*/React.createElement("div", {
    className: "p-4 border-t border-dark-600"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: logout,
    className: "w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-accent-red hover:bg-accent-red/10 transition"
  }, /*#__PURE__*/React.createElement(Icon, {
    d: ICONS.logout
  }), " Log out"))), /*#__PURE__*/React.createElement("main", {
    className: "flex-1 min-w-0"
  }, /*#__PURE__*/React.createElement("header", {
    className: "sticky top-0 z-20 bg-dark-900/90 backdrop-blur border-b border-dark-600 px-5 sm:px-8 py-4 flex items-center gap-4"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setSidebarOpen(true);
    },
    className: "lg:hidden text-gray-400 hover:text-white transition"
  }, /*#__PURE__*/React.createElement(Icon, {
    d: ICONS.menu
  })), /*#__PURE__*/React.createElement("h1", {
    className: "text-xl font-bold capitalize flex-1"
  }, view), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("a", {
    href: "index.html",
    target: "_blank",
    className: "hidden sm:flex items-center gap-2 text-xs text-gray-400 hover:text-white border border-dark-600 hover:border-dark-500 rounded-lg px-3 py-2 transition"
  }, /*#__PURE__*/React.createElement(Icon, {
    d: ICONS.film,
    className: "w-3.5 h-3.5"
  }), " View Site"), /*#__PURE__*/React.createElement("div", {
    className: "w-9 h-9 rounded-full bg-gradient-to-br from-accent-red to-accent-purple flex items-center justify-center font-bold text-sm"
  }, username.charAt(0).toUpperCase()))), /*#__PURE__*/React.createElement("div", {
    className: "p-5 sm:p-8"
  }, view === "dashboard" ? /*#__PURE__*/React.createElement(Dashboard, {
    movies: movies,
    onGoMovies: function onGoMovies() {
      return setView("movies");
    }
  }) : /*#__PURE__*/React.createElement(MoviesView, {
    movies: movies,
    search: search,
    setSearch: setSearch,
    onAdd: function onAdd() {
      setEditing(null);
      setModalOpen(true);
    },
    onEdit: function onEdit(m) {
      setEditing(m);
      setModalOpen(true);
    },
    onDelete: function onDelete(m) {
      return setDeleting(m);
    }
  }))), modalOpen && /*#__PURE__*/React.createElement(MovieModal, {
    movie: editing,
    onClose: function onClose() {
      setModalOpen(false);
      setEditing(null);
    },
    onSave: handleSave
  }), deleting && /*#__PURE__*/React.createElement(ConfirmDelete, {
    movie: deleting,
    onClose: function onClose() {
      return setDeleting(null);
    },
    onConfirm: handleDelete
  }), toast && /*#__PURE__*/React.createElement(Toast, {
    message: toast.message,
    type: toast.type,
    onDone: function onDone() {
      return setToast(null);
    }
  }));
};
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
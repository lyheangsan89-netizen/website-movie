/* Small ES5 polyfills for older smart-TV browsers.
   Loaded before the app bundles so the UI can render even on old engines. */
(function () {
  "use strict";

  // Array.prototype.includes (ES2016)
  if (!Array.prototype.includes) {
    Object.defineProperty(Array.prototype, "includes", {
      value: function (search, fromIndex) {
        var len = this.length >>> 0;
        if (len === 0) return false;
        var k = fromIndex ? Number(fromIndex) : 0;
        if (isNaN(k)) k = 0;
        if (k < 0) k = Math.max(len + k, 0);
        for (; k < len; k++) {
          var value = this[k];
          if (value === search || (value !== value && search !== search)) {
            return true;
          }
        }
        return false;
      },
      writable: true,
      configurable: true,
    });
  }

  // String.prototype.includes (ES6)
  if (!String.prototype.includes) {
    Object.defineProperty(String.prototype, "includes", {
      value: function (search, start) {
        return this.indexOf(search, start || 0) !== -1;
      },
      writable: true,
      configurable: true,
    });
  }

  // String.prototype.padStart / padEnd (ES2017)
  if (!String.prototype.padStart) {
    Object.defineProperty(String.prototype, "padStart", {
      value: function (targetLength, padString) {
        var str = String(this);
        var pad = padString === undefined ? " " : String(padString);
        if (str.length >= targetLength || !pad.length) return str;
        var fill = "";
        while (fill.length + str.length < targetLength) fill += pad;
        return fill.slice(0, targetLength - str.length) + str;
      },
      writable: true,
      configurable: true,
    });
  }

  if (!String.prototype.padEnd) {
    Object.defineProperty(String.prototype, "padEnd", {
      value: function (targetLength, padString) {
        var str = String(this);
        var pad = padString === undefined ? " " : String(padString);
        if (str.length >= targetLength || !pad.length) return str;
        var fill = "";
        while (fill.length + str.length < targetLength) fill += pad;
        return str + fill.slice(0, targetLength - str.length);
      },
      writable: true,
      configurable: true,
    });
  }

  // Object.keys fallback (very old engines)
  if (!Object.keys) {
    Object.keys = function (obj) {
      var keys = [];
      var key;
      for (key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) keys.push(key);
      }
      return keys;
    };
  }

  // Object.entries (ES2017) — used by the admin dashboard
  if (!Object.entries) {
    Object.entries = function (obj) {
      var entries = [];
      var keys = Object.keys(obj);
      for (var i = 0; i < keys.length; i++) {
        entries.push([keys[i], obj[keys[i]]]);
      }
      return entries;
    };
  }

  // Object.values (ES2017) — used by the admin dashboard
  if (!Object.values) {
    Object.values = function (obj) {
      var values = [];
      var keys = Object.keys(obj);
      for (var i = 0; i < keys.length; i++) {
        values.push(obj[keys[i]]);
      }
      return values;
    };
  }
})();

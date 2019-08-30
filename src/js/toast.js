// Native JavaScript for Bootstrap 4 v2.0.28 | © dnp_theme | MIT-License
!(function(t, n) {
  if ("function" == typeof define && define.amd) define([], n)
  else if ("object" == typeof module && module.exports) module.exports = n()
  else {
    var e = n()
    t.Toast = e.Toast
  }
})(this, function() {
  "use strict"
  var t = "undefined" != typeof global ? global : this || window,
    n = document,
    e = n.documentElement,
    o = (t.BSN = {}),
    i = (o.supports = []),
    a = "Transition",
    s = "Webkit",
    r = "style",
    u = s + a in e[r] || a.toLowerCase() in e[r],
    c = s + a in e[r] ? s.toLowerCase() + a + "End" : a.toLowerCase() + "end",
    l =
      s + "Duration" in e[r]
        ? s.toLowerCase() + a + "Duration"
        : a.toLowerCase() + "Duration",
    d = function(t, n) {
      t.classList.add(n)
    },
    f = function(t, n) {
      t.classList.remove(n)
    },
    h = function(t, n) {
      return t.classList.contains(n)
    },
    v = function(t, e) {
      var o = e || n
      return "object" == typeof t ? t : o.querySelector(t)
    },
    m = function(t, e) {
      var o = e.charAt(0),
        i = e.substr(1)
      if ("." === o) {
        for (; t && t !== n; t = t.parentNode)
          if (null !== v(e, t.parentNode) && h(t, i)) return t
      } else if ("#" === o)
        for (; t && t !== n; t = t.parentNode) if (t.id === i) return t
      return !1
    },
    p = function(t, n, e, o) {
      ;(o = o || !1), t.addEventListener(n, e, o)
    },
    w = function(t, n, e, o) {
      ;(o = o || !1), t.removeEventListener(n, e, o)
    },
    y = function(t, n, e, o) {
      p(
        t,
        n,
        function i(a) {
          e(a), w(t, n, i, o)
        },
        o
      )
    },
    b =
      ((function() {
        var n = !1
        try {
          var e = Object.defineProperty({}, "passive", {
            get: function() {
              n = !0
            },
          })
          y(t, "testPassive", null, e)
        } catch (t) {}
      })(),
      function(n) {
        var e = u ? t.getComputedStyle(n)[l] : 0
        return (
          (e = parseFloat(e)),
          (e = "number" != typeof e || isNaN(e) ? 0 : 1e3 * e)
        )
      }),
    g = function(t, n) {
      var e = 0
      b(t)
        ? y(t, c, function(t) {
            !e && n(t), (e = 1)
          })
        : setTimeout(function() {
            !e && n(), (e = 1)
          }, 17)
    },
    T = function(t, n, e) {
      var o = new CustomEvent(t + ".bs." + n)
      ;(o.relatedTarget = e), this.dispatchEvent(o)
    }
  o.version = "2.0.28"
  var L = function(t, n) {
    ;(t = v(t)), (n = n || {})
    var e = t.getAttribute("data-animation"),
      o = t.getAttribute("data-autohide"),
      i = t.getAttribute("data-delay")
    ;(this.animation = !1 === n.animation || "false" === e ? 0 : 1),
      (this.autohide = !1 === n.autohide || "false" === o ? 0 : 1),
      (this.delay = parseInt(n.delay || i) || 500)
    var a = this,
      s = 0,
      r = m(t, ".toast"),
      u = function() {
        f(r, "showing"),
          d(r, "show"),
          T.call(r, "shown", "toast"),
          a.autohide && a.hide()
      },
      c = function() {
        d(r, "hide"), T.call(r, "hidden", "toast")
      },
      l = function() {
        f(r, "show"), a.animation ? g(r, c) : c()
      },
      y = function() {
        clearTimeout(s),
          (s = null),
          d(r, "hide"),
          w(t, "click", a.hide),
          (t.Toast = null),
          (t = null),
          (r = null)
      }
    ;(this.show = function() {
      r &&
        (T.call(r, "show", "toast"),
        a.animation && d(r, "fade"),
        f(r, "hide"),
        d(r, "showing"),
        a.animation ? g(r, u) : u())
    }),
      (this.hide = function(t) {
        r &&
          h(r, "show") &&
          (T.call(r, "hide", "toast"), t ? l() : (s = setTimeout(l, a.delay)))
      }),
      (this.dispose = function() {
        r && h(r, "show") && (f(r, "show"), a.animation ? g(r, y) : y())
      }),
      "Toast" in t || p(t, "click", a.hide),
      (t.Toast = a)
  }
  i.push(["Toast", L, '[data-dismiss="toast"]'])
  var C = function(t, n) {
      for (var e = 0, o = n.length; e < o; e++) new t(n[e])
    },
    E = (o.initCallback = function(t) {
      t = t || n
      for (var e = 0, o = i.length; e < o; e++)
        C(i[e][1], t.querySelectorAll(i[e][2]))
    })
  return (
    n.body
      ? E()
      : p(n, "DOMContentLoaded", function() {
          E()
        }),
    { Toast: L }
  )
})

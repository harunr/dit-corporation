! function(t) {
    if ("function" == typeof define && define.amd && define("uikit", function() {
            var i = window.UIkit2 || t(window, window.jQuery, window.document);
            return i.load = function(t, e, n, o) {
                var s, a = t.split(","),
                    r = [],
                    l = (o.config && o.config.uikit && o.config.uikit.base ? o.config.uikit.base : "").replace(/\/+$/g, "");
                if (!l) throw new Error("Please define base path to UIkit in the requirejs config.");
                for (s = 0; s < a.length; s += 1) {
                    var c = a[s].replace(/\./g, "/");
                    r.push(l + "/components/" + c)
                }
                e(r, function() {
                    n(i)
                })
            }, i
        }), !window.jQuery) throw new Error("UIkit 2.x requires jQuery");
    window && window.jQuery && !window.UIkit2 && t(window, window.jQuery, window.document)
}(function(t, i, e) {
    "use strict";
    var n = {},
        o = t.UIkit || void 0;
    if (n.version = "2.27.2", n.noConflict = function() {
            return o && (t.UIkit = o, i.UIkit = o, i.fn.uk = o.fn), n
        }, t.UIkit2 = n, o || (t.UIkit = n), n.$ = i, n.$doc = n.$(document), n.$win = n.$(window), n.$html = n.$("html"), n.support = {}, n.support.transition = function() {
            var t = function() {
                var t, i = e.body || e.documentElement,
                    n = {
                        WebkitTransition: "webkitTransitionEnd",
                        MozTransition: "transitionend",
                        OTransition: "oTransitionEnd otransitionend",
                        transition: "transitionend"
                    };
                for (t in n)
                    if (void 0 !== i.style[t]) return n[t]
            }();
            return t && {
                end: t
            }
        }(), n.support.animation = function() {
            var t = function() {
                var t, i = e.body || e.documentElement,
                    n = {
                        WebkitAnimation: "webkitAnimationEnd",
                        MozAnimation: "animationend",
                        OAnimation: "oAnimationEnd oanimationend",
                        animation: "animationend"
                    };
                for (t in n)
                    if (void 0 !== i.style[t]) return n[t]
            }();
            return t && {
                end: t
            }
        }(), function() {
            Date.now = Date.now || function() {
                return (new Date).getTime()
            };
            for (var t = ["webkit", "moz"], i = 0; i < t.length && !window.requestAnimationFrame; ++i) {
                var e = t[i];
                window.requestAnimationFrame = window[e + "RequestAnimationFrame"], window.cancelAnimationFrame = window[e + "CancelAnimationFrame"] || window[e + "CancelRequestAnimationFrame"]
            }
            if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
                var n = 0;
                window.requestAnimationFrame = function(t) {
                    var i = Date.now(),
                        e = Math.max(n + 16, i);
                    return setTimeout(function() {
                        t(n = e)
                    }, e - i)
                }, window.cancelAnimationFrame = clearTimeout
            }
        }(), n.support.touch = "ontouchstart" in document || t.DocumentTouch && document instanceof t.DocumentTouch || t.navigator.msPointerEnabled && t.navigator.msMaxTouchPoints > 0 || t.navigator.pointerEnabled && t.navigator.maxTouchPoints > 0 || !1, n.support.mutationobserver = t.MutationObserver || t.WebKitMutationObserver || null, n.Utils = {}, n.Utils.isFullscreen = function() {
            return document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || document.fullscreenElement || !1
        }, n.Utils.str2json = function(t, i) {
            try {
                return i ? JSON.parse(t.replace(/([\$\w]+)\s*:/g, function(t, i) {
                    return '"' + i + '":'
                }).replace(/'([^']+)'/g, function(t, i) {
                    return '"' + i + '"'
                })) : new Function("", "var json = " + t + "; return JSON.parse(JSON.stringify(json));")()
            } catch (e) {
                return !1
            }
        }, n.Utils.debounce = function(t, i, e) {
            var n;
            return function() {
                var o = this,
                    s = arguments,
                    a = function() {
                        n = null, e || t.apply(o, s)
                    },
                    r = e && !n;
                clearTimeout(n), n = setTimeout(a, i), r && t.apply(o, s)
            }
        }, n.Utils.throttle = function(t, i) {
            var e = !1;
            return function() {
                e || (t.call(), e = !0, setTimeout(function() {
                    e = !1
                }, i))
            }
        }, n.Utils.removeCssRules = function(t) {
            var i, e, n, o, s, a, r, l, c, d;
            t && setTimeout(function() {
                try {
                    for (d = document.styleSheets, o = 0, r = d.length; o < r; o++) {
                        for (n = d[o], e = [], n.cssRules = n.cssRules, i = s = 0, l = n.cssRules.length; s < l; i = ++s) n.cssRules[i].type === CSSRule.STYLE_RULE && t.test(n.cssRules[i].selectorText) && e.unshift(i);
                        for (a = 0, c = e.length; a < c; a++) n.deleteRule(e[a])
                    }
                } catch (u) {}
            }, 0)
        }, n.Utils.isInView = function(t, e) {
            var o = i(t);
            if (!o.is(":visible")) return !1;
            var s = n.$win.scrollLeft(),
                a = n.$win.scrollTop(),
                r = o.offset(),
                l = r.left,
                c = r.top;
            return e = i.extend({
                topoffset: 0,
                leftoffset: 0
            }, e), c + o.height() >= a && c - e.topoffset <= a + n.$win.height() && l + o.width() >= s && l - e.leftoffset <= s + n.$win.width()
        }, n.Utils.template = function(t, i) {
            for (var e, n, o, s, a = t.replace(/\n/g, "\\n").replace(/\{\{\{\s*(.+?)\s*\}\}\}/g, "{{!$1}}").split(/(\{\{\s*(.+?)\s*\}\})/g), r = 0, l = [], c = 0; r < a.length;) {
                if (e = a[r], e.match(/\{\{\s*(.+?)\s*\}\}/)) switch (r += 1, e = a[r], n = e[0], o = e.substring(e.match(/^(\^|\#|\!|\~|\:)/) ? 1 : 0), n) {
                    case "~":
                        l.push("for(var $i=0;$i<" + o + ".length;$i++) { var $item = " + o + "[$i];"), c++;
                        break;
                    case ":":
                        l.push("for(var $key in " + o + ") { var $val = " + o + "[$key];"), c++;
                        break;
                    case "#":
                        l.push("if(" + o + ") {"), c++;
                        break;
                    case "^":
                        l.push("if(!" + o + ") {"), c++;
                        break;
                    case "/":
                        l.push("}"), c--;
                        break;
                    case "!":
                        l.push("__ret.push(" + o + ");");
                        break;
                    default:
                        l.push("__ret.push(escape(" + o + "));")
                } else l.push("__ret.push('" + e.replace(/\'/g, "\\'") + "');");
                r += 1
            }
            return s = new Function("$data", ["var __ret = [];", "try {", "with($data){", c ? '__ret = ["Not all blocks are closed correctly."]' : l.join(""), "};", "}catch(e){__ret = [e.message];}", 'return __ret.join("").replace(/\\n\\n/g, "\\n");', "function escape(html) { return String(html).replace(/&/g, '&amp;').replace(/\"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');}"].join("\n")), i ? s(i) : s
        }, n.Utils.events = {}, n.Utils.events.click = n.support.touch ? "tap" : "click", n.fn = function(t, e) {
            var o = arguments,
                s = t.match(/^([a-z\-]+)(?:\.([a-z]+))?/i),
                a = s[1],
                r = s[2];
            return n[a] ? this.each(function() {
                var t = i(this),
                    s = t.data(a);
                s || t.data(a, s = n[a](this, r ? void 0 : e)), r && s[r].apply(s, Array.prototype.slice.call(o, 1))
            }) : (i.error("UIkit component [" + a + "] does not exist."), this)
        }, i.UIkit = n, i.fn.uk = n.fn, n.langdirection = "rtl" == n.$html.attr("dir") ? "right" : "left", n.components = {}, n.component = function(t, e, o) {
            if (n.components[t] && !o) return n.components[t];

            return s.plugins = {}, i.extend(!0, s.prototype, {
                defaults: {
                    plugins: []
                },


                option: function() {
                    return 1 == arguments.length ? this.options[arguments[0]] || void 0 : void(2 == arguments.length && (this.options[arguments[0]] = arguments[1]))
                }
            }, e), this.components[t] = s, this[t] = function() {
                var e, o;
                if (arguments.length) switch (arguments.length) {
                    case 1:
                        "string" == typeof arguments[0] || arguments[0].nodeType || arguments[0] instanceof jQuery ? e = i(arguments[0]) : o = arguments[0];
                        break;
                    case 2:
                        e = i(arguments[0]), o = arguments[1]
                }
                return e && e.data(t) ? e.data(t) : new n.components[t](e, o)
            }, n.domready && n.component.boot(t), s
        }, document.addEventListener("DOMContentLoaded", function() {

            return "complete" != document.readyState && "interactive" != document.readyState || setTimeout(t), t
        }()), n.$html.addClass(n.support.touch ? "icr-touch" : "icr-notouch"), n.support.touch) {
        var s, a = !1,
            r = "icr-hover",
            l = ".icr-overlay, .icr-overlay-hover, .icr-overlay-toggle, .ic-hover, .icr-has-hover";
        n.$html.on("mouseenter touchstart MSPointerDown pointerdown", l, function() {
            a && i("." + r).removeClass(r), a = i(this).addClass(r)
        }).on("mouseleave touchend MSPointerUp pointerup", function(t) {
            s = i(t.target).parents(l), a && a.not(s).removeClass(r)
        })
    }
    return n
});
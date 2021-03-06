var ScrollOut = (function () {
    'use strict';

    function noop() { }

    var clearTask;
    var actions = [];
    var subscribers = [];
    function subscribe(fn) {
        subscribers.push(fn);
        clearTask || loop();
        return function () {
            subscribers = subscribers.filter(function (s) { return s != fn; });
            if (!subscribers.length && clearTask) {
                cancelAnimationFrame(clearTask);
            }
        };
    }
    function loop() {
        // process subscribers
        var s = subscribers.slice();
        s.forEach(function (s2) { return s2(); });
        // process actions collected
        var next = actions;
        actions = [];
        next.forEach(function (q) { return q.f.apply(0, q.a); });
        // schedule next loop if the queue needs it
        clearTask = subscribers.length ? requestAnimationFrame(loop) : 0;
    }
    function enqueue(fn) {
        fn = fn || noop;
        return function () {
            fn.apply(0, arguments);
        };
    }

    function clamp(v, min, max) {
        return min > v ? min : max < v ? max : v;
    }
    function sign(x) {
        return (x > 0) - (x < 0);
    }
    function round(n) {
        return Math.round(n * 10000) / 10000;
    }

    var cache = {};
    function hyphenate(value) {
        return cache[value] || (cache[value] = value.replace(/([A-Z])/g, replacer));
    }
    function replacer(match) {
        return "-" + match[0].toLowerCase();
    }

    var win = window;
    var root = document.documentElement;
    /** find elements */
    function $(e, parent) {
        return !e || e.length == 0
            ? // null or empty string returns empty array
                []
            : e.nodeName
                ? // a single element is wrapped in an array
                    [e]
                : // selector and NodeList are converted to Element[]
                    [].slice.call(e[0].nodeName ? e : (parent || root).querySelectorAll(e));
    }
    var setAttrs = enqueue(function (el, attrs) {
        for (var key in attrs) {
            el.setAttribute("data-" + hyphenate(key), attrs[key]);
        }
    });
    var setProps = function (cssProps) {
        return enqueue(function (el, props) {
            for (var key in props) {
                if (cssProps == true || cssProps[key]) {
                    el.style.setProperty("--" + hyphenate(key), round(props[key]));
                }
            }
        });
    };

    var SCROLL = 'scroll';
    var RESIZE = 'resize';
    var ON = 'addEventListener';
    var OFF = 'removeEventListener';
    var lastId = 0;
    /**
     * Creates a new instance of ScrollOut that marks elements in the viewport with an "in" class
     * and marks elements outside of the viewport with an "out"
     */
    function main (opts) {
        // set default options
        opts = opts || {};
        var onChange = enqueue(opts.onChange);
        var onHidden = enqueue(opts.onHidden);
        var onShown = enqueue(opts.onShown);
        var props = opts.cssProps ? setProps(opts.cssProps) : noop;
        var se = opts.scrollingElement;
        var container = se ? $(se)[0] : win;
        var doc = se ? $(se)[0] : root;
        var id = ++lastId;
        var changeAndDetect = function (obj, key, value) {
            return obj[key + id] != (obj[key + id] = JSON.stringify(value));
        };
        var rootCtx;
        var elements;
        var shouldIndex;
        var index = function () {
            shouldIndex = true;
        };
        var cx, cy;
        var update = function () {
            // calculate position, direction and ratio
            var cw = doc.clientWidth;
            var ch = doc.clientHeight;
            var dirX = sign(-cx + (cx = doc.scrollLeft || win.pageXOffset));
            var dirY = sign(-cy + (cy = doc.scrollTop || win.pageYOffset));
            var scrollPercentX = doc.scrollLeft / (doc.scrollWidth - cw || 1);
            var scrollPercentY = doc.scrollTop / (doc.scrollHeight - ch || 1);
            // call update to dom
            rootCtx = {
                scrollDirX: dirX,
                scrollDirY: dirY,
                scrollPercentX: scrollPercentX,
                scrollPercentY: scrollPercentY
            };
            if (shouldIndex) {
                shouldIndex = false;
                elements = $(opts.targets || '[data-scroll]', $(opts.scope || doc)[0]).map(function (el) {
                    return {
                        $: el,
                        ctx: {}
                    };
                });
            }
            elements.forEach(function (obj) {
                var el = obj.$;
                // get element dimensions
                var x = el.offsetLeft;
                var y = el.offsetTop;
                var w = el.clientWidth;
                var h = el.clientHeight;
                // find visible ratios for each element
                var visibleX = (clamp(x + w, cx, cx + cw) - clamp(x, cx, cx + cw)) / w;
                var visibleY = (clamp(y + h, cy, cy + ch) - clamp(y, cy, cy + ch)) / h;
                var viewportX = clamp((cx - (w / 2 + x - cw / 2)) / (cw / 2), -1, 1);
                var viewportY = clamp((cy - (h / 2 + y - ch / 2)) / (ch / 2), -1, 1);
                obj.ctx = {
                    elementHeight: h,
                    elementWidth: w,
                    intersectX: visibleX == 1 ? 0 : sign(x - cx),
                    intersectY: visibleY == 1 ? 0 : sign(y - cy),
                    offsetX: x,
                    offsetY: y,
                    viewportX: viewportX,
                    viewportY: viewportY,
                    visibleX: visibleX,
                    visibleY: visibleY,
                    visible: +(opts.offset ? opts.offset <= cy : (opts.threshold || 0) < visibleX * visibleY)
                };
            });
        };
        var render = function () {
            if (!elements) {
                return;
            }
            if (changeAndDetect(doc, '_S', rootCtx)) {
                setAttrs(doc, {
                    scrollDirX: rootCtx.scrollDirX,
                    scrollDirY: rootCtx.scrollDirY
                });
                props(doc, rootCtx);
            }
            var len = elements.length;
            for (var x = len - 1; x > -1; x--) {
                var obj = elements[x];
                var el = obj.$;
                var ctx = obj.ctx;
                var visible = ctx.visible;
                if (changeAndDetect(el, '_SO', ctx)) {
                    // if percentage visibility has changed, update
                    props(el, ctx);
                }
                // handle callbacks
                if (changeAndDetect(el, '_SV', visible)) {
                    setAttrs(el, {
                        scroll: visible ? 'in' : 'out'
                    });
                    onChange(el, ctx, doc);
                    (visible ? onShown : onHidden)(el, ctx, doc);
                }
                // if this is shown multiple times, keep it in the list
                if (visible && opts.once) {
                    elements.splice(x, 1);
                }
            }
        };
        var sub = subscribe(render);
        // run initialize index
        index();
        update();
        // hook up document listeners to automatically detect changes
        win[ON](RESIZE, index);
        container[ON](SCROLL, update);
        return {
            index: index,
            update: update,
            teardown: function () {
                sub();
                win[OFF](RESIZE, index);
                container[OFF](SCROLL, update);
            }
        };
    }

    return main;

}());

(function (e) {
    "use strict";

    function t(t, n) {
        var r = this;
        r.$elem = e(t), r.lineHeight = r._getLineHeight(), r.origHeight = r.$elem.height(), r.origTxt = r.$elem.html(), r.settings = e.extend({}, r._defaults, n || {}), r._setLines(), r.truncate();
        var i;
        e(window).resize(function () {
            clearTimeout(i), i = setTimeout(e.proxy(r.truncate, r), 200)
        })
    }
    t.prototype = {
        hide: function () {
            this._getCurrentLines() > this.settings.lines && this.$elem.animate({
                height: this.lineHeight * this.settings.lines
            }, e.proxy(this.truncate, this))
        },
        show: function () {
            this.$elem.height(this.$elem.height()), this._restoreOrigTxt(), this.$elem.animate({
                height: this.origHeight
            })
        },
        truncate: function () {
            this._prepareElem();
            var e = this._restoreOrigTxt(),
                t = this._getCurrentLines(),
                n = Math.round(e.length / t),
                r = Math.round(n / 2);
            if (t > this.settings.lines) {
                if (t > this.settings.lines + 1) {
                    e = this._truncateElementTxt((this.settings.lines + 1) * n);
                    while (this._getCurrentLines() > this.settings.lines + 1) e = this._truncateElementTxt(e.length - r)
                }
                while (this._getCurrentLines() > this.settings.lines) {
                    if (e.length == r) {
                        this._recoverFromLoop(e);
                        break
                    }
                    e = this._truncateElementTxt(e.length - 1)
                }
            }
            this._restoreElem()
        },
        _defaults: {
            end: "…",
            lines: null
        },
        _getLineHeight: function () {
            var e = null;
            return document.body.currentStyle && (e = this.$elem.get(0).currentStyle.lineHeight, e.match(/px|PX|pt|PT|em|EM/) || this.$elem.css("line-height", e * 100 + "%")), parseInt(this.$elem.css("line-height"), 10)
        },
        _getCurrentLines: function () {
            return Math.round(this.$elem.height() / this.lineHeight)
        },
        _prepareElem: function () {
            this.css = {
                height: e.style(this.$elem, "height") || "auto",
                maxHeight: this.$elem.css("max-height"),
                minHeight: this.$elem.css("min-height")
            }, this.$elem.css({
                height: "auto",
                maxHeight: "none",
                minHeight: 0
            })
        },
        _recoverFromLoop: function (e) {
            var t = this.$elem.height(),
                n = this.origTxt.length;
            while (t == this.$elem.height() && e.length < n) e = this._truncateElementTxt(e.length + 1);
            this.$elem.height() != t && this._truncateElementTxt(e.length - 1), e.length == n && this._restoreOrigTxt()
        },
        _restoreElem: function () {
            this.$elem.css(this.css)
        },
        _restoreOrigTxt: function () {
            return this.$elem.html(this.origTxt), this.origTxt
        },
        _setLines: function () {
            if (!this.settings.lines) {
                var e = parseInt(this.$elem.css("max-height"), 10);
                e > this.lineHeight ? this.settings.lines = Math.floor(e / this.lineHeight) : this.settings.lines = 1
            }
        },
        _truncateElementTxt: function (e) {
            var t = this.origTxt.substring(0, e);
            return this.$elem.html(t + this.settings.end), t
        }
    }, e.fn.txtTruncate = function (n) {
        return this.each(function () {
            e(this).data("truncator", new t(this, n))
        })
    }
})(jQuery);
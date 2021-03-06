var eventSplitter = /\s+/,
    eventsApi = function(a, b, c, d) {
        if (!c) return !0;
        if ('object' == typeof c) {
            for (var e in c) a[b].apply(a, [e, c[e]].concat(d));
            return !1
        }
        if (eventSplitter.test(c)) {
            var f = c.split(eventSplitter);
            for (var g = 0, h = f.length; g < h; g++) a[b].apply(a, [f[g]].concat(d));
            return !1
        }
        return !0
    },
    triggerEvents = function(a, b) {
        var c, d = -1,
            e = a.length,
            f = b[0],
            g = b[1],
            h = b[2];
        switch (b.length) {
            case 0:
                for (; ++d < e;)(c = a[d]).callback.call(c.ctx);
                return;
            case 1:
                for (; ++d < e;)(c = a[d]).callback.call(c.ctx, f);
                return;
            case 2:
                for (; ++d < e;)(c = a[d]).callback.call(c.ctx, f, g);
                return;
            case 3:
                for (; ++d < e;)(c = a[d]).callback.call(c.ctx, f, g, h);
                return;
            default:
                for (; ++d < e;)(c = a[d]).callback.apply(c.ctx, b);
        }
    },
    _once = function(a) {
        var c, b = !1;
        return function() {
            return b ? c : (b = !0, c = a.apply(this, arguments), a = null, c)
        }
    },
    Events = {
        on: function(a, b, c) {
            if (!eventsApi(this, 'on', a, [b, c]) || !b) return this;
            this._events || (this._events = {});
            var d = this._events[a] || (this._events[a] = []);
            return d.push({
                callback: b,
                context: c,
                ctx: c || this
            }), this
        },
        once: function(a, b, c) {
            if (!eventsApi(this, 'once', a, [b, c]) || !b) return this;
            var d = this,
                e = _once(function() {
                    d.off(a, e), b.apply(this, arguments)
                });
            return e._callback = b, this.on(a, e, c)
        },
        off: function(a, b, c) {
            var d, e, f, g, h, m, n, o;
            if (!this._events || !eventsApi(this, 'off', a, [b, c])) return this;
            if (!a && !b && !c) return this._events = {}, this;
            for (g = a ? [a] : Object.keys(this._events), h = 0, m = g.length; h < m; h++)
                if (a = g[h], f = this._events[a]) {
                    if (this._events[a] = d = [], b || c)
                        for (n = 0, o = f.length; n < o; n++) e = f[n], (b && b !== e.callback && b !== e.callback._callback || c && c !== e.context) && d.push(e);
                    d.length || delete this._events[a]
                }
            return this
        },
        trigger: function(a) {
            if (!this._events) return this;
            var b = [].slice.call(arguments, 1);
            if (!eventsApi(this, 'trigger', a, b)) return this;
            var c = this._events[a],
                d = this._events.all;
            return c && triggerEvents(c, b), d && triggerEvents(d, arguments), this
        }
    };
module.exports = Events;
am4internal_webpackJsonp(["4859"], {
    "6JTK": function(e, t, i) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = {};
        i.d(r, "WordCloudDataItem", function() {
            return _
        }),
        i.d(r, "WordCloud", function() {
            return C
        }),
        i.d(r, "WordCloudSeriesDataItem", function() {
            return v
        }),
        i.d(r, "WordCloudSeries", function() {
            return x
        });
        var a = i("m4/l")
          , n = i("2I/e")
          , o = i("aM7D")
          , s = i("Vs7R")
          , l = i("C6dT")
          , u = i("p9TX")
          , h = i("vMqJ")
          , p = i("8ZqG")
          , c = i("aCit")
          , d = i("hGwe")
          , m = i("v9UT")
          , f = i("Gg2j")
          , g = i("58Sn")
          , y = i("tjMS")
          , b = i("hD5A")
          , v = function(e) {
            function t() {
                var t = e.call(this) || this;
                return t.className = "WordCloudSeriesDataItem",
                t.applyTheme(),
                t
            }
            return a.c(t, e),
            t.prototype.hide = function(t, i, r, a) {
                return a || (a = ["value"]),
                e.prototype.hide.call(this, t, i, 0, a)
            }
            ,
            t.prototype.setVisibility = function(t, i) {
                i || (t ? this.setWorkingValue("value", this.values.value.value, 0, 0) : this.setWorkingValue("value", 0, 0, 0)),
                e.prototype.setVisibility.call(this, t, i)
            }
            ,
            t.prototype.show = function(t, i, r) {
                return r || (r = ["value"]),
                e.prototype.show.call(this, t, i, r)
            }
            ,
            Object.defineProperty(t.prototype, "word", {
                get: function() {
                    return this.properties.word
                },
                set: function(e) {
                    this.setProperty("word", e)
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "label", {
                get: function() {
                    var e = this;
                    if (!this._label) {
                        var t = this.component.labels.create();
                        this._label = t,
                        this._disposers.push(t),
                        t.parent = this.component.labelsContainer,
                        t.isMeasured = !1,
                        t.x = Object(y.c)(50),
                        t.y = Object(y.c)(50),
                        t.fontSize = 0,
                        this.component.colors && (t.fill = this.component.colors.next()),
                        this._disposers.push(new b.b(function() {
                            e.component && e.component.labels.removeValue(t)
                        }
                        )),
                        this.addSprite(t),
                        t.visible = this.visible
                    }
                    return this._label
                },
                enumerable: !0,
                configurable: !0
            }),
            t
        }(o.b)
          , x = function(e) {
            function t() {
                var t = e.call(this) || this;
                t._adjustedFont = 1,
                t.className = "WordCloudSeries",
                t.accuracy = 5,
                t.isMeasured = !0,
                t.minFontSize = Object(y.c)(2),
                t.maxFontSize = Object(y.c)(20),
                t.excludeWords = [],
                t.layout = "absolute",
                t.angles = [0, 0, 90],
                t.rotationThreshold = .7,
                t.minWordLength = 1,
                t.width = Object(y.c)(100),
                t.height = Object(y.c)(100),
                t.step = 15,
                t.randomness = .2,
                t.labels.template.horizontalCenter = "middle",
                t.labels.template.verticalCenter = "middle",
                t.itemReaderText = "{word}: {value}",
                t.applyTheme();
                var i = document.createElement("canvas");
                i.style.position = "absolute",
                i.style.top = "0px",
                i.style.left = "0px",
                i.style.opacity = "0.5",
                t._canvas = i,
                t._ctx = i.getContext("2d"),
                t._maskSprite = t.createChild(s.a);
                var r = t.createChild(l.a);
                return r.shouldClone = !1,
                r.isMeasured = !1,
                r.layout = "none",
                t.labelsContainer = r,
                t._spiral = r.createChild(s.a),
                t._spiral.fillOpacity = .1,
                t._spiral.strokeOpacity = 1,
                t._spiral.stroke = Object(p.c)("#000"),
                t
            }
            return a.c(t, e),
            t.prototype.validateDataRange = function() {
                e.prototype.validateDataRange.call(this),
                this.dataItems.each(function(e) {
                    m.used(e.label)
                })
            }
            ,
            t.prototype.validate = function() {
                e.prototype.validate.call(this),
                this._currentIndex = 0,
                this.dataItems.values.sort(function(e, t) {
                    return e.value == t.value ? 0 : e.value > t.value ? -1 : 1
                }),
                this._processTimeout && this._processTimeout.dispose();
                var t = this.innerWidth
                  , i = this.innerHeight;
                if (t > 0 && i > 0) {
                    var r = this._ctx;
                    this._canvas.width = t,
                    this._canvas.height = i,
                    r.fillStyle = "white",
                    r.fillRect(0, 0, t, i),
                    this._points = d.spiralPoints(0, 0, t, i, 0, this.step, this.step);
                    for (var a = this.labelsContainer.rotation, n = this._points.length - 1; n >= 0; n--) {
                        var o = this._points[n];
                        if (o.x < -t / 2 || o.x > t / 2 || o.y < -i / 2 || o.y > i / 2)
                            this._points.splice(n, 1);
                        else if (0 != a) {
                            var s = m.spritePointToSprite({
                                x: o.x + t / 2,
                                y: o.y + i / 2
                            }, this, this.labelsContainer);
                            o.x = s.x,
                            o.y = s.y
                        }
                    }
                    var l = this._maskSprite;
                    if (l.path) {
                        var u = this.maxWidth
                          , h = this.maxHeight;
                        l.isMeasured = !0,
                        l.validate();
                        var p = l.measuredWidth / l.scale
                          , c = l.measuredHeight / l.scale
                          , g = f.min(h / c, u / p);
                        g == 1 / 0 && (g = 1),
                        l.horizontalCenter = "none",
                        l.verticalCenter = "none",
                        l.x = 0,
                        l.y = 0,
                        l.scale = 1,
                        g = f.max(.001, g),
                        l.horizontalCenter = "middle",
                        l.verticalCenter = "middle",
                        l.x = t / 2,
                        l.y = i / 2,
                        l.validatePosition(),
                        this.mask = l,
                        l.scale = g
                    }
                    this.events.isEnabled("arrangestarted") && this.dispatchImmediately("arrangestarted"),
                    this.processItem(this.dataItems.getIndex(this._currentIndex))
                }
            }
            ,
            t.prototype.processItem = function(e) {
                var t = this;
                if (e) {
                    var i = this._ctx
                      , r = this.innerWidth
                      , a = this.innerHeight;
                    if (g.u(this.htmlContainer))
                        return this._processTimeout = this.setTimeout(function() {
                            t._currentIndex++,
                            t.processItem(t.dataItems.getIndex(t._currentIndex))
                        }, 500),
                        void this._disposers.push(this._processTimeout);
                    this.labelsContainer.x = r / 2,
                    this.labelsContainer.y = a / 2;
                    var n = e.label
                      , o = g.l(n.element.node)
                      , s = f.min(this.innerHeight, this.innerWidth)
                      , l = m.relativeToValue(this.minFontSize, s)
                      , u = m.relativeToValue(this.maxFontSize, s)
                      , h = this.dataItem.values.value.low
                      , p = this.dataItem.values.value.high
                      , c = (e.value - h) / (p - h);
                    if (h == p)
                        c = this.dataItems.length > 1 ? 1 / this.dataItems.length * 1.5 : 1;
                    var d = l + (u - l) * c * this._adjustedFont
                      , y = n.fontSize;
                    n.fontSize = d;
                    var b = 0;
                    if ((d - l) / (u - l) < this.rotationThreshold && (b = this.angles[Math.round(Math.random() * (this.angles.length - 1))]),
                    n.fontSize = d,
                    n.rotation = b,
                    n.show(0),
                    n.hardInvalidate(),
                    n.validate(),
                    n.measuredWidth > .95 * r || n.measuredHeight > .95 * a)
                        return this._adjustedFont -= .1,
                        this.invalidateDataItems(),
                        void this.invalidate();
                    var v = n.maxLeft
                      , x = n.maxRight
                      , _ = n.maxTop
                      , C = n.maxBottom
                      , P = !0
                      , I = Math.round(Math.random() * this._points.length * this.randomness)
                      , w = n.pixelX
                      , V = n.pixelY
                      , W = 0
                      , S = 0;
                    if (m.used(this.labelsContainer.rotation),
                    this._currentIndex > 0)
                        for (; P; ) {
                            if (I > this._points.length - 1)
                                return P = !1,
                                this._adjustedFont -= .1,
                                void this.invalidateDataItems();
                            P = !1,
                            W = this._points[I].x,
                            S = this._points[I].y;
                            for (var j = n.pixelMarginLeft, T = n.pixelMarginRight, O = n.pixelMarginTop, z = {
                                x: W + v - j,
                                y: S + _ - O,
                                width: x - v + j + T,
                                height: C - _ + O + n.pixelMarginBottom
                            }, D = this._ctx.getImageData(z.x + r / 2, z.y + a / 2, z.width, z.height).data, M = 0; M < D.length; M += Math.pow(2, this.accuracy))
                                if (255 != D[M]) {
                                    P = !0,
                                    n.currentText.length > 3 && (0 == b && x - v < 60 && this._points.splice(I, 1),
                                    90 == Math.abs(b) && C - _ < 50 && this._points.splice(I, 1));
                                    break
                                }
                            I += 5
                        }
                    0 == y ? (n.animate([{
                        property: "fontSize",
                        to: d,
                        from: y
                    }], this.interpolationDuration, this.interpolationEasing),
                    n.x = W,
                    n.y = S) : n.animate([{
                        property: "fontSize",
                        to: d,
                        from: y
                    }, {
                        property: "x",
                        to: W,
                        from: w
                    }, {
                        property: "y",
                        to: S,
                        from: V
                    }], this.interpolationDuration, this.interpolationEasing);
                    var F = W + r / 2
                      , L = S + a / 2;
                    i.translate(F, L);
                    var k = n.rotation * Math.PI / 180;
                    i.rotate(k),
                    i.textAlign = "center",
                    i.textBaseline = "middle",
                    i.fillStyle = "blue";
                    var R = (n.fontWeight || this.fontWeight || this.chart.fontWeight || "normal") + " " + d + "px " + o;
                    if (i.font = R,
                    i.fillText(n.currentText, 0, 0),
                    i.rotate(-k),
                    i.translate(-F, -L),
                    n.showOnInit && (n.hide(0),
                    n.show()),
                    this.events.isEnabled("arrangeprogress")) {
                        var E = {
                            type: "arrangeprogress",
                            target: this,
                            progress: (this._currentIndex + 1) / this.dataItems.length
                        };
                        this.events.dispatchImmediately("arrangeprogress", E)
                    }
                    this._currentIndex < this.dataItems.length - 1 ? (this._processTimeout = this.setTimeout(function() {
                        t._currentIndex++,
                        t.processItem(t.dataItems.getIndex(t._currentIndex))
                    }, 1),
                    this._disposers.push(this._processTimeout)) : this.events.isEnabled("arrangeended") && this.dispatchImmediately("arrangeended")
                }
            }
            ,
            t.prototype.createLabel = function() {
                return new u.a
            }
            ,
            Object.defineProperty(t.prototype, "labels", {
                get: function() {
                    if (!this._labels) {
                        var e = this.createLabel();
                        e.applyOnClones = !0,
                        this._disposers.push(e),
                        e.text = "{word}",
                        e.margin(2, 3, 2, 3),
                        e.padding(0, 0, 0, 0),
                        this._labels = new h.e(e),
                        this._disposers.push(new h.c(this._labels))
                    }
                    return this._labels
                },
                enumerable: !0,
                configurable: !0
            }),
            t.prototype.createDataItem = function() {
                return new v
            }
            ,
            Object.defineProperty(t.prototype, "colors", {
                get: function() {
                    return this.getPropertyValue("colors")
                },
                set: function(e) {
                    this.setPropertyValue("colors", e, !0)
                },
                enumerable: !0,
                configurable: !0
            }),
            t.prototype.updateData = function() {
                this.data = this.getWords(this.text)
            }
            ,
            Object.defineProperty(t.prototype, "text", {
                get: function() {
                    return this.getPropertyValue("text")
                },
                set: function(e) {
                    this.setPropertyValue("text", e) && this.updateData()
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "maxCount", {
                get: function() {
                    return this.getPropertyValue("maxCount")
                },
                set: function(e) {
                    this.setPropertyValue("maxCount", e) && this.updateData()
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "minValue", {
                get: function() {
                    return this.getPropertyValue("minValue")
                },
                set: function(e) {
                    this.setPropertyValue("minValue", e) && this.updateData()
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "excludeWords", {
                get: function() {
                    return this.getPropertyValue("excludeWords")
                },
                set: function(e) {
                    this.setPropertyValue("excludeWords", e) && this.updateData()
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "maxFontSize", {
                get: function() {
                    return this.getPropertyValue("maxFontSize")
                },
                set: function(e) {
                    this.setPropertyValue("maxFontSize", e, !0)
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "minFontSize", {
                get: function() {
                    return this.getPropertyValue("minFontSize")
                },
                set: function(e) {
                    this.setPropertyValue("minFontSize", e, !0)
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "randomness", {
                get: function() {
                    return this.getPropertyValue("randomness")
                },
                set: function(e) {
                    this.setPropertyValue("randomness", e, !0)
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "step", {
                get: function() {
                    return this.getPropertyValue("step")
                },
                set: function(e) {
                    this.setPropertyValue("step", e, !0)
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "accuracy", {
                get: function() {
                    return this.getPropertyValue("accuracy")
                },
                set: function(e) {
                    this.setPropertyValue("accuracy", e, !0)
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "minWordLength", {
                get: function() {
                    return this.getPropertyValue("minWordLength")
                },
                set: function(e) {
                    this.setPropertyValue("minWordLength", e) && this.updateData()
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "rotationThreshold", {
                get: function() {
                    return this.getPropertyValue("rotationThreshold")
                },
                set: function(e) {
                    this.setPropertyValue("rotationThreshold", e, !0)
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "angles", {
                get: function() {
                    return this.getPropertyValue("angles")
                },
                set: function(e) {
                    this.setPropertyValue("angles", e, !0)
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(t.prototype, "maskSprite", {
                get: function() {
                    return this._maskSprite
                },
                enumerable: !0,
                configurable: !0
            }),
            t.prototype.copyFrom = function(t) {
                e.prototype.copyFrom.call(this, t),
                this.labels.template.copyFrom(t.labels.template)
            }
            ,
            t.prototype.getWords = function(e) {
                if (e) {
                    this.dataFields.word = "word",
                    this.dataFields.value = "value";
                    var t = new RegExp("[\u0041-\u005A\u0061-\u007A\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376-\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0523\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0621-\u064A\u066E-\u066F\u0671-\u06D3\u06D5\u06E5-\u06E6\u06EE-\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4-\u07F5\u07FA\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0972\u097B-\u097F\u0985-\u098C\u098F-\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC-\u09DD\u09DF-\u09E1\u09F0-\u09F1\u0A05-\u0A0A\u0A0F-\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32-\u0A33\u0A35-\u0A36\u0A38-\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2-\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0-\u0AE1\u0B05-\u0B0C\u0B0F-\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32-\u0B33\u0B35-\u0B39\u0B3D\u0B5C-\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99-\u0B9A\u0B9C\u0B9E-\u0B9F\u0BA3-\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58-\u0C59\u0C60-\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0-\u0CE1\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D28\u0D2A-\u0D39\u0D3D\u0D60-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32-\u0E33\u0E40-\u0E46\u0E81-\u0E82\u0E84\u0E87-\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA-\u0EAB\u0EAD-\u0EB0\u0EB2-\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDD\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8B\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065-\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10D0-\u10FA\u10FC\u1100-\u1159\u115F-\u11A2\u11A8-\u11F9\u1200-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u1676\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F0\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19A9\u19C1-\u19C7\u1A00-\u1A16\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE-\u1BAF\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u2094\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2C6F\u2C71-\u2C7D\u2C80-\u2CE4\u2D00-\u2D25\u2D30-\u2D65\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31B7\u31F0-\u31FF\u3400\u4DB5\u4E00\u9FC3\uA000-\uA48C\uA500-\uA60C\uA610-\uA61F\uA62A-\uA62B\uA640-\uA65F\uA662-\uA66E\uA67F-\uA697\uA717-\uA71F\uA722-\uA788\uA78B-\uA78C\uA7FB-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA90A-\uA925\uA930-\uA946\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAC00\uD7A3\uF900-\uFA2D\uFA30-\uFA6A\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40-\uFB41\uFB43-\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC0-9@+]+","ig")
                      , i = e.match(t);
                    if (!i)
                        return [];
                    for (var r = [], a = void 0; a = i.pop(); ) {
                        for (var n = void 0, o = 0; o < r.length; o++)
                            if (r[o].word.toLowerCase() == a.toLowerCase()) {
                                n = r[o];
                                break
                            }
                        n ? (n.value++,
                        this.isCapitalized(a) || (n.word = a)) : r.push({
                            word: a,
                            value: 1
                        })
                    }
                    var s = this.excludeWords;
                    if (this.minValue > 1 || this.minWordLength > 1 || s && s.length > 0)
                        for (o = r.length - 1; o >= 0; o--) {
                            var l = r[o];
                            l.value < this.minValue && r.splice(o, 1),
                            l.word.length < this.minWordLength && r.splice(o, 1),
                            -1 !== s.indexOf(l.word) && r.splice(o, 1)
                        }
                    return r.sort(function(e, t) {
                        return e.value == t.value ? 0 : e.value > t.value ? -1 : 1
                    }),
                    r.length > this.maxCount && (r = r.slice(0, this.maxCount)),
                    r
                }
            }
            ,
            t.prototype.isCapitalized = function(e) {
                var t = e.toLowerCase();
                return e[0] != t[0] && e.substr(1) == t.substr(1) && e != t
            }
            ,
            t
        }(o.a);
        c.b.registeredClasses.WordCloudSeries = x,
        c.b.registeredClasses.WordCloudSeriesDataItem = v;
        var _ = function(e) {
            function t() {
                var t = e.call(this) || this;
                return t.className = "WordCloudDataItem",
                t.applyTheme(),
                t
            }
            return a.c(t, e),
            t
        }(n.b)
          , C = function(e) {
            function t() {
                var t = e.call(this) || this;
                return t.className = "WordCloud",
                t.seriesContainer.isMeasured = !0,
                t.seriesContainer.layout = "absolute",
                t.applyTheme(),
                t
            }
            return a.c(t, e),
            t.prototype.createSeries = function() {
                return new x
            }
            ,
            t
        }(n.a);
        c.b.registeredClasses.WordCloud = C,
        c.b.registeredClasses.WordCloudDataItem = _,
        window.am4plugins_wordCloud = r
    }
}, ["6JTK"]);
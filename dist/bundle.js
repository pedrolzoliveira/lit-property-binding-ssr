(() => {
  // node_modules/@lit/reactive-element/css-tag.js
  var t = globalThis;
  var e = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
  var s = Symbol();
  var o = /* @__PURE__ */ new WeakMap();
  var n = class {
    constructor(t5, e5, o4) {
      if (this._$cssResult$ = true, o4 !== s)
        throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
      this.cssText = t5, this.t = e5;
    }
    get styleSheet() {
      let t5 = this.o;
      const s5 = this.t;
      if (e && void 0 === t5) {
        const e5 = void 0 !== s5 && 1 === s5.length;
        e5 && (t5 = o.get(s5)), void 0 === t5 && ((this.o = t5 = new CSSStyleSheet()).replaceSync(this.cssText), e5 && o.set(s5, t5));
      }
      return t5;
    }
    toString() {
      return this.cssText;
    }
  };
  var r = (t5) => new n("string" == typeof t5 ? t5 : t5 + "", void 0, s);
  var S = (s5, o4) => {
    if (e)
      s5.adoptedStyleSheets = o4.map((t5) => t5 instanceof CSSStyleSheet ? t5 : t5.styleSheet);
    else
      for (const e5 of o4) {
        const o5 = document.createElement("style"), n4 = t.litNonce;
        void 0 !== n4 && o5.setAttribute("nonce", n4), o5.textContent = e5.cssText, s5.appendChild(o5);
      }
  };
  var c = e ? (t5) => t5 : (t5) => t5 instanceof CSSStyleSheet ? ((t6) => {
    let e5 = "";
    for (const s5 of t6.cssRules)
      e5 += s5.cssText;
    return r(e5);
  })(t5) : t5;

  // node_modules/@lit/reactive-element/reactive-element.js
  var { is: i2, defineProperty: e2, getOwnPropertyDescriptor: r2, getOwnPropertyNames: h, getOwnPropertySymbols: o2, getPrototypeOf: n2 } = Object;
  var a = globalThis;
  var c2 = a.trustedTypes;
  var l = c2 ? c2.emptyScript : "";
  var p = a.reactiveElementPolyfillSupport;
  var d = (t5, s5) => t5;
  var u = { toAttribute(t5, s5) {
    switch (s5) {
      case Boolean:
        t5 = t5 ? l : null;
        break;
      case Object:
      case Array:
        t5 = null == t5 ? t5 : JSON.stringify(t5);
    }
    return t5;
  }, fromAttribute(t5, s5) {
    let i5 = t5;
    switch (s5) {
      case Boolean:
        i5 = null !== t5;
        break;
      case Number:
        i5 = null === t5 ? null : Number(t5);
        break;
      case Object:
      case Array:
        try {
          i5 = JSON.parse(t5);
        } catch (t6) {
          i5 = null;
        }
    }
    return i5;
  } };
  var f = (t5, s5) => !i2(t5, s5);
  var y = { attribute: true, type: String, converter: u, reflect: false, hasChanged: f };
  Symbol.metadata ??= Symbol("metadata"), a.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
  var b = class extends HTMLElement {
    static addInitializer(t5) {
      this._$Ei(), (this.l ??= []).push(t5);
    }
    static get observedAttributes() {
      return this.finalize(), this._$Eh && [...this._$Eh.keys()];
    }
    static createProperty(t5, s5 = y) {
      if (s5.state && (s5.attribute = false), this._$Ei(), this.elementProperties.set(t5, s5), !s5.noAccessor) {
        const i5 = Symbol(), r6 = this.getPropertyDescriptor(t5, i5, s5);
        void 0 !== r6 && e2(this.prototype, t5, r6);
      }
    }
    static getPropertyDescriptor(t5, s5, i5) {
      const { get: e5, set: h4 } = r2(this.prototype, t5) ?? { get() {
        return this[s5];
      }, set(t6) {
        this[s5] = t6;
      } };
      return { get() {
        return e5?.call(this);
      }, set(s6) {
        const r6 = e5?.call(this);
        h4.call(this, s6), this.requestUpdate(t5, r6, i5);
      }, configurable: true, enumerable: true };
    }
    static getPropertyOptions(t5) {
      return this.elementProperties.get(t5) ?? y;
    }
    static _$Ei() {
      if (this.hasOwnProperty(d("elementProperties")))
        return;
      const t5 = n2(this);
      t5.finalize(), void 0 !== t5.l && (this.l = [...t5.l]), this.elementProperties = new Map(t5.elementProperties);
    }
    static finalize() {
      if (this.hasOwnProperty(d("finalized")))
        return;
      if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d("properties"))) {
        const t6 = this.properties, s5 = [...h(t6), ...o2(t6)];
        for (const i5 of s5)
          this.createProperty(i5, t6[i5]);
      }
      const t5 = this[Symbol.metadata];
      if (null !== t5) {
        const s5 = litPropertyMetadata.get(t5);
        if (void 0 !== s5)
          for (const [t6, i5] of s5)
            this.elementProperties.set(t6, i5);
      }
      this._$Eh = /* @__PURE__ */ new Map();
      for (const [t6, s5] of this.elementProperties) {
        const i5 = this._$Eu(t6, s5);
        void 0 !== i5 && this._$Eh.set(i5, t6);
      }
      this.elementStyles = this.finalizeStyles(this.styles);
    }
    static finalizeStyles(s5) {
      const i5 = [];
      if (Array.isArray(s5)) {
        const e5 = new Set(s5.flat(1 / 0).reverse());
        for (const s6 of e5)
          i5.unshift(c(s6));
      } else
        void 0 !== s5 && i5.push(c(s5));
      return i5;
    }
    static _$Eu(t5, s5) {
      const i5 = s5.attribute;
      return false === i5 ? void 0 : "string" == typeof i5 ? i5 : "string" == typeof t5 ? t5.toLowerCase() : void 0;
    }
    constructor() {
      super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
    }
    _$Ev() {
      this._$Eg = new Promise((t5) => this.enableUpdating = t5), this._$AL = /* @__PURE__ */ new Map(), this._$ES(), this.requestUpdate(), this.constructor.l?.forEach((t5) => t5(this));
    }
    addController(t5) {
      (this._$E_ ??= /* @__PURE__ */ new Set()).add(t5), void 0 !== this.renderRoot && this.isConnected && t5.hostConnected?.();
    }
    removeController(t5) {
      this._$E_?.delete(t5);
    }
    _$ES() {
      const t5 = /* @__PURE__ */ new Map(), s5 = this.constructor.elementProperties;
      for (const i5 of s5.keys())
        this.hasOwnProperty(i5) && (t5.set(i5, this[i5]), delete this[i5]);
      t5.size > 0 && (this._$Ep = t5);
    }
    createRenderRoot() {
      const t5 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
      return S(t5, this.constructor.elementStyles), t5;
    }
    connectedCallback() {
      this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(true), this._$E_?.forEach((t5) => t5.hostConnected?.());
    }
    enableUpdating(t5) {
    }
    disconnectedCallback() {
      this._$E_?.forEach((t5) => t5.hostDisconnected?.());
    }
    attributeChangedCallback(t5, s5, i5) {
      this._$AK(t5, i5);
    }
    _$EO(t5, s5) {
      const i5 = this.constructor.elementProperties.get(t5), e5 = this.constructor._$Eu(t5, i5);
      if (void 0 !== e5 && true === i5.reflect) {
        const r6 = (void 0 !== i5.converter?.toAttribute ? i5.converter : u).toAttribute(s5, i5.type);
        this._$Em = t5, null == r6 ? this.removeAttribute(e5) : this.setAttribute(e5, r6), this._$Em = null;
      }
    }
    _$AK(t5, s5) {
      const i5 = this.constructor, e5 = i5._$Eh.get(t5);
      if (void 0 !== e5 && this._$Em !== e5) {
        const t6 = i5.getPropertyOptions(e5), r6 = "function" == typeof t6.converter ? { fromAttribute: t6.converter } : void 0 !== t6.converter?.fromAttribute ? t6.converter : u;
        this._$Em = e5, this[e5] = r6.fromAttribute(s5, t6.type), this._$Em = null;
      }
    }
    requestUpdate(t5, s5, i5, e5 = false, r6) {
      if (void 0 !== t5) {
        if (i5 ??= this.constructor.getPropertyOptions(t5), !(i5.hasChanged ?? f)(e5 ? r6 : this[t5], s5))
          return;
        this.C(t5, s5, i5);
      }
      false === this.isUpdatePending && (this._$Eg = this._$EP());
    }
    C(t5, s5, i5) {
      this._$AL.has(t5) || this._$AL.set(t5, s5), true === i5.reflect && this._$Em !== t5 && (this._$Ej ??= /* @__PURE__ */ new Set()).add(t5);
    }
    async _$EP() {
      this.isUpdatePending = true;
      try {
        await this._$Eg;
      } catch (t6) {
        Promise.reject(t6);
      }
      const t5 = this.scheduleUpdate();
      return null != t5 && await t5, !this.isUpdatePending;
    }
    scheduleUpdate() {
      return this.performUpdate();
    }
    performUpdate() {
      if (!this.isUpdatePending)
        return;
      if (!this.hasUpdated) {
        if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
          for (const [t7, s6] of this._$Ep)
            this[t7] = s6;
          this._$Ep = void 0;
        }
        const t6 = this.constructor.elementProperties;
        if (t6.size > 0)
          for (const [s6, i5] of t6)
            true !== i5.wrapped || this._$AL.has(s6) || void 0 === this[s6] || this.C(s6, this[s6], i5);
      }
      let t5 = false;
      const s5 = this._$AL;
      try {
        t5 = this.shouldUpdate(s5), t5 ? (this.willUpdate(s5), this._$E_?.forEach((t6) => t6.hostUpdate?.()), this.update(s5)) : this._$ET();
      } catch (s6) {
        throw t5 = false, this._$ET(), s6;
      }
      t5 && this._$AE(s5);
    }
    willUpdate(t5) {
    }
    _$AE(t5) {
      this._$E_?.forEach((t6) => t6.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t5)), this.updated(t5);
    }
    _$ET() {
      this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
    }
    get updateComplete() {
      return this.getUpdateComplete();
    }
    getUpdateComplete() {
      return this._$Eg;
    }
    shouldUpdate(t5) {
      return true;
    }
    update(t5) {
      this._$Ej &&= this._$Ej.forEach((t6) => this._$EO(t6, this[t6])), this._$ET();
    }
    updated(t5) {
    }
    firstUpdated(t5) {
    }
  };
  b.elementStyles = [], b.shadowRootOptions = { mode: "open" }, b[d("elementProperties")] = /* @__PURE__ */ new Map(), b[d("finalized")] = /* @__PURE__ */ new Map(), p?.({ ReactiveElement: b }), (a.reactiveElementVersions ??= []).push("2.0.2");

  // node_modules/lit-html/lit-html.js
  var t2 = globalThis;
  var i3 = t2.trustedTypes;
  var s2 = i3 ? i3.createPolicy("lit-html", { createHTML: (t5) => t5 }) : void 0;
  var e3 = "$lit$";
  var h2 = `lit$${(Math.random() + "").slice(9)}$`;
  var o3 = "?" + h2;
  var n3 = `<${o3}>`;
  var r3 = document;
  var l2 = () => r3.createComment("");
  var c3 = (t5) => null === t5 || "object" != typeof t5 && "function" != typeof t5;
  var a2 = Array.isArray;
  var u2 = (t5) => a2(t5) || "function" == typeof t5?.[Symbol.iterator];
  var d2 = "[ 	\n\f\r]";
  var f2 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
  var v = /-->/g;
  var _ = />/g;
  var m = RegExp(`>|${d2}(?:([^\\s"'>=/]+)(${d2}*=${d2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
  var p2 = /'/g;
  var g = /"/g;
  var $ = /^(?:script|style|textarea|title)$/i;
  var y2 = (t5) => (i5, ...s5) => ({ _$litType$: t5, strings: i5, values: s5 });
  var x = y2(1);
  var b2 = y2(2);
  var w = Symbol.for("lit-noChange");
  var T = Symbol.for("lit-nothing");
  var A = /* @__PURE__ */ new WeakMap();
  var E = r3.createTreeWalker(r3, 129);
  function C(t5, i5) {
    if (!Array.isArray(t5) || !t5.hasOwnProperty("raw"))
      throw Error("invalid template strings array");
    return void 0 !== s2 ? s2.createHTML(i5) : i5;
  }
  var P = (t5, i5) => {
    const s5 = t5.length - 1, o4 = [];
    let r6, l3 = 2 === i5 ? "<svg>" : "", c5 = f2;
    for (let i6 = 0; i6 < s5; i6++) {
      const s6 = t5[i6];
      let a3, u5, d3 = -1, y3 = 0;
      for (; y3 < s6.length && (c5.lastIndex = y3, u5 = c5.exec(s6), null !== u5); )
        y3 = c5.lastIndex, c5 === f2 ? "!--" === u5[1] ? c5 = v : void 0 !== u5[1] ? c5 = _ : void 0 !== u5[2] ? ($.test(u5[2]) && (r6 = RegExp("</" + u5[2], "g")), c5 = m) : void 0 !== u5[3] && (c5 = m) : c5 === m ? ">" === u5[0] ? (c5 = r6 ?? f2, d3 = -1) : void 0 === u5[1] ? d3 = -2 : (d3 = c5.lastIndex - u5[2].length, a3 = u5[1], c5 = void 0 === u5[3] ? m : '"' === u5[3] ? g : p2) : c5 === g || c5 === p2 ? c5 = m : c5 === v || c5 === _ ? c5 = f2 : (c5 = m, r6 = void 0);
      const x2 = c5 === m && t5[i6 + 1].startsWith("/>") ? " " : "";
      l3 += c5 === f2 ? s6 + n3 : d3 >= 0 ? (o4.push(a3), s6.slice(0, d3) + e3 + s6.slice(d3) + h2 + x2) : s6 + h2 + (-2 === d3 ? i6 : x2);
    }
    return [C(t5, l3 + (t5[s5] || "<?>") + (2 === i5 ? "</svg>" : "")), o4];
  };
  var V = class _V {
    constructor({ strings: t5, _$litType$: s5 }, n4) {
      let r6;
      this.parts = [];
      let c5 = 0, a3 = 0;
      const u5 = t5.length - 1, d3 = this.parts, [f3, v3] = P(t5, s5);
      if (this.el = _V.createElement(f3, n4), E.currentNode = this.el.content, 2 === s5) {
        const t6 = this.el.content.firstChild;
        t6.replaceWith(...t6.childNodes);
      }
      for (; null !== (r6 = E.nextNode()) && d3.length < u5; ) {
        if (1 === r6.nodeType) {
          if (r6.hasAttributes())
            for (const t6 of r6.getAttributeNames())
              if (t6.endsWith(e3)) {
                const i5 = v3[a3++], s6 = r6.getAttribute(t6).split(h2), e5 = /([.?@])?(.*)/.exec(i5);
                d3.push({ type: 1, index: c5, name: e5[2], strings: s6, ctor: "." === e5[1] ? k : "?" === e5[1] ? H : "@" === e5[1] ? I : R }), r6.removeAttribute(t6);
              } else
                t6.startsWith(h2) && (d3.push({ type: 6, index: c5 }), r6.removeAttribute(t6));
          if ($.test(r6.tagName)) {
            const t6 = r6.textContent.split(h2), s6 = t6.length - 1;
            if (s6 > 0) {
              r6.textContent = i3 ? i3.emptyScript : "";
              for (let i5 = 0; i5 < s6; i5++)
                r6.append(t6[i5], l2()), E.nextNode(), d3.push({ type: 2, index: ++c5 });
              r6.append(t6[s6], l2());
            }
          }
        } else if (8 === r6.nodeType)
          if (r6.data === o3)
            d3.push({ type: 2, index: c5 });
          else {
            let t6 = -1;
            for (; -1 !== (t6 = r6.data.indexOf(h2, t6 + 1)); )
              d3.push({ type: 7, index: c5 }), t6 += h2.length - 1;
          }
        c5++;
      }
    }
    static createElement(t5, i5) {
      const s5 = r3.createElement("template");
      return s5.innerHTML = t5, s5;
    }
  };
  function N(t5, i5, s5 = t5, e5) {
    if (i5 === w)
      return i5;
    let h4 = void 0 !== e5 ? s5._$Co?.[e5] : s5._$Cl;
    const o4 = c3(i5) ? void 0 : i5._$litDirective$;
    return h4?.constructor !== o4 && (h4?._$AO?.(false), void 0 === o4 ? h4 = void 0 : (h4 = new o4(t5), h4._$AT(t5, s5, e5)), void 0 !== e5 ? (s5._$Co ??= [])[e5] = h4 : s5._$Cl = h4), void 0 !== h4 && (i5 = N(t5, h4._$AS(t5, i5.values), h4, e5)), i5;
  }
  var S2 = class {
    constructor(t5, i5) {
      this._$AV = [], this._$AN = void 0, this._$AD = t5, this._$AM = i5;
    }
    get parentNode() {
      return this._$AM.parentNode;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    u(t5) {
      const { el: { content: i5 }, parts: s5 } = this._$AD, e5 = (t5?.creationScope ?? r3).importNode(i5, true);
      E.currentNode = e5;
      let h4 = E.nextNode(), o4 = 0, n4 = 0, l3 = s5[0];
      for (; void 0 !== l3; ) {
        if (o4 === l3.index) {
          let i6;
          2 === l3.type ? i6 = new M(h4, h4.nextSibling, this, t5) : 1 === l3.type ? i6 = new l3.ctor(h4, l3.name, l3.strings, this, t5) : 6 === l3.type && (i6 = new L(h4, this, t5)), this._$AV.push(i6), l3 = s5[++n4];
        }
        o4 !== l3?.index && (h4 = E.nextNode(), o4++);
      }
      return E.currentNode = r3, e5;
    }
    p(t5) {
      let i5 = 0;
      for (const s5 of this._$AV)
        void 0 !== s5 && (void 0 !== s5.strings ? (s5._$AI(t5, s5, i5), i5 += s5.strings.length - 2) : s5._$AI(t5[i5])), i5++;
    }
  };
  var M = class _M {
    get _$AU() {
      return this._$AM?._$AU ?? this._$Cv;
    }
    constructor(t5, i5, s5, e5) {
      this.type = 2, this._$AH = T, this._$AN = void 0, this._$AA = t5, this._$AB = i5, this._$AM = s5, this.options = e5, this._$Cv = e5?.isConnected ?? true;
    }
    get parentNode() {
      let t5 = this._$AA.parentNode;
      const i5 = this._$AM;
      return void 0 !== i5 && 11 === t5?.nodeType && (t5 = i5.parentNode), t5;
    }
    get startNode() {
      return this._$AA;
    }
    get endNode() {
      return this._$AB;
    }
    _$AI(t5, i5 = this) {
      t5 = N(this, t5, i5), c3(t5) ? t5 === T || null == t5 || "" === t5 ? (this._$AH !== T && this._$AR(), this._$AH = T) : t5 !== this._$AH && t5 !== w && this._(t5) : void 0 !== t5._$litType$ ? this.g(t5) : void 0 !== t5.nodeType ? this.$(t5) : u2(t5) ? this.T(t5) : this._(t5);
    }
    k(t5) {
      return this._$AA.parentNode.insertBefore(t5, this._$AB);
    }
    $(t5) {
      this._$AH !== t5 && (this._$AR(), this._$AH = this.k(t5));
    }
    _(t5) {
      this._$AH !== T && c3(this._$AH) ? this._$AA.nextSibling.data = t5 : this.$(r3.createTextNode(t5)), this._$AH = t5;
    }
    g(t5) {
      const { values: i5, _$litType$: s5 } = t5, e5 = "number" == typeof s5 ? this._$AC(t5) : (void 0 === s5.el && (s5.el = V.createElement(C(s5.h, s5.h[0]), this.options)), s5);
      if (this._$AH?._$AD === e5)
        this._$AH.p(i5);
      else {
        const t6 = new S2(e5, this), s6 = t6.u(this.options);
        t6.p(i5), this.$(s6), this._$AH = t6;
      }
    }
    _$AC(t5) {
      let i5 = A.get(t5.strings);
      return void 0 === i5 && A.set(t5.strings, i5 = new V(t5)), i5;
    }
    T(t5) {
      a2(this._$AH) || (this._$AH = [], this._$AR());
      const i5 = this._$AH;
      let s5, e5 = 0;
      for (const h4 of t5)
        e5 === i5.length ? i5.push(s5 = new _M(this.k(l2()), this.k(l2()), this, this.options)) : s5 = i5[e5], s5._$AI(h4), e5++;
      e5 < i5.length && (this._$AR(s5 && s5._$AB.nextSibling, e5), i5.length = e5);
    }
    _$AR(t5 = this._$AA.nextSibling, i5) {
      for (this._$AP?.(false, true, i5); t5 && t5 !== this._$AB; ) {
        const i6 = t5.nextSibling;
        t5.remove(), t5 = i6;
      }
    }
    setConnected(t5) {
      void 0 === this._$AM && (this._$Cv = t5, this._$AP?.(t5));
    }
  };
  var R = class {
    get tagName() {
      return this.element.tagName;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    constructor(t5, i5, s5, e5, h4) {
      this.type = 1, this._$AH = T, this._$AN = void 0, this.element = t5, this.name = i5, this._$AM = e5, this.options = h4, s5.length > 2 || "" !== s5[0] || "" !== s5[1] ? (this._$AH = Array(s5.length - 1).fill(new String()), this.strings = s5) : this._$AH = T;
    }
    _$AI(t5, i5 = this, s5, e5) {
      const h4 = this.strings;
      let o4 = false;
      if (void 0 === h4)
        t5 = N(this, t5, i5, 0), o4 = !c3(t5) || t5 !== this._$AH && t5 !== w, o4 && (this._$AH = t5);
      else {
        const e6 = t5;
        let n4, r6;
        for (t5 = h4[0], n4 = 0; n4 < h4.length - 1; n4++)
          r6 = N(this, e6[s5 + n4], i5, n4), r6 === w && (r6 = this._$AH[n4]), o4 ||= !c3(r6) || r6 !== this._$AH[n4], r6 === T ? t5 = T : t5 !== T && (t5 += (r6 ?? "") + h4[n4 + 1]), this._$AH[n4] = r6;
      }
      o4 && !e5 && this.O(t5);
    }
    O(t5) {
      t5 === T ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t5 ?? "");
    }
  };
  var k = class extends R {
    constructor() {
      super(...arguments), this.type = 3;
    }
    O(t5) {
      this.element[this.name] = t5 === T ? void 0 : t5;
    }
  };
  var H = class extends R {
    constructor() {
      super(...arguments), this.type = 4;
    }
    O(t5) {
      this.element.toggleAttribute(this.name, !!t5 && t5 !== T);
    }
  };
  var I = class extends R {
    constructor(t5, i5, s5, e5, h4) {
      super(t5, i5, s5, e5, h4), this.type = 5;
    }
    _$AI(t5, i5 = this) {
      if ((t5 = N(this, t5, i5, 0) ?? T) === w)
        return;
      const s5 = this._$AH, e5 = t5 === T && s5 !== T || t5.capture !== s5.capture || t5.once !== s5.once || t5.passive !== s5.passive, h4 = t5 !== T && (s5 === T || e5);
      e5 && this.element.removeEventListener(this.name, this, s5), h4 && this.element.addEventListener(this.name, this, t5), this._$AH = t5;
    }
    handleEvent(t5) {
      "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t5) : this._$AH.handleEvent(t5);
    }
  };
  var L = class {
    constructor(t5, i5, s5) {
      this.element = t5, this.type = 6, this._$AN = void 0, this._$AM = i5, this.options = s5;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t5) {
      N(this, t5);
    }
  };
  var z = { j: e3, P: h2, A: o3, C: 1, M: P, L: S2, R: u2, V: N, D: M, I: R, H, N: I, U: k, B: L };
  var Z = t2.litHtmlPolyfillSupport;
  Z?.(V, M), (t2.litHtmlVersions ??= []).push("3.1.0");
  var j = (t5, i5, s5) => {
    const e5 = s5?.renderBefore ?? i5;
    let h4 = e5._$litPart$;
    if (void 0 === h4) {
      const t6 = s5?.renderBefore ?? null;
      e5._$litPart$ = h4 = new M(i5.insertBefore(l2(), t6), t6, void 0, s5 ?? {});
    }
    return h4._$AI(t5), h4;
  };

  // node_modules/lit-element/lit-element.js
  var s3 = class extends b {
    constructor() {
      super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
    }
    createRenderRoot() {
      const t5 = super.createRenderRoot();
      return this.renderOptions.renderBefore ??= t5.firstChild, t5;
    }
    update(t5) {
      const i5 = this.render();
      this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t5), this._$Do = j(i5, this.renderRoot, this.renderOptions);
    }
    connectedCallback() {
      super.connectedCallback(), this._$Do?.setConnected(true);
    }
    disconnectedCallback() {
      super.disconnectedCallback(), this._$Do?.setConnected(false);
    }
    render() {
      return w;
    }
  };
  s3._$litElement$ = true, s3["finalized", "finalized"] = true, globalThis.litElementHydrateSupport?.({ LitElement: s3 });
  var r4 = globalThis.litElementPolyfillSupport;
  r4?.({ LitElement: s3 });
  (globalThis.litElementVersions ??= []).push("4.0.2");

  // node_modules/lit-html/directive.js
  var t3 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 };
  var e4 = (t5) => (...e5) => ({ _$litDirective$: t5, values: e5 });
  var i4 = class {
    constructor(t5) {
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AT(t5, e5, i5) {
      this._$Ct = t5, this._$AM = e5, this._$Ci = i5;
    }
    _$AS(t5, e5) {
      return this.update(t5, e5);
    }
    update(t5, e5) {
      return this.render(...e5);
    }
  };

  // node_modules/lit-html/directive-helpers.js
  var { D: t4 } = z;
  var s4 = () => document.createComment("");
  var r5 = (o4, i5, n4) => {
    const e5 = o4._$AA.parentNode, l3 = void 0 === i5 ? o4._$AB : i5._$AA;
    if (void 0 === n4) {
      const i6 = e5.insertBefore(s4(), l3), c5 = e5.insertBefore(s4(), l3);
      n4 = new t4(i6, c5, o4, o4.options);
    } else {
      const t5 = n4._$AB.nextSibling, i6 = n4._$AM, c5 = i6 !== o4;
      if (c5) {
        let t6;
        n4._$AQ?.(o4), n4._$AM = o4, void 0 !== n4._$AP && (t6 = o4._$AU) !== i6._$AU && n4._$AP(t6);
      }
      if (t5 !== l3 || c5) {
        let o5 = n4._$AA;
        for (; o5 !== t5; ) {
          const t6 = o5.nextSibling;
          e5.insertBefore(o5, l3), o5 = t6;
        }
      }
    }
    return n4;
  };
  var v2 = (o4, t5, i5 = o4) => (o4._$AI(t5, i5), o4);
  var u3 = {};
  var m2 = (o4, t5 = u3) => o4._$AH = t5;
  var p3 = (o4) => o4._$AH;
  var h3 = (o4) => {
    o4._$AP?.(false, true);
    let t5 = o4._$AA;
    const i5 = o4._$AB.nextSibling;
    for (; t5 !== i5; ) {
      const o5 = t5.nextSibling;
      t5.remove(), t5 = o5;
    }
  };

  // node_modules/lit-html/directives/repeat.js
  var u4 = (e5, s5, t5) => {
    const r6 = /* @__PURE__ */ new Map();
    for (let l3 = s5; l3 <= t5; l3++)
      r6.set(e5[l3], l3);
    return r6;
  };
  var c4 = e4(class extends i4 {
    constructor(e5) {
      if (super(e5), e5.type !== t3.CHILD)
        throw Error("repeat() can only be used in text expressions");
    }
    ht(e5, s5, t5) {
      let r6;
      void 0 === t5 ? t5 = s5 : void 0 !== s5 && (r6 = s5);
      const l3 = [], o4 = [];
      let i5 = 0;
      for (const s6 of e5)
        l3[i5] = r6 ? r6(s6, i5) : i5, o4[i5] = t5(s6, i5), i5++;
      return { values: o4, keys: l3 };
    }
    render(e5, s5, t5) {
      return this.ht(e5, s5, t5).values;
    }
    update(s5, [t5, r6, c5]) {
      const d3 = p3(s5), { values: p4, keys: a3 } = this.ht(t5, r6, c5);
      if (!Array.isArray(d3))
        return this.dt = a3, p4;
      const h4 = this.dt ??= [], v3 = [];
      let m3, y3, x2 = 0, j2 = d3.length - 1, k2 = 0, w2 = p4.length - 1;
      for (; x2 <= j2 && k2 <= w2; )
        if (null === d3[x2])
          x2++;
        else if (null === d3[j2])
          j2--;
        else if (h4[x2] === a3[k2])
          v3[k2] = v2(d3[x2], p4[k2]), x2++, k2++;
        else if (h4[j2] === a3[w2])
          v3[w2] = v2(d3[j2], p4[w2]), j2--, w2--;
        else if (h4[x2] === a3[w2])
          v3[w2] = v2(d3[x2], p4[w2]), r5(s5, v3[w2 + 1], d3[x2]), x2++, w2--;
        else if (h4[j2] === a3[k2])
          v3[k2] = v2(d3[j2], p4[k2]), r5(s5, d3[x2], d3[j2]), j2--, k2++;
        else if (void 0 === m3 && (m3 = u4(a3, k2, w2), y3 = u4(h4, x2, j2)), m3.has(h4[x2]))
          if (m3.has(h4[j2])) {
            const e5 = y3.get(a3[k2]), t6 = void 0 !== e5 ? d3[e5] : null;
            if (null === t6) {
              const e6 = r5(s5, d3[x2]);
              v2(e6, p4[k2]), v3[k2] = e6;
            } else
              v3[k2] = v2(t6, p4[k2]), r5(s5, d3[x2], t6), d3[e5] = null;
            k2++;
          } else
            h3(d3[j2]), j2--;
        else
          h3(d3[x2]), x2++;
      for (; k2 <= w2; ) {
        const e5 = r5(s5, v3[w2 + 1]);
        v2(e5, p4[k2]), v3[k2++] = e5;
      }
      for (; x2 <= j2; ) {
        const e5 = d3[x2++];
        null !== e5 && h3(e5);
      }
      return this.dt = a3, m2(s5, v3), w;
    }
  });

  // src/elements/my-list.js
  var MyListElement = class extends s3 {
    static properties = {
      items: { type: Array },
      name: { type: String }
    };
    constructor() {
      super();
      this.items = [];
      this.name = "Tony Stark";
    }
    render() {
      return x`
      <div>
        <h1>${this.name}'s list</h1>
        <ul>
          ${c4(
        this.items,
        (item) => x`<li>${item}</li>`
      )}
        </ul>
      </div>`;
    }
  };
  customElements.define("my-list", MyListElement);
})();
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive-helpers.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/repeat.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/

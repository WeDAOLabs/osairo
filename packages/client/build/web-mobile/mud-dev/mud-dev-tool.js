import {
  B as cv,
  i as Ky,
  t as kx,
  a as jx,
  s as Ax,
  b as _a,
  c as Dt,
  h as Wn,
  d as Ix,
  e as Tx,
  f as Mx,
  g as Nx,
  m as Hy,
  Y as Xy,
  C as Sc,
  O as Qy,
  S as Cx,
  j as zx,
  k as Rx,
  I as Yy,
  P as Lx,
  o as Bx,
} from "./mud-debug.js";
const Dx = "0.9.8";
class Wt extends Error {
  constructor(t, n = {}) {
    const o =
        n.cause instanceof Wt
          ? n.cause.details
          : n.cause?.message
          ? n.cause.message
          : n.details,
      a = (n.cause instanceof Wt && n.cause.docsPath) || n.docsPath,
      u = [
        t || "An error occurred.",
        "",
        ...(n.metaMessages ? [...n.metaMessages, ""] : []),
        ...(a ? [`Docs: https://abitype.dev${a}`] : []),
        ...(o ? [`Details: ${o}`] : []),
        `Version: abitype@${Dx}`,
      ].join(`
`);
    super(u),
      Object.defineProperty(this, "details", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "docsPath", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "metaMessages", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "shortMessage", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "AbiTypeError",
      }),
      n.cause && (this.cause = n.cause),
      (this.details = o),
      (this.docsPath = a),
      (this.metaMessages = n.metaMessages),
      (this.shortMessage = t);
  }
}
function gi(e, t) {
  return e.exec(t)?.groups;
}
const Jy = /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/,
  Gy =
    /^u?int(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/,
  Zy = /^\(.+?\).*?$/,
  e0 = /^error (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*)\((?<parameters>.*?)\)$/;
function Ux(e) {
  return e0.test(e);
}
function Fx(e) {
  return gi(e0, e);
}
const t0 = /^event (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*)\((?<parameters>.*?)\)$/;
function $x(e) {
  return t0.test(e);
}
function Vx(e) {
  return gi(t0, e);
}
const r0 =
  /^function (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*)\((?<parameters>.*?)\)(?: (?<scope>external|public{1}))?(?: (?<stateMutability>pure|view|nonpayable|payable{1}))?(?: returns\s?\((?<returns>.*?)\))?$/;
function Wx(e) {
  return r0.test(e);
}
function qx(e) {
  return gi(r0, e);
}
const n0 = /^struct (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*) \{(?<properties>.*?)\}$/;
function o0(e) {
  return n0.test(e);
}
function Kx(e) {
  return gi(n0, e);
}
const i0 =
  /^constructor\((?<parameters>.*?)\)(?:\s(?<stateMutability>payable{1}))?$/;
function Hx(e) {
  return i0.test(e);
}
function Xx(e) {
  return gi(i0, e);
}
const Qx = /^fallback\(\)$/;
function Yx(e) {
  return Qx.test(e);
}
const Jx = /^receive\(\) external payable$/;
function Gx(e) {
  return Jx.test(e);
}
const Zx = new Set(["indexed"]),
  sp = new Set(["calldata", "memory", "storage"]);
class eS extends Wt {
  constructor({ type: t }) {
    super("Unknown type.", {
      metaMessages: [
        `Type "${t}" is not a valid ABI type. Perhaps you forgot to include a struct signature?`,
      ],
    }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "UnknownTypeError",
      });
  }
}
class tS extends Wt {
  constructor({ type: t }) {
    super("Unknown type.", {
      metaMessages: [`Type "${t}" is not a valid ABI type.`],
    }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "UnknownSolidityTypeError",
      });
  }
}
class rS extends Wt {
  constructor({ param: t }) {
    super("Invalid ABI parameter.", { details: t }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "InvalidParameterError",
      });
  }
}
class nS extends Wt {
  constructor({ param: t, name: n }) {
    super("Invalid ABI parameter.", {
      details: t,
      metaMessages: [
        `"${n}" is a protected Solidity keyword. More info: https://docs.soliditylang.org/en/latest/cheatsheet.html`,
      ],
    }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "SolidityProtectedKeywordError",
      });
  }
}
class oS extends Wt {
  constructor({ param: t, type: n, modifier: o }) {
    super("Invalid ABI parameter.", {
      details: t,
      metaMessages: [
        `Modifier "${o}" not allowed${n ? ` in "${n}" type` : ""}.`,
      ],
    }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "InvalidModifierError",
      });
  }
}
class iS extends Wt {
  constructor({ param: t, type: n, modifier: o }) {
    super("Invalid ABI parameter.", {
      details: t,
      metaMessages: [
        `Modifier "${o}" not allowed${n ? ` in "${n}" type` : ""}.`,
        `Data location can only be specified for array, struct, or mapping types, but "${o}" was given.`,
      ],
    }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "InvalidFunctionModifierError",
      });
  }
}
class aS extends Wt {
  constructor({ abiParameter: t }) {
    super("Invalid ABI parameter.", {
      details: JSON.stringify(t, null, 2),
      metaMessages: ["ABI parameter type is invalid."],
    }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "InvalidAbiTypeParameterError",
      });
  }
}
class Mu extends Wt {
  constructor({ signature: t, type: n }) {
    super(`Invalid ${n} signature.`, { details: t }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "InvalidSignatureError",
      });
  }
}
class uS extends Wt {
  constructor({ signature: t }) {
    super("Unknown signature.", { details: t }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "UnknownSignatureError",
      });
  }
}
class lS extends Wt {
  constructor({ signature: t }) {
    super("Invalid struct signature.", {
      details: t,
      metaMessages: ["No properties exist."],
    }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "InvalidStructSignatureError",
      });
  }
}
class sS extends Wt {
  constructor({ type: t }) {
    super("Circular reference detected.", {
      metaMessages: [`Struct "${t}" is a circular reference.`],
    }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "CircularReferenceError",
      });
  }
}
class cS extends Wt {
  constructor({ current: t, depth: n }) {
    super("Unbalanced parentheses.", {
      metaMessages: [
        `"${t.trim()}" has too many ${
          n > 0 ? "opening" : "closing"
        } parentheses.`,
      ],
      details: `Depth "${n}"`,
    }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "InvalidParenthesisError",
      });
  }
}
function fS(e, t) {
  return t ? `${t}:${e}` : e;
}
const qd = new Map([
  ["address", { type: "address" }],
  ["bool", { type: "bool" }],
  ["bytes", { type: "bytes" }],
  ["bytes32", { type: "bytes32" }],
  ["int", { type: "int256" }],
  ["int256", { type: "int256" }],
  ["string", { type: "string" }],
  ["uint", { type: "uint256" }],
  ["uint8", { type: "uint8" }],
  ["uint16", { type: "uint16" }],
  ["uint24", { type: "uint24" }],
  ["uint32", { type: "uint32" }],
  ["uint64", { type: "uint64" }],
  ["uint96", { type: "uint96" }],
  ["uint112", { type: "uint112" }],
  ["uint160", { type: "uint160" }],
  ["uint192", { type: "uint192" }],
  ["uint256", { type: "uint256" }],
  ["address owner", { type: "address", name: "owner" }],
  ["address to", { type: "address", name: "to" }],
  ["bool approved", { type: "bool", name: "approved" }],
  ["bytes _data", { type: "bytes", name: "_data" }],
  ["bytes data", { type: "bytes", name: "data" }],
  ["bytes signature", { type: "bytes", name: "signature" }],
  ["bytes32 hash", { type: "bytes32", name: "hash" }],
  ["bytes32 r", { type: "bytes32", name: "r" }],
  ["bytes32 root", { type: "bytes32", name: "root" }],
  ["bytes32 s", { type: "bytes32", name: "s" }],
  ["string name", { type: "string", name: "name" }],
  ["string symbol", { type: "string", name: "symbol" }],
  ["string tokenURI", { type: "string", name: "tokenURI" }],
  ["uint tokenId", { type: "uint256", name: "tokenId" }],
  ["uint8 v", { type: "uint8", name: "v" }],
  ["uint256 balance", { type: "uint256", name: "balance" }],
  ["uint256 tokenId", { type: "uint256", name: "tokenId" }],
  ["uint256 value", { type: "uint256", name: "value" }],
  [
    "event:address indexed from",
    { type: "address", name: "from", indexed: !0 },
  ],
  ["event:address indexed to", { type: "address", name: "to", indexed: !0 }],
  [
    "event:uint indexed tokenId",
    { type: "uint256", name: "tokenId", indexed: !0 },
  ],
  [
    "event:uint256 indexed tokenId",
    { type: "uint256", name: "tokenId", indexed: !0 },
  ],
]);
function dS(e, t = {}) {
  if (Wx(e)) {
    const n = qx(e);
    if (!n) throw new Mu({ signature: e, type: "function" });
    const o = Fr(n.parameters),
      a = [],
      u = o.length;
    for (let c = 0; c < u; c++)
      a.push(ui(o[c], { modifiers: sp, structs: t, type: "function" }));
    const l = [];
    if (n.returns) {
      const c = Fr(n.returns),
        f = c.length;
      for (let d = 0; d < f; d++)
        l.push(ui(c[d], { modifiers: sp, structs: t, type: "function" }));
    }
    return {
      name: n.name,
      type: "function",
      stateMutability: n.stateMutability ?? "nonpayable",
      inputs: a,
      outputs: l,
    };
  }
  if ($x(e)) {
    const n = Vx(e);
    if (!n) throw new Mu({ signature: e, type: "event" });
    const o = Fr(n.parameters),
      a = [],
      u = o.length;
    for (let l = 0; l < u; l++)
      a.push(ui(o[l], { modifiers: Zx, structs: t, type: "event" }));
    return { name: n.name, type: "event", inputs: a };
  }
  if (Ux(e)) {
    const n = Fx(e);
    if (!n) throw new Mu({ signature: e, type: "error" });
    const o = Fr(n.parameters),
      a = [],
      u = o.length;
    for (let l = 0; l < u; l++) a.push(ui(o[l], { structs: t, type: "error" }));
    return { name: n.name, type: "error", inputs: a };
  }
  if (Hx(e)) {
    const n = Xx(e);
    if (!n) throw new Mu({ signature: e, type: "constructor" });
    const o = Fr(n.parameters),
      a = [],
      u = o.length;
    for (let l = 0; l < u; l++)
      a.push(ui(o[l], { structs: t, type: "constructor" }));
    return {
      type: "constructor",
      stateMutability: n.stateMutability ?? "nonpayable",
      inputs: a,
    };
  }
  if (Yx(e)) return { type: "fallback" };
  if (Gx(e)) return { type: "receive", stateMutability: "payable" };
  throw new uS({ signature: e });
}
const pS =
    /^(?<type>[a-zA-Z$_][a-zA-Z0-9$_]*)(?<array>(?:\[\d*?\])+?)?(?:\s(?<modifier>calldata|indexed|memory|storage{1}))?(?:\s(?<name>[a-zA-Z$_][a-zA-Z0-9$_]*))?$/,
  vS =
    /^\((?<type>.+?)\)(?<array>(?:\[\d*?\])+?)?(?:\s(?<modifier>calldata|indexed|memory|storage{1}))?(?:\s(?<name>[a-zA-Z$_][a-zA-Z0-9$_]*))?$/,
  hS = /^u?int$/;
function ui(e, t) {
  const n = fS(e, t?.type);
  if (qd.has(n)) return qd.get(n);
  const o = Zy.test(e),
    a = gi(o ? vS : pS, e);
  if (!a) throw new rS({ param: e });
  if (a.name && bS(a.name)) throw new nS({ param: e, name: a.name });
  const u = a.name ? { name: a.name } : {},
    l = a.modifier === "indexed" ? { indexed: !0 } : {},
    c = t?.structs ?? {};
  let f,
    d = {};
  if (o) {
    f = "tuple";
    const m = Fr(a.type),
      h = [],
      g = m.length;
    for (let w = 0; w < g; w++) h.push(ui(m[w], { structs: c }));
    d = { components: h };
  } else if (a.type in c) (f = "tuple"), (d = { components: c[a.type] });
  else if (hS.test(a.type)) f = `${a.type}256`;
  else if (((f = a.type), t?.type !== "struct" && !a0(f)))
    throw new tS({ type: f });
  if (a.modifier) {
    if (!t?.modifiers?.has?.(a.modifier))
      throw new oS({ param: e, type: t?.type, modifier: a.modifier });
    if (sp.has(a.modifier) && !yS(f, !!a.array))
      throw new iS({ param: e, type: t?.type, modifier: a.modifier });
  }
  const v = { type: `${f}${a.array ?? ""}`, ...u, ...l, ...d };
  return qd.set(n, v), v;
}
function Fr(e, t = [], n = "", o = 0) {
  if (e === "") {
    if (n === "") return t;
    if (o !== 0) throw new cS({ current: n, depth: o });
    return t.push(n.trim()), t;
  }
  const a = e.length;
  for (let u = 0; u < a; u++) {
    const l = e[u],
      c = e.slice(u + 1);
    switch (l) {
      case ",":
        return o === 0 ? Fr(c, [...t, n.trim()]) : Fr(c, t, `${n}${l}`, o);
      case "(":
        return Fr(c, t, `${n}${l}`, o + 1);
      case ")":
        return Fr(c, t, `${n}${l}`, o - 1);
      default:
        return Fr(c, t, `${n}${l}`, o);
    }
  }
  return [];
}
function a0(e) {
  return (
    e === "address" ||
    e === "bool" ||
    e === "function" ||
    e === "string" ||
    Jy.test(e) ||
    Gy.test(e)
  );
}
const mS =
  /^(?:after|alias|anonymous|apply|auto|byte|calldata|case|catch|constant|copyof|default|defined|error|event|external|false|final|function|immutable|implements|in|indexed|inline|internal|let|mapping|match|memory|mutable|null|of|override|partial|private|promise|public|pure|reference|relocatable|return|returns|sizeof|static|storage|struct|super|supports|switch|this|true|try|typedef|typeof|var|view|virtual)$/;
function bS(e) {
  return (
    e === "address" ||
    e === "bool" ||
    e === "function" ||
    e === "string" ||
    e === "tuple" ||
    Jy.test(e) ||
    Gy.test(e) ||
    mS.test(e)
  );
}
function yS(e, t) {
  return t || e === "bytes" || e === "string" || e === "tuple";
}
function gS(e) {
  const t = {},
    n = e.length;
  for (let l = 0; l < n; l++) {
    const c = e[l];
    if (!o0(c)) continue;
    const f = Kx(c);
    if (!f) throw new Mu({ signature: c, type: "struct" });
    const d = f.properties.split(";"),
      v = [],
      m = d.length;
    for (let h = 0; h < m; h++) {
      const w = d[h].trim();
      if (!w) continue;
      const x = ui(w, { type: "struct" });
      v.push(x);
    }
    if (!v.length) throw new lS({ signature: c });
    t[f.name] = v;
  }
  const o = {},
    a = Object.entries(t),
    u = a.length;
  for (let l = 0; l < u; l++) {
    const [c, f] = a[l];
    o[c] = u0(f, t);
  }
  return o;
}
const wS = /^(?<type>[a-zA-Z$_][a-zA-Z0-9$_]*)(?<array>(?:\[\d*?\])+?)?$/;
function u0(e, t, n = new Set()) {
  const o = [],
    a = e.length;
  for (let u = 0; u < a; u++) {
    const l = e[u];
    if (Zy.test(l.type)) o.push(l);
    else {
      const f = gi(wS, l.type);
      if (!f?.type) throw new aS({ abiParameter: l });
      const { array: d, type: v } = f;
      if (v in t) {
        if (n.has(v)) throw new sS({ type: v });
        o.push({
          ...l,
          type: `tuple${d ?? ""}`,
          components: u0(t[v] ?? [], t, new Set([...n, v])),
        });
      } else if (a0(v)) o.push(l);
      else throw new eS({ type: v });
    }
  }
  return o;
}
function _S(e) {
  const t = gS(e),
    n = [],
    o = e.length;
  for (let a = 0; a < o; a++) {
    const u = e[a];
    o0(u) || n.push(dS(u, t));
  }
  return n;
}
function l0(e, { includeName: t = !1 } = {}) {
  return e ? e.map((n) => OS(n, { includeName: t })).join(t ? ", " : ",") : "";
}
function OS(e, { includeName: t }) {
  return e.type.startsWith("tuple")
    ? `(${l0(e.components, { includeName: t })})${e.type.slice(5)}`
    : e.type + (t && e.name ? ` ${e.name}` : "");
}
class s0 extends cv {
  constructor({ data: t, params: n, size: o }) {
    super(
      [`Data size of ${o} bytes is too small for given parameters.`].join(`
`),
      {
        metaMessages: [
          `Params: (${l0(n, { includeName: !0 })})`,
          `Data:   ${t} (${o} bytes)`,
        ],
      }
    ),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "AbiDecodingDataSizeTooSmallError",
      }),
      Object.defineProperty(this, "data", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "params", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "size", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      (this.data = t),
      (this.params = n),
      (this.size = o);
  }
}
class xS extends cv {
  constructor() {
    super('Cannot decode zero data ("0x") with ABI parameters.'),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "AbiDecodingZeroDataError",
      });
  }
}
class SS extends cv {
  constructor(t, { docsPath: n }) {
    super(
      [
        `Type "${t}" is not a valid decoding type.`,
        "Please provide a valid ABI type.",
      ].join(`
`),
      { docsPath: n }
    ),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "InvalidAbiDecodingType",
      });
  }
}
function Ib(e) {
  if (!Number.isSafeInteger(e) || e < 0)
    throw new Error(`Wrong positive integer: ${e}`);
}
function c0(e, ...t) {
  if (!(e instanceof Uint8Array)) throw new Error("Expected Uint8Array");
  if (t.length > 0 && !t.includes(e.length))
    throw new Error(
      `Expected Uint8Array of length ${t}, not of length=${e.length}`
    );
}
function Tb(e, t = !0) {
  if (e.destroyed) throw new Error("Hash instance has been destroyed");
  if (t && e.finished) throw new Error("Hash#digest() has already been called");
}
function PS(e, t) {
  c0(e);
  const n = t.outputLen;
  if (e.length < n)
    throw new Error(
      `digestInto() expects output buffer of length at least ${n}`
    );
}
const $s = BigInt(2 ** 32 - 1),
  Mb = BigInt(32);
function ES(e, t = !1) {
  return t
    ? { h: Number(e & $s), l: Number((e >> Mb) & $s) }
    : { h: Number((e >> Mb) & $s) | 0, l: Number(e & $s) | 0 };
}
function kS(e, t = !1) {
  let n = new Uint32Array(e.length),
    o = new Uint32Array(e.length);
  for (let a = 0; a < e.length; a++) {
    const { h: u, l } = ES(e[a], t);
    [n[a], o[a]] = [u, l];
  }
  return [n, o];
}
const jS = (e, t, n) => (e << n) | (t >>> (32 - n)),
  AS = (e, t, n) => (t << n) | (e >>> (32 - n)),
  IS = (e, t, n) => (t << (n - 32)) | (e >>> (64 - n)),
  TS = (e, t, n) => (e << (n - 32)) | (t >>> (64 - n));
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */ const MS =
    (e) => e instanceof Uint8Array,
  NS = (e) =>
    new Uint32Array(e.buffer, e.byteOffset, Math.floor(e.byteLength / 4)),
  CS = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
if (!CS) throw new Error("Non little-endian hardware is not supported");
function zS(e) {
  if (typeof e != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof e}`);
  return new Uint8Array(new TextEncoder().encode(e));
}
function f0(e) {
  if ((typeof e == "string" && (e = zS(e)), !MS(e)))
    throw new Error(`expected Uint8Array, got ${typeof e}`);
  return e;
}
class RS {
  clone() {
    return this._cloneInto();
  }
}
function LS(e) {
  const t = (o) => e().update(f0(o)).digest(),
    n = e();
  return (
    (t.outputLen = n.outputLen),
    (t.blockLen = n.blockLen),
    (t.create = () => e()),
    t
  );
}
const [d0, p0, v0] = [[], [], []],
  BS = BigInt(0),
  ku = BigInt(1),
  DS = BigInt(2),
  US = BigInt(7),
  FS = BigInt(256),
  $S = BigInt(113);
for (let e = 0, t = ku, n = 1, o = 0; e < 24; e++) {
  ([n, o] = [o, (2 * n + 3 * o) % 5]),
    d0.push(2 * (5 * o + n)),
    p0.push((((e + 1) * (e + 2)) / 2) % 64);
  let a = BS;
  for (let u = 0; u < 7; u++)
    (t = ((t << ku) ^ ((t >> US) * $S)) % FS),
      t & DS && (a ^= ku << ((ku << BigInt(u)) - ku));
  v0.push(a);
}
const [VS, WS] = kS(v0, !0),
  Nb = (e, t, n) => (n > 32 ? IS(e, t, n) : jS(e, t, n)),
  Cb = (e, t, n) => (n > 32 ? TS(e, t, n) : AS(e, t, n));
function qS(e, t = 24) {
  const n = new Uint32Array(10);
  for (let o = 24 - t; o < 24; o++) {
    for (let l = 0; l < 10; l++)
      n[l] = e[l] ^ e[l + 10] ^ e[l + 20] ^ e[l + 30] ^ e[l + 40];
    for (let l = 0; l < 10; l += 2) {
      const c = (l + 8) % 10,
        f = (l + 2) % 10,
        d = n[f],
        v = n[f + 1],
        m = Nb(d, v, 1) ^ n[c],
        h = Cb(d, v, 1) ^ n[c + 1];
      for (let g = 0; g < 50; g += 10) (e[l + g] ^= m), (e[l + g + 1] ^= h);
    }
    let a = e[2],
      u = e[3];
    for (let l = 0; l < 24; l++) {
      const c = p0[l],
        f = Nb(a, u, c),
        d = Cb(a, u, c),
        v = d0[l];
      (a = e[v]), (u = e[v + 1]), (e[v] = f), (e[v + 1] = d);
    }
    for (let l = 0; l < 50; l += 10) {
      for (let c = 0; c < 10; c++) n[c] = e[l + c];
      for (let c = 0; c < 10; c++)
        e[l + c] ^= ~n[(c + 2) % 10] & n[(c + 4) % 10];
    }
    (e[0] ^= VS[o]), (e[1] ^= WS[o]);
  }
  n.fill(0);
}
class fv extends RS {
  constructor(t, n, o, a = !1, u = 24) {
    if (
      (super(),
      (this.blockLen = t),
      (this.suffix = n),
      (this.outputLen = o),
      (this.enableXOF = a),
      (this.rounds = u),
      (this.pos = 0),
      (this.posOut = 0),
      (this.finished = !1),
      (this.destroyed = !1),
      Ib(o),
      0 >= this.blockLen || this.blockLen >= 200)
    )
      throw new Error("Sha3 supports only keccak-f1600 function");
    (this.state = new Uint8Array(200)), (this.state32 = NS(this.state));
  }
  keccak() {
    qS(this.state32, this.rounds), (this.posOut = 0), (this.pos = 0);
  }
  update(t) {
    Tb(this);
    const { blockLen: n, state: o } = this;
    t = f0(t);
    const a = t.length;
    for (let u = 0; u < a; ) {
      const l = Math.min(n - this.pos, a - u);
      for (let c = 0; c < l; c++) o[this.pos++] ^= t[u++];
      this.pos === n && this.keccak();
    }
    return this;
  }
  finish() {
    if (this.finished) return;
    this.finished = !0;
    const { state: t, suffix: n, pos: o, blockLen: a } = this;
    (t[o] ^= n),
      n & 128 && o === a - 1 && this.keccak(),
      (t[a - 1] ^= 128),
      this.keccak();
  }
  writeInto(t) {
    Tb(this, !1), c0(t), this.finish();
    const n = this.state,
      { blockLen: o } = this;
    for (let a = 0, u = t.length; a < u; ) {
      this.posOut >= o && this.keccak();
      const l = Math.min(o - this.posOut, u - a);
      t.set(n.subarray(this.posOut, this.posOut + l), a),
        (this.posOut += l),
        (a += l);
    }
    return t;
  }
  xofInto(t) {
    if (!this.enableXOF)
      throw new Error("XOF is not possible for this instance");
    return this.writeInto(t);
  }
  xof(t) {
    return Ib(t), this.xofInto(new Uint8Array(t));
  }
  digestInto(t) {
    if ((PS(t, this), this.finished))
      throw new Error("digest() was already called");
    return this.writeInto(t), this.destroy(), t;
  }
  digest() {
    return this.digestInto(new Uint8Array(this.outputLen));
  }
  destroy() {
    (this.destroyed = !0), this.state.fill(0);
  }
  _cloneInto(t) {
    const {
      blockLen: n,
      suffix: o,
      outputLen: a,
      rounds: u,
      enableXOF: l,
    } = this;
    return (
      t || (t = new fv(n, o, a, l, u)),
      t.state32.set(this.state32),
      (t.pos = this.pos),
      (t.posOut = this.posOut),
      (t.finished = this.finished),
      (t.rounds = u),
      (t.suffix = o),
      (t.outputLen = a),
      (t.enableXOF = l),
      (t.destroyed = this.destroyed),
      t
    );
  }
}
const KS = (e, t, n) => LS(() => new fv(t, e, n)),
  HS = KS(1, 136, 256 / 8);
function XS(e, t) {
  const n = t || "hex",
    o = HS(Ky(e, { strict: !1 }) ? kx(e) : e);
  return n === "bytes" ? o : jx(o);
}
function dv(e) {
  const t = e.match(/^(.*)\[(\d+)?\]$/);
  return t ? [t[2] ? Number(t[2]) : null, t[1]] : void 0;
}
function QS(e, t) {
  const n = t ? `${t}${e.toLowerCase()}` : e.substring(2).toLowerCase(),
    o = XS(Ax(n), "bytes"),
    a = (t ? n.substring(`${t}0x`.length) : n).split("");
  for (let u = 0; u < 40; u += 2)
    o[u >> 1] >> 4 >= 8 && a[u] && (a[u] = a[u].toUpperCase()),
      (o[u >> 1] & 15) >= 8 && a[u + 1] && (a[u + 1] = a[u + 1].toUpperCase());
  return `0x${a.join("")}`;
}
function YS(e, t) {
  if (t === "0x" && e.length > 0) throw new xS();
  if (_a(t) && _a(t) < 32) throw new s0({ data: t, params: e, size: _a(t) });
  return JS({ data: t, params: e });
}
function JS({ data: e, params: t }) {
  const n = [];
  let o = 0;
  for (let a = 0; a < t.length; a++) {
    if (o >= _a(e)) throw new s0({ data: e, params: t, size: _a(e) });
    const u = t[a],
      { consumed: l, value: c } = Oa({ data: e, param: u, position: o });
    n.push(c), (o += l);
  }
  return n;
}
function Oa({ data: e, param: t, position: n }) {
  const o = dv(t.type);
  if (o) {
    const [u, l] = o;
    return ZS(e, { length: u, param: { ...t, type: l }, position: n });
  }
  if (t.type === "tuple") return oP(e, { param: t, position: n });
  if (t.type === "string") return nP(e, { position: n });
  if (t.type.startsWith("bytes")) return tP(e, { param: t, position: n });
  const a = Dt(e, n, n + 32, { strict: !0 });
  if (t.type.startsWith("uint") || t.type.startsWith("int"))
    return rP(a, { param: t });
  if (t.type === "address") return GS(a);
  if (t.type === "bool") return eP(a);
  throw new SS(t.type, { docsPath: "/docs/contract/decodeAbiParameters" });
}
function GS(e) {
  return { consumed: 32, value: QS(Dt(e, -20)) };
}
function ZS(e, { param: t, length: n, position: o }) {
  if (!n) {
    const l = Wn(Dt(e, o, o + 32, { strict: !0 })),
      c = Wn(Dt(e, l, l + 32, { strict: !0 }));
    let f = 0;
    const d = [];
    for (let v = 0; v < c; ++v) {
      const m = Oa({ data: Dt(e, l + 32), param: t, position: f });
      (f += m.consumed), d.push(m.value);
    }
    return { value: d, consumed: 32 };
  }
  if (cc(t)) {
    const c = !dv(t.type)?.[0];
    let f = 0;
    const d = [];
    for (let v = 0; v < n; ++v) {
      const m = Wn(Dt(e, o, o + 32, { strict: !0 })),
        h = Oa({ data: Dt(e, m), param: t, position: c ? f : v * 32 });
      (f += h.consumed), d.push(h.value);
    }
    return { value: d, consumed: 32 };
  }
  let a = 0;
  const u = [];
  for (let l = 0; l < n; ++l) {
    const c = Oa({ data: e, param: t, position: o + a });
    (a += c.consumed), u.push(c.value);
  }
  return { value: u, consumed: a };
}
function eP(e) {
  return { consumed: 32, value: Ix(e) };
}
function tP(e, { param: t, position: n }) {
  const [o, a] = t.type.split("bytes");
  if (!a) {
    const l = Wn(Dt(e, n, n + 32, { strict: !0 })),
      c = Wn(Dt(e, l, l + 32, { strict: !0 }));
    return c === 0
      ? { consumed: 32, value: "0x" }
      : { consumed: 32, value: Dt(e, l + 32, l + 32 + c, { strict: !0 }) };
  }
  return { consumed: 32, value: Dt(e, n, n + parseInt(a), { strict: !0 }) };
}
function rP(e, { param: t }) {
  const n = t.type.startsWith("int");
  return {
    consumed: 32,
    value:
      parseInt(t.type.split("int")[1] || "256") > 48
        ? Tx(e, { signed: n })
        : Wn(e, { signed: n }),
  };
}
function nP(e, { position: t }) {
  const n = Wn(Dt(e, t, t + 32, { strict: !0 })),
    o = Wn(Dt(e, n, n + 32, { strict: !0 }));
  return o === 0
    ? { consumed: 32, value: "" }
    : {
        consumed: 32,
        value: Mx(Nx(Dt(e, n + 32, n + 32 + o, { strict: !0 }))),
      };
}
function oP(e, { param: t, position: n }) {
  const o = t.components.length === 0 || t.components.some(({ name: l }) => !l),
    a = o ? [] : {};
  let u = 0;
  if (cc(t)) {
    const l = Wn(Dt(e, n, n + 32, { strict: !0 }));
    for (let c = 0; c < t.components.length; ++c) {
      const f = t.components[c],
        d = Oa({ data: Dt(e, l), param: f, position: u });
      (u += d.consumed), (a[o ? c : f?.name] = d.value);
    }
    return { consumed: 32, value: a };
  }
  for (let l = 0; l < t.components.length; ++l) {
    const c = t.components[l],
      f = Oa({ data: e, param: c, position: n + u });
    (u += f.consumed), (a[o ? l : c?.name] = f.value);
  }
  return { consumed: u, value: a };
}
function cc(e) {
  const { type: t } = e;
  if (t === "string" || t === "bytes" || t.endsWith("[]")) return !0;
  if (t === "tuple") return e.components?.some(cc);
  const n = dv(e.type);
  return !!(n && cc({ ...e, type: n[1] }));
}
function Fe(e) {
  for (
    var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), o = 1;
    o < t;
    o++
  )
    n[o - 1] = arguments[o];
  throw new Error(
    typeof e == "number"
      ? "[MobX] minified error nr: " +
        e +
        (n.length ? " " + n.map(String).join(",") : "") +
        ". Find the full error at: https://github.com/mobxjs/mobx/blob/main/packages/mobx/src/errors.ts"
      : "[MobX] " + e
  );
}
var iP = {};
function h0() {
  return typeof globalThis < "u"
    ? globalThis
    : typeof window < "u"
    ? window
    : typeof global < "u"
    ? global
    : typeof self < "u"
    ? self
    : iP;
}
var m0 = Object.assign,
  fc = Object.getOwnPropertyDescriptor,
  mn = Object.defineProperty,
  Pc = Object.prototype,
  cp = [];
Object.freeze(cp);
var b0 = {};
Object.freeze(b0);
var aP = typeof Proxy < "u",
  uP = Object.toString();
function y0() {
  aP || Fe("Proxy not available");
}
function g0(e) {
  var t = !1;
  return function () {
    if (!t) return (t = !0), e.apply(this, arguments);
  };
}
var va = function () {};
function Hr(e) {
  return typeof e == "function";
}
function pi(e) {
  var t = typeof e;
  switch (t) {
    case "string":
    case "symbol":
    case "number":
      return !0;
  }
  return !1;
}
function Ec(e) {
  return e !== null && typeof e == "object";
}
function Io(e) {
  if (!Ec(e)) return !1;
  var t = Object.getPrototypeOf(e);
  if (t == null) return !0;
  var n = Object.hasOwnProperty.call(t, "constructor") && t.constructor;
  return typeof n == "function" && n.toString() === uP;
}
function w0(e) {
  var t = e?.constructor;
  return t
    ? t.name === "GeneratorFunction" || t.displayName === "GeneratorFunction"
    : !1;
}
function pv(e, t, n) {
  mn(e, t, { enumerable: !1, writable: !0, configurable: !0, value: n });
}
function _0(e, t, n) {
  mn(e, t, { enumerable: !1, writable: !1, configurable: !0, value: n });
}
function wi(e, t) {
  var n = "isMobX" + e;
  return (
    (t.prototype[n] = !0),
    function (o) {
      return Ec(o) && o[n] === !0;
    }
  );
}
function Na(e) {
  return e instanceof Map;
}
function ul(e) {
  return e instanceof Set;
}
var O0 = typeof Object.getOwnPropertySymbols < "u";
function lP(e) {
  var t = Object.keys(e);
  if (!O0) return t;
  var n = Object.getOwnPropertySymbols(e);
  return n.length
    ? [].concat(
        t,
        n.filter(function (o) {
          return Pc.propertyIsEnumerable.call(e, o);
        })
      )
    : t;
}
var vv =
  typeof Reflect < "u" && Reflect.ownKeys
    ? Reflect.ownKeys
    : O0
    ? function (e) {
        return Object.getOwnPropertyNames(e).concat(
          Object.getOwnPropertySymbols(e)
        );
      }
    : Object.getOwnPropertyNames;
function x0(e) {
  return e === null ? null : typeof e == "object" ? "" + e : e;
}
function jo(e, t) {
  return Pc.hasOwnProperty.call(e, t);
}
var sP =
  Object.getOwnPropertyDescriptors ||
  function (t) {
    var n = {};
    return (
      vv(t).forEach(function (o) {
        n[o] = fc(t, o);
      }),
      n
    );
  };
function zb(e, t) {
  for (var n = 0; n < t.length; n++) {
    var o = t[n];
    (o.enumerable = o.enumerable || !1),
      (o.configurable = !0),
      "value" in o && (o.writable = !0),
      Object.defineProperty(e, dP(o.key), o);
  }
}
function hv(e, t, n) {
  return (
    t && zb(e.prototype, t),
    n && zb(e, n),
    Object.defineProperty(e, "prototype", { writable: !1 }),
    e
  );
}
function Ea() {
  return (
    (Ea = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var o in n)
              Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
          }
          return e;
        }),
    Ea.apply(this, arguments)
  );
}
function S0(e, t) {
  (e.prototype = Object.create(t.prototype)),
    (e.prototype.constructor = e),
    fp(e, t);
}
function fp(e, t) {
  return (
    (fp = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (o, a) {
          return (o.__proto__ = a), o;
        }),
    fp(e, t)
  );
}
function Kd(e) {
  if (e === void 0)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  return e;
}
function cP(e, t) {
  if (e) {
    if (typeof e == "string") return Rb(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (
      (n === "Object" && e.constructor && (n = e.constructor.name),
      n === "Map" || n === "Set")
    )
      return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return Rb(e, t);
  }
}
function Rb(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, o = new Array(t); n < t; n++) o[n] = e[n];
  return o;
}
function ha(e, t) {
  var n = (typeof Symbol < "u" && e[Symbol.iterator]) || e["@@iterator"];
  if (n) return (n = n.call(e)).next.bind(n);
  if (
    Array.isArray(e) ||
    (n = cP(e)) ||
    (t && e && typeof e.length == "number")
  ) {
    n && (e = n);
    var o = 0;
    return function () {
      return o >= e.length ? { done: !0 } : { done: !1, value: e[o++] };
    };
  }
  throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function fP(e, t) {
  if (typeof e != "object" || e === null) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var o = n.call(e, t || "default");
    if (typeof o != "object") return o;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function dP(e) {
  var t = fP(e, "string");
  return typeof t == "symbol" ? t : String(t);
}
var ma = Symbol("mobx-stored-annotations");
function bn(e) {
  function t(n, o) {
    if (ll(o)) return e.decorate_20223_(n, o);
    Ca(n, o, e);
  }
  return Object.assign(t, e);
}
function Ca(e, t, n) {
  jo(e, ma) || pv(e, ma, Ea({}, e[ma])), wP(n) || (e[ma][t] = n);
}
function ll(e) {
  return typeof e == "object" && typeof e.kind == "string";
}
var ke = Symbol("mobx administration"),
  sl = (function () {
    function e(n) {
      n === void 0 && (n = "Atom"),
        (this.name_ = void 0),
        (this.isPendingUnobservation_ = !1),
        (this.isBeingObserved_ = !1),
        (this.observers_ = new Set()),
        (this.batchId_ = void 0),
        (this.diffValue_ = 0),
        (this.lastAccessedBy_ = 0),
        (this.lowestObserverState_ = Ue.NOT_TRACKING_),
        (this.onBOL = void 0),
        (this.onBUOL = void 0),
        (this.name_ = n),
        (this.batchId_ = ee.inBatch ? ee.batchId : NaN);
    }
    var t = e.prototype;
    return (
      (t.onBO = function () {
        this.onBOL &&
          this.onBOL.forEach(function (o) {
            return o();
          });
      }),
      (t.onBUO = function () {
        this.onBUOL &&
          this.onBUOL.forEach(function (o) {
            return o();
          });
      }),
      (t.reportObserved = function () {
        return F0(this);
      }),
      (t.reportChanged = function () {
        (!ee.inBatch || this.batchId_ !== ee.batchId) &&
          ((ee.stateVersion =
            ee.stateVersion < Number.MAX_SAFE_INTEGER
              ? ee.stateVersion + 1
              : Number.MIN_SAFE_INTEGER),
          (this.batchId_ = NaN)),
          Er(),
          $0(this),
          kr();
      }),
      (t.toString = function () {
        return this.name_;
      }),
      e
    );
  })(),
  mv = wi("Atom", sl);
function P0(e, t, n) {
  t === void 0 && (t = va), n === void 0 && (n = va);
  var o = new sl(e);
  return t !== va && xE(o, t), n !== va && H0(o, n), o;
}
function pP(e, t) {
  return e === t;
}
function vP(e, t) {
  return xv(e, t);
}
function hP(e, t) {
  return xv(e, t, 1);
}
function mP(e, t) {
  return Object.is
    ? Object.is(e, t)
    : e === t
    ? e !== 0 || 1 / e === 1 / t
    : e !== e && t !== t;
}
var dc = { identity: pP, structural: vP, default: mP, shallow: hP };
function vi(e, t, n) {
  return Y0(e)
    ? e
    : Array.isArray(e)
    ? At.array(e, { name: n })
    : Io(e)
    ? At.object(e, void 0, { name: n })
    : Na(e)
    ? At.map(e, { name: n })
    : ul(e)
    ? At.set(e, { name: n })
    : typeof e == "function" && !Tc(e) && !Yu(e)
    ? w0(e)
      ? ja(e)
      : Qu(n, e)
    : e;
}
function bP(e, t, n) {
  if (e == null || Ju(e) || Mc(e) || Oi(e) || za(e)) return e;
  if (Array.isArray(e)) return At.array(e, { name: n, deep: !1 });
  if (Io(e)) return At.object(e, void 0, { name: n, deep: !1 });
  if (Na(e)) return At.map(e, { name: n, deep: !1 });
  if (ul(e)) return At.set(e, { name: n, deep: !1 });
}
function kc(e) {
  return e;
}
function yP(e, t) {
  return xv(e, t) ? t : e;
}
var gP = "override";
function wP(e) {
  return e.annotationType_ === gP;
}
function cl(e, t) {
  return {
    annotationType_: e,
    options_: t,
    make_: _P,
    extend_: OP,
    decorate_20223_: xP,
  };
}
function _P(e, t, n, o) {
  var a;
  if ((a = this.options_) != null && a.bound)
    return this.extend_(e, t, n, !1) === null ? 0 : 1;
  if (o === e.target_) return this.extend_(e, t, n, !1) === null ? 0 : 2;
  if (Tc(n.value)) return 1;
  var u = E0(e, this, t, n, !1);
  return mn(o, t, u), 2;
}
function OP(e, t, n, o) {
  var a = E0(e, this, t, n);
  return e.defineProperty_(t, a, o);
}
function xP(e, t) {
  var n = t.kind,
    o = t.name,
    a = t.addInitializer,
    u = this,
    l = function (d) {
      var v, m, h, g;
      return hi(
        (v = (m = u.options_) == null ? void 0 : m.name) != null
          ? v
          : o.toString(),
        d,
        (h = (g = u.options_) == null ? void 0 : g.autoAction) != null ? h : !1
      );
    };
  if (n == "field") {
    a(function () {
      Ca(this, o, u);
    });
    return;
  }
  if (n == "method") {
    var c;
    return (
      Tc(e) || (e = l(e)),
      (c = this.options_) != null &&
        c.bound &&
        a(function () {
          var f = this,
            d = f[o].bind(f);
          (d.isMobxAction = !0), (f[o] = d);
        }),
      e
    );
  }
  Fe(
    "Cannot apply '" +
      u.annotationType_ +
      "' to '" +
      String(o) +
      "' (kind: " +
      n +
      "):" +
      (`
'` +
        u.annotationType_ +
        "' can only be used on properties with a function value.")
  );
}
function SP(e, t, n, o) {
  t.annotationType_, o.value;
}
function E0(e, t, n, o, a) {
  var u, l, c, f, d, v, m;
  a === void 0 && (a = ee.safeDescriptors), SP(e, t, n, o);
  var h = o.value;
  if ((u = t.options_) != null && u.bound) {
    var g;
    h = h.bind((g = e.proxy_) != null ? g : e.target_);
  }
  return {
    value: hi(
      (l = (c = t.options_) == null ? void 0 : c.name) != null
        ? l
        : n.toString(),
      h,
      (f = (d = t.options_) == null ? void 0 : d.autoAction) != null ? f : !1,
      (v = t.options_) != null && v.bound
        ? (m = e.proxy_) != null
          ? m
          : e.target_
        : void 0
    ),
    configurable: a ? e.isPlainObject_ : !0,
    enumerable: !1,
    writable: !a,
  };
}
function k0(e, t) {
  return {
    annotationType_: e,
    options_: t,
    make_: PP,
    extend_: EP,
    decorate_20223_: kP,
  };
}
function PP(e, t, n, o) {
  var a;
  if (o === e.target_) return this.extend_(e, t, n, !1) === null ? 0 : 2;
  if (
    (a = this.options_) != null &&
    a.bound &&
    (!jo(e.target_, t) || !Yu(e.target_[t])) &&
    this.extend_(e, t, n, !1) === null
  )
    return 0;
  if (Yu(n.value)) return 1;
  var u = j0(e, this, t, n, !1, !1);
  return mn(o, t, u), 2;
}
function EP(e, t, n, o) {
  var a,
    u = j0(e, this, t, n, (a = this.options_) == null ? void 0 : a.bound);
  return e.defineProperty_(t, u, o);
}
function kP(e, t) {
  var n,
    o = t.name,
    a = t.addInitializer;
  return (
    Yu(e) || (e = ja(e)),
    (n = this.options_) != null &&
      n.bound &&
      a(function () {
        var u = this,
          l = u[o].bind(u);
        (l.isMobXFlow = !0), (u[o] = l);
      }),
    e
  );
}
function jP(e, t, n, o) {
  t.annotationType_, o.value;
}
function j0(e, t, n, o, a, u) {
  u === void 0 && (u = ee.safeDescriptors), jP(e, t, n, o);
  var l = o.value;
  if ((Yu(l) || (l = ja(l)), a)) {
    var c;
    (l = l.bind((c = e.proxy_) != null ? c : e.target_)), (l.isMobXFlow = !0);
  }
  return {
    value: l,
    configurable: u ? e.isPlainObject_ : !0,
    enumerable: !1,
    writable: !u,
  };
}
function bv(e, t) {
  return {
    annotationType_: e,
    options_: t,
    make_: AP,
    extend_: IP,
    decorate_20223_: TP,
  };
}
function AP(e, t, n) {
  return this.extend_(e, t, n, !1) === null ? 0 : 1;
}
function IP(e, t, n, o) {
  return (
    MP(e, this, t, n),
    e.defineComputedProperty_(
      t,
      Ea({}, this.options_, { get: n.get, set: n.set }),
      o
    )
  );
}
function TP(e, t) {
  var n = this,
    o = t.name,
    a = t.addInitializer;
  return (
    a(function () {
      var u = pl(this)[ke],
        l = Ea({}, n.options_, { get: e, context: this });
      l.name || (l.name = "ObservableObject." + o.toString()),
        u.values_.set(o, new ka(l));
    }),
    function () {
      return this[ke].getObservablePropValue_(o);
    }
  );
}
function MP(e, t, n, o) {
  t.annotationType_, o.get;
}
function jc(e, t) {
  return {
    annotationType_: e,
    options_: t,
    make_: NP,
    extend_: CP,
    decorate_20223_: zP,
  };
}
function NP(e, t, n) {
  return this.extend_(e, t, n, !1) === null ? 0 : 1;
}
function CP(e, t, n, o) {
  var a, u;
  return (
    RP(e, this),
    e.defineObservableProperty_(
      t,
      n.value,
      (a = (u = this.options_) == null ? void 0 : u.enhancer) != null ? a : vi,
      o
    )
  );
}
function zP(e, t) {
  var n = this,
    o = t.kind,
    a = t.name,
    u = new WeakSet();
  function l(c, f) {
    var d,
      v,
      m = pl(c)[ke],
      h = new di(
        f,
        (d = (v = n.options_) == null ? void 0 : v.enhancer) != null ? d : vi,
        "ObservableObject." + a.toString(),
        !1
      );
    m.values_.set(a, h), u.add(c);
  }
  if (o == "accessor")
    return {
      get: function () {
        return (
          u.has(this) || l(this, e.get.call(this)),
          this[ke].getObservablePropValue_(a)
        );
      },
      set: function (f) {
        return (
          u.has(this) || l(this, f), this[ke].setObservablePropValue_(a, f)
        );
      },
      init: function (f) {
        return u.has(this) || l(this, f), f;
      },
    };
}
function RP(e, t, n, o) {
  t.annotationType_;
}
var LP = "true",
  BP = A0();
function A0(e) {
  return {
    annotationType_: LP,
    options_: e,
    make_: DP,
    extend_: UP,
    decorate_20223_: FP,
  };
}
function DP(e, t, n, o) {
  var a, u;
  if (n.get) return Ac.make_(e, t, n, o);
  if (n.set) {
    var l = hi(t.toString(), n.set);
    return o === e.target_
      ? e.defineProperty_(t, {
          configurable: ee.safeDescriptors ? e.isPlainObject_ : !0,
          set: l,
        }) === null
        ? 0
        : 2
      : (mn(o, t, { configurable: !0, set: l }), 2);
  }
  if (o !== e.target_ && typeof n.value == "function") {
    var c;
    if (w0(n.value)) {
      var f,
        d = (f = this.options_) != null && f.autoBind ? ja.bound : ja;
      return d.make_(e, t, n, o);
    }
    var v = (c = this.options_) != null && c.autoBind ? Qu.bound : Qu;
    return v.make_(e, t, n, o);
  }
  var m = ((a = this.options_) == null ? void 0 : a.deep) === !1 ? At.ref : At;
  if (
    typeof n.value == "function" &&
    (u = this.options_) != null &&
    u.autoBind
  ) {
    var h;
    n.value = n.value.bind((h = e.proxy_) != null ? h : e.target_);
  }
  return m.make_(e, t, n, o);
}
function UP(e, t, n, o) {
  var a, u;
  if (n.get) return Ac.extend_(e, t, n, o);
  if (n.set)
    return e.defineProperty_(
      t,
      {
        configurable: ee.safeDescriptors ? e.isPlainObject_ : !0,
        set: hi(t.toString(), n.set),
      },
      o
    );
  if (
    typeof n.value == "function" &&
    (a = this.options_) != null &&
    a.autoBind
  ) {
    var l;
    n.value = n.value.bind((l = e.proxy_) != null ? l : e.target_);
  }
  var c = ((u = this.options_) == null ? void 0 : u.deep) === !1 ? At.ref : At;
  return c.extend_(e, t, n, o);
}
function FP(e, t) {
  Fe("'" + this.annotationType_ + "' cannot be used as a decorator");
}
var $P = "observable",
  VP = "observable.ref",
  WP = "observable.shallow",
  qP = "observable.struct",
  I0 = { deep: !0, name: void 0, defaultDecorator: void 0, proxy: !0 };
Object.freeze(I0);
function Vs(e) {
  return e || I0;
}
var dp = jc($P),
  KP = jc(VP, { enhancer: kc }),
  HP = jc(WP, { enhancer: bP }),
  XP = jc(qP, { enhancer: yP }),
  T0 = bn(dp);
function Ws(e) {
  return e.deep === !0 ? vi : e.deep === !1 ? kc : YP(e.defaultDecorator);
}
function QP(e) {
  var t;
  return e ? ((t = e.defaultDecorator) != null ? t : A0(e)) : void 0;
}
function YP(e) {
  var t, n;
  return e && (t = (n = e.options_) == null ? void 0 : n.enhancer) != null
    ? t
    : vi;
}
function M0(e, t, n) {
  if (ll(t)) return dp.decorate_20223_(e, t);
  if (pi(t)) {
    Ca(e, t, dp);
    return;
  }
  return Y0(e)
    ? e
    : Io(e)
    ? At.object(e, t, n)
    : Array.isArray(e)
    ? At.array(e, t)
    : Na(e)
    ? At.map(e, t)
    : ul(e)
    ? At.set(e, t)
    : typeof e == "object" && e !== null
    ? e
    : At.box(e, t);
}
m0(M0, T0);
var JP = {
    box: function (t, n) {
      var o = Vs(n);
      return new di(t, Ws(o), o.name, !0, o.equals);
    },
    array: function (t, n) {
      var o = Vs(n);
      return (ee.useProxies === !1 || o.proxy === !1 ? $E : ME)(
        t,
        Ws(o),
        o.name
      );
    },
    map: function (t, n) {
      var o = Vs(n);
      return new eg(t, Ws(o), o.name);
    },
    set: function (t, n) {
      var o = Vs(n);
      return new ng(t, Ws(o), o.name);
    },
    object: function (t, n, o) {
      return Ra(function () {
        return SE(
          ee.useProxies === !1 || o?.proxy === !1 ? pl({}, o) : AE({}, o),
          t,
          n
        );
      });
    },
    ref: bn(KP),
    shallow: bn(HP),
    deep: T0,
    struct: bn(XP),
  },
  At = m0(M0, JP),
  N0 = "computed",
  GP = "computed.struct",
  pp = bv(N0),
  ZP = bv(GP, { equals: dc.structural }),
  Ac = function (t, n) {
    if (ll(n)) return pp.decorate_20223_(t, n);
    if (pi(n)) return Ca(t, n, pp);
    if (Io(t)) return bn(bv(N0, t));
    var o = Io(n) ? n : {};
    return (o.get = t), o.name || (o.name = t.name || ""), new ka(o);
  };
Object.assign(Ac, pp);
Ac.struct = bn(ZP);
var Lb,
  Bb,
  pc = 0,
  eE = 1,
  tE =
    (Lb =
      (Bb = fc(function () {}, "name")) == null ? void 0 : Bb.configurable) !=
    null
      ? Lb
      : !1,
  Db = { value: "action", configurable: !0, writable: !1, enumerable: !1 };
function hi(e, t, n, o) {
  n === void 0 && (n = !1);
  function a() {
    return rE(e, n, t, o || this, arguments);
  }
  return (a.isMobxAction = !0), tE && ((Db.value = e), mn(a, "name", Db)), a;
}
function rE(e, t, n, o, a) {
  var u = nE(e, t);
  try {
    return n.apply(o, a);
  } catch (l) {
    throw ((u.error_ = l), l);
  } finally {
    oE(u);
  }
}
function nE(e, t, n, o) {
  var a = !1,
    u = 0,
    l = ee.trackingDerivation,
    c = !t || !l;
  Er();
  var f = ee.allowStateChanges;
  c && (_i(), (f = yv(!0)));
  var d = wv(!0),
    v = {
      runAsAction_: c,
      prevDerivation_: l,
      prevAllowStateChanges_: f,
      prevAllowStateReads_: d,
      notifySpy_: a,
      startTime_: u,
      actionId_: eE++,
      parentActionId_: pc,
    };
  return (pc = v.actionId_), v;
}
function oE(e) {
  pc !== e.actionId_ && Fe(30),
    (pc = e.parentActionId_),
    e.error_ !== void 0 && (ee.suppressReactionErrors = !0),
    gv(e.prevAllowStateChanges_),
    Fu(e.prevAllowStateReads_),
    kr(),
    e.runAsAction_ && qn(e.prevDerivation_),
    (ee.suppressReactionErrors = !1);
}
function yv(e) {
  var t = ee.allowStateChanges;
  return (ee.allowStateChanges = e), t;
}
function gv(e) {
  ee.allowStateChanges = e;
}
var C0;
C0 = Symbol.toPrimitive;
var di = (function (e) {
    S0(t, e);
    function t(o, a, u, l, c) {
      var f;
      return (
        u === void 0 && (u = "ObservableValue"),
        c === void 0 && (c = dc.default),
        (f = e.call(this, u) || this),
        (f.enhancer = void 0),
        (f.name_ = void 0),
        (f.equals = void 0),
        (f.hasUnreportedChange_ = !1),
        (f.interceptors_ = void 0),
        (f.changeListeners_ = void 0),
        (f.value_ = void 0),
        (f.dehancer = void 0),
        (f.enhancer = a),
        (f.name_ = u),
        (f.equals = c),
        (f.value_ = a(o, void 0, u)),
        f
      );
    }
    var n = t.prototype;
    return (
      (n.dehanceValue = function (a) {
        return this.dehancer !== void 0 ? this.dehancer(a) : a;
      }),
      (n.set = function (a) {
        this.value_,
          (a = this.prepareNewValue_(a)),
          a !== ee.UNCHANGED && this.setNewValue_(a);
      }),
      (n.prepareNewValue_ = function (a) {
        if (Sr(this)) {
          var u = Pr(this, { object: this, type: yn, newValue: a });
          if (!u) return ee.UNCHANGED;
          a = u.newValue;
        }
        return (
          (a = this.enhancer(a, this.value_, this.name_)),
          this.equals(this.value_, a) ? ee.UNCHANGED : a
        );
      }),
      (n.setNewValue_ = function (a) {
        var u = this.value_;
        (this.value_ = a),
          this.reportChanged(),
          Vr(this) &&
            Wr(this, { type: yn, object: this, newValue: a, oldValue: u });
      }),
      (n.get = function () {
        return this.reportObserved(), this.dehanceValue(this.value_);
      }),
      (n.intercept_ = function (a) {
        return fl(this, a);
      }),
      (n.observe_ = function (a, u) {
        return (
          u &&
            a({
              observableKind: "value",
              debugObjectName: this.name_,
              object: this,
              type: yn,
              newValue: this.value_,
              oldValue: void 0,
            }),
          dl(this, a)
        );
      }),
      (n.raw = function () {
        return this.value_;
      }),
      (n.toJSON = function () {
        return this.get();
      }),
      (n.toString = function () {
        return this.name_ + "[" + this.value_ + "]";
      }),
      (n.valueOf = function () {
        return x0(this.get());
      }),
      (n[C0] = function () {
        return this.valueOf();
      }),
      t
    );
  })(sl),
  z0;
z0 = Symbol.toPrimitive;
var ka = (function () {
    function e(n) {
      (this.dependenciesState_ = Ue.NOT_TRACKING_),
        (this.observing_ = []),
        (this.newObserving_ = null),
        (this.isBeingObserved_ = !1),
        (this.isPendingUnobservation_ = !1),
        (this.observers_ = new Set()),
        (this.diffValue_ = 0),
        (this.runId_ = 0),
        (this.lastAccessedBy_ = 0),
        (this.lowestObserverState_ = Ue.UP_TO_DATE_),
        (this.unboundDepsCount_ = 0),
        (this.value_ = new hc(null)),
        (this.name_ = void 0),
        (this.triggeredBy_ = void 0),
        (this.isComputing_ = !1),
        (this.isRunningSetter_ = !1),
        (this.derivation = void 0),
        (this.setter_ = void 0),
        (this.isTracing_ = vc.NONE),
        (this.scope_ = void 0),
        (this.equals_ = void 0),
        (this.requiresReaction_ = void 0),
        (this.keepAlive_ = void 0),
        (this.onBOL = void 0),
        (this.onBUOL = void 0),
        n.get || Fe(31),
        (this.derivation = n.get),
        (this.name_ = n.name || "ComputedValue"),
        n.set && (this.setter_ = hi("ComputedValue-setter", n.set)),
        (this.equals_ =
          n.equals ||
          (n.compareStructural || n.struct ? dc.structural : dc.default)),
        (this.scope_ = n.context),
        (this.requiresReaction_ = n.requiresReaction),
        (this.keepAlive_ = !!n.keepAlive);
    }
    var t = e.prototype;
    return (
      (t.onBecomeStale_ = function () {
        lE(this);
      }),
      (t.onBO = function () {
        this.onBOL &&
          this.onBOL.forEach(function (o) {
            return o();
          });
      }),
      (t.onBUO = function () {
        this.onBUOL &&
          this.onBUOL.forEach(function (o) {
            return o();
          });
      }),
      (t.get = function () {
        if (
          (this.isComputing_ && Fe(32, this.name_, this.derivation),
          ee.inBatch === 0 && this.observers_.size === 0 && !this.keepAlive_)
        )
          vp(this) &&
            (this.warnAboutUntrackedRead_(),
            Er(),
            (this.value_ = this.computeValue_(!1)),
            kr());
        else if ((F0(this), vp(this))) {
          var o = ee.trackingContext;
          this.keepAlive_ && !o && (ee.trackingContext = this),
            this.trackAndCompute() && uE(this),
            (ee.trackingContext = o);
        }
        var a = this.value_;
        if (Ys(a)) throw a.cause;
        return a;
      }),
      (t.set = function (o) {
        if (this.setter_) {
          this.isRunningSetter_ && Fe(33, this.name_),
            (this.isRunningSetter_ = !0);
          try {
            this.setter_.call(this.scope_, o);
          } finally {
            this.isRunningSetter_ = !1;
          }
        } else Fe(34, this.name_);
      }),
      (t.trackAndCompute = function () {
        var o = this.value_,
          a = this.dependenciesState_ === Ue.NOT_TRACKING_,
          u = this.computeValue_(!0),
          l = a || Ys(o) || Ys(u) || !this.equals_(o, u);
        return l && (this.value_ = u), l;
      }),
      (t.computeValue_ = function (o) {
        this.isComputing_ = !0;
        var a = yv(!1),
          u;
        if (o) u = R0(this, this.derivation, this.scope_);
        else if (ee.disableErrorBoundaries === !0)
          u = this.derivation.call(this.scope_);
        else
          try {
            u = this.derivation.call(this.scope_);
          } catch (l) {
            u = new hc(l);
          }
        return gv(a), (this.isComputing_ = !1), u;
      }),
      (t.suspend_ = function () {
        this.keepAlive_ || (hp(this), (this.value_ = void 0));
      }),
      (t.observe_ = function (o, a) {
        var u = this,
          l = !0,
          c = void 0;
        return yE(function () {
          var f = u.get();
          if (!l || a) {
            var d = _i();
            o({
              observableKind: "computed",
              debugObjectName: u.name_,
              type: yn,
              object: u,
              newValue: f,
              oldValue: c,
            }),
              qn(d);
          }
          (l = !1), (c = f);
        });
      }),
      (t.warnAboutUntrackedRead_ = function () {}),
      (t.toString = function () {
        return this.name_ + "[" + this.derivation.toString() + "]";
      }),
      (t.valueOf = function () {
        return x0(this.get());
      }),
      (t[z0] = function () {
        return this.valueOf();
      }),
      e
    );
  })(),
  Ic = wi("ComputedValue", ka),
  Ue;
(function (e) {
  (e[(e.NOT_TRACKING_ = -1)] = "NOT_TRACKING_"),
    (e[(e.UP_TO_DATE_ = 0)] = "UP_TO_DATE_"),
    (e[(e.POSSIBLY_STALE_ = 1)] = "POSSIBLY_STALE_"),
    (e[(e.STALE_ = 2)] = "STALE_");
})(Ue || (Ue = {}));
var vc;
(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.LOG = 1)] = "LOG"),
    (e[(e.BREAK = 2)] = "BREAK");
})(vc || (vc = {}));
var hc = function (t) {
  (this.cause = void 0), (this.cause = t);
};
function Ys(e) {
  return e instanceof hc;
}
function vp(e) {
  switch (e.dependenciesState_) {
    case Ue.UP_TO_DATE_:
      return !1;
    case Ue.NOT_TRACKING_:
    case Ue.STALE_:
      return !0;
    case Ue.POSSIBLY_STALE_: {
      for (
        var t = wv(!0), n = _i(), o = e.observing_, a = o.length, u = 0;
        u < a;
        u++
      ) {
        var l = o[u];
        if (Ic(l)) {
          if (ee.disableErrorBoundaries) l.get();
          else
            try {
              l.get();
            } catch {
              return qn(n), Fu(t), !0;
            }
          if (e.dependenciesState_ === Ue.STALE_) return qn(n), Fu(t), !0;
        }
      }
      return B0(e), qn(n), Fu(t), !1;
    }
  }
}
function R0(e, t, n) {
  var o = wv(!0);
  B0(e),
    (e.newObserving_ = new Array(e.observing_.length + 100)),
    (e.unboundDepsCount_ = 0),
    (e.runId_ = ++ee.runId);
  var a = ee.trackingDerivation;
  (ee.trackingDerivation = e), ee.inBatch++;
  var u;
  if (ee.disableErrorBoundaries === !0) u = t.call(n);
  else
    try {
      u = t.call(n);
    } catch (l) {
      u = new hc(l);
    }
  return ee.inBatch--, (ee.trackingDerivation = a), iE(e), Fu(o), u;
}
function iE(e) {
  for (
    var t = e.observing_,
      n = (e.observing_ = e.newObserving_),
      o = Ue.UP_TO_DATE_,
      a = 0,
      u = e.unboundDepsCount_,
      l = 0;
    l < u;
    l++
  ) {
    var c = n[l];
    c.diffValue_ === 0 && ((c.diffValue_ = 1), a !== l && (n[a] = c), a++),
      c.dependenciesState_ > o && (o = c.dependenciesState_);
  }
  for (n.length = a, e.newObserving_ = null, u = t.length; u--; ) {
    var f = t[u];
    f.diffValue_ === 0 && D0(f, e), (f.diffValue_ = 0);
  }
  for (; a--; ) {
    var d = n[a];
    d.diffValue_ === 1 && ((d.diffValue_ = 0), aE(d, e));
  }
  o !== Ue.UP_TO_DATE_ && ((e.dependenciesState_ = o), e.onBecomeStale_());
}
function hp(e) {
  var t = e.observing_;
  e.observing_ = [];
  for (var n = t.length; n--; ) D0(t[n], e);
  e.dependenciesState_ = Ue.NOT_TRACKING_;
}
function L0(e) {
  var t = _i();
  try {
    return e();
  } finally {
    qn(t);
  }
}
function _i() {
  var e = ee.trackingDerivation;
  return (ee.trackingDerivation = null), e;
}
function qn(e) {
  ee.trackingDerivation = e;
}
function wv(e) {
  var t = ee.allowStateReads;
  return (ee.allowStateReads = e), t;
}
function Fu(e) {
  ee.allowStateReads = e;
}
function B0(e) {
  if (e.dependenciesState_ !== Ue.UP_TO_DATE_) {
    e.dependenciesState_ = Ue.UP_TO_DATE_;
    for (var t = e.observing_, n = t.length; n--; )
      t[n].lowestObserverState_ = Ue.UP_TO_DATE_;
  }
}
var Hd = function () {
    (this.version = 6),
      (this.UNCHANGED = {}),
      (this.trackingDerivation = null),
      (this.trackingContext = null),
      (this.runId = 0),
      (this.mobxGuid = 0),
      (this.inBatch = 0),
      (this.batchId = Number.MIN_SAFE_INTEGER),
      (this.pendingUnobservations = []),
      (this.pendingReactions = []),
      (this.isRunningReactions = !1),
      (this.allowStateChanges = !1),
      (this.allowStateReads = !0),
      (this.enforceActions = !0),
      (this.spyListeners = []),
      (this.globalReactionErrorHandlers = []),
      (this.computedRequiresReaction = !1),
      (this.reactionRequiresObservable = !1),
      (this.observableRequiresReaction = !1),
      (this.disableErrorBoundaries = !1),
      (this.suppressReactionErrors = !1),
      (this.useProxies = !0),
      (this.verifyProxies = !1),
      (this.safeDescriptors = !0),
      (this.stateVersion = Number.MIN_SAFE_INTEGER);
  },
  Xd = !0,
  ee = (function () {
    var e = h0();
    return (
      e.__mobxInstanceCount > 0 && !e.__mobxGlobals && (Xd = !1),
      e.__mobxGlobals &&
        e.__mobxGlobals.version !== new Hd().version &&
        (Xd = !1),
      Xd
        ? e.__mobxGlobals
          ? ((e.__mobxInstanceCount += 1),
            e.__mobxGlobals.UNCHANGED || (e.__mobxGlobals.UNCHANGED = {}),
            e.__mobxGlobals)
          : ((e.__mobxInstanceCount = 1), (e.__mobxGlobals = new Hd()))
        : (setTimeout(function () {
            Fe(35);
          }, 1),
          new Hd())
    );
  })();
function aE(e, t) {
  e.observers_.add(t),
    e.lowestObserverState_ > t.dependenciesState_ &&
      (e.lowestObserverState_ = t.dependenciesState_);
}
function D0(e, t) {
  e.observers_.delete(t), e.observers_.size === 0 && U0(e);
}
function U0(e) {
  e.isPendingUnobservation_ === !1 &&
    ((e.isPendingUnobservation_ = !0), ee.pendingUnobservations.push(e));
}
function Er() {
  ee.inBatch === 0 &&
    (ee.batchId =
      ee.batchId < Number.MAX_SAFE_INTEGER
        ? ee.batchId + 1
        : Number.MIN_SAFE_INTEGER),
    ee.inBatch++;
}
function kr() {
  if (--ee.inBatch === 0) {
    V0();
    for (var e = ee.pendingUnobservations, t = 0; t < e.length; t++) {
      var n = e[t];
      (n.isPendingUnobservation_ = !1),
        n.observers_.size === 0 &&
          (n.isBeingObserved_ && ((n.isBeingObserved_ = !1), n.onBUO()),
          n instanceof ka && n.suspend_());
    }
    ee.pendingUnobservations = [];
  }
}
function F0(e) {
  var t = ee.trackingDerivation;
  return t !== null
    ? (t.runId_ !== e.lastAccessedBy_ &&
        ((e.lastAccessedBy_ = t.runId_),
        (t.newObserving_[t.unboundDepsCount_++] = e),
        !e.isBeingObserved_ &&
          ee.trackingContext &&
          ((e.isBeingObserved_ = !0), e.onBO())),
      e.isBeingObserved_)
    : (e.observers_.size === 0 && ee.inBatch > 0 && U0(e), !1);
}
function $0(e) {
  e.lowestObserverState_ !== Ue.STALE_ &&
    ((e.lowestObserverState_ = Ue.STALE_),
    e.observers_.forEach(function (t) {
      t.dependenciesState_ === Ue.UP_TO_DATE_ && t.onBecomeStale_(),
        (t.dependenciesState_ = Ue.STALE_);
    }));
}
function uE(e) {
  e.lowestObserverState_ !== Ue.STALE_ &&
    ((e.lowestObserverState_ = Ue.STALE_),
    e.observers_.forEach(function (t) {
      t.dependenciesState_ === Ue.POSSIBLY_STALE_
        ? (t.dependenciesState_ = Ue.STALE_)
        : t.dependenciesState_ === Ue.UP_TO_DATE_ &&
          (e.lowestObserverState_ = Ue.UP_TO_DATE_);
    }));
}
function lE(e) {
  e.lowestObserverState_ === Ue.UP_TO_DATE_ &&
    ((e.lowestObserverState_ = Ue.POSSIBLY_STALE_),
    e.observers_.forEach(function (t) {
      t.dependenciesState_ === Ue.UP_TO_DATE_ &&
        ((t.dependenciesState_ = Ue.POSSIBLY_STALE_), t.onBecomeStale_());
    }));
}
var mp = (function () {
    function e(n, o, a, u) {
      n === void 0 && (n = "Reaction"),
        (this.name_ = void 0),
        (this.onInvalidate_ = void 0),
        (this.errorHandler_ = void 0),
        (this.requiresObservable_ = void 0),
        (this.observing_ = []),
        (this.newObserving_ = []),
        (this.dependenciesState_ = Ue.NOT_TRACKING_),
        (this.diffValue_ = 0),
        (this.runId_ = 0),
        (this.unboundDepsCount_ = 0),
        (this.isDisposed_ = !1),
        (this.isScheduled_ = !1),
        (this.isTrackPending_ = !1),
        (this.isRunning_ = !1),
        (this.isTracing_ = vc.NONE),
        (this.name_ = n),
        (this.onInvalidate_ = o),
        (this.errorHandler_ = a),
        (this.requiresObservable_ = u);
    }
    var t = e.prototype;
    return (
      (t.onBecomeStale_ = function () {
        this.schedule_();
      }),
      (t.schedule_ = function () {
        this.isScheduled_ ||
          ((this.isScheduled_ = !0), ee.pendingReactions.push(this), V0());
      }),
      (t.isScheduled = function () {
        return this.isScheduled_;
      }),
      (t.runReaction_ = function () {
        if (!this.isDisposed_) {
          Er(), (this.isScheduled_ = !1);
          var o = ee.trackingContext;
          if (((ee.trackingContext = this), vp(this))) {
            this.isTrackPending_ = !0;
            try {
              this.onInvalidate_();
            } catch (a) {
              this.reportExceptionInDerivation_(a);
            }
          }
          (ee.trackingContext = o), kr();
        }
      }),
      (t.track = function (o) {
        if (!this.isDisposed_) {
          Er(), (this.isRunning_ = !0);
          var a = ee.trackingContext;
          ee.trackingContext = this;
          var u = R0(this, o, void 0);
          (ee.trackingContext = a),
            (this.isRunning_ = !1),
            (this.isTrackPending_ = !1),
            this.isDisposed_ && hp(this),
            Ys(u) && this.reportExceptionInDerivation_(u.cause),
            kr();
        }
      }),
      (t.reportExceptionInDerivation_ = function (o) {
        var a = this;
        if (this.errorHandler_) {
          this.errorHandler_(o, this);
          return;
        }
        if (ee.disableErrorBoundaries) throw o;
        var u = "[mobx] uncaught error in '" + this + "'";
        ee.suppressReactionErrors || console.error(u, o),
          ee.globalReactionErrorHandlers.forEach(function (l) {
            return l(o, a);
          });
      }),
      (t.dispose = function () {
        this.isDisposed_ ||
          ((this.isDisposed_ = !0), this.isRunning_ || (Er(), hp(this), kr()));
      }),
      (t.getDisposer_ = function (o) {
        var a = this,
          u = function l() {
            a.dispose(),
              o == null ||
                o.removeEventListener == null ||
                o.removeEventListener("abort", l);
          };
        return (
          o == null ||
            o.addEventListener == null ||
            o.addEventListener("abort", u),
          (u[ke] = this),
          u
        );
      }),
      (t.toString = function () {
        return "Reaction[" + this.name_ + "]";
      }),
      (t.trace = function (o) {}),
      e
    );
  })(),
  sE = 100,
  cE = function (t) {
    return t();
  };
function V0() {
  ee.inBatch > 0 || ee.isRunningReactions || cE(fE);
}
function fE() {
  ee.isRunningReactions = !0;
  for (var e = ee.pendingReactions, t = 0; e.length > 0; ) {
    ++t === sE &&
      (console.error("[mobx] cycle in reaction: " + e[0]), e.splice(0));
    for (var n = e.splice(0), o = 0, a = n.length; o < a; o++)
      n[o].runReaction_();
  }
  ee.isRunningReactions = !1;
}
var mc = wi("Reaction", mp);
function $u() {
  return !1;
}
function dE(e) {
  return (
    console.warn("[mobx.spy] Is a no-op in production builds"), function () {}
  );
}
var W0 = "action",
  pE = "action.bound",
  q0 = "autoAction",
  vE = "autoAction.bound",
  hE = "<unnamed action>",
  bp = cl(W0),
  mE = cl(pE, { bound: !0 }),
  yp = cl(q0, { autoAction: !0 }),
  bE = cl(vE, { autoAction: !0, bound: !0 });
function K0(e) {
  var t = function (o, a) {
    if (Hr(o)) return hi(o.name || hE, o, e);
    if (Hr(a)) return hi(o, a, e);
    if (ll(a)) return (e ? yp : bp).decorate_20223_(o, a);
    if (pi(a)) return Ca(o, a, e ? yp : bp);
    if (pi(o)) return bn(cl(e ? q0 : W0, { name: o, autoAction: e }));
  };
  return t;
}
var ba = K0(!1);
Object.assign(ba, bp);
var Qu = K0(!0);
Object.assign(Qu, yp);
ba.bound = bn(mE);
Qu.bound = bn(bE);
function Tc(e) {
  return Hr(e) && e.isMobxAction === !0;
}
function yE(e, t) {
  var n, o, a, u, l;
  t === void 0 && (t = b0);
  var c = (n = (o = t) == null ? void 0 : o.name) != null ? n : "Autorun",
    f = !t.scheduler && !t.delay,
    d;
  if (f)
    d = new mp(
      c,
      function () {
        this.track(h);
      },
      t.onError,
      t.requiresObservable
    );
  else {
    var v = wE(t),
      m = !1;
    d = new mp(
      c,
      function () {
        m ||
          ((m = !0),
          v(function () {
            (m = !1), d.isDisposed_ || d.track(h);
          }));
      },
      t.onError,
      t.requiresObservable
    );
  }
  function h() {
    e(d);
  }
  return (
    ((a = t) != null && (u = a.signal) != null && u.aborted) || d.schedule_(),
    d.getDisposer_((l = t) == null ? void 0 : l.signal)
  );
}
var gE = function (t) {
  return t();
};
function wE(e) {
  return e.scheduler
    ? e.scheduler
    : e.delay
    ? function (t) {
        return setTimeout(t, e.delay);
      }
    : gE;
}
var _E = "onBO",
  OE = "onBUO";
function xE(e, t, n) {
  return X0(_E, e, t, n);
}
function H0(e, t, n) {
  return X0(OE, e, t, n);
}
function X0(e, t, n, o) {
  var a = typeof o == "function" ? Gu(t, n) : Gu(t),
    u = Hr(o) ? o : n,
    l = e + "L";
  return (
    a[l] ? a[l].add(u) : (a[l] = new Set([u])),
    function () {
      var c = a[l];
      c && (c.delete(u), c.size === 0 && delete a[l]);
    }
  );
}
function SE(e, t, n, o) {
  var a = sP(t);
  return (
    Ra(function () {
      var u = pl(e, o)[ke];
      vv(a).forEach(function (l) {
        u.extend_(l, a[l], n && l in n ? n[l] : !0);
      });
    }),
    e
  );
}
var PE = 0;
function Q0() {
  this.message = "FLOW_CANCELLED";
}
Q0.prototype = Object.create(Error.prototype);
var Qd = k0("flow"),
  EE = k0("flow.bound", { bound: !0 }),
  ja = Object.assign(function (t, n) {
    if (ll(n)) return Qd.decorate_20223_(t, n);
    if (pi(n)) return Ca(t, n, Qd);
    var o = t,
      a = o.name || "<unnamed flow>",
      u = function () {
        var c = this,
          f = arguments,
          d = ++PE,
          v = ba(a + " - runid: " + d + " - init", o).apply(c, f),
          m,
          h = void 0,
          g = new Promise(function (w, x) {
            var S = 0;
            m = x;
            function O(j) {
              h = void 0;
              var C;
              try {
                C = ba(a + " - runid: " + d + " - yield " + S++, v.next).call(
                  v,
                  j
                );
              } catch (D) {
                return x(D);
              }
              k(C);
            }
            function A(j) {
              h = void 0;
              var C;
              try {
                C = ba(a + " - runid: " + d + " - yield " + S++, v.throw).call(
                  v,
                  j
                );
              } catch (D) {
                return x(D);
              }
              k(C);
            }
            function k(j) {
              if (Hr(j?.then)) {
                j.then(k, x);
                return;
              }
              return j.done
                ? w(j.value)
                : ((h = Promise.resolve(j.value)), h.then(O, A));
            }
            O(void 0);
          });
        return (
          (g.cancel = ba(a + " - runid: " + d + " - cancel", function () {
            try {
              h && Ub(h);
              var w = v.return(void 0),
                x = Promise.resolve(w.value);
              x.then(va, va), Ub(x), m(new Q0());
            } catch (S) {
              m(S);
            }
          })),
          g
        );
      };
    return (u.isMobXFlow = !0), u;
  }, Qd);
ja.bound = bn(EE);
function Ub(e) {
  Hr(e.cancel) && e.cancel();
}
function Yu(e) {
  return e?.isMobXFlow === !0;
}
function kE(e, t) {
  return e
    ? t !== void 0
      ? Ju(e)
        ? e[ke].values_.has(t)
        : !1
      : Ju(e) || !!e[ke] || mv(e) || mc(e) || Ic(e)
    : !1;
}
function Y0(e) {
  return kE(e);
}
function $n(e, t) {
  t === void 0 && (t = void 0), Er();
  try {
    return e.apply(t);
  } finally {
    kr();
  }
}
function fa(e) {
  return e[ke];
}
var jE = {
  has: function (t, n) {
    return fa(t).has_(n);
  },
  get: function (t, n) {
    return fa(t).get_(n);
  },
  set: function (t, n, o) {
    var a;
    return pi(n) ? ((a = fa(t).set_(n, o, !0)) != null ? a : !0) : !1;
  },
  deleteProperty: function (t, n) {
    var o;
    return pi(n) ? ((o = fa(t).delete_(n, !0)) != null ? o : !0) : !1;
  },
  defineProperty: function (t, n, o) {
    var a;
    return (a = fa(t).defineProperty_(n, o)) != null ? a : !0;
  },
  ownKeys: function (t) {
    return fa(t).ownKeys_();
  },
  preventExtensions: function (t) {
    Fe(13);
  },
};
function AE(e, t) {
  var n, o;
  return (
    y0(),
    (e = pl(e, t)),
    (o = (n = e[ke]).proxy_) != null ? o : (n.proxy_ = new Proxy(e, jE))
  );
}
function Sr(e) {
  return e.interceptors_ !== void 0 && e.interceptors_.length > 0;
}
function fl(e, t) {
  var n = e.interceptors_ || (e.interceptors_ = []);
  return (
    n.push(t),
    g0(function () {
      var o = n.indexOf(t);
      o !== -1 && n.splice(o, 1);
    })
  );
}
function Pr(e, t) {
  var n = _i();
  try {
    for (
      var o = [].concat(e.interceptors_ || []), a = 0, u = o.length;
      a < u && ((t = o[a](t)), t && !t.type && Fe(14), !!t);
      a++
    );
    return t;
  } finally {
    qn(n);
  }
}
function Vr(e) {
  return e.changeListeners_ !== void 0 && e.changeListeners_.length > 0;
}
function dl(e, t) {
  var n = e.changeListeners_ || (e.changeListeners_ = []);
  return (
    n.push(t),
    g0(function () {
      var o = n.indexOf(t);
      o !== -1 && n.splice(o, 1);
    })
  );
}
function Wr(e, t) {
  var n = _i(),
    o = e.changeListeners_;
  if (o) {
    o = o.slice();
    for (var a = 0, u = o.length; a < u; a++) o[a](t);
    qn(n);
  }
}
var Fb = "splice",
  yn = "update",
  IE = 1e4,
  TE = {
    get: function (t, n) {
      var o = t[ke];
      return n === ke
        ? o
        : n === "length"
        ? o.getArrayLength_()
        : typeof n == "string" && !isNaN(n)
        ? o.get_(parseInt(n))
        : jo(bc, n)
        ? bc[n]
        : t[n];
    },
    set: function (t, n, o) {
      var a = t[ke];
      return (
        n === "length" && a.setArrayLength_(o),
        typeof n == "symbol" || isNaN(n) ? (t[n] = o) : a.set_(parseInt(n), o),
        !0
      );
    },
    preventExtensions: function () {
      Fe(15);
    },
  },
  _v = (function () {
    function e(n, o, a, u) {
      n === void 0 && (n = "ObservableArray"),
        (this.owned_ = void 0),
        (this.legacyMode_ = void 0),
        (this.atom_ = void 0),
        (this.values_ = []),
        (this.interceptors_ = void 0),
        (this.changeListeners_ = void 0),
        (this.enhancer_ = void 0),
        (this.dehancer = void 0),
        (this.proxy_ = void 0),
        (this.lastKnownLength_ = 0),
        (this.owned_ = a),
        (this.legacyMode_ = u),
        (this.atom_ = new sl(n)),
        (this.enhancer_ = function (l, c) {
          return o(l, c, "ObservableArray[..]");
        });
    }
    var t = e.prototype;
    return (
      (t.dehanceValue_ = function (o) {
        return this.dehancer !== void 0 ? this.dehancer(o) : o;
      }),
      (t.dehanceValues_ = function (o) {
        return this.dehancer !== void 0 && o.length > 0
          ? o.map(this.dehancer)
          : o;
      }),
      (t.intercept_ = function (o) {
        return fl(this, o);
      }),
      (t.observe_ = function (o, a) {
        return (
          a === void 0 && (a = !1),
          a &&
            o({
              observableKind: "array",
              object: this.proxy_,
              debugObjectName: this.atom_.name_,
              type: "splice",
              index: 0,
              added: this.values_.slice(),
              addedCount: this.values_.length,
              removed: [],
              removedCount: 0,
            }),
          dl(this, o)
        );
      }),
      (t.getArrayLength_ = function () {
        return this.atom_.reportObserved(), this.values_.length;
      }),
      (t.setArrayLength_ = function (o) {
        (typeof o != "number" || isNaN(o) || o < 0) && Fe("Out of range: " + o);
        var a = this.values_.length;
        if (o !== a)
          if (o > a) {
            for (var u = new Array(o - a), l = 0; l < o - a; l++) u[l] = void 0;
            this.spliceWithArray_(a, 0, u);
          } else this.spliceWithArray_(o, a - o);
      }),
      (t.updateArrayLength_ = function (o, a) {
        o !== this.lastKnownLength_ && Fe(16),
          (this.lastKnownLength_ += a),
          this.legacyMode_ && a > 0 && ug(o + a + 1);
      }),
      (t.spliceWithArray_ = function (o, a, u) {
        var l = this;
        this.atom_;
        var c = this.values_.length;
        if (
          (o === void 0
            ? (o = 0)
            : o > c
            ? (o = c)
            : o < 0 && (o = Math.max(0, c + o)),
          arguments.length === 1
            ? (a = c - o)
            : a == null
            ? (a = 0)
            : (a = Math.max(0, Math.min(a, c - o))),
          u === void 0 && (u = cp),
          Sr(this))
        ) {
          var f = Pr(this, {
            object: this.proxy_,
            type: Fb,
            index: o,
            removedCount: a,
            added: u,
          });
          if (!f) return cp;
          (a = f.removedCount), (u = f.added);
        }
        if (
          ((u =
            u.length === 0
              ? u
              : u.map(function (m) {
                  return l.enhancer_(m, void 0);
                })),
          this.legacyMode_)
        ) {
          var d = u.length - a;
          this.updateArrayLength_(c, d);
        }
        var v = this.spliceItemsIntoValues_(o, a, u);
        return (
          (a !== 0 || u.length !== 0) && this.notifyArraySplice_(o, u, v),
          this.dehanceValues_(v)
        );
      }),
      (t.spliceItemsIntoValues_ = function (o, a, u) {
        if (u.length < IE) {
          var l;
          return (l = this.values_).splice.apply(l, [o, a].concat(u));
        } else {
          var c = this.values_.slice(o, o + a),
            f = this.values_.slice(o + a);
          this.values_.length += u.length - a;
          for (var d = 0; d < u.length; d++) this.values_[o + d] = u[d];
          for (var v = 0; v < f.length; v++)
            this.values_[o + u.length + v] = f[v];
          return c;
        }
      }),
      (t.notifyArrayChildUpdate_ = function (o, a, u) {
        var l = !this.owned_ && $u(),
          c = Vr(this),
          f =
            c || l
              ? {
                  observableKind: "array",
                  object: this.proxy_,
                  type: yn,
                  debugObjectName: this.atom_.name_,
                  index: o,
                  newValue: a,
                  oldValue: u,
                }
              : null;
        this.atom_.reportChanged(), c && Wr(this, f);
      }),
      (t.notifyArraySplice_ = function (o, a, u) {
        var l = !this.owned_ && $u(),
          c = Vr(this),
          f =
            c || l
              ? {
                  observableKind: "array",
                  object: this.proxy_,
                  debugObjectName: this.atom_.name_,
                  type: Fb,
                  index: o,
                  removed: u,
                  added: a,
                  removedCount: u.length,
                  addedCount: a.length,
                }
              : null;
        this.atom_.reportChanged(), c && Wr(this, f);
      }),
      (t.get_ = function (o) {
        if (this.legacyMode_ && o >= this.values_.length) {
          console.warn("[mobx] Out of bounds read: " + o);
          return;
        }
        return this.atom_.reportObserved(), this.dehanceValue_(this.values_[o]);
      }),
      (t.set_ = function (o, a) {
        var u = this.values_;
        if (
          (this.legacyMode_ && o > u.length && Fe(17, o, u.length),
          o < u.length)
        ) {
          this.atom_;
          var l = u[o];
          if (Sr(this)) {
            var c = Pr(this, {
              type: yn,
              object: this.proxy_,
              index: o,
              newValue: a,
            });
            if (!c) return;
            a = c.newValue;
          }
          a = this.enhancer_(a, l);
          var f = a !== l;
          f && ((u[o] = a), this.notifyArrayChildUpdate_(o, a, l));
        } else {
          for (
            var d = new Array(o + 1 - u.length), v = 0;
            v < d.length - 1;
            v++
          )
            d[v] = void 0;
          (d[d.length - 1] = a), this.spliceWithArray_(u.length, 0, d);
        }
      }),
      e
    );
  })();
function ME(e, t, n, o) {
  return (
    n === void 0 && (n = "ObservableArray"),
    o === void 0 && (o = !1),
    y0(),
    Ra(function () {
      var a = new _v(n, t, o, !1);
      _0(a.values_, ke, a);
      var u = new Proxy(a.values_, TE);
      return (a.proxy_ = u), e && e.length && a.spliceWithArray_(0, 0, e), u;
    })
  );
}
var bc = {
  clear: function () {
    return this.splice(0);
  },
  replace: function (t) {
    var n = this[ke];
    return n.spliceWithArray_(0, n.values_.length, t);
  },
  toJSON: function () {
    return this.slice();
  },
  splice: function (t, n) {
    for (
      var o = arguments.length, a = new Array(o > 2 ? o - 2 : 0), u = 2;
      u < o;
      u++
    )
      a[u - 2] = arguments[u];
    var l = this[ke];
    switch (arguments.length) {
      case 0:
        return [];
      case 1:
        return l.spliceWithArray_(t);
      case 2:
        return l.spliceWithArray_(t, n);
    }
    return l.spliceWithArray_(t, n, a);
  },
  spliceWithArray: function (t, n, o) {
    return this[ke].spliceWithArray_(t, n, o);
  },
  push: function () {
    for (
      var t = this[ke], n = arguments.length, o = new Array(n), a = 0;
      a < n;
      a++
    )
      o[a] = arguments[a];
    return t.spliceWithArray_(t.values_.length, 0, o), t.values_.length;
  },
  pop: function () {
    return this.splice(Math.max(this[ke].values_.length - 1, 0), 1)[0];
  },
  shift: function () {
    return this.splice(0, 1)[0];
  },
  unshift: function () {
    for (
      var t = this[ke], n = arguments.length, o = new Array(n), a = 0;
      a < n;
      a++
    )
      o[a] = arguments[a];
    return t.spliceWithArray_(0, 0, o), t.values_.length;
  },
  reverse: function () {
    return (
      ee.trackingDerivation && Fe(37, "reverse"),
      this.replace(this.slice().reverse()),
      this
    );
  },
  sort: function () {
    ee.trackingDerivation && Fe(37, "sort");
    var t = this.slice();
    return t.sort.apply(t, arguments), this.replace(t), this;
  },
  remove: function (t) {
    var n = this[ke],
      o = n.dehanceValues_(n.values_).indexOf(t);
    return o > -1 ? (this.splice(o, 1), !0) : !1;
  },
};
_t("concat", Hn);
_t("flat", Hn);
_t("includes", Hn);
_t("indexOf", Hn);
_t("join", Hn);
_t("lastIndexOf", Hn);
_t("slice", Hn);
_t("toString", Hn);
_t("toLocaleString", Hn);
_t("every", No);
_t("filter", No);
_t("find", No);
_t("findIndex", No);
_t("flatMap", No);
_t("forEach", No);
_t("map", No);
_t("some", No);
_t("reduce", J0);
_t("reduceRight", J0);
function _t(e, t) {
  typeof Array.prototype[e] == "function" && (bc[e] = t(e));
}
function Hn(e) {
  return function () {
    var t = this[ke];
    t.atom_.reportObserved();
    var n = t.dehanceValues_(t.values_);
    return n[e].apply(n, arguments);
  };
}
function No(e) {
  return function (t, n) {
    var o = this,
      a = this[ke];
    a.atom_.reportObserved();
    var u = a.dehanceValues_(a.values_);
    return u[e](function (l, c) {
      return t.call(n, l, c, o);
    });
  };
}
function J0(e) {
  return function () {
    var t = this,
      n = this[ke];
    n.atom_.reportObserved();
    var o = n.dehanceValues_(n.values_),
      a = arguments[0];
    return (
      (arguments[0] = function (u, l, c) {
        return a(u, l, c, t);
      }),
      o[e].apply(o, arguments)
    );
  };
}
var NE = wi("ObservableArrayAdministration", _v);
function Mc(e) {
  return Ec(e) && NE(e[ke]);
}
var G0,
  Z0,
  CE = {},
  Po = "add",
  yc = "delete";
G0 = Symbol.iterator;
Z0 = Symbol.toStringTag;
var eg = (function () {
    function e(n, o, a) {
      var u = this;
      o === void 0 && (o = vi),
        a === void 0 && (a = "ObservableMap"),
        (this.enhancer_ = void 0),
        (this.name_ = void 0),
        (this[ke] = CE),
        (this.data_ = void 0),
        (this.hasMap_ = void 0),
        (this.keysAtom_ = void 0),
        (this.interceptors_ = void 0),
        (this.changeListeners_ = void 0),
        (this.dehancer = void 0),
        (this.enhancer_ = o),
        (this.name_ = a),
        Hr(Map) || Fe(18),
        Ra(function () {
          (u.keysAtom_ = P0("ObservableMap.keys()")),
            (u.data_ = new Map()),
            (u.hasMap_ = new Map()),
            n && u.merge(n);
        });
    }
    var t = e.prototype;
    return (
      (t.has_ = function (o) {
        return this.data_.has(o);
      }),
      (t.has = function (o) {
        var a = this;
        if (!ee.trackingDerivation) return this.has_(o);
        var u = this.hasMap_.get(o);
        if (!u) {
          var l = (u = new di(this.has_(o), kc, "ObservableMap.key?", !1));
          this.hasMap_.set(o, l),
            H0(l, function () {
              return a.hasMap_.delete(o);
            });
        }
        return u.get();
      }),
      (t.set = function (o, a) {
        var u = this.has_(o);
        if (Sr(this)) {
          var l = Pr(this, {
            type: u ? yn : Po,
            object: this,
            newValue: a,
            name: o,
          });
          if (!l) return this;
          a = l.newValue;
        }
        return u ? this.updateValue_(o, a) : this.addValue_(o, a), this;
      }),
      (t.delete = function (o) {
        var a = this;
        if ((this.keysAtom_, Sr(this))) {
          var u = Pr(this, { type: yc, object: this, name: o });
          if (!u) return !1;
        }
        if (this.has_(o)) {
          var l = $u(),
            c = Vr(this),
            f =
              c || l
                ? {
                    observableKind: "map",
                    debugObjectName: this.name_,
                    type: yc,
                    object: this,
                    oldValue: this.data_.get(o).value_,
                    name: o,
                  }
                : null;
          return (
            $n(function () {
              var d;
              a.keysAtom_.reportChanged(),
                (d = a.hasMap_.get(o)) == null || d.setNewValue_(!1);
              var v = a.data_.get(o);
              v.setNewValue_(void 0), a.data_.delete(o);
            }),
            c && Wr(this, f),
            !0
          );
        }
        return !1;
      }),
      (t.updateValue_ = function (o, a) {
        var u = this.data_.get(o);
        if (((a = u.prepareNewValue_(a)), a !== ee.UNCHANGED)) {
          var l = $u(),
            c = Vr(this),
            f =
              c || l
                ? {
                    observableKind: "map",
                    debugObjectName: this.name_,
                    type: yn,
                    object: this,
                    oldValue: u.value_,
                    name: o,
                    newValue: a,
                  }
                : null;
          u.setNewValue_(a), c && Wr(this, f);
        }
      }),
      (t.addValue_ = function (o, a) {
        var u = this;
        this.keysAtom_,
          $n(function () {
            var d,
              v = new di(a, u.enhancer_, "ObservableMap.key", !1);
            u.data_.set(o, v),
              (a = v.value_),
              (d = u.hasMap_.get(o)) == null || d.setNewValue_(!0),
              u.keysAtom_.reportChanged();
          });
        var l = $u(),
          c = Vr(this),
          f =
            c || l
              ? {
                  observableKind: "map",
                  debugObjectName: this.name_,
                  type: Po,
                  object: this,
                  name: o,
                  newValue: a,
                }
              : null;
        c && Wr(this, f);
      }),
      (t.get = function (o) {
        return this.has(o)
          ? this.dehanceValue_(this.data_.get(o).get())
          : this.dehanceValue_(void 0);
      }),
      (t.dehanceValue_ = function (o) {
        return this.dehancer !== void 0 ? this.dehancer(o) : o;
      }),
      (t.keys = function () {
        return this.keysAtom_.reportObserved(), this.data_.keys();
      }),
      (t.values = function () {
        var o = this,
          a = this.keys();
        return Zu({
          next: function () {
            var l = a.next(),
              c = l.done,
              f = l.value;
            return { done: c, value: c ? void 0 : o.get(f) };
          },
        });
      }),
      (t.entries = function () {
        var o = this,
          a = this.keys();
        return Zu({
          next: function () {
            var l = a.next(),
              c = l.done,
              f = l.value;
            return { done: c, value: c ? void 0 : [f, o.get(f)] };
          },
        });
      }),
      (t[G0] = function () {
        return this.entries();
      }),
      (t.forEach = function (o, a) {
        for (var u = ha(this), l; !(l = u()).done; ) {
          var c = l.value,
            f = c[0],
            d = c[1];
          o.call(a, d, f, this);
        }
      }),
      (t.merge = function (o) {
        var a = this;
        return (
          Oi(o) && (o = new Map(o)),
          $n(function () {
            Io(o)
              ? lP(o).forEach(function (u) {
                  return a.set(u, o[u]);
                })
              : Array.isArray(o)
              ? o.forEach(function (u) {
                  var l = u[0],
                    c = u[1];
                  return a.set(l, c);
                })
              : Na(o)
              ? (o.constructor !== Map && Fe(19, o),
                o.forEach(function (u, l) {
                  return a.set(l, u);
                }))
              : o != null && Fe(20, o);
          }),
          this
        );
      }),
      (t.clear = function () {
        var o = this;
        $n(function () {
          L0(function () {
            for (var a = ha(o.keys()), u; !(u = a()).done; ) {
              var l = u.value;
              o.delete(l);
            }
          });
        });
      }),
      (t.replace = function (o) {
        var a = this;
        return (
          $n(function () {
            for (
              var u = zE(o), l = new Map(), c = !1, f = ha(a.data_.keys()), d;
              !(d = f()).done;

            ) {
              var v = d.value;
              if (!u.has(v)) {
                var m = a.delete(v);
                if (m) c = !0;
                else {
                  var h = a.data_.get(v);
                  l.set(v, h);
                }
              }
            }
            for (var g = ha(u.entries()), w; !(w = g()).done; ) {
              var x = w.value,
                S = x[0],
                O = x[1],
                A = a.data_.has(S);
              if ((a.set(S, O), a.data_.has(S))) {
                var k = a.data_.get(S);
                l.set(S, k), A || (c = !0);
              }
            }
            if (!c)
              if (a.data_.size !== l.size) a.keysAtom_.reportChanged();
              else
                for (
                  var j = a.data_.keys(),
                    C = l.keys(),
                    D = j.next(),
                    W = C.next();
                  !D.done;

                ) {
                  if (D.value !== W.value) {
                    a.keysAtom_.reportChanged();
                    break;
                  }
                  (D = j.next()), (W = C.next());
                }
            a.data_ = l;
          }),
          this
        );
      }),
      (t.toString = function () {
        return "[object ObservableMap]";
      }),
      (t.toJSON = function () {
        return Array.from(this);
      }),
      (t.observe_ = function (o, a) {
        return dl(this, o);
      }),
      (t.intercept_ = function (o) {
        return fl(this, o);
      }),
      hv(e, [
        {
          key: "size",
          get: function () {
            return this.keysAtom_.reportObserved(), this.data_.size;
          },
        },
        {
          key: Z0,
          get: function () {
            return "Map";
          },
        },
      ]),
      e
    );
  })(),
  Oi = wi("ObservableMap", eg);
function zE(e) {
  if (Na(e) || Oi(e)) return e;
  if (Array.isArray(e)) return new Map(e);
  if (Io(e)) {
    var t = new Map();
    for (var n in e) t.set(n, e[n]);
    return t;
  } else return Fe(21, e);
}
var tg,
  rg,
  RE = {};
tg = Symbol.iterator;
rg = Symbol.toStringTag;
var ng = (function () {
    function e(n, o, a) {
      var u = this;
      o === void 0 && (o = vi),
        a === void 0 && (a = "ObservableSet"),
        (this.name_ = void 0),
        (this[ke] = RE),
        (this.data_ = new Set()),
        (this.atom_ = void 0),
        (this.changeListeners_ = void 0),
        (this.interceptors_ = void 0),
        (this.dehancer = void 0),
        (this.enhancer_ = void 0),
        (this.name_ = a),
        Hr(Set) || Fe(22),
        (this.enhancer_ = function (l, c) {
          return o(l, c, a);
        }),
        Ra(function () {
          (u.atom_ = P0(u.name_)), n && u.replace(n);
        });
    }
    var t = e.prototype;
    return (
      (t.dehanceValue_ = function (o) {
        return this.dehancer !== void 0 ? this.dehancer(o) : o;
      }),
      (t.clear = function () {
        var o = this;
        $n(function () {
          L0(function () {
            for (var a = ha(o.data_.values()), u; !(u = a()).done; ) {
              var l = u.value;
              o.delete(l);
            }
          });
        });
      }),
      (t.forEach = function (o, a) {
        for (var u = ha(this), l; !(l = u()).done; ) {
          var c = l.value;
          o.call(a, c, c, this);
        }
      }),
      (t.add = function (o) {
        var a = this;
        if ((this.atom_, Sr(this))) {
          var u = Pr(this, { type: Po, object: this, newValue: o });
          if (!u) return this;
        }
        if (!this.has(o)) {
          $n(function () {
            a.data_.add(a.enhancer_(o, void 0)), a.atom_.reportChanged();
          });
          var l = !1,
            c = Vr(this),
            f =
              c || l
                ? {
                    observableKind: "set",
                    debugObjectName: this.name_,
                    type: Po,
                    object: this,
                    newValue: o,
                  }
                : null;
          c && Wr(this, f);
        }
        return this;
      }),
      (t.delete = function (o) {
        var a = this;
        if (Sr(this)) {
          var u = Pr(this, { type: yc, object: this, oldValue: o });
          if (!u) return !1;
        }
        if (this.has(o)) {
          var l = !1,
            c = Vr(this),
            f =
              c || l
                ? {
                    observableKind: "set",
                    debugObjectName: this.name_,
                    type: yc,
                    object: this,
                    oldValue: o,
                  }
                : null;
          return (
            $n(function () {
              a.atom_.reportChanged(), a.data_.delete(o);
            }),
            c && Wr(this, f),
            !0
          );
        }
        return !1;
      }),
      (t.has = function (o) {
        return (
          this.atom_.reportObserved(), this.data_.has(this.dehanceValue_(o))
        );
      }),
      (t.entries = function () {
        var o = 0,
          a = Array.from(this.keys()),
          u = Array.from(this.values());
        return Zu({
          next: function () {
            var c = o;
            return (
              (o += 1),
              c < u.length ? { value: [a[c], u[c]], done: !1 } : { done: !0 }
            );
          },
        });
      }),
      (t.keys = function () {
        return this.values();
      }),
      (t.values = function () {
        this.atom_.reportObserved();
        var o = this,
          a = 0,
          u = Array.from(this.data_.values());
        return Zu({
          next: function () {
            return a < u.length
              ? { value: o.dehanceValue_(u[a++]), done: !1 }
              : { done: !0 };
          },
        });
      }),
      (t.replace = function (o) {
        var a = this;
        return (
          za(o) && (o = new Set(o)),
          $n(function () {
            Array.isArray(o)
              ? (a.clear(),
                o.forEach(function (u) {
                  return a.add(u);
                }))
              : ul(o)
              ? (a.clear(),
                o.forEach(function (u) {
                  return a.add(u);
                }))
              : o != null && Fe("Cannot initialize set from " + o);
          }),
          this
        );
      }),
      (t.observe_ = function (o, a) {
        return dl(this, o);
      }),
      (t.intercept_ = function (o) {
        return fl(this, o);
      }),
      (t.toJSON = function () {
        return Array.from(this);
      }),
      (t.toString = function () {
        return "[object ObservableSet]";
      }),
      (t[tg] = function () {
        return this.values();
      }),
      hv(e, [
        {
          key: "size",
          get: function () {
            return this.atom_.reportObserved(), this.data_.size;
          },
        },
        {
          key: rg,
          get: function () {
            return "Set";
          },
        },
      ]),
      e
    );
  })(),
  za = wi("ObservableSet", ng),
  $b = Object.create(null),
  Vb = "remove",
  og = (function () {
    function e(n, o, a, u) {
      o === void 0 && (o = new Map()),
        u === void 0 && (u = BP),
        (this.target_ = void 0),
        (this.values_ = void 0),
        (this.name_ = void 0),
        (this.defaultAnnotation_ = void 0),
        (this.keysAtom_ = void 0),
        (this.changeListeners_ = void 0),
        (this.interceptors_ = void 0),
        (this.proxy_ = void 0),
        (this.isPlainObject_ = void 0),
        (this.appliedAnnotations_ = void 0),
        (this.pendingKeys_ = void 0),
        (this.target_ = n),
        (this.values_ = o),
        (this.name_ = a),
        (this.defaultAnnotation_ = u),
        (this.keysAtom_ = new sl("ObservableObject.keys")),
        (this.isPlainObject_ = Io(this.target_));
    }
    var t = e.prototype;
    return (
      (t.getObservablePropValue_ = function (o) {
        return this.values_.get(o).get();
      }),
      (t.setObservablePropValue_ = function (o, a) {
        var u = this.values_.get(o);
        if (u instanceof ka) return u.set(a), !0;
        if (Sr(this)) {
          var l = Pr(this, {
            type: yn,
            object: this.proxy_ || this.target_,
            name: o,
            newValue: a,
          });
          if (!l) return null;
          a = l.newValue;
        }
        if (((a = u.prepareNewValue_(a)), a !== ee.UNCHANGED)) {
          var c = Vr(this),
            f = !1,
            d =
              c || f
                ? {
                    type: yn,
                    observableKind: "object",
                    debugObjectName: this.name_,
                    object: this.proxy_ || this.target_,
                    oldValue: u.value_,
                    name: o,
                    newValue: a,
                  }
                : null;
          u.setNewValue_(a), c && Wr(this, d);
        }
        return !0;
      }),
      (t.get_ = function (o) {
        return (
          ee.trackingDerivation && !jo(this.target_, o) && this.has_(o),
          this.target_[o]
        );
      }),
      (t.set_ = function (o, a, u) {
        return (
          u === void 0 && (u = !1),
          jo(this.target_, o)
            ? this.values_.has(o)
              ? this.setObservablePropValue_(o, a)
              : u
              ? Reflect.set(this.target_, o, a)
              : ((this.target_[o] = a), !0)
            : this.extend_(
                o,
                { value: a, enumerable: !0, writable: !0, configurable: !0 },
                this.defaultAnnotation_,
                u
              )
        );
      }),
      (t.has_ = function (o) {
        if (!ee.trackingDerivation) return o in this.target_;
        this.pendingKeys_ || (this.pendingKeys_ = new Map());
        var a = this.pendingKeys_.get(o);
        return (
          a ||
            ((a = new di(o in this.target_, kc, "ObservableObject.key?", !1)),
            this.pendingKeys_.set(o, a)),
          a.get()
        );
      }),
      (t.make_ = function (o, a) {
        if ((a === !0 && (a = this.defaultAnnotation_), a !== !1)) {
          if (!(o in this.target_)) {
            var u;
            if ((u = this.target_[ma]) != null && u[o]) return;
            Fe(1, a.annotationType_, this.name_ + "." + o.toString());
          }
          for (var l = this.target_; l && l !== Pc; ) {
            var c = fc(l, o);
            if (c) {
              var f = a.make_(this, o, c, l);
              if (f === 0) return;
              if (f === 1) break;
            }
            l = Object.getPrototypeOf(l);
          }
          qb(this, a, o);
        }
      }),
      (t.extend_ = function (o, a, u, l) {
        if (
          (l === void 0 && (l = !1),
          u === !0 && (u = this.defaultAnnotation_),
          u === !1)
        )
          return this.defineProperty_(o, a, l);
        var c = u.extend_(this, o, a, l);
        return c && qb(this, u, o), c;
      }),
      (t.defineProperty_ = function (o, a, u) {
        u === void 0 && (u = !1), this.keysAtom_;
        try {
          Er();
          var l = this.delete_(o);
          if (!l) return l;
          if (Sr(this)) {
            var c = Pr(this, {
              object: this.proxy_ || this.target_,
              name: o,
              type: Po,
              newValue: a.value,
            });
            if (!c) return null;
            var f = c.newValue;
            a.value !== f && (a = Ea({}, a, { value: f }));
          }
          if (u) {
            if (!Reflect.defineProperty(this.target_, o, a)) return !1;
          } else mn(this.target_, o, a);
          this.notifyPropertyAddition_(o, a.value);
        } finally {
          kr();
        }
        return !0;
      }),
      (t.defineObservableProperty_ = function (o, a, u, l) {
        l === void 0 && (l = !1), this.keysAtom_;
        try {
          Er();
          var c = this.delete_(o);
          if (!c) return c;
          if (Sr(this)) {
            var f = Pr(this, {
              object: this.proxy_ || this.target_,
              name: o,
              type: Po,
              newValue: a,
            });
            if (!f) return null;
            a = f.newValue;
          }
          var d = Wb(o),
            v = {
              configurable: ee.safeDescriptors ? this.isPlainObject_ : !0,
              enumerable: !0,
              get: d.get,
              set: d.set,
            };
          if (l) {
            if (!Reflect.defineProperty(this.target_, o, v)) return !1;
          } else mn(this.target_, o, v);
          var m = new di(a, u, "ObservableObject.key", !1);
          this.values_.set(o, m), this.notifyPropertyAddition_(o, m.value_);
        } finally {
          kr();
        }
        return !0;
      }),
      (t.defineComputedProperty_ = function (o, a, u) {
        u === void 0 && (u = !1), this.keysAtom_;
        try {
          Er();
          var l = this.delete_(o);
          if (!l) return l;
          if (Sr(this)) {
            var c = Pr(this, {
              object: this.proxy_ || this.target_,
              name: o,
              type: Po,
              newValue: void 0,
            });
            if (!c) return null;
          }
          a.name || (a.name = "ObservableObject.key"),
            (a.context = this.proxy_ || this.target_);
          var f = Wb(o),
            d = {
              configurable: ee.safeDescriptors ? this.isPlainObject_ : !0,
              enumerable: !1,
              get: f.get,
              set: f.set,
            };
          if (u) {
            if (!Reflect.defineProperty(this.target_, o, d)) return !1;
          } else mn(this.target_, o, d);
          this.values_.set(o, new ka(a)),
            this.notifyPropertyAddition_(o, void 0);
        } finally {
          kr();
        }
        return !0;
      }),
      (t.delete_ = function (o, a) {
        if ((a === void 0 && (a = !1), this.keysAtom_, !jo(this.target_, o)))
          return !0;
        if (Sr(this)) {
          var u = Pr(this, {
            object: this.proxy_ || this.target_,
            name: o,
            type: Vb,
          });
          if (!u) return null;
        }
        try {
          var l, c;
          Er();
          var f = Vr(this),
            d = !1,
            v = this.values_.get(o),
            m = void 0;
          if (!v && (f || d)) {
            var h;
            m = (h = fc(this.target_, o)) == null ? void 0 : h.value;
          }
          if (a) {
            if (!Reflect.deleteProperty(this.target_, o)) return !1;
          } else delete this.target_[o];
          if (
            (v &&
              (this.values_.delete(o),
              v instanceof di && (m = v.value_),
              $0(v)),
            this.keysAtom_.reportChanged(),
            (l = this.pendingKeys_) == null ||
              (c = l.get(o)) == null ||
              c.set(o in this.target_),
            f || d)
          ) {
            var g = {
              type: Vb,
              observableKind: "object",
              object: this.proxy_ || this.target_,
              debugObjectName: this.name_,
              oldValue: m,
              name: o,
            };
            f && Wr(this, g);
          }
        } finally {
          kr();
        }
        return !0;
      }),
      (t.observe_ = function (o, a) {
        return dl(this, o);
      }),
      (t.intercept_ = function (o) {
        return fl(this, o);
      }),
      (t.notifyPropertyAddition_ = function (o, a) {
        var u,
          l,
          c = Vr(this),
          f = !1;
        if (c || f) {
          var d =
            c || f
              ? {
                  type: Po,
                  observableKind: "object",
                  debugObjectName: this.name_,
                  object: this.proxy_ || this.target_,
                  name: o,
                  newValue: a,
                }
              : null;
          c && Wr(this, d);
        }
        (u = this.pendingKeys_) == null || (l = u.get(o)) == null || l.set(!0),
          this.keysAtom_.reportChanged();
      }),
      (t.ownKeys_ = function () {
        return this.keysAtom_.reportObserved(), vv(this.target_);
      }),
      (t.keys_ = function () {
        return this.keysAtom_.reportObserved(), Object.keys(this.target_);
      }),
      e
    );
  })();
function pl(e, t) {
  var n;
  if (jo(e, ke)) return e;
  var o = (n = t?.name) != null ? n : "ObservableObject",
    a = new og(e, new Map(), String(o), QP(t));
  return pv(e, ke, a), e;
}
var LE = wi("ObservableObjectAdministration", og);
function Wb(e) {
  return (
    $b[e] ||
    ($b[e] = {
      get: function () {
        return this[ke].getObservablePropValue_(e);
      },
      set: function (n) {
        return this[ke].setObservablePropValue_(e, n);
      },
    })
  );
}
function Ju(e) {
  return Ec(e) ? LE(e[ke]) : !1;
}
function qb(e, t, n) {
  var o;
  (o = e.target_[ma]) == null || delete o[n];
}
var BE = ag(0),
  DE = (function () {
    var e = !1,
      t = {};
    return (
      Object.defineProperty(t, "0", {
        set: function () {
          e = !0;
        },
      }),
      (Object.create(t)[0] = 1),
      e === !1
    );
  })(),
  Yd = 0,
  ig = function () {};
function UE(e, t) {
  Object.setPrototypeOf
    ? Object.setPrototypeOf(e.prototype, t)
    : e.prototype.__proto__ !== void 0
    ? (e.prototype.__proto__ = t)
    : (e.prototype = t);
}
UE(ig, Array.prototype);
var Ov = (function (e, t, n) {
  S0(o, e);
  function o(u, l, c, f) {
    var d;
    return (
      c === void 0 && (c = "ObservableArray"),
      f === void 0 && (f = !1),
      (d = e.call(this) || this),
      Ra(function () {
        var v = new _v(c, l, f, !0);
        (v.proxy_ = Kd(d)),
          _0(Kd(d), ke, v),
          u && u.length && d.spliceWithArray(0, 0, u),
          DE && Object.defineProperty(Kd(d), "0", BE);
      }),
      d
    );
  }
  var a = o.prototype;
  return (
    (a.concat = function () {
      this[ke].atom_.reportObserved();
      for (var l = arguments.length, c = new Array(l), f = 0; f < l; f++)
        c[f] = arguments[f];
      return Array.prototype.concat.apply(
        this.slice(),
        c.map(function (d) {
          return Mc(d) ? d.slice() : d;
        })
      );
    }),
    (a[n] = function () {
      var u = this,
        l = 0;
      return Zu({
        next: function () {
          return l < u.length
            ? { value: u[l++], done: !1 }
            : { done: !0, value: void 0 };
        },
      });
    }),
    hv(o, [
      {
        key: "length",
        get: function () {
          return this[ke].getArrayLength_();
        },
        set: function (l) {
          this[ke].setArrayLength_(l);
        },
      },
      {
        key: t,
        get: function () {
          return "Array";
        },
      },
    ]),
    o
  );
})(ig, Symbol.toStringTag, Symbol.iterator);
Object.entries(bc).forEach(function (e) {
  var t = e[0],
    n = e[1];
  t !== "concat" && pv(Ov.prototype, t, n);
});
function ag(e) {
  return {
    enumerable: !1,
    configurable: !0,
    get: function () {
      return this[ke].get_(e);
    },
    set: function (n) {
      this[ke].set_(e, n);
    },
  };
}
function FE(e) {
  mn(Ov.prototype, "" + e, ag(e));
}
function ug(e) {
  if (e > Yd) {
    for (var t = Yd; t < e + 100; t++) FE(t);
    Yd = e;
  }
}
ug(1e3);
function $E(e, t, n) {
  return new Ov(e, t, n);
}
function Gu(e, t) {
  if (typeof e == "object" && e !== null) {
    if (Mc(e)) return t !== void 0 && Fe(23), e[ke].atom_;
    if (za(e)) return e.atom_;
    if (Oi(e)) {
      if (t === void 0) return e.keysAtom_;
      var n = e.data_.get(t) || e.hasMap_.get(t);
      return n || Fe(25, t, gp(e)), n;
    }
    if (Ju(e)) {
      if (!t) return Fe(26);
      var o = e[ke].values_.get(t);
      return o || Fe(27, t, gp(e)), o;
    }
    if (mv(e) || Ic(e) || mc(e)) return e;
  } else if (Hr(e) && mc(e[ke])) return e[ke];
  Fe(28);
}
function lg(e, t) {
  if ((e || Fe(29), t !== void 0)) return lg(Gu(e, t));
  if (mv(e) || Ic(e) || mc(e) || Oi(e) || za(e)) return e;
  if (e[ke]) return e[ke];
  Fe(24, e);
}
function gp(e, t) {
  var n;
  if (t !== void 0) n = Gu(e, t);
  else {
    if (Tc(e)) return e.name;
    Ju(e) || Oi(e) || za(e) ? (n = lg(e)) : (n = Gu(e));
  }
  return n.name_;
}
function Ra(e) {
  var t = _i(),
    n = yv(!0);
  Er();
  try {
    return e();
  } finally {
    kr(), gv(n), qn(t);
  }
}
var Kb = Pc.toString;
function xv(e, t, n) {
  return n === void 0 && (n = -1), wp(e, t, n);
}
function wp(e, t, n, o, a) {
  if (e === t) return e !== 0 || 1 / e === 1 / t;
  if (e == null || t == null) return !1;
  if (e !== e) return t !== t;
  var u = typeof e;
  if (u !== "function" && u !== "object" && typeof t != "object") return !1;
  var l = Kb.call(e);
  if (l !== Kb.call(t)) return !1;
  switch (l) {
    case "[object RegExp]":
    case "[object String]":
      return "" + e == "" + t;
    case "[object Number]":
      return +e != +e ? +t != +t : +e == 0 ? 1 / +e === 1 / t : +e == +t;
    case "[object Date]":
    case "[object Boolean]":
      return +e == +t;
    case "[object Symbol]":
      return (
        typeof Symbol < "u" && Symbol.valueOf.call(e) === Symbol.valueOf.call(t)
      );
    case "[object Map]":
    case "[object Set]":
      n >= 0 && n++;
      break;
  }
  (e = Hb(e)), (t = Hb(t));
  var c = l === "[object Array]";
  if (!c) {
    if (typeof e != "object" || typeof t != "object") return !1;
    var f = e.constructor,
      d = t.constructor;
    if (
      f !== d &&
      !(Hr(f) && f instanceof f && Hr(d) && d instanceof d) &&
      "constructor" in e &&
      "constructor" in t
    )
      return !1;
  }
  if (n === 0) return !1;
  n < 0 && (n = -1), (o = o || []), (a = a || []);
  for (var v = o.length; v--; ) if (o[v] === e) return a[v] === t;
  if ((o.push(e), a.push(t), c)) {
    if (((v = e.length), v !== t.length)) return !1;
    for (; v--; ) if (!wp(e[v], t[v], n - 1, o, a)) return !1;
  } else {
    var m = Object.keys(e),
      h;
    if (((v = m.length), Object.keys(t).length !== v)) return !1;
    for (; v--; )
      if (((h = m[v]), !(jo(t, h) && wp(e[h], t[h], n - 1, o, a)))) return !1;
  }
  return o.pop(), a.pop(), !0;
}
function Hb(e) {
  return Mc(e)
    ? e.slice()
    : Na(e) || Oi(e) || ul(e) || za(e)
    ? Array.from(e.entries())
    : e;
}
function Zu(e) {
  return (e[Symbol.iterator] = VE), e;
}
function VE() {
  return this;
}
["Symbol", "Map", "Set"].forEach(function (e) {
  var t = h0();
  typeof t[e] > "u" &&
    Fe("MobX requires global '" + e + "' to be available or polyfilled");
});
typeof __MOBX_DEVTOOLS_GLOBAL_HOOK__ == "object" &&
  __MOBX_DEVTOOLS_GLOBAL_HOOK__.injectMobx({
    spy: dE,
    extras: { getDebugName: gp },
    $mobx: ke,
  });
var _p = function (e, t) {
  return (
    (_p =
      Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array &&
        function (n, o) {
          n.__proto__ = o;
        }) ||
      function (n, o) {
        for (var a in o)
          Object.prototype.hasOwnProperty.call(o, a) && (n[a] = o[a]);
      }),
    _p(e, t)
  );
};
function vl(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError(
      "Class extends value " + String(t) + " is not a constructor or null"
    );
  _p(e, t);
  function n() {
    this.constructor = e;
  }
  e.prototype =
    t === null ? Object.create(t) : ((n.prototype = t.prototype), new n());
}
function WE(e, t, n, o) {
  function a(u) {
    return u instanceof n
      ? u
      : new n(function (l) {
          l(u);
        });
  }
  return new (n || (n = Promise))(function (u, l) {
    function c(v) {
      try {
        d(o.next(v));
      } catch (m) {
        l(m);
      }
    }
    function f(v) {
      try {
        d(o.throw(v));
      } catch (m) {
        l(m);
      }
    }
    function d(v) {
      v.done ? u(v.value) : a(v.value).then(c, f);
    }
    d((o = o.apply(e, t || [])).next());
  });
}
function sg(e, t) {
  var n = {
      label: 0,
      sent: function () {
        if (u[0] & 1) throw u[1];
        return u[1];
      },
      trys: [],
      ops: [],
    },
    o,
    a,
    u,
    l;
  return (
    (l = { next: c(0), throw: c(1), return: c(2) }),
    typeof Symbol == "function" &&
      (l[Symbol.iterator] = function () {
        return this;
      }),
    l
  );
  function c(d) {
    return function (v) {
      return f([d, v]);
    };
  }
  function f(d) {
    if (o) throw new TypeError("Generator is already executing.");
    for (; l && ((l = 0), d[0] && (n = 0)), n; )
      try {
        if (
          ((o = 1),
          a &&
            (u =
              d[0] & 2
                ? a.return
                : d[0]
                ? a.throw || ((u = a.return) && u.call(a), 0)
                : a.next) &&
            !(u = u.call(a, d[1])).done)
        )
          return u;
        switch (((a = 0), u && (d = [d[0] & 2, u.value]), d[0])) {
          case 0:
          case 1:
            u = d;
            break;
          case 4:
            return n.label++, { value: d[1], done: !1 };
          case 5:
            n.label++, (a = d[1]), (d = [0]);
            continue;
          case 7:
            (d = n.ops.pop()), n.trys.pop();
            continue;
          default:
            if (
              ((u = n.trys),
              !(u = u.length > 0 && u[u.length - 1]) &&
                (d[0] === 6 || d[0] === 2))
            ) {
              n = 0;
              continue;
            }
            if (d[0] === 3 && (!u || (d[1] > u[0] && d[1] < u[3]))) {
              n.label = d[1];
              break;
            }
            if (d[0] === 6 && n.label < u[1]) {
              (n.label = u[1]), (u = d);
              break;
            }
            if (u && n.label < u[2]) {
              (n.label = u[2]), n.ops.push(d);
              break;
            }
            u[2] && n.ops.pop(), n.trys.pop();
            continue;
        }
        d = t.call(e, n);
      } catch (v) {
        (d = [6, v]), (a = 0);
      } finally {
        o = u = 0;
      }
    if (d[0] & 5) throw d[1];
    return { value: d[0] ? d[1] : void 0, done: !0 };
  }
}
function Aa(e) {
  var t = typeof Symbol == "function" && Symbol.iterator,
    n = t && e[t],
    o = 0;
  if (n) return n.call(e);
  if (e && typeof e.length == "number")
    return {
      next: function () {
        return (
          e && o >= e.length && (e = void 0), { value: e && e[o++], done: !e }
        );
      },
    };
  throw new TypeError(
    t ? "Object is not iterable." : "Symbol.iterator is not defined."
  );
}
function el(e, t) {
  var n = typeof Symbol == "function" && e[Symbol.iterator];
  if (!n) return e;
  var o = n.call(e),
    a,
    u = [],
    l;
  try {
    for (; (t === void 0 || t-- > 0) && !(a = o.next()).done; ) u.push(a.value);
  } catch (c) {
    l = { error: c };
  } finally {
    try {
      a && !a.done && (n = o.return) && n.call(o);
    } finally {
      if (l) throw l.error;
    }
  }
  return u;
}
function tl(e, t, n) {
  if (n || arguments.length === 2)
    for (var o = 0, a = t.length, u; o < a; o++)
      (u || !(o in t)) &&
        (u || (u = Array.prototype.slice.call(t, 0, o)), (u[o] = t[o]));
  return e.concat(u || Array.prototype.slice.call(t));
}
function xa(e) {
  return this instanceof xa ? ((this.v = e), this) : new xa(e);
}
function qE(e, t, n) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var o = n.apply(e, t || []),
    a,
    u = [];
  return (
    (a = {}),
    l("next"),
    l("throw"),
    l("return"),
    (a[Symbol.asyncIterator] = function () {
      return this;
    }),
    a
  );
  function l(h) {
    o[h] &&
      (a[h] = function (g) {
        return new Promise(function (w, x) {
          u.push([h, g, w, x]) > 1 || c(h, g);
        });
      });
  }
  function c(h, g) {
    try {
      f(o[h](g));
    } catch (w) {
      m(u[0][3], w);
    }
  }
  function f(h) {
    h.value instanceof xa
      ? Promise.resolve(h.value.v).then(d, v)
      : m(u[0][2], h);
  }
  function d(h) {
    c("next", h);
  }
  function v(h) {
    c("throw", h);
  }
  function m(h, g) {
    h(g), u.shift(), u.length && c(u[0][0], u[0][1]);
  }
}
function KE(e) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var t = e[Symbol.asyncIterator],
    n;
  return t
    ? t.call(e)
    : ((e = typeof Aa == "function" ? Aa(e) : e[Symbol.iterator]()),
      (n = {}),
      o("next"),
      o("throw"),
      o("return"),
      (n[Symbol.asyncIterator] = function () {
        return this;
      }),
      n);
  function o(u) {
    n[u] =
      e[u] &&
      function (l) {
        return new Promise(function (c, f) {
          (l = e[u](l)), a(c, f, l.done, l.value);
        });
      };
  }
  function a(u, l, c, f) {
    Promise.resolve(f).then(function (d) {
      u({ value: d, done: c });
    }, l);
  }
}
function ht(e) {
  return typeof e == "function";
}
function cg(e) {
  var t = function (o) {
      Error.call(o), (o.stack = new Error().stack);
    },
    n = e(t);
  return (
    (n.prototype = Object.create(Error.prototype)),
    (n.prototype.constructor = n),
    n
  );
}
var Jd = cg(function (e) {
  return function (n) {
    e(this),
      (this.message = n
        ? n.length +
          ` errors occurred during unsubscription:
` +
          n.map(function (o, a) {
            return a + 1 + ") " + o.toString();
          }).join(`
  `)
        : ""),
      (this.name = "UnsubscriptionError"),
      (this.errors = n);
  };
});
function Op(e, t) {
  if (e) {
    var n = e.indexOf(t);
    0 <= n && e.splice(n, 1);
  }
}
var Nc = (function () {
    function e(t) {
      (this.initialTeardown = t),
        (this.closed = !1),
        (this._parentage = null),
        (this._finalizers = null);
    }
    return (
      (e.prototype.unsubscribe = function () {
        var t, n, o, a, u;
        if (!this.closed) {
          this.closed = !0;
          var l = this._parentage;
          if (l)
            if (((this._parentage = null), Array.isArray(l)))
              try {
                for (var c = Aa(l), f = c.next(); !f.done; f = c.next()) {
                  var d = f.value;
                  d.remove(this);
                }
              } catch (x) {
                t = { error: x };
              } finally {
                try {
                  f && !f.done && (n = c.return) && n.call(c);
                } finally {
                  if (t) throw t.error;
                }
              }
            else l.remove(this);
          var v = this.initialTeardown;
          if (ht(v))
            try {
              v();
            } catch (x) {
              u = x instanceof Jd ? x.errors : [x];
            }
          var m = this._finalizers;
          if (m) {
            this._finalizers = null;
            try {
              for (var h = Aa(m), g = h.next(); !g.done; g = h.next()) {
                var w = g.value;
                try {
                  Xb(w);
                } catch (x) {
                  (u = u ?? []),
                    x instanceof Jd
                      ? (u = tl(tl([], el(u)), el(x.errors)))
                      : u.push(x);
                }
              }
            } catch (x) {
              o = { error: x };
            } finally {
              try {
                g && !g.done && (a = h.return) && a.call(h);
              } finally {
                if (o) throw o.error;
              }
            }
          }
          if (u) throw new Jd(u);
        }
      }),
      (e.prototype.add = function (t) {
        var n;
        if (t && t !== this)
          if (this.closed) Xb(t);
          else {
            if (t instanceof e) {
              if (t.closed || t._hasParent(this)) return;
              t._addParent(this);
            }
            (this._finalizers =
              (n = this._finalizers) !== null && n !== void 0 ? n : []).push(t);
          }
      }),
      (e.prototype._hasParent = function (t) {
        var n = this._parentage;
        return n === t || (Array.isArray(n) && n.includes(t));
      }),
      (e.prototype._addParent = function (t) {
        var n = this._parentage;
        this._parentage = Array.isArray(n) ? (n.push(t), n) : n ? [n, t] : t;
      }),
      (e.prototype._removeParent = function (t) {
        var n = this._parentage;
        n === t ? (this._parentage = null) : Array.isArray(n) && Op(n, t);
      }),
      (e.prototype.remove = function (t) {
        var n = this._finalizers;
        n && Op(n, t), t instanceof e && t._removeParent(this);
      }),
      (e.EMPTY = (function () {
        var t = new e();
        return (t.closed = !0), t;
      })()),
      e
    );
  })(),
  fg = Nc.EMPTY;
function dg(e) {
  return (
    e instanceof Nc ||
    (e && "closed" in e && ht(e.remove) && ht(e.add) && ht(e.unsubscribe))
  );
}
function Xb(e) {
  ht(e) ? e() : e.unsubscribe();
}
var pg = {
    onUnhandledError: null,
    onStoppedNotification: null,
    Promise: void 0,
    useDeprecatedSynchronousErrorHandling: !1,
    useDeprecatedNextContext: !1,
  },
  xp = {
    setTimeout: function (e, t) {
      for (var n = [], o = 2; o < arguments.length; o++)
        n[o - 2] = arguments[o];
      var a = xp.delegate;
      return a?.setTimeout
        ? a.setTimeout.apply(a, tl([e, t], el(n)))
        : setTimeout.apply(void 0, tl([e, t], el(n)));
    },
    clearTimeout: function (e) {
      var t = xp.delegate;
      return (t?.clearTimeout || clearTimeout)(e);
    },
    delegate: void 0,
  };
function vg(e) {
  xp.setTimeout(function () {
    throw e;
  });
}
function Qb() {}
function Js(e) {
  e();
}
var Sv = (function (e) {
    vl(t, e);
    function t(n) {
      var o = e.call(this) || this;
      return (
        (o.isStopped = !1),
        n ? ((o.destination = n), dg(n) && n.add(o)) : (o.destination = YE),
        o
      );
    }
    return (
      (t.create = function (n, o, a) {
        return new gc(n, o, a);
      }),
      (t.prototype.next = function (n) {
        this.isStopped || this._next(n);
      }),
      (t.prototype.error = function (n) {
        this.isStopped || ((this.isStopped = !0), this._error(n));
      }),
      (t.prototype.complete = function () {
        this.isStopped || ((this.isStopped = !0), this._complete());
      }),
      (t.prototype.unsubscribe = function () {
        this.closed ||
          ((this.isStopped = !0),
          e.prototype.unsubscribe.call(this),
          (this.destination = null));
      }),
      (t.prototype._next = function (n) {
        this.destination.next(n);
      }),
      (t.prototype._error = function (n) {
        try {
          this.destination.error(n);
        } finally {
          this.unsubscribe();
        }
      }),
      (t.prototype._complete = function () {
        try {
          this.destination.complete();
        } finally {
          this.unsubscribe();
        }
      }),
      t
    );
  })(Nc),
  HE = Function.prototype.bind;
function Gd(e, t) {
  return HE.call(e, t);
}
var XE = (function () {
    function e(t) {
      this.partialObserver = t;
    }
    return (
      (e.prototype.next = function (t) {
        var n = this.partialObserver;
        if (n.next)
          try {
            n.next(t);
          } catch (o) {
            qs(o);
          }
      }),
      (e.prototype.error = function (t) {
        var n = this.partialObserver;
        if (n.error)
          try {
            n.error(t);
          } catch (o) {
            qs(o);
          }
        else qs(t);
      }),
      (e.prototype.complete = function () {
        var t = this.partialObserver;
        if (t.complete)
          try {
            t.complete();
          } catch (n) {
            qs(n);
          }
      }),
      e
    );
  })(),
  gc = (function (e) {
    vl(t, e);
    function t(n, o, a) {
      var u = e.call(this) || this,
        l;
      if (ht(n) || !n)
        l = { next: n ?? void 0, error: o ?? void 0, complete: a ?? void 0 };
      else {
        var c;
        u && pg.useDeprecatedNextContext
          ? ((c = Object.create(n)),
            (c.unsubscribe = function () {
              return u.unsubscribe();
            }),
            (l = {
              next: n.next && Gd(n.next, c),
              error: n.error && Gd(n.error, c),
              complete: n.complete && Gd(n.complete, c),
            }))
          : (l = n);
      }
      return (u.destination = new XE(l)), u;
    }
    return t;
  })(Sv);
function qs(e) {
  vg(e);
}
function QE(e) {
  throw e;
}
var YE = { closed: !0, next: Qb, error: QE, complete: Qb },
  Pv = (function () {
    return (typeof Symbol == "function" && Symbol.observable) || "@@observable";
  })();
function hg(e) {
  return e;
}
function mg() {
  for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
  return bg(e);
}
function bg(e) {
  return e.length === 0
    ? hg
    : e.length === 1
    ? e[0]
    : function (n) {
        return e.reduce(function (o, a) {
          return a(o);
        }, n);
      };
}
var jr = (function () {
  function e(t) {
    t && (this._subscribe = t);
  }
  return (
    (e.prototype.lift = function (t) {
      var n = new e();
      return (n.source = this), (n.operator = t), n;
    }),
    (e.prototype.subscribe = function (t, n, o) {
      var a = this,
        u = GE(t) ? t : new gc(t, n, o);
      return (
        Js(function () {
          var l = a,
            c = l.operator,
            f = l.source;
          u.add(c ? c.call(u, f) : f ? a._subscribe(u) : a._trySubscribe(u));
        }),
        u
      );
    }),
    (e.prototype._trySubscribe = function (t) {
      try {
        return this._subscribe(t);
      } catch (n) {
        t.error(n);
      }
    }),
    (e.prototype.forEach = function (t, n) {
      var o = this;
      return (
        (n = Yb(n)),
        new n(function (a, u) {
          var l = new gc({
            next: function (c) {
              try {
                t(c);
              } catch (f) {
                u(f), l.unsubscribe();
              }
            },
            error: u,
            complete: a,
          });
          o.subscribe(l);
        })
      );
    }),
    (e.prototype._subscribe = function (t) {
      var n;
      return (n = this.source) === null || n === void 0
        ? void 0
        : n.subscribe(t);
    }),
    (e.prototype[Pv] = function () {
      return this;
    }),
    (e.prototype.pipe = function () {
      for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
      return bg(t)(this);
    }),
    (e.prototype.toPromise = function (t) {
      var n = this;
      return (
        (t = Yb(t)),
        new t(function (o, a) {
          var u;
          n.subscribe(
            function (l) {
              return (u = l);
            },
            function (l) {
              return a(l);
            },
            function () {
              return o(u);
            }
          );
        })
      );
    }),
    (e.create = function (t) {
      return new e(t);
    }),
    e
  );
})();
function Yb(e) {
  var t;
  return (t = e ?? pg.Promise) !== null && t !== void 0 ? t : Promise;
}
function JE(e) {
  return e && ht(e.next) && ht(e.error) && ht(e.complete);
}
function GE(e) {
  return (e && e instanceof Sv) || (JE(e) && dg(e));
}
function ZE(e) {
  return ht(e?.lift);
}
function xi(e) {
  return function (t) {
    if (ZE(t))
      return t.lift(function (n) {
        try {
          return e(n, this);
        } catch (o) {
          this.error(o);
        }
      });
    throw new TypeError("Unable to lift unknown Observable type");
  };
}
function Ia(e, t, n, o, a) {
  return new ek(e, t, n, o, a);
}
var ek = (function (e) {
    vl(t, e);
    function t(n, o, a, u, l, c) {
      var f = e.call(this, n) || this;
      return (
        (f.onFinalize = l),
        (f.shouldUnsubscribe = c),
        (f._next = o
          ? function (d) {
              try {
                o(d);
              } catch (v) {
                n.error(v);
              }
            }
          : e.prototype._next),
        (f._error = u
          ? function (d) {
              try {
                u(d);
              } catch (v) {
                n.error(v);
              } finally {
                this.unsubscribe();
              }
            }
          : e.prototype._error),
        (f._complete = a
          ? function () {
              try {
                a();
              } catch (d) {
                n.error(d);
              } finally {
                this.unsubscribe();
              }
            }
          : e.prototype._complete),
        f
      );
    }
    return (
      (t.prototype.unsubscribe = function () {
        var n;
        if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
          var o = this.closed;
          e.prototype.unsubscribe.call(this),
            !o &&
              ((n = this.onFinalize) === null || n === void 0 || n.call(this));
        }
      }),
      t
    );
  })(Sv),
  tk = cg(function (e) {
    return function () {
      e(this),
        (this.name = "ObjectUnsubscribedError"),
        (this.message = "object unsubscribed");
    };
  }),
  yg = (function (e) {
    vl(t, e);
    function t() {
      var n = e.call(this) || this;
      return (
        (n.closed = !1),
        (n.currentObservers = null),
        (n.observers = []),
        (n.isStopped = !1),
        (n.hasError = !1),
        (n.thrownError = null),
        n
      );
    }
    return (
      (t.prototype.lift = function (n) {
        var o = new Jb(this, this);
        return (o.operator = n), o;
      }),
      (t.prototype._throwIfClosed = function () {
        if (this.closed) throw new tk();
      }),
      (t.prototype.next = function (n) {
        var o = this;
        Js(function () {
          var a, u;
          if ((o._throwIfClosed(), !o.isStopped)) {
            o.currentObservers ||
              (o.currentObservers = Array.from(o.observers));
            try {
              for (
                var l = Aa(o.currentObservers), c = l.next();
                !c.done;
                c = l.next()
              ) {
                var f = c.value;
                f.next(n);
              }
            } catch (d) {
              a = { error: d };
            } finally {
              try {
                c && !c.done && (u = l.return) && u.call(l);
              } finally {
                if (a) throw a.error;
              }
            }
          }
        });
      }),
      (t.prototype.error = function (n) {
        var o = this;
        Js(function () {
          if ((o._throwIfClosed(), !o.isStopped)) {
            (o.hasError = o.isStopped = !0), (o.thrownError = n);
            for (var a = o.observers; a.length; ) a.shift().error(n);
          }
        });
      }),
      (t.prototype.complete = function () {
        var n = this;
        Js(function () {
          if ((n._throwIfClosed(), !n.isStopped)) {
            n.isStopped = !0;
            for (var o = n.observers; o.length; ) o.shift().complete();
          }
        });
      }),
      (t.prototype.unsubscribe = function () {
        (this.isStopped = this.closed = !0),
          (this.observers = this.currentObservers = null);
      }),
      Object.defineProperty(t.prototype, "observed", {
        get: function () {
          var n;
          return (
            ((n = this.observers) === null || n === void 0
              ? void 0
              : n.length) > 0
          );
        },
        enumerable: !1,
        configurable: !0,
      }),
      (t.prototype._trySubscribe = function (n) {
        return this._throwIfClosed(), e.prototype._trySubscribe.call(this, n);
      }),
      (t.prototype._subscribe = function (n) {
        return (
          this._throwIfClosed(),
          this._checkFinalizedStatuses(n),
          this._innerSubscribe(n)
        );
      }),
      (t.prototype._innerSubscribe = function (n) {
        var o = this,
          a = this,
          u = a.hasError,
          l = a.isStopped,
          c = a.observers;
        return u || l
          ? fg
          : ((this.currentObservers = null),
            c.push(n),
            new Nc(function () {
              (o.currentObservers = null), Op(c, n);
            }));
      }),
      (t.prototype._checkFinalizedStatuses = function (n) {
        var o = this,
          a = o.hasError,
          u = o.thrownError,
          l = o.isStopped;
        a ? n.error(u) : l && n.complete();
      }),
      (t.prototype.asObservable = function () {
        var n = new jr();
        return (n.source = this), n;
      }),
      (t.create = function (n, o) {
        return new Jb(n, o);
      }),
      t
    );
  })(jr),
  Jb = (function (e) {
    vl(t, e);
    function t(n, o) {
      var a = e.call(this) || this;
      return (a.destination = n), (a.source = o), a;
    }
    return (
      (t.prototype.next = function (n) {
        var o, a;
        (a =
          (o = this.destination) === null || o === void 0 ? void 0 : o.next) ===
          null ||
          a === void 0 ||
          a.call(o, n);
      }),
      (t.prototype.error = function (n) {
        var o, a;
        (a =
          (o = this.destination) === null || o === void 0
            ? void 0
            : o.error) === null ||
          a === void 0 ||
          a.call(o, n);
      }),
      (t.prototype.complete = function () {
        var n, o;
        (o =
          (n = this.destination) === null || n === void 0
            ? void 0
            : n.complete) === null ||
          o === void 0 ||
          o.call(n);
      }),
      (t.prototype._subscribe = function (n) {
        var o, a;
        return (a =
          (o = this.source) === null || o === void 0
            ? void 0
            : o.subscribe(n)) !== null && a !== void 0
          ? a
          : fg;
      }),
      t
    );
  })(yg),
  gg = new jr(function (e) {
    return e.complete();
  });
function rk(e) {
  return e && ht(e.schedule);
}
function wg(e) {
  return e[e.length - 1];
}
function Ev(e) {
  return rk(wg(e)) ? e.pop() : void 0;
}
function nk(e, t) {
  return typeof wg(e) == "number" ? e.pop() : t;
}
var _g = function (e) {
  return e && typeof e.length == "number" && typeof e != "function";
};
function Og(e) {
  return ht(e?.then);
}
function xg(e) {
  return ht(e[Pv]);
}
function Sg(e) {
  return Symbol.asyncIterator && ht(e?.[Symbol.asyncIterator]);
}
function Pg(e) {
  return new TypeError(
    "You provided " +
      (e !== null && typeof e == "object"
        ? "an invalid object"
        : "'" + e + "'") +
      " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable."
  );
}
function ok() {
  return typeof Symbol != "function" || !Symbol.iterator
    ? "@@iterator"
    : Symbol.iterator;
}
var Eg = ok();
function kg(e) {
  return ht(e?.[Eg]);
}
function jg(e) {
  return qE(this, arguments, function () {
    var n, o, a, u;
    return sg(this, function (l) {
      switch (l.label) {
        case 0:
          (n = e.getReader()), (l.label = 1);
        case 1:
          l.trys.push([1, , 9, 10]), (l.label = 2);
        case 2:
          return [4, xa(n.read())];
        case 3:
          return (
            (o = l.sent()),
            (a = o.value),
            (u = o.done),
            u ? [4, xa(void 0)] : [3, 5]
          );
        case 4:
          return [2, l.sent()];
        case 5:
          return [4, xa(a)];
        case 6:
          return [4, l.sent()];
        case 7:
          return l.sent(), [3, 2];
        case 8:
          return [3, 10];
        case 9:
          return n.releaseLock(), [7];
        case 10:
          return [2];
      }
    });
  });
}
function Ag(e) {
  return ht(e?.getReader);
}
function La(e) {
  if (e instanceof jr) return e;
  if (e != null) {
    if (xg(e)) return ik(e);
    if (_g(e)) return ak(e);
    if (Og(e)) return uk(e);
    if (Sg(e)) return Ig(e);
    if (kg(e)) return lk(e);
    if (Ag(e)) return sk(e);
  }
  throw Pg(e);
}
function ik(e) {
  return new jr(function (t) {
    var n = e[Pv]();
    if (ht(n.subscribe)) return n.subscribe(t);
    throw new TypeError(
      "Provided object does not correctly implement Symbol.observable"
    );
  });
}
function ak(e) {
  return new jr(function (t) {
    for (var n = 0; n < e.length && !t.closed; n++) t.next(e[n]);
    t.complete();
  });
}
function uk(e) {
  return new jr(function (t) {
    e.then(
      function (n) {
        t.closed || (t.next(n), t.complete());
      },
      function (n) {
        return t.error(n);
      }
    ).then(null, vg);
  });
}
function lk(e) {
  return new jr(function (t) {
    var n, o;
    try {
      for (var a = Aa(e), u = a.next(); !u.done; u = a.next()) {
        var l = u.value;
        if ((t.next(l), t.closed)) return;
      }
    } catch (c) {
      n = { error: c };
    } finally {
      try {
        u && !u.done && (o = a.return) && o.call(a);
      } finally {
        if (n) throw n.error;
      }
    }
    t.complete();
  });
}
function Ig(e) {
  return new jr(function (t) {
    ck(e, t).catch(function (n) {
      return t.error(n);
    });
  });
}
function sk(e) {
  return Ig(jg(e));
}
function ck(e, t) {
  var n, o, a, u;
  return WE(this, void 0, void 0, function () {
    var l, c;
    return sg(this, function (f) {
      switch (f.label) {
        case 0:
          f.trys.push([0, 5, 6, 11]), (n = KE(e)), (f.label = 1);
        case 1:
          return [4, n.next()];
        case 2:
          if (((o = f.sent()), !!o.done)) return [3, 4];
          if (((l = o.value), t.next(l), t.closed)) return [2];
          f.label = 3;
        case 3:
          return [3, 1];
        case 4:
          return [3, 11];
        case 5:
          return (c = f.sent()), (a = { error: c }), [3, 11];
        case 6:
          return (
            f.trys.push([6, , 9, 10]),
            o && !o.done && (u = n.return) ? [4, u.call(n)] : [3, 8]
          );
        case 7:
          f.sent(), (f.label = 8);
        case 8:
          return [3, 10];
        case 9:
          if (a) throw a.error;
          return [7];
        case 10:
          return [7];
        case 11:
          return t.complete(), [2];
      }
    });
  });
}
function Ao(e, t, n, o, a) {
  o === void 0 && (o = 0), a === void 0 && (a = !1);
  var u = t.schedule(function () {
    n(), a ? e.add(this.schedule(null, o)) : this.unsubscribe();
  }, o);
  if ((e.add(u), !a)) return u;
}
function Tg(e, t) {
  return (
    t === void 0 && (t = 0),
    xi(function (n, o) {
      n.subscribe(
        Ia(
          o,
          function (a) {
            return Ao(
              o,
              e,
              function () {
                return o.next(a);
              },
              t
            );
          },
          function () {
            return Ao(
              o,
              e,
              function () {
                return o.complete();
              },
              t
            );
          },
          function (a) {
            return Ao(
              o,
              e,
              function () {
                return o.error(a);
              },
              t
            );
          }
        )
      );
    })
  );
}
function Mg(e, t) {
  return (
    t === void 0 && (t = 0),
    xi(function (n, o) {
      o.add(
        e.schedule(function () {
          return n.subscribe(o);
        }, t)
      );
    })
  );
}
function fk(e, t) {
  return La(e).pipe(Mg(t), Tg(t));
}
function dk(e, t) {
  return La(e).pipe(Mg(t), Tg(t));
}
function pk(e, t) {
  return new jr(function (n) {
    var o = 0;
    return t.schedule(function () {
      o === e.length
        ? n.complete()
        : (n.next(e[o++]), n.closed || this.schedule());
    });
  });
}
function vk(e, t) {
  return new jr(function (n) {
    var o;
    return (
      Ao(n, t, function () {
        (o = e[Eg]()),
          Ao(
            n,
            t,
            function () {
              var a, u, l;
              try {
                (a = o.next()), (u = a.value), (l = a.done);
              } catch (c) {
                n.error(c);
                return;
              }
              l ? n.complete() : n.next(u);
            },
            0,
            !0
          );
      }),
      function () {
        return ht(o?.return) && o.return();
      }
    );
  });
}
function Ng(e, t) {
  if (!e) throw new Error("Iterable cannot be null");
  return new jr(function (n) {
    Ao(n, t, function () {
      var o = e[Symbol.asyncIterator]();
      Ao(
        n,
        t,
        function () {
          o.next().then(function (a) {
            a.done ? n.complete() : n.next(a.value);
          });
        },
        0,
        !0
      );
    });
  });
}
function hk(e, t) {
  return Ng(jg(e), t);
}
function mk(e, t) {
  if (e != null) {
    if (xg(e)) return fk(e, t);
    if (_g(e)) return pk(e, t);
    if (Og(e)) return dk(e, t);
    if (Sg(e)) return Ng(e, t);
    if (kg(e)) return vk(e, t);
    if (Ag(e)) return hk(e, t);
  }
  throw Pg(e);
}
function hl(e, t) {
  return t ? mk(e, t) : La(e);
}
function bk() {
  for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
  var n = Ev(e);
  return hl(e, n);
}
function kv(e, t) {
  return xi(function (n, o) {
    var a = 0;
    n.subscribe(
      Ia(o, function (u) {
        o.next(e.call(t, u, a++));
      })
    );
  });
}
function yk(e, t, n, o, a, u, l, c) {
  var f = [],
    d = 0,
    v = 0,
    m = !1,
    h = function () {
      m && !f.length && !d && t.complete();
    },
    g = function (x) {
      return d < o ? w(x) : f.push(x);
    },
    w = function (x) {
      u && t.next(x), d++;
      var S = !1;
      La(n(x, v++)).subscribe(
        Ia(
          t,
          function (O) {
            a?.(O), u ? g(O) : t.next(O);
          },
          function () {
            S = !0;
          },
          void 0,
          function () {
            if (S)
              try {
                d--;
                for (
                  var O = function () {
                    var A = f.shift();
                    l
                      ? Ao(t, l, function () {
                          return w(A);
                        })
                      : w(A);
                  };
                  f.length && d < o;

                )
                  O();
                h();
              } catch (A) {
                t.error(A);
              }
          }
        )
      );
    };
  return (
    e.subscribe(
      Ia(t, g, function () {
        (m = !0), h();
      })
    ),
    function () {
      c?.();
    }
  );
}
function wc(e, t, n) {
  return (
    n === void 0 && (n = 1 / 0),
    ht(t)
      ? wc(function (o, a) {
          return kv(function (u, l) {
            return t(o, u, a, l);
          })(La(e(o, a)));
        }, n)
      : (typeof t == "number" && (n = t),
        xi(function (o, a) {
          return yk(o, a, e, n);
        }))
  );
}
function Cg(e) {
  return e === void 0 && (e = 1 / 0), wc(hg, e);
}
function gk() {
  return Cg(1);
}
function wk() {
  for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
  return gk()(hl(e, Ev(e)));
}
function _k() {
  for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
  var n = Ev(e),
    o = nk(e, 1 / 0),
    a = e;
  return a.length ? (a.length === 1 ? La(a[0]) : Cg(o)(hl(a, n))) : gg;
}
function Ok(e, t) {
  return xi(function (n, o) {
    var a = 0;
    n.subscribe(
      Ia(o, function (u) {
        return e.call(t, u, a++) && o.next(u);
      })
    );
  });
}
function xk(e, t) {
  return ht(t) ? wc(e, t, 1) : wc(e, 1);
}
function Sk(e) {
  return e <= 0
    ? function () {
        return gg;
      }
    : xi(function (t, n) {
        var o = 0;
        t.subscribe(
          Ia(n, function (a) {
            ++o <= e && (n.next(a), e <= o && n.complete());
          })
        );
      });
}
function Pk(e) {
  e === void 0 && (e = {});
  var t = e.connector,
    n =
      t === void 0
        ? function () {
            return new yg();
          }
        : t,
    o = e.resetOnError,
    a = o === void 0 ? !0 : o,
    u = e.resetOnComplete,
    l = u === void 0 ? !0 : u,
    c = e.resetOnRefCountZero,
    f = c === void 0 ? !0 : c;
  return function (d) {
    var v = null,
      m = null,
      h = null,
      g = 0,
      w = !1,
      x = !1,
      S = function () {
        m?.unsubscribe(), (m = null);
      },
      O = function () {
        S(), (v = h = null), (w = x = !1);
      },
      A = function () {
        var k = v;
        O(), k?.unsubscribe();
      };
    return xi(function (k, j) {
      g++, !x && !w && S();
      var C = (h = h ?? n());
      j.add(function () {
        g--, g === 0 && !x && !w && (m = Zd(A, f));
      }),
        C.subscribe(j),
        v ||
          ((v = new gc({
            next: function (D) {
              return C.next(D);
            },
            error: function (D) {
              (x = !0), S(), (m = Zd(O, a, D)), C.error(D);
            },
            complete: function () {
              (w = !0), S(), (m = Zd(O, l)), C.complete();
            },
          })),
          hl(k).subscribe(v));
    })(d);
  };
}
function Zd(e, t) {
  for (var n = [], o = 2; o < arguments.length; o++) n[o - 2] = arguments[o];
  return t === !0
    ? (e(), null)
    : t === !1
    ? null
    : t
        .apply(void 0, tl([], el(n)))
        .pipe(Sk(1))
        .subscribe(function () {
          return e();
        });
}
function Ek() {
  return mg(Ok((e) => e != null));
}
function kk(e) {
  if (e < 2) throw new Error("Minimum size is 2");
  if (e > 64) throw new Error("Maximum size is 64");
  let t = 2 ** (e - 1) - 1,
    n = -t - 1;
  return (o) => {
    if (((o = o << 0), o > t || o < n))
      throw (
        (console.log("value", o, t, n, o > t, o < n),
        new Error(`Int${e} overflow`))
      );
    return o < 0 ? 2 ** e + o : o;
  };
}
kk(32);
/**
 * UUID.core.js - UUID.js for Minimalists
 *
 * @file
 * @author  LiosK
 * @version v4.2.0
 * @license Apache License 2.0: Copyright (c) 2010-2018 LiosK
 * @url https://github.com/LiosK/UUID.js/blob/master/src/uuid.core.js
 */ var M = ((e) => (
    (e[(e.Boolean = 0)] = "Boolean"),
    (e[(e.Number = 1)] = "Number"),
    (e[(e.OptionalNumber = 2)] = "OptionalNumber"),
    (e[(e.BigInt = 3)] = "BigInt"),
    (e[(e.OptionalBigInt = 4)] = "OptionalBigInt"),
    (e[(e.String = 5)] = "String"),
    (e[(e.OptionalString = 6)] = "OptionalString"),
    (e[(e.NumberArray = 7)] = "NumberArray"),
    (e[(e.OptionalNumberArray = 8)] = "OptionalNumberArray"),
    (e[(e.BigIntArray = 9)] = "BigIntArray"),
    (e[(e.OptionalBigIntArray = 10)] = "OptionalBigIntArray"),
    (e[(e.StringArray = 11)] = "StringArray"),
    (e[(e.OptionalStringArray = 12)] = "OptionalStringArray"),
    (e[(e.Entity = 13)] = "Entity"),
    (e[(e.OptionalEntity = 14)] = "OptionalEntity"),
    (e[(e.EntityArray = 15)] = "EntityArray"),
    (e[(e.OptionalEntityArray = 16)] = "OptionalEntityArray"),
    (e[(e.T = 17)] = "T"),
    (e[(e.OptionalT = 18)] = "OptionalT"),
    e
  ))(M || {}),
  jk = ((e) => (
    (e[(e.Enter = 0)] = "Enter"),
    (e[(e.Exit = 1)] = "Exit"),
    (e[(e.Update = 2)] = "Update"),
    (e[(e.Noop = 3)] = "Noop"),
    e
  ))(jk || {}),
  Ak = [14, 16, 2, 8, 4, 10, 6, 12, 18];
function Ik(e, t) {
  let n = To(t, e);
  return {
    entity: e,
    component: t,
    value: [n, void 0],
    type: n == null ? 3 : 0,
  };
}
function Tk(e) {
  return mg(kv((t) => Ik(t, e)));
}
function Mk(e) {
  return "getEntitiesWithValue" in e;
}
function Nk(e, t) {
  return Object.keys(e.schema).every((n) => n in t);
}
function Ck(e) {
  return (
    e.metadata?.componentName ??
    e.metadata?.tableName ??
    e.metadata?.tableId ??
    e.metadata?.contractId ??
    e.id
  );
}
function Gb(e, t) {
  let n = Bg(t);
  return Object.values(e.values)[0].has(n);
}
function To(e, t) {
  let n = {},
    o = Bg(t),
    a = Object.keys(e.schema);
  for (let u of a) {
    let l = e.values[u].get(o);
    if (l === void 0 && !Ak.includes(e.schema[u])) return;
    n[u] = l;
  }
  return n;
}
function zg(e, t) {
  let n = To(e, t);
  if (!n) throw new Error(`No value for component ${Ck(e)} on entity ${t}`);
  return n;
}
function Sp(e, t) {
  if (!e && !t) return !0;
  if (!e || !t) return !1;
  let n = !0;
  for (let o of Object.keys(e)) if (((n = e[o] === t[o]), !n)) return !1;
  return n;
}
function Rg(e, t) {
  if (Mk(e) && Nk(e, t)) return e.getEntitiesWithValue(t);
  let n = new Set();
  for (let o of Lg(e)) {
    let a = To(e, o);
    Sp(t, a) && n.add(o);
  }
  return n;
}
function Lg(e) {
  return e.entities();
}
function Bg(e) {
  return Symbol.for(e);
}
var zk = ((e) => (
  (e[(e.Has = 0)] = "Has"),
  (e[(e.HasValue = 1)] = "HasValue"),
  (e[(e.Not = 2)] = "Not"),
  (e[(e.NotValue = 3)] = "NotValue"),
  (e[(e.ProxyRead = 4)] = "ProxyRead"),
  (e[(e.ProxyExpand = 5)] = "ProxyExpand"),
  e
))(zk || {});
function Dg(e) {
  return { type: 0, component: e };
}
function rl(e, t) {
  if (t.type === 0) return Gb(t.component, e);
  if (t.type === 1) return Sp(t.value, To(t.component, e));
  if (t.type === 2) return !Gb(t.component, e);
  if (t.type === 3) return !Sp(t.value, To(t.component, e));
  throw new Error("Unknown query fragment");
}
function Rk(e) {
  return e.type === 0 || e.type == 1;
}
function Ug(e) {
  return e.type === 2 || e.type == 3;
}
function Lk(e) {
  return e.type === 5 || e.type == 4;
}
function Fg(e, t) {
  return (e && Rk(t)) || (!e && Ug(t));
}
function Zb(e, t, n) {
  let o = e,
    a = !1;
  for (let u = 0; u < n.depth; u++) {
    let l = To(n.component, o);
    if (!l) return null;
    let c = l.value;
    if (!c) return null;
    if (((o = c), (a = rl(o, t)), Fg(a, t))) return a;
  }
  return a;
}
function Pp(e, t, n) {
  if (n === 0) return new Set();
  let o = Rg(t, { value: e });
  if (n === 1) return o;
  let a = [...o].map((u) => [...Pp(u, t, n - 1)]).flat();
  return new Set([...o, ...a]);
}
function ey(e, t) {
  let n = t ? new Set([...t]) : void 0,
    o,
    a;
  for (let u = 0; u < e.length; u++) {
    let l = e[u];
    if (Lk(l)) l.type === 4 && (o = l), l.type === 5 && (a = l);
    else if (n)
      for (let c of [...n]) {
        let f = rl(c, l);
        if (
          (o && o.depth > 0 && !Fg(f, l) && (f = Zb(c, l, o) ?? f),
          f || n.delete(c),
          a && a.depth > 0)
        ) {
          let d = Pp(c, a.component, a.depth);
          for (let v of d)
            (rl(v, l) || (o && o.depth > 0 && Zb(v, l, o))) && n.add(v);
        }
      }
    else {
      if (Ug(l))
        throw new Error("First EntityQueryFragment must be Has or HasValue");
      if (
        ((n =
          l.type === 0
            ? new Set([...Lg(l.component)])
            : Rg(l.component, l.value)),
        a && a.depth > 0)
      )
        for (let c of [...n])
          for (let f of Pp(c, a.component, a.depth)) n.add(f);
    }
  }
  return n ?? new Set();
}
function Bk(e, t) {
  let n = t?.runOnInit || t?.initialSet ? ey(e, t.initialSet) : new Set(),
    o = At(n),
    a = hl(o).pipe(Tk(e[0].component)),
    u = e.findIndex((c) => [5, 4].includes(c.type)) !== -1,
    l = _k(...e.map((c) => c.component.update$)).pipe(
      u
        ? xk((c) => {
            let f = ey(e, t?.initialSet),
              d = [];
            for (let v of o)
              f.has(v) ||
                (o.delete(v),
                d.push({
                  entity: v,
                  type: 1,
                  component: c.component,
                  value: [void 0, void 0],
                }));
            for (let v of f)
              o.has(v)
                ? d.push({
                    entity: v,
                    type: 2,
                    component: c.component,
                    value: [To(c.component, v), void 0],
                  })
                : (o.add(v),
                  d.push({
                    entity: v,
                    type: 0,
                    component: c.component,
                    value: [To(c.component, v), void 0],
                  }));
            return bk(...d);
          })
        : kv((c) => {
            if (o.has(c.entity))
              return e
                .filter((f) => f.component.id === c.component.id)
                .every((f) => rl(c.entity, f))
                ? { ...c, type: 2 }
                : (o.delete(c.entity), { ...c, type: 1 });
            if (e.every((f) => rl(c.entity, f)))
              return o.add(c.entity), { ...c, type: 0 };
          }),
      Ek()
    );
  return { matching: o, update$: wk(a, l).pipe(Pk()) };
}
function $g(e) {
  const t = Object.create(null);
  for (const n in e) {
    const o = e[n];
    t[o] = n;
  }
  return t;
}
const Vg = {
  PARSE_ERROR: -32700,
  BAD_REQUEST: -32600,
  INTERNAL_SERVER_ERROR: -32603,
  UNAUTHORIZED: -32001,
  FORBIDDEN: -32003,
  NOT_FOUND: -32004,
  METHOD_NOT_SUPPORTED: -32005,
  TIMEOUT: -32008,
  CONFLICT: -32009,
  PRECONDITION_FAILED: -32012,
  PAYLOAD_TOO_LARGE: -32013,
  UNPROCESSABLE_CONTENT: -32022,
  TOO_MANY_REQUESTS: -32029,
  CLIENT_CLOSED_REQUEST: -32099,
};
$g(Vg);
$g(Vg);
typeof window > "u" ||
  "Deno" in window ||
  globalThis.process?.env?.NODE_ENV === "test" ||
  globalThis.process?.env?.JEST_WORKER_ID ||
  globalThis.process?.env?.VITEST_WORKER_ID;
var Dk = (function () {
    function e() {
      (this.keyToValue = new Map()), (this.valueToKey = new Map());
    }
    return (
      (e.prototype.set = function (t, n) {
        this.keyToValue.set(t, n), this.valueToKey.set(n, t);
      }),
      (e.prototype.getByKey = function (t) {
        return this.keyToValue.get(t);
      }),
      (e.prototype.getByValue = function (t) {
        return this.valueToKey.get(t);
      }),
      (e.prototype.clear = function () {
        this.keyToValue.clear(), this.valueToKey.clear();
      }),
      e
    );
  })(),
  Wg = (function () {
    function e(t) {
      (this.generateIdentifier = t), (this.kv = new Dk());
    }
    return (
      (e.prototype.register = function (t, n) {
        this.kv.getByValue(t) ||
          (n || (n = this.generateIdentifier(t)), this.kv.set(n, t));
      }),
      (e.prototype.clear = function () {
        this.kv.clear();
      }),
      (e.prototype.getIdentifier = function (t) {
        return this.kv.getByValue(t);
      }),
      (e.prototype.getValue = function (t) {
        return this.kv.getByKey(t);
      }),
      e
    );
  })(),
  Uk =
    (globalThis && globalThis.__extends) ||
    (function () {
      var e = function (t, n) {
        return (
          (e =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (o, a) {
                o.__proto__ = a;
              }) ||
            function (o, a) {
              for (var u in a)
                Object.prototype.hasOwnProperty.call(a, u) && (o[u] = a[u]);
            }),
          e(t, n)
        );
      };
      return function (t, n) {
        if (typeof n != "function" && n !== null)
          throw new TypeError(
            "Class extends value " + String(n) + " is not a constructor or null"
          );
        e(t, n);
        function o() {
          this.constructor = t;
        }
        t.prototype =
          n === null
            ? Object.create(n)
            : ((o.prototype = n.prototype), new o());
      };
    })(),
  Fk = (function (e) {
    Uk(t, e);
    function t() {
      var n =
        e.call(this, function (o) {
          return o.name;
        }) || this;
      return (n.classToAllowedProps = new Map()), n;
    }
    return (
      (t.prototype.register = function (n, o) {
        typeof o == "object"
          ? (o.allowProps && this.classToAllowedProps.set(n, o.allowProps),
            e.prototype.register.call(this, n, o.identifier))
          : e.prototype.register.call(this, n, o);
      }),
      (t.prototype.getAllowedProps = function (n) {
        return this.classToAllowedProps.get(n);
      }),
      t
    );
  })(Wg),
  $k =
    (globalThis && globalThis.__read) ||
    function (e, t) {
      var n = typeof Symbol == "function" && e[Symbol.iterator];
      if (!n) return e;
      var o = n.call(e),
        a,
        u = [],
        l;
      try {
        for (; (t === void 0 || t-- > 0) && !(a = o.next()).done; )
          u.push(a.value);
      } catch (c) {
        l = { error: c };
      } finally {
        try {
          a && !a.done && (n = o.return) && n.call(o);
        } finally {
          if (l) throw l.error;
        }
      }
      return u;
    };
function Vk(e) {
  if ("values" in Object) return Object.values(e);
  var t = [];
  for (var n in e) e.hasOwnProperty(n) && t.push(e[n]);
  return t;
}
function Wk(e, t) {
  var n = Vk(e);
  if ("find" in n) return n.find(t);
  for (var o = n, a = 0; a < o.length; a++) {
    var u = o[a];
    if (t(u)) return u;
  }
}
function Ta(e, t) {
  Object.entries(e).forEach(function (n) {
    var o = $k(n, 2),
      a = o[0],
      u = o[1];
    return t(u, a);
  });
}
function Gs(e, t) {
  return e.indexOf(t) !== -1;
}
function ty(e, t) {
  for (var n = 0; n < e.length; n++) {
    var o = e[n];
    if (t(o)) return o;
  }
}
var qk = (function () {
    function e() {
      this.transfomers = {};
    }
    return (
      (e.prototype.register = function (t) {
        this.transfomers[t.name] = t;
      }),
      (e.prototype.findApplicable = function (t) {
        return Wk(this.transfomers, function (n) {
          return n.isApplicable(t);
        });
      }),
      (e.prototype.findByName = function (t) {
        return this.transfomers[t];
      }),
      e
    );
  })(),
  Kk = function (e) {
    return Object.prototype.toString.call(e).slice(8, -1);
  },
  qg = function (e) {
    return typeof e > "u";
  },
  Hk = function (e) {
    return e === null;
  },
  nl = function (e) {
    return typeof e != "object" || e === null || e === Object.prototype
      ? !1
      : Object.getPrototypeOf(e) === null
      ? !0
      : Object.getPrototypeOf(e) === Object.prototype;
  },
  Ep = function (e) {
    return nl(e) && Object.keys(e).length === 0;
  },
  Mo = function (e) {
    return Array.isArray(e);
  },
  Xk = function (e) {
    return typeof e == "string";
  },
  Qk = function (e) {
    return typeof e == "number" && !isNaN(e);
  },
  Yk = function (e) {
    return typeof e == "boolean";
  },
  Jk = function (e) {
    return e instanceof RegExp;
  },
  ol = function (e) {
    return e instanceof Map;
  },
  il = function (e) {
    return e instanceof Set;
  },
  Kg = function (e) {
    return Kk(e) === "Symbol";
  },
  Gk = function (e) {
    return e instanceof Date && !isNaN(e.valueOf());
  },
  Zk = function (e) {
    return e instanceof Error;
  },
  ry = function (e) {
    return typeof e == "number" && isNaN(e);
  },
  e2 = function (e) {
    return Yk(e) || Hk(e) || qg(e) || Qk(e) || Xk(e) || Kg(e);
  },
  t2 = function (e) {
    return typeof e == "bigint";
  },
  r2 = function (e) {
    return e === 1 / 0 || e === -1 / 0;
  },
  n2 = function (e) {
    return ArrayBuffer.isView(e) && !(e instanceof DataView);
  },
  o2 = function (e) {
    return e instanceof URL;
  },
  Hg = function (e) {
    return e.replace(/\./g, "\\.");
  },
  ep = function (e) {
    return e.map(String).map(Hg).join(".");
  },
  Vu = function (e) {
    for (var t = [], n = "", o = 0; o < e.length; o++) {
      var a = e.charAt(o),
        u = a === "\\" && e.charAt(o + 1) === ".";
      if (u) {
        (n += "."), o++;
        continue;
      }
      var l = a === ".";
      if (l) {
        t.push(n), (n = "");
        continue;
      }
      n += a;
    }
    var c = n;
    return t.push(c), t;
  },
  kp =
    (globalThis && globalThis.__assign) ||
    function () {
      return (
        (kp =
          Object.assign ||
          function (e) {
            for (var t, n = 1, o = arguments.length; n < o; n++) {
              t = arguments[n];
              for (var a in t)
                Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
            }
            return e;
          }),
        kp.apply(this, arguments)
      );
    },
  jp =
    (globalThis && globalThis.__read) ||
    function (e, t) {
      var n = typeof Symbol == "function" && e[Symbol.iterator];
      if (!n) return e;
      var o = n.call(e),
        a,
        u = [],
        l;
      try {
        for (; (t === void 0 || t-- > 0) && !(a = o.next()).done; )
          u.push(a.value);
      } catch (c) {
        l = { error: c };
      } finally {
        try {
          a && !a.done && (n = o.return) && n.call(o);
        } finally {
          if (l) throw l.error;
        }
      }
      return u;
    },
  Ap =
    (globalThis && globalThis.__spreadArray) ||
    function (e, t) {
      for (var n = 0, o = t.length, a = e.length; n < o; n++, a++) e[a] = t[n];
      return e;
    };
function cn(e, t, n, o) {
  return { isApplicable: e, annotation: t, transform: n, untransform: o };
}
var Xg = [
  cn(
    qg,
    "undefined",
    function () {
      return null;
    },
    function () {}
  ),
  cn(
    t2,
    "bigint",
    function (e) {
      return e.toString();
    },
    function (e) {
      return typeof BigInt < "u"
        ? BigInt(e)
        : (console.error("Please add a BigInt polyfill."), e);
    }
  ),
  cn(
    Gk,
    "Date",
    function (e) {
      return e.toISOString();
    },
    function (e) {
      return new Date(e);
    }
  ),
  cn(
    Zk,
    "Error",
    function (e, t) {
      var n = { name: e.name, message: e.message };
      return (
        t.allowedErrorProps.forEach(function (o) {
          n[o] = e[o];
        }),
        n
      );
    },
    function (e, t) {
      var n = new Error(e.message);
      return (
        (n.name = e.name),
        (n.stack = e.stack),
        t.allowedErrorProps.forEach(function (o) {
          n[o] = e[o];
        }),
        n
      );
    }
  ),
  cn(
    Jk,
    "regexp",
    function (e) {
      return "" + e;
    },
    function (e) {
      var t = e.slice(1, e.lastIndexOf("/")),
        n = e.slice(e.lastIndexOf("/") + 1);
      return new RegExp(t, n);
    }
  ),
  cn(
    il,
    "set",
    function (e) {
      return Ap([], jp(e.values()));
    },
    function (e) {
      return new Set(e);
    }
  ),
  cn(
    ol,
    "map",
    function (e) {
      return Ap([], jp(e.entries()));
    },
    function (e) {
      return new Map(e);
    }
  ),
  cn(
    function (e) {
      return ry(e) || r2(e);
    },
    "number",
    function (e) {
      return ry(e) ? "NaN" : e > 0 ? "Infinity" : "-Infinity";
    },
    Number
  ),
  cn(
    function (e) {
      return e === 0 && 1 / e === -1 / 0;
    },
    "number",
    function () {
      return "-0";
    },
    Number
  ),
  cn(
    o2,
    "URL",
    function (e) {
      return e.toString();
    },
    function (e) {
      return new URL(e);
    }
  ),
];
function Cc(e, t, n, o) {
  return { isApplicable: e, annotation: t, transform: n, untransform: o };
}
var Qg = Cc(
    function (e, t) {
      if (Kg(e)) {
        var n = !!t.symbolRegistry.getIdentifier(e);
        return n;
      }
      return !1;
    },
    function (e, t) {
      var n = t.symbolRegistry.getIdentifier(e);
      return ["symbol", n];
    },
    function (e) {
      return e.description;
    },
    function (e, t, n) {
      var o = n.symbolRegistry.getValue(t[1]);
      if (!o) throw new Error("Trying to deserialize unknown symbol");
      return o;
    }
  ),
  i2 = [
    Int8Array,
    Uint8Array,
    Int16Array,
    Uint16Array,
    Int32Array,
    Uint32Array,
    Float32Array,
    Float64Array,
    Uint8ClampedArray,
  ].reduce(function (e, t) {
    return (e[t.name] = t), e;
  }, {}),
  Yg = Cc(
    n2,
    function (e) {
      return ["typed-array", e.constructor.name];
    },
    function (e) {
      return Ap([], jp(e));
    },
    function (e, t) {
      var n = i2[t[1]];
      if (!n) throw new Error("Trying to deserialize unknown typed array");
      return new n(e);
    }
  );
function Jg(e, t) {
  if (e?.constructor) {
    var n = !!t.classRegistry.getIdentifier(e.constructor);
    return n;
  }
  return !1;
}
var Gg = Cc(
    Jg,
    function (e, t) {
      var n = t.classRegistry.getIdentifier(e.constructor);
      return ["class", n];
    },
    function (e, t) {
      var n = t.classRegistry.getAllowedProps(e.constructor);
      if (!n) return kp({}, e);
      var o = {};
      return (
        n.forEach(function (a) {
          o[a] = e[a];
        }),
        o
      );
    },
    function (e, t, n) {
      var o = n.classRegistry.getValue(t[1]);
      if (!o)
        throw new Error(
          "Trying to deserialize unknown class - check https://github.com/blitz-js/superjson/issues/116#issuecomment-773996564"
        );
      return Object.assign(Object.create(o.prototype), e);
    }
  ),
  Zg = Cc(
    function (e, t) {
      return !!t.customTransformerRegistry.findApplicable(e);
    },
    function (e, t) {
      var n = t.customTransformerRegistry.findApplicable(e);
      return ["custom", n.name];
    },
    function (e, t) {
      var n = t.customTransformerRegistry.findApplicable(e);
      return n.serialize(e);
    },
    function (e, t, n) {
      var o = n.customTransformerRegistry.findByName(t[1]);
      if (!o) throw new Error("Trying to deserialize unknown custom value");
      return o.deserialize(e);
    }
  ),
  a2 = [Gg, Qg, Zg, Yg],
  ny = function (e, t) {
    var n = ty(a2, function (a) {
      return a.isApplicable(e, t);
    });
    if (n) return { value: n.transform(e, t), type: n.annotation(e, t) };
    var o = ty(Xg, function (a) {
      return a.isApplicable(e, t);
    });
    if (o) return { value: o.transform(e, t), type: o.annotation };
  },
  ew = {};
Xg.forEach(function (e) {
  ew[e.annotation] = e;
});
var u2 = function (e, t, n) {
    if (Mo(t))
      switch (t[0]) {
        case "symbol":
          return Qg.untransform(e, t, n);
        case "class":
          return Gg.untransform(e, t, n);
        case "custom":
          return Zg.untransform(e, t, n);
        case "typed-array":
          return Yg.untransform(e, t, n);
        default:
          throw new Error("Unknown transformation: " + t);
      }
    else {
      var o = ew[t];
      if (!o) throw new Error("Unknown transformation: " + t);
      return o.untransform(e, n);
    }
  },
  ya = function (e, t) {
    for (var n = e.keys(); t > 0; ) n.next(), t--;
    return n.next().value;
  };
function tw(e) {
  if (Gs(e, "__proto__"))
    throw new Error("__proto__ is not allowed as a property");
  if (Gs(e, "prototype"))
    throw new Error("prototype is not allowed as a property");
  if (Gs(e, "constructor"))
    throw new Error("constructor is not allowed as a property");
}
var l2 = function (e, t) {
    tw(t);
    for (var n = 0; n < t.length; n++) {
      var o = t[n];
      if (il(e)) e = ya(e, +o);
      else if (ol(e)) {
        var a = +o,
          u = +t[++n] == 0 ? "key" : "value",
          l = ya(e, a);
        switch (u) {
          case "key":
            e = l;
            break;
          case "value":
            e = e.get(l);
            break;
        }
      } else e = e[o];
    }
    return e;
  },
  Ip = function (e, t, n) {
    if ((tw(t), t.length === 0)) return n(e);
    for (var o = e, a = 0; a < t.length - 1; a++) {
      var u = t[a];
      if (Mo(o)) {
        var l = +u;
        o = o[l];
      } else if (nl(o)) o = o[u];
      else if (il(o)) {
        var c = +u;
        o = ya(o, c);
      } else if (ol(o)) {
        var f = a === t.length - 2;
        if (f) break;
        var c = +u,
          d = +t[++a] == 0 ? "key" : "value",
          v = ya(o, c);
        switch (d) {
          case "key":
            o = v;
            break;
          case "value":
            o = o.get(v);
            break;
        }
      }
    }
    var m = t[t.length - 1];
    if ((Mo(o) ? (o[+m] = n(o[+m])) : nl(o) && (o[m] = n(o[m])), il(o))) {
      var h = ya(o, +m),
        g = n(h);
      h !== g && (o.delete(h), o.add(g));
    }
    if (ol(o)) {
      var c = +t[t.length - 2],
        w = ya(o, c),
        d = +m == 0 ? "key" : "value";
      switch (d) {
        case "key": {
          var x = n(w);
          o.set(x, o.get(w)), x !== w && o.delete(w);
          break;
        }
        case "value": {
          o.set(w, n(o.get(w)));
          break;
        }
      }
    }
    return e;
  },
  Vn =
    (globalThis && globalThis.__read) ||
    function (e, t) {
      var n = typeof Symbol == "function" && e[Symbol.iterator];
      if (!n) return e;
      var o = n.call(e),
        a,
        u = [],
        l;
      try {
        for (; (t === void 0 || t-- > 0) && !(a = o.next()).done; )
          u.push(a.value);
      } catch (c) {
        l = { error: c };
      } finally {
        try {
          a && !a.done && (n = o.return) && n.call(o);
        } finally {
          if (l) throw l.error;
        }
      }
      return u;
    },
  Eo =
    (globalThis && globalThis.__spreadArray) ||
    function (e, t) {
      for (var n = 0, o = t.length, a = e.length; n < o; n++, a++) e[a] = t[n];
      return e;
    };
function Tp(e, t, n) {
  if ((n === void 0 && (n = []), !!e)) {
    if (!Mo(e)) {
      Ta(e, function (l, c) {
        return Tp(l, t, Eo(Eo([], Vn(n)), Vn(Vu(c))));
      });
      return;
    }
    var o = Vn(e, 2),
      a = o[0],
      u = o[1];
    u &&
      Ta(u, function (l, c) {
        Tp(l, t, Eo(Eo([], Vn(n)), Vn(Vu(c))));
      }),
      t(a, n);
  }
}
function s2(e, t, n) {
  return (
    Tp(t, function (o, a) {
      e = Ip(e, a, function (u) {
        return u2(u, o, n);
      });
    }),
    e
  );
}
function c2(e, t) {
  function n(l, c) {
    var f = l2(e, Vu(c));
    l.map(Vu).forEach(function (d) {
      e = Ip(e, d, function () {
        return f;
      });
    });
  }
  if (Mo(t)) {
    var o = Vn(t, 2),
      a = o[0],
      u = o[1];
    a.forEach(function (l) {
      e = Ip(e, Vu(l), function () {
        return e;
      });
    }),
      u && Ta(u, n);
  } else Ta(t, n);
  return e;
}
var f2 = function (e, t) {
  return nl(e) || Mo(e) || ol(e) || il(e) || Jg(e, t);
};
function d2(e, t, n) {
  var o = n.get(e);
  o ? o.push(t) : n.set(e, [t]);
}
function p2(e, t) {
  var n = {},
    o = void 0;
  return (
    e.forEach(function (a) {
      if (!(a.length <= 1)) {
        t ||
          (a = a
            .map(function (f) {
              return f.map(String);
            })
            .sort(function (f, d) {
              return f.length - d.length;
            }));
        var u = Vn(a),
          l = u[0],
          c = u.slice(1);
        l.length === 0 ? (o = c.map(ep)) : (n[ep(l)] = c.map(ep));
      }
    }),
    o ? (Ep(n) ? [o] : [o, n]) : Ep(n) ? void 0 : n
  );
}
var rw = function (e, t, n, o, a, u, l) {
  var c;
  a === void 0 && (a = []),
    u === void 0 && (u = []),
    l === void 0 && (l = new Map());
  var f = e2(e);
  if (!f) {
    d2(e, a, t);
    var d = l.get(e);
    if (d) return o ? { transformedValue: null } : d;
  }
  if (!f2(e, n)) {
    var v = ny(e, n),
      m = v
        ? { transformedValue: v.value, annotations: [v.type] }
        : { transformedValue: e };
    return f || l.set(e, m), m;
  }
  if (Gs(u, e)) return { transformedValue: null };
  var h = ny(e, n),
    g = (c = h?.value) !== null && c !== void 0 ? c : e,
    w = Mo(g) ? [] : {},
    x = {};
  Ta(g, function (O, A) {
    var k = rw(O, t, n, o, Eo(Eo([], Vn(a)), [A]), Eo(Eo([], Vn(u)), [e]), l);
    (w[A] = k.transformedValue),
      Mo(k.annotations)
        ? (x[A] = k.annotations)
        : nl(k.annotations) &&
          Ta(k.annotations, function (j, C) {
            x[Hg(A) + "." + C] = j;
          });
  });
  var S = Ep(x)
    ? { transformedValue: w, annotations: h ? [h.type] : void 0 }
    : { transformedValue: w, annotations: h ? [h.type, x] : x };
  return f || l.set(e, S), S;
};
function nw(e) {
  return Object.prototype.toString.call(e).slice(8, -1);
}
function oy(e) {
  return nw(e) === "Array";
}
function v2(e) {
  if (nw(e) !== "Object") return !1;
  const t = Object.getPrototypeOf(e);
  return !!t && t.constructor === Object && t === Object.prototype;
}
function h2(e, t, n, o, a) {
  const u = {}.propertyIsEnumerable.call(o, t) ? "enumerable" : "nonenumerable";
  u === "enumerable" && (e[t] = n),
    a &&
      u === "nonenumerable" &&
      Object.defineProperty(e, t, {
        value: n,
        enumerable: !1,
        writable: !0,
        configurable: !0,
      });
}
function Mp(e, t = {}) {
  if (oy(e)) return e.map((a) => Mp(a, t));
  if (!v2(e)) return e;
  const n = Object.getOwnPropertyNames(e),
    o = Object.getOwnPropertySymbols(e);
  return [...n, ...o].reduce((a, u) => {
    if (oy(t.props) && !t.props.includes(u)) return a;
    const l = e[u],
      c = Mp(l, t);
    return h2(a, u, c, e, t.nonenumerable), a;
  }, {});
}
var li =
    (globalThis && globalThis.__assign) ||
    function () {
      return (
        (li =
          Object.assign ||
          function (e) {
            for (var t, n = 1, o = arguments.length; n < o; n++) {
              t = arguments[n];
              for (var a in t)
                Object.prototype.hasOwnProperty.call(t, a) && (e[a] = t[a]);
            }
            return e;
          }),
        li.apply(this, arguments)
      );
    },
  m2 =
    (globalThis && globalThis.__read) ||
    function (e, t) {
      var n = typeof Symbol == "function" && e[Symbol.iterator];
      if (!n) return e;
      var o = n.call(e),
        a,
        u = [],
        l;
      try {
        for (; (t === void 0 || t-- > 0) && !(a = o.next()).done; )
          u.push(a.value);
      } catch (c) {
        l = { error: c };
      } finally {
        try {
          a && !a.done && (n = o.return) && n.call(o);
        } finally {
          if (l) throw l.error;
        }
      }
      return u;
    },
  b2 =
    (globalThis && globalThis.__spreadArray) ||
    function (e, t) {
      for (var n = 0, o = t.length, a = e.length; n < o; n++, a++) e[a] = t[n];
      return e;
    };
(function () {
  function e(t) {
    var n = t === void 0 ? {} : t,
      o = n.dedupe,
      a = o === void 0 ? !1 : o;
    (this.classRegistry = new Fk()),
      (this.symbolRegistry = new Wg(function (u) {
        var l;
        return (l = u.description) !== null && l !== void 0 ? l : "";
      })),
      (this.customTransformerRegistry = new qk()),
      (this.allowedErrorProps = []),
      (this.dedupe = a);
  }
  return (
    (e.prototype.serialize = function (t) {
      var n = new Map(),
        o = rw(t, n, this, this.dedupe),
        a = { json: o.transformedValue };
      o.annotations && (a.meta = li(li({}, a.meta), { values: o.annotations }));
      var u = p2(n, this.dedupe);
      return (
        u && (a.meta = li(li({}, a.meta), { referentialEqualities: u })), a
      );
    }),
    (e.prototype.deserialize = function (t) {
      var n = t.json,
        o = t.meta,
        a = Mp(n);
      return (
        o?.values && (a = s2(a, o.values, this)),
        o?.referentialEqualities && (a = c2(a, o.referentialEqualities)),
        a
      );
    }),
    (e.prototype.stringify = function (t) {
      return JSON.stringify(this.serialize(t));
    }),
    (e.prototype.parse = function (t) {
      return this.deserialize(JSON.parse(t));
    }),
    (e.prototype.registerClass = function (t, n) {
      this.classRegistry.register(t, n);
    }),
    (e.prototype.registerSymbol = function (t, n) {
      this.symbolRegistry.register(t, n);
    }),
    (e.prototype.registerCustom = function (t, n) {
      this.customTransformerRegistry.register(li({ name: n }, t));
    }),
    (e.prototype.allowErrorProps = function () {
      for (var t, n = [], o = 0; o < arguments.length; o++) n[o] = arguments[o];
      (t = this.allowedErrorProps).push.apply(t, b2([], m2(n)));
    }),
    (e.defaultInstance = new e()),
    (e.serialize = e.defaultInstance.serialize.bind(e.defaultInstance)),
    (e.deserialize = e.defaultInstance.deserialize.bind(e.defaultInstance)),
    (e.stringify = e.defaultInstance.stringify.bind(e.defaultInstance)),
    (e.parse = e.defaultInstance.parse.bind(e.defaultInstance)),
    (e.registerClass = e.defaultInstance.registerClass.bind(e.defaultInstance)),
    (e.registerSymbol = e.defaultInstance.registerSymbol.bind(
      e.defaultInstance
    )),
    (e.registerCustom = e.defaultInstance.registerCustom.bind(
      e.defaultInstance
    )),
    (e.allowErrorProps = e.defaultInstance.allowErrorProps.bind(
      e.defaultInstance
    )),
    e
  );
})();
var y2 =
    "event Store_SetRecord(bytes32 indexed tableId, bytes32[] keyTuple, bytes staticData, bytes32 encodedLengths, bytes dynamicData)",
  g2 =
    "event Store_SpliceStaticData(bytes32 indexed tableId, bytes32[] keyTuple, uint48 start, bytes data)",
  w2 =
    "event Store_SpliceDynamicData(bytes32 indexed tableId, bytes32[] keyTuple, uint48 start, uint40 deleteCount, bytes32 encodedLengths, bytes data)",
  _2 = "event Store_DeleteRecord(bytes32 indexed tableId, bytes32[] keyTuple)",
  O2 = [y2, g2, w2, _2];
_S(O2);
var Wu = Hy({
    storeImportPath: "../../",
    namespace: "store",
    userTypes: {
      ResourceId: { filePath: "./src/ResourceId.sol", internalType: "bytes32" },
      FieldLayout: {
        filePath: "./src/FieldLayout.sol",
        internalType: "bytes32",
      },
      Schema: { filePath: "./src/Schema.sol", internalType: "bytes32" },
    },
    tables: {
      StoreHooks: {
        keySchema: { tableId: "ResourceId" },
        valueSchema: { hooks: "bytes21[]" },
      },
      Tables: {
        keySchema: { tableId: "ResourceId" },
        valueSchema: {
          fieldLayout: "FieldLayout",
          keySchema: "Schema",
          valueSchema: "Schema",
          abiEncodedKeyNames: "bytes",
          abiEncodedFieldNames: "bytes",
        },
      },
      ResourceIds: {
        keySchema: { resourceId: "ResourceId" },
        valueSchema: { exists: "bool" },
      },
      Hooks: {
        keySchema: { resourceId: "ResourceId" },
        valueSchema: { hooks: "bytes21[]" },
        tableIdArgument: !0,
      },
    },
  }),
  qu = Hy({
    worldImportPath: "../../",
    worldgenDirectory: "interfaces",
    worldInterfaceName: "IBaseWorld",
    namespace: "world",
    userTypes: {
      ResourceId: {
        filePath: "@latticexyz/store/src/ResourceId.sol",
        internalType: "bytes32",
      },
    },
    tables: {
      NamespaceOwner: {
        keySchema: { namespaceId: "ResourceId" },
        valueSchema: { owner: "address" },
      },
      ResourceAccess: {
        keySchema: { resourceId: "ResourceId", caller: "address" },
        valueSchema: { access: "bool" },
      },
      InstalledModules: {
        keySchema: { moduleName: "bytes16", argumentsHash: "bytes32" },
        valueSchema: { moduleAddress: "address" },
      },
      UserDelegationControl: {
        keySchema: { delegator: "address", delegatee: "address" },
        valueSchema: { delegationControlId: "ResourceId" },
      },
      NamespaceDelegationControl: {
        keySchema: { namespaceId: "ResourceId" },
        valueSchema: { delegationControlId: "ResourceId" },
      },
      Balances: {
        keySchema: { namespaceId: "ResourceId" },
        valueSchema: { balance: "uint256" },
      },
      Systems: {
        keySchema: { systemId: "ResourceId" },
        valueSchema: { system: "address", publicAccess: "bool" },
        dataStruct: !1,
      },
      SystemRegistry: {
        keySchema: { system: "address" },
        valueSchema: { systemId: "ResourceId" },
      },
      SystemHooks: {
        keySchema: { systemId: "ResourceId" },
        valueSchema: "bytes21[]",
      },
      FunctionSelectors: {
        keySchema: { functionSelector: "bytes4" },
        valueSchema: {
          systemId: "ResourceId",
          systemFunctionSelector: "bytes4",
        },
        dataStruct: !1,
      },
      FunctionSignatures: {
        keySchema: { functionSelector: "bytes4" },
        valueSchema: { functionSignature: "string" },
        offchainOnly: !0,
      },
    },
    excludeSystems: ["StoreRegistrationSystem"],
  });
Xy("mud:block-events-stream");
function iy(e) {
  return Cx(e, (t) => t.type);
}
var Zs = Sc(Wu).tables;
Sc(qu).tables;
Zs.Tables.tableId;
({
  ...Zs.Tables,
  keySchema: iy(Zs.Tables.keySchema),
  valueSchema: iy(Zs.Tables.valueSchema),
});
var x2 = ((e) => (
    (e.INITIALIZE = "initialize"),
    (e.SNAPSHOT = "snapshot"),
    (e.RPC = "rpc"),
    (e.LIVE = "live"),
    e
  ))(x2 || {}),
  S2 = Object.keys(Wu.tables).map((e) =>
    Qy({
      type: Wu.tables[e].offchainOnly ? "offchainTable" : "table",
      namespace: Wu.namespace,
      name: e,
    })
  ),
  P2 = Object.keys(qu.tables).map((e) =>
    Qy({
      type: qu.tables[e].offchainOnly ? "offchainTable" : "table",
      namespace: qu.namespace,
      name: e,
    })
  );
[...S2, ...P2];
var ow = Xy("mud:store-sync");
ow.extend("createStoreSync");
function E2(e) {
  if (!Ky(e)) throw new Error(`entity ${e} is not a hex string`);
  let t = _a(e);
  if (t % 32 !== 0)
    throw new Error(`entity length ${t} is not a multiple of 32 bytes`);
  return new Array(t / 32).fill(0).map((n, o) => Rx(e, o * 32, (o + 1) * 32));
}
function k2(e, t) {
  let n = E2(t);
  if (n.length !== Object.keys(e).length)
    throw new Error(
      `entity key tuple length ${n.length} does not match key schema length ${
        Object.keys(e).length
      }`
    );
  return Object.fromEntries(
    Object.entries(e).map(([o, a], u) => [o, YS([{ type: a }], n[u])[0]])
  );
}
function iw(e) {
  return zx(e);
}
function j2(e) {
  return (
    e.metadata?.componentName != null &&
    e.metadata?.tableName != null &&
    e.metadata?.keySchema != null &&
    e.metadata?.valueSchema != null
  );
}
ow.extend("recs");
iw([]);
M.Number,
  M.Number,
  M.Number,
  M.Number,
  M.Number,
  M.Number,
  M.BigInt,
  M.BigInt,
  M.BigInt,
  M.BigInt,
  M.BigInt,
  M.BigInt,
  M.BigInt,
  M.BigInt,
  M.BigInt,
  M.BigInt,
  M.BigInt,
  M.BigInt,
  M.BigInt,
  M.BigInt,
  M.BigInt,
  M.BigInt,
  M.BigInt,
  M.BigInt,
  M.BigInt,
  M.BigInt,
  M.BigInt,
  M.BigInt,
  M.BigInt,
  M.BigInt,
  M.BigInt,
  M.BigInt,
  M.Number,
  M.Number,
  M.Number,
  M.Number,
  M.Number,
  M.Number,
  M.BigInt,
  M.BigInt,
  M.BigInt,
  M.BigInt,
  M.BigInt,
  M.BigInt,
  M.BigInt,
  M.BigInt,
  M.BigInt,
  M.BigInt,
  M.BigInt,
  M.BigInt,
  M.BigInt,
  M.BigInt,
  M.BigInt,
  M.BigInt,
  M.BigInt,
  M.BigInt,
  M.BigInt,
  M.BigInt,
  M.BigInt,
  M.BigInt,
  M.BigInt,
  M.BigInt,
  M.BigInt,
  M.BigInt,
  M.String,
  M.String,
  M.String,
  M.String,
  M.String,
  M.String,
  M.String,
  M.String,
  M.String,
  M.String,
  M.String,
  M.String,
  M.String,
  M.String,
  M.String,
  M.String,
  M.String,
  M.String,
  M.String,
  M.String,
  M.String,
  M.String,
  M.String,
  M.String,
  M.String,
  M.String,
  M.String,
  M.String,
  M.String,
  M.String,
  M.String,
  M.String,
  M.Boolean,
  M.String,
  M.NumberArray,
  M.NumberArray,
  M.NumberArray,
  M.NumberArray,
  M.NumberArray,
  M.NumberArray,
  M.BigIntArray,
  M.BigIntArray,
  M.BigIntArray,
  M.BigIntArray,
  M.BigIntArray,
  M.BigIntArray,
  M.BigIntArray,
  M.BigIntArray,
  M.BigIntArray,
  M.BigIntArray,
  M.BigIntArray,
  M.BigIntArray,
  M.BigIntArray,
  M.BigIntArray,
  M.BigIntArray,
  M.BigIntArray,
  M.BigIntArray,
  M.BigIntArray,
  M.BigIntArray,
  M.BigIntArray,
  M.BigIntArray,
  M.BigIntArray,
  M.BigIntArray,
  M.BigIntArray,
  M.BigIntArray,
  M.BigIntArray,
  M.NumberArray,
  M.NumberArray,
  M.NumberArray,
  M.NumberArray,
  M.NumberArray,
  M.NumberArray,
  M.BigIntArray,
  M.BigIntArray,
  M.BigIntArray,
  M.BigIntArray,
  M.BigIntArray,
  M.BigIntArray,
  M.BigIntArray,
  M.BigIntArray,
  M.BigIntArray,
  M.BigIntArray,
  M.BigIntArray,
  M.BigIntArray,
  M.BigIntArray,
  M.BigIntArray,
  M.BigIntArray,
  M.BigIntArray,
  M.BigIntArray,
  M.BigIntArray,
  M.BigIntArray,
  M.BigIntArray,
  M.BigIntArray,
  M.BigIntArray,
  M.BigIntArray,
  M.BigIntArray,
  M.BigIntArray,
  M.BigIntArray,
  M.StringArray,
  M.StringArray,
  M.StringArray,
  M.StringArray,
  M.StringArray,
  M.StringArray,
  M.StringArray,
  M.StringArray,
  M.StringArray,
  M.StringArray,
  M.StringArray,
  M.StringArray,
  M.StringArray,
  M.StringArray,
  M.StringArray,
  M.StringArray,
  M.StringArray,
  M.StringArray,
  M.StringArray,
  M.StringArray,
  M.StringArray,
  M.StringArray,
  M.StringArray,
  M.StringArray,
  M.StringArray,
  M.StringArray,
  M.StringArray,
  M.StringArray,
  M.StringArray,
  M.StringArray,
  M.StringArray,
  M.StringArray,
  M.T,
  M.StringArray,
  M.String,
  M.String;
Sc(Wu).tables;
Sc(qu).tables;
var A2 = Object.create,
  jv = Object.defineProperty,
  I2 = Object.getOwnPropertyDescriptor,
  T2 = Object.getOwnPropertyNames,
  M2 = Object.getPrototypeOf,
  N2 = Object.prototype.hasOwnProperty,
  J = (e, t) => () => (e && (t = e((e = 0))), t),
  E = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports),
  aw = (e, t) => {
    for (var n in t) jv(e, n, { get: t[n], enumerable: !0 });
  },
  C2 = (e, t, n, o) => {
    if ((t && typeof t == "object") || typeof t == "function")
      for (let a of T2(t))
        !N2.call(e, a) &&
          a !== n &&
          jv(e, a, {
            get: () => t[a],
            enumerable: !(o = I2(t, a)) || o.enumerable,
          });
    return e;
  },
  be = (e, t, n) => (
    (n = e != null ? A2(M2(e)) : {}),
    C2(
      t || !e || !e.__esModule
        ? jv(n, "default", { value: e, enumerable: !0 })
        : n,
      e
    )
  ),
  z2 = E((e) => {
    var t = Symbol.for("react.element"),
      n = Symbol.for("react.portal"),
      o = Symbol.for("react.fragment"),
      a = Symbol.for("react.strict_mode"),
      u = Symbol.for("react.profiler"),
      l = Symbol.for("react.provider"),
      c = Symbol.for("react.context"),
      f = Symbol.for("react.forward_ref"),
      d = Symbol.for("react.suspense"),
      v = Symbol.for("react.memo"),
      m = Symbol.for("react.lazy"),
      h = Symbol.iterator;
    function g(I) {
      return I === null || typeof I != "object"
        ? null
        : ((I = (h && I[h]) || I["@@iterator"]),
          typeof I == "function" ? I : null);
    }
    var w = {
        isMounted: function () {
          return !1;
        },
        enqueueForceUpdate: function () {},
        enqueueReplaceState: function () {},
        enqueueSetState: function () {},
      },
      x = Object.assign,
      S = {};
    function O(I, q, Ee) {
      (this.props = I),
        (this.context = q),
        (this.refs = S),
        (this.updater = Ee || w);
    }
    (O.prototype.isReactComponent = {}),
      (O.prototype.setState = function (I, q) {
        if (typeof I != "object" && typeof I != "function" && I != null)
          throw Error(
            "setState(...): takes an object of state variables to update or a function which returns an object of state variables."
          );
        this.updater.enqueueSetState(this, I, q, "setState");
      }),
      (O.prototype.forceUpdate = function (I) {
        this.updater.enqueueForceUpdate(this, I, "forceUpdate");
      });
    function A() {}
    A.prototype = O.prototype;
    function k(I, q, Ee) {
      (this.props = I),
        (this.context = q),
        (this.refs = S),
        (this.updater = Ee || w);
    }
    var j = (k.prototype = new A());
    (j.constructor = k), x(j, O.prototype), (j.isPureReactComponent = !0);
    var C = Array.isArray,
      D = Object.prototype.hasOwnProperty,
      W = { current: null },
      $ = { key: !0, ref: !0, __self: !0, __source: !0 };
    function F(I, q, Ee) {
      var Ie,
        je = {},
        Ce = null,
        Be = null;
      if (q != null)
        for (Ie in (q.ref !== void 0 && (Be = q.ref),
        q.key !== void 0 && (Ce = "" + q.key),
        q))
          D.call(q, Ie) && !$.hasOwnProperty(Ie) && (je[Ie] = q[Ie]);
      var He = arguments.length - 2;
      if (He === 1) je.children = Ee;
      else if (1 < He) {
        for (var ze = Array(He), Ot = 0; Ot < He; Ot++)
          ze[Ot] = arguments[Ot + 2];
        je.children = ze;
      }
      if (I && I.defaultProps)
        for (Ie in ((He = I.defaultProps), He))
          je[Ie] === void 0 && (je[Ie] = He[Ie]);
      return {
        $$typeof: t,
        type: I,
        key: Ce,
        ref: Be,
        props: je,
        _owner: W.current,
      };
    }
    function V(I, q) {
      return {
        $$typeof: t,
        type: I.type,
        key: q,
        ref: I.ref,
        props: I.props,
        _owner: I._owner,
      };
    }
    function re(I) {
      return typeof I == "object" && I !== null && I.$$typeof === t;
    }
    function he(I) {
      var q = { "=": "=0", ":": "=2" };
      return (
        "$" +
        I.replace(/[=:]/g, function (Ee) {
          return q[Ee];
        })
      );
    }
    var Z = /\/+/g;
    function ge(I, q) {
      return typeof I == "object" && I !== null && I.key != null
        ? he("" + I.key)
        : q.toString(36);
    }
    function Se(I, q, Ee, Ie, je) {
      var Ce = typeof I;
      (Ce === "undefined" || Ce === "boolean") && (I = null);
      var Be = !1;
      if (I === null) Be = !0;
      else
        switch (Ce) {
          case "string":
          case "number":
            Be = !0;
            break;
          case "object":
            switch (I.$$typeof) {
              case t:
              case n:
                Be = !0;
            }
        }
      if (Be)
        return (
          (Be = I),
          (je = je(Be)),
          (I = Ie === "" ? "." + ge(Be, 0) : Ie),
          C(je)
            ? ((Ee = ""),
              I != null && (Ee = I.replace(Z, "$&/") + "/"),
              Se(je, q, Ee, "", function (Ot) {
                return Ot;
              }))
            : je != null &&
              (re(je) &&
                (je = V(
                  je,
                  Ee +
                    (!je.key || (Be && Be.key === je.key)
                      ? ""
                      : ("" + je.key).replace(Z, "$&/") + "/") +
                    I
                )),
              q.push(je)),
          1
        );
      if (((Be = 0), (Ie = Ie === "" ? "." : Ie + ":"), C(I)))
        for (var He = 0; He < I.length; He++) {
          Ce = I[He];
          var ze = Ie + ge(Ce, He);
          Be += Se(Ce, q, Ee, ze, je);
        }
      else if (((ze = g(I)), typeof ze == "function"))
        for (I = ze.call(I), He = 0; !(Ce = I.next()).done; )
          (Ce = Ce.value),
            (ze = Ie + ge(Ce, He++)),
            (Be += Se(Ce, q, Ee, ze, je));
      else if (Ce === "object")
        throw (
          ((q = String(I)),
          Error(
            "Objects are not valid as a React child (found: " +
              (q === "[object Object]"
                ? "object with keys {" + Object.keys(I).join(", ") + "}"
                : q) +
              "). If you meant to render a collection of children, use an array instead."
          ))
        );
      return Be;
    }
    function we(I, q, Ee) {
      if (I == null) return I;
      var Ie = [],
        je = 0;
      return (
        Se(I, Ie, "", "", function (Ce) {
          return q.call(Ee, Ce, je++);
        }),
        Ie
      );
    }
    function ce(I) {
      if (I._status === -1) {
        var q = I._result;
        (q = q()),
          q.then(
            function (Ee) {
              (I._status === 0 || I._status === -1) &&
                ((I._status = 1), (I._result = Ee));
            },
            function (Ee) {
              (I._status === 0 || I._status === -1) &&
                ((I._status = 2), (I._result = Ee));
            }
          ),
          I._status === -1 && ((I._status = 0), (I._result = q));
      }
      if (I._status === 1) return I._result.default;
      throw I._result;
    }
    var K = { current: null },
      de = { transition: null },
      me = {
        ReactCurrentDispatcher: K,
        ReactCurrentBatchConfig: de,
        ReactCurrentOwner: W,
      };
    (e.Children = {
      map: we,
      forEach: function (I, q, Ee) {
        we(
          I,
          function () {
            q.apply(this, arguments);
          },
          Ee
        );
      },
      count: function (I) {
        var q = 0;
        return (
          we(I, function () {
            q++;
          }),
          q
        );
      },
      toArray: function (I) {
        return (
          we(I, function (q) {
            return q;
          }) || []
        );
      },
      only: function (I) {
        if (!re(I))
          throw Error(
            "React.Children.only expected to receive a single React element child."
          );
        return I;
      },
    }),
      (e.Component = O),
      (e.Fragment = o),
      (e.Profiler = u),
      (e.PureComponent = k),
      (e.StrictMode = a),
      (e.Suspense = d),
      (e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = me),
      (e.cloneElement = function (I, q, Ee) {
        if (I == null)
          throw Error(
            "React.cloneElement(...): The argument must be a React element, but you passed " +
              I +
              "."
          );
        var Ie = x({}, I.props),
          je = I.key,
          Ce = I.ref,
          Be = I._owner;
        if (q != null) {
          if (
            (q.ref !== void 0 && ((Ce = q.ref), (Be = W.current)),
            q.key !== void 0 && (je = "" + q.key),
            I.type && I.type.defaultProps)
          )
            var He = I.type.defaultProps;
          for (ze in q)
            D.call(q, ze) &&
              !$.hasOwnProperty(ze) &&
              (Ie[ze] = q[ze] === void 0 && He !== void 0 ? He[ze] : q[ze]);
        }
        var ze = arguments.length - 2;
        if (ze === 1) Ie.children = Ee;
        else if (1 < ze) {
          He = Array(ze);
          for (var Ot = 0; Ot < ze; Ot++) He[Ot] = arguments[Ot + 2];
          Ie.children = He;
        }
        return {
          $$typeof: t,
          type: I.type,
          key: je,
          ref: Ce,
          props: Ie,
          _owner: Be,
        };
      }),
      (e.createContext = function (I) {
        return (
          (I = {
            $$typeof: c,
            _currentValue: I,
            _currentValue2: I,
            _threadCount: 0,
            Provider: null,
            Consumer: null,
            _defaultValue: null,
            _globalName: null,
          }),
          (I.Provider = { $$typeof: l, _context: I }),
          (I.Consumer = I)
        );
      }),
      (e.createElement = F),
      (e.createFactory = function (I) {
        var q = F.bind(null, I);
        return (q.type = I), q;
      }),
      (e.createRef = function () {
        return { current: null };
      }),
      (e.forwardRef = function (I) {
        return { $$typeof: f, render: I };
      }),
      (e.isValidElement = re),
      (e.lazy = function (I) {
        return {
          $$typeof: m,
          _payload: { _status: -1, _result: I },
          _init: ce,
        };
      }),
      (e.memo = function (I, q) {
        return { $$typeof: v, type: I, compare: q === void 0 ? null : q };
      }),
      (e.startTransition = function (I) {
        var q = de.transition;
        de.transition = {};
        try {
          I();
        } finally {
          de.transition = q;
        }
      }),
      (e.unstable_act = function () {
        throw Error("act(...) is not supported in production builds of React.");
      }),
      (e.useCallback = function (I, q) {
        return K.current.useCallback(I, q);
      }),
      (e.useContext = function (I) {
        return K.current.useContext(I);
      }),
      (e.useDebugValue = function () {}),
      (e.useDeferredValue = function (I) {
        return K.current.useDeferredValue(I);
      }),
      (e.useEffect = function (I, q) {
        return K.current.useEffect(I, q);
      }),
      (e.useId = function () {
        return K.current.useId();
      }),
      (e.useImperativeHandle = function (I, q, Ee) {
        return K.current.useImperativeHandle(I, q, Ee);
      }),
      (e.useInsertionEffect = function (I, q) {
        return K.current.useInsertionEffect(I, q);
      }),
      (e.useLayoutEffect = function (I, q) {
        return K.current.useLayoutEffect(I, q);
      }),
      (e.useMemo = function (I, q) {
        return K.current.useMemo(I, q);
      }),
      (e.useReducer = function (I, q, Ee) {
        return K.current.useReducer(I, q, Ee);
      }),
      (e.useRef = function (I) {
        return K.current.useRef(I);
      }),
      (e.useState = function (I) {
        return K.current.useState(I);
      }),
      (e.useSyncExternalStore = function (I, q, Ee) {
        return K.current.useSyncExternalStore(I, q, Ee);
      }),
      (e.useTransition = function () {
        return K.current.useTransition();
      }),
      (e.version = "18.2.0");
  }),
  st = E((e, t) => {
    t.exports = z2();
  }),
  R2 = E((e) => {
    var t = st(),
      n = Symbol.for("react.element"),
      o = Symbol.for("react.fragment"),
      a = Object.prototype.hasOwnProperty,
      u =
        t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
      l = { key: !0, ref: !0, __self: !0, __source: !0 };
    function c(f, d, v) {
      var m,
        h = {},
        g = null,
        w = null;
      v !== void 0 && (g = "" + v),
        d.key !== void 0 && (g = "" + d.key),
        d.ref !== void 0 && (w = d.ref);
      for (m in d) a.call(d, m) && !l.hasOwnProperty(m) && (h[m] = d[m]);
      if (f && f.defaultProps)
        for (m in ((d = f.defaultProps), d)) h[m] === void 0 && (h[m] = d[m]);
      return {
        $$typeof: n,
        type: f,
        key: g,
        ref: w,
        props: h,
        _owner: u.current,
      };
    }
    (e.Fragment = o), (e.jsx = c), (e.jsxs = c);
  }),
  qe = E((e, t) => {
    t.exports = R2();
  }),
  L2 = E((e) => {
    function t(K, de) {
      var me = K.length;
      K.push(de);
      e: for (; 0 < me; ) {
        var I = (me - 1) >>> 1,
          q = K[I];
        if (0 < a(q, de)) (K[I] = de), (K[me] = q), (me = I);
        else break e;
      }
    }
    function n(K) {
      return K.length === 0 ? null : K[0];
    }
    function o(K) {
      if (K.length === 0) return null;
      var de = K[0],
        me = K.pop();
      if (me !== de) {
        K[0] = me;
        e: for (var I = 0, q = K.length, Ee = q >>> 1; I < Ee; ) {
          var Ie = 2 * (I + 1) - 1,
            je = K[Ie],
            Ce = Ie + 1,
            Be = K[Ce];
          if (0 > a(je, me))
            Ce < q && 0 > a(Be, je)
              ? ((K[I] = Be), (K[Ce] = me), (I = Ce))
              : ((K[I] = je), (K[Ie] = me), (I = Ie));
          else if (Ce < q && 0 > a(Be, me)) (K[I] = Be), (K[Ce] = me), (I = Ce);
          else break e;
        }
      }
      return de;
    }
    function a(K, de) {
      var me = K.sortIndex - de.sortIndex;
      return me !== 0 ? me : K.id - de.id;
    }
    typeof performance == "object" && typeof performance.now == "function"
      ? ((u = performance),
        (e.unstable_now = function () {
          return u.now();
        }))
      : ((l = Date),
        (c = l.now()),
        (e.unstable_now = function () {
          return l.now() - c;
        }));
    var u,
      l,
      c,
      f = [],
      d = [],
      v = 1,
      m = null,
      h = 3,
      g = !1,
      w = !1,
      x = !1,
      S = typeof setTimeout == "function" ? setTimeout : null,
      O = typeof clearTimeout == "function" ? clearTimeout : null,
      A = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" &&
      navigator.scheduling !== void 0 &&
      navigator.scheduling.isInputPending !== void 0 &&
      navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function k(K) {
      for (var de = n(d); de !== null; ) {
        if (de.callback === null) o(d);
        else if (de.startTime <= K)
          o(d), (de.sortIndex = de.expirationTime), t(f, de);
        else break;
        de = n(d);
      }
    }
    function j(K) {
      if (((x = !1), k(K), !w))
        if (n(f) !== null) (w = !0), we(C);
        else {
          var de = n(d);
          de !== null && ce(j, de.startTime - K);
        }
    }
    function C(K, de) {
      (w = !1), x && ((x = !1), O($), ($ = -1)), (g = !0);
      var me = h;
      try {
        for (
          k(de), m = n(f);
          m !== null && (!(m.expirationTime > de) || (K && !re()));

        ) {
          var I = m.callback;
          if (typeof I == "function") {
            (m.callback = null), (h = m.priorityLevel);
            var q = I(m.expirationTime <= de);
            (de = e.unstable_now()),
              typeof q == "function" ? (m.callback = q) : m === n(f) && o(f),
              k(de);
          } else o(f);
          m = n(f);
        }
        if (m !== null) var Ee = !0;
        else {
          var Ie = n(d);
          Ie !== null && ce(j, Ie.startTime - de), (Ee = !1);
        }
        return Ee;
      } finally {
        (m = null), (h = me), (g = !1);
      }
    }
    var D = !1,
      W = null,
      $ = -1,
      F = 5,
      V = -1;
    function re() {
      return !(e.unstable_now() - V < F);
    }
    function he() {
      if (W !== null) {
        var K = e.unstable_now();
        V = K;
        var de = !0;
        try {
          de = W(!0, K);
        } finally {
          de ? Z() : ((D = !1), (W = null));
        }
      } else D = !1;
    }
    var Z;
    typeof A == "function"
      ? (Z = function () {
          A(he);
        })
      : typeof MessageChannel < "u"
      ? ((ge = new MessageChannel()),
        (Se = ge.port2),
        (ge.port1.onmessage = he),
        (Z = function () {
          Se.postMessage(null);
        }))
      : (Z = function () {
          S(he, 0);
        });
    var ge, Se;
    function we(K) {
      (W = K), D || ((D = !0), Z());
    }
    function ce(K, de) {
      $ = S(function () {
        K(e.unstable_now());
      }, de);
    }
    (e.unstable_IdlePriority = 5),
      (e.unstable_ImmediatePriority = 1),
      (e.unstable_LowPriority = 4),
      (e.unstable_NormalPriority = 3),
      (e.unstable_Profiling = null),
      (e.unstable_UserBlockingPriority = 2),
      (e.unstable_cancelCallback = function (K) {
        K.callback = null;
      }),
      (e.unstable_continueExecution = function () {
        w || g || ((w = !0), we(C));
      }),
      (e.unstable_forceFrameRate = function (K) {
        0 > K || 125 < K
          ? console.error(
              "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
            )
          : (F = 0 < K ? Math.floor(1e3 / K) : 5);
      }),
      (e.unstable_getCurrentPriorityLevel = function () {
        return h;
      }),
      (e.unstable_getFirstCallbackNode = function () {
        return n(f);
      }),
      (e.unstable_next = function (K) {
        switch (h) {
          case 1:
          case 2:
          case 3:
            var de = 3;
            break;
          default:
            de = h;
        }
        var me = h;
        h = de;
        try {
          return K();
        } finally {
          h = me;
        }
      }),
      (e.unstable_pauseExecution = function () {}),
      (e.unstable_requestPaint = function () {}),
      (e.unstable_runWithPriority = function (K, de) {
        switch (K) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            break;
          default:
            K = 3;
        }
        var me = h;
        h = K;
        try {
          return de();
        } finally {
          h = me;
        }
      }),
      (e.unstable_scheduleCallback = function (K, de, me) {
        var I = e.unstable_now();
        switch (
          (typeof me == "object" && me !== null
            ? ((me = me.delay),
              (me = typeof me == "number" && 0 < me ? I + me : I))
            : (me = I),
          K)
        ) {
          case 1:
            var q = -1;
            break;
          case 2:
            q = 250;
            break;
          case 5:
            q = 1073741823;
            break;
          case 4:
            q = 1e4;
            break;
          default:
            q = 5e3;
        }
        return (
          (q = me + q),
          (K = {
            id: v++,
            callback: de,
            priorityLevel: K,
            startTime: me,
            expirationTime: q,
            sortIndex: -1,
          }),
          me > I
            ? ((K.sortIndex = me),
              t(d, K),
              n(f) === null &&
                K === n(d) &&
                (x ? (O($), ($ = -1)) : (x = !0), ce(j, me - I)))
            : ((K.sortIndex = q), t(f, K), w || g || ((w = !0), we(C))),
          K
        );
      }),
      (e.unstable_shouldYield = re),
      (e.unstable_wrapCallback = function (K) {
        var de = h;
        return function () {
          var me = h;
          h = de;
          try {
            return K.apply(this, arguments);
          } finally {
            h = me;
          }
        };
      });
  }),
  B2 = E((e, t) => {
    t.exports = L2();
  }),
  D2 = E((e) => {
    var t = st(),
      n = B2();
    function o(r) {
      for (
        var i = "https://reactjs.org/docs/error-decoder.html?invariant=" + r,
          s = 1;
        s < arguments.length;
        s++
      )
        i += "&args[]=" + encodeURIComponent(arguments[s]);
      return (
        "Minified React error #" +
        r +
        "; visit " +
        i +
        " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
      );
    }
    var a = new Set(),
      u = {};
    function l(r, i) {
      c(r, i), c(r + "Capture", i);
    }
    function c(r, i) {
      for (u[r] = i, r = 0; r < i.length; r++) a.add(i[r]);
    }
    var f = !(
        typeof window > "u" ||
        typeof window.document > "u" ||
        typeof window.document.createElement > "u"
      ),
      d = Object.prototype.hasOwnProperty,
      v =
        /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
      m = {},
      h = {};
    function g(r) {
      return d.call(h, r)
        ? !0
        : d.call(m, r)
        ? !1
        : v.test(r)
        ? (h[r] = !0)
        : ((m[r] = !0), !1);
    }
    function w(r, i, s, p) {
      if (s !== null && s.type === 0) return !1;
      switch (typeof i) {
        case "function":
        case "symbol":
          return !0;
        case "boolean":
          return p
            ? !1
            : s !== null
            ? !s.acceptsBooleans
            : ((r = r.toLowerCase().slice(0, 5)),
              r !== "data-" && r !== "aria-");
        default:
          return !1;
      }
    }
    function x(r, i, s, p) {
      if (i === null || typeof i > "u" || w(r, i, s, p)) return !0;
      if (p) return !1;
      if (s !== null)
        switch (s.type) {
          case 3:
            return !i;
          case 4:
            return i === !1;
          case 5:
            return isNaN(i);
          case 6:
            return isNaN(i) || 1 > i;
        }
      return !1;
    }
    function S(r, i, s, p, b, y, _) {
      (this.acceptsBooleans = i === 2 || i === 3 || i === 4),
        (this.attributeName = p),
        (this.attributeNamespace = b),
        (this.mustUseProperty = s),
        (this.propertyName = r),
        (this.type = i),
        (this.sanitizeURL = y),
        (this.removeEmptyString = _);
    }
    var O = {};
    "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
      .split(" ")
      .forEach(function (r) {
        O[r] = new S(r, 0, !1, r, null, !1, !1);
      }),
      [
        ["acceptCharset", "accept-charset"],
        ["className", "class"],
        ["htmlFor", "for"],
        ["httpEquiv", "http-equiv"],
      ].forEach(function (r) {
        var i = r[0];
        O[i] = new S(i, 1, !1, r[1], null, !1, !1);
      }),
      ["contentEditable", "draggable", "spellCheck", "value"].forEach(function (
        r
      ) {
        O[r] = new S(r, 2, !1, r.toLowerCase(), null, !1, !1);
      }),
      [
        "autoReverse",
        "externalResourcesRequired",
        "focusable",
        "preserveAlpha",
      ].forEach(function (r) {
        O[r] = new S(r, 2, !1, r, null, !1, !1);
      }),
      "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
        .split(" ")
        .forEach(function (r) {
          O[r] = new S(r, 3, !1, r.toLowerCase(), null, !1, !1);
        }),
      ["checked", "multiple", "muted", "selected"].forEach(function (r) {
        O[r] = new S(r, 3, !0, r, null, !1, !1);
      }),
      ["capture", "download"].forEach(function (r) {
        O[r] = new S(r, 4, !1, r, null, !1, !1);
      }),
      ["cols", "rows", "size", "span"].forEach(function (r) {
        O[r] = new S(r, 6, !1, r, null, !1, !1);
      }),
      ["rowSpan", "start"].forEach(function (r) {
        O[r] = new S(r, 5, !1, r.toLowerCase(), null, !1, !1);
      });
    var A = /[\-:]([a-z])/g;
    function k(r) {
      return r[1].toUpperCase();
    }
    "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
      .split(" ")
      .forEach(function (r) {
        var i = r.replace(A, k);
        O[i] = new S(i, 1, !1, r, null, !1, !1);
      }),
      "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
        .split(" ")
        .forEach(function (r) {
          var i = r.replace(A, k);
          O[i] = new S(i, 1, !1, r, "http://www.w3.org/1999/xlink", !1, !1);
        }),
      ["xml:base", "xml:lang", "xml:space"].forEach(function (r) {
        var i = r.replace(A, k);
        O[i] = new S(
          i,
          1,
          !1,
          r,
          "http://www.w3.org/XML/1998/namespace",
          !1,
          !1
        );
      }),
      ["tabIndex", "crossOrigin"].forEach(function (r) {
        O[r] = new S(r, 1, !1, r.toLowerCase(), null, !1, !1);
      }),
      (O.xlinkHref = new S(
        "xlinkHref",
        1,
        !1,
        "xlink:href",
        "http://www.w3.org/1999/xlink",
        !0,
        !1
      )),
      ["src", "href", "action", "formAction"].forEach(function (r) {
        O[r] = new S(r, 1, !1, r.toLowerCase(), null, !0, !0);
      });
    function j(r, i, s, p) {
      var b = O.hasOwnProperty(i) ? O[i] : null;
      (b !== null
        ? b.type !== 0
        : p ||
          !(2 < i.length) ||
          (i[0] !== "o" && i[0] !== "O") ||
          (i[1] !== "n" && i[1] !== "N")) &&
        (x(i, s, b, p) && (s = null),
        p || b === null
          ? g(i) &&
            (s === null ? r.removeAttribute(i) : r.setAttribute(i, "" + s))
          : b.mustUseProperty
          ? (r[b.propertyName] = s === null ? (b.type === 3 ? !1 : "") : s)
          : ((i = b.attributeName),
            (p = b.attributeNamespace),
            s === null
              ? r.removeAttribute(i)
              : ((b = b.type),
                (s = b === 3 || (b === 4 && s === !0) ? "" : "" + s),
                p ? r.setAttributeNS(p, i, s) : r.setAttribute(i, s))));
    }
    var C = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
      D = Symbol.for("react.element"),
      W = Symbol.for("react.portal"),
      $ = Symbol.for("react.fragment"),
      F = Symbol.for("react.strict_mode"),
      V = Symbol.for("react.profiler"),
      re = Symbol.for("react.provider"),
      he = Symbol.for("react.context"),
      Z = Symbol.for("react.forward_ref"),
      ge = Symbol.for("react.suspense"),
      Se = Symbol.for("react.suspense_list"),
      we = Symbol.for("react.memo"),
      ce = Symbol.for("react.lazy"),
      K = Symbol.for("react.offscreen"),
      de = Symbol.iterator;
    function me(r) {
      return r === null || typeof r != "object"
        ? null
        : ((r = (de && r[de]) || r["@@iterator"]),
          typeof r == "function" ? r : null);
    }
    var I = Object.assign,
      q;
    function Ee(r) {
      if (q === void 0)
        try {
          throw Error();
        } catch (s) {
          var i = s.stack.trim().match(/\n( *(at )?)/);
          q = (i && i[1]) || "";
        }
      return (
        `
` +
        q +
        r
      );
    }
    var Ie = !1;
    function je(r, i) {
      if (!r || Ie) return "";
      Ie = !0;
      var s = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      try {
        if (i)
          if (
            ((i = function () {
              throw Error();
            }),
            Object.defineProperty(i.prototype, "props", {
              set: function () {
                throw Error();
              },
            }),
            typeof Reflect == "object" && Reflect.construct)
          ) {
            try {
              Reflect.construct(i, []);
            } catch (L) {
              var p = L;
            }
            Reflect.construct(r, [], i);
          } else {
            try {
              i.call();
            } catch (L) {
              p = L;
            }
            r.call(i.prototype);
          }
        else {
          try {
            throw Error();
          } catch (L) {
            p = L;
          }
          r();
        }
      } catch (L) {
        if (L && p && typeof L.stack == "string") {
          for (
            var b = L.stack.split(`
`),
              y = p.stack.split(`
`),
              _ = b.length - 1,
              P = y.length - 1;
            1 <= _ && 0 <= P && b[_] !== y[P];

          )
            P--;
          for (; 1 <= _ && 0 <= P; _--, P--)
            if (b[_] !== y[P]) {
              if (_ !== 1 || P !== 1)
                do
                  if ((_--, P--, 0 > P || b[_] !== y[P])) {
                    var T =
                      `
` + b[_].replace(" at new ", " at ");
                    return (
                      r.displayName &&
                        T.includes("<anonymous>") &&
                        (T = T.replace("<anonymous>", r.displayName)),
                      T
                    );
                  }
                while (1 <= _ && 0 <= P);
              break;
            }
        }
      } finally {
        (Ie = !1), (Error.prepareStackTrace = s);
      }
      return (r = r ? r.displayName || r.name : "") ? Ee(r) : "";
    }
    function Ce(r) {
      switch (r.tag) {
        case 5:
          return Ee(r.type);
        case 16:
          return Ee("Lazy");
        case 13:
          return Ee("Suspense");
        case 19:
          return Ee("SuspenseList");
        case 0:
        case 2:
        case 15:
          return (r = je(r.type, !1)), r;
        case 11:
          return (r = je(r.type.render, !1)), r;
        case 1:
          return (r = je(r.type, !0)), r;
        default:
          return "";
      }
    }
    function Be(r) {
      if (r == null) return null;
      if (typeof r == "function") return r.displayName || r.name || null;
      if (typeof r == "string") return r;
      switch (r) {
        case $:
          return "Fragment";
        case W:
          return "Portal";
        case V:
          return "Profiler";
        case F:
          return "StrictMode";
        case ge:
          return "Suspense";
        case Se:
          return "SuspenseList";
      }
      if (typeof r == "object")
        switch (r.$$typeof) {
          case he:
            return (r.displayName || "Context") + ".Consumer";
          case re:
            return (r._context.displayName || "Context") + ".Provider";
          case Z:
            var i = r.render;
            return (
              (r = r.displayName),
              r ||
                ((r = i.displayName || i.name || ""),
                (r = r !== "" ? "ForwardRef(" + r + ")" : "ForwardRef")),
              r
            );
          case we:
            return (
              (i = r.displayName || null), i !== null ? i : Be(r.type) || "Memo"
            );
          case ce:
            (i = r._payload), (r = r._init);
            try {
              return Be(r(i));
            } catch {}
        }
      return null;
    }
    function He(r) {
      var i = r.type;
      switch (r.tag) {
        case 24:
          return "Cache";
        case 9:
          return (i.displayName || "Context") + ".Consumer";
        case 10:
          return (i._context.displayName || "Context") + ".Provider";
        case 18:
          return "DehydratedFragment";
        case 11:
          return (
            (r = i.render),
            (r = r.displayName || r.name || ""),
            i.displayName || (r !== "" ? "ForwardRef(" + r + ")" : "ForwardRef")
          );
        case 7:
          return "Fragment";
        case 5:
          return i;
        case 4:
          return "Portal";
        case 3:
          return "Root";
        case 6:
          return "Text";
        case 16:
          return Be(i);
        case 8:
          return i === F ? "StrictMode" : "Mode";
        case 22:
          return "Offscreen";
        case 12:
          return "Profiler";
        case 21:
          return "Scope";
        case 13:
          return "Suspense";
        case 19:
          return "SuspenseList";
        case 25:
          return "TracingMarker";
        case 1:
        case 0:
        case 17:
        case 2:
        case 14:
        case 15:
          if (typeof i == "function") return i.displayName || i.name || null;
          if (typeof i == "string") return i;
      }
      return null;
    }
    function ze(r) {
      switch (typeof r) {
        case "boolean":
        case "number":
        case "string":
        case "undefined":
          return r;
        case "object":
          return r;
        default:
          return "";
      }
    }
    function Ot(r) {
      var i = r.type;
      return (
        (r = r.nodeName) &&
        r.toLowerCase() === "input" &&
        (i === "checkbox" || i === "radio")
      );
    }
    function Va(r) {
      var i = Ot(r) ? "checked" : "value",
        s = Object.getOwnPropertyDescriptor(r.constructor.prototype, i),
        p = "" + r[i];
      if (
        !r.hasOwnProperty(i) &&
        typeof s < "u" &&
        typeof s.get == "function" &&
        typeof s.set == "function"
      ) {
        var b = s.get,
          y = s.set;
        return (
          Object.defineProperty(r, i, {
            configurable: !0,
            get: function () {
              return b.call(this);
            },
            set: function (_) {
              (p = "" + _), y.call(this, _);
            },
          }),
          Object.defineProperty(r, i, { enumerable: s.enumerable }),
          {
            getValue: function () {
              return p;
            },
            setValue: function (_) {
              p = "" + _;
            },
            stopTracking: function () {
              (r._valueTracker = null), delete r[i];
            },
          }
        );
      }
    }
    function vr(r) {
      r._valueTracker || (r._valueTracker = Va(r));
    }
    function Bo(r) {
      if (!r) return !1;
      var i = r._valueTracker;
      if (!i) return !0;
      var s = i.getValue(),
        p = "";
      return (
        r && (p = Ot(r) ? (r.checked ? "true" : "false") : r.value),
        (r = p),
        r !== s ? (i.setValue(r), !0) : !1
      );
    }
    function Qr(r) {
      if (
        ((r = r || (typeof document < "u" ? document : void 0)), typeof r > "u")
      )
        return null;
      try {
        return r.activeElement || r.body;
      } catch {
        return r.body;
      }
    }
    function xn(r, i) {
      var s = i.checked;
      return I({}, i, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: s ?? r._wrapperState.initialChecked,
      });
    }
    function Qn(r, i) {
      var s = i.defaultValue == null ? "" : i.defaultValue,
        p = i.checked != null ? i.checked : i.defaultChecked;
      (s = ze(i.value != null ? i.value : s)),
        (r._wrapperState = {
          initialChecked: p,
          initialValue: s,
          controlled:
            i.type === "checkbox" || i.type === "radio"
              ? i.checked != null
              : i.value != null,
        });
    }
    function Ar(r, i) {
      (i = i.checked), i != null && j(r, "checked", i, !1);
    }
    function Yn(r, i) {
      Ar(r, i);
      var s = ze(i.value),
        p = i.type;
      if (s != null)
        p === "number"
          ? ((s === 0 && r.value === "") || r.value != s) && (r.value = "" + s)
          : r.value !== "" + s && (r.value = "" + s);
      else if (p === "submit" || p === "reset") {
        r.removeAttribute("value");
        return;
      }
      i.hasOwnProperty("value")
        ? Jn(r, i.type, s)
        : i.hasOwnProperty("defaultValue") && Jn(r, i.type, ze(i.defaultValue)),
        i.checked == null &&
          i.defaultChecked != null &&
          (r.defaultChecked = !!i.defaultChecked);
    }
    function Do(r, i, s) {
      if (i.hasOwnProperty("value") || i.hasOwnProperty("defaultValue")) {
        var p = i.type;
        if (
          !(
            (p !== "submit" && p !== "reset") ||
            (i.value !== void 0 && i.value !== null)
          )
        )
          return;
        (i = "" + r._wrapperState.initialValue),
          s || i === r.value || (r.value = i),
          (r.defaultValue = i);
      }
      (s = r.name),
        s !== "" && (r.name = ""),
        (r.defaultChecked = !!r._wrapperState.initialChecked),
        s !== "" && (r.name = s);
    }
    function Jn(r, i, s) {
      (i !== "number" || Qr(r.ownerDocument) !== r) &&
        (s == null
          ? (r.defaultValue = "" + r._wrapperState.initialValue)
          : r.defaultValue !== "" + s && (r.defaultValue = "" + s));
    }
    var Sn = Array.isArray;
    function Ht(r, i, s, p) {
      if (((r = r.options), i)) {
        i = {};
        for (var b = 0; b < s.length; b++) i["$" + s[b]] = !0;
        for (s = 0; s < r.length; s++)
          (b = i.hasOwnProperty("$" + r[s].value)),
            r[s].selected !== b && (r[s].selected = b),
            b && p && (r[s].defaultSelected = !0);
      } else {
        for (s = "" + ze(s), i = null, b = 0; b < r.length; b++) {
          if (r[b].value === s) {
            (r[b].selected = !0), p && (r[b].defaultSelected = !0);
            return;
          }
          i !== null || r[b].disabled || (i = r[b]);
        }
        i !== null && (i.selected = !0);
      }
    }
    function Yr(r, i) {
      if (i.dangerouslySetInnerHTML != null) throw Error(o(91));
      return I({}, i, {
        value: void 0,
        defaultValue: void 0,
        children: "" + r._wrapperState.initialValue,
      });
    }
    function Uo(r, i) {
      var s = i.value;
      if (s == null) {
        if (((s = i.children), (i = i.defaultValue), s != null)) {
          if (i != null) throw Error(o(92));
          if (Sn(s)) {
            if (1 < s.length) throw Error(o(93));
            s = s[0];
          }
          i = s;
        }
        i == null && (i = ""), (s = i);
      }
      r._wrapperState = { initialValue: ze(s) };
    }
    function Gn(r, i) {
      var s = ze(i.value),
        p = ze(i.defaultValue);
      s != null &&
        ((s = "" + s),
        s !== r.value && (r.value = s),
        i.defaultValue == null && r.defaultValue !== s && (r.defaultValue = s)),
        p != null && (r.defaultValue = "" + p);
    }
    function Mi(r) {
      var i = r.textContent;
      i === r._wrapperState.initialValue &&
        i !== "" &&
        i !== null &&
        (r.value = i);
    }
    function Ni(r) {
      switch (r) {
        case "svg":
          return "http://www.w3.org/2000/svg";
        case "math":
          return "http://www.w3.org/1998/Math/MathML";
        default:
          return "http://www.w3.org/1999/xhtml";
      }
    }
    function Zn(r, i) {
      return r == null || r === "http://www.w3.org/1999/xhtml"
        ? Ni(i)
        : r === "http://www.w3.org/2000/svg" && i === "foreignObject"
        ? "http://www.w3.org/1999/xhtml"
        : r;
    }
    var eo,
      B = (function (r) {
        return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
          ? function (i, s, p, b) {
              MSApp.execUnsafeLocalFunction(function () {
                return r(i, s, p, b);
              });
            }
          : r;
      })(function (r, i) {
        if (r.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in r)
          r.innerHTML = i;
        else {
          for (
            eo = eo || document.createElement("div"),
              eo.innerHTML = "<svg>" + i.valueOf().toString() + "</svg>",
              i = eo.firstChild;
            r.firstChild;

          )
            r.removeChild(r.firstChild);
          for (; i.firstChild; ) r.appendChild(i.firstChild);
        }
      });
    function U(r, i) {
      if (i) {
        var s = r.firstChild;
        if (s && s === r.lastChild && s.nodeType === 3) {
          s.nodeValue = i;
          return;
        }
      }
      r.textContent = i;
    }
    var H = {
        animationIterationCount: !0,
        aspectRatio: !0,
        borderImageOutset: !0,
        borderImageSlice: !0,
        borderImageWidth: !0,
        boxFlex: !0,
        boxFlexGroup: !0,
        boxOrdinalGroup: !0,
        columnCount: !0,
        columns: !0,
        flex: !0,
        flexGrow: !0,
        flexPositive: !0,
        flexShrink: !0,
        flexNegative: !0,
        flexOrder: !0,
        gridArea: !0,
        gridRow: !0,
        gridRowEnd: !0,
        gridRowSpan: !0,
        gridRowStart: !0,
        gridColumn: !0,
        gridColumnEnd: !0,
        gridColumnSpan: !0,
        gridColumnStart: !0,
        fontWeight: !0,
        lineClamp: !0,
        lineHeight: !0,
        opacity: !0,
        order: !0,
        orphans: !0,
        tabSize: !0,
        widows: !0,
        zIndex: !0,
        zoom: !0,
        fillOpacity: !0,
        floodOpacity: !0,
        stopOpacity: !0,
        strokeDasharray: !0,
        strokeDashoffset: !0,
        strokeMiterlimit: !0,
        strokeOpacity: !0,
        strokeWidth: !0,
      },
      le = ["Webkit", "ms", "Moz", "O"];
    Object.keys(H).forEach(function (r) {
      le.forEach(function (i) {
        (i = i + r.charAt(0).toUpperCase() + r.substring(1)), (H[i] = H[r]);
      });
    });
    function ae(r, i, s) {
      return i == null || typeof i == "boolean" || i === ""
        ? ""
        : s || typeof i != "number" || i === 0 || (H.hasOwnProperty(r) && H[r])
        ? ("" + i).trim()
        : i + "px";
    }
    function xe(r, i) {
      r = r.style;
      for (var s in i)
        if (i.hasOwnProperty(s)) {
          var p = s.indexOf("--") === 0,
            b = ae(s, i[s], p);
          s === "float" && (s = "cssFloat"),
            p ? r.setProperty(s, b) : (r[s] = b);
        }
    }
    var Ae = I(
      { menuitem: !0 },
      {
        area: !0,
        base: !0,
        br: !0,
        col: !0,
        embed: !0,
        hr: !0,
        img: !0,
        input: !0,
        keygen: !0,
        link: !0,
        meta: !0,
        param: !0,
        source: !0,
        track: !0,
        wbr: !0,
      }
    );
    function ye(r, i) {
      if (i) {
        if (Ae[r] && (i.children != null || i.dangerouslySetInnerHTML != null))
          throw Error(o(137, r));
        if (i.dangerouslySetInnerHTML != null) {
          if (i.children != null) throw Error(o(60));
          if (
            typeof i.dangerouslySetInnerHTML != "object" ||
            !("__html" in i.dangerouslySetInnerHTML)
          )
            throw Error(o(61));
        }
        if (i.style != null && typeof i.style != "object") throw Error(o(62));
      }
    }
    function fe(r, i) {
      if (r.indexOf("-") === -1) return typeof i.is == "string";
      switch (r) {
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
          return !1;
        default:
          return !0;
      }
    }
    var Me = null;
    function Re(r) {
      return (
        (r = r.target || r.srcElement || window),
        r.correspondingUseElement && (r = r.correspondingUseElement),
        r.nodeType === 3 ? r.parentNode : r
      );
    }
    var ut = null,
      Xe = null,
      Qe = null;
    function It(r) {
      if ((r = fu(r))) {
        if (typeof ut != "function") throw Error(o(280));
        var i = r.stateNode;
        i && ((i = os(i)), ut(r.stateNode, r.type, i));
      }
    }
    function Jr(r) {
      Xe ? (Qe ? Qe.push(r) : (Qe = [r])) : (Xe = r);
    }
    function to() {
      if (Xe) {
        var r = Xe,
          i = Qe;
        if (((Qe = Xe = null), It(r), i))
          for (r = 0; r < i.length; r++) It(i[r]);
      }
    }
    function Pn(r, i) {
      return r(i);
    }
    function nr() {}
    var Gr = !1;
    function ro(r, i, s) {
      if (Gr) return r(i, s);
      Gr = !0;
      try {
        return Pn(r, i, s);
      } finally {
        (Gr = !1), (Xe !== null || Qe !== null) && (nr(), to());
      }
    }
    function Ir(r, i) {
      var s = r.stateNode;
      if (s === null) return null;
      var p = os(s);
      if (p === null) return null;
      s = p[i];
      e: switch (i) {
        case "onClick":
        case "onClickCapture":
        case "onDoubleClick":
        case "onDoubleClickCapture":
        case "onMouseDown":
        case "onMouseDownCapture":
        case "onMouseMove":
        case "onMouseMoveCapture":
        case "onMouseUp":
        case "onMouseUpCapture":
        case "onMouseEnter":
          (p = !p.disabled) ||
            ((r = r.type),
            (p = !(
              r === "button" ||
              r === "input" ||
              r === "select" ||
              r === "textarea"
            ))),
            (r = !p);
          break e;
        default:
          r = !1;
      }
      if (r) return null;
      if (s && typeof s != "function") throw Error(o(231, i, typeof s));
      return s;
    }
    var En = !1;
    if (f)
      try {
        (or = {}),
          Object.defineProperty(or, "passive", {
            get: function () {
              En = !0;
            },
          }),
          window.addEventListener("test", or, or),
          window.removeEventListener("test", or, or);
      } catch {
        En = !1;
      }
    var or;
    function Ye(r, i, s, p, b, y, _, P, T) {
      var L = Array.prototype.slice.call(arguments, 3);
      try {
        i.apply(s, L);
      } catch (Q) {
        this.onError(Q);
      }
    }
    var dt = !1,
      ir = null,
      Zr = !1,
      mt = null,
      Fo = {
        onError: function (r) {
          (dt = !0), (ir = r);
        },
      };
    function Ci(r, i, s, p, b, y, _, P, T) {
      (dt = !1), (ir = null), Ye.apply(Fo, arguments);
    }
    function Wa(r, i, s, p, b, y, _, P, T) {
      if ((Ci.apply(this, arguments), dt)) {
        if (dt) {
          var L = ir;
          (dt = !1), (ir = null);
        } else throw Error(o(198));
        Zr || ((Zr = !0), (mt = L));
      }
    }
    function kn(r) {
      var i = r,
        s = r;
      if (r.alternate) for (; i.return; ) i = i.return;
      else {
        r = i;
        do (i = r), i.flags & 4098 && (s = i.return), (r = i.return);
        while (r);
      }
      return i.tag === 3 ? s : null;
    }
    function Al(r) {
      if (r.tag === 13) {
        var i = r.memoizedState;
        if (
          (i === null &&
            ((r = r.alternate), r !== null && (i = r.memoizedState)),
          i !== null)
        )
          return i.dehydrated;
      }
      return null;
    }
    function Il(r) {
      if (kn(r) !== r) throw Error(o(188));
    }
    function af(r) {
      var i = r.alternate;
      if (!i) {
        if (((i = kn(r)), i === null)) throw Error(o(188));
        return i !== r ? null : r;
      }
      for (var s = r, p = i; ; ) {
        var b = s.return;
        if (b === null) break;
        var y = b.alternate;
        if (y === null) {
          if (((p = b.return), p !== null)) {
            s = p;
            continue;
          }
          break;
        }
        if (b.child === y.child) {
          for (y = b.child; y; ) {
            if (y === s) return Il(b), r;
            if (y === p) return Il(b), i;
            y = y.sibling;
          }
          throw Error(o(188));
        }
        if (s.return !== p.return) (s = b), (p = y);
        else {
          for (var _ = !1, P = b.child; P; ) {
            if (P === s) {
              (_ = !0), (s = b), (p = y);
              break;
            }
            if (P === p) {
              (_ = !0), (p = b), (s = y);
              break;
            }
            P = P.sibling;
          }
          if (!_) {
            for (P = y.child; P; ) {
              if (P === s) {
                (_ = !0), (s = y), (p = b);
                break;
              }
              if (P === p) {
                (_ = !0), (p = y), (s = b);
                break;
              }
              P = P.sibling;
            }
            if (!_) throw Error(o(189));
          }
        }
        if (s.alternate !== p) throw Error(o(190));
      }
      if (s.tag !== 3) throw Error(o(188));
      return s.stateNode.current === s ? r : i;
    }
    function Tl(r) {
      return (r = af(r)), r !== null ? Ml(r) : null;
    }
    function Ml(r) {
      if (r.tag === 5 || r.tag === 6) return r;
      for (r = r.child; r !== null; ) {
        var i = Ml(r);
        if (i !== null) return i;
        r = r.sibling;
      }
      return null;
    }
    var Nl = n.unstable_scheduleCallback,
      Cl = n.unstable_cancelCallback,
      uf = n.unstable_shouldYield,
      lf = n.unstable_requestPaint,
      ot = n.unstable_now,
      sf = n.unstable_getCurrentPriorityLevel,
      qa = n.unstable_ImmediatePriority,
      zl = n.unstable_UserBlockingPriority,
      zi = n.unstable_NormalPriority,
      cf = n.unstable_LowPriority,
      Rl = n.unstable_IdlePriority,
      Ri = null,
      hr = null;
    function ff(r) {
      if (hr && typeof hr.onCommitFiberRoot == "function")
        try {
          hr.onCommitFiberRoot(Ri, r, void 0, (r.current.flags & 128) === 128);
        } catch {}
    }
    var ar = Math.clz32 ? Math.clz32 : vf,
      df = Math.log,
      pf = Math.LN2;
    function vf(r) {
      return (r >>>= 0), r === 0 ? 32 : (31 - ((df(r) / pf) | 0)) | 0;
    }
    var Li = 64,
      Bi = 4194304;
    function $o(r) {
      switch (r & -r) {
        case 1:
          return 1;
        case 2:
          return 2;
        case 4:
          return 4;
        case 8:
          return 8;
        case 16:
          return 16;
        case 32:
          return 32;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return r & 4194240;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          return r & 130023424;
        case 134217728:
          return 134217728;
        case 268435456:
          return 268435456;
        case 536870912:
          return 536870912;
        case 1073741824:
          return 1073741824;
        default:
          return r;
      }
    }
    function Di(r, i) {
      var s = r.pendingLanes;
      if (s === 0) return 0;
      var p = 0,
        b = r.suspendedLanes,
        y = r.pingedLanes,
        _ = s & 268435455;
      if (_ !== 0) {
        var P = _ & ~b;
        P !== 0 ? (p = $o(P)) : ((y &= _), y !== 0 && (p = $o(y)));
      } else (_ = s & ~b), _ !== 0 ? (p = $o(_)) : y !== 0 && (p = $o(y));
      if (p === 0) return 0;
      if (
        i !== 0 &&
        i !== p &&
        !(i & b) &&
        ((b = p & -p),
        (y = i & -i),
        b >= y || (b === 16 && (y & 4194240) !== 0))
      )
        return i;
      if ((p & 4 && (p |= s & 16), (i = r.entangledLanes), i !== 0))
        for (r = r.entanglements, i &= p; 0 < i; )
          (s = 31 - ar(i)), (b = 1 << s), (p |= r[s]), (i &= ~b);
      return p;
    }
    function hf(r, i) {
      switch (r) {
        case 1:
        case 2:
        case 4:
          return i + 250;
        case 8:
        case 16:
        case 32:
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return i + 5e3;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          return -1;
        case 134217728:
        case 268435456:
        case 536870912:
        case 1073741824:
          return -1;
        default:
          return -1;
      }
    }
    function mf(r, i) {
      for (
        var s = r.suspendedLanes,
          p = r.pingedLanes,
          b = r.expirationTimes,
          y = r.pendingLanes;
        0 < y;

      ) {
        var _ = 31 - ar(y),
          P = 1 << _,
          T = b[_];
        T === -1
          ? (!(P & s) || P & p) && (b[_] = hf(P, i))
          : T <= i && (r.expiredLanes |= P),
          (y &= ~P);
      }
    }
    function Ka(r) {
      return (
        (r = r.pendingLanes & -1073741825),
        r !== 0 ? r : r & 1073741824 ? 1073741824 : 0
      );
    }
    function Ll() {
      var r = Li;
      return (Li <<= 1), !(Li & 4194240) && (Li = 64), r;
    }
    function Ha(r) {
      for (var i = [], s = 0; 31 > s; s++) i.push(r);
      return i;
    }
    function Vo(r, i, s) {
      (r.pendingLanes |= i),
        i !== 536870912 && ((r.suspendedLanes = 0), (r.pingedLanes = 0)),
        (r = r.eventTimes),
        (i = 31 - ar(i)),
        (r[i] = s);
    }
    function bf(r, i) {
      var s = r.pendingLanes & ~i;
      (r.pendingLanes = i),
        (r.suspendedLanes = 0),
        (r.pingedLanes = 0),
        (r.expiredLanes &= i),
        (r.mutableReadLanes &= i),
        (r.entangledLanes &= i),
        (i = r.entanglements);
      var p = r.eventTimes;
      for (r = r.expirationTimes; 0 < s; ) {
        var b = 31 - ar(s),
          y = 1 << b;
        (i[b] = 0), (p[b] = -1), (r[b] = -1), (s &= ~y);
      }
    }
    function Xa(r, i) {
      var s = (r.entangledLanes |= i);
      for (r = r.entanglements; s; ) {
        var p = 31 - ar(s),
          b = 1 << p;
        (b & i) | (r[p] & i) && (r[p] |= i), (s &= ~b);
      }
    }
    var Ve = 0;
    function Bl(r) {
      return (
        (r &= -r), 1 < r ? (4 < r ? (r & 268435455 ? 16 : 536870912) : 4) : 1
      );
    }
    var Dl,
      Qa,
      Ul,
      Fl,
      $l,
      Ya = !1,
      Ui = [],
      en = null,
      tn = null,
      rn = null,
      Wo = new Map(),
      qo = new Map(),
      nn = [],
      yf =
        "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
          " "
        );
    function Vl(r, i) {
      switch (r) {
        case "focusin":
        case "focusout":
          en = null;
          break;
        case "dragenter":
        case "dragleave":
          tn = null;
          break;
        case "mouseover":
        case "mouseout":
          rn = null;
          break;
        case "pointerover":
        case "pointerout":
          Wo.delete(i.pointerId);
          break;
        case "gotpointercapture":
        case "lostpointercapture":
          qo.delete(i.pointerId);
      }
    }
    function Ko(r, i, s, p, b, y) {
      return r === null || r.nativeEvent !== y
        ? ((r = {
            blockedOn: i,
            domEventName: s,
            eventSystemFlags: p,
            nativeEvent: y,
            targetContainers: [b],
          }),
          i !== null && ((i = fu(i)), i !== null && Qa(i)),
          r)
        : ((r.eventSystemFlags |= p),
          (i = r.targetContainers),
          b !== null && i.indexOf(b) === -1 && i.push(b),
          r);
    }
    function gf(r, i, s, p, b) {
      switch (i) {
        case "focusin":
          return (en = Ko(en, r, i, s, p, b)), !0;
        case "dragenter":
          return (tn = Ko(tn, r, i, s, p, b)), !0;
        case "mouseover":
          return (rn = Ko(rn, r, i, s, p, b)), !0;
        case "pointerover":
          var y = b.pointerId;
          return Wo.set(y, Ko(Wo.get(y) || null, r, i, s, p, b)), !0;
        case "gotpointercapture":
          return (
            (y = b.pointerId),
            qo.set(y, Ko(qo.get(y) || null, r, i, s, p, b)),
            !0
          );
      }
      return !1;
    }
    function Wl(r) {
      var i = Qo(r.target);
      if (i !== null) {
        var s = kn(i);
        if (s !== null) {
          if (((i = s.tag), i === 13)) {
            if (((i = Al(s)), i !== null)) {
              (r.blockedOn = i),
                $l(r.priority, function () {
                  Ul(s);
                });
              return;
            }
          } else if (
            i === 3 &&
            s.stateNode.current.memoizedState.isDehydrated
          ) {
            r.blockedOn = s.tag === 3 ? s.stateNode.containerInfo : null;
            return;
          }
        }
      }
      r.blockedOn = null;
    }
    function Fi(r) {
      if (r.blockedOn !== null) return !1;
      for (var i = r.targetContainers; 0 < i.length; ) {
        var s = Ga(r.domEventName, r.eventSystemFlags, i[0], r.nativeEvent);
        if (s === null) {
          s = r.nativeEvent;
          var p = new s.constructor(s.type, s);
          (Me = p), s.target.dispatchEvent(p), (Me = null);
        } else return (i = fu(s)), i !== null && Qa(i), (r.blockedOn = s), !1;
        i.shift();
      }
      return !0;
    }
    function ql(r, i, s) {
      Fi(r) && s.delete(i);
    }
    function wf() {
      (Ya = !1),
        en !== null && Fi(en) && (en = null),
        tn !== null && Fi(tn) && (tn = null),
        rn !== null && Fi(rn) && (rn = null),
        Wo.forEach(ql),
        qo.forEach(ql);
    }
    function Ho(r, i) {
      r.blockedOn === i &&
        ((r.blockedOn = null),
        Ya ||
          ((Ya = !0),
          n.unstable_scheduleCallback(n.unstable_NormalPriority, wf)));
    }
    function Xo(r) {
      function i(b) {
        return Ho(b, r);
      }
      if (0 < Ui.length) {
        Ho(Ui[0], r);
        for (var s = 1; s < Ui.length; s++) {
          var p = Ui[s];
          p.blockedOn === r && (p.blockedOn = null);
        }
      }
      for (
        en !== null && Ho(en, r),
          tn !== null && Ho(tn, r),
          rn !== null && Ho(rn, r),
          Wo.forEach(i),
          qo.forEach(i),
          s = 0;
        s < nn.length;
        s++
      )
        (p = nn[s]), p.blockedOn === r && (p.blockedOn = null);
      for (; 0 < nn.length && ((s = nn[0]), s.blockedOn === null); )
        Wl(s), s.blockedOn === null && nn.shift();
    }
    var no = C.ReactCurrentBatchConfig,
      $i = !0;
    function _f(r, i, s, p) {
      var b = Ve,
        y = no.transition;
      no.transition = null;
      try {
        (Ve = 1), Ja(r, i, s, p);
      } finally {
        (Ve = b), (no.transition = y);
      }
    }
    function Of(r, i, s, p) {
      var b = Ve,
        y = no.transition;
      no.transition = null;
      try {
        (Ve = 4), Ja(r, i, s, p);
      } finally {
        (Ve = b), (no.transition = y);
      }
    }
    function Ja(r, i, s, p) {
      if ($i) {
        var b = Ga(r, i, s, p);
        if (b === null) Rf(r, i, p, Vi, s), Vl(r, p);
        else if (gf(b, r, i, s, p)) p.stopPropagation();
        else if ((Vl(r, p), i & 4 && -1 < yf.indexOf(r))) {
          for (; b !== null; ) {
            var y = fu(b);
            if (
              (y !== null && Dl(y),
              (y = Ga(r, i, s, p)),
              y === null && Rf(r, i, p, Vi, s),
              y === b)
            )
              break;
            b = y;
          }
          b !== null && p.stopPropagation();
        } else Rf(r, i, p, null, s);
      }
    }
    var Vi = null;
    function Ga(r, i, s, p) {
      if (((Vi = null), (r = Re(p)), (r = Qo(r)), r !== null))
        if (((i = kn(r)), i === null)) r = null;
        else if (((s = i.tag), s === 13)) {
          if (((r = Al(i)), r !== null)) return r;
          r = null;
        } else if (s === 3) {
          if (i.stateNode.current.memoizedState.isDehydrated)
            return i.tag === 3 ? i.stateNode.containerInfo : null;
          r = null;
        } else i !== r && (r = null);
      return (Vi = r), null;
    }
    function Kl(r) {
      switch (r) {
        case "cancel":
        case "click":
        case "close":
        case "contextmenu":
        case "copy":
        case "cut":
        case "auxclick":
        case "dblclick":
        case "dragend":
        case "dragstart":
        case "drop":
        case "focusin":
        case "focusout":
        case "input":
        case "invalid":
        case "keydown":
        case "keypress":
        case "keyup":
        case "mousedown":
        case "mouseup":
        case "paste":
        case "pause":
        case "play":
        case "pointercancel":
        case "pointerdown":
        case "pointerup":
        case "ratechange":
        case "reset":
        case "resize":
        case "seeked":
        case "submit":
        case "touchcancel":
        case "touchend":
        case "touchstart":
        case "volumechange":
        case "change":
        case "selectionchange":
        case "textInput":
        case "compositionstart":
        case "compositionend":
        case "compositionupdate":
        case "beforeblur":
        case "afterblur":
        case "beforeinput":
        case "blur":
        case "fullscreenchange":
        case "focus":
        case "hashchange":
        case "popstate":
        case "select":
        case "selectstart":
          return 1;
        case "drag":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "mousemove":
        case "mouseout":
        case "mouseover":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "scroll":
        case "toggle":
        case "touchmove":
        case "wheel":
        case "mouseenter":
        case "mouseleave":
        case "pointerenter":
        case "pointerleave":
          return 4;
        case "message":
          switch (sf()) {
            case qa:
              return 1;
            case zl:
              return 4;
            case zi:
            case cf:
              return 16;
            case Rl:
              return 536870912;
            default:
              return 16;
          }
        default:
          return 16;
      }
    }
    var on = null,
      Za = null,
      Tr = null;
    function jn() {
      if (Tr) return Tr;
      var r,
        i = Za,
        s = i.length,
        p,
        b = "value" in on ? on.value : on.textContent,
        y = b.length;
      for (r = 0; r < s && i[r] === b[r]; r++);
      var _ = s - r;
      for (p = 1; p <= _ && i[s - p] === b[y - p]; p++);
      return (Tr = b.slice(r, 1 < p ? 1 - p : void 0));
    }
    function Xt(r) {
      var i = r.keyCode;
      return (
        "charCode" in r
          ? ((r = r.charCode), r === 0 && i === 13 && (r = 13))
          : (r = i),
        r === 10 && (r = 13),
        32 <= r || r === 13 ? r : 0
      );
    }
    function mr() {
      return !0;
    }
    function hh() {
      return !1;
    }
    function ur(r) {
      function i(s, p, b, y, _) {
        (this._reactName = s),
          (this._targetInst = b),
          (this.type = p),
          (this.nativeEvent = y),
          (this.target = _),
          (this.currentTarget = null);
        for (var P in r)
          r.hasOwnProperty(P) && ((s = r[P]), (this[P] = s ? s(y) : y[P]));
        return (
          (this.isDefaultPrevented = (
            y.defaultPrevented != null
              ? y.defaultPrevented
              : y.returnValue === !1
          )
            ? mr
            : hh),
          (this.isPropagationStopped = hh),
          this
        );
      }
      return (
        I(i.prototype, {
          preventDefault: function () {
            this.defaultPrevented = !0;
            var s = this.nativeEvent;
            s &&
              (s.preventDefault
                ? s.preventDefault()
                : typeof s.returnValue != "unknown" && (s.returnValue = !1),
              (this.isDefaultPrevented = mr));
          },
          stopPropagation: function () {
            var s = this.nativeEvent;
            s &&
              (s.stopPropagation
                ? s.stopPropagation()
                : typeof s.cancelBubble != "unknown" && (s.cancelBubble = !0),
              (this.isPropagationStopped = mr));
          },
          persist: function () {},
          isPersistent: mr,
        }),
        i
      );
    }
    var Wi = {
        eventPhase: 0,
        bubbles: 0,
        cancelable: 0,
        timeStamp: function (r) {
          return r.timeStamp || Date.now();
        },
        defaultPrevented: 0,
        isTrusted: 0,
      },
      xf = ur(Wi),
      eu = I({}, Wi, { view: 0, detail: 0 }),
      rO = ur(eu),
      Sf,
      Pf,
      tu,
      Hl = I({}, eu, {
        screenX: 0,
        screenY: 0,
        clientX: 0,
        clientY: 0,
        pageX: 0,
        pageY: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        getModifierState: kf,
        button: 0,
        buttons: 0,
        relatedTarget: function (r) {
          return r.relatedTarget === void 0
            ? r.fromElement === r.srcElement
              ? r.toElement
              : r.fromElement
            : r.relatedTarget;
        },
        movementX: function (r) {
          return "movementX" in r
            ? r.movementX
            : (r !== tu &&
                (tu && r.type === "mousemove"
                  ? ((Sf = r.screenX - tu.screenX),
                    (Pf = r.screenY - tu.screenY))
                  : (Pf = Sf = 0),
                (tu = r)),
              Sf);
        },
        movementY: function (r) {
          return "movementY" in r ? r.movementY : Pf;
        },
      }),
      mh = ur(Hl),
      nO = I({}, Hl, { dataTransfer: 0 }),
      oO = ur(nO),
      iO = I({}, eu, { relatedTarget: 0 }),
      Ef = ur(iO),
      aO = I({}, Wi, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
      uO = ur(aO),
      lO = I({}, Wi, {
        clipboardData: function (r) {
          return "clipboardData" in r ? r.clipboardData : window.clipboardData;
        },
      }),
      sO = ur(lO),
      cO = I({}, Wi, { data: 0 }),
      bh = ur(cO),
      fO = {
        Esc: "Escape",
        Spacebar: " ",
        Left: "ArrowLeft",
        Up: "ArrowUp",
        Right: "ArrowRight",
        Down: "ArrowDown",
        Del: "Delete",
        Win: "OS",
        Menu: "ContextMenu",
        Apps: "ContextMenu",
        Scroll: "ScrollLock",
        MozPrintableKey: "Unidentified",
      },
      dO = {
        8: "Backspace",
        9: "Tab",
        12: "Clear",
        13: "Enter",
        16: "Shift",
        17: "Control",
        18: "Alt",
        19: "Pause",
        20: "CapsLock",
        27: "Escape",
        32: " ",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "ArrowLeft",
        38: "ArrowUp",
        39: "ArrowRight",
        40: "ArrowDown",
        45: "Insert",
        46: "Delete",
        112: "F1",
        113: "F2",
        114: "F3",
        115: "F4",
        116: "F5",
        117: "F6",
        118: "F7",
        119: "F8",
        120: "F9",
        121: "F10",
        122: "F11",
        123: "F12",
        144: "NumLock",
        145: "ScrollLock",
        224: "Meta",
      },
      pO = {
        Alt: "altKey",
        Control: "ctrlKey",
        Meta: "metaKey",
        Shift: "shiftKey",
      };
    function vO(r) {
      var i = this.nativeEvent;
      return i.getModifierState
        ? i.getModifierState(r)
        : (r = pO[r])
        ? !!i[r]
        : !1;
    }
    function kf() {
      return vO;
    }
    var hO = I({}, eu, {
        key: function (r) {
          if (r.key) {
            var i = fO[r.key] || r.key;
            if (i !== "Unidentified") return i;
          }
          return r.type === "keypress"
            ? ((r = Xt(r)), r === 13 ? "Enter" : String.fromCharCode(r))
            : r.type === "keydown" || r.type === "keyup"
            ? dO[r.keyCode] || "Unidentified"
            : "";
        },
        code: 0,
        location: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        repeat: 0,
        locale: 0,
        getModifierState: kf,
        charCode: function (r) {
          return r.type === "keypress" ? Xt(r) : 0;
        },
        keyCode: function (r) {
          return r.type === "keydown" || r.type === "keyup" ? r.keyCode : 0;
        },
        which: function (r) {
          return r.type === "keypress"
            ? Xt(r)
            : r.type === "keydown" || r.type === "keyup"
            ? r.keyCode
            : 0;
        },
      }),
      mO = ur(hO),
      bO = I({}, Hl, {
        pointerId: 0,
        width: 0,
        height: 0,
        pressure: 0,
        tangentialPressure: 0,
        tiltX: 0,
        tiltY: 0,
        twist: 0,
        pointerType: 0,
        isPrimary: 0,
      }),
      yh = ur(bO),
      yO = I({}, eu, {
        touches: 0,
        targetTouches: 0,
        changedTouches: 0,
        altKey: 0,
        metaKey: 0,
        ctrlKey: 0,
        shiftKey: 0,
        getModifierState: kf,
      }),
      gO = ur(yO),
      wO = I({}, Wi, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
      _O = ur(wO),
      OO = I({}, Hl, {
        deltaX: function (r) {
          return "deltaX" in r
            ? r.deltaX
            : "wheelDeltaX" in r
            ? -r.wheelDeltaX
            : 0;
        },
        deltaY: function (r) {
          return "deltaY" in r
            ? r.deltaY
            : "wheelDeltaY" in r
            ? -r.wheelDeltaY
            : "wheelDelta" in r
            ? -r.wheelDelta
            : 0;
        },
        deltaZ: 0,
        deltaMode: 0,
      }),
      xO = ur(OO),
      SO = [9, 13, 27, 32],
      jf = f && "CompositionEvent" in window,
      ru = null;
    f && "documentMode" in document && (ru = document.documentMode);
    var PO = f && "TextEvent" in window && !ru,
      gh = f && (!jf || (ru && 8 < ru && 11 >= ru)),
      wh = String.fromCharCode(32),
      _h = !1;
    function Oh(r, i) {
      switch (r) {
        case "keyup":
          return SO.indexOf(i.keyCode) !== -1;
        case "keydown":
          return i.keyCode !== 229;
        case "keypress":
        case "mousedown":
        case "focusout":
          return !0;
        default:
          return !1;
      }
    }
    function xh(r) {
      return (
        (r = r.detail), typeof r == "object" && "data" in r ? r.data : null
      );
    }
    var qi = !1;
    function EO(r, i) {
      switch (r) {
        case "compositionend":
          return xh(i);
        case "keypress":
          return i.which !== 32 ? null : ((_h = !0), wh);
        case "textInput":
          return (r = i.data), r === wh && _h ? null : r;
        default:
          return null;
      }
    }
    function kO(r, i) {
      if (qi)
        return r === "compositionend" || (!jf && Oh(r, i))
          ? ((r = jn()), (Tr = Za = on = null), (qi = !1), r)
          : null;
      switch (r) {
        case "paste":
          return null;
        case "keypress":
          if (
            !(i.ctrlKey || i.altKey || i.metaKey) ||
            (i.ctrlKey && i.altKey)
          ) {
            if (i.char && 1 < i.char.length) return i.char;
            if (i.which) return String.fromCharCode(i.which);
          }
          return null;
        case "compositionend":
          return gh && i.locale !== "ko" ? null : i.data;
        default:
          return null;
      }
    }
    var jO = {
      color: !0,
      date: !0,
      datetime: !0,
      "datetime-local": !0,
      email: !0,
      month: !0,
      number: !0,
      password: !0,
      range: !0,
      search: !0,
      tel: !0,
      text: !0,
      time: !0,
      url: !0,
      week: !0,
    };
    function Sh(r) {
      var i = r && r.nodeName && r.nodeName.toLowerCase();
      return i === "input" ? !!jO[r.type] : i === "textarea";
    }
    function Ph(r, i, s, p) {
      Jr(p),
        (i = ts(i, "onChange")),
        0 < i.length &&
          ((s = new xf("onChange", "change", null, s, p)),
          r.push({ event: s, listeners: i }));
    }
    var nu = null,
      ou = null;
    function AO(r) {
      Wh(r, 0);
    }
    function Xl(r) {
      var i = Yi(r);
      if (Bo(i)) return r;
    }
    function IO(r, i) {
      if (r === "change") return i;
    }
    var Eh = !1;
    f &&
      (f
        ? ((Ql = "oninput" in document),
          Ql ||
            ((If = document.createElement("div")),
            If.setAttribute("oninput", "return;"),
            (Ql = typeof If.oninput == "function")),
          (Af = Ql))
        : (Af = !1),
      (Eh = Af && (!document.documentMode || 9 < document.documentMode)));
    var Af, Ql, If;
    function kh() {
      nu && (nu.detachEvent("onpropertychange", jh), (ou = nu = null));
    }
    function jh(r) {
      if (r.propertyName === "value" && Xl(ou)) {
        var i = [];
        Ph(i, ou, r, Re(r)), ro(AO, i);
      }
    }
    function TO(r, i, s) {
      r === "focusin"
        ? (kh(), (nu = i), (ou = s), nu.attachEvent("onpropertychange", jh))
        : r === "focusout" && kh();
    }
    function MO(r) {
      if (r === "selectionchange" || r === "keyup" || r === "keydown")
        return Xl(ou);
    }
    function NO(r, i) {
      if (r === "click") return Xl(i);
    }
    function CO(r, i) {
      if (r === "input" || r === "change") return Xl(i);
    }
    function zO(r, i) {
      return (r === i && (r !== 0 || 1 / r === 1 / i)) || (r !== r && i !== i);
    }
    var Mr = typeof Object.is == "function" ? Object.is : zO;
    function iu(r, i) {
      if (Mr(r, i)) return !0;
      if (
        typeof r != "object" ||
        r === null ||
        typeof i != "object" ||
        i === null
      )
        return !1;
      var s = Object.keys(r),
        p = Object.keys(i);
      if (s.length !== p.length) return !1;
      for (p = 0; p < s.length; p++) {
        var b = s[p];
        if (!d.call(i, b) || !Mr(r[b], i[b])) return !1;
      }
      return !0;
    }
    function Ah(r) {
      for (; r && r.firstChild; ) r = r.firstChild;
      return r;
    }
    function Ih(r, i) {
      var s = Ah(r);
      r = 0;
      for (var p; s; ) {
        if (s.nodeType === 3) {
          if (((p = r + s.textContent.length), r <= i && p >= i))
            return { node: s, offset: i - r };
          r = p;
        }
        e: {
          for (; s; ) {
            if (s.nextSibling) {
              s = s.nextSibling;
              break e;
            }
            s = s.parentNode;
          }
          s = void 0;
        }
        s = Ah(s);
      }
    }
    function Th(r, i) {
      return r && i
        ? r === i
          ? !0
          : r && r.nodeType === 3
          ? !1
          : i && i.nodeType === 3
          ? Th(r, i.parentNode)
          : "contains" in r
          ? r.contains(i)
          : r.compareDocumentPosition
          ? !!(r.compareDocumentPosition(i) & 16)
          : !1
        : !1;
    }
    function Mh() {
      for (var r = window, i = Qr(); i instanceof r.HTMLIFrameElement; ) {
        try {
          var s = typeof i.contentWindow.location.href == "string";
        } catch {
          s = !1;
        }
        if (s) r = i.contentWindow;
        else break;
        i = Qr(r.document);
      }
      return i;
    }
    function Tf(r) {
      var i = r && r.nodeName && r.nodeName.toLowerCase();
      return (
        i &&
        ((i === "input" &&
          (r.type === "text" ||
            r.type === "search" ||
            r.type === "tel" ||
            r.type === "url" ||
            r.type === "password")) ||
          i === "textarea" ||
          r.contentEditable === "true")
      );
    }
    function RO(r) {
      var i = Mh(),
        s = r.focusedElem,
        p = r.selectionRange;
      if (
        i !== s &&
        s &&
        s.ownerDocument &&
        Th(s.ownerDocument.documentElement, s)
      ) {
        if (p !== null && Tf(s)) {
          if (
            ((i = p.start),
            (r = p.end),
            r === void 0 && (r = i),
            "selectionStart" in s)
          )
            (s.selectionStart = i),
              (s.selectionEnd = Math.min(r, s.value.length));
          else if (
            ((r =
              ((i = s.ownerDocument || document) && i.defaultView) || window),
            r.getSelection)
          ) {
            r = r.getSelection();
            var b = s.textContent.length,
              y = Math.min(p.start, b);
            (p = p.end === void 0 ? y : Math.min(p.end, b)),
              !r.extend && y > p && ((b = p), (p = y), (y = b)),
              (b = Ih(s, y));
            var _ = Ih(s, p);
            b &&
              _ &&
              (r.rangeCount !== 1 ||
                r.anchorNode !== b.node ||
                r.anchorOffset !== b.offset ||
                r.focusNode !== _.node ||
                r.focusOffset !== _.offset) &&
              ((i = i.createRange()),
              i.setStart(b.node, b.offset),
              r.removeAllRanges(),
              y > p
                ? (r.addRange(i), r.extend(_.node, _.offset))
                : (i.setEnd(_.node, _.offset), r.addRange(i)));
          }
        }
        for (i = [], r = s; (r = r.parentNode); )
          r.nodeType === 1 &&
            i.push({ element: r, left: r.scrollLeft, top: r.scrollTop });
        for (
          typeof s.focus == "function" && s.focus(), s = 0;
          s < i.length;
          s++
        )
          (r = i[s]),
            (r.element.scrollLeft = r.left),
            (r.element.scrollTop = r.top);
      }
    }
    var LO = f && "documentMode" in document && 11 >= document.documentMode,
      Ki = null,
      Mf = null,
      au = null,
      Nf = !1;
    function Nh(r, i, s) {
      var p =
        s.window === s ? s.document : s.nodeType === 9 ? s : s.ownerDocument;
      Nf ||
        Ki == null ||
        Ki !== Qr(p) ||
        ((p = Ki),
        "selectionStart" in p && Tf(p)
          ? (p = { start: p.selectionStart, end: p.selectionEnd })
          : ((p = (
              (p.ownerDocument && p.ownerDocument.defaultView) ||
              window
            ).getSelection()),
            (p = {
              anchorNode: p.anchorNode,
              anchorOffset: p.anchorOffset,
              focusNode: p.focusNode,
              focusOffset: p.focusOffset,
            })),
        (au && iu(au, p)) ||
          ((au = p),
          (p = ts(Mf, "onSelect")),
          0 < p.length &&
            ((i = new xf("onSelect", "select", null, i, s)),
            r.push({ event: i, listeners: p }),
            (i.target = Ki))));
    }
    function Yl(r, i) {
      var s = {};
      return (
        (s[r.toLowerCase()] = i.toLowerCase()),
        (s["Webkit" + r] = "webkit" + i),
        (s["Moz" + r] = "moz" + i),
        s
      );
    }
    var Hi = {
        animationend: Yl("Animation", "AnimationEnd"),
        animationiteration: Yl("Animation", "AnimationIteration"),
        animationstart: Yl("Animation", "AnimationStart"),
        transitionend: Yl("Transition", "TransitionEnd"),
      },
      Cf = {},
      Ch = {};
    f &&
      ((Ch = document.createElement("div").style),
      "AnimationEvent" in window ||
        (delete Hi.animationend.animation,
        delete Hi.animationiteration.animation,
        delete Hi.animationstart.animation),
      "TransitionEvent" in window || delete Hi.transitionend.transition);
    function Jl(r) {
      if (Cf[r]) return Cf[r];
      if (!Hi[r]) return r;
      var i = Hi[r],
        s;
      for (s in i) if (i.hasOwnProperty(s) && s in Ch) return (Cf[r] = i[s]);
      return r;
    }
    var zh = Jl("animationend"),
      Rh = Jl("animationiteration"),
      Lh = Jl("animationstart"),
      Bh = Jl("transitionend"),
      Dh = new Map(),
      Uh =
        "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
          " "
        );
    function oo(r, i) {
      Dh.set(r, i), l(i, [r]);
    }
    for (Zl = 0; Zl < Uh.length; Zl++)
      (Gl = Uh[Zl]),
        (Fh = Gl.toLowerCase()),
        ($h = Gl[0].toUpperCase() + Gl.slice(1)),
        oo(Fh, "on" + $h);
    var Gl, Fh, $h, Zl;
    oo(zh, "onAnimationEnd"),
      oo(Rh, "onAnimationIteration"),
      oo(Lh, "onAnimationStart"),
      oo("dblclick", "onDoubleClick"),
      oo("focusin", "onFocus"),
      oo("focusout", "onBlur"),
      oo(Bh, "onTransitionEnd"),
      c("onMouseEnter", ["mouseout", "mouseover"]),
      c("onMouseLeave", ["mouseout", "mouseover"]),
      c("onPointerEnter", ["pointerout", "pointerover"]),
      c("onPointerLeave", ["pointerout", "pointerover"]),
      l(
        "onChange",
        "change click focusin focusout input keydown keyup selectionchange".split(
          " "
        )
      ),
      l(
        "onSelect",
        "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
          " "
        )
      ),
      l("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
      l(
        "onCompositionEnd",
        "compositionend focusout keydown keypress keyup mousedown".split(" ")
      ),
      l(
        "onCompositionStart",
        "compositionstart focusout keydown keypress keyup mousedown".split(" ")
      ),
      l(
        "onCompositionUpdate",
        "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
      );
    var uu =
        "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
          " "
        ),
      BO = new Set(
        "cancel close invalid load scroll toggle".split(" ").concat(uu)
      );
    function Vh(r, i, s) {
      var p = r.type || "unknown-event";
      (r.currentTarget = s), Wa(p, i, void 0, r), (r.currentTarget = null);
    }
    function Wh(r, i) {
      i = (i & 4) !== 0;
      for (var s = 0; s < r.length; s++) {
        var p = r[s],
          b = p.event;
        p = p.listeners;
        e: {
          var y = void 0;
          if (i)
            for (var _ = p.length - 1; 0 <= _; _--) {
              var P = p[_],
                T = P.instance,
                L = P.currentTarget;
              if (((P = P.listener), T !== y && b.isPropagationStopped()))
                break e;
              Vh(b, P, L), (y = T);
            }
          else
            for (_ = 0; _ < p.length; _++) {
              if (
                ((P = p[_]),
                (T = P.instance),
                (L = P.currentTarget),
                (P = P.listener),
                T !== y && b.isPropagationStopped())
              )
                break e;
              Vh(b, P, L), (y = T);
            }
        }
      }
      if (Zr) throw ((r = mt), (Zr = !1), (mt = null), r);
    }
    function et(r, i) {
      var s = i[$f];
      s === void 0 && (s = i[$f] = new Set());
      var p = r + "__bubble";
      s.has(p) || (qh(i, r, 2, !1), s.add(p));
    }
    function zf(r, i, s) {
      var p = 0;
      i && (p |= 4), qh(s, r, p, i);
    }
    var es = "_reactListening" + Math.random().toString(36).slice(2);
    function lu(r) {
      if (!r[es]) {
        (r[es] = !0),
          a.forEach(function (s) {
            s !== "selectionchange" &&
              (BO.has(s) || zf(s, !1, r), zf(s, !0, r));
          });
        var i = r.nodeType === 9 ? r : r.ownerDocument;
        i === null || i[es] || ((i[es] = !0), zf("selectionchange", !1, i));
      }
    }
    function qh(r, i, s, p) {
      switch (Kl(i)) {
        case 1:
          var b = _f;
          break;
        case 4:
          b = Of;
          break;
        default:
          b = Ja;
      }
      (s = b.bind(null, i, s, r)),
        (b = void 0),
        !En ||
          (i !== "touchstart" && i !== "touchmove" && i !== "wheel") ||
          (b = !0),
        p
          ? b !== void 0
            ? r.addEventListener(i, s, { capture: !0, passive: b })
            : r.addEventListener(i, s, !0)
          : b !== void 0
          ? r.addEventListener(i, s, { passive: b })
          : r.addEventListener(i, s, !1);
    }
    function Rf(r, i, s, p, b) {
      var y = p;
      if (!(i & 1) && !(i & 2) && p !== null)
        e: for (;;) {
          if (p === null) return;
          var _ = p.tag;
          if (_ === 3 || _ === 4) {
            var P = p.stateNode.containerInfo;
            if (P === b || (P.nodeType === 8 && P.parentNode === b)) break;
            if (_ === 4)
              for (_ = p.return; _ !== null; ) {
                var T = _.tag;
                if (
                  (T === 3 || T === 4) &&
                  ((T = _.stateNode.containerInfo),
                  T === b || (T.nodeType === 8 && T.parentNode === b))
                )
                  return;
                _ = _.return;
              }
            for (; P !== null; ) {
              if (((_ = Qo(P)), _ === null)) return;
              if (((T = _.tag), T === 5 || T === 6)) {
                p = y = _;
                continue e;
              }
              P = P.parentNode;
            }
          }
          p = p.return;
        }
      ro(function () {
        var L = y,
          Q = Re(s),
          Y = [];
        e: {
          var X = Dh.get(r);
          if (X !== void 0) {
            var ne = xf,
              ue = r;
            switch (r) {
              case "keypress":
                if (Xt(s) === 0) break e;
              case "keydown":
              case "keyup":
                ne = mO;
                break;
              case "focusin":
                (ue = "focus"), (ne = Ef);
                break;
              case "focusout":
                (ue = "blur"), (ne = Ef);
                break;
              case "beforeblur":
              case "afterblur":
                ne = Ef;
                break;
              case "click":
                if (s.button === 2) break e;
              case "auxclick":
              case "dblclick":
              case "mousedown":
              case "mousemove":
              case "mouseup":
              case "mouseout":
              case "mouseover":
              case "contextmenu":
                ne = mh;
                break;
              case "drag":
              case "dragend":
              case "dragenter":
              case "dragexit":
              case "dragleave":
              case "dragover":
              case "dragstart":
              case "drop":
                ne = oO;
                break;
              case "touchcancel":
              case "touchend":
              case "touchmove":
              case "touchstart":
                ne = gO;
                break;
              case zh:
              case Rh:
              case Lh:
                ne = uO;
                break;
              case Bh:
                ne = _O;
                break;
              case "scroll":
                ne = rO;
                break;
              case "wheel":
                ne = xO;
                break;
              case "copy":
              case "cut":
              case "paste":
                ne = sO;
                break;
              case "gotpointercapture":
              case "lostpointercapture":
              case "pointercancel":
              case "pointerdown":
              case "pointermove":
              case "pointerout":
              case "pointerover":
              case "pointerup":
                ne = yh;
            }
            var se = (i & 4) !== 0,
              ct = !se && r === "scroll",
              z = se ? (X !== null ? X + "Capture" : null) : X;
            se = [];
            for (var N = L, R; N !== null; ) {
              R = N;
              var G = R.stateNode;
              if (
                (R.tag === 5 &&
                  G !== null &&
                  ((R = G),
                  z !== null &&
                    ((G = Ir(N, z)), G != null && se.push(su(N, G, R)))),
                ct)
              )
                break;
              N = N.return;
            }
            0 < se.length &&
              ((X = new ne(X, ue, null, s, Q)),
              Y.push({ event: X, listeners: se }));
          }
        }
        if (!(i & 7)) {
          e: {
            if (
              ((X = r === "mouseover" || r === "pointerover"),
              (ne = r === "mouseout" || r === "pointerout"),
              X &&
                s !== Me &&
                (ue = s.relatedTarget || s.fromElement) &&
                (Qo(ue) || ue[An]))
            )
              break e;
            if (
              (ne || X) &&
              ((X =
                Q.window === Q
                  ? Q
                  : (X = Q.ownerDocument)
                  ? X.defaultView || X.parentWindow
                  : window),
              ne
                ? ((ue = s.relatedTarget || s.toElement),
                  (ne = L),
                  (ue = ue ? Qo(ue) : null),
                  ue !== null &&
                    ((ct = kn(ue)),
                    ue !== ct || (ue.tag !== 5 && ue.tag !== 6)) &&
                    (ue = null))
                : ((ne = null), (ue = L)),
              ne !== ue)
            ) {
              if (
                ((se = mh),
                (G = "onMouseLeave"),
                (z = "onMouseEnter"),
                (N = "mouse"),
                (r === "pointerout" || r === "pointerover") &&
                  ((se = yh),
                  (G = "onPointerLeave"),
                  (z = "onPointerEnter"),
                  (N = "pointer")),
                (ct = ne == null ? X : Yi(ne)),
                (R = ue == null ? X : Yi(ue)),
                (X = new se(G, N + "leave", ne, s, Q)),
                (X.target = ct),
                (X.relatedTarget = R),
                (G = null),
                Qo(Q) === L &&
                  ((se = new se(z, N + "enter", ue, s, Q)),
                  (se.target = R),
                  (se.relatedTarget = ct),
                  (G = se)),
                (ct = G),
                ne && ue)
              )
                t: {
                  for (se = ne, z = ue, N = 0, R = se; R; R = Xi(R)) N++;
                  for (R = 0, G = z; G; G = Xi(G)) R++;
                  for (; 0 < N - R; ) (se = Xi(se)), N--;
                  for (; 0 < R - N; ) (z = Xi(z)), R--;
                  for (; N--; ) {
                    if (se === z || (z !== null && se === z.alternate)) break t;
                    (se = Xi(se)), (z = Xi(z));
                  }
                  se = null;
                }
              else se = null;
              ne !== null && Kh(Y, X, ne, se, !1),
                ue !== null && ct !== null && Kh(Y, ct, ue, se, !0);
            }
          }
          e: {
            if (
              ((X = L ? Yi(L) : window),
              (ne = X.nodeName && X.nodeName.toLowerCase()),
              ne === "select" || (ne === "input" && X.type === "file"))
            )
              var ve = IO;
            else if (Sh(X))
              if (Eh) ve = CO;
              else {
                ve = MO;
                var _e = TO;
              }
            else
              (ne = X.nodeName) &&
                ne.toLowerCase() === "input" &&
                (X.type === "checkbox" || X.type === "radio") &&
                (ve = NO);
            if (ve && (ve = ve(r, L))) {
              Ph(Y, ve, s, Q);
              break e;
            }
            _e && _e(r, X, L),
              r === "focusout" &&
                (_e = X._wrapperState) &&
                _e.controlled &&
                X.type === "number" &&
                Jn(X, "number", X.value);
          }
          switch (((_e = L ? Yi(L) : window), r)) {
            case "focusin":
              (Sh(_e) || _e.contentEditable === "true") &&
                ((Ki = _e), (Mf = L), (au = null));
              break;
            case "focusout":
              au = Mf = Ki = null;
              break;
            case "mousedown":
              Nf = !0;
              break;
            case "contextmenu":
            case "mouseup":
            case "dragend":
              (Nf = !1), Nh(Y, s, Q);
              break;
            case "selectionchange":
              if (LO) break;
            case "keydown":
            case "keyup":
              Nh(Y, s, Q);
          }
          var Oe;
          if (jf)
            e: {
              switch (r) {
                case "compositionstart":
                  var Pe = "onCompositionStart";
                  break e;
                case "compositionend":
                  Pe = "onCompositionEnd";
                  break e;
                case "compositionupdate":
                  Pe = "onCompositionUpdate";
                  break e;
              }
              Pe = void 0;
            }
          else
            qi
              ? Oh(r, s) && (Pe = "onCompositionEnd")
              : r === "keydown" &&
                s.keyCode === 229 &&
                (Pe = "onCompositionStart");
          Pe &&
            (gh &&
              s.locale !== "ko" &&
              (qi || Pe !== "onCompositionStart"
                ? Pe === "onCompositionEnd" && qi && (Oe = jn())
                : ((on = Q),
                  (Za = "value" in on ? on.value : on.textContent),
                  (qi = !0))),
            (_e = ts(L, Pe)),
            0 < _e.length &&
              ((Pe = new bh(Pe, r, null, s, Q)),
              Y.push({ event: Pe, listeners: _e }),
              Oe
                ? (Pe.data = Oe)
                : ((Oe = xh(s)), Oe !== null && (Pe.data = Oe)))),
            (Oe = PO ? EO(r, s) : kO(r, s)) &&
              ((L = ts(L, "onBeforeInput")),
              0 < L.length &&
                ((Q = new bh("onBeforeInput", "beforeinput", null, s, Q)),
                Y.push({ event: Q, listeners: L }),
                (Q.data = Oe)));
        }
        Wh(Y, i);
      });
    }
    function su(r, i, s) {
      return { instance: r, listener: i, currentTarget: s };
    }
    function ts(r, i) {
      for (var s = i + "Capture", p = []; r !== null; ) {
        var b = r,
          y = b.stateNode;
        b.tag === 5 &&
          y !== null &&
          ((b = y),
          (y = Ir(r, s)),
          y != null && p.unshift(su(r, y, b)),
          (y = Ir(r, i)),
          y != null && p.push(su(r, y, b))),
          (r = r.return);
      }
      return p;
    }
    function Xi(r) {
      if (r === null) return null;
      do r = r.return;
      while (r && r.tag !== 5);
      return r || null;
    }
    function Kh(r, i, s, p, b) {
      for (var y = i._reactName, _ = []; s !== null && s !== p; ) {
        var P = s,
          T = P.alternate,
          L = P.stateNode;
        if (T !== null && T === p) break;
        P.tag === 5 &&
          L !== null &&
          ((P = L),
          b
            ? ((T = Ir(s, y)), T != null && _.unshift(su(s, T, P)))
            : b || ((T = Ir(s, y)), T != null && _.push(su(s, T, P)))),
          (s = s.return);
      }
      _.length !== 0 && r.push({ event: i, listeners: _ });
    }
    var DO = /\r\n?/g,
      UO = /\u0000|\uFFFD/g;
    function Hh(r) {
      return (typeof r == "string" ? r : "" + r)
        .replace(
          DO,
          `
`
        )
        .replace(UO, "");
    }
    function rs(r, i, s) {
      if (((i = Hh(i)), Hh(r) !== i && s)) throw Error(o(425));
    }
    function ns() {}
    var Lf = null,
      Bf = null;
    function Df(r, i) {
      return (
        r === "textarea" ||
        r === "noscript" ||
        typeof i.children == "string" ||
        typeof i.children == "number" ||
        (typeof i.dangerouslySetInnerHTML == "object" &&
          i.dangerouslySetInnerHTML !== null &&
          i.dangerouslySetInnerHTML.__html != null)
      );
    }
    var Uf = typeof setTimeout == "function" ? setTimeout : void 0,
      FO = typeof clearTimeout == "function" ? clearTimeout : void 0,
      Xh = typeof Promise == "function" ? Promise : void 0,
      $O =
        typeof queueMicrotask == "function"
          ? queueMicrotask
          : typeof Xh < "u"
          ? function (r) {
              return Xh.resolve(null).then(r).catch(VO);
            }
          : Uf;
    function VO(r) {
      setTimeout(function () {
        throw r;
      });
    }
    function Ff(r, i) {
      var s = i,
        p = 0;
      do {
        var b = s.nextSibling;
        if ((r.removeChild(s), b && b.nodeType === 8))
          if (((s = b.data), s === "/$")) {
            if (p === 0) {
              r.removeChild(b), Xo(i);
              return;
            }
            p--;
          } else (s !== "$" && s !== "$?" && s !== "$!") || p++;
        s = b;
      } while (s);
      Xo(i);
    }
    function io(r) {
      for (; r != null; r = r.nextSibling) {
        var i = r.nodeType;
        if (i === 1 || i === 3) break;
        if (i === 8) {
          if (((i = r.data), i === "$" || i === "$!" || i === "$?")) break;
          if (i === "/$") return null;
        }
      }
      return r;
    }
    function Qh(r) {
      r = r.previousSibling;
      for (var i = 0; r; ) {
        if (r.nodeType === 8) {
          var s = r.data;
          if (s === "$" || s === "$!" || s === "$?") {
            if (i === 0) return r;
            i--;
          } else s === "/$" && i++;
        }
        r = r.previousSibling;
      }
      return null;
    }
    var Qi = Math.random().toString(36).slice(2),
      an = "__reactFiber$" + Qi,
      cu = "__reactProps$" + Qi,
      An = "__reactContainer$" + Qi,
      $f = "__reactEvents$" + Qi,
      WO = "__reactListeners$" + Qi,
      qO = "__reactHandles$" + Qi;
    function Qo(r) {
      var i = r[an];
      if (i) return i;
      for (var s = r.parentNode; s; ) {
        if ((i = s[An] || s[an])) {
          if (
            ((s = i.alternate),
            i.child !== null || (s !== null && s.child !== null))
          )
            for (r = Qh(r); r !== null; ) {
              if ((s = r[an])) return s;
              r = Qh(r);
            }
          return i;
        }
        (r = s), (s = r.parentNode);
      }
      return null;
    }
    function fu(r) {
      return (
        (r = r[an] || r[An]),
        !r || (r.tag !== 5 && r.tag !== 6 && r.tag !== 13 && r.tag !== 3)
          ? null
          : r
      );
    }
    function Yi(r) {
      if (r.tag === 5 || r.tag === 6) return r.stateNode;
      throw Error(o(33));
    }
    function os(r) {
      return r[cu] || null;
    }
    var Vf = [],
      Ji = -1;
    function ao(r) {
      return { current: r };
    }
    function tt(r) {
      0 > Ji || ((r.current = Vf[Ji]), (Vf[Ji] = null), Ji--);
    }
    function Je(r, i) {
      Ji++, (Vf[Ji] = r.current), (r.current = i);
    }
    var uo = {},
      Ct = ao(uo),
      Qt = ao(!1),
      Yo = uo;
    function Gi(r, i) {
      var s = r.type.contextTypes;
      if (!s) return uo;
      var p = r.stateNode;
      if (p && p.__reactInternalMemoizedUnmaskedChildContext === i)
        return p.__reactInternalMemoizedMaskedChildContext;
      var b = {},
        y;
      for (y in s) b[y] = i[y];
      return (
        p &&
          ((r = r.stateNode),
          (r.__reactInternalMemoizedUnmaskedChildContext = i),
          (r.__reactInternalMemoizedMaskedChildContext = b)),
        b
      );
    }
    function Yt(r) {
      return (r = r.childContextTypes), r != null;
    }
    function is() {
      tt(Qt), tt(Ct);
    }
    function Yh(r, i, s) {
      if (Ct.current !== uo) throw Error(o(168));
      Je(Ct, i), Je(Qt, s);
    }
    function Jh(r, i, s) {
      var p = r.stateNode;
      if (((i = i.childContextTypes), typeof p.getChildContext != "function"))
        return s;
      p = p.getChildContext();
      for (var b in p)
        if (!(b in i)) throw Error(o(108, He(r) || "Unknown", b));
      return I({}, s, p);
    }
    function as(r) {
      return (
        (r =
          ((r = r.stateNode) && r.__reactInternalMemoizedMergedChildContext) ||
          uo),
        (Yo = Ct.current),
        Je(Ct, r),
        Je(Qt, Qt.current),
        !0
      );
    }
    function Gh(r, i, s) {
      var p = r.stateNode;
      if (!p) throw Error(o(169));
      s
        ? ((r = Jh(r, i, Yo)),
          (p.__reactInternalMemoizedMergedChildContext = r),
          tt(Qt),
          tt(Ct),
          Je(Ct, r))
        : tt(Qt),
        Je(Qt, s);
    }
    var In = null,
      us = !1,
      Wf = !1;
    function Zh(r) {
      In === null ? (In = [r]) : In.push(r);
    }
    function KO(r) {
      (us = !0), Zh(r);
    }
    function lo() {
      if (!Wf && In !== null) {
        Wf = !0;
        var r = 0,
          i = Ve;
        try {
          var s = In;
          for (Ve = 1; r < s.length; r++) {
            var p = s[r];
            do p = p(!0);
            while (p !== null);
          }
          (In = null), (us = !1);
        } catch (b) {
          throw (In !== null && (In = In.slice(r + 1)), Nl(qa, lo), b);
        } finally {
          (Ve = i), (Wf = !1);
        }
      }
      return null;
    }
    var Zi = [],
      ea = 0,
      ls = null,
      ss = 0,
      br = [],
      yr = 0,
      Jo = null,
      Tn = 1,
      Mn = "";
    function Go(r, i) {
      (Zi[ea++] = ss), (Zi[ea++] = ls), (ls = r), (ss = i);
    }
    function em(r, i, s) {
      (br[yr++] = Tn), (br[yr++] = Mn), (br[yr++] = Jo), (Jo = r);
      var p = Tn;
      r = Mn;
      var b = 32 - ar(p) - 1;
      (p &= ~(1 << b)), (s += 1);
      var y = 32 - ar(i) + b;
      if (30 < y) {
        var _ = b - (b % 5);
        (y = (p & ((1 << _) - 1)).toString(32)),
          (p >>= _),
          (b -= _),
          (Tn = (1 << (32 - ar(i) + b)) | (s << b) | p),
          (Mn = y + r);
      } else (Tn = (1 << y) | (s << b) | p), (Mn = r);
    }
    function qf(r) {
      r.return !== null && (Go(r, 1), em(r, 1, 0));
    }
    function Kf(r) {
      for (; r === ls; )
        (ls = Zi[--ea]), (Zi[ea] = null), (ss = Zi[--ea]), (Zi[ea] = null);
      for (; r === Jo; )
        (Jo = br[--yr]),
          (br[yr] = null),
          (Mn = br[--yr]),
          (br[yr] = null),
          (Tn = br[--yr]),
          (br[yr] = null);
    }
    var lr = null,
      sr = null,
      nt = !1,
      Nr = null;
    function tm(r, i) {
      var s = Or(5, null, null, 0);
      (s.elementType = "DELETED"),
        (s.stateNode = i),
        (s.return = r),
        (i = r.deletions),
        i === null ? ((r.deletions = [s]), (r.flags |= 16)) : i.push(s);
    }
    function rm(r, i) {
      switch (r.tag) {
        case 5:
          var s = r.type;
          return (
            (i =
              i.nodeType !== 1 || s.toLowerCase() !== i.nodeName.toLowerCase()
                ? null
                : i),
            i !== null
              ? ((r.stateNode = i), (lr = r), (sr = io(i.firstChild)), !0)
              : !1
          );
        case 6:
          return (
            (i = r.pendingProps === "" || i.nodeType !== 3 ? null : i),
            i !== null ? ((r.stateNode = i), (lr = r), (sr = null), !0) : !1
          );
        case 13:
          return (
            (i = i.nodeType !== 8 ? null : i),
            i !== null
              ? ((s = Jo !== null ? { id: Tn, overflow: Mn } : null),
                (r.memoizedState = {
                  dehydrated: i,
                  treeContext: s,
                  retryLane: 1073741824,
                }),
                (s = Or(18, null, null, 0)),
                (s.stateNode = i),
                (s.return = r),
                (r.child = s),
                (lr = r),
                (sr = null),
                !0)
              : !1
          );
        default:
          return !1;
      }
    }
    function Hf(r) {
      return (r.mode & 1) !== 0 && (r.flags & 128) === 0;
    }
    function Xf(r) {
      if (nt) {
        var i = sr;
        if (i) {
          var s = i;
          if (!rm(r, i)) {
            if (Hf(r)) throw Error(o(418));
            i = io(s.nextSibling);
            var p = lr;
            i && rm(r, i)
              ? tm(p, s)
              : ((r.flags = (r.flags & -4097) | 2), (nt = !1), (lr = r));
          }
        } else {
          if (Hf(r)) throw Error(o(418));
          (r.flags = (r.flags & -4097) | 2), (nt = !1), (lr = r);
        }
      }
    }
    function nm(r) {
      for (
        r = r.return;
        r !== null && r.tag !== 5 && r.tag !== 3 && r.tag !== 13;

      )
        r = r.return;
      lr = r;
    }
    function cs(r) {
      if (r !== lr) return !1;
      if (!nt) return nm(r), (nt = !0), !1;
      var i;
      if (
        ((i = r.tag !== 3) &&
          !(i = r.tag !== 5) &&
          ((i = r.type),
          (i = i !== "head" && i !== "body" && !Df(r.type, r.memoizedProps))),
        i && (i = sr))
      ) {
        if (Hf(r)) throw (om(), Error(o(418)));
        for (; i; ) tm(r, i), (i = io(i.nextSibling));
      }
      if ((nm(r), r.tag === 13)) {
        if (((r = r.memoizedState), (r = r !== null ? r.dehydrated : null), !r))
          throw Error(o(317));
        e: {
          for (r = r.nextSibling, i = 0; r; ) {
            if (r.nodeType === 8) {
              var s = r.data;
              if (s === "/$") {
                if (i === 0) {
                  sr = io(r.nextSibling);
                  break e;
                }
                i--;
              } else (s !== "$" && s !== "$!" && s !== "$?") || i++;
            }
            r = r.nextSibling;
          }
          sr = null;
        }
      } else sr = lr ? io(r.stateNode.nextSibling) : null;
      return !0;
    }
    function om() {
      for (var r = sr; r; ) r = io(r.nextSibling);
    }
    function ta() {
      (sr = lr = null), (nt = !1);
    }
    function Qf(r) {
      Nr === null ? (Nr = [r]) : Nr.push(r);
    }
    var HO = C.ReactCurrentBatchConfig;
    function Cr(r, i) {
      if (r && r.defaultProps) {
        (i = I({}, i)), (r = r.defaultProps);
        for (var s in r) i[s] === void 0 && (i[s] = r[s]);
        return i;
      }
      return i;
    }
    var fs = ao(null),
      ds = null,
      ra = null,
      Yf = null;
    function Jf() {
      Yf = ra = ds = null;
    }
    function Gf(r) {
      var i = fs.current;
      tt(fs), (r._currentValue = i);
    }
    function Zf(r, i, s) {
      for (; r !== null; ) {
        var p = r.alternate;
        if (
          ((r.childLanes & i) !== i
            ? ((r.childLanes |= i), p !== null && (p.childLanes |= i))
            : p !== null && (p.childLanes & i) !== i && (p.childLanes |= i),
          r === s)
        )
          break;
        r = r.return;
      }
    }
    function na(r, i) {
      (ds = r),
        (Yf = ra = null),
        (r = r.dependencies),
        r !== null &&
          r.firstContext !== null &&
          (r.lanes & i && (Jt = !0), (r.firstContext = null));
    }
    function gr(r) {
      var i = r._currentValue;
      if (Yf !== r)
        if (((r = { context: r, memoizedValue: i, next: null }), ra === null)) {
          if (ds === null) throw Error(o(308));
          (ra = r), (ds.dependencies = { lanes: 0, firstContext: r });
        } else ra = ra.next = r;
      return i;
    }
    var Zo = null;
    function ed(r) {
      Zo === null ? (Zo = [r]) : Zo.push(r);
    }
    function im(r, i, s, p) {
      var b = i.interleaved;
      return (
        b === null ? ((s.next = s), ed(i)) : ((s.next = b.next), (b.next = s)),
        (i.interleaved = s),
        Nn(r, p)
      );
    }
    function Nn(r, i) {
      r.lanes |= i;
      var s = r.alternate;
      for (s !== null && (s.lanes |= i), s = r, r = r.return; r !== null; )
        (r.childLanes |= i),
          (s = r.alternate),
          s !== null && (s.childLanes |= i),
          (s = r),
          (r = r.return);
      return s.tag === 3 ? s.stateNode : null;
    }
    var so = !1;
    function td(r) {
      r.updateQueue = {
        baseState: r.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: { pending: null, interleaved: null, lanes: 0 },
        effects: null,
      };
    }
    function am(r, i) {
      (r = r.updateQueue),
        i.updateQueue === r &&
          (i.updateQueue = {
            baseState: r.baseState,
            firstBaseUpdate: r.firstBaseUpdate,
            lastBaseUpdate: r.lastBaseUpdate,
            shared: r.shared,
            effects: r.effects,
          });
    }
    function Cn(r, i) {
      return {
        eventTime: r,
        lane: i,
        tag: 0,
        payload: null,
        callback: null,
        next: null,
      };
    }
    function co(r, i, s) {
      var p = r.updateQueue;
      if (p === null) return null;
      if (((p = p.shared), Le & 2)) {
        var b = p.pending;
        return (
          b === null ? (i.next = i) : ((i.next = b.next), (b.next = i)),
          (p.pending = i),
          Nn(r, s)
        );
      }
      return (
        (b = p.interleaved),
        b === null ? ((i.next = i), ed(p)) : ((i.next = b.next), (b.next = i)),
        (p.interleaved = i),
        Nn(r, s)
      );
    }
    function ps(r, i, s) {
      if (
        ((i = i.updateQueue),
        i !== null && ((i = i.shared), (s & 4194240) !== 0))
      ) {
        var p = i.lanes;
        (p &= r.pendingLanes), (s |= p), (i.lanes = s), Xa(r, s);
      }
    }
    function um(r, i) {
      var s = r.updateQueue,
        p = r.alternate;
      if (p !== null && ((p = p.updateQueue), s === p)) {
        var b = null,
          y = null;
        if (((s = s.firstBaseUpdate), s !== null)) {
          do {
            var _ = {
              eventTime: s.eventTime,
              lane: s.lane,
              tag: s.tag,
              payload: s.payload,
              callback: s.callback,
              next: null,
            };
            y === null ? (b = y = _) : (y = y.next = _), (s = s.next);
          } while (s !== null);
          y === null ? (b = y = i) : (y = y.next = i);
        } else b = y = i;
        (s = {
          baseState: p.baseState,
          firstBaseUpdate: b,
          lastBaseUpdate: y,
          shared: p.shared,
          effects: p.effects,
        }),
          (r.updateQueue = s);
        return;
      }
      (r = s.lastBaseUpdate),
        r === null ? (s.firstBaseUpdate = i) : (r.next = i),
        (s.lastBaseUpdate = i);
    }
    function vs(r, i, s, p) {
      var b = r.updateQueue;
      so = !1;
      var y = b.firstBaseUpdate,
        _ = b.lastBaseUpdate,
        P = b.shared.pending;
      if (P !== null) {
        b.shared.pending = null;
        var T = P,
          L = T.next;
        (T.next = null), _ === null ? (y = L) : (_.next = L), (_ = T);
        var Q = r.alternate;
        Q !== null &&
          ((Q = Q.updateQueue),
          (P = Q.lastBaseUpdate),
          P !== _ &&
            (P === null ? (Q.firstBaseUpdate = L) : (P.next = L),
            (Q.lastBaseUpdate = T)));
      }
      if (y !== null) {
        var Y = b.baseState;
        (_ = 0), (Q = L = T = null), (P = y);
        do {
          var X = P.lane,
            ne = P.eventTime;
          if ((p & X) === X) {
            Q !== null &&
              (Q = Q.next =
                {
                  eventTime: ne,
                  lane: 0,
                  tag: P.tag,
                  payload: P.payload,
                  callback: P.callback,
                  next: null,
                });
            e: {
              var ue = r,
                se = P;
              switch (((X = i), (ne = s), se.tag)) {
                case 1:
                  if (((ue = se.payload), typeof ue == "function")) {
                    Y = ue.call(ne, Y, X);
                    break e;
                  }
                  Y = ue;
                  break e;
                case 3:
                  ue.flags = (ue.flags & -65537) | 128;
                case 0:
                  if (
                    ((ue = se.payload),
                    (X = typeof ue == "function" ? ue.call(ne, Y, X) : ue),
                    X == null)
                  )
                    break e;
                  Y = I({}, Y, X);
                  break e;
                case 2:
                  so = !0;
              }
            }
            P.callback !== null &&
              P.lane !== 0 &&
              ((r.flags |= 64),
              (X = b.effects),
              X === null ? (b.effects = [P]) : X.push(P));
          } else
            (ne = {
              eventTime: ne,
              lane: X,
              tag: P.tag,
              payload: P.payload,
              callback: P.callback,
              next: null,
            }),
              Q === null ? ((L = Q = ne), (T = Y)) : (Q = Q.next = ne),
              (_ |= X);
          if (((P = P.next), P === null)) {
            if (((P = b.shared.pending), P === null)) break;
            (X = P),
              (P = X.next),
              (X.next = null),
              (b.lastBaseUpdate = X),
              (b.shared.pending = null);
          }
        } while (1);
        if (
          (Q === null && (T = Y),
          (b.baseState = T),
          (b.firstBaseUpdate = L),
          (b.lastBaseUpdate = Q),
          (i = b.shared.interleaved),
          i !== null)
        ) {
          b = i;
          do (_ |= b.lane), (b = b.next);
          while (b !== i);
        } else y === null && (b.shared.lanes = 0);
        (ri |= _), (r.lanes = _), (r.memoizedState = Y);
      }
    }
    function lm(r, i, s) {
      if (((r = i.effects), (i.effects = null), r !== null))
        for (i = 0; i < r.length; i++) {
          var p = r[i],
            b = p.callback;
          if (b !== null) {
            if (((p.callback = null), (p = s), typeof b != "function"))
              throw Error(o(191, b));
            b.call(p);
          }
        }
    }
    var sm = new t.Component().refs;
    function rd(r, i, s, p) {
      (i = r.memoizedState),
        (s = s(p, i)),
        (s = s == null ? i : I({}, i, s)),
        (r.memoizedState = s),
        r.lanes === 0 && (r.updateQueue.baseState = s);
    }
    var hs = {
      isMounted: function (r) {
        return (r = r._reactInternals) ? kn(r) === r : !1;
      },
      enqueueSetState: function (r, i, s) {
        r = r._reactInternals;
        var p = Vt(),
          b = ho(r),
          y = Cn(p, b);
        (y.payload = i),
          s != null && (y.callback = s),
          (i = co(r, y, b)),
          i !== null && (Lr(i, r, b, p), ps(i, r, b));
      },
      enqueueReplaceState: function (r, i, s) {
        r = r._reactInternals;
        var p = Vt(),
          b = ho(r),
          y = Cn(p, b);
        (y.tag = 1),
          (y.payload = i),
          s != null && (y.callback = s),
          (i = co(r, y, b)),
          i !== null && (Lr(i, r, b, p), ps(i, r, b));
      },
      enqueueForceUpdate: function (r, i) {
        r = r._reactInternals;
        var s = Vt(),
          p = ho(r),
          b = Cn(s, p);
        (b.tag = 2),
          i != null && (b.callback = i),
          (i = co(r, b, p)),
          i !== null && (Lr(i, r, p, s), ps(i, r, p));
      },
    };
    function cm(r, i, s, p, b, y, _) {
      return (
        (r = r.stateNode),
        typeof r.shouldComponentUpdate == "function"
          ? r.shouldComponentUpdate(p, y, _)
          : i.prototype && i.prototype.isPureReactComponent
          ? !iu(s, p) || !iu(b, y)
          : !0
      );
    }
    function fm(r, i, s) {
      var p = !1,
        b = uo,
        y = i.contextType;
      return (
        typeof y == "object" && y !== null
          ? (y = gr(y))
          : ((b = Yt(i) ? Yo : Ct.current),
            (p = i.contextTypes),
            (y = (p = p != null) ? Gi(r, b) : uo)),
        (i = new i(s, y)),
        (r.memoizedState =
          i.state !== null && i.state !== void 0 ? i.state : null),
        (i.updater = hs),
        (r.stateNode = i),
        (i._reactInternals = r),
        p &&
          ((r = r.stateNode),
          (r.__reactInternalMemoizedUnmaskedChildContext = b),
          (r.__reactInternalMemoizedMaskedChildContext = y)),
        i
      );
    }
    function dm(r, i, s, p) {
      (r = i.state),
        typeof i.componentWillReceiveProps == "function" &&
          i.componentWillReceiveProps(s, p),
        typeof i.UNSAFE_componentWillReceiveProps == "function" &&
          i.UNSAFE_componentWillReceiveProps(s, p),
        i.state !== r && hs.enqueueReplaceState(i, i.state, null);
    }
    function nd(r, i, s, p) {
      var b = r.stateNode;
      (b.props = s), (b.state = r.memoizedState), (b.refs = sm), td(r);
      var y = i.contextType;
      typeof y == "object" && y !== null
        ? (b.context = gr(y))
        : ((y = Yt(i) ? Yo : Ct.current), (b.context = Gi(r, y))),
        (b.state = r.memoizedState),
        (y = i.getDerivedStateFromProps),
        typeof y == "function" && (rd(r, i, y, s), (b.state = r.memoizedState)),
        typeof i.getDerivedStateFromProps == "function" ||
          typeof b.getSnapshotBeforeUpdate == "function" ||
          (typeof b.UNSAFE_componentWillMount != "function" &&
            typeof b.componentWillMount != "function") ||
          ((i = b.state),
          typeof b.componentWillMount == "function" && b.componentWillMount(),
          typeof b.UNSAFE_componentWillMount == "function" &&
            b.UNSAFE_componentWillMount(),
          i !== b.state && hs.enqueueReplaceState(b, b.state, null),
          vs(r, s, b, p),
          (b.state = r.memoizedState)),
        typeof b.componentDidMount == "function" && (r.flags |= 4194308);
    }
    function du(r, i, s) {
      if (
        ((r = s.ref),
        r !== null && typeof r != "function" && typeof r != "object")
      ) {
        if (s._owner) {
          if (((s = s._owner), s)) {
            if (s.tag !== 1) throw Error(o(309));
            var p = s.stateNode;
          }
          if (!p) throw Error(o(147, r));
          var b = p,
            y = "" + r;
          return i !== null &&
            i.ref !== null &&
            typeof i.ref == "function" &&
            i.ref._stringRef === y
            ? i.ref
            : ((i = function (_) {
                var P = b.refs;
                P === sm && (P = b.refs = {}),
                  _ === null ? delete P[y] : (P[y] = _);
              }),
              (i._stringRef = y),
              i);
        }
        if (typeof r != "string") throw Error(o(284));
        if (!s._owner) throw Error(o(290, r));
      }
      return r;
    }
    function ms(r, i) {
      throw (
        ((r = Object.prototype.toString.call(i)),
        Error(
          o(
            31,
            r === "[object Object]"
              ? "object with keys {" + Object.keys(i).join(", ") + "}"
              : r
          )
        ))
      );
    }
    function pm(r) {
      var i = r._init;
      return i(r._payload);
    }
    function vm(r) {
      function i(z, N) {
        if (r) {
          var R = z.deletions;
          R === null ? ((z.deletions = [N]), (z.flags |= 16)) : R.push(N);
        }
      }
      function s(z, N) {
        if (!r) return null;
        for (; N !== null; ) i(z, N), (N = N.sibling);
        return null;
      }
      function p(z, N) {
        for (z = new Map(); N !== null; )
          N.key !== null ? z.set(N.key, N) : z.set(N.index, N), (N = N.sibling);
        return z;
      }
      function b(z, N) {
        return (z = bo(z, N)), (z.index = 0), (z.sibling = null), z;
      }
      function y(z, N, R) {
        return (
          (z.index = R),
          r
            ? ((R = z.alternate),
              R !== null
                ? ((R = R.index), R < N ? ((z.flags |= 2), N) : R)
                : ((z.flags |= 2), N))
            : ((z.flags |= 1048576), N)
        );
      }
      function _(z) {
        return r && z.alternate === null && (z.flags |= 2), z;
      }
      function P(z, N, R, G) {
        return N === null || N.tag !== 6
          ? ((N = Dd(R, z.mode, G)), (N.return = z), N)
          : ((N = b(N, R)), (N.return = z), N);
      }
      function T(z, N, R, G) {
        var ve = R.type;
        return ve === $
          ? Q(z, N, R.props.children, G, R.key)
          : N !== null &&
            (N.elementType === ve ||
              (typeof ve == "object" &&
                ve !== null &&
                ve.$$typeof === ce &&
                pm(ve) === N.type))
          ? ((G = b(N, R.props)), (G.ref = du(z, N, R)), (G.return = z), G)
          : ((G = zs(R.type, R.key, R.props, null, z.mode, G)),
            (G.ref = du(z, N, R)),
            (G.return = z),
            G);
      }
      function L(z, N, R, G) {
        return N === null ||
          N.tag !== 4 ||
          N.stateNode.containerInfo !== R.containerInfo ||
          N.stateNode.implementation !== R.implementation
          ? ((N = Ud(R, z.mode, G)), (N.return = z), N)
          : ((N = b(N, R.children || [])), (N.return = z), N);
      }
      function Q(z, N, R, G, ve) {
        return N === null || N.tag !== 7
          ? ((N = ai(R, z.mode, G, ve)), (N.return = z), N)
          : ((N = b(N, R)), (N.return = z), N);
      }
      function Y(z, N, R) {
        if ((typeof N == "string" && N !== "") || typeof N == "number")
          return (N = Dd("" + N, z.mode, R)), (N.return = z), N;
        if (typeof N == "object" && N !== null) {
          switch (N.$$typeof) {
            case D:
              return (
                (R = zs(N.type, N.key, N.props, null, z.mode, R)),
                (R.ref = du(z, null, N)),
                (R.return = z),
                R
              );
            case W:
              return (N = Ud(N, z.mode, R)), (N.return = z), N;
            case ce:
              var G = N._init;
              return Y(z, G(N._payload), R);
          }
          if (Sn(N) || me(N))
            return (N = ai(N, z.mode, R, null)), (N.return = z), N;
          ms(z, N);
        }
        return null;
      }
      function X(z, N, R, G) {
        var ve = N !== null ? N.key : null;
        if ((typeof R == "string" && R !== "") || typeof R == "number")
          return ve !== null ? null : P(z, N, "" + R, G);
        if (typeof R == "object" && R !== null) {
          switch (R.$$typeof) {
            case D:
              return R.key === ve ? T(z, N, R, G) : null;
            case W:
              return R.key === ve ? L(z, N, R, G) : null;
            case ce:
              return (ve = R._init), X(z, N, ve(R._payload), G);
          }
          if (Sn(R) || me(R)) return ve !== null ? null : Q(z, N, R, G, null);
          ms(z, R);
        }
        return null;
      }
      function ne(z, N, R, G, ve) {
        if ((typeof G == "string" && G !== "") || typeof G == "number")
          return (z = z.get(R) || null), P(N, z, "" + G, ve);
        if (typeof G == "object" && G !== null) {
          switch (G.$$typeof) {
            case D:
              return (
                (z = z.get(G.key === null ? R : G.key) || null), T(N, z, G, ve)
              );
            case W:
              return (
                (z = z.get(G.key === null ? R : G.key) || null), L(N, z, G, ve)
              );
            case ce:
              var _e = G._init;
              return ne(z, N, R, _e(G._payload), ve);
          }
          if (Sn(G) || me(G))
            return (z = z.get(R) || null), Q(N, z, G, ve, null);
          ms(N, G);
        }
        return null;
      }
      function ue(z, N, R, G) {
        for (
          var ve = null, _e = null, Oe = N, Pe = (N = 0), Pt = null;
          Oe !== null && Pe < R.length;
          Pe++
        ) {
          Oe.index > Pe ? ((Pt = Oe), (Oe = null)) : (Pt = Oe.sibling);
          var De = X(z, Oe, R[Pe], G);
          if (De === null) {
            Oe === null && (Oe = Pt);
            break;
          }
          r && Oe && De.alternate === null && i(z, Oe),
            (N = y(De, N, Pe)),
            _e === null ? (ve = De) : (_e.sibling = De),
            (_e = De),
            (Oe = Pt);
        }
        if (Pe === R.length) return s(z, Oe), nt && Go(z, Pe), ve;
        if (Oe === null) {
          for (; Pe < R.length; Pe++)
            (Oe = Y(z, R[Pe], G)),
              Oe !== null &&
                ((N = y(Oe, N, Pe)),
                _e === null ? (ve = Oe) : (_e.sibling = Oe),
                (_e = Oe));
          return nt && Go(z, Pe), ve;
        }
        for (Oe = p(z, Oe); Pe < R.length; Pe++)
          (Pt = ne(Oe, z, Pe, R[Pe], G)),
            Pt !== null &&
              (r &&
                Pt.alternate !== null &&
                Oe.delete(Pt.key === null ? Pe : Pt.key),
              (N = y(Pt, N, Pe)),
              _e === null ? (ve = Pt) : (_e.sibling = Pt),
              (_e = Pt));
        return (
          r &&
            Oe.forEach(function (yo) {
              return i(z, yo);
            }),
          nt && Go(z, Pe),
          ve
        );
      }
      function se(z, N, R, G) {
        var ve = me(R);
        if (typeof ve != "function") throw Error(o(150));
        if (((R = ve.call(R)), R == null)) throw Error(o(151));
        for (
          var _e = (ve = null), Oe = N, Pe = (N = 0), Pt = null, De = R.next();
          Oe !== null && !De.done;
          Pe++, De = R.next()
        ) {
          Oe.index > Pe ? ((Pt = Oe), (Oe = null)) : (Pt = Oe.sibling);
          var yo = X(z, Oe, De.value, G);
          if (yo === null) {
            Oe === null && (Oe = Pt);
            break;
          }
          r && Oe && yo.alternate === null && i(z, Oe),
            (N = y(yo, N, Pe)),
            _e === null ? (ve = yo) : (_e.sibling = yo),
            (_e = yo),
            (Oe = Pt);
        }
        if (De.done) return s(z, Oe), nt && Go(z, Pe), ve;
        if (Oe === null) {
          for (; !De.done; Pe++, De = R.next())
            (De = Y(z, De.value, G)),
              De !== null &&
                ((N = y(De, N, Pe)),
                _e === null ? (ve = De) : (_e.sibling = De),
                (_e = De));
          return nt && Go(z, Pe), ve;
        }
        for (Oe = p(z, Oe); !De.done; Pe++, De = R.next())
          (De = ne(Oe, z, Pe, De.value, G)),
            De !== null &&
              (r &&
                De.alternate !== null &&
                Oe.delete(De.key === null ? Pe : De.key),
              (N = y(De, N, Pe)),
              _e === null ? (ve = De) : (_e.sibling = De),
              (_e = De));
        return (
          r &&
            Oe.forEach(function (Ex) {
              return i(z, Ex);
            }),
          nt && Go(z, Pe),
          ve
        );
      }
      function ct(z, N, R, G) {
        if (
          (typeof R == "object" &&
            R !== null &&
            R.type === $ &&
            R.key === null &&
            (R = R.props.children),
          typeof R == "object" && R !== null)
        ) {
          switch (R.$$typeof) {
            case D:
              e: {
                for (var ve = R.key, _e = N; _e !== null; ) {
                  if (_e.key === ve) {
                    if (((ve = R.type), ve === $)) {
                      if (_e.tag === 7) {
                        s(z, _e.sibling),
                          (N = b(_e, R.props.children)),
                          (N.return = z),
                          (z = N);
                        break e;
                      }
                    } else if (
                      _e.elementType === ve ||
                      (typeof ve == "object" &&
                        ve !== null &&
                        ve.$$typeof === ce &&
                        pm(ve) === _e.type)
                    ) {
                      s(z, _e.sibling),
                        (N = b(_e, R.props)),
                        (N.ref = du(z, _e, R)),
                        (N.return = z),
                        (z = N);
                      break e;
                    }
                    s(z, _e);
                    break;
                  } else i(z, _e);
                  _e = _e.sibling;
                }
                R.type === $
                  ? ((N = ai(R.props.children, z.mode, G, R.key)),
                    (N.return = z),
                    (z = N))
                  : ((G = zs(R.type, R.key, R.props, null, z.mode, G)),
                    (G.ref = du(z, N, R)),
                    (G.return = z),
                    (z = G));
              }
              return _(z);
            case W:
              e: {
                for (_e = R.key; N !== null; ) {
                  if (N.key === _e)
                    if (
                      N.tag === 4 &&
                      N.stateNode.containerInfo === R.containerInfo &&
                      N.stateNode.implementation === R.implementation
                    ) {
                      s(z, N.sibling),
                        (N = b(N, R.children || [])),
                        (N.return = z),
                        (z = N);
                      break e;
                    } else {
                      s(z, N);
                      break;
                    }
                  else i(z, N);
                  N = N.sibling;
                }
                (N = Ud(R, z.mode, G)), (N.return = z), (z = N);
              }
              return _(z);
            case ce:
              return (_e = R._init), ct(z, N, _e(R._payload), G);
          }
          if (Sn(R)) return ue(z, N, R, G);
          if (me(R)) return se(z, N, R, G);
          ms(z, R);
        }
        return (typeof R == "string" && R !== "") || typeof R == "number"
          ? ((R = "" + R),
            N !== null && N.tag === 6
              ? (s(z, N.sibling), (N = b(N, R)), (N.return = z), (z = N))
              : (s(z, N), (N = Dd(R, z.mode, G)), (N.return = z), (z = N)),
            _(z))
          : s(z, N);
      }
      return ct;
    }
    var oa = vm(!0),
      hm = vm(!1),
      pu = {},
      un = ao(pu),
      vu = ao(pu),
      hu = ao(pu);
    function ei(r) {
      if (r === pu) throw Error(o(174));
      return r;
    }
    function od(r, i) {
      switch ((Je(hu, i), Je(vu, r), Je(un, pu), (r = i.nodeType), r)) {
        case 9:
        case 11:
          i = (i = i.documentElement) ? i.namespaceURI : Zn(null, "");
          break;
        default:
          (r = r === 8 ? i.parentNode : i),
            (i = r.namespaceURI || null),
            (r = r.tagName),
            (i = Zn(i, r));
      }
      tt(un), Je(un, i);
    }
    function ia() {
      tt(un), tt(vu), tt(hu);
    }
    function mm(r) {
      ei(hu.current);
      var i = ei(un.current),
        s = Zn(i, r.type);
      i !== s && (Je(vu, r), Je(un, s));
    }
    function id(r) {
      vu.current === r && (tt(un), tt(vu));
    }
    var it = ao(0);
    function bs(r) {
      for (var i = r; i !== null; ) {
        if (i.tag === 13) {
          var s = i.memoizedState;
          if (
            s !== null &&
            ((s = s.dehydrated),
            s === null || s.data === "$?" || s.data === "$!")
          )
            return i;
        } else if (i.tag === 19 && i.memoizedProps.revealOrder !== void 0) {
          if (i.flags & 128) return i;
        } else if (i.child !== null) {
          (i.child.return = i), (i = i.child);
          continue;
        }
        if (i === r) break;
        for (; i.sibling === null; ) {
          if (i.return === null || i.return === r) return null;
          i = i.return;
        }
        (i.sibling.return = i.return), (i = i.sibling);
      }
      return null;
    }
    var ad = [];
    function ud() {
      for (var r = 0; r < ad.length; r++)
        ad[r]._workInProgressVersionPrimary = null;
      ad.length = 0;
    }
    var ys = C.ReactCurrentDispatcher,
      ld = C.ReactCurrentBatchConfig,
      ti = 0,
      at = null,
      bt = null,
      xt = null,
      gs = !1,
      mu = !1,
      bu = 0,
      XO = 0;
    function zt() {
      throw Error(o(321));
    }
    function sd(r, i) {
      if (i === null) return !1;
      for (var s = 0; s < i.length && s < r.length; s++)
        if (!Mr(r[s], i[s])) return !1;
      return !0;
    }
    function cd(r, i, s, p, b, y) {
      if (
        ((ti = y),
        (at = i),
        (i.memoizedState = null),
        (i.updateQueue = null),
        (i.lanes = 0),
        (ys.current = r === null || r.memoizedState === null ? GO : ZO),
        (r = s(p, b)),
        mu)
      ) {
        y = 0;
        do {
          if (((mu = !1), (bu = 0), 25 <= y)) throw Error(o(301));
          (y += 1),
            (xt = bt = null),
            (i.updateQueue = null),
            (ys.current = ex),
            (r = s(p, b));
        } while (mu);
      }
      if (
        ((ys.current = Os),
        (i = bt !== null && bt.next !== null),
        (ti = 0),
        (xt = bt = at = null),
        (gs = !1),
        i)
      )
        throw Error(o(300));
      return r;
    }
    function fd() {
      var r = bu !== 0;
      return (bu = 0), r;
    }
    function ln() {
      var r = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null,
      };
      return xt === null ? (at.memoizedState = xt = r) : (xt = xt.next = r), xt;
    }
    function wr() {
      if (bt === null) {
        var r = at.alternate;
        r = r !== null ? r.memoizedState : null;
      } else r = bt.next;
      var i = xt === null ? at.memoizedState : xt.next;
      if (i !== null) (xt = i), (bt = r);
      else {
        if (r === null) throw Error(o(310));
        (bt = r),
          (r = {
            memoizedState: bt.memoizedState,
            baseState: bt.baseState,
            baseQueue: bt.baseQueue,
            queue: bt.queue,
            next: null,
          }),
          xt === null ? (at.memoizedState = xt = r) : (xt = xt.next = r);
      }
      return xt;
    }
    function yu(r, i) {
      return typeof i == "function" ? i(r) : i;
    }
    function dd(r) {
      var i = wr(),
        s = i.queue;
      if (s === null) throw Error(o(311));
      s.lastRenderedReducer = r;
      var p = bt,
        b = p.baseQueue,
        y = s.pending;
      if (y !== null) {
        if (b !== null) {
          var _ = b.next;
          (b.next = y.next), (y.next = _);
        }
        (p.baseQueue = b = y), (s.pending = null);
      }
      if (b !== null) {
        (y = b.next), (p = p.baseState);
        var P = (_ = null),
          T = null,
          L = y;
        do {
          var Q = L.lane;
          if ((ti & Q) === Q)
            T !== null &&
              (T = T.next =
                {
                  lane: 0,
                  action: L.action,
                  hasEagerState: L.hasEagerState,
                  eagerState: L.eagerState,
                  next: null,
                }),
              (p = L.hasEagerState ? L.eagerState : r(p, L.action));
          else {
            var Y = {
              lane: Q,
              action: L.action,
              hasEagerState: L.hasEagerState,
              eagerState: L.eagerState,
              next: null,
            };
            T === null ? ((P = T = Y), (_ = p)) : (T = T.next = Y),
              (at.lanes |= Q),
              (ri |= Q);
          }
          L = L.next;
        } while (L !== null && L !== y);
        T === null ? (_ = p) : (T.next = P),
          Mr(p, i.memoizedState) || (Jt = !0),
          (i.memoizedState = p),
          (i.baseState = _),
          (i.baseQueue = T),
          (s.lastRenderedState = p);
      }
      if (((r = s.interleaved), r !== null)) {
        b = r;
        do (y = b.lane), (at.lanes |= y), (ri |= y), (b = b.next);
        while (b !== r);
      } else b === null && (s.lanes = 0);
      return [i.memoizedState, s.dispatch];
    }
    function pd(r) {
      var i = wr(),
        s = i.queue;
      if (s === null) throw Error(o(311));
      s.lastRenderedReducer = r;
      var p = s.dispatch,
        b = s.pending,
        y = i.memoizedState;
      if (b !== null) {
        s.pending = null;
        var _ = (b = b.next);
        do (y = r(y, _.action)), (_ = _.next);
        while (_ !== b);
        Mr(y, i.memoizedState) || (Jt = !0),
          (i.memoizedState = y),
          i.baseQueue === null && (i.baseState = y),
          (s.lastRenderedState = y);
      }
      return [y, p];
    }
    function bm() {}
    function ym(r, i) {
      var s = at,
        p = wr(),
        b = i(),
        y = !Mr(p.memoizedState, b);
      if (
        (y && ((p.memoizedState = b), (Jt = !0)),
        (p = p.queue),
        vd(_m.bind(null, s, p, r), [r]),
        p.getSnapshot !== i || y || (xt !== null && xt.memoizedState.tag & 1))
      ) {
        if (
          ((s.flags |= 2048),
          gu(9, wm.bind(null, s, p, b, i), void 0, null),
          St === null)
        )
          throw Error(o(349));
        ti & 30 || gm(s, i, b);
      }
      return b;
    }
    function gm(r, i, s) {
      (r.flags |= 16384),
        (r = { getSnapshot: i, value: s }),
        (i = at.updateQueue),
        i === null
          ? ((i = { lastEffect: null, stores: null }),
            (at.updateQueue = i),
            (i.stores = [r]))
          : ((s = i.stores), s === null ? (i.stores = [r]) : s.push(r));
    }
    function wm(r, i, s, p) {
      (i.value = s), (i.getSnapshot = p), Om(i) && xm(r);
    }
    function _m(r, i, s) {
      return s(function () {
        Om(i) && xm(r);
      });
    }
    function Om(r) {
      var i = r.getSnapshot;
      r = r.value;
      try {
        var s = i();
        return !Mr(r, s);
      } catch {
        return !0;
      }
    }
    function xm(r) {
      var i = Nn(r, 1);
      i !== null && Lr(i, r, 1, -1);
    }
    function Sm(r) {
      var i = ln();
      return (
        typeof r == "function" && (r = r()),
        (i.memoizedState = i.baseState = r),
        (r = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: yu,
          lastRenderedState: r,
        }),
        (i.queue = r),
        (r = r.dispatch = JO.bind(null, at, r)),
        [i.memoizedState, r]
      );
    }
    function gu(r, i, s, p) {
      return (
        (r = { tag: r, create: i, destroy: s, deps: p, next: null }),
        (i = at.updateQueue),
        i === null
          ? ((i = { lastEffect: null, stores: null }),
            (at.updateQueue = i),
            (i.lastEffect = r.next = r))
          : ((s = i.lastEffect),
            s === null
              ? (i.lastEffect = r.next = r)
              : ((p = s.next), (s.next = r), (r.next = p), (i.lastEffect = r))),
        r
      );
    }
    function Pm() {
      return wr().memoizedState;
    }
    function ws(r, i, s, p) {
      var b = ln();
      (at.flags |= r),
        (b.memoizedState = gu(1 | i, s, void 0, p === void 0 ? null : p));
    }
    function _s(r, i, s, p) {
      var b = wr();
      p = p === void 0 ? null : p;
      var y = void 0;
      if (bt !== null) {
        var _ = bt.memoizedState;
        if (((y = _.destroy), p !== null && sd(p, _.deps))) {
          b.memoizedState = gu(i, s, y, p);
          return;
        }
      }
      (at.flags |= r), (b.memoizedState = gu(1 | i, s, y, p));
    }
    function Em(r, i) {
      return ws(8390656, 8, r, i);
    }
    function vd(r, i) {
      return _s(2048, 8, r, i);
    }
    function km(r, i) {
      return _s(4, 2, r, i);
    }
    function jm(r, i) {
      return _s(4, 4, r, i);
    }
    function Am(r, i) {
      if (typeof i == "function")
        return (
          (r = r()),
          i(r),
          function () {
            i(null);
          }
        );
      if (i != null)
        return (
          (r = r()),
          (i.current = r),
          function () {
            i.current = null;
          }
        );
    }
    function Im(r, i, s) {
      return (
        (s = s != null ? s.concat([r]) : null), _s(4, 4, Am.bind(null, i, r), s)
      );
    }
    function hd() {}
    function Tm(r, i) {
      var s = wr();
      i = i === void 0 ? null : i;
      var p = s.memoizedState;
      return p !== null && i !== null && sd(i, p[1])
        ? p[0]
        : ((s.memoizedState = [r, i]), r);
    }
    function Mm(r, i) {
      var s = wr();
      i = i === void 0 ? null : i;
      var p = s.memoizedState;
      return p !== null && i !== null && sd(i, p[1])
        ? p[0]
        : ((r = r()), (s.memoizedState = [r, i]), r);
    }
    function Nm(r, i, s) {
      return ti & 21
        ? (Mr(s, i) ||
            ((s = Ll()), (at.lanes |= s), (ri |= s), (r.baseState = !0)),
          i)
        : (r.baseState && ((r.baseState = !1), (Jt = !0)),
          (r.memoizedState = s));
    }
    function QO(r, i) {
      var s = Ve;
      (Ve = s !== 0 && 4 > s ? s : 4), r(!0);
      var p = ld.transition;
      ld.transition = {};
      try {
        r(!1), i();
      } finally {
        (Ve = s), (ld.transition = p);
      }
    }
    function Cm() {
      return wr().memoizedState;
    }
    function YO(r, i, s) {
      var p = ho(r);
      if (
        ((s = {
          lane: p,
          action: s,
          hasEagerState: !1,
          eagerState: null,
          next: null,
        }),
        zm(r))
      )
        Rm(i, s);
      else if (((s = im(r, i, s, p)), s !== null)) {
        var b = Vt();
        Lr(s, r, p, b), Lm(s, i, p);
      }
    }
    function JO(r, i, s) {
      var p = ho(r),
        b = {
          lane: p,
          action: s,
          hasEagerState: !1,
          eagerState: null,
          next: null,
        };
      if (zm(r)) Rm(i, b);
      else {
        var y = r.alternate;
        if (
          r.lanes === 0 &&
          (y === null || y.lanes === 0) &&
          ((y = i.lastRenderedReducer), y !== null)
        )
          try {
            var _ = i.lastRenderedState,
              P = y(_, s);
            if (((b.hasEagerState = !0), (b.eagerState = P), Mr(P, _))) {
              var T = i.interleaved;
              T === null
                ? ((b.next = b), ed(i))
                : ((b.next = T.next), (T.next = b)),
                (i.interleaved = b);
              return;
            }
          } catch {
          } finally {
          }
        (s = im(r, i, b, p)),
          s !== null && ((b = Vt()), Lr(s, r, p, b), Lm(s, i, p));
      }
    }
    function zm(r) {
      var i = r.alternate;
      return r === at || (i !== null && i === at);
    }
    function Rm(r, i) {
      mu = gs = !0;
      var s = r.pending;
      s === null ? (i.next = i) : ((i.next = s.next), (s.next = i)),
        (r.pending = i);
    }
    function Lm(r, i, s) {
      if (s & 4194240) {
        var p = i.lanes;
        (p &= r.pendingLanes), (s |= p), (i.lanes = s), Xa(r, s);
      }
    }
    var Os = {
        readContext: gr,
        useCallback: zt,
        useContext: zt,
        useEffect: zt,
        useImperativeHandle: zt,
        useInsertionEffect: zt,
        useLayoutEffect: zt,
        useMemo: zt,
        useReducer: zt,
        useRef: zt,
        useState: zt,
        useDebugValue: zt,
        useDeferredValue: zt,
        useTransition: zt,
        useMutableSource: zt,
        useSyncExternalStore: zt,
        useId: zt,
        unstable_isNewReconciler: !1,
      },
      GO = {
        readContext: gr,
        useCallback: function (r, i) {
          return (ln().memoizedState = [r, i === void 0 ? null : i]), r;
        },
        useContext: gr,
        useEffect: Em,
        useImperativeHandle: function (r, i, s) {
          return (
            (s = s != null ? s.concat([r]) : null),
            ws(4194308, 4, Am.bind(null, i, r), s)
          );
        },
        useLayoutEffect: function (r, i) {
          return ws(4194308, 4, r, i);
        },
        useInsertionEffect: function (r, i) {
          return ws(4, 2, r, i);
        },
        useMemo: function (r, i) {
          var s = ln();
          return (
            (i = i === void 0 ? null : i),
            (r = r()),
            (s.memoizedState = [r, i]),
            r
          );
        },
        useReducer: function (r, i, s) {
          var p = ln();
          return (
            (i = s !== void 0 ? s(i) : i),
            (p.memoizedState = p.baseState = i),
            (r = {
              pending: null,
              interleaved: null,
              lanes: 0,
              dispatch: null,
              lastRenderedReducer: r,
              lastRenderedState: i,
            }),
            (p.queue = r),
            (r = r.dispatch = YO.bind(null, at, r)),
            [p.memoizedState, r]
          );
        },
        useRef: function (r) {
          var i = ln();
          return (r = { current: r }), (i.memoizedState = r);
        },
        useState: Sm,
        useDebugValue: hd,
        useDeferredValue: function (r) {
          return (ln().memoizedState = r);
        },
        useTransition: function () {
          var r = Sm(!1),
            i = r[0];
          return (r = QO.bind(null, r[1])), (ln().memoizedState = r), [i, r];
        },
        useMutableSource: function () {},
        useSyncExternalStore: function (r, i, s) {
          var p = at,
            b = ln();
          if (nt) {
            if (s === void 0) throw Error(o(407));
            s = s();
          } else {
            if (((s = i()), St === null)) throw Error(o(349));
            ti & 30 || gm(p, i, s);
          }
          b.memoizedState = s;
          var y = { value: s, getSnapshot: i };
          return (
            (b.queue = y),
            Em(_m.bind(null, p, y, r), [r]),
            (p.flags |= 2048),
            gu(9, wm.bind(null, p, y, s, i), void 0, null),
            s
          );
        },
        useId: function () {
          var r = ln(),
            i = St.identifierPrefix;
          if (nt) {
            var s = Mn,
              p = Tn;
            (s = (p & ~(1 << (32 - ar(p) - 1))).toString(32) + s),
              (i = ":" + i + "R" + s),
              (s = bu++),
              0 < s && (i += "H" + s.toString(32)),
              (i += ":");
          } else (s = XO++), (i = ":" + i + "r" + s.toString(32) + ":");
          return (r.memoizedState = i);
        },
        unstable_isNewReconciler: !1,
      },
      ZO = {
        readContext: gr,
        useCallback: Tm,
        useContext: gr,
        useEffect: vd,
        useImperativeHandle: Im,
        useInsertionEffect: km,
        useLayoutEffect: jm,
        useMemo: Mm,
        useReducer: dd,
        useRef: Pm,
        useState: function () {
          return dd(yu);
        },
        useDebugValue: hd,
        useDeferredValue: function (r) {
          var i = wr();
          return Nm(i, bt.memoizedState, r);
        },
        useTransition: function () {
          var r = dd(yu)[0],
            i = wr().memoizedState;
          return [r, i];
        },
        useMutableSource: bm,
        useSyncExternalStore: ym,
        useId: Cm,
        unstable_isNewReconciler: !1,
      },
      ex = {
        readContext: gr,
        useCallback: Tm,
        useContext: gr,
        useEffect: vd,
        useImperativeHandle: Im,
        useInsertionEffect: km,
        useLayoutEffect: jm,
        useMemo: Mm,
        useReducer: pd,
        useRef: Pm,
        useState: function () {
          return pd(yu);
        },
        useDebugValue: hd,
        useDeferredValue: function (r) {
          var i = wr();
          return bt === null
            ? (i.memoizedState = r)
            : Nm(i, bt.memoizedState, r);
        },
        useTransition: function () {
          var r = pd(yu)[0],
            i = wr().memoizedState;
          return [r, i];
        },
        useMutableSource: bm,
        useSyncExternalStore: ym,
        useId: Cm,
        unstable_isNewReconciler: !1,
      };
    function aa(r, i) {
      try {
        var s = "",
          p = i;
        do (s += Ce(p)), (p = p.return);
        while (p);
        var b = s;
      } catch (y) {
        b =
          `
Error generating stack: ` +
          y.message +
          `
` +
          y.stack;
      }
      return { value: r, source: i, stack: b, digest: null };
    }
    function md(r, i, s) {
      return { value: r, source: null, stack: s ?? null, digest: i ?? null };
    }
    function bd(r, i) {
      try {
        console.error(i.value);
      } catch (s) {
        setTimeout(function () {
          throw s;
        });
      }
    }
    var tx = typeof WeakMap == "function" ? WeakMap : Map;
    function Bm(r, i, s) {
      (s = Cn(-1, s)), (s.tag = 3), (s.payload = { element: null });
      var p = i.value;
      return (
        (s.callback = function () {
          As || ((As = !0), (Td = p)), bd(r, i);
        }),
        s
      );
    }
    function Dm(r, i, s) {
      (s = Cn(-1, s)), (s.tag = 3);
      var p = r.type.getDerivedStateFromError;
      if (typeof p == "function") {
        var b = i.value;
        (s.payload = function () {
          return p(b);
        }),
          (s.callback = function () {
            bd(r, i);
          });
      }
      var y = r.stateNode;
      return (
        y !== null &&
          typeof y.componentDidCatch == "function" &&
          (s.callback = function () {
            bd(r, i),
              typeof p != "function" &&
                (po === null ? (po = new Set([this])) : po.add(this));
            var _ = i.stack;
            this.componentDidCatch(i.value, {
              componentStack: _ !== null ? _ : "",
            });
          }),
        s
      );
    }
    function Um(r, i, s) {
      var p = r.pingCache;
      if (p === null) {
        p = r.pingCache = new tx();
        var b = new Set();
        p.set(i, b);
      } else (b = p.get(i)), b === void 0 && ((b = new Set()), p.set(i, b));
      b.has(s) || (b.add(s), (r = hx.bind(null, r, i, s)), i.then(r, r));
    }
    function Fm(r) {
      do {
        var i;
        if (
          ((i = r.tag === 13) &&
            ((i = r.memoizedState),
            (i = i !== null ? i.dehydrated !== null : !0)),
          i)
        )
          return r;
        r = r.return;
      } while (r !== null);
      return null;
    }
    function $m(r, i, s, p, b) {
      return r.mode & 1
        ? ((r.flags |= 65536), (r.lanes = b), r)
        : (r === i
            ? (r.flags |= 65536)
            : ((r.flags |= 128),
              (s.flags |= 131072),
              (s.flags &= -52805),
              s.tag === 1 &&
                (s.alternate === null
                  ? (s.tag = 17)
                  : ((i = Cn(-1, 1)), (i.tag = 2), co(s, i, 1))),
              (s.lanes |= 1)),
          r);
    }
    var rx = C.ReactCurrentOwner,
      Jt = !1;
    function $t(r, i, s, p) {
      i.child = r === null ? hm(i, null, s, p) : oa(i, r.child, s, p);
    }
    function Vm(r, i, s, p, b) {
      s = s.render;
      var y = i.ref;
      return (
        na(i, b),
        (p = cd(r, i, s, p, y, b)),
        (s = fd()),
        r !== null && !Jt
          ? ((i.updateQueue = r.updateQueue),
            (i.flags &= -2053),
            (r.lanes &= ~b),
            zn(r, i, b))
          : (nt && s && qf(i), (i.flags |= 1), $t(r, i, p, b), i.child)
      );
    }
    function Wm(r, i, s, p, b) {
      if (r === null) {
        var y = s.type;
        return typeof y == "function" &&
          !Bd(y) &&
          y.defaultProps === void 0 &&
          s.compare === null &&
          s.defaultProps === void 0
          ? ((i.tag = 15), (i.type = y), qm(r, i, y, p, b))
          : ((r = zs(s.type, null, p, i, i.mode, b)),
            (r.ref = i.ref),
            (r.return = i),
            (i.child = r));
      }
      if (((y = r.child), !(r.lanes & b))) {
        var _ = y.memoizedProps;
        if (
          ((s = s.compare),
          (s = s !== null ? s : iu),
          s(_, p) && r.ref === i.ref)
        )
          return zn(r, i, b);
      }
      return (
        (i.flags |= 1),
        (r = bo(y, p)),
        (r.ref = i.ref),
        (r.return = i),
        (i.child = r)
      );
    }
    function qm(r, i, s, p, b) {
      if (r !== null) {
        var y = r.memoizedProps;
        if (iu(y, p) && r.ref === i.ref)
          if (((Jt = !1), (i.pendingProps = p = y), (r.lanes & b) !== 0))
            r.flags & 131072 && (Jt = !0);
          else return (i.lanes = r.lanes), zn(r, i, b);
      }
      return yd(r, i, s, p, b);
    }
    function Km(r, i, s) {
      var p = i.pendingProps,
        b = p.children,
        y = r !== null ? r.memoizedState : null;
      if (p.mode === "hidden")
        if (!(i.mode & 1))
          (i.memoizedState = {
            baseLanes: 0,
            cachePool: null,
            transitions: null,
          }),
            Je(la, cr),
            (cr |= s);
        else {
          if (!(s & 1073741824))
            return (
              (r = y !== null ? y.baseLanes | s : s),
              (i.lanes = i.childLanes = 1073741824),
              (i.memoizedState = {
                baseLanes: r,
                cachePool: null,
                transitions: null,
              }),
              (i.updateQueue = null),
              Je(la, cr),
              (cr |= r),
              null
            );
          (i.memoizedState = {
            baseLanes: 0,
            cachePool: null,
            transitions: null,
          }),
            (p = y !== null ? y.baseLanes : s),
            Je(la, cr),
            (cr |= p);
        }
      else
        y !== null
          ? ((p = y.baseLanes | s), (i.memoizedState = null))
          : (p = s),
          Je(la, cr),
          (cr |= p);
      return $t(r, i, b, s), i.child;
    }
    function Hm(r, i) {
      var s = i.ref;
      ((r === null && s !== null) || (r !== null && r.ref !== s)) &&
        ((i.flags |= 512), (i.flags |= 2097152));
    }
    function yd(r, i, s, p, b) {
      var y = Yt(s) ? Yo : Ct.current;
      return (
        (y = Gi(i, y)),
        na(i, b),
        (s = cd(r, i, s, p, y, b)),
        (p = fd()),
        r !== null && !Jt
          ? ((i.updateQueue = r.updateQueue),
            (i.flags &= -2053),
            (r.lanes &= ~b),
            zn(r, i, b))
          : (nt && p && qf(i), (i.flags |= 1), $t(r, i, s, b), i.child)
      );
    }
    function Xm(r, i, s, p, b) {
      if (Yt(s)) {
        var y = !0;
        as(i);
      } else y = !1;
      if ((na(i, b), i.stateNode === null))
        Ss(r, i), fm(i, s, p), nd(i, s, p, b), (p = !0);
      else if (r === null) {
        var _ = i.stateNode,
          P = i.memoizedProps;
        _.props = P;
        var T = _.context,
          L = s.contextType;
        typeof L == "object" && L !== null
          ? (L = gr(L))
          : ((L = Yt(s) ? Yo : Ct.current), (L = Gi(i, L)));
        var Q = s.getDerivedStateFromProps,
          Y =
            typeof Q == "function" ||
            typeof _.getSnapshotBeforeUpdate == "function";
        Y ||
          (typeof _.UNSAFE_componentWillReceiveProps != "function" &&
            typeof _.componentWillReceiveProps != "function") ||
          ((P !== p || T !== L) && dm(i, _, p, L)),
          (so = !1);
        var X = i.memoizedState;
        (_.state = X),
          vs(i, p, _, b),
          (T = i.memoizedState),
          P !== p || X !== T || Qt.current || so
            ? (typeof Q == "function" &&
                (rd(i, s, Q, p), (T = i.memoizedState)),
              (P = so || cm(i, s, P, p, X, T, L))
                ? (Y ||
                    (typeof _.UNSAFE_componentWillMount != "function" &&
                      typeof _.componentWillMount != "function") ||
                    (typeof _.componentWillMount == "function" &&
                      _.componentWillMount(),
                    typeof _.UNSAFE_componentWillMount == "function" &&
                      _.UNSAFE_componentWillMount()),
                  typeof _.componentDidMount == "function" &&
                    (i.flags |= 4194308))
                : (typeof _.componentDidMount == "function" &&
                    (i.flags |= 4194308),
                  (i.memoizedProps = p),
                  (i.memoizedState = T)),
              (_.props = p),
              (_.state = T),
              (_.context = L),
              (p = P))
            : (typeof _.componentDidMount == "function" && (i.flags |= 4194308),
              (p = !1));
      } else {
        (_ = i.stateNode),
          am(r, i),
          (P = i.memoizedProps),
          (L = i.type === i.elementType ? P : Cr(i.type, P)),
          (_.props = L),
          (Y = i.pendingProps),
          (X = _.context),
          (T = s.contextType),
          typeof T == "object" && T !== null
            ? (T = gr(T))
            : ((T = Yt(s) ? Yo : Ct.current), (T = Gi(i, T)));
        var ne = s.getDerivedStateFromProps;
        (Q =
          typeof ne == "function" ||
          typeof _.getSnapshotBeforeUpdate == "function") ||
          (typeof _.UNSAFE_componentWillReceiveProps != "function" &&
            typeof _.componentWillReceiveProps != "function") ||
          ((P !== Y || X !== T) && dm(i, _, p, T)),
          (so = !1),
          (X = i.memoizedState),
          (_.state = X),
          vs(i, p, _, b);
        var ue = i.memoizedState;
        P !== Y || X !== ue || Qt.current || so
          ? (typeof ne == "function" &&
              (rd(i, s, ne, p), (ue = i.memoizedState)),
            (L = so || cm(i, s, L, p, X, ue, T) || !1)
              ? (Q ||
                  (typeof _.UNSAFE_componentWillUpdate != "function" &&
                    typeof _.componentWillUpdate != "function") ||
                  (typeof _.componentWillUpdate == "function" &&
                    _.componentWillUpdate(p, ue, T),
                  typeof _.UNSAFE_componentWillUpdate == "function" &&
                    _.UNSAFE_componentWillUpdate(p, ue, T)),
                typeof _.componentDidUpdate == "function" && (i.flags |= 4),
                typeof _.getSnapshotBeforeUpdate == "function" &&
                  (i.flags |= 1024))
              : (typeof _.componentDidUpdate != "function" ||
                  (P === r.memoizedProps && X === r.memoizedState) ||
                  (i.flags |= 4),
                typeof _.getSnapshotBeforeUpdate != "function" ||
                  (P === r.memoizedProps && X === r.memoizedState) ||
                  (i.flags |= 1024),
                (i.memoizedProps = p),
                (i.memoizedState = ue)),
            (_.props = p),
            (_.state = ue),
            (_.context = T),
            (p = L))
          : (typeof _.componentDidUpdate != "function" ||
              (P === r.memoizedProps && X === r.memoizedState) ||
              (i.flags |= 4),
            typeof _.getSnapshotBeforeUpdate != "function" ||
              (P === r.memoizedProps && X === r.memoizedState) ||
              (i.flags |= 1024),
            (p = !1));
      }
      return gd(r, i, s, p, y, b);
    }
    function gd(r, i, s, p, b, y) {
      Hm(r, i);
      var _ = (i.flags & 128) !== 0;
      if (!p && !_) return b && Gh(i, s, !1), zn(r, i, y);
      (p = i.stateNode), (rx.current = i);
      var P =
        _ && typeof s.getDerivedStateFromError != "function"
          ? null
          : p.render();
      return (
        (i.flags |= 1),
        r !== null && _
          ? ((i.child = oa(i, r.child, null, y)), (i.child = oa(i, null, P, y)))
          : $t(r, i, P, y),
        (i.memoizedState = p.state),
        b && Gh(i, s, !0),
        i.child
      );
    }
    function Qm(r) {
      var i = r.stateNode;
      i.pendingContext
        ? Yh(r, i.pendingContext, i.pendingContext !== i.context)
        : i.context && Yh(r, i.context, !1),
        od(r, i.containerInfo);
    }
    function Ym(r, i, s, p, b) {
      return ta(), Qf(b), (i.flags |= 256), $t(r, i, s, p), i.child;
    }
    var wd = { dehydrated: null, treeContext: null, retryLane: 0 };
    function _d(r) {
      return { baseLanes: r, cachePool: null, transitions: null };
    }
    function Jm(r, i, s) {
      var p = i.pendingProps,
        b = it.current,
        y = !1,
        _ = (i.flags & 128) !== 0,
        P;
      if (
        ((P = _) ||
          (P = r !== null && r.memoizedState === null ? !1 : (b & 2) !== 0),
        P
          ? ((y = !0), (i.flags &= -129))
          : (r === null || r.memoizedState !== null) && (b |= 1),
        Je(it, b & 1),
        r === null)
      )
        return (
          Xf(i),
          (r = i.memoizedState),
          r !== null && ((r = r.dehydrated), r !== null)
            ? (i.mode & 1
                ? r.data === "$!"
                  ? (i.lanes = 8)
                  : (i.lanes = 1073741824)
                : (i.lanes = 1),
              null)
            : ((_ = p.children),
              (r = p.fallback),
              y
                ? ((p = i.mode),
                  (y = i.child),
                  (_ = { mode: "hidden", children: _ }),
                  !(p & 1) && y !== null
                    ? ((y.childLanes = 0), (y.pendingProps = _))
                    : (y = Rs(_, p, 0, null)),
                  (r = ai(r, p, s, null)),
                  (y.return = i),
                  (r.return = i),
                  (y.sibling = r),
                  (i.child = y),
                  (i.child.memoizedState = _d(s)),
                  (i.memoizedState = wd),
                  r)
                : Od(i, _))
        );
      if (
        ((b = r.memoizedState), b !== null && ((P = b.dehydrated), P !== null))
      )
        return nx(r, i, _, p, P, b, s);
      if (y) {
        (y = p.fallback), (_ = i.mode), (b = r.child), (P = b.sibling);
        var T = { mode: "hidden", children: p.children };
        return (
          !(_ & 1) && i.child !== b
            ? ((p = i.child),
              (p.childLanes = 0),
              (p.pendingProps = T),
              (i.deletions = null))
            : ((p = bo(b, T)), (p.subtreeFlags = b.subtreeFlags & 14680064)),
          P !== null
            ? (y = bo(P, y))
            : ((y = ai(y, _, s, null)), (y.flags |= 2)),
          (y.return = i),
          (p.return = i),
          (p.sibling = y),
          (i.child = p),
          (p = y),
          (y = i.child),
          (_ = r.child.memoizedState),
          (_ =
            _ === null
              ? _d(s)
              : {
                  baseLanes: _.baseLanes | s,
                  cachePool: null,
                  transitions: _.transitions,
                }),
          (y.memoizedState = _),
          (y.childLanes = r.childLanes & ~s),
          (i.memoizedState = wd),
          p
        );
      }
      return (
        (y = r.child),
        (r = y.sibling),
        (p = bo(y, { mode: "visible", children: p.children })),
        !(i.mode & 1) && (p.lanes = s),
        (p.return = i),
        (p.sibling = null),
        r !== null &&
          ((s = i.deletions),
          s === null ? ((i.deletions = [r]), (i.flags |= 16)) : s.push(r)),
        (i.child = p),
        (i.memoizedState = null),
        p
      );
    }
    function Od(r, i) {
      return (
        (i = Rs({ mode: "visible", children: i }, r.mode, 0, null)),
        (i.return = r),
        (r.child = i)
      );
    }
    function xs(r, i, s, p) {
      return (
        p !== null && Qf(p),
        oa(i, r.child, null, s),
        (r = Od(i, i.pendingProps.children)),
        (r.flags |= 2),
        (i.memoizedState = null),
        r
      );
    }
    function nx(r, i, s, p, b, y, _) {
      if (s)
        return i.flags & 256
          ? ((i.flags &= -257), (p = md(Error(o(422)))), xs(r, i, _, p))
          : i.memoizedState !== null
          ? ((i.child = r.child), (i.flags |= 128), null)
          : ((y = p.fallback),
            (b = i.mode),
            (p = Rs({ mode: "visible", children: p.children }, b, 0, null)),
            (y = ai(y, b, _, null)),
            (y.flags |= 2),
            (p.return = i),
            (y.return = i),
            (p.sibling = y),
            (i.child = p),
            i.mode & 1 && oa(i, r.child, null, _),
            (i.child.memoizedState = _d(_)),
            (i.memoizedState = wd),
            y);
      if (!(i.mode & 1)) return xs(r, i, _, null);
      if (b.data === "$!") {
        if (((p = b.nextSibling && b.nextSibling.dataset), p)) var P = p.dgst;
        return (
          (p = P), (y = Error(o(419))), (p = md(y, p, void 0)), xs(r, i, _, p)
        );
      }
      if (((P = (_ & r.childLanes) !== 0), Jt || P)) {
        if (((p = St), p !== null)) {
          switch (_ & -_) {
            case 4:
              b = 2;
              break;
            case 16:
              b = 8;
              break;
            case 64:
            case 128:
            case 256:
            case 512:
            case 1024:
            case 2048:
            case 4096:
            case 8192:
            case 16384:
            case 32768:
            case 65536:
            case 131072:
            case 262144:
            case 524288:
            case 1048576:
            case 2097152:
            case 4194304:
            case 8388608:
            case 16777216:
            case 33554432:
            case 67108864:
              b = 32;
              break;
            case 536870912:
              b = 268435456;
              break;
            default:
              b = 0;
          }
          (b = b & (p.suspendedLanes | _) ? 0 : b),
            b !== 0 &&
              b !== y.retryLane &&
              ((y.retryLane = b), Nn(r, b), Lr(p, r, b, -1));
        }
        return Ld(), (p = md(Error(o(421)))), xs(r, i, _, p);
      }
      return b.data === "$?"
        ? ((i.flags |= 128),
          (i.child = r.child),
          (i = mx.bind(null, r)),
          (b._reactRetry = i),
          null)
        : ((r = y.treeContext),
          (sr = io(b.nextSibling)),
          (lr = i),
          (nt = !0),
          (Nr = null),
          r !== null &&
            ((br[yr++] = Tn),
            (br[yr++] = Mn),
            (br[yr++] = Jo),
            (Tn = r.id),
            (Mn = r.overflow),
            (Jo = i)),
          (i = Od(i, p.children)),
          (i.flags |= 4096),
          i);
    }
    function Gm(r, i, s) {
      r.lanes |= i;
      var p = r.alternate;
      p !== null && (p.lanes |= i), Zf(r.return, i, s);
    }
    function xd(r, i, s, p, b) {
      var y = r.memoizedState;
      y === null
        ? (r.memoizedState = {
            isBackwards: i,
            rendering: null,
            renderingStartTime: 0,
            last: p,
            tail: s,
            tailMode: b,
          })
        : ((y.isBackwards = i),
          (y.rendering = null),
          (y.renderingStartTime = 0),
          (y.last = p),
          (y.tail = s),
          (y.tailMode = b));
    }
    function Zm(r, i, s) {
      var p = i.pendingProps,
        b = p.revealOrder,
        y = p.tail;
      if (($t(r, i, p.children, s), (p = it.current), p & 2))
        (p = (p & 1) | 2), (i.flags |= 128);
      else {
        if (r !== null && r.flags & 128)
          e: for (r = i.child; r !== null; ) {
            if (r.tag === 13) r.memoizedState !== null && Gm(r, s, i);
            else if (r.tag === 19) Gm(r, s, i);
            else if (r.child !== null) {
              (r.child.return = r), (r = r.child);
              continue;
            }
            if (r === i) break e;
            for (; r.sibling === null; ) {
              if (r.return === null || r.return === i) break e;
              r = r.return;
            }
            (r.sibling.return = r.return), (r = r.sibling);
          }
        p &= 1;
      }
      if ((Je(it, p), !(i.mode & 1))) i.memoizedState = null;
      else
        switch (b) {
          case "forwards":
            for (s = i.child, b = null; s !== null; )
              (r = s.alternate),
                r !== null && bs(r) === null && (b = s),
                (s = s.sibling);
            (s = b),
              s === null
                ? ((b = i.child), (i.child = null))
                : ((b = s.sibling), (s.sibling = null)),
              xd(i, !1, b, s, y);
            break;
          case "backwards":
            for (s = null, b = i.child, i.child = null; b !== null; ) {
              if (((r = b.alternate), r !== null && bs(r) === null)) {
                i.child = b;
                break;
              }
              (r = b.sibling), (b.sibling = s), (s = b), (b = r);
            }
            xd(i, !0, s, null, y);
            break;
          case "together":
            xd(i, !1, null, null, void 0);
            break;
          default:
            i.memoizedState = null;
        }
      return i.child;
    }
    function Ss(r, i) {
      !(i.mode & 1) &&
        r !== null &&
        ((r.alternate = null), (i.alternate = null), (i.flags |= 2));
    }
    function zn(r, i, s) {
      if (
        (r !== null && (i.dependencies = r.dependencies),
        (ri |= i.lanes),
        !(s & i.childLanes))
      )
        return null;
      if (r !== null && i.child !== r.child) throw Error(o(153));
      if (i.child !== null) {
        for (
          r = i.child, s = bo(r, r.pendingProps), i.child = s, s.return = i;
          r.sibling !== null;

        )
          (r = r.sibling),
            (s = s.sibling = bo(r, r.pendingProps)),
            (s.return = i);
        s.sibling = null;
      }
      return i.child;
    }
    function ox(r, i, s) {
      switch (i.tag) {
        case 3:
          Qm(i), ta();
          break;
        case 5:
          mm(i);
          break;
        case 1:
          Yt(i.type) && as(i);
          break;
        case 4:
          od(i, i.stateNode.containerInfo);
          break;
        case 10:
          var p = i.type._context,
            b = i.memoizedProps.value;
          Je(fs, p._currentValue), (p._currentValue = b);
          break;
        case 13:
          if (((p = i.memoizedState), p !== null))
            return p.dehydrated !== null
              ? (Je(it, it.current & 1), (i.flags |= 128), null)
              : s & i.child.childLanes
              ? Jm(r, i, s)
              : (Je(it, it.current & 1),
                (r = zn(r, i, s)),
                r !== null ? r.sibling : null);
          Je(it, it.current & 1);
          break;
        case 19:
          if (((p = (s & i.childLanes) !== 0), r.flags & 128)) {
            if (p) return Zm(r, i, s);
            i.flags |= 128;
          }
          if (
            ((b = i.memoizedState),
            b !== null &&
              ((b.rendering = null), (b.tail = null), (b.lastEffect = null)),
            Je(it, it.current),
            p)
          )
            break;
          return null;
        case 22:
        case 23:
          return (i.lanes = 0), Km(r, i, s);
      }
      return zn(r, i, s);
    }
    var eb, Sd, tb, rb;
    (eb = function (r, i) {
      for (var s = i.child; s !== null; ) {
        if (s.tag === 5 || s.tag === 6) r.appendChild(s.stateNode);
        else if (s.tag !== 4 && s.child !== null) {
          (s.child.return = s), (s = s.child);
          continue;
        }
        if (s === i) break;
        for (; s.sibling === null; ) {
          if (s.return === null || s.return === i) return;
          s = s.return;
        }
        (s.sibling.return = s.return), (s = s.sibling);
      }
    }),
      (Sd = function () {}),
      (tb = function (r, i, s, p) {
        var b = r.memoizedProps;
        if (b !== p) {
          (r = i.stateNode), ei(un.current);
          var y = null;
          switch (s) {
            case "input":
              (b = xn(r, b)), (p = xn(r, p)), (y = []);
              break;
            case "select":
              (b = I({}, b, { value: void 0 })),
                (p = I({}, p, { value: void 0 })),
                (y = []);
              break;
            case "textarea":
              (b = Yr(r, b)), (p = Yr(r, p)), (y = []);
              break;
            default:
              typeof b.onClick != "function" &&
                typeof p.onClick == "function" &&
                (r.onclick = ns);
          }
          ye(s, p);
          var _;
          s = null;
          for (L in b)
            if (!p.hasOwnProperty(L) && b.hasOwnProperty(L) && b[L] != null)
              if (L === "style") {
                var P = b[L];
                for (_ in P)
                  P.hasOwnProperty(_) && (s || (s = {}), (s[_] = ""));
              } else
                L !== "dangerouslySetInnerHTML" &&
                  L !== "children" &&
                  L !== "suppressContentEditableWarning" &&
                  L !== "suppressHydrationWarning" &&
                  L !== "autoFocus" &&
                  (u.hasOwnProperty(L)
                    ? y || (y = [])
                    : (y = y || []).push(L, null));
          for (L in p) {
            var T = p[L];
            if (
              ((P = b?.[L]),
              p.hasOwnProperty(L) && T !== P && (T != null || P != null))
            )
              if (L === "style")
                if (P) {
                  for (_ in P)
                    !P.hasOwnProperty(_) ||
                      (T && T.hasOwnProperty(_)) ||
                      (s || (s = {}), (s[_] = ""));
                  for (_ in T)
                    T.hasOwnProperty(_) &&
                      P[_] !== T[_] &&
                      (s || (s = {}), (s[_] = T[_]));
                } else s || (y || (y = []), y.push(L, s)), (s = T);
              else
                L === "dangerouslySetInnerHTML"
                  ? ((T = T ? T.__html : void 0),
                    (P = P ? P.__html : void 0),
                    T != null && P !== T && (y = y || []).push(L, T))
                  : L === "children"
                  ? (typeof T != "string" && typeof T != "number") ||
                    (y = y || []).push(L, "" + T)
                  : L !== "suppressContentEditableWarning" &&
                    L !== "suppressHydrationWarning" &&
                    (u.hasOwnProperty(L)
                      ? (T != null && L === "onScroll" && et("scroll", r),
                        y || P === T || (y = []))
                      : (y = y || []).push(L, T));
          }
          s && (y = y || []).push("style", s);
          var L = y;
          (i.updateQueue = L) && (i.flags |= 4);
        }
      }),
      (rb = function (r, i, s, p) {
        s !== p && (i.flags |= 4);
      });
    function wu(r, i) {
      if (!nt)
        switch (r.tailMode) {
          case "hidden":
            i = r.tail;
            for (var s = null; i !== null; )
              i.alternate !== null && (s = i), (i = i.sibling);
            s === null ? (r.tail = null) : (s.sibling = null);
            break;
          case "collapsed":
            s = r.tail;
            for (var p = null; s !== null; )
              s.alternate !== null && (p = s), (s = s.sibling);
            p === null
              ? i || r.tail === null
                ? (r.tail = null)
                : (r.tail.sibling = null)
              : (p.sibling = null);
        }
    }
    function Rt(r) {
      var i = r.alternate !== null && r.alternate.child === r.child,
        s = 0,
        p = 0;
      if (i)
        for (var b = r.child; b !== null; )
          (s |= b.lanes | b.childLanes),
            (p |= b.subtreeFlags & 14680064),
            (p |= b.flags & 14680064),
            (b.return = r),
            (b = b.sibling);
      else
        for (b = r.child; b !== null; )
          (s |= b.lanes | b.childLanes),
            (p |= b.subtreeFlags),
            (p |= b.flags),
            (b.return = r),
            (b = b.sibling);
      return (r.subtreeFlags |= p), (r.childLanes = s), i;
    }
    function ix(r, i, s) {
      var p = i.pendingProps;
      switch ((Kf(i), i.tag)) {
        case 2:
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
          return Rt(i), null;
        case 1:
          return Yt(i.type) && is(), Rt(i), null;
        case 3:
          return (
            (p = i.stateNode),
            ia(),
            tt(Qt),
            tt(Ct),
            ud(),
            p.pendingContext &&
              ((p.context = p.pendingContext), (p.pendingContext = null)),
            (r === null || r.child === null) &&
              (cs(i)
                ? (i.flags |= 4)
                : r === null ||
                  (r.memoizedState.isDehydrated && !(i.flags & 256)) ||
                  ((i.flags |= 1024), Nr !== null && (Cd(Nr), (Nr = null)))),
            Sd(r, i),
            Rt(i),
            null
          );
        case 5:
          id(i);
          var b = ei(hu.current);
          if (((s = i.type), r !== null && i.stateNode != null))
            tb(r, i, s, p, b),
              r.ref !== i.ref && ((i.flags |= 512), (i.flags |= 2097152));
          else {
            if (!p) {
              if (i.stateNode === null) throw Error(o(166));
              return Rt(i), null;
            }
            if (((r = ei(un.current)), cs(i))) {
              (p = i.stateNode), (s = i.type);
              var y = i.memoizedProps;
              switch (((p[an] = i), (p[cu] = y), (r = (i.mode & 1) !== 0), s)) {
                case "dialog":
                  et("cancel", p), et("close", p);
                  break;
                case "iframe":
                case "object":
                case "embed":
                  et("load", p);
                  break;
                case "video":
                case "audio":
                  for (b = 0; b < uu.length; b++) et(uu[b], p);
                  break;
                case "source":
                  et("error", p);
                  break;
                case "img":
                case "image":
                case "link":
                  et("error", p), et("load", p);
                  break;
                case "details":
                  et("toggle", p);
                  break;
                case "input":
                  Qn(p, y), et("invalid", p);
                  break;
                case "select":
                  (p._wrapperState = { wasMultiple: !!y.multiple }),
                    et("invalid", p);
                  break;
                case "textarea":
                  Uo(p, y), et("invalid", p);
              }
              ye(s, y), (b = null);
              for (var _ in y)
                if (y.hasOwnProperty(_)) {
                  var P = y[_];
                  _ === "children"
                    ? typeof P == "string"
                      ? p.textContent !== P &&
                        (y.suppressHydrationWarning !== !0 &&
                          rs(p.textContent, P, r),
                        (b = ["children", P]))
                      : typeof P == "number" &&
                        p.textContent !== "" + P &&
                        (y.suppressHydrationWarning !== !0 &&
                          rs(p.textContent, P, r),
                        (b = ["children", "" + P]))
                    : u.hasOwnProperty(_) &&
                      P != null &&
                      _ === "onScroll" &&
                      et("scroll", p);
                }
              switch (s) {
                case "input":
                  vr(p), Do(p, y, !0);
                  break;
                case "textarea":
                  vr(p), Mi(p);
                  break;
                case "select":
                case "option":
                  break;
                default:
                  typeof y.onClick == "function" && (p.onclick = ns);
              }
              (p = b), (i.updateQueue = p), p !== null && (i.flags |= 4);
            } else {
              (_ = b.nodeType === 9 ? b : b.ownerDocument),
                r === "http://www.w3.org/1999/xhtml" && (r = Ni(s)),
                r === "http://www.w3.org/1999/xhtml"
                  ? s === "script"
                    ? ((r = _.createElement("div")),
                      (r.innerHTML = "<script></script>"),
                      (r = r.removeChild(r.firstChild)))
                    : typeof p.is == "string"
                    ? (r = _.createElement(s, { is: p.is }))
                    : ((r = _.createElement(s)),
                      s === "select" &&
                        ((_ = r),
                        p.multiple
                          ? (_.multiple = !0)
                          : p.size && (_.size = p.size)))
                  : (r = _.createElementNS(r, s)),
                (r[an] = i),
                (r[cu] = p),
                eb(r, i, !1, !1),
                (i.stateNode = r);
              e: {
                switch (((_ = fe(s, p)), s)) {
                  case "dialog":
                    et("cancel", r), et("close", r), (b = p);
                    break;
                  case "iframe":
                  case "object":
                  case "embed":
                    et("load", r), (b = p);
                    break;
                  case "video":
                  case "audio":
                    for (b = 0; b < uu.length; b++) et(uu[b], r);
                    b = p;
                    break;
                  case "source":
                    et("error", r), (b = p);
                    break;
                  case "img":
                  case "image":
                  case "link":
                    et("error", r), et("load", r), (b = p);
                    break;
                  case "details":
                    et("toggle", r), (b = p);
                    break;
                  case "input":
                    Qn(r, p), (b = xn(r, p)), et("invalid", r);
                    break;
                  case "option":
                    b = p;
                    break;
                  case "select":
                    (r._wrapperState = { wasMultiple: !!p.multiple }),
                      (b = I({}, p, { value: void 0 })),
                      et("invalid", r);
                    break;
                  case "textarea":
                    Uo(r, p), (b = Yr(r, p)), et("invalid", r);
                    break;
                  default:
                    b = p;
                }
                ye(s, b), (P = b);
                for (y in P)
                  if (P.hasOwnProperty(y)) {
                    var T = P[y];
                    y === "style"
                      ? xe(r, T)
                      : y === "dangerouslySetInnerHTML"
                      ? ((T = T ? T.__html : void 0), T != null && B(r, T))
                      : y === "children"
                      ? typeof T == "string"
                        ? (s !== "textarea" || T !== "") && U(r, T)
                        : typeof T == "number" && U(r, "" + T)
                      : y !== "suppressContentEditableWarning" &&
                        y !== "suppressHydrationWarning" &&
                        y !== "autoFocus" &&
                        (u.hasOwnProperty(y)
                          ? T != null && y === "onScroll" && et("scroll", r)
                          : T != null && j(r, y, T, _));
                  }
                switch (s) {
                  case "input":
                    vr(r), Do(r, p, !1);
                    break;
                  case "textarea":
                    vr(r), Mi(r);
                    break;
                  case "option":
                    p.value != null &&
                      r.setAttribute("value", "" + ze(p.value));
                    break;
                  case "select":
                    (r.multiple = !!p.multiple),
                      (y = p.value),
                      y != null
                        ? Ht(r, !!p.multiple, y, !1)
                        : p.defaultValue != null &&
                          Ht(r, !!p.multiple, p.defaultValue, !0);
                    break;
                  default:
                    typeof b.onClick == "function" && (r.onclick = ns);
                }
                switch (s) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    p = !!p.autoFocus;
                    break e;
                  case "img":
                    p = !0;
                    break e;
                  default:
                    p = !1;
                }
              }
              p && (i.flags |= 4);
            }
            i.ref !== null && ((i.flags |= 512), (i.flags |= 2097152));
          }
          return Rt(i), null;
        case 6:
          if (r && i.stateNode != null) rb(r, i, r.memoizedProps, p);
          else {
            if (typeof p != "string" && i.stateNode === null)
              throw Error(o(166));
            if (((s = ei(hu.current)), ei(un.current), cs(i))) {
              if (
                ((p = i.stateNode),
                (s = i.memoizedProps),
                (p[an] = i),
                (y = p.nodeValue !== s) && ((r = lr), r !== null))
              )
                switch (r.tag) {
                  case 3:
                    rs(p.nodeValue, s, (r.mode & 1) !== 0);
                    break;
                  case 5:
                    r.memoizedProps.suppressHydrationWarning !== !0 &&
                      rs(p.nodeValue, s, (r.mode & 1) !== 0);
                }
              y && (i.flags |= 4);
            } else
              (p = (s.nodeType === 9 ? s : s.ownerDocument).createTextNode(p)),
                (p[an] = i),
                (i.stateNode = p);
          }
          return Rt(i), null;
        case 13:
          if (
            (tt(it),
            (p = i.memoizedState),
            r === null ||
              (r.memoizedState !== null && r.memoizedState.dehydrated !== null))
          ) {
            if (nt && sr !== null && i.mode & 1 && !(i.flags & 128))
              om(), ta(), (i.flags |= 98560), (y = !1);
            else if (((y = cs(i)), p !== null && p.dehydrated !== null)) {
              if (r === null) {
                if (!y) throw Error(o(318));
                if (
                  ((y = i.memoizedState),
                  (y = y !== null ? y.dehydrated : null),
                  !y)
                )
                  throw Error(o(317));
                y[an] = i;
              } else
                ta(),
                  !(i.flags & 128) && (i.memoizedState = null),
                  (i.flags |= 4);
              Rt(i), (y = !1);
            } else Nr !== null && (Cd(Nr), (Nr = null)), (y = !0);
            if (!y) return i.flags & 65536 ? i : null;
          }
          return i.flags & 128
            ? ((i.lanes = s), i)
            : ((p = p !== null),
              p !== (r !== null && r.memoizedState !== null) &&
                p &&
                ((i.child.flags |= 8192),
                i.mode & 1 &&
                  (r === null || it.current & 1 ? yt === 0 && (yt = 3) : Ld())),
              i.updateQueue !== null && (i.flags |= 4),
              Rt(i),
              null);
        case 4:
          return (
            ia(),
            Sd(r, i),
            r === null && lu(i.stateNode.containerInfo),
            Rt(i),
            null
          );
        case 10:
          return Gf(i.type._context), Rt(i), null;
        case 17:
          return Yt(i.type) && is(), Rt(i), null;
        case 19:
          if ((tt(it), (y = i.memoizedState), y === null)) return Rt(i), null;
          if (((p = (i.flags & 128) !== 0), (_ = y.rendering), _ === null))
            if (p) wu(y, !1);
            else {
              if (yt !== 0 || (r !== null && r.flags & 128))
                for (r = i.child; r !== null; ) {
                  if (((_ = bs(r)), _ !== null)) {
                    for (
                      i.flags |= 128,
                        wu(y, !1),
                        p = _.updateQueue,
                        p !== null && ((i.updateQueue = p), (i.flags |= 4)),
                        i.subtreeFlags = 0,
                        p = s,
                        s = i.child;
                      s !== null;

                    )
                      (y = s),
                        (r = p),
                        (y.flags &= 14680066),
                        (_ = y.alternate),
                        _ === null
                          ? ((y.childLanes = 0),
                            (y.lanes = r),
                            (y.child = null),
                            (y.subtreeFlags = 0),
                            (y.memoizedProps = null),
                            (y.memoizedState = null),
                            (y.updateQueue = null),
                            (y.dependencies = null),
                            (y.stateNode = null))
                          : ((y.childLanes = _.childLanes),
                            (y.lanes = _.lanes),
                            (y.child = _.child),
                            (y.subtreeFlags = 0),
                            (y.deletions = null),
                            (y.memoizedProps = _.memoizedProps),
                            (y.memoizedState = _.memoizedState),
                            (y.updateQueue = _.updateQueue),
                            (y.type = _.type),
                            (r = _.dependencies),
                            (y.dependencies =
                              r === null
                                ? null
                                : {
                                    lanes: r.lanes,
                                    firstContext: r.firstContext,
                                  })),
                        (s = s.sibling);
                    return Je(it, (it.current & 1) | 2), i.child;
                  }
                  r = r.sibling;
                }
              y.tail !== null &&
                ot() > sa &&
                ((i.flags |= 128), (p = !0), wu(y, !1), (i.lanes = 4194304));
            }
          else {
            if (!p)
              if (((r = bs(_)), r !== null)) {
                if (
                  ((i.flags |= 128),
                  (p = !0),
                  (s = r.updateQueue),
                  s !== null && ((i.updateQueue = s), (i.flags |= 4)),
                  wu(y, !0),
                  y.tail === null &&
                    y.tailMode === "hidden" &&
                    !_.alternate &&
                    !nt)
                )
                  return Rt(i), null;
              } else
                2 * ot() - y.renderingStartTime > sa &&
                  s !== 1073741824 &&
                  ((i.flags |= 128), (p = !0), wu(y, !1), (i.lanes = 4194304));
            y.isBackwards
              ? ((_.sibling = i.child), (i.child = _))
              : ((s = y.last),
                s !== null ? (s.sibling = _) : (i.child = _),
                (y.last = _));
          }
          return y.tail !== null
            ? ((i = y.tail),
              (y.rendering = i),
              (y.tail = i.sibling),
              (y.renderingStartTime = ot()),
              (i.sibling = null),
              (s = it.current),
              Je(it, p ? (s & 1) | 2 : s & 1),
              i)
            : (Rt(i), null);
        case 22:
        case 23:
          return (
            Rd(),
            (p = i.memoizedState !== null),
            r !== null && (r.memoizedState !== null) !== p && (i.flags |= 8192),
            p && i.mode & 1
              ? cr & 1073741824 &&
                (Rt(i), i.subtreeFlags & 6 && (i.flags |= 8192))
              : Rt(i),
            null
          );
        case 24:
          return null;
        case 25:
          return null;
      }
      throw Error(o(156, i.tag));
    }
    function ax(r, i) {
      switch ((Kf(i), i.tag)) {
        case 1:
          return (
            Yt(i.type) && is(),
            (r = i.flags),
            r & 65536 ? ((i.flags = (r & -65537) | 128), i) : null
          );
        case 3:
          return (
            ia(),
            tt(Qt),
            tt(Ct),
            ud(),
            (r = i.flags),
            r & 65536 && !(r & 128) ? ((i.flags = (r & -65537) | 128), i) : null
          );
        case 5:
          return id(i), null;
        case 13:
          if (
            (tt(it), (r = i.memoizedState), r !== null && r.dehydrated !== null)
          ) {
            if (i.alternate === null) throw Error(o(340));
            ta();
          }
          return (
            (r = i.flags),
            r & 65536 ? ((i.flags = (r & -65537) | 128), i) : null
          );
        case 19:
          return tt(it), null;
        case 4:
          return ia(), null;
        case 10:
          return Gf(i.type._context), null;
        case 22:
        case 23:
          return Rd(), null;
        case 24:
          return null;
        default:
          return null;
      }
    }
    var Ps = !1,
      Lt = !1,
      ux = typeof WeakSet == "function" ? WeakSet : Set,
      oe = null;
    function ua(r, i) {
      var s = r.ref;
      if (s !== null)
        if (typeof s == "function")
          try {
            s(null);
          } catch (p) {
            lt(r, i, p);
          }
        else s.current = null;
    }
    function nb(r, i, s) {
      try {
        s();
      } catch (p) {
        lt(r, i, p);
      }
    }
    var ob = !1;
    function lx(r, i) {
      if (((Lf = $i), (r = Mh()), Tf(r))) {
        if ("selectionStart" in r)
          var s = { start: r.selectionStart, end: r.selectionEnd };
        else
          e: {
            s = ((s = r.ownerDocument) && s.defaultView) || window;
            var p = s.getSelection && s.getSelection();
            if (p && p.rangeCount !== 0) {
              s = p.anchorNode;
              var b = p.anchorOffset,
                y = p.focusNode;
              p = p.focusOffset;
              try {
                s.nodeType, y.nodeType;
              } catch {
                s = null;
                break e;
              }
              var _ = 0,
                P = -1,
                T = -1,
                L = 0,
                Q = 0,
                Y = r,
                X = null;
              t: for (;;) {
                for (
                  var ne;
                  Y !== s || (b !== 0 && Y.nodeType !== 3) || (P = _ + b),
                    Y !== y || (p !== 0 && Y.nodeType !== 3) || (T = _ + p),
                    Y.nodeType === 3 && (_ += Y.nodeValue.length),
                    (ne = Y.firstChild) !== null;

                )
                  (X = Y), (Y = ne);
                for (;;) {
                  if (Y === r) break t;
                  if (
                    (X === s && ++L === b && (P = _),
                    X === y && ++Q === p && (T = _),
                    (ne = Y.nextSibling) !== null)
                  )
                    break;
                  (Y = X), (X = Y.parentNode);
                }
                Y = ne;
              }
              s = P === -1 || T === -1 ? null : { start: P, end: T };
            } else s = null;
          }
        s = s || { start: 0, end: 0 };
      } else s = null;
      for (
        Bf = { focusedElem: r, selectionRange: s }, $i = !1, oe = i;
        oe !== null;

      )
        if (
          ((i = oe), (r = i.child), (i.subtreeFlags & 1028) !== 0 && r !== null)
        )
          (r.return = i), (oe = r);
        else
          for (; oe !== null; ) {
            i = oe;
            try {
              var ue = i.alternate;
              if (i.flags & 1024)
                switch (i.tag) {
                  case 0:
                  case 11:
                  case 15:
                    break;
                  case 1:
                    if (ue !== null) {
                      var se = ue.memoizedProps,
                        ct = ue.memoizedState,
                        z = i.stateNode,
                        N = z.getSnapshotBeforeUpdate(
                          i.elementType === i.type ? se : Cr(i.type, se),
                          ct
                        );
                      z.__reactInternalSnapshotBeforeUpdate = N;
                    }
                    break;
                  case 3:
                    var R = i.stateNode.containerInfo;
                    R.nodeType === 1
                      ? (R.textContent = "")
                      : R.nodeType === 9 &&
                        R.documentElement &&
                        R.removeChild(R.documentElement);
                    break;
                  case 5:
                  case 6:
                  case 4:
                  case 17:
                    break;
                  default:
                    throw Error(o(163));
                }
            } catch (G) {
              lt(i, i.return, G);
            }
            if (((r = i.sibling), r !== null)) {
              (r.return = i.return), (oe = r);
              break;
            }
            oe = i.return;
          }
      return (ue = ob), (ob = !1), ue;
    }
    function _u(r, i, s) {
      var p = i.updateQueue;
      if (((p = p !== null ? p.lastEffect : null), p !== null)) {
        var b = (p = p.next);
        do {
          if ((b.tag & r) === r) {
            var y = b.destroy;
            (b.destroy = void 0), y !== void 0 && nb(i, s, y);
          }
          b = b.next;
        } while (b !== p);
      }
    }
    function Es(r, i) {
      if (
        ((i = i.updateQueue),
        (i = i !== null ? i.lastEffect : null),
        i !== null)
      ) {
        var s = (i = i.next);
        do {
          if ((s.tag & r) === r) {
            var p = s.create;
            s.destroy = p();
          }
          s = s.next;
        } while (s !== i);
      }
    }
    function Pd(r) {
      var i = r.ref;
      if (i !== null) {
        var s = r.stateNode;
        switch (r.tag) {
          case 5:
            r = s;
            break;
          default:
            r = s;
        }
        typeof i == "function" ? i(r) : (i.current = r);
      }
    }
    function ib(r) {
      var i = r.alternate;
      i !== null && ((r.alternate = null), ib(i)),
        (r.child = null),
        (r.deletions = null),
        (r.sibling = null),
        r.tag === 5 &&
          ((i = r.stateNode),
          i !== null &&
            (delete i[an],
            delete i[cu],
            delete i[$f],
            delete i[WO],
            delete i[qO])),
        (r.stateNode = null),
        (r.return = null),
        (r.dependencies = null),
        (r.memoizedProps = null),
        (r.memoizedState = null),
        (r.pendingProps = null),
        (r.stateNode = null),
        (r.updateQueue = null);
    }
    function ab(r) {
      return r.tag === 5 || r.tag === 3 || r.tag === 4;
    }
    function ub(r) {
      e: for (;;) {
        for (; r.sibling === null; ) {
          if (r.return === null || ab(r.return)) return null;
          r = r.return;
        }
        for (
          r.sibling.return = r.return, r = r.sibling;
          r.tag !== 5 && r.tag !== 6 && r.tag !== 18;

        ) {
          if (r.flags & 2 || r.child === null || r.tag === 4) continue e;
          (r.child.return = r), (r = r.child);
        }
        if (!(r.flags & 2)) return r.stateNode;
      }
    }
    function Ed(r, i, s) {
      var p = r.tag;
      if (p === 5 || p === 6)
        (r = r.stateNode),
          i
            ? s.nodeType === 8
              ? s.parentNode.insertBefore(r, i)
              : s.insertBefore(r, i)
            : (s.nodeType === 8
                ? ((i = s.parentNode), i.insertBefore(r, s))
                : ((i = s), i.appendChild(r)),
              (s = s._reactRootContainer),
              s != null || i.onclick !== null || (i.onclick = ns));
      else if (p !== 4 && ((r = r.child), r !== null))
        for (Ed(r, i, s), r = r.sibling; r !== null; )
          Ed(r, i, s), (r = r.sibling);
    }
    function kd(r, i, s) {
      var p = r.tag;
      if (p === 5 || p === 6)
        (r = r.stateNode), i ? s.insertBefore(r, i) : s.appendChild(r);
      else if (p !== 4 && ((r = r.child), r !== null))
        for (kd(r, i, s), r = r.sibling; r !== null; )
          kd(r, i, s), (r = r.sibling);
    }
    var Tt = null,
      zr = !1;
    function fo(r, i, s) {
      for (s = s.child; s !== null; ) lb(r, i, s), (s = s.sibling);
    }
    function lb(r, i, s) {
      if (hr && typeof hr.onCommitFiberUnmount == "function")
        try {
          hr.onCommitFiberUnmount(Ri, s);
        } catch {}
      switch (s.tag) {
        case 5:
          Lt || ua(s, i);
        case 6:
          var p = Tt,
            b = zr;
          (Tt = null),
            fo(r, i, s),
            (Tt = p),
            (zr = b),
            Tt !== null &&
              (zr
                ? ((r = Tt),
                  (s = s.stateNode),
                  r.nodeType === 8
                    ? r.parentNode.removeChild(s)
                    : r.removeChild(s))
                : Tt.removeChild(s.stateNode));
          break;
        case 18:
          Tt !== null &&
            (zr
              ? ((r = Tt),
                (s = s.stateNode),
                r.nodeType === 8
                  ? Ff(r.parentNode, s)
                  : r.nodeType === 1 && Ff(r, s),
                Xo(r))
              : Ff(Tt, s.stateNode));
          break;
        case 4:
          (p = Tt),
            (b = zr),
            (Tt = s.stateNode.containerInfo),
            (zr = !0),
            fo(r, i, s),
            (Tt = p),
            (zr = b);
          break;
        case 0:
        case 11:
        case 14:
        case 15:
          if (
            !Lt &&
            ((p = s.updateQueue),
            p !== null && ((p = p.lastEffect), p !== null))
          ) {
            b = p = p.next;
            do {
              var y = b,
                _ = y.destroy;
              (y = y.tag),
                _ !== void 0 && (y & 2 || y & 4) && nb(s, i, _),
                (b = b.next);
            } while (b !== p);
          }
          fo(r, i, s);
          break;
        case 1:
          if (
            !Lt &&
            (ua(s, i),
            (p = s.stateNode),
            typeof p.componentWillUnmount == "function")
          )
            try {
              (p.props = s.memoizedProps),
                (p.state = s.memoizedState),
                p.componentWillUnmount();
            } catch (P) {
              lt(s, i, P);
            }
          fo(r, i, s);
          break;
        case 21:
          fo(r, i, s);
          break;
        case 22:
          s.mode & 1
            ? ((Lt = (p = Lt) || s.memoizedState !== null),
              fo(r, i, s),
              (Lt = p))
            : fo(r, i, s);
          break;
        default:
          fo(r, i, s);
      }
    }
    function sb(r) {
      var i = r.updateQueue;
      if (i !== null) {
        r.updateQueue = null;
        var s = r.stateNode;
        s === null && (s = r.stateNode = new ux()),
          i.forEach(function (p) {
            var b = bx.bind(null, r, p);
            s.has(p) || (s.add(p), p.then(b, b));
          });
      }
    }
    function Rr(r, i) {
      var s = i.deletions;
      if (s !== null)
        for (var p = 0; p < s.length; p++) {
          var b = s[p];
          try {
            var y = r,
              _ = i,
              P = _;
            e: for (; P !== null; ) {
              switch (P.tag) {
                case 5:
                  (Tt = P.stateNode), (zr = !1);
                  break e;
                case 3:
                  (Tt = P.stateNode.containerInfo), (zr = !0);
                  break e;
                case 4:
                  (Tt = P.stateNode.containerInfo), (zr = !0);
                  break e;
              }
              P = P.return;
            }
            if (Tt === null) throw Error(o(160));
            lb(y, _, b), (Tt = null), (zr = !1);
            var T = b.alternate;
            T !== null && (T.return = null), (b.return = null);
          } catch (L) {
            lt(b, i, L);
          }
        }
      if (i.subtreeFlags & 12854)
        for (i = i.child; i !== null; ) cb(i, r), (i = i.sibling);
    }
    function cb(r, i) {
      var s = r.alternate,
        p = r.flags;
      switch (r.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          if ((Rr(i, r), sn(r), p & 4)) {
            try {
              _u(3, r, r.return), Es(3, r);
            } catch (se) {
              lt(r, r.return, se);
            }
            try {
              _u(5, r, r.return);
            } catch (se) {
              lt(r, r.return, se);
            }
          }
          break;
        case 1:
          Rr(i, r), sn(r), p & 512 && s !== null && ua(s, s.return);
          break;
        case 5:
          if (
            (Rr(i, r),
            sn(r),
            p & 512 && s !== null && ua(s, s.return),
            r.flags & 32)
          ) {
            var b = r.stateNode;
            try {
              U(b, "");
            } catch (se) {
              lt(r, r.return, se);
            }
          }
          if (p & 4 && ((b = r.stateNode), b != null)) {
            var y = r.memoizedProps,
              _ = s !== null ? s.memoizedProps : y,
              P = r.type,
              T = r.updateQueue;
            if (((r.updateQueue = null), T !== null))
              try {
                P === "input" &&
                  y.type === "radio" &&
                  y.name != null &&
                  Ar(b, y),
                  fe(P, _);
                var L = fe(P, y);
                for (_ = 0; _ < T.length; _ += 2) {
                  var Q = T[_],
                    Y = T[_ + 1];
                  Q === "style"
                    ? xe(b, Y)
                    : Q === "dangerouslySetInnerHTML"
                    ? B(b, Y)
                    : Q === "children"
                    ? U(b, Y)
                    : j(b, Q, Y, L);
                }
                switch (P) {
                  case "input":
                    Yn(b, y);
                    break;
                  case "textarea":
                    Gn(b, y);
                    break;
                  case "select":
                    var X = b._wrapperState.wasMultiple;
                    b._wrapperState.wasMultiple = !!y.multiple;
                    var ne = y.value;
                    ne != null
                      ? Ht(b, !!y.multiple, ne, !1)
                      : X !== !!y.multiple &&
                        (y.defaultValue != null
                          ? Ht(b, !!y.multiple, y.defaultValue, !0)
                          : Ht(b, !!y.multiple, y.multiple ? [] : "", !1));
                }
                b[cu] = y;
              } catch (se) {
                lt(r, r.return, se);
              }
          }
          break;
        case 6:
          if ((Rr(i, r), sn(r), p & 4)) {
            if (r.stateNode === null) throw Error(o(162));
            (b = r.stateNode), (y = r.memoizedProps);
            try {
              b.nodeValue = y;
            } catch (se) {
              lt(r, r.return, se);
            }
          }
          break;
        case 3:
          if (
            (Rr(i, r),
            sn(r),
            p & 4 && s !== null && s.memoizedState.isDehydrated)
          )
            try {
              Xo(i.containerInfo);
            } catch (se) {
              lt(r, r.return, se);
            }
          break;
        case 4:
          Rr(i, r), sn(r);
          break;
        case 13:
          Rr(i, r),
            sn(r),
            (b = r.child),
            b.flags & 8192 &&
              ((y = b.memoizedState !== null),
              (b.stateNode.isHidden = y),
              !y ||
                (b.alternate !== null && b.alternate.memoizedState !== null) ||
                (Id = ot())),
            p & 4 && sb(r);
          break;
        case 22:
          if (
            ((Q = s !== null && s.memoizedState !== null),
            r.mode & 1 ? ((Lt = (L = Lt) || Q), Rr(i, r), (Lt = L)) : Rr(i, r),
            sn(r),
            p & 8192)
          ) {
            if (
              ((L = r.memoizedState !== null),
              (r.stateNode.isHidden = L) && !Q && r.mode & 1)
            )
              for (oe = r, Q = r.child; Q !== null; ) {
                for (Y = oe = Q; oe !== null; ) {
                  switch (((X = oe), (ne = X.child), X.tag)) {
                    case 0:
                    case 11:
                    case 14:
                    case 15:
                      _u(4, X, X.return);
                      break;
                    case 1:
                      ua(X, X.return);
                      var ue = X.stateNode;
                      if (typeof ue.componentWillUnmount == "function") {
                        (p = X), (s = X.return);
                        try {
                          (i = p),
                            (ue.props = i.memoizedProps),
                            (ue.state = i.memoizedState),
                            ue.componentWillUnmount();
                        } catch (se) {
                          lt(p, s, se);
                        }
                      }
                      break;
                    case 5:
                      ua(X, X.return);
                      break;
                    case 22:
                      if (X.memoizedState !== null) {
                        pb(Y);
                        continue;
                      }
                  }
                  ne !== null ? ((ne.return = X), (oe = ne)) : pb(Y);
                }
                Q = Q.sibling;
              }
            e: for (Q = null, Y = r; ; ) {
              if (Y.tag === 5) {
                if (Q === null) {
                  Q = Y;
                  try {
                    (b = Y.stateNode),
                      L
                        ? ((y = b.style),
                          typeof y.setProperty == "function"
                            ? y.setProperty("display", "none", "important")
                            : (y.display = "none"))
                        : ((P = Y.stateNode),
                          (T = Y.memoizedProps.style),
                          (_ =
                            T != null && T.hasOwnProperty("display")
                              ? T.display
                              : null),
                          (P.style.display = ae("display", _)));
                  } catch (se) {
                    lt(r, r.return, se);
                  }
                }
              } else if (Y.tag === 6) {
                if (Q === null)
                  try {
                    Y.stateNode.nodeValue = L ? "" : Y.memoizedProps;
                  } catch (se) {
                    lt(r, r.return, se);
                  }
              } else if (
                ((Y.tag !== 22 && Y.tag !== 23) ||
                  Y.memoizedState === null ||
                  Y === r) &&
                Y.child !== null
              ) {
                (Y.child.return = Y), (Y = Y.child);
                continue;
              }
              if (Y === r) break e;
              for (; Y.sibling === null; ) {
                if (Y.return === null || Y.return === r) break e;
                Q === Y && (Q = null), (Y = Y.return);
              }
              Q === Y && (Q = null),
                (Y.sibling.return = Y.return),
                (Y = Y.sibling);
            }
          }
          break;
        case 19:
          Rr(i, r), sn(r), p & 4 && sb(r);
          break;
        case 21:
          break;
        default:
          Rr(i, r), sn(r);
      }
    }
    function sn(r) {
      var i = r.flags;
      if (i & 2) {
        try {
          e: {
            for (var s = r.return; s !== null; ) {
              if (ab(s)) {
                var p = s;
                break e;
              }
              s = s.return;
            }
            throw Error(o(160));
          }
          switch (p.tag) {
            case 5:
              var b = p.stateNode;
              p.flags & 32 && (U(b, ""), (p.flags &= -33));
              var y = ub(r);
              kd(r, y, b);
              break;
            case 3:
            case 4:
              var _ = p.stateNode.containerInfo,
                P = ub(r);
              Ed(r, P, _);
              break;
            default:
              throw Error(o(161));
          }
        } catch (T) {
          lt(r, r.return, T);
        }
        r.flags &= -3;
      }
      i & 4096 && (r.flags &= -4097);
    }
    function sx(r, i, s) {
      (oe = r), fb(r);
    }
    function fb(r, i, s) {
      for (var p = (r.mode & 1) !== 0; oe !== null; ) {
        var b = oe,
          y = b.child;
        if (b.tag === 22 && p) {
          var _ = b.memoizedState !== null || Ps;
          if (!_) {
            var P = b.alternate,
              T = (P !== null && P.memoizedState !== null) || Lt;
            P = Ps;
            var L = Lt;
            if (((Ps = _), (Lt = T) && !L))
              for (oe = b; oe !== null; )
                (_ = oe),
                  (T = _.child),
                  _.tag === 22 && _.memoizedState !== null
                    ? vb(b)
                    : T !== null
                    ? ((T.return = _), (oe = T))
                    : vb(b);
            for (; y !== null; ) (oe = y), fb(y), (y = y.sibling);
            (oe = b), (Ps = P), (Lt = L);
          }
          db(r);
        } else
          b.subtreeFlags & 8772 && y !== null
            ? ((y.return = b), (oe = y))
            : db(r);
      }
    }
    function db(r) {
      for (; oe !== null; ) {
        var i = oe;
        if (i.flags & 8772) {
          var s = i.alternate;
          try {
            if (i.flags & 8772)
              switch (i.tag) {
                case 0:
                case 11:
                case 15:
                  Lt || Es(5, i);
                  break;
                case 1:
                  var p = i.stateNode;
                  if (i.flags & 4 && !Lt)
                    if (s === null) p.componentDidMount();
                    else {
                      var b =
                        i.elementType === i.type
                          ? s.memoizedProps
                          : Cr(i.type, s.memoizedProps);
                      p.componentDidUpdate(
                        b,
                        s.memoizedState,
                        p.__reactInternalSnapshotBeforeUpdate
                      );
                    }
                  var y = i.updateQueue;
                  y !== null && lm(i, y, p);
                  break;
                case 3:
                  var _ = i.updateQueue;
                  if (_ !== null) {
                    if (((s = null), i.child !== null))
                      switch (i.child.tag) {
                        case 5:
                          s = i.child.stateNode;
                          break;
                        case 1:
                          s = i.child.stateNode;
                      }
                    lm(i, _, s);
                  }
                  break;
                case 5:
                  var P = i.stateNode;
                  if (s === null && i.flags & 4) {
                    s = P;
                    var T = i.memoizedProps;
                    switch (i.type) {
                      case "button":
                      case "input":
                      case "select":
                      case "textarea":
                        T.autoFocus && s.focus();
                        break;
                      case "img":
                        T.src && (s.src = T.src);
                    }
                  }
                  break;
                case 6:
                  break;
                case 4:
                  break;
                case 12:
                  break;
                case 13:
                  if (i.memoizedState === null) {
                    var L = i.alternate;
                    if (L !== null) {
                      var Q = L.memoizedState;
                      if (Q !== null) {
                        var Y = Q.dehydrated;
                        Y !== null && Xo(Y);
                      }
                    }
                  }
                  break;
                case 19:
                case 17:
                case 21:
                case 22:
                case 23:
                case 25:
                  break;
                default:
                  throw Error(o(163));
              }
            Lt || (i.flags & 512 && Pd(i));
          } catch (X) {
            lt(i, i.return, X);
          }
        }
        if (i === r) {
          oe = null;
          break;
        }
        if (((s = i.sibling), s !== null)) {
          (s.return = i.return), (oe = s);
          break;
        }
        oe = i.return;
      }
    }
    function pb(r) {
      for (; oe !== null; ) {
        var i = oe;
        if (i === r) {
          oe = null;
          break;
        }
        var s = i.sibling;
        if (s !== null) {
          (s.return = i.return), (oe = s);
          break;
        }
        oe = i.return;
      }
    }
    function vb(r) {
      for (; oe !== null; ) {
        var i = oe;
        try {
          switch (i.tag) {
            case 0:
            case 11:
            case 15:
              var s = i.return;
              try {
                Es(4, i);
              } catch (T) {
                lt(i, s, T);
              }
              break;
            case 1:
              var p = i.stateNode;
              if (typeof p.componentDidMount == "function") {
                var b = i.return;
                try {
                  p.componentDidMount();
                } catch (T) {
                  lt(i, b, T);
                }
              }
              var y = i.return;
              try {
                Pd(i);
              } catch (T) {
                lt(i, y, T);
              }
              break;
            case 5:
              var _ = i.return;
              try {
                Pd(i);
              } catch (T) {
                lt(i, _, T);
              }
          }
        } catch (T) {
          lt(i, i.return, T);
        }
        if (i === r) {
          oe = null;
          break;
        }
        var P = i.sibling;
        if (P !== null) {
          (P.return = i.return), (oe = P);
          break;
        }
        oe = i.return;
      }
    }
    var cx = Math.ceil,
      ks = C.ReactCurrentDispatcher,
      jd = C.ReactCurrentOwner,
      _r = C.ReactCurrentBatchConfig,
      Le = 0,
      St = null,
      pt = null,
      Mt = 0,
      cr = 0,
      la = ao(0),
      yt = 0,
      Ou = null,
      ri = 0,
      js = 0,
      Ad = 0,
      xu = null,
      Gt = null,
      Id = 0,
      sa = 1 / 0,
      Rn = null,
      As = !1,
      Td = null,
      po = null,
      Is = !1,
      vo = null,
      Ts = 0,
      Su = 0,
      Md = null,
      Ms = -1,
      Ns = 0;
    function Vt() {
      return Le & 6 ? ot() : Ms !== -1 ? Ms : (Ms = ot());
    }
    function ho(r) {
      return r.mode & 1
        ? Le & 2 && Mt !== 0
          ? Mt & -Mt
          : HO.transition !== null
          ? (Ns === 0 && (Ns = Ll()), Ns)
          : ((r = Ve),
            r !== 0 ||
              ((r = window.event), (r = r === void 0 ? 16 : Kl(r.type))),
            r)
        : 1;
    }
    function Lr(r, i, s, p) {
      if (50 < Su) throw ((Su = 0), (Md = null), Error(o(185)));
      Vo(r, s, p),
        (!(Le & 2) || r !== St) &&
          (r === St && (!(Le & 2) && (js |= s), yt === 4 && mo(r, Mt)),
          Zt(r, p),
          s === 1 &&
            Le === 0 &&
            !(i.mode & 1) &&
            ((sa = ot() + 500), us && lo()));
    }
    function Zt(r, i) {
      var s = r.callbackNode;
      mf(r, i);
      var p = Di(r, r === St ? Mt : 0);
      if (p === 0)
        s !== null && Cl(s), (r.callbackNode = null), (r.callbackPriority = 0);
      else if (((i = p & -p), r.callbackPriority !== i)) {
        if ((s != null && Cl(s), i === 1))
          r.tag === 0 ? KO(mb.bind(null, r)) : Zh(mb.bind(null, r)),
            $O(function () {
              !(Le & 6) && lo();
            }),
            (s = null);
        else {
          switch (Bl(p)) {
            case 1:
              s = qa;
              break;
            case 4:
              s = zl;
              break;
            case 16:
              s = zi;
              break;
            case 536870912:
              s = Rl;
              break;
            default:
              s = zi;
          }
          s = Sb(s, hb.bind(null, r));
        }
        (r.callbackPriority = i), (r.callbackNode = s);
      }
    }
    function hb(r, i) {
      if (((Ms = -1), (Ns = 0), Le & 6)) throw Error(o(327));
      var s = r.callbackNode;
      if (ca() && r.callbackNode !== s) return null;
      var p = Di(r, r === St ? Mt : 0);
      if (p === 0) return null;
      if (p & 30 || p & r.expiredLanes || i) i = Cs(r, p);
      else {
        i = p;
        var b = Le;
        Le |= 2;
        var y = yb();
        (St !== r || Mt !== i) && ((Rn = null), (sa = ot() + 500), oi(r, i));
        do
          try {
            px();
            break;
          } catch (P) {
            bb(r, P);
          }
        while (1);
        Jf(),
          (ks.current = y),
          (Le = b),
          pt !== null ? (i = 0) : ((St = null), (Mt = 0), (i = yt));
      }
      if (i !== 0) {
        if (
          (i === 2 && ((b = Ka(r)), b !== 0 && ((p = b), (i = Nd(r, b)))),
          i === 1)
        )
          throw ((s = Ou), oi(r, 0), mo(r, p), Zt(r, ot()), s);
        if (i === 6) mo(r, p);
        else {
          if (
            ((b = r.current.alternate),
            !(p & 30) &&
              !fx(b) &&
              ((i = Cs(r, p)),
              i === 2 && ((y = Ka(r)), y !== 0 && ((p = y), (i = Nd(r, y)))),
              i === 1))
          )
            throw ((s = Ou), oi(r, 0), mo(r, p), Zt(r, ot()), s);
          switch (((r.finishedWork = b), (r.finishedLanes = p), i)) {
            case 0:
            case 1:
              throw Error(o(345));
            case 2:
              ii(r, Gt, Rn);
              break;
            case 3:
              if (
                (mo(r, p),
                (p & 130023424) === p && ((i = Id + 500 - ot()), 10 < i))
              ) {
                if (Di(r, 0) !== 0) break;
                if (((b = r.suspendedLanes), (b & p) !== p)) {
                  Vt(), (r.pingedLanes |= r.suspendedLanes & b);
                  break;
                }
                r.timeoutHandle = Uf(ii.bind(null, r, Gt, Rn), i);
                break;
              }
              ii(r, Gt, Rn);
              break;
            case 4:
              if ((mo(r, p), (p & 4194240) === p)) break;
              for (i = r.eventTimes, b = -1; 0 < p; ) {
                var _ = 31 - ar(p);
                (y = 1 << _), (_ = i[_]), _ > b && (b = _), (p &= ~y);
              }
              if (
                ((p = b),
                (p = ot() - p),
                (p =
                  (120 > p
                    ? 120
                    : 480 > p
                    ? 480
                    : 1080 > p
                    ? 1080
                    : 1920 > p
                    ? 1920
                    : 3e3 > p
                    ? 3e3
                    : 4320 > p
                    ? 4320
                    : 1960 * cx(p / 1960)) - p),
                10 < p)
              ) {
                r.timeoutHandle = Uf(ii.bind(null, r, Gt, Rn), p);
                break;
              }
              ii(r, Gt, Rn);
              break;
            case 5:
              ii(r, Gt, Rn);
              break;
            default:
              throw Error(o(329));
          }
        }
      }
      return Zt(r, ot()), r.callbackNode === s ? hb.bind(null, r) : null;
    }
    function Nd(r, i) {
      var s = xu;
      return (
        r.current.memoizedState.isDehydrated && (oi(r, i).flags |= 256),
        (r = Cs(r, i)),
        r !== 2 && ((i = Gt), (Gt = s), i !== null && Cd(i)),
        r
      );
    }
    function Cd(r) {
      Gt === null ? (Gt = r) : Gt.push.apply(Gt, r);
    }
    function fx(r) {
      for (var i = r; ; ) {
        if (i.flags & 16384) {
          var s = i.updateQueue;
          if (s !== null && ((s = s.stores), s !== null))
            for (var p = 0; p < s.length; p++) {
              var b = s[p],
                y = b.getSnapshot;
              b = b.value;
              try {
                if (!Mr(y(), b)) return !1;
              } catch {
                return !1;
              }
            }
        }
        if (((s = i.child), i.subtreeFlags & 16384 && s !== null))
          (s.return = i), (i = s);
        else {
          if (i === r) break;
          for (; i.sibling === null; ) {
            if (i.return === null || i.return === r) return !0;
            i = i.return;
          }
          (i.sibling.return = i.return), (i = i.sibling);
        }
      }
      return !0;
    }
    function mo(r, i) {
      for (
        i &= ~Ad,
          i &= ~js,
          r.suspendedLanes |= i,
          r.pingedLanes &= ~i,
          r = r.expirationTimes;
        0 < i;

      ) {
        var s = 31 - ar(i),
          p = 1 << s;
        (r[s] = -1), (i &= ~p);
      }
    }
    function mb(r) {
      if (Le & 6) throw Error(o(327));
      ca();
      var i = Di(r, 0);
      if (!(i & 1)) return Zt(r, ot()), null;
      var s = Cs(r, i);
      if (r.tag !== 0 && s === 2) {
        var p = Ka(r);
        p !== 0 && ((i = p), (s = Nd(r, p)));
      }
      if (s === 1) throw ((s = Ou), oi(r, 0), mo(r, i), Zt(r, ot()), s);
      if (s === 6) throw Error(o(345));
      return (
        (r.finishedWork = r.current.alternate),
        (r.finishedLanes = i),
        ii(r, Gt, Rn),
        Zt(r, ot()),
        null
      );
    }
    function zd(r, i) {
      var s = Le;
      Le |= 1;
      try {
        return r(i);
      } finally {
        (Le = s), Le === 0 && ((sa = ot() + 500), us && lo());
      }
    }
    function ni(r) {
      vo !== null && vo.tag === 0 && !(Le & 6) && ca();
      var i = Le;
      Le |= 1;
      var s = _r.transition,
        p = Ve;
      try {
        if (((_r.transition = null), (Ve = 1), r)) return r();
      } finally {
        (Ve = p), (_r.transition = s), (Le = i), !(Le & 6) && lo();
      }
    }
    function Rd() {
      (cr = la.current), tt(la);
    }
    function oi(r, i) {
      (r.finishedWork = null), (r.finishedLanes = 0);
      var s = r.timeoutHandle;
      if ((s !== -1 && ((r.timeoutHandle = -1), FO(s)), pt !== null))
        for (s = pt.return; s !== null; ) {
          var p = s;
          switch ((Kf(p), p.tag)) {
            case 1:
              (p = p.type.childContextTypes), p != null && is();
              break;
            case 3:
              ia(), tt(Qt), tt(Ct), ud();
              break;
            case 5:
              id(p);
              break;
            case 4:
              ia();
              break;
            case 13:
              tt(it);
              break;
            case 19:
              tt(it);
              break;
            case 10:
              Gf(p.type._context);
              break;
            case 22:
            case 23:
              Rd();
          }
          s = s.return;
        }
      if (
        ((St = r),
        (pt = r = bo(r.current, null)),
        (Mt = cr = i),
        (yt = 0),
        (Ou = null),
        (Ad = js = ri = 0),
        (Gt = xu = null),
        Zo !== null)
      ) {
        for (i = 0; i < Zo.length; i++)
          if (((s = Zo[i]), (p = s.interleaved), p !== null)) {
            s.interleaved = null;
            var b = p.next,
              y = s.pending;
            if (y !== null) {
              var _ = y.next;
              (y.next = b), (p.next = _);
            }
            s.pending = p;
          }
        Zo = null;
      }
      return r;
    }
    function bb(r, i) {
      do {
        var s = pt;
        try {
          if ((Jf(), (ys.current = Os), gs)) {
            for (var p = at.memoizedState; p !== null; ) {
              var b = p.queue;
              b !== null && (b.pending = null), (p = p.next);
            }
            gs = !1;
          }
          if (
            ((ti = 0),
            (xt = bt = at = null),
            (mu = !1),
            (bu = 0),
            (jd.current = null),
            s === null || s.return === null)
          ) {
            (yt = 1), (Ou = i), (pt = null);
            break;
          }
          e: {
            var y = r,
              _ = s.return,
              P = s,
              T = i;
            if (
              ((i = Mt),
              (P.flags |= 32768),
              T !== null && typeof T == "object" && typeof T.then == "function")
            ) {
              var L = T,
                Q = P,
                Y = Q.tag;
              if (!(Q.mode & 1) && (Y === 0 || Y === 11 || Y === 15)) {
                var X = Q.alternate;
                X
                  ? ((Q.updateQueue = X.updateQueue),
                    (Q.memoizedState = X.memoizedState),
                    (Q.lanes = X.lanes))
                  : ((Q.updateQueue = null), (Q.memoizedState = null));
              }
              var ne = Fm(_);
              if (ne !== null) {
                (ne.flags &= -257),
                  $m(ne, _, P, y, i),
                  ne.mode & 1 && Um(y, L, i),
                  (i = ne),
                  (T = L);
                var ue = i.updateQueue;
                if (ue === null) {
                  var se = new Set();
                  se.add(T), (i.updateQueue = se);
                } else ue.add(T);
                break e;
              } else {
                if (!(i & 1)) {
                  Um(y, L, i), Ld();
                  break e;
                }
                T = Error(o(426));
              }
            } else if (nt && P.mode & 1) {
              var ct = Fm(_);
              if (ct !== null) {
                !(ct.flags & 65536) && (ct.flags |= 256),
                  $m(ct, _, P, y, i),
                  Qf(aa(T, P));
                break e;
              }
            }
            (y = T = aa(T, P)),
              yt !== 4 && (yt = 2),
              xu === null ? (xu = [y]) : xu.push(y),
              (y = _);
            do {
              switch (y.tag) {
                case 3:
                  (y.flags |= 65536), (i &= -i), (y.lanes |= i);
                  var z = Bm(y, T, i);
                  um(y, z);
                  break e;
                case 1:
                  P = T;
                  var N = y.type,
                    R = y.stateNode;
                  if (
                    !(y.flags & 128) &&
                    (typeof N.getDerivedStateFromError == "function" ||
                      (R !== null &&
                        typeof R.componentDidCatch == "function" &&
                        (po === null || !po.has(R))))
                  ) {
                    (y.flags |= 65536), (i &= -i), (y.lanes |= i);
                    var G = Dm(y, P, i);
                    um(y, G);
                    break e;
                  }
              }
              y = y.return;
            } while (y !== null);
          }
          wb(s);
        } catch (ve) {
          (i = ve), pt === s && s !== null && (pt = s = s.return);
          continue;
        }
        break;
      } while (1);
    }
    function yb() {
      var r = ks.current;
      return (ks.current = Os), r === null ? Os : r;
    }
    function Ld() {
      (yt === 0 || yt === 3 || yt === 2) && (yt = 4),
        St === null || (!(ri & 268435455) && !(js & 268435455)) || mo(St, Mt);
    }
    function Cs(r, i) {
      var s = Le;
      Le |= 2;
      var p = yb();
      (St !== r || Mt !== i) && ((Rn = null), oi(r, i));
      do
        try {
          dx();
          break;
        } catch (b) {
          bb(r, b);
        }
      while (1);
      if ((Jf(), (Le = s), (ks.current = p), pt !== null)) throw Error(o(261));
      return (St = null), (Mt = 0), yt;
    }
    function dx() {
      for (; pt !== null; ) gb(pt);
    }
    function px() {
      for (; pt !== null && !uf(); ) gb(pt);
    }
    function gb(r) {
      var i = xb(r.alternate, r, cr);
      (r.memoizedProps = r.pendingProps),
        i === null ? wb(r) : (pt = i),
        (jd.current = null);
    }
    function wb(r) {
      var i = r;
      do {
        var s = i.alternate;
        if (((r = i.return), i.flags & 32768)) {
          if (((s = ax(s, i)), s !== null)) {
            (s.flags &= 32767), (pt = s);
            return;
          }
          if (r !== null)
            (r.flags |= 32768), (r.subtreeFlags = 0), (r.deletions = null);
          else {
            (yt = 6), (pt = null);
            return;
          }
        } else if (((s = ix(s, i, cr)), s !== null)) {
          pt = s;
          return;
        }
        if (((i = i.sibling), i !== null)) {
          pt = i;
          return;
        }
        pt = i = r;
      } while (i !== null);
      yt === 0 && (yt = 5);
    }
    function ii(r, i, s) {
      var p = Ve,
        b = _r.transition;
      try {
        (_r.transition = null), (Ve = 1), vx(r, i, s, p);
      } finally {
        (_r.transition = b), (Ve = p);
      }
      return null;
    }
    function vx(r, i, s, p) {
      do ca();
      while (vo !== null);
      if (Le & 6) throw Error(o(327));
      s = r.finishedWork;
      var b = r.finishedLanes;
      if (s === null) return null;
      if (((r.finishedWork = null), (r.finishedLanes = 0), s === r.current))
        throw Error(o(177));
      (r.callbackNode = null), (r.callbackPriority = 0);
      var y = s.lanes | s.childLanes;
      if (
        (bf(r, y),
        r === St && ((pt = St = null), (Mt = 0)),
        (!(s.subtreeFlags & 2064) && !(s.flags & 2064)) ||
          Is ||
          ((Is = !0),
          Sb(zi, function () {
            return ca(), null;
          })),
        (y = (s.flags & 15990) !== 0),
        s.subtreeFlags & 15990 || y)
      ) {
        (y = _r.transition), (_r.transition = null);
        var _ = Ve;
        Ve = 1;
        var P = Le;
        (Le |= 4),
          (jd.current = null),
          lx(r, s),
          cb(s, r),
          RO(Bf),
          ($i = !!Lf),
          (Bf = Lf = null),
          (r.current = s),
          sx(s),
          lf(),
          (Le = P),
          (Ve = _),
          (_r.transition = y);
      } else r.current = s;
      if (
        (Is && ((Is = !1), (vo = r), (Ts = b)),
        (y = r.pendingLanes),
        y === 0 && (po = null),
        ff(s.stateNode),
        Zt(r, ot()),
        i !== null)
      )
        for (p = r.onRecoverableError, s = 0; s < i.length; s++)
          (b = i[s]), p(b.value, { componentStack: b.stack, digest: b.digest });
      if (As) throw ((As = !1), (r = Td), (Td = null), r);
      return (
        Ts & 1 && r.tag !== 0 && ca(),
        (y = r.pendingLanes),
        y & 1 ? (r === Md ? Su++ : ((Su = 0), (Md = r))) : (Su = 0),
        lo(),
        null
      );
    }
    function ca() {
      if (vo !== null) {
        var r = Bl(Ts),
          i = _r.transition,
          s = Ve;
        try {
          if (((_r.transition = null), (Ve = 16 > r ? 16 : r), vo === null))
            var p = !1;
          else {
            if (((r = vo), (vo = null), (Ts = 0), Le & 6)) throw Error(o(331));
            var b = Le;
            for (Le |= 4, oe = r.current; oe !== null; ) {
              var y = oe,
                _ = y.child;
              if (oe.flags & 16) {
                var P = y.deletions;
                if (P !== null) {
                  for (var T = 0; T < P.length; T++) {
                    var L = P[T];
                    for (oe = L; oe !== null; ) {
                      var Q = oe;
                      switch (Q.tag) {
                        case 0:
                        case 11:
                        case 15:
                          _u(8, Q, y);
                      }
                      var Y = Q.child;
                      if (Y !== null) (Y.return = Q), (oe = Y);
                      else
                        for (; oe !== null; ) {
                          Q = oe;
                          var X = Q.sibling,
                            ne = Q.return;
                          if ((ib(Q), Q === L)) {
                            oe = null;
                            break;
                          }
                          if (X !== null) {
                            (X.return = ne), (oe = X);
                            break;
                          }
                          oe = ne;
                        }
                    }
                  }
                  var ue = y.alternate;
                  if (ue !== null) {
                    var se = ue.child;
                    if (se !== null) {
                      ue.child = null;
                      do {
                        var ct = se.sibling;
                        (se.sibling = null), (se = ct);
                      } while (se !== null);
                    }
                  }
                  oe = y;
                }
              }
              if (y.subtreeFlags & 2064 && _ !== null) (_.return = y), (oe = _);
              else
                e: for (; oe !== null; ) {
                  if (((y = oe), y.flags & 2048))
                    switch (y.tag) {
                      case 0:
                      case 11:
                      case 15:
                        _u(9, y, y.return);
                    }
                  var z = y.sibling;
                  if (z !== null) {
                    (z.return = y.return), (oe = z);
                    break e;
                  }
                  oe = y.return;
                }
            }
            var N = r.current;
            for (oe = N; oe !== null; ) {
              _ = oe;
              var R = _.child;
              if (_.subtreeFlags & 2064 && R !== null) (R.return = _), (oe = R);
              else
                e: for (_ = N; oe !== null; ) {
                  if (((P = oe), P.flags & 2048))
                    try {
                      switch (P.tag) {
                        case 0:
                        case 11:
                        case 15:
                          Es(9, P);
                      }
                    } catch (ve) {
                      lt(P, P.return, ve);
                    }
                  if (P === _) {
                    oe = null;
                    break e;
                  }
                  var G = P.sibling;
                  if (G !== null) {
                    (G.return = P.return), (oe = G);
                    break e;
                  }
                  oe = P.return;
                }
            }
            if (
              ((Le = b),
              lo(),
              hr && typeof hr.onPostCommitFiberRoot == "function")
            )
              try {
                hr.onPostCommitFiberRoot(Ri, r);
              } catch {}
            p = !0;
          }
          return p;
        } finally {
          (Ve = s), (_r.transition = i);
        }
      }
      return !1;
    }
    function _b(r, i, s) {
      (i = aa(s, i)),
        (i = Bm(r, i, 1)),
        (r = co(r, i, 1)),
        (i = Vt()),
        r !== null && (Vo(r, 1, i), Zt(r, i));
    }
    function lt(r, i, s) {
      if (r.tag === 3) _b(r, r, s);
      else
        for (; i !== null; ) {
          if (i.tag === 3) {
            _b(i, r, s);
            break;
          } else if (i.tag === 1) {
            var p = i.stateNode;
            if (
              typeof i.type.getDerivedStateFromError == "function" ||
              (typeof p.componentDidCatch == "function" &&
                (po === null || !po.has(p)))
            ) {
              (r = aa(s, r)),
                (r = Dm(i, r, 1)),
                (i = co(i, r, 1)),
                (r = Vt()),
                i !== null && (Vo(i, 1, r), Zt(i, r));
              break;
            }
          }
          i = i.return;
        }
    }
    function hx(r, i, s) {
      var p = r.pingCache;
      p !== null && p.delete(i),
        (i = Vt()),
        (r.pingedLanes |= r.suspendedLanes & s),
        St === r &&
          (Mt & s) === s &&
          (yt === 4 || (yt === 3 && (Mt & 130023424) === Mt && 500 > ot() - Id)
            ? oi(r, 0)
            : (Ad |= s)),
        Zt(r, i);
    }
    function Ob(r, i) {
      i === 0 &&
        (r.mode & 1
          ? ((i = Bi), (Bi <<= 1), !(Bi & 130023424) && (Bi = 4194304))
          : (i = 1));
      var s = Vt();
      (r = Nn(r, i)), r !== null && (Vo(r, i, s), Zt(r, s));
    }
    function mx(r) {
      var i = r.memoizedState,
        s = 0;
      i !== null && (s = i.retryLane), Ob(r, s);
    }
    function bx(r, i) {
      var s = 0;
      switch (r.tag) {
        case 13:
          var p = r.stateNode,
            b = r.memoizedState;
          b !== null && (s = b.retryLane);
          break;
        case 19:
          p = r.stateNode;
          break;
        default:
          throw Error(o(314));
      }
      p !== null && p.delete(i), Ob(r, s);
    }
    var xb;
    xb = function (r, i, s) {
      if (r !== null)
        if (r.memoizedProps !== i.pendingProps || Qt.current) Jt = !0;
        else {
          if (!(r.lanes & s) && !(i.flags & 128)) return (Jt = !1), ox(r, i, s);
          Jt = !!(r.flags & 131072);
        }
      else (Jt = !1), nt && i.flags & 1048576 && em(i, ss, i.index);
      switch (((i.lanes = 0), i.tag)) {
        case 2:
          var p = i.type;
          Ss(r, i), (r = i.pendingProps);
          var b = Gi(i, Ct.current);
          na(i, s), (b = cd(null, i, p, r, b, s));
          var y = fd();
          return (
            (i.flags |= 1),
            typeof b == "object" &&
            b !== null &&
            typeof b.render == "function" &&
            b.$$typeof === void 0
              ? ((i.tag = 1),
                (i.memoizedState = null),
                (i.updateQueue = null),
                Yt(p) ? ((y = !0), as(i)) : (y = !1),
                (i.memoizedState =
                  b.state !== null && b.state !== void 0 ? b.state : null),
                td(i),
                (b.updater = hs),
                (i.stateNode = b),
                (b._reactInternals = i),
                nd(i, p, r, s),
                (i = gd(null, i, p, !0, y, s)))
              : ((i.tag = 0),
                nt && y && qf(i),
                $t(null, i, b, s),
                (i = i.child)),
            i
          );
        case 16:
          p = i.elementType;
          e: {
            switch (
              (Ss(r, i),
              (r = i.pendingProps),
              (b = p._init),
              (p = b(p._payload)),
              (i.type = p),
              (b = i.tag = gx(p)),
              (r = Cr(p, r)),
              b)
            ) {
              case 0:
                i = yd(null, i, p, r, s);
                break e;
              case 1:
                i = Xm(null, i, p, r, s);
                break e;
              case 11:
                i = Vm(null, i, p, r, s);
                break e;
              case 14:
                i = Wm(null, i, p, Cr(p.type, r), s);
                break e;
            }
            throw Error(o(306, p, ""));
          }
          return i;
        case 0:
          return (
            (p = i.type),
            (b = i.pendingProps),
            (b = i.elementType === p ? b : Cr(p, b)),
            yd(r, i, p, b, s)
          );
        case 1:
          return (
            (p = i.type),
            (b = i.pendingProps),
            (b = i.elementType === p ? b : Cr(p, b)),
            Xm(r, i, p, b, s)
          );
        case 3:
          e: {
            if ((Qm(i), r === null)) throw Error(o(387));
            (p = i.pendingProps),
              (y = i.memoizedState),
              (b = y.element),
              am(r, i),
              vs(i, p, null, s);
            var _ = i.memoizedState;
            if (((p = _.element), y.isDehydrated))
              if (
                ((y = {
                  element: p,
                  isDehydrated: !1,
                  cache: _.cache,
                  pendingSuspenseBoundaries: _.pendingSuspenseBoundaries,
                  transitions: _.transitions,
                }),
                (i.updateQueue.baseState = y),
                (i.memoizedState = y),
                i.flags & 256)
              ) {
                (b = aa(Error(o(423)), i)), (i = Ym(r, i, p, s, b));
                break e;
              } else if (p !== b) {
                (b = aa(Error(o(424)), i)), (i = Ym(r, i, p, s, b));
                break e;
              } else
                for (
                  sr = io(i.stateNode.containerInfo.firstChild),
                    lr = i,
                    nt = !0,
                    Nr = null,
                    s = hm(i, null, p, s),
                    i.child = s;
                  s;

                )
                  (s.flags = (s.flags & -3) | 4096), (s = s.sibling);
            else {
              if ((ta(), p === b)) {
                i = zn(r, i, s);
                break e;
              }
              $t(r, i, p, s);
            }
            i = i.child;
          }
          return i;
        case 5:
          return (
            mm(i),
            r === null && Xf(i),
            (p = i.type),
            (b = i.pendingProps),
            (y = r !== null ? r.memoizedProps : null),
            (_ = b.children),
            Df(p, b) ? (_ = null) : y !== null && Df(p, y) && (i.flags |= 32),
            Hm(r, i),
            $t(r, i, _, s),
            i.child
          );
        case 6:
          return r === null && Xf(i), null;
        case 13:
          return Jm(r, i, s);
        case 4:
          return (
            od(i, i.stateNode.containerInfo),
            (p = i.pendingProps),
            r === null ? (i.child = oa(i, null, p, s)) : $t(r, i, p, s),
            i.child
          );
        case 11:
          return (
            (p = i.type),
            (b = i.pendingProps),
            (b = i.elementType === p ? b : Cr(p, b)),
            Vm(r, i, p, b, s)
          );
        case 7:
          return $t(r, i, i.pendingProps, s), i.child;
        case 8:
          return $t(r, i, i.pendingProps.children, s), i.child;
        case 12:
          return $t(r, i, i.pendingProps.children, s), i.child;
        case 10:
          e: {
            if (
              ((p = i.type._context),
              (b = i.pendingProps),
              (y = i.memoizedProps),
              (_ = b.value),
              Je(fs, p._currentValue),
              (p._currentValue = _),
              y !== null)
            )
              if (Mr(y.value, _)) {
                if (y.children === b.children && !Qt.current) {
                  i = zn(r, i, s);
                  break e;
                }
              } else
                for (y = i.child, y !== null && (y.return = i); y !== null; ) {
                  var P = y.dependencies;
                  if (P !== null) {
                    _ = y.child;
                    for (var T = P.firstContext; T !== null; ) {
                      if (T.context === p) {
                        if (y.tag === 1) {
                          (T = Cn(-1, s & -s)), (T.tag = 2);
                          var L = y.updateQueue;
                          if (L !== null) {
                            L = L.shared;
                            var Q = L.pending;
                            Q === null
                              ? (T.next = T)
                              : ((T.next = Q.next), (Q.next = T)),
                              (L.pending = T);
                          }
                        }
                        (y.lanes |= s),
                          (T = y.alternate),
                          T !== null && (T.lanes |= s),
                          Zf(y.return, s, i),
                          (P.lanes |= s);
                        break;
                      }
                      T = T.next;
                    }
                  } else if (y.tag === 10)
                    _ = y.type === i.type ? null : y.child;
                  else if (y.tag === 18) {
                    if (((_ = y.return), _ === null)) throw Error(o(341));
                    (_.lanes |= s),
                      (P = _.alternate),
                      P !== null && (P.lanes |= s),
                      Zf(_, s, i),
                      (_ = y.sibling);
                  } else _ = y.child;
                  if (_ !== null) _.return = y;
                  else
                    for (_ = y; _ !== null; ) {
                      if (_ === i) {
                        _ = null;
                        break;
                      }
                      if (((y = _.sibling), y !== null)) {
                        (y.return = _.return), (_ = y);
                        break;
                      }
                      _ = _.return;
                    }
                  y = _;
                }
            $t(r, i, b.children, s), (i = i.child);
          }
          return i;
        case 9:
          return (
            (b = i.type),
            (p = i.pendingProps.children),
            na(i, s),
            (b = gr(b)),
            (p = p(b)),
            (i.flags |= 1),
            $t(r, i, p, s),
            i.child
          );
        case 14:
          return (
            (p = i.type),
            (b = Cr(p, i.pendingProps)),
            (b = Cr(p.type, b)),
            Wm(r, i, p, b, s)
          );
        case 15:
          return qm(r, i, i.type, i.pendingProps, s);
        case 17:
          return (
            (p = i.type),
            (b = i.pendingProps),
            (b = i.elementType === p ? b : Cr(p, b)),
            Ss(r, i),
            (i.tag = 1),
            Yt(p) ? ((r = !0), as(i)) : (r = !1),
            na(i, s),
            fm(i, p, b),
            nd(i, p, b, s),
            gd(null, i, p, !0, r, s)
          );
        case 19:
          return Zm(r, i, s);
        case 22:
          return Km(r, i, s);
      }
      throw Error(o(156, i.tag));
    };
    function Sb(r, i) {
      return Nl(r, i);
    }
    function yx(r, i, s, p) {
      (this.tag = r),
        (this.key = s),
        (this.sibling =
          this.child =
          this.return =
          this.stateNode =
          this.type =
          this.elementType =
            null),
        (this.index = 0),
        (this.ref = null),
        (this.pendingProps = i),
        (this.dependencies =
          this.memoizedState =
          this.updateQueue =
          this.memoizedProps =
            null),
        (this.mode = p),
        (this.subtreeFlags = this.flags = 0),
        (this.deletions = null),
        (this.childLanes = this.lanes = 0),
        (this.alternate = null);
    }
    function Or(r, i, s, p) {
      return new yx(r, i, s, p);
    }
    function Bd(r) {
      return (r = r.prototype), !(!r || !r.isReactComponent);
    }
    function gx(r) {
      if (typeof r == "function") return Bd(r) ? 1 : 0;
      if (r != null) {
        if (((r = r.$$typeof), r === Z)) return 11;
        if (r === we) return 14;
      }
      return 2;
    }
    function bo(r, i) {
      var s = r.alternate;
      return (
        s === null
          ? ((s = Or(r.tag, i, r.key, r.mode)),
            (s.elementType = r.elementType),
            (s.type = r.type),
            (s.stateNode = r.stateNode),
            (s.alternate = r),
            (r.alternate = s))
          : ((s.pendingProps = i),
            (s.type = r.type),
            (s.flags = 0),
            (s.subtreeFlags = 0),
            (s.deletions = null)),
        (s.flags = r.flags & 14680064),
        (s.childLanes = r.childLanes),
        (s.lanes = r.lanes),
        (s.child = r.child),
        (s.memoizedProps = r.memoizedProps),
        (s.memoizedState = r.memoizedState),
        (s.updateQueue = r.updateQueue),
        (i = r.dependencies),
        (s.dependencies =
          i === null ? null : { lanes: i.lanes, firstContext: i.firstContext }),
        (s.sibling = r.sibling),
        (s.index = r.index),
        (s.ref = r.ref),
        s
      );
    }
    function zs(r, i, s, p, b, y) {
      var _ = 2;
      if (((p = r), typeof r == "function")) Bd(r) && (_ = 1);
      else if (typeof r == "string") _ = 5;
      else
        e: switch (r) {
          case $:
            return ai(s.children, b, y, i);
          case F:
            (_ = 8), (b |= 8);
            break;
          case V:
            return (
              (r = Or(12, s, i, b | 2)), (r.elementType = V), (r.lanes = y), r
            );
          case ge:
            return (
              (r = Or(13, s, i, b)), (r.elementType = ge), (r.lanes = y), r
            );
          case Se:
            return (
              (r = Or(19, s, i, b)), (r.elementType = Se), (r.lanes = y), r
            );
          case K:
            return Rs(s, b, y, i);
          default:
            if (typeof r == "object" && r !== null)
              switch (r.$$typeof) {
                case re:
                  _ = 10;
                  break e;
                case he:
                  _ = 9;
                  break e;
                case Z:
                  _ = 11;
                  break e;
                case we:
                  _ = 14;
                  break e;
                case ce:
                  (_ = 16), (p = null);
                  break e;
              }
            throw Error(o(130, r == null ? r : typeof r, ""));
        }
      return (
        (i = Or(_, s, i, b)),
        (i.elementType = r),
        (i.type = p),
        (i.lanes = y),
        i
      );
    }
    function ai(r, i, s, p) {
      return (r = Or(7, r, p, i)), (r.lanes = s), r;
    }
    function Rs(r, i, s, p) {
      return (
        (r = Or(22, r, p, i)),
        (r.elementType = K),
        (r.lanes = s),
        (r.stateNode = { isHidden: !1 }),
        r
      );
    }
    function Dd(r, i, s) {
      return (r = Or(6, r, null, i)), (r.lanes = s), r;
    }
    function Ud(r, i, s) {
      return (
        (i = Or(4, r.children !== null ? r.children : [], r.key, i)),
        (i.lanes = s),
        (i.stateNode = {
          containerInfo: r.containerInfo,
          pendingChildren: null,
          implementation: r.implementation,
        }),
        i
      );
    }
    function wx(r, i, s, p, b) {
      (this.tag = i),
        (this.containerInfo = r),
        (this.finishedWork =
          this.pingCache =
          this.current =
          this.pendingChildren =
            null),
        (this.timeoutHandle = -1),
        (this.callbackNode = this.pendingContext = this.context = null),
        (this.callbackPriority = 0),
        (this.eventTimes = Ha(0)),
        (this.expirationTimes = Ha(-1)),
        (this.entangledLanes =
          this.finishedLanes =
          this.mutableReadLanes =
          this.expiredLanes =
          this.pingedLanes =
          this.suspendedLanes =
          this.pendingLanes =
            0),
        (this.entanglements = Ha(0)),
        (this.identifierPrefix = p),
        (this.onRecoverableError = b),
        (this.mutableSourceEagerHydrationData = null);
    }
    function Fd(r, i, s, p, b, y, _, P, T) {
      return (
        (r = new wx(r, i, s, P, T)),
        i === 1 ? ((i = 1), y === !0 && (i |= 8)) : (i = 0),
        (y = Or(3, null, null, i)),
        (r.current = y),
        (y.stateNode = r),
        (y.memoizedState = {
          element: p,
          isDehydrated: s,
          cache: null,
          transitions: null,
          pendingSuspenseBoundaries: null,
        }),
        td(y),
        r
      );
    }
    function _x(r, i, s) {
      var p =
        3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
      return {
        $$typeof: W,
        key: p == null ? null : "" + p,
        children: r,
        containerInfo: i,
        implementation: s,
      };
    }
    function Pb(r) {
      if (!r) return uo;
      r = r._reactInternals;
      e: {
        if (kn(r) !== r || r.tag !== 1) throw Error(o(170));
        var i = r;
        do {
          switch (i.tag) {
            case 3:
              i = i.stateNode.context;
              break e;
            case 1:
              if (Yt(i.type)) {
                i = i.stateNode.__reactInternalMemoizedMergedChildContext;
                break e;
              }
          }
          i = i.return;
        } while (i !== null);
        throw Error(o(171));
      }
      if (r.tag === 1) {
        var s = r.type;
        if (Yt(s)) return Jh(r, s, i);
      }
      return i;
    }
    function Eb(r, i, s, p, b, y, _, P, T) {
      return (
        (r = Fd(s, p, !0, r, b, y, _, P, T)),
        (r.context = Pb(null)),
        (s = r.current),
        (p = Vt()),
        (b = ho(s)),
        (y = Cn(p, b)),
        (y.callback = i ?? null),
        co(s, y, b),
        (r.current.lanes = b),
        Vo(r, b, p),
        Zt(r, p),
        r
      );
    }
    function Ls(r, i, s, p) {
      var b = i.current,
        y = Vt(),
        _ = ho(b);
      return (
        (s = Pb(s)),
        i.context === null ? (i.context = s) : (i.pendingContext = s),
        (i = Cn(y, _)),
        (i.payload = { element: r }),
        (p = p === void 0 ? null : p),
        p !== null && (i.callback = p),
        (r = co(b, i, _)),
        r !== null && (Lr(r, b, _, y), ps(r, b, _)),
        _
      );
    }
    function Bs(r) {
      if (((r = r.current), !r.child)) return null;
      switch (r.child.tag) {
        case 5:
          return r.child.stateNode;
        default:
          return r.child.stateNode;
      }
    }
    function kb(r, i) {
      if (((r = r.memoizedState), r !== null && r.dehydrated !== null)) {
        var s = r.retryLane;
        r.retryLane = s !== 0 && s < i ? s : i;
      }
    }
    function $d(r, i) {
      kb(r, i), (r = r.alternate) && kb(r, i);
    }
    function Ox() {
      return null;
    }
    var jb =
      typeof reportError == "function"
        ? reportError
        : function (r) {
            console.error(r);
          };
    function Vd(r) {
      this._internalRoot = r;
    }
    (Ds.prototype.render = Vd.prototype.render =
      function (r) {
        var i = this._internalRoot;
        if (i === null) throw Error(o(409));
        Ls(r, i, null, null);
      }),
      (Ds.prototype.unmount = Vd.prototype.unmount =
        function () {
          var r = this._internalRoot;
          if (r !== null) {
            this._internalRoot = null;
            var i = r.containerInfo;
            ni(function () {
              Ls(null, r, null, null);
            }),
              (i[An] = null);
          }
        });
    function Ds(r) {
      this._internalRoot = r;
    }
    Ds.prototype.unstable_scheduleHydration = function (r) {
      if (r) {
        var i = Fl();
        r = { blockedOn: null, target: r, priority: i };
        for (var s = 0; s < nn.length && i !== 0 && i < nn[s].priority; s++);
        nn.splice(s, 0, r), s === 0 && Wl(r);
      }
    };
    function Wd(r) {
      return !(
        !r ||
        (r.nodeType !== 1 && r.nodeType !== 9 && r.nodeType !== 11)
      );
    }
    function Us(r) {
      return !(
        !r ||
        (r.nodeType !== 1 &&
          r.nodeType !== 9 &&
          r.nodeType !== 11 &&
          (r.nodeType !== 8 || r.nodeValue !== " react-mount-point-unstable "))
      );
    }
    function Ab() {}
    function xx(r, i, s, p, b) {
      if (b) {
        if (typeof p == "function") {
          var y = p;
          p = function () {
            var L = Bs(_);
            y.call(L);
          };
        }
        var _ = Eb(i, p, r, 0, null, !1, !1, "", Ab);
        return (
          (r._reactRootContainer = _),
          (r[An] = _.current),
          lu(r.nodeType === 8 ? r.parentNode : r),
          ni(),
          _
        );
      }
      for (; (b = r.lastChild); ) r.removeChild(b);
      if (typeof p == "function") {
        var P = p;
        p = function () {
          var L = Bs(T);
          P.call(L);
        };
      }
      var T = Fd(r, 0, !1, null, null, !1, !1, "", Ab);
      return (
        (r._reactRootContainer = T),
        (r[An] = T.current),
        lu(r.nodeType === 8 ? r.parentNode : r),
        ni(function () {
          Ls(i, T, s, p);
        }),
        T
      );
    }
    function Fs(r, i, s, p, b) {
      var y = s._reactRootContainer;
      if (y) {
        var _ = y;
        if (typeof b == "function") {
          var P = b;
          b = function () {
            var T = Bs(_);
            P.call(T);
          };
        }
        Ls(i, _, r, b);
      } else _ = xx(s, i, r, b, p);
      return Bs(_);
    }
    (Dl = function (r) {
      switch (r.tag) {
        case 3:
          var i = r.stateNode;
          if (i.current.memoizedState.isDehydrated) {
            var s = $o(i.pendingLanes);
            s !== 0 &&
              (Xa(i, s | 1),
              Zt(i, ot()),
              !(Le & 6) && ((sa = ot() + 500), lo()));
          }
          break;
        case 13:
          ni(function () {
            var p = Nn(r, 1);
            if (p !== null) {
              var b = Vt();
              Lr(p, r, 1, b);
            }
          }),
            $d(r, 1);
      }
    }),
      (Qa = function (r) {
        if (r.tag === 13) {
          var i = Nn(r, 134217728);
          if (i !== null) {
            var s = Vt();
            Lr(i, r, 134217728, s);
          }
          $d(r, 134217728);
        }
      }),
      (Ul = function (r) {
        if (r.tag === 13) {
          var i = ho(r),
            s = Nn(r, i);
          if (s !== null) {
            var p = Vt();
            Lr(s, r, i, p);
          }
          $d(r, i);
        }
      }),
      (Fl = function () {
        return Ve;
      }),
      ($l = function (r, i) {
        var s = Ve;
        try {
          return (Ve = r), i();
        } finally {
          Ve = s;
        }
      }),
      (ut = function (r, i, s) {
        switch (i) {
          case "input":
            if ((Yn(r, s), (i = s.name), s.type === "radio" && i != null)) {
              for (s = r; s.parentNode; ) s = s.parentNode;
              for (
                s = s.querySelectorAll(
                  "input[name=" + JSON.stringify("" + i) + '][type="radio"]'
                ),
                  i = 0;
                i < s.length;
                i++
              ) {
                var p = s[i];
                if (p !== r && p.form === r.form) {
                  var b = os(p);
                  if (!b) throw Error(o(90));
                  Bo(p), Yn(p, b);
                }
              }
            }
            break;
          case "textarea":
            Gn(r, s);
            break;
          case "select":
            (i = s.value), i != null && Ht(r, !!s.multiple, i, !1);
        }
      }),
      (Pn = zd),
      (nr = ni);
    var Sx = { usingClientEntryPoint: !1, Events: [fu, Yi, os, Jr, to, zd] },
      Pu = {
        findFiberByHostInstance: Qo,
        bundleType: 0,
        version: "18.2.0",
        rendererPackageName: "react-dom",
      },
      Px = {
        bundleType: Pu.bundleType,
        version: Pu.version,
        rendererPackageName: Pu.rendererPackageName,
        rendererConfig: Pu.rendererConfig,
        overrideHookState: null,
        overrideHookStateDeletePath: null,
        overrideHookStateRenamePath: null,
        overrideProps: null,
        overridePropsDeletePath: null,
        overridePropsRenamePath: null,
        setErrorHandler: null,
        setSuspenseHandler: null,
        scheduleUpdate: null,
        currentDispatcherRef: C.ReactCurrentDispatcher,
        findHostInstanceByFiber: function (r) {
          return (r = Tl(r)), r === null ? null : r.stateNode;
        },
        findFiberByHostInstance: Pu.findFiberByHostInstance || Ox,
        findHostInstancesForRefresh: null,
        scheduleRefresh: null,
        scheduleRoot: null,
        setRefreshHandler: null,
        getCurrentFiber: null,
        reconcilerVersion: "18.2.0-next-9e3b772b8-20220608",
      };
    if (
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" &&
      ((Eu = __REACT_DEVTOOLS_GLOBAL_HOOK__),
      !Eu.isDisabled && Eu.supportsFiber)
    )
      try {
        (Ri = Eu.inject(Px)), (hr = Eu);
      } catch {}
    var Eu;
    (e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Sx),
      (e.createPortal = function (r, i) {
        var s =
          2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
        if (!Wd(i)) throw Error(o(200));
        return _x(r, i, null, s);
      }),
      (e.createRoot = function (r, i) {
        if (!Wd(r)) throw Error(o(299));
        var s = !1,
          p = "",
          b = jb;
        return (
          i != null &&
            (i.unstable_strictMode === !0 && (s = !0),
            i.identifierPrefix !== void 0 && (p = i.identifierPrefix),
            i.onRecoverableError !== void 0 && (b = i.onRecoverableError)),
          (i = Fd(r, 1, !1, null, null, s, !1, p, b)),
          (r[An] = i.current),
          lu(r.nodeType === 8 ? r.parentNode : r),
          new Vd(i)
        );
      }),
      (e.findDOMNode = function (r) {
        if (r == null) return null;
        if (r.nodeType === 1) return r;
        var i = r._reactInternals;
        if (i === void 0)
          throw typeof r.render == "function"
            ? Error(o(188))
            : ((r = Object.keys(r).join(",")), Error(o(268, r)));
        return (r = Tl(i)), (r = r === null ? null : r.stateNode), r;
      }),
      (e.flushSync = function (r) {
        return ni(r);
      }),
      (e.hydrate = function (r, i, s) {
        if (!Us(i)) throw Error(o(200));
        return Fs(null, r, i, !0, s);
      }),
      (e.hydrateRoot = function (r, i, s) {
        if (!Wd(r)) throw Error(o(405));
        var p = (s != null && s.hydratedSources) || null,
          b = !1,
          y = "",
          _ = jb;
        if (
          (s != null &&
            (s.unstable_strictMode === !0 && (b = !0),
            s.identifierPrefix !== void 0 && (y = s.identifierPrefix),
            s.onRecoverableError !== void 0 && (_ = s.onRecoverableError)),
          (i = Eb(i, null, r, 1, s ?? null, b, !1, y, _)),
          (r[An] = i.current),
          lu(r),
          p)
        )
          for (r = 0; r < p.length; r++)
            (s = p[r]),
              (b = s._getVersion),
              (b = b(s._source)),
              i.mutableSourceEagerHydrationData == null
                ? (i.mutableSourceEagerHydrationData = [s, b])
                : i.mutableSourceEagerHydrationData.push(s, b);
        return new Ds(i);
      }),
      (e.render = function (r, i, s) {
        if (!Us(i)) throw Error(o(200));
        return Fs(null, r, i, !1, s);
      }),
      (e.unmountComponentAtNode = function (r) {
        if (!Us(r)) throw Error(o(40));
        return r._reactRootContainer
          ? (ni(function () {
              Fs(null, null, r, !1, function () {
                (r._reactRootContainer = null), (r[An] = null);
              });
            }),
            !0)
          : !1;
      }),
      (e.unstable_batchedUpdates = zd),
      (e.unstable_renderSubtreeIntoContainer = function (r, i, s, p) {
        if (!Us(s)) throw Error(o(200));
        if (r == null || r._reactInternals === void 0) throw Error(o(38));
        return Fs(r, i, s, !1, p);
      }),
      (e.version = "18.2.0-next-9e3b772b8-20220608");
  }),
  U2 = E((e, t) => {
    function n() {
      if (
        !(
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
        )
      )
        try {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
        } catch (o) {
          console.error(o);
        }
    }
    n(), (t.exports = D2());
  }),
  F2 = E((e) => {
    var t = U2();
    (e.createRoot = t.createRoot), (e.hydrateRoot = t.hydrateRoot);
  });
function uw(e, { insertAt: t } = {}) {
  if (!e || typeof document > "u") return;
  let n = document.head || document.getElementsByTagName("head")[0],
    o = document.createElement("style");
  (o.type = "text/css"),
    t === "top" && n.firstChild
      ? n.insertBefore(o, n.firstChild)
      : n.appendChild(o),
    o.styleSheet
      ? (o.styleSheet.cssText = e)
      : o.appendChild(document.createTextNode(e));
}
var lw = J(() => {}),
  $2 = J(() => {
    lw(),
      uw(`#mud-dev-tools{all:initial}#mud-dev-tools *,#mud-dev-tools :before,#mud-dev-tools :after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}#mud-dev-tools :before,#mud-dev-tools :after{--tw-content: ""}#mud-dev-tools{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";font-feature-settings:normal;font-variation-settings:normal}#mud-dev-tools{margin:0;line-height:inherit}#mud-dev-tools hr{height:0;color:inherit;border-top-width:1px}#mud-dev-tools abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}#mud-dev-tools h1,#mud-dev-tools h2,#mud-dev-tools h3,#mud-dev-tools h4,#mud-dev-tools h5,#mud-dev-tools h6{font-size:inherit;font-weight:inherit}#mud-dev-tools a{color:inherit;text-decoration:inherit}#mud-dev-tools b,#mud-dev-tools strong{font-weight:bolder}#mud-dev-tools code,#mud-dev-tools kbd,#mud-dev-tools samp,#mud-dev-tools pre{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-size:1em}#mud-dev-tools small{font-size:80%}#mud-dev-tools sub,#mud-dev-tools sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}#mud-dev-tools sub{bottom:-.25em}#mud-dev-tools sup{top:-.5em}#mud-dev-tools table{text-indent:0;border-color:inherit;border-collapse:collapse}#mud-dev-tools button,#mud-dev-tools input,#mud-dev-tools optgroup,#mud-dev-tools select,#mud-dev-tools textarea{font-family:inherit;font-size:100%;font-weight:inherit;line-height:inherit;color:inherit;margin:0;padding:0}#mud-dev-tools button,#mud-dev-tools select{text-transform:none}#mud-dev-tools button,#mud-dev-tools [type=button],#mud-dev-tools [type=reset],#mud-dev-tools [type=submit]{-webkit-appearance:button;background-color:transparent;background-image:none}#mud-dev-tools :-moz-focusring{outline:auto}#mud-dev-tools :-moz-ui-invalid{box-shadow:none}#mud-dev-tools progress{vertical-align:baseline}#mud-dev-tools ::-webkit-inner-spin-button,#mud-dev-tools ::-webkit-outer-spin-button{height:auto}#mud-dev-tools [type=search]{-webkit-appearance:textfield;outline-offset:-2px}#mud-dev-tools ::-webkit-search-decoration{-webkit-appearance:none}#mud-dev-tools ::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}#mud-dev-tools summary{display:list-item}#mud-dev-tools blockquote,#mud-dev-tools dl,#mud-dev-tools dd,#mud-dev-tools h1,#mud-dev-tools h2,#mud-dev-tools h3,#mud-dev-tools h4,#mud-dev-tools h5,#mud-dev-tools h6,#mud-dev-tools hr,#mud-dev-tools figure,#mud-dev-tools p,#mud-dev-tools pre{margin:0}#mud-dev-tools fieldset{margin:0;padding:0}#mud-dev-tools legend{padding:0}#mud-dev-tools ol,#mud-dev-tools ul,#mud-dev-tools menu{list-style:none;margin:0;padding:0}#mud-dev-tools textarea{resize:vertical}#mud-dev-tools input::-moz-placeholder,#mud-dev-tools textarea::-moz-placeholder{opacity:1;color:#9ca3af}#mud-dev-tools input::placeholder,#mud-dev-tools textarea::placeholder{opacity:1;color:#9ca3af}#mud-dev-tools button,#mud-dev-tools [role=button]{cursor:pointer}#mud-dev-tools :disabled{cursor:default}#mud-dev-tools img,#mud-dev-tools svg,#mud-dev-tools video,#mud-dev-tools canvas,#mud-dev-tools audio,#mud-dev-tools iframe,#mud-dev-tools embed,#mud-dev-tools object{display:block;vertical-align:middle}#mud-dev-tools img,#mud-dev-tools video{max-width:100%;height:auto}#mud-dev-tools [hidden]{display:none}
`);
  }),
  V2 = J(() => {
    lw(),
      uw(`*,:before,:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }#mud-dev-tools :is(.pointer-events-none){pointer-events:none}#mud-dev-tools :is(.pointer-events-auto){pointer-events:auto}#mud-dev-tools :is(.fixed){position:fixed}#mud-dev-tools :is(.absolute){position:absolute}#mud-dev-tools :is(.relative){position:relative}#mud-dev-tools :is(.sticky){position:sticky}#mud-dev-tools :is(.inset-0){inset:0}#mud-dev-tools :is(.bottom-0){bottom:0}#mud-dev-tools :is(.left-0){left:0}#mud-dev-tools :is(.right-0){right:0}#mud-dev-tools :is(.right-full){right:100%}#mud-dev-tools :is(.top-0){top:0}#mud-dev-tools :is(.top-1){top:.25rem}#mud-dev-tools :is(.z-10){z-index:10}#mud-dev-tools :is(.z-20){z-index:20}#mud-dev-tools :is(.m-2){margin:.5rem}#mud-dev-tools :is(.-mx-1){margin-left:-.25rem;margin-right:-.25rem}#mud-dev-tools :is(.block){display:block}#mud-dev-tools :is(.flex){display:flex}#mud-dev-tools :is(.inline-flex){display:inline-flex}#mud-dev-tools :is(.\\!table){display:table!important}#mud-dev-tools :is(.table){display:table}#mud-dev-tools :is(.grid){display:grid}#mud-dev-tools :is(.hidden){display:none}#mud-dev-tools :is(.h-4){height:1rem}#mud-dev-tools :is(.h-\\[1em\\]){height:1em}#mud-dev-tools :is(.h-full){height:100%}#mud-dev-tools :is(.w-2\\/12){width:16.666667%}#mud-dev-tools :is(.w-3\\/12){width:25%}#mud-dev-tools :is(.w-4){width:1rem}#mud-dev-tools :is(.w-\\[1em\\]){width:1em}#mud-dev-tools :is(.w-full){width:100%}#mud-dev-tools :is(.min-w-max){min-width:max-content}#mud-dev-tools :is(.max-w-screen-sm){max-width:640px}#mud-dev-tools :is(.flex-1){flex:1 1 0%}#mud-dev-tools :is(.flex-none){flex:none}#mud-dev-tools :is(.flex-grow){flex-grow:1}#mud-dev-tools :is(.table-fixed){table-layout:fixed}#mud-dev-tools :is(.translate-x-0){--tw-translate-x: 0px;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}#mud-dev-tools :is(.translate-x-full){--tw-translate-x: 100%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}@keyframes spin{to{transform:rotate(360deg)}}#mud-dev-tools :is(.animate-spin){animation:spin 1s linear infinite}#mud-dev-tools :is(.cursor-default){cursor:default}#mud-dev-tools :is(.cursor-pointer){cursor:pointer}#mud-dev-tools :is(.select-none){-webkit-user-select:none;user-select:none}#mud-dev-tools :is(.grid-cols-\\[max-content\\,1fr\\]){grid-template-columns:max-content 1fr}#mud-dev-tools :is(.flex-col){flex-direction:column}#mud-dev-tools :is(.flex-col-reverse){flex-direction:column-reverse}#mud-dev-tools :is(.items-start){align-items:flex-start}#mud-dev-tools :is(.items-end){align-items:flex-end}#mud-dev-tools :is(.items-center){align-items:center}#mud-dev-tools :is(.justify-center){justify-content:center}#mud-dev-tools :is(.gap-1){gap:.25rem}#mud-dev-tools :is(.gap-2){gap:.5rem}#mud-dev-tools :is(.gap-x-4){column-gap:1rem}#mud-dev-tools :is(.space-y-1 > :not([hidden]) ~ :not([hidden])){--tw-space-y-reverse: 0;margin-top:calc(.25rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(.25rem * var(--tw-space-y-reverse))}#mud-dev-tools :is(.space-y-2 > :not([hidden]) ~ :not([hidden])){--tw-space-y-reverse: 0;margin-top:calc(.5rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(.5rem * var(--tw-space-y-reverse))}#mud-dev-tools :is(.space-y-4 > :not([hidden]) ~ :not([hidden])){--tw-space-y-reverse: 0;margin-top:calc(1rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(1rem * var(--tw-space-y-reverse))}#mud-dev-tools :is(.space-y-6 > :not([hidden]) ~ :not([hidden])){--tw-space-y-reverse: 0;margin-top:calc(1.5rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(1.5rem * var(--tw-space-y-reverse))}#mud-dev-tools :is(.space-y-8 > :not([hidden]) ~ :not([hidden])){--tw-space-y-reverse: 0;margin-top:calc(2rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(2rem * var(--tw-space-y-reverse))}#mud-dev-tools :is(.overflow-auto){overflow:auto}#mud-dev-tools :is(.overflow-hidden){overflow:hidden}#mud-dev-tools :is(.text-ellipsis){text-overflow:ellipsis}#mud-dev-tools :is(.whitespace-nowrap){white-space:nowrap}#mud-dev-tools :is(.whitespace-pre){white-space:pre}#mud-dev-tools :is(.rounded){border-radius:.25rem}#mud-dev-tools :is(.border-2){border-width:2px}#mud-dev-tools :is(.border-dashed){border-style:dashed}#mud-dev-tools :is(.border-transparent){border-color:transparent}#mud-dev-tools :is(.border-white\\/10){border-color:#ffffff1a}#mud-dev-tools :is(.border-white\\/20){border-color:#fff3}#mud-dev-tools :is(.bg-gray-500\\/10){background-color:#6b72801a}#mud-dev-tools :is(.bg-red-800){--tw-bg-opacity: 1;background-color:rgb(153 27 27 / var(--tw-bg-opacity))}#mud-dev-tools :is(.bg-red-900\\/50){background-color:#7f1d1d80}#mud-dev-tools :is(.bg-slate-600){--tw-bg-opacity: 1;background-color:rgb(71 85 105 / var(--tw-bg-opacity))}#mud-dev-tools :is(.bg-slate-700){--tw-bg-opacity: 1;background-color:rgb(51 65 85 / var(--tw-bg-opacity))}#mud-dev-tools :is(.bg-slate-800){--tw-bg-opacity: 1;background-color:rgb(30 41 59 / var(--tw-bg-opacity))}#mud-dev-tools :is(.bg-slate-900){--tw-bg-opacity: 1;background-color:rgb(15 23 42 / var(--tw-bg-opacity))}#mud-dev-tools :is(.bg-white\\/5){background-color:#ffffff0d}#mud-dev-tools :is(.p-1){padding:.25rem}#mud-dev-tools :is(.p-2){padding:.5rem}#mud-dev-tools :is(.p-4){padding:1rem}#mud-dev-tools :is(.p-6){padding:1.5rem}#mud-dev-tools :is(.px-1){padding-left:.25rem;padding-right:.25rem}#mud-dev-tools :is(.px-1\\.5){padding-left:.375rem;padding-right:.375rem}#mud-dev-tools :is(.px-2){padding-left:.5rem;padding-right:.5rem}#mud-dev-tools :is(.px-3){padding-left:.75rem;padding-right:.75rem}#mud-dev-tools :is(.py-1){padding-top:.25rem;padding-bottom:.25rem}#mud-dev-tools :is(.py-1\\.5){padding-top:.375rem;padding-bottom:.375rem}#mud-dev-tools :is(.py-2){padding-top:.5rem;padding-bottom:.5rem}#mud-dev-tools :is(.pb-0){padding-bottom:0}#mud-dev-tools :is(.pb-0\\.5){padding-bottom:.125rem}#mud-dev-tools :is(.pb-1){padding-bottom:.25rem}#mud-dev-tools :is(.pt-1){padding-top:.25rem}#mud-dev-tools :is(.pt-1\\.5){padding-top:.375rem}#mud-dev-tools :is(.text-left){text-align:left}#mud-dev-tools :is(.text-right){text-align:right}#mud-dev-tools :is(.font-mono){font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace}#mud-dev-tools :is(.text-sm){font-size:.875rem;line-height:1.25rem}#mud-dev-tools :is(.text-xs){font-size:.75rem;line-height:1rem}#mud-dev-tools :is(.font-bold){font-weight:700}#mud-dev-tools :is(.font-medium){font-weight:500}#mud-dev-tools :is(.font-normal){font-weight:400}#mud-dev-tools :is(.font-semibold){font-weight:600}#mud-dev-tools :is(.uppercase){text-transform:uppercase}#mud-dev-tools :is(.leading-none){line-height:1}#mud-dev-tools :is(.tracking-\\[-1ch\\]){letter-spacing:-1ch}#mud-dev-tools :is(.text-amber-200\\/80){color:#fde68acc}#mud-dev-tools :is(.text-cyan-500){--tw-text-opacity: 1;color:rgb(6 182 212 / var(--tw-text-opacity))}#mud-dev-tools :is(.text-gray-500){--tw-text-opacity: 1;color:rgb(107 114 128 / var(--tw-text-opacity))}#mud-dev-tools :is(.text-green-500){--tw-text-opacity: 1;color:rgb(34 197 94 / var(--tw-text-opacity))}#mud-dev-tools :is(.text-red-500){--tw-text-opacity: 1;color:rgb(239 68 68 / var(--tw-text-opacity))}#mud-dev-tools :is(.text-transparent){color:transparent}#mud-dev-tools :is(.text-white){--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}#mud-dev-tools :is(.text-white\\/20){color:#fff3}#mud-dev-tools :is(.text-white\\/40){color:#fff6}#mud-dev-tools :is(.text-white\\/60){color:#fff9}#mud-dev-tools :is(.text-white\\/80){color:#fffc}#mud-dev-tools :is(.underline){text-decoration-line:underline}#mud-dev-tools :is(.opacity-0){opacity:0}#mud-dev-tools :is(.opacity-100){opacity:1}#mud-dev-tools :is(.opacity-25){opacity:.25}#mud-dev-tools :is(.opacity-60){opacity:.6}#mud-dev-tools :is(.opacity-75){opacity:.75}#mud-dev-tools :is(.shadow-lg){--tw-shadow: 0 10px 15px -3px rgb(0 0 0 / .1), 0 4px 6px -4px rgb(0 0 0 / .1);--tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}#mud-dev-tools :is(.filter){filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}#mud-dev-tools :is(.transition){transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,-webkit-backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter,-webkit-backdrop-filter;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}#mud-dev-tools :is(.duration-500){transition-duration:.5s}#mud-dev-tools :is(.after\\:select-none):after{content:var(--tw-content);-webkit-user-select:none;user-select:none}#mud-dev-tools :is(.after\\:content-\\[\\'\\2026\\'\\]):after{--tw-content: "\\2026";content:var(--tw-content)}#mud-dev-tools :is(.hover\\:bg-blue-700:hover){--tw-bg-opacity: 1;background-color:rgb(29 78 216 / var(--tw-bg-opacity))}#mud-dev-tools :is(.hover\\:bg-blue-800:hover){--tw-bg-opacity: 1;background-color:rgb(30 64 175 / var(--tw-bg-opacity))}#mud-dev-tools :is(.hover\\:text-white:hover){--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}#mud-dev-tools :is(.hover\\:text-white\\/60:hover){color:#fff9}#mud-dev-tools :is(.hover\\:underline:hover){text-decoration-line:underline}#mud-dev-tools :is(.hover\\:opacity-100:hover){opacity:1}#mud-dev-tools :is(.group:hover .group-hover\\:border-blue-700){--tw-border-opacity: 1;border-color:rgb(29 78 216 / var(--tw-border-opacity))}#mud-dev-tools :is(.group:hover .group-hover\\:bg-blue-700){--tw-bg-opacity: 1;background-color:rgb(29 78 216 / var(--tw-bg-opacity))}#mud-dev-tools :is(.group:hover .group-hover\\:text-white){--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity))}#mud-dev-tools :is(.peer:hover ~ .peer-hover\\:opacity-60){opacity:.6}
`);
  });
function W2() {
  for (var e = 0, t, n, o = ""; e < arguments.length; )
    (t = arguments[e++]) && (n = sw(t)) && (o && (o += " "), (o += n));
  return o;
}
function sw(e) {
  if (typeof e == "string") return e;
  for (var t, n = "", o = 0; o < e.length; o++)
    e[o] && (t = sw(e[o])) && (n && (n += " "), (n += t));
  return n;
}
var q2 = J(() => {});
function K2(e) {
  var t = X2(e),
    n = e.conflictingClassGroups,
    o = e.conflictingClassGroupModifiers,
    a = o === void 0 ? {} : o;
  function u(c) {
    var f = c.split(zc);
    return f[0] === "" && f.length !== 1 && f.shift(), cw(f, t) || H2(c);
  }
  function l(c, f) {
    var d = n[c] || [];
    return f && a[c] ? [].concat(d, a[c]) : d;
  }
  return { getClassGroupId: u, getConflictingClassGroupIds: l };
}
function cw(e, t) {
  if (e.length === 0) return t.classGroupId;
  var n = e[0],
    o = t.nextPart.get(n),
    a = o ? cw(e.slice(1), o) : void 0;
  if (a) return a;
  if (t.validators.length !== 0) {
    var u = e.join(zc);
    return t.validators.find(function (l) {
      var c = l.validator;
      return c(u);
    })?.classGroupId;
  }
}
function H2(e) {
  if (Cp.test(e)) {
    var t = Cp.exec(e)[1],
      n = t?.substring(0, t.indexOf(":"));
    if (n) return "arbitrary.." + n;
  }
}
function X2(e) {
  var t = e.theme,
    n = e.prefix,
    o = { nextPart: new Map(), validators: [] },
    a = Y2(Object.entries(e.classGroups), n);
  return (
    a.forEach(function (u) {
      var l = u[0],
        c = u[1];
      Np(c, o, l, t);
    }),
    o
  );
}
function Np(e, t, n, o) {
  e.forEach(function (a) {
    if (typeof a == "string") {
      var u = a === "" ? t : ay(t, a);
      u.classGroupId = n;
      return;
    }
    if (typeof a == "function") {
      if (Q2(a)) {
        Np(a(o), t, n, o);
        return;
      }
      t.validators.push({ validator: a, classGroupId: n });
      return;
    }
    Object.entries(a).forEach(function (l) {
      var c = l[0],
        f = l[1];
      Np(f, ay(t, c), n, o);
    });
  });
}
function ay(e, t) {
  var n = e;
  return (
    t.split(zc).forEach(function (o) {
      n.nextPart.has(o) ||
        n.nextPart.set(o, { nextPart: new Map(), validators: [] }),
        (n = n.nextPart.get(o));
    }),
    n
  );
}
function Q2(e) {
  return e.isThemeGetter;
}
function Y2(e, t) {
  return t
    ? e.map(function (n) {
        var o = n[0],
          a = n[1],
          u = a.map(function (l) {
            return typeof l == "string"
              ? t + l
              : typeof l == "object"
              ? Object.fromEntries(
                  Object.entries(l).map(function (c) {
                    var f = c[0],
                      d = c[1];
                    return [t + f, d];
                  })
                )
              : l;
          });
        return [o, u];
      })
    : e;
}
var zc,
  Cp,
  J2 = J(() => {
    (zc = "-"), (Cp = /^\[(.+)\]$/);
  });
function G2(e) {
  if (e < 1) return { get: function () {}, set: function () {} };
  var t = 0,
    n = new Map(),
    o = new Map();
  function a(u, l) {
    n.set(u, l), t++, t > e && ((t = 0), (o = n), (n = new Map()));
  }
  return {
    get: function (u) {
      var l = n.get(u);
      if (l !== void 0) return l;
      if ((l = o.get(u)) !== void 0) return a(u, l), l;
    },
    set: function (u, l) {
      n.has(u) ? n.set(u, l) : a(u, l);
    },
  };
}
var Z2 = J(() => {});
function ej(e) {
  var t = e.separator || ":",
    n = t.length === 1,
    o = t[0],
    a = t.length;
  return function (u) {
    for (var l = [], c = 0, f = 0, d, v = 0; v < u.length; v++) {
      var m = u[v];
      if (c === 0) {
        if (m === o && (n || u.slice(v, v + a) === t)) {
          l.push(u.slice(f, v)), (f = v + a);
          continue;
        }
        if (m === "/") {
          d = v;
          continue;
        }
      }
      m === "[" ? c++ : m === "]" && c--;
    }
    var h = l.length === 0 ? u : u.substring(f),
      g = h.startsWith(Av),
      w = g ? h.substring(1) : h,
      x = d && d > f ? d - f : void 0;
    return {
      modifiers: l,
      hasImportantModifier: g,
      baseClassName: w,
      maybePostfixModifierPosition: x,
    };
  };
}
function tj(e) {
  if (e.length <= 1) return e;
  var t = [],
    n = [];
  return (
    e.forEach(function (o) {
      var a = o[0] === "[";
      a ? (t.push.apply(t, n.sort().concat([o])), (n = [])) : n.push(o);
    }),
    t.push.apply(t, n.sort()),
    t
  );
}
var Av,
  fw = J(() => {
    Av = "!";
  });
function rj(e) {
  return { cache: G2(e.cacheSize), splitModifiers: ej(e), ...K2(e) };
}
var nj = J(() => {
  J2(), Z2(), fw();
});
function oj(e, t) {
  var n = t.splitModifiers,
    o = t.getClassGroupId,
    a = t.getConflictingClassGroupIds,
    u = new Set();
  return e
    .trim()
    .split(dw)
    .map(function (l) {
      var c = n(l),
        f = c.modifiers,
        d = c.hasImportantModifier,
        v = c.baseClassName,
        m = c.maybePostfixModifierPosition,
        h = o(m ? v.substring(0, m) : v),
        g = !!m;
      if (!h) {
        if (!m) return { isTailwindClass: !1, originalClassName: l };
        if (((h = o(v)), !h))
          return { isTailwindClass: !1, originalClassName: l };
        g = !1;
      }
      var w = tj(f).join(":"),
        x = d ? w + Av : w;
      return {
        isTailwindClass: !0,
        modifierId: x,
        classGroupId: h,
        originalClassName: l,
        hasPostfixModifier: g,
      };
    })
    .reverse()
    .filter(function (l) {
      if (!l.isTailwindClass) return !0;
      var c = l.modifierId,
        f = l.classGroupId,
        d = l.hasPostfixModifier,
        v = c + f;
      return u.has(v)
        ? !1
        : (u.add(v),
          a(f, d).forEach(function (m) {
            return u.add(c + m);
          }),
          !0);
    })
    .reverse()
    .map(function (l) {
      return l.originalClassName;
    })
    .join(" ");
}
var dw,
  ij = J(() => {
    fw(), (dw = /\s+/);
  });
function aj() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  var o,
    a,
    u,
    l = c;
  function c(d) {
    var v = t[0],
      m = t.slice(1),
      h = m.reduce(function (g, w) {
        return w(g);
      }, v());
    return (o = rj(h)), (a = o.cache.get), (u = o.cache.set), (l = f), f(d);
  }
  function f(d) {
    var v = a(d);
    if (v) return v;
    var m = oj(d, o);
    return u(d, m), m;
  }
  return function () {
    return l(W2.apply(null, arguments));
  };
}
var uj = J(() => {
  nj(), ij(), q2();
});
function rt(e) {
  var t = function (n) {
    return n[e] || [];
  };
  return (t.isThemeGetter = !0), t;
}
var lj = J(() => {});
function Br(e) {
  return si(e) || hw.has(e) || vw.test(e) || _o(e);
}
function _o(e) {
  return Si(e, "length", vj);
}
function sj(e) {
  return Si(e, "size", pw);
}
function cj(e) {
  return Si(e, "position", pw);
}
function fj(e) {
  return Si(e, "url", hj);
}
function Ks(e) {
  return Si(e, "number", si);
}
function si(e) {
  return !Number.isNaN(Number(e));
}
function dj(e) {
  return e.endsWith("%") && si(e.slice(0, -1));
}
function ju(e) {
  return uy(e) || Si(e, "number", uy);
}
function ft(e) {
  return Iv.test(e);
}
function Au() {
  return !0;
}
function go(e) {
  return mw.test(e);
}
function pj(e) {
  return Si(e, "", mj);
}
function Si(e, t, n) {
  var o = Iv.exec(e);
  return o ? (o[1] ? o[1] === t : n(o[2])) : !1;
}
function vj(e) {
  return bw.test(e);
}
function pw() {
  return !1;
}
function hj(e) {
  return e.startsWith("url(");
}
function uy(e) {
  return Number.isInteger(Number(e));
}
function mj(e) {
  return yw.test(e);
}
var Iv,
  vw,
  hw,
  mw,
  bw,
  yw,
  bj = J(() => {
    (Iv = /^\[(?:([a-z-]+):)?(.+)\]$/i),
      (vw = /^\d+\/\d+$/),
      (hw = new Set(["px", "full", "screen"])),
      (mw = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/),
      (bw =
        /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))/),
      (yw = /^-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/);
  });
function yj() {
  var e = rt("colors"),
    t = rt("spacing"),
    n = rt("blur"),
    o = rt("brightness"),
    a = rt("borderColor"),
    u = rt("borderRadius"),
    l = rt("borderSpacing"),
    c = rt("borderWidth"),
    f = rt("contrast"),
    d = rt("grayscale"),
    v = rt("hueRotate"),
    m = rt("invert"),
    h = rt("gap"),
    g = rt("gradientColorStops"),
    w = rt("gradientColorStopPositions"),
    x = rt("inset"),
    S = rt("margin"),
    O = rt("opacity"),
    A = rt("padding"),
    k = rt("saturate"),
    j = rt("scale"),
    C = rt("sepia"),
    D = rt("skew"),
    W = rt("space"),
    $ = rt("translate"),
    F = function () {
      return ["auto", "contain", "none"];
    },
    V = function () {
      return ["auto", "hidden", "clip", "visible", "scroll"];
    },
    re = function () {
      return ["auto", t];
    },
    he = function () {
      return ["", Br];
    },
    Z = function () {
      return ["auto", si, ft];
    },
    ge = function () {
      return [
        "bottom",
        "center",
        "left",
        "left-bottom",
        "left-top",
        "right",
        "right-bottom",
        "right-top",
        "top",
      ];
    },
    Se = function () {
      return ["solid", "dashed", "dotted", "double", "none"];
    },
    we = function () {
      return [
        "normal",
        "multiply",
        "screen",
        "overlay",
        "darken",
        "lighten",
        "color-dodge",
        "color-burn",
        "hard-light",
        "soft-light",
        "difference",
        "exclusion",
        "hue",
        "saturation",
        "color",
        "luminosity",
        "plus-lighter",
      ];
    },
    ce = function () {
      return [
        "start",
        "end",
        "center",
        "between",
        "around",
        "evenly",
        "stretch",
      ];
    },
    K = function () {
      return ["", "0", ft];
    },
    de = function () {
      return [
        "auto",
        "avoid",
        "all",
        "avoid-page",
        "page",
        "left",
        "right",
        "column",
      ];
    },
    me = function () {
      return [si, Ks];
    },
    I = function () {
      return [si, ft];
    };
  return {
    cacheSize: 500,
    theme: {
      colors: [Au],
      spacing: [Br],
      blur: ["none", "", go, _o],
      brightness: me(),
      borderColor: [e],
      borderRadius: ["none", "", "full", go, _o],
      borderSpacing: [t],
      borderWidth: he(),
      contrast: me(),
      grayscale: K(),
      hueRotate: I(),
      invert: K(),
      gap: [t],
      gradientColorStops: [e],
      gradientColorStopPositions: [dj, _o],
      inset: re(),
      margin: re(),
      opacity: me(),
      padding: [t],
      saturate: me(),
      scale: me(),
      sepia: K(),
      skew: I(),
      space: [t],
      translate: [t],
    },
    classGroups: {
      aspect: [{ aspect: ["auto", "square", "video", ft] }],
      container: ["container"],
      columns: [{ columns: [go] }],
      "break-after": [{ "break-after": de() }],
      "break-before": [{ "break-before": de() }],
      "break-inside": [
        { "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"] },
      ],
      "box-decoration": [{ "box-decoration": ["slice", "clone"] }],
      box: [{ box: ["border", "content"] }],
      display: [
        "block",
        "inline-block",
        "inline",
        "flex",
        "inline-flex",
        "table",
        "inline-table",
        "table-caption",
        "table-cell",
        "table-column",
        "table-column-group",
        "table-footer-group",
        "table-header-group",
        "table-row-group",
        "table-row",
        "flow-root",
        "grid",
        "inline-grid",
        "contents",
        "list-item",
        "hidden",
      ],
      float: [{ float: ["right", "left", "none"] }],
      clear: [{ clear: ["left", "right", "both", "none"] }],
      isolation: ["isolate", "isolation-auto"],
      "object-fit": [
        { object: ["contain", "cover", "fill", "none", "scale-down"] },
      ],
      "object-position": [{ object: [].concat(ge(), [ft]) }],
      overflow: [{ overflow: V() }],
      "overflow-x": [{ "overflow-x": V() }],
      "overflow-y": [{ "overflow-y": V() }],
      overscroll: [{ overscroll: F() }],
      "overscroll-x": [{ "overscroll-x": F() }],
      "overscroll-y": [{ "overscroll-y": F() }],
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      inset: [{ inset: [x] }],
      "inset-x": [{ "inset-x": [x] }],
      "inset-y": [{ "inset-y": [x] }],
      start: [{ start: [x] }],
      end: [{ end: [x] }],
      top: [{ top: [x] }],
      right: [{ right: [x] }],
      bottom: [{ bottom: [x] }],
      left: [{ left: [x] }],
      visibility: ["visible", "invisible", "collapse"],
      z: [{ z: ["auto", ju] }],
      basis: [{ basis: [t] }],
      "flex-direction": [
        { flex: ["row", "row-reverse", "col", "col-reverse"] },
      ],
      "flex-wrap": [{ flex: ["wrap", "wrap-reverse", "nowrap"] }],
      flex: [{ flex: ["1", "auto", "initial", "none", ft] }],
      grow: [{ grow: K() }],
      shrink: [{ shrink: K() }],
      order: [{ order: ["first", "last", "none", ju] }],
      "grid-cols": [{ "grid-cols": [Au] }],
      "col-start-end": [{ col: ["auto", { span: [ju] }, ft] }],
      "col-start": [{ "col-start": Z() }],
      "col-end": [{ "col-end": Z() }],
      "grid-rows": [{ "grid-rows": [Au] }],
      "row-start-end": [{ row: ["auto", { span: [ju] }, ft] }],
      "row-start": [{ "row-start": Z() }],
      "row-end": [{ "row-end": Z() }],
      "grid-flow": [
        { "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"] },
      ],
      "auto-cols": [{ "auto-cols": ["auto", "min", "max", "fr", ft] }],
      "auto-rows": [{ "auto-rows": ["auto", "min", "max", "fr", ft] }],
      gap: [{ gap: [h] }],
      "gap-x": [{ "gap-x": [h] }],
      "gap-y": [{ "gap-y": [h] }],
      "justify-content": [{ justify: ["normal"].concat(ce()) }],
      "justify-items": [
        { "justify-items": ["start", "end", "center", "stretch"] },
      ],
      "justify-self": [
        { "justify-self": ["auto", "start", "end", "center", "stretch"] },
      ],
      "align-content": [{ content: ["normal"].concat(ce(), ["baseline"]) }],
      "align-items": [
        { items: ["start", "end", "center", "baseline", "stretch"] },
      ],
      "align-self": [
        { self: ["auto", "start", "end", "center", "stretch", "baseline"] },
      ],
      "place-content": [{ "place-content": [].concat(ce(), ["baseline"]) }],
      "place-items": [
        { "place-items": ["start", "end", "center", "baseline", "stretch"] },
      ],
      "place-self": [
        { "place-self": ["auto", "start", "end", "center", "stretch"] },
      ],
      p: [{ p: [A] }],
      px: [{ px: [A] }],
      py: [{ py: [A] }],
      ps: [{ ps: [A] }],
      pe: [{ pe: [A] }],
      pt: [{ pt: [A] }],
      pr: [{ pr: [A] }],
      pb: [{ pb: [A] }],
      pl: [{ pl: [A] }],
      m: [{ m: [S] }],
      mx: [{ mx: [S] }],
      my: [{ my: [S] }],
      ms: [{ ms: [S] }],
      me: [{ me: [S] }],
      mt: [{ mt: [S] }],
      mr: [{ mr: [S] }],
      mb: [{ mb: [S] }],
      ml: [{ ml: [S] }],
      "space-x": [{ "space-x": [W] }],
      "space-x-reverse": ["space-x-reverse"],
      "space-y": [{ "space-y": [W] }],
      "space-y-reverse": ["space-y-reverse"],
      w: [{ w: ["auto", "min", "max", "fit", t] }],
      "min-w": [{ "min-w": ["min", "max", "fit", Br] }],
      "max-w": [
        {
          "max-w": [
            "0",
            "none",
            "full",
            "min",
            "max",
            "fit",
            "prose",
            { screen: [go] },
            go,
            _o,
          ],
        },
      ],
      h: [{ h: [t, "auto", "min", "max", "fit"] }],
      "min-h": [{ "min-h": ["min", "max", "fit", Br] }],
      "max-h": [{ "max-h": [t, "min", "max", "fit"] }],
      "font-size": [{ text: ["base", go, _o] }],
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      "font-style": ["italic", "not-italic"],
      "font-weight": [
        {
          font: [
            "thin",
            "extralight",
            "light",
            "normal",
            "medium",
            "semibold",
            "bold",
            "extrabold",
            "black",
            Ks,
          ],
        },
      ],
      "font-family": [{ font: [Au] }],
      "fvn-normal": ["normal-nums"],
      "fvn-ordinal": ["ordinal"],
      "fvn-slashed-zero": ["slashed-zero"],
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      "fvn-fraction": ["diagonal-fractions", "stacked-fractons"],
      tracking: [
        {
          tracking: [
            "tighter",
            "tight",
            "normal",
            "wide",
            "wider",
            "widest",
            _o,
          ],
        },
      ],
      "line-clamp": [{ "line-clamp": ["none", si, Ks] }],
      leading: [
        {
          leading: ["none", "tight", "snug", "normal", "relaxed", "loose", Br],
        },
      ],
      "list-image": [{ "list-image": ["none", ft] }],
      "list-style-type": [{ list: ["none", "disc", "decimal", ft] }],
      "list-style-position": [{ list: ["inside", "outside"] }],
      "placeholder-color": [{ placeholder: [e] }],
      "placeholder-opacity": [{ "placeholder-opacity": [O] }],
      "text-alignment": [
        { text: ["left", "center", "right", "justify", "start", "end"] },
      ],
      "text-color": [{ text: [e] }],
      "text-opacity": [{ "text-opacity": [O] }],
      "text-decoration": [
        "underline",
        "overline",
        "line-through",
        "no-underline",
      ],
      "text-decoration-style": [{ decoration: [].concat(Se(), ["wavy"]) }],
      "text-decoration-thickness": [{ decoration: ["auto", "from-font", Br] }],
      "underline-offset": [{ "underline-offset": ["auto", Br] }],
      "text-decoration-color": [{ decoration: [e] }],
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      indent: [{ indent: [t] }],
      "vertical-align": [
        {
          align: [
            "baseline",
            "top",
            "middle",
            "bottom",
            "text-top",
            "text-bottom",
            "sub",
            "super",
            _o,
          ],
        },
      ],
      whitespace: [
        {
          whitespace: [
            "normal",
            "nowrap",
            "pre",
            "pre-line",
            "pre-wrap",
            "break-spaces",
          ],
        },
      ],
      break: [{ break: ["normal", "words", "all", "keep"] }],
      hyphens: [{ hyphens: ["none", "manual", "auto"] }],
      content: [{ content: ["none", ft] }],
      "bg-attachment": [{ bg: ["fixed", "local", "scroll"] }],
      "bg-clip": [{ "bg-clip": ["border", "padding", "content", "text"] }],
      "bg-opacity": [{ "bg-opacity": [O] }],
      "bg-origin": [{ "bg-origin": ["border", "padding", "content"] }],
      "bg-position": [{ bg: [].concat(ge(), [cj]) }],
      "bg-repeat": [
        { bg: ["no-repeat", { repeat: ["", "x", "y", "round", "space"] }] },
      ],
      "bg-size": [{ bg: ["auto", "cover", "contain", sj] }],
      "bg-image": [
        {
          bg: [
            "none",
            { "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"] },
            fj,
          ],
        },
      ],
      "bg-color": [{ bg: [e] }],
      "gradient-from-pos": [{ from: [w] }],
      "gradient-via-pos": [{ via: [w] }],
      "gradient-to-pos": [{ to: [w] }],
      "gradient-from": [{ from: [g] }],
      "gradient-via": [{ via: [g] }],
      "gradient-to": [{ to: [g] }],
      rounded: [{ rounded: [u] }],
      "rounded-s": [{ "rounded-s": [u] }],
      "rounded-e": [{ "rounded-e": [u] }],
      "rounded-t": [{ "rounded-t": [u] }],
      "rounded-r": [{ "rounded-r": [u] }],
      "rounded-b": [{ "rounded-b": [u] }],
      "rounded-l": [{ "rounded-l": [u] }],
      "rounded-ss": [{ "rounded-ss": [u] }],
      "rounded-se": [{ "rounded-se": [u] }],
      "rounded-ee": [{ "rounded-ee": [u] }],
      "rounded-es": [{ "rounded-es": [u] }],
      "rounded-tl": [{ "rounded-tl": [u] }],
      "rounded-tr": [{ "rounded-tr": [u] }],
      "rounded-br": [{ "rounded-br": [u] }],
      "rounded-bl": [{ "rounded-bl": [u] }],
      "border-w": [{ border: [c] }],
      "border-w-x": [{ "border-x": [c] }],
      "border-w-y": [{ "border-y": [c] }],
      "border-w-s": [{ "border-s": [c] }],
      "border-w-e": [{ "border-e": [c] }],
      "border-w-t": [{ "border-t": [c] }],
      "border-w-r": [{ "border-r": [c] }],
      "border-w-b": [{ "border-b": [c] }],
      "border-w-l": [{ "border-l": [c] }],
      "border-opacity": [{ "border-opacity": [O] }],
      "border-style": [{ border: [].concat(Se(), ["hidden"]) }],
      "divide-x": [{ "divide-x": [c] }],
      "divide-x-reverse": ["divide-x-reverse"],
      "divide-y": [{ "divide-y": [c] }],
      "divide-y-reverse": ["divide-y-reverse"],
      "divide-opacity": [{ "divide-opacity": [O] }],
      "divide-style": [{ divide: Se() }],
      "border-color": [{ border: [a] }],
      "border-color-x": [{ "border-x": [a] }],
      "border-color-y": [{ "border-y": [a] }],
      "border-color-t": [{ "border-t": [a] }],
      "border-color-r": [{ "border-r": [a] }],
      "border-color-b": [{ "border-b": [a] }],
      "border-color-l": [{ "border-l": [a] }],
      "divide-color": [{ divide: [a] }],
      "outline-style": [{ outline: [""].concat(Se()) }],
      "outline-offset": [{ "outline-offset": [Br] }],
      "outline-w": [{ outline: [Br] }],
      "outline-color": [{ outline: [e] }],
      "ring-w": [{ ring: he() }],
      "ring-w-inset": ["ring-inset"],
      "ring-color": [{ ring: [e] }],
      "ring-opacity": [{ "ring-opacity": [O] }],
      "ring-offset-w": [{ "ring-offset": [Br] }],
      "ring-offset-color": [{ "ring-offset": [e] }],
      shadow: [{ shadow: ["", "inner", "none", go, pj] }],
      "shadow-color": [{ shadow: [Au] }],
      opacity: [{ opacity: [O] }],
      "mix-blend": [{ "mix-blend": we() }],
      "bg-blend": [{ "bg-blend": we() }],
      filter: [{ filter: ["", "none"] }],
      blur: [{ blur: [n] }],
      brightness: [{ brightness: [o] }],
      contrast: [{ contrast: [f] }],
      "drop-shadow": [{ "drop-shadow": ["", "none", go, ft] }],
      grayscale: [{ grayscale: [d] }],
      "hue-rotate": [{ "hue-rotate": [v] }],
      invert: [{ invert: [m] }],
      saturate: [{ saturate: [k] }],
      sepia: [{ sepia: [C] }],
      "backdrop-filter": [{ "backdrop-filter": ["", "none"] }],
      "backdrop-blur": [{ "backdrop-blur": [n] }],
      "backdrop-brightness": [{ "backdrop-brightness": [o] }],
      "backdrop-contrast": [{ "backdrop-contrast": [f] }],
      "backdrop-grayscale": [{ "backdrop-grayscale": [d] }],
      "backdrop-hue-rotate": [{ "backdrop-hue-rotate": [v] }],
      "backdrop-invert": [{ "backdrop-invert": [m] }],
      "backdrop-opacity": [{ "backdrop-opacity": [O] }],
      "backdrop-saturate": [{ "backdrop-saturate": [k] }],
      "backdrop-sepia": [{ "backdrop-sepia": [C] }],
      "border-collapse": [{ border: ["collapse", "separate"] }],
      "border-spacing": [{ "border-spacing": [l] }],
      "border-spacing-x": [{ "border-spacing-x": [l] }],
      "border-spacing-y": [{ "border-spacing-y": [l] }],
      "table-layout": [{ table: ["auto", "fixed"] }],
      caption: [{ caption: ["top", "bottom"] }],
      transition: [
        {
          transition: [
            "none",
            "all",
            "",
            "colors",
            "opacity",
            "shadow",
            "transform",
            ft,
          ],
        },
      ],
      duration: [{ duration: I() }],
      ease: [{ ease: ["linear", "in", "out", "in-out", ft] }],
      delay: [{ delay: I() }],
      animate: [{ animate: ["none", "spin", "ping", "pulse", "bounce", ft] }],
      transform: [{ transform: ["", "gpu", "none"] }],
      scale: [{ scale: [j] }],
      "scale-x": [{ "scale-x": [j] }],
      "scale-y": [{ "scale-y": [j] }],
      rotate: [{ rotate: [ju, ft] }],
      "translate-x": [{ "translate-x": [$] }],
      "translate-y": [{ "translate-y": [$] }],
      "skew-x": [{ "skew-x": [D] }],
      "skew-y": [{ "skew-y": [D] }],
      "transform-origin": [
        {
          origin: [
            "center",
            "top",
            "top-right",
            "right",
            "bottom-right",
            "bottom",
            "bottom-left",
            "left",
            "top-left",
            ft,
          ],
        },
      ],
      accent: [{ accent: ["auto", e] }],
      appearance: ["appearance-none"],
      cursor: [
        {
          cursor: [
            "auto",
            "default",
            "pointer",
            "wait",
            "text",
            "move",
            "help",
            "not-allowed",
            "none",
            "context-menu",
            "progress",
            "cell",
            "crosshair",
            "vertical-text",
            "alias",
            "copy",
            "no-drop",
            "grab",
            "grabbing",
            "all-scroll",
            "col-resize",
            "row-resize",
            "n-resize",
            "e-resize",
            "s-resize",
            "w-resize",
            "ne-resize",
            "nw-resize",
            "se-resize",
            "sw-resize",
            "ew-resize",
            "ns-resize",
            "nesw-resize",
            "nwse-resize",
            "zoom-in",
            "zoom-out",
            ft,
          ],
        },
      ],
      "caret-color": [{ caret: [e] }],
      "pointer-events": [{ "pointer-events": ["none", "auto"] }],
      resize: [{ resize: ["none", "y", "x", ""] }],
      "scroll-behavior": [{ scroll: ["auto", "smooth"] }],
      "scroll-m": [{ "scroll-m": [t] }],
      "scroll-mx": [{ "scroll-mx": [t] }],
      "scroll-my": [{ "scroll-my": [t] }],
      "scroll-ms": [{ "scroll-ms": [t] }],
      "scroll-me": [{ "scroll-me": [t] }],
      "scroll-mt": [{ "scroll-mt": [t] }],
      "scroll-mr": [{ "scroll-mr": [t] }],
      "scroll-mb": [{ "scroll-mb": [t] }],
      "scroll-ml": [{ "scroll-ml": [t] }],
      "scroll-p": [{ "scroll-p": [t] }],
      "scroll-px": [{ "scroll-px": [t] }],
      "scroll-py": [{ "scroll-py": [t] }],
      "scroll-ps": [{ "scroll-ps": [t] }],
      "scroll-pe": [{ "scroll-pe": [t] }],
      "scroll-pt": [{ "scroll-pt": [t] }],
      "scroll-pr": [{ "scroll-pr": [t] }],
      "scroll-pb": [{ "scroll-pb": [t] }],
      "scroll-pl": [{ "scroll-pl": [t] }],
      "snap-align": [{ snap: ["start", "end", "center", "align-none"] }],
      "snap-stop": [{ snap: ["normal", "always"] }],
      "snap-type": [{ snap: ["none", "x", "y", "both"] }],
      "snap-strictness": [{ snap: ["mandatory", "proximity"] }],
      touch: [
        {
          touch: [
            "auto",
            "none",
            "pinch-zoom",
            "manipulation",
            { pan: ["x", "left", "right", "y", "up", "down"] },
          ],
        },
      ],
      select: [{ select: ["none", "text", "all", "auto"] }],
      "will-change": [
        { "will-change": ["auto", "scroll", "contents", "transform", ft] },
      ],
      fill: [{ fill: [e, "none"] }],
      "stroke-w": [{ stroke: [Br, Ks] }],
      stroke: [{ stroke: [e, "none"] }],
      sr: ["sr-only", "not-sr-only"],
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: [
        "inset-x",
        "inset-y",
        "start",
        "end",
        "top",
        "right",
        "bottom",
        "left",
      ],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      "font-size": ["leading"],
      "fvn-normal": [
        "fvn-ordinal",
        "fvn-slashed-zero",
        "fvn-figure",
        "fvn-spacing",
        "fvn-fraction",
      ],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      rounded: [
        "rounded-s",
        "rounded-e",
        "rounded-t",
        "rounded-r",
        "rounded-b",
        "rounded-l",
        "rounded-ss",
        "rounded-se",
        "rounded-ee",
        "rounded-es",
        "rounded-tl",
        "rounded-tr",
        "rounded-br",
        "rounded-bl",
      ],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": [
        "border-w-s",
        "border-w-e",
        "border-w-t",
        "border-w-r",
        "border-w-b",
        "border-w-l",
      ],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": [
        "border-color-t",
        "border-color-r",
        "border-color-b",
        "border-color-l",
      ],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      "scroll-m": [
        "scroll-mx",
        "scroll-my",
        "scroll-ms",
        "scroll-me",
        "scroll-mt",
        "scroll-mr",
        "scroll-mb",
        "scroll-ml",
      ],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": [
        "scroll-px",
        "scroll-py",
        "scroll-ps",
        "scroll-pe",
        "scroll-pt",
        "scroll-pr",
        "scroll-pb",
        "scroll-pl",
      ],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
    },
    conflictingClassGroupModifiers: { "font-size": ["leading"] },
  };
}
var gj = J(() => {
    lj(), bj();
  }),
  tr,
  wj = J(() => {
    uj(), gj(), (tr = aj(yj));
  }),
  Ba = J(() => {
    wj();
  });
function We() {
  return (
    (We = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var o in n)
              Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
          }
          return e;
        }),
    We.apply(this, arguments)
  );
}
function _j(e) {
  e === void 0 && (e = {});
  let { initialEntries: t = ["/"], initialIndex: n, v5Compat: o = !1 } = e,
    a;
  a = t.map((h, g) =>
    v(h, typeof h == "string" ? null : h.state, g === 0 ? "default" : void 0)
  );
  let u = f(n ?? a.length - 1),
    l = vt.Pop,
    c = null;
  function f(h) {
    return Math.min(Math.max(h, 0), a.length - 1);
  }
  function d() {
    return a[u];
  }
  function v(h, g, w) {
    g === void 0 && (g = null);
    let x = zp(a ? d().pathname : "/", h, g, w);
    return (
      mi(
        x.pathname.charAt(0) === "/",
        "relative pathnames are not supported in memory history: " +
          JSON.stringify(h)
      ),
      x
    );
  }
  function m(h) {
    return typeof h == "string" ? h : bi(h);
  }
  return {
    get index() {
      return u;
    },
    get action() {
      return l;
    },
    get location() {
      return d();
    },
    createHref: m,
    createURL(h) {
      return new URL(m(h), "http://localhost");
    },
    encodeLocation(h) {
      let g = typeof h == "string" ? _n(h) : h;
      return {
        pathname: g.pathname || "",
        search: g.search || "",
        hash: g.hash || "",
      };
    },
    push(h, g) {
      l = vt.Push;
      let w = v(h, g);
      (u += 1),
        a.splice(u, a.length, w),
        o && c && c({ action: l, location: w, delta: 1 });
    },
    replace(h, g) {
      l = vt.Replace;
      let w = v(h, g);
      (a[u] = w), o && c && c({ action: l, location: w, delta: 0 });
    },
    go(h) {
      l = vt.Pop;
      let g = f(u + h),
        w = a[g];
      (u = g), c && c({ action: l, location: w, delta: h });
    },
    listen(h) {
      return (
        (c = h),
        () => {
          c = null;
        }
      );
    },
  };
}
function Te(e, t) {
  if (e === !1 || e === null || typeof e > "u") throw new Error(t);
}
function mi(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {}
  }
}
function Oj() {
  return Math.random().toString(36).substr(2, 8);
}
function zp(e, t, n, o) {
  return (
    n === void 0 && (n = null),
    We(
      { pathname: typeof e == "string" ? e : e.pathname, search: "", hash: "" },
      typeof t == "string" ? _n(t) : t,
      { state: n, key: (t && t.key) || o || Oj() }
    )
  );
}
function bi(e) {
  let { pathname: t = "/", search: n = "", hash: o = "" } = e;
  return (
    n && n !== "?" && (t += n.charAt(0) === "?" ? n : "?" + n),
    o && o !== "#" && (t += o.charAt(0) === "#" ? o : "#" + o),
    t
  );
}
function _n(e) {
  let t = {};
  if (e) {
    let n = e.indexOf("#");
    n >= 0 && ((t.hash = e.substr(n)), (e = e.substr(0, n)));
    let o = e.indexOf("?");
    o >= 0 && ((t.search = e.substr(o)), (e = e.substr(0, o))),
      e && (t.pathname = e);
  }
  return t;
}
function xj(e) {
  return e.index === !0;
}
function gw(e, t, n, o) {
  return (
    n === void 0 && (n = []),
    o === void 0 && (o = {}),
    e.map((a, u) => {
      let l = [...n, u],
        c = typeof a.id == "string" ? a.id : l.join("-");
      if (
        (Te(
          a.index !== !0 || !a.children,
          "Cannot specify children on an index route"
        ),
        Te(
          !o[c],
          'Found a route id collision on id "' +
            c +
            `".  Route id's must be globally unique within Data Router usages`
        ),
        xj(a))
      ) {
        let f = We({}, a, t(a), { id: c });
        return (o[c] = f), f;
      } else {
        let f = We({}, a, t(a), { id: c, children: void 0 });
        return (
          (o[c] = f), a.children && (f.children = gw(a.children, t, l, o)), f
        );
      }
    })
  );
}
function ga(e, t, n) {
  n === void 0 && (n = "/");
  let o = typeof t == "string" ? _n(t) : t,
    a = yi(o.pathname || "/", n);
  if (a == null) return null;
  let u = ww(e);
  Sj(u);
  let l = null;
  for (let c = 0; l == null && c < u.length; ++c) l = kj(u[c], Ij(a));
  return l;
}
function ww(e, t, n, o) {
  t === void 0 && (t = []), n === void 0 && (n = []), o === void 0 && (o = "");
  let a = (u, l, c) => {
    let f = {
      relativePath: c === void 0 ? u.path || "" : c,
      caseSensitive: u.caseSensitive === !0,
      childrenIndex: l,
      route: u,
    };
    f.relativePath.startsWith("/") &&
      (Te(
        f.relativePath.startsWith(o),
        'Absolute route path "' +
          f.relativePath +
          '" nested under path ' +
          ('"' + o + '" is not valid. An absolute child route path ') +
          "must start with the combined path of all its parent routes."
      ),
      (f.relativePath = f.relativePath.slice(o.length)));
    let d = qr([o, f.relativePath]),
      v = n.concat(f);
    u.children &&
      u.children.length > 0 &&
      (Te(
        u.index !== !0,
        "Index routes must not have child routes. Please remove " +
          ('all child routes from route path "' + d + '".')
      ),
      ww(u.children, t, v, d)),
      !(u.path == null && !u.index) &&
        t.push({ path: d, score: Pj(d, u.index), routesMeta: v });
  };
  return (
    e.forEach((u, l) => {
      var c;
      if (u.path === "" || !((c = u.path) != null && c.includes("?"))) a(u, l);
      else for (let f of _w(u.path)) a(u, l, f);
    }),
    t
  );
}
function _w(e) {
  let t = e.split("/");
  if (t.length === 0) return [];
  let [n, ...o] = t,
    a = n.endsWith("?"),
    u = n.replace(/\?$/, "");
  if (o.length === 0) return a ? [u, ""] : [u];
  let l = _w(o.join("/")),
    c = [];
  return (
    c.push(...l.map((f) => (f === "" ? u : [u, f].join("/")))),
    a && c.push(...l),
    c.map((f) => (e.startsWith("/") && f === "" ? "/" : f))
  );
}
function Sj(e) {
  e.sort((t, n) =>
    t.score !== n.score
      ? n.score - t.score
      : Ej(
          t.routesMeta.map((o) => o.childrenIndex),
          n.routesMeta.map((o) => o.childrenIndex)
        )
  );
}
function Pj(e, t) {
  let n = e.split("/"),
    o = n.length;
  return (
    n.some(Bp) && (o += Nw),
    t && (o += Iw),
    n
      .filter((a) => !Bp(a))
      .reduce((a, u) => a + (jw.test(u) ? Aw : u === "" ? Tw : Mw), o)
  );
}
function Ej(e, t) {
  return e.length === t.length && e.slice(0, -1).every((n, o) => n === t[o])
    ? e[e.length - 1] - t[t.length - 1]
    : 0;
}
function kj(e, t) {
  let { routesMeta: n } = e,
    o = {},
    a = "/",
    u = [];
  for (let l = 0; l < n.length; ++l) {
    let c = n[l],
      f = l === n.length - 1,
      d = a === "/" ? t : t.slice(a.length) || "/",
      v = jj(
        { path: c.relativePath, caseSensitive: c.caseSensitive, end: f },
        d
      );
    if (!v) return null;
    Object.assign(o, v.params);
    let m = c.route;
    u.push({
      params: o,
      pathname: qr([a, v.pathname]),
      pathnameBase: Cw(qr([a, v.pathnameBase])),
      route: m,
    }),
      v.pathnameBase !== "/" && (a = qr([a, v.pathnameBase]));
  }
  return u;
}
function jj(e, t) {
  typeof e == "string" && (e = { path: e, caseSensitive: !1, end: !0 });
  let [n, o] = Aj(e.path, e.caseSensitive, e.end),
    a = t.match(n);
  if (!a) return null;
  let u = a[0],
    l = u.replace(/(.)\/+$/, "$1"),
    c = a.slice(1);
  return {
    params: o.reduce((f, d, v) => {
      if (d === "*") {
        let m = c[v] || "";
        l = u.slice(0, u.length - m.length).replace(/(.)\/+$/, "$1");
      }
      return (f[d] = Tj(c[v] || "", d)), f;
    }, {}),
    pathname: u,
    pathnameBase: l,
    pattern: e,
  };
}
function Aj(e, t, n) {
  t === void 0 && (t = !1),
    n === void 0 && (n = !0),
    mi(
      e === "*" || !e.endsWith("*") || e.endsWith("/*"),
      'Route path "' +
        e +
        '" will be treated as if it were ' +
        ('"' + e.replace(/\*$/, "/*") + '" because the `*` character must ') +
        "always follow a `/` in the pattern. To get rid of this warning, " +
        ('please change the route path to "' + e.replace(/\*$/, "/*") + '".')
    );
  let o = [],
    a =
      "^" +
      e
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^$?{}|()[\]]/g, "\\$&")
        .replace(/\/:(\w+)/g, (u, l) => (o.push(l), "/([^\\/]+)"));
  return (
    e.endsWith("*")
      ? (o.push("*"),
        (a += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : n
      ? (a += "\\/*$")
      : e !== "" && e !== "/" && (a += "(?:(?=\\/|$))"),
    [new RegExp(a, t ? void 0 : "i"), o]
  );
}
function Ij(e) {
  try {
    return decodeURI(e);
  } catch (t) {
    return (
      mi(
        !1,
        'The URL path "' +
          e +
          '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' +
          ("encoding (" + t + ").")
      ),
      e
    );
  }
}
function Tj(e, t) {
  try {
    return decodeURIComponent(e);
  } catch (n) {
    return (
      mi(
        !1,
        'The value for the URL param "' +
          t +
          '" will not be decoded because' +
          (' the string "' +
            e +
            '" is a malformed URL segment. This is probably') +
          (" due to a bad percent encoding (" + n + ").")
      ),
      e
    );
  }
}
function yi(e, t) {
  if (t === "/") return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase())) return null;
  let n = t.endsWith("/") ? t.length - 1 : t.length,
    o = e.charAt(n);
  return o && o !== "/" ? null : e.slice(n) || "/";
}
function Mj(e, t) {
  t === void 0 && (t = "/");
  let {
    pathname: n,
    search: o = "",
    hash: a = "",
  } = typeof e == "string" ? _n(e) : e;
  return {
    pathname: n ? (n.startsWith("/") ? n : Nj(n, t)) : t,
    search: zw(o),
    hash: Rw(a),
  };
}
function Nj(e, t) {
  let n = t.replace(/\/+$/, "").split("/");
  return (
    e.split("/").forEach((o) => {
      o === ".." ? n.length > 1 && n.pop() : o !== "." && n.push(o);
    }),
    n.length > 1 ? n.join("/") : "/"
  );
}
function tp(e, t, n, o) {
  return (
    "Cannot include a '" +
    e +
    "' character in a manually specified " +
    ("`to." +
      t +
      "` field [" +
      JSON.stringify(o) +
      "].  Please separate it out to the ") +
    ("`to." + n + "` field. Alternatively you may provide the full path as ") +
    'a string in <Link to="..."> and the router will parse it for you.'
  );
}
function Rc(e) {
  return e.filter(
    (t, n) => n === 0 || (t.route.path && t.route.path.length > 0)
  );
}
function Tv(e, t, n, o) {
  o === void 0 && (o = !1);
  let a;
  typeof e == "string"
    ? (a = _n(e))
    : ((a = We({}, e)),
      Te(
        !a.pathname || !a.pathname.includes("?"),
        tp("?", "pathname", "search", a)
      ),
      Te(
        !a.pathname || !a.pathname.includes("#"),
        tp("#", "pathname", "hash", a)
      ),
      Te(!a.search || !a.search.includes("#"), tp("#", "search", "hash", a)));
  let u = e === "" || a.pathname === "",
    l = u ? "/" : a.pathname,
    c;
  if (o || l == null) c = n;
  else {
    let m = t.length - 1;
    if (l.startsWith("..")) {
      let h = l.split("/");
      for (; h[0] === ".."; ) h.shift(), (m -= 1);
      a.pathname = h.join("/");
    }
    c = m >= 0 ? t[m] : "/";
  }
  let f = Mj(a, c),
    d = l && l !== "/" && l.endsWith("/"),
    v = (u || l === ".") && n.endsWith("/");
  return !f.pathname.endsWith("/") && (d || v) && (f.pathname += "/"), f;
}
function Ow(e) {
  return (
    e != null &&
    typeof e.status == "number" &&
    typeof e.statusText == "string" &&
    typeof e.internal == "boolean" &&
    "data" in e
  );
}
function Cj(e) {
  Te(
    e.routes.length > 0,
    "You must provide a non-empty routes array to createRouter"
  );
  let t;
  if (e.mapRouteProperties) t = e.mapRouteProperties;
  else if (e.detectErrorBoundary) {
    let B = e.detectErrorBoundary;
    t = (U) => ({ hasErrorBoundary: B(U) });
  } else t = Vw;
  let n = {},
    o = gw(e.routes, t, void 0, n),
    a,
    u = e.basename || "/",
    l = We({ v7_normalizeFormMethod: !1, v7_prependBasename: !1 }, e.future),
    c = null,
    f = new Set(),
    d = null,
    v = null,
    m = null,
    h = e.hydrationData != null,
    g = ga(o, e.history.location, u),
    w = null;
  if (g == null) {
    let B = Ur(404, { pathname: e.history.location.pathname }),
      { matches: U, route: H } = vy(o);
    (g = U), (w = { [H.id]: B });
  }
  let x =
      !g.some((B) => B.route.lazy) &&
      (!g.some((B) => B.route.loader) || e.hydrationData != null),
    S,
    O = {
      historyAction: e.history.action,
      location: e.history.location,
      matches: g,
      initialized: x,
      navigation: ec,
      restoreScrollPosition: e.hydrationData != null ? !1 : null,
      preventScrollReset: !1,
      revalidation: "idle",
      loaderData: (e.hydrationData && e.hydrationData.loaderData) || {},
      actionData: (e.hydrationData && e.hydrationData.actionData) || null,
      errors: (e.hydrationData && e.hydrationData.errors) || w,
      fetchers: new Map(),
      blockers: new Map(),
    },
    A = vt.Pop,
    k = !1,
    j,
    C = !1,
    D = !1,
    W = [],
    $ = [],
    F = new Map(),
    V = 0,
    re = -1,
    he = new Map(),
    Z = new Set(),
    ge = new Map(),
    Se = new Map(),
    we = new Map(),
    ce = !1;
  function K() {
    return (
      (c = e.history.listen((B) => {
        let { action: U, location: H, delta: le } = B;
        if (ce) {
          ce = !1;
          return;
        }
        mi(
          we.size === 0 || le != null,
          "You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL."
        );
        let ae = Uo({
          currentLocation: O.location,
          nextLocation: H,
          historyAction: U,
        });
        if (ae && le != null) {
          (ce = !0),
            e.history.go(le * -1),
            Yr(ae, {
              state: "blocked",
              location: H,
              proceed() {
                Yr(ae, {
                  state: "proceeding",
                  proceed: void 0,
                  reset: void 0,
                  location: H,
                }),
                  e.history.go(le);
              },
              reset() {
                Ht(ae), I({ blockers: new Map(S.state.blockers) });
              },
            });
          return;
        }
        return je(U, H);
      })),
      O.initialized || je(vt.Pop, O.location),
      S
    );
  }
  function de() {
    c && c(),
      f.clear(),
      j && j.abort(),
      O.fetchers.forEach((B, U) => Qn(U)),
      O.blockers.forEach((B, U) => Ht(U));
  }
  function me(B) {
    return f.add(B), () => f.delete(B);
  }
  function I(B) {
    (O = We({}, O, B)), f.forEach((U) => U(O));
  }
  function q(B, U) {
    var H, le;
    let ae =
        O.actionData != null &&
        O.navigation.formMethod != null &&
        Un(O.navigation.formMethod) &&
        O.navigation.state === "loading" &&
        ((H = B.state) == null ? void 0 : H._isRedirect) !== !0,
      xe;
    U.actionData
      ? Object.keys(U.actionData).length > 0
        ? (xe = U.actionData)
        : (xe = null)
      : ae
      ? (xe = O.actionData)
      : (xe = null);
    let Ae = U.loaderData
      ? py(O.loaderData, U.loaderData, U.matches || [], U.errors)
      : O.loaderData;
    for (let [fe] of we) Ht(fe);
    let ye =
      k === !0 ||
      (O.navigation.formMethod != null &&
        Un(O.navigation.formMethod) &&
        ((le = B.state) == null ? void 0 : le._isRedirect) !== !0);
    a && ((o = a), (a = void 0)),
      I(
        We({}, U, {
          actionData: xe,
          loaderData: Ae,
          historyAction: A,
          location: B,
          initialized: !0,
          navigation: ec,
          revalidation: "idle",
          restoreScrollPosition: Zn(B, U.matches || O.matches),
          preventScrollReset: ye,
          blockers: new Map(O.blockers),
        })
      ),
      C ||
        A === vt.Pop ||
        (A === vt.Push
          ? e.history.push(B, B.state)
          : A === vt.Replace && e.history.replace(B, B.state)),
      (A = vt.Pop),
      (k = !1),
      (C = !1),
      (D = !1),
      (W = []),
      ($ = []);
  }
  async function Ee(B, U) {
    if (typeof B == "number") {
      e.history.go(B);
      return;
    }
    let H = Rp(
        O.location,
        O.matches,
        u,
        l.v7_prependBasename,
        B,
        U?.fromRouteId,
        U?.relative
      ),
      {
        path: le,
        submission: ae,
        error: xe,
      } = ly(l.v7_normalizeFormMethod, !1, H, U),
      Ae = O.location,
      ye = zp(O.location, le, U && U.state);
    ye = We({}, ye, e.history.encodeLocation(ye));
    let fe = U && U.replace != null ? U.replace : void 0,
      Me = vt.Push;
    fe === !0
      ? (Me = vt.Replace)
      : fe === !1 ||
        (ae != null &&
          Un(ae.formMethod) &&
          ae.formAction === O.location.pathname + O.location.search &&
          (Me = vt.Replace));
    let Re =
        U && "preventScrollReset" in U ? U.preventScrollReset === !0 : void 0,
      ut = Uo({ currentLocation: Ae, nextLocation: ye, historyAction: Me });
    if (ut) {
      Yr(ut, {
        state: "blocked",
        location: ye,
        proceed() {
          Yr(ut, {
            state: "proceeding",
            proceed: void 0,
            reset: void 0,
            location: ye,
          }),
            Ee(B, U);
        },
        reset() {
          Ht(ut), I({ blockers: new Map(O.blockers) });
        },
      });
      return;
    }
    return await je(Me, ye, {
      submission: ae,
      pendingError: xe,
      preventScrollReset: Re,
      replace: U && U.replace,
    });
  }
  function Ie() {
    if (
      (Qr(),
      I({ revalidation: "loading" }),
      O.navigation.state !== "submitting")
    ) {
      if (O.navigation.state === "idle") {
        je(O.historyAction, O.location, { startUninterruptedRevalidation: !0 });
        return;
      }
      je(A || O.historyAction, O.navigation.location, {
        overrideNavigation: O.navigation,
      });
    }
  }
  async function je(B, U, H) {
    j && j.abort(),
      (j = null),
      (A = B),
      (C = (H && H.startUninterruptedRevalidation) === !0),
      Ni(O.location, O.matches),
      (k = (H && H.preventScrollReset) === !0);
    let le = a || o,
      ae = H && H.overrideNavigation,
      xe = ga(le, U, u);
    if (!xe) {
      let Xe = Ur(404, { pathname: U.pathname }),
        { matches: Qe, route: It } = vy(le);
      Gn(), q(U, { matches: Qe, loaderData: {}, errors: { [It.id]: Xe } });
      return;
    }
    if (
      Dj(O.location, U) &&
      !(H && H.submission && Un(H.submission.formMethod))
    ) {
      q(U, { matches: xe });
      return;
    }
    j = new AbortController();
    let Ae = Tu(e.history, U, j.signal, H && H.submission),
      ye,
      fe;
    if (H && H.pendingError) fe = { [wa(xe).route.id]: H.pendingError };
    else if (H && H.submission && Un(H.submission.formMethod)) {
      let Xe = await Ce(Ae, U, H.submission, xe, { replace: H.replace });
      if (Xe.shortCircuited) return;
      (ye = Xe.pendingActionData),
        (fe = Xe.pendingActionError),
        (ae = We({ state: "loading", location: U }, H.submission)),
        (Ae = new Request(Ae.url, { signal: Ae.signal }));
    }
    let {
      shortCircuited: Me,
      loaderData: Re,
      errors: ut,
    } = await Be(
      Ae,
      U,
      xe,
      ae,
      H && H.submission,
      H && H.fetcherSubmission,
      H && H.replace,
      ye,
      fe
    );
    Me ||
      ((j = null),
      q(
        U,
        We({ matches: xe }, ye ? { actionData: ye } : {}, {
          loaderData: Re,
          errors: ut,
        })
      ));
  }
  async function Ce(B, U, H, le, ae) {
    Qr();
    let xe = We({ state: "submitting", location: U }, H);
    I({ navigation: xe });
    let Ae,
      ye = Lp(le, U);
    if (!ye.route.action && !ye.route.lazy)
      Ae = {
        type: gt.error,
        error: Ur(405, {
          method: B.method,
          pathname: U.pathname,
          routeId: ye.route.id,
        }),
      };
    else if (((Ae = await Iu("action", B, ye, le, n, t, u)), B.signal.aborted))
      return { shortCircuited: !0 };
    if (Sa(Ae)) {
      let fe;
      return (
        ae && ae.replace != null
          ? (fe = ae.replace)
          : (fe = Ae.location === O.location.pathname + O.location.search),
        await vr(O, Ae, { submission: H, replace: fe }),
        { shortCircuited: !0 }
      );
    }
    if (Ku(Ae)) {
      let fe = wa(le, ye.route.id);
      return (
        (ae && ae.replace) !== !0 && (A = vt.Push),
        {
          pendingActionData: {},
          pendingActionError: { [fe.route.id]: Ae.error },
        }
      );
    }
    if (ci(Ae)) throw Ur(400, { type: "defer-action" });
    return { pendingActionData: { [ye.route.id]: Ae.data } };
  }
  async function Be(B, U, H, le, ae, xe, Ae, ye, fe) {
    let Me = le;
    Me ||
      (Me = We(
        {
          state: "loading",
          location: U,
          formMethod: void 0,
          formAction: void 0,
          formEncType: void 0,
          formData: void 0,
        },
        ae
      ));
    let Re =
        ae || xe
          ? ae || xe
          : Me.formMethod && Me.formAction && Me.formData && Me.formEncType
          ? {
              formMethod: Me.formMethod,
              formAction: Me.formAction,
              formData: Me.formData,
              formEncType: Me.formEncType,
            }
          : void 0,
      ut = a || o,
      [Xe, Qe] = sy(e.history, O, H, Re, U, D, W, $, ge, ut, u, ye, fe);
    if (
      (Gn(
        (Ye) =>
          !(H && H.some((dt) => dt.route.id === Ye)) ||
          (Xe && Xe.some((dt) => dt.route.id === Ye))
      ),
      Xe.length === 0 && Qe.length === 0)
    ) {
      let Ye = Do();
      return (
        q(
          U,
          We(
            { matches: H, loaderData: {}, errors: fe || null },
            ye ? { actionData: ye } : {},
            Ye ? { fetchers: new Map(O.fetchers) } : {}
          )
        ),
        { shortCircuited: !0 }
      );
    }
    if (!C) {
      Qe.forEach((dt) => {
        let ir = O.fetchers.get(dt.key),
          Zr = {
            state: "loading",
            data: ir && ir.data,
            formMethod: void 0,
            formAction: void 0,
            formEncType: void 0,
            formData: void 0,
            " _hasFetcherDoneAnything ": !0,
          };
        O.fetchers.set(dt.key, Zr);
      });
      let Ye = ye || O.actionData;
      I(
        We(
          { navigation: Me },
          Ye
            ? Object.keys(Ye).length === 0
              ? { actionData: null }
              : { actionData: Ye }
            : {},
          Qe.length > 0 ? { fetchers: new Map(O.fetchers) } : {}
        )
      );
    }
    (re = ++V),
      Qe.forEach((Ye) => {
        Ye.controller && F.set(Ye.key, Ye.controller);
      });
    let It = () => Qe.forEach((Ye) => Ar(Ye.key));
    j && j.signal.addEventListener("abort", It);
    let {
      results: Jr,
      loaderResults: to,
      fetcherResults: Pn,
    } = await Bo(O.matches, H, Xe, Qe, B);
    if (B.signal.aborted) return { shortCircuited: !0 };
    j && j.signal.removeEventListener("abort", It),
      Qe.forEach((Ye) => F.delete(Ye.key));
    let nr = hy(Jr);
    if (nr) return await vr(O, nr, { replace: Ae }), { shortCircuited: !0 };
    let { loaderData: Gr, errors: ro } = dy(O, H, Xe, to, fe, Qe, Pn, Se);
    Se.forEach((Ye, dt) => {
      Ye.subscribe((ir) => {
        (ir || Ye.done) && Se.delete(dt);
      });
    });
    let Ir = Do(),
      En = Jn(re),
      or = Ir || En || Qe.length > 0;
    return We(
      { loaderData: Gr, errors: ro },
      or ? { fetchers: new Map(O.fetchers) } : {}
    );
  }
  function He(B) {
    return O.fetchers.get(B) || Fw;
  }
  function ze(B, U, H, le) {
    if ($w)
      throw new Error(
        "router.fetch() was called during the server render, but it shouldn't be. You are likely calling a useFetcher() method in the body of your component. Try moving it to a useEffect or a callback."
      );
    F.has(B) && Ar(B);
    let ae = a || o,
      xe = Rp(
        O.location,
        O.matches,
        u,
        l.v7_prependBasename,
        H,
        U,
        le?.relative
      ),
      Ae = ga(ae, xe, u);
    if (!Ae) {
      xn(B, U, Ur(404, { pathname: xe }));
      return;
    }
    let { path: ye, submission: fe } = ly(l.v7_normalizeFormMethod, !0, xe, le),
      Me = Lp(Ae, ye);
    if (((k = (le && le.preventScrollReset) === !0), fe && Un(fe.formMethod))) {
      Ot(B, U, ye, Me, Ae, fe);
      return;
    }
    ge.set(B, { routeId: U, path: ye }), Va(B, U, ye, Me, Ae, fe);
  }
  async function Ot(B, U, H, le, ae, xe) {
    if ((Qr(), ge.delete(B), !le.route.action && !le.route.lazy)) {
      let mt = Ur(405, { method: xe.formMethod, pathname: H, routeId: U });
      xn(B, U, mt);
      return;
    }
    let Ae = O.fetchers.get(B),
      ye = We({ state: "submitting" }, xe, {
        data: Ae && Ae.data,
        " _hasFetcherDoneAnything ": !0,
      });
    O.fetchers.set(B, ye), I({ fetchers: new Map(O.fetchers) });
    let fe = new AbortController(),
      Me = Tu(e.history, H, fe.signal, xe);
    F.set(B, fe);
    let Re = await Iu("action", Me, le, ae, n, t, u);
    if (Me.signal.aborted) {
      F.get(B) === fe && F.delete(B);
      return;
    }
    if (Sa(Re)) {
      F.delete(B), Z.add(B);
      let mt = We({ state: "loading" }, xe, {
        data: void 0,
        " _hasFetcherDoneAnything ": !0,
      });
      return (
        O.fetchers.set(B, mt),
        I({ fetchers: new Map(O.fetchers) }),
        vr(O, Re, { submission: xe, isFetchActionRedirect: !0 })
      );
    }
    if (Ku(Re)) {
      xn(B, U, Re.error);
      return;
    }
    if (ci(Re)) throw Ur(400, { type: "defer-action" });
    let ut = O.navigation.location || O.location,
      Xe = Tu(e.history, ut, fe.signal),
      Qe = a || o,
      It =
        O.navigation.state !== "idle"
          ? ga(Qe, O.navigation.location, u)
          : O.matches;
    Te(It, "Didn't find any matches after fetcher action");
    let Jr = ++V;
    he.set(B, Jr);
    let to = We({ state: "loading", data: Re.data }, xe, {
      " _hasFetcherDoneAnything ": !0,
    });
    O.fetchers.set(B, to);
    let [Pn, nr] = sy(
      e.history,
      O,
      It,
      xe,
      ut,
      D,
      W,
      $,
      ge,
      Qe,
      u,
      { [le.route.id]: Re.data },
      void 0
    );
    nr
      .filter((mt) => mt.key !== B)
      .forEach((mt) => {
        let Fo = mt.key,
          Ci = O.fetchers.get(Fo),
          Wa = {
            state: "loading",
            data: Ci && Ci.data,
            formMethod: void 0,
            formAction: void 0,
            formEncType: void 0,
            formData: void 0,
            " _hasFetcherDoneAnything ": !0,
          };
        O.fetchers.set(Fo, Wa), mt.controller && F.set(Fo, mt.controller);
      }),
      I({ fetchers: new Map(O.fetchers) });
    let Gr = () => nr.forEach((mt) => Ar(mt.key));
    fe.signal.addEventListener("abort", Gr);
    let {
      results: ro,
      loaderResults: Ir,
      fetcherResults: En,
    } = await Bo(O.matches, It, Pn, nr, Xe);
    if (fe.signal.aborted) return;
    fe.signal.removeEventListener("abort", Gr),
      he.delete(B),
      F.delete(B),
      nr.forEach((mt) => F.delete(mt.key));
    let or = hy(ro);
    if (or) return vr(O, or);
    let { loaderData: Ye, errors: dt } = dy(
        O,
        O.matches,
        Pn,
        Ir,
        void 0,
        nr,
        En,
        Se
      ),
      ir = {
        state: "idle",
        data: Re.data,
        formMethod: void 0,
        formAction: void 0,
        formEncType: void 0,
        formData: void 0,
        " _hasFetcherDoneAnything ": !0,
      };
    O.fetchers.set(B, ir);
    let Zr = Jn(Jr);
    O.navigation.state === "loading" && Jr > re
      ? (Te(A, "Expected pending action"),
        j && j.abort(),
        q(O.navigation.location, {
          matches: It,
          loaderData: Ye,
          errors: dt,
          fetchers: new Map(O.fetchers),
        }))
      : (I(
          We(
            { errors: dt, loaderData: py(O.loaderData, Ye, It, dt) },
            Zr ? { fetchers: new Map(O.fetchers) } : {}
          )
        ),
        (D = !1));
  }
  async function Va(B, U, H, le, ae, xe) {
    let Ae = O.fetchers.get(B),
      ye = We(
        {
          state: "loading",
          formMethod: void 0,
          formAction: void 0,
          formEncType: void 0,
          formData: void 0,
        },
        xe,
        { data: Ae && Ae.data, " _hasFetcherDoneAnything ": !0 }
      );
    O.fetchers.set(B, ye), I({ fetchers: new Map(O.fetchers) });
    let fe = new AbortController(),
      Me = Tu(e.history, H, fe.signal);
    F.set(B, fe);
    let Re = await Iu("loader", Me, le, ae, n, t, u);
    if (
      (ci(Re) && (Re = (await Ew(Re, Me.signal, !0)) || Re),
      F.get(B) === fe && F.delete(B),
      Me.signal.aborted)
    )
      return;
    if (Sa(Re)) {
      Z.add(B), await vr(O, Re);
      return;
    }
    if (Ku(Re)) {
      let Xe = wa(O.matches, U);
      O.fetchers.delete(B),
        I({
          fetchers: new Map(O.fetchers),
          errors: { [Xe.route.id]: Re.error },
        });
      return;
    }
    Te(!ci(Re), "Unhandled fetcher deferred data");
    let ut = {
      state: "idle",
      data: Re.data,
      formMethod: void 0,
      formAction: void 0,
      formEncType: void 0,
      formData: void 0,
      " _hasFetcherDoneAnything ": !0,
    };
    O.fetchers.set(B, ut), I({ fetchers: new Map(O.fetchers) });
  }
  async function vr(B, U, H) {
    var le;
    let {
      submission: ae,
      replace: xe,
      isFetchActionRedirect: Ae,
    } = H === void 0 ? {} : H;
    U.revalidate && (D = !0);
    let ye = zp(
      B.location,
      U.location,
      We({ _isRedirect: !0 }, Ae ? { _isFetchActionRedirect: !0 } : {})
    );
    if (
      (Te(ye, "Expected a location on the redirect navigation"),
      Cv.test(U.location) &&
        Up &&
        typeof ((le = window) == null ? void 0 : le.location) < "u")
    ) {
      let Qe = e.history.createURL(U.location),
        It = yi(Qe.pathname, u) == null;
      if (window.location.origin !== Qe.origin || It) {
        xe
          ? window.location.replace(U.location)
          : window.location.assign(U.location);
        return;
      }
    }
    j = null;
    let fe = xe === !0 ? vt.Replace : vt.Push,
      {
        formMethod: Me,
        formAction: Re,
        formEncType: ut,
        formData: Xe,
      } = B.navigation;
    !ae &&
      Me &&
      Re &&
      Xe &&
      ut &&
      (ae = { formMethod: Me, formAction: Re, formEncType: ut, formData: Xe }),
      Uw.has(U.status) && ae && Un(ae.formMethod)
        ? await je(fe, ye, {
            submission: We({}, ae, { formAction: U.location }),
            preventScrollReset: k,
          })
        : Ae
        ? await je(fe, ye, {
            overrideNavigation: {
              state: "loading",
              location: ye,
              formMethod: void 0,
              formAction: void 0,
              formEncType: void 0,
              formData: void 0,
            },
            fetcherSubmission: ae,
            preventScrollReset: k,
          })
        : await je(fe, ye, {
            overrideNavigation: {
              state: "loading",
              location: ye,
              formMethod: ae ? ae.formMethod : void 0,
              formAction: ae ? ae.formAction : void 0,
              formEncType: ae ? ae.formEncType : void 0,
              formData: ae ? ae.formData : void 0,
            },
            preventScrollReset: k,
          });
  }
  async function Bo(B, U, H, le, ae) {
    let xe = await Promise.all([
        ...H.map((fe) => Iu("loader", ae, fe, U, n, t, u)),
        ...le.map((fe) =>
          fe.matches && fe.match && fe.controller
            ? Iu(
                "loader",
                Tu(e.history, fe.path, fe.controller.signal),
                fe.match,
                fe.matches,
                n,
                t,
                u
              )
            : { type: gt.error, error: Ur(404, { pathname: fe.path }) }
        ),
      ]),
      Ae = xe.slice(0, H.length),
      ye = xe.slice(H.length);
    return (
      await Promise.all([
        my(
          B,
          H,
          Ae,
          Ae.map(() => ae.signal),
          !1,
          O.loaderData
        ),
        my(
          B,
          le.map((fe) => fe.match),
          ye,
          le.map((fe) => (fe.controller ? fe.controller.signal : null)),
          !0
        ),
      ]),
      { results: xe, loaderResults: Ae, fetcherResults: ye }
    );
  }
  function Qr() {
    (D = !0),
      W.push(...Gn()),
      ge.forEach((B, U) => {
        F.has(U) && ($.push(U), Ar(U));
      });
  }
  function xn(B, U, H) {
    let le = wa(O.matches, U);
    Qn(B), I({ errors: { [le.route.id]: H }, fetchers: new Map(O.fetchers) });
  }
  function Qn(B) {
    F.has(B) && Ar(B),
      ge.delete(B),
      he.delete(B),
      Z.delete(B),
      O.fetchers.delete(B);
  }
  function Ar(B) {
    let U = F.get(B);
    Te(U, "Expected fetch controller: " + B), U.abort(), F.delete(B);
  }
  function Yn(B) {
    for (let U of B) {
      let H = {
        state: "idle",
        data: He(U).data,
        formMethod: void 0,
        formAction: void 0,
        formEncType: void 0,
        formData: void 0,
        " _hasFetcherDoneAnything ": !0,
      };
      O.fetchers.set(U, H);
    }
  }
  function Do() {
    let B = [],
      U = !1;
    for (let H of Z) {
      let le = O.fetchers.get(H);
      Te(le, "Expected fetcher: " + H),
        le.state === "loading" && (Z.delete(H), B.push(H), (U = !0));
    }
    return Yn(B), U;
  }
  function Jn(B) {
    let U = [];
    for (let [H, le] of he)
      if (le < B) {
        let ae = O.fetchers.get(H);
        Te(ae, "Expected fetcher: " + H),
          ae.state === "loading" && (Ar(H), he.delete(H), U.push(H));
      }
    return Yn(U), U.length > 0;
  }
  function Sn(B, U) {
    let H = O.blockers.get(B) || Dp;
    return we.get(B) !== U && we.set(B, U), H;
  }
  function Ht(B) {
    O.blockers.delete(B), we.delete(B);
  }
  function Yr(B, U) {
    let H = O.blockers.get(B) || Dp;
    Te(
      (H.state === "unblocked" && U.state === "blocked") ||
        (H.state === "blocked" && U.state === "blocked") ||
        (H.state === "blocked" && U.state === "proceeding") ||
        (H.state === "blocked" && U.state === "unblocked") ||
        (H.state === "proceeding" && U.state === "unblocked"),
      "Invalid blocker state transition: " + H.state + " -> " + U.state
    ),
      O.blockers.set(B, U),
      I({ blockers: new Map(O.blockers) });
  }
  function Uo(B) {
    let { currentLocation: U, nextLocation: H, historyAction: le } = B;
    if (we.size === 0) return;
    we.size > 1 && mi(!1, "A router only supports one blocker at a time");
    let ae = Array.from(we.entries()),
      [xe, Ae] = ae[ae.length - 1],
      ye = O.blockers.get(xe);
    if (
      !(ye && ye.state === "proceeding") &&
      Ae({ currentLocation: U, nextLocation: H, historyAction: le })
    )
      return xe;
  }
  function Gn(B) {
    let U = [];
    return (
      Se.forEach((H, le) => {
        (!B || B(le)) && (H.cancel(), U.push(le), Se.delete(le));
      }),
      U
    );
  }
  function Mi(B, U, H) {
    if (
      ((d = B), (m = U), (v = H || ((le) => le.key)), !h && O.navigation === ec)
    ) {
      h = !0;
      let le = Zn(O.location, O.matches);
      le != null && I({ restoreScrollPosition: le });
    }
    return () => {
      (d = null), (m = null), (v = null);
    };
  }
  function Ni(B, U) {
    if (d && v && m) {
      let H = U.map((ae) => by(ae, O.loaderData)),
        le = v(B, H) || B.key;
      d[le] = m();
    }
  }
  function Zn(B, U) {
    if (d && v && m) {
      let H = U.map((xe) => by(xe, O.loaderData)),
        le = v(B, H) || B.key,
        ae = d[le];
      if (typeof ae == "number") return ae;
    }
    return null;
  }
  function eo(B) {
    a = B;
  }
  return (
    (S = {
      get basename() {
        return u;
      },
      get state() {
        return O;
      },
      get routes() {
        return o;
      },
      initialize: K,
      subscribe: me,
      enableScrollRestoration: Mi,
      navigate: Ee,
      fetch: ze,
      revalidate: Ie,
      createHref: (B) => e.history.createHref(B),
      encodeLocation: (B) => e.history.encodeLocation(B),
      getFetcher: He,
      deleteFetcher: Qn,
      dispose: de,
      getBlocker: Sn,
      deleteBlocker: Ht,
      _internalFetchControllers: F,
      _internalActiveDeferreds: Se,
      _internalSetRoutes: eo,
    }),
    S
  );
}
function zj(e) {
  return e != null && "formData" in e;
}
function Rp(e, t, n, o, a, u, l) {
  let c, f;
  if (u != null && l !== "path") {
    c = [];
    for (let v of t)
      if ((c.push(v), v.route.id === u)) {
        f = v;
        break;
      }
  } else (c = t), (f = t[t.length - 1]);
  let d = Tv(
    a || ".",
    Rc(c).map((v) => v.pathnameBase),
    e.pathname,
    l === "path"
  );
  return (
    a == null && ((d.search = e.search), (d.hash = e.hash)),
    (a == null || a === "" || a === ".") &&
      f &&
      f.route.index &&
      !Mv(d.search) &&
      (d.search = d.search ? d.search.replace(/^\?/, "?index&") : "?index"),
    o &&
      n !== "/" &&
      (d.pathname = d.pathname === "/" ? n : qr([n, d.pathname])),
    bi(d)
  );
}
function ly(e, t, n, o) {
  if (!o || !zj(o)) return { path: n };
  if (o.formMethod && !$j(o.formMethod))
    return { path: n, error: Ur(405, { method: o.formMethod }) };
  let a;
  if (o.formData) {
    let c = o.formMethod || "get";
    if (
      ((a = {
        formMethod: e ? c.toUpperCase() : c.toLowerCase(),
        formAction: Pw(n),
        formEncType:
          (o && o.formEncType) || "application/x-www-form-urlencoded",
        formData: o.formData,
      }),
      Un(a.formMethod))
    )
      return { path: n, submission: a };
  }
  let u = _n(n),
    l = Sw(o.formData);
  return (
    t && u.search && Mv(u.search) && l.append("index", ""),
    (u.search = "?" + l),
    { path: bi(u), submission: a }
  );
}
function Rj(e, t) {
  let n = e;
  if (t) {
    let o = e.findIndex((a) => a.route.id === t);
    o >= 0 && (n = e.slice(0, o));
  }
  return n;
}
function sy(e, t, n, o, a, u, l, c, f, d, v, m, h) {
  let g = h ? Object.values(h)[0] : m ? Object.values(m)[0] : void 0,
    w = e.createURL(t.location),
    x = e.createURL(a),
    S = h ? Object.keys(h)[0] : void 0,
    O = Rj(n, S).filter((k, j) => {
      if (k.route.lazy) return !0;
      if (k.route.loader == null) return !1;
      if (Lj(t.loaderData, t.matches[j], k) || l.some((W) => W === k.route.id))
        return !0;
      let C = t.matches[j],
        D = k;
      return cy(
        k,
        We(
          {
            currentUrl: w,
            currentParams: C.params,
            nextUrl: x,
            nextParams: D.params,
          },
          o,
          {
            actionResult: g,
            defaultShouldRevalidate:
              u ||
              w.toString() === x.toString() ||
              w.search !== x.search ||
              xw(C, D),
          }
        )
      );
    }),
    A = [];
  return (
    f.forEach((k, j) => {
      if (!n.some((W) => W.route.id === k.routeId)) return;
      let C = ga(d, k.path, v);
      if (!C) {
        A.push({
          key: j,
          routeId: k.routeId,
          path: k.path,
          matches: null,
          match: null,
          controller: null,
        });
        return;
      }
      let D = Lp(C, k.path);
      if (c.includes(j)) {
        A.push({
          key: j,
          routeId: k.routeId,
          path: k.path,
          matches: C,
          match: D,
          controller: new AbortController(),
        });
        return;
      }
      cy(
        D,
        We(
          {
            currentUrl: w,
            currentParams: t.matches[t.matches.length - 1].params,
            nextUrl: x,
            nextParams: n[n.length - 1].params,
          },
          o,
          { actionResult: g, defaultShouldRevalidate: u }
        )
      ) &&
        A.push({
          key: j,
          routeId: k.routeId,
          path: k.path,
          matches: C,
          match: D,
          controller: new AbortController(),
        });
    }),
    [O, A]
  );
}
function Lj(e, t, n) {
  let o = !t || n.route.id !== t.route.id,
    a = e[n.route.id] === void 0;
  return o || a;
}
function xw(e, t) {
  let n = e.route.path;
  return (
    e.pathname !== t.pathname ||
    (n != null && n.endsWith("*") && e.params["*"] !== t.params["*"])
  );
}
function cy(e, t) {
  if (e.route.shouldRevalidate) {
    let n = e.route.shouldRevalidate(t);
    if (typeof n == "boolean") return n;
  }
  return t.defaultShouldRevalidate;
}
async function fy(e, t, n) {
  if (!e.lazy) return;
  let o = await e.lazy();
  if (!e.lazy) return;
  let a = n[e.id];
  Te(a, "No route found in manifest");
  let u = {};
  for (let l in o) {
    let c = a[l] !== void 0 && l !== "hasErrorBoundary";
    mi(
      !c,
      'Route "' +
        a.id +
        '" has a static property "' +
        l +
        '" defined but its lazy function is also returning a value for this property. ' +
        ('The lazy route property "' + l + '" will be ignored.')
    ),
      !c && !kw.has(l) && (u[l] = o[l]);
  }
  Object.assign(a, u), Object.assign(a, We({}, t(a), { lazy: void 0 }));
}
async function Iu(e, t, n, o, a, u, l, c, f, d) {
  c === void 0 && (c = !1), f === void 0 && (f = !1);
  let v,
    m,
    h,
    g = (S) => {
      let O,
        A = new Promise((k, j) => (O = j));
      return (
        (h = () => O()),
        t.signal.addEventListener("abort", h),
        Promise.race([S({ request: t, params: n.params, context: d }), A])
      );
    };
  try {
    let S = n.route[e];
    if (n.route.lazy)
      if (S) m = (await Promise.all([g(S), fy(n.route, u, a)]))[0];
      else if ((await fy(n.route, u, a), (S = n.route[e]), S)) m = await g(S);
      else if (e === "action") {
        let O = new URL(t.url),
          A = O.pathname + O.search;
        throw Ur(405, { method: t.method, pathname: A, routeId: n.route.id });
      } else return { type: gt.data, data: void 0 };
    else if (S) m = await g(S);
    else {
      let O = new URL(t.url),
        A = O.pathname + O.search;
      throw Ur(404, { pathname: A });
    }
    Te(
      m !== void 0,
      "You defined " +
        (e === "action" ? "an action" : "a loader") +
        " for route " +
        ('"' +
          n.route.id +
          "\" but didn't return anything from your `" +
          e +
          "` ") +
        "function. Please return a value or `null`."
    );
  } catch (S) {
    (v = gt.error), (m = S);
  } finally {
    h && t.signal.removeEventListener("abort", h);
  }
  if (Fj(m)) {
    let S = m.status;
    if (Dw.has(S)) {
      let k = m.headers.get("Location");
      if (
        (Te(
          k,
          "Redirects returned/thrown from loaders/actions must have a Location header"
        ),
        !Cv.test(k))
      )
        k = Rp(new URL(t.url), o.slice(0, o.indexOf(n) + 1), l, !0, k);
      else if (!c) {
        let j = new URL(t.url),
          C = k.startsWith("//") ? new URL(j.protocol + k) : new URL(k),
          D = yi(C.pathname, l) != null;
        C.origin === j.origin && D && (k = C.pathname + C.search + C.hash);
      }
      if (c) throw (m.headers.set("Location", k), m);
      return {
        type: gt.redirect,
        status: S,
        location: k,
        revalidate: m.headers.get("X-Remix-Revalidate") !== null,
      };
    }
    if (f) throw { type: v || gt.data, response: m };
    let O,
      A = m.headers.get("Content-Type");
    return (
      A && /\bapplication\/json\b/.test(A)
        ? (O = await m.json())
        : (O = await m.text()),
      v === gt.error
        ? { type: v, error: new Nv(S, m.statusText, O), headers: m.headers }
        : { type: gt.data, data: O, statusCode: m.status, headers: m.headers }
    );
  }
  if (v === gt.error) return { type: v, error: m };
  if (Uj(m)) {
    var w, x;
    return {
      type: gt.deferred,
      deferredData: m,
      statusCode: (w = m.init) == null ? void 0 : w.status,
      headers:
        ((x = m.init) == null ? void 0 : x.headers) &&
        new Headers(m.init.headers),
    };
  }
  return { type: gt.data, data: m };
}
function Tu(e, t, n, o) {
  let a = e.createURL(Pw(t)).toString(),
    u = { signal: n };
  if (o && Un(o.formMethod)) {
    let { formMethod: l, formEncType: c, formData: f } = o;
    (u.method = l.toUpperCase()),
      (u.body = c === "application/x-www-form-urlencoded" ? Sw(f) : f);
  }
  return new Request(a, u);
}
function Sw(e) {
  let t = new URLSearchParams();
  for (let [n, o] of e.entries()) t.append(n, o instanceof File ? o.name : o);
  return t;
}
function Bj(e, t, n, o, a) {
  let u = {},
    l = null,
    c,
    f = !1,
    d = {};
  return (
    n.forEach((v, m) => {
      let h = t[m].route.id;
      if (
        (Te(!Sa(v), "Cannot handle redirect results in processLoaderData"),
        Ku(v))
      ) {
        let g = wa(e, h),
          w = v.error;
        o && ((w = Object.values(o)[0]), (o = void 0)),
          (l = l || {}),
          l[g.route.id] == null && (l[g.route.id] = w),
          (u[h] = void 0),
          f || ((f = !0), (c = Ow(v.error) ? v.error.status : 500)),
          v.headers && (d[h] = v.headers);
      } else
        ci(v)
          ? (a.set(h, v.deferredData), (u[h] = v.deferredData.data))
          : (u[h] = v.data),
          v.statusCode != null &&
            v.statusCode !== 200 &&
            !f &&
            (c = v.statusCode),
          v.headers && (d[h] = v.headers);
    }),
    o && ((l = o), (u[Object.keys(o)[0]] = void 0)),
    { loaderData: u, errors: l, statusCode: c || 200, loaderHeaders: d }
  );
}
function dy(e, t, n, o, a, u, l, c) {
  let { loaderData: f, errors: d } = Bj(t, n, o, a, c);
  for (let v = 0; v < u.length; v++) {
    let { key: m, match: h, controller: g } = u[v];
    Te(
      l !== void 0 && l[v] !== void 0,
      "Did not find corresponding fetcher result"
    );
    let w = l[v];
    if (!(g && g.signal.aborted))
      if (Ku(w)) {
        let x = wa(e.matches, h?.route.id);
        (d && d[x.route.id]) || (d = We({}, d, { [x.route.id]: w.error })),
          e.fetchers.delete(m);
      } else if (Sa(w)) Te(!1, "Unhandled fetcher revalidation redirect");
      else if (ci(w)) Te(!1, "Unhandled fetcher deferred data");
      else {
        let x = {
          state: "idle",
          data: w.data,
          formMethod: void 0,
          formAction: void 0,
          formEncType: void 0,
          formData: void 0,
          " _hasFetcherDoneAnything ": !0,
        };
        e.fetchers.set(m, x);
      }
  }
  return { loaderData: f, errors: d };
}
function py(e, t, n, o) {
  let a = We({}, t);
  for (let u of n) {
    let l = u.route.id;
    if (
      (t.hasOwnProperty(l)
        ? t[l] !== void 0 && (a[l] = t[l])
        : e[l] !== void 0 && u.route.loader && (a[l] = e[l]),
      o && o.hasOwnProperty(l))
    )
      break;
  }
  return a;
}
function wa(e, t) {
  return (
    (t ? e.slice(0, e.findIndex((n) => n.route.id === t) + 1) : [...e])
      .reverse()
      .find((n) => n.route.hasErrorBoundary === !0) || e[0]
  );
}
function vy(e) {
  let t = e.find((n) => n.index || !n.path || n.path === "/") || {
    id: "__shim-error-route__",
  };
  return {
    matches: [{ params: {}, pathname: "", pathnameBase: "", route: t }],
    route: t,
  };
}
function Ur(e, t) {
  let { pathname: n, routeId: o, method: a, type: u } = t === void 0 ? {} : t,
    l = "Unknown Server Error",
    c = "Unknown @remix-run/router error";
  return (
    e === 400
      ? ((l = "Bad Request"),
        a && n && o
          ? (c =
              "You made a " +
              a +
              ' request to "' +
              n +
              '" but ' +
              ('did not provide a `loader` for route "' + o + '", ') +
              "so there is no way to handle the request.")
          : u === "defer-action" && (c = "defer() is not supported in actions"))
      : e === 403
      ? ((l = "Forbidden"),
        (c = 'Route "' + o + '" does not match URL "' + n + '"'))
      : e === 404
      ? ((l = "Not Found"), (c = 'No route matches URL "' + n + '"'))
      : e === 405 &&
        ((l = "Method Not Allowed"),
        a && n && o
          ? (c =
              "You made a " +
              a.toUpperCase() +
              ' request to "' +
              n +
              '" but ' +
              ('did not provide an `action` for route "' + o + '", ') +
              "so there is no way to handle the request.")
          : a && (c = 'Invalid request method "' + a.toUpperCase() + '"')),
    new Nv(e || 500, l, new Error(c), !0)
  );
}
function hy(e) {
  for (let t = e.length - 1; t >= 0; t--) {
    let n = e[t];
    if (Sa(n)) return n;
  }
}
function Pw(e) {
  let t = typeof e == "string" ? _n(e) : e;
  return bi(We({}, t, { hash: "" }));
}
function Dj(e, t) {
  return (
    e.pathname === t.pathname && e.search === t.search && e.hash !== t.hash
  );
}
function ci(e) {
  return e.type === gt.deferred;
}
function Ku(e) {
  return e.type === gt.error;
}
function Sa(e) {
  return (e && e.type) === gt.redirect;
}
function Uj(e) {
  let t = e;
  return (
    t &&
    typeof t == "object" &&
    typeof t.data == "object" &&
    typeof t.subscribe == "function" &&
    typeof t.cancel == "function" &&
    typeof t.resolveData == "function"
  );
}
function Fj(e) {
  return (
    e != null &&
    typeof e.status == "number" &&
    typeof e.statusText == "string" &&
    typeof e.headers == "object" &&
    typeof e.body < "u"
  );
}
function $j(e) {
  return Bw.has(e.toLowerCase());
}
function Un(e) {
  return Lw.has(e.toLowerCase());
}
async function my(e, t, n, o, a, u) {
  for (let l = 0; l < n.length; l++) {
    let c = n[l],
      f = t[l];
    if (!f) continue;
    let d = e.find((m) => m.route.id === f.route.id),
      v = d != null && !xw(d, f) && (u && u[f.route.id]) !== void 0;
    if (ci(c) && (a || v)) {
      let m = o[l];
      Te(m, "Expected an AbortSignal for revalidating fetcher deferred result"),
        await Ew(c, m, a).then((h) => {
          h && (n[l] = h || n[l]);
        });
    }
  }
}
async function Ew(e, t, n) {
  if ((n === void 0 && (n = !1), !(await e.deferredData.resolveData(t)))) {
    if (n)
      try {
        return { type: gt.data, data: e.deferredData.unwrappedData };
      } catch (o) {
        return { type: gt.error, error: o };
      }
    return { type: gt.data, data: e.deferredData.data };
  }
}
function Mv(e) {
  return new URLSearchParams(e).getAll("index").some((t) => t === "");
}
function by(e, t) {
  let { route: n, pathname: o, params: a } = e;
  return { id: n.id, pathname: o, params: a, data: t[n.id], handle: n.handle };
}
function Lp(e, t) {
  let n = typeof t == "string" ? _n(t).search : t.search;
  if (e[e.length - 1].route.index && Mv(n || "")) return e[e.length - 1];
  let o = Rc(e);
  return o[o.length - 1];
}
var vt,
  gt,
  kw,
  jw,
  Aw,
  Iw,
  Tw,
  Mw,
  Nw,
  Bp,
  qr,
  Cw,
  zw,
  Rw,
  Nv,
  rp,
  Lw,
  yy,
  Bw,
  Dw,
  Uw,
  ec,
  Fw,
  Dp,
  Cv,
  Up,
  $w,
  Vw,
  Fp = J(() => {
    (function (e) {
      (e.Pop = "POP"), (e.Push = "PUSH"), (e.Replace = "REPLACE");
    })(vt || (vt = {})),
      (function (e) {
        (e.data = "data"),
          (e.deferred = "deferred"),
          (e.redirect = "redirect"),
          (e.error = "error");
      })(gt || (gt = {})),
      (kw = new Set([
        "lazy",
        "caseSensitive",
        "path",
        "id",
        "index",
        "children",
      ])),
      (jw = /^:\w+$/),
      (Aw = 3),
      (Iw = 2),
      (Tw = 1),
      (Mw = 10),
      (Nw = -2),
      (Bp = (e) => e === "*"),
      (qr = (e) => e.join("/").replace(/\/\/+/g, "/")),
      (Cw = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/")),
      (zw = (e) => (!e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e)),
      (Rw = (e) => (!e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e)),
      (Nv = class {
        constructor(e, t, n, o) {
          o === void 0 && (o = !1),
            (this.status = e),
            (this.statusText = t || ""),
            (this.internal = o),
            n instanceof Error
              ? ((this.data = n.toString()), (this.error = n))
              : (this.data = n);
        }
      }),
      (rp = ["post", "put", "patch", "delete"]),
      (Lw = new Set(rp)),
      (yy = ["get", ...rp]),
      (Bw = new Set(yy)),
      (Dw = new Set([301, 302, 303, 307, 308])),
      (Uw = new Set([307, 308])),
      (ec = {
        state: "idle",
        location: void 0,
        formMethod: void 0,
        formAction: void 0,
        formEncType: void 0,
        formData: void 0,
      }),
      (Fw = {
        state: "idle",
        data: void 0,
        formMethod: void 0,
        formAction: void 0,
        formEncType: void 0,
        formData: void 0,
      }),
      (Dp = {
        state: "unblocked",
        proceed: void 0,
        reset: void 0,
        location: void 0,
      }),
      (Cv = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i),
      (Up =
        typeof window < "u" &&
        typeof window.document < "u" &&
        typeof window.document.createElement < "u"),
      ($w = !Up),
      (Vw = (e) => ({ hasErrorBoundary: !!e.hasErrorBoundary }));
  });
function al() {
  return (
    (al = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var o in n)
              Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
          }
          return e;
        }),
    al.apply(this, arguments)
  );
}
function Vj(e, t) {
  let { relative: n } = t === void 0 ? {} : t;
  ml() || Te(!1);
  let { basename: o, navigator: a } = ie.useContext(gn),
    { hash: u, pathname: l, search: c } = bl(e, { relative: n }),
    f = l;
  return (
    o !== "/" && (f = l === "/" ? o : qr([o, l])),
    a.createHref({ pathname: f, search: c, hash: u })
  );
}
function ml() {
  return ie.useContext(yl) != null;
}
function Pi() {
  return ml() || Te(!1), ie.useContext(yl).location;
}
function Ww(e) {
  ie.useContext(gn).static || ie.useLayoutEffect(e);
}
function Lc() {
  return ie.useContext(Da) != null ? eA() : Wj();
}
function Wj() {
  ml() || Te(!1);
  let { basename: e, navigator: t } = ie.useContext(gn),
    { matches: n } = ie.useContext(wn),
    { pathname: o } = Pi(),
    a = JSON.stringify(Rc(n).map((l) => l.pathnameBase)),
    u = ie.useRef(!1);
  return (
    Ww(() => {
      u.current = !0;
    }),
    ie.useCallback(
      function (l, c) {
        if ((c === void 0 && (c = {}), !u.current)) return;
        if (typeof l == "number") {
          t.go(l);
          return;
        }
        let f = Tv(l, JSON.parse(a), o, c.relative === "path");
        e !== "/" &&
          (f.pathname = f.pathname === "/" ? e : qr([e, f.pathname])),
          (c.replace ? t.replace : t.push)(f, c.state, c);
      },
      [e, t, a, o]
    )
  );
}
function qj(e) {
  let t = ie.useContext(wn).outlet;
  return t && ie.createElement(Kw.Provider, { value: e }, t);
}
function Bc() {
  let { matches: e } = ie.useContext(wn),
    t = e[e.length - 1];
  return t ? t.params : {};
}
function bl(e, t) {
  let { relative: n } = t === void 0 ? {} : t,
    { matches: o } = ie.useContext(wn),
    { pathname: a } = Pi(),
    u = JSON.stringify(Rc(o).map((l) => l.pathnameBase));
  return ie.useMemo(() => Tv(e, JSON.parse(u), a, n === "path"), [e, u, a, n]);
}
function Kj(e, t, n) {
  ml() || Te(!1);
  let { navigator: o } = ie.useContext(gn),
    { matches: a } = ie.useContext(wn),
    u = a[a.length - 1],
    l = u ? u.params : {};
  u && u.pathname;
  let c = u ? u.pathnameBase : "/";
  u && u.route;
  let f = Pi(),
    d;
  if (t) {
    var v;
    let x = typeof t == "string" ? _n(t) : t;
    c === "/" || ((v = x.pathname) != null && v.startsWith(c)) || Te(!1),
      (d = x);
  } else d = f;
  let m = d.pathname || "/",
    h = c === "/" ? m : m.slice(c.length) || "/",
    g = ga(e, { pathname: h }),
    w = Qj(
      g &&
        g.map((x) =>
          Object.assign({}, x, {
            params: Object.assign({}, l, x.params),
            pathname: qr([
              c,
              o.encodeLocation
                ? o.encodeLocation(x.pathname).pathname
                : x.pathname,
            ]),
            pathnameBase:
              x.pathnameBase === "/"
                ? c
                : qr([
                    c,
                    o.encodeLocation
                      ? o.encodeLocation(x.pathnameBase).pathname
                      : x.pathnameBase,
                  ]),
          })
        ),
      a,
      n
    );
  return t && w
    ? ie.createElement(
        yl.Provider,
        {
          value: {
            location: al(
              {
                pathname: "/",
                search: "",
                hash: "",
                state: null,
                key: "default",
              },
              d
            ),
            navigationType: vt.Pop,
          },
        },
        w
      )
    : w;
}
function Hj() {
  let e = qw(),
    t = Ow(e)
      ? e.status + " " + e.statusText
      : e instanceof Error
      ? e.message
      : JSON.stringify(e),
    n = e instanceof Error ? e.stack : null,
    o = "rgba(200,200,200, 0.5)",
    a = { padding: "0.5rem", backgroundColor: o },
    u = null;
  return ie.createElement(
    ie.Fragment,
    null,
    ie.createElement("h2", null, "Unexpected Application Error!"),
    ie.createElement("h3", { style: { fontStyle: "italic" } }, t),
    n ? ie.createElement("pre", { style: a }, n) : null,
    u
  );
}
function Xj(e) {
  let { routeContext: t, match: n, children: o } = e,
    a = ie.useContext(Da);
  return (
    a &&
      a.static &&
      a.staticContext &&
      (n.route.errorElement || n.route.ErrorBoundary) &&
      (a.staticContext._deepestRenderedBoundaryId = n.route.id),
    ie.createElement(wn.Provider, { value: t }, o)
  );
}
function Qj(e, t, n) {
  var o;
  if ((t === void 0 && (t = []), n === void 0 && (n = null), e == null)) {
    var a;
    if ((a = n) != null && a.errors) e = n.matches;
    else return null;
  }
  let u = e,
    l = (o = n) == null ? void 0 : o.errors;
  if (l != null) {
    let c = u.findIndex((f) => f.route.id && l?.[f.route.id]);
    c >= 0 || Te(!1), (u = u.slice(0, Math.min(u.length, c + 1)));
  }
  return u.reduceRight((c, f, d) => {
    let v = f.route.id ? l?.[f.route.id] : null,
      m = null;
    n && (m = f.route.errorElement || Hw);
    let h = t.concat(u.slice(0, d + 1)),
      g = () => {
        let w;
        return (
          v ? (w = m) : f.route.element ? (w = f.route.element) : (w = c),
          ie.createElement(Xj, {
            match: f,
            routeContext: { outlet: c, matches: h },
            children: w,
          })
        );
      };
    return n && (f.route.ErrorBoundary || f.route.errorElement || d === 0)
      ? ie.createElement(Xw, {
          location: n.location,
          revalidation: n.revalidation,
          component: m,
          error: v,
          children: g(),
          routeContext: { outlet: null, matches: h },
        })
      : g();
  }, null);
}
function Yj(e) {
  let t = ie.useContext(Da);
  return t || Te(!1), t;
}
function Jj(e) {
  let t = ie.useContext(Dc);
  return t || Te(!1), t;
}
function Gj(e) {
  let t = ie.useContext(wn);
  return t || Te(!1), t;
}
function zv(e) {
  let t = Gj(),
    n = t.matches[t.matches.length - 1];
  return n.route.id || Te(!1), n.route.id;
}
function Zj() {
  return zv(Ma.UseRouteId);
}
function qw() {
  var e;
  let t = ie.useContext(Vp),
    n = Jj(Ma.UseRouteError),
    o = zv(Ma.UseRouteError);
  return t || ((e = n.errors) == null ? void 0 : e[o]);
}
function eA() {
  let { router: e } = Yj(Wp.UseNavigateStable),
    t = zv(Ma.UseNavigateStable),
    n = ie.useRef(!1);
  return (
    Ww(() => {
      n.current = !0;
    }),
    ie.useCallback(
      function (o, a) {
        a === void 0 && (a = {}),
          n.current &&
            (typeof o == "number"
              ? e.navigate(o)
              : e.navigate(o, al({ fromRouteId: t }, a)));
      },
      [e, t]
    )
  );
}
function tA(e) {
  let { fallbackElement: t, router: n } = e,
    [o, a] = ie.useState(n.state);
  ie.useLayoutEffect(() => n.subscribe(a), [n, a]);
  let u = ie.useMemo(
      () => ({
        createHref: n.createHref,
        encodeLocation: n.encodeLocation,
        go: (f) => n.navigate(f),
        push: (f, d, v) =>
          n.navigate(f, {
            state: d,
            preventScrollReset: v?.preventScrollReset,
          }),
        replace: (f, d, v) =>
          n.navigate(f, {
            replace: !0,
            state: d,
            preventScrollReset: v?.preventScrollReset,
          }),
      }),
      [n]
    ),
    l = n.basename || "/",
    c = ie.useMemo(
      () => ({ router: n, navigator: u, static: !1, basename: l }),
      [n, u, l]
    );
  return ie.createElement(
    ie.Fragment,
    null,
    ie.createElement(
      Da.Provider,
      { value: c },
      ie.createElement(
        Dc.Provider,
        { value: o },
        ie.createElement(
          nA,
          {
            basename: n.basename,
            location: n.state.location,
            navigationType: n.state.historyAction,
            navigator: u,
          },
          n.state.initialized
            ? ie.createElement(rA, { routes: n.routes, state: o })
            : t
        )
      )
    ),
    null
  );
}
function rA(e) {
  let { routes: t, state: n } = e;
  return Kj(t, void 0, n);
}
function Rv(e) {
  return qj(e.context);
}
function Bn(e) {
  Te(!1);
}
function nA(e) {
  let {
    basename: t = "/",
    children: n = null,
    location: o,
    navigationType: a = vt.Pop,
    navigator: u,
    static: l = !1,
  } = e;
  ml() && Te(!1);
  let c = t.replace(/^\/*/, "/"),
    f = ie.useMemo(() => ({ basename: c, navigator: u, static: l }), [c, u, l]);
  typeof o == "string" && (o = _n(o));
  let {
      pathname: d = "/",
      search: v = "",
      hash: m = "",
      state: h = null,
      key: g = "default",
    } = o,
    w = ie.useMemo(() => {
      let x = yi(d, c);
      return x == null
        ? null
        : {
            location: { pathname: x, search: v, hash: m, state: h, key: g },
            navigationType: a,
          };
    }, [c, d, v, m, h, g, a]);
  return w == null
    ? null
    : ie.createElement(
        gn.Provider,
        { value: f },
        ie.createElement(yl.Provider, { children: n, value: w })
      );
}
function $p(e, t) {
  t === void 0 && (t = []);
  let n = [];
  return (
    ie.Children.forEach(e, (o, a) => {
      if (!ie.isValidElement(o)) return;
      let u = [...t, a];
      if (o.type === ie.Fragment) {
        n.push.apply(n, $p(o.props.children, u));
        return;
      }
      o.type !== Bn && Te(!1), !o.props.index || !o.props.children || Te(!1);
      let l = {
        id: o.props.id || u.join("-"),
        caseSensitive: o.props.caseSensitive,
        element: o.props.element,
        Component: o.props.Component,
        index: o.props.index,
        path: o.props.path,
        loader: o.props.loader,
        action: o.props.action,
        errorElement: o.props.errorElement,
        ErrorBoundary: o.props.ErrorBoundary,
        hasErrorBoundary:
          o.props.ErrorBoundary != null || o.props.errorElement != null,
        shouldRevalidate: o.props.shouldRevalidate,
        handle: o.props.handle,
        lazy: o.props.lazy,
      };
      o.props.children && (l.children = $p(o.props.children, u)), n.push(l);
    }),
    n
  );
}
function oA(e) {
  let t = {
    hasErrorBoundary: e.ErrorBoundary != null || e.errorElement != null,
  };
  return (
    e.Component &&
      Object.assign(t, {
        element: ie.createElement(e.Component),
        Component: void 0,
      }),
    e.ErrorBoundary &&
      Object.assign(t, {
        errorElement: ie.createElement(e.ErrorBoundary),
        ErrorBoundary: void 0,
      }),
    t
  );
}
function iA(e, t) {
  return Cj({
    basename: t?.basename,
    future: al({}, t?.future, { v7_prependBasename: !0 }),
    history: _j({
      initialEntries: t?.initialEntries,
      initialIndex: t?.initialIndex,
    }),
    hydrationData: t?.hydrationData,
    routes: e,
    mapRouteProperties: oA,
  }).initialize();
}
var ie,
  Da,
  Dc,
  gn,
  yl,
  wn,
  Vp,
  Kw,
  Hw,
  Xw,
  Wp,
  Ma,
  gy,
  wy = J(() => {
    (ie = be(st())),
      Fp(),
      Fp(),
      (Da = ie.createContext(null)),
      (Dc = ie.createContext(null)),
      ie.createContext(null),
      (gn = ie.createContext(null)),
      (yl = ie.createContext(null)),
      (wn = ie.createContext({ outlet: null, matches: [] })),
      (Vp = ie.createContext(null)),
      (Kw = ie.createContext(null)),
      (Hw = ie.createElement(Hj, null)),
      (Xw = class extends ie.Component {
        constructor(e) {
          super(e),
            (this.state = {
              location: e.location,
              revalidation: e.revalidation,
              error: e.error,
            });
        }
        static getDerivedStateFromError(e) {
          return { error: e };
        }
        static getDerivedStateFromProps(e, t) {
          return t.location !== e.location ||
            (t.revalidation !== "idle" && e.revalidation === "idle")
            ? {
                error: e.error,
                location: e.location,
                revalidation: e.revalidation,
              }
            : {
                error: e.error || t.error,
                location: t.location,
                revalidation: e.revalidation || t.revalidation,
              };
        }
        componentDidCatch(e, t) {
          console.error(
            "React Router caught the following error during render",
            e,
            t
          );
        }
        render() {
          return this.state.error
            ? ie.createElement(
                wn.Provider,
                { value: this.props.routeContext },
                ie.createElement(Vp.Provider, {
                  value: this.state.error,
                  children: this.props.component,
                })
              )
            : this.props.children;
        }
      }),
      (function (e) {
        (e.UseBlocker = "useBlocker"),
          (e.UseRevalidator = "useRevalidator"),
          (e.UseNavigateStable = "useNavigate");
      })(Wp || (Wp = {})),
      (function (e) {
        (e.UseBlocker = "useBlocker"),
          (e.UseLoaderData = "useLoaderData"),
          (e.UseActionData = "useActionData"),
          (e.UseRouteError = "useRouteError"),
          (e.UseNavigation = "useNavigation"),
          (e.UseRouteLoaderData = "useRouteLoaderData"),
          (e.UseMatches = "useMatches"),
          (e.UseRevalidator = "useRevalidator"),
          (e.UseNavigateStable = "useNavigate"),
          (e.UseRouteId = "useRouteId");
      })(Ma || (Ma = {})),
      (function (e) {
        (e[(e.pending = 0)] = "pending"),
          (e[(e.success = 1)] = "success"),
          (e[(e.error = 2)] = "error");
      })(gy || (gy = {})),
      new Promise(() => {});
  });
function ko() {
  return (
    (ko = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var o in n)
              Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
          }
          return e;
        }),
    ko.apply(this, arguments)
  );
}
function np(e, t) {
  if (e == null) return {};
  var n = {},
    o = Object.keys(e),
    a,
    u;
  for (u = 0; u < o.length; u++)
    (a = o[u]), !(t.indexOf(a) >= 0) && (n[a] = e[a]);
  return n;
}
function Uc(e) {
  return e != null && typeof e.tagName == "string";
}
function aA(e) {
  return Uc(e) && e.tagName.toLowerCase() === "button";
}
function uA(e) {
  return Uc(e) && e.tagName.toLowerCase() === "form";
}
function lA(e) {
  return Uc(e) && e.tagName.toLowerCase() === "input";
}
function sA(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function cA(e, t) {
  return e.button === 0 && (!t || t === "_self") && !sA(e);
}
function fA(e, t, n) {
  let o,
    a = null,
    u,
    l;
  if (uA(e)) {
    let c = t.submissionTrigger;
    if (t.action) a = t.action;
    else {
      let f = e.getAttribute("action");
      a = f ? yi(f, n) : null;
    }
    (o = t.method || e.getAttribute("method") || Hu),
      (u = t.encType || e.getAttribute("enctype") || tc),
      (l = new FormData(e)),
      c && c.name && l.append(c.name, c.value);
  } else if (aA(e) || (lA(e) && (e.type === "submit" || e.type === "image"))) {
    let c = e.form;
    if (c == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    if (t.action) a = t.action;
    else {
      let f = e.getAttribute("formaction") || c.getAttribute("action");
      a = f ? yi(f, n) : null;
    }
    (o =
      t.method ||
      e.getAttribute("formmethod") ||
      c.getAttribute("method") ||
      Hu),
      (u =
        t.encType ||
        e.getAttribute("formenctype") ||
        c.getAttribute("enctype") ||
        tc),
      (l = new FormData(c)),
      e.name && l.append(e.name, e.value);
  } else {
    if (Uc(e))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    if (
      ((o = t.method || Hu),
      (a = t.action || null),
      (u = t.encType || tc),
      e instanceof FormData)
    )
      l = e;
    else if (((l = new FormData()), e instanceof URLSearchParams))
      for (let [c, f] of e) l.append(c, f);
    else if (e != null) for (let c of Object.keys(e)) l.append(c, e[c]);
  }
  return { action: a, method: o.toLowerCase(), encType: u, formData: l };
}
function dA(e) {
  let t = kt.useContext(Da);
  return t || Te(!1), t;
}
function pA(e, t) {
  let {
      target: n,
      replace: o,
      state: a,
      preventScrollReset: u,
      relative: l,
    } = t === void 0 ? {} : t,
    c = Lc(),
    f = Pi(),
    d = bl(e, { relative: l });
  return kt.useCallback(
    (v) => {
      if (cA(v, n)) {
        v.preventDefault();
        let m = o !== void 0 ? o : bi(f) === bi(d);
        c(e, { replace: m, state: a, preventScrollReset: u, relative: l });
      }
    },
    [f, c, d, o, a, n, e, u, l]
  );
}
function vA(e, t) {
  let { router: n } = dA(qp.UseSubmitImpl),
    { basename: o } = kt.useContext(gn),
    a = Zj();
  return kt.useCallback(
    function (u, l) {
      if ((l === void 0 && (l = {}), typeof document > "u"))
        throw new Error(
          "You are calling submit during the server render. Try calling submit within a `useEffect` or callback instead."
        );
      let { action: c, method: f, encType: d, formData: v } = fA(u, l, o),
        m = {
          preventScrollReset: l.preventScrollReset,
          formData: v,
          formMethod: f,
          formEncType: d,
        };
      e
        ? (t == null && Te(!1), n.fetch(e, t, c, m))
        : n.navigate(c, ko({}, m, { replace: l.replace, fromRouteId: a }));
    },
    [n, o, e, t, a]
  );
}
function hA(e, t) {
  let { relative: n } = t === void 0 ? {} : t,
    { basename: o } = kt.useContext(gn),
    a = kt.useContext(wn);
  a || Te(!1);
  let [u] = a.matches.slice(-1),
    l = ko({}, bl(e || ".", { relative: n })),
    c = Pi();
  if (e == null && ((l.search = c.search), (l.hash = c.hash), u.route.index)) {
    let f = new URLSearchParams(l.search);
    f.delete("index"), (l.search = f.toString() ? "?" + f.toString() : "");
  }
  return (
    (!e || e === ".") &&
      u.route.index &&
      (l.search = l.search ? l.search.replace(/^\?/, "?index&") : "?index"),
    o !== "/" && (l.pathname = l.pathname === "/" ? o : qr([o, l.pathname])),
    bi(l)
  );
}
var kt,
  Hu,
  tc,
  _y,
  Oy,
  xy,
  Sy,
  Py,
  Ey,
  ky,
  qp,
  jy,
  Xn = J(() => {
    (kt = be(st())),
      wy(),
      wy(),
      Fp(),
      (Hu = "get"),
      (tc = "application/x-www-form-urlencoded"),
      (_y = [
        "onClick",
        "relative",
        "reloadDocument",
        "replace",
        "state",
        "target",
        "to",
        "preventScrollReset",
      ]),
      (Oy = [
        "aria-current",
        "caseSensitive",
        "className",
        "end",
        "style",
        "to",
        "children",
      ]),
      (xy = [
        "reloadDocument",
        "replace",
        "method",
        "action",
        "onSubmit",
        "fetcherKey",
        "routeId",
        "relative",
        "preventScrollReset",
      ]),
      (Sy =
        typeof window < "u" &&
        typeof window.document < "u" &&
        typeof window.document.createElement < "u"),
      (Py = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i),
      (Ey = kt.forwardRef(function (e, t) {
        let {
            onClick: n,
            relative: o,
            reloadDocument: a,
            replace: u,
            state: l,
            target: c,
            to: f,
            preventScrollReset: d,
          } = e,
          v = np(e, _y),
          { basename: m } = kt.useContext(gn),
          h,
          g = !1;
        if (typeof f == "string" && Py.test(f) && ((h = f), Sy))
          try {
            let O = new URL(window.location.href),
              A = f.startsWith("//") ? new URL(O.protocol + f) : new URL(f),
              k = yi(A.pathname, m);
            A.origin === O.origin && k != null
              ? (f = k + A.search + A.hash)
              : (g = !0);
          } catch {}
        let w = Vj(f, { relative: o }),
          x = pA(f, {
            replace: u,
            state: l,
            target: c,
            preventScrollReset: d,
            relative: o,
          });
        function S(O) {
          n && n(O), O.defaultPrevented || x(O);
        }
        return kt.createElement(
          "a",
          ko({}, v, {
            href: h || w,
            onClick: g || a ? n : S,
            ref: t,
            target: c,
          })
        );
      })),
      kt.forwardRef(function (e, t) {
        let {
            "aria-current": n = "page",
            caseSensitive: o = !1,
            className: a = "",
            end: u = !1,
            style: l,
            to: c,
            children: f,
          } = e,
          d = np(e, Oy),
          v = bl(c, { relative: d.relative }),
          m = Pi(),
          h = kt.useContext(Dc),
          { navigator: g } = kt.useContext(gn),
          w = g.encodeLocation ? g.encodeLocation(v).pathname : v.pathname,
          x = m.pathname,
          S =
            h && h.navigation && h.navigation.location
              ? h.navigation.location.pathname
              : null;
        o ||
          ((x = x.toLowerCase()),
          (S = S ? S.toLowerCase() : null),
          (w = w.toLowerCase()));
        let O =
            x === w || (!u && x.startsWith(w) && x.charAt(w.length) === "/"),
          A =
            S != null &&
            (S === w || (!u && S.startsWith(w) && S.charAt(w.length) === "/")),
          k = O ? n : void 0,
          j;
        typeof a == "function"
          ? (j = a({ isActive: O, isPending: A }))
          : (j = [a, O ? "active" : null, A ? "pending" : null]
              .filter(Boolean)
              .join(" "));
        let C = typeof l == "function" ? l({ isActive: O, isPending: A }) : l;
        return kt.createElement(
          Ey,
          ko({}, d, {
            "aria-current": k,
            className: j,
            ref: t,
            style: C,
            to: c,
          }),
          typeof f == "function" ? f({ isActive: O, isPending: A }) : f
        );
      }),
      kt.forwardRef((e, t) => kt.createElement(ky, ko({}, e, { ref: t }))),
      (ky = kt.forwardRef((e, t) => {
        let {
            reloadDocument: n,
            replace: o,
            method: a = Hu,
            action: u,
            onSubmit: l,
            fetcherKey: c,
            routeId: f,
            relative: d,
            preventScrollReset: v,
          } = e,
          m = np(e, xy),
          h = vA(c, f),
          g = a.toLowerCase() === "get" ? "get" : "post",
          w = hA(u, { relative: d });
        return kt.createElement(
          "form",
          ko(
            {
              ref: t,
              method: g,
              action: w,
              onSubmit: n
                ? l
                : (x) => {
                    if ((l && l(x), x.defaultPrevented)) return;
                    x.preventDefault();
                    let S = x.nativeEvent.submitter,
                      O = S?.getAttribute("formmethod") || a;
                    h(S || x.currentTarget, {
                      method: O,
                      replace: o,
                      relative: d,
                      preventScrollReset: v,
                    });
                  },
            },
            m
          )
        );
      })),
      (function (e) {
        (e.UseScrollRestoration = "useScrollRestoration"),
          (e.UseSubmitImpl = "useSubmitImpl"),
          (e.UseFetcher = "useFetcher");
      })(qp || (qp = {})),
      (function (e) {
        (e.UseFetchers = "useFetchers"),
          (e.UseScrollRestoration = "useScrollRestoration");
      })(jy || (jy = {}));
  });
function $r({ to: e, className: t, type: n, onClick: o, ...a }) {
  let u = Lc(),
    l = bl(e),
    c = Pi(),
    f = l.pathname,
    d = c.pathname,
    v = d === f || (d.startsWith(f) && d.charAt(f.length) === "/");
  return (0, Qw.jsx)("button", {
    type: n || "button",
    className: typeof t == "function" ? t({ isActive: v }) : t,
    onClick: (m) => {
      u(e), o?.(m);
    },
    ...a,
  });
}
var Qw,
  Ei = J(() => {
    Xn(), (Qw = be(qe(), 1));
  }),
  Yw = {};
aw(Yw, { DevToolsProvider: () => Jw, useDevToolsContext: () => qt });
var wo,
  Ay,
  Hs,
  Jw,
  qt,
  rr = J(() => {
    (wo = be(st(), 1)),
      (Ay = be(qe(), 1)),
      (Hs = (0, wo.createContext)(null)),
      (Jw = ({ children: e, value: t }) => {
        if ((0, wo.useContext)(Hs))
          throw new Error("DevToolsProvider can only be used once");
        let [n, o] = (0, wo.useState)([]);
        (0, wo.useEffect)(() => {
          let l = t.write$.subscribe((c) => {
            o((f) => [...f, c]);
          });
          return () => l.unsubscribe();
        }, [t.write$]);
        let [a, u] = (0, wo.useState)([]);
        return (
          (0, wo.useEffect)(() => {
            let l = t.storedBlockLogs$.subscribe(({ logs: c }) => {
              u((f) => [...f, ...c]);
            });
            return () => l.unsubscribe();
          }, [t.storedBlockLogs$]),
          (0, Ay.jsx)(Hs.Provider, {
            value: { ...t, writes: n, storedLogs: a },
            children: e,
          })
        );
      }),
      (qt = () => {
        let e = (0, wo.useContext)(Hs);
        if (!e) throw new Error("Must be used within a DevToolsProvider");
        return e;
      });
  });
function mA() {
  let { recsWorld: e, useStore: t } = qt();
  return (0, Dr.jsxs)(Dr.Fragment, {
    children: [
      (0, Dr.jsxs)("div", {
        className: "flex-none bg-slate-900 text-white/60 font-medium",
        children: [
          (0, Dr.jsx)($r, {
            to: "/",
            className: ({ isActive: n }) =>
              tr(
                "py-1.5 px-3",
                n
                  ? "bg-slate-800 text-white"
                  : "hover:bg-blue-800 hover:text-white"
              ),
            children: "Summary",
          }),
          (0, Dr.jsx)($r, {
            to: "/actions",
            className: ({ isActive: n }) =>
              tr(
                "py-1.5 px-3",
                n
                  ? "bg-slate-800 text-white"
                  : "hover:bg-blue-800 hover:text-white"
              ),
            children: "Actions",
          }),
          (0, Dr.jsx)($r, {
            to: "/events",
            className: ({ isActive: n }) =>
              tr(
                "py-1.5 px-3",
                n
                  ? "bg-slate-800 text-white"
                  : "hover:bg-blue-800 hover:text-white"
              ),
            children: "Store log",
          }),
          t
            ? (0, Dr.jsx)($r, {
                to: "/tables",
                className: ({ isActive: n }) =>
                  tr(
                    "py-1.5 px-3",
                    n
                      ? "bg-slate-800 text-white"
                      : "hover:bg-blue-800 hover:text-white"
                  ),
                children: "Tables",
              })
            : null,
          e
            ? (0, Dr.jsx)($r, {
                to: "/components",
                className: ({ isActive: n }) =>
                  tr(
                    "py-1.5 px-3",
                    n
                      ? "bg-slate-800 text-white"
                      : "hover:bg-blue-800 hover:text-white"
                  ),
                children: "Components",
              })
            : null,
        ],
      }),
      (0, Dr.jsx)("div", {
        className: "flex-1 overflow-auto",
        children: (0, Dr.jsx)(Rv, {}),
      }),
    ],
  });
}
var Dr,
  bA = J(() => {
    Ba(), Xn(), Ei(), rr(), (Dr = be(qe(), 1));
  });
function Gw({ error: e }) {
  return (0, Zw.jsx)("div", {
    className:
      "font-mono text-xs whitespace-pre overflow-auto bg-red-900/50 text-white p-4 rounded",
    children: e instanceof Error ? e.stack : String(e),
  });
}
var Zw,
  e_ = J(() => {
    Zw = be(qe(), 1);
  });
function yA() {
  let e = qw();
  return (0, Nu.jsxs)("div", {
    className: "p-6 space-y-6",
    children: [
      (0, Nu.jsxs)("p", {
        children: [
          "Whoops, something broke! Please",
          " ",
          (0, Nu.jsx)("a", {
            href: `https://github.com/latticexyz/mud/issues/new?${new URLSearchParams(
              {
                body: `
**Steps to reproduce**

1. Go to …
2. Click on …
3. Scroll down to …
4. See error

**Expected behavior**

A clear and concise description of what you expected to happen.

**Error**
\`\`\`
${e instanceof Error ? e.stack : String(e)}
\`\`\`
`,
              }
            )}`,
            target: "_blank",
            className: "text-white underline",
            children: "report the issue",
          }),
          " ",
          "so we can look into it.",
        ],
      }),
      (0, Nu.jsx)(Gw, { error: e }),
    ],
  });
}
var Nu,
  gA = J(() => {
    Xn(), e_(), (Nu = be(qe(), 1));
  });
function wA({ type: e }) {
  switch (e) {
    case "Store_SetRecord":
      return (0, rc.jsx)("span", {
        className: "text-green-500 font-bold",
        children: "=",
      });
    case "Store_SpliceStaticData":
    case "Store_SpliceDynamicData":
      return (0, rc.jsx)("span", {
        className: "text-cyan-500 font-bold",
        children: "+",
      });
    case "Store_DeleteRecord":
      return (0, rc.jsx)("span", {
        className: "text-red-500 font-bold",
        children: "-",
      });
    default:
      return Bx(e, `Unexpected event type: ${e}`);
  }
}
var rc,
  _A = J(() => {
    rc = be(qe(), 1);
  });
function t_({ logs: e }) {
  return (0, Nt.jsxs)("table", {
    className: "w-full table-fixed -mx-1",
    children: [
      (0, Nt.jsx)("thead", {
        className: "sticky top-0 z-10 bg-slate-800 text-amber-200/80 text-left",
        children: (0, Nt.jsxs)("tr", {
          children: [
            (0, Nt.jsx)("th", {
              className:
                "px-1 pt-1.5 pb-0.5 font-semibold uppercase text-xs w-2/12",
              children: "block",
            }),
            (0, Nt.jsx)("th", {
              className:
                "px-1 pt-1.5 pb-0.5 font-semibold uppercase text-xs w-2/12",
              children: "table",
            }),
            (0, Nt.jsx)("th", {
              className:
                "px-1 pt-1.5 pb-0.5 font-semibold uppercase text-xs w-2/12",
              children: "key",
            }),
            (0, Nt.jsx)("th", {
              className:
                "px-1 pt-1.5 pb-0.5 font-semibold uppercase text-xs w-[1em]",
            }),
            (0, Nt.jsx)("th", {
              className: "px-1 pt-1.5 pb-0.5 font-semibold uppercase text-xs",
              children: "value",
            }),
          ],
        }),
      }),
      (0, Nt.jsx)("tbody", {
        className: "font-mono text-xs",
        children: e.map((t) => {
          let { namespace: n, name: o } = Yy(t.args.tableId);
          return (0, Nt.jsxs)(
            "tr",
            {
              className: "hover:bg-blue-800",
              children: [
                (0, Nt.jsx)("td", {
                  className:
                    "px-1 whitespace-nowrap overflow-hidden text-ellipsis text-white/40",
                  children: t.blockNumber?.toString(),
                }),
                (0, Nt.jsxs)("td", {
                  className:
                    "px-1 whitespace-nowrap overflow-hidden text-ellipsis",
                  children: [n, ":", o],
                }),
                (0, Nt.jsx)("td", {
                  className:
                    "px-1 whitespace-nowrap overflow-hidden text-ellipsis",
                  children: t.args.keyTuple.join(","),
                }),
                (0, Nt.jsx)("td", {
                  className: "px-1 whitespace-nowrap",
                  children: (0, Nt.jsx)(wA, { type: t.eventName }),
                }),
                (0, Nt.jsxs)("td", {
                  className:
                    "px-1 whitespace-nowrap overflow-hidden text-ellipsis",
                  children: [
                    t.eventName === "Store_SetRecord"
                      ? JSON.stringify({
                          staticData: t.args.staticData,
                          encodedLengths: t.args.encodedLengths,
                          dynamicData: t.args.dynamicData,
                        })
                      : null,
                    t.eventName === "Store_SpliceStaticData"
                      ? JSON.stringify({
                          start: t.args.start,
                          data: t.args.data,
                        })
                      : null,
                    t.eventName === "Store_SpliceDynamicData"
                      ? JSON.stringify({
                          start: t.args.start,
                          deleteCount: t.args.deleteCount,
                          encodedLengths: t.args.encodedLengths,
                          data: t.args.data,
                        })
                      : null,
                  ],
                }),
              ],
            },
            t.blockHash != null && t.logIndex != null
              ? `${t.blockHash}:${t.logIndex}`
              : `${n}:${o}:${t.args.keyTuple.join(",")}`
          );
        }),
      }),
    ],
  });
}
var Nt,
  r_ = J(() => {
    _A(), (Nt = be(qe(), 1));
  });
function OA() {
  let { storedLogs: e } = qt(),
    t = (0, Cu.useRef)(null),
    n = (0, Cu.useRef)(!1),
    o = (0, Cu.useRef)("auto");
  return (
    (0, Cu.useEffect)(() => {
      n.current ||
        t.current?.scrollIntoView({ behavior: o.current, block: "end" }),
        (o.current = "smooth");
    }, [e]),
    (0, Kp.jsx)("div", {
      ref: t,
      className: "px-2 pb-1",
      onMouseEnter: () => {
        n.current = !0;
      },
      onMouseLeave: () => {
        n.current = !1;
      },
      children: (0, Kp.jsx)(t_, { logs: e }),
    })
  );
}
var Cu,
  Kp,
  xA = J(() => {
    (Cu = be(st(), 1)), rr(), r_(), (Kp = be(qe(), 1));
  }),
  Iy = E((e, t) => {
    t.exports = function n(o, a) {
      if (o === a) return !0;
      if (o && a && typeof o == "object" && typeof a == "object") {
        if (o.constructor !== a.constructor) return !1;
        var u, l, c;
        if (Array.isArray(o)) {
          if (((u = o.length), u != a.length)) return !1;
          for (l = u; l-- !== 0; ) if (!n(o[l], a[l])) return !1;
          return !0;
        }
        if (o.constructor === RegExp)
          return o.source === a.source && o.flags === a.flags;
        if (o.valueOf !== Object.prototype.valueOf)
          return o.valueOf() === a.valueOf();
        if (o.toString !== Object.prototype.toString)
          return o.toString() === a.toString();
        if (((c = Object.keys(o)), (u = c.length), u !== Object.keys(a).length))
          return !1;
        for (l = u; l-- !== 0; )
          if (!Object.prototype.hasOwnProperty.call(a, c[l])) return !1;
        for (l = u; l-- !== 0; ) {
          var f = c[l];
          if (!n(o[f], a[f])) return !1;
        }
        return !0;
      }
      return o !== o && a !== a;
    };
  }),
  Ke = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.isFunction = void 0);
    function t(n) {
      return typeof n == "function";
    }
    e.isFunction = t;
  }),
  ki = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.createErrorClass = void 0);
    function t(n) {
      var o = function (u) {
          Error.call(u), (u.stack = new Error().stack);
        },
        a = n(o);
      return (
        (a.prototype = Object.create(Error.prototype)),
        (a.prototype.constructor = a),
        a
      );
    }
    e.createErrorClass = t;
  }),
  n_ = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.UnsubscriptionError = void 0);
    var t = ki();
    e.UnsubscriptionError = t.createErrorClass(function (n) {
      return function (o) {
        n(this),
          (this.message = o
            ? o.length +
              ` errors occurred during unsubscription:
` +
              o.map(function (a, u) {
                return u + 1 + ") " + a.toString();
              }).join(`
  `)
            : ""),
          (this.name = "UnsubscriptionError"),
          (this.errors = o);
      };
    });
  }),
  Co = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.arrRemove = void 0);
    function t(n, o) {
      if (n) {
        var a = n.indexOf(o);
        0 <= a && n.splice(a, 1);
      }
    }
    e.arrRemove = t;
  }),
  fr = E((e) => {
    var t =
        (e && e.__values) ||
        function (v) {
          var m = typeof Symbol == "function" && Symbol.iterator,
            h = m && v[m],
            g = 0;
          if (h) return h.call(v);
          if (v && typeof v.length == "number")
            return {
              next: function () {
                return (
                  v && g >= v.length && (v = void 0),
                  { value: v && v[g++], done: !v }
                );
              },
            };
          throw new TypeError(
            m ? "Object is not iterable." : "Symbol.iterator is not defined."
          );
        },
      n =
        (e && e.__read) ||
        function (v, m) {
          var h = typeof Symbol == "function" && v[Symbol.iterator];
          if (!h) return v;
          var g = h.call(v),
            w,
            x = [],
            S;
          try {
            for (; (m === void 0 || m-- > 0) && !(w = g.next()).done; )
              x.push(w.value);
          } catch (O) {
            S = { error: O };
          } finally {
            try {
              w && !w.done && (h = g.return) && h.call(g);
            } finally {
              if (S) throw S.error;
            }
          }
          return x;
        },
      o =
        (e && e.__spreadArray) ||
        function (v, m) {
          for (var h = 0, g = m.length, w = v.length; h < g; h++, w++)
            v[w] = m[h];
          return v;
        };
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.isSubscription = e.EMPTY_SUBSCRIPTION = e.Subscription = void 0);
    var a = Ke(),
      u = n_(),
      l = Co(),
      c = (function () {
        function v(m) {
          (this.initialTeardown = m),
            (this.closed = !1),
            (this._parentage = null),
            (this._finalizers = null);
        }
        return (
          (v.prototype.unsubscribe = function () {
            var m, h, g, w, x;
            if (!this.closed) {
              this.closed = !0;
              var S = this._parentage;
              if (S)
                if (((this._parentage = null), Array.isArray(S)))
                  try {
                    for (var O = t(S), A = O.next(); !A.done; A = O.next()) {
                      var k = A.value;
                      k.remove(this);
                    }
                  } catch (F) {
                    m = { error: F };
                  } finally {
                    try {
                      A && !A.done && (h = O.return) && h.call(O);
                    } finally {
                      if (m) throw m.error;
                    }
                  }
                else S.remove(this);
              var j = this.initialTeardown;
              if (a.isFunction(j))
                try {
                  j();
                } catch (F) {
                  x = F instanceof u.UnsubscriptionError ? F.errors : [F];
                }
              var C = this._finalizers;
              if (C) {
                this._finalizers = null;
                try {
                  for (var D = t(C), W = D.next(); !W.done; W = D.next()) {
                    var $ = W.value;
                    try {
                      d($);
                    } catch (F) {
                      (x = x ?? []),
                        F instanceof u.UnsubscriptionError
                          ? (x = o(o([], n(x)), n(F.errors)))
                          : x.push(F);
                    }
                  }
                } catch (F) {
                  g = { error: F };
                } finally {
                  try {
                    W && !W.done && (w = D.return) && w.call(D);
                  } finally {
                    if (g) throw g.error;
                  }
                }
              }
              if (x) throw new u.UnsubscriptionError(x);
            }
          }),
          (v.prototype.add = function (m) {
            var h;
            if (m && m !== this)
              if (this.closed) d(m);
              else {
                if (m instanceof v) {
                  if (m.closed || m._hasParent(this)) return;
                  m._addParent(this);
                }
                (this._finalizers =
                  (h = this._finalizers) !== null && h !== void 0
                    ? h
                    : []).push(m);
              }
          }),
          (v.prototype._hasParent = function (m) {
            var h = this._parentage;
            return h === m || (Array.isArray(h) && h.includes(m));
          }),
          (v.prototype._addParent = function (m) {
            var h = this._parentage;
            this._parentage = Array.isArray(h)
              ? (h.push(m), h)
              : h
              ? [h, m]
              : m;
          }),
          (v.prototype._removeParent = function (m) {
            var h = this._parentage;
            h === m
              ? (this._parentage = null)
              : Array.isArray(h) && l.arrRemove(h, m);
          }),
          (v.prototype.remove = function (m) {
            var h = this._finalizers;
            h && l.arrRemove(h, m), m instanceof v && m._removeParent(this);
          }),
          (v.EMPTY = (function () {
            var m = new v();
            return (m.closed = !0), m;
          })()),
          v
        );
      })();
    (e.Subscription = c), (e.EMPTY_SUBSCRIPTION = c.EMPTY);
    function f(v) {
      return (
        v instanceof c ||
        (v &&
          "closed" in v &&
          a.isFunction(v.remove) &&
          a.isFunction(v.add) &&
          a.isFunction(v.unsubscribe))
      );
    }
    e.isSubscription = f;
    function d(v) {
      a.isFunction(v) ? v() : v.unsubscribe();
    }
  }),
  gl = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.config = void 0),
      (e.config = {
        onUnhandledError: null,
        onStoppedNotification: null,
        Promise: void 0,
        useDeprecatedSynchronousErrorHandling: !1,
        useDeprecatedNextContext: !1,
      });
  }),
  o_ = E((e) => {
    var t =
        (e && e.__read) ||
        function (o, a) {
          var u = typeof Symbol == "function" && o[Symbol.iterator];
          if (!u) return o;
          var l = u.call(o),
            c,
            f = [],
            d;
          try {
            for (; (a === void 0 || a-- > 0) && !(c = l.next()).done; )
              f.push(c.value);
          } catch (v) {
            d = { error: v };
          } finally {
            try {
              c && !c.done && (u = l.return) && u.call(l);
            } finally {
              if (d) throw d.error;
            }
          }
          return f;
        },
      n =
        (e && e.__spreadArray) ||
        function (o, a) {
          for (var u = 0, l = a.length, c = o.length; u < l; u++, c++)
            o[c] = a[u];
          return o;
        };
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.timeoutProvider = void 0),
      (e.timeoutProvider = {
        setTimeout: function (o, a) {
          for (var u = [], l = 2; l < arguments.length; l++)
            u[l - 2] = arguments[l];
          var c = e.timeoutProvider.delegate;
          return c?.setTimeout
            ? c.setTimeout.apply(c, n([o, a], t(u)))
            : setTimeout.apply(void 0, n([o, a], t(u)));
        },
        clearTimeout: function (o) {
          var a = e.timeoutProvider.delegate;
          return (a?.clearTimeout || clearTimeout)(o);
        },
        delegate: void 0,
      });
  }),
  i_ = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.reportUnhandledError = void 0);
    var t = gl(),
      n = o_();
    function o(a) {
      n.timeoutProvider.setTimeout(function () {
        var u = t.config.onUnhandledError;
        if (u) u(a);
        else throw a;
      });
    }
    e.reportUnhandledError = o;
  }),
  Ut = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.noop = void 0);
    function t() {}
    e.noop = t;
  }),
  SA = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.createNotification =
        e.nextNotification =
        e.errorNotification =
        e.COMPLETE_NOTIFICATION =
          void 0),
      (e.COMPLETE_NOTIFICATION = (function () {
        return o("C", void 0, void 0);
      })());
    function t(a) {
      return o("E", void 0, a);
    }
    e.errorNotification = t;
    function n(a) {
      return o("N", a, void 0);
    }
    e.nextNotification = n;
    function o(a, u, l) {
      return { kind: a, value: u, error: l };
    }
    e.createNotification = o;
  }),
  Lv = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.captureError = e.errorContext = void 0);
    var t = gl(),
      n = null;
    function o(u) {
      if (t.config.useDeprecatedSynchronousErrorHandling) {
        var l = !n;
        if ((l && (n = { errorThrown: !1, error: null }), u(), l)) {
          var c = n,
            f = c.errorThrown,
            d = c.error;
          if (((n = null), f)) throw d;
        }
      } else u();
    }
    e.errorContext = o;
    function a(u) {
      t.config.useDeprecatedSynchronousErrorHandling &&
        n &&
        ((n.errorThrown = !0), (n.error = u));
    }
    e.captureError = a;
  }),
  wl = E((e) => {
    var t =
      (e && e.__extends) ||
      (function () {
        var A = function (k, j) {
          return (
            (A =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (C, D) {
                  C.__proto__ = D;
                }) ||
              function (C, D) {
                for (var W in D)
                  Object.prototype.hasOwnProperty.call(D, W) && (C[W] = D[W]);
              }),
            A(k, j)
          );
        };
        return function (k, j) {
          if (typeof j != "function" && j !== null)
            throw new TypeError(
              "Class extends value " +
                String(j) +
                " is not a constructor or null"
            );
          A(k, j);
          function C() {
            this.constructor = k;
          }
          k.prototype =
            j === null
              ? Object.create(j)
              : ((C.prototype = j.prototype), new C());
        };
      })();
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.EMPTY_OBSERVER = e.SafeSubscriber = e.Subscriber = void 0);
    var n = Ke(),
      o = fr(),
      a = gl(),
      u = i_(),
      l = Ut(),
      c = SA(),
      f = o_(),
      d = Lv(),
      v = (function (A) {
        t(k, A);
        function k(j) {
          var C = A.call(this) || this;
          return (
            (C.isStopped = !1),
            j
              ? ((C.destination = j), o.isSubscription(j) && j.add(C))
              : (C.destination = e.EMPTY_OBSERVER),
            C
          );
        }
        return (
          (k.create = function (j, C, D) {
            return new w(j, C, D);
          }),
          (k.prototype.next = function (j) {
            this.isStopped ? O(c.nextNotification(j), this) : this._next(j);
          }),
          (k.prototype.error = function (j) {
            this.isStopped
              ? O(c.errorNotification(j), this)
              : ((this.isStopped = !0), this._error(j));
          }),
          (k.prototype.complete = function () {
            this.isStopped
              ? O(c.COMPLETE_NOTIFICATION, this)
              : ((this.isStopped = !0), this._complete());
          }),
          (k.prototype.unsubscribe = function () {
            this.closed ||
              ((this.isStopped = !0),
              A.prototype.unsubscribe.call(this),
              (this.destination = null));
          }),
          (k.prototype._next = function (j) {
            this.destination.next(j);
          }),
          (k.prototype._error = function (j) {
            try {
              this.destination.error(j);
            } finally {
              this.unsubscribe();
            }
          }),
          (k.prototype._complete = function () {
            try {
              this.destination.complete();
            } finally {
              this.unsubscribe();
            }
          }),
          k
        );
      })(o.Subscription);
    e.Subscriber = v;
    var m = Function.prototype.bind;
    function h(A, k) {
      return m.call(A, k);
    }
    var g = (function () {
        function A(k) {
          this.partialObserver = k;
        }
        return (
          (A.prototype.next = function (k) {
            var j = this.partialObserver;
            if (j.next)
              try {
                j.next(k);
              } catch (C) {
                x(C);
              }
          }),
          (A.prototype.error = function (k) {
            var j = this.partialObserver;
            if (j.error)
              try {
                j.error(k);
              } catch (C) {
                x(C);
              }
            else x(k);
          }),
          (A.prototype.complete = function () {
            var k = this.partialObserver;
            if (k.complete)
              try {
                k.complete();
              } catch (j) {
                x(j);
              }
          }),
          A
        );
      })(),
      w = (function (A) {
        t(k, A);
        function k(j, C, D) {
          var W = A.call(this) || this,
            $;
          if (n.isFunction(j) || !j)
            $ = {
              next: j ?? void 0,
              error: C ?? void 0,
              complete: D ?? void 0,
            };
          else {
            var F;
            W && a.config.useDeprecatedNextContext
              ? ((F = Object.create(j)),
                (F.unsubscribe = function () {
                  return W.unsubscribe();
                }),
                ($ = {
                  next: j.next && h(j.next, F),
                  error: j.error && h(j.error, F),
                  complete: j.complete && h(j.complete, F),
                }))
              : ($ = j);
          }
          return (W.destination = new g($)), W;
        }
        return k;
      })(v);
    e.SafeSubscriber = w;
    function x(A) {
      a.config.useDeprecatedSynchronousErrorHandling
        ? d.captureError(A)
        : u.reportUnhandledError(A);
    }
    function S(A) {
      throw A;
    }
    function O(A, k) {
      var j = a.config.onStoppedNotification;
      j &&
        f.timeoutProvider.setTimeout(function () {
          return j(A, k);
        });
    }
    e.EMPTY_OBSERVER = { closed: !0, next: l.noop, error: S, complete: l.noop };
  }),
  Fc = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.observable = void 0),
      (e.observable = (function () {
        return (
          (typeof Symbol == "function" && Symbol.observable) || "@@observable"
        );
      })());
  }),
  Kt = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.identity = void 0);
    function t(n) {
      return n;
    }
    e.identity = t;
  }),
  $c = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.pipeFromArray = e.pipe = void 0);
    var t = Kt();
    function n() {
      for (var a = [], u = 0; u < arguments.length; u++) a[u] = arguments[u];
      return o(a);
    }
    e.pipe = n;
    function o(a) {
      return a.length === 0
        ? t.identity
        : a.length === 1
        ? a[0]
        : function (u) {
            return a.reduce(function (l, c) {
              return c(l);
            }, u);
          };
    }
    e.pipeFromArray = o;
  }),
  Ze = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.Observable = void 0);
    var t = wl(),
      n = fr(),
      o = Fc(),
      a = $c(),
      u = gl(),
      l = Ke(),
      c = Lv(),
      f = (function () {
        function h(g) {
          g && (this._subscribe = g);
        }
        return (
          (h.prototype.lift = function (g) {
            var w = new h();
            return (w.source = this), (w.operator = g), w;
          }),
          (h.prototype.subscribe = function (g, w, x) {
            var S = this,
              O = m(g) ? g : new t.SafeSubscriber(g, w, x);
            return (
              c.errorContext(function () {
                var A = S,
                  k = A.operator,
                  j = A.source;
                O.add(
                  k ? k.call(O, j) : j ? S._subscribe(O) : S._trySubscribe(O)
                );
              }),
              O
            );
          }),
          (h.prototype._trySubscribe = function (g) {
            try {
              return this._subscribe(g);
            } catch (w) {
              g.error(w);
            }
          }),
          (h.prototype.forEach = function (g, w) {
            var x = this;
            return (
              (w = d(w)),
              new w(function (S, O) {
                var A = new t.SafeSubscriber({
                  next: function (k) {
                    try {
                      g(k);
                    } catch (j) {
                      O(j), A.unsubscribe();
                    }
                  },
                  error: O,
                  complete: S,
                });
                x.subscribe(A);
              })
            );
          }),
          (h.prototype._subscribe = function (g) {
            var w;
            return (w = this.source) === null || w === void 0
              ? void 0
              : w.subscribe(g);
          }),
          (h.prototype[o.observable] = function () {
            return this;
          }),
          (h.prototype.pipe = function () {
            for (var g = [], w = 0; w < arguments.length; w++)
              g[w] = arguments[w];
            return a.pipeFromArray(g)(this);
          }),
          (h.prototype.toPromise = function (g) {
            var w = this;
            return (
              (g = d(g)),
              new g(function (x, S) {
                var O;
                w.subscribe(
                  function (A) {
                    return (O = A);
                  },
                  function (A) {
                    return S(A);
                  },
                  function () {
                    return x(O);
                  }
                );
              })
            );
          }),
          (h.create = function (g) {
            return new h(g);
          }),
          h
        );
      })();
    e.Observable = f;
    function d(h) {
      var g;
      return (g = h ?? u.config.Promise) !== null && g !== void 0 ? g : Promise;
    }
    function v(h) {
      return (
        h &&
        l.isFunction(h.next) &&
        l.isFunction(h.error) &&
        l.isFunction(h.complete)
      );
    }
    function m(h) {
      return (h && h instanceof t.Subscriber) || (v(h) && n.isSubscription(h));
    }
  }),
  te = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.operate = e.hasLift = void 0);
    var t = Ke();
    function n(a) {
      return t.isFunction(a?.lift);
    }
    e.hasLift = n;
    function o(a) {
      return function (u) {
        if (n(u))
          return u.lift(function (l) {
            try {
              return a(l, this);
            } catch (c) {
              this.error(c);
            }
          });
        throw new TypeError("Unable to lift unknown Observable type");
      };
    }
    e.operate = o;
  }),
  pe = E((e) => {
    var t =
      (e && e.__extends) ||
      (function () {
        var u = function (l, c) {
          return (
            (u =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (f, d) {
                  f.__proto__ = d;
                }) ||
              function (f, d) {
                for (var v in d)
                  Object.prototype.hasOwnProperty.call(d, v) && (f[v] = d[v]);
              }),
            u(l, c)
          );
        };
        return function (l, c) {
          if (typeof c != "function" && c !== null)
            throw new TypeError(
              "Class extends value " +
                String(c) +
                " is not a constructor or null"
            );
          u(l, c);
          function f() {
            this.constructor = l;
          }
          l.prototype =
            c === null
              ? Object.create(c)
              : ((f.prototype = c.prototype), new f());
        };
      })();
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.OperatorSubscriber = e.createOperatorSubscriber = void 0);
    var n = wl();
    function o(u, l, c, f, d) {
      return new a(u, l, c, f, d);
    }
    e.createOperatorSubscriber = o;
    var a = (function (u) {
      t(l, u);
      function l(c, f, d, v, m, h) {
        var g = u.call(this, c) || this;
        return (
          (g.onFinalize = m),
          (g.shouldUnsubscribe = h),
          (g._next = f
            ? function (w) {
                try {
                  f(w);
                } catch (x) {
                  c.error(x);
                }
              }
            : u.prototype._next),
          (g._error = v
            ? function (w) {
                try {
                  v(w);
                } catch (x) {
                  c.error(x);
                } finally {
                  this.unsubscribe();
                }
              }
            : u.prototype._error),
          (g._complete = d
            ? function () {
                try {
                  d();
                } catch (w) {
                  c.error(w);
                } finally {
                  this.unsubscribe();
                }
              }
            : u.prototype._complete),
          g
        );
      }
      return (
        (l.prototype.unsubscribe = function () {
          var c;
          if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            var f = this.closed;
            u.prototype.unsubscribe.call(this),
              !f &&
                ((c = this.onFinalize) === null ||
                  c === void 0 ||
                  c.call(this));
          }
        }),
        l
      );
    })(n.Subscriber);
    e.OperatorSubscriber = a;
  }),
  a_ = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.refCount = void 0);
    var t = te(),
      n = pe();
    function o() {
      return t.operate(function (a, u) {
        var l = null;
        a._refCount++;
        var c = n.createOperatorSubscriber(
          u,
          void 0,
          void 0,
          void 0,
          function () {
            if (!a || a._refCount <= 0 || 0 < --a._refCount) {
              l = null;
              return;
            }
            var f = a._connection,
              d = l;
            (l = null),
              f && (!d || f === d) && f.unsubscribe(),
              u.unsubscribe();
          }
        );
        a.subscribe(c), c.closed || (l = a.connect());
      });
    }
    e.refCount = o;
  }),
  Vc = E((e) => {
    var t =
      (e && e.__extends) ||
      (function () {
        var f = function (d, v) {
          return (
            (f =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (m, h) {
                  m.__proto__ = h;
                }) ||
              function (m, h) {
                for (var g in h)
                  Object.prototype.hasOwnProperty.call(h, g) && (m[g] = h[g]);
              }),
            f(d, v)
          );
        };
        return function (d, v) {
          if (typeof v != "function" && v !== null)
            throw new TypeError(
              "Class extends value " +
                String(v) +
                " is not a constructor or null"
            );
          f(d, v);
          function m() {
            this.constructor = d;
          }
          d.prototype =
            v === null
              ? Object.create(v)
              : ((m.prototype = v.prototype), new m());
        };
      })();
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.ConnectableObservable = void 0);
    var n = Ze(),
      o = fr(),
      a = a_(),
      u = pe(),
      l = te(),
      c = (function (f) {
        t(d, f);
        function d(v, m) {
          var h = f.call(this) || this;
          return (
            (h.source = v),
            (h.subjectFactory = m),
            (h._subject = null),
            (h._refCount = 0),
            (h._connection = null),
            l.hasLift(v) && (h.lift = v.lift),
            h
          );
        }
        return (
          (d.prototype._subscribe = function (v) {
            return this.getSubject().subscribe(v);
          }),
          (d.prototype.getSubject = function () {
            var v = this._subject;
            return (
              (!v || v.isStopped) && (this._subject = this.subjectFactory()),
              this._subject
            );
          }),
          (d.prototype._teardown = function () {
            this._refCount = 0;
            var v = this._connection;
            (this._subject = this._connection = null), v?.unsubscribe();
          }),
          (d.prototype.connect = function () {
            var v = this,
              m = this._connection;
            if (!m) {
              m = this._connection = new o.Subscription();
              var h = this.getSubject();
              m.add(
                this.source.subscribe(
                  u.createOperatorSubscriber(
                    h,
                    void 0,
                    function () {
                      v._teardown(), h.complete();
                    },
                    function (g) {
                      v._teardown(), h.error(g);
                    },
                    function () {
                      return v._teardown();
                    }
                  )
                )
              ),
                m.closed &&
                  ((this._connection = null), (m = o.Subscription.EMPTY));
            }
            return m;
          }),
          (d.prototype.refCount = function () {
            return a.refCount()(this);
          }),
          d
        );
      })(n.Observable);
    e.ConnectableObservable = c;
  }),
  PA = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.performanceTimestampProvider = void 0),
      (e.performanceTimestampProvider = {
        now: function () {
          return (e.performanceTimestampProvider.delegate || performance).now();
        },
        delegate: void 0,
      });
  }),
  u_ = E((e) => {
    var t =
        (e && e.__read) ||
        function (a, u) {
          var l = typeof Symbol == "function" && a[Symbol.iterator];
          if (!l) return a;
          var c = l.call(a),
            f,
            d = [],
            v;
          try {
            for (; (u === void 0 || u-- > 0) && !(f = c.next()).done; )
              d.push(f.value);
          } catch (m) {
            v = { error: m };
          } finally {
            try {
              f && !f.done && (l = c.return) && l.call(c);
            } finally {
              if (v) throw v.error;
            }
          }
          return d;
        },
      n =
        (e && e.__spreadArray) ||
        function (a, u) {
          for (var l = 0, c = u.length, f = a.length; l < c; l++, f++)
            a[f] = u[l];
          return a;
        };
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.animationFrameProvider = void 0);
    var o = fr();
    e.animationFrameProvider = {
      schedule: function (a) {
        var u = requestAnimationFrame,
          l = cancelAnimationFrame,
          c = e.animationFrameProvider.delegate;
        c && ((u = c.requestAnimationFrame), (l = c.cancelAnimationFrame));
        var f = u(function (d) {
          (l = void 0), a(d);
        });
        return new o.Subscription(function () {
          return l?.(f);
        });
      },
      requestAnimationFrame: function () {
        for (var a = [], u = 0; u < arguments.length; u++) a[u] = arguments[u];
        var l = e.animationFrameProvider.delegate;
        return (l?.requestAnimationFrame || requestAnimationFrame).apply(
          void 0,
          n([], t(a))
        );
      },
      cancelAnimationFrame: function () {
        for (var a = [], u = 0; u < arguments.length; u++) a[u] = arguments[u];
        var l = e.animationFrameProvider.delegate;
        return (l?.cancelAnimationFrame || cancelAnimationFrame).apply(
          void 0,
          n([], t(a))
        );
      },
      delegate: void 0,
    };
  }),
  EA = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.animationFrames = void 0);
    var t = Ze(),
      n = fr(),
      o = PA(),
      a = u_();
    function u(f) {
      return f ? l(f) : c;
    }
    e.animationFrames = u;
    function l(f) {
      var d = a.animationFrameProvider.schedule;
      return new t.Observable(function (v) {
        var m = new n.Subscription(),
          h = f || o.performanceTimestampProvider,
          g = h.now(),
          w = function (x) {
            var S = h.now();
            v.next({ timestamp: f ? S : x, elapsed: S - g }),
              v.closed || m.add(d(w));
          };
        return m.add(d(w)), m;
      });
    }
    var c = l();
  }),
  l_ = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.ObjectUnsubscribedError = void 0);
    var t = ki();
    e.ObjectUnsubscribedError = t.createErrorClass(function (n) {
      return function () {
        n(this),
          (this.name = "ObjectUnsubscribedError"),
          (this.message = "object unsubscribed");
      };
    });
  }),
  Ft = E((e) => {
    var t =
        (e && e.__extends) ||
        (function () {
          var v = function (m, h) {
            return (
              (v =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (g, w) {
                    g.__proto__ = w;
                  }) ||
                function (g, w) {
                  for (var x in w)
                    Object.prototype.hasOwnProperty.call(w, x) && (g[x] = w[x]);
                }),
              v(m, h)
            );
          };
          return function (m, h) {
            if (typeof h != "function" && h !== null)
              throw new TypeError(
                "Class extends value " +
                  String(h) +
                  " is not a constructor or null"
              );
            v(m, h);
            function g() {
              this.constructor = m;
            }
            m.prototype =
              h === null
                ? Object.create(h)
                : ((g.prototype = h.prototype), new g());
          };
        })(),
      n =
        (e && e.__values) ||
        function (v) {
          var m = typeof Symbol == "function" && Symbol.iterator,
            h = m && v[m],
            g = 0;
          if (h) return h.call(v);
          if (v && typeof v.length == "number")
            return {
              next: function () {
                return (
                  v && g >= v.length && (v = void 0),
                  { value: v && v[g++], done: !v }
                );
              },
            };
          throw new TypeError(
            m ? "Object is not iterable." : "Symbol.iterator is not defined."
          );
        };
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.AnonymousSubject = e.Subject = void 0);
    var o = Ze(),
      a = fr(),
      u = l_(),
      l = Co(),
      c = Lv(),
      f = (function (v) {
        t(m, v);
        function m() {
          var h = v.call(this) || this;
          return (
            (h.closed = !1),
            (h.currentObservers = null),
            (h.observers = []),
            (h.isStopped = !1),
            (h.hasError = !1),
            (h.thrownError = null),
            h
          );
        }
        return (
          (m.prototype.lift = function (h) {
            var g = new d(this, this);
            return (g.operator = h), g;
          }),
          (m.prototype._throwIfClosed = function () {
            if (this.closed) throw new u.ObjectUnsubscribedError();
          }),
          (m.prototype.next = function (h) {
            var g = this;
            c.errorContext(function () {
              var w, x;
              if ((g._throwIfClosed(), !g.isStopped)) {
                g.currentObservers ||
                  (g.currentObservers = Array.from(g.observers));
                try {
                  for (
                    var S = n(g.currentObservers), O = S.next();
                    !O.done;
                    O = S.next()
                  ) {
                    var A = O.value;
                    A.next(h);
                  }
                } catch (k) {
                  w = { error: k };
                } finally {
                  try {
                    O && !O.done && (x = S.return) && x.call(S);
                  } finally {
                    if (w) throw w.error;
                  }
                }
              }
            });
          }),
          (m.prototype.error = function (h) {
            var g = this;
            c.errorContext(function () {
              if ((g._throwIfClosed(), !g.isStopped)) {
                (g.hasError = g.isStopped = !0), (g.thrownError = h);
                for (var w = g.observers; w.length; ) w.shift().error(h);
              }
            });
          }),
          (m.prototype.complete = function () {
            var h = this;
            c.errorContext(function () {
              if ((h._throwIfClosed(), !h.isStopped)) {
                h.isStopped = !0;
                for (var g = h.observers; g.length; ) g.shift().complete();
              }
            });
          }),
          (m.prototype.unsubscribe = function () {
            (this.isStopped = this.closed = !0),
              (this.observers = this.currentObservers = null);
          }),
          Object.defineProperty(m.prototype, "observed", {
            get: function () {
              var h;
              return (
                ((h = this.observers) === null || h === void 0
                  ? void 0
                  : h.length) > 0
              );
            },
            enumerable: !1,
            configurable: !0,
          }),
          (m.prototype._trySubscribe = function (h) {
            return (
              this._throwIfClosed(), v.prototype._trySubscribe.call(this, h)
            );
          }),
          (m.prototype._subscribe = function (h) {
            return (
              this._throwIfClosed(),
              this._checkFinalizedStatuses(h),
              this._innerSubscribe(h)
            );
          }),
          (m.prototype._innerSubscribe = function (h) {
            var g = this,
              w = this,
              x = w.hasError,
              S = w.isStopped,
              O = w.observers;
            return x || S
              ? a.EMPTY_SUBSCRIPTION
              : ((this.currentObservers = null),
                O.push(h),
                new a.Subscription(function () {
                  (g.currentObservers = null), l.arrRemove(O, h);
                }));
          }),
          (m.prototype._checkFinalizedStatuses = function (h) {
            var g = this,
              w = g.hasError,
              x = g.thrownError,
              S = g.isStopped;
            w ? h.error(x) : S && h.complete();
          }),
          (m.prototype.asObservable = function () {
            var h = new o.Observable();
            return (h.source = this), h;
          }),
          (m.create = function (h, g) {
            return new d(h, g);
          }),
          m
        );
      })(o.Observable);
    e.Subject = f;
    var d = (function (v) {
      t(m, v);
      function m(h, g) {
        var w = v.call(this) || this;
        return (w.destination = h), (w.source = g), w;
      }
      return (
        (m.prototype.next = function (h) {
          var g, w;
          (w =
            (g = this.destination) === null || g === void 0
              ? void 0
              : g.next) === null ||
            w === void 0 ||
            w.call(g, h);
        }),
        (m.prototype.error = function (h) {
          var g, w;
          (w =
            (g = this.destination) === null || g === void 0
              ? void 0
              : g.error) === null ||
            w === void 0 ||
            w.call(g, h);
        }),
        (m.prototype.complete = function () {
          var h, g;
          (g =
            (h = this.destination) === null || h === void 0
              ? void 0
              : h.complete) === null ||
            g === void 0 ||
            g.call(h);
        }),
        (m.prototype._subscribe = function (h) {
          var g, w;
          return (w =
            (g = this.source) === null || g === void 0
              ? void 0
              : g.subscribe(h)) !== null && w !== void 0
            ? w
            : a.EMPTY_SUBSCRIPTION;
        }),
        m
      );
    })(f);
    e.AnonymousSubject = d;
  }),
  s_ = E((e) => {
    var t =
      (e && e.__extends) ||
      (function () {
        var a = function (u, l) {
          return (
            (a =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (c, f) {
                  c.__proto__ = f;
                }) ||
              function (c, f) {
                for (var d in f)
                  Object.prototype.hasOwnProperty.call(f, d) && (c[d] = f[d]);
              }),
            a(u, l)
          );
        };
        return function (u, l) {
          if (typeof l != "function" && l !== null)
            throw new TypeError(
              "Class extends value " +
                String(l) +
                " is not a constructor or null"
            );
          a(u, l);
          function c() {
            this.constructor = u;
          }
          u.prototype =
            l === null
              ? Object.create(l)
              : ((c.prototype = l.prototype), new c());
        };
      })();
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.BehaviorSubject = void 0);
    var n = Ft(),
      o = (function (a) {
        t(u, a);
        function u(l) {
          var c = a.call(this) || this;
          return (c._value = l), c;
        }
        return (
          Object.defineProperty(u.prototype, "value", {
            get: function () {
              return this.getValue();
            },
            enumerable: !1,
            configurable: !0,
          }),
          (u.prototype._subscribe = function (l) {
            var c = a.prototype._subscribe.call(this, l);
            return !c.closed && l.next(this._value), c;
          }),
          (u.prototype.getValue = function () {
            var l = this,
              c = l.hasError,
              f = l.thrownError,
              d = l._value;
            if (c) throw f;
            return this._throwIfClosed(), d;
          }),
          (u.prototype.next = function (l) {
            a.prototype.next.call(this, (this._value = l));
          }),
          u
        );
      })(n.Subject);
    e.BehaviorSubject = o;
  }),
  Bv = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.dateTimestampProvider = void 0),
      (e.dateTimestampProvider = {
        now: function () {
          return (e.dateTimestampProvider.delegate || Date).now();
        },
        delegate: void 0,
      });
  }),
  Dv = E((e) => {
    var t =
      (e && e.__extends) ||
      (function () {
        var u = function (l, c) {
          return (
            (u =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (f, d) {
                  f.__proto__ = d;
                }) ||
              function (f, d) {
                for (var v in d)
                  Object.prototype.hasOwnProperty.call(d, v) && (f[v] = d[v]);
              }),
            u(l, c)
          );
        };
        return function (l, c) {
          if (typeof c != "function" && c !== null)
            throw new TypeError(
              "Class extends value " +
                String(c) +
                " is not a constructor or null"
            );
          u(l, c);
          function f() {
            this.constructor = l;
          }
          l.prototype =
            c === null
              ? Object.create(c)
              : ((f.prototype = c.prototype), new f());
        };
      })();
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.ReplaySubject = void 0);
    var n = Ft(),
      o = Bv(),
      a = (function (u) {
        t(l, u);
        function l(c, f, d) {
          c === void 0 && (c = 1 / 0),
            f === void 0 && (f = 1 / 0),
            d === void 0 && (d = o.dateTimestampProvider);
          var v = u.call(this) || this;
          return (
            (v._bufferSize = c),
            (v._windowTime = f),
            (v._timestampProvider = d),
            (v._buffer = []),
            (v._infiniteTimeWindow = !0),
            (v._infiniteTimeWindow = f === 1 / 0),
            (v._bufferSize = Math.max(1, c)),
            (v._windowTime = Math.max(1, f)),
            v
          );
        }
        return (
          (l.prototype.next = function (c) {
            var f = this,
              d = f.isStopped,
              v = f._buffer,
              m = f._infiniteTimeWindow,
              h = f._timestampProvider,
              g = f._windowTime;
            d || (v.push(c), !m && v.push(h.now() + g)),
              this._trimBuffer(),
              u.prototype.next.call(this, c);
          }),
          (l.prototype._subscribe = function (c) {
            this._throwIfClosed(), this._trimBuffer();
            for (
              var f = this._innerSubscribe(c),
                d = this,
                v = d._infiniteTimeWindow,
                m = d._buffer,
                h = m.slice(),
                g = 0;
              g < h.length && !c.closed;
              g += v ? 1 : 2
            )
              c.next(h[g]);
            return this._checkFinalizedStatuses(c), f;
          }),
          (l.prototype._trimBuffer = function () {
            var c = this,
              f = c._bufferSize,
              d = c._timestampProvider,
              v = c._buffer,
              m = c._infiniteTimeWindow,
              h = (m ? 1 : 2) * f;
            if ((f < 1 / 0 && h < v.length && v.splice(0, v.length - h), !m)) {
              for (
                var g = d.now(), w = 0, x = 1;
                x < v.length && v[x] <= g;
                x += 2
              )
                w = x;
              w && v.splice(0, w + 1);
            }
          }),
          l
        );
      })(n.Subject);
    e.ReplaySubject = a;
  }),
  Uv = E((e) => {
    var t =
      (e && e.__extends) ||
      (function () {
        var a = function (u, l) {
          return (
            (a =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (c, f) {
                  c.__proto__ = f;
                }) ||
              function (c, f) {
                for (var d in f)
                  Object.prototype.hasOwnProperty.call(f, d) && (c[d] = f[d]);
              }),
            a(u, l)
          );
        };
        return function (u, l) {
          if (typeof l != "function" && l !== null)
            throw new TypeError(
              "Class extends value " +
                String(l) +
                " is not a constructor or null"
            );
          a(u, l);
          function c() {
            this.constructor = u;
          }
          u.prototype =
            l === null
              ? Object.create(l)
              : ((c.prototype = l.prototype), new c());
        };
      })();
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.AsyncSubject = void 0);
    var n = Ft(),
      o = (function (a) {
        t(u, a);
        function u() {
          var l = (a !== null && a.apply(this, arguments)) || this;
          return (l._value = null), (l._hasValue = !1), (l._isComplete = !1), l;
        }
        return (
          (u.prototype._checkFinalizedStatuses = function (l) {
            var c = this,
              f = c.hasError,
              d = c._hasValue,
              v = c._value,
              m = c.thrownError,
              h = c.isStopped,
              g = c._isComplete;
            f ? l.error(m) : (h || g) && (d && l.next(v), l.complete());
          }),
          (u.prototype.next = function (l) {
            this.isStopped || ((this._value = l), (this._hasValue = !0));
          }),
          (u.prototype.complete = function () {
            var l = this,
              c = l._hasValue,
              f = l._value,
              d = l._isComplete;
            d ||
              ((this._isComplete = !0),
              c && a.prototype.next.call(this, f),
              a.prototype.complete.call(this));
          }),
          u
        );
      })(n.Subject);
    e.AsyncSubject = o;
  }),
  kA = E((e) => {
    var t =
      (e && e.__extends) ||
      (function () {
        var a = function (u, l) {
          return (
            (a =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (c, f) {
                  c.__proto__ = f;
                }) ||
              function (c, f) {
                for (var d in f)
                  Object.prototype.hasOwnProperty.call(f, d) && (c[d] = f[d]);
              }),
            a(u, l)
          );
        };
        return function (u, l) {
          if (typeof l != "function" && l !== null)
            throw new TypeError(
              "Class extends value " +
                String(l) +
                " is not a constructor or null"
            );
          a(u, l);
          function c() {
            this.constructor = u;
          }
          u.prototype =
            l === null
              ? Object.create(l)
              : ((c.prototype = l.prototype), new c());
        };
      })();
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.Action = void 0);
    var n = fr(),
      o = (function (a) {
        t(u, a);
        function u(l, c) {
          return a.call(this) || this;
        }
        return (
          (u.prototype.schedule = function (l, c) {
            return this;
          }),
          u
        );
      })(n.Subscription);
    e.Action = o;
  }),
  jA = E((e) => {
    var t =
        (e && e.__read) ||
        function (o, a) {
          var u = typeof Symbol == "function" && o[Symbol.iterator];
          if (!u) return o;
          var l = u.call(o),
            c,
            f = [],
            d;
          try {
            for (; (a === void 0 || a-- > 0) && !(c = l.next()).done; )
              f.push(c.value);
          } catch (v) {
            d = { error: v };
          } finally {
            try {
              c && !c.done && (u = l.return) && u.call(l);
            } finally {
              if (d) throw d.error;
            }
          }
          return f;
        },
      n =
        (e && e.__spreadArray) ||
        function (o, a) {
          for (var u = 0, l = a.length, c = o.length; u < l; u++, c++)
            o[c] = a[u];
          return o;
        };
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.intervalProvider = void 0),
      (e.intervalProvider = {
        setInterval: function (o, a) {
          for (var u = [], l = 2; l < arguments.length; l++)
            u[l - 2] = arguments[l];
          var c = e.intervalProvider.delegate;
          return c?.setInterval
            ? c.setInterval.apply(c, n([o, a], t(u)))
            : setInterval.apply(void 0, n([o, a], t(u)));
        },
        clearInterval: function (o) {
          var a = e.intervalProvider.delegate;
          return (a?.clearInterval || clearInterval)(o);
        },
        delegate: void 0,
      });
  }),
  _l = E((e) => {
    var t =
      (e && e.__extends) ||
      (function () {
        var l = function (c, f) {
          return (
            (l =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (d, v) {
                  d.__proto__ = v;
                }) ||
              function (d, v) {
                for (var m in v)
                  Object.prototype.hasOwnProperty.call(v, m) && (d[m] = v[m]);
              }),
            l(c, f)
          );
        };
        return function (c, f) {
          if (typeof f != "function" && f !== null)
            throw new TypeError(
              "Class extends value " +
                String(f) +
                " is not a constructor or null"
            );
          l(c, f);
          function d() {
            this.constructor = c;
          }
          c.prototype =
            f === null
              ? Object.create(f)
              : ((d.prototype = f.prototype), new d());
        };
      })();
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.AsyncAction = void 0);
    var n = kA(),
      o = jA(),
      a = Co(),
      u = (function (l) {
        t(c, l);
        function c(f, d) {
          var v = l.call(this, f, d) || this;
          return (v.scheduler = f), (v.work = d), (v.pending = !1), v;
        }
        return (
          (c.prototype.schedule = function (f, d) {
            if ((d === void 0 && (d = 0), this.closed)) return this;
            this.state = f;
            var v = this.id,
              m = this.scheduler;
            return (
              v != null && (this.id = this.recycleAsyncId(m, v, d)),
              (this.pending = !0),
              (this.delay = d),
              (this.id = this.id || this.requestAsyncId(m, this.id, d)),
              this
            );
          }),
          (c.prototype.requestAsyncId = function (f, d, v) {
            return (
              v === void 0 && (v = 0),
              o.intervalProvider.setInterval(f.flush.bind(f, this), v)
            );
          }),
          (c.prototype.recycleAsyncId = function (f, d, v) {
            if (
              (v === void 0 && (v = 0),
              v != null && this.delay === v && this.pending === !1)
            )
              return d;
            o.intervalProvider.clearInterval(d);
          }),
          (c.prototype.execute = function (f, d) {
            if (this.closed) return new Error("executing a cancelled action");
            this.pending = !1;
            var v = this._execute(f, d);
            if (v) return v;
            this.pending === !1 &&
              this.id != null &&
              (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
          }),
          (c.prototype._execute = function (f, d) {
            var v = !1,
              m;
            try {
              this.work(f);
            } catch (h) {
              (v = !0),
                (m = h || new Error("Scheduled action threw falsy error"));
            }
            if (v) return this.unsubscribe(), m;
          }),
          (c.prototype.unsubscribe = function () {
            if (!this.closed) {
              var f = this,
                d = f.id,
                v = f.scheduler,
                m = v.actions;
              (this.work = this.state = this.scheduler = null),
                (this.pending = !1),
                a.arrRemove(m, this),
                d != null && (this.id = this.recycleAsyncId(v, d, null)),
                (this.delay = null),
                l.prototype.unsubscribe.call(this);
            }
          }),
          c
        );
      })(n.Action);
    e.AsyncAction = u;
  }),
  AA = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.TestTools = e.Immediate = void 0);
    var t = 1,
      n,
      o = {};
    function a(u) {
      return u in o ? (delete o[u], !0) : !1;
    }
    (e.Immediate = {
      setImmediate: function (u) {
        var l = t++;
        return (
          (o[l] = !0),
          n || (n = Promise.resolve()),
          n.then(function () {
            return a(l) && u();
          }),
          l
        );
      },
      clearImmediate: function (u) {
        a(u);
      },
    }),
      (e.TestTools = {
        pending: function () {
          return Object.keys(o).length;
        },
      });
  }),
  IA = E((e) => {
    var t =
        (e && e.__read) ||
        function (l, c) {
          var f = typeof Symbol == "function" && l[Symbol.iterator];
          if (!f) return l;
          var d = f.call(l),
            v,
            m = [],
            h;
          try {
            for (; (c === void 0 || c-- > 0) && !(v = d.next()).done; )
              m.push(v.value);
          } catch (g) {
            h = { error: g };
          } finally {
            try {
              v && !v.done && (f = d.return) && f.call(d);
            } finally {
              if (h) throw h.error;
            }
          }
          return m;
        },
      n =
        (e && e.__spreadArray) ||
        function (l, c) {
          for (var f = 0, d = c.length, v = l.length; f < d; f++, v++)
            l[v] = c[f];
          return l;
        };
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.immediateProvider = void 0);
    var o = AA(),
      a = o.Immediate.setImmediate,
      u = o.Immediate.clearImmediate;
    e.immediateProvider = {
      setImmediate: function () {
        for (var l = [], c = 0; c < arguments.length; c++) l[c] = arguments[c];
        var f = e.immediateProvider.delegate;
        return (f?.setImmediate || a).apply(void 0, n([], t(l)));
      },
      clearImmediate: function (l) {
        var c = e.immediateProvider.delegate;
        return (c?.clearImmediate || u)(l);
      },
      delegate: void 0,
    };
  }),
  TA = E((e) => {
    var t =
      (e && e.__extends) ||
      (function () {
        var u = function (l, c) {
          return (
            (u =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (f, d) {
                  f.__proto__ = d;
                }) ||
              function (f, d) {
                for (var v in d)
                  Object.prototype.hasOwnProperty.call(d, v) && (f[v] = d[v]);
              }),
            u(l, c)
          );
        };
        return function (l, c) {
          if (typeof c != "function" && c !== null)
            throw new TypeError(
              "Class extends value " +
                String(c) +
                " is not a constructor or null"
            );
          u(l, c);
          function f() {
            this.constructor = l;
          }
          l.prototype =
            c === null
              ? Object.create(c)
              : ((f.prototype = c.prototype), new f());
        };
      })();
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.AsapAction = void 0);
    var n = _l(),
      o = IA(),
      a = (function (u) {
        t(l, u);
        function l(c, f) {
          var d = u.call(this, c, f) || this;
          return (d.scheduler = c), (d.work = f), d;
        }
        return (
          (l.prototype.requestAsyncId = function (c, f, d) {
            return (
              d === void 0 && (d = 0),
              d !== null && d > 0
                ? u.prototype.requestAsyncId.call(this, c, f, d)
                : (c.actions.push(this),
                  c._scheduled ||
                    (c._scheduled = o.immediateProvider.setImmediate(
                      c.flush.bind(c, void 0)
                    )))
            );
          }),
          (l.prototype.recycleAsyncId = function (c, f, d) {
            if (
              (d === void 0 && (d = 0),
              (d != null && d > 0) || (d == null && this.delay > 0))
            )
              return u.prototype.recycleAsyncId.call(this, c, f, d);
            c.actions.some(function (v) {
              return v.id === f;
            }) ||
              (o.immediateProvider.clearImmediate(f), (c._scheduled = void 0));
          }),
          l
        );
      })(n.AsyncAction);
    e.AsapAction = a;
  }),
  c_ = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.Scheduler = void 0);
    var t = Bv(),
      n = (function () {
        function o(a, u) {
          u === void 0 && (u = o.now),
            (this.schedulerActionCtor = a),
            (this.now = u);
        }
        return (
          (o.prototype.schedule = function (a, u, l) {
            return (
              u === void 0 && (u = 0),
              new this.schedulerActionCtor(this, a).schedule(l, u)
            );
          }),
          (o.now = t.dateTimestampProvider.now),
          o
        );
      })();
    e.Scheduler = n;
  }),
  Ol = E((e) => {
    var t =
      (e && e.__extends) ||
      (function () {
        var a = function (u, l) {
          return (
            (a =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (c, f) {
                  c.__proto__ = f;
                }) ||
              function (c, f) {
                for (var d in f)
                  Object.prototype.hasOwnProperty.call(f, d) && (c[d] = f[d]);
              }),
            a(u, l)
          );
        };
        return function (u, l) {
          if (typeof l != "function" && l !== null)
            throw new TypeError(
              "Class extends value " +
                String(l) +
                " is not a constructor or null"
            );
          a(u, l);
          function c() {
            this.constructor = u;
          }
          u.prototype =
            l === null
              ? Object.create(l)
              : ((c.prototype = l.prototype), new c());
        };
      })();
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.AsyncScheduler = void 0);
    var n = c_(),
      o = (function (a) {
        t(u, a);
        function u(l, c) {
          c === void 0 && (c = n.Scheduler.now);
          var f = a.call(this, l, c) || this;
          return (f.actions = []), (f._active = !1), (f._scheduled = void 0), f;
        }
        return (
          (u.prototype.flush = function (l) {
            var c = this.actions;
            if (this._active) {
              c.push(l);
              return;
            }
            var f;
            this._active = !0;
            do if ((f = l.execute(l.state, l.delay))) break;
            while ((l = c.shift()));
            if (((this._active = !1), f)) {
              for (; (l = c.shift()); ) l.unsubscribe();
              throw f;
            }
          }),
          u
        );
      })(n.Scheduler);
    e.AsyncScheduler = o;
  }),
  MA = E((e) => {
    var t =
      (e && e.__extends) ||
      (function () {
        var a = function (u, l) {
          return (
            (a =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (c, f) {
                  c.__proto__ = f;
                }) ||
              function (c, f) {
                for (var d in f)
                  Object.prototype.hasOwnProperty.call(f, d) && (c[d] = f[d]);
              }),
            a(u, l)
          );
        };
        return function (u, l) {
          if (typeof l != "function" && l !== null)
            throw new TypeError(
              "Class extends value " +
                String(l) +
                " is not a constructor or null"
            );
          a(u, l);
          function c() {
            this.constructor = u;
          }
          u.prototype =
            l === null
              ? Object.create(l)
              : ((c.prototype = l.prototype), new c());
        };
      })();
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.AsapScheduler = void 0);
    var n = Ol(),
      o = (function (a) {
        t(u, a);
        function u() {
          return (a !== null && a.apply(this, arguments)) || this;
        }
        return (
          (u.prototype.flush = function (l) {
            this._active = !0;
            var c = this._scheduled;
            this._scheduled = void 0;
            var f = this.actions,
              d;
            l = l || f.shift();
            do if ((d = l.execute(l.state, l.delay))) break;
            while ((l = f[0]) && l.id === c && f.shift());
            if (((this._active = !1), d)) {
              for (; (l = f[0]) && l.id === c && f.shift(); ) l.unsubscribe();
              throw d;
            }
          }),
          u
        );
      })(n.AsyncScheduler);
    e.AsapScheduler = o;
  }),
  NA = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.asap = e.asapScheduler = void 0);
    var t = TA(),
      n = MA();
    (e.asapScheduler = new n.AsapScheduler(t.AsapAction)),
      (e.asap = e.asapScheduler);
  }),
  dr = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.async = e.asyncScheduler = void 0);
    var t = _l(),
      n = Ol();
    (e.asyncScheduler = new n.AsyncScheduler(t.AsyncAction)),
      (e.async = e.asyncScheduler);
  }),
  CA = E((e) => {
    var t =
      (e && e.__extends) ||
      (function () {
        var a = function (u, l) {
          return (
            (a =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (c, f) {
                  c.__proto__ = f;
                }) ||
              function (c, f) {
                for (var d in f)
                  Object.prototype.hasOwnProperty.call(f, d) && (c[d] = f[d]);
              }),
            a(u, l)
          );
        };
        return function (u, l) {
          if (typeof l != "function" && l !== null)
            throw new TypeError(
              "Class extends value " +
                String(l) +
                " is not a constructor or null"
            );
          a(u, l);
          function c() {
            this.constructor = u;
          }
          u.prototype =
            l === null
              ? Object.create(l)
              : ((c.prototype = l.prototype), new c());
        };
      })();
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.QueueAction = void 0);
    var n = _l(),
      o = (function (a) {
        t(u, a);
        function u(l, c) {
          var f = a.call(this, l, c) || this;
          return (f.scheduler = l), (f.work = c), f;
        }
        return (
          (u.prototype.schedule = function (l, c) {
            return (
              c === void 0 && (c = 0),
              c > 0
                ? a.prototype.schedule.call(this, l, c)
                : ((this.delay = c),
                  (this.state = l),
                  this.scheduler.flush(this),
                  this)
            );
          }),
          (u.prototype.execute = function (l, c) {
            return c > 0 || this.closed
              ? a.prototype.execute.call(this, l, c)
              : this._execute(l, c);
          }),
          (u.prototype.requestAsyncId = function (l, c, f) {
            return (
              f === void 0 && (f = 0),
              (f != null && f > 0) || (f == null && this.delay > 0)
                ? a.prototype.requestAsyncId.call(this, l, c, f)
                : l.flush(this)
            );
          }),
          u
        );
      })(n.AsyncAction);
    e.QueueAction = o;
  }),
  zA = E((e) => {
    var t =
      (e && e.__extends) ||
      (function () {
        var a = function (u, l) {
          return (
            (a =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (c, f) {
                  c.__proto__ = f;
                }) ||
              function (c, f) {
                for (var d in f)
                  Object.prototype.hasOwnProperty.call(f, d) && (c[d] = f[d]);
              }),
            a(u, l)
          );
        };
        return function (u, l) {
          if (typeof l != "function" && l !== null)
            throw new TypeError(
              "Class extends value " +
                String(l) +
                " is not a constructor or null"
            );
          a(u, l);
          function c() {
            this.constructor = u;
          }
          u.prototype =
            l === null
              ? Object.create(l)
              : ((c.prototype = l.prototype), new c());
        };
      })();
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.QueueScheduler = void 0);
    var n = Ol(),
      o = (function (a) {
        t(u, a);
        function u() {
          return (a !== null && a.apply(this, arguments)) || this;
        }
        return u;
      })(n.AsyncScheduler);
    e.QueueScheduler = o;
  }),
  RA = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.queue = e.queueScheduler = void 0);
    var t = CA(),
      n = zA();
    (e.queueScheduler = new n.QueueScheduler(t.QueueAction)),
      (e.queue = e.queueScheduler);
  }),
  LA = E((e) => {
    var t =
      (e && e.__extends) ||
      (function () {
        var u = function (l, c) {
          return (
            (u =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (f, d) {
                  f.__proto__ = d;
                }) ||
              function (f, d) {
                for (var v in d)
                  Object.prototype.hasOwnProperty.call(d, v) && (f[v] = d[v]);
              }),
            u(l, c)
          );
        };
        return function (l, c) {
          if (typeof c != "function" && c !== null)
            throw new TypeError(
              "Class extends value " +
                String(c) +
                " is not a constructor or null"
            );
          u(l, c);
          function f() {
            this.constructor = l;
          }
          l.prototype =
            c === null
              ? Object.create(c)
              : ((f.prototype = c.prototype), new f());
        };
      })();
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.AnimationFrameAction = void 0);
    var n = _l(),
      o = u_(),
      a = (function (u) {
        t(l, u);
        function l(c, f) {
          var d = u.call(this, c, f) || this;
          return (d.scheduler = c), (d.work = f), d;
        }
        return (
          (l.prototype.requestAsyncId = function (c, f, d) {
            return (
              d === void 0 && (d = 0),
              d !== null && d > 0
                ? u.prototype.requestAsyncId.call(this, c, f, d)
                : (c.actions.push(this),
                  c._scheduled ||
                    (c._scheduled =
                      o.animationFrameProvider.requestAnimationFrame(
                        function () {
                          return c.flush(void 0);
                        }
                      )))
            );
          }),
          (l.prototype.recycleAsyncId = function (c, f, d) {
            if (
              (d === void 0 && (d = 0),
              (d != null && d > 0) || (d == null && this.delay > 0))
            )
              return u.prototype.recycleAsyncId.call(this, c, f, d);
            c.actions.some(function (v) {
              return v.id === f;
            }) ||
              (o.animationFrameProvider.cancelAnimationFrame(f),
              (c._scheduled = void 0));
          }),
          l
        );
      })(n.AsyncAction);
    e.AnimationFrameAction = a;
  }),
  BA = E((e) => {
    var t =
      (e && e.__extends) ||
      (function () {
        var a = function (u, l) {
          return (
            (a =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (c, f) {
                  c.__proto__ = f;
                }) ||
              function (c, f) {
                for (var d in f)
                  Object.prototype.hasOwnProperty.call(f, d) && (c[d] = f[d]);
              }),
            a(u, l)
          );
        };
        return function (u, l) {
          if (typeof l != "function" && l !== null)
            throw new TypeError(
              "Class extends value " +
                String(l) +
                " is not a constructor or null"
            );
          a(u, l);
          function c() {
            this.constructor = u;
          }
          u.prototype =
            l === null
              ? Object.create(l)
              : ((c.prototype = l.prototype), new c());
        };
      })();
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.AnimationFrameScheduler = void 0);
    var n = Ol(),
      o = (function (a) {
        t(u, a);
        function u() {
          return (a !== null && a.apply(this, arguments)) || this;
        }
        return (
          (u.prototype.flush = function (l) {
            this._active = !0;
            var c = this._scheduled;
            this._scheduled = void 0;
            var f = this.actions,
              d;
            l = l || f.shift();
            do if ((d = l.execute(l.state, l.delay))) break;
            while ((l = f[0]) && l.id === c && f.shift());
            if (((this._active = !1), d)) {
              for (; (l = f[0]) && l.id === c && f.shift(); ) l.unsubscribe();
              throw d;
            }
          }),
          u
        );
      })(n.AsyncScheduler);
    e.AnimationFrameScheduler = o;
  }),
  DA = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.animationFrame = e.animationFrameScheduler = void 0);
    var t = LA(),
      n = BA();
    (e.animationFrameScheduler = new n.AnimationFrameScheduler(
      t.AnimationFrameAction
    )),
      (e.animationFrame = e.animationFrameScheduler);
  }),
  UA = E((e) => {
    var t =
      (e && e.__extends) ||
      (function () {
        var c = function (f, d) {
          return (
            (c =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (v, m) {
                  v.__proto__ = m;
                }) ||
              function (v, m) {
                for (var h in m)
                  Object.prototype.hasOwnProperty.call(m, h) && (v[h] = m[h]);
              }),
            c(f, d)
          );
        };
        return function (f, d) {
          if (typeof d != "function" && d !== null)
            throw new TypeError(
              "Class extends value " +
                String(d) +
                " is not a constructor or null"
            );
          c(f, d);
          function v() {
            this.constructor = f;
          }
          f.prototype =
            d === null
              ? Object.create(d)
              : ((v.prototype = d.prototype), new v());
        };
      })();
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.VirtualAction = e.VirtualTimeScheduler = void 0);
    var n = _l(),
      o = fr(),
      a = Ol(),
      u = (function (c) {
        t(f, c);
        function f(d, v) {
          d === void 0 && (d = l), v === void 0 && (v = 1 / 0);
          var m =
            c.call(this, d, function () {
              return m.frame;
            }) || this;
          return (m.maxFrames = v), (m.frame = 0), (m.index = -1), m;
        }
        return (
          (f.prototype.flush = function () {
            for (
              var d = this, v = d.actions, m = d.maxFrames, h, g;
              (g = v[0]) &&
              g.delay <= m &&
              (v.shift(),
              (this.frame = g.delay),
              !(h = g.execute(g.state, g.delay)));

            );
            if (h) {
              for (; (g = v.shift()); ) g.unsubscribe();
              throw h;
            }
          }),
          (f.frameTimeFactor = 10),
          f
        );
      })(a.AsyncScheduler);
    e.VirtualTimeScheduler = u;
    var l = (function (c) {
      t(f, c);
      function f(d, v, m) {
        m === void 0 && (m = d.index += 1);
        var h = c.call(this, d, v) || this;
        return (
          (h.scheduler = d),
          (h.work = v),
          (h.index = m),
          (h.active = !0),
          (h.index = d.index = m),
          h
        );
      }
      return (
        (f.prototype.schedule = function (d, v) {
          if ((v === void 0 && (v = 0), Number.isFinite(v))) {
            if (!this.id) return c.prototype.schedule.call(this, d, v);
            this.active = !1;
            var m = new f(this.scheduler, this.work);
            return this.add(m), m.schedule(d, v);
          } else return o.Subscription.EMPTY;
        }),
        (f.prototype.requestAsyncId = function (d, v, m) {
          m === void 0 && (m = 0), (this.delay = d.frame + m);
          var h = d.actions;
          return h.push(this), h.sort(f.sortActions), !0;
        }),
        (f.prototype.recycleAsyncId = function (d, v, m) {}),
        (f.prototype._execute = function (d, v) {
          if (this.active === !0) return c.prototype._execute.call(this, d, v);
        }),
        (f.sortActions = function (d, v) {
          return d.delay === v.delay
            ? d.index === v.index
              ? 0
              : d.index > v.index
              ? 1
              : -1
            : d.delay > v.delay
            ? 1
            : -1;
        }),
        f
      );
    })(n.AsyncAction);
    e.VirtualAction = l;
  }),
  Xr = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.empty = e.EMPTY = void 0);
    var t = Ze();
    e.EMPTY = new t.Observable(function (a) {
      return a.complete();
    });
    function n(a) {
      return a ? o(a) : e.EMPTY;
    }
    e.empty = n;
    function o(a) {
      return new t.Observable(function (u) {
        return a.schedule(function () {
          return u.complete();
        });
      });
    }
  }),
  Wc = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.isScheduler = void 0);
    var t = Ke();
    function n(o) {
      return o && t.isFunction(o.schedule);
    }
    e.isScheduler = n;
  }),
  pr = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.popNumber = e.popScheduler = e.popResultSelector = void 0);
    var t = Ke(),
      n = Wc();
    function o(c) {
      return c[c.length - 1];
    }
    function a(c) {
      return t.isFunction(o(c)) ? c.pop() : void 0;
    }
    e.popResultSelector = a;
    function u(c) {
      return n.isScheduler(o(c)) ? c.pop() : void 0;
    }
    e.popScheduler = u;
    function l(c, f) {
      return typeof o(c) == "number" ? c.pop() : f;
    }
    e.popNumber = l;
  }),
  Fv = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.isArrayLike = void 0),
      (e.isArrayLike = function (t) {
        return t && typeof t.length == "number" && typeof t != "function";
      });
  }),
  f_ = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.isPromise = void 0);
    var t = Ke();
    function n(o) {
      return t.isFunction(o?.then);
    }
    e.isPromise = n;
  }),
  d_ = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.isInteropObservable = void 0);
    var t = Fc(),
      n = Ke();
    function o(a) {
      return n.isFunction(a[t.observable]);
    }
    e.isInteropObservable = o;
  }),
  p_ = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.isAsyncIterable = void 0);
    var t = Ke();
    function n(o) {
      return Symbol.asyncIterator && t.isFunction(o?.[Symbol.asyncIterator]);
    }
    e.isAsyncIterable = n;
  }),
  v_ = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.createInvalidObservableTypeError = void 0);
    function t(n) {
      return new TypeError(
        "You provided " +
          (n !== null && typeof n == "object"
            ? "an invalid object"
            : "'" + n + "'") +
          " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable."
      );
    }
    e.createInvalidObservableTypeError = t;
  }),
  h_ = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.iterator = e.getSymbolIterator = void 0);
    function t() {
      return typeof Symbol != "function" || !Symbol.iterator
        ? "@@iterator"
        : Symbol.iterator;
    }
    (e.getSymbolIterator = t), (e.iterator = t());
  }),
  m_ = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.isIterable = void 0);
    var t = h_(),
      n = Ke();
    function o(a) {
      return n.isFunction(a?.[t.iterator]);
    }
    e.isIterable = o;
  }),
  $v = E((e) => {
    var t =
        (e && e.__generator) ||
        function (c, f) {
          var d = {
              label: 0,
              sent: function () {
                if (h[0] & 1) throw h[1];
                return h[1];
              },
              trys: [],
              ops: [],
            },
            v,
            m,
            h,
            g;
          return (
            (g = { next: w(0), throw: w(1), return: w(2) }),
            typeof Symbol == "function" &&
              (g[Symbol.iterator] = function () {
                return this;
              }),
            g
          );
          function w(S) {
            return function (O) {
              return x([S, O]);
            };
          }
          function x(S) {
            if (v) throw new TypeError("Generator is already executing.");
            for (; d; )
              try {
                if (
                  ((v = 1),
                  m &&
                    (h =
                      S[0] & 2
                        ? m.return
                        : S[0]
                        ? m.throw || ((h = m.return) && h.call(m), 0)
                        : m.next) &&
                    !(h = h.call(m, S[1])).done)
                )
                  return h;
                switch (((m = 0), h && (S = [S[0] & 2, h.value]), S[0])) {
                  case 0:
                  case 1:
                    h = S;
                    break;
                  case 4:
                    return d.label++, { value: S[1], done: !1 };
                  case 5:
                    d.label++, (m = S[1]), (S = [0]);
                    continue;
                  case 7:
                    (S = d.ops.pop()), d.trys.pop();
                    continue;
                  default:
                    if (
                      ((h = d.trys),
                      !(h = h.length > 0 && h[h.length - 1]) &&
                        (S[0] === 6 || S[0] === 2))
                    ) {
                      d = 0;
                      continue;
                    }
                    if (S[0] === 3 && (!h || (S[1] > h[0] && S[1] < h[3]))) {
                      d.label = S[1];
                      break;
                    }
                    if (S[0] === 6 && d.label < h[1]) {
                      (d.label = h[1]), (h = S);
                      break;
                    }
                    if (h && d.label < h[2]) {
                      (d.label = h[2]), d.ops.push(S);
                      break;
                    }
                    h[2] && d.ops.pop(), d.trys.pop();
                    continue;
                }
                S = f.call(c, d);
              } catch (O) {
                (S = [6, O]), (m = 0);
              } finally {
                v = h = 0;
              }
            if (S[0] & 5) throw S[1];
            return { value: S[0] ? S[1] : void 0, done: !0 };
          }
        },
      n =
        (e && e.__await) ||
        function (c) {
          return this instanceof n ? ((this.v = c), this) : new n(c);
        },
      o =
        (e && e.__asyncGenerator) ||
        function (c, f, d) {
          if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
          var v = d.apply(c, f || []),
            m,
            h = [];
          return (
            (m = {}),
            g("next"),
            g("throw"),
            g("return"),
            (m[Symbol.asyncIterator] = function () {
              return this;
            }),
            m
          );
          function g(k) {
            v[k] &&
              (m[k] = function (j) {
                return new Promise(function (C, D) {
                  h.push([k, j, C, D]) > 1 || w(k, j);
                });
              });
          }
          function w(k, j) {
            try {
              x(v[k](j));
            } catch (C) {
              A(h[0][3], C);
            }
          }
          function x(k) {
            k.value instanceof n
              ? Promise.resolve(k.value.v).then(S, O)
              : A(h[0][2], k);
          }
          function S(k) {
            w("next", k);
          }
          function O(k) {
            w("throw", k);
          }
          function A(k, j) {
            k(j), h.shift(), h.length && w(h[0][0], h[0][1]);
          }
        };
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.isReadableStreamLike = e.readableStreamLikeToAsyncGenerator = void 0);
    var a = Ke();
    function u(c) {
      return o(this, arguments, function () {
        var f, d, v, m;
        return t(this, function (h) {
          switch (h.label) {
            case 0:
              (f = c.getReader()), (h.label = 1);
            case 1:
              h.trys.push([1, , 9, 10]), (h.label = 2);
            case 2:
              return [4, n(f.read())];
            case 3:
              return (
                (d = h.sent()),
                (v = d.value),
                (m = d.done),
                m ? [4, n(void 0)] : [3, 5]
              );
            case 4:
              return [2, h.sent()];
            case 5:
              return [4, n(v)];
            case 6:
              return [4, h.sent()];
            case 7:
              return h.sent(), [3, 2];
            case 8:
              return [3, 10];
            case 9:
              return f.releaseLock(), [7];
            case 10:
              return [2];
          }
        });
      });
    }
    e.readableStreamLikeToAsyncGenerator = u;
    function l(c) {
      return a.isFunction(c?.getReader);
    }
    e.isReadableStreamLike = l;
  }),
  $e = E((e) => {
    var t =
        (e && e.__awaiter) ||
        function ($, F, V, re) {
          function he(Z) {
            return Z instanceof V
              ? Z
              : new V(function (ge) {
                  ge(Z);
                });
          }
          return new (V || (V = Promise))(function (Z, ge) {
            function Se(K) {
              try {
                ce(re.next(K));
              } catch (de) {
                ge(de);
              }
            }
            function we(K) {
              try {
                ce(re.throw(K));
              } catch (de) {
                ge(de);
              }
            }
            function ce(K) {
              K.done ? Z(K.value) : he(K.value).then(Se, we);
            }
            ce((re = re.apply($, F || [])).next());
          });
        },
      n =
        (e && e.__generator) ||
        function ($, F) {
          var V = {
              label: 0,
              sent: function () {
                if (Z[0] & 1) throw Z[1];
                return Z[1];
              },
              trys: [],
              ops: [],
            },
            re,
            he,
            Z,
            ge;
          return (
            (ge = { next: Se(0), throw: Se(1), return: Se(2) }),
            typeof Symbol == "function" &&
              (ge[Symbol.iterator] = function () {
                return this;
              }),
            ge
          );
          function Se(ce) {
            return function (K) {
              return we([ce, K]);
            };
          }
          function we(ce) {
            if (re) throw new TypeError("Generator is already executing.");
            for (; V; )
              try {
                if (
                  ((re = 1),
                  he &&
                    (Z =
                      ce[0] & 2
                        ? he.return
                        : ce[0]
                        ? he.throw || ((Z = he.return) && Z.call(he), 0)
                        : he.next) &&
                    !(Z = Z.call(he, ce[1])).done)
                )
                  return Z;
                switch (((he = 0), Z && (ce = [ce[0] & 2, Z.value]), ce[0])) {
                  case 0:
                  case 1:
                    Z = ce;
                    break;
                  case 4:
                    return V.label++, { value: ce[1], done: !1 };
                  case 5:
                    V.label++, (he = ce[1]), (ce = [0]);
                    continue;
                  case 7:
                    (ce = V.ops.pop()), V.trys.pop();
                    continue;
                  default:
                    if (
                      ((Z = V.trys),
                      !(Z = Z.length > 0 && Z[Z.length - 1]) &&
                        (ce[0] === 6 || ce[0] === 2))
                    ) {
                      V = 0;
                      continue;
                    }
                    if (ce[0] === 3 && (!Z || (ce[1] > Z[0] && ce[1] < Z[3]))) {
                      V.label = ce[1];
                      break;
                    }
                    if (ce[0] === 6 && V.label < Z[1]) {
                      (V.label = Z[1]), (Z = ce);
                      break;
                    }
                    if (Z && V.label < Z[2]) {
                      (V.label = Z[2]), V.ops.push(ce);
                      break;
                    }
                    Z[2] && V.ops.pop(), V.trys.pop();
                    continue;
                }
                ce = F.call($, V);
              } catch (K) {
                (ce = [6, K]), (he = 0);
              } finally {
                re = Z = 0;
              }
            if (ce[0] & 5) throw ce[1];
            return { value: ce[0] ? ce[1] : void 0, done: !0 };
          }
        },
      o =
        (e && e.__asyncValues) ||
        function ($) {
          if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
          var F = $[Symbol.asyncIterator],
            V;
          return F
            ? F.call($)
            : (($ = typeof a == "function" ? a($) : $[Symbol.iterator]()),
              (V = {}),
              re("next"),
              re("throw"),
              re("return"),
              (V[Symbol.asyncIterator] = function () {
                return this;
              }),
              V);
          function re(Z) {
            V[Z] =
              $[Z] &&
              function (ge) {
                return new Promise(function (Se, we) {
                  (ge = $[Z](ge)), he(Se, we, ge.done, ge.value);
                });
              };
          }
          function he(Z, ge, Se, we) {
            Promise.resolve(we).then(function (ce) {
              Z({ value: ce, done: Se });
            }, ge);
          }
        },
      a =
        (e && e.__values) ||
        function ($) {
          var F = typeof Symbol == "function" && Symbol.iterator,
            V = F && $[F],
            re = 0;
          if (V) return V.call($);
          if ($ && typeof $.length == "number")
            return {
              next: function () {
                return (
                  $ && re >= $.length && ($ = void 0),
                  { value: $ && $[re++], done: !$ }
                );
              },
            };
          throw new TypeError(
            F ? "Object is not iterable." : "Symbol.iterator is not defined."
          );
        };
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.fromReadableStreamLike =
        e.fromAsyncIterable =
        e.fromIterable =
        e.fromPromise =
        e.fromArrayLike =
        e.fromInteropObservable =
        e.innerFrom =
          void 0);
    var u = Fv(),
      l = f_(),
      c = Ze(),
      f = d_(),
      d = p_(),
      v = v_(),
      m = m_(),
      h = $v(),
      g = Ke(),
      w = i_(),
      x = Fc();
    function S($) {
      if ($ instanceof c.Observable) return $;
      if ($ != null) {
        if (f.isInteropObservable($)) return O($);
        if (u.isArrayLike($)) return A($);
        if (l.isPromise($)) return k($);
        if (d.isAsyncIterable($)) return C($);
        if (m.isIterable($)) return j($);
        if (h.isReadableStreamLike($)) return D($);
      }
      throw v.createInvalidObservableTypeError($);
    }
    e.innerFrom = S;
    function O($) {
      return new c.Observable(function (F) {
        var V = $[x.observable]();
        if (g.isFunction(V.subscribe)) return V.subscribe(F);
        throw new TypeError(
          "Provided object does not correctly implement Symbol.observable"
        );
      });
    }
    e.fromInteropObservable = O;
    function A($) {
      return new c.Observable(function (F) {
        for (var V = 0; V < $.length && !F.closed; V++) F.next($[V]);
        F.complete();
      });
    }
    e.fromArrayLike = A;
    function k($) {
      return new c.Observable(function (F) {
        $.then(
          function (V) {
            F.closed || (F.next(V), F.complete());
          },
          function (V) {
            return F.error(V);
          }
        ).then(null, w.reportUnhandledError);
      });
    }
    e.fromPromise = k;
    function j($) {
      return new c.Observable(function (F) {
        var V, re;
        try {
          for (var he = a($), Z = he.next(); !Z.done; Z = he.next()) {
            var ge = Z.value;
            if ((F.next(ge), F.closed)) return;
          }
        } catch (Se) {
          V = { error: Se };
        } finally {
          try {
            Z && !Z.done && (re = he.return) && re.call(he);
          } finally {
            if (V) throw V.error;
          }
        }
        F.complete();
      });
    }
    e.fromIterable = j;
    function C($) {
      return new c.Observable(function (F) {
        W($, F).catch(function (V) {
          return F.error(V);
        });
      });
    }
    e.fromAsyncIterable = C;
    function D($) {
      return C(h.readableStreamLikeToAsyncGenerator($));
    }
    e.fromReadableStreamLike = D;
    function W($, F) {
      var V, re, he, Z;
      return t(this, void 0, void 0, function () {
        var ge, Se;
        return n(this, function (we) {
          switch (we.label) {
            case 0:
              we.trys.push([0, 5, 6, 11]), (V = o($)), (we.label = 1);
            case 1:
              return [4, V.next()];
            case 2:
              if (((re = we.sent()), !!re.done)) return [3, 4];
              if (((ge = re.value), F.next(ge), F.closed)) return [2];
              we.label = 3;
            case 3:
              return [3, 1];
            case 4:
              return [3, 11];
            case 5:
              return (Se = we.sent()), (he = { error: Se }), [3, 11];
            case 6:
              return (
                we.trys.push([6, , 9, 10]),
                re && !re.done && (Z = V.return) ? [4, Z.call(V)] : [3, 8]
              );
            case 7:
              we.sent(), (we.label = 8);
            case 8:
              return [3, 10];
            case 9:
              if (he) throw he.error;
              return [7];
            case 10:
              return [7];
            case 11:
              return F.complete(), [2];
          }
        });
      });
    }
  }),
  zo = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.executeSchedule = void 0);
    function t(n, o, a, u, l) {
      u === void 0 && (u = 0), l === void 0 && (l = !1);
      var c = o.schedule(function () {
        a(), l ? n.add(this.schedule(null, u)) : this.unsubscribe();
      }, u);
      if ((n.add(c), !l)) return c;
    }
    e.executeSchedule = t;
  }),
  qc = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.observeOn = void 0);
    var t = zo(),
      n = te(),
      o = pe();
    function a(u, l) {
      return (
        l === void 0 && (l = 0),
        n.operate(function (c, f) {
          c.subscribe(
            o.createOperatorSubscriber(
              f,
              function (d) {
                return t.executeSchedule(
                  f,
                  u,
                  function () {
                    return f.next(d);
                  },
                  l
                );
              },
              function () {
                return t.executeSchedule(
                  f,
                  u,
                  function () {
                    return f.complete();
                  },
                  l
                );
              },
              function (d) {
                return t.executeSchedule(
                  f,
                  u,
                  function () {
                    return f.error(d);
                  },
                  l
                );
              }
            )
          );
        })
      );
    }
    e.observeOn = a;
  }),
  Kc = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.subscribeOn = void 0);
    var t = te();
    function n(o, a) {
      return (
        a === void 0 && (a = 0),
        t.operate(function (u, l) {
          l.add(
            o.schedule(function () {
              return u.subscribe(l);
            }, a)
          );
        })
      );
    }
    e.subscribeOn = n;
  }),
  FA = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.scheduleObservable = void 0);
    var t = $e(),
      n = qc(),
      o = Kc();
    function a(u, l) {
      return t.innerFrom(u).pipe(o.subscribeOn(l), n.observeOn(l));
    }
    e.scheduleObservable = a;
  }),
  $A = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.schedulePromise = void 0);
    var t = $e(),
      n = qc(),
      o = Kc();
    function a(u, l) {
      return t.innerFrom(u).pipe(o.subscribeOn(l), n.observeOn(l));
    }
    e.schedulePromise = a;
  }),
  VA = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.scheduleArray = void 0);
    var t = Ze();
    function n(o, a) {
      return new t.Observable(function (u) {
        var l = 0;
        return a.schedule(function () {
          l === o.length
            ? u.complete()
            : (u.next(o[l++]), u.closed || this.schedule());
        });
      });
    }
    e.scheduleArray = n;
  }),
  b_ = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.scheduleIterable = void 0);
    var t = Ze(),
      n = h_(),
      o = Ke(),
      a = zo();
    function u(l, c) {
      return new t.Observable(function (f) {
        var d;
        return (
          a.executeSchedule(f, c, function () {
            (d = l[n.iterator]()),
              a.executeSchedule(
                f,
                c,
                function () {
                  var v, m, h;
                  try {
                    (v = d.next()), (m = v.value), (h = v.done);
                  } catch (g) {
                    f.error(g);
                    return;
                  }
                  h ? f.complete() : f.next(m);
                },
                0,
                !0
              );
          }),
          function () {
            return o.isFunction(d?.return) && d.return();
          }
        );
      });
    }
    e.scheduleIterable = u;
  }),
  y_ = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.scheduleAsyncIterable = void 0);
    var t = Ze(),
      n = zo();
    function o(a, u) {
      if (!a) throw new Error("Iterable cannot be null");
      return new t.Observable(function (l) {
        n.executeSchedule(l, u, function () {
          var c = a[Symbol.asyncIterator]();
          n.executeSchedule(
            l,
            u,
            function () {
              c.next().then(function (f) {
                f.done ? l.complete() : l.next(f.value);
              });
            },
            0,
            !0
          );
        });
      });
    }
    e.scheduleAsyncIterable = o;
  }),
  WA = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.scheduleReadableStreamLike = void 0);
    var t = y_(),
      n = $v();
    function o(a, u) {
      return t.scheduleAsyncIterable(
        n.readableStreamLikeToAsyncGenerator(a),
        u
      );
    }
    e.scheduleReadableStreamLike = o;
  }),
  g_ = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.scheduled = void 0);
    var t = FA(),
      n = $A(),
      o = VA(),
      a = b_(),
      u = y_(),
      l = d_(),
      c = f_(),
      f = Fv(),
      d = m_(),
      v = p_(),
      m = v_(),
      h = $v(),
      g = WA();
    function w(x, S) {
      if (x != null) {
        if (l.isInteropObservable(x)) return t.scheduleObservable(x, S);
        if (f.isArrayLike(x)) return o.scheduleArray(x, S);
        if (c.isPromise(x)) return n.schedulePromise(x, S);
        if (v.isAsyncIterable(x)) return u.scheduleAsyncIterable(x, S);
        if (d.isIterable(x)) return a.scheduleIterable(x, S);
        if (h.isReadableStreamLike(x))
          return g.scheduleReadableStreamLike(x, S);
      }
      throw m.createInvalidObservableTypeError(x);
    }
    e.scheduled = w;
  }),
  On = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.from = void 0);
    var t = g_(),
      n = $e();
    function o(a, u) {
      return u ? t.scheduled(a, u) : n.innerFrom(a);
    }
    e.from = o;
  }),
  Vv = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.of = void 0);
    var t = pr(),
      n = On();
    function o() {
      for (var a = [], u = 0; u < arguments.length; u++) a[u] = arguments[u];
      var l = t.popScheduler(a);
      return n.from(a, l);
    }
    e.of = o;
  }),
  w_ = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.throwError = void 0);
    var t = Ze(),
      n = Ke();
    function o(a, u) {
      var l = n.isFunction(a)
          ? a
          : function () {
              return a;
            },
        c = function (f) {
          return f.error(l());
        };
      return new t.Observable(
        u
          ? function (f) {
              return u.schedule(c, 0, f);
            }
          : c
      );
    }
    e.throwError = o;
  }),
  Wv = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.observeNotification = e.Notification = e.NotificationKind = void 0);
    var t = Xr(),
      n = Vv(),
      o = w_(),
      a = Ke();
    (function (c) {
      (c.NEXT = "N"), (c.ERROR = "E"), (c.COMPLETE = "C");
    })(e.NotificationKind || (e.NotificationKind = {}));
    var u = (function () {
      function c(f, d, v) {
        (this.kind = f),
          (this.value = d),
          (this.error = v),
          (this.hasValue = f === "N");
      }
      return (
        (c.prototype.observe = function (f) {
          return l(this, f);
        }),
        (c.prototype.do = function (f, d, v) {
          var m = this,
            h = m.kind,
            g = m.value,
            w = m.error;
          return h === "N" ? f?.(g) : h === "E" ? d?.(w) : v?.();
        }),
        (c.prototype.accept = function (f, d, v) {
          var m;
          return a.isFunction(
            (m = f) === null || m === void 0 ? void 0 : m.next
          )
            ? this.observe(f)
            : this.do(f, d, v);
        }),
        (c.prototype.toObservable = function () {
          var f = this,
            d = f.kind,
            v = f.value,
            m = f.error,
            h =
              d === "N"
                ? n.of(v)
                : d === "E"
                ? o.throwError(function () {
                    return m;
                  })
                : d === "C"
                ? t.EMPTY
                : 0;
          if (!h) throw new TypeError("Unexpected notification kind " + d);
          return h;
        }),
        (c.createNext = function (f) {
          return new c("N", f);
        }),
        (c.createError = function (f) {
          return new c("E", void 0, f);
        }),
        (c.createComplete = function () {
          return c.completeNotification;
        }),
        (c.completeNotification = new c("C")),
        c
      );
    })();
    e.Notification = u;
    function l(c, f) {
      var d,
        v,
        m,
        h = c,
        g = h.kind,
        w = h.value,
        x = h.error;
      if (typeof g != "string")
        throw new TypeError('Invalid notification, missing "kind"');
      g === "N"
        ? (d = f.next) === null || d === void 0 || d.call(f, w)
        : g === "E"
        ? (v = f.error) === null || v === void 0 || v.call(f, x)
        : (m = f.complete) === null || m === void 0 || m.call(f);
    }
    e.observeNotification = l;
  }),
  qA = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.isObservable = void 0);
    var t = Ze(),
      n = Ke();
    function o(a) {
      return (
        !!a &&
        (a instanceof t.Observable ||
          (n.isFunction(a.lift) && n.isFunction(a.subscribe)))
      );
    }
    e.isObservable = o;
  }),
  ji = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.EmptyError = void 0);
    var t = ki();
    e.EmptyError = t.createErrorClass(function (n) {
      return function () {
        n(this),
          (this.name = "EmptyError"),
          (this.message = "no elements in sequence");
      };
    });
  }),
  KA = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.lastValueFrom = void 0);
    var t = ji();
    function n(o, a) {
      var u = typeof a == "object";
      return new Promise(function (l, c) {
        var f = !1,
          d;
        o.subscribe({
          next: function (v) {
            (d = v), (f = !0);
          },
          error: c,
          complete: function () {
            f ? l(d) : u ? l(a.defaultValue) : c(new t.EmptyError());
          },
        });
      });
    }
    e.lastValueFrom = n;
  }),
  HA = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.firstValueFrom = void 0);
    var t = ji(),
      n = wl();
    function o(a, u) {
      var l = typeof u == "object";
      return new Promise(function (c, f) {
        var d = new n.SafeSubscriber({
          next: function (v) {
            c(v), d.unsubscribe();
          },
          error: f,
          complete: function () {
            l ? c(u.defaultValue) : f(new t.EmptyError());
          },
        });
        a.subscribe(d);
      });
    }
    e.firstValueFrom = o;
  }),
  __ = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.ArgumentOutOfRangeError = void 0);
    var t = ki();
    e.ArgumentOutOfRangeError = t.createErrorClass(function (n) {
      return function () {
        n(this),
          (this.name = "ArgumentOutOfRangeError"),
          (this.message = "argument out of range");
      };
    });
  }),
  O_ = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.NotFoundError = void 0);
    var t = ki();
    e.NotFoundError = t.createErrorClass(function (n) {
      return function (o) {
        n(this), (this.name = "NotFoundError"), (this.message = o);
      };
    });
  }),
  x_ = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.SequenceError = void 0);
    var t = ki();
    e.SequenceError = t.createErrorClass(function (n) {
      return function (o) {
        n(this), (this.name = "SequenceError"), (this.message = o);
      };
    });
  }),
  qv = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.isValidDate = void 0);
    function t(n) {
      return n instanceof Date && !isNaN(n);
    }
    e.isValidDate = t;
  }),
  Hp = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.timeout = e.TimeoutError = void 0);
    var t = dr(),
      n = qv(),
      o = te(),
      a = $e(),
      u = ki(),
      l = pe(),
      c = zo();
    e.TimeoutError = u.createErrorClass(function (v) {
      return function (m) {
        m === void 0 && (m = null),
          v(this),
          (this.message = "Timeout has occurred"),
          (this.name = "TimeoutError"),
          (this.info = m);
      };
    });
    function f(v, m) {
      var h = n.isValidDate(v)
          ? { first: v }
          : typeof v == "number"
          ? { each: v }
          : v,
        g = h.first,
        w = h.each,
        x = h.with,
        S = x === void 0 ? d : x,
        O = h.scheduler,
        A = O === void 0 ? m ?? t.asyncScheduler : O,
        k = h.meta,
        j = k === void 0 ? null : k;
      if (g == null && w == null) throw new TypeError("No timeout provided.");
      return o.operate(function (C, D) {
        var W,
          $,
          F = null,
          V = 0,
          re = function (he) {
            $ = c.executeSchedule(
              D,
              A,
              function () {
                try {
                  W.unsubscribe(),
                    a
                      .innerFrom(S({ meta: j, lastValue: F, seen: V }))
                      .subscribe(D);
                } catch (Z) {
                  D.error(Z);
                }
              },
              he
            );
          };
        (W = C.subscribe(
          l.createOperatorSubscriber(
            D,
            function (he) {
              $?.unsubscribe(), V++, D.next((F = he)), w > 0 && re(w);
            },
            void 0,
            void 0,
            function () {
              $?.closed || $?.unsubscribe(), (F = null);
            }
          )
        )),
          !V && re(g != null ? (typeof g == "number" ? g : +g - A.now()) : w);
      });
    }
    e.timeout = f;
    function d(v) {
      throw new e.TimeoutError(v);
    }
  }),
  Ai = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.map = void 0);
    var t = te(),
      n = pe();
    function o(a, u) {
      return t.operate(function (l, c) {
        var f = 0;
        l.subscribe(
          n.createOperatorSubscriber(c, function (d) {
            c.next(a.call(u, d, f++));
          })
        );
      });
    }
    e.map = o;
  }),
  Ii = E((e) => {
    var t =
        (e && e.__read) ||
        function (c, f) {
          var d = typeof Symbol == "function" && c[Symbol.iterator];
          if (!d) return c;
          var v = d.call(c),
            m,
            h = [],
            g;
          try {
            for (; (f === void 0 || f-- > 0) && !(m = v.next()).done; )
              h.push(m.value);
          } catch (w) {
            g = { error: w };
          } finally {
            try {
              m && !m.done && (d = v.return) && d.call(v);
            } finally {
              if (g) throw g.error;
            }
          }
          return h;
        },
      n =
        (e && e.__spreadArray) ||
        function (c, f) {
          for (var d = 0, v = f.length, m = c.length; d < v; d++, m++)
            c[m] = f[d];
          return c;
        };
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.mapOneOrManyArgs = void 0);
    var o = Ai(),
      a = Array.isArray;
    function u(c, f) {
      return a(f) ? c.apply(void 0, n([], t(f))) : c(f);
    }
    function l(c) {
      return o.map(function (f) {
        return u(c, f);
      });
    }
    e.mapOneOrManyArgs = l;
  }),
  S_ = E((e) => {
    var t =
        (e && e.__read) ||
        function (v, m) {
          var h = typeof Symbol == "function" && v[Symbol.iterator];
          if (!h) return v;
          var g = h.call(v),
            w,
            x = [],
            S;
          try {
            for (; (m === void 0 || m-- > 0) && !(w = g.next()).done; )
              x.push(w.value);
          } catch (O) {
            S = { error: O };
          } finally {
            try {
              w && !w.done && (h = g.return) && h.call(g);
            } finally {
              if (S) throw S.error;
            }
          }
          return x;
        },
      n =
        (e && e.__spreadArray) ||
        function (v, m) {
          for (var h = 0, g = m.length, w = v.length; h < g; h++, w++)
            v[w] = m[h];
          return v;
        };
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.bindCallbackInternals = void 0);
    var o = Wc(),
      a = Ze(),
      u = Kc(),
      l = Ii(),
      c = qc(),
      f = Uv();
    function d(v, m, h, g) {
      if (h)
        if (o.isScheduler(h)) g = h;
        else
          return function () {
            for (var w = [], x = 0; x < arguments.length; x++)
              w[x] = arguments[x];
            return d(v, m, g).apply(this, w).pipe(l.mapOneOrManyArgs(h));
          };
      return g
        ? function () {
            for (var w = [], x = 0; x < arguments.length; x++)
              w[x] = arguments[x];
            return d(v, m)
              .apply(this, w)
              .pipe(u.subscribeOn(g), c.observeOn(g));
          }
        : function () {
            for (var w = this, x = [], S = 0; S < arguments.length; S++)
              x[S] = arguments[S];
            var O = new f.AsyncSubject(),
              A = !0;
            return new a.Observable(function (k) {
              var j = O.subscribe(k);
              if (A) {
                A = !1;
                var C = !1,
                  D = !1;
                m.apply(
                  w,
                  n(n([], t(x)), [
                    function () {
                      for (var W = [], $ = 0; $ < arguments.length; $++)
                        W[$] = arguments[$];
                      if (v) {
                        var F = W.shift();
                        if (F != null) {
                          O.error(F);
                          return;
                        }
                      }
                      O.next(1 < W.length ? W : W[0]),
                        (D = !0),
                        C && O.complete();
                    },
                  ])
                ),
                  D && O.complete(),
                  (C = !0);
              }
              return j;
            });
          };
    }
    e.bindCallbackInternals = d;
  }),
  XA = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.bindCallback = void 0);
    var t = S_();
    function n(o, a, u) {
      return t.bindCallbackInternals(!1, o, a, u);
    }
    e.bindCallback = n;
  }),
  QA = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.bindNodeCallback = void 0);
    var t = S_();
    function n(o, a, u) {
      return t.bindCallbackInternals(!0, o, a, u);
    }
    e.bindNodeCallback = n;
  }),
  P_ = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.argsArgArrayOrObject = void 0);
    var t = Array.isArray,
      n = Object.getPrototypeOf,
      o = Object.prototype,
      a = Object.keys;
    function u(c) {
      if (c.length === 1) {
        var f = c[0];
        if (t(f)) return { args: f, keys: null };
        if (l(f)) {
          var d = a(f);
          return {
            args: d.map(function (v) {
              return f[v];
            }),
            keys: d,
          };
        }
      }
      return { args: c, keys: null };
    }
    e.argsArgArrayOrObject = u;
    function l(c) {
      return c && typeof c == "object" && n(c) === o;
    }
  }),
  E_ = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.createObject = void 0);
    function t(n, o) {
      return n.reduce(function (a, u, l) {
        return (a[u] = o[l]), a;
      }, {});
    }
    e.createObject = t;
  }),
  Kv = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.combineLatestInit = e.combineLatest = void 0);
    var t = Ze(),
      n = P_(),
      o = On(),
      a = Kt(),
      u = Ii(),
      l = pr(),
      c = E_(),
      f = pe(),
      d = zo();
    function v() {
      for (var g = [], w = 0; w < arguments.length; w++) g[w] = arguments[w];
      var x = l.popScheduler(g),
        S = l.popResultSelector(g),
        O = n.argsArgArrayOrObject(g),
        A = O.args,
        k = O.keys;
      if (A.length === 0) return o.from([], x);
      var j = new t.Observable(
        m(
          A,
          x,
          k
            ? function (C) {
                return c.createObject(k, C);
              }
            : a.identity
        )
      );
      return S ? j.pipe(u.mapOneOrManyArgs(S)) : j;
    }
    e.combineLatest = v;
    function m(g, w, x) {
      return (
        x === void 0 && (x = a.identity),
        function (S) {
          h(
            w,
            function () {
              for (
                var O = g.length,
                  A = new Array(O),
                  k = O,
                  j = O,
                  C = function (W) {
                    h(
                      w,
                      function () {
                        var $ = o.from(g[W], w),
                          F = !1;
                        $.subscribe(
                          f.createOperatorSubscriber(
                            S,
                            function (V) {
                              (A[W] = V),
                                F || ((F = !0), j--),
                                j || S.next(x(A.slice()));
                            },
                            function () {
                              --k || S.complete();
                            }
                          )
                        );
                      },
                      S
                    );
                  },
                  D = 0;
                D < O;
                D++
              )
                C(D);
            },
            S
          );
        }
      );
    }
    e.combineLatestInit = m;
    function h(g, w, x) {
      g ? d.executeSchedule(x, g, w) : w();
    }
  }),
  Hv = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.mergeInternals = void 0);
    var t = $e(),
      n = zo(),
      o = pe();
    function a(u, l, c, f, d, v, m, h) {
      var g = [],
        w = 0,
        x = 0,
        S = !1,
        O = function () {
          S && !g.length && !w && l.complete();
        },
        A = function (j) {
          return w < f ? k(j) : g.push(j);
        },
        k = function (j) {
          v && l.next(j), w++;
          var C = !1;
          t.innerFrom(c(j, x++)).subscribe(
            o.createOperatorSubscriber(
              l,
              function (D) {
                d?.(D), v ? A(D) : l.next(D);
              },
              function () {
                C = !0;
              },
              void 0,
              function () {
                if (C)
                  try {
                    w--;
                    for (
                      var D = function () {
                        var W = g.shift();
                        m
                          ? n.executeSchedule(l, m, function () {
                              return k(W);
                            })
                          : k(W);
                      };
                      g.length && w < f;

                    )
                      D();
                    O();
                  } catch (W) {
                    l.error(W);
                  }
              }
            )
          );
        };
      return (
        u.subscribe(
          o.createOperatorSubscriber(l, A, function () {
            (S = !0), O();
          })
        ),
        function () {
          h?.();
        }
      );
    }
    e.mergeInternals = a;
  }),
  Ro = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.mergeMap = void 0);
    var t = Ai(),
      n = $e(),
      o = te(),
      a = Hv(),
      u = Ke();
    function l(c, f, d) {
      return (
        d === void 0 && (d = 1 / 0),
        u.isFunction(f)
          ? l(function (v, m) {
              return t.map(function (h, g) {
                return f(v, h, m, g);
              })(n.innerFrom(c(v, m)));
            }, d)
          : (typeof f == "number" && (d = f),
            o.operate(function (v, m) {
              return a.mergeInternals(v, m, c, d);
            }))
      );
    }
    e.mergeMap = l;
  }),
  Hc = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.mergeAll = void 0);
    var t = Ro(),
      n = Kt();
    function o(a) {
      return a === void 0 && (a = 1 / 0), t.mergeMap(n.identity, a);
    }
    e.mergeAll = o;
  }),
  Xv = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.concatAll = void 0);
    var t = Hc();
    function n() {
      return t.mergeAll(1);
    }
    e.concatAll = n;
  }),
  Xc = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.concat = void 0);
    var t = Xv(),
      n = pr(),
      o = On();
    function a() {
      for (var u = [], l = 0; l < arguments.length; l++) u[l] = arguments[l];
      return t.concatAll()(o.from(u, n.popScheduler(u)));
    }
    e.concat = a;
  }),
  Qc = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.defer = void 0);
    var t = Ze(),
      n = $e();
    function o(a) {
      return new t.Observable(function (u) {
        n.innerFrom(a()).subscribe(u);
      });
    }
    e.defer = o;
  }),
  YA = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.connectable = void 0);
    var t = Ft(),
      n = Ze(),
      o = Qc(),
      a = {
        connector: function () {
          return new t.Subject();
        },
        resetOnDisconnect: !0,
      };
    function u(l, c) {
      c === void 0 && (c = a);
      var f = null,
        d = c.connector,
        v = c.resetOnDisconnect,
        m = v === void 0 ? !0 : v,
        h = d(),
        g = new n.Observable(function (w) {
          return h.subscribe(w);
        });
      return (
        (g.connect = function () {
          return (
            (!f || f.closed) &&
              ((f = o
                .defer(function () {
                  return l;
                })
                .subscribe(h)),
              m &&
                f.add(function () {
                  return (h = d());
                })),
            f
          );
        }),
        g
      );
    }
    e.connectable = u;
  }),
  JA = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.forkJoin = void 0);
    var t = Ze(),
      n = P_(),
      o = $e(),
      a = pr(),
      u = pe(),
      l = Ii(),
      c = E_();
    function f() {
      for (var d = [], v = 0; v < arguments.length; v++) d[v] = arguments[v];
      var m = a.popResultSelector(d),
        h = n.argsArgArrayOrObject(d),
        g = h.args,
        w = h.keys,
        x = new t.Observable(function (S) {
          var O = g.length;
          if (!O) {
            S.complete();
            return;
          }
          for (
            var A = new Array(O),
              k = O,
              j = O,
              C = function (W) {
                var $ = !1;
                o.innerFrom(g[W]).subscribe(
                  u.createOperatorSubscriber(
                    S,
                    function (F) {
                      $ || (($ = !0), j--), (A[W] = F);
                    },
                    function () {
                      return k--;
                    },
                    void 0,
                    function () {
                      (!k || !$) &&
                        (j || S.next(w ? c.createObject(w, A) : A),
                        S.complete());
                    }
                  )
                );
              },
              D = 0;
            D < O;
            D++
          )
            C(D);
        });
      return m ? x.pipe(l.mapOneOrManyArgs(m)) : x;
    }
    e.forkJoin = f;
  }),
  GA = E((e) => {
    var t =
      (e && e.__read) ||
      function (S, O) {
        var A = typeof Symbol == "function" && S[Symbol.iterator];
        if (!A) return S;
        var k = A.call(S),
          j,
          C = [],
          D;
        try {
          for (; (O === void 0 || O-- > 0) && !(j = k.next()).done; )
            C.push(j.value);
        } catch (W) {
          D = { error: W };
        } finally {
          try {
            j && !j.done && (A = k.return) && A.call(k);
          } finally {
            if (D) throw D.error;
          }
        }
        return C;
      };
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.fromEvent = void 0);
    var n = $e(),
      o = Ze(),
      a = Ro(),
      u = Fv(),
      l = Ke(),
      c = Ii(),
      f = ["addListener", "removeListener"],
      d = ["addEventListener", "removeEventListener"],
      v = ["on", "off"];
    function m(S, O, A, k) {
      if ((l.isFunction(A) && ((k = A), (A = void 0)), k))
        return m(S, O, A).pipe(c.mapOneOrManyArgs(k));
      var j = t(
          x(S)
            ? d.map(function (W) {
                return function ($) {
                  return S[W](O, $, A);
                };
              })
            : g(S)
            ? f.map(h(S, O))
            : w(S)
            ? v.map(h(S, O))
            : [],
          2
        ),
        C = j[0],
        D = j[1];
      if (!C && u.isArrayLike(S))
        return a.mergeMap(function (W) {
          return m(W, O, A);
        })(n.innerFrom(S));
      if (!C) throw new TypeError("Invalid event target");
      return new o.Observable(function (W) {
        var $ = function () {
          for (var F = [], V = 0; V < arguments.length; V++)
            F[V] = arguments[V];
          return W.next(1 < F.length ? F : F[0]);
        };
        return (
          C($),
          function () {
            return D($);
          }
        );
      });
    }
    e.fromEvent = m;
    function h(S, O) {
      return function (A) {
        return function (k) {
          return S[A](O, k);
        };
      };
    }
    function g(S) {
      return l.isFunction(S.addListener) && l.isFunction(S.removeListener);
    }
    function w(S) {
      return l.isFunction(S.on) && l.isFunction(S.off);
    }
    function x(S) {
      return (
        l.isFunction(S.addEventListener) && l.isFunction(S.removeEventListener)
      );
    }
  }),
  ZA = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.fromEventPattern = void 0);
    var t = Ze(),
      n = Ke(),
      o = Ii();
    function a(u, l, c) {
      return c
        ? a(u, l).pipe(o.mapOneOrManyArgs(c))
        : new t.Observable(function (f) {
            var d = function () {
                for (var m = [], h = 0; h < arguments.length; h++)
                  m[h] = arguments[h];
                return f.next(m.length === 1 ? m[0] : m);
              },
              v = u(d);
            return n.isFunction(l)
              ? function () {
                  return l(d, v);
                }
              : void 0;
          });
    }
    e.fromEventPattern = a;
  }),
  eI = E((e) => {
    var t =
      (e && e.__generator) ||
      function (c, f) {
        var d = {
            label: 0,
            sent: function () {
              if (h[0] & 1) throw h[1];
              return h[1];
            },
            trys: [],
            ops: [],
          },
          v,
          m,
          h,
          g;
        return (
          (g = { next: w(0), throw: w(1), return: w(2) }),
          typeof Symbol == "function" &&
            (g[Symbol.iterator] = function () {
              return this;
            }),
          g
        );
        function w(S) {
          return function (O) {
            return x([S, O]);
          };
        }
        function x(S) {
          if (v) throw new TypeError("Generator is already executing.");
          for (; d; )
            try {
              if (
                ((v = 1),
                m &&
                  (h =
                    S[0] & 2
                      ? m.return
                      : S[0]
                      ? m.throw || ((h = m.return) && h.call(m), 0)
                      : m.next) &&
                  !(h = h.call(m, S[1])).done)
              )
                return h;
              switch (((m = 0), h && (S = [S[0] & 2, h.value]), S[0])) {
                case 0:
                case 1:
                  h = S;
                  break;
                case 4:
                  return d.label++, { value: S[1], done: !1 };
                case 5:
                  d.label++, (m = S[1]), (S = [0]);
                  continue;
                case 7:
                  (S = d.ops.pop()), d.trys.pop();
                  continue;
                default:
                  if (
                    ((h = d.trys),
                    !(h = h.length > 0 && h[h.length - 1]) &&
                      (S[0] === 6 || S[0] === 2))
                  ) {
                    d = 0;
                    continue;
                  }
                  if (S[0] === 3 && (!h || (S[1] > h[0] && S[1] < h[3]))) {
                    d.label = S[1];
                    break;
                  }
                  if (S[0] === 6 && d.label < h[1]) {
                    (d.label = h[1]), (h = S);
                    break;
                  }
                  if (h && d.label < h[2]) {
                    (d.label = h[2]), d.ops.push(S);
                    break;
                  }
                  h[2] && d.ops.pop(), d.trys.pop();
                  continue;
              }
              S = f.call(c, d);
            } catch (O) {
              (S = [6, O]), (m = 0);
            } finally {
              v = h = 0;
            }
          if (S[0] & 5) throw S[1];
          return { value: S[0] ? S[1] : void 0, done: !0 };
        }
      };
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.generate = void 0);
    var n = Kt(),
      o = Wc(),
      a = Qc(),
      u = b_();
    function l(c, f, d, v, m) {
      var h, g, w, x;
      arguments.length === 1
        ? ((h = c),
          (x = h.initialState),
          (f = h.condition),
          (d = h.iterate),
          (g = h.resultSelector),
          (w = g === void 0 ? n.identity : g),
          (m = h.scheduler))
        : ((x = c),
          !v || o.isScheduler(v) ? ((w = n.identity), (m = v)) : (w = v));
      function S() {
        var O;
        return t(this, function (A) {
          switch (A.label) {
            case 0:
              (O = x), (A.label = 1);
            case 1:
              return !f || f(O) ? [4, w(O)] : [3, 4];
            case 2:
              A.sent(), (A.label = 3);
            case 3:
              return (O = d(O)), [3, 1];
            case 4:
              return [2];
          }
        });
      }
      return a.defer(
        m
          ? function () {
              return u.scheduleIterable(S(), m);
            }
          : S
      );
    }
    e.generate = l;
  }),
  tI = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.iif = void 0);
    var t = Qc();
    function n(o, a, u) {
      return t.defer(function () {
        return o() ? a : u;
      });
    }
    e.iif = n;
  }),
  Ti = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.timer = void 0);
    var t = Ze(),
      n = dr(),
      o = Wc(),
      a = qv();
    function u(l, c, f) {
      l === void 0 && (l = 0), f === void 0 && (f = n.async);
      var d = -1;
      return (
        c != null && (o.isScheduler(c) ? (f = c) : (d = c)),
        new t.Observable(function (v) {
          var m = a.isValidDate(l) ? +l - f.now() : l;
          m < 0 && (m = 0);
          var h = 0;
          return f.schedule(function () {
            v.closed ||
              (v.next(h++), 0 <= d ? this.schedule(void 0, d) : v.complete());
          }, m);
        })
      );
    }
    e.timer = u;
  }),
  k_ = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.interval = void 0);
    var t = dr(),
      n = Ti();
    function o(a, u) {
      return (
        a === void 0 && (a = 0),
        u === void 0 && (u = t.asyncScheduler),
        a < 0 && (a = 0),
        n.timer(a, a, u)
      );
    }
    e.interval = o;
  }),
  rI = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.merge = void 0);
    var t = Hc(),
      n = $e(),
      o = Xr(),
      a = pr(),
      u = On();
    function l() {
      for (var c = [], f = 0; f < arguments.length; f++) c[f] = arguments[f];
      var d = a.popScheduler(c),
        v = a.popNumber(c, 1 / 0),
        m = c;
      return m.length
        ? m.length === 1
          ? n.innerFrom(m[0])
          : t.mergeAll(v)(u.from(m, d))
        : o.EMPTY;
    }
    e.merge = l;
  }),
  Ty = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.never = e.NEVER = void 0);
    var t = Ze(),
      n = Ut();
    e.NEVER = new t.Observable(n.noop);
    function o() {
      return e.NEVER;
    }
    e.never = o;
  }),
  Ua = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.argsOrArgArray = void 0);
    var t = Array.isArray;
    function n(o) {
      return o.length === 1 && t(o[0]) ? o[0] : o;
    }
    e.argsOrArgArray = n;
  }),
  nI = E((e) => {
    var t =
        (e && e.__read) ||
        function (d, v) {
          var m = typeof Symbol == "function" && d[Symbol.iterator];
          if (!m) return d;
          var h = m.call(d),
            g,
            w = [],
            x;
          try {
            for (; (v === void 0 || v-- > 0) && !(g = h.next()).done; )
              w.push(g.value);
          } catch (S) {
            x = { error: S };
          } finally {
            try {
              g && !g.done && (m = h.return) && m.call(h);
            } finally {
              if (x) throw x.error;
            }
          }
          return w;
        },
      n =
        (e && e.__spreadArray) ||
        function (d, v) {
          for (var m = 0, h = v.length, g = d.length; m < h; m++, g++)
            d[g] = v[m];
          return d;
        };
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.onErrorResumeNext = void 0);
    var o = te(),
      a = $e(),
      u = Ua(),
      l = pe(),
      c = Ut();
    function f() {
      for (var d = [], v = 0; v < arguments.length; v++) d[v] = arguments[v];
      var m = u.argsOrArgArray(d);
      return o.operate(function (h, g) {
        var w = n([h], t(m)),
          x = function () {
            if (!g.closed)
              if (w.length > 0) {
                var S = void 0;
                try {
                  S = a.innerFrom(w.shift());
                } catch {
                  x();
                  return;
                }
                var O = l.createOperatorSubscriber(g, void 0, c.noop, c.noop);
                S.subscribe(O), O.add(x);
              } else g.complete();
          };
        x();
      });
    }
    e.onErrorResumeNext = f;
  }),
  oI = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.onErrorResumeNext = void 0);
    var t = Xr(),
      n = nI(),
      o = Ua();
    function a() {
      for (var u = [], l = 0; l < arguments.length; l++) u[l] = arguments[l];
      return n.onErrorResumeNext(o.argsOrArgArray(u))(t.EMPTY);
    }
    e.onErrorResumeNext = a;
  }),
  iI = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.pairs = void 0);
    var t = On();
    function n(o, a) {
      return t.from(Object.entries(o), a);
    }
    e.pairs = n;
  }),
  aI = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.not = void 0);
    function t(n, o) {
      return function (a, u) {
        return !n.call(o, a, u);
      };
    }
    e.not = t;
  }),
  Fa = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.filter = void 0);
    var t = te(),
      n = pe();
    function o(a, u) {
      return t.operate(function (l, c) {
        var f = 0;
        l.subscribe(
          n.createOperatorSubscriber(c, function (d) {
            return a.call(u, d, f++) && c.next(d);
          })
        );
      });
    }
    e.filter = o;
  }),
  uI = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.partition = void 0);
    var t = aI(),
      n = Fa(),
      o = $e();
    function a(u, l, c) {
      return [
        n.filter(l, c)(o.innerFrom(u)),
        n.filter(t.not(l, c))(o.innerFrom(u)),
      ];
    }
    e.partition = a;
  }),
  j_ = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.raceInit = e.race = void 0);
    var t = Ze(),
      n = $e(),
      o = Ua(),
      a = pe();
    function u() {
      for (var c = [], f = 0; f < arguments.length; f++) c[f] = arguments[f];
      return (
        (c = o.argsOrArgArray(c)),
        c.length === 1 ? n.innerFrom(c[0]) : new t.Observable(l(c))
      );
    }
    e.race = u;
    function l(c) {
      return function (f) {
        for (
          var d = [],
            v = function (h) {
              d.push(
                n.innerFrom(c[h]).subscribe(
                  a.createOperatorSubscriber(f, function (g) {
                    if (d) {
                      for (var w = 0; w < d.length; w++)
                        w !== h && d[w].unsubscribe();
                      d = null;
                    }
                    f.next(g);
                  })
                )
              );
            },
            m = 0;
          d && !f.closed && m < c.length;
          m++
        )
          v(m);
      };
    }
    e.raceInit = l;
  }),
  lI = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.range = void 0);
    var t = Ze(),
      n = Xr();
    function o(a, u, l) {
      if ((u == null && ((u = a), (a = 0)), u <= 0)) return n.EMPTY;
      var c = u + a;
      return new t.Observable(
        l
          ? function (f) {
              var d = a;
              return l.schedule(function () {
                d < c ? (f.next(d++), this.schedule()) : f.complete();
              });
            }
          : function (f) {
              for (var d = a; d < c && !f.closed; ) f.next(d++);
              f.complete();
            }
      );
    }
    e.range = o;
  }),
  sI = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.using = void 0);
    var t = Ze(),
      n = $e(),
      o = Xr();
    function a(u, l) {
      return new t.Observable(function (c) {
        var f = u(),
          d = l(f),
          v = d ? n.innerFrom(d) : o.EMPTY;
        return (
          v.subscribe(c),
          function () {
            f && f.unsubscribe();
          }
        );
      });
    }
    e.using = a;
  }),
  Qv = E((e) => {
    var t =
        (e && e.__read) ||
        function (v, m) {
          var h = typeof Symbol == "function" && v[Symbol.iterator];
          if (!h) return v;
          var g = h.call(v),
            w,
            x = [],
            S;
          try {
            for (; (m === void 0 || m-- > 0) && !(w = g.next()).done; )
              x.push(w.value);
          } catch (O) {
            S = { error: O };
          } finally {
            try {
              w && !w.done && (h = g.return) && h.call(g);
            } finally {
              if (S) throw S.error;
            }
          }
          return x;
        },
      n =
        (e && e.__spreadArray) ||
        function (v, m) {
          for (var h = 0, g = m.length, w = v.length; h < g; h++, w++)
            v[w] = m[h];
          return v;
        };
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.zip = void 0);
    var o = Ze(),
      a = $e(),
      u = Ua(),
      l = Xr(),
      c = pe(),
      f = pr();
    function d() {
      for (var v = [], m = 0; m < arguments.length; m++) v[m] = arguments[m];
      var h = f.popResultSelector(v),
        g = u.argsOrArgArray(v);
      return g.length
        ? new o.Observable(function (w) {
            var x = g.map(function () {
                return [];
              }),
              S = g.map(function () {
                return !1;
              });
            w.add(function () {
              x = S = null;
            });
            for (
              var O = function (k) {
                  a.innerFrom(g[k]).subscribe(
                    c.createOperatorSubscriber(
                      w,
                      function (j) {
                        if (
                          (x[k].push(j),
                          x.every(function (D) {
                            return D.length;
                          }))
                        ) {
                          var C = x.map(function (D) {
                            return D.shift();
                          });
                          w.next(h ? h.apply(void 0, n([], t(C))) : C),
                            x.some(function (D, W) {
                              return !D.length && S[W];
                            }) && w.complete();
                        }
                      },
                      function () {
                        (S[k] = !0), !x[k].length && w.complete();
                      }
                    )
                  );
                },
                A = 0;
              !w.closed && A < g.length;
              A++
            )
              O(A);
            return function () {
              x = S = null;
            };
          })
        : l.EMPTY;
    }
    e.zip = d;
  }),
  cI = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 });
  }),
  A_ = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.audit = void 0);
    var t = te(),
      n = $e(),
      o = pe();
    function a(u) {
      return t.operate(function (l, c) {
        var f = !1,
          d = null,
          v = null,
          m = !1,
          h = function () {
            if ((v?.unsubscribe(), (v = null), f)) {
              f = !1;
              var w = d;
              (d = null), c.next(w);
            }
            m && c.complete();
          },
          g = function () {
            (v = null), m && c.complete();
          };
        l.subscribe(
          o.createOperatorSubscriber(
            c,
            function (w) {
              (f = !0),
                (d = w),
                v ||
                  n
                    .innerFrom(u(w))
                    .subscribe((v = o.createOperatorSubscriber(c, h, g)));
            },
            function () {
              (m = !0), (!f || !v || v.closed) && c.complete();
            }
          )
        );
      });
    }
    e.audit = a;
  }),
  fI = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.auditTime = void 0);
    var t = dr(),
      n = A_(),
      o = Ti();
    function a(u, l) {
      return (
        l === void 0 && (l = t.asyncScheduler),
        n.audit(function () {
          return o.timer(u, l);
        })
      );
    }
    e.auditTime = a;
  }),
  dI = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.buffer = void 0);
    var t = te(),
      n = Ut(),
      o = pe();
    function a(u) {
      return t.operate(function (l, c) {
        var f = [];
        return (
          l.subscribe(
            o.createOperatorSubscriber(
              c,
              function (d) {
                return f.push(d);
              },
              function () {
                c.next(f), c.complete();
              }
            )
          ),
          u.subscribe(
            o.createOperatorSubscriber(
              c,
              function () {
                var d = f;
                (f = []), c.next(d);
              },
              n.noop
            )
          ),
          function () {
            f = null;
          }
        );
      });
    }
    e.buffer = a;
  }),
  pI = E((e) => {
    var t =
      (e && e.__values) ||
      function (l) {
        var c = typeof Symbol == "function" && Symbol.iterator,
          f = c && l[c],
          d = 0;
        if (f) return f.call(l);
        if (l && typeof l.length == "number")
          return {
            next: function () {
              return (
                l && d >= l.length && (l = void 0),
                { value: l && l[d++], done: !l }
              );
            },
          };
        throw new TypeError(
          c ? "Object is not iterable." : "Symbol.iterator is not defined."
        );
      };
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.bufferCount = void 0);
    var n = te(),
      o = pe(),
      a = Co();
    function u(l, c) {
      return (
        c === void 0 && (c = null),
        (c = c ?? l),
        n.operate(function (f, d) {
          var v = [],
            m = 0;
          f.subscribe(
            o.createOperatorSubscriber(
              d,
              function (h) {
                var g,
                  w,
                  x,
                  S,
                  O = null;
                m++ % c === 0 && v.push([]);
                try {
                  for (var A = t(v), k = A.next(); !k.done; k = A.next()) {
                    var j = k.value;
                    j.push(h), l <= j.length && ((O = O ?? []), O.push(j));
                  }
                } catch (W) {
                  g = { error: W };
                } finally {
                  try {
                    k && !k.done && (w = A.return) && w.call(A);
                  } finally {
                    if (g) throw g.error;
                  }
                }
                if (O)
                  try {
                    for (var C = t(O), D = C.next(); !D.done; D = C.next()) {
                      var j = D.value;
                      a.arrRemove(v, j), d.next(j);
                    }
                  } catch (W) {
                    x = { error: W };
                  } finally {
                    try {
                      D && !D.done && (S = C.return) && S.call(C);
                    } finally {
                      if (x) throw x.error;
                    }
                  }
              },
              function () {
                var h, g;
                try {
                  for (var w = t(v), x = w.next(); !x.done; x = w.next()) {
                    var S = x.value;
                    d.next(S);
                  }
                } catch (O) {
                  h = { error: O };
                } finally {
                  try {
                    x && !x.done && (g = w.return) && g.call(w);
                  } finally {
                    if (h) throw h.error;
                  }
                }
                d.complete();
              },
              void 0,
              function () {
                v = null;
              }
            )
          );
        })
      );
    }
    e.bufferCount = u;
  }),
  vI = E((e) => {
    var t =
      (e && e.__values) ||
      function (v) {
        var m = typeof Symbol == "function" && Symbol.iterator,
          h = m && v[m],
          g = 0;
        if (h) return h.call(v);
        if (v && typeof v.length == "number")
          return {
            next: function () {
              return (
                v && g >= v.length && (v = void 0),
                { value: v && v[g++], done: !v }
              );
            },
          };
        throw new TypeError(
          m ? "Object is not iterable." : "Symbol.iterator is not defined."
        );
      };
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.bufferTime = void 0);
    var n = fr(),
      o = te(),
      a = pe(),
      u = Co(),
      l = dr(),
      c = pr(),
      f = zo();
    function d(v) {
      for (var m, h, g = [], w = 1; w < arguments.length; w++)
        g[w - 1] = arguments[w];
      var x =
          (m = c.popScheduler(g)) !== null && m !== void 0
            ? m
            : l.asyncScheduler,
        S = (h = g[0]) !== null && h !== void 0 ? h : null,
        O = g[1] || 1 / 0;
      return o.operate(function (A, k) {
        var j = [],
          C = !1,
          D = function (F) {
            var V = F.buffer,
              re = F.subs;
            re.unsubscribe(), u.arrRemove(j, F), k.next(V), C && W();
          },
          W = function () {
            if (j) {
              var F = new n.Subscription();
              k.add(F);
              var V = [],
                re = { buffer: V, subs: F };
              j.push(re),
                f.executeSchedule(
                  F,
                  x,
                  function () {
                    return D(re);
                  },
                  v
                );
            }
          };
        S !== null && S >= 0 ? f.executeSchedule(k, x, W, S, !0) : (C = !0),
          W();
        var $ = a.createOperatorSubscriber(
          k,
          function (F) {
            var V,
              re,
              he = j.slice();
            try {
              for (var Z = t(he), ge = Z.next(); !ge.done; ge = Z.next()) {
                var Se = ge.value,
                  we = Se.buffer;
                we.push(F), O <= we.length && D(Se);
              }
            } catch (ce) {
              V = { error: ce };
            } finally {
              try {
                ge && !ge.done && (re = Z.return) && re.call(Z);
              } finally {
                if (V) throw V.error;
              }
            }
          },
          function () {
            for (; j?.length; ) k.next(j.shift().buffer);
            $?.unsubscribe(), k.complete(), k.unsubscribe();
          },
          void 0,
          function () {
            return (j = null);
          }
        );
        A.subscribe($);
      });
    }
    e.bufferTime = d;
  }),
  hI = E((e) => {
    var t =
      (e && e.__values) ||
      function (d) {
        var v = typeof Symbol == "function" && Symbol.iterator,
          m = v && d[v],
          h = 0;
        if (m) return m.call(d);
        if (d && typeof d.length == "number")
          return {
            next: function () {
              return (
                d && h >= d.length && (d = void 0),
                { value: d && d[h++], done: !d }
              );
            },
          };
        throw new TypeError(
          v ? "Object is not iterable." : "Symbol.iterator is not defined."
        );
      };
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.bufferToggle = void 0);
    var n = fr(),
      o = te(),
      a = $e(),
      u = pe(),
      l = Ut(),
      c = Co();
    function f(d, v) {
      return o.operate(function (m, h) {
        var g = [];
        a.innerFrom(d).subscribe(
          u.createOperatorSubscriber(
            h,
            function (w) {
              var x = [];
              g.push(x);
              var S = new n.Subscription(),
                O = function () {
                  c.arrRemove(g, x), h.next(x), S.unsubscribe();
                };
              S.add(
                a
                  .innerFrom(v(w))
                  .subscribe(u.createOperatorSubscriber(h, O, l.noop))
              );
            },
            l.noop
          )
        ),
          m.subscribe(
            u.createOperatorSubscriber(
              h,
              function (w) {
                var x, S;
                try {
                  for (var O = t(g), A = O.next(); !A.done; A = O.next()) {
                    var k = A.value;
                    k.push(w);
                  }
                } catch (j) {
                  x = { error: j };
                } finally {
                  try {
                    A && !A.done && (S = O.return) && S.call(O);
                  } finally {
                    if (x) throw x.error;
                  }
                }
              },
              function () {
                for (; g.length > 0; ) h.next(g.shift());
                h.complete();
              }
            )
          );
      });
    }
    e.bufferToggle = f;
  }),
  mI = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.bufferWhen = void 0);
    var t = te(),
      n = Ut(),
      o = pe(),
      a = $e();
    function u(l) {
      return t.operate(function (c, f) {
        var d = null,
          v = null,
          m = function () {
            v?.unsubscribe();
            var h = d;
            (d = []),
              h && f.next(h),
              a
                .innerFrom(l())
                .subscribe((v = o.createOperatorSubscriber(f, m, n.noop)));
          };
        m(),
          c.subscribe(
            o.createOperatorSubscriber(
              f,
              function (h) {
                return d?.push(h);
              },
              function () {
                d && f.next(d), f.complete();
              },
              void 0,
              function () {
                return (d = v = null);
              }
            )
          );
      });
    }
    e.bufferWhen = u;
  }),
  bI = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.catchError = void 0);
    var t = $e(),
      n = pe(),
      o = te();
    function a(u) {
      return o.operate(function (l, c) {
        var f = null,
          d = !1,
          v;
        (f = l.subscribe(
          n.createOperatorSubscriber(c, void 0, void 0, function (m) {
            (v = t.innerFrom(u(m, a(u)(l)))),
              f ? (f.unsubscribe(), (f = null), v.subscribe(c)) : (d = !0);
          })
        )),
          d && (f.unsubscribe(), (f = null), v.subscribe(c));
      });
    }
    e.catchError = a;
  }),
  I_ = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.scanInternals = void 0);
    var t = pe();
    function n(o, a, u, l, c) {
      return function (f, d) {
        var v = u,
          m = a,
          h = 0;
        f.subscribe(
          t.createOperatorSubscriber(
            d,
            function (g) {
              var w = h++;
              (m = v ? o(m, g, w) : ((v = !0), g)), l && d.next(m);
            },
            c &&
              function () {
                v && d.next(m), d.complete();
              }
          )
        );
      };
    }
    e.scanInternals = n;
  }),
  xl = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.reduce = void 0);
    var t = I_(),
      n = te();
    function o(a, u) {
      return n.operate(t.scanInternals(a, u, arguments.length >= 2, !1, !0));
    }
    e.reduce = o;
  }),
  T_ = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.toArray = void 0);
    var t = xl(),
      n = te(),
      o = function (u, l) {
        return u.push(l), u;
      };
    function a() {
      return n.operate(function (u, l) {
        t.reduce(o, [])(u).subscribe(l);
      });
    }
    e.toArray = a;
  }),
  M_ = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.joinAllInternals = void 0);
    var t = Kt(),
      n = Ii(),
      o = $c(),
      a = Ro(),
      u = T_();
    function l(c, f) {
      return o.pipe(
        u.toArray(),
        a.mergeMap(function (d) {
          return c(d);
        }),
        f ? n.mapOneOrManyArgs(f) : t.identity
      );
    }
    e.joinAllInternals = l;
  }),
  N_ = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.combineLatestAll = void 0);
    var t = Kv(),
      n = M_();
    function o(a) {
      return n.joinAllInternals(t.combineLatest, a);
    }
    e.combineLatestAll = o;
  }),
  yI = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.combineAll = void 0);
    var t = N_();
    e.combineAll = t.combineLatestAll;
  }),
  gI = E((e) => {
    var t =
        (e && e.__read) ||
        function (v, m) {
          var h = typeof Symbol == "function" && v[Symbol.iterator];
          if (!h) return v;
          var g = h.call(v),
            w,
            x = [],
            S;
          try {
            for (; (m === void 0 || m-- > 0) && !(w = g.next()).done; )
              x.push(w.value);
          } catch (O) {
            S = { error: O };
          } finally {
            try {
              w && !w.done && (h = g.return) && h.call(g);
            } finally {
              if (S) throw S.error;
            }
          }
          return x;
        },
      n =
        (e && e.__spreadArray) ||
        function (v, m) {
          for (var h = 0, g = m.length, w = v.length; h < g; h++, w++)
            v[w] = m[h];
          return v;
        };
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.combineLatest = void 0);
    var o = Kv(),
      a = te(),
      u = Ua(),
      l = Ii(),
      c = $c(),
      f = pr();
    function d() {
      for (var v = [], m = 0; m < arguments.length; m++) v[m] = arguments[m];
      var h = f.popResultSelector(v);
      return h
        ? c.pipe(d.apply(void 0, n([], t(v))), l.mapOneOrManyArgs(h))
        : a.operate(function (g, w) {
            o.combineLatestInit(n([g], t(u.argsOrArgArray(v))))(w);
          });
    }
    e.combineLatest = d;
  }),
  wI = E((e) => {
    var t =
        (e && e.__read) ||
        function (u, l) {
          var c = typeof Symbol == "function" && u[Symbol.iterator];
          if (!c) return u;
          var f = c.call(u),
            d,
            v = [],
            m;
          try {
            for (; (l === void 0 || l-- > 0) && !(d = f.next()).done; )
              v.push(d.value);
          } catch (h) {
            m = { error: h };
          } finally {
            try {
              d && !d.done && (c = f.return) && c.call(f);
            } finally {
              if (m) throw m.error;
            }
          }
          return v;
        },
      n =
        (e && e.__spreadArray) ||
        function (u, l) {
          for (var c = 0, f = l.length, d = u.length; c < f; c++, d++)
            u[d] = l[c];
          return u;
        };
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.combineLatestWith = void 0);
    var o = gI();
    function a() {
      for (var u = [], l = 0; l < arguments.length; l++) u[l] = arguments[l];
      return o.combineLatest.apply(void 0, n([], t(u)));
    }
    e.combineLatestWith = a;
  }),
  C_ = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.concatMap = void 0);
    var t = Ro(),
      n = Ke();
    function o(a, u) {
      return n.isFunction(u) ? t.mergeMap(a, u, 1) : t.mergeMap(a, 1);
    }
    e.concatMap = o;
  }),
  _I = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.concatMapTo = void 0);
    var t = C_(),
      n = Ke();
    function o(a, u) {
      return n.isFunction(u)
        ? t.concatMap(function () {
            return a;
          }, u)
        : t.concatMap(function () {
            return a;
          });
    }
    e.concatMapTo = o;
  }),
  OI = E((e) => {
    var t =
        (e && e.__read) ||
        function (f, d) {
          var v = typeof Symbol == "function" && f[Symbol.iterator];
          if (!v) return f;
          var m = v.call(f),
            h,
            g = [],
            w;
          try {
            for (; (d === void 0 || d-- > 0) && !(h = m.next()).done; )
              g.push(h.value);
          } catch (x) {
            w = { error: x };
          } finally {
            try {
              h && !h.done && (v = m.return) && v.call(m);
            } finally {
              if (w) throw w.error;
            }
          }
          return g;
        },
      n =
        (e && e.__spreadArray) ||
        function (f, d) {
          for (var v = 0, m = d.length, h = f.length; v < m; v++, h++)
            f[h] = d[v];
          return f;
        };
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.concat = void 0);
    var o = te(),
      a = Xv(),
      u = pr(),
      l = On();
    function c() {
      for (var f = [], d = 0; d < arguments.length; d++) f[d] = arguments[d];
      var v = u.popScheduler(f);
      return o.operate(function (m, h) {
        a.concatAll()(l.from(n([m], t(f)), v)).subscribe(h);
      });
    }
    e.concat = c;
  }),
  xI = E((e) => {
    var t =
        (e && e.__read) ||
        function (u, l) {
          var c = typeof Symbol == "function" && u[Symbol.iterator];
          if (!c) return u;
          var f = c.call(u),
            d,
            v = [],
            m;
          try {
            for (; (l === void 0 || l-- > 0) && !(d = f.next()).done; )
              v.push(d.value);
          } catch (h) {
            m = { error: h };
          } finally {
            try {
              d && !d.done && (c = f.return) && c.call(f);
            } finally {
              if (m) throw m.error;
            }
          }
          return v;
        },
      n =
        (e && e.__spreadArray) ||
        function (u, l) {
          for (var c = 0, f = l.length, d = u.length; c < f; c++, d++)
            u[d] = l[c];
          return u;
        };
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.concatWith = void 0);
    var o = OI();
    function a() {
      for (var u = [], l = 0; l < arguments.length; l++) u[l] = arguments[l];
      return o.concat.apply(void 0, n([], t(u)));
    }
    e.concatWith = a;
  }),
  SI = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.fromSubscribable = void 0);
    var t = Ze();
    function n(o) {
      return new t.Observable(function (a) {
        return o.subscribe(a);
      });
    }
    e.fromSubscribable = n;
  }),
  Yv = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.connect = void 0);
    var t = Ft(),
      n = On(),
      o = te(),
      a = SI(),
      u = {
        connector: function () {
          return new t.Subject();
        },
      };
    function l(c, f) {
      f === void 0 && (f = u);
      var d = f.connector;
      return o.operate(function (v, m) {
        var h = d();
        n.from(c(a.fromSubscribable(h))).subscribe(m), m.add(v.subscribe(h));
      });
    }
    e.connect = l;
  }),
  PI = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.count = void 0);
    var t = xl();
    function n(o) {
      return t.reduce(function (a, u, l) {
        return !o || o(u, l) ? a + 1 : a;
      }, 0);
    }
    e.count = n;
  }),
  EI = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.debounce = void 0);
    var t = te(),
      n = Ut(),
      o = pe(),
      a = $e();
    function u(l) {
      return t.operate(function (c, f) {
        var d = !1,
          v = null,
          m = null,
          h = function () {
            if ((m?.unsubscribe(), (m = null), d)) {
              d = !1;
              var g = v;
              (v = null), f.next(g);
            }
          };
        c.subscribe(
          o.createOperatorSubscriber(
            f,
            function (g) {
              m?.unsubscribe(),
                (d = !0),
                (v = g),
                (m = o.createOperatorSubscriber(f, h, n.noop)),
                a.innerFrom(l(g)).subscribe(m);
            },
            function () {
              h(), f.complete();
            },
            void 0,
            function () {
              v = m = null;
            }
          )
        );
      });
    }
    e.debounce = u;
  }),
  kI = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.debounceTime = void 0);
    var t = dr(),
      n = te(),
      o = pe();
    function a(u, l) {
      return (
        l === void 0 && (l = t.asyncScheduler),
        n.operate(function (c, f) {
          var d = null,
            v = null,
            m = null,
            h = function () {
              if (d) {
                d.unsubscribe(), (d = null);
                var w = v;
                (v = null), f.next(w);
              }
            };
          function g() {
            var w = m + u,
              x = l.now();
            if (x < w) {
              (d = this.schedule(void 0, w - x)), f.add(d);
              return;
            }
            h();
          }
          c.subscribe(
            o.createOperatorSubscriber(
              f,
              function (w) {
                (v = w), (m = l.now()), d || ((d = l.schedule(g, u)), f.add(d));
              },
              function () {
                h(), f.complete();
              },
              void 0,
              function () {
                v = d = null;
              }
            )
          );
        })
      );
    }
    e.debounceTime = a;
  }),
  Yc = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.defaultIfEmpty = void 0);
    var t = te(),
      n = pe();
    function o(a) {
      return t.operate(function (u, l) {
        var c = !1;
        u.subscribe(
          n.createOperatorSubscriber(
            l,
            function (f) {
              (c = !0), l.next(f);
            },
            function () {
              c || l.next(a), l.complete();
            }
          )
        );
      });
    }
    e.defaultIfEmpty = o;
  }),
  Sl = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.take = void 0);
    var t = Xr(),
      n = te(),
      o = pe();
    function a(u) {
      return u <= 0
        ? function () {
            return t.EMPTY;
          }
        : n.operate(function (l, c) {
            var f = 0;
            l.subscribe(
              o.createOperatorSubscriber(c, function (d) {
                ++f <= u && (c.next(d), u <= f && c.complete());
              })
            );
          });
    }
    e.take = a;
  }),
  z_ = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.ignoreElements = void 0);
    var t = te(),
      n = pe(),
      o = Ut();
    function a() {
      return t.operate(function (u, l) {
        u.subscribe(n.createOperatorSubscriber(l, o.noop));
      });
    }
    e.ignoreElements = a;
  }),
  R_ = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.mapTo = void 0);
    var t = Ai();
    function n(o) {
      return t.map(function () {
        return o;
      });
    }
    e.mapTo = n;
  }),
  L_ = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.delayWhen = void 0);
    var t = Xc(),
      n = Sl(),
      o = z_(),
      a = R_(),
      u = Ro();
    function l(c, f) {
      return f
        ? function (d) {
            return t.concat(
              f.pipe(n.take(1), o.ignoreElements()),
              d.pipe(l(c))
            );
          }
        : u.mergeMap(function (d, v) {
            return c(d, v).pipe(n.take(1), a.mapTo(d));
          });
    }
    e.delayWhen = l;
  }),
  jI = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.delay = void 0);
    var t = dr(),
      n = L_(),
      o = Ti();
    function a(u, l) {
      l === void 0 && (l = t.asyncScheduler);
      var c = o.timer(u, l);
      return n.delayWhen(function () {
        return c;
      });
    }
    e.delay = a;
  }),
  AI = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.dematerialize = void 0);
    var t = Wv(),
      n = te(),
      o = pe();
    function a() {
      return n.operate(function (u, l) {
        u.subscribe(
          o.createOperatorSubscriber(l, function (c) {
            return t.observeNotification(c, l);
          })
        );
      });
    }
    e.dematerialize = a;
  }),
  II = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.distinct = void 0);
    var t = te(),
      n = pe(),
      o = Ut();
    function a(u, l) {
      return t.operate(function (c, f) {
        var d = new Set();
        c.subscribe(
          n.createOperatorSubscriber(f, function (v) {
            var m = u ? u(v) : v;
            d.has(m) || (d.add(m), f.next(v));
          })
        ),
          l?.subscribe(
            n.createOperatorSubscriber(
              f,
              function () {
                return d.clear();
              },
              o.noop
            )
          );
      });
    }
    e.distinct = a;
  }),
  B_ = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.distinctUntilChanged = void 0);
    var t = Kt(),
      n = te(),
      o = pe();
    function a(l, c) {
      return (
        c === void 0 && (c = t.identity),
        (l = l ?? u),
        n.operate(function (f, d) {
          var v,
            m = !0;
          f.subscribe(
            o.createOperatorSubscriber(d, function (h) {
              var g = c(h);
              (m || !l(v, g)) && ((m = !1), (v = g), d.next(h));
            })
          );
        })
      );
    }
    e.distinctUntilChanged = a;
    function u(l, c) {
      return l === c;
    }
  }),
  TI = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.distinctUntilKeyChanged = void 0);
    var t = B_();
    function n(o, a) {
      return t.distinctUntilChanged(function (u, l) {
        return a ? a(u[o], l[o]) : u[o] === l[o];
      });
    }
    e.distinctUntilKeyChanged = n;
  }),
  Jc = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.throwIfEmpty = void 0);
    var t = ji(),
      n = te(),
      o = pe();
    function a(l) {
      return (
        l === void 0 && (l = u),
        n.operate(function (c, f) {
          var d = !1;
          c.subscribe(
            o.createOperatorSubscriber(
              f,
              function (v) {
                (d = !0), f.next(v);
              },
              function () {
                return d ? f.complete() : f.error(l());
              }
            )
          );
        })
      );
    }
    e.throwIfEmpty = a;
    function u() {
      return new t.EmptyError();
    }
  }),
  MI = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.elementAt = void 0);
    var t = __(),
      n = Fa(),
      o = Jc(),
      a = Yc(),
      u = Sl();
    function l(c, f) {
      if (c < 0) throw new t.ArgumentOutOfRangeError();
      var d = arguments.length >= 2;
      return function (v) {
        return v.pipe(
          n.filter(function (m, h) {
            return h === c;
          }),
          u.take(1),
          d
            ? a.defaultIfEmpty(f)
            : o.throwIfEmpty(function () {
                return new t.ArgumentOutOfRangeError();
              })
        );
      };
    }
    e.elementAt = l;
  }),
  NI = E((e) => {
    var t =
        (e && e.__read) ||
        function (l, c) {
          var f = typeof Symbol == "function" && l[Symbol.iterator];
          if (!f) return l;
          var d = f.call(l),
            v,
            m = [],
            h;
          try {
            for (; (c === void 0 || c-- > 0) && !(v = d.next()).done; )
              m.push(v.value);
          } catch (g) {
            h = { error: g };
          } finally {
            try {
              v && !v.done && (f = d.return) && f.call(d);
            } finally {
              if (h) throw h.error;
            }
          }
          return m;
        },
      n =
        (e && e.__spreadArray) ||
        function (l, c) {
          for (var f = 0, d = c.length, v = l.length; f < d; f++, v++)
            l[v] = c[f];
          return l;
        };
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.endWith = void 0);
    var o = Xc(),
      a = Vv();
    function u() {
      for (var l = [], c = 0; c < arguments.length; c++) l[c] = arguments[c];
      return function (f) {
        return o.concat(f, a.of.apply(void 0, n([], t(l))));
      };
    }
    e.endWith = u;
  }),
  CI = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.every = void 0);
    var t = te(),
      n = pe();
    function o(a, u) {
      return t.operate(function (l, c) {
        var f = 0;
        l.subscribe(
          n.createOperatorSubscriber(
            c,
            function (d) {
              a.call(u, d, f++, l) || (c.next(!1), c.complete());
            },
            function () {
              c.next(!0), c.complete();
            }
          )
        );
      });
    }
    e.every = o;
  }),
  D_ = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.exhaustAll = void 0);
    var t = te(),
      n = $e(),
      o = pe();
    function a() {
      return t.operate(function (u, l) {
        var c = !1,
          f = null;
        u.subscribe(
          o.createOperatorSubscriber(
            l,
            function (d) {
              f ||
                (f = n.innerFrom(d).subscribe(
                  o.createOperatorSubscriber(l, void 0, function () {
                    (f = null), c && l.complete();
                  })
                ));
            },
            function () {
              (c = !0), !f && l.complete();
            }
          )
        );
      });
    }
    e.exhaustAll = a;
  }),
  zI = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.exhaust = void 0);
    var t = D_();
    e.exhaust = t.exhaustAll;
  }),
  RI = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.exhaustMap = void 0);
    var t = Ai(),
      n = $e(),
      o = te(),
      a = pe();
    function u(l, c) {
      return c
        ? function (f) {
            return f.pipe(
              u(function (d, v) {
                return n.innerFrom(l(d, v)).pipe(
                  t.map(function (m, h) {
                    return c(d, m, v, h);
                  })
                );
              })
            );
          }
        : o.operate(function (f, d) {
            var v = 0,
              m = null,
              h = !1;
            f.subscribe(
              a.createOperatorSubscriber(
                d,
                function (g) {
                  m ||
                    ((m = a.createOperatorSubscriber(d, void 0, function () {
                      (m = null), h && d.complete();
                    })),
                    n.innerFrom(l(g, v++)).subscribe(m));
                },
                function () {
                  (h = !0), !m && d.complete();
                }
              )
            );
          });
    }
    e.exhaustMap = u;
  }),
  LI = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.expand = void 0);
    var t = te(),
      n = Hv();
    function o(a, u, l) {
      return (
        u === void 0 && (u = 1 / 0),
        (u = (u || 0) < 1 ? 1 / 0 : u),
        t.operate(function (c, f) {
          return n.mergeInternals(c, f, a, u, void 0, !0, l);
        })
      );
    }
    e.expand = o;
  }),
  BI = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.finalize = void 0);
    var t = te();
    function n(o) {
      return t.operate(function (a, u) {
        try {
          a.subscribe(u);
        } finally {
          u.add(o);
        }
      });
    }
    e.finalize = n;
  }),
  U_ = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.createFind = e.find = void 0);
    var t = te(),
      n = pe();
    function o(u, l) {
      return t.operate(a(u, l, "value"));
    }
    e.find = o;
    function a(u, l, c) {
      var f = c === "index";
      return function (d, v) {
        var m = 0;
        d.subscribe(
          n.createOperatorSubscriber(
            v,
            function (h) {
              var g = m++;
              u.call(l, h, g, d) && (v.next(f ? g : h), v.complete());
            },
            function () {
              v.next(f ? -1 : void 0), v.complete();
            }
          )
        );
      };
    }
    e.createFind = a;
  }),
  DI = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.findIndex = void 0);
    var t = te(),
      n = U_();
    function o(a, u) {
      return t.operate(n.createFind(a, u, "index"));
    }
    e.findIndex = o;
  }),
  UI = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.first = void 0);
    var t = ji(),
      n = Fa(),
      o = Sl(),
      a = Yc(),
      u = Jc(),
      l = Kt();
    function c(f, d) {
      var v = arguments.length >= 2;
      return function (m) {
        return m.pipe(
          f
            ? n.filter(function (h, g) {
                return f(h, g, m);
              })
            : l.identity,
          o.take(1),
          v
            ? a.defaultIfEmpty(d)
            : u.throwIfEmpty(function () {
                return new t.EmptyError();
              })
        );
      };
    }
    e.first = c;
  }),
  FI = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.groupBy = void 0);
    var t = Ze(),
      n = $e(),
      o = Ft(),
      a = te(),
      u = pe();
    function l(c, f, d, v) {
      return a.operate(function (m, h) {
        var g;
        !f || typeof f == "function"
          ? (g = f)
          : ((d = f.duration), (g = f.element), (v = f.connector));
        var w = new Map(),
          x = function (C) {
            w.forEach(C), C(h);
          },
          S = function (C) {
            return x(function (D) {
              return D.error(C);
            });
          },
          O = 0,
          A = !1,
          k = new u.OperatorSubscriber(
            h,
            function (C) {
              try {
                var D = c(C),
                  W = w.get(D);
                if (!W) {
                  w.set(D, (W = v ? v() : new o.Subject()));
                  var $ = j(D, W);
                  if ((h.next($), d)) {
                    var F = u.createOperatorSubscriber(
                      W,
                      function () {
                        W.complete(), F?.unsubscribe();
                      },
                      void 0,
                      void 0,
                      function () {
                        return w.delete(D);
                      }
                    );
                    k.add(n.innerFrom(d($)).subscribe(F));
                  }
                }
                W.next(g ? g(C) : C);
              } catch (V) {
                S(V);
              }
            },
            function () {
              return x(function (C) {
                return C.complete();
              });
            },
            S,
            function () {
              return w.clear();
            },
            function () {
              return (A = !0), O === 0;
            }
          );
        m.subscribe(k);
        function j(C, D) {
          var W = new t.Observable(function ($) {
            O++;
            var F = D.subscribe($);
            return function () {
              F.unsubscribe(), --O === 0 && A && k.unsubscribe();
            };
          });
          return (W.key = C), W;
        }
      });
    }
    e.groupBy = l;
  }),
  $I = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.isEmpty = void 0);
    var t = te(),
      n = pe();
    function o() {
      return t.operate(function (a, u) {
        a.subscribe(
          n.createOperatorSubscriber(
            u,
            function () {
              u.next(!1), u.complete();
            },
            function () {
              u.next(!0), u.complete();
            }
          )
        );
      });
    }
    e.isEmpty = o;
  }),
  F_ = E((e) => {
    var t =
      (e && e.__values) ||
      function (l) {
        var c = typeof Symbol == "function" && Symbol.iterator,
          f = c && l[c],
          d = 0;
        if (f) return f.call(l);
        if (l && typeof l.length == "number")
          return {
            next: function () {
              return (
                l && d >= l.length && (l = void 0),
                { value: l && l[d++], done: !l }
              );
            },
          };
        throw new TypeError(
          c ? "Object is not iterable." : "Symbol.iterator is not defined."
        );
      };
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.takeLast = void 0);
    var n = Xr(),
      o = te(),
      a = pe();
    function u(l) {
      return l <= 0
        ? function () {
            return n.EMPTY;
          }
        : o.operate(function (c, f) {
            var d = [];
            c.subscribe(
              a.createOperatorSubscriber(
                f,
                function (v) {
                  d.push(v), l < d.length && d.shift();
                },
                function () {
                  var v, m;
                  try {
                    for (var h = t(d), g = h.next(); !g.done; g = h.next()) {
                      var w = g.value;
                      f.next(w);
                    }
                  } catch (x) {
                    v = { error: x };
                  } finally {
                    try {
                      g && !g.done && (m = h.return) && m.call(h);
                    } finally {
                      if (v) throw v.error;
                    }
                  }
                  f.complete();
                },
                void 0,
                function () {
                  d = null;
                }
              )
            );
          });
    }
    e.takeLast = u;
  }),
  VI = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.last = void 0);
    var t = ji(),
      n = Fa(),
      o = F_(),
      a = Jc(),
      u = Yc(),
      l = Kt();
    function c(f, d) {
      var v = arguments.length >= 2;
      return function (m) {
        return m.pipe(
          f
            ? n.filter(function (h, g) {
                return f(h, g, m);
              })
            : l.identity,
          o.takeLast(1),
          v
            ? u.defaultIfEmpty(d)
            : a.throwIfEmpty(function () {
                return new t.EmptyError();
              })
        );
      };
    }
    e.last = c;
  }),
  WI = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.materialize = void 0);
    var t = Wv(),
      n = te(),
      o = pe();
    function a() {
      return n.operate(function (u, l) {
        u.subscribe(
          o.createOperatorSubscriber(
            l,
            function (c) {
              l.next(t.Notification.createNext(c));
            },
            function () {
              l.next(t.Notification.createComplete()), l.complete();
            },
            function (c) {
              l.next(t.Notification.createError(c)), l.complete();
            }
          )
        );
      });
    }
    e.materialize = a;
  }),
  qI = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.max = void 0);
    var t = xl(),
      n = Ke();
    function o(a) {
      return t.reduce(
        n.isFunction(a)
          ? function (u, l) {
              return a(u, l) > 0 ? u : l;
            }
          : function (u, l) {
              return u > l ? u : l;
            }
      );
    }
    e.max = o;
  }),
  KI = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.flatMap = void 0);
    var t = Ro();
    e.flatMap = t.mergeMap;
  }),
  HI = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.mergeMapTo = void 0);
    var t = Ro(),
      n = Ke();
    function o(a, u, l) {
      return (
        l === void 0 && (l = 1 / 0),
        n.isFunction(u)
          ? t.mergeMap(
              function () {
                return a;
              },
              u,
              l
            )
          : (typeof u == "number" && (l = u),
            t.mergeMap(function () {
              return a;
            }, l))
      );
    }
    e.mergeMapTo = o;
  }),
  XI = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.mergeScan = void 0);
    var t = te(),
      n = Hv();
    function o(a, u, l) {
      return (
        l === void 0 && (l = 1 / 0),
        t.operate(function (c, f) {
          var d = u;
          return n.mergeInternals(
            c,
            f,
            function (v, m) {
              return a(d, v, m);
            },
            l,
            function (v) {
              d = v;
            },
            !1,
            void 0,
            function () {
              return (d = null);
            }
          );
        })
      );
    }
    e.mergeScan = o;
  }),
  QI = E((e) => {
    var t =
        (e && e.__read) ||
        function (d, v) {
          var m = typeof Symbol == "function" && d[Symbol.iterator];
          if (!m) return d;
          var h = m.call(d),
            g,
            w = [],
            x;
          try {
            for (; (v === void 0 || v-- > 0) && !(g = h.next()).done; )
              w.push(g.value);
          } catch (S) {
            x = { error: S };
          } finally {
            try {
              g && !g.done && (m = h.return) && m.call(h);
            } finally {
              if (x) throw x.error;
            }
          }
          return w;
        },
      n =
        (e && e.__spreadArray) ||
        function (d, v) {
          for (var m = 0, h = v.length, g = d.length; m < h; m++, g++)
            d[g] = v[m];
          return d;
        };
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.merge = void 0);
    var o = te(),
      a = Ua(),
      u = Hc(),
      l = pr(),
      c = On();
    function f() {
      for (var d = [], v = 0; v < arguments.length; v++) d[v] = arguments[v];
      var m = l.popScheduler(d),
        h = l.popNumber(d, 1 / 0);
      return (
        (d = a.argsOrArgArray(d)),
        o.operate(function (g, w) {
          u.mergeAll(h)(c.from(n([g], t(d)), m)).subscribe(w);
        })
      );
    }
    e.merge = f;
  }),
  YI = E((e) => {
    var t =
        (e && e.__read) ||
        function (u, l) {
          var c = typeof Symbol == "function" && u[Symbol.iterator];
          if (!c) return u;
          var f = c.call(u),
            d,
            v = [],
            m;
          try {
            for (; (l === void 0 || l-- > 0) && !(d = f.next()).done; )
              v.push(d.value);
          } catch (h) {
            m = { error: h };
          } finally {
            try {
              d && !d.done && (c = f.return) && c.call(f);
            } finally {
              if (m) throw m.error;
            }
          }
          return v;
        },
      n =
        (e && e.__spreadArray) ||
        function (u, l) {
          for (var c = 0, f = l.length, d = u.length; c < f; c++, d++)
            u[d] = l[c];
          return u;
        };
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.mergeWith = void 0);
    var o = QI();
    function a() {
      for (var u = [], l = 0; l < arguments.length; l++) u[l] = arguments[l];
      return o.merge.apply(void 0, n([], t(u)));
    }
    e.mergeWith = a;
  }),
  JI = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.min = void 0);
    var t = xl(),
      n = Ke();
    function o(a) {
      return t.reduce(
        n.isFunction(a)
          ? function (u, l) {
              return a(u, l) < 0 ? u : l;
            }
          : function (u, l) {
              return u < l ? u : l;
            }
      );
    }
    e.min = o;
  }),
  Jv = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.multicast = void 0);
    var t = Vc(),
      n = Ke(),
      o = Yv();
    function a(u, l) {
      var c = n.isFunction(u)
        ? u
        : function () {
            return u;
          };
      return n.isFunction(l)
        ? o.connect(l, { connector: c })
        : function (f) {
            return new t.ConnectableObservable(f, c);
          };
    }
    e.multicast = a;
  }),
  GI = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.pairwise = void 0);
    var t = te(),
      n = pe();
    function o() {
      return t.operate(function (a, u) {
        var l,
          c = !1;
        a.subscribe(
          n.createOperatorSubscriber(u, function (f) {
            var d = l;
            (l = f), c && u.next([d, f]), (c = !0);
          })
        );
      });
    }
    e.pairwise = o;
  }),
  ZI = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.pluck = void 0);
    var t = Ai();
    function n() {
      for (var o = [], a = 0; a < arguments.length; a++) o[a] = arguments[a];
      var u = o.length;
      if (u === 0) throw new Error("list of properties cannot be empty.");
      return t.map(function (l) {
        for (var c = l, f = 0; f < u; f++) {
          var d = c?.[o[f]];
          if (typeof d < "u") c = d;
          else return;
        }
        return c;
      });
    }
    e.pluck = n;
  }),
  eT = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.publish = void 0);
    var t = Ft(),
      n = Jv(),
      o = Yv();
    function a(u) {
      return u
        ? function (l) {
            return o.connect(u)(l);
          }
        : function (l) {
            return n.multicast(new t.Subject())(l);
          };
    }
    e.publish = a;
  }),
  tT = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.publishBehavior = void 0);
    var t = s_(),
      n = Vc();
    function o(a) {
      return function (u) {
        var l = new t.BehaviorSubject(a);
        return new n.ConnectableObservable(u, function () {
          return l;
        });
      };
    }
    e.publishBehavior = o;
  }),
  rT = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.publishLast = void 0);
    var t = Uv(),
      n = Vc();
    function o() {
      return function (a) {
        var u = new t.AsyncSubject();
        return new n.ConnectableObservable(a, function () {
          return u;
        });
      };
    }
    e.publishLast = o;
  }),
  nT = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.publishReplay = void 0);
    var t = Dv(),
      n = Jv(),
      o = Ke();
    function a(u, l, c, f) {
      c && !o.isFunction(c) && (f = c);
      var d = o.isFunction(c) ? c : void 0;
      return function (v) {
        return n.multicast(new t.ReplaySubject(u, l, f), d)(v);
      };
    }
    e.publishReplay = a;
  }),
  oT = E((e) => {
    var t =
        (e && e.__read) ||
        function (c, f) {
          var d = typeof Symbol == "function" && c[Symbol.iterator];
          if (!d) return c;
          var v = d.call(c),
            m,
            h = [],
            g;
          try {
            for (; (f === void 0 || f-- > 0) && !(m = v.next()).done; )
              h.push(m.value);
          } catch (w) {
            g = { error: w };
          } finally {
            try {
              m && !m.done && (d = v.return) && d.call(v);
            } finally {
              if (g) throw g.error;
            }
          }
          return h;
        },
      n =
        (e && e.__spreadArray) ||
        function (c, f) {
          for (var d = 0, v = f.length, m = c.length; d < v; d++, m++)
            c[m] = f[d];
          return c;
        };
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.raceWith = void 0);
    var o = j_(),
      a = te(),
      u = Kt();
    function l() {
      for (var c = [], f = 0; f < arguments.length; f++) c[f] = arguments[f];
      return c.length
        ? a.operate(function (d, v) {
            o.raceInit(n([d], t(c)))(v);
          })
        : u.identity;
    }
    e.raceWith = l;
  }),
  iT = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.repeat = void 0);
    var t = Xr(),
      n = te(),
      o = pe(),
      a = $e(),
      u = Ti();
    function l(c) {
      var f,
        d = 1 / 0,
        v;
      return (
        c != null &&
          (typeof c == "object"
            ? ((f = c.count), (d = f === void 0 ? 1 / 0 : f), (v = c.delay))
            : (d = c)),
        d <= 0
          ? function () {
              return t.EMPTY;
            }
          : n.operate(function (m, h) {
              var g = 0,
                w,
                x = function () {
                  if ((w?.unsubscribe(), (w = null), v != null)) {
                    var O =
                        typeof v == "number" ? u.timer(v) : a.innerFrom(v(g)),
                      A = o.createOperatorSubscriber(h, function () {
                        A.unsubscribe(), S();
                      });
                    O.subscribe(A);
                  } else S();
                },
                S = function () {
                  var O = !1;
                  (w = m.subscribe(
                    o.createOperatorSubscriber(h, void 0, function () {
                      ++g < d ? (w ? x() : (O = !0)) : h.complete();
                    })
                  )),
                    O && x();
                };
              S();
            })
      );
    }
    e.repeat = l;
  }),
  aT = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.repeatWhen = void 0);
    var t = Ft(),
      n = te(),
      o = pe();
    function a(u) {
      return n.operate(function (l, c) {
        var f,
          d = !1,
          v,
          m = !1,
          h = !1,
          g = function () {
            return h && m && (c.complete(), !0);
          },
          w = function () {
            return (
              v ||
                ((v = new t.Subject()),
                u(v).subscribe(
                  o.createOperatorSubscriber(
                    c,
                    function () {
                      f ? x() : (d = !0);
                    },
                    function () {
                      (m = !0), g();
                    }
                  )
                )),
              v
            );
          },
          x = function () {
            (h = !1),
              (f = l.subscribe(
                o.createOperatorSubscriber(c, void 0, function () {
                  (h = !0), !g() && w().next();
                })
              )),
              d && (f.unsubscribe(), (f = null), (d = !1), x());
          };
        x();
      });
    }
    e.repeatWhen = a;
  }),
  uT = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.retry = void 0);
    var t = te(),
      n = pe(),
      o = Kt(),
      a = Ti(),
      u = $e();
    function l(c) {
      c === void 0 && (c = 1 / 0);
      var f;
      c && typeof c == "object" ? (f = c) : (f = { count: c });
      var d = f.count,
        v = d === void 0 ? 1 / 0 : d,
        m = f.delay,
        h = f.resetOnSuccess,
        g = h === void 0 ? !1 : h;
      return v <= 0
        ? o.identity
        : t.operate(function (w, x) {
            var S = 0,
              O,
              A = function () {
                var k = !1;
                (O = w.subscribe(
                  n.createOperatorSubscriber(
                    x,
                    function (j) {
                      g && (S = 0), x.next(j);
                    },
                    void 0,
                    function (j) {
                      if (S++ < v) {
                        var C = function () {
                          O ? (O.unsubscribe(), (O = null), A()) : (k = !0);
                        };
                        if (m != null) {
                          var D =
                              typeof m == "number"
                                ? a.timer(m)
                                : u.innerFrom(m(j, S)),
                            W = n.createOperatorSubscriber(
                              x,
                              function () {
                                W.unsubscribe(), C();
                              },
                              function () {
                                x.complete();
                              }
                            );
                          D.subscribe(W);
                        } else C();
                      } else x.error(j);
                    }
                  )
                )),
                  k && (O.unsubscribe(), (O = null), A());
              };
            A();
          });
    }
    e.retry = l;
  }),
  lT = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.retryWhen = void 0);
    var t = Ft(),
      n = te(),
      o = pe();
    function a(u) {
      return n.operate(function (l, c) {
        var f,
          d = !1,
          v,
          m = function () {
            (f = l.subscribe(
              o.createOperatorSubscriber(c, void 0, void 0, function (h) {
                v ||
                  ((v = new t.Subject()),
                  u(v).subscribe(
                    o.createOperatorSubscriber(c, function () {
                      return f ? m() : (d = !0);
                    })
                  )),
                  v && v.next(h);
              })
            )),
              d && (f.unsubscribe(), (f = null), (d = !1), m());
          };
        m();
      });
    }
    e.retryWhen = a;
  }),
  $_ = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.sample = void 0);
    var t = te(),
      n = Ut(),
      o = pe();
    function a(u) {
      return t.operate(function (l, c) {
        var f = !1,
          d = null;
        l.subscribe(
          o.createOperatorSubscriber(c, function (v) {
            (f = !0), (d = v);
          })
        ),
          u.subscribe(
            o.createOperatorSubscriber(
              c,
              function () {
                if (f) {
                  f = !1;
                  var v = d;
                  (d = null), c.next(v);
                }
              },
              n.noop
            )
          );
      });
    }
    e.sample = a;
  }),
  sT = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.sampleTime = void 0);
    var t = dr(),
      n = $_(),
      o = k_();
    function a(u, l) {
      return l === void 0 && (l = t.asyncScheduler), n.sample(o.interval(u, l));
    }
    e.sampleTime = a;
  }),
  cT = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.scan = void 0);
    var t = te(),
      n = I_();
    function o(a, u) {
      return t.operate(n.scanInternals(a, u, arguments.length >= 2, !0));
    }
    e.scan = o;
  }),
  fT = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.sequenceEqual = void 0);
    var t = te(),
      n = pe();
    function o(u, l) {
      return (
        l === void 0 &&
          (l = function (c, f) {
            return c === f;
          }),
        t.operate(function (c, f) {
          var d = a(),
            v = a(),
            m = function (g) {
              f.next(g), f.complete();
            },
            h = function (g, w) {
              var x = n.createOperatorSubscriber(
                f,
                function (S) {
                  var O = w.buffer,
                    A = w.complete;
                  O.length === 0
                    ? A
                      ? m(!1)
                      : g.buffer.push(S)
                    : !l(S, O.shift()) && m(!1);
                },
                function () {
                  g.complete = !0;
                  var S = w.complete,
                    O = w.buffer;
                  S && m(O.length === 0), x?.unsubscribe();
                }
              );
              return x;
            };
          c.subscribe(h(d, v)), u.subscribe(h(v, d));
        })
      );
    }
    e.sequenceEqual = o;
    function a() {
      return { buffer: [], complete: !1 };
    }
  }),
  V_ = E((e) => {
    var t =
        (e && e.__read) ||
        function (v, m) {
          var h = typeof Symbol == "function" && v[Symbol.iterator];
          if (!h) return v;
          var g = h.call(v),
            w,
            x = [],
            S;
          try {
            for (; (m === void 0 || m-- > 0) && !(w = g.next()).done; )
              x.push(w.value);
          } catch (O) {
            S = { error: O };
          } finally {
            try {
              w && !w.done && (h = g.return) && h.call(g);
            } finally {
              if (S) throw S.error;
            }
          }
          return x;
        },
      n =
        (e && e.__spreadArray) ||
        function (v, m) {
          for (var h = 0, g = m.length, w = v.length; h < g; h++, w++)
            v[w] = m[h];
          return v;
        };
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.share = void 0);
    var o = On(),
      a = Sl(),
      u = Ft(),
      l = wl(),
      c = te();
    function f(v) {
      v === void 0 && (v = {});
      var m = v.connector,
        h =
          m === void 0
            ? function () {
                return new u.Subject();
              }
            : m,
        g = v.resetOnError,
        w = g === void 0 ? !0 : g,
        x = v.resetOnComplete,
        S = x === void 0 ? !0 : x,
        O = v.resetOnRefCountZero,
        A = O === void 0 ? !0 : O;
      return function (k) {
        var j = null,
          C = null,
          D = null,
          W = 0,
          $ = !1,
          F = !1,
          V = function () {
            C?.unsubscribe(), (C = null);
          },
          re = function () {
            V(), (j = D = null), ($ = F = !1);
          },
          he = function () {
            var Z = j;
            re(), Z?.unsubscribe();
          };
        return c.operate(function (Z, ge) {
          W++, !F && !$ && V();
          var Se = (D = D ?? h());
          ge.add(function () {
            W--, W === 0 && !F && !$ && (C = d(he, A));
          }),
            Se.subscribe(ge),
            j ||
              ((j = new l.SafeSubscriber({
                next: function (we) {
                  return Se.next(we);
                },
                error: function (we) {
                  (F = !0), V(), (C = d(re, w, we)), Se.error(we);
                },
                complete: function () {
                  ($ = !0), V(), (C = d(re, S)), Se.complete();
                },
              })),
              o.from(Z).subscribe(j));
        })(k);
      };
    }
    e.share = f;
    function d(v, m) {
      for (var h = [], g = 2; g < arguments.length; g++)
        h[g - 2] = arguments[g];
      return m === !0
        ? (v(), null)
        : m === !1
        ? null
        : m
            .apply(void 0, n([], t(h)))
            .pipe(a.take(1))
            .subscribe(function () {
              return v();
            });
    }
  }),
  dT = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.shareReplay = void 0);
    var t = Dv(),
      n = V_();
    function o(a, u, l) {
      var c,
        f,
        d,
        v,
        m = !1;
      return (
        a && typeof a == "object"
          ? ((c = a.bufferSize),
            (v = c === void 0 ? 1 / 0 : c),
            (f = a.windowTime),
            (u = f === void 0 ? 1 / 0 : f),
            (d = a.refCount),
            (m = d === void 0 ? !1 : d),
            (l = a.scheduler))
          : (v = a ?? 1 / 0),
        n.share({
          connector: function () {
            return new t.ReplaySubject(v, u, l);
          },
          resetOnError: !0,
          resetOnComplete: !1,
          resetOnRefCountZero: m,
        })
      );
    }
    e.shareReplay = o;
  }),
  pT = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.single = void 0);
    var t = ji(),
      n = x_(),
      o = O_(),
      a = te(),
      u = pe();
    function l(c) {
      return a.operate(function (f, d) {
        var v = !1,
          m,
          h = !1,
          g = 0;
        f.subscribe(
          u.createOperatorSubscriber(
            d,
            function (w) {
              (h = !0),
                (!c || c(w, g++, f)) &&
                  (v &&
                    d.error(new n.SequenceError("Too many matching values")),
                  (v = !0),
                  (m = w));
            },
            function () {
              v
                ? (d.next(m), d.complete())
                : d.error(
                    h
                      ? new o.NotFoundError("No matching values")
                      : new t.EmptyError()
                  );
            }
          )
        );
      });
    }
    e.single = l;
  }),
  vT = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.skip = void 0);
    var t = Fa();
    function n(o) {
      return t.filter(function (a, u) {
        return o <= u;
      });
    }
    e.skip = n;
  }),
  hT = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.skipLast = void 0);
    var t = Kt(),
      n = te(),
      o = pe();
    function a(u) {
      return u <= 0
        ? t.identity
        : n.operate(function (l, c) {
            var f = new Array(u),
              d = 0;
            return (
              l.subscribe(
                o.createOperatorSubscriber(c, function (v) {
                  var m = d++;
                  if (m < u) f[m] = v;
                  else {
                    var h = m % u,
                      g = f[h];
                    (f[h] = v), c.next(g);
                  }
                })
              ),
              function () {
                f = null;
              }
            );
          });
    }
    e.skipLast = a;
  }),
  mT = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.skipUntil = void 0);
    var t = te(),
      n = pe(),
      o = $e(),
      a = Ut();
    function u(l) {
      return t.operate(function (c, f) {
        var d = !1,
          v = n.createOperatorSubscriber(
            f,
            function () {
              v?.unsubscribe(), (d = !0);
            },
            a.noop
          );
        o.innerFrom(l).subscribe(v),
          c.subscribe(
            n.createOperatorSubscriber(f, function (m) {
              return d && f.next(m);
            })
          );
      });
    }
    e.skipUntil = u;
  }),
  bT = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.skipWhile = void 0);
    var t = te(),
      n = pe();
    function o(a) {
      return t.operate(function (u, l) {
        var c = !1,
          f = 0;
        u.subscribe(
          n.createOperatorSubscriber(l, function (d) {
            return (c || (c = !a(d, f++))) && l.next(d);
          })
        );
      });
    }
    e.skipWhile = o;
  }),
  yT = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.startWith = void 0);
    var t = Xc(),
      n = pr(),
      o = te();
    function a() {
      for (var u = [], l = 0; l < arguments.length; l++) u[l] = arguments[l];
      var c = n.popScheduler(u);
      return o.operate(function (f, d) {
        (c ? t.concat(u, f, c) : t.concat(u, f)).subscribe(d);
      });
    }
    e.startWith = a;
  }),
  Gc = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.switchMap = void 0);
    var t = $e(),
      n = te(),
      o = pe();
    function a(u, l) {
      return n.operate(function (c, f) {
        var d = null,
          v = 0,
          m = !1,
          h = function () {
            return m && !d && f.complete();
          };
        c.subscribe(
          o.createOperatorSubscriber(
            f,
            function (g) {
              d?.unsubscribe();
              var w = 0,
                x = v++;
              t.innerFrom(u(g, x)).subscribe(
                (d = o.createOperatorSubscriber(
                  f,
                  function (S) {
                    return f.next(l ? l(g, S, x, w++) : S);
                  },
                  function () {
                    (d = null), h();
                  }
                ))
              );
            },
            function () {
              (m = !0), h();
            }
          )
        );
      });
    }
    e.switchMap = a;
  }),
  gT = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.switchAll = void 0);
    var t = Gc(),
      n = Kt();
    function o() {
      return t.switchMap(n.identity);
    }
    e.switchAll = o;
  }),
  wT = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.switchMapTo = void 0);
    var t = Gc(),
      n = Ke();
    function o(a, u) {
      return n.isFunction(u)
        ? t.switchMap(function () {
            return a;
          }, u)
        : t.switchMap(function () {
            return a;
          });
    }
    e.switchMapTo = o;
  }),
  _T = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.switchScan = void 0);
    var t = Gc(),
      n = te();
    function o(a, u) {
      return n.operate(function (l, c) {
        var f = u;
        return (
          t
            .switchMap(
              function (d, v) {
                return a(f, d, v);
              },
              function (d, v) {
                return (f = v), v;
              }
            )(l)
            .subscribe(c),
          function () {
            f = null;
          }
        );
      });
    }
    e.switchScan = o;
  }),
  OT = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.takeUntil = void 0);
    var t = te(),
      n = pe(),
      o = $e(),
      a = Ut();
    function u(l) {
      return t.operate(function (c, f) {
        o.innerFrom(l).subscribe(
          n.createOperatorSubscriber(
            f,
            function () {
              return f.complete();
            },
            a.noop
          )
        ),
          !f.closed && c.subscribe(f);
      });
    }
    e.takeUntil = u;
  }),
  xT = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.takeWhile = void 0);
    var t = te(),
      n = pe();
    function o(a, u) {
      return (
        u === void 0 && (u = !1),
        t.operate(function (l, c) {
          var f = 0;
          l.subscribe(
            n.createOperatorSubscriber(c, function (d) {
              var v = a(d, f++);
              (v || u) && c.next(d), !v && c.complete();
            })
          );
        })
      );
    }
    e.takeWhile = o;
  }),
  ST = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.tap = void 0);
    var t = Ke(),
      n = te(),
      o = pe(),
      a = Kt();
    function u(l, c, f) {
      var d =
        t.isFunction(l) || c || f ? { next: l, error: c, complete: f } : l;
      return d
        ? n.operate(function (v, m) {
            var h;
            (h = d.subscribe) === null || h === void 0 || h.call(d);
            var g = !0;
            v.subscribe(
              o.createOperatorSubscriber(
                m,
                function (w) {
                  var x;
                  (x = d.next) === null || x === void 0 || x.call(d, w),
                    m.next(w);
                },
                function () {
                  var w;
                  (g = !1),
                    (w = d.complete) === null || w === void 0 || w.call(d),
                    m.complete();
                },
                function (w) {
                  var x;
                  (g = !1),
                    (x = d.error) === null || x === void 0 || x.call(d, w),
                    m.error(w);
                },
                function () {
                  var w, x;
                  g &&
                    ((w = d.unsubscribe) === null || w === void 0 || w.call(d)),
                    (x = d.finalize) === null || x === void 0 || x.call(d);
                }
              )
            );
          })
        : a.identity;
    }
    e.tap = u;
  }),
  W_ = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.throttle = e.defaultThrottleConfig = void 0);
    var t = te(),
      n = pe(),
      o = $e();
    e.defaultThrottleConfig = { leading: !0, trailing: !1 };
    function a(u, l) {
      return (
        l === void 0 && (l = e.defaultThrottleConfig),
        t.operate(function (c, f) {
          var d = l.leading,
            v = l.trailing,
            m = !1,
            h = null,
            g = null,
            w = !1,
            x = function () {
              g?.unsubscribe(), (g = null), v && (A(), w && f.complete());
            },
            S = function () {
              (g = null), w && f.complete();
            },
            O = function (k) {
              return (g = o
                .innerFrom(u(k))
                .subscribe(n.createOperatorSubscriber(f, x, S)));
            },
            A = function () {
              if (m) {
                m = !1;
                var k = h;
                (h = null), f.next(k), !w && O(k);
              }
            };
          c.subscribe(
            n.createOperatorSubscriber(
              f,
              function (k) {
                (m = !0), (h = k), !(g && !g.closed) && (d ? A() : O(k));
              },
              function () {
                (w = !0), !(v && m && g && !g.closed) && f.complete();
              }
            )
          );
        })
      );
    }
    e.throttle = a;
  }),
  PT = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.throttleTime = void 0);
    var t = dr(),
      n = W_(),
      o = Ti();
    function a(u, l, c) {
      l === void 0 && (l = t.asyncScheduler),
        c === void 0 && (c = n.defaultThrottleConfig);
      var f = o.timer(u, l);
      return n.throttle(function () {
        return f;
      }, c);
    }
    e.throttleTime = a;
  }),
  ET = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.TimeInterval = e.timeInterval = void 0);
    var t = dr(),
      n = te(),
      o = pe();
    function a(l) {
      return (
        l === void 0 && (l = t.asyncScheduler),
        n.operate(function (c, f) {
          var d = l.now();
          c.subscribe(
            o.createOperatorSubscriber(f, function (v) {
              var m = l.now(),
                h = m - d;
              (d = m), f.next(new u(v, h));
            })
          );
        })
      );
    }
    e.timeInterval = a;
    var u = (function () {
      function l(c, f) {
        (this.value = c), (this.interval = f);
      }
      return l;
    })();
    e.TimeInterval = u;
  }),
  kT = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.timeoutWith = void 0);
    var t = dr(),
      n = qv(),
      o = Hp();
    function a(u, l, c) {
      var f, d, v;
      if (
        ((c = c ?? t.async),
        n.isValidDate(u) ? (f = u) : typeof u == "number" && (d = u),
        l)
      )
        v = function () {
          return l;
        };
      else throw new TypeError("No observable provided to switch to");
      if (f == null && d == null) throw new TypeError("No timeout provided.");
      return o.timeout({ first: f, each: d, scheduler: c, with: v });
    }
    e.timeoutWith = a;
  }),
  jT = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.timestamp = void 0);
    var t = Bv(),
      n = Ai();
    function o(a) {
      return (
        a === void 0 && (a = t.dateTimestampProvider),
        n.map(function (u) {
          return { value: u, timestamp: a.now() };
        })
      );
    }
    e.timestamp = o;
  }),
  AT = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.window = void 0);
    var t = Ft(),
      n = te(),
      o = pe(),
      a = Ut();
    function u(l) {
      return n.operate(function (c, f) {
        var d = new t.Subject();
        f.next(d.asObservable());
        var v = function (m) {
          d.error(m), f.error(m);
        };
        return (
          c.subscribe(
            o.createOperatorSubscriber(
              f,
              function (m) {
                return d?.next(m);
              },
              function () {
                d.complete(), f.complete();
              },
              v
            )
          ),
          l.subscribe(
            o.createOperatorSubscriber(
              f,
              function () {
                d.complete(), f.next((d = new t.Subject()));
              },
              a.noop,
              v
            )
          ),
          function () {
            d?.unsubscribe(), (d = null);
          }
        );
      });
    }
    e.window = u;
  }),
  IT = E((e) => {
    var t =
      (e && e.__values) ||
      function (l) {
        var c = typeof Symbol == "function" && Symbol.iterator,
          f = c && l[c],
          d = 0;
        if (f) return f.call(l);
        if (l && typeof l.length == "number")
          return {
            next: function () {
              return (
                l && d >= l.length && (l = void 0),
                { value: l && l[d++], done: !l }
              );
            },
          };
        throw new TypeError(
          c ? "Object is not iterable." : "Symbol.iterator is not defined."
        );
      };
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.windowCount = void 0);
    var n = Ft(),
      o = te(),
      a = pe();
    function u(l, c) {
      c === void 0 && (c = 0);
      var f = c > 0 ? c : l;
      return o.operate(function (d, v) {
        var m = [new n.Subject()],
          h = 0;
        v.next(m[0].asObservable()),
          d.subscribe(
            a.createOperatorSubscriber(
              v,
              function (g) {
                var w, x;
                try {
                  for (var S = t(m), O = S.next(); !O.done; O = S.next()) {
                    var A = O.value;
                    A.next(g);
                  }
                } catch (C) {
                  w = { error: C };
                } finally {
                  try {
                    O && !O.done && (x = S.return) && x.call(S);
                  } finally {
                    if (w) throw w.error;
                  }
                }
                var k = h - l + 1;
                if (
                  (k >= 0 && k % f === 0 && m.shift().complete(), ++h % f === 0)
                ) {
                  var j = new n.Subject();
                  m.push(j), v.next(j.asObservable());
                }
              },
              function () {
                for (; m.length > 0; ) m.shift().complete();
                v.complete();
              },
              function (g) {
                for (; m.length > 0; ) m.shift().error(g);
                v.error(g);
              },
              function () {
                m = null;
              }
            )
          );
      });
    }
    e.windowCount = u;
  }),
  TT = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.windowTime = void 0);
    var t = Ft(),
      n = dr(),
      o = fr(),
      a = te(),
      u = pe(),
      l = Co(),
      c = pr(),
      f = zo();
    function d(v) {
      for (var m, h, g = [], w = 1; w < arguments.length; w++)
        g[w - 1] = arguments[w];
      var x =
          (m = c.popScheduler(g)) !== null && m !== void 0
            ? m
            : n.asyncScheduler,
        S = (h = g[0]) !== null && h !== void 0 ? h : null,
        O = g[1] || 1 / 0;
      return a.operate(function (A, k) {
        var j = [],
          C = !1,
          D = function (V) {
            var re = V.window,
              he = V.subs;
            re.complete(), he.unsubscribe(), l.arrRemove(j, V), C && W();
          },
          W = function () {
            if (j) {
              var V = new o.Subscription();
              k.add(V);
              var re = new t.Subject(),
                he = { window: re, subs: V, seen: 0 };
              j.push(he),
                k.next(re.asObservable()),
                f.executeSchedule(
                  V,
                  x,
                  function () {
                    return D(he);
                  },
                  v
                );
            }
          };
        S !== null && S >= 0 ? f.executeSchedule(k, x, W, S, !0) : (C = !0),
          W();
        var $ = function (V) {
            return j.slice().forEach(V);
          },
          F = function (V) {
            $(function (re) {
              var he = re.window;
              return V(he);
            }),
              V(k),
              k.unsubscribe();
          };
        return (
          A.subscribe(
            u.createOperatorSubscriber(
              k,
              function (V) {
                $(function (re) {
                  re.window.next(V), O <= ++re.seen && D(re);
                });
              },
              function () {
                return F(function (V) {
                  return V.complete();
                });
              },
              function (V) {
                return F(function (re) {
                  return re.error(V);
                });
              }
            )
          ),
          function () {
            j = null;
          }
        );
      });
    }
    e.windowTime = d;
  }),
  MT = E((e) => {
    var t =
      (e && e.__values) ||
      function (v) {
        var m = typeof Symbol == "function" && Symbol.iterator,
          h = m && v[m],
          g = 0;
        if (h) return h.call(v);
        if (v && typeof v.length == "number")
          return {
            next: function () {
              return (
                v && g >= v.length && (v = void 0),
                { value: v && v[g++], done: !v }
              );
            },
          };
        throw new TypeError(
          m ? "Object is not iterable." : "Symbol.iterator is not defined."
        );
      };
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.windowToggle = void 0);
    var n = Ft(),
      o = fr(),
      a = te(),
      u = $e(),
      l = pe(),
      c = Ut(),
      f = Co();
    function d(v, m) {
      return a.operate(function (h, g) {
        var w = [],
          x = function (S) {
            for (; 0 < w.length; ) w.shift().error(S);
            g.error(S);
          };
        u.innerFrom(v).subscribe(
          l.createOperatorSubscriber(
            g,
            function (S) {
              var O = new n.Subject();
              w.push(O);
              var A = new o.Subscription(),
                k = function () {
                  f.arrRemove(w, O), O.complete(), A.unsubscribe();
                },
                j;
              try {
                j = u.innerFrom(m(S));
              } catch (C) {
                x(C);
                return;
              }
              g.next(O.asObservable()),
                A.add(j.subscribe(l.createOperatorSubscriber(g, k, c.noop, x)));
            },
            c.noop
          )
        ),
          h.subscribe(
            l.createOperatorSubscriber(
              g,
              function (S) {
                var O,
                  A,
                  k = w.slice();
                try {
                  for (var j = t(k), C = j.next(); !C.done; C = j.next()) {
                    var D = C.value;
                    D.next(S);
                  }
                } catch (W) {
                  O = { error: W };
                } finally {
                  try {
                    C && !C.done && (A = j.return) && A.call(j);
                  } finally {
                    if (O) throw O.error;
                  }
                }
              },
              function () {
                for (; 0 < w.length; ) w.shift().complete();
                g.complete();
              },
              x,
              function () {
                for (; 0 < w.length; ) w.shift().unsubscribe();
              }
            )
          );
      });
    }
    e.windowToggle = d;
  }),
  NT = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.windowWhen = void 0);
    var t = Ft(),
      n = te(),
      o = pe(),
      a = $e();
    function u(l) {
      return n.operate(function (c, f) {
        var d,
          v,
          m = function (g) {
            d.error(g), f.error(g);
          },
          h = function () {
            v?.unsubscribe(),
              d?.complete(),
              (d = new t.Subject()),
              f.next(d.asObservable());
            var g;
            try {
              g = a.innerFrom(l());
            } catch (w) {
              m(w);
              return;
            }
            g.subscribe((v = o.createOperatorSubscriber(f, h, h, m)));
          };
        h(),
          c.subscribe(
            o.createOperatorSubscriber(
              f,
              function (g) {
                return d.next(g);
              },
              function () {
                d.complete(), f.complete();
              },
              m,
              function () {
                v?.unsubscribe(), (d = null);
              }
            )
          );
      });
    }
    e.windowWhen = u;
  }),
  CT = E((e) => {
    var t =
        (e && e.__read) ||
        function (v, m) {
          var h = typeof Symbol == "function" && v[Symbol.iterator];
          if (!h) return v;
          var g = h.call(v),
            w,
            x = [],
            S;
          try {
            for (; (m === void 0 || m-- > 0) && !(w = g.next()).done; )
              x.push(w.value);
          } catch (O) {
            S = { error: O };
          } finally {
            try {
              w && !w.done && (h = g.return) && h.call(g);
            } finally {
              if (S) throw S.error;
            }
          }
          return x;
        },
      n =
        (e && e.__spreadArray) ||
        function (v, m) {
          for (var h = 0, g = m.length, w = v.length; h < g; h++, w++)
            v[w] = m[h];
          return v;
        };
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.withLatestFrom = void 0);
    var o = te(),
      a = pe(),
      u = $e(),
      l = Kt(),
      c = Ut(),
      f = pr();
    function d() {
      for (var v = [], m = 0; m < arguments.length; m++) v[m] = arguments[m];
      var h = f.popResultSelector(v);
      return o.operate(function (g, w) {
        for (
          var x = v.length,
            S = new Array(x),
            O = v.map(function () {
              return !1;
            }),
            A = !1,
            k = function (C) {
              u.innerFrom(v[C]).subscribe(
                a.createOperatorSubscriber(
                  w,
                  function (D) {
                    (S[C] = D),
                      !A &&
                        !O[C] &&
                        ((O[C] = !0), (A = O.every(l.identity)) && (O = null));
                  },
                  c.noop
                )
              );
            },
            j = 0;
          j < x;
          j++
        )
          k(j);
        g.subscribe(
          a.createOperatorSubscriber(w, function (C) {
            if (A) {
              var D = n([C], t(S));
              w.next(h ? h.apply(void 0, n([], t(D))) : D);
            }
          })
        );
      });
    }
    e.withLatestFrom = d;
  }),
  zT = E((e) => {
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.zipAll = void 0);
    var t = Qv(),
      n = M_();
    function o(a) {
      return n.joinAllInternals(t.zip, a);
    }
    e.zipAll = o;
  }),
  RT = E((e) => {
    var t =
        (e && e.__read) ||
        function (l, c) {
          var f = typeof Symbol == "function" && l[Symbol.iterator];
          if (!f) return l;
          var d = f.call(l),
            v,
            m = [],
            h;
          try {
            for (; (c === void 0 || c-- > 0) && !(v = d.next()).done; )
              m.push(v.value);
          } catch (g) {
            h = { error: g };
          } finally {
            try {
              v && !v.done && (f = d.return) && f.call(d);
            } finally {
              if (h) throw h.error;
            }
          }
          return m;
        },
      n =
        (e && e.__spreadArray) ||
        function (l, c) {
          for (var f = 0, d = c.length, v = l.length; f < d; f++, v++)
            l[v] = c[f];
          return l;
        };
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.zip = void 0);
    var o = Qv(),
      a = te();
    function u() {
      for (var l = [], c = 0; c < arguments.length; c++) l[c] = arguments[c];
      return a.operate(function (f, d) {
        o.zip.apply(void 0, n([f], t(l))).subscribe(d);
      });
    }
    e.zip = u;
  }),
  LT = E((e) => {
    var t =
        (e && e.__read) ||
        function (u, l) {
          var c = typeof Symbol == "function" && u[Symbol.iterator];
          if (!c) return u;
          var f = c.call(u),
            d,
            v = [],
            m;
          try {
            for (; (l === void 0 || l-- > 0) && !(d = f.next()).done; )
              v.push(d.value);
          } catch (h) {
            m = { error: h };
          } finally {
            try {
              d && !d.done && (c = f.return) && c.call(f);
            } finally {
              if (m) throw m.error;
            }
          }
          return v;
        },
      n =
        (e && e.__spreadArray) ||
        function (u, l) {
          for (var c = 0, f = l.length, d = u.length; c < f; c++, d++)
            u[d] = l[c];
          return u;
        };
    Object.defineProperty(e, "__esModule", { value: !0 }), (e.zipWith = void 0);
    var o = RT();
    function a() {
      for (var u = [], l = 0; l < arguments.length; l++) u[l] = arguments[l];
      return o.zip.apply(void 0, n([], t(u)));
    }
    e.zipWith = a;
  }),
  q_ = E((e) => {
    var t =
        (e && e.__createBinding) ||
        (Object.create
          ? function (Tr, jn, Xt, mr) {
              mr === void 0 && (mr = Xt),
                Object.defineProperty(Tr, mr, {
                  enumerable: !0,
                  get: function () {
                    return jn[Xt];
                  },
                });
            }
          : function (Tr, jn, Xt, mr) {
              mr === void 0 && (mr = Xt), (Tr[mr] = jn[Xt]);
            }),
      n =
        (e && e.__exportStar) ||
        function (Tr, jn) {
          for (var Xt in Tr)
            Xt !== "default" &&
              !Object.prototype.hasOwnProperty.call(jn, Xt) &&
              t(jn, Tr, Xt);
        };
    Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.interval =
        e.iif =
        e.generate =
        e.fromEventPattern =
        e.fromEvent =
        e.from =
        e.forkJoin =
        e.empty =
        e.defer =
        e.connectable =
        e.concat =
        e.combineLatest =
        e.bindNodeCallback =
        e.bindCallback =
        e.UnsubscriptionError =
        e.TimeoutError =
        e.SequenceError =
        e.ObjectUnsubscribedError =
        e.NotFoundError =
        e.EmptyError =
        e.ArgumentOutOfRangeError =
        e.firstValueFrom =
        e.lastValueFrom =
        e.isObservable =
        e.identity =
        e.noop =
        e.pipe =
        e.NotificationKind =
        e.Notification =
        e.Subscriber =
        e.Subscription =
        e.Scheduler =
        e.VirtualAction =
        e.VirtualTimeScheduler =
        e.animationFrameScheduler =
        e.animationFrame =
        e.queueScheduler =
        e.queue =
        e.asyncScheduler =
        e.async =
        e.asapScheduler =
        e.asap =
        e.AsyncSubject =
        e.ReplaySubject =
        e.BehaviorSubject =
        e.Subject =
        e.animationFrames =
        e.observable =
        e.ConnectableObservable =
        e.Observable =
          void 0),
      (e.filter =
        e.expand =
        e.exhaustMap =
        e.exhaustAll =
        e.exhaust =
        e.every =
        e.endWith =
        e.elementAt =
        e.distinctUntilKeyChanged =
        e.distinctUntilChanged =
        e.distinct =
        e.dematerialize =
        e.delayWhen =
        e.delay =
        e.defaultIfEmpty =
        e.debounceTime =
        e.debounce =
        e.count =
        e.connect =
        e.concatWith =
        e.concatMapTo =
        e.concatMap =
        e.concatAll =
        e.combineLatestWith =
        e.combineLatestAll =
        e.combineAll =
        e.catchError =
        e.bufferWhen =
        e.bufferToggle =
        e.bufferTime =
        e.bufferCount =
        e.buffer =
        e.auditTime =
        e.audit =
        e.config =
        e.NEVER =
        e.EMPTY =
        e.scheduled =
        e.zip =
        e.using =
        e.timer =
        e.throwError =
        e.range =
        e.race =
        e.partition =
        e.pairs =
        e.onErrorResumeNext =
        e.of =
        e.never =
        e.merge =
          void 0),
      (e.switchMapTo =
        e.switchMap =
        e.switchAll =
        e.subscribeOn =
        e.startWith =
        e.skipWhile =
        e.skipUntil =
        e.skipLast =
        e.skip =
        e.single =
        e.shareReplay =
        e.share =
        e.sequenceEqual =
        e.scan =
        e.sampleTime =
        e.sample =
        e.refCount =
        e.retryWhen =
        e.retry =
        e.repeatWhen =
        e.repeat =
        e.reduce =
        e.raceWith =
        e.publishReplay =
        e.publishLast =
        e.publishBehavior =
        e.publish =
        e.pluck =
        e.pairwise =
        e.observeOn =
        e.multicast =
        e.min =
        e.mergeWith =
        e.mergeScan =
        e.mergeMapTo =
        e.mergeMap =
        e.flatMap =
        e.mergeAll =
        e.max =
        e.materialize =
        e.mapTo =
        e.map =
        e.last =
        e.isEmpty =
        e.ignoreElements =
        e.groupBy =
        e.first =
        e.findIndex =
        e.find =
        e.finalize =
          void 0),
      (e.zipWith =
        e.zipAll =
        e.withLatestFrom =
        e.windowWhen =
        e.windowToggle =
        e.windowTime =
        e.windowCount =
        e.window =
        e.toArray =
        e.timestamp =
        e.timeoutWith =
        e.timeout =
        e.timeInterval =
        e.throwIfEmpty =
        e.throttleTime =
        e.throttle =
        e.tap =
        e.takeWhile =
        e.takeUntil =
        e.takeLast =
        e.take =
        e.switchScan =
          void 0);
    var o = Ze();
    Object.defineProperty(e, "Observable", {
      enumerable: !0,
      get: function () {
        return o.Observable;
      },
    });
    var a = Vc();
    Object.defineProperty(e, "ConnectableObservable", {
      enumerable: !0,
      get: function () {
        return a.ConnectableObservable;
      },
    });
    var u = Fc();
    Object.defineProperty(e, "observable", {
      enumerable: !0,
      get: function () {
        return u.observable;
      },
    });
    var l = EA();
    Object.defineProperty(e, "animationFrames", {
      enumerable: !0,
      get: function () {
        return l.animationFrames;
      },
    });
    var c = Ft();
    Object.defineProperty(e, "Subject", {
      enumerable: !0,
      get: function () {
        return c.Subject;
      },
    });
    var f = s_();
    Object.defineProperty(e, "BehaviorSubject", {
      enumerable: !0,
      get: function () {
        return f.BehaviorSubject;
      },
    });
    var d = Dv();
    Object.defineProperty(e, "ReplaySubject", {
      enumerable: !0,
      get: function () {
        return d.ReplaySubject;
      },
    });
    var v = Uv();
    Object.defineProperty(e, "AsyncSubject", {
      enumerable: !0,
      get: function () {
        return v.AsyncSubject;
      },
    });
    var m = NA();
    Object.defineProperty(e, "asap", {
      enumerable: !0,
      get: function () {
        return m.asap;
      },
    }),
      Object.defineProperty(e, "asapScheduler", {
        enumerable: !0,
        get: function () {
          return m.asapScheduler;
        },
      });
    var h = dr();
    Object.defineProperty(e, "async", {
      enumerable: !0,
      get: function () {
        return h.async;
      },
    }),
      Object.defineProperty(e, "asyncScheduler", {
        enumerable: !0,
        get: function () {
          return h.asyncScheduler;
        },
      });
    var g = RA();
    Object.defineProperty(e, "queue", {
      enumerable: !0,
      get: function () {
        return g.queue;
      },
    }),
      Object.defineProperty(e, "queueScheduler", {
        enumerable: !0,
        get: function () {
          return g.queueScheduler;
        },
      });
    var w = DA();
    Object.defineProperty(e, "animationFrame", {
      enumerable: !0,
      get: function () {
        return w.animationFrame;
      },
    }),
      Object.defineProperty(e, "animationFrameScheduler", {
        enumerable: !0,
        get: function () {
          return w.animationFrameScheduler;
        },
      });
    var x = UA();
    Object.defineProperty(e, "VirtualTimeScheduler", {
      enumerable: !0,
      get: function () {
        return x.VirtualTimeScheduler;
      },
    }),
      Object.defineProperty(e, "VirtualAction", {
        enumerable: !0,
        get: function () {
          return x.VirtualAction;
        },
      });
    var S = c_();
    Object.defineProperty(e, "Scheduler", {
      enumerable: !0,
      get: function () {
        return S.Scheduler;
      },
    });
    var O = fr();
    Object.defineProperty(e, "Subscription", {
      enumerable: !0,
      get: function () {
        return O.Subscription;
      },
    });
    var A = wl();
    Object.defineProperty(e, "Subscriber", {
      enumerable: !0,
      get: function () {
        return A.Subscriber;
      },
    });
    var k = Wv();
    Object.defineProperty(e, "Notification", {
      enumerable: !0,
      get: function () {
        return k.Notification;
      },
    }),
      Object.defineProperty(e, "NotificationKind", {
        enumerable: !0,
        get: function () {
          return k.NotificationKind;
        },
      });
    var j = $c();
    Object.defineProperty(e, "pipe", {
      enumerable: !0,
      get: function () {
        return j.pipe;
      },
    });
    var C = Ut();
    Object.defineProperty(e, "noop", {
      enumerable: !0,
      get: function () {
        return C.noop;
      },
    });
    var D = Kt();
    Object.defineProperty(e, "identity", {
      enumerable: !0,
      get: function () {
        return D.identity;
      },
    });
    var W = qA();
    Object.defineProperty(e, "isObservable", {
      enumerable: !0,
      get: function () {
        return W.isObservable;
      },
    });
    var $ = KA();
    Object.defineProperty(e, "lastValueFrom", {
      enumerable: !0,
      get: function () {
        return $.lastValueFrom;
      },
    });
    var F = HA();
    Object.defineProperty(e, "firstValueFrom", {
      enumerable: !0,
      get: function () {
        return F.firstValueFrom;
      },
    });
    var V = __();
    Object.defineProperty(e, "ArgumentOutOfRangeError", {
      enumerable: !0,
      get: function () {
        return V.ArgumentOutOfRangeError;
      },
    });
    var re = ji();
    Object.defineProperty(e, "EmptyError", {
      enumerable: !0,
      get: function () {
        return re.EmptyError;
      },
    });
    var he = O_();
    Object.defineProperty(e, "NotFoundError", {
      enumerable: !0,
      get: function () {
        return he.NotFoundError;
      },
    });
    var Z = l_();
    Object.defineProperty(e, "ObjectUnsubscribedError", {
      enumerable: !0,
      get: function () {
        return Z.ObjectUnsubscribedError;
      },
    });
    var ge = x_();
    Object.defineProperty(e, "SequenceError", {
      enumerable: !0,
      get: function () {
        return ge.SequenceError;
      },
    });
    var Se = Hp();
    Object.defineProperty(e, "TimeoutError", {
      enumerable: !0,
      get: function () {
        return Se.TimeoutError;
      },
    });
    var we = n_();
    Object.defineProperty(e, "UnsubscriptionError", {
      enumerable: !0,
      get: function () {
        return we.UnsubscriptionError;
      },
    });
    var ce = XA();
    Object.defineProperty(e, "bindCallback", {
      enumerable: !0,
      get: function () {
        return ce.bindCallback;
      },
    });
    var K = QA();
    Object.defineProperty(e, "bindNodeCallback", {
      enumerable: !0,
      get: function () {
        return K.bindNodeCallback;
      },
    });
    var de = Kv();
    Object.defineProperty(e, "combineLatest", {
      enumerable: !0,
      get: function () {
        return de.combineLatest;
      },
    });
    var me = Xc();
    Object.defineProperty(e, "concat", {
      enumerable: !0,
      get: function () {
        return me.concat;
      },
    });
    var I = YA();
    Object.defineProperty(e, "connectable", {
      enumerable: !0,
      get: function () {
        return I.connectable;
      },
    });
    var q = Qc();
    Object.defineProperty(e, "defer", {
      enumerable: !0,
      get: function () {
        return q.defer;
      },
    });
    var Ee = Xr();
    Object.defineProperty(e, "empty", {
      enumerable: !0,
      get: function () {
        return Ee.empty;
      },
    });
    var Ie = JA();
    Object.defineProperty(e, "forkJoin", {
      enumerable: !0,
      get: function () {
        return Ie.forkJoin;
      },
    });
    var je = On();
    Object.defineProperty(e, "from", {
      enumerable: !0,
      get: function () {
        return je.from;
      },
    });
    var Ce = GA();
    Object.defineProperty(e, "fromEvent", {
      enumerable: !0,
      get: function () {
        return Ce.fromEvent;
      },
    });
    var Be = ZA();
    Object.defineProperty(e, "fromEventPattern", {
      enumerable: !0,
      get: function () {
        return Be.fromEventPattern;
      },
    });
    var He = eI();
    Object.defineProperty(e, "generate", {
      enumerable: !0,
      get: function () {
        return He.generate;
      },
    });
    var ze = tI();
    Object.defineProperty(e, "iif", {
      enumerable: !0,
      get: function () {
        return ze.iif;
      },
    });
    var Ot = k_();
    Object.defineProperty(e, "interval", {
      enumerable: !0,
      get: function () {
        return Ot.interval;
      },
    });
    var Va = rI();
    Object.defineProperty(e, "merge", {
      enumerable: !0,
      get: function () {
        return Va.merge;
      },
    });
    var vr = Ty();
    Object.defineProperty(e, "never", {
      enumerable: !0,
      get: function () {
        return vr.never;
      },
    });
    var Bo = Vv();
    Object.defineProperty(e, "of", {
      enumerable: !0,
      get: function () {
        return Bo.of;
      },
    });
    var Qr = oI();
    Object.defineProperty(e, "onErrorResumeNext", {
      enumerable: !0,
      get: function () {
        return Qr.onErrorResumeNext;
      },
    });
    var xn = iI();
    Object.defineProperty(e, "pairs", {
      enumerable: !0,
      get: function () {
        return xn.pairs;
      },
    });
    var Qn = uI();
    Object.defineProperty(e, "partition", {
      enumerable: !0,
      get: function () {
        return Qn.partition;
      },
    });
    var Ar = j_();
    Object.defineProperty(e, "race", {
      enumerable: !0,
      get: function () {
        return Ar.race;
      },
    });
    var Yn = lI();
    Object.defineProperty(e, "range", {
      enumerable: !0,
      get: function () {
        return Yn.range;
      },
    });
    var Do = w_();
    Object.defineProperty(e, "throwError", {
      enumerable: !0,
      get: function () {
        return Do.throwError;
      },
    });
    var Jn = Ti();
    Object.defineProperty(e, "timer", {
      enumerable: !0,
      get: function () {
        return Jn.timer;
      },
    });
    var Sn = sI();
    Object.defineProperty(e, "using", {
      enumerable: !0,
      get: function () {
        return Sn.using;
      },
    });
    var Ht = Qv();
    Object.defineProperty(e, "zip", {
      enumerable: !0,
      get: function () {
        return Ht.zip;
      },
    });
    var Yr = g_();
    Object.defineProperty(e, "scheduled", {
      enumerable: !0,
      get: function () {
        return Yr.scheduled;
      },
    });
    var Uo = Xr();
    Object.defineProperty(e, "EMPTY", {
      enumerable: !0,
      get: function () {
        return Uo.EMPTY;
      },
    });
    var Gn = Ty();
    Object.defineProperty(e, "NEVER", {
      enumerable: !0,
      get: function () {
        return Gn.NEVER;
      },
    }),
      n(cI(), e);
    var Mi = gl();
    Object.defineProperty(e, "config", {
      enumerable: !0,
      get: function () {
        return Mi.config;
      },
    });
    var Ni = A_();
    Object.defineProperty(e, "audit", {
      enumerable: !0,
      get: function () {
        return Ni.audit;
      },
    });
    var Zn = fI();
    Object.defineProperty(e, "auditTime", {
      enumerable: !0,
      get: function () {
        return Zn.auditTime;
      },
    });
    var eo = dI();
    Object.defineProperty(e, "buffer", {
      enumerable: !0,
      get: function () {
        return eo.buffer;
      },
    });
    var B = pI();
    Object.defineProperty(e, "bufferCount", {
      enumerable: !0,
      get: function () {
        return B.bufferCount;
      },
    });
    var U = vI();
    Object.defineProperty(e, "bufferTime", {
      enumerable: !0,
      get: function () {
        return U.bufferTime;
      },
    });
    var H = hI();
    Object.defineProperty(e, "bufferToggle", {
      enumerable: !0,
      get: function () {
        return H.bufferToggle;
      },
    });
    var le = mI();
    Object.defineProperty(e, "bufferWhen", {
      enumerable: !0,
      get: function () {
        return le.bufferWhen;
      },
    });
    var ae = bI();
    Object.defineProperty(e, "catchError", {
      enumerable: !0,
      get: function () {
        return ae.catchError;
      },
    });
    var xe = yI();
    Object.defineProperty(e, "combineAll", {
      enumerable: !0,
      get: function () {
        return xe.combineAll;
      },
    });
    var Ae = N_();
    Object.defineProperty(e, "combineLatestAll", {
      enumerable: !0,
      get: function () {
        return Ae.combineLatestAll;
      },
    });
    var ye = wI();
    Object.defineProperty(e, "combineLatestWith", {
      enumerable: !0,
      get: function () {
        return ye.combineLatestWith;
      },
    });
    var fe = Xv();
    Object.defineProperty(e, "concatAll", {
      enumerable: !0,
      get: function () {
        return fe.concatAll;
      },
    });
    var Me = C_();
    Object.defineProperty(e, "concatMap", {
      enumerable: !0,
      get: function () {
        return Me.concatMap;
      },
    });
    var Re = _I();
    Object.defineProperty(e, "concatMapTo", {
      enumerable: !0,
      get: function () {
        return Re.concatMapTo;
      },
    });
    var ut = xI();
    Object.defineProperty(e, "concatWith", {
      enumerable: !0,
      get: function () {
        return ut.concatWith;
      },
    });
    var Xe = Yv();
    Object.defineProperty(e, "connect", {
      enumerable: !0,
      get: function () {
        return Xe.connect;
      },
    });
    var Qe = PI();
    Object.defineProperty(e, "count", {
      enumerable: !0,
      get: function () {
        return Qe.count;
      },
    });
    var It = EI();
    Object.defineProperty(e, "debounce", {
      enumerable: !0,
      get: function () {
        return It.debounce;
      },
    });
    var Jr = kI();
    Object.defineProperty(e, "debounceTime", {
      enumerable: !0,
      get: function () {
        return Jr.debounceTime;
      },
    });
    var to = Yc();
    Object.defineProperty(e, "defaultIfEmpty", {
      enumerable: !0,
      get: function () {
        return to.defaultIfEmpty;
      },
    });
    var Pn = jI();
    Object.defineProperty(e, "delay", {
      enumerable: !0,
      get: function () {
        return Pn.delay;
      },
    });
    var nr = L_();
    Object.defineProperty(e, "delayWhen", {
      enumerable: !0,
      get: function () {
        return nr.delayWhen;
      },
    });
    var Gr = AI();
    Object.defineProperty(e, "dematerialize", {
      enumerable: !0,
      get: function () {
        return Gr.dematerialize;
      },
    });
    var ro = II();
    Object.defineProperty(e, "distinct", {
      enumerable: !0,
      get: function () {
        return ro.distinct;
      },
    });
    var Ir = B_();
    Object.defineProperty(e, "distinctUntilChanged", {
      enumerable: !0,
      get: function () {
        return Ir.distinctUntilChanged;
      },
    });
    var En = TI();
    Object.defineProperty(e, "distinctUntilKeyChanged", {
      enumerable: !0,
      get: function () {
        return En.distinctUntilKeyChanged;
      },
    });
    var or = MI();
    Object.defineProperty(e, "elementAt", {
      enumerable: !0,
      get: function () {
        return or.elementAt;
      },
    });
    var Ye = NI();
    Object.defineProperty(e, "endWith", {
      enumerable: !0,
      get: function () {
        return Ye.endWith;
      },
    });
    var dt = CI();
    Object.defineProperty(e, "every", {
      enumerable: !0,
      get: function () {
        return dt.every;
      },
    });
    var ir = zI();
    Object.defineProperty(e, "exhaust", {
      enumerable: !0,
      get: function () {
        return ir.exhaust;
      },
    });
    var Zr = D_();
    Object.defineProperty(e, "exhaustAll", {
      enumerable: !0,
      get: function () {
        return Zr.exhaustAll;
      },
    });
    var mt = RI();
    Object.defineProperty(e, "exhaustMap", {
      enumerable: !0,
      get: function () {
        return mt.exhaustMap;
      },
    });
    var Fo = LI();
    Object.defineProperty(e, "expand", {
      enumerable: !0,
      get: function () {
        return Fo.expand;
      },
    });
    var Ci = Fa();
    Object.defineProperty(e, "filter", {
      enumerable: !0,
      get: function () {
        return Ci.filter;
      },
    });
    var Wa = BI();
    Object.defineProperty(e, "finalize", {
      enumerable: !0,
      get: function () {
        return Wa.finalize;
      },
    });
    var kn = U_();
    Object.defineProperty(e, "find", {
      enumerable: !0,
      get: function () {
        return kn.find;
      },
    });
    var Al = DI();
    Object.defineProperty(e, "findIndex", {
      enumerable: !0,
      get: function () {
        return Al.findIndex;
      },
    });
    var Il = UI();
    Object.defineProperty(e, "first", {
      enumerable: !0,
      get: function () {
        return Il.first;
      },
    });
    var af = FI();
    Object.defineProperty(e, "groupBy", {
      enumerable: !0,
      get: function () {
        return af.groupBy;
      },
    });
    var Tl = z_();
    Object.defineProperty(e, "ignoreElements", {
      enumerable: !0,
      get: function () {
        return Tl.ignoreElements;
      },
    });
    var Ml = $I();
    Object.defineProperty(e, "isEmpty", {
      enumerable: !0,
      get: function () {
        return Ml.isEmpty;
      },
    });
    var Nl = VI();
    Object.defineProperty(e, "last", {
      enumerable: !0,
      get: function () {
        return Nl.last;
      },
    });
    var Cl = Ai();
    Object.defineProperty(e, "map", {
      enumerable: !0,
      get: function () {
        return Cl.map;
      },
    });
    var uf = R_();
    Object.defineProperty(e, "mapTo", {
      enumerable: !0,
      get: function () {
        return uf.mapTo;
      },
    });
    var lf = WI();
    Object.defineProperty(e, "materialize", {
      enumerable: !0,
      get: function () {
        return lf.materialize;
      },
    });
    var ot = qI();
    Object.defineProperty(e, "max", {
      enumerable: !0,
      get: function () {
        return ot.max;
      },
    });
    var sf = Hc();
    Object.defineProperty(e, "mergeAll", {
      enumerable: !0,
      get: function () {
        return sf.mergeAll;
      },
    });
    var qa = KI();
    Object.defineProperty(e, "flatMap", {
      enumerable: !0,
      get: function () {
        return qa.flatMap;
      },
    });
    var zl = Ro();
    Object.defineProperty(e, "mergeMap", {
      enumerable: !0,
      get: function () {
        return zl.mergeMap;
      },
    });
    var zi = HI();
    Object.defineProperty(e, "mergeMapTo", {
      enumerable: !0,
      get: function () {
        return zi.mergeMapTo;
      },
    });
    var cf = XI();
    Object.defineProperty(e, "mergeScan", {
      enumerable: !0,
      get: function () {
        return cf.mergeScan;
      },
    });
    var Rl = YI();
    Object.defineProperty(e, "mergeWith", {
      enumerable: !0,
      get: function () {
        return Rl.mergeWith;
      },
    });
    var Ri = JI();
    Object.defineProperty(e, "min", {
      enumerable: !0,
      get: function () {
        return Ri.min;
      },
    });
    var hr = Jv();
    Object.defineProperty(e, "multicast", {
      enumerable: !0,
      get: function () {
        return hr.multicast;
      },
    });
    var ff = qc();
    Object.defineProperty(e, "observeOn", {
      enumerable: !0,
      get: function () {
        return ff.observeOn;
      },
    });
    var ar = GI();
    Object.defineProperty(e, "pairwise", {
      enumerable: !0,
      get: function () {
        return ar.pairwise;
      },
    });
    var df = ZI();
    Object.defineProperty(e, "pluck", {
      enumerable: !0,
      get: function () {
        return df.pluck;
      },
    });
    var pf = eT();
    Object.defineProperty(e, "publish", {
      enumerable: !0,
      get: function () {
        return pf.publish;
      },
    });
    var vf = tT();
    Object.defineProperty(e, "publishBehavior", {
      enumerable: !0,
      get: function () {
        return vf.publishBehavior;
      },
    });
    var Li = rT();
    Object.defineProperty(e, "publishLast", {
      enumerable: !0,
      get: function () {
        return Li.publishLast;
      },
    });
    var Bi = nT();
    Object.defineProperty(e, "publishReplay", {
      enumerable: !0,
      get: function () {
        return Bi.publishReplay;
      },
    });
    var $o = oT();
    Object.defineProperty(e, "raceWith", {
      enumerable: !0,
      get: function () {
        return $o.raceWith;
      },
    });
    var Di = xl();
    Object.defineProperty(e, "reduce", {
      enumerable: !0,
      get: function () {
        return Di.reduce;
      },
    });
    var hf = iT();
    Object.defineProperty(e, "repeat", {
      enumerable: !0,
      get: function () {
        return hf.repeat;
      },
    });
    var mf = aT();
    Object.defineProperty(e, "repeatWhen", {
      enumerable: !0,
      get: function () {
        return mf.repeatWhen;
      },
    });
    var Ka = uT();
    Object.defineProperty(e, "retry", {
      enumerable: !0,
      get: function () {
        return Ka.retry;
      },
    });
    var Ll = lT();
    Object.defineProperty(e, "retryWhen", {
      enumerable: !0,
      get: function () {
        return Ll.retryWhen;
      },
    });
    var Ha = a_();
    Object.defineProperty(e, "refCount", {
      enumerable: !0,
      get: function () {
        return Ha.refCount;
      },
    });
    var Vo = $_();
    Object.defineProperty(e, "sample", {
      enumerable: !0,
      get: function () {
        return Vo.sample;
      },
    });
    var bf = sT();
    Object.defineProperty(e, "sampleTime", {
      enumerable: !0,
      get: function () {
        return bf.sampleTime;
      },
    });
    var Xa = cT();
    Object.defineProperty(e, "scan", {
      enumerable: !0,
      get: function () {
        return Xa.scan;
      },
    });
    var Ve = fT();
    Object.defineProperty(e, "sequenceEqual", {
      enumerable: !0,
      get: function () {
        return Ve.sequenceEqual;
      },
    });
    var Bl = V_();
    Object.defineProperty(e, "share", {
      enumerable: !0,
      get: function () {
        return Bl.share;
      },
    });
    var Dl = dT();
    Object.defineProperty(e, "shareReplay", {
      enumerable: !0,
      get: function () {
        return Dl.shareReplay;
      },
    });
    var Qa = pT();
    Object.defineProperty(e, "single", {
      enumerable: !0,
      get: function () {
        return Qa.single;
      },
    });
    var Ul = vT();
    Object.defineProperty(e, "skip", {
      enumerable: !0,
      get: function () {
        return Ul.skip;
      },
    });
    var Fl = hT();
    Object.defineProperty(e, "skipLast", {
      enumerable: !0,
      get: function () {
        return Fl.skipLast;
      },
    });
    var $l = mT();
    Object.defineProperty(e, "skipUntil", {
      enumerable: !0,
      get: function () {
        return $l.skipUntil;
      },
    });
    var Ya = bT();
    Object.defineProperty(e, "skipWhile", {
      enumerable: !0,
      get: function () {
        return Ya.skipWhile;
      },
    });
    var Ui = yT();
    Object.defineProperty(e, "startWith", {
      enumerable: !0,
      get: function () {
        return Ui.startWith;
      },
    });
    var en = Kc();
    Object.defineProperty(e, "subscribeOn", {
      enumerable: !0,
      get: function () {
        return en.subscribeOn;
      },
    });
    var tn = gT();
    Object.defineProperty(e, "switchAll", {
      enumerable: !0,
      get: function () {
        return tn.switchAll;
      },
    });
    var rn = Gc();
    Object.defineProperty(e, "switchMap", {
      enumerable: !0,
      get: function () {
        return rn.switchMap;
      },
    });
    var Wo = wT();
    Object.defineProperty(e, "switchMapTo", {
      enumerable: !0,
      get: function () {
        return Wo.switchMapTo;
      },
    });
    var qo = _T();
    Object.defineProperty(e, "switchScan", {
      enumerable: !0,
      get: function () {
        return qo.switchScan;
      },
    });
    var nn = Sl();
    Object.defineProperty(e, "take", {
      enumerable: !0,
      get: function () {
        return nn.take;
      },
    });
    var yf = F_();
    Object.defineProperty(e, "takeLast", {
      enumerable: !0,
      get: function () {
        return yf.takeLast;
      },
    });
    var Vl = OT();
    Object.defineProperty(e, "takeUntil", {
      enumerable: !0,
      get: function () {
        return Vl.takeUntil;
      },
    });
    var Ko = xT();
    Object.defineProperty(e, "takeWhile", {
      enumerable: !0,
      get: function () {
        return Ko.takeWhile;
      },
    });
    var gf = ST();
    Object.defineProperty(e, "tap", {
      enumerable: !0,
      get: function () {
        return gf.tap;
      },
    });
    var Wl = W_();
    Object.defineProperty(e, "throttle", {
      enumerable: !0,
      get: function () {
        return Wl.throttle;
      },
    });
    var Fi = PT();
    Object.defineProperty(e, "throttleTime", {
      enumerable: !0,
      get: function () {
        return Fi.throttleTime;
      },
    });
    var ql = Jc();
    Object.defineProperty(e, "throwIfEmpty", {
      enumerable: !0,
      get: function () {
        return ql.throwIfEmpty;
      },
    });
    var wf = ET();
    Object.defineProperty(e, "timeInterval", {
      enumerable: !0,
      get: function () {
        return wf.timeInterval;
      },
    });
    var Ho = Hp();
    Object.defineProperty(e, "timeout", {
      enumerable: !0,
      get: function () {
        return Ho.timeout;
      },
    });
    var Xo = kT();
    Object.defineProperty(e, "timeoutWith", {
      enumerable: !0,
      get: function () {
        return Xo.timeoutWith;
      },
    });
    var no = jT();
    Object.defineProperty(e, "timestamp", {
      enumerable: !0,
      get: function () {
        return no.timestamp;
      },
    });
    var $i = T_();
    Object.defineProperty(e, "toArray", {
      enumerable: !0,
      get: function () {
        return $i.toArray;
      },
    });
    var _f = AT();
    Object.defineProperty(e, "window", {
      enumerable: !0,
      get: function () {
        return _f.window;
      },
    });
    var Of = IT();
    Object.defineProperty(e, "windowCount", {
      enumerable: !0,
      get: function () {
        return Of.windowCount;
      },
    });
    var Ja = TT();
    Object.defineProperty(e, "windowTime", {
      enumerable: !0,
      get: function () {
        return Ja.windowTime;
      },
    });
    var Vi = MT();
    Object.defineProperty(e, "windowToggle", {
      enumerable: !0,
      get: function () {
        return Vi.windowToggle;
      },
    });
    var Ga = NT();
    Object.defineProperty(e, "windowWhen", {
      enumerable: !0,
      get: function () {
        return Ga.windowWhen;
      },
    });
    var Kl = CT();
    Object.defineProperty(e, "withLatestFrom", {
      enumerable: !0,
      get: function () {
        return Kl.withLatestFrom;
      },
    });
    var on = zT();
    Object.defineProperty(e, "zipAll", {
      enumerable: !0,
      get: function () {
        return on.zipAll;
      },
    });
    var Za = LT();
    Object.defineProperty(e, "zipWith", {
      enumerable: !0,
      get: function () {
        return Za.zipWith;
      },
    });
  });
function K_(e, t) {
  let n = t?.updateOnValueChange ?? !0,
    o = X_(e),
    a = (0, nc.useMemo)(() => Bk(o, { runOnInit: !0 }), [o]),
    [u, l] = (0, nc.useState)([...a.matching]);
  return (
    (0, nc.useEffect)(() => {
      l([...a.matching]);
      let c = a.update$.pipe((0, Xp.map)(() => [...a.matching]));
      n ||
        (c = c.pipe(
          (0, Xp.distinctUntilChanged)((d, v) => (0, H_.default)(d, v))
        ));
      let f = c.subscribe((d) => l(d));
      return () => f.unsubscribe();
    }, [a, n]),
    u
  );
}
function BT(e, t) {
  let [n, o] = (0, Qp.useState)(t);
  return (
    (0, Qp.useEffect)(() => {
      let a = e.subscribe(o);
      return () => a.unsubscribe();
    }, [e]),
    n
  );
}
function Xs(e) {
  let t = (0, zu.useRef)(e),
    [n, o] = (0, zu.useState)(
      e == null ? { status: "idle" } : { status: "pending" }
    );
  return (
    (0, zu.useEffect)(() => {
      e !== t.current &&
        ((t.current = e),
        o(e == null ? { status: "idle" } : { status: "pending" }));
    }, [e]),
    (0, zu.useEffect)(() => {
      e != null &&
        Promise.allSettled([e]).then(([a]) => {
          e === t.current && o(a);
        });
    }, [e]),
    n
  );
}
var nc,
  op,
  My,
  H_,
  Xp,
  Qp,
  zu,
  X_,
  Zc = J(() => {
    be(st(), 1),
      be(st(), 1),
      (nc = be(st(), 1)),
      (op = be(st(), 1)),
      (My = be(Iy(), 1)),
      (H_ = be(Iy(), 1)),
      (Xp = be(q_(), 1)),
      (Qp = be(st(), 1)),
      (zu = be(st(), 1)),
      (X_ = (e) => {
        let [t, n] = (0, op.useState)(e);
        return (
          (0, op.useEffect)(() => {
            (0, My.default)(e, t) || n(e);
          }, [e]),
          t
        );
      });
  });
function DT() {
  let { publicClient: e, worldAddress: t, latestBlock$: n } = qt(),
    o = BT(n.pipe((0, Q_.map)((a) => a.number)));
  return (0, fn.jsxs)("dl", {
    className: "grid grid-cols-[max-content,1fr] gap-x-4",
    children: [
      (0, fn.jsx)("dt", { className: "text-amber-200/80", children: "Chain" }),
      (0, fn.jsxs)("dd", {
        className: "text-sm",
        children: [e.chain?.id, " (", e.chain?.name, ")"],
      }),
      (0, fn.jsx)("dt", {
        className: "text-amber-200/80",
        children: "Block number",
      }),
      (0, fn.jsx)("dd", { className: "text-sm", children: o?.toString() }),
      (0, fn.jsx)("dt", { className: "text-amber-200/80", children: "RPC" }),
      (0, fn.jsx)("dd", {
        className: "text-sm text-green-500",
        children: "Connected ✓",
      }),
      (0, fn.jsx)("dt", { className: "text-amber-200/80", children: "World" }),
      (0, fn.jsx)("dd", { className: "text-sm", children: t }),
    ],
  });
}
var Q_,
  fn,
  UT = J(() => {
    Zc(), rr(), (Q_ = be(q_(), 1)), (fn = be(qe(), 1));
  });
function ef(e, { includeName: t = !1 } = {}) {
  if (e.type !== "function" && e.type !== "event" && e.type !== "error")
    throw new o1(e.type);
  return `${e.name}(${_c(e.inputs, { includeName: t })})`;
}
function _c(e, { includeName: t = !1 } = {}) {
  return e ? e.map((n) => FT(n, { includeName: t })).join(t ? ", " : ",") : "";
}
function FT(e, { includeName: t }) {
  return e.type.startsWith("tuple")
    ? `(${_c(e.components, { includeName: t })})${e.type.slice(5)}`
    : e.type + (t && e.name ? ` ${e.name}` : "");
}
var tf = J(() => {
  kl();
});
function Pl(e, { strict: t = !0 } = {}) {
  return !e || typeof e != "string"
    ? !1
    : t
    ? /^0x[0-9a-fA-F]*$/.test(e)
    : e.startsWith("0x");
}
var El = J(() => {});
function Kr(e) {
  return Pl(e, { strict: !1 }) ? Math.ceil((e.length - 2) / 2) : e.length;
}
var Gv = J(() => {
    El();
  }),
  Y_,
  $T = J(() => {
    Y_ = "1.13.2";
  }),
  J_,
  VT = J(() => {
    $T(), (J_ = () => `viem@${Y_}`);
  });
function G_(e, t) {
  return t?.(e)
    ? e
    : e && typeof e == "object" && "cause" in e
    ? G_(e.cause, t)
    : t
    ? null
    : e;
}
var jt,
  rf = J(() => {
    VT(),
      (jt = class extends Error {
        constructor(e, t = {}) {
          super(),
            Object.defineProperty(this, "details", {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: void 0,
            }),
            Object.defineProperty(this, "docsPath", {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: void 0,
            }),
            Object.defineProperty(this, "metaMessages", {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: void 0,
            }),
            Object.defineProperty(this, "shortMessage", {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: void 0,
            }),
            Object.defineProperty(this, "name", {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: "ViemError",
            }),
            Object.defineProperty(this, "version", {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: J_(),
            });
          let n =
              t.cause instanceof jt
                ? t.cause.details
                : t.cause?.message
                ? t.cause.message
                : t.details,
            o = (t.cause instanceof jt && t.cause.docsPath) || t.docsPath;
          (this.message = [
            e || "An error occurred.",
            "",
            ...(t.metaMessages ? [...t.metaMessages, ""] : []),
            ...(o
              ? [
                  `Docs: https://viem.sh${o}.html${
                    t.docsSlug ? `#${t.docsSlug}` : ""
                  }`,
                ]
              : []),
            ...(n ? [`Details: ${n}`] : []),
            `Version: ${this.version}`,
          ].join(`
`)),
            t.cause && (this.cause = t.cause),
            (this.details = n),
            (this.docsPath = o),
            (this.metaMessages = t.metaMessages),
            (this.shortMessage = e);
        }
        walk(e) {
          return G_(this, e);
        }
      });
  }),
  nf,
  Z_,
  e1,
  Zv,
  t1,
  Yp,
  r1,
  n1,
  o1,
  kl = J(() => {
    tf(),
      rf(),
      (nf = class extends jt {
        constructor({ data: e, params: t, size: n }) {
          super(
            [`Data size of ${n} bytes is too small for given parameters.`]
              .join(`
`),
            {
              metaMessages: [
                `Params: (${_c(t, { includeName: !0 })})`,
                `Data:   ${e} (${n} bytes)`,
              ],
            }
          ),
            Object.defineProperty(this, "name", {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: "AbiDecodingDataSizeTooSmallError",
            }),
            Object.defineProperty(this, "data", {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: void 0,
            }),
            Object.defineProperty(this, "params", {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: void 0,
            }),
            Object.defineProperty(this, "size", {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: void 0,
            }),
            (this.data = e),
            (this.params = t),
            (this.size = n);
        }
      }),
      (Z_ = class extends jt {
        constructor() {
          super('Cannot decode zero data ("0x") with ABI parameters.'),
            Object.defineProperty(this, "name", {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: "AbiDecodingZeroDataError",
            });
        }
      }),
      (e1 = class extends jt {
        constructor({ docsPath: e }) {
          super("Cannot extract event signature from empty topics.", {
            docsPath: e,
          }),
            Object.defineProperty(this, "name", {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: "AbiEventSignatureEmptyTopicsError",
            });
        }
      }),
      (Zv = class extends jt {
        constructor(e, { docsPath: t }) {
          super(
            [
              `Encoded event signature "${e}" not found on ABI.`,
              "Make sure you are using the correct ABI and that the event exists on it.",
              `You can look up the signature here: https://openchain.xyz/signatures?query=${e}.`,
            ].join(`
`),
            { docsPath: t }
          ),
            Object.defineProperty(this, "name", {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: "AbiEventSignatureNotFoundError",
            });
        }
      }),
      (t1 = class extends jt {
        constructor(e, { docsPath: t }) {
          super(
            [
              `Encoded function signature "${e}" not found on ABI.`,
              "Make sure you are using the correct ABI and that the function exists on it.",
              `You can look up the signature here: https://openchain.xyz/signatures?query=${e}.`,
            ].join(`
`),
            { docsPath: t }
          ),
            Object.defineProperty(this, "name", {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: "AbiFunctionSignatureNotFoundError",
            });
        }
      }),
      (Yp = class extends jt {
        constructor({ abiItem: e, data: t, params: n, size: o }) {
          super(
            [
              `Data size of ${o} bytes is too small for non-indexed event parameters.`,
            ].join(`
`),
            {
              metaMessages: [
                `Params: (${_c(n, { includeName: !0 })})`,
                `Data:   ${t} (${o} bytes)`,
              ],
            }
          ),
            Object.defineProperty(this, "name", {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: "DecodeLogDataMismatch",
            }),
            Object.defineProperty(this, "abiItem", {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: void 0,
            }),
            Object.defineProperty(this, "data", {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: void 0,
            }),
            Object.defineProperty(this, "params", {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: void 0,
            }),
            Object.defineProperty(this, "size", {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: void 0,
            }),
            (this.abiItem = e),
            (this.data = t),
            (this.params = n),
            (this.size = o);
        }
      }),
      (r1 = class extends jt {
        constructor({ abiItem: e, param: t }) {
          super(
            [
              `Expected a topic for indexed event parameter${
                t.name ? ` "${t.name}"` : ""
              } on event "${ef(e, { includeName: !0 })}".`,
            ].join(`
`)
          ),
            Object.defineProperty(this, "name", {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: "DecodeLogTopicsMismatch",
            }),
            Object.defineProperty(this, "abiItem", {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: void 0,
            }),
            (this.abiItem = e);
        }
      }),
      (n1 = class extends jt {
        constructor(e, { docsPath: t }) {
          super(
            [
              `Type "${e}" is not a valid decoding type.`,
              "Please provide a valid ABI type.",
            ].join(`
`),
            { docsPath: t }
          ),
            Object.defineProperty(this, "name", {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: "InvalidAbiDecodingType",
            });
        }
      }),
      (o1 = class extends jt {
        constructor(e) {
          super(
            [
              `"${e}" is not a valid definition type.`,
              'Valid types: "function", "event", "error"',
            ].join(`
`)
          ),
            Object.defineProperty(this, "name", {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: "InvalidDefinitionTypeError",
            });
        }
      });
  }),
  eh,
  th,
  i1 = J(() => {
    rf(),
      (eh = class extends jt {
        constructor({ offset: e, position: t, size: n }) {
          super(
            `Slice ${
              t === "start" ? "starting" : "ending"
            } at offset "${e}" is out-of-bounds (size: ${n}).`
          ),
            Object.defineProperty(this, "name", {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: "SliceOffsetOutOfBoundsError",
            });
        }
      }),
      (th = class extends jt {
        constructor({ size: e, targetSize: t, type: n }) {
          super(
            `${n.charAt(0).toUpperCase()}${n
              .slice(1)
              .toLowerCase()} size (${e}) exceeds padding size (${t}).`
          ),
            Object.defineProperty(this, "name", {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: "SizeExceedsPaddingSizeError",
            });
        }
      });
  });
function $a(e, { dir: t, size: n = 32 } = {}) {
  return typeof e == "string"
    ? WT(e, { dir: t, size: n })
    : qT(e, { dir: t, size: n });
}
function WT(e, { dir: t, size: n = 32 } = {}) {
  if (n === null) return e;
  let o = e.replace("0x", "");
  if (o.length > n * 2)
    throw new th({ size: Math.ceil(o.length / 2), targetSize: n, type: "hex" });
  return `0x${o[t === "right" ? "padEnd" : "padStart"](n * 2, "0")}`;
}
function qT(e, { dir: t, size: n = 32 } = {}) {
  if (n === null) return e;
  if (e.length > n)
    throw new th({ size: e.length, targetSize: n, type: "bytes" });
  let o = new Uint8Array(n);
  for (let a = 0; a < n; a++) {
    let u = t === "right";
    o[u ? a : n - a - 1] = e[u ? a : e.length - a - 1];
  }
  return o;
}
var a1 = J(() => {
    i1();
  }),
  u1,
  l1,
  s1,
  c1 = J(() => {
    rf(),
      (u1 = class extends jt {
        constructor({ max: e, min: t, signed: n, size: o, value: a }) {
          super(
            `Number "${a}" is not in safe ${
              o ? `${o * 8}-bit ${n ? "signed" : "unsigned"} ` : ""
            }integer range ${e ? `(${t} to ${e})` : `(above ${t})`}`
          ),
            Object.defineProperty(this, "name", {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: "IntegerOutOfRangeError",
            });
        }
      }),
      (l1 = class extends jt {
        constructor(e) {
          super(
            `Hex value "${e}" is not a valid boolean. The hex value must be "0x0" (false) or "0x1" (true).`
          ),
            Object.defineProperty(this, "name", {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: "InvalidHexBooleanError",
            });
        }
      }),
      (s1 = class extends jt {
        constructor({ givenSize: e, maxSize: t }) {
          super(`Size cannot exceed ${t} bytes. Given size: ${e} bytes.`),
            Object.defineProperty(this, "name", {
              enumerable: !0,
              configurable: !0,
              writable: !0,
              value: "SizeOverflowError",
            });
        }
      });
  });
function Xu(e, { dir: t = "left" } = {}) {
  let n = typeof e == "string" ? e.replace("0x", "") : e,
    o = 0;
  for (
    let a = 0;
    a < n.length - 1 &&
    n[t === "left" ? a : n.length - a - 1].toString() === "0";
    a++
  )
    o++;
  return (
    (n = t === "left" ? n.slice(o) : n.slice(0, n.length - o)),
    typeof e == "string"
      ? (n.length === 1 && t === "right" && (n = `${n}0`),
        `0x${n.length % 2 === 1 ? `0${n}` : n}`)
      : n
  );
}
var f1 = J(() => {});
function Lo(e, { size: t }) {
  if (Kr(e) > t) throw new s1({ givenSize: Kr(e), maxSize: t });
}
function d1(e, t = {}) {
  let { signed: n } = t;
  t.size && Lo(e, { size: t.size });
  let o = BigInt(e);
  if (!n) return o;
  let a = (e.length - 2) / 2,
    u = (1n << (BigInt(a) * 8n - 1n)) - 1n;
  return o <= u ? o : o - BigInt(`0x${"f".padStart(a * 2, "f")}`) - 1n;
}
function KT(e, t = {}) {
  let n = e;
  if ((t.size && (Lo(n, { size: t.size }), (n = Xu(n))), Xu(n) === "0x00"))
    return !1;
  if (Xu(n) === "0x01") return !0;
  throw new l1(n);
}
function Kn(e, t = {}) {
  return Number(d1(e, t));
}
function HT(e, t = {}) {
  let n = oh(e);
  return (
    t.size && (Lo(n, { size: t.size }), (n = Xu(n, { dir: "right" }))),
    new TextDecoder().decode(n)
  );
}
var rh = J(() => {
  c1(), Gv(), f1(), jl();
});
function XT(e, t = {}) {
  return typeof e == "number" || typeof e == "bigint"
    ? v1(e, t)
    : typeof e == "string"
    ? YT(e, t)
    : typeof e == "boolean"
    ? QT(e, t)
    : p1(e, t);
}
function QT(e, t = {}) {
  let n = `0x${Number(e)}`;
  return typeof t.size == "number"
    ? (Lo(n, { size: t.size }), $a(n, { size: t.size }))
    : n;
}
function p1(e, t = {}) {
  let n = "";
  for (let a = 0; a < e.length; a++) n += h1[e[a]];
  let o = `0x${n}`;
  return typeof t.size == "number"
    ? (Lo(o, { size: t.size }), $a(o, { dir: "right", size: t.size }))
    : o;
}
function v1(e, t = {}) {
  let { signed: n, size: o } = t,
    a = BigInt(e),
    u;
  o
    ? n
      ? (u = (1n << (BigInt(o) * 8n - 1n)) - 1n)
      : (u = 2n ** (BigInt(o) * 8n) - 1n)
    : typeof e == "number" && (u = BigInt(Number.MAX_SAFE_INTEGER));
  let l = typeof u == "bigint" && n ? -u - 1n : 0;
  if ((u && a > u) || a < l) {
    let f = typeof e == "bigint" ? "n" : "";
    throw new u1({
      max: u ? `${u}${f}` : void 0,
      min: `${l}${f}`,
      signed: n,
      size: o,
      value: `${e}${f}`,
    });
  }
  let c = `0x${(n && a < 0 ? (1n << BigInt(o * 8)) + BigInt(a) : a).toString(
    16
  )}`;
  return o ? $a(c, { size: o }) : c;
}
function YT(e, t = {}) {
  let n = m1.encode(e);
  return p1(n, t);
}
var h1,
  m1,
  b1 = J(() => {
    c1(),
      a1(),
      rh(),
      (h1 = Array.from({ length: 256 }, (e, t) =>
        t.toString(16).padStart(2, "0")
      )),
      (m1 = new TextEncoder());
  });
function nh(e, t = {}) {
  return typeof e == "number" || typeof e == "bigint"
    ? GT(e, t)
    : typeof e == "boolean"
    ? JT(e, t)
    : Pl(e)
    ? oh(e, t)
    : y1(e, t);
}
function JT(e, t = {}) {
  let n = new Uint8Array(1);
  return (
    (n[0] = Number(e)),
    typeof t.size == "number"
      ? (Lo(n, { size: t.size }), $a(n, { size: t.size }))
      : n
  );
}
function Ny(e) {
  if (e >= dn.zero && e <= dn.nine) return e - dn.zero;
  if (e >= dn.A && e <= dn.F) return e - (dn.A - 10);
  if (e >= dn.a && e <= dn.f) return e - (dn.a - 10);
}
function oh(e, t = {}) {
  let n = e;
  t.size &&
    (Lo(n, { size: t.size }), (n = $a(n, { dir: "right", size: t.size })));
  let o = n.slice(2);
  o.length % 2 && (o = `0${o}`);
  let a = o.length / 2,
    u = new Uint8Array(a);
  for (let l = 0, c = 0; l < a; l++) {
    let f = Ny(o.charCodeAt(c++)),
      d = Ny(o.charCodeAt(c++));
    if (f === void 0 || d === void 0)
      throw new jt(
        `Invalid byte sequence ("${o[c - 2]}${o[c - 1]}" in "${o}").`
      );
    u[l] = f * 16 + d;
  }
  return u;
}
function GT(e, t) {
  let n = v1(e, t);
  return oh(n);
}
function y1(e, t = {}) {
  let n = g1.encode(e);
  return typeof t.size == "number"
    ? (Lo(n, { size: t.size }), $a(n, { dir: "right", size: t.size }))
    : n;
}
var g1,
  dn,
  jl = J(() => {
    rf(),
      El(),
      a1(),
      rh(),
      b1(),
      (g1 = new TextEncoder()),
      (dn = { zero: 48, nine: 57, A: 65, F: 70, a: 97, f: 102 });
  });
function w1(e) {
  let t = e.match(_1),
    n = t?.[2] || void 0,
    o = t?.[3],
    a = t?.[5] || void 0;
  return { type: n, name: o, params: a };
}
function ZT(e) {
  return w1(e).name;
}
function eM(e) {
  return w1(e)
    .params?.split(",")
    .map((t) => t.trim().split(" "))
    ?.map((t) => ({
      type: t[0],
      name: t[1] === "indexed" ? t[2] : t[1],
      ...(t[1] === "indexed" ? { indexed: !0 } : {}),
    }));
}
var _1,
  tM = J(() => {
    _1 = /((function|event)\s)?(.*)(\((.*)\))/;
  }),
  ih,
  O1 = J(() => {
    tf(),
      tM(),
      (ih = (e) => {
        if (typeof e == "string") {
          let t = ZT(e),
            n = eM(e) || [];
          return `${t}(${n.map(({ type: o }) => o).join(",")})`;
        }
        return ef(e);
      });
  }),
  x1,
  rM = J(() => {
    O1(), (x1 = (e) => ih(e));
  });
function Cy(e) {
  if (!Number.isSafeInteger(e) || e < 0)
    throw new Error(`Wrong positive integer: ${e}`);
}
function S1(e, ...t) {
  if (!(e instanceof Uint8Array)) throw new Error("Expected Uint8Array");
  if (t.length > 0 && !t.includes(e.length))
    throw new Error(
      `Expected Uint8Array of length ${t}, not of length=${e.length}`
    );
}
function zy(e, t = !0) {
  if (e.destroyed) throw new Error("Hash instance has been destroyed");
  if (t && e.finished) throw new Error("Hash#digest() has already been called");
}
function nM(e, t) {
  S1(e);
  let n = t.outputLen;
  if (e.length < n)
    throw new Error(
      `digestInto() expects output buffer of length at least ${n}`
    );
}
var oM = J(() => {});
function iM(e, t = !1) {
  return t
    ? { h: Number(e & Ru), l: Number((e >> Jp) & Ru) }
    : { h: Number((e >> Jp) & Ru) | 0, l: Number(e & Ru) | 0 };
}
function aM(e, t = !1) {
  let n = new Uint32Array(e.length),
    o = new Uint32Array(e.length);
  for (let a = 0; a < e.length; a++) {
    let { h: u, l } = iM(e[a], t);
    [n[a], o[a]] = [u, l];
  }
  return [n, o];
}
var Ru,
  Jp,
  P1,
  E1,
  k1,
  j1,
  uM = J(() => {
    (Ru = BigInt(4294967295)),
      (Jp = BigInt(32)),
      (P1 = (e, t, n) => (e << n) | (t >>> (32 - n))),
      (E1 = (e, t, n) => (t << n) | (e >>> (32 - n))),
      (k1 = (e, t, n) => (t << (n - 32)) | (e >>> (64 - n))),
      (j1 = (e, t, n) => (e << (n - 32)) | (t >>> (64 - n)));
  });
function lM(e) {
  if (typeof e != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof e}`);
  return new Uint8Array(new TextEncoder().encode(e));
}
function ah(e) {
  if ((typeof e == "string" && (e = lM(e)), !A1(e)))
    throw new Error(`expected Uint8Array, got ${typeof e}`);
  return e;
}
function sM(e) {
  let t = (o) => e().update(ah(o)).digest(),
    n = e();
  return (
    (t.outputLen = n.outputLen),
    (t.blockLen = n.blockLen),
    (t.create = () => e()),
    t
  );
}
function cM(e) {
  let t = (o, a) => e(a).update(ah(o)).digest(),
    n = e({});
  return (
    (t.outputLen = n.outputLen),
    (t.blockLen = n.blockLen),
    (t.create = (o) => e(o)),
    t
  );
}
var A1,
  I1,
  Ry,
  T1,
  fM = J(() => {
    if (
      ((A1 = (e) => e instanceof Uint8Array),
      (I1 = (e) =>
        new Uint32Array(e.buffer, e.byteOffset, Math.floor(e.byteLength / 4))),
      (Ry = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68),
      !Ry)
    )
      throw new Error("Non little-endian hardware is not supported");
    T1 = class {
      clone() {
        return this._cloneInto();
      }
    };
  });
function dM(e, t = 24) {
  let n = new Uint32Array(10);
  for (let o = 24 - t; o < 24; o++) {
    for (let l = 0; l < 10; l++)
      n[l] = e[l] ^ e[l + 10] ^ e[l + 20] ^ e[l + 30] ^ e[l + 40];
    for (let l = 0; l < 10; l += 2) {
      let c = (l + 8) % 10,
        f = (l + 2) % 10,
        d = n[f],
        v = n[f + 1],
        m = ev(d, v, 1) ^ n[c],
        h = tv(d, v, 1) ^ n[c + 1];
      for (let g = 0; g < 50; g += 10) (e[l + g] ^= m), (e[l + g + 1] ^= h);
    }
    let a = e[2],
      u = e[3];
    for (let l = 0; l < 24; l++) {
      let c = Zp[l],
        f = ev(a, u, c),
        d = tv(a, u, c),
        v = Gp[l];
      (a = e[v]), (u = e[v + 1]), (e[v] = f), (e[v + 1] = d);
    }
    for (let l = 0; l < 50; l += 10) {
      for (let c = 0; c < 10; c++) n[c] = e[l + c];
      for (let c = 0; c < 10; c++)
        e[l + c] ^= ~n[(c + 2) % 10] & n[(c + 4) % 10];
    }
    (e[0] ^= M1[o]), (e[1] ^= N1[o]);
  }
  n.fill(0);
}
var Gp,
  Zp,
  ip,
  Ly,
  da,
  By,
  Dy,
  Uy,
  Fy,
  M1,
  N1,
  ev,
  tv,
  Qs,
  Ln,
  C1,
  ap,
  pM = J(() => {
    oM(),
      uM(),
      fM(),
      ([Gp, Zp, ip] = [[], [], []]),
      (Ly = BigInt(0)),
      (da = BigInt(1)),
      (By = BigInt(2)),
      (Dy = BigInt(7)),
      (Uy = BigInt(256)),
      (Fy = BigInt(113));
    for (let e = 0, t = da, n = 1, o = 0; e < 24; e++) {
      ([n, o] = [o, (2 * n + 3 * o) % 5]),
        Gp.push(2 * (5 * o + n)),
        Zp.push((((e + 1) * (e + 2)) / 2) % 64);
      let a = Ly;
      for (let u = 0; u < 7; u++)
        (t = ((t << da) ^ ((t >> Dy) * Fy)) % Uy),
          t & By && (a ^= da << ((da << BigInt(u)) - da));
      ip.push(a);
    }
    ([M1, N1] = aM(ip, !0)),
      (ev = (e, t, n) => (n > 32 ? k1(e, t, n) : P1(e, t, n))),
      (tv = (e, t, n) => (n > 32 ? j1(e, t, n) : E1(e, t, n))),
      (Qs = class extends T1 {
        constructor(e, t, n, o = !1, a = 24) {
          if (
            (super(),
            (this.blockLen = e),
            (this.suffix = t),
            (this.outputLen = n),
            (this.enableXOF = o),
            (this.rounds = a),
            (this.pos = 0),
            (this.posOut = 0),
            (this.finished = !1),
            (this.destroyed = !1),
            Cy(n),
            0 >= this.blockLen || this.blockLen >= 200)
          )
            throw new Error("Sha3 supports only keccak-f1600 function");
          (this.state = new Uint8Array(200)), (this.state32 = I1(this.state));
        }
        keccak() {
          dM(this.state32, this.rounds), (this.posOut = 0), (this.pos = 0);
        }
        update(e) {
          zy(this);
          let { blockLen: t, state: n } = this;
          e = ah(e);
          let o = e.length;
          for (let a = 0; a < o; ) {
            let u = Math.min(t - this.pos, o - a);
            for (let l = 0; l < u; l++) n[this.pos++] ^= e[a++];
            this.pos === t && this.keccak();
          }
          return this;
        }
        finish() {
          if (this.finished) return;
          this.finished = !0;
          let { state: e, suffix: t, pos: n, blockLen: o } = this;
          (e[n] ^= t),
            t & 128 && n === o - 1 && this.keccak(),
            (e[o - 1] ^= 128),
            this.keccak();
        }
        writeInto(e) {
          zy(this, !1), S1(e), this.finish();
          let t = this.state,
            { blockLen: n } = this;
          for (let o = 0, a = e.length; o < a; ) {
            this.posOut >= n && this.keccak();
            let u = Math.min(n - this.posOut, a - o);
            e.set(t.subarray(this.posOut, this.posOut + u), o),
              (this.posOut += u),
              (o += u);
          }
          return e;
        }
        xofInto(e) {
          if (!this.enableXOF)
            throw new Error("XOF is not possible for this instance");
          return this.writeInto(e);
        }
        xof(e) {
          return Cy(e), this.xofInto(new Uint8Array(e));
        }
        digestInto(e) {
          if ((nM(e, this), this.finished))
            throw new Error("digest() was already called");
          return this.writeInto(e), this.destroy(), e;
        }
        digest() {
          return this.digestInto(new Uint8Array(this.outputLen));
        }
        destroy() {
          (this.destroyed = !0), this.state.fill(0);
        }
        _cloneInto(e) {
          let {
            blockLen: t,
            suffix: n,
            outputLen: o,
            rounds: a,
            enableXOF: u,
          } = this;
          return (
            e || (e = new Qs(t, n, o, u, a)),
            e.state32.set(this.state32),
            (e.pos = this.pos),
            (e.posOut = this.posOut),
            (e.finished = this.finished),
            (e.rounds = a),
            (e.suffix = n),
            (e.outputLen = o),
            (e.enableXOF = u),
            (e.destroyed = this.destroyed),
            e
          );
        }
      }),
      (Ln = (e, t, n) => sM(() => new Qs(t, e, n))),
      Ln(6, 144, 224 / 8),
      Ln(6, 136, 256 / 8),
      Ln(6, 104, 384 / 8),
      Ln(6, 72, 512 / 8),
      Ln(1, 144, 224 / 8),
      (C1 = Ln(1, 136, 256 / 8)),
      Ln(1, 104, 384 / 8),
      Ln(1, 72, 512 / 8),
      (ap = (e, t, n) =>
        cM((o = {}) => new Qs(t, e, o.dkLen === void 0 ? n : o.dkLen, !0))),
      ap(31, 168, 128 / 8),
      ap(31, 136, 256 / 8);
  });
function uh(e, t) {
  let n = t || "hex",
    o = C1(Pl(e, { strict: !1 }) ? nh(e) : e);
  return n === "bytes" ? o : XT(o);
}
var lh = J(() => {
    pM(), El(), jl(), b1();
  }),
  $y,
  z1,
  vM = J(() => {
    jl(), rM(), lh(), ($y = (e) => uh(nh(e))), (z1 = (e) => $y(x1(e)));
  });
function wt(e, t, n, { strict: o } = {}) {
  return Pl(e, { strict: !1 })
    ? mM(e, t, n, { strict: o })
    : hM(e, t, n, { strict: o });
}
function R1(e, t) {
  if (typeof t == "number" && t > 0 && t > Kr(e) - 1)
    throw new eh({ offset: t, position: "start", size: Kr(e) });
}
function L1(e, t, n) {
  if (typeof t == "number" && typeof n == "number" && Kr(e) !== n - t)
    throw new eh({ offset: n, position: "end", size: Kr(e) });
}
function hM(e, t, n, { strict: o } = {}) {
  R1(e, t);
  let a = e.slice(t, n);
  return o && L1(a, t, n), a;
}
function mM(e, t, n, { strict: o } = {}) {
  R1(e, t);
  let a = `0x${e.replace("0x", "").slice((t ?? 0) * 2, (n ?? e.length) * 2)}`;
  return o && L1(a, t, n), a;
}
var sh = J(() => {
  i1(), El(), Gv();
});
function ch(e) {
  let t = e.match(/^(.*)\[(\d+)?\]$/);
  return t ? [t[2] ? Number(t[2]) : null, t[1]] : void 0;
}
var bM = J(() => {}),
  Vy,
  B1,
  yM = J(() => {
    sh(),
      jl(),
      O1(),
      lh(),
      (Vy = (e) => uh(nh(e))),
      (B1 = (e) => wt(Vy(ih(e)), 0, 4));
  });
function gM(e, t) {
  let n = t ? `${t}${e.toLowerCase()}` : e.substring(2).toLowerCase(),
    o = uh(y1(n), "bytes"),
    a = (t ? n.substring(`${t}0x`.length) : n).split("");
  for (let u = 0; u < 40; u += 2)
    o[u >> 1] >> 4 >= 8 && a[u] && (a[u] = a[u].toUpperCase()),
      (o[u >> 1] & 15) >= 8 && a[u + 1] && (a[u + 1] = a[u + 1].toUpperCase());
  return `0x${a.join("")}`;
}
var wM = J(() => {
  jl(), lh();
});
function fh(e, t) {
  if (t === "0x" && e.length > 0) throw new Z_();
  if (Kr(t) && Kr(t) < 32) throw new nf({ data: t, params: e, size: Kr(t) });
  return _M({ data: t, params: e });
}
function _M({ data: e, params: t }) {
  let n = [],
    o = 0;
  for (let a = 0; a < t.length; a++) {
    if (o >= Kr(e)) throw new nf({ data: e, params: t, size: Kr(e) });
    let u = t[a],
      { consumed: l, value: c } = Pa({ data: e, param: u, position: o });
    n.push(c), (o += l);
  }
  return n;
}
function Pa({ data: e, param: t, position: n }) {
  let o = ch(t.type);
  if (o) {
    let [u, l] = o;
    return xM(e, { length: u, param: { ...t, type: l }, position: n });
  }
  if (t.type === "tuple") return jM(e, { param: t, position: n });
  if (t.type === "string") return kM(e, { position: n });
  if (t.type.startsWith("bytes")) return PM(e, { param: t, position: n });
  let a = wt(e, n, n + 32, { strict: !0 });
  if (t.type.startsWith("uint") || t.type.startsWith("int"))
    return EM(a, { param: t });
  if (t.type === "address") return OM(a);
  if (t.type === "bool") return SM(a);
  throw new n1(t.type, { docsPath: "/docs/contract/decodeAbiParameters" });
}
function OM(e) {
  return { consumed: 32, value: gM(wt(e, -20)) };
}
function xM(e, { param: t, length: n, position: o }) {
  if (!n) {
    let l = Kn(wt(e, o, o + 32, { strict: !0 })),
      c = Kn(wt(e, l, l + 32, { strict: !0 })),
      f = 0,
      d = [];
    for (let v = 0; v < c; ++v) {
      let m = Pa({ data: wt(e, l + 32), param: t, position: f });
      (f += m.consumed), d.push(m.value);
    }
    return { value: d, consumed: 32 };
  }
  if (Oc(t)) {
    let l = !ch(t.type)?.[0],
      c = 0,
      f = [];
    for (let d = 0; d < n; ++d) {
      let v = Kn(wt(e, o, o + 32, { strict: !0 })),
        m = Pa({ data: wt(e, v), param: t, position: l ? c : d * 32 });
      (c += m.consumed), f.push(m.value);
    }
    return { value: f, consumed: 32 };
  }
  let a = 0,
    u = [];
  for (let l = 0; l < n; ++l) {
    let c = Pa({ data: e, param: t, position: o + a });
    (a += c.consumed), u.push(c.value);
  }
  return { value: u, consumed: a };
}
function SM(e) {
  return { consumed: 32, value: KT(e) };
}
function PM(e, { param: t, position: n }) {
  let [o, a] = t.type.split("bytes");
  if (!a) {
    let u = Kn(wt(e, n, n + 32, { strict: !0 })),
      l = Kn(wt(e, u, u + 32, { strict: !0 }));
    return l === 0
      ? { consumed: 32, value: "0x" }
      : { consumed: 32, value: wt(e, u + 32, u + 32 + l, { strict: !0 }) };
  }
  return { consumed: 32, value: wt(e, n, n + parseInt(a), { strict: !0 }) };
}
function EM(e, { param: t }) {
  let n = t.type.startsWith("int");
  return {
    consumed: 32,
    value:
      parseInt(t.type.split("int")[1] || "256") > 48
        ? d1(e, { signed: n })
        : Kn(e, { signed: n }),
  };
}
function kM(e, { position: t }) {
  let n = Kn(wt(e, t, t + 32, { strict: !0 })),
    o = Kn(wt(e, n, n + 32, { strict: !0 }));
  return o === 0
    ? { consumed: 32, value: "" }
    : {
        consumed: 32,
        value: HT(Xu(wt(e, n + 32, n + 32 + o, { strict: !0 }))),
      };
}
function jM(e, { param: t, position: n }) {
  let o = t.components.length === 0 || t.components.some(({ name: l }) => !l),
    a = o ? [] : {},
    u = 0;
  if (Oc(t)) {
    let l = Kn(wt(e, n, n + 32, { strict: !0 }));
    for (let c = 0; c < t.components.length; ++c) {
      let f = t.components[c],
        d = Pa({ data: wt(e, l), param: f, position: u });
      (u += d.consumed), (a[o ? c : f?.name] = d.value);
    }
    return { consumed: 32, value: a };
  }
  for (let l = 0; l < t.components.length; ++l) {
    let c = t.components[l],
      f = Pa({ data: e, param: c, position: n + u });
    (u += f.consumed), (a[o ? l : c?.name] = f.value);
  }
  return { consumed: u, value: a };
}
function Oc(e) {
  let { type: t } = e;
  if (t === "string" || t === "bytes" || t.endsWith("[]")) return !0;
  if (t === "tuple") return e.components?.some(Oc);
  let n = ch(e.type);
  return !!(n && Oc({ ...e, type: n[1] }));
}
var D1 = J(() => {
  kl(), wM(), Gv(), sh(), f1(), rh(), bM();
});
function AM(e, t) {
  let n = e.toString(),
    o = n.startsWith("-");
  o && (n = n.slice(1)), (n = n.padStart(t, "0"));
  let [a, u] = [n.slice(0, n.length - t), n.slice(n.length - t)];
  return (
    (u = u.replace(/(0+)$/, "")),
    `${o ? "-" : ""}${a || "0"}${u ? `.${u}` : ""}`
  );
}
var IM = J(() => {});
function TM({ abi: e, data: t, strict: n, topics: o }) {
  let a = n ?? !0,
    [u, ...l] = o;
  if (!u) throw new e1({ docsPath: rv });
  let c = e.find((w) => w.type === "event" && u === z1(ef(w)));
  if (!(c && "name" in c) || c.type !== "event")
    throw new Zv(u, { docsPath: rv });
  let { name: f, inputs: d } = c,
    v = d?.some((w) => !("name" in w && w.name)),
    m = v ? [] : {},
    h = d.filter((w) => "indexed" in w && w.indexed);
  if (l.length > 0)
    for (let w = 0; w < h.length; w++) {
      let x = h[w],
        S = l[w];
      if (!S) throw new r1({ abiItem: c, param: x });
      m[x.name || w] = MM({ param: x, value: S });
    }
  let g = d.filter((w) => !("indexed" in w && w.indexed));
  if (g.length > 0) {
    if (t && t !== "0x")
      try {
        let w = fh(g, t);
        if (w)
          if (v) m = [...m, ...w];
          else for (let x = 0; x < g.length; x++) m[g[x].name] = w[x];
      } catch (w) {
        if (a)
          throw w instanceof nf
            ? new Yp({
                abiItem: c,
                data: w.data,
                params: w.params,
                size: w.size,
              })
            : w;
      }
    else if (a) throw new Yp({ abiItem: c, data: "0x", params: g, size: 0 });
  }
  return { eventName: f, args: Object.values(m).length > 0 ? m : void 0 };
}
function MM({ param: e, value: t }) {
  return e.type === "string" ||
    e.type === "bytes" ||
    e.type === "tuple" ||
    e.type.match(/^(.*)\[(\d+)?\]$/)
    ? t
    : (fh([e], t) || [])[0];
}
var rv,
  NM = J(() => {
    kl(), vM(), D1(), tf(), (rv = "/docs/contract/decodeEventLog");
  });
function U1({ abi: e, data: t }) {
  let n = wt(t, 0, 4),
    o = e.find((a) => a.type === "function" && n === B1(ef(a)));
  if (!o) throw new t1(n, { docsPath: "/docs/contract/decodeFunctionData" });
  return {
    functionName: o.name,
    args:
      "inputs" in o && o.inputs && o.inputs.length > 0
        ? fh(o.inputs, wt(t, 4))
        : void 0,
  };
}
var CM = J(() => {
    kl(), sh(), yM(), D1(), tf();
  }),
  of = J(() => {
    kl(), NM(), CM(), IM(), El();
  });
function zM() {
  let { publicClient: e, walletClient: t } = qt(),
    [n, o] = (0, nv.useState)(null);
  return (
    (0, nv.useEffect)(() => {
      if (!e || !t) return o(null);
      let a = t.account;
      if (!a) return o(null);
      let u = async () => {
        let c = await e.getBalance({ address: a.address });
        o(c);
      };
      u();
      let l = setInterval(u, 5e3);
      return () => clearInterval(l);
    }, [e, t]),
    (0, Oo.jsxs)("dl", {
      className: "grid grid-cols-[max-content,1fr] gap-x-4",
      children: [
        (0, Oo.jsx)("dt", {
          className: "text-amber-200/80",
          children: "Address",
        }),
        (0, Oo.jsx)("dd", {
          className: "text-sm",
          children: t?.account?.address,
        }),
        (0, Oo.jsx)("dt", {
          className: "text-amber-200/80",
          children: "Balance",
        }),
        (0, Oo.jsx)("dd", {
          className: "text-sm",
          title: n ? n.toString() : void 0,
          children:
            e && n != null
              ? (0, Oo.jsxs)(Oo.Fragment, {
                  children: [
                    AM(n, e.chain.nativeCurrency.decimals).replace(
                      /(\.\d{4})\d+$/,
                      "$1"
                    ),
                    " ",
                    e.chain.nativeCurrency.symbol,
                  ],
                })
              : null,
        }),
      ],
    })
  );
}
var nv,
  Oo,
  RM = J(() => {
    (nv = be(st(), 1)), of(), rr(), (Oo = be(qe(), 1));
  });
function LM() {
  let { storedLogs: e } = qt();
  return (0, Lu.jsxs)(Lu.Fragment, {
    children: [
      (0, Lu.jsx)(t_, { logs: e.slice(-10) }),
      (0, Lu.jsx)($r, {
        to: "/events",
        className: "block w-full bg-white/5 hover:bg-blue-700 hover:text-white",
        children: "See more",
      }),
    ],
  });
}
var Lu,
  BM = J(() => {
    Ei(), rr(), r_(), (Lu = be(qe(), 1));
  });
function Wy({ className: e }) {
  return (0, oc.jsxs)("svg", {
    className: tr("animate-spin w-[1em] h-[1em]", e),
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    children: [
      (0, oc.jsx)("circle", {
        className: "opacity-25",
        cx: "12",
        cy: "12",
        r: "10",
        stroke: "currentColor",
        strokeWidth: "4",
      }),
      (0, oc.jsx)("path", {
        className: "opacity-75",
        fill: "currentColor",
        d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z",
      }),
    ],
  });
}
var oc,
  DM = J(() => {
    Ba(), (oc = be(qe(), 1));
  });
function UM(e) {
  return e.replace(/^(0x[0-9A-F]{3})[0-9A-F]+([0-9A-F]{4})$/i, "$1…$2");
}
var FM = J(() => {});
function ov(e) {
  return JSON.stringify(e, (t, n) => (typeof n == "bigint" ? n.toString() : n));
}
var F1 = J(() => {});
function $1(e, t) {
  return (
    ic[t.id] ||
      (ic[t.id] = t.result.then((n) => e.getTransaction({ hash: n }))),
    ic[t.id]
  );
}
var ic,
  V1 = J(() => {
    ic = {};
  });
function W1(e, t) {
  return (
    ac[t.id] ||
      (ac[t.id] = t.result.then((n) =>
        e.waitForTransactionReceipt({ hash: n })
      )),
    ac[t.id]
  );
}
var ac,
  q1 = J(() => {
    ac = {};
  });
function $M(e, t, n) {
  if (!uc[n.id]) {
    let o = $1(e, n),
      a = W1(e, n);
    uc[n.id] = Promise.all([o, a]).then(([u, l]) => {
      let { functionName: c, args: f } = U1({ abi: t, data: u.input });
      return e.simulateContract({
        account: u.from,
        address: u.to,
        abi: t,
        functionName: c,
        args: f,
        blockNumber: l.blockNumber - 1n,
      });
    });
  }
  return uc[n.id];
}
var uc,
  VM = J(() => {
    of(), V1(), q1(), (uc = {});
  });
function K1({ write: e }) {
  let { publicClient: t, worldAbi: n } = qt(),
    o = t.chain.blockExplorers?.default.url,
    a = Xs(e.result),
    u = $1(t, e),
    l = W1(t, e),
    c = $M(t, n, e),
    f = Xs(u),
    d = Xs(l),
    v = Xs(c),
    m = a.status === "pending" || d.status === "pending",
    h =
      a.status === "rejected" ||
      (d.status === "fulfilled" && d.value.status === "reverted"),
    g = v.status === "fulfilled" ? v.value.result : null,
    w =
      n && d.status === "fulfilled"
        ? d.value.logs
            .map((O) => {
              try {
                return TM({ abi: n, ...O });
              } catch (A) {
                if (A instanceof Zv) return;
                throw A;
              }
            })
            .filter(Lx)
        : null,
    x = e.request.functionName,
    S = e.request.args;
  if (x === "call" || x === "callFrom") {
    let O = e.request?.args?.length
        ? e.request.args[e.request.args.length - 1]
        : "0x",
      A = U1({ abi: n, data: O });
    (x = A.functionName), (S = A.args);
  }
  return (0, Ne.jsxs)("details", {
    onToggle: (O) => {
      O.currentTarget.open &&
        (console.log("transaction", f),
        console.log("transaction receipt", d),
        console.log("transaction result", v));
    },
    children: [
      (0, Ne.jsxs)("summary", {
        className: tr(
          "px-2 py-1 rounded flex items-center gap-2 border-2 border-transparent border-dashed cursor-pointer",
          m
            ? "border-white/20 cursor-default"
            : h
            ? "bg-red-800"
            : "bg-slate-700"
        ),
        children: [
          (0, Ne.jsxs)("div", {
            className:
              "flex-1 font-mono text-white whitespace-nowrap overflow-hidden text-ellipsis",
            children: [
              x,
              "(",
              S?.map((O) => ov(O)).join(", "),
              ")",
              " ",
              e.request.functionName !== x
                ? (0, Ne.jsxs)("span", {
                    className: "text-xs text-white/40",
                    children: ["via ", e.request.functionName],
                  })
                : null,
            ],
          }),
          d.status === "fulfilled"
            ? (0, Ne.jsxs)("a", {
                href: o
                  ? `${o}/block/${d.value.blockNumber.toString()}`
                  : void 0,
                target: "_blank",
                className: tr(
                  "flex-none font-mono text-xs text-white/40",
                  o ? "hover:text-white/60 hover:underline" : null
                ),
                title: d.value.blockNumber.toString(),
                children: ["block ", d.value.blockNumber.toString()],
              })
            : null,
          a.status === "fulfilled"
            ? (0, Ne.jsxs)("a", {
                href: o ? `${o}/tx/${a.value}` : void 0,
                target: "_blank",
                className: tr(
                  "flex-none font-mono text-xs text-white/40",
                  o ? "hover:text-white/60 hover:underline" : null
                ),
                title: a.value,
                children: ["tx ", UM(a.value)],
              })
            : null,
          (0, Ne.jsx)("div", {
            className:
              "flex-none inline-flex w-4 h-4 justify-center items-center font-bold",
            children: m
              ? (0, Ne.jsx)(Wy, {})
              : h
              ? (0, Ne.jsx)(Ne.Fragment, { children: "⚠" })
              : (0, Ne.jsx)(Ne.Fragment, { children: "✓" }),
          }),
        ],
      }),
      (0, Ne.jsxs)("div", {
        className: "p-2 space-y-1",
        children: [
          (0, Ne.jsx)("div", {
            className: "font-bold text-white/40 uppercase text-xs",
            children: "Result",
          }),
          v.status === "fulfilled"
            ? (0, Ne.jsx)("div", { className: "font-mono", children: ov(g) })
            : v.status === "rejected"
            ? (0, Ne.jsx)(Gw, { error: v.reason })
            : (0, Ne.jsx)(Wy, {}),
        ],
      }),
      w?.length
        ? (0, Ne.jsxs)("div", {
            className: "p-2 space-y-1",
            children: [
              (0, Ne.jsx)("div", {
                className: "font-bold text-white/40 uppercase text-xs",
                children: "Store events",
              }),
              (0, Ne.jsxs)("table", {
                className: "w-full table-fixed",
                children: [
                  (0, Ne.jsx)("thead", {
                    className: "bg-slate-800 text-amber-200/80 text-left",
                    children: (0, Ne.jsxs)("tr", {
                      children: [
                        (0, Ne.jsx)("th", {
                          className: "font-semibold uppercase text-xs w-3/12",
                          children: "table",
                        }),
                        (0, Ne.jsx)("th", {
                          className: "font-semibold uppercase text-xs w-[1em]",
                        }),
                        (0, Ne.jsx)("th", {
                          className: "font-semibold uppercase text-xs w-3/12",
                          children: "key",
                        }),
                        (0, Ne.jsx)("th", {
                          className: "font-semibold uppercase text-xs",
                          children: "value",
                        }),
                      ],
                    }),
                  }),
                  (0, Ne.jsx)("tbody", {
                    className: "font-mono text-xs",
                    children: w.map(({ eventName: O, args: A }, k) => {
                      let j = Yy(A.tableId);
                      return (0, Ne.jsxs)(
                        "tr",
                        {
                          children: [
                            (0, Ne.jsxs)("td", {
                              className:
                                "whitespace-nowrap overflow-hidden text-ellipsis",
                              children: [j.namespace, ":", j.name],
                            }),
                            (0, Ne.jsxs)("td", {
                              className: "whitespace-nowrap",
                              children: [
                                O === "Store_SetRecord"
                                  ? (0, Ne.jsx)("span", {
                                      className: "text-green-500 font-bold",
                                      children: "=",
                                    })
                                  : null,
                                O === "Store_SpliceStaticData" ||
                                O === "Store_SpliceDynamicData"
                                  ? (0, Ne.jsx)("span", {
                                      className: "text-green-500 font-bold",
                                      children: "+",
                                    })
                                  : null,
                                O === "Store_DeleteRecord"
                                  ? (0, Ne.jsx)("span", {
                                      className: "text-red-500 font-bold",
                                      children: "-",
                                    })
                                  : null,
                              ],
                            }),
                            (0, Ne.jsx)("td", {
                              className:
                                "whitespace-nowrap overflow-hidden text-ellipsis",
                              children: iw(A.keyTuple),
                            }),
                            (0, Ne.jsx)("td", {
                              className:
                                "whitespace-nowrap overflow-hidden text-ellipsis",
                              children: A.data,
                            }),
                          ],
                        },
                        k
                      );
                    }),
                  }),
                ],
              }),
            ],
          })
        : null,
    ],
  });
}
var Ne,
  H1 = J(() => {
    of(),
      Ba(),
      DM(),
      Zc(),
      FM(),
      F1(),
      V1(),
      q1(),
      VM(),
      e_(),
      rr(),
      (Ne = be(qe(), 1));
  });
function WM() {
  let { writes: e } = qt();
  return (0, Dn.jsx)(Dn.Fragment, {
    children: e.length
      ? (0, Dn.jsxs)(Dn.Fragment, {
          children: [
            (0, Dn.jsx)("div", {
              className: "space-y-1",
              children: e
                .slice(-5)
                .map((t) => (0, Dn.jsx)(K1, { write: t }, t.id)),
            }),
            (0, Dn.jsx)($r, {
              to: "/actions",
              className:
                "block w-full bg-white/5 hover:bg-blue-700 hover:text-white",
              children: "See more",
            }),
          ],
        })
      : (0, Dn.jsx)("div", { children: "Waiting for transactions…" }),
  });
}
var Dn,
  qM = J(() => {
    Ei(), rr(), H1(), (Dn = be(qe(), 1));
  });
function dh() {
  let { useStore: e } = qt();
  if (!e) throw new Error("Missing useStore");
  let [t, n] = (0, iv.useState)(e.getState().tables);
  return (
    (0, iv.useEffect)(
      () =>
        e.subscribe((o) => {
          o.tables !== t && n(o.tables);
        }),
      [e, t]
    ),
    Object.values(t)
  );
}
var iv,
  ph = J(() => {
    rr(), (iv = be(st(), 1));
  });
function KM() {
  let e = dh();
  return (0, av.jsx)("div", {
    className: "flex flex-col gap-1 items-start",
    children: e.map((t) =>
      (0, av.jsxs)(
        $r,
        {
          to: `/tables/${t.tableId}`,
          className: "font-mono text-xs hover:text-white",
          children: [t.namespace, ":", t.name],
        },
        t.tableId
      )
    ),
  });
}
var av,
  HM = J(() => {
    Ei(), ph(), (av = be(qe(), 1));
  });
function fi(e) {
  return String(e.metadata?.tableName ?? e.metadata?.componentName ?? e.id);
}
var X1 = J(() => {});
function XM({ world: e }) {
  let t = [...e.components].sort((n, o) => fi(n).localeCompare(fi(o)));
  return (0, xo.jsx)(xo.Fragment, {
    children: t.length
      ? (0, xo.jsx)(xo.Fragment, {
          children: (0, xo.jsx)("div", {
            className: "flex flex-col gap-1 items-start",
            children: t.map((n) =>
              (0, xo.jsx)(
                $r,
                {
                  to: `/components/${n.id}`,
                  className: "font-mono text-xs hover:text-white",
                  children: fi(n),
                },
                n.id
              )
            ),
          }),
        })
      : (0, xo.jsx)("div", { children: "Waiting for components…" }),
  });
}
var xo,
  QM = J(() => {
    Ei(), X1(), (xo = be(qe(), 1));
  }),
  vh,
  YM = J(() => {
    vh = {
      name: "@latticexyz/dev-tools",
      version: "2.0.0-next.14",
      description: "MUD developer tools",
      repository: {
        type: "git",
        url: "https://github.com/latticexyz/mud.git",
        directory: "packages/dev-tools",
      },
      license: "MIT",
      type: "module",
      exports: { ".": "./dist/index.js" },
      types: "src/index.ts",
      scripts: {
        build: "pnpm run build:js",
        "build:js": "tsup",
        clean: "pnpm run clean:js",
        "clean:js": "rimraf dist",
        dev: "tsup --watch",
        test: "tsc --noEmit",
        "test:ci": "pnpm run test",
      },
      dependencies: {
        "@latticexyz/common": "workspace:*",
        "@latticexyz/react": "workspace:*",
        "@latticexyz/recs": "workspace:*",
        "@latticexyz/schema-type": "workspace:*",
        "@latticexyz/store": "workspace:*",
        "@latticexyz/store-sync": "workspace:*",
        "@latticexyz/utils": "workspace:*",
        "@latticexyz/world": "workspace:*",
        react: "^18.2.0",
        "react-dom": "^18.2.0",
        "react-router-dom": "^6.11.0",
        rxjs: "7.5.5",
        "tailwind-merge": "^1.12.0",
        "use-local-storage-state": "^18.3.2",
        viem: "1.14.0",
        zustand: "^4.3.7",
      },
      devDependencies: {
        "@types/react": "18.2.22",
        "@types/react-dom": "18.2.7",
        "@types/ws": "^8.5.4",
        autoprefixer: "^10.4.14",
        postcss: "^8.4.23",
        tailwindcss: "^3.3.2",
        tsup: "^6.7.0",
        vitest: "0.31.4",
      },
      peerDependencies: {
        "@latticexyz/common": "2.0.0-next.14",
        "@latticexyz/recs": "2.0.0-next.14",
        "@latticexyz/store": "2.0.0-next.14",
        "@latticexyz/store-sync": "2.0.0-next.14",
        "@latticexyz/utils": "2.0.0-next.14",
        "@latticexyz/world": "2.0.0-next.14",
      },
      publishConfig: { access: "public" },
    };
  });
function JM() {
  let { recsWorld: e, useStore: t } = qt();
  return (0, Ge.jsxs)("div", {
    className: "h-full flex flex-col",
    children: [
      (0, Ge.jsxs)("div", {
        className: "flex-grow p-6 space-y-8 relative",
        children: [
          (0, Ge.jsxs)("div", {
            className: "space-y-2",
            children: [
              (0, Ge.jsx)("h1", {
                className: "font-bold text-white/40 uppercase text-xs",
                children: "Network",
              }),
              (0, Ge.jsx)(DT, {}),
            ],
          }),
          (0, Ge.jsxs)("div", {
            className: "space-y-2",
            children: [
              (0, Ge.jsx)("h1", {
                className: "font-bold text-white/40 uppercase text-xs",
                children: "Account",
              }),
              (0, Ge.jsx)(zM, {}),
            ],
          }),
          (0, Ge.jsxs)("div", {
            className: "space-y-2",
            children: [
              (0, Ge.jsx)("h1", {
                className: "font-bold text-white/40 uppercase text-xs",
                children: "Recent actions",
              }),
              (0, Ge.jsx)(WM, {}),
            ],
          }),
          (0, Ge.jsxs)("div", {
            className: "space-y-1",
            children: [
              (0, Ge.jsx)("h1", {
                className: "font-bold text-white/40 uppercase text-xs",
                children: "Recent store events",
              }),
              (0, Ge.jsx)(LM, {}),
            ],
          }),
          t
            ? (0, Ge.jsxs)("div", {
                className: "space-y-2",
                children: [
                  (0, Ge.jsx)("h1", {
                    className: "font-bold text-white/40 uppercase text-xs",
                    children: "Tables",
                  }),
                  (0, Ge.jsx)(KM, {}),
                ],
              })
            : null,
          e
            ? (0, Ge.jsxs)("div", {
                className: "space-y-2",
                children: [
                  (0, Ge.jsx)("h1", {
                    className: "font-bold text-white/40 uppercase text-xs",
                    children: "Components",
                  }),
                  (0, Ge.jsx)(XM, { world: e }),
                ],
              })
            : null,
        ],
      }),
      (0, Ge.jsxs)("div", {
        className:
          "p-2 text-right font-mono text-xs leading-none text-white/20",
        children: [
          "MUD ",
          Q1
            ? (0, Ge.jsxs)(Ge.Fragment, { children: ["v", vh.version] })
            : (0, Ge.jsx)(Ge.Fragment, { children: "linked" }),
        ],
      }),
    ],
  });
}
var Ge,
  Q1,
  GM = J(() => {
    UT(),
      RM(),
      BM(),
      qM(),
      HM(),
      QM(),
      YM(),
      rr(),
      (Ge = be(qe(), 1)),
      (Q1 = Object.entries(vh.dependencies).some(
        ([e, t]) => e.startsWith("@latticexyz/") && t.startsWith("link:")
      ));
  });
function ZM() {
  let { writes: e } = qt(),
    t = (0, Bu.useRef)(null),
    n = (0, Bu.useRef)(!1),
    o = (0, Bu.useRef)("auto");
  return (
    (0, Bu.useEffect)(() => {
      n.current ||
        t.current?.scrollIntoView({ behavior: o.current, block: "end" }),
        (o.current = "smooth");
    }, [e]),
    (0, Du.jsx)("div", {
      ref: t,
      className: "p-4 space-y-2",
      onMouseEnter: () => {
        n.current = !0;
      },
      onMouseLeave: () => {
        n.current = !1;
      },
      children: e.length
        ? e.map((a) => (0, Du.jsx)(K1, { write: a }, a.id))
        : (0, Du.jsx)(Du.Fragment, { children: "Waiting for transactions…" }),
    })
  );
}
var Bu,
  Du,
  eN = J(() => {
    (Bu = be(st(), 1)), H1(), rr(), (Du = be(qe(), 1));
  });
function tN() {
  let { recsWorld: e } = qt();
  if (!e) throw new Error("Missing recsWorld");
  let t = [...e.components].sort((l, c) => fi(l).localeCompare(fi(c))),
    { id: n } = Bc(),
    o = t.find((l) => l.id === n) ?? t[0],
    a = (0, lc.useRef)(null),
    u = Lc();
  return (
    (0, lc.useEffect)(() => {
      n !== o.id && u(o.id);
    }, [n, o.id]),
    (0, lc.useEffect)(() => {
      let l = (c) => {
        a.current &&
          ((c.target instanceof Node && a.current.contains(c.target)) ||
            (a.current.open = !1));
      };
      return (
        window.addEventListener("click", l),
        () => window.removeEventListener("click", l)
      );
    }),
    (0, Bt.jsxs)("div", {
      className: "p-6 space-y-4",
      children: [
        t.length
          ? (0, Bt.jsxs)("div", {
              className: "space-y-2",
              children: [
                (0, Bt.jsx)("h1", {
                  className: "font-bold text-white/40 uppercase text-xs",
                  children: "Component",
                }),
                (0, Bt.jsxs)("details", {
                  ref: a,
                  className: "pointer-events-none select-none",
                  children: [
                    (0, Bt.jsx)("summary", {
                      className:
                        "group pointer-events-auto cursor-pointer inline-flex",
                      children: (0, Bt.jsxs)("span", {
                        className:
                          "inline-flex gap-2 px-3 py-2 items-center border-2 border-white/10 rounded group-hover:border-blue-700 group-hover:bg-blue-700 group-hover:text-white",
                        children: [
                          o
                            ? (0, Bt.jsx)("span", {
                                className: "font-mono",
                                children: fi(o),
                              })
                            : (0, Bt.jsx)("span", {
                                children: "Pick a component…",
                              }),
                          (0, Bt.jsx)("span", {
                            className: "text-white/40 text-xs",
                            children: "▼",
                          }),
                        ],
                      }),
                    }),
                    (0, Bt.jsx)("div", {
                      className: "relative",
                      children: (0, Bt.jsx)("div", {
                        className:
                          "pointer-events-auto absolute top-1 left-0 z-20 bg-slate-700 rounded shadow-lg flex flex-col py-1.5 font-mono text-xs leading-none",
                        children: t.map((l) =>
                          (0, Bt.jsx)(
                            $r,
                            {
                              className: tr(
                                "px-2 py-1.5 text-left hover:bg-blue-700 hover:text-white",
                                l === o ? "bg-slate-600" : null
                              ),
                              to: l.id,
                              onClick: () => {
                                a.current && (a.current.open = !1);
                              },
                              children: fi(l),
                            },
                            l.id
                          )
                        ),
                      }),
                    }),
                  ],
                }),
              ],
            })
          : (0, Bt.jsx)(Bt.Fragment, { children: "Waiting for components…" }),
        (0, Bt.jsx)(Rv, {}),
      ],
    })
  );
}
var lc,
  Bt,
  rN = J(() => {
    Xn(), Ei(), (lc = be(st(), 1)), Ba(), rr(), X1(), (Bt = be(qe(), 1));
  });
function nN({ component: e }) {
  let t = K_([Dg(e)]);
  return (0, pn.jsxs)("table", {
    className: "w-full -mx-1",
    children: [
      (0, pn.jsx)("thead", {
        className: "sticky top-0 z-10 bg-slate-800 text-left",
        children: (0, pn.jsxs)("tr", {
          className: "text-amber-200/80 font-mono",
          children: [
            (0, pn.jsx)("th", {
              className: "px-1 pt-1.5 font-normal",
              children: "entity",
            }),
            Object.keys(e.schema).map((n) =>
              (0, pn.jsx)(
                "th",
                { className: "px-1 pt-1.5 font-normal", children: n },
                n
              )
            ),
          ],
        }),
      }),
      (0, pn.jsx)("tbody", {
        className: "font-mono text-xs",
        children: t.map((n) => {
          let o = zg(e, n);
          return (0, pn.jsxs)(
            "tr",
            {
              children: [
                (0, pn.jsx)("td", {
                  className:
                    "px-1 whitespace-nowrap overflow-hidden text-ellipsis",
                  children: n,
                }),
                Object.keys(e.schema).map((a) => {
                  let u = o[a];
                  return (0, pn.jsx)(
                    "td",
                    {
                      className:
                        "px-1 whitespace-nowrap overflow-hidden text-ellipsis",
                      children:
                        e.schema[a] === M.T
                          ? ov(u)
                          : Array.isArray(u)
                          ? u.map(String).join(", ")
                          : String(u),
                    },
                    a
                  );
                }),
              ],
            },
            n
          );
        }),
      }),
    ],
  });
}
var pn,
  oN = J(() => {
    Zc(), F1(), (pn = be(qe(), 1));
  });
function iN({ component: e }) {
  let t = K_([Dg(e)]);
  return (0, vn.jsxs)("table", {
    className: "w-full -mx-1",
    children: [
      (0, vn.jsx)("thead", {
        className: "sticky top-0 z-10 bg-slate-800 text-left",
        children: (0, vn.jsxs)("tr", {
          className: "text-amber-200/80 font-mono",
          children: [
            Object.keys(e.metadata.keySchema).map((n) =>
              (0, vn.jsx)(
                "th",
                { className: "px-1 pt-1.5 font-normal", children: n },
                n
              )
            ),
            Object.keys(e.metadata.valueSchema).map((n) =>
              (0, vn.jsx)(
                "th",
                { className: "px-1 pt-1.5 font-normal", children: n },
                n
              )
            ),
          ],
        }),
      }),
      (0, vn.jsx)("tbody", {
        className: "font-mono text-xs",
        children: t.map((n) => {
          let o = k2(e.metadata.keySchema, n),
            a = zg(e, n);
          return (0, vn.jsxs)(
            "tr",
            {
              children: [
                Object.keys(e.metadata.keySchema).map((u) =>
                  (0, vn.jsx)(
                    "td",
                    {
                      className:
                        "px-1 whitespace-nowrap overflow-hidden text-ellipsis",
                      children: String(o[u]),
                    },
                    u
                  )
                ),
                Object.keys(e.metadata.valueSchema).map((u) => {
                  let l = a[u];
                  return (0, vn.jsx)(
                    "td",
                    {
                      className:
                        "px-1 whitespace-nowrap overflow-hidden text-ellipsis",
                      children: Array.isArray(l)
                        ? l.map(String).join(", ")
                        : String(l),
                    },
                    u
                  );
                }),
              ],
            },
            n
          );
        }),
      }),
    ],
  });
}
var vn,
  aN = J(() => {
    Zc(), (vn = be(qe(), 1));
  });
function uN() {
  let { recsWorld: e } = qt();
  if (!e) throw new Error("Missing recsWorld");
  let { id: t } = Bc(),
    n = e.components.find((o) => o.id === t);
  return n
    ? j2(n)
      ? (0, uv.jsx)(iN, { component: n }, n.id)
      : (0, uv.jsx)(nN, { component: n }, n.id)
    : null;
}
var uv,
  lN = J(() => {
    Xn(), rr(), oN(), aN(), (uv = be(qe(), 1));
  });
function sN() {
  let e = dh(),
    { id: t } = Bc(),
    n = e.find((u) => u.tableId === t) ?? e[0],
    o = (0, sc.useRef)(null),
    a = Lc();
  return (
    (0, sc.useEffect)(() => {
      t !== n.tableId && a(n.tableId);
    }, [t, n.tableId]),
    (0, sc.useEffect)(() => {
      let u = (l) => {
        o.current &&
          ((l.target instanceof Node && o.current.contains(l.target)) ||
            (o.current.open = !1));
      };
      return (
        window.addEventListener("click", u),
        () => window.removeEventListener("click", u)
      );
    }),
    (0, er.jsxs)("div", {
      className: "p-6 space-y-4",
      children: [
        (0, er.jsxs)("div", {
          className: "space-y-2",
          children: [
            (0, er.jsx)("h1", {
              className: "font-bold text-white/40 uppercase text-xs",
              children: "Table",
            }),
            (0, er.jsxs)("details", {
              ref: o,
              className: "pointer-events-none select-none",
              children: [
                (0, er.jsx)("summary", {
                  className:
                    "group pointer-events-auto cursor-pointer inline-flex",
                  children: (0, er.jsxs)("span", {
                    className:
                      "inline-flex gap-2 px-3 py-2 items-center border-2 border-white/10 rounded group-hover:border-blue-700 group-hover:bg-blue-700 group-hover:text-white",
                    children: [
                      n
                        ? (0, er.jsxs)("span", {
                            className: "font-mono",
                            children: [n.namespace, ":", n.name],
                          })
                        : (0, er.jsx)("span", { children: "Pick a table…" }),
                      (0, er.jsx)("span", {
                        className: "text-white/40 text-xs",
                        children: "▼",
                      }),
                    ],
                  }),
                }),
                (0, er.jsx)("div", {
                  className: "relative",
                  children: (0, er.jsx)("div", {
                    className:
                      "pointer-events-auto absolute top-1 left-0 z-20 bg-slate-700 rounded shadow-lg flex flex-col py-1.5 font-mono text-xs leading-none",
                    children: e.map((u) =>
                      (0, er.jsxs)(
                        $r,
                        {
                          className: tr(
                            "px-2 py-1.5 text-left hover:bg-blue-700 hover:text-white",
                            u === n ? "bg-slate-600" : null
                          ),
                          to: u.tableId,
                          onClick: () => {
                            o.current && (o.current.open = !1);
                          },
                          children: [u.namespace, ":", u.name],
                        },
                        u.tableId
                      )
                    ),
                  }),
                }),
              ],
            }),
          ],
        }),
        (0, er.jsx)(Rv, {}),
      ],
    })
  );
}
var sc,
  er,
  cN = J(() => {
    Xn(), Ei(), (sc = be(st(), 1)), Ba(), ph(), (er = be(qe(), 1));
  });
function fN(e) {
  let { useStore: t } = qt();
  if (!t) throw new Error("Missing useStore");
  let [n, o] = (0, lv.useState)(t.getState().getRecords(e));
  return (
    (0, lv.useEffect)(
      () =>
        t.subscribe((a) => {
          let u = t.getState().getRecords(e);
          u !== n && o(u);
        }),
      [t, n]
    ),
    Object.values(n)
  );
}
var lv,
  dN = J(() => {
    rr(), (lv = be(st(), 1));
  });
function pN({ hex: e }) {
  return e.length <= 10
    ? (0, Uu.jsx)("span", { children: e })
    : (0, Uu.jsxs)("span", {
        children: [
          (0, Uu.jsx)("span", {
            className: "after:content-['…'] after:select-none",
            children: e.slice(0, 6),
          }),
          (0, Uu.jsx)("span", {
            className: "tracking-[-1ch] text-transparent",
            children: e.slice(6, -4),
          }),
          e.slice(-4),
        ],
      });
}
var Uu,
  vN = J(() => {
    Uu = be(qe(), 1);
  });
function sv({ value: e }) {
  return Array.isArray(e)
    ? e.map((t, n) =>
        (0, pa.jsxs)(
          Y1.default.Fragment,
          { children: [n > 0 ? ", " : null, (0, pa.jsx)(sv, { value: t })] },
          JSON.stringify({ i: n, value: e })
        )
      )
    : Pl(e)
    ? (0, pa.jsx)(pN, { hex: e })
    : (0, pa.jsx)(pa.Fragment, { children: String(e) });
}
var Y1,
  pa,
  hN = J(() => {
    (Y1 = be(st(), 1)), of(), vN(), (pa = be(qe(), 1));
  });
function mN({ table: e }) {
  let t = fN(e);
  return (0, xr.jsxs)("table", {
    className: "w-full -mx-1",
    children: [
      (0, xr.jsx)("thead", {
        className: "sticky top-0 z-10 bg-slate-800 text-left",
        children: (0, xr.jsxs)("tr", {
          className: "text-amber-200/80 font-mono",
          children: [
            Object.keys(e.keySchema).map((n) =>
              (0, xr.jsx)(
                "th",
                { className: "px-1.5 pt-1.5 font-normal", children: n },
                n
              )
            ),
            Object.keys(e.valueSchema).map((n) =>
              (0, xr.jsx)(
                "th",
                { className: "px-1.5 pt-1.5 font-normal", children: n },
                n
              )
            ),
          ],
        }),
      }),
      (0, xr.jsx)("tbody", {
        className: "font-mono text-xs",
        children: t.map((n) =>
          (0, xr.jsxs)(
            "tr",
            {
              children: [
                Object.keys(e.keySchema).map((o) =>
                  (0, xr.jsx)(
                    "td",
                    {
                      className:
                        "px-1.5 whitespace-nowrap overflow-hidden text-ellipsis",
                      children: (0, xr.jsx)(sv, { value: n.key[o] }),
                    },
                    o
                  )
                ),
                Object.keys(e.valueSchema).map((o) =>
                  (0, xr.jsx)(
                    "td",
                    {
                      className:
                        "px-1.5 whitespace-nowrap overflow-hidden text-ellipsis",
                      children: (0, xr.jsx)(sv, { value: n.value[o] }),
                    },
                    o
                  )
                ),
              ],
            },
            n.id
          )
        ),
      }),
    ],
  });
}
var xr,
  bN = J(() => {
    dN(), hN(), (xr = be(qe(), 1));
  });
function yN() {
  let e = dh(),
    { id: t } = Bc(),
    n = e.find((o) => o.tableId === t);
  return n ? (0, J1.jsx)(mN, { table: n }, n.tableId) : null;
}
var J1,
  gN = J(() => {
    Xn(), bN(), ph(), (J1 = be(qe(), 1));
  }),
  Et,
  G1,
  wN = J(() => {
    Xn(),
      bA(),
      gA(),
      xA(),
      GM(),
      eN(),
      rN(),
      lN(),
      cN(),
      gN(),
      (Et = be(qe(), 1)),
      (G1 = iA(
        $p(
          (0, Et.jsxs)(Bn, {
            path: "/",
            element: (0, Et.jsx)(mA, {}),
            errorElement: (0, Et.jsx)(yA, {}),
            children: [
              (0, Et.jsx)(Bn, { index: !0, element: (0, Et.jsx)(JM, {}) }),
              (0, Et.jsx)(Bn, {
                path: "actions",
                element: (0, Et.jsx)(ZM, {}),
              }),
              (0, Et.jsx)(Bn, { path: "events", element: (0, Et.jsx)(OA, {}) }),
              (0, Et.jsx)(Bn, {
                path: "tables",
                element: (0, Et.jsx)(sN, {}),
                children: (0, Et.jsx)(Bn, {
                  path: ":id",
                  element: (0, Et.jsx)(yN, {}),
                }),
              }),
              (0, Et.jsx)(Bn, {
                path: "components",
                element: (0, Et.jsx)(tN, {}),
                children: (0, Et.jsx)(Bn, {
                  path: ":id",
                  element: (0, Et.jsx)(uN, {}),
                }),
              }),
            ],
          })
        )
      ));
  });
function _N(e, t) {
  if (Fn.useSyncExternalStore === void 0)
    throw new TypeError(
      'You are using React 17 or below. Install with "npm install use-local-storage-state@17".'
    );
  let [n] = (0, Fn.useState)(t?.defaultValue);
  if (typeof window > "u")
    return [n, () => {}, { isPersistent: !0, removeItem: () => {} }];
  let o = t?.serializer;
  return ON(e, n, t?.storageSync, o?.parse, o?.stringify);
}
function ON(e, t, n = !0, o = xN, a = JSON.stringify) {
  if (!So.has(e) && t !== void 0 && localStorage.getItem(e) === null)
    try {
      localStorage.setItem(e, a(t));
    } catch {}
  let u = (0, Fn.useRef)({ item: null, parsed: t }),
    l = (0, Fn.useSyncExternalStore)(
      (0, Fn.useCallback)(
        (f) => {
          let d = (v) => {
            e === v && f();
          };
          return (
            xc.add(d),
            () => {
              xc.delete(d);
            }
          );
        },
        [e]
      ),
      () => {
        let f = localStorage.getItem(e);
        if (So.has(e)) u.current = { item: f, parsed: So.get(e) };
        else if (f !== u.current.item) {
          let d;
          try {
            d = f === null ? t : o(f);
          } catch {
            d = t;
          }
          u.current = { item: f, parsed: d };
        }
        return u.current.parsed;
      },
      () => t
    ),
    c = (0, Fn.useCallback)(
      (f) => {
        let d = f instanceof Function ? f(u.current.parsed) : f;
        try {
          localStorage.setItem(e, a(d)), So.delete(e);
        } catch {
          So.set(e, d);
        }
        up(e);
      },
      [e, a]
    );
  return (
    (0, Fn.useEffect)(() => {
      if (!n) return;
      let f = (d) => {
        d.storageArea === localStorage && d.key === e && up(e);
      };
      return (
        window.addEventListener("storage", f),
        () => window.removeEventListener("storage", f)
      );
    }, [e, n]),
    (0, Fn.useMemo)(
      () => [
        l,
        c,
        {
          isPersistent: l === t || !So.has(e),
          removeItem() {
            So.delete(e), localStorage.removeItem(e), up(e);
          },
        },
      ],
      [e, c, l, t]
    )
  );
}
function up(e) {
  for (let t of [...xc]) t(e);
}
function xN(e) {
  return e === "undefined" ? void 0 : JSON.parse(e);
}
var Fn,
  So,
  xc,
  SN = J(() => {
    (Fn = be(st())), (So = new Map()), (xc = new Set());
  }),
  Z1,
  PN = J(() => {
    SN(), (Z1 = _N);
  }),
  eO = {};
aw(eO, { App: () => EN });
function EN() {
  let [e, t] = Z1("mud-dev-tools-shown", { defaultValue: !0 });
  return (
    (0, tO.useEffect)(() => {
      let n = (o) => {
        o.key === "`" && t(!e);
      };
      return (
        window.addEventListener("keypress", n),
        () => window.removeEventListener("keypress", n)
      );
    }),
    (0, hn.jsx)("div", {
      className: "fixed inset-0 pointer-events-none",
      children: (0, hn.jsxs)("div", {
        className: tr(
          "pointer-events-auto w-full max-w-screen-sm h-full absolute right-0",
          "transition duration-500",
          e ? "translate-x-0" : "translate-x-full"
        ),
        children: [
          (0, hn.jsxs)("div", {
            className:
              "absolute bottom-0 right-full min-w-max flex flex-col-reverse items-end justify-center m-2 text-gray-500",
            children: [
              (0, hn.jsx)("button", {
                type: "button",
                className:
                  "peer text-sm p-2 rounded leading-none transition opacity-60 hover:opacity-100",
                onClick: () => t(!e),
                children: (0, hn.jsxs)("span", {
                  className: "whitespace-nowrap font-medium",
                  children: [e ? "→" : "←", " MUD Dev Tools"],
                }),
              }),
              (0, hn.jsxs)("span", {
                className:
                  "transition opacity-0 peer-hover:opacity-60 px-2 text-xs flex items-center justify-center gap-2",
                children: [
                  "Keyboard shortcut",
                  (0, hn.jsx)("code", {
                    className:
                      "bg-gray-500/10 p-1 rounded text-mono text-xs leading-none",
                    children: "`",
                  }),
                ],
              }),
            ],
          }),
          (0, hn.jsx)("div", {
            className: tr(
              "w-full h-full bg-slate-800 text-white/80 text-sm flex flex-col",
              "transition duration-500",
              e ? "opacity-100" : "opacity-0"
            ),
            children: (0, hn.jsx)(tA, { router: G1 }),
          }),
        ],
      }),
    })
  );
}
var tO,
  hn,
  kN = J(() => {
    $2(), V2(), (tO = be(st(), 1)), Ba(), wN(), Xn(), PN(), (hn = be(qe(), 1));
  }),
  lp = be(qe(), 1),
  qy = "mud-dev-tools";
async function AN(e) {
  if (typeof window > "u") {
    console.warn("MUD dev-tools should only be used in browser bundles");
    return;
  }
  if (document.getElementById(qy)) {
    console.warn("MUD dev-tools is already mounted");
    return;
  }
  try {
    let t = await Promise.resolve().then(() => be(st(), 1)),
      n = await Promise.resolve().then(() => be(F2(), 1)),
      { App: o } = await Promise.resolve().then(() => (kN(), eO)),
      { DevToolsProvider: a } = await Promise.resolve().then(() => (rr(), Yw)),
      u = document.createElement("div");
    (u.id = qy), (u.style.position = "relative"), (u.style.zIndex = "999999");
    let l = n.createRoot(u);
    return (
      l.render(
        (0, lp.jsx)(t.StrictMode, {
          children: (0, lp.jsx)(a, { value: e, children: (0, lp.jsx)(o, {}) }),
        })
      ),
      document.body.appendChild(u),
      () => {
        l.unmount(), u.remove();
      }
    );
  } catch (t) {
    console.error("Failed to mount MUD dev-tools", t);
  }
}
/*! Bundled license information:

react/cjs/react.production.min.js:
  (**
   * @license React
   * react.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react.development.js:
  (**
   * @license React
   * react.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-runtime.production.min.js:
  (**
   * @license React
   * react-jsx-runtime.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-runtime.development.js:
  (**
   * @license React
   * react-jsx-runtime.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

scheduler/cjs/scheduler.production.min.js:
  (**
   * @license React
   * scheduler.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

scheduler/cjs/scheduler.development.js:
  (**
   * @license React
   * scheduler.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom.production.min.js:
  (**
   * @license React
   * react-dom.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom.development.js:
  (**
   * @license React
   * react-dom.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
  (**
   * Checks if an event is supported in the current execution environment.
   *
   * NOTE: This will not work correctly for non-generic events such as `change`,
   * `reset`, `load`, `error`, and `select`.
   *
   * Borrows from Modernizr.
   *
   * @param {string} eventNameSuffix Event name, e.g. "click".
   * @return {boolean} True if the event is supported.
   * @internal
   * @license Modernizr 3.0.0pre (Custom Build) | MIT
   *)

@remix-run/router/dist/router.js:
  (**
   * @remix-run/router v1.6.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

react-router/dist/index.js:
  (**
   * React Router v6.11.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

react-router-dom/dist/index.js:
  (**
   * React Router DOM v6.11.0
   *
   * Copyright (c) Remix Software Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   *)

@noble/hashes/esm/utils.js:
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)
*/ export { AN as mount };

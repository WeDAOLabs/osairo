const Gt = "modulepreload",
  Jt = function (e) {
    return "/" + e;
  },
  at = {},
  Xt = function (t, n, r) {
    if (!n || n.length === 0) return t();
    const s = document.getElementsByTagName("link");
    return Promise.all(
      n.map((i) => {
        if (((i = Jt(i)), i in at)) return;
        at[i] = !0;
        const a = i.endsWith(".css"),
          o = a ? '[rel="stylesheet"]' : "";
        if (!!r)
          for (let u = s.length - 1; u >= 0; u--) {
            const d = s[u];
            if (d.href === i && (!a || d.rel === "stylesheet")) return;
          }
        else if (document.querySelector(`link[href="${i}"]${o}`)) return;
        const c = document.createElement("link");
        if (
          ((c.rel = a ? "stylesheet" : Gt),
          a || ((c.as = "script"), (c.crossOrigin = "")),
          (c.href = i),
          document.head.appendChild(c),
          a)
        )
          return new Promise((u, d) => {
            c.addEventListener("load", u),
              c.addEventListener("error", () =>
                d(new Error(`Unable to preload CSS for ${i}`))
              );
          });
      })
    ).then(() => t());
  };
var A;
(function (e) {
  e.assertEqual = (s) => s;
  function t(s) {}
  e.assertIs = t;
  function n(s) {
    throw new Error();
  }
  (e.assertNever = n),
    (e.arrayToEnum = (s) => {
      const i = {};
      for (const a of s) i[a] = a;
      return i;
    }),
    (e.getValidEnumValues = (s) => {
      const i = e.objectKeys(s).filter((o) => typeof s[s[o]] != "number"),
        a = {};
      for (const o of i) a[o] = s[o];
      return e.objectValues(a);
    }),
    (e.objectValues = (s) =>
      e.objectKeys(s).map(function (i) {
        return s[i];
      })),
    (e.objectKeys =
      typeof Object.keys == "function"
        ? (s) => Object.keys(s)
        : (s) => {
            const i = [];
            for (const a in s)
              Object.prototype.hasOwnProperty.call(s, a) && i.push(a);
            return i;
          }),
    (e.find = (s, i) => {
      for (const a of s) if (i(a)) return a;
    }),
    (e.isInteger =
      typeof Number.isInteger == "function"
        ? (s) => Number.isInteger(s)
        : (s) => typeof s == "number" && isFinite(s) && Math.floor(s) === s);
  function r(s, i = " | ") {
    return s.map((a) => (typeof a == "string" ? `'${a}'` : a)).join(i);
  }
  (e.joinValues = r),
    (e.jsonStringifyReplacer = (s, i) =>
      typeof i == "bigint" ? i.toString() : i);
})(A || (A = {}));
var qe;
(function (e) {
  e.mergeShapes = (t, n) => ({ ...t, ...n });
})(qe || (qe = {}));
const h = A.arrayToEnum([
    "string",
    "nan",
    "number",
    "integer",
    "float",
    "boolean",
    "date",
    "bigint",
    "symbol",
    "function",
    "undefined",
    "null",
    "array",
    "object",
    "unknown",
    "promise",
    "void",
    "never",
    "map",
    "set",
  ]),
  V = (e) => {
    switch (typeof e) {
      case "undefined":
        return h.undefined;
      case "string":
        return h.string;
      case "number":
        return isNaN(e) ? h.nan : h.number;
      case "boolean":
        return h.boolean;
      case "function":
        return h.function;
      case "bigint":
        return h.bigint;
      case "symbol":
        return h.symbol;
      case "object":
        return Array.isArray(e)
          ? h.array
          : e === null
          ? h.null
          : e.then &&
            typeof e.then == "function" &&
            e.catch &&
            typeof e.catch == "function"
          ? h.promise
          : typeof Map < "u" && e instanceof Map
          ? h.map
          : typeof Set < "u" && e instanceof Set
          ? h.set
          : typeof Date < "u" && e instanceof Date
          ? h.date
          : h.object;
      default:
        return h.unknown;
    }
  },
  f = A.arrayToEnum([
    "invalid_type",
    "invalid_literal",
    "custom",
    "invalid_union",
    "invalid_union_discriminator",
    "invalid_enum_value",
    "unrecognized_keys",
    "invalid_arguments",
    "invalid_return_type",
    "invalid_date",
    "invalid_string",
    "too_small",
    "too_big",
    "invalid_intersection_types",
    "not_multiple_of",
    "not_finite",
  ]),
  Qt = (e) => JSON.stringify(e, null, 2).replace(/"([^"]+)":/g, "$1:");
class k extends Error {
  constructor(t) {
    super(),
      (this.issues = []),
      (this.addIssue = (r) => {
        this.issues = [...this.issues, r];
      }),
      (this.addIssues = (r = []) => {
        this.issues = [...this.issues, ...r];
      });
    const n = new.target.prototype;
    Object.setPrototypeOf
      ? Object.setPrototypeOf(this, n)
      : (this.__proto__ = n),
      (this.name = "ZodError"),
      (this.issues = t);
  }
  get errors() {
    return this.issues;
  }
  format(t) {
    const n =
        t ||
        function (i) {
          return i.message;
        },
      r = { _errors: [] },
      s = (i) => {
        for (const a of i.issues)
          if (a.code === "invalid_union") a.unionErrors.map(s);
          else if (a.code === "invalid_return_type") s(a.returnTypeError);
          else if (a.code === "invalid_arguments") s(a.argumentsError);
          else if (a.path.length === 0) r._errors.push(n(a));
          else {
            let o = r,
              l = 0;
            for (; l < a.path.length; ) {
              const c = a.path[l];
              l === a.path.length - 1
                ? ((o[c] = o[c] || { _errors: [] }), o[c]._errors.push(n(a)))
                : (o[c] = o[c] || { _errors: [] }),
                (o = o[c]),
                l++;
            }
          }
      };
    return s(this), r;
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, A.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(t = (n) => n.message) {
    const n = {},
      r = [];
    for (const s of this.issues)
      s.path.length > 0
        ? ((n[s.path[0]] = n[s.path[0]] || []), n[s.path[0]].push(t(s)))
        : r.push(t(s));
    return { formErrors: r, fieldErrors: n };
  }
  get formErrors() {
    return this.flatten();
  }
}
k.create = (e) => new k(e);
const le = (e, t) => {
  let n;
  switch (e.code) {
    case f.invalid_type:
      e.received === h.undefined
        ? (n = "Required")
        : (n = `Expected ${e.expected}, received ${e.received}`);
      break;
    case f.invalid_literal:
      n = `Invalid literal value, expected ${JSON.stringify(
        e.expected,
        A.jsonStringifyReplacer
      )}`;
      break;
    case f.unrecognized_keys:
      n = `Unrecognized key(s) in object: ${A.joinValues(e.keys, ", ")}`;
      break;
    case f.invalid_union:
      n = "Invalid input";
      break;
    case f.invalid_union_discriminator:
      n = `Invalid discriminator value. Expected ${A.joinValues(e.options)}`;
      break;
    case f.invalid_enum_value:
      n = `Invalid enum value. Expected ${A.joinValues(e.options)}, received '${
        e.received
      }'`;
      break;
    case f.invalid_arguments:
      n = "Invalid function arguments";
      break;
    case f.invalid_return_type:
      n = "Invalid function return type";
      break;
    case f.invalid_date:
      n = "Invalid date";
      break;
    case f.invalid_string:
      typeof e.validation == "object"
        ? "includes" in e.validation
          ? ((n = `Invalid input: must include "${e.validation.includes}"`),
            typeof e.validation.position == "number" &&
              (n = `${n} at one or more positions greater than or equal to ${e.validation.position}`))
          : "startsWith" in e.validation
          ? (n = `Invalid input: must start with "${e.validation.startsWith}"`)
          : "endsWith" in e.validation
          ? (n = `Invalid input: must end with "${e.validation.endsWith}"`)
          : A.assertNever(e.validation)
        : e.validation !== "regex"
        ? (n = `Invalid ${e.validation}`)
        : (n = "Invalid");
      break;
    case f.too_small:
      e.type === "array"
        ? (n = `Array must contain ${
            e.exact ? "exactly" : e.inclusive ? "at least" : "more than"
          } ${e.minimum} element(s)`)
        : e.type === "string"
        ? (n = `String must contain ${
            e.exact ? "exactly" : e.inclusive ? "at least" : "over"
          } ${e.minimum} character(s)`)
        : e.type === "number"
        ? (n = `Number must be ${
            e.exact
              ? "exactly equal to "
              : e.inclusive
              ? "greater than or equal to "
              : "greater than "
          }${e.minimum}`)
        : e.type === "date"
        ? (n = `Date must be ${
            e.exact
              ? "exactly equal to "
              : e.inclusive
              ? "greater than or equal to "
              : "greater than "
          }${new Date(Number(e.minimum))}`)
        : (n = "Invalid input");
      break;
    case f.too_big:
      e.type === "array"
        ? (n = `Array must contain ${
            e.exact ? "exactly" : e.inclusive ? "at most" : "less than"
          } ${e.maximum} element(s)`)
        : e.type === "string"
        ? (n = `String must contain ${
            e.exact ? "exactly" : e.inclusive ? "at most" : "under"
          } ${e.maximum} character(s)`)
        : e.type === "number"
        ? (n = `Number must be ${
            e.exact
              ? "exactly"
              : e.inclusive
              ? "less than or equal to"
              : "less than"
          } ${e.maximum}`)
        : e.type === "bigint"
        ? (n = `BigInt must be ${
            e.exact
              ? "exactly"
              : e.inclusive
              ? "less than or equal to"
              : "less than"
          } ${e.maximum}`)
        : e.type === "date"
        ? (n = `Date must be ${
            e.exact
              ? "exactly"
              : e.inclusive
              ? "smaller than or equal to"
              : "smaller than"
          } ${new Date(Number(e.maximum))}`)
        : (n = "Invalid input");
      break;
    case f.custom:
      n = "Invalid input";
      break;
    case f.invalid_intersection_types:
      n = "Intersection results could not be merged";
      break;
    case f.not_multiple_of:
      n = `Number must be a multiple of ${e.multipleOf}`;
      break;
    case f.not_finite:
      n = "Number must be finite";
      break;
    default:
      (n = t.defaultError), A.assertNever(e);
  }
  return { message: n };
};
let mt = le;
function Kt(e) {
  mt = e;
}
function Ye() {
  return mt;
}
const Ce = (e) => {
    const { data: t, path: n, errorMaps: r, issueData: s } = e,
      i = [...n, ...(s.path || [])],
      a = { ...s, path: i };
    let o = "";
    const l = r
      .filter((c) => !!c)
      .slice()
      .reverse();
    for (const c of l) o = c(a, { data: t, defaultError: o }).message;
    return { ...s, path: i, message: s.message || o };
  },
  en = [];
function m(e, t) {
  const n = Ce({
    issueData: t,
    data: e.data,
    path: e.path,
    errorMaps: [e.common.contextualErrorMap, e.schemaErrorMap, Ye(), le].filter(
      (r) => !!r
    ),
  });
  e.common.issues.push(n);
}
class Y {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    this.value === "valid" && (this.value = "dirty");
  }
  abort() {
    this.value !== "aborted" && (this.value = "aborted");
  }
  static mergeArray(t, n) {
    const r = [];
    for (const s of n) {
      if (s.status === "aborted") return T;
      s.status === "dirty" && t.dirty(), r.push(s.value);
    }
    return { status: t.value, value: r };
  }
  static async mergeObjectAsync(t, n) {
    const r = [];
    for (const s of n) r.push({ key: await s.key, value: await s.value });
    return Y.mergeObjectSync(t, r);
  }
  static mergeObjectSync(t, n) {
    const r = {};
    for (const s of n) {
      const { key: i, value: a } = s;
      if (i.status === "aborted" || a.status === "aborted") return T;
      i.status === "dirty" && t.dirty(),
        a.status === "dirty" && t.dirty(),
        i.value !== "__proto__" &&
          (typeof a.value < "u" || s.alwaysSet) &&
          (r[i.value] = a.value);
    }
    return { status: t.value, value: r };
  }
}
const T = Object.freeze({ status: "aborted" }),
  pt = (e) => ({ status: "dirty", value: e }),
  C = (e) => ({ status: "valid", value: e }),
  We = (e) => e.status === "aborted",
  He = (e) => e.status === "dirty",
  de = (e) => e.status === "valid",
  ke = (e) => typeof Promise < "u" && e instanceof Promise;
var _;
(function (e) {
  (e.errToObj = (t) => (typeof t == "string" ? { message: t } : t || {})),
    (e.toString = (t) => (typeof t == "string" ? t : t?.message));
})(_ || (_ = {}));
class Z {
  constructor(t, n, r, s) {
    (this._cachedPath = []),
      (this.parent = t),
      (this.data = n),
      (this._path = r),
      (this._key = s);
  }
  get path() {
    return (
      this._cachedPath.length ||
        (this._key instanceof Array
          ? this._cachedPath.push(...this._path, ...this._key)
          : this._cachedPath.push(...this._path, this._key)),
      this._cachedPath
    );
  }
}
const ot = (e, t) => {
  if (de(t)) return { success: !0, data: t.value };
  if (!e.common.issues.length)
    throw new Error("Validation failed but no issues detected.");
  return {
    success: !1,
    get error() {
      if (this._error) return this._error;
      const n = new k(e.common.issues);
      return (this._error = n), this._error;
    },
  };
};
function b(e) {
  if (!e) return {};
  const {
    errorMap: t,
    invalid_type_error: n,
    required_error: r,
    description: s,
  } = e;
  if (t && (n || r))
    throw new Error(
      `Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`
    );
  return t
    ? { errorMap: t, description: s }
    : {
        errorMap: (a, o) =>
          a.code !== "invalid_type"
            ? { message: o.defaultError }
            : typeof o.data > "u"
            ? { message: r ?? o.defaultError }
            : { message: n ?? o.defaultError },
        description: s,
      };
}
class R {
  constructor(t) {
    (this.spa = this.safeParseAsync),
      (this._def = t),
      (this.parse = this.parse.bind(this)),
      (this.safeParse = this.safeParse.bind(this)),
      (this.parseAsync = this.parseAsync.bind(this)),
      (this.safeParseAsync = this.safeParseAsync.bind(this)),
      (this.spa = this.spa.bind(this)),
      (this.refine = this.refine.bind(this)),
      (this.refinement = this.refinement.bind(this)),
      (this.superRefine = this.superRefine.bind(this)),
      (this.optional = this.optional.bind(this)),
      (this.nullable = this.nullable.bind(this)),
      (this.nullish = this.nullish.bind(this)),
      (this.array = this.array.bind(this)),
      (this.promise = this.promise.bind(this)),
      (this.or = this.or.bind(this)),
      (this.and = this.and.bind(this)),
      (this.transform = this.transform.bind(this)),
      (this.brand = this.brand.bind(this)),
      (this.default = this.default.bind(this)),
      (this.catch = this.catch.bind(this)),
      (this.describe = this.describe.bind(this)),
      (this.pipe = this.pipe.bind(this)),
      (this.readonly = this.readonly.bind(this)),
      (this.isNullable = this.isNullable.bind(this)),
      (this.isOptional = this.isOptional.bind(this));
  }
  get description() {
    return this._def.description;
  }
  _getType(t) {
    return V(t.data);
  }
  _getOrReturnCtx(t, n) {
    return (
      n || {
        common: t.parent.common,
        data: t.data,
        parsedType: V(t.data),
        schemaErrorMap: this._def.errorMap,
        path: t.path,
        parent: t.parent,
      }
    );
  }
  _processInputParams(t) {
    return {
      status: new Y(),
      ctx: {
        common: t.parent.common,
        data: t.data,
        parsedType: V(t.data),
        schemaErrorMap: this._def.errorMap,
        path: t.path,
        parent: t.parent,
      },
    };
  }
  _parseSync(t) {
    const n = this._parse(t);
    if (ke(n)) throw new Error("Synchronous parse encountered promise.");
    return n;
  }
  _parseAsync(t) {
    const n = this._parse(t);
    return Promise.resolve(n);
  }
  parse(t, n) {
    const r = this.safeParse(t, n);
    if (r.success) return r.data;
    throw r.error;
  }
  safeParse(t, n) {
    var r;
    const s = {
        common: {
          issues: [],
          async: (r = n?.async) !== null && r !== void 0 ? r : !1,
          contextualErrorMap: n?.errorMap,
        },
        path: n?.path || [],
        schemaErrorMap: this._def.errorMap,
        parent: null,
        data: t,
        parsedType: V(t),
      },
      i = this._parseSync({ data: t, path: s.path, parent: s });
    return ot(s, i);
  }
  async parseAsync(t, n) {
    const r = await this.safeParseAsync(t, n);
    if (r.success) return r.data;
    throw r.error;
  }
  async safeParseAsync(t, n) {
    const r = {
        common: { issues: [], contextualErrorMap: n?.errorMap, async: !0 },
        path: n?.path || [],
        schemaErrorMap: this._def.errorMap,
        parent: null,
        data: t,
        parsedType: V(t),
      },
      s = this._parse({ data: t, path: r.path, parent: r }),
      i = await (ke(s) ? s : Promise.resolve(s));
    return ot(r, i);
  }
  refine(t, n) {
    const r = (s) =>
      typeof n == "string" || typeof n > "u"
        ? { message: n }
        : typeof n == "function"
        ? n(s)
        : n;
    return this._refinement((s, i) => {
      const a = t(s),
        o = () => i.addIssue({ code: f.custom, ...r(s) });
      return typeof Promise < "u" && a instanceof Promise
        ? a.then((l) => (l ? !0 : (o(), !1)))
        : a
        ? !0
        : (o(), !1);
    });
  }
  refinement(t, n) {
    return this._refinement((r, s) =>
      t(r) ? !0 : (s.addIssue(typeof n == "function" ? n(r, s) : n), !1)
    );
  }
  _refinement(t) {
    return new j({
      schema: this,
      typeName: v.ZodEffects,
      effect: { type: "refinement", refinement: t },
    });
  }
  superRefine(t) {
    return this._refinement(t);
  }
  optional() {
    return D.create(this, this._def);
  }
  nullable() {
    return K.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return $.create(this, this._def);
  }
  promise() {
    return ie.create(this, this._def);
  }
  or(t) {
    return pe.create([this, t], this._def);
  }
  and(t) {
    return ye.create(this, t, this._def);
  }
  transform(t) {
    return new j({
      ...b(this._def),
      schema: this,
      typeName: v.ZodEffects,
      effect: { type: "transform", transform: t },
    });
  }
  default(t) {
    const n = typeof t == "function" ? t : () => t;
    return new be({
      ...b(this._def),
      innerType: this,
      defaultValue: n,
      typeName: v.ZodDefault,
    });
  }
  brand() {
    return new _t({ typeName: v.ZodBranded, type: this, ...b(this._def) });
  }
  catch(t) {
    const n = typeof t == "function" ? t : () => t;
    return new $e({
      ...b(this._def),
      innerType: this,
      catchValue: n,
      typeName: v.ZodCatch,
    });
  }
  describe(t) {
    const n = this.constructor;
    return new n({ ...this._def, description: t });
  }
  pipe(t) {
    return Ae.create(this, t);
  }
  readonly() {
    return Ze.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const tn = /^c[^\s-]{8,}$/i,
  nn = /^[a-z][a-z0-9]*$/,
  rn = /^[0-9A-HJKMNP-TV-Z]{26}$/,
  sn =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i,
  an =
    /^(?!\.)(?!.*\.\.)([A-Z0-9_+-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i,
  on = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
let Fe;
const un =
    /^(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))$/,
  cn =
    /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/,
  ln = (e) =>
    e.precision
      ? e.offset
        ? new RegExp(
            `^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${e.precision}}(([+-]\\d{2}(:?\\d{2})?)|Z)$`
          )
        : new RegExp(
            `^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${e.precision}}Z$`
          )
      : e.precision === 0
      ? e.offset
        ? new RegExp(
            "^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(([+-]\\d{2}(:?\\d{2})?)|Z)$"
          )
        : new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z$")
      : e.offset
      ? new RegExp(
          "^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?(([+-]\\d{2}(:?\\d{2})?)|Z)$"
        )
      : new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?Z$");
function dn(e, t) {
  return !!(
    ((t === "v4" || !t) && un.test(e)) ||
    ((t === "v6" || !t) && cn.test(e))
  );
}
class U extends R {
  _parse(t) {
    if (
      (this._def.coerce && (t.data = String(t.data)),
      this._getType(t) !== h.string)
    ) {
      const i = this._getOrReturnCtx(t);
      return (
        m(i, {
          code: f.invalid_type,
          expected: h.string,
          received: i.parsedType,
        }),
        T
      );
    }
    const r = new Y();
    let s;
    for (const i of this._def.checks)
      if (i.kind === "min")
        t.data.length < i.value &&
          ((s = this._getOrReturnCtx(t, s)),
          m(s, {
            code: f.too_small,
            minimum: i.value,
            type: "string",
            inclusive: !0,
            exact: !1,
            message: i.message,
          }),
          r.dirty());
      else if (i.kind === "max")
        t.data.length > i.value &&
          ((s = this._getOrReturnCtx(t, s)),
          m(s, {
            code: f.too_big,
            maximum: i.value,
            type: "string",
            inclusive: !0,
            exact: !1,
            message: i.message,
          }),
          r.dirty());
      else if (i.kind === "length") {
        const a = t.data.length > i.value,
          o = t.data.length < i.value;
        (a || o) &&
          ((s = this._getOrReturnCtx(t, s)),
          a
            ? m(s, {
                code: f.too_big,
                maximum: i.value,
                type: "string",
                inclusive: !0,
                exact: !0,
                message: i.message,
              })
            : o &&
              m(s, {
                code: f.too_small,
                minimum: i.value,
                type: "string",
                inclusive: !0,
                exact: !0,
                message: i.message,
              }),
          r.dirty());
      } else if (i.kind === "email")
        an.test(t.data) ||
          ((s = this._getOrReturnCtx(t, s)),
          m(s, {
            validation: "email",
            code: f.invalid_string,
            message: i.message,
          }),
          r.dirty());
      else if (i.kind === "emoji")
        Fe || (Fe = new RegExp(on, "u")),
          Fe.test(t.data) ||
            ((s = this._getOrReturnCtx(t, s)),
            m(s, {
              validation: "emoji",
              code: f.invalid_string,
              message: i.message,
            }),
            r.dirty());
      else if (i.kind === "uuid")
        sn.test(t.data) ||
          ((s = this._getOrReturnCtx(t, s)),
          m(s, {
            validation: "uuid",
            code: f.invalid_string,
            message: i.message,
          }),
          r.dirty());
      else if (i.kind === "cuid")
        tn.test(t.data) ||
          ((s = this._getOrReturnCtx(t, s)),
          m(s, {
            validation: "cuid",
            code: f.invalid_string,
            message: i.message,
          }),
          r.dirty());
      else if (i.kind === "cuid2")
        nn.test(t.data) ||
          ((s = this._getOrReturnCtx(t, s)),
          m(s, {
            validation: "cuid2",
            code: f.invalid_string,
            message: i.message,
          }),
          r.dirty());
      else if (i.kind === "ulid")
        rn.test(t.data) ||
          ((s = this._getOrReturnCtx(t, s)),
          m(s, {
            validation: "ulid",
            code: f.invalid_string,
            message: i.message,
          }),
          r.dirty());
      else if (i.kind === "url")
        try {
          new URL(t.data);
        } catch {
          (s = this._getOrReturnCtx(t, s)),
            m(s, {
              validation: "url",
              code: f.invalid_string,
              message: i.message,
            }),
            r.dirty();
        }
      else
        i.kind === "regex"
          ? ((i.regex.lastIndex = 0),
            i.regex.test(t.data) ||
              ((s = this._getOrReturnCtx(t, s)),
              m(s, {
                validation: "regex",
                code: f.invalid_string,
                message: i.message,
              }),
              r.dirty()))
          : i.kind === "trim"
          ? (t.data = t.data.trim())
          : i.kind === "includes"
          ? t.data.includes(i.value, i.position) ||
            ((s = this._getOrReturnCtx(t, s)),
            m(s, {
              code: f.invalid_string,
              validation: { includes: i.value, position: i.position },
              message: i.message,
            }),
            r.dirty())
          : i.kind === "toLowerCase"
          ? (t.data = t.data.toLowerCase())
          : i.kind === "toUpperCase"
          ? (t.data = t.data.toUpperCase())
          : i.kind === "startsWith"
          ? t.data.startsWith(i.value) ||
            ((s = this._getOrReturnCtx(t, s)),
            m(s, {
              code: f.invalid_string,
              validation: { startsWith: i.value },
              message: i.message,
            }),
            r.dirty())
          : i.kind === "endsWith"
          ? t.data.endsWith(i.value) ||
            ((s = this._getOrReturnCtx(t, s)),
            m(s, {
              code: f.invalid_string,
              validation: { endsWith: i.value },
              message: i.message,
            }),
            r.dirty())
          : i.kind === "datetime"
          ? ln(i).test(t.data) ||
            ((s = this._getOrReturnCtx(t, s)),
            m(s, {
              code: f.invalid_string,
              validation: "datetime",
              message: i.message,
            }),
            r.dirty())
          : i.kind === "ip"
          ? dn(t.data, i.version) ||
            ((s = this._getOrReturnCtx(t, s)),
            m(s, {
              validation: "ip",
              code: f.invalid_string,
              message: i.message,
            }),
            r.dirty())
          : A.assertNever(i);
    return { status: r.value, value: t.data };
  }
  _regex(t, n, r) {
    return this.refinement((s) => t.test(s), {
      validation: n,
      code: f.invalid_string,
      ..._.errToObj(r),
    });
  }
  _addCheck(t) {
    return new U({ ...this._def, checks: [...this._def.checks, t] });
  }
  email(t) {
    return this._addCheck({ kind: "email", ..._.errToObj(t) });
  }
  url(t) {
    return this._addCheck({ kind: "url", ..._.errToObj(t) });
  }
  emoji(t) {
    return this._addCheck({ kind: "emoji", ..._.errToObj(t) });
  }
  uuid(t) {
    return this._addCheck({ kind: "uuid", ..._.errToObj(t) });
  }
  cuid(t) {
    return this._addCheck({ kind: "cuid", ..._.errToObj(t) });
  }
  cuid2(t) {
    return this._addCheck({ kind: "cuid2", ..._.errToObj(t) });
  }
  ulid(t) {
    return this._addCheck({ kind: "ulid", ..._.errToObj(t) });
  }
  ip(t) {
    return this._addCheck({ kind: "ip", ..._.errToObj(t) });
  }
  datetime(t) {
    var n;
    return typeof t == "string"
      ? this._addCheck({
          kind: "datetime",
          precision: null,
          offset: !1,
          message: t,
        })
      : this._addCheck({
          kind: "datetime",
          precision: typeof t?.precision > "u" ? null : t?.precision,
          offset: (n = t?.offset) !== null && n !== void 0 ? n : !1,
          ..._.errToObj(t?.message),
        });
  }
  regex(t, n) {
    return this._addCheck({ kind: "regex", regex: t, ..._.errToObj(n) });
  }
  includes(t, n) {
    return this._addCheck({
      kind: "includes",
      value: t,
      position: n?.position,
      ..._.errToObj(n?.message),
    });
  }
  startsWith(t, n) {
    return this._addCheck({ kind: "startsWith", value: t, ..._.errToObj(n) });
  }
  endsWith(t, n) {
    return this._addCheck({ kind: "endsWith", value: t, ..._.errToObj(n) });
  }
  min(t, n) {
    return this._addCheck({ kind: "min", value: t, ..._.errToObj(n) });
  }
  max(t, n) {
    return this._addCheck({ kind: "max", value: t, ..._.errToObj(n) });
  }
  length(t, n) {
    return this._addCheck({ kind: "length", value: t, ..._.errToObj(n) });
  }
  nonempty(t) {
    return this.min(1, _.errToObj(t));
  }
  trim() {
    return new U({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }],
    });
  }
  toLowerCase() {
    return new U({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }],
    });
  }
  toUpperCase() {
    return new U({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }],
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((t) => t.kind === "datetime");
  }
  get isEmail() {
    return !!this._def.checks.find((t) => t.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((t) => t.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((t) => t.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((t) => t.kind === "uuid");
  }
  get isCUID() {
    return !!this._def.checks.find((t) => t.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((t) => t.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((t) => t.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((t) => t.kind === "ip");
  }
  get minLength() {
    let t = null;
    for (const n of this._def.checks)
      n.kind === "min" && (t === null || n.value > t) && (t = n.value);
    return t;
  }
  get maxLength() {
    let t = null;
    for (const n of this._def.checks)
      n.kind === "max" && (t === null || n.value < t) && (t = n.value);
    return t;
  }
}
U.create = (e) => {
  var t;
  return new U({
    checks: [],
    typeName: v.ZodString,
    coerce: (t = e?.coerce) !== null && t !== void 0 ? t : !1,
    ...b(e),
  });
};
function fn(e, t) {
  const n = (e.toString().split(".")[1] || "").length,
    r = (t.toString().split(".")[1] || "").length,
    s = n > r ? n : r,
    i = parseInt(e.toFixed(s).replace(".", "")),
    a = parseInt(t.toFixed(s).replace(".", ""));
  return (i % a) / Math.pow(10, s);
}
class q extends R {
  constructor() {
    super(...arguments),
      (this.min = this.gte),
      (this.max = this.lte),
      (this.step = this.multipleOf);
  }
  _parse(t) {
    if (
      (this._def.coerce && (t.data = Number(t.data)),
      this._getType(t) !== h.number)
    ) {
      const i = this._getOrReturnCtx(t);
      return (
        m(i, {
          code: f.invalid_type,
          expected: h.number,
          received: i.parsedType,
        }),
        T
      );
    }
    let r;
    const s = new Y();
    for (const i of this._def.checks)
      i.kind === "int"
        ? A.isInteger(t.data) ||
          ((r = this._getOrReturnCtx(t, r)),
          m(r, {
            code: f.invalid_type,
            expected: "integer",
            received: "float",
            message: i.message,
          }),
          s.dirty())
        : i.kind === "min"
        ? (i.inclusive ? t.data < i.value : t.data <= i.value) &&
          ((r = this._getOrReturnCtx(t, r)),
          m(r, {
            code: f.too_small,
            minimum: i.value,
            type: "number",
            inclusive: i.inclusive,
            exact: !1,
            message: i.message,
          }),
          s.dirty())
        : i.kind === "max"
        ? (i.inclusive ? t.data > i.value : t.data >= i.value) &&
          ((r = this._getOrReturnCtx(t, r)),
          m(r, {
            code: f.too_big,
            maximum: i.value,
            type: "number",
            inclusive: i.inclusive,
            exact: !1,
            message: i.message,
          }),
          s.dirty())
        : i.kind === "multipleOf"
        ? fn(t.data, i.value) !== 0 &&
          ((r = this._getOrReturnCtx(t, r)),
          m(r, {
            code: f.not_multiple_of,
            multipleOf: i.value,
            message: i.message,
          }),
          s.dirty())
        : i.kind === "finite"
        ? Number.isFinite(t.data) ||
          ((r = this._getOrReturnCtx(t, r)),
          m(r, { code: f.not_finite, message: i.message }),
          s.dirty())
        : A.assertNever(i);
    return { status: s.value, value: t.data };
  }
  gte(t, n) {
    return this.setLimit("min", t, !0, _.toString(n));
  }
  gt(t, n) {
    return this.setLimit("min", t, !1, _.toString(n));
  }
  lte(t, n) {
    return this.setLimit("max", t, !0, _.toString(n));
  }
  lt(t, n) {
    return this.setLimit("max", t, !1, _.toString(n));
  }
  setLimit(t, n, r, s) {
    return new q({
      ...this._def,
      checks: [
        ...this._def.checks,
        { kind: t, value: n, inclusive: r, message: _.toString(s) },
      ],
    });
  }
  _addCheck(t) {
    return new q({ ...this._def, checks: [...this._def.checks, t] });
  }
  int(t) {
    return this._addCheck({ kind: "int", message: _.toString(t) });
  }
  positive(t) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !1,
      message: _.toString(t),
    });
  }
  negative(t) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !1,
      message: _.toString(t),
    });
  }
  nonpositive(t) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !0,
      message: _.toString(t),
    });
  }
  nonnegative(t) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !0,
      message: _.toString(t),
    });
  }
  multipleOf(t, n) {
    return this._addCheck({
      kind: "multipleOf",
      value: t,
      message: _.toString(n),
    });
  }
  finite(t) {
    return this._addCheck({ kind: "finite", message: _.toString(t) });
  }
  safe(t) {
    return this._addCheck({
      kind: "min",
      inclusive: !0,
      value: Number.MIN_SAFE_INTEGER,
      message: _.toString(t),
    })._addCheck({
      kind: "max",
      inclusive: !0,
      value: Number.MAX_SAFE_INTEGER,
      message: _.toString(t),
    });
  }
  get minValue() {
    let t = null;
    for (const n of this._def.checks)
      n.kind === "min" && (t === null || n.value > t) && (t = n.value);
    return t;
  }
  get maxValue() {
    let t = null;
    for (const n of this._def.checks)
      n.kind === "max" && (t === null || n.value < t) && (t = n.value);
    return t;
  }
  get isInt() {
    return !!this._def.checks.find(
      (t) =>
        t.kind === "int" || (t.kind === "multipleOf" && A.isInteger(t.value))
    );
  }
  get isFinite() {
    let t = null,
      n = null;
    for (const r of this._def.checks) {
      if (r.kind === "finite" || r.kind === "int" || r.kind === "multipleOf")
        return !0;
      r.kind === "min"
        ? (n === null || r.value > n) && (n = r.value)
        : r.kind === "max" && (t === null || r.value < t) && (t = r.value);
    }
    return Number.isFinite(n) && Number.isFinite(t);
  }
}
q.create = (e) =>
  new q({
    checks: [],
    typeName: v.ZodNumber,
    coerce: e?.coerce || !1,
    ...b(e),
  });
class W extends R {
  constructor() {
    super(...arguments), (this.min = this.gte), (this.max = this.lte);
  }
  _parse(t) {
    if (
      (this._def.coerce && (t.data = BigInt(t.data)),
      this._getType(t) !== h.bigint)
    ) {
      const i = this._getOrReturnCtx(t);
      return (
        m(i, {
          code: f.invalid_type,
          expected: h.bigint,
          received: i.parsedType,
        }),
        T
      );
    }
    let r;
    const s = new Y();
    for (const i of this._def.checks)
      i.kind === "min"
        ? (i.inclusive ? t.data < i.value : t.data <= i.value) &&
          ((r = this._getOrReturnCtx(t, r)),
          m(r, {
            code: f.too_small,
            type: "bigint",
            minimum: i.value,
            inclusive: i.inclusive,
            message: i.message,
          }),
          s.dirty())
        : i.kind === "max"
        ? (i.inclusive ? t.data > i.value : t.data >= i.value) &&
          ((r = this._getOrReturnCtx(t, r)),
          m(r, {
            code: f.too_big,
            type: "bigint",
            maximum: i.value,
            inclusive: i.inclusive,
            message: i.message,
          }),
          s.dirty())
        : i.kind === "multipleOf"
        ? t.data % i.value !== BigInt(0) &&
          ((r = this._getOrReturnCtx(t, r)),
          m(r, {
            code: f.not_multiple_of,
            multipleOf: i.value,
            message: i.message,
          }),
          s.dirty())
        : A.assertNever(i);
    return { status: s.value, value: t.data };
  }
  gte(t, n) {
    return this.setLimit("min", t, !0, _.toString(n));
  }
  gt(t, n) {
    return this.setLimit("min", t, !1, _.toString(n));
  }
  lte(t, n) {
    return this.setLimit("max", t, !0, _.toString(n));
  }
  lt(t, n) {
    return this.setLimit("max", t, !1, _.toString(n));
  }
  setLimit(t, n, r, s) {
    return new W({
      ...this._def,
      checks: [
        ...this._def.checks,
        { kind: t, value: n, inclusive: r, message: _.toString(s) },
      ],
    });
  }
  _addCheck(t) {
    return new W({ ...this._def, checks: [...this._def.checks, t] });
  }
  positive(t) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !1,
      message: _.toString(t),
    });
  }
  negative(t) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !1,
      message: _.toString(t),
    });
  }
  nonpositive(t) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !0,
      message: _.toString(t),
    });
  }
  nonnegative(t) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !0,
      message: _.toString(t),
    });
  }
  multipleOf(t, n) {
    return this._addCheck({
      kind: "multipleOf",
      value: t,
      message: _.toString(n),
    });
  }
  get minValue() {
    let t = null;
    for (const n of this._def.checks)
      n.kind === "min" && (t === null || n.value > t) && (t = n.value);
    return t;
  }
  get maxValue() {
    let t = null;
    for (const n of this._def.checks)
      n.kind === "max" && (t === null || n.value < t) && (t = n.value);
    return t;
  }
}
W.create = (e) => {
  var t;
  return new W({
    checks: [],
    typeName: v.ZodBigInt,
    coerce: (t = e?.coerce) !== null && t !== void 0 ? t : !1,
    ...b(e),
  });
};
class fe extends R {
  _parse(t) {
    if (
      (this._def.coerce && (t.data = !!t.data), this._getType(t) !== h.boolean)
    ) {
      const r = this._getOrReturnCtx(t);
      return (
        m(r, {
          code: f.invalid_type,
          expected: h.boolean,
          received: r.parsedType,
        }),
        T
      );
    }
    return C(t.data);
  }
}
fe.create = (e) =>
  new fe({ typeName: v.ZodBoolean, coerce: e?.coerce || !1, ...b(e) });
class X extends R {
  _parse(t) {
    if (
      (this._def.coerce && (t.data = new Date(t.data)),
      this._getType(t) !== h.date)
    ) {
      const i = this._getOrReturnCtx(t);
      return (
        m(i, {
          code: f.invalid_type,
          expected: h.date,
          received: i.parsedType,
        }),
        T
      );
    }
    if (isNaN(t.data.getTime())) {
      const i = this._getOrReturnCtx(t);
      return m(i, { code: f.invalid_date }), T;
    }
    const r = new Y();
    let s;
    for (const i of this._def.checks)
      i.kind === "min"
        ? t.data.getTime() < i.value &&
          ((s = this._getOrReturnCtx(t, s)),
          m(s, {
            code: f.too_small,
            message: i.message,
            inclusive: !0,
            exact: !1,
            minimum: i.value,
            type: "date",
          }),
          r.dirty())
        : i.kind === "max"
        ? t.data.getTime() > i.value &&
          ((s = this._getOrReturnCtx(t, s)),
          m(s, {
            code: f.too_big,
            message: i.message,
            inclusive: !0,
            exact: !1,
            maximum: i.value,
            type: "date",
          }),
          r.dirty())
        : A.assertNever(i);
    return { status: r.value, value: new Date(t.data.getTime()) };
  }
  _addCheck(t) {
    return new X({ ...this._def, checks: [...this._def.checks, t] });
  }
  min(t, n) {
    return this._addCheck({
      kind: "min",
      value: t.getTime(),
      message: _.toString(n),
    });
  }
  max(t, n) {
    return this._addCheck({
      kind: "max",
      value: t.getTime(),
      message: _.toString(n),
    });
  }
  get minDate() {
    let t = null;
    for (const n of this._def.checks)
      n.kind === "min" && (t === null || n.value > t) && (t = n.value);
    return t != null ? new Date(t) : null;
  }
  get maxDate() {
    let t = null;
    for (const n of this._def.checks)
      n.kind === "max" && (t === null || n.value < t) && (t = n.value);
    return t != null ? new Date(t) : null;
  }
}
X.create = (e) =>
  new X({ checks: [], coerce: e?.coerce || !1, typeName: v.ZodDate, ...b(e) });
class Oe extends R {
  _parse(t) {
    if (this._getType(t) !== h.symbol) {
      const r = this._getOrReturnCtx(t);
      return (
        m(r, {
          code: f.invalid_type,
          expected: h.symbol,
          received: r.parsedType,
        }),
        T
      );
    }
    return C(t.data);
  }
}
Oe.create = (e) => new Oe({ typeName: v.ZodSymbol, ...b(e) });
class he extends R {
  _parse(t) {
    if (this._getType(t) !== h.undefined) {
      const r = this._getOrReturnCtx(t);
      return (
        m(r, {
          code: f.invalid_type,
          expected: h.undefined,
          received: r.parsedType,
        }),
        T
      );
    }
    return C(t.data);
  }
}
he.create = (e) => new he({ typeName: v.ZodUndefined, ...b(e) });
class me extends R {
  _parse(t) {
    if (this._getType(t) !== h.null) {
      const r = this._getOrReturnCtx(t);
      return (
        m(r, {
          code: f.invalid_type,
          expected: h.null,
          received: r.parsedType,
        }),
        T
      );
    }
    return C(t.data);
  }
}
me.create = (e) => new me({ typeName: v.ZodNull, ...b(e) });
class se extends R {
  constructor() {
    super(...arguments), (this._any = !0);
  }
  _parse(t) {
    return C(t.data);
  }
}
se.create = (e) => new se({ typeName: v.ZodAny, ...b(e) });
class J extends R {
  constructor() {
    super(...arguments), (this._unknown = !0);
  }
  _parse(t) {
    return C(t.data);
  }
}
J.create = (e) => new J({ typeName: v.ZodUnknown, ...b(e) });
class F extends R {
  _parse(t) {
    const n = this._getOrReturnCtx(t);
    return (
      m(n, { code: f.invalid_type, expected: h.never, received: n.parsedType }),
      T
    );
  }
}
F.create = (e) => new F({ typeName: v.ZodNever, ...b(e) });
class Be extends R {
  _parse(t) {
    if (this._getType(t) !== h.undefined) {
      const r = this._getOrReturnCtx(t);
      return (
        m(r, {
          code: f.invalid_type,
          expected: h.void,
          received: r.parsedType,
        }),
        T
      );
    }
    return C(t.data);
  }
}
Be.create = (e) => new Be({ typeName: v.ZodVoid, ...b(e) });
class $ extends R {
  _parse(t) {
    const { ctx: n, status: r } = this._processInputParams(t),
      s = this._def;
    if (n.parsedType !== h.array)
      return (
        m(n, {
          code: f.invalid_type,
          expected: h.array,
          received: n.parsedType,
        }),
        T
      );
    if (s.exactLength !== null) {
      const a = n.data.length > s.exactLength.value,
        o = n.data.length < s.exactLength.value;
      (a || o) &&
        (m(n, {
          code: a ? f.too_big : f.too_small,
          minimum: o ? s.exactLength.value : void 0,
          maximum: a ? s.exactLength.value : void 0,
          type: "array",
          inclusive: !0,
          exact: !0,
          message: s.exactLength.message,
        }),
        r.dirty());
    }
    if (
      (s.minLength !== null &&
        n.data.length < s.minLength.value &&
        (m(n, {
          code: f.too_small,
          minimum: s.minLength.value,
          type: "array",
          inclusive: !0,
          exact: !1,
          message: s.minLength.message,
        }),
        r.dirty()),
      s.maxLength !== null &&
        n.data.length > s.maxLength.value &&
        (m(n, {
          code: f.too_big,
          maximum: s.maxLength.value,
          type: "array",
          inclusive: !0,
          exact: !1,
          message: s.maxLength.message,
        }),
        r.dirty()),
      n.common.async)
    )
      return Promise.all(
        [...n.data].map((a, o) => s.type._parseAsync(new Z(n, a, n.path, o)))
      ).then((a) => Y.mergeArray(r, a));
    const i = [...n.data].map((a, o) =>
      s.type._parseSync(new Z(n, a, n.path, o))
    );
    return Y.mergeArray(r, i);
  }
  get element() {
    return this._def.type;
  }
  min(t, n) {
    return new $({
      ...this._def,
      minLength: { value: t, message: _.toString(n) },
    });
  }
  max(t, n) {
    return new $({
      ...this._def,
      maxLength: { value: t, message: _.toString(n) },
    });
  }
  length(t, n) {
    return new $({
      ...this._def,
      exactLength: { value: t, message: _.toString(n) },
    });
  }
  nonempty(t) {
    return this.min(1, t);
  }
}
$.create = (e, t) =>
  new $({
    type: e,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: v.ZodArray,
    ...b(t),
  });
function ne(e) {
  if (e instanceof N) {
    const t = {};
    for (const n in e.shape) {
      const r = e.shape[n];
      t[n] = D.create(ne(r));
    }
    return new N({ ...e._def, shape: () => t });
  } else
    return e instanceof $
      ? new $({ ...e._def, type: ne(e.element) })
      : e instanceof D
      ? D.create(ne(e.unwrap()))
      : e instanceof K
      ? K.create(ne(e.unwrap()))
      : e instanceof P
      ? P.create(e.items.map((t) => ne(t)))
      : e;
}
class N extends R {
  constructor() {
    super(...arguments),
      (this._cached = null),
      (this.nonstrict = this.passthrough),
      (this.augment = this.extend);
  }
  _getCached() {
    if (this._cached !== null) return this._cached;
    const t = this._def.shape(),
      n = A.objectKeys(t);
    return (this._cached = { shape: t, keys: n });
  }
  _parse(t) {
    if (this._getType(t) !== h.object) {
      const c = this._getOrReturnCtx(t);
      return (
        m(c, {
          code: f.invalid_type,
          expected: h.object,
          received: c.parsedType,
        }),
        T
      );
    }
    const { status: r, ctx: s } = this._processInputParams(t),
      { shape: i, keys: a } = this._getCached(),
      o = [];
    if (!(this._def.catchall instanceof F && this._def.unknownKeys === "strip"))
      for (const c in s.data) a.includes(c) || o.push(c);
    const l = [];
    for (const c of a) {
      const u = i[c],
        d = s.data[c];
      l.push({
        key: { status: "valid", value: c },
        value: u._parse(new Z(s, d, s.path, c)),
        alwaysSet: c in s.data,
      });
    }
    if (this._def.catchall instanceof F) {
      const c = this._def.unknownKeys;
      if (c === "passthrough")
        for (const u of o)
          l.push({
            key: { status: "valid", value: u },
            value: { status: "valid", value: s.data[u] },
          });
      else if (c === "strict")
        o.length > 0 &&
          (m(s, { code: f.unrecognized_keys, keys: o }), r.dirty());
      else if (c !== "strip")
        throw new Error("Internal ZodObject error: invalid unknownKeys value.");
    } else {
      const c = this._def.catchall;
      for (const u of o) {
        const d = s.data[u];
        l.push({
          key: { status: "valid", value: u },
          value: c._parse(new Z(s, d, s.path, u)),
          alwaysSet: u in s.data,
        });
      }
    }
    return s.common.async
      ? Promise.resolve()
          .then(async () => {
            const c = [];
            for (const u of l) {
              const d = await u.key;
              c.push({ key: d, value: await u.value, alwaysSet: u.alwaysSet });
            }
            return c;
          })
          .then((c) => Y.mergeObjectSync(r, c))
      : Y.mergeObjectSync(r, l);
  }
  get shape() {
    return this._def.shape();
  }
  strict(t) {
    return (
      _.errToObj,
      new N({
        ...this._def,
        unknownKeys: "strict",
        ...(t !== void 0
          ? {
              errorMap: (n, r) => {
                var s, i, a, o;
                const l =
                  (a =
                    (i = (s = this._def).errorMap) === null || i === void 0
                      ? void 0
                      : i.call(s, n, r).message) !== null && a !== void 0
                    ? a
                    : r.defaultError;
                return n.code === "unrecognized_keys"
                  ? {
                      message:
                        (o = _.errToObj(t).message) !== null && o !== void 0
                          ? o
                          : l,
                    }
                  : { message: l };
              },
            }
          : {}),
      })
    );
  }
  strip() {
    return new N({ ...this._def, unknownKeys: "strip" });
  }
  passthrough() {
    return new N({ ...this._def, unknownKeys: "passthrough" });
  }
  extend(t) {
    return new N({
      ...this._def,
      shape: () => ({ ...this._def.shape(), ...t }),
    });
  }
  merge(t) {
    return new N({
      unknownKeys: t._def.unknownKeys,
      catchall: t._def.catchall,
      shape: () => ({ ...this._def.shape(), ...t._def.shape() }),
      typeName: v.ZodObject,
    });
  }
  setKey(t, n) {
    return this.augment({ [t]: n });
  }
  catchall(t) {
    return new N({ ...this._def, catchall: t });
  }
  pick(t) {
    const n = {};
    return (
      A.objectKeys(t).forEach((r) => {
        t[r] && this.shape[r] && (n[r] = this.shape[r]);
      }),
      new N({ ...this._def, shape: () => n })
    );
  }
  omit(t) {
    const n = {};
    return (
      A.objectKeys(this.shape).forEach((r) => {
        t[r] || (n[r] = this.shape[r]);
      }),
      new N({ ...this._def, shape: () => n })
    );
  }
  deepPartial() {
    return ne(this);
  }
  partial(t) {
    const n = {};
    return (
      A.objectKeys(this.shape).forEach((r) => {
        const s = this.shape[r];
        t && !t[r] ? (n[r] = s) : (n[r] = s.optional());
      }),
      new N({ ...this._def, shape: () => n })
    );
  }
  required(t) {
    const n = {};
    return (
      A.objectKeys(this.shape).forEach((r) => {
        if (t && !t[r]) n[r] = this.shape[r];
        else {
          let i = this.shape[r];
          for (; i instanceof D; ) i = i._def.innerType;
          n[r] = i;
        }
      }),
      new N({ ...this._def, shape: () => n })
    );
  }
  keyof() {
    return yt(A.objectKeys(this.shape));
  }
}
N.create = (e, t) =>
  new N({
    shape: () => e,
    unknownKeys: "strip",
    catchall: F.create(),
    typeName: v.ZodObject,
    ...b(t),
  });
N.strictCreate = (e, t) =>
  new N({
    shape: () => e,
    unknownKeys: "strict",
    catchall: F.create(),
    typeName: v.ZodObject,
    ...b(t),
  });
N.lazycreate = (e, t) =>
  new N({
    shape: e,
    unknownKeys: "strip",
    catchall: F.create(),
    typeName: v.ZodObject,
    ...b(t),
  });
class pe extends R {
  _parse(t) {
    const { ctx: n } = this._processInputParams(t),
      r = this._def.options;
    function s(i) {
      for (const o of i) if (o.result.status === "valid") return o.result;
      for (const o of i)
        if (o.result.status === "dirty")
          return n.common.issues.push(...o.ctx.common.issues), o.result;
      const a = i.map((o) => new k(o.ctx.common.issues));
      return m(n, { code: f.invalid_union, unionErrors: a }), T;
    }
    if (n.common.async)
      return Promise.all(
        r.map(async (i) => {
          const a = { ...n, common: { ...n.common, issues: [] }, parent: null };
          return {
            result: await i._parseAsync({
              data: n.data,
              path: n.path,
              parent: a,
            }),
            ctx: a,
          };
        })
      ).then(s);
    {
      let i;
      const a = [];
      for (const l of r) {
        const c = { ...n, common: { ...n.common, issues: [] }, parent: null },
          u = l._parseSync({ data: n.data, path: n.path, parent: c });
        if (u.status === "valid") return u;
        u.status === "dirty" && !i && (i = { result: u, ctx: c }),
          c.common.issues.length && a.push(c.common.issues);
      }
      if (i) return n.common.issues.push(...i.ctx.common.issues), i.result;
      const o = a.map((l) => new k(l));
      return m(n, { code: f.invalid_union, unionErrors: o }), T;
    }
  }
  get options() {
    return this._def.options;
  }
}
pe.create = (e, t) => new pe({ options: e, typeName: v.ZodUnion, ...b(t) });
const xe = (e) =>
  e instanceof ge
    ? xe(e.schema)
    : e instanceof j
    ? xe(e.innerType())
    : e instanceof ve
    ? [e.value]
    : e instanceof H
    ? e.options
    : e instanceof Te
    ? Object.keys(e.enum)
    : e instanceof be
    ? xe(e._def.innerType)
    : e instanceof he
    ? [void 0]
    : e instanceof me
    ? [null]
    : null;
class Me extends R {
  _parse(t) {
    const { ctx: n } = this._processInputParams(t);
    if (n.parsedType !== h.object)
      return (
        m(n, {
          code: f.invalid_type,
          expected: h.object,
          received: n.parsedType,
        }),
        T
      );
    const r = this.discriminator,
      s = n.data[r],
      i = this.optionsMap.get(s);
    return i
      ? n.common.async
        ? i._parseAsync({ data: n.data, path: n.path, parent: n })
        : i._parseSync({ data: n.data, path: n.path, parent: n })
      : (m(n, {
          code: f.invalid_union_discriminator,
          options: Array.from(this.optionsMap.keys()),
          path: [r],
        }),
        T);
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  static create(t, n, r) {
    const s = new Map();
    for (const i of n) {
      const a = xe(i.shape[t]);
      if (!a)
        throw new Error(
          `A discriminator value for key \`${t}\` could not be extracted from all schema options`
        );
      for (const o of a) {
        if (s.has(o))
          throw new Error(
            `Discriminator property ${String(t)} has duplicate value ${String(
              o
            )}`
          );
        s.set(o, i);
      }
    }
    return new Me({
      typeName: v.ZodDiscriminatedUnion,
      discriminator: t,
      options: n,
      optionsMap: s,
      ...b(r),
    });
  }
}
function Ge(e, t) {
  const n = V(e),
    r = V(t);
  if (e === t) return { valid: !0, data: e };
  if (n === h.object && r === h.object) {
    const s = A.objectKeys(t),
      i = A.objectKeys(e).filter((o) => s.indexOf(o) !== -1),
      a = { ...e, ...t };
    for (const o of i) {
      const l = Ge(e[o], t[o]);
      if (!l.valid) return { valid: !1 };
      a[o] = l.data;
    }
    return { valid: !0, data: a };
  } else if (n === h.array && r === h.array) {
    if (e.length !== t.length) return { valid: !1 };
    const s = [];
    for (let i = 0; i < e.length; i++) {
      const a = e[i],
        o = t[i],
        l = Ge(a, o);
      if (!l.valid) return { valid: !1 };
      s.push(l.data);
    }
    return { valid: !0, data: s };
  } else
    return n === h.date && r === h.date && +e == +t
      ? { valid: !0, data: e }
      : { valid: !1 };
}
class ye extends R {
  _parse(t) {
    const { status: n, ctx: r } = this._processInputParams(t),
      s = (i, a) => {
        if (We(i) || We(a)) return T;
        const o = Ge(i.value, a.value);
        return o.valid
          ? ((He(i) || He(a)) && n.dirty(), { status: n.value, value: o.data })
          : (m(r, { code: f.invalid_intersection_types }), T);
      };
    return r.common.async
      ? Promise.all([
          this._def.left._parseAsync({ data: r.data, path: r.path, parent: r }),
          this._def.right._parseAsync({
            data: r.data,
            path: r.path,
            parent: r,
          }),
        ]).then(([i, a]) => s(i, a))
      : s(
          this._def.left._parseSync({ data: r.data, path: r.path, parent: r }),
          this._def.right._parseSync({ data: r.data, path: r.path, parent: r })
        );
  }
}
ye.create = (e, t, n) =>
  new ye({ left: e, right: t, typeName: v.ZodIntersection, ...b(n) });
class P extends R {
  _parse(t) {
    const { status: n, ctx: r } = this._processInputParams(t);
    if (r.parsedType !== h.array)
      return (
        m(r, {
          code: f.invalid_type,
          expected: h.array,
          received: r.parsedType,
        }),
        T
      );
    if (r.data.length < this._def.items.length)
      return (
        m(r, {
          code: f.too_small,
          minimum: this._def.items.length,
          inclusive: !0,
          exact: !1,
          type: "array",
        }),
        T
      );
    !this._def.rest &&
      r.data.length > this._def.items.length &&
      (m(r, {
        code: f.too_big,
        maximum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array",
      }),
      n.dirty());
    const i = [...r.data]
      .map((a, o) => {
        const l = this._def.items[o] || this._def.rest;
        return l ? l._parse(new Z(r, a, r.path, o)) : null;
      })
      .filter((a) => !!a);
    return r.common.async
      ? Promise.all(i).then((a) => Y.mergeArray(n, a))
      : Y.mergeArray(n, i);
  }
  get items() {
    return this._def.items;
  }
  rest(t) {
    return new P({ ...this._def, rest: t });
  }
}
P.create = (e, t) => {
  if (!Array.isArray(e))
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  return new P({ items: e, typeName: v.ZodTuple, rest: null, ...b(t) });
};
class _e extends R {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(t) {
    const { status: n, ctx: r } = this._processInputParams(t);
    if (r.parsedType !== h.object)
      return (
        m(r, {
          code: f.invalid_type,
          expected: h.object,
          received: r.parsedType,
        }),
        T
      );
    const s = [],
      i = this._def.keyType,
      a = this._def.valueType;
    for (const o in r.data)
      s.push({
        key: i._parse(new Z(r, o, r.path, o)),
        value: a._parse(new Z(r, r.data[o], r.path, o)),
      });
    return r.common.async ? Y.mergeObjectAsync(n, s) : Y.mergeObjectSync(n, s);
  }
  get element() {
    return this._def.valueType;
  }
  static create(t, n, r) {
    return n instanceof R
      ? new _e({ keyType: t, valueType: n, typeName: v.ZodRecord, ...b(r) })
      : new _e({
          keyType: U.create(),
          valueType: t,
          typeName: v.ZodRecord,
          ...b(n),
        });
  }
}
class Ue extends R {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(t) {
    const { status: n, ctx: r } = this._processInputParams(t);
    if (r.parsedType !== h.map)
      return (
        m(r, { code: f.invalid_type, expected: h.map, received: r.parsedType }),
        T
      );
    const s = this._def.keyType,
      i = this._def.valueType,
      a = [...r.data.entries()].map(([o, l], c) => ({
        key: s._parse(new Z(r, o, r.path, [c, "key"])),
        value: i._parse(new Z(r, l, r.path, [c, "value"])),
      }));
    if (r.common.async) {
      const o = new Map();
      return Promise.resolve().then(async () => {
        for (const l of a) {
          const c = await l.key,
            u = await l.value;
          if (c.status === "aborted" || u.status === "aborted") return T;
          (c.status === "dirty" || u.status === "dirty") && n.dirty(),
            o.set(c.value, u.value);
        }
        return { status: n.value, value: o };
      });
    } else {
      const o = new Map();
      for (const l of a) {
        const c = l.key,
          u = l.value;
        if (c.status === "aborted" || u.status === "aborted") return T;
        (c.status === "dirty" || u.status === "dirty") && n.dirty(),
          o.set(c.value, u.value);
      }
      return { status: n.value, value: o };
    }
  }
}
Ue.create = (e, t, n) =>
  new Ue({ valueType: t, keyType: e, typeName: v.ZodMap, ...b(n) });
class Q extends R {
  _parse(t) {
    const { status: n, ctx: r } = this._processInputParams(t);
    if (r.parsedType !== h.set)
      return (
        m(r, { code: f.invalid_type, expected: h.set, received: r.parsedType }),
        T
      );
    const s = this._def;
    s.minSize !== null &&
      r.data.size < s.minSize.value &&
      (m(r, {
        code: f.too_small,
        minimum: s.minSize.value,
        type: "set",
        inclusive: !0,
        exact: !1,
        message: s.minSize.message,
      }),
      n.dirty()),
      s.maxSize !== null &&
        r.data.size > s.maxSize.value &&
        (m(r, {
          code: f.too_big,
          maximum: s.maxSize.value,
          type: "set",
          inclusive: !0,
          exact: !1,
          message: s.maxSize.message,
        }),
        n.dirty());
    const i = this._def.valueType;
    function a(l) {
      const c = new Set();
      for (const u of l) {
        if (u.status === "aborted") return T;
        u.status === "dirty" && n.dirty(), c.add(u.value);
      }
      return { status: n.value, value: c };
    }
    const o = [...r.data.values()].map((l, c) =>
      i._parse(new Z(r, l, r.path, c))
    );
    return r.common.async ? Promise.all(o).then((l) => a(l)) : a(o);
  }
  min(t, n) {
    return new Q({
      ...this._def,
      minSize: { value: t, message: _.toString(n) },
    });
  }
  max(t, n) {
    return new Q({
      ...this._def,
      maxSize: { value: t, message: _.toString(n) },
    });
  }
  size(t, n) {
    return this.min(t, n).max(t, n);
  }
  nonempty(t) {
    return this.min(1, t);
  }
}
Q.create = (e, t) =>
  new Q({
    valueType: e,
    minSize: null,
    maxSize: null,
    typeName: v.ZodSet,
    ...b(t),
  });
class re extends R {
  constructor() {
    super(...arguments), (this.validate = this.implement);
  }
  _parse(t) {
    const { ctx: n } = this._processInputParams(t);
    if (n.parsedType !== h.function)
      return (
        m(n, {
          code: f.invalid_type,
          expected: h.function,
          received: n.parsedType,
        }),
        T
      );
    function r(o, l) {
      return Ce({
        data: o,
        path: n.path,
        errorMaps: [
          n.common.contextualErrorMap,
          n.schemaErrorMap,
          Ye(),
          le,
        ].filter((c) => !!c),
        issueData: { code: f.invalid_arguments, argumentsError: l },
      });
    }
    function s(o, l) {
      return Ce({
        data: o,
        path: n.path,
        errorMaps: [
          n.common.contextualErrorMap,
          n.schemaErrorMap,
          Ye(),
          le,
        ].filter((c) => !!c),
        issueData: { code: f.invalid_return_type, returnTypeError: l },
      });
    }
    const i = { errorMap: n.common.contextualErrorMap },
      a = n.data;
    if (this._def.returns instanceof ie) {
      const o = this;
      return C(async function (...l) {
        const c = new k([]),
          u = await o._def.args.parseAsync(l, i).catch((I) => {
            throw (c.addIssue(r(l, I)), c);
          }),
          d = await Reflect.apply(a, this, u);
        return await o._def.returns._def.type.parseAsync(d, i).catch((I) => {
          throw (c.addIssue(s(d, I)), c);
        });
      });
    } else {
      const o = this;
      return C(function (...l) {
        const c = o._def.args.safeParse(l, i);
        if (!c.success) throw new k([r(l, c.error)]);
        const u = Reflect.apply(a, this, c.data),
          d = o._def.returns.safeParse(u, i);
        if (!d.success) throw new k([s(u, d.error)]);
        return d.data;
      });
    }
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...t) {
    return new re({ ...this._def, args: P.create(t).rest(J.create()) });
  }
  returns(t) {
    return new re({ ...this._def, returns: t });
  }
  implement(t) {
    return this.parse(t);
  }
  strictImplement(t) {
    return this.parse(t);
  }
  static create(t, n, r) {
    return new re({
      args: t || P.create([]).rest(J.create()),
      returns: n || J.create(),
      typeName: v.ZodFunction,
      ...b(r),
    });
  }
}
class ge extends R {
  get schema() {
    return this._def.getter();
  }
  _parse(t) {
    const { ctx: n } = this._processInputParams(t);
    return this._def.getter()._parse({ data: n.data, path: n.path, parent: n });
  }
}
ge.create = (e, t) => new ge({ getter: e, typeName: v.ZodLazy, ...b(t) });
class ve extends R {
  _parse(t) {
    if (t.data !== this._def.value) {
      const n = this._getOrReturnCtx(t);
      return (
        m(n, {
          received: n.data,
          code: f.invalid_literal,
          expected: this._def.value,
        }),
        T
      );
    }
    return { status: "valid", value: t.data };
  }
  get value() {
    return this._def.value;
  }
}
ve.create = (e, t) => new ve({ value: e, typeName: v.ZodLiteral, ...b(t) });
function yt(e, t) {
  return new H({ values: e, typeName: v.ZodEnum, ...b(t) });
}
class H extends R {
  _parse(t) {
    if (typeof t.data != "string") {
      const n = this._getOrReturnCtx(t),
        r = this._def.values;
      return (
        m(n, {
          expected: A.joinValues(r),
          received: n.parsedType,
          code: f.invalid_type,
        }),
        T
      );
    }
    if (this._def.values.indexOf(t.data) === -1) {
      const n = this._getOrReturnCtx(t),
        r = this._def.values;
      return (
        m(n, { received: n.data, code: f.invalid_enum_value, options: r }), T
      );
    }
    return C(t.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const t = {};
    for (const n of this._def.values) t[n] = n;
    return t;
  }
  get Values() {
    const t = {};
    for (const n of this._def.values) t[n] = n;
    return t;
  }
  get Enum() {
    const t = {};
    for (const n of this._def.values) t[n] = n;
    return t;
  }
  extract(t) {
    return H.create(t);
  }
  exclude(t) {
    return H.create(this.options.filter((n) => !t.includes(n)));
  }
}
H.create = yt;
class Te extends R {
  _parse(t) {
    const n = A.getValidEnumValues(this._def.values),
      r = this._getOrReturnCtx(t);
    if (r.parsedType !== h.string && r.parsedType !== h.number) {
      const s = A.objectValues(n);
      return (
        m(r, {
          expected: A.joinValues(s),
          received: r.parsedType,
          code: f.invalid_type,
        }),
        T
      );
    }
    if (n.indexOf(t.data) === -1) {
      const s = A.objectValues(n);
      return (
        m(r, { received: r.data, code: f.invalid_enum_value, options: s }), T
      );
    }
    return C(t.data);
  }
  get enum() {
    return this._def.values;
  }
}
Te.create = (e, t) => new Te({ values: e, typeName: v.ZodNativeEnum, ...b(t) });
class ie extends R {
  unwrap() {
    return this._def.type;
  }
  _parse(t) {
    const { ctx: n } = this._processInputParams(t);
    if (n.parsedType !== h.promise && n.common.async === !1)
      return (
        m(n, {
          code: f.invalid_type,
          expected: h.promise,
          received: n.parsedType,
        }),
        T
      );
    const r = n.parsedType === h.promise ? n.data : Promise.resolve(n.data);
    return C(
      r.then((s) =>
        this._def.type.parseAsync(s, {
          path: n.path,
          errorMap: n.common.contextualErrorMap,
        })
      )
    );
  }
}
ie.create = (e, t) => new ie({ type: e, typeName: v.ZodPromise, ...b(t) });
class j extends R {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === v.ZodEffects
      ? this._def.schema.sourceType()
      : this._def.schema;
  }
  _parse(t) {
    const { status: n, ctx: r } = this._processInputParams(t),
      s = this._def.effect || null,
      i = {
        addIssue: (a) => {
          m(r, a), a.fatal ? n.abort() : n.dirty();
        },
        get path() {
          return r.path;
        },
      };
    if (((i.addIssue = i.addIssue.bind(i)), s.type === "preprocess")) {
      const a = s.transform(r.data, i);
      return r.common.issues.length
        ? { status: "dirty", value: r.data }
        : r.common.async
        ? Promise.resolve(a).then((o) =>
            this._def.schema._parseAsync({ data: o, path: r.path, parent: r })
          )
        : this._def.schema._parseSync({ data: a, path: r.path, parent: r });
    }
    if (s.type === "refinement") {
      const a = (o) => {
        const l = s.refinement(o, i);
        if (r.common.async) return Promise.resolve(l);
        if (l instanceof Promise)
          throw new Error(
            "Async refinement encountered during synchronous parse operation. Use .parseAsync instead."
          );
        return o;
      };
      if (r.common.async === !1) {
        const o = this._def.schema._parseSync({
          data: r.data,
          path: r.path,
          parent: r,
        });
        return o.status === "aborted"
          ? T
          : (o.status === "dirty" && n.dirty(),
            a(o.value),
            { status: n.value, value: o.value });
      } else
        return this._def.schema
          ._parseAsync({ data: r.data, path: r.path, parent: r })
          .then((o) =>
            o.status === "aborted"
              ? T
              : (o.status === "dirty" && n.dirty(),
                a(o.value).then(() => ({ status: n.value, value: o.value })))
          );
    }
    if (s.type === "transform")
      if (r.common.async === !1) {
        const a = this._def.schema._parseSync({
          data: r.data,
          path: r.path,
          parent: r,
        });
        if (!de(a)) return a;
        const o = s.transform(a.value, i);
        if (o instanceof Promise)
          throw new Error(
            "Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead."
          );
        return { status: n.value, value: o };
      } else
        return this._def.schema
          ._parseAsync({ data: r.data, path: r.path, parent: r })
          .then((a) =>
            de(a)
              ? Promise.resolve(s.transform(a.value, i)).then((o) => ({
                  status: n.value,
                  value: o,
                }))
              : a
          );
    A.assertNever(s);
  }
}
j.create = (e, t, n) =>
  new j({ schema: e, typeName: v.ZodEffects, effect: t, ...b(n) });
j.createWithPreprocess = (e, t, n) =>
  new j({
    schema: t,
    effect: { type: "preprocess", transform: e },
    typeName: v.ZodEffects,
    ...b(n),
  });
class D extends R {
  _parse(t) {
    return this._getType(t) === h.undefined
      ? C(void 0)
      : this._def.innerType._parse(t);
  }
  unwrap() {
    return this._def.innerType;
  }
}
D.create = (e, t) => new D({ innerType: e, typeName: v.ZodOptional, ...b(t) });
class K extends R {
  _parse(t) {
    return this._getType(t) === h.null
      ? C(null)
      : this._def.innerType._parse(t);
  }
  unwrap() {
    return this._def.innerType;
  }
}
K.create = (e, t) => new K({ innerType: e, typeName: v.ZodNullable, ...b(t) });
class be extends R {
  _parse(t) {
    const { ctx: n } = this._processInputParams(t);
    let r = n.data;
    return (
      n.parsedType === h.undefined && (r = this._def.defaultValue()),
      this._def.innerType._parse({ data: r, path: n.path, parent: n })
    );
  }
  removeDefault() {
    return this._def.innerType;
  }
}
be.create = (e, t) =>
  new be({
    innerType: e,
    typeName: v.ZodDefault,
    defaultValue: typeof t.default == "function" ? t.default : () => t.default,
    ...b(t),
  });
class $e extends R {
  _parse(t) {
    const { ctx: n } = this._processInputParams(t),
      r = { ...n, common: { ...n.common, issues: [] } },
      s = this._def.innerType._parse({
        data: r.data,
        path: r.path,
        parent: { ...r },
      });
    return ke(s)
      ? s.then((i) => ({
          status: "valid",
          value:
            i.status === "valid"
              ? i.value
              : this._def.catchValue({
                  get error() {
                    return new k(r.common.issues);
                  },
                  input: r.data,
                }),
        }))
      : {
          status: "valid",
          value:
            s.status === "valid"
              ? s.value
              : this._def.catchValue({
                  get error() {
                    return new k(r.common.issues);
                  },
                  input: r.data,
                }),
        };
  }
  removeCatch() {
    return this._def.innerType;
  }
}
$e.create = (e, t) =>
  new $e({
    innerType: e,
    typeName: v.ZodCatch,
    catchValue: typeof t.catch == "function" ? t.catch : () => t.catch,
    ...b(t),
  });
class je extends R {
  _parse(t) {
    if (this._getType(t) !== h.nan) {
      const r = this._getOrReturnCtx(t);
      return (
        m(r, { code: f.invalid_type, expected: h.nan, received: r.parsedType }),
        T
      );
    }
    return { status: "valid", value: t.data };
  }
}
je.create = (e) => new je({ typeName: v.ZodNaN, ...b(e) });
const hn = Symbol("zod_brand");
class _t extends R {
  _parse(t) {
    const { ctx: n } = this._processInputParams(t),
      r = n.data;
    return this._def.type._parse({ data: r, path: n.path, parent: n });
  }
  unwrap() {
    return this._def.type;
  }
}
class Ae extends R {
  _parse(t) {
    const { status: n, ctx: r } = this._processInputParams(t);
    if (r.common.async)
      return (async () => {
        const i = await this._def.in._parseAsync({
          data: r.data,
          path: r.path,
          parent: r,
        });
        return i.status === "aborted"
          ? T
          : i.status === "dirty"
          ? (n.dirty(), pt(i.value))
          : this._def.out._parseAsync({
              data: i.value,
              path: r.path,
              parent: r,
            });
      })();
    {
      const s = this._def.in._parseSync({
        data: r.data,
        path: r.path,
        parent: r,
      });
      return s.status === "aborted"
        ? T
        : s.status === "dirty"
        ? (n.dirty(), { status: "dirty", value: s.value })
        : this._def.out._parseSync({ data: s.value, path: r.path, parent: r });
    }
  }
  static create(t, n) {
    return new Ae({ in: t, out: n, typeName: v.ZodPipeline });
  }
}
class Ze extends R {
  _parse(t) {
    const n = this._def.innerType._parse(t);
    return de(n) && (n.value = Object.freeze(n.value)), n;
  }
}
Ze.create = (e, t) =>
  new Ze({ innerType: e, typeName: v.ZodReadonly, ...b(t) });
const gt = (e, t = {}, n) =>
    e
      ? se.create().superRefine((r, s) => {
          var i, a;
          if (!e(r)) {
            const o =
                typeof t == "function"
                  ? t(r)
                  : typeof t == "string"
                  ? { message: t }
                  : t,
              l =
                (a = (i = o.fatal) !== null && i !== void 0 ? i : n) !== null &&
                a !== void 0
                  ? a
                  : !0,
              c = typeof o == "string" ? { message: o } : o;
            s.addIssue({ code: "custom", ...c, fatal: l });
          }
        })
      : se.create(),
  mn = { object: N.lazycreate };
var v;
(function (e) {
  (e.ZodString = "ZodString"),
    (e.ZodNumber = "ZodNumber"),
    (e.ZodNaN = "ZodNaN"),
    (e.ZodBigInt = "ZodBigInt"),
    (e.ZodBoolean = "ZodBoolean"),
    (e.ZodDate = "ZodDate"),
    (e.ZodSymbol = "ZodSymbol"),
    (e.ZodUndefined = "ZodUndefined"),
    (e.ZodNull = "ZodNull"),
    (e.ZodAny = "ZodAny"),
    (e.ZodUnknown = "ZodUnknown"),
    (e.ZodNever = "ZodNever"),
    (e.ZodVoid = "ZodVoid"),
    (e.ZodArray = "ZodArray"),
    (e.ZodObject = "ZodObject"),
    (e.ZodUnion = "ZodUnion"),
    (e.ZodDiscriminatedUnion = "ZodDiscriminatedUnion"),
    (e.ZodIntersection = "ZodIntersection"),
    (e.ZodTuple = "ZodTuple"),
    (e.ZodRecord = "ZodRecord"),
    (e.ZodMap = "ZodMap"),
    (e.ZodSet = "ZodSet"),
    (e.ZodFunction = "ZodFunction"),
    (e.ZodLazy = "ZodLazy"),
    (e.ZodLiteral = "ZodLiteral"),
    (e.ZodEnum = "ZodEnum"),
    (e.ZodEffects = "ZodEffects"),
    (e.ZodNativeEnum = "ZodNativeEnum"),
    (e.ZodOptional = "ZodOptional"),
    (e.ZodNullable = "ZodNullable"),
    (e.ZodDefault = "ZodDefault"),
    (e.ZodCatch = "ZodCatch"),
    (e.ZodPromise = "ZodPromise"),
    (e.ZodBranded = "ZodBranded"),
    (e.ZodPipeline = "ZodPipeline"),
    (e.ZodReadonly = "ZodReadonly");
})(v || (v = {}));
const pn = (e, t = { message: `Input not instance of ${e.name}` }) =>
    gt((n) => n instanceof e, t),
  vt = U.create,
  Tt = q.create,
  yn = je.create,
  _n = W.create,
  bt = fe.create,
  gn = X.create,
  vn = Oe.create,
  Tn = he.create,
  bn = me.create,
  Rn = se.create,
  An = J.create,
  In = F.create,
  xn = Be.create,
  Nn = $.create,
  wn = N.create,
  Sn = N.strictCreate,
  En = pe.create,
  Yn = Me.create,
  Cn = ye.create,
  kn = P.create,
  On = _e.create,
  Bn = Ue.create,
  Un = Q.create,
  $n = re.create,
  jn = ge.create,
  Zn = ve.create,
  Pn = H.create,
  Mn = Te.create,
  zn = ie.create,
  ut = j.create,
  Dn = D.create,
  Fn = K.create,
  Ln = j.createWithPreprocess,
  Vn = Ae.create,
  qn = () => vt().optional(),
  Wn = () => Tt().optional(),
  Hn = () => bt().optional(),
  Gn = {
    string: (e) => U.create({ ...e, coerce: !0 }),
    number: (e) => q.create({ ...e, coerce: !0 }),
    boolean: (e) => fe.create({ ...e, coerce: !0 }),
    bigint: (e) => W.create({ ...e, coerce: !0 }),
    date: (e) => X.create({ ...e, coerce: !0 }),
  },
  Jn = T;
var p = Object.freeze({
  __proto__: null,
  defaultErrorMap: le,
  setErrorMap: Kt,
  getErrorMap: Ye,
  makeIssue: Ce,
  EMPTY_PATH: en,
  addIssueToContext: m,
  ParseStatus: Y,
  INVALID: T,
  DIRTY: pt,
  OK: C,
  isAborted: We,
  isDirty: He,
  isValid: de,
  isAsync: ke,
  get util() {
    return A;
  },
  get objectUtil() {
    return qe;
  },
  ZodParsedType: h,
  getParsedType: V,
  ZodType: R,
  ZodString: U,
  ZodNumber: q,
  ZodBigInt: W,
  ZodBoolean: fe,
  ZodDate: X,
  ZodSymbol: Oe,
  ZodUndefined: he,
  ZodNull: me,
  ZodAny: se,
  ZodUnknown: J,
  ZodNever: F,
  ZodVoid: Be,
  ZodArray: $,
  ZodObject: N,
  ZodUnion: pe,
  ZodDiscriminatedUnion: Me,
  ZodIntersection: ye,
  ZodTuple: P,
  ZodRecord: _e,
  ZodMap: Ue,
  ZodSet: Q,
  ZodFunction: re,
  ZodLazy: ge,
  ZodLiteral: ve,
  ZodEnum: H,
  ZodNativeEnum: Te,
  ZodPromise: ie,
  ZodEffects: j,
  ZodTransformer: j,
  ZodOptional: D,
  ZodNullable: K,
  ZodDefault: be,
  ZodCatch: $e,
  ZodNaN: je,
  BRAND: hn,
  ZodBranded: _t,
  ZodPipeline: Ae,
  ZodReadonly: Ze,
  custom: gt,
  Schema: R,
  ZodSchema: R,
  late: mn,
  get ZodFirstPartyTypeKind() {
    return v;
  },
  coerce: Gn,
  any: Rn,
  array: Nn,
  bigint: _n,
  boolean: bt,
  date: gn,
  discriminatedUnion: Yn,
  effect: ut,
  enum: Pn,
  function: $n,
  instanceof: pn,
  intersection: Cn,
  lazy: jn,
  literal: Zn,
  map: Bn,
  nan: yn,
  nativeEnum: Mn,
  never: In,
  null: bn,
  nullable: Fn,
  number: Tt,
  object: wn,
  oboolean: Hn,
  onumber: Wn,
  optional: Dn,
  ostring: qn,
  pipeline: Vn,
  preprocess: Ln,
  promise: zn,
  record: On,
  set: Un,
  strictObject: Sn,
  string: vt,
  symbol: vn,
  transformer: ut,
  tuple: kn,
  undefined: Tn,
  union: En,
  unknown: An,
  void: xn,
  NEVER: Jn,
  ZodIssueCode: f,
  quotelessJson: Qt,
  ZodError: k,
});
const Xn = /[$_\p{ID_Start}][$\u200c\u200d\p{ID_Continue}]*/u;
function Qn(e) {
  return e.length === 1
    ? e[0].toString()
    : e.reduce((t, n) => {
        if (typeof n == "number") return t + "[" + n.toString() + "]";
        if (n.includes('"')) return t + '["' + Kn(n) + '"]';
        if (!Xn.test(n)) return t + '["' + n + '"]';
        const r = t.length === 0 ? "" : ".";
        return t + r + n;
      }, "");
}
function Kn(e) {
  return e.replace(/"/g, '\\"');
}
function er(e) {
  return e.length !== 0;
}
const tr = 99,
  nr = "; ",
  rr = ", or ",
  Rt = "Validation error",
  sr = ": ";
class ir extends Error {
  details;
  name;
  constructor(t, n = []) {
    super(t), (this.details = n), (this.name = "ZodValidationError");
  }
  toString() {
    return this.message;
  }
}
function At(e, t, n) {
  if (e.code === "invalid_union")
    return e.unionErrors
      .reduce((r, s) => {
        const i = s.issues.map((a) => At(a, t, n)).join(t);
        return r.includes(i) || r.push(i), r;
      }, [])
      .join(n);
  if (er(e.path)) {
    if (e.path.length === 1) {
      const r = e.path[0];
      if (typeof r == "number") return `${e.message} at index ${r}`;
    }
    return `${e.message} at "${Qn(e.path)}"`;
  }
  return e.message;
}
function ar(e, t, n) {
  return t !== null
    ? e.length > 0
      ? [t, e].join(n)
      : t
    : e.length > 0
    ? e
    : Rt;
}
function or(e, t = {}) {
  const {
      maxIssuesInMessage: n = tr,
      issueSeparator: r = nr,
      unionSeparator: s = rr,
      prefixSeparator: i = sr,
      prefix: a = Rt,
    } = t,
    o = e.errors
      .slice(0, n)
      .map((c) => At(c, r, s))
      .join(r),
    l = ar(o, a, i);
  return new ir(l, e.errors);
}
var ur = Object.defineProperty,
  cr = (e, t, n) =>
    t in e
      ? ur(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n })
      : (e[t] = n),
  lr = (e, t, n) => (cr(e, typeof t != "symbol" ? t + "" : t, n), n),
  dr = class extends Error {
    name = "MUDContextAlreadyCreatedError";
    message = "MUD context was already created";
  },
  fr = class extends Error {
    name = "MUDContextNotCreatedError";
    message = "MUD context has not been created";
  };
function It(e, t) {
  return or(e, {
    prefix: t,
    prefixSeparator: `
- `,
    issueSeparator: `
- `,
  });
}
function Qe(e, { strict: t = !0 } = {}) {
  return !e || typeof e != "string"
    ? !1
    : t
    ? /^0x[0-9a-fA-F]*$/.test(e)
    : e.startsWith("0x");
}
function ae(e) {
  return Qe(e, { strict: !1 }) ? Math.ceil((e.length - 2) / 2) : e.length;
}
const hr = "1.13.2",
  mr = () => `viem@${hr}`;
class L extends Error {
  constructor(t, n = {}) {
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
        value: mr(),
      });
    const r =
        n.cause instanceof L
          ? n.cause.details
          : n.cause?.message
          ? n.cause.message
          : n.details,
      s = (n.cause instanceof L && n.cause.docsPath) || n.docsPath;
    (this.message = [
      t || "An error occurred.",
      "",
      ...(n.metaMessages ? [...n.metaMessages, ""] : []),
      ...(s
        ? [
            `Docs: https://viem.sh${s}.html${
              n.docsSlug ? `#${n.docsSlug}` : ""
            }`,
          ]
        : []),
      ...(r ? [`Details: ${r}`] : []),
      `Version: ${this.version}`,
    ].join(`
`)),
      n.cause && (this.cause = n.cause),
      (this.details = r),
      (this.docsPath = s),
      (this.metaMessages = n.metaMessages),
      (this.shortMessage = t);
  }
  walk(t) {
    return xt(this, t);
  }
}
function xt(e, t) {
  return t?.(e)
    ? e
    : e && typeof e == "object" && "cause" in e
    ? xt(e.cause, t)
    : t
    ? null
    : e;
}
class Nt extends L {
  constructor({ offset: t, position: n, size: r }) {
    super(
      `Slice ${
        n === "start" ? "starting" : "ending"
      } at offset "${t}" is out-of-bounds (size: ${r}).`
    ),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "SliceOffsetOutOfBoundsError",
      });
  }
}
class wt extends L {
  constructor({ size: t, targetSize: n, type: r }) {
    super(
      `${r.charAt(0).toUpperCase()}${r
        .slice(1)
        .toLowerCase()} size (${t}) exceeds padding size (${n}).`
    ),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "SizeExceedsPaddingSizeError",
      });
  }
}
function oe(e, { dir: t, size: n = 32 } = {}) {
  return typeof e == "string"
    ? pr(e, { dir: t, size: n })
    : yr(e, { dir: t, size: n });
}
function pr(e, { dir: t, size: n = 32 } = {}) {
  if (n === null) return e;
  const r = e.replace("0x", "");
  if (r.length > n * 2)
    throw new wt({ size: Math.ceil(r.length / 2), targetSize: n, type: "hex" });
  return `0x${r[t === "right" ? "padEnd" : "padStart"](n * 2, "0")}`;
}
function yr(e, { dir: t, size: n = 32 } = {}) {
  if (n === null) return e;
  if (e.length > n)
    throw new wt({ size: e.length, targetSize: n, type: "bytes" });
  const r = new Uint8Array(n);
  for (let s = 0; s < n; s++) {
    const i = t === "right";
    r[i ? s : n - s - 1] = e[i ? s : e.length - s - 1];
  }
  return r;
}
class _r extends L {
  constructor({ max: t, min: n, signed: r, size: s, value: i }) {
    super(
      `Number "${i}" is not in safe ${
        s ? `${s * 8}-bit ${r ? "signed" : "unsigned"} ` : ""
      }integer range ${t ? `(${n} to ${t})` : `(above ${n})`}`
    ),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "IntegerOutOfRangeError",
      });
  }
}
class gr extends L {
  constructor(t) {
    super(
      `Hex value "${t}" is not a valid boolean. The hex value must be "0x0" (false) or "0x1" (true).`
    ),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "InvalidHexBooleanError",
      });
  }
}
class vr extends L {
  constructor({ givenSize: t, maxSize: n }) {
    super(`Size cannot exceed ${n} bytes. Given size: ${t} bytes.`),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "SizeOverflowError",
      });
  }
}
function Ne(e, { dir: t = "left" } = {}) {
  let n = typeof e == "string" ? e.replace("0x", "") : e,
    r = 0;
  for (
    let s = 0;
    s < n.length - 1 &&
    n[t === "left" ? s : n.length - s - 1].toString() === "0";
    s++
  )
    r++;
  return (
    (n = t === "left" ? n.slice(r) : n.slice(0, n.length - r)),
    typeof e == "string"
      ? (n.length === 1 && t === "right" && (n = `${n}0`),
        `0x${n.length % 2 === 1 ? `0${n}` : n}`)
      : n
  );
}
function G(e, { size: t }) {
  if (ae(e) > t) throw new vr({ givenSize: ae(e), maxSize: t });
}
function Tr(e, t = {}) {
  const { signed: n } = t;
  t.size && G(e, { size: t.size });
  const r = BigInt(e);
  if (!n) return r;
  const s = (e.length - 2) / 2,
    i = (1n << (BigInt(s) * 8n - 1n)) - 1n;
  return r <= i ? r : r - BigInt(`0x${"f".padStart(s * 2, "f")}`) - 1n;
}
function Ls(e, t = {}) {
  let n = e;
  if ((t.size && (G(n, { size: t.size }), (n = Ne(n))), Ne(n) === "0x00"))
    return !1;
  if (Ne(n) === "0x01") return !0;
  throw new gr(n);
}
function Vs(e, t = {}) {
  return Number(Tr(e, t));
}
function Le(e, t = {}) {
  let n = Ke(e);
  return (
    t.size && (G(n, { size: t.size }), (n = Ne(n, { dir: "right" }))),
    new TextDecoder().decode(n)
  );
}
const br = Array.from({ length: 256 }, (e, t) =>
  t.toString(16).padStart(2, "0")
);
function qs(e, t = {}) {
  return typeof e == "number" || typeof e == "bigint"
    ? Et(e, t)
    : typeof e == "string"
    ? we(e, t)
    : typeof e == "boolean"
    ? Rr(e, t)
    : St(e, t);
}
function Rr(e, t = {}) {
  const n = `0x${Number(e)}`;
  return typeof t.size == "number"
    ? (G(n, { size: t.size }), oe(n, { size: t.size }))
    : n;
}
function St(e, t = {}) {
  let n = "";
  for (let s = 0; s < e.length; s++) n += br[e[s]];
  const r = `0x${n}`;
  return typeof t.size == "number"
    ? (G(r, { size: t.size }), oe(r, { dir: "right", size: t.size }))
    : r;
}
function Et(e, t = {}) {
  const { signed: n, size: r } = t,
    s = BigInt(e);
  let i;
  r
    ? n
      ? (i = (1n << (BigInt(r) * 8n - 1n)) - 1n)
      : (i = 2n ** (BigInt(r) * 8n) - 1n)
    : typeof e == "number" && (i = BigInt(Number.MAX_SAFE_INTEGER));
  const a = typeof i == "bigint" && n ? -i - 1n : 0;
  if ((i && s > i) || s < a) {
    const l = typeof e == "bigint" ? "n" : "";
    throw new _r({
      max: i ? `${i}${l}` : void 0,
      min: `${a}${l}`,
      signed: n,
      size: r,
      value: `${e}${l}`,
    });
  }
  const o = `0x${(n && s < 0 ? (1n << BigInt(r * 8)) + BigInt(s) : s).toString(
    16
  )}`;
  return r ? oe(o, { size: r }) : o;
}
const Ar = new TextEncoder();
function we(e, t = {}) {
  const n = Ar.encode(e);
  return St(n, t);
}
const Ir = new TextEncoder();
function Ws(e, t = {}) {
  return typeof e == "number" || typeof e == "bigint"
    ? Nr(e, t)
    : typeof e == "boolean"
    ? xr(e, t)
    : Qe(e)
    ? Ke(e, t)
    : wr(e, t);
}
function xr(e, t = {}) {
  const n = new Uint8Array(1);
  return (
    (n[0] = Number(e)),
    typeof t.size == "number"
      ? (G(n, { size: t.size }), oe(n, { size: t.size }))
      : n
  );
}
const M = { zero: 48, nine: 57, A: 65, F: 70, a: 97, f: 102 };
function ct(e) {
  if (e >= M.zero && e <= M.nine) return e - M.zero;
  if (e >= M.A && e <= M.F) return e - (M.A - 10);
  if (e >= M.a && e <= M.f) return e - (M.a - 10);
}
function Ke(e, t = {}) {
  let n = e;
  t.size &&
    (G(n, { size: t.size }), (n = oe(n, { dir: "right", size: t.size })));
  let r = n.slice(2);
  r.length % 2 && (r = `0${r}`);
  const s = r.length / 2,
    i = new Uint8Array(s);
  for (let a = 0, o = 0; a < s; a++) {
    const l = ct(r.charCodeAt(o++)),
      c = ct(r.charCodeAt(o++));
    if (l === void 0 || c === void 0)
      throw new L(
        `Invalid byte sequence ("${r[o - 2]}${r[o - 1]}" in "${r}").`
      );
    i[a] = l * 16 + c;
  }
  return i;
}
function Nr(e, t) {
  const n = Et(e, t);
  return Ke(n);
}
function wr(e, t = {}) {
  const n = Ir.encode(e);
  return typeof t.size == "number"
    ? (G(n, { size: t.size }), oe(n, { dir: "right", size: t.size }))
    : n;
}
const Sr = /^0x[a-fA-F0-9]{40}$/;
function Er(e) {
  return Sr.test(e);
}
function Yr(e) {
  return `0x${e.reduce((t, n) => t + n.replace("0x", ""), "")}`;
}
function Hs(e, t, n, { strict: r } = {}) {
  return Qe(e, { strict: !1 })
    ? Se(e, t, n, { strict: r })
    : Cr(e, t, n, { strict: r });
}
function Yt(e, t) {
  if (typeof t == "number" && t > 0 && t > ae(e) - 1)
    throw new Nt({ offset: t, position: "start", size: ae(e) });
}
function Ct(e, t, n) {
  if (typeof t == "number" && typeof n == "number" && ae(e) !== n - t)
    throw new Nt({ offset: n, position: "end", size: ae(e) });
}
function Cr(e, t, n, { strict: r } = {}) {
  Yt(e, t);
  const s = e.slice(t, n);
  return r && Ct(s, t, n), s;
}
function Se(e, t, n, { strict: r } = {}) {
  Yt(e, t);
  const s = `0x${e.replace("0x", "").slice((t ?? 0) * 2, (n ?? e.length) * 2)}`;
  return r && Ct(s, t, n), s;
}
var kr = 16,
  lt = 14;
function et(e, t) {
  /^\w+$/.test(e) ||
    t.addIssue({
      code: f.custom,
      message: "Name must contain only alphanumeric & underscore characters",
    });
}
function Or(e, t) {
  et(e, t),
    /^[A-Z]/.test(e) ||
      t.addIssue({
        code: f.custom,
        message: "Name must start with a capital letter",
      });
}
function Br(e, t) {
  et(e, t),
    /^[a-z]/.test(e) ||
      t.addIssue({
        code: f.custom,
        message: "Name must start with a lowercase letter",
      });
}
function Ur(e, t) {
  e.length === 0 &&
    t.addIssue({ code: f.custom, message: "Enum must not be empty" }),
    e.length >= 256 &&
      t.addIssue({ code: f.custom, message: "Length of enum must be < 256" });
  let n = Ee(e);
  n.length > 0 &&
    t.addIssue({
      code: f.custom,
      message: `Enum must not have duplicate names for: ${n.join(", ")}`,
    });
}
function tt(e, t) {
  return (n, r) => {
    if (n === "") {
      e && r.addIssue({ code: f.custom, message: "Route must not be empty" });
      return;
    }
    n[0] !== "/" &&
      r.addIssue({ code: f.custom, message: 'Route must start with "/"' }),
      n[n.length - 1] === "/" &&
        r.addIssue({ code: f.custom, message: 'Route must not end with "/"' });
    let s = n.split("/");
    t &&
      s.length > 2 &&
      r.addIssue({
        code: f.custom,
        message: 'Route must only have one level (e.g. "/foo")',
      });
    for (let i = 1; i < s.length; i++)
      s[i] === "" &&
        r.addIssue({
          code: f.custom,
          message: 'Route must not contain empty route fragments (e.g. "//")',
        }),
        /^\w+$/.test(s[i]) ||
          r.addIssue({
            code: f.custom,
            message:
              "Route must contain only alphanumeric & underscore characters",
          });
  };
}
var $r = tt(!0, !1),
  jr = tt(!1, !1),
  Zr = tt(!0, !0);
function Pr(e, t) {
  Er(e) ||
    t.addIssue({
      code: f.custom,
      message: "Address must be a valid Ethereum address",
    });
}
function Ee(e) {
  let t = new Set(),
    n = new Set();
  for (let r of e) t.has(r) && n.add(r), t.add(r);
  return [...n];
}
function Mr(e, t) {
  e.length > lt &&
    t.addIssue({
      code: f.custom,
      message: `Namespace must be <= ${lt} characters`,
    }),
    /^\w*$/.test(e) ||
      t.addIssue({
        code: f.custom,
        message:
          "Selector must contain only alphanumeric & underscore characters",
      });
}
function zr(e) {
  let t = e.match(/^(\w+)\[(\d+)\]$/);
  return t ? { elementType: t[1], staticLength: Number.parseInt(t[2]) } : null;
}
var ue = p.string().superRefine(Or),
  kt = p.string().superRefine(Br),
  Ot = p.string().superRefine(et),
  Dr = p.string().superRefine(Mr),
  Fr = p.array(ue).superRefine(Ur);
p.string().superRefine($r);
p.string().superRefine(Zr);
p.string().superRefine(jr);
var Lr = p.string().superRefine(Pr),
  Bt = class {
    static isCreated() {
      return this._global.__mudCoreContext !== void 0;
    }
    static createContext() {
      if (this.isCreated()) throw new dr();
      let t = this._global,
        n = new Bt();
      return (t.__mudCoreContext = n), n;
    }
    static getContext() {
      let t = this._global.__mudCoreContext;
      if (t === void 0) throw new fr();
      return t;
    }
    configExtenders = [];
  },
  Re = Bt;
lr(Re, "_global", typeof global > "u" ? window.global ?? {} : global);
function Vr(e) {
  let t = e,
    n = Re.getContext();
  for (let r of n.configExtenders) t = r(t);
  return t;
}
function Ut(e) {
  Re.getContext().configExtenders.push(e);
}
var $t = ((e) => (
    (e[(e.TABLE_ID = 0)] = "TABLE_ID"),
    (e[(e.SYSTEM_ADDRESS = 1)] = "SYSTEM_ADDRESS"),
    e
  ))($t || {}),
  Je = { registerFunctionSelector: !0, openAccess: !0, accessList: [] },
  z = {
    worldContractName: void 0,
    worldInterfaceName: "IWorld",
    systems: {},
    excludeSystems: [],
    postDeployScript: "PostDeploy",
    deploysDirectory: "./deploys",
    worldsFile: "./worlds.json",
    worldgenDirectory: "world",
    worldImportPath: "@latticexyz/world/src/",
    modules: [],
  },
  Xe = ue,
  qr = ue,
  Wr = p.array(Xe.or(Lr)).default(Je.accessList),
  Hr = p.intersection(
    p.object({
      name: Ot.optional(),
      registerFunctionSelectors: p
        .boolean()
        .default(Je.registerFunctionSelector),
    }),
    p.discriminatedUnion("openAccess", [
      p.object({ openAccess: p.literal(!0).default(Je.openAccess) }),
      p.object({ openAccess: p.literal(!1), accessList: Wr }),
    ])
  ),
  Gr = p.object({
    value: p.union([p.string(), p.number(), p.instanceof(Uint8Array)]),
    type: p.string(),
  }),
  Jr = p.object({ type: p.nativeEnum($t), input: p.string() }),
  Xr = p.object({
    name: qr,
    root: p.boolean().default(!1),
    args: p.array(p.union([Gr, Jr])).default([]),
  }),
  Qr = p.object({
    worldContractName: p.string().optional(),
    worldInterfaceName: p.string().default(z.worldInterfaceName),
    systems: p.record(Xe, Hr).default(z.systems),
    excludeSystems: p.array(Xe).default(z.excludeSystems),
    postDeployScript: p.string().default(z.postDeployScript),
    deploysDirectory: p.string().default(z.deploysDirectory),
    worldsFile: p.string().default(z.worldsFile),
    worldgenDirectory: p.string().default(z.worldgenDirectory),
    worldImportPath: p.string().default(z.worldImportPath),
    modules: p.array(Xr).default(z.modules),
  }),
  Kr = Qr.catchall(p.any()),
  es = ((e) => (
    (e[(e.UINT8 = 0)] = "UINT8"),
    (e[(e.UINT16 = 1)] = "UINT16"),
    (e[(e.UINT24 = 2)] = "UINT24"),
    (e[(e.UINT32 = 3)] = "UINT32"),
    (e[(e.UINT40 = 4)] = "UINT40"),
    (e[(e.UINT48 = 5)] = "UINT48"),
    (e[(e.UINT56 = 6)] = "UINT56"),
    (e[(e.UINT64 = 7)] = "UINT64"),
    (e[(e.UINT72 = 8)] = "UINT72"),
    (e[(e.UINT80 = 9)] = "UINT80"),
    (e[(e.UINT88 = 10)] = "UINT88"),
    (e[(e.UINT96 = 11)] = "UINT96"),
    (e[(e.UINT104 = 12)] = "UINT104"),
    (e[(e.UINT112 = 13)] = "UINT112"),
    (e[(e.UINT120 = 14)] = "UINT120"),
    (e[(e.UINT128 = 15)] = "UINT128"),
    (e[(e.UINT136 = 16)] = "UINT136"),
    (e[(e.UINT144 = 17)] = "UINT144"),
    (e[(e.UINT152 = 18)] = "UINT152"),
    (e[(e.UINT160 = 19)] = "UINT160"),
    (e[(e.UINT168 = 20)] = "UINT168"),
    (e[(e.UINT176 = 21)] = "UINT176"),
    (e[(e.UINT184 = 22)] = "UINT184"),
    (e[(e.UINT192 = 23)] = "UINT192"),
    (e[(e.UINT200 = 24)] = "UINT200"),
    (e[(e.UINT208 = 25)] = "UINT208"),
    (e[(e.UINT216 = 26)] = "UINT216"),
    (e[(e.UINT224 = 27)] = "UINT224"),
    (e[(e.UINT232 = 28)] = "UINT232"),
    (e[(e.UINT240 = 29)] = "UINT240"),
    (e[(e.UINT248 = 30)] = "UINT248"),
    (e[(e.UINT256 = 31)] = "UINT256"),
    (e[(e.INT8 = 32)] = "INT8"),
    (e[(e.INT16 = 33)] = "INT16"),
    (e[(e.INT24 = 34)] = "INT24"),
    (e[(e.INT32 = 35)] = "INT32"),
    (e[(e.INT40 = 36)] = "INT40"),
    (e[(e.INT48 = 37)] = "INT48"),
    (e[(e.INT56 = 38)] = "INT56"),
    (e[(e.INT64 = 39)] = "INT64"),
    (e[(e.INT72 = 40)] = "INT72"),
    (e[(e.INT80 = 41)] = "INT80"),
    (e[(e.INT88 = 42)] = "INT88"),
    (e[(e.INT96 = 43)] = "INT96"),
    (e[(e.INT104 = 44)] = "INT104"),
    (e[(e.INT112 = 45)] = "INT112"),
    (e[(e.INT120 = 46)] = "INT120"),
    (e[(e.INT128 = 47)] = "INT128"),
    (e[(e.INT136 = 48)] = "INT136"),
    (e[(e.INT144 = 49)] = "INT144"),
    (e[(e.INT152 = 50)] = "INT152"),
    (e[(e.INT160 = 51)] = "INT160"),
    (e[(e.INT168 = 52)] = "INT168"),
    (e[(e.INT176 = 53)] = "INT176"),
    (e[(e.INT184 = 54)] = "INT184"),
    (e[(e.INT192 = 55)] = "INT192"),
    (e[(e.INT200 = 56)] = "INT200"),
    (e[(e.INT208 = 57)] = "INT208"),
    (e[(e.INT216 = 58)] = "INT216"),
    (e[(e.INT224 = 59)] = "INT224"),
    (e[(e.INT232 = 60)] = "INT232"),
    (e[(e.INT240 = 61)] = "INT240"),
    (e[(e.INT248 = 62)] = "INT248"),
    (e[(e.INT256 = 63)] = "INT256"),
    (e[(e.BYTES1 = 64)] = "BYTES1"),
    (e[(e.BYTES2 = 65)] = "BYTES2"),
    (e[(e.BYTES3 = 66)] = "BYTES3"),
    (e[(e.BYTES4 = 67)] = "BYTES4"),
    (e[(e.BYTES5 = 68)] = "BYTES5"),
    (e[(e.BYTES6 = 69)] = "BYTES6"),
    (e[(e.BYTES7 = 70)] = "BYTES7"),
    (e[(e.BYTES8 = 71)] = "BYTES8"),
    (e[(e.BYTES9 = 72)] = "BYTES9"),
    (e[(e.BYTES10 = 73)] = "BYTES10"),
    (e[(e.BYTES11 = 74)] = "BYTES11"),
    (e[(e.BYTES12 = 75)] = "BYTES12"),
    (e[(e.BYTES13 = 76)] = "BYTES13"),
    (e[(e.BYTES14 = 77)] = "BYTES14"),
    (e[(e.BYTES15 = 78)] = "BYTES15"),
    (e[(e.BYTES16 = 79)] = "BYTES16"),
    (e[(e.BYTES17 = 80)] = "BYTES17"),
    (e[(e.BYTES18 = 81)] = "BYTES18"),
    (e[(e.BYTES19 = 82)] = "BYTES19"),
    (e[(e.BYTES20 = 83)] = "BYTES20"),
    (e[(e.BYTES21 = 84)] = "BYTES21"),
    (e[(e.BYTES22 = 85)] = "BYTES22"),
    (e[(e.BYTES23 = 86)] = "BYTES23"),
    (e[(e.BYTES24 = 87)] = "BYTES24"),
    (e[(e.BYTES25 = 88)] = "BYTES25"),
    (e[(e.BYTES26 = 89)] = "BYTES26"),
    (e[(e.BYTES27 = 90)] = "BYTES27"),
    (e[(e.BYTES28 = 91)] = "BYTES28"),
    (e[(e.BYTES29 = 92)] = "BYTES29"),
    (e[(e.BYTES30 = 93)] = "BYTES30"),
    (e[(e.BYTES31 = 94)] = "BYTES31"),
    (e[(e.BYTES32 = 95)] = "BYTES32"),
    (e[(e.BOOL = 96)] = "BOOL"),
    (e[(e.ADDRESS = 97)] = "ADDRESS"),
    (e[(e.UINT8_ARRAY = 98)] = "UINT8_ARRAY"),
    (e[(e.UINT16_ARRAY = 99)] = "UINT16_ARRAY"),
    (e[(e.UINT24_ARRAY = 100)] = "UINT24_ARRAY"),
    (e[(e.UINT32_ARRAY = 101)] = "UINT32_ARRAY"),
    (e[(e.UINT40_ARRAY = 102)] = "UINT40_ARRAY"),
    (e[(e.UINT48_ARRAY = 103)] = "UINT48_ARRAY"),
    (e[(e.UINT56_ARRAY = 104)] = "UINT56_ARRAY"),
    (e[(e.UINT64_ARRAY = 105)] = "UINT64_ARRAY"),
    (e[(e.UINT72_ARRAY = 106)] = "UINT72_ARRAY"),
    (e[(e.UINT80_ARRAY = 107)] = "UINT80_ARRAY"),
    (e[(e.UINT88_ARRAY = 108)] = "UINT88_ARRAY"),
    (e[(e.UINT96_ARRAY = 109)] = "UINT96_ARRAY"),
    (e[(e.UINT104_ARRAY = 110)] = "UINT104_ARRAY"),
    (e[(e.UINT112_ARRAY = 111)] = "UINT112_ARRAY"),
    (e[(e.UINT120_ARRAY = 112)] = "UINT120_ARRAY"),
    (e[(e.UINT128_ARRAY = 113)] = "UINT128_ARRAY"),
    (e[(e.UINT136_ARRAY = 114)] = "UINT136_ARRAY"),
    (e[(e.UINT144_ARRAY = 115)] = "UINT144_ARRAY"),
    (e[(e.UINT152_ARRAY = 116)] = "UINT152_ARRAY"),
    (e[(e.UINT160_ARRAY = 117)] = "UINT160_ARRAY"),
    (e[(e.UINT168_ARRAY = 118)] = "UINT168_ARRAY"),
    (e[(e.UINT176_ARRAY = 119)] = "UINT176_ARRAY"),
    (e[(e.UINT184_ARRAY = 120)] = "UINT184_ARRAY"),
    (e[(e.UINT192_ARRAY = 121)] = "UINT192_ARRAY"),
    (e[(e.UINT200_ARRAY = 122)] = "UINT200_ARRAY"),
    (e[(e.UINT208_ARRAY = 123)] = "UINT208_ARRAY"),
    (e[(e.UINT216_ARRAY = 124)] = "UINT216_ARRAY"),
    (e[(e.UINT224_ARRAY = 125)] = "UINT224_ARRAY"),
    (e[(e.UINT232_ARRAY = 126)] = "UINT232_ARRAY"),
    (e[(e.UINT240_ARRAY = 127)] = "UINT240_ARRAY"),
    (e[(e.UINT248_ARRAY = 128)] = "UINT248_ARRAY"),
    (e[(e.UINT256_ARRAY = 129)] = "UINT256_ARRAY"),
    (e[(e.INT8_ARRAY = 130)] = "INT8_ARRAY"),
    (e[(e.INT16_ARRAY = 131)] = "INT16_ARRAY"),
    (e[(e.INT24_ARRAY = 132)] = "INT24_ARRAY"),
    (e[(e.INT32_ARRAY = 133)] = "INT32_ARRAY"),
    (e[(e.INT40_ARRAY = 134)] = "INT40_ARRAY"),
    (e[(e.INT48_ARRAY = 135)] = "INT48_ARRAY"),
    (e[(e.INT56_ARRAY = 136)] = "INT56_ARRAY"),
    (e[(e.INT64_ARRAY = 137)] = "INT64_ARRAY"),
    (e[(e.INT72_ARRAY = 138)] = "INT72_ARRAY"),
    (e[(e.INT80_ARRAY = 139)] = "INT80_ARRAY"),
    (e[(e.INT88_ARRAY = 140)] = "INT88_ARRAY"),
    (e[(e.INT96_ARRAY = 141)] = "INT96_ARRAY"),
    (e[(e.INT104_ARRAY = 142)] = "INT104_ARRAY"),
    (e[(e.INT112_ARRAY = 143)] = "INT112_ARRAY"),
    (e[(e.INT120_ARRAY = 144)] = "INT120_ARRAY"),
    (e[(e.INT128_ARRAY = 145)] = "INT128_ARRAY"),
    (e[(e.INT136_ARRAY = 146)] = "INT136_ARRAY"),
    (e[(e.INT144_ARRAY = 147)] = "INT144_ARRAY"),
    (e[(e.INT152_ARRAY = 148)] = "INT152_ARRAY"),
    (e[(e.INT160_ARRAY = 149)] = "INT160_ARRAY"),
    (e[(e.INT168_ARRAY = 150)] = "INT168_ARRAY"),
    (e[(e.INT176_ARRAY = 151)] = "INT176_ARRAY"),
    (e[(e.INT184_ARRAY = 152)] = "INT184_ARRAY"),
    (e[(e.INT192_ARRAY = 153)] = "INT192_ARRAY"),
    (e[(e.INT200_ARRAY = 154)] = "INT200_ARRAY"),
    (e[(e.INT208_ARRAY = 155)] = "INT208_ARRAY"),
    (e[(e.INT216_ARRAY = 156)] = "INT216_ARRAY"),
    (e[(e.INT224_ARRAY = 157)] = "INT224_ARRAY"),
    (e[(e.INT232_ARRAY = 158)] = "INT232_ARRAY"),
    (e[(e.INT240_ARRAY = 159)] = "INT240_ARRAY"),
    (e[(e.INT248_ARRAY = 160)] = "INT248_ARRAY"),
    (e[(e.INT256_ARRAY = 161)] = "INT256_ARRAY"),
    (e[(e.BYTES1_ARRAY = 162)] = "BYTES1_ARRAY"),
    (e[(e.BYTES2_ARRAY = 163)] = "BYTES2_ARRAY"),
    (e[(e.BYTES3_ARRAY = 164)] = "BYTES3_ARRAY"),
    (e[(e.BYTES4_ARRAY = 165)] = "BYTES4_ARRAY"),
    (e[(e.BYTES5_ARRAY = 166)] = "BYTES5_ARRAY"),
    (e[(e.BYTES6_ARRAY = 167)] = "BYTES6_ARRAY"),
    (e[(e.BYTES7_ARRAY = 168)] = "BYTES7_ARRAY"),
    (e[(e.BYTES8_ARRAY = 169)] = "BYTES8_ARRAY"),
    (e[(e.BYTES9_ARRAY = 170)] = "BYTES9_ARRAY"),
    (e[(e.BYTES10_ARRAY = 171)] = "BYTES10_ARRAY"),
    (e[(e.BYTES11_ARRAY = 172)] = "BYTES11_ARRAY"),
    (e[(e.BYTES12_ARRAY = 173)] = "BYTES12_ARRAY"),
    (e[(e.BYTES13_ARRAY = 174)] = "BYTES13_ARRAY"),
    (e[(e.BYTES14_ARRAY = 175)] = "BYTES14_ARRAY"),
    (e[(e.BYTES15_ARRAY = 176)] = "BYTES15_ARRAY"),
    (e[(e.BYTES16_ARRAY = 177)] = "BYTES16_ARRAY"),
    (e[(e.BYTES17_ARRAY = 178)] = "BYTES17_ARRAY"),
    (e[(e.BYTES18_ARRAY = 179)] = "BYTES18_ARRAY"),
    (e[(e.BYTES19_ARRAY = 180)] = "BYTES19_ARRAY"),
    (e[(e.BYTES20_ARRAY = 181)] = "BYTES20_ARRAY"),
    (e[(e.BYTES21_ARRAY = 182)] = "BYTES21_ARRAY"),
    (e[(e.BYTES22_ARRAY = 183)] = "BYTES22_ARRAY"),
    (e[(e.BYTES23_ARRAY = 184)] = "BYTES23_ARRAY"),
    (e[(e.BYTES24_ARRAY = 185)] = "BYTES24_ARRAY"),
    (e[(e.BYTES25_ARRAY = 186)] = "BYTES25_ARRAY"),
    (e[(e.BYTES26_ARRAY = 187)] = "BYTES26_ARRAY"),
    (e[(e.BYTES27_ARRAY = 188)] = "BYTES27_ARRAY"),
    (e[(e.BYTES28_ARRAY = 189)] = "BYTES28_ARRAY"),
    (e[(e.BYTES29_ARRAY = 190)] = "BYTES29_ARRAY"),
    (e[(e.BYTES30_ARRAY = 191)] = "BYTES30_ARRAY"),
    (e[(e.BYTES31_ARRAY = 192)] = "BYTES31_ARRAY"),
    (e[(e.BYTES32_ARRAY = 193)] = "BYTES32_ARRAY"),
    (e[(e.BOOL_ARRAY = 194)] = "BOOL_ARRAY"),
    (e[(e.ADDRESS_ARRAY = 195)] = "ADDRESS_ARRAY"),
    (e[(e.BYTES = 196)] = "BYTES"),
    (e[(e.STRING = 197)] = "STRING"),
    e
  ))(es || {}),
  jt = {
    [0]: "uint8",
    [1]: "uint16",
    [2]: "uint24",
    [3]: "uint32",
    [4]: "uint40",
    [5]: "uint48",
    [6]: "uint56",
    [7]: "uint64",
    [8]: "uint72",
    [9]: "uint80",
    [10]: "uint88",
    [11]: "uint96",
    [12]: "uint104",
    [13]: "uint112",
    [14]: "uint120",
    [15]: "uint128",
    [16]: "uint136",
    [17]: "uint144",
    [18]: "uint152",
    [19]: "uint160",
    [20]: "uint168",
    [21]: "uint176",
    [22]: "uint184",
    [23]: "uint192",
    [24]: "uint200",
    [25]: "uint208",
    [26]: "uint216",
    [27]: "uint224",
    [28]: "uint232",
    [29]: "uint240",
    [30]: "uint248",
    [31]: "uint256",
    [32]: "int8",
    [33]: "int16",
    [34]: "int24",
    [35]: "int32",
    [36]: "int40",
    [37]: "int48",
    [38]: "int56",
    [39]: "int64",
    [40]: "int72",
    [41]: "int80",
    [42]: "int88",
    [43]: "int96",
    [44]: "int104",
    [45]: "int112",
    [46]: "int120",
    [47]: "int128",
    [48]: "int136",
    [49]: "int144",
    [50]: "int152",
    [51]: "int160",
    [52]: "int168",
    [53]: "int176",
    [54]: "int184",
    [55]: "int192",
    [56]: "int200",
    [57]: "int208",
    [58]: "int216",
    [59]: "int224",
    [60]: "int232",
    [61]: "int240",
    [62]: "int248",
    [63]: "int256",
    [64]: "bytes1",
    [65]: "bytes2",
    [66]: "bytes3",
    [67]: "bytes4",
    [68]: "bytes5",
    [69]: "bytes6",
    [70]: "bytes7",
    [71]: "bytes8",
    [72]: "bytes9",
    [73]: "bytes10",
    [74]: "bytes11",
    [75]: "bytes12",
    [76]: "bytes13",
    [77]: "bytes14",
    [78]: "bytes15",
    [79]: "bytes16",
    [80]: "bytes17",
    [81]: "bytes18",
    [82]: "bytes19",
    [83]: "bytes20",
    [84]: "bytes21",
    [85]: "bytes22",
    [86]: "bytes23",
    [87]: "bytes24",
    [88]: "bytes25",
    [89]: "bytes26",
    [90]: "bytes27",
    [91]: "bytes28",
    [92]: "bytes29",
    [93]: "bytes30",
    [94]: "bytes31",
    [95]: "bytes32",
    [96]: "bool",
    [97]: "address",
    [98]: "uint8[]",
    [99]: "uint16[]",
    [100]: "uint24[]",
    [101]: "uint32[]",
    [102]: "uint40[]",
    [103]: "uint48[]",
    [104]: "uint56[]",
    [105]: "uint64[]",
    [106]: "uint72[]",
    [107]: "uint80[]",
    [108]: "uint88[]",
    [109]: "uint96[]",
    [110]: "uint104[]",
    [111]: "uint112[]",
    [112]: "uint120[]",
    [113]: "uint128[]",
    [114]: "uint136[]",
    [115]: "uint144[]",
    [116]: "uint152[]",
    [117]: "uint160[]",
    [118]: "uint168[]",
    [119]: "uint176[]",
    [120]: "uint184[]",
    [121]: "uint192[]",
    [122]: "uint200[]",
    [123]: "uint208[]",
    [124]: "uint216[]",
    [125]: "uint224[]",
    [126]: "uint232[]",
    [127]: "uint240[]",
    [128]: "uint248[]",
    [129]: "uint256[]",
    [130]: "int8[]",
    [131]: "int16[]",
    [132]: "int24[]",
    [133]: "int32[]",
    [134]: "int40[]",
    [135]: "int48[]",
    [136]: "int56[]",
    [137]: "int64[]",
    [138]: "int72[]",
    [139]: "int80[]",
    [140]: "int88[]",
    [141]: "int96[]",
    [142]: "int104[]",
    [143]: "int112[]",
    [144]: "int120[]",
    [145]: "int128[]",
    [146]: "int136[]",
    [147]: "int144[]",
    [148]: "int152[]",
    [149]: "int160[]",
    [150]: "int168[]",
    [151]: "int176[]",
    [152]: "int184[]",
    [153]: "int192[]",
    [154]: "int200[]",
    [155]: "int208[]",
    [156]: "int216[]",
    [157]: "int224[]",
    [158]: "int232[]",
    [159]: "int240[]",
    [160]: "int248[]",
    [161]: "int256[]",
    [162]: "bytes1[]",
    [163]: "bytes2[]",
    [164]: "bytes3[]",
    [165]: "bytes4[]",
    [166]: "bytes5[]",
    [167]: "bytes6[]",
    [168]: "bytes7[]",
    [169]: "bytes8[]",
    [170]: "bytes9[]",
    [171]: "bytes10[]",
    [172]: "bytes11[]",
    [173]: "bytes12[]",
    [174]: "bytes13[]",
    [175]: "bytes14[]",
    [176]: "bytes15[]",
    [177]: "bytes16[]",
    [178]: "bytes17[]",
    [179]: "bytes18[]",
    [180]: "bytes19[]",
    [181]: "bytes20[]",
    [182]: "bytes21[]",
    [183]: "bytes22[]",
    [184]: "bytes23[]",
    [185]: "bytes24[]",
    [186]: "bytes25[]",
    [187]: "bytes26[]",
    [188]: "bytes27[]",
    [189]: "bytes28[]",
    [190]: "bytes29[]",
    [191]: "bytes30[]",
    [192]: "bytes31[]",
    [193]: "bytes32[]",
    [194]: "bool[]",
    [195]: "address[]",
    [196]: "bytes",
    [197]: "string",
  },
  Zt = Object.values(jt),
  ts = Object.fromEntries(Object.entries(jt).map(([e, t]) => [t, parseInt(e)]));
function ns(e) {
  let t = e.valueOf();
  return t < 32
    ? t + 1
    : t < 64
    ? t + 1 - 32
    : t < 96
    ? t + 1 - 64
    : e == 96
    ? 1
    : e == 97
    ? 20
    : 0;
}
var rs = Zt.filter((e) => ns(ts[e]) > 0),
  nt = [
    "uint8",
    "uint16",
    "uint24",
    "uint32",
    "uint40",
    "uint48",
    "uint56",
    "uint64",
    "uint72",
    "uint80",
    "uint88",
    "uint96",
    "uint104",
    "uint112",
    "uint120",
    "uint128",
    "uint136",
    "uint144",
    "uint152",
    "uint160",
    "uint168",
    "uint176",
    "uint184",
    "uint192",
    "uint200",
    "uint208",
    "uint216",
    "uint224",
    "uint232",
    "uint240",
    "uint248",
    "uint256",
    "int8",
    "int16",
    "int24",
    "int32",
    "int40",
    "int48",
    "int56",
    "int64",
    "int72",
    "int80",
    "int88",
    "int96",
    "int104",
    "int112",
    "int120",
    "int128",
    "int136",
    "int144",
    "int152",
    "int160",
    "int168",
    "int176",
    "int184",
    "int192",
    "int200",
    "int208",
    "int216",
    "int224",
    "int232",
    "int240",
    "int248",
    "int256",
    "bytes1",
    "bytes2",
    "bytes3",
    "bytes4",
    "bytes5",
    "bytes6",
    "bytes7",
    "bytes8",
    "bytes9",
    "bytes10",
    "bytes11",
    "bytes12",
    "bytes13",
    "bytes14",
    "bytes15",
    "bytes16",
    "bytes17",
    "bytes18",
    "bytes19",
    "bytes20",
    "bytes21",
    "bytes22",
    "bytes23",
    "bytes24",
    "bytes25",
    "bytes26",
    "bytes27",
    "bytes28",
    "bytes29",
    "bytes30",
    "bytes31",
    "bytes32",
    "bool",
    "address",
    "uint8[]",
    "uint16[]",
    "uint24[]",
    "uint32[]",
    "uint40[]",
    "uint48[]",
    "uint56[]",
    "uint64[]",
    "uint72[]",
    "uint80[]",
    "uint88[]",
    "uint96[]",
    "uint104[]",
    "uint112[]",
    "uint120[]",
    "uint128[]",
    "uint136[]",
    "uint144[]",
    "uint152[]",
    "uint160[]",
    "uint168[]",
    "uint176[]",
    "uint184[]",
    "uint192[]",
    "uint200[]",
    "uint208[]",
    "uint216[]",
    "uint224[]",
    "uint232[]",
    "uint240[]",
    "uint248[]",
    "uint256[]",
    "int8[]",
    "int16[]",
    "int24[]",
    "int32[]",
    "int40[]",
    "int48[]",
    "int56[]",
    "int64[]",
    "int72[]",
    "int80[]",
    "int88[]",
    "int96[]",
    "int104[]",
    "int112[]",
    "int120[]",
    "int128[]",
    "int136[]",
    "int144[]",
    "int152[]",
    "int160[]",
    "int168[]",
    "int176[]",
    "int184[]",
    "int192[]",
    "int200[]",
    "int208[]",
    "int216[]",
    "int224[]",
    "int232[]",
    "int240[]",
    "int248[]",
    "int256[]",
    "bytes1[]",
    "bytes2[]",
    "bytes3[]",
    "bytes4[]",
    "bytes5[]",
    "bytes6[]",
    "bytes7[]",
    "bytes8[]",
    "bytes9[]",
    "bytes10[]",
    "bytes11[]",
    "bytes12[]",
    "bytes13[]",
    "bytes14[]",
    "bytes15[]",
    "bytes16[]",
    "bytes17[]",
    "bytes18[]",
    "bytes19[]",
    "bytes20[]",
    "bytes21[]",
    "bytes22[]",
    "bytes23[]",
    "bytes24[]",
    "bytes25[]",
    "bytes26[]",
    "bytes27[]",
    "bytes28[]",
    "bytes29[]",
    "bytes30[]",
    "bytes31[]",
    "bytes32[]",
    "bool[]",
    "address[]",
    "bytes",
    "string",
  ];
nt.slice(0, 98);
nt.slice(98);
function Js(e, t) {
  throw new Error(t ?? `Unexpected value: ${e}`);
}
function Xs(e) {
  return e !== void 0;
}
function ss(e, t) {
  return Object.fromEntries(Object.entries(e).map(([n, r]) => [n, t(r, n)]));
}
var Pe = {},
  is = {
    get exports() {
      return Pe;
    },
    set exports(e) {
      Pe = e;
    },
  },
  Ve,
  dt;
function as() {
  if (dt) return Ve;
  dt = 1;
  var e = 1e3,
    t = e * 60,
    n = t * 60,
    r = n * 24,
    s = r * 7,
    i = r * 365.25;
  Ve = function (u, d) {
    d = d || {};
    var y = typeof u;
    if (y === "string" && u.length > 0) return a(u);
    if (y === "number" && isFinite(u)) return d.long ? l(u) : o(u);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" +
        JSON.stringify(u)
    );
  };
  function a(u) {
    if (((u = String(u)), !(u.length > 100))) {
      var d =
        /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
          u
        );
      if (d) {
        var y = parseFloat(d[1]),
          I = (d[2] || "ms").toLowerCase();
        switch (I) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return y * i;
          case "weeks":
          case "week":
          case "w":
            return y * s;
          case "days":
          case "day":
          case "d":
            return y * r;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return y * n;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return y * t;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return y * e;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return y;
          default:
            return;
        }
      }
    }
  }
  function o(u) {
    var d = Math.abs(u);
    return d >= r
      ? Math.round(u / r) + "d"
      : d >= n
      ? Math.round(u / n) + "h"
      : d >= t
      ? Math.round(u / t) + "m"
      : d >= e
      ? Math.round(u / e) + "s"
      : u + "ms";
  }
  function l(u) {
    var d = Math.abs(u);
    return d >= r
      ? c(u, d, r, "day")
      : d >= n
      ? c(u, d, n, "hour")
      : d >= t
      ? c(u, d, t, "minute")
      : d >= e
      ? c(u, d, e, "second")
      : u + " ms";
  }
  function c(u, d, y, I) {
    var x = d >= y * 1.5;
    return Math.round(u / y) + " " + I + (x ? "s" : "");
  }
  return Ve;
}
function os(e) {
  (n.debug = n),
    (n.default = n),
    (n.coerce = l),
    (n.disable = i),
    (n.enable = s),
    (n.enabled = a),
    (n.humanize = as()),
    (n.destroy = c),
    Object.keys(e).forEach((u) => {
      n[u] = e[u];
    }),
    (n.names = []),
    (n.skips = []),
    (n.formatters = {});
  function t(u) {
    let d = 0;
    for (let y = 0; y < u.length; y++)
      (d = (d << 5) - d + u.charCodeAt(y)), (d |= 0);
    return n.colors[Math.abs(d) % n.colors.length];
  }
  n.selectColor = t;
  function n(u) {
    let d,
      y = null,
      I,
      x;
    function S(...g) {
      if (!S.enabled) return;
      const E = S,
        O = Number(new Date()),
        w = O - (d || O);
      (E.diff = w),
        (E.prev = d),
        (E.curr = O),
        (d = O),
        (g[0] = n.coerce(g[0])),
        typeof g[0] != "string" && g.unshift("%O");
      let ee = 0;
      (g[0] = g[0].replace(/%([a-zA-Z%])/g, (De, Wt) => {
        if (De === "%%") return "%";
        ee++;
        const it = n.formatters[Wt];
        if (typeof it == "function") {
          const Ht = g[ee];
          (De = it.call(E, Ht)), g.splice(ee, 1), ee--;
        }
        return De;
      })),
        n.formatArgs.call(E, g),
        (E.log || n.log).apply(E, g);
    }
    return (
      (S.namespace = u),
      (S.useColors = n.useColors()),
      (S.color = n.selectColor(u)),
      (S.extend = r),
      (S.destroy = n.destroy),
      Object.defineProperty(S, "enabled", {
        enumerable: !0,
        configurable: !1,
        get: () =>
          y !== null
            ? y
            : (I !== n.namespaces && ((I = n.namespaces), (x = n.enabled(u))),
              x),
        set: (g) => {
          y = g;
        },
      }),
      typeof n.init == "function" && n.init(S),
      S
    );
  }
  function r(u, d) {
    const y = n(this.namespace + (typeof d > "u" ? ":" : d) + u);
    return (y.log = this.log), y;
  }
  function s(u) {
    n.save(u), (n.namespaces = u), (n.names = []), (n.skips = []);
    let d;
    const y = (typeof u == "string" ? u : "").split(/[\s,]+/),
      I = y.length;
    for (d = 0; d < I; d++)
      y[d] &&
        ((u = y[d].replace(/\*/g, ".*?")),
        u[0] === "-"
          ? n.skips.push(new RegExp("^" + u.slice(1) + "$"))
          : n.names.push(new RegExp("^" + u + "$")));
  }
  function i() {
    const u = [...n.names.map(o), ...n.skips.map(o).map((d) => "-" + d)].join(
      ","
    );
    return n.enable(""), u;
  }
  function a(u) {
    if (u[u.length - 1] === "*") return !0;
    let d, y;
    for (d = 0, y = n.skips.length; d < y; d++)
      if (n.skips[d].test(u)) return !1;
    for (d = 0, y = n.names.length; d < y; d++)
      if (n.names[d].test(u)) return !0;
    return !1;
  }
  function o(u) {
    return u
      .toString()
      .substring(2, u.toString().length - 2)
      .replace(/\.\*\?$/, "*");
  }
  function l(u) {
    return u instanceof Error ? u.stack || u.message : u;
  }
  function c() {
    console.warn(
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    );
  }
  return n.enable(n.load()), n;
}
var us = os;
(function (e, t) {
  (t.formatArgs = r),
    (t.save = s),
    (t.load = i),
    (t.useColors = n),
    (t.storage = a()),
    (t.destroy = (() => {
      let l = !1;
      return () => {
        l ||
          ((l = !0),
          console.warn(
            "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
          ));
      };
    })()),
    (t.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33",
    ]);
  function n() {
    return typeof window < "u" &&
      window.process &&
      (window.process.type === "renderer" || window.process.__nwjs)
      ? !0
      : typeof navigator < "u" &&
        navigator.userAgent &&
        navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)
      ? !1
      : (typeof document < "u" &&
          document.documentElement &&
          document.documentElement.style &&
          document.documentElement.style.WebkitAppearance) ||
        (typeof window < "u" &&
          window.console &&
          (window.console.firebug ||
            (window.console.exception && window.console.table))) ||
        (typeof navigator < "u" &&
          navigator.userAgent &&
          navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) &&
          parseInt(RegExp.$1, 10) >= 31) ||
        (typeof navigator < "u" &&
          navigator.userAgent &&
          navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
  }
  function r(l) {
    if (
      ((l[0] =
        (this.useColors ? "%c" : "") +
        this.namespace +
        (this.useColors ? " %c" : " ") +
        l[0] +
        (this.useColors ? "%c " : " ") +
        "+" +
        e.exports.humanize(this.diff)),
      !this.useColors)
    )
      return;
    const c = "color: " + this.color;
    l.splice(1, 0, c, "color: inherit");
    let u = 0,
      d = 0;
    l[0].replace(/%[a-zA-Z%]/g, (y) => {
      y !== "%%" && (u++, y === "%c" && (d = u));
    }),
      l.splice(d, 0, c);
  }
  t.log = console.debug || console.log || (() => {});
  function s(l) {
    try {
      l ? t.storage.setItem("debug", l) : t.storage.removeItem("debug");
    } catch {}
  }
  function i() {
    let l;
    try {
      l = t.storage.getItem("debug");
    } catch {}
    return !l && typeof process < "u" && "env" in process && (l = {}.DEBUG), l;
  }
  function a() {
    try {
      return localStorage;
    } catch {}
  }
  e.exports = us(t);
  const { formatters: o } = e.exports;
  o.j = function (l) {
    try {
      return JSON.stringify(l);
    } catch (c) {
      return "[UnexpectedJSONParseError]: " + c.message;
    }
  };
})(is, Pe);
const cs = Pe;
var ze = cs("mud:common"),
  ft = {},
  ls = {
    get exports() {
      return ft;
    },
    set exports(e) {
      ft = e;
    },
  };
(function (e) {
  var t = Object.prototype.hasOwnProperty,
    n = "~";
  function r() {}
  Object.create &&
    ((r.prototype = Object.create(null)), new r().__proto__ || (n = !1));
  function s(l, c, u) {
    (this.fn = l), (this.context = c), (this.once = u || !1);
  }
  function i(l, c, u, d, y) {
    if (typeof u != "function")
      throw new TypeError("The listener must be a function");
    var I = new s(u, d || l, y),
      x = n ? n + c : c;
    return (
      l._events[x]
        ? l._events[x].fn
          ? (l._events[x] = [l._events[x], I])
          : l._events[x].push(I)
        : ((l._events[x] = I), l._eventsCount++),
      l
    );
  }
  function a(l, c) {
    --l._eventsCount === 0 ? (l._events = new r()) : delete l._events[c];
  }
  function o() {
    (this._events = new r()), (this._eventsCount = 0);
  }
  (o.prototype.eventNames = function () {
    var c = [],
      u,
      d;
    if (this._eventsCount === 0) return c;
    for (d in (u = this._events)) t.call(u, d) && c.push(n ? d.slice(1) : d);
    return Object.getOwnPropertySymbols
      ? c.concat(Object.getOwnPropertySymbols(u))
      : c;
  }),
    (o.prototype.listeners = function (c) {
      var u = n ? n + c : c,
        d = this._events[u];
      if (!d) return [];
      if (d.fn) return [d.fn];
      for (var y = 0, I = d.length, x = new Array(I); y < I; y++)
        x[y] = d[y].fn;
      return x;
    }),
    (o.prototype.listenerCount = function (c) {
      var u = n ? n + c : c,
        d = this._events[u];
      return d ? (d.fn ? 1 : d.length) : 0;
    }),
    (o.prototype.emit = function (c, u, d, y, I, x) {
      var S = n ? n + c : c;
      if (!this._events[S]) return !1;
      var g = this._events[S],
        E = arguments.length,
        O,
        w;
      if (g.fn) {
        switch ((g.once && this.removeListener(c, g.fn, void 0, !0), E)) {
          case 1:
            return g.fn.call(g.context), !0;
          case 2:
            return g.fn.call(g.context, u), !0;
          case 3:
            return g.fn.call(g.context, u, d), !0;
          case 4:
            return g.fn.call(g.context, u, d, y), !0;
          case 5:
            return g.fn.call(g.context, u, d, y, I), !0;
          case 6:
            return g.fn.call(g.context, u, d, y, I, x), !0;
        }
        for (w = 1, O = new Array(E - 1); w < E; w++) O[w - 1] = arguments[w];
        g.fn.apply(g.context, O);
      } else {
        var ee = g.length,
          te;
        for (w = 0; w < ee; w++)
          switch (
            (g[w].once && this.removeListener(c, g[w].fn, void 0, !0), E)
          ) {
            case 1:
              g[w].fn.call(g[w].context);
              break;
            case 2:
              g[w].fn.call(g[w].context, u);
              break;
            case 3:
              g[w].fn.call(g[w].context, u, d);
              break;
            case 4:
              g[w].fn.call(g[w].context, u, d, y);
              break;
            default:
              if (!O)
                for (te = 1, O = new Array(E - 1); te < E; te++)
                  O[te - 1] = arguments[te];
              g[w].fn.apply(g[w].context, O);
          }
      }
      return !0;
    }),
    (o.prototype.on = function (c, u, d) {
      return i(this, c, u, d, !1);
    }),
    (o.prototype.once = function (c, u, d) {
      return i(this, c, u, d, !0);
    }),
    (o.prototype.removeListener = function (c, u, d, y) {
      var I = n ? n + c : c;
      if (!this._events[I]) return this;
      if (!u) return a(this, I), this;
      var x = this._events[I];
      if (x.fn)
        x.fn === u && (!y || x.once) && (!d || x.context === d) && a(this, I);
      else {
        for (var S = 0, g = [], E = x.length; S < E; S++)
          (x[S].fn !== u || (y && !x[S].once) || (d && x[S].context !== d)) &&
            g.push(x[S]);
        g.length ? (this._events[I] = g.length === 1 ? g[0] : g) : a(this, I);
      }
      return this;
    }),
    (o.prototype.removeAllListeners = function (c) {
      var u;
      return (
        c
          ? ((u = n ? n + c : c), this._events[u] && a(this, u))
          : ((this._events = new r()), (this._eventsCount = 0)),
        this
      );
    }),
    (o.prototype.off = o.prototype.removeListener),
    (o.prototype.addListener = o.prototype.on),
    (o.prefixed = n),
    (o.EventEmitter = o),
    (e.exports = o);
})(ls);
globalThis && globalThis.__classPrivateFieldGet;
globalThis && globalThis.__classPrivateFieldSet;
globalThis && globalThis.__classPrivateFieldGet;
var ht = {},
  ds = {
    get exports() {
      return ht;
    },
    set exports(e) {
      ht = e;
    },
  },
  Pt = {};
function B(e, t) {
  typeof t == "boolean" && (t = { forever: t }),
    (this._originalTimeouts = JSON.parse(JSON.stringify(e))),
    (this._timeouts = e),
    (this._options = t || {}),
    (this._maxRetryTime = (t && t.maxRetryTime) || 1 / 0),
    (this._fn = null),
    (this._errors = []),
    (this._attempts = 1),
    (this._operationTimeout = null),
    (this._operationTimeoutCb = null),
    (this._timeout = null),
    (this._operationStart = null),
    (this._timer = null),
    this._options.forever && (this._cachedTimeouts = this._timeouts.slice(0));
}
var fs = B;
B.prototype.reset = function () {
  (this._attempts = 1), (this._timeouts = this._originalTimeouts.slice(0));
};
B.prototype.stop = function () {
  this._timeout && clearTimeout(this._timeout),
    this._timer && clearTimeout(this._timer),
    (this._timeouts = []),
    (this._cachedTimeouts = null);
};
B.prototype.retry = function (e) {
  if ((this._timeout && clearTimeout(this._timeout), !e)) return !1;
  var t = new Date().getTime();
  if (e && t - this._operationStart >= this._maxRetryTime)
    return (
      this._errors.push(e),
      this._errors.unshift(new Error("RetryOperation timeout occurred")),
      !1
    );
  this._errors.push(e);
  var n = this._timeouts.shift();
  if (n === void 0)
    if (this._cachedTimeouts)
      this._errors.splice(0, this._errors.length - 1),
        (n = this._cachedTimeouts.slice(-1));
    else return !1;
  var r = this;
  return (
    (this._timer = setTimeout(function () {
      r._attempts++,
        r._operationTimeoutCb &&
          ((r._timeout = setTimeout(function () {
            r._operationTimeoutCb(r._attempts);
          }, r._operationTimeout)),
          r._options.unref && r._timeout.unref()),
        r._fn(r._attempts);
    }, n)),
    this._options.unref && this._timer.unref(),
    !0
  );
};
B.prototype.attempt = function (e, t) {
  (this._fn = e),
    t &&
      (t.timeout && (this._operationTimeout = t.timeout),
      t.cb && (this._operationTimeoutCb = t.cb));
  var n = this;
  this._operationTimeoutCb &&
    (this._timeout = setTimeout(function () {
      n._operationTimeoutCb();
    }, n._operationTimeout)),
    (this._operationStart = new Date().getTime()),
    this._fn(this._attempts);
};
B.prototype.try = function (e) {
  console.log("Using RetryOperation.try() is deprecated"), this.attempt(e);
};
B.prototype.start = function (e) {
  console.log("Using RetryOperation.start() is deprecated"), this.attempt(e);
};
B.prototype.start = B.prototype.try;
B.prototype.errors = function () {
  return this._errors;
};
B.prototype.attempts = function () {
  return this._attempts;
};
B.prototype.mainError = function () {
  if (this._errors.length === 0) return null;
  for (var e = {}, t = null, n = 0, r = 0; r < this._errors.length; r++) {
    var s = this._errors[r],
      i = s.message,
      a = (e[i] || 0) + 1;
    (e[i] = a), a >= n && ((t = s), (n = a));
  }
  return t;
};
(function (e) {
  var t = fs;
  (e.operation = function (n) {
    var r = e.timeouts(n);
    return new t(r, {
      forever: n && (n.forever || n.retries === 1 / 0),
      unref: n && n.unref,
      maxRetryTime: n && n.maxRetryTime,
    });
  }),
    (e.timeouts = function (n) {
      if (n instanceof Array) return [].concat(n);
      var r = {
        retries: 10,
        factor: 2,
        minTimeout: 1 * 1e3,
        maxTimeout: 1 / 0,
        randomize: !1,
      };
      for (var s in n) r[s] = n[s];
      if (r.minTimeout > r.maxTimeout)
        throw new Error("minTimeout is greater than maxTimeout");
      for (var i = [], a = 0; a < r.retries; a++)
        i.push(this.createTimeout(a, r));
      return (
        n && n.forever && !i.length && i.push(this.createTimeout(a, r)),
        i.sort(function (o, l) {
          return o - l;
        }),
        i
      );
    }),
    (e.createTimeout = function (n, r) {
      var s = r.randomize ? Math.random() + 1 : 1,
        i = Math.round(s * Math.max(r.minTimeout, 1) * Math.pow(r.factor, n));
      return (i = Math.min(i, r.maxTimeout)), i;
    }),
    (e.wrap = function (n, r, s) {
      if ((r instanceof Array && ((s = r), (r = null)), !s)) {
        s = [];
        for (var i in n) typeof n[i] == "function" && s.push(i);
      }
      for (var a = 0; a < s.length; a++) {
        var o = s[a],
          l = n[o];
        (n[o] = function (u) {
          var d = e.operation(r),
            y = Array.prototype.slice.call(arguments, 1),
            I = y.pop();
          y.push(function (x) {
            d.retry(x) ||
              (x && (arguments[0] = d.mainError()), I.apply(this, arguments));
          }),
            d.attempt(function () {
              u.apply(n, y);
            });
        }.bind(n, l)),
          (n[o].options = r);
      }
    });
})(Pt);
(function (e) {
  e.exports = Pt;
})(ds);
ze.extend("createNonceManager");
ze.extend("writeContract");
var hs = ["table", "offchainTable", "namespace", "module", "system"],
  Mt = {
    table: "tb",
    offchainTable: "ot",
    namespace: "ns",
    module: "md",
    system: "sy",
  };
function ms(e) {
  let t = Mt[e.type];
  return Yr([
    we(t, { size: 2 }),
    we(e.namespace.slice(0, 14), { size: 14 }),
    we(e.name.slice(0, 16), { size: 16 }),
  ]);
}
var ps = Object.fromEntries(Object.entries(Mt).map(([e, t]) => [t, e]));
function ys(e) {
  let t = ps[e];
  if (hs.includes(t)) return t;
}
function Qs(e) {
  let t = Le(Se(e, 0, 2)).replace(/\0+$/, ""),
    n = ys(t),
    r = Le(Se(e, 2, 16)).replace(/\0+$/, ""),
    s = Le(Se(e, 16, 32)).replace(/\0+$/, "");
  if (!n) throw new Error(`Unknown type (${t}) for resource (${t}:${r}:${s})`);
  return { resourceId: e, type: n, namespace: r, name: s };
}
ze.extend("sendTransaction");
ze.extend("transportObserver");
var Ie = {
    storeImportPath: "@latticexyz/store/src/",
    userTypesFilename: "common.sol",
    codegenDirectory: "codegen",
    codegenIndexFilename: "index.sol",
  },
  rt = { namespace: "", enums: {}, userTypes: {} },
  ce = {
    directory: "tables",
    keySchema: { key: "bytes32" },
    tableIdArgument: !1,
    storeArgument: !1,
    offchainOnly: !1,
  },
  _s = ue,
  gs = kt,
  vs = kt,
  Ts = ue,
  bs = ue,
  st = p.string(),
  Rs = p.string(),
  As = p.record(gs, Rs).default(ce.keySchema),
  zt = p
    .record(vs, st)
    .refine((e) => Object.keys(e).length > 0, "Table schema may not be empty"),
  Is = st.transform((e) => zt.parse({ value: e })),
  xs = zt.or(Is),
  Dt = p
    .object({
      directory: p.string().default(ce.directory),
      name: Ot.optional(),
      tableIdArgument: p.boolean().default(ce.tableIdArgument),
      storeArgument: p.boolean().default(ce.storeArgument),
      dataStruct: p.boolean().optional(),
      keySchema: As,
      valueSchema: xs,
      offchainOnly: p.boolean().default(ce.offchainOnly),
    })
    .transform(
      (e) => (
        Object.keys(e.valueSchema).length === 1
          ? (e.dataStruct ??= !1)
          : (e.dataStruct ??= !0),
        e
      )
    ),
  Ns = st.transform((e) => Dt.parse({ valueSchema: { value: e } })),
  ws = Dt.or(Ns),
  Ss = p.record(_s, ws).transform((e) => {
    for (let t of Object.keys(e)) {
      let n = e[t];
      (n.name = t.slice(0, kr)), (e[t] = n);
    }
    return e;
  }),
  Es = p.object({ enums: p.record(Ts, Fr).default(rt.enums) }),
  Ys = p.object({ filePath: p.string(), internalType: p.enum(nt) }),
  Cs = p.object({ userTypes: p.record(bs, Ys).default(rt.userTypes) }),
  Ft = p
    .object({
      namespace: Dr.default(rt.namespace),
      storeImportPath: p.string().default(Ie.storeImportPath),
      tables: Ss,
      userTypesFilename: p.string().default(Ie.userTypesFilename),
      codegenDirectory: p.string().default(Ie.codegenDirectory),
      codegenIndexFilename: p.string().default(Ie.codegenIndexFilename),
    })
    .merge(Es)
    .merge(Cs);
Ft.superRefine(Lt);
var ks = Ft.catchall(p.any()).superRefine(Lt);
function Lt(e, t) {
  for (let c of Object.values(e.tables)) {
    let u = Object.keys(c.keySchema),
      d = Object.keys(c.valueSchema),
      y = Ee([...u, ...d]);
    y.length > 0 &&
      t.addIssue({
        code: f.custom,
        message: `Field and key names within one table must be unique: ${y.join(
          ", "
        )}`,
      });
  }
  let n = Object.keys(e.tables),
    r = [...Object.keys(e.enums), ...Object.keys(e.userTypes)],
    s = r,
    i = [...n, ...s],
    a = Ee(i);
  a.length > 0 &&
    t.addIssue({
      code: f.custom,
      message: `Table library names, enum names, user type names must be globally unique: ${a.join(
        ", "
      )}`,
    });
  let o = Object.values(e.tables).map(({ name: c }) => c),
    l = Ee(o);
  l.length > 0 &&
    t.addIssue({
      code: f.custom,
      message: `Table names must be unique: ${l.join(", ")}`,
    });
  for (let c of Object.values(e.tables)) {
    for (let u of Object.values(c.keySchema)) Vt(r, u, t);
    for (let u of Object.values(c.valueSchema)) Os(s, r, u, t);
  }
}
function Os(e, t, n, r) {
  if (!Zt.includes(n) && !e.includes(n)) {
    let s = zr(n);
    s
      ? Bs(t, s.elementType, s.staticLength, r)
      : r.addIssue({
          code: f.custom,
          message: `${n} is not a valid abi type, and is not defined in userTypes`,
        });
  }
}
function Vt(e, t, n) {
  !rs.includes(t) &&
    !e.includes(t) &&
    n.addIssue({ code: f.custom, message: `${t} is not a static type` });
}
function Bs(e, t, n, r) {
  Vt(e, t, r),
    n === 0
      ? r.addIssue({
          code: f.custom,
          message: "Static array length must not be 0",
        })
      : n >= 2 ** 16 &&
        r.addIssue({
          code: f.custom,
          message: "Static array length must be less than 2**16",
        });
}
function Ks(e) {
  let t = {};
  for (let n of Object.keys(e.tables))
    t[n] = Us(e.tables[n], e.userTypes, Object.keys(e.enums), e.namespace, n);
  return { tables: t };
}
function Us(e, t, n, r, s) {
  let { keySchema: i, valueSchema: a } = e;
  return {
    keySchema: $s(i, t, n),
    valueSchema: js(a, t, n),
    namespace: r,
    name: s,
    tableId: ms({
      type: e.offchainOnly ? "offchainTable" : "table",
      namespace: r,
      name: s,
    }),
  };
}
function $s(e, t, n) {
  let r =
    e == null ? { key: "bytes32" } : typeof e == "string" ? { key: e } : e;
  return qt(r, t, n);
}
function js(e, t, n) {
  return qt(typeof e == "string" ? { value: e } : e, t, n);
}
function qt(e, t, n) {
  return ss(e, (r, s) => {
    let i = t && r in t,
      a = n.includes(r);
    return { type: i ? t[r].internalType : a ? "uint8" : r, internalType: r };
  });
}
Re.isCreated() || Re.createContext();
Ut((e) => {
  try {
    return ks.parse(e);
  } catch (t) {
    throw t instanceof k ? It(t, "StoreConfig Validation Error") : t;
  }
});
function Zs(e) {
  return Vr(e);
}
Ut((e) => {
  try {
    return Kr.parse(e);
  } catch (t) {
    throw t instanceof k ? It(t, "WorldConfig Validation Error") : t;
  }
});
const Ps = Zs({
  tables: { Counter: { keySchema: {}, valueSchema: "uint32" } },
});
async function Ms() {
  {
    const { mount: t } = await Xt(() => import("./mud-dev-tool.js"), []),
      s = window.mudEngine.network;
    t({
      config: Ps,
      publicClient: s.publicClient,
      walletClient: s.walletClient,
      latestBlock$: s.latestBlock$,
      storedBlockLogs$: s.storedBlockLogs$,
      worldAddress: s.worldContract.address,
      worldAbi: s.worldContract.abi,
      write$: s.write$,
      recsWorld: s.world,
    });
  }
}
const zs = setInterval(() => {
  const e = window;
  e.mudEngine &&
    e.mudEngine.isInit &&
    (clearInterval(zs), console.log("mud engine start"), Ms());
}, 200);
export {
  L as B,
  Ks as C,
  Qs as I,
  ms as O,
  Xs as P,
  ss as S,
  cs as Y,
  qs as a,
  ae as b,
  Hs as c,
  Ls as d,
  Tr as e,
  Le as f,
  Ne as g,
  Vs as h,
  Qe as i,
  Yr as j,
  Se as k,
  Zs as m,
  Js as o,
  wr as s,
  Ws as t,
};

//#region phone/service-worker.ts
function e(e) {
	let i = null;
	if (e !== null) try {
		i = JSON.parse(e);
	} catch {
		i = null;
	}
	if (typeof i != "object" || !i || Array.isArray(i)) return t;
	let a = i;
	return {
		tag: typeof a.tag == "string" ? a.tag : t.tag,
		title: typeof a.title == "string" && a.title !== "" ? a.title : t.title,
		body: typeof a.body == "string" ? a.body : t.body,
		badge: n(a.badge),
		url: typeof a.url == "string" && a.url !== "" ? a.url : t.url,
		buttons: r(a.buttons) ?? []
	};
}
var t = {
	tag: "build-manager",
	title: "Build Manager",
	body: "Open Build Manager to see what is new.",
	badge: null,
	url: "./",
	buttons: []
};
function n(e) {
	return typeof e == "number" && Number.isInteger(e) && e >= 0 ? e : null;
}
function r(e) {
	if (!Array.isArray(e)) return e === void 0 ? [] : null;
	let t = [];
	for (let n of e) {
		if (typeof n != "object" || !n) continue;
		let { action: e, title: r, intent: a } = n;
		typeof e == "string" && e !== "" && typeof r == "string" && i(a) && t.push({
			action: e,
			title: r,
			intent: a
		});
	}
	return t;
}
function i(e) {
	if (typeof e != "object" || !e) return !1;
	let t = e;
	return typeof t.kind == "string" && typeof t.v == "number" && (t.project === null || typeof t.project == "string") && "args" in t;
}
async function a(t, n) {
	let r = e(t), i = {
		url: r.url,
		buttons: r.buttons
	}, a = r.buttons.length > 0 ? {
		body: r.body,
		tag: r.tag,
		data: i,
		actions: r.buttons.map((e) => ({
			action: e.action,
			title: e.title
		}))
	} : {
		body: r.body,
		tag: r.tag,
		data: i
	};
	if (await n.showNotification(r.title, a), r.badge !== null) try {
		await n.badge.show(r.badge);
	} catch {}
}
async function o(e, n, r) {
	let i = s(n);
	if (i === null) {
		await r.openApp(t.url);
		return;
	}
	let a = e === "" ? void 0 : i.buttons.find((t) => t.action === e);
	a === void 0 ? await r.openApp(i.url) : await r.act(a.intent, { from: "push" });
}
function s(e) {
	if (typeof e != "object" || !e || Array.isArray(e)) return null;
	let n = e, i = r(n.buttons);
	return i === null ? null : {
		url: typeof n.url == "string" && n.url !== "" ? n.url : t.url,
		buttons: i
	};
}
function c(e) {
	return { async show(t) {
		try {
			t > 0 ? typeof e.setAppBadge == "function" && await e.setAppBadge(t) : typeof e.clearAppBadge == "function" ? await e.clearAppBadge() : typeof e.setAppBadge == "function" && await e.setAppBadge(0);
		} catch {}
	} };
}
var l = "build-manager:act", u = "build-manager-shell-", d = /^build-manager-shell-([0-9a-f]{16})-(?:(\d{12})-)?[0-9a-f]+$/, f = 12, p = "build-manager-pointer", m = "asset-manifest.json", h = [
	"manifest.webmanifest",
	"icon-180.png",
	"icon-192.png",
	"icon-512.png",
	"example-week.json"
], g = /* @__PURE__ */ new Set(["example-week.json"]), _ = 2e3;
function v(e) {
	let t = /* @__PURE__ */ new Set();
	if (typeof e == "object" && e) for (let n of Object.values(e)) {
		if (typeof n != "object" || !n) continue;
		let e = n;
		typeof e.file == "string" && t.add(e.file);
		for (let n of [e.css, e.assets]) if (Array.isArray(n)) for (let e of n) typeof e == "string" && t.add(e);
	}
	return [...t];
}
function y(e) {
	let t = e, n = t.registration.scope, r = (e) => new URL(e, n).href, i = r("./"), s = r("__build-manager/current-shell"), y = r("__build-manager/installed-shell"), b = (e) => [...e].map((e) => e.toString(16).padStart(2, "0")).join(""), x = async (e) => {
		let n = new TextEncoder(), r = [];
		for (let [t, i] of e) r.push(n.encode(`${t}\n${String(i.length)}\n`), i, n.encode("\n"));
		let i = new Uint8Array(r.reduce((e, t) => e + t.length, 0)), a = 0;
		for (let e of r) i.set(e, a), a += e.length;
		return b(new Uint8Array(await t.crypto.subtle.digest("SHA-256", i))).slice(0, 16);
	}, S = async (e) => {
		let n = await (await t.caches.open(p)).match(e);
		return n === void 0 ? null : n.text();
	}, C = async (e, n) => {
		await (await t.caches.open(p)).put(e, new Response(n));
	}, w = async (e, n = null) => {
		let r = n === null || typeof AbortController > "u" ? null : new AbortController(), i = (async () => {
			let n = await t.fetch(e, r === null ? { cache: "reload" } : {
				cache: "reload",
				signal: r.signal
			});
			if (!n.ok) throw Error(`the offline shell could not load ${e} (${String(n.status)})`);
			let i = new Uint8Array(await n.arrayBuffer());
			return {
				bytes: i,
				res: new Response(i, {
					status: n.status,
					statusText: n.statusText,
					headers: n.headers
				})
			};
		})();
		if (n === null) return i;
		let a, o = new Promise((t, i) => {
			a = setTimeout(() => {
				r?.abort(), i(/* @__PURE__ */ Error(`the offline shell did not get all of ${e} in ${String(n)} ms`));
			}, n);
		});
		i.catch(() => void 0);
		try {
			return await Promise.race([i, o]);
		} finally {
			clearTimeout(a);
		}
	}, T = async (e) => {
		let t = await w(r(m), e), n = v(JSON.parse(new TextDecoder().decode(t.bytes)));
		if (n.length === 0) throw Error("the offline shell's file list names no files");
		let a = [[m, t], ["./", await w(i, e)]];
		for (let t of n) a.push([t, await w(r(t), e)]);
		for (let t of h) try {
			a.push([t, await w(r(t), e)]);
		} catch (e) {
			if (g.has(t)) throw e;
		}
		return {
			hash: await x(a.map(([e, t]) => [e, t.bytes])),
			files: a.map(([e, t]) => [e, t.res])
		};
	}, E = (e) => {
		let t = d.exec(e);
		return t === null ? null : {
			hash: t[1],
			order: t[2] === void 0 ? 0 : Number(t[2])
		};
	}, D = async () => {
		let e = 0;
		for (let n of await t.caches.keys()) e = Math.max(e, E(n)?.order ?? 0);
		return e + 1;
	}, O = async (e) => {
		let n = String(await D()).padStart(f, "0"), a = `${u}${e.hash}-${n}-${b(t.crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(4)))}`;
		try {
			let n = await t.caches.open(a);
			for (let [t, i] of e.files) t !== "./" && await n.put(r(t), i);
			for (let [t, r] of e.files) t === "./" && await n.put(i, r);
			return a;
		} catch (e) {
			throw await t.caches.delete(a), e;
		}
	}, k = async (e) => {
		for (let n of await t.caches.keys()) n.startsWith(u) && !e.includes(n) && await t.caches.delete(n);
	}, A = async (e) => {
		let n = E(e), r = null;
		for (let i of await t.caches.keys()) {
			let t = E(i);
			t === null || i === e || n !== null && t.hash === n.hash || (r === null || t.order > r.order || t.order === r.order && i > r.name) && (r = {
				name: i,
				order: t.order
			});
		}
		let i = await S(y), a = i === null ? null : E(i), o = a !== null && a.order >= (n?.order ?? 0) ? i : null;
		await k([
			e,
			r?.name ?? null,
			o
		]);
	}, j = async () => {
		let e = await S(s);
		return e !== null && await t.caches.has(e) ? t.caches.open(e) : null;
	}, M = Promise.resolve(), N = async () => {
		try {
			let e = await S(s);
			if (e === null) return;
			let n = await T(_);
			if (e.startsWith(`${u}${n.hash}-`)) return;
			let r = await O(n);
			if (await S(s) !== e) {
				await t.caches.delete(r);
				return;
			}
			await C(s, r), await A(r);
		} catch {}
	}, P = () => M = M.then(N, N), F = null;
	t.addEventListener("install", ((e) => {
		e.waitUntil((async () => {
			F = await O(await T(null)), await C(y, F), await t.skipWaiting();
		})());
	})), t.addEventListener("activate", ((e) => {
		e.waitUntil((async () => {
			let e = F ?? await S(y);
			e !== null && await t.caches.has(e) && (await C(s, e), await A(e)), await t.clients.claim();
		})());
	})), t.addEventListener("fetch", ((e) => {
		let r = e.request;
		r.method === "GET" && r.url.startsWith(n) && (r.mode === "navigate" ? (e.respondWith((async () => {
			let e = await (await j())?.match(i);
			return e === void 0 ? t.fetch(r) : e;
		})()), e.waitUntil(P())) : e.respondWith((async () => await (await j())?.match(r, { ignoreSearch: !0 }) ?? await t.caches.match(r, { ignoreSearch: !0 }) ?? t.fetch(r))()));
	}));
	let I = {
		showNotification: (e, n) => t.registration.showNotification(e, n),
		badge: c(t.navigator),
		async act(e, r) {
			let i = {
				type: l,
				intent: e,
				options: r
			}, a = await t.clients.matchAll({
				type: "window",
				includeUncontrolled: !0
			});
			a.length > 0 ? a[0].postMessage(i) : (await t.clients.openWindow(n))?.postMessage(i);
		},
		async openApp(e) {
			let r = new URL(e, n).href, i = (await t.clients.matchAll({
				type: "window",
				includeUncontrolled: !0
			}))[0];
			i === void 0 ? await t.clients.openWindow(r) : (i.navigate !== void 0 && i.url !== r && await i.navigate(r).catch(() => void 0), i.focus !== void 0 && await i.focus().catch(() => void 0));
		}
	};
	t.addEventListener("push", ((e) => {
		let t = null;
		try {
			t = e.data === null ? null : e.data.text();
		} catch {
			t = null;
		}
		e.waitUntil(a(t, I));
	})), t.addEventListener("notificationclick", ((e) => {
		e.notification.close(), e.waitUntil(o(e.action ?? "", e.notification.data, I));
	}));
}
function b() {
	let e = globalThis;
	return typeof e.skipWaiting == "function" && e.registration !== void 0 && e.clients !== void 0;
}
b() && y(globalThis);
var x = !0;
//#endregion
export { l as ACT_MESSAGE, x as BUILT, _ as CHECK_TIMEOUT_MS, y as installServiceWorker, c as navigatorBadge, o as onNotificationClick, a as onPush, e as readPush };

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const ACCESSIBILITY_STORAGE_KEY = "fixact-accessibility-mode";

const applyAccessibilityMode = (enabled: boolean) => {
  document.documentElement.setAttribute(
    "data-accessibility",
    enabled ? "high-visibility" : "default",
  );
};

const getInitialAccessibilityMode = () => {
  try {
    return window.localStorage.getItem(ACCESSIBILITY_STORAGE_KEY) === "high-visibility";
  } catch {
    return false;
  }
};

// --- Global crash overlay (helps catch "black screen") ---
function showFatal(err: unknown) {
  try {
    const msg = err instanceof Error ? (err.stack || err.message) : String(err);
    const el = document.createElement("pre");
    el.style.position = "fixed";
    el.style.inset = "0";
    el.style.margin = "0";
    el.style.padding = "16px";
    el.style.background = "#0b0b0f";
    el.style.color = "#fff";
    el.style.font =
      "12px/1.4 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
    el.style.whiteSpace = "pre-wrap";
    el.style.zIndex = "2147483647";
    el.textContent = "FATAL RUNTIME ERROR\n\n" + msg;
    document.body.innerHTML = "";
    document.body.appendChild(el);
  } catch {
    // ignore
  }
}

window.addEventListener("error", (e) =>
  showFatal((e as ErrorEvent).error || (e as ErrorEvent).message)
);
window.addEventListener("unhandledrejection", (e) =>
  showFatal((e as PromiseRejectionEvent).reason)
);

// 1) Normalize accidental /ru SPA path (avoid black /ru route)
(() => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const p = window.location.pathname;

  if (p === base + "/ru" || p === base + "/ru/") {
    try {
      localStorage.setItem("locale", "ru");
      localStorage.setItem("lang", "ru");
      localStorage.setItem("i18nextLng", "ru");
    } catch {}
    window.history.replaceState(
      null,
      "",
      base + "/" + window.location.search + window.location.hash
    );
  }
})();

// 2) Handle ?lang=ru (from 404.html) and clean URL
(() => {
  const url = new URL(window.location.href);
  const lang = url.searchParams.get("lang");
  if (!lang) return;

  try {
    localStorage.setItem("locale", lang);
    localStorage.setItem("lang", lang);
    localStorage.setItem("i18nextLng", lang);
  } catch {}

  url.searchParams.delete("lang");
  window.history.replaceState(null, "", url.pathname + url.search + url.hash);
})();

// 3) GH Pages deep-link decoder (?p=...)
(() => {
  const url = new URL(window.location.href);
  const p = url.searchParams.get("p");
  if (!p) return;

  // Make idempotent: remove p first
  url.searchParams.delete("p");

  let decoded = "";
  try {
    decoded = decodeURIComponent(p);
  } catch {
    decoded = p;
  }

  // If someone encoded a full URL, normalize to path+query+hash
  try {
    const asUrl = new URL(decoded);
    decoded = asUrl.pathname + asUrl.search + asUrl.hash;
  } catch {
    // not a full URL - ok
  }

  if (!decoded.startsWith("/")) decoded = "/" + decoded;

  const base = import.meta.env.BASE_URL.replace(/\/$/, ""); // "/everlegends-platform"
  if (!decoded.startsWith(base + "/")) decoded = base + decoded;

  window.history.replaceState(null, "", decoded);
})();

// --- Boot React ---
try {
applyAccessibilityMode(getInitialAccessibilityMode());
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (err) {
  showFatal(err);
}
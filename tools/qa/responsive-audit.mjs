import { chromium } from "@playwright/test";
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "qa-output");
const SHOT_DIR = path.join(OUT_DIR, "screenshots");
const REPORT = path.join(OUT_DIR, "responsive-audit.json");

fs.mkdirSync(SHOT_DIR, { recursive: true });

const viewports = [
  { name: "mobile-320", width: 320, height: 900 },
  { name: "mobile-360", width: 360, height: 900 },
  { name: "mobile-375", width: 375, height: 900 },
  { name: "mobile-390", width: 390, height: 900 },
  { name: "mobile-414", width: 414, height: 900 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "small-laptop-1024", width: 1024, height: 768 },
  { name: "laptop-1366", width: 1366, height: 768 },
  { name: "desktop-1440", width: 1440, height: 900 },
  { name: "large-1920", width: 1920, height: 1080 },
];

const routes = [
  { locale: "ru", url: "http://127.0.0.1:4177/ru/" },
  { locale: "en", url: "http://127.0.0.1:4177/" },
];

const sectionSelectors = [
  "header",
  "main",
  "#rewards",
  "#system",
  "footer",
];

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: ROOT,
      shell: true,
      stdio: "inherit",
    });

    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} ${args.join(" ")} failed with code ${code}`));
    });
  });
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForServer(url, timeoutMs = 30000) {
  const started = Date.now();

  while (Date.now() - started < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      // keep waiting
    }
    await wait(500);
  }

  throw new Error(`Preview server did not become ready: ${url}`);
}

function startPreview() {
  return spawn("npx", ["vite", "preview", "--host", "127.0.0.1", "--port", "4177"], {
    cwd: ROOT,
    shell: true,
    stdio: "pipe",
  });
}

await run("npm", ["run", "build"]);

const preview = startPreview();

process.on("exit", () => {
  try {
    preview.kill();
  } catch {
    // ignore
  }
});

await waitForServer("http://127.0.0.1:4177/");

const browser = await chromium.launch();
const results = [];

for (const route of routes) {
  for (const viewport of viewports) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      deviceScaleFactor: 1,
    });

    const page = await context.newPage();
    await page.goto(route.url, { waitUntil: "networkidle" });
    await page.waitForTimeout(1000);

    const audit = await page.evaluate((sectionSelectors) => {
      const doc = document.documentElement;
      const body = document.body;

      const documentWidth = Math.max(
        doc.scrollWidth,
        body.scrollWidth,
        doc.clientWidth,
        body.clientWidth
      );

      const viewportWidth = window.innerWidth;

      const hasClippingAncestor = (el) => {
        let current = el.parentElement;

        while (current) {
          const style = window.getComputedStyle(current);
          const className = typeof current.className === "string" ? current.className : "";

          const clipsX =
            style.overflowX === "hidden" ||
            style.overflowX === "clip" ||
            style.overflow === "hidden" ||
            style.overflow === "clip" ||
            className.includes("overflow-hidden") ||
            className.includes("overflow-x-hidden") ||
            className.includes("overflow-clip");

          if (clipsX) return true;

          current = current.parentElement;
        }

        return false;
      };

      const overflowElements = Array.from(document.querySelectorAll("*"))
        .map((el) => {
          const rect = el.getBoundingClientRect();
          const className = typeof el.className === "string" ? el.className : "";

          return {
            tag: el.tagName.toLowerCase(),
            id: el.id || "",
            className,
            text: (el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 120),
            left: Math.round(rect.left),
            right: Math.round(rect.right),
            width: Math.round(rect.width),
            height: Math.round(rect.height),
            isInsideClippedOwner: hasClippingAncestor(el),
          };
        })
        .filter((x) =>
          x.width > 0 &&
          x.height > 0 &&
          !x.isInsideClippedOwner &&
          (x.left < -1 || x.right > viewportWidth + 1)
        )
        .slice(0, 30);

      const tinyTextElements = Array.from(document.querySelectorAll("p, span, a, button, li, td, th, h1, h2, h3, h4"))
        .map((el) => {
          const rect = el.getBoundingClientRect();
          const style = window.getComputedStyle(el);
          return {
            tag: el.tagName.toLowerCase(),
            id: el.id || "",
            className: typeof el.className === "string" ? el.className : "",
            text: (el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 120),
            width: Math.round(rect.width),
            height: Math.round(rect.height),
            fontSize: style.fontSize,
            lineHeight: style.lineHeight,
            overflowX: style.overflowX,
            overflowY: style.overflowY,
          };
        })
        .filter((x) => x.text.length > 20 && x.width > 0 && x.width < 90)
        .slice(0, 30);

      const sectionReports = sectionSelectors.map((selector) => {
        const el = document.querySelector(selector);
        if (!el) {
          return { selector, exists: false };
        }

        const rect = el.getBoundingClientRect();
        return {
          selector,
          exists: true,
          top: Math.round(rect.top),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          scrollWidth: el.scrollWidth,
          clientWidth: el.clientWidth,
          hasInternalHorizontalOverflow: el.scrollWidth > el.clientWidth + 1,
        };
      });

      const rewards = document.querySelector("#rewards");
      const rewardsReport = rewards
        ? {
            exists: true,
            width: Math.round(rewards.getBoundingClientRect().width),
            scrollWidth: rewards.scrollWidth,
            clientWidth: rewards.clientWidth,
            hasHorizontalOverflow: rewards.scrollWidth > rewards.clientWidth + 1,
            imageCount: rewards.querySelectorAll("img").length,
            buttonCount: rewards.querySelectorAll("button").length,
            cardLikeCount: rewards.querySelectorAll("[class*='card'], [class*='rounded']").length,
            textLength: (rewards.textContent || "").trim().length,
          }
        : { exists: false };

      return {
        viewportWidth,
        documentWidth,
        hasPageHorizontalOverflow: documentWidth > viewportWidth + 1,
        overflowElements,
        tinyTextElements,
        sectionReports,
        rewardsReport,
      };
    }, sectionSelectors);

    const baseName = `${route.locale}-${viewport.name}`;

    await page.screenshot({
      path: path.join(SHOT_DIR, `${baseName}-full.png`),
      fullPage: true,
    });

    for (const selector of sectionSelectors) {
      const locator = page.locator(selector).first();
      if (await locator.count()) {
        const safeName = selector.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "") || "section";
        await locator.screenshot({
          path: path.join(SHOT_DIR, `${baseName}-${safeName}.png`),
        }).catch(() => {});
      }
    }

    if (viewport.width <= 414) {
      const menuButton = page.locator("button[aria-label*='menu'], button[aria-label*='меню'], button[aria-label*='Menu'], button[aria-label*='Меню']").first();

      if (await menuButton.count()) {
        await menuButton.click();
        await page.waitForTimeout(500);

        const openMenuAudit = await page.evaluate(() => {
          const doc = document.documentElement;
          const body = document.body;
          const documentWidth = Math.max(
            doc.scrollWidth,
            body.scrollWidth,
            doc.clientWidth,
            body.clientWidth
          );

          return {
            documentWidth,
            viewportWidth: window.innerWidth,
            hasPageHorizontalOverflow: documentWidth > window.innerWidth + 1,
            bodyOverflow: window.getComputedStyle(document.body).overflow,
          };
        });

        await page.screenshot({
          path: path.join(SHOT_DIR, `${baseName}-menu-open.png`),
          fullPage: true,
        });

        audit.mobileMenuOpenAudit = openMenuAudit;
      }
    }

    const status =
      audit.hasPageHorizontalOverflow ||
      audit.overflowElements.length > 0 ||
      audit.sectionReports.some((x) => x.exists && x.hasInternalHorizontalOverflow) ||
      audit.rewardsReport.hasHorizontalOverflow ||
      (audit.mobileMenuOpenAudit && audit.mobileMenuOpenAudit.hasPageHorizontalOverflow)
        ? "FAIL"
        : "PASS";

    results.push({
      locale: route.locale,
      viewport,
      status,
      audit,
    });

    await context.close();
  }
}

await browser.close();
preview.kill();

const summary = {
  generatedAt: new Date().toISOString(),
  status: results.some((x) => x.status === "FAIL") ? "FAIL" : "PASS",
  results,
};

fs.writeFileSync(REPORT, JSON.stringify(summary, null, 2), "utf8");

console.log(`RESPONSIVE_AUDIT_STATUS=${summary.status}`);
console.log(`RESPONSIVE_AUDIT_REPORT=${REPORT}`);

for (const item of results) {
  if (item.status === "FAIL") {
    console.log(`FAIL ${item.locale} ${item.viewport.name}`);
    console.log(JSON.stringify({
      hasPageHorizontalOverflow: item.audit.hasPageHorizontalOverflow,
      overflowElements: item.audit.overflowElements.slice(0, 5),
      rewardsReport: item.audit.rewardsReport,
      mobileMenuOpenAudit: item.audit.mobileMenuOpenAudit || null,
    }, null, 2));
  }
}


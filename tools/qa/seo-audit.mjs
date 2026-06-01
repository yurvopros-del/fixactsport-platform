import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const ORIGIN = "https://www.fixactsport.org";
const STATIC_SITEMAP_URLS = [
  `${ORIGIN}/`,
  `${ORIGIN}/ru/`,
  `${ORIGIN}/beta/`,
];
const LEGACY_SITEMAP_URLS = [
  `${ORIGIN}/beta`,
  `${ORIGIN}/ru/beta`,
  `${ORIGIN}/ru/beta/`,
];
const LEGAL_COMPONENTS = new Set(["PrivacyPolicy", "CookiePolicy", "UserAgreement"]);
const EXPECTED_LEGAL_DOCUMENT_TYPES = new Set(["privacy", "cookies", "agreement"]);

const EXPECTED_HTML_SNIPPETS = [
  {
    name: "canonical",
    value: '<link rel="canonical" href="https://www.fixactsport.org/" />',
  },
  {
    name: "hreflang ru",
    value: '<link rel="alternate" hreflang="ru" href="https://www.fixactsport.org/ru/" />',
  },
  {
    name: "hreflang en",
    value: '<link rel="alternate" hreflang="en" href="https://www.fixactsport.org/" />',
  },
  {
    name: "hreflang x-default",
    value: '<link rel="alternate" hreflang="x-default" href="https://www.fixactsport.org/" />',
  },
  { name: "favicon", value: "faviconrus.png?v=003" },
  { name: "og:title", value: 'property="og:title"' },
  { name: "og:image", value: 'property="og:image"' },
  { name: "twitter:card", value: 'name="twitter:card"' },
  { name: "JSON-LD script", value: "application/ld+json" },
];

const results = [];

function check(label, ok, detail = "") {
  results.push({ label, ok: Boolean(ok), detail });
}

function readFile(relPath) {
  const absolutePath = path.join(ROOT, relPath);

  try {
    const bytes = fs.readFileSync(absolutePath);
    check(`${relPath} is readable`, true);
    return {
      bytes,
      text: bytes.toString("utf8"),
    };
  } catch (error) {
    check(`${relPath} is readable`, false, error.message);
    return {
      bytes: Buffer.alloc(0),
      text: "",
    };
  }
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function normalizePathname(pathname) {
  if (pathname === "/") return pathname;
  return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
}

function toUrl(pathname) {
  return `${ORIGIN}${pathname === "/" ? "/" : pathname}`;
}

function pathFromUrl(url) {
  return normalizePathname(new URL(url).pathname);
}

function unique(values) {
  return [...new Set(values)];
}

function assertHtmlShell(label, html) {
  for (const snippet of EXPECTED_HTML_SNIPPETS) {
    check(`${label} contains ${snippet.name}`, html.includes(snippet.value), snippet.value);
  }

  check(
    `${label} contains meta description`,
    /<meta\s+name="description"\s+content="[^"]+"\s*\/?>/.test(html),
  );

  const jsonLdMatch = html.match(
    /<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/,
  );

  check(`${label} has parseable JSON-LD`, Boolean(jsonLdMatch));

  if (!jsonLdMatch) return;

  try {
    const jsonLd = JSON.parse(jsonLdMatch[1].trim());
    const graph = Array.isArray(jsonLd["@graph"]) ? jsonLd["@graph"] : [];
    const types = new Set(
      graph
        .flatMap((entry) => entry?.["@type"])
        .filter(Boolean)
        .flat(),
    );

    check(`${label} JSON-LD context is schema.org`, jsonLd["@context"] === "https://schema.org");
    check(`${label} JSON-LD has @graph`, Array.isArray(jsonLd["@graph"]));

    for (const type of ["Organization", "WebSite", "SoftwareApplication"]) {
      check(`${label} JSON-LD graph contains ${type}`, types.has(type));
    }
  } catch (error) {
    check(`${label} has parseable JSON-LD`, false, error.message);
  }
}

function assertRobots(label, file) {
  const firstThree = Array.from(file.bytes.subarray(0, 3));

  check(
    `${label} starts with bytes 85,115,101`,
    firstThree[0] === 85 && firstThree[1] === 115 && firstThree[2] === 101,
    `actual=${firstThree.join(",")}`,
  );
  check(
    `${label} is UTF-8 BOM-free`,
    !(firstThree[0] === 239 && firstThree[1] === 187 && firstThree[2] === 191),
    `actual=${firstThree.join(",")}`,
  );
  check(`${label} contains User-agent: *`, file.text.includes("User-agent: *"));
  check(`${label} contains Allow: /`, file.text.includes("Allow: /"));
  check(
    `${label} contains canonical sitemap URL`,
    file.text.includes("Sitemap: https://www.fixactsport.org/sitemap.xml"),
  );
}

function assertBetaStaticPage(label, file) {
  check(`${label} is present`, file.bytes.length > 0);
  check(
    `${label} has canonical beta slash URL`,
    file.text.includes('<link rel="canonical" href="https://www.fixactsport.org/beta/" />'),
  );
  check(
    `${label} does not meta-refresh`,
    !/<meta\b[^>]*http-equiv=["']?refresh["']?[^>]*>/i.test(file.text),
  );
  check(`${label} does not reference legacy beta-testing URL`, !file.text.includes("/beta-testing"));
}

function assertRuStaticPage(label, file) {
  check(`${label} is present`, file.bytes.length > 0);
  check(`${label} declares Russian language`, /<html\b[^>]*\blang="ru"/.test(file.text));
  check(
    `${label} has canonical RU slash URL`,
    file.text.includes('<link rel="canonical" href="https://www.fixactsport.org/ru/" />'),
  );
  check(
    `${label} has hreflang ru`,
    file.text.includes('<link rel="alternate" hreflang="ru" href="https://www.fixactsport.org/ru/" />'),
  );
  check(
    `${label} has hreflang en`,
    file.text.includes('<link rel="alternate" hreflang="en" href="https://www.fixactsport.org/" />'),
  );
  check(
    `${label} has hreflang x-default`,
    file.text.includes('<link rel="alternate" hreflang="x-default" href="https://www.fixactsport.org/" />'),
  );
  check(
    `${label} has meta description`,
    /<meta\s+name="description"\s+content="[^"]+"\s*\/?>/.test(file.text),
  );
  check(
    `${label} does not meta-refresh`,
    !/<meta\b[^>]*http-equiv=["']?refresh["']?[^>]*>/i.test(file.text),
  );
  check(`${label} does not reference /ru as SPA-only route`, !file.text.includes('href="/ru"'));
}

function extractLocs(xml) {
  return Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g), (match) => match[1]);
}

function findUrlBlock(xml, loc) {
  const pattern = new RegExp(
    `<url>[\\s\\S]*?<loc>${escapeRegExp(loc)}</loc>[\\s\\S]*?</url>`,
  );
  return xml.match(pattern)?.[0] ?? "";
}

function hasAlternate(block, hreflang, href) {
  return new RegExp(
    `<xhtml:link\\b(?=[^>]*\\brel="alternate")(?=[^>]*\\bhreflang="${escapeRegExp(
      hreflang,
    )}")(?=[^>]*\\bhref="${escapeRegExp(href)}")[^>]*\\/?\\s*>`,
  ).test(block);
}

function extractRouteEntries(appSource) {
  return Array.from(appSource.matchAll(/<Route\b[^>]*\/?>/g), (match) => {
    const tag = match[0];
    const pathMatch = tag.match(/\bpath=(["'])(.*?)\1/);
    const elementMatch = tag.match(/\belement=\{<([A-Za-z0-9_]+)/);

    if (!pathMatch) return null;

    return {
      path: normalizePathname(pathMatch[2]),
      element: elementMatch?.[1] ?? "",
    };
  }).filter(Boolean);
}

function extractPathLiterals(source) {
  return unique(
    Array.from(source.matchAll(/["'](\/[A-Za-z0-9_/-]+)["']/g), (match) =>
      normalizePathname(match[1]),
    ),
  );
}

function extractLegalDocumentTypes(source) {
  const typeMatch = source.match(/type\s+LegalDocumentType\s*=\s*([^;]+);/);
  const copyMatch = source.match(/const\s+copy:\s*Record<LegalDocumentType[\s\S]*?=\s*\{/);
  const sourceForTypes = `${typeMatch?.[1] ?? ""}\n${copyMatch ? source : ""}`;

  return new Set(
    Array.from(sourceForTypes.matchAll(/["'](privacy|cookies|agreement)["']/g), (match) => match[1]),
  );
}

function isLegalPath(pathname) {
  return /(^|\/)(privacy|cookies|privacy-policy|cookie-policy|user-agreement)$/.test(pathname);
}

function assertRouteTruth({ appSource, footerSource, cookieBannerSource, legalDocumentSource }) {
  const routeEntries = extractRouteEntries(appSource);
  const publicRouteEntries = routeEntries.filter((route) => route.path !== "*");
  const appRoutePaths = new Set(publicRouteEntries.map((route) => route.path));
  const appLegalPaths = unique(
    publicRouteEntries
      .filter((route) => LEGAL_COMPONENTS.has(route.element))
      .map((route) => route.path),
  );
  const footerLegalPaths = extractPathLiterals(footerSource).filter(isLegalPath);
  const cookieLegalPaths = extractPathLiterals(cookieBannerSource).filter(isLegalPath);
  const linkedLegalPaths = unique([...footerLegalPaths, ...cookieLegalPaths]);
  const legalDocumentTypes = extractLegalDocumentTypes(legalDocumentSource);

  check("App.tsx route inventory is discoverable", publicRouteEntries.length > 0);
  check("App.tsx legal route inventory is discoverable", appLegalPaths.length > 0);
  check("Footer.tsx legal links are discoverable", footerLegalPaths.length > 0);
  check("CookieBanner.tsx legal links are discoverable", cookieLegalPaths.length > 0);

  for (const type of EXPECTED_LEGAL_DOCUMENT_TYPES) {
    check(`LegalDocumentPage supports ${type}`, legalDocumentTypes.has(type));
  }

  for (const legalPath of linkedLegalPaths) {
    check(
      `linked legal path has App.tsx legal route: ${legalPath}`,
      appLegalPaths.includes(legalPath),
      `appLegalPaths=${appLegalPaths.join(", ")}`,
    );
  }

  for (const legalPath of appLegalPaths) {
    check(
      `App.tsx legal route is linked by Footer/CookieBanner: ${legalPath}`,
      linkedLegalPaths.includes(legalPath),
      `linkedLegalPaths=${linkedLegalPaths.join(", ")}`,
    );
  }

  return {
    appRoutePaths,
    appLegalPaths,
    footerLegalPaths,
    cookieLegalPaths,
    linkedLegalPaths,
  };
}

function assertSitemapShape(label, xml, expectedUrls) {
  const locs = extractLocs(xml);
  const uniqueLocs = new Set(locs);
  const openUrlCount = (xml.match(/<url>/g) ?? []).length;
  const closeUrlCount = (xml.match(/<\/url>/g) ?? []).length;

  check(`${label} has XML declaration`, xml.trimStart().startsWith('<?xml version="1.0"'));
  check(`${label} has urlset root`, /<urlset\b[\s\S]*>/.test(xml) && xml.includes("</urlset>"));
  check(
    `${label} has sitemap namespace`,
    xml.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"'),
  );
  check(
    `${label} has xhtml namespace`,
    xml.includes('xmlns:xhtml="http://www.w3.org/1999/xhtml"'),
  );
  check(`${label} has balanced url entries`, openUrlCount > 0 && openUrlCount === closeUrlCount);
  check(`${label} has one loc per url entry`, locs.length === openUrlCount);
  check(`${label} has no duplicate loc entries`, uniqueLocs.size === locs.length);

  for (const loc of locs) {
    let valid = false;
    try {
      const parsed = new URL(loc);
      valid = parsed.origin === ORIGIN && parsed.href === loc;
    } catch {
      valid = false;
    }
    check(`${label} loc is canonical URL: ${loc}`, valid);
  }

  for (const url of expectedUrls) {
    check(`${label} contains ${url}`, uniqueLocs.has(url));
  }

  check(
    `${label} contains only expected loc entries`,
    locs.length === expectedUrls.length && locs.every((loc) => expectedUrls.includes(loc)),
    `locs=${locs.join(", ")}`,
  );

  for (const url of LEGACY_SITEMAP_URLS) {
    check(`${label} omits non-static deep link ${url}`, !uniqueLocs.has(url));
  }

  for (const loc of [`${ORIGIN}/`, `${ORIGIN}/ru/`]) {
    const block = findUrlBlock(xml, loc);
    check(`${label} has url block for ${loc}`, Boolean(block));
    check(`${label} ${loc} has hreflang en`, hasAlternate(block, "en", `${ORIGIN}/`));
    check(`${label} ${loc} has hreflang ru`, hasAlternate(block, "ru", `${ORIGIN}/ru/`));
    check(
      `${label} ${loc} has hreflang x-default`,
      hasAlternate(block, "x-default", `${ORIGIN}/`),
    );
  }
}

function assertSitemapRouteParity(label, xml, appRoutePaths) {
  const locs = extractLocs(xml);

  for (const loc of locs) {
    let pathname = "";
    try {
      pathname = pathFromUrl(loc);
    } catch {
      check(`${label} route parity for ${loc}`, false, "loc is not a parseable URL");
      continue;
    }

    check(
      `${label} sitemap path has exact App.tsx route: ${pathname}`,
      appRoutePaths.has(pathname),
      `appRoutes=${[...appRoutePaths].join(", ")}`,
    );
  }
}

function assertLegalSitemapParity(label, xml, routeTruth) {
  const locPaths = extractLocs(xml).map(pathFromUrl);
  const sitemapLegalPaths = locPaths.filter(isLegalPath);

  check(
    `${label} omits legal deep links until static 200 pages exist`,
    sitemapLegalPaths.length === 0,
    `sitemapLegalPaths=${sitemapLegalPaths.join(", ")}`,
  );

  for (const legalPath of sitemapLegalPaths) {
    check(
      `${label} legal URL matches App.tsx legal route ${legalPath}`,
      routeTruth.appLegalPaths.includes(legalPath),
      `appLegalPaths=${routeTruth.appLegalPaths.join(", ")}`,
    );
  }
}

const sourceIndex = readFile("index.html");
const sourceRobots = readFile(path.join("public", "robots.txt"));
const sourceSitemap = readFile(path.join("public", "sitemap.xml"));
const sourceRuIndex = readFile(path.join("public", "ru", "index.html"));
const sourceBetaIndex = readFile(path.join("public", "beta", "index.html"));
const appSource = readFile(path.join("src", "App.tsx"));
const footerSource = readFile(path.join("src", "components", "Footer.tsx"));
const cookieBannerSource = readFile(path.join("src", "components", "CookieBanner.tsx"));
const legalDocumentSource = readFile(
  path.join("src", "components", "legal", "LegalDocumentPage.tsx"),
);
const distIndex = readFile(path.join("dist", "index.html"));
const distRobots = readFile(path.join("dist", "robots.txt"));
const distSitemap = readFile(path.join("dist", "sitemap.xml"));
const distRuIndex = readFile(path.join("dist", "ru", "index.html"));
const distBetaIndex = readFile(path.join("dist", "beta", "index.html"));

const routeTruth = assertRouteTruth({
  appSource: appSource.text,
  footerSource: footerSource.text,
  cookieBannerSource: cookieBannerSource.text,
  legalDocumentSource: legalDocumentSource.text,
});
const expectedSitemapUrls = unique([
  ...STATIC_SITEMAP_URLS,
]);

assertHtmlShell("index.html", sourceIndex.text);
assertHtmlShell("dist/index.html", distIndex.text);
assertRobots("public/robots.txt", sourceRobots);
assertRobots("dist/robots.txt", distRobots);
assertRuStaticPage("public/ru/index.html", sourceRuIndex);
assertRuStaticPage("dist/ru/index.html", distRuIndex);
assertBetaStaticPage("public/beta/index.html", sourceBetaIndex);
assertBetaStaticPage("dist/beta/index.html", distBetaIndex);
assertSitemapShape("public/sitemap.xml", sourceSitemap.text, expectedSitemapUrls);
assertSitemapShape("dist/sitemap.xml", distSitemap.text, expectedSitemapUrls);
assertSitemapRouteParity("public/sitemap.xml", sourceSitemap.text, routeTruth.appRoutePaths);
assertSitemapRouteParity("dist/sitemap.xml", distSitemap.text, routeTruth.appRoutePaths);
assertLegalSitemapParity("public/sitemap.xml", sourceSitemap.text, routeTruth);
assertLegalSitemapParity("dist/sitemap.xml", distSitemap.text, routeTruth);

const failures = results.filter((result) => !result.ok);

console.log("SEO audit report");
console.log(`SEO_AUDIT_ASSERTIONS=${results.length}`);

if (failures.length > 0) {
  for (const failure of failures) {
    const detail = failure.detail ? ` (${failure.detail})` : "";
    console.log(`FAIL ${failure.label}${detail}`);
  }
  console.log(`SEO_AUDIT_FAILURES=${failures.length}`);
  console.log("SEO_AUDIT_STATUS=FAIL");
  process.exit(1);
}

console.log("SEO_AUDIT_FAILURES=0");
console.log("SEO_AUDIT_STATUS=PASS");

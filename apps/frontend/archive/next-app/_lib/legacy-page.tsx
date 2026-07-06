import { readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";

/** Inlined so cart runs synchronously before `<main>` parses. Next `beforeInteractive` loads `/shared.js` async and races streamed HTML + clicks. */
const INLINE_SHARED_JS = readFileSync(
  path.join(process.cwd(), "public", "shared.js"),
  "utf8"
);

type LegacyPageParts = {
  title: string;
  styleText: string;
  bodyHtml: string;
  inlineScripts: string[];
  externalScripts: string[];
};

const LINK_REPLACEMENTS: Array<[string, string]> = [
  ["index.html", "/"],
  ["sugardown_website.html", "/"],
  ["products.html", "/products"],
  ["about.html", "/about"],
  ["contact.html", "/contact"],
  ["cart.html", "/cart"],
  ["checkout.html", "/checkout"],
  ["confirmation.html", "/confirmation"],
  ["track.html", "/track"],
  ["terms.html", "/terms"],
  ["privacy.html", "/privacy"],
  ["refund.html", "/refund"],
  ["shared.js", "/shared.js"],
];

const SOURCE_FILE_MAP: Record<string, string> = {
  "sugardown_website.html": path.join(process.cwd(), "legacy-pages", "home.page"),
  "products.html": path.join(process.cwd(), "legacy-pages", "products.page"),
  "about.html": path.join(process.cwd(), "legacy-pages", "about.page"),
  "contact.html": path.join(process.cwd(), "legacy-pages", "contact.page"),
  "cart.html": path.join(process.cwd(), "legacy-pages", "cart.page"),
  "checkout.html": path.join(process.cwd(), "legacy-pages", "checkout.page"),
  "confirmation.html": path.join(process.cwd(), "legacy-pages", "confirmation.page"),
  "track.html": path.join(process.cwd(), "legacy-pages", "track.page"),
  "terms.html": path.join(process.cwd(), "legacy-pages", "terms.page"),
  "privacy.html": path.join(process.cwd(), "legacy-pages", "privacy.page"),
  "refund.html": path.join(process.cwd(), "legacy-pages", "refund.page"),
};

const CSS_FILE_MAP: Record<string, string> = {
  "sugardown_website.html": path.join(process.cwd(), "legacy-css", "home.css"),
  "products.html": path.join(process.cwd(), "legacy-css", "products.css"),
  "about.html": path.join(process.cwd(), "legacy-css", "about.css"),
  "contact.html": path.join(process.cwd(), "legacy-css", "contact.css"),
  "cart.html": path.join(process.cwd(), "legacy-css", "cart.css"),
  "checkout.html": path.join(process.cwd(), "legacy-css", "checkout.css"),
  "confirmation.html": path.join(process.cwd(), "legacy-css", "confirmation.css"),
  "track.html": path.join(process.cwd(), "legacy-css", "track.css"),
  "terms.html": path.join(process.cwd(), "legacy-css", "home.css"),
  "privacy.html": path.join(process.cwd(), "legacy-css", "home.css"),
  "refund.html": path.join(process.cwd(), "legacy-css", "home.css"),
};

function rewriteLinks(input: string): string {
  return LINK_REPLACEMENTS.reduce(
    (html, [from, to]) => html.replaceAll(from, to),
    input
  );
}

function parseLegacyHtml(source: string, styleText: string): LegacyPageParts {
  const rewritten = rewriteLinks(source);

  const titleMatch = rewritten.match(/<title>([\s\S]*?)<\/title>/i);
  const title = titleMatch?.[1]?.trim() || "Sugar Down";

  const bodyMatch = rewritten.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const bodyRaw = bodyMatch?.[1] || rewritten;

  const externalScripts = [...bodyRaw.matchAll(/<script[^>]*src="([^"]+)"[^>]*><\/script>/gi)].map(
    (m) => m[1]
  );
  const inlineScripts = [...bodyRaw.matchAll(/<script>([\s\S]*?)<\/script>/gi)].map(
    (m) => m[1]
  );

  const internalStyles = [...rewritten.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map(
    (m) => m[1]
  ).join("\n");

  const bodyHtml = bodyRaw
    .replace(/<script[^>]*src="[^"]+"[^>]*><\/script>/gi, "")
    .replace(/<script>[\s\S]*?<\/script>/gi, "");

  return { 
    title, 
    styleText: styleText + "\n" + internalStyles, 
    bodyHtml, 
    inlineScripts, 
    externalScripts 
  };

}

export async function loadLegacyPage(fileName: string): Promise<LegacyPageParts> {
  const absolutePath = SOURCE_FILE_MAP[fileName];
  const cssPath = CSS_FILE_MAP[fileName];
  if (!absolutePath) {
    throw new Error(`Unsupported legacy page: ${fileName}`);
  }
  if (!cssPath) {
    throw new Error(`Missing CSS map for legacy page: ${fileName}`);
  }
  const source = await readFile(absolutePath, "utf8");
  const styleText = await readFile(cssPath, "utf8");
  return parseLegacyHtml(source, styleText);
}

const GLOBAL_LEGACY_CSS = `
/* —— Modern navigation (all legacy pages) —— */
nav {
  padding: 14px 5% !important;
  gap: 16px !important;
  align-items: center !important;
  background: rgba(11, 36, 22, 0.94) !important;
  backdrop-filter: blur(16px) saturate(1.15) !important;
  -webkit-backdrop-filter: blur(16px) saturate(1.15) !important;
  border-bottom: 1px solid rgba(200, 151, 42, 0.22) !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2) !important;
}
.nl span:first-child {
  letter-spacing: 0.1em !important;
  font-size: 19px !important;
}
.nl span:last-child {
  letter-spacing: 0.2em !important;
  opacity: 0.9;
}
.nm {
  gap: 4px 8px !important;
}
.nm a {
  padding: 9px 14px !important;
  border-radius: 10px !important;
  font-size: 13px !important;
  font-weight: 500 !important;
  transition: background 0.2s ease, color 0.2s ease !important;
}
.nm a:hover,
.nm a.act {
  color: #f0d78c !important;
  background: rgba(200, 151, 42, 0.14) !important;
}
.nav-actions {
  display: flex !important;
  align-items: center !important;
  gap: 10px !important;
  flex-shrink: 0 !important;
}
.nav-cart {
  position: relative !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  width: 46px !important;
  height: 46px !important;
  border-radius: 14px !important;
  color: rgba(255, 255, 255, 0.92) !important;
  background: rgba(255, 255, 255, 0.07) !important;
  border: 1px solid rgba(255, 255, 255, 0.14) !important;
  text-decoration: none !important;
  transition: background 0.2s, border-color 0.2s, transform 0.2s, color 0.2s !important;
}
.nav-cart:hover {
  background: rgba(200, 151, 42, 0.18) !important;
  border-color: rgba(200, 151, 42, 0.38) !important;
  color: #fff !important;
}
.nav-cart.act {
  color: #f5d78e !important;
  border-color: rgba(200, 151, 42, 0.45) !important;
  background: rgba(200, 151, 42, 0.12) !important;
  box-shadow: 0 0 0 1px rgba(200, 151, 42, 0.28) !important;
}
.nav-cart-ic {
  display: block !important;
}
.nav-cart .cart-badge {
  position: absolute !important;
  top: 5px !important;
  right: 5px !important;
  min-width: 18px !important;
  height: 18px !important;
  padding: 0 5px !important;
  font-size: 10px !important;
  font-weight: 800 !important;
  border-radius: 999px !important;
  background: linear-gradient(145deg, #e0b347, #c8972a) !important;
  color: #0f1a13 !important;
  display: none !important;
  align-items: center !important;
  justify-content: center !important;
  line-height: 1 !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.35) !important;
}
.nc {
  padding: 12px 22px !important;
  border-radius: 999px !important;
  font-size: 13px !important;
  font-weight: 700 !important;
  letter-spacing: 0.03em !important;
  background: linear-gradient(145deg, #e0b347, #c8972a) !important;
  color: #0f1a13 !important;
  border: none !important;
  box-shadow: 0 4px 22px rgba(200, 151, 42, 0.42) !important;
  transition: transform 0.2s ease, box-shadow 0.2s ease !important;
}
.nc:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 10px 32px rgba(200, 151, 42, 0.48) !important;
  color: #0f1a13 !important;
}
@media (max-width: 900px) {
  nav {
    flex-wrap: wrap !important;
    row-gap: 12px !important;
  }
  .nl {
    flex: 1 1 auto !important;
    min-width: 0 !important;
  }
  .nav-actions {
    flex-shrink: 0 !important;
  }
  .nm {
    order: 3 !important;
    width: 100% !important;
    justify-content: center !important;
    flex-wrap: wrap !important;
  }
}

.floating-contact {
  position: fixed;
  bottom: 30px;
  right: 30px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  z-index: 10000;
}
.float-icon {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white !important;
  text-decoration: none;
  font-size: 24px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.3);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  overflow: hidden;
}
.float-icon:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 12px 40px rgba(0,0,0,0.4);
}
.float-whatsapp {
  background-color: #25D366;
}
.float-call {
  background-color: #1B4D2E;
}
@media (max-width: 600px) {
  .floating-contact {
    bottom: 24px;
    right: 24px;
    gap: 12px;
  }
  .float-icon {
    width: 50px;
    height: 50px;
  }
}
`;

export function LegacyPageView({ page }: { page: LegacyPageParts }) {
  const externalScripts = page.externalScripts.filter((src) => src !== "/shared.js");
  return (
    <>
      <script
        id="sd-shared-inline"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: INLINE_SHARED_JS }}
      />
      <style dangerouslySetInnerHTML={{ __html: page.styleText + GLOBAL_LEGACY_CSS }} />
      <main
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: page.bodyHtml }}
      />
      <div className="floating-contact">
        <a href="tel:+918650777799" className="float-icon float-call" title="Call Us">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79a15.15 15.15 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.27 11.72 11.72 0 003.7.59 1 1 0 011 1V20a1 1 0 01-1 1A19 19 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.72 11.72 0 00.59 3.7 1 1 0 01-.27 1.11z"/></svg>
        </a>
        <a href="https://wa.me/918650777799" className="float-icon float-whatsapp" title="WhatsApp Us">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
        </a>
      </div>
      {externalScripts.map((src) => (
        <script key={`legacy-ext-${src}`} src={src} />
      ))}
      {page.inlineScripts.map((script, idx) => (
        <script
          key={`legacy-inline-${idx}`}
          dangerouslySetInnerHTML={{ __html: script }}
        />
      ))}
    </>
  );
}

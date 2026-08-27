// Visual smoke test: launches the site in system Edge (software WebGL) and
// captures screenshots of the hero, mid sections and contact/footer.
//
// Usage:
//   1. Build + serve the app (e.g. `npm run build` then `npm run start`,
//      or run against the dev server).
//   2. node screenshot.mjs [url]
//      e.g. node screenshot.mjs http://localhost:3000/
//   Override via env: SHOT_URL=http://localhost:3000/ npm run shot
//
// Output: ./screenshots/{hero,mid,contact}.png

import { chromium } from "playwright-core";
import { existsSync, mkdirSync } from "node:fs";

const EDGE = [
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
].find(existsSync);

if (!EDGE) {
  console.error("Microsoft Edge not found. Install Edge or set a channel in screenshot.mjs.");
  process.exit(1);
}

const URL = process.argv[2] || process.env.SHOT_URL || "http://localhost:3000/";
const OUT = "screenshots";
mkdirSync(OUT, { recursive: true });

const errors = [];

const browser = await chromium.launch({
  executablePath: EDGE,
  headless: true,
  args: [
    "--ignore-gpu-blocklist",
    "--use-gl=angle",
    "--use-angle=swiftshader",
    "--enable-unsafe-swiftshader",
    "--enable-webgl",
  ],
});

const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
});
page.on("pageerror", (e) => errors.push("pageerror: " + e.message));

await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
await page.waitForSelector("canvas", { timeout: 20000 }).catch(() => {});
await page.waitForTimeout(3500);

const hasCanvas = await page.locator("canvas").count();
const webgl = await page.evaluate(() => {
  const c = document.querySelector("canvas");
  if (!c) return "no-canvas";
  const gl = c.getContext("webgl2") || c.getContext("webgl");
  return gl ? "ok" : "no-context";
});

await page.screenshot({ path: `${OUT}/hero.png` });

await page.evaluate(() => window.scrollTo(0, window.innerHeight * 2.2));
await page.waitForTimeout(1800);
await page.screenshot({ path: `${OUT}/mid.png` });

await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(1500);
await page.screenshot({ path: `${OUT}/contact.png` });

console.log(JSON.stringify({ url: URL, hasCanvas, webgl, errors }, null, 2));
console.log(`Saved screenshots to ./${OUT}/`);
await browser.close();

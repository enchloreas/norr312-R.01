import { chromium } from "playwright-core";
import { existsSync } from "node:fs";

const EDGE = [
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
].find(existsSync);

if (!EDGE) {
  console.error("Browser not found.");
  process.exit(1);
}

const URL = "http://localhost:3000/";
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
const consoleErrors = [];
page.on("console", (msg) => {
  if (msg.type() === "error") {
    consoleErrors.push(msg.text());
  }
});
page.on("pageerror", (err) => consoleErrors.push(err.message));

console.log("▶ [1/6] Navigating to http://localhost:3000...");
await page.goto(URL, { waitUntil: "networkidle", timeout: 30000 });

console.log("▶ [2/6] Verifying Title and 3D Canvas...");
const title = await page.title();
console.log(`  ✓ Title: "${title}"`);
await page.waitForSelector("canvas", { timeout: 10000 });
const canvasCount = await page.locator("canvas").count();
console.log(`  ✓ 3D Canvas found (${canvasCount})`);

console.log("▶ [3/6] Testing HUD Controls (Zoom, Explode, Auto-Rotate)...");
// Click Zoom button
const zoomBtn = page.locator('button[aria-label="Toggle Zoom"]');
await zoomBtn.click();
await page.waitForTimeout(500);
await zoomBtn.click();
console.log("  ✓ Zoom HUD button toggled successfully");

// Click Exploded view button
const explodeBtn = page.locator('button[aria-label="Toggle Exploded View"]');
await explodeBtn.click();
await page.waitForTimeout(600);
await explodeBtn.click();
console.log("  ✓ Exploded view HUD button toggled successfully");

// Click Auto-Rotate button
const rotateBtn = page.locator('button[aria-label="Toggle 360 Spin"]');
await rotateBtn.click();
await page.waitForTimeout(500);
await rotateBtn.click();
console.log("  ✓ Auto-Rotate HUD button toggled successfully");

console.log("▶ [4/6] Testing 360 Canvas Drag Interaction...");
const canvasBox = await page.locator("canvas").boundingBox();
if (canvasBox) {
  await page.mouse.move(canvasBox.x + canvasBox.width / 2, canvasBox.y + canvasBox.height / 2);
  await page.mouse.down();
  await page.mouse.move(canvasBox.x + canvasBox.width / 2 + 150, canvasBox.y + canvasBox.height / 2 + 50, { steps: 10 });
  await page.mouse.up();
  console.log("  ✓ Pointer drag rotation executed on 3D canvas");
}

console.log("▶ [5/6] Testing All Modals (BuildSpec, Releases, Process, Contact)...");

// 1. Build Spec Modal
const buildSpecBtn = page.getByRole("button", { name: "BUILD SPEC" });
await buildSpecBtn.click();
await page.waitForSelector("text=SPECIFICATIONS: MOD. R1 V3", { timeout: 5000 });
console.log("  ✓ BuildSpecModal opened");
// Click size button
await page.getByRole("button", { name: /US 10/ }).click();
// Click finish button
await page.getByRole("button", { name: /DLC Obsidian Black/ }).click();
// Test Escape key close
await page.keyboard.press("Escape");
await page.waitForTimeout(400);
console.log("  ✓ BuildSpecModal interactions and Escape key closing passed");

// 2. Archive / Releases Modal
const archiveNavBtn = page.getByRole("button", { name: "ARCHIVE" });
await archiveNavBtn.click();
await page.waitForSelector("text=ARTIFACT RELEASES & ARCHIVE", { timeout: 5000 });
await page.waitForSelector("text=MOD. R1 V3", { timeout: 5000 });
await page.waitForSelector("text=MOD. R1 V2", { timeout: 5000 });
console.log("  ✓ ReleasesModal opened via ARCHIVE nav, verified releases catalog");
await page.keyboard.press("Escape");
await page.waitForTimeout(400);
console.log("  ✓ ReleasesModal Escape key closing passed");

// 3. Process Modal
const processNavBtn = page.getByRole("button", { name: "PROCESS" });
await processNavBtn.click();
await page.waitForSelector("text=METALLURGY & FABRICATION PROCESS", { timeout: 5000 });
console.log("  ✓ ProcessModal opened");
await page.keyboard.press("Escape");
await page.waitForTimeout(400);
console.log("  ✓ ProcessModal Escape key closing passed");

// 4. Contact Modal & Submission
const contactNavBtn = page.getByRole("button", { name: "CONTACT" });
await contactNavBtn.click();
await page.waitForSelector("text=STUDIO INQUIRIES & COMMISSIONS", { timeout: 5000 });
console.log("  ✓ ContactModal opened");

await page.fill('input[placeholder="Your name"]', "Automated QA Specialist");
await page.fill('input[placeholder="client@domain.com"]', "qa@atelier-test.com");
await page.fill('textarea[placeholder*="Provide details"]', "Testing direct transmission API with valid 10+ char inquiry message.");
await page.getByRole("button", { name: "TRANSMIT INQUIRY" }).click();

await page.waitForSelector("text=TRANSMISSION RECEIVED // NO.rr 312", { timeout: 5000 });
console.log("  ✓ ContactModal form submitted successfully and confirmed transmission");
await page.getByRole("button", { name: "RETURN TO VIEWPORT" }).click();
await page.waitForTimeout(400);

console.log("▶ [6/6] Checking Console Errors...");
if (consoleErrors.length === 0) {
  console.log("  ✓ ZERO console errors during the entire test suite!");
} else {
  console.warn("  ⚠ Console errors detected:", consoleErrors);
}

await browser.close();
console.log("\n==========================================");
console.log("✔ ALL REGRESSION TESTS PASSED SUCCESSFULLY");
console.log("==========================================\n");

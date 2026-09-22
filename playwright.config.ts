import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  workers: 1,
  timeout: 35000,
  expect: { timeout: 10000 },
  reporter: [
    ["list"],
    ["json", { outputFile: "evidencias/resultados-pruebas.json" }],
    ["html", { open: "never" }],
  ],
  use: {
    channel: process.env["PLAYWRIGHT_CHANNEL"],
    baseURL: "http://127.0.0.1:4200",
    viewport: { width: 1440, height: 1050 },
    locale: "es-PE",
    timezoneId: "America/Lima",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  webServer: {
    command:
      "node ./node_modules/@angular/cli/bin/ng.js serve --host 127.0.0.1 --port 4200",
    url: "http://127.0.0.1:4200",
    reuseExistingServer: !process.env["CI"],
    timeout: 120000,
  },
});

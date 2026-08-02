import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  workers: 1,
  use: {
    baseURL: 'http://127.0.0.1:4174',
    channel: 'chrome',
    headless: true,
  },
  webServer: {
    command: 'node ./node_modules/vite/bin/vite.js tests/fixtures --config tests/fixtures/vite.config.ts --host 127.0.0.1 --port 4174 --strictPort',
    url: 'http://127.0.0.1:4174',
    reuseExistingServer: false,
  },
})

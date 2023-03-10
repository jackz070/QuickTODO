import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import type { InlineConfig } from "vitest";
import type { UserConfig } from "vite";

interface VitestConfigExport extends UserConfig {
  test: InlineConfig;
}

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    environment: "happy-dom",
  },
  plugins: [react()],
} as VitestConfigExport);

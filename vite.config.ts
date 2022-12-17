import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import * as path from "path";

export default defineConfig({
    plugins: [vue() as any],
    define: {
        "import.meta.vitest": "undefined",
    },
    test: {
        environment: "happy-dom",
        coverage: {
            enabled: true,
            reporter: ["text-summary"],
            reportsDirectory: "coverage",
        },
        includeSource: ["src/**/*.ts"],
        restoreMocks: true,
    },
});

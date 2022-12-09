import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
    plugins: [vue() as any],
    test: {
        environment: "happy-dom",
        coverage: {
            enabled: true,
            reporter: ["text-summary"],
            reportsDirectory: "coverage",
        },
    },
});

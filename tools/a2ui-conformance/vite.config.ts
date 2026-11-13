import { defineConfig } from "vite-plus";

export default defineConfig({
  run: {
    tasks: {
      build: {
        command: "vp build",
        dependsOn: [{ task: "build", from: "dependencies" }],
      },
    },
  },
  server: { host: "127.0.0.1", port: 5198, strictPort: true },
  build: { target: "es2022" },
});

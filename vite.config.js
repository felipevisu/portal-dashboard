import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import svgrPlugin from "vite-plugin-svgr";
import viteTsconfigPaths from "vite-tsconfig-paths";

import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "https://aws-deploy.d2vvvkxhy37j37.amplifyapp.com/",
  build: {
    assetsDir: "",
  },
  plugins: [react(), viteTsconfigPaths(), svgrPlugin()],
  resolve: {
    alias: {
      "@portal": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});

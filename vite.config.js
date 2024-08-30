import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import svgrPlugin from "vite-plugin-svgr";
import viteTsconfigPaths from "vite-tsconfig-paths";

import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "https://main.d209t9j33vlfre.amplifyapp.com/",
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

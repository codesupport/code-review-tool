import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  base: '/',
  plugins: [react(), tsconfigPaths(), svgr()],
  server: {
    host: '127.0.0.1',
    port: 3000,
    open: true,
  }
});

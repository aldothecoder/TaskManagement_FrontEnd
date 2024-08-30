import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/login": "http://localhost:8080",
      "/register": "http://localhost:8080",
      "/user/tasks/": "http://localhost:8080",
      "/tasks/": "http://localhost:8080",
    },
  },
  base: "/TaskManagement_FrontEnd/",
  build: {
    rollupOptions: {
      input: {
        main: "index.html", // Ensure this points to your root index.html
      },
    },
  },
});

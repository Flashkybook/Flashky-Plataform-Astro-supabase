import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import preact from "@astrojs/preact";
import { nodeResolve } from '@rollup/plugin-node-resolve';

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [tailwind(), preact()],
  devToolbar: {
    enabled: false
  },
  site: "https://flashky.vercel.app/",
  base: "/",
  vite: {
    plugins: [nodeResolve()],
    server: {
      proxy: {
        '/tts': {
          target: "https://tts-api-96an.onrender.com",
          changeOrigin: true,
          secure: false
        }
      }
    }
  },
  adapter: vercel()
});
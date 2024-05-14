import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import preact from "@astrojs/preact";
import { nodeResolve } from '@rollup/plugin-node-resolve';


// https://astro.build/config



export default defineConfig({
  output: "server",
  integrations: [tailwind(), preact()],
  vite: {
    plugins: [nodeResolve()],
    server: {
      proxy: {
        '/tts': {
          target: "https://tts-api-96an.onrender.com",
          changeOrigin: true,
          secure: false,
        },
      },
    },
  }
});
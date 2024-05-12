import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import { nodeResolve } from '@rollup/plugin-node-resolve';
import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [tailwind(), preact()],
  vite: {
    plugins: [nodeResolve()]
  }
});
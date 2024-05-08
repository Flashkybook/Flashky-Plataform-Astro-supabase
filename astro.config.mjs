import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";
import { nodeResolve } from '@rollup/plugin-node-resolve';
// https://astro.build/config
export default defineConfig({
  // output: "server",
  integrations: [tailwind()],
  vite: {
    plugins: [nodeResolve()]
  }
});
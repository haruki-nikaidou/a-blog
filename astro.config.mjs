import { defineConfig, passthroughImageService } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';

import solidJs from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [[rehypeKatex, {
      // Katex plugin options
    }]]
  },
  image: {
    service: passthroughImageService()
  },
  i18n: {
    defaultLocale: "zh",
    locales: ["zh", "en", "jp"],
    routing: {
      prefixDefaultLocale: true
    }
  },
  site: 'https://blog.plr.moe',
  integrations: [mdx(), sitemap(), solidJs()],
  vite: {
    resolve: {
      alias: {
        '@': '/src'
      }
    }
  }
});
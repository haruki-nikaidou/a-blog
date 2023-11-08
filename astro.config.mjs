import { defineConfig, passthroughImageService } from 'astro/config';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';

// https://astro.build/config
export default defineConfig({
    markdown: {
        remarkPlugins: [
            remarkMath,
        ],
        rehypePlugins: [
            [rehypeKatex, {
            // Katex plugin options
            }]
        ]
    },
    image: {
        service: passthroughImageService(),
    },
});

import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		editDate: z.coerce.date().optional(),
		lang: z.enum(['zh', 'en', 'ja']).default('zh'),
		tags: z.array(z.string()).optional(),
		heroImage: z.string().optional(),
		pinned: z.boolean().optional(),
		notCompleted: z.boolean().optional(),
	}),
});

export const collections = { blog };

# Nikaidou Haruki's Blog

基于 [Astro](https://astro.build) 的静态博客。

部署在 Cloudflare Page 上。

## 🚀 项目结构

项目结构是这样的，文章放在`content`里面。如果希望把我这个当作主题，用作自己的博客，那就复制代码，然后删掉 content 里面的就行。

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── ArticleCard.astro
│   ├── layouts/
│   │   └── PostLayout.astro
│   ├── pages/
│   │   └── index.astro
│   └── content/
│       └── (posts)
└── package.json
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `pnpm install`             | Installs dependencies                            |
| `pnpm run dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm run build`           | Build your production site to `./dist/`          |
| `pnpm run preview`         | Preview your build locally, before deploying     |
| `pnpm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm run astro -- --help` | Get help using the Astro CLI                     |
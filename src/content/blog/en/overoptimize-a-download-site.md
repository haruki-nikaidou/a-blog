---
title: How to overoptimize a downloading site
description: Use distributed architecture, best performance frameworks, perfect cache to optimize a simple downloading site.
pubDate: Oct 15 2024
lang: 'en'
notCompleted: true
heroImage: 'https://imagedelivery.net/6gszw1iux5BH0bnwjXECTQ/d95a03a2-d9f1-47a1-4ae4-3169add0c300/small'
---

I have a friend who runs a resource downloading site which~~, if DDOS traffic and crawler bots are counted,~~ boasts over a million active user daily. She isn't very experienced enough ~~or just a bit too laid back~~ to develop that site gracefully. For instance, the site is built on next.js, uses both app route and page route without actually implementing SSR, juggles 4 different UI libraries, and suffers from a chaotic project structure. Seeing all this, I decided to step in and help her clean up the legacy garbage and redevelop the site.

## Improvements

The major issue is the speed. Even after tree shaking and gzip compression, the site's JavaScript and CSS files exceed 2MB due to the use of four UI libraries. For comparison, my blog is only 7KB (gzipped, excluding images). I've decided that frontend should be rewritten in **[solid.js](https://www.solidjs.com/)** without any UI libraries.

> Of course I know qwik is faster than solid.js. The reason why I don't use qwik is when users searching resources, qwik needs to fetch the js and then send the request, which doubles the latency. 
> 
> Solid.js is compact enough that I'm confident the site's gzipped size will be under 20KB. This means the extra time needed to download the static file should be much less than one RTT (Round-Trip Time). Anyway, this is a download site, who still uses internet slower than 1Mbps to download files larger than 1GB?

The legacy site provided the whole file list, result in slow loading and many crawling. Her permitted, I replace the file list with Toplist and catalog searching.

The files' metadata was stored in a massive JSON file. Every time the service started, Bun read this huge JSON file into memory and parse it into a `Map<string, FileMeta>`. The metadata is readonly and is updated manually only when new files are uploaded. This method is indeed fast, but too many features were sacrificed for the sake of performance.


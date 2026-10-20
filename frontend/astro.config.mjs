// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { getThinListingPaths } from './scripts/lib/thin-listings.ts';
import { getSitemapLastmods } from './scripts/lib/sitemap-lastmod.ts';

const SITE = 'https://cli.masoko.net';

// Tag/category/language pages with too few listings are marked noindex (see
// BaseLayout.astro) — keep the sitemap consistent by excluding the same URLs.
const thinPaths = getThinListingPaths();
const lastmods = getSitemapLastmods();

// Pages that are noindex for other reasons: the OAuth landing page, the
// submit form and every edit form (/tools/x/edit/, /categories/x/edit/, …).
/** @param {string} pathname */
const isFormPage = (pathname) =>
	pathname.startsWith('/auth/') || pathname === '/submit/' || pathname.endsWith('/edit/');

// https://astro.build/config
export default defineConfig({
	site: SITE,
	// Every page is emitted as <dir>/index.html and the host 301s the
	// slash-less form, so make the canonical URL the one with the slash.
	trailingSlash: 'always',
	integrations: [
		sitemap({
			filter: (page) => {
				const { pathname } = new URL(page);
				return !isFormPage(pathname) && !thinPaths.some((thinPath) => pathname.startsWith(thinPath));
			},
			serialize: (item) => {
				const lastmod = lastmods.get(new URL(item.url).pathname);
				return lastmod ? { ...item, lastmod } : item;
			},
		}),
	],
});

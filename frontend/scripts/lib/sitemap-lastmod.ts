import { loadAllTools } from './load-tool.ts';
import { slugify } from '../../src/lib/slug.ts';

// Path → ISO date for the sitemap's <lastmod>. A tool page's date is its
// `updated` frontmatter; a listing (home, category, language, tag) takes the
// newest `updated` among the tools it lists. Only first pages are keyed —
// paginated pages (/2/, …) shift whenever anything is added, so a date there
// would mislead more than help. Tools without `updated` contribute nothing.
export function getSitemapLastmods(): Map<string, string> {
	const lastmods = new Map<string, string>();
	const bump = (pathname: string, date: string) => {
		if ((lastmods.get(pathname) ?? '') < date) lastmods.set(pathname, date);
	};

	for (const { id, tool } of loadAllTools()) {
		if (!tool.updated) continue;
		bump(`/tools/${id}/`, tool.updated);
		bump('/', tool.updated);
		bump('/categories/', tool.updated);
		bump('/languages/', tool.updated);
		bump('/tags/', tool.updated);
		bump(`/categories/${slugify(tool.category)}/`, tool.updated);
		bump(`/languages/${slugify(tool.language)}/`, tool.updated);
		for (const tag of tool.tags) bump(`/tags/${slugify(tag)}/`, tool.updated);
	}

	return lastmods;
}

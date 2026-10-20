import type { CollectionEntry } from 'astro:content';
import { SITE_ORIGIN } from './config';

export const SITE_NAME = 'The Terminal Index';

type Tool = CollectionEntry<'tools'>;

// Cuts at a word boundary and adds an ellipsis when `text` exceeds `max`.
export function truncate(text: string, max: number): string {
	if (text.length <= max) return text;
	const cut = text.slice(0, max - 1);
	const space = cut.lastIndexOf(' ');
	return `${(space > max * 0.6 ? cut.slice(0, space) : cut).replace(/[\s,.;:–—-]+$/, '')}…`;
}

// "<base> — The Terminal Index", with "— Page N" on paginated pages so every
// URL in a paginated set has a distinct title.
export function pageTitle(base: string, currentPage = 1): string {
	return currentPage > 1 ? `${base} — Page ${currentPage} — ${SITE_NAME}` : `${base} — ${SITE_NAME}`;
}

// Tool pages lead with name + tagline (what people search for), keeping the
// part before the site name around 60 chars so it survives SERP truncation.
export function toolTitle(name: string, shortDescription: string): string {
	const tagline = shortDescription.replace(/\.$/, '');
	return `${name} — ${truncate(tagline, Math.max(20, 60 - name.length - 3))} | ${SITE_NAME}`;
}

// Appends " Page N of M." to a listing description on pages after the first.
export function pagedDescription(description: string, currentPage: number, lastPage: number): string {
	return currentPage > 1 ? `${description} Page ${currentPage} of ${lastPage}.` : description;
}

// "a, b, c and more" — a few names to make listing descriptions specific.
export function sampleNames(tools: Tool[], count = 3): string {
	const names = tools.slice(0, count).map((tool) => tool.data.name);
	return tools.length > count ? `${names.join(', ')} and more` : names.join(', ');
}

export const toolUrl = (tool: Tool) => `${SITE_ORIGIN}/tools/${tool.id}/`;

export function itemListLd(tools: Tool[], offset = 0): Record<string, unknown> {
	return {
		'@context': 'https://schema.org',
		'@type': 'ItemList',
		itemListElement: tools.map((tool, i) => ({
			'@type': 'ListItem',
			position: offset + i + 1,
			url: toolUrl(tool),
			name: tool.data.name,
		})),
	};
}

export function websiteLd(description: string): Record<string, unknown> {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: SITE_NAME,
		url: `${SITE_ORIGIN}/`,
		description,
		potentialAction: {
			'@type': 'SearchAction',
			target: { '@type': 'EntryPoint', urlTemplate: `${SITE_ORIGIN}/?q={search_term_string}` },
			'query-input': 'required name=search_term_string',
		},
	};
}

export function softwareLd(tool: Tool): Record<string, unknown> {
	const { data } = tool;
	return {
		'@context': 'https://schema.org',
		'@type': 'SoftwareApplication',
		name: data.name,
		description: data.short_description,
		url: toolUrl(tool),
		image: `${SITE_ORIGIN}/og/tools/${tool.id}.png`,
		applicationCategory: 'DeveloperApplication',
		applicationSubCategory: data.category,
		operatingSystem: data.platforms.join(', '),
		programmingLanguage: data.language,
		keywords: data.tags.join(', '),
		author: { '@type': 'Person', name: data.author },
		...(data.license !== 'Other' && { license: data.license }),
		...(data.repo_release && { softwareVersion: data.repo_release }),
		...(data.repo_created && { dateCreated: data.repo_created }),
		...(data.updated && { dateModified: data.updated }),
		...(data.website && { sameAs: data.website }),
		downloadUrl: data.repository_url,
		isAccessibleForFree: true,
		offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
	};
}

// Meta description for a tool page: the tagline plus the facts people filter
// on (language, platforms, install methods), capped near the ~160-char SERP limit.
export function toolDescription(tool: Tool): string {
	const { data } = tool;
	const tagline = data.short_description.replace(/\.?$/, '.');
	const methods = [...new Set(data.installation.map((entry) => entry.method))].slice(0, 4).join(', ');
	const platforms = data.platforms.length > 0 ? ` for ${data.platforms.join(', ')}` : '';
	const full = `${tagline} ${data.language} ${data.category} tool${platforms}. Install via ${methods}.`;
	// A long tagline would leave the facts cut mid-sentence; use it alone then.
	return full.length <= 160 ? full : truncate(tagline, 160);
}

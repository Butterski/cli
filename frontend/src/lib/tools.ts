import { getCollection, type CollectionEntry } from 'astro:content';

// Newest `updated` first; missing dates sort last; name as a stable tiebreak.
// `updated` is an ISO YYYY-MM-DD string, so localeCompare orders it chronologically.
export function sortByUpdated(tools: CollectionEntry<'tools'>[]): CollectionEntry<'tools'>[] {
	return [...tools].sort((a, b) => {
		const cmp = (b.data.updated ?? '').localeCompare(a.data.updated ?? '');
		return cmp !== 0 ? cmp : a.data.name.localeCompare(b.data.name);
	});
}

// Directory listings rank tools whose README carries our badge first (the
// reward for linking back), then fall back to newest-first. Feeds and the
// JSON API stay purely chronological via sortByUpdated.
export function sortForListing(tools: CollectionEntry<'tools'>[]): CollectionEntry<'tools'>[] {
	return sortByUpdated(tools).sort((a, b) => Number(Boolean(b.data.repo_badge)) - Number(Boolean(a.data.repo_badge)));
}

export async function getSortedTools(): Promise<CollectionEntry<'tools'>[]> {
	return sortForListing(await getCollection('tools'));
}

// Random same-category tools (excluding `tool` itself), for "related listings"
// on the tool detail page. Re-shuffles on every static build.
export function getRelatedTools(
	tool: CollectionEntry<'tools'>,
	allTools: CollectionEntry<'tools'>[],
	count = 3,
): CollectionEntry<'tools'>[] {
	const sameCategory = allTools.filter((t) => t.id !== tool.id && t.data.category === tool.data.category);
	for (let i = sameCategory.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[sameCategory[i], sameCategory[j]] = [sameCategory[j], sameCategory[i]];
	}
	return sameCategory.slice(0, count);
}

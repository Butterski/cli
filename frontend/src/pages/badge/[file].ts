import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
import { renderBadge } from '../../lib/badge';

// One README badge per tool at /badge/<id>.svg. The param carries the
// extension (rather than an [id].svg route) because trailingSlash: 'always'
// breaks the latter — same as the /og/tools/ share cards.
export const getStaticPaths = (async () => {
	const tools = await getCollection('tools');
	return tools.map((tool) => ({ params: { file: `${tool.id}.svg` }, props: { tool } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute<{ tool: CollectionEntry<'tools'> }> = ({ props }) =>
	new Response(renderBadge(props.tool.data.name), { headers: { 'Content-Type': 'image/svg+xml' } });

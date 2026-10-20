import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { sortByUpdated } from '../../lib/tools';

// Public, static dump of the directory for anyone building on it. User
// comments are left out; everything else mirrors the tool frontmatter.
export const GET: APIRoute = async ({ site }) => {
	const tools = sortByUpdated(await getCollection('tools'));
	const body = {
		name: 'The Terminal Index',
		url: site!.href,
		license: 'MIT',
		count: tools.length,
		tools: tools.map(({ id, data }) => {
			const { comments: _comments, ...fields } = data;
			return { id, url: new URL(`/tools/${id}/`, site).href, ...fields };
		}),
	};
	return new Response(JSON.stringify(body, null, '\t'), {
		headers: { 'Content-Type': 'application/json' },
	});
};

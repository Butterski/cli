import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { marked } from 'marked';
import { getSortedTools } from '../lib/tools';

// Newest listings first, by the `updated` date stamped on submit/edit.
// Tools without a date have no meaningful pubDate, so they're left out.
const FEED_SIZE = 50;

export const GET: APIRoute = async (context) => {
	const tools = (await getSortedTools()).filter((tool) => tool.data.updated).slice(0, FEED_SIZE);
	return rss({
		title: 'The Terminal Index',
		description: 'New and updated CLI & TUI tools on The Terminal Index.',
		site: context.site!,
		trailingSlash: true,
		items: tools.map((tool) => ({
			title: `${tool.data.name}: ${tool.data.short_description}`,
			link: `/tools/${tool.id}/`,
			pubDate: new Date(tool.data.updated!),
			description: marked.parse(tool.data.description, { async: false }),
			categories: [tool.data.category, ...tool.data.tags],
		})),
	});
};

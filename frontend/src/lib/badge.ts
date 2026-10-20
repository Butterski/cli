// Shields-style "listed on" badge that maintainers embed in their READMEs,
// linking back to the tool's page. Rendered as a static SVG at build time
// (see pages/badge/[file].ts).

const LABEL = '>_ terminal index';
const MESSAGE = 'listed';
const LABEL_BG = '#14151a';
const MESSAGE_BG = '#f74c00';

// Monospace glyphs are ~0.6em wide; at 11px that's ~6.6px. `textLength`
// pins the rendered width so the layout holds whatever font the viewer has.
const CHAR_WIDTH = 6.6;
const PAD_X = 6;
const HEIGHT = 20;

const escapeXml = (s: string) =>
	s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function renderBadge(toolName: string): string {
	const labelText = LABEL.length * CHAR_WIDTH;
	const messageText = MESSAGE.length * CHAR_WIDTH;
	const labelWidth = Math.round(labelText + PAD_X * 2);
	const messageWidth = Math.round(messageText + PAD_X * 2);
	const width = labelWidth + messageWidth;
	const title = escapeXml(`${toolName} is listed on The Terminal Index`);
	const text = (x: number, len: number, s: string) =>
		`<text x="${x}" y="14" textLength="${len.toFixed(1)}" lengthAdjust="spacingAndGlyphs">${escapeXml(s)}</text>`;

	return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${HEIGHT}" role="img" aria-label="${title}">
<title>${title}</title>
<clipPath id="r"><rect width="${width}" height="${HEIGHT}" rx="3"/></clipPath>
<g clip-path="url(#r)">
<rect width="${labelWidth}" height="${HEIGHT}" fill="${LABEL_BG}"/>
<rect x="${labelWidth}" width="${messageWidth}" height="${HEIGHT}" fill="${MESSAGE_BG}"/>
</g>
<g fill="#fff" font-family="DejaVu Sans Mono,Menlo,Consolas,monospace" font-size="11">
${text(PAD_X, labelText, LABEL)}
${text(labelWidth + PAD_X, messageText, MESSAGE)}
</g>
</svg>
`;
}

// A README "links back" when it embeds this tool's badge or links to its
// page. The daily stats sync (scripts/sync-github-stats.ts) checks this and
// stamps `repo_badge: true`, which marks the listing verified and ranks it
// first (see sortForListing in lib/tools.ts).
export function readmeLinksBack(readme: string, toolId: string): boolean {
	const id = toolId.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	return new RegExp(`cli\\.masoko\\.net/(?:badge/${id}\\.svg|tools/${id}(?![\\w-]))`, 'i').test(readme);
}

export const VERIFIED_TITLE = "Verified: the project's README links back to this listing";

// Snippets offered on the tool page for maintainers to paste.
export function badgeSnippets(site: URL | string, toolId: string, toolName: string) {
	const badgeUrl = new URL(`/badge/${toolId}.svg`, site).href;
	const pageUrl = new URL(`/tools/${toolId}/`, site).href;
	const alt = `${toolName} on The Terminal Index`;
	return {
		badgeUrl,
		markdown: `[![${alt}](${badgeUrl})](${pageUrl})`,
		html: `<a href="${pageUrl}"><img src="${badgeUrl}" alt="${escapeXml(alt)}"></a>`,
	};
}

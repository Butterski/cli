import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import type { z } from 'zod';
import { categorySchema, toolSchema } from '../../src/lib/schema.ts';

export type Tool = z.infer<typeof toolSchema>;
export type Category = z.infer<typeof categorySchema>;

function parseFrontmatter<T>(fullPath: string, schema: z.ZodType<T>): { data: T } | { issues: string[] } {
	const raw = fs.readFileSync(fullPath, 'utf8');
	const { data } = matter(raw);
	const result = schema.safeParse(data);
	if (!result.success) {
		return {
			issues: result.error.issues.map((issue) => `${issue.path.join('.') || '(root)'}: ${issue.message}`),
		};
	}
	return { data: result.data };
}

// Reads a tool .md file and validates its frontmatter against the schema.
// Returns the parsed tool, or the list of validation issues as printable
// strings.
export function parseToolFile(fullPath: string): { tool: Tool } | { issues: string[] } {
	const result = parseFrontmatter(fullPath, toolSchema);
	return 'issues' in result ? result : { tool: result.data };
}

// Same as parseToolFile, for a category description file.
export function parseCategoryFile(fullPath: string): { category: Category } | { issues: string[] } {
	const result = parseFrontmatter(fullPath, categorySchema);
	return 'issues' in result ? result : { category: result.data };
}

const TOOLS_DIR = path.resolve(import.meta.dirname, '../../src/content/tools');

// Every valid tool in src/content/tools, keyed by its file id (the same id the
// Astro glob loader gives the entry, i.e. the /tools/<id>/ slug). Invalid
// files are skipped — the build itself reports those.
export function loadAllTools(): { id: string; tool: Tool }[] {
	return fs
		.readdirSync(TOOLS_DIR)
		.filter((file) => file.endsWith('.md'))
		.flatMap((file) => {
			const result = parseToolFile(path.join(TOOLS_DIR, file));
			return 'tool' in result ? [{ id: file.slice(0, -'.md'.length), tool: result.tool }] : [];
		});
}

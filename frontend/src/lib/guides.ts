// Hand-curated landing pages built on top of the tools collection:
//   /alternatives/<slug>/  — modern replacements for a classic command or app
//   /collections/<slug>/   — themed roundups that cut across categories
// Tool ids must match files in content/tools/; the build fails on an unknown
// id (see resolveGuideTools) so a deleted listing can't leave a dead card.
// Keep each list at MIN_INDEXABLE_LISTINGS (3) or more so no page is thin.

import type { CollectionEntry } from 'astro:content';

export interface Guide {
	slug: string;
	title: string; // page <h1>, also the base of the <title>
	intro: string; // one or two sentences shown under the heading and used as the meta description
	tools: string[];
}

export interface Alternative extends Guide {
	replaces: string; // the classic command or app, shown as `replaces` in tool pages' SEE ALSO
}

export const ALTERNATIVES: Alternative[] = [
	{
		slug: 'ls',
		replaces: 'ls',
		title: 'Modern alternatives to ls',
		intro: 'Drop-in ls replacements with colors, icons, git status, tree views and human-readable sizes.',
		tools: ['eza', 'lsd', 'lla', 'nat', 'pls', 'logo-ls', 'g', 'nls', 'lstr'],
	},
	{
		slug: 'grep',
		replaces: 'grep',
		title: 'Modern alternatives to grep',
		intro: 'Faster, friendlier ways to search text and code: recursive by default, .gitignore-aware, and some interactive.',
		tools: ['ripgrep', 'ugrep', 'igrep', 'ygrep'],
	},
	{
		slug: 'top',
		replaces: 'top',
		title: 'Modern alternatives to top',
		intro: 'Process and resource monitors with graphs, mouse support and better defaults than the stock top.',
		tools: ['btop', 'htop', 'gtop', 'procs', 'ctop', 'metropolis'],
	},
	{
		slug: 'du',
		replaces: 'du / df',
		title: 'Modern alternatives to du and df',
		intro: 'See where your disk space went: visual, sorted and fast disk-usage tools for the terminal.',
		tools: ['dust', 'gdu', 'duf', 'parallel-disk-usage', 'dutree'],
	},
	{
		slug: 'cd',
		replaces: 'cd',
		title: 'Smarter alternatives to cd',
		intro: 'Jump to directories you use often, or navigate interactively, instead of typing full paths.',
		tools: ['zoxide', 'walk', 'broot'],
	},
	{
		slug: 'diff',
		replaces: 'diff',
		title: 'Modern alternatives to diff',
		intro: 'Syntax-highlighted, structural and side-by-side diffs for code, git and config files.',
		tools: ['delta', 'difftastic', 'diffnav', 'dyff'],
	},
	{
		slug: 'ctrl-r',
		replaces: 'Ctrl-R history search',
		title: 'Better shell history than Ctrl-R',
		intro: 'Searchable, synced and context-aware shell history to replace the default reverse search.',
		tools: ['atuin', 'mcfly', 'suvadu', 'fzf'],
	},
	{
		slug: 'ping',
		replaces: 'ping / traceroute',
		title: 'Modern alternatives to ping and traceroute',
		intro: 'Network diagnostics with live latency graphs, per-hop stats and readable output.',
		tools: ['sping', 'ttl', 'netwatch'],
	},
	{
		slug: 'nano',
		replaces: 'nano',
		title: 'Beginner-friendly alternatives to nano',
		intro: 'Terminal editors with familiar shortcuts (Ctrl-S, Ctrl-C), mouse support and syntax highlighting, no modal editing required.',
		tools: ['micro', 'edit', 'fresh', 'pnana', 'ox', 'slap', 'ttt'],
	},
	{
		slug: 'vim',
		replaces: 'vim',
		title: 'Modal editors: alternatives to vim',
		intro: 'Modern modal editors for people who like the vim way of editing but want different defaults.',
		tools: ['neovim', 'helix', 'kakoune', 'amp', 'ad'],
	},
	{
		slug: 'tmux',
		replaces: 'tmux',
		title: 'Alternatives to tmux',
		intro: 'Terminal multiplexers and workspaces: split panes, persistent sessions and layouts.',
		tools: ['zellij', 'byobu', 'psmux'],
	},
	{
		slug: 'postman',
		replaces: 'Postman',
		title: 'Terminal alternatives to Postman',
		intro: 'Build, send and save HTTP requests without leaving the terminal.',
		tools: ['posting', 'atac', 'slumber', 'noodle', 'payk'],
	},
	{
		slug: 'docker-desktop',
		replaces: 'Docker Desktop',
		title: 'Terminal alternatives to Docker Desktop',
		intro: 'Manage containers, images and logs from a TUI instead of a desktop app.',
		tools: ['lazydocker', 'dtop', 'ctop', 'dive'],
	},
	{
		slug: 'excel',
		replaces: 'Excel',
		title: 'Terminal alternatives to Excel',
		intro: 'Spreadsheets and tabular-data viewers for CSV, TSV and XLSX files, right in the terminal.',
		tools: ['visidata', 'sc-im', 'tabiew', 'csvlens', 'sheets', 'xleak'],
	},
	{
		slug: 'spotify',
		replaces: 'Spotify app',
		title: 'Spotify clients for the terminal',
		intro: 'Control and stream Spotify from a lightweight terminal UI.',
		tools: ['spotify-player', 'spotify-tui', 'spotatui', 'myx'],
	},
	{
		slug: 'obsidian',
		replaces: 'Obsidian',
		title: 'Terminal alternatives to Obsidian',
		intro: 'Markdown note-taking and knowledge bases that live in the terminal.',
		tools: ['emeraldian', 'ekphos', 'shoin', 'tsuzuri', 'lazymark', 'nb'],
	},
];

export const COLLECTIONS: Guide[] = [
	{
		slug: 'modern-unix',
		title: 'Modern Unix: better versions of classic commands',
		intro: 'Faster, friendlier rewrites of the commands you type every day, from cat and ls to grep, du, ps and cd.',
		tools: ['bat', 'eza', 'ripgrep', 'zoxide', 'dust', 'duf', 'procs', 'delta', 'btop', 'hyperfine', 'tldr', 'fzf', 'tokei', 'sping'],
	},
	{
		slug: 'tui-git-clients',
		title: 'TUI git clients',
		intro: 'Stage, commit, branch and browse history from a terminal UI instead of a GUI.',
		tools: ['lazygit', 'gitui', 'gitu', 'grv', 'gitwig', 'jjui', 'forgit', 'diffnav'],
	},
	{
		slug: 'ai-coding-agents',
		title: 'AI coding agents and tools for the terminal',
		intro: 'Coding agents that run in your terminal, plus tools to orchestrate and manage them.',
		tools: ['opencode', 'codex', 'crush', 'herdr', 'backlog-md', 'lazyskills', 'bosun', 'yylo', 'ygrep', 'ycrawl'],
	},
	{
		slug: 'kubernetes-tuis',
		title: 'Kubernetes and cloud TUIs',
		intro: 'Browse clusters, tail logs and manage cloud resources without a web console.',
		tools: ['k9s', 'kdash', 'sofka', 'k10s', 'cloudlens'],
	},
	{
		slug: 'terminal-music-players',
		title: 'Terminal music players',
		intro: 'Local, streaming and radio players with album art, visualizers and keyboard control.',
		tools: ['kew', 'cliamp', 'musikcube', 'rmpc', 'termusic', 'spotify-player', 'spotatui', 'noctavox', 'mocp', 'gtm', 'aethertune', 'lyrtui', 'myx'],
	},
	{
		slug: 'json-csv-data-tools',
		title: 'JSON, CSV and data tools for the terminal',
		intro: 'View, query and transform structured data: JSON processors, CSV viewers and SQL TUIs.',
		tools: ['jq', 'fx', 'jnv', 'visidata', 'xan', 'csvlens', 'tabiew', 'qo', 'harlequin', 'nothing-less', 'dyff'],
	},
	{
		slug: 'network-monitoring',
		title: 'Network monitoring in the terminal',
		intro: 'Watch bandwidth, connections, ports and latency live, per interface or per process.',
		tools: ['rustnet', 'netwatch', 'bmon', 'termshark', 'flow', 'portop', 'netop', 'slurm', 'ttl', 'sping', 'yscan', 'shoal', 'lsoff'],
	},
	{
		slug: 'ssh-tools',
		title: 'SSH tools and connection managers',
		intro: 'Manage SSH hosts, mount remote filesystems and run commands across servers.',
		tools: ['sshs', 'dssh', 'ctty', 'sshfs', 'sake', 'snips-sh'],
	},
	{
		slug: 'markdown-tools',
		title: 'Markdown tools for the terminal',
		intro: 'Render, write, present and convert Markdown without leaving the shell.',
		tools: ['glow', 'slides', 'ekphos', 'emeraldian', 'shoin', 'tsuzuri', 'lazymark', 'rayomd'],
	},
];

type Tool = CollectionEntry<'tools'>;

// Most-starred first, the order people expect from a "best of" page.
export function resolveGuideTools(guide: Guide, allTools: Tool[]): Tool[] {
	const byId = new Map(allTools.map((tool) => [tool.id, tool]));
	const missing = guide.tools.filter((id) => !byId.has(id));
	if (missing.length > 0) {
		throw new Error(`lib/guides.ts: "${guide.slug}" lists unknown tool id(s): ${missing.join(', ')}`);
	}
	return guide.tools.map((id) => byId.get(id)!).sort((a, b) => (b.data.repo_stars ?? -1) - (a.data.repo_stars ?? -1));
}

// Guides a tool appears in, for the SEE ALSO line on its page.
export function guidesForTool(toolId: string) {
	return {
		alternatives: ALTERNATIVES.filter((guide) => guide.tools.includes(toolId)),
		collections: COLLECTIONS.filter((guide) => guide.tools.includes(toolId)),
	};
}

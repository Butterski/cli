const ASCIINEMA_RE = /asciinema\.org\/a\/([\w-]+)/i;
// youtu.be/ID, youtube.com/watch?v=ID, and youtube.com/{shorts,embed,live}/ID
// (www./m./music. subdomains and youtube-nocookie.com included).
const YOUTUBE_RE =
	/^https?:\/\/(?:(?:www\.|m\.|music\.)?youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([\w-]{11})(?:[?&#/]|$)/i;
const VIDEO_EXT_RE = /\.(webm|mp4)(\?.*)?$/i;

export type MediaKind = 'asciinema' | 'youtube' | 'video' | 'image';

export function getAsciinemaId(url: string): string | undefined {
	return url.match(ASCIINEMA_RE)?.[1];
}

export function getYouTubeId(url: string): string | undefined {
	return url.match(YOUTUBE_RE)?.[1];
}

export function getYouTubeEmbedUrl(id: string): string {
	return `https://www.youtube-nocookie.com/embed/${id}`;
}

export function getMediaKind(url: string): MediaKind {
	if (ASCIINEMA_RE.test(url)) return 'asciinema';
	if (YOUTUBE_RE.test(url)) return 'youtube';
	if (VIDEO_EXT_RE.test(url)) return 'video';
	return 'image';
}

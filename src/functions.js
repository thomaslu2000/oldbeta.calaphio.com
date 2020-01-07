export function unsanitize(str) {
	return unescape(
		str
			.replace(/&amp;/g, "&")
			.replace(/&#039;/g, "'")
			.replace(/&rsquo;/g, "’")
			.replace(/&lt;/g, "<")
			.replace(/&gt;/g, ">")
			.replace(/&quot;/g, '"')
	);
}

export function unsanitize(str) {
	return unescape(
		str
			.replace(/&amp;/g, "&")
			.replace(/&#039;/, "'")
			.replace(/&rsquo;/, "’")
	);
}

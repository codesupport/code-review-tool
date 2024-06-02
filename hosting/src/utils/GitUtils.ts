export function formatGitUrl(url: string): string {
	const match = /github\.com\/(?<user>.*)\/(?<repo>.*).git/.exec(url);

	if (match?.groups?.user && match?.groups?.repo) {
		return `${match.groups.user}/${match.groups.repo}`;
	}

	return url;
}

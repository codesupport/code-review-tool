import {  useCallback } from "react";

const GITHUB_BASE_URL = "https://api.github.com";

type UseGitHubHook = [<T>(path?: string) => Promise<T>];

export function useGitHub(): UseGitHubHook {
	const request = useCallback(async <T>(path?: string): Promise<T> => {
		const res = await fetch(`${GITHUB_BASE_URL}/${path}`, {
			method: "GET"
		});

		return res.json();
	}, []);

	return [request];
}

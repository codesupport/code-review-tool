import { IGitHubUser } from "../interfaces/github/IGitHubUser";
import { IGitHubRepository } from "../interfaces/github/IGitHubRepository";

export class GitHubService {
	private static BASE_URL = "https://api.github.com";

	private async makeRequest<T>(path: string): Promise<T> {
		const res = await fetch(`${GitHubService.BASE_URL}/${path}`);

		return res.json();
	}

	async getUserById(id: number): Promise<IGitHubUser> {
		const [user] = await this.makeRequest<IGitHubUser[]>(`users?since=${id - 1}&per_page=1`);

		return user;
	}

	async getUsersRepositories(username: string): Promise<IGitHubRepository[]> {
		return this.makeRequest(`users/${username.toLowerCase()}/repos`);
	}
}

export const githubService = new GitHubService();

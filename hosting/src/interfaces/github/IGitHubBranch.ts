export interface IGitHubBranch {
	name: string;
	protected: boolean;
	commit: {
		sha: string;
		url: string;
	}
}

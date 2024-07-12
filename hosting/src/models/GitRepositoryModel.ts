import { BaseModel } from "./BaseModel";

export class GitRepositoryModel extends BaseModel {
	git_url!: string;

	branch!: string;

	commit!: string;

	user!: string;

	reviewers!: string[];

	hash!: string;
}

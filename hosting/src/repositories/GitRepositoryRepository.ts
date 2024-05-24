import { BaseRepository } from "./BaseRepository";
import { GitRepositoryModel } from "../models/GitRepositoryModel";

export class GitRepositoryRepository extends BaseRepository<GitRepositoryModel> {
	constructor() {
		super("crt_repositories");
	}
}

export const gitRepositoryRepository = new GitRepositoryRepository();

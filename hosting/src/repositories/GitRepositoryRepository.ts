import { BaseRepository } from "./BaseRepository";
import { GitRepositoryModel } from "../models/GitRepositoryModel";

export class GitRepositoryRepository extends BaseRepository<GitRepositoryModel> {
	constructor() {
		super("crt_repositories");
	}

	async create(data: GitRepositoryModel): Promise<string> {
		const documentId = await super.create(data);

		await this.createUniqueField(documentId, "hash", data.hash);

		return documentId;
	}
}

export const gitRepositoryRepository = new GitRepositoryRepository();

import { collection, query, where, getDocs } from "firebase/firestore";
import { BaseRepository } from "./BaseRepository";
import { GitRepositoryModel } from "../models/GitRepositoryModel";
import { WithId } from "../types/WithId";

export class GitRepositoryRepository extends BaseRepository<GitRepositoryModel> {
	constructor() {
		super("crt_repositories");
	}

	async getByUserId(userId: string): Promise<WithId<GitRepositoryModel>[]> {
		const ref = collection(this.firestore, this.collection);
		const q = query(ref, where("user", "==", userId));
		const snapshot = await getDocs(q);

		return snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}) as WithId<GitRepositoryModel>);
	}

	async create(data: GitRepositoryModel): Promise<string> {
		const documentId = await super.create(data);

		await this.createUniqueField(documentId, "hash", data.hash);

		return documentId;
	}
}

export const gitRepositoryRepository = new GitRepositoryRepository();

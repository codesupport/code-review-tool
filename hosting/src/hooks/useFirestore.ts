import { BaseModel } from "../models/BaseModel";
import { IRepository } from "../interfaces/IRepository";
import { BaseRepository } from "../repositories/BaseRepository";

export function useFirestore<T extends BaseModel>(repository: IRepository<T>): [BaseRepository<T>] {
	return [new repository()];
}

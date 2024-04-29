import { BaseRepository } from "../repositories/BaseRepository";
import { BaseModel } from "../models/BaseModel";

export interface IRepository<T extends BaseModel> {
	new (...args: any[]): BaseRepository<T>;
}

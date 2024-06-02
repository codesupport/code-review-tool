import { BaseModel } from "../models/BaseModel";

export type WithId<T extends BaseModel> = { id: string} & T;

import type { FieldValue } from "@firebase/firestore";

export abstract class BaseModel {
	created!: FieldValue;
}

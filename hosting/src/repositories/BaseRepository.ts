import {
	doc,
	getDoc,
	setDoc,
	addDoc,
	getFirestore,
	collection,
	type DocumentData,
	serverTimestamp
} from "firebase/firestore";
import { app } from "../firebase";
import { BaseModel } from "../models/BaseModel";

export abstract class BaseRepository<T extends BaseModel> {
	private static readonly UNIQUE_FIELD_COLLECTION = "z_UNIQUE_CONSTRAINTS";
	protected readonly firestore = getFirestore(app);

	protected constructor(
		protected readonly collection: string
	) {}

	protected async createUniqueField(documentId: string, field: string, value: string): Promise<void> {
		const ref = doc(this.firestore, BaseRepository.UNIQUE_FIELD_COLLECTION, this.collection, field, value);

		return setDoc(ref, {
			created: serverTimestamp(),
			for_document: documentId
		});
	}

	async getById(id: string): Promise<DocumentData | undefined> {
		const ref = doc(this.firestore, this.collection, id);

		const snapshot = await getDoc(ref);

		return snapshot.data();
	}

	async create(data: T): Promise<string> {
		const ref = collection(this.firestore, this.collection);
		const doc = await addDoc(ref, data);

		return doc.id;
	}

	async createWithId(id: string, data: T): Promise<void> {
		const ref = doc(this.firestore, this.collection, id);

		await setDoc(ref, data);
	}
}

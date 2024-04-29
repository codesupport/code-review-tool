import { doc, getDoc, setDoc, addDoc, getFirestore, collection, type DocumentData} from "firebase/firestore";
import { app } from "../firebase";
import { BaseModel } from "../models/BaseModel";

export abstract class BaseRepository<T extends BaseModel> {
	private readonly firestore = getFirestore(app);

	protected constructor(
		protected readonly collection: string
	) {}

	async getById(id: string): Promise<DocumentData | undefined> {
		const ref = doc(this.firestore, this.collection, id);

		const snapshot = await getDoc(ref);

		return snapshot.data();
	}

	async create(data: T): Promise<void> {
		const ref = collection(this.firestore, this.collection);

		await addDoc(ref, data);
	}

	async createWithId(id: string, data: T): Promise<void> {
		const ref = doc(this.firestore, this.collection, id);

		await setDoc(ref, data);
	}
}

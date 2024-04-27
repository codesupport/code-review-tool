import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";
import { app } from "../firebase";

const auth = getAuth(app);

export function useUser() {
	const [user, setUser] = useState<User | undefined>();

	useEffect(() => {
		const listener = onAuthStateChanged(auth, (user) => {
			setUser(user ?? undefined)
			console.log(user);
		});

		return () => listener();
	}, []);

	return [user];
}

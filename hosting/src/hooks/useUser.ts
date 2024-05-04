import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, getRedirectResult, GithubAuthProvider, type User } from "firebase/auth";
import { app } from "../firebase";

const auth = getAuth(app);

export function useUser() {
	const [user, setUser] = useState<User | undefined>();

	useEffect(() => {
		(async () => {
			const result = await getRedirectResult(auth);

			if (!result) return;

			const credential = GithubAuthProvider.credentialFromResult(result);

			sessionStorage.setItem("github_token", process.env.REACT_APP_LOCAL_GITHUB_TOKEN ?? credential!.accessToken!);
		})();

		const listener = onAuthStateChanged(auth, (user) => {
			setUser(user ?? undefined);
		});

		return () => listener();
	}, []);

	return [user];
}

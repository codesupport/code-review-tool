import { useCallback, useState } from "react";
import { getAuth, GithubAuthProvider, signInWithRedirect } from "firebase/auth";
import { app } from "../firebase";

const auth = getAuth(app);

type UseLoginHook = [() => void, boolean];

export function useLogin(): UseLoginHook {
	const [loading, setLoading] = useState<boolean>(false);

	const login = useCallback(
		async () => {
			setLoading(true);

			const provider = new GithubAuthProvider();

			provider.addScope("read:user");
			provider.addScope("public_repo");

			await signInWithRedirect(auth, provider);

			setLoading(false);
		},
		[]
	);

	return [login, loading];
}

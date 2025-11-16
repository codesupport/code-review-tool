import { useCallback, useState } from "react";
import { getAuth, GithubAuthProvider, signInWithPopup } from "firebase/auth";
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

			const result = await signInWithPopup(auth, provider);
			const credential = GithubAuthProvider.credentialFromResult(result);

			sessionStorage.setItem("github_token", import.meta.env.VITE_LOCAL_GITHUB_TOKEN ?? credential!.accessToken!);

			setLoading(false);
		},
		[]
	);

	return [login, loading];
}

import { useCallback } from "react";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../firebase";

const auth = getAuth(app);

type UseLogoutHook = [() => void];

export function useLogout(): UseLogoutHook {
	const logout = useCallback(
		async () => {
			await signOut(auth);
		},
		[]
	);

	return [logout];
}

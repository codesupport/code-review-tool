import { Outlet } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { useLogin } from "../../hooks/useLogin";
import { useLogout } from "../../hooks/useLogout";

export function ProtectedPageTemplate() {
	const [user] = useUser();
	const [login, loading] = useLogin();
	const [logout] = useLogout();

	if (!user) {
		return (
			<main>
				{loading ? <p>Loading...</p> : <button type="button" onClick={() => login()}>
					Login with GitHub
				</button>}
			</main>
		)
	}

	return (
		<>
			<header>
				<button type="button" onClick={() => logout()}>
					Logout
				</button>
			</header>
			<main>
				<Outlet />
			</main>
		</>
	);
}

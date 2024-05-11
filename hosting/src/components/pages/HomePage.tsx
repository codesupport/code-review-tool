import { Link } from "react-router-dom";
import { useUser } from "../../hooks/useUser";

export function HomePage() {
    const [user] = useUser();

    return (
        <main>
            <h1>
                CodeSupport Code Review Tool
            </h1>
            {user && (
                <div>
                    <h1>Hello {user.displayName}</h1>
                    <pre>{JSON.stringify(user)}</pre>
                    <h2>Repositories</h2>
                    <p>You have not yet imported any repositories.</p>
                    <Link to="repositories/import">Import One</Link>
                </div>
            )}
        </main>
    );
}

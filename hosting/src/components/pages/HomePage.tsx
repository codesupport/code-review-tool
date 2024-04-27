import React from "react";
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
                    <p>Hello {user.displayName}</p>
                    <pre>{JSON.stringify(user)}</pre>
                </div>
            )}
        </main>
    );
}

import React, { useState, useEffect } from "react";
import { useUser } from "../../hooks/useUser";
import { useGitHub } from "../../hooks/useGitHub";
import { IGitHubUser } from "../../interfaces/github/IGitHubUser";
import { IGitHubRepository } from "../../interfaces/github/IGitHubRepository";

export function HomePage() {
    const [user] = useUser();
    const [request] = useGitHub();
    const [repositories, setRepositories] = useState<any[]>([]);

    useEffect(() => {
        if (!user) return;
        (async () => {
            const [gitUser] = await request<IGitHubUser[]>(`users?since=${+(user.providerData[0].uid) - 1}&per_page=1`);
            const repos = await request<IGitHubRepository[]>(`users/${gitUser.login.toLowerCase()}/repos`);

            setRepositories(repos);
        })();
    }, [user]);

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
                    <ul>
                        {repositories?.map(repo => <li key={repo.id}>{repo.name}</li>)}
                    </ul>
                </div>
            )}
        </main>
    );
}

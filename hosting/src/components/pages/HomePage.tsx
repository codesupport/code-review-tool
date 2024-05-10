import { useQuery } from "@tanstack/react-query";
import { useUser } from "../../hooks/useUser";
import { githubService } from "../../services/GitHubService";
import { IGitHubRepository } from "../../interfaces/github/IGitHubRepository";

export function HomePage() {
    const [user] = useUser();
    const { data: gitUser } = useQuery({
        queryKey: ["github", "users", user?.providerData[0].uid],
        queryFn: async () => githubService.getUserById(+user!.providerData[0].uid),
        enabled: !!user
    });

    const { data: gitRepositories } = useQuery({
        queryKey: ["github", "repositories", gitUser?.login.toLowerCase()],
        queryFn: async () => githubService.getUsersRepositories(gitUser!.login),
        enabled: !!gitUser
    });

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
                        {gitRepositories?.map((repo: IGitHubRepository) => <li key={repo.id}>{repo.name}</li>)}
                    </ul>
                </div>
            )}
        </main>
    );
}

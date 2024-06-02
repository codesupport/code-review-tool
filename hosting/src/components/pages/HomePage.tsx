import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "../../hooks/useUser";
import { gitRepositoryRepository } from "../../repositories/GitRepositoryRepository";
import { formatGitUrl } from "../../utils/GitUtils";

export function HomePage() {
    const [user] = useUser();

    const { data: importedRepositories } = useQuery({
        queryKey: ["db", "crt_repositories", user?.uid],
        queryFn: async () => gitRepositoryRepository.getByUserId(user!.uid),
        enabled: !!user
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
                    {importedRepositories?.length ? (
                        <>
                            <ul>
                                {importedRepositories.map(repo => (
                                    <li key={repo.id}>
                                        <Link to={`repositories/review/${repo.id}`}>{formatGitUrl(repo.git_url)} ({repo.commit})</Link>
                                    </li>
                                ))}
                            </ul>
                            <Link to="repositories/import">Import More</Link>
                        </>
                    ) : (
                        <>
                            <p>You have not yet imported any repositories.</p>
                            <Link to="repositories/import">Import One</Link>
                        </>
                    )}
                </div>
            )}
        </main>
    );
}

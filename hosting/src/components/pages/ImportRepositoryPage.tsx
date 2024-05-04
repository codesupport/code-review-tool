import { DropdownWithTitle}  from "../molecules/DropdownWithTitle";
import { useEffect, useState } from "react";
import { useUser } from "../../hooks/useUser";
import { useQuery } from "@tanstack/react-query";
import { githubService } from "../../services/GitHubService";

export function ImportRepositoryPage() {
	const [user] = useUser();
	const [chosenRepository, setChosenRepository] = useState<string | undefined>();
	const [chosenBranch, setChosenBranch] = useState<string | undefined>();

	const { data: gitUser } = useQuery({
		queryKey: ["github", "users", user?.providerData[0].uid],
		queryFn: async () => githubService.getUserById(+user!.providerData[0].uid),
		enabled: !!user
	});

	const { data: gitRepositories } = useQuery({
		queryKey: ["github", "repositories", gitUser?.login.toLowerCase()],
		queryFn: async () => githubService.getUsersRepositories(gitUser!.login),
		enabled: !!gitUser,
	});

	const { data: gitBranches } = useQuery({
		queryKey: ["github", "branches", gitUser?.login.toLowerCase(), chosenRepository],
		queryFn: async () => githubService.getRepositoryBranches(gitUser!.login, chosenRepository!),
		enabled: !!chosenRepository
	});

	useEffect(() => {
		if (chosenRepository) {
			setChosenBranch(gitRepositories?.find(repo => repo.name.toLowerCase() === chosenRepository.toLowerCase())?.default_branch)
		}
	}, [chosenRepository, gitRepositories]);

	return (
		<main>
			<h2>Import A Repository</h2>
			<DropdownWithTitle
				title="Select A Repository"
				description="Select the repository you would like to be code reviewed by other members"
				options={gitRepositories?.map(repo => ({
					id: repo.id,
					text: repo.name,
					value: repo.name
				})) ?? []}
				handleOnChange={selected => setChosenRepository(selected.target.value)}
			/>
			<DropdownWithTitle
				title="Select A Branch"
				description="Select the branch you would like to be reviewed"
				options={gitBranches?.map(branch => ({
					id: branch.name,
					text: branch.name,
					value: branch.name,
					default: branch.name.toLowerCase() === chosenBranch?.toLowerCase()
				})) ?? []}
				handleOnChange={selected => setChosenBranch(selected.target.value)}
			/>
			<button disabled={!chosenRepository && !chosenBranch} type="button" onClick={() => alert(`You selected ${chosenBranch} for ${chosenRepository}!`)}>
				Next
			</button>
		</main>
	);
}

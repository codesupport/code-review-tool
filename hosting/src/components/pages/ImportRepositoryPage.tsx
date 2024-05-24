import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { DropdownWithTitle }  from "../molecules/DropdownWithTitle";
import { useUser } from "../../hooks/useUser";
import { githubService } from "../../services/GitHubService";
import { gitRepositoryRepository } from "../../repositories/GitRepositoryRepository";
import { GitRepositoryModel } from "../../models/GitRepositoryModel";

export function ImportRepositoryPage() {
	const [user] = useUser();
	const [chosenRepository, setChosenRepository] = useState<string | undefined>();
	const [chosenBranch, setChosenBranch] = useState<string | undefined>();
	const navigate = useNavigate();

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

	const repositoryMutation = useMutation({
		mutationFn: async (newRepository: GitRepositoryModel) => gitRepositoryRepository.create(newRepository),
		onSuccess: (documentId) => {
			navigate(`../review/${documentId}`);
		}
	});

	useEffect(() => {
		if (chosenRepository) {
			setChosenBranch(gitRepositories?.find(repo => repo.name.toLowerCase() === chosenRepository.toLowerCase())?.default_branch)
		}
	}, [chosenRepository, gitRepositories]);

	const handleCreateRepository = async () => {
		if (!chosenRepository && !chosenBranch) return;

		try {
			const repo = gitRepositories?.find(({ name }) => name === chosenRepository);
			const branch = gitBranches?.find(({ name }) => name === chosenBranch);

			if (!repo || !branch || !user) {
				alert("Unable to create repository. Please be authenticated and select a repository and branch.");

				return;
			}

			console.log("Creating...");

			repositoryMutation.mutate({
				created: serverTimestamp(),
				git_url: repo.git_url.toLowerCase(),
				branch: branch.name,
				commit: branch.commit.sha,
				user: user.uid,
				reviewers: [],
				hash: `${repo.id}:${branch.commit.sha}`
			});
		} catch (error) {
			console.error(error);
		}
	};

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
			<button disabled={!chosenRepository && !chosenBranch} type="button" onClick={handleCreateRepository}>
				Next
			</button>
		</main>
	);
}

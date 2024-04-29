import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export function ErrorPage() {
	const error = useRouteError();

	if (isRouteErrorResponse(error)) {
		return (
			<main>
				<h1>Error {error.status}: {error.statusText}</h1>
				<code>
					{error.data}
				</code>
			</main>
		);
	}

	return (
		<main>
			<h1>Something Went Wrong...</h1>
		</main>
	);
}

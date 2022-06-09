import React from "react";
import { Typography, Box } from "@mui/material";

export class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error) {
		return { hasError: true };
	}

	render() {
		if (this.state.hasError) {
			return (
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						flexDirection: "column",
						textAlign: "center",
						p: 2,
					}}
				>
					<Typography component="h1" variant="h4">
						Wystąpił błąd przy ładowaniu strony. Sprawdź połączenie lub odśwież stronę.
					</Typography>
					<Typography>(może kiedyś dodam error boundary dla każdego komponentu)</Typography>
				</Box>
			);
		}

		return this.props.children;
	}
}

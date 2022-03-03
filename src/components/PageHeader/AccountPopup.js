import { forwardRef } from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { List, ListItem, Paper, Link, Typography, useMediaQuery } from "@mui/material";
import { signOut } from "@firebase/auth";

import { auth } from "../../firebase-config";

const AccountPopup = forwardRef((props, ref) => {
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
	const isAdmin = useSelector((state) => state.auth.isAdmin);

	const matchesSM = useMediaQuery((theme) => theme.breakpoints.up("sm"));

	return (
		<Paper
			ref={ref}
			sx={{
				backgroundColor: "white",
				position: "absolute",
				borderRadius: 1.5,
				top: matchesSM ? "74px" : "68px",
				right: "10px",
			}}
		>
			{isLoggedIn && isAdmin ? (
				<List>
					<ListItem divider>
						<Typography fontWeight="bolder">Zalogowano jako Admin</Typography>
					</ListItem>
					<ListItem button divider>
						<Link component={RouterLink} to="/admin">
							Admin panel
						</Link>
					</ListItem>
					<ListItem button>
						<Link
							onClick={() => {
								signOut(auth).catch((err) => console.error(err.message));
							}}
						>
							Wyloguj się
						</Link>
					</ListItem>
				</List>
			) : isLoggedIn ? (
				<List>
					<ListItem button divider>
						<Link component={RouterLink} to="/konto">
							Konto
						</Link>
					</ListItem>
					<ListItem button divider>
						<Link component={RouterLink} to="/konto/koszyk">
							Koszyk
						</Link>
					</ListItem>
					<ListItem button>
						<Link
							onClick={() => {
								signOut(auth).catch((err) => console.error(err.message));
							}}
						>
							Wyloguj się
						</Link>
					</ListItem>
				</List>
			) : (
				<List>
					<ListItem button>
						<Link component={RouterLink} to="/logowanie">
							Zaloguj się
						</Link>
					</ListItem>
				</List>
			)}
		</Paper>
	);
});

export default AccountPopup;

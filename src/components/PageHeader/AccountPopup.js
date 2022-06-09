import { forwardRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { List, ListItem, Paper, Typography, useMediaQuery, Button, styled } from "@mui/material";
import { signOut } from "@firebase/auth";
import { useNavigate } from "react-router-dom";

import { auth } from "../../firebase-config";

import { clearCart } from "../../features/Cart";

const AccountPopup = forwardRef((props, ref) => {
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
	const isAdmin = useSelector((state) => state.auth.isAdmin);

	const matchesSM = useMediaQuery((theme) => theme.breakpoints.up("sm"));

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const signOutOnClick = () => {
		signOut(auth)
			.then(() => {
				navigate("/logowanie");
			})
			.catch((err) => console.error(err.message));
		// clear cart in redux and LocalStorage after log out
		dispatch(clearCart());
	};

	return (
		<Paper
			ref={ref}
			sx={{
				position: "absolute",
				backgroundColor: "white",
				borderRadius: 1.5,
				top: matchesSM ? "74px" : "68px",
				right: 0,
			}}
		>
			{isLoggedIn && isAdmin ? (
				<List>
					<ListItem divider>
						<Typography fontWeight="bolder">Zalogowano jako Admin</Typography>
					</ListItem>
					<ListItemWithoutPadding divider>
						<Button component={RouterLink} to="/admin" variant="text">
							Admin panel
						</Button>
					</ListItemWithoutPadding>
					<ListItemWithoutPadding>
						<Button variant="text" onClick={signOutOnClick}>
							Wyloguj się
						</Button>
					</ListItemWithoutPadding>
				</List>
			) : isLoggedIn ? (
				<List>
					<ListItemWithoutPadding divider>
						<Button component={RouterLink} to="/konto" variant="text">
							Konto
						</Button>
					</ListItemWithoutPadding>
					<ListItemWithoutPadding divider>
						<Button component={RouterLink} to="/konto/koszyk" variant="text">
							Koszyk
						</Button>
					</ListItemWithoutPadding>
					<ListItemWithoutPadding>
						<Button component={RouterLink} to="/logowanie" variant="text" onClick={signOutOnClick}>
							Wyloguj się
						</Button>
					</ListItemWithoutPadding>
				</List>
			) : (
				<List>
					<ListItemWithoutPadding>
						<Button component={RouterLink} to="/logowanie" variant="text">
							Zaloguj się
						</Button>
					</ListItemWithoutPadding>
				</List>
			)}
		</Paper>
	);
});

export default AccountPopup;

const ListItemWithoutPadding = styled(ListItem)({
	padding: "0",
	"& *": {
		width: "100%",
	},
});

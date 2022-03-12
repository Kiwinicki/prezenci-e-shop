import { useEffect, useState } from "react";
import {
	AppBar,
	Toolbar,
	IconButton,
	Box,
	styled,
	useScrollTrigger,
	Slide,
	ClickAwayListener,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

// components
import Logo from "../Logo";
import SearchBar from "./SearchBar";
import AccountPopup from "./AccountPopup";

// hooks
import useToggle from "../../hooks/useToggle";

const HideOnScroll = ({ children }) => {
	const trigger = useScrollTrigger();

	return (
		<Slide appear={false} direction="down" in={!trigger}>
			{children}
		</Slide>
	);
};

const PageHeader = () => {
	const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

	// TODO: useToggle
	const [isOpen, toggler] = useToggle(false);

	return (
		<>
			<HideOnScroll>
				<AppBar>
					<Toolbar sx={{ gap: "10px" }}>
						<Logo />
						<Box flexGrow={1} />
						{/* TODO: dodać mechanikę szukania przez search bar */}
						<SearchBar />
						<ClickAwayListener onClickAway={() => toggler(false)}>
							<Box sx={{ position: "relative" }}>
								<IconButton size="large" color="inherit" aria-label="konto" onClick={toggler}>
									<PersonIcon />
								</IconButton>
								{isOpen ? <AccountPopup /> : null}
							</Box>
						</ClickAwayListener>
					</Toolbar>
				</AppBar>
			</HideOnScroll>
			<Offset />
		</>
	);
};

export default PageHeader;

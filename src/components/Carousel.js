import React, { useState } from "react";
import { Box, IconButton, Stack, styled, useMediaQuery } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import useActualBreakpoint from "../hooks/useActualBreakpoint";

const Carousel = ({ children }) => {
	const [index, setIndex] = useState(0);

	const isTouchscreen = useMediaQuery("(hover: none)");

	const [breakpointKey, breakpointVal] = useActualBreakpoint();

	const breakpontItemCount = {
		xs: 2,
		sm: 4,
		md: 4,
		lg: 5,
		xl: 5,
	};

	const nbrOfItemsFittingOnScreen = breakpontItemCount[breakpointKey];

	const moveForward = () => {
		setIndex((prevIndex) => {
			if (prevIndex < children.length - nbrOfItemsFittingOnScreen) {
				return prevIndex + 1;
			}
			if (prevIndex >= children.length - nbrOfItemsFittingOnScreen) {
				return prevIndex;
			}
		});
	};

	const moveBack = () => {
		setIndex((prevIndex) => (prevIndex <= 0 ? 0 : prevIndex - 1));
	};

	return (
		<CarouselWrapper>
			{!isTouchscreen && children.length > nbrOfItemsFittingOnScreen && (
				<NavButton back clickHandler={moveBack} />
			)}
			<Box
				sx={{
					overflow: isTouchscreen ? "scroll" : "hidden",
					position: "relative",
					width: "100%",
				}}
			>
				<ItemsList
					style={{
						"--transform": `translateX(calc(${-1 * index} * ${100 / nbrOfItemsFittingOnScreen}%))`,
					}}
				>
					{children}
				</ItemsList>
			</Box>
			{!isTouchscreen && children.length > nbrOfItemsFittingOnScreen && (
				<NavButton foward clickHandler={moveForward} />
			)}
		</CarouselWrapper>
	);
};

export default Carousel;

const CarouselWrapper = styled(Box)({
	display: "flex",
	alignItems: "center",
	maxWidth: "100vw",
	overflow: "hidden",
	position: "relative",
	justifyContent: "center",
});

const ItemsList = ({ children, style }) => {
	return (
		<Stack
			direction="row"
			style={style}
			sx={{
				transform: "var(--transform)",
				transition: "0.25s ease-in-out",
				"& > *": {
					flex: {
						xs: "0 0 50%",
						sm: `0 0 25%`,
						lg: "0 0 20%",
					},
				},
			}}
		>
			{children}
		</Stack>
	);
};

const NavButton = ({ clickHandler, foward, back }) => (
	<IconButton
		{...(foward && { "aria-label": "następny" })}
		{...(back && { "aria-label": "poprzedni" })}
		sx={{
			position: "absolute",
			...(foward ? { right: "20px" } : { left: "20px" }),
			zIndex: "1",
			bgcolor: "rgba(0, 0, 0, 0.1)",
		}}
		onClick={clickHandler}
	>
		{foward ? <ArrowForwardIosIcon /> : <ArrowBackIosNewIcon />}
	</IconButton>
);

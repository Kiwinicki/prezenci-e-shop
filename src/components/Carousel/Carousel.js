import { Box, IconButton, Stack, styled } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import { useCarousel } from "./useCarousel";

const Carousel = ({ children }) => {
	const { moveBack, moveForward, index, itemsOnScreen, isTouchscreen } = useCarousel(
		children.length
	);

	return (
		<CarouselWrapper>
			{!isTouchscreen && children.length > itemsOnScreen && (
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
						"--transform": `translateX(calc(${-1 * index} * ${100 / itemsOnScreen}%))`,
					}}
				>
					{children}
				</ItemsList>
			</Box>
			{!isTouchscreen && children.length > itemsOnScreen && (
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

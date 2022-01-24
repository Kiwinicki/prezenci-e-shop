import React, { useState } from 'react';
import { Box, IconButton, Stack, styled } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const Carousel = ({ children }) => {
	const [index, setIndex] = useState(0);

	const moveForward = () => {
		setIndex((prevIndex) => (prevIndex >= children.length - 3 ? children.length - 3 : prevIndex + 1));
	};

	const moveBack = () => {
		setIndex((prevIndex) => (prevIndex <= 0 ? 0 : prevIndex - 1));
	};

	return (
		<CarouselWrapper>
			<IconButton aria-label="poprzedni" sx={{ position: 'absolute', left: '10px', zIndex: '1', bgcolor: 'rgba(0, 0, 0, 0.1)' }} onClick={moveBack}>
				<ArrowBackIosNewIcon />
			</IconButton>
			<Box sx={{ overflow: 'hidden' }}>
				<CarouselItemsList direction="row" style={{ '--transform': `${-1 * (index * (100 / 3))}vw` }}>
					{children}
				</CarouselItemsList>
			</Box>
			<IconButton aria-label="następny" sx={{ position: 'absolute', right: '10px', zIndex: '1', bgcolor: 'rgba(0, 0, 0, 0.1)' }} onClick={moveForward}>
				<ArrowForwardIosIcon />
			</IconButton>
		</CarouselWrapper>
	);
};

export default Carousel;

const CarouselWrapper = styled(Box)({ display: 'flex', alignItems: 'center', maxWidth: '100vw' });
const CarouselItemsList = styled(Stack)({
	transform: `translateX(var(--transform))`,
	transition: '0.25s transform ease-in-out',
	'& > *': {
		flexBasis: 'calc(100vw/3)',
		flexShrink: '0',
	},
});

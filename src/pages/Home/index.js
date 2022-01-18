import { useEffect, useLayoutEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { getDocs, collection, onSnapshot } from '@firebase/firestore';
import { Grid, Box, Typography, Button, Card, CardMedia, CardContent, Stack, Paper, List, ListItem, ListItemButton, Divider, Link, ListItemText, Container, styled } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

// firebase config
// import { db } from '../../firebase-config';

// components
import Carousel from '../../components/Carousel';
import ProductCard from '../../components/ProductCard';
import Logo from '../../assets/logo.svg';
import HeroSection from './HeroSection';
import Loader from '../../components/Loader';

// hooks
// import useCollection from '../../hooks/useCollection';

// redux stuff
import { getData, getCategoriesList } from '../../features/Categories';

const HomePage = () => {
	// let categories = useCollection({ collectionName: 'categories' }); // optional argument: queryConditions: { filterField: 'key', condition: '==', value: 'PILLOWS' }

	const categoriesList = useSelector((state) => state.categories.value);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCategoriesList());
	}, []);

	return (
		<Grid container>
			<HeroSection />
			{/* Thematic products e.g Halloween */}
			<Grid item xs={12}>
				<Container sx={{ display: 'flex', flexDirection: 'column', gap: 2, textAlign: 'center', py: 2 }}>
					<SectionHeading>Produkty tematyczne</SectionHeading>
					<ProductCard img={Logo}>
						<Typography variant="h5">Halloween mask</Typography>
					</ProductCard>
					<ProductCard img={Logo}>
						<Typography variant="h5">Halloween pumpkin</Typography>
					</ProductCard>
				</Container>
			</Grid>
			{/* Categories list */}
			<Grid item xs={12}>
				<SectionHeading>Kategorie</SectionHeading>
				<List sx={{ width: '100%' }}>
					{categoriesList.length ? (
						categoriesList.map(({ path, name, key }) => (
							<ListItem key={key} disableGutters divider button component={RouterLink} to={`/${path}`}>
								<Typography sx={{ width: '100vw', textAlign: 'center' }}>{name}</Typography>
							</ListItem>
						))
					) : (
						<Loader />
					)}
				</List>
			</Grid>
			{/* Promotional occasions */}
			<Grid item xs={12}>
				<SectionHeading>Promocyjne okazje</SectionHeading>
				<Carousel sx={{}}>
					{[...Array(10)].map((el, i) => (
						<Card sx={{ px: '5px' }} elevation={0} key={i}>
							<CardMedia component="img" height="auto" image={Logo} alt={'prezent'} />
							<CardContent>product {i + 1}</CardContent>
						</Card>
					))}
				</Carousel>
				<Divider />
				<Button sx={{ width: '1' }} variant="text" component={RouterLink} to="/promocje-dupa-kupa-123">
					Zobacz więcej
				</Button>
			</Grid>
		</Grid>
	);
};

export default HomePage;

const SectionHeading = ({ children }) => (
	<Typography component="h2" variant="h5" fontWeight="bold">
		{children}
	</Typography>
);

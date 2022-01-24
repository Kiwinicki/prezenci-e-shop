import { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Grid, Typography, Button, Card, CardMedia, CardContent, Paper, List, ListItem, Divider, Link, Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

// components
import Carousel from '../../components/Carousel';
import ProductCard from '../../components/ProductCard';
import Logo from '../../assets/logo.svg';
import HeroSection from './HeroSection';
import Loader from '../../components/Loader';

// redux stuff
import { getCategoriesList } from '../../features/Categories';

const HomePage = () => {
	const categoriesList = useSelector((state) => state.categories.value);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCategoriesList());
	}, []);

	return (
		<Grid container sx={{ gap: 2, marginBottom: 2 }}>
			<HeroSection />

			{/* Thematic products e.g Halloween */}
			<GridItem>
				<SectionHeading>Produkty tematyczne</SectionHeading>
				<Container>
					{/* TODO: later fetching from firebase */}
					<ProductCard img={Logo}>
						<Typography variant="h5">Halloween mask</Typography>
					</ProductCard>
					<Divider />
					<ProductCard img={Logo}>
						<Typography variant="h5">Halloween pumpkin</Typography>
					</ProductCard>
				</Container>
			</GridItem>

			{/* Categories list */}
			<GridItem>
				<SectionHeading>Kategorie</SectionHeading>
				<List sx={{ width: '100%', padding: 0 }}>
					{categoriesList.length ? (
						categoriesList.map(({ path, name, key }, i) => (
							<ListItem key={key} disableGutters divider button sx={{ p: 0 }}>
								<Link component={RouterLink} to={`/${path}`} sx={{ color: 'grey.800', textDecoration: 'none', width: '100%', textAlign: 'center', py: 1.5 }}>
									<Typography>{name}</Typography>
								</Link>
							</ListItem>
						))
					) : (
						<Loader />
					)}
				</List>
			</GridItem>

			{/* Promotional occasions */}
			<GridItem>
				<SectionHeading sx={{ paddingBottom: 1 }}>Promocyjne okazje</SectionHeading>
				<Carousel>
					{[...Array(10)].map((el, i) => (
						<Card sx={{ px: '5px' }} elevation={0} key={i}>
							<CardMedia component="img" height="auto" image={Logo} alt={'prezent'} />
							<CardContent>product {i + 1}</CardContent>
						</Card>
					))}
				</Carousel>
				<Button sx={{ width: '100%', borderRadius: 0 }} variant="outlined" component={RouterLink} to="/promocje-dupa-kupa-123">
					Zobacz więcej
				</Button>
			</GridItem>
		</Grid>
	);
};

export default HomePage;

const SectionHeading = ({ children, sx }) => (
	<Typography component="h2" variant="h5" fontWeight="bold" textAlign="center" sx={sx}>
		{children}
	</Typography>
);

const GridItem = ({ children, sx }) => (
	<Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', gap: 2, textAlign: 'center', paddingTop: 1, ...sx }} component={Paper} elevation={0}>
		{children}
	</Grid>
);

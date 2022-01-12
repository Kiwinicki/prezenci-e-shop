import { useState } from 'react';
import { useForm } from 'react-hook-form';

import CATEGORIES from '../../CONSTANTS/CATEGORIES';

import { Select, Typography, Box, TextField, MenuItem, InputLabel, FormControl, Button } from '@mui/material';

const AdminPage = () => {
	const [value, setValue] = useState({
		'product-name': '',
		'category-select': '',
	});

	const handleChange = (e) => {
		setValue((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	// const handleSubmit = (e) => {
	// 	e.preventDefault();
	// 	console.log(value);
	// };

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		console.log(data);
	};

	return (
		<>
			<Typography variant="h2" sx={{ fontWeight: 'medium' }}>
				Admin Page
			</Typography>
			<Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
				<Typography variant="h4" component="h2">
					Add product
				</Typography>
				<TextField {...register('product-name')} label="product name:" variant="outlined" />
				<FormControl>
					<InputLabel id="category-select-label">Category:</InputLabel>
					<Select {...register('category-select')} labelId="category-select-label" label="Category:">
						{/* TODO: getting categories list from firebase */}
						{CATEGORIES.map((cat) => (
							<MenuItem value={cat.key} key={cat.key}>
								{cat.name}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<Button type="submit" variant="contained">
					Dodaj
				</Button>
			</Box>
			{/* TODO: remake to react-hook-forms */}
			<Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
				<Typography varian="h4">Add category</Typography>

				<TextField name="category-name" value={value['category-name']} onChange={handleChange} label="category name:" variant="standard" />
				{/* TODO: będzie trzeba pobierać listę kategorii z firebase */}
				<TextField label="category key:" variant="standard" />
				<TextField label="category path (without special characters):" variant="standard" />
				<Button type="submit" variant="contained">
					wyślij
				</Button>
			</Box>
		</>
	);
};

export default AdminPage;

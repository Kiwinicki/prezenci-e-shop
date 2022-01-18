import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

// import CATEGORIES from '../../CONSTANTS/CATEGORIES';

import { Select, Typography, Box, TextField, MenuItem, InputLabel, FormControl, Button } from '@mui/material';

const AdminPage = () => {
	const categoriesArr = useSelector((state) => state.categories.value);

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
						{categoriesArr.map((cat) => (
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

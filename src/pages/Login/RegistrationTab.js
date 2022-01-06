import { useForm } from 'react-hook-form';
import { TextField, Button } from '@mui/material';

const RegistrationTab = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	return (
		<>
			<TextField {...register('name', { required: true })} label="Nazwa użytkownika:" variant="outlined" />
			<TextField {...register('email', { required: true })} type="email" label="E-mail:" variant="outlined" />
			<TextField {...register('password', { required: true })} type="password" label="Hasło:" variant="outlined" />
			<Button type="submit" variant="contained">
				Zarejestruj się
			</Button>
		</>
	);
};

export default RegistrationTab;

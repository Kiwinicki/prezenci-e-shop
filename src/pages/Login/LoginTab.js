import { useForm } from 'react-hook-form';
import { TextField, Button } from '@mui/material';

const LoginTab = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	return (
		<>
			<TextField {...register('email', { required: true })} type="email" label="E-mail:" variant="outlined" />
			<TextField {...register('password', { required: true, minLength: 8 })} type="password" label="Hasło:" variant="outlined" />
			<Button type="submit" variant="contained">
				Zaloguj się
			</Button>
		</>
	);
};

export default LoginTab;

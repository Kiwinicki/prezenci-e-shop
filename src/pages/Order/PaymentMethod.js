import { Box, Typography, Radio, RadioGroup, FormControlLabel, Switch, Alert } from "@mui/material";
import { Controller } from "react-hook-form";

const PaymentMethod = ({ control, register, errors }) => {
	return (
		<Box>
			<Typography variant="h5" component="h3" fontWeight="bold">
				Metoda płatności
			</Typography>
			{errors.payment && <Alert severity="error">Pole wymagane!</Alert>}
			<Controller
				name="payment"
				defaultValue=""
				rules={{ required: true }}
				control={control}
				render={({ field }) => (
					<RadioGroup {...field}>
						<FormControlLabel value="Blik" control={<Radio />} label="Blik" />
						<FormControlLabel value="przelew" control={<Radio />} label="Przelew" />
						<FormControlLabel value="Google Pay" control={<Radio />} label="Google Pay" />
						<FormControlLabel value="PayPal" control={<Radio />} label="PayPal" />
					</RadioGroup>
				)}
			/>
			<FormControlLabel
				control={<Switch {...register("invoice")} />}
				label="Chcę otrzymać fakturę:"
				labelPlacement="start"
				sx={{ margin: 0 }}
			/>
		</Box>
	);
};

export default PaymentMethod;

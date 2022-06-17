import { Grid, Typography, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
// custom components
import SectionWrapper from "../../components/SectionWrapper";
import SectionHeading from "../../components/SectionHeading";
import EditableInfoField from "../../components/EditableInfoField";
// custom hooks
import useToggle from "../../hooks/useToggle";
// Redux
import { updateAuthState } from "../../features/Auth";
import getAccountExistenceTime from "../../utils/getAccountExistenceTime";

const AccountPage = () => {
	const { address, phone, email, userName, lastLogin, creationTime } = useSelector(
		(state) => state.auth
	);
	const dispatch = useDispatch();

	const { register, handleSubmit } = useForm();

	const creationDate = new Date(parseInt(creationTime));
	const creationDateString = creationDate.toLocaleDateString();
	const lastLoginDate = new Date(parseInt(lastLogin)).toLocaleDateString();
	const lastLoginTime = new Date(parseInt(lastLogin)).toLocaleTimeString();

	const { accountExistDays, accountExistMonths, accountExistYears } =
		getAccountExistenceTime(creationDate);

	const [isAddressEdited, toggleAddressEditing] = useToggle(false);
	const [isPhoneEdited, togglePhoneEditing] = useToggle(false);

	const submitHandler = (values) => {
		dispatch(updateAuthState(values));
		toggleAddressEditing(false);
		togglePhoneEditing(false);
	};

	return (
		<SectionWrapper>
			<SectionHeading>Konto</SectionHeading>
			<Grid container spacing={2} sx={{ p: 2 }}>
				<Grid item xs={12} sm={6}>
					<Typography variant="h4">Witaj {userName}!</Typography>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Typography variant="h5">Jesteś z nami: </Typography>
					<Typography variant="h5" sx={{ color: "primary.main" }}>
						{accountExistYears > 0 && `${accountExistYears} lat`}{" "}
						{accountExistMonths > 0 && `${accountExistMonths} miesięcy`}{" "}
						{accountExistDays > 0 && `${accountExistDays} dni`}
					</Typography>
				</Grid>
				<Grid
					item
					xs={12}
					sm={6}
					sx={{ display: "flex", flexDirection: "column", gap: 1, alignItems: "flex-start" }}
					component="form"
					onSubmit={handleSubmit(submitHandler)}
				>
					<Typography variant="h6">Edytuj dane kontaktowe</Typography>
					<EditableInfoField
						infoVal={address}
						infoName="Adres"
						inputName="address"
						inputLabel="adres dostawy"
						btnLabel="edytuj adress dostawy"
						registerFn={register}
						isFieldEdited={isAddressEdited}
						fieldToggler={toggleAddressEditing}
					/>
					<EditableInfoField
						infoVal={phone}
						infoName="Telefon"
						inputName="phone"
						inputLabel="numer telefonu"
						btnLabel="edytuj numer telefonu"
						registerFn={register}
						isFieldEdited={isPhoneEdited}
						fieldToggler={togglePhoneEditing}
					/>
					<Button variant="outlined" type="submit">
						Zapisz zmiany
					</Button>
				</Grid>
				<Grid item xs={12} sm={6} sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
					<Typography variant="h6">Pozostałe informacje</Typography>
					<Typography>E-mail: {email}</Typography>
					<Typography>
						Data poprzedniego logowania: {lastLoginDate} {lastLoginTime}
					</Typography>
					<Typography>Data założenia konta: {creationDateString}</Typography>
				</Grid>
			</Grid>
		</SectionWrapper>
	);
};

export default AccountPage;

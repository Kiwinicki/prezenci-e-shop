import { useState } from "react";
import { Box, Typography } from "@mui/material";

import EditableInfoField from "../../components/EditableInfoField";

import useToggle from "../../hooks/useToggle";

const ShipmentDetails = ({ register, userInfo }) => {
	const [address, setAddress] = useState(userInfo.address || "");
	const [phone, setPhone] = useState(userInfo.phone || "");

	const [isAddressEdited, toggleAddressEditing] = useToggle(false);
	const [isPhoneEdited, togglePhoneEditing] = useToggle(false);

	return (
		<Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
			<Typography variant="h5" component="h3" fontWeight="bold">
				Dane odbiorcy przesyłki
			</Typography>
			<EditableInfoField
				infoVal={address}
				infoName="Adres"
				inputName="address"
				inputLabel="adres dostawy"
				btnLabel="edytuj adress dostawy"
				registerFn={register}
				isFieldEdited={isAddressEdited}
				fieldToggler={toggleAddressEditing}
				required
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
				required
			/>
		</Box>
	);
};

export default ShipmentDetails;

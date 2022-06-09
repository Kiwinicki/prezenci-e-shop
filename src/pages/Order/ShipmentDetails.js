import { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import InputComponent from "../../components/InputComponent";

const ShipmentDetails = ({ register, userInfo }) => {
	const [address, setAddress] = useState(userInfo.address || "");
	const [phone, setPhone] = useState(userInfo.phone || "");

	const sharedInputProps = {
		registerFn: register,
		defaultValue: "",
		required: true,
	};

	return (
		<Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
			<Typography variant="h5" component="h3" fontWeight="bold">
				Dane odbiorcy przesyłki
			</Typography>
			{address ? (
				<Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
					<Typography>Adres: {address}</Typography>
					{/* TODO: onClick wstawia z powrotem input ale najpierw account page (EditableInfoField) */}
					<IconButton aria-label="edytuj adress dostawy" onClick={() => console.log("dupa1")}>
						<EditIcon />
					</IconButton>
				</Box>
			) : (
				<InputComponent name="address" label="adres dostawy" {...sharedInputProps} />
			)}
			{phone ? (
				<Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
					<Typography>Telefon: {phone}</Typography>
					{/* TODO: onClick wstawia z powrotem input */}
					<IconButton aria-label="edytuj numer telefonu" onClick={() => console.log("dupa2")}>
						<EditIcon />
					</IconButton>
				</Box>
			) : (
				<InputComponent name="phone" label="numer telefonu" type="tel" {...sharedInputProps} />
			)}
		</Box>
	);
};

export default ShipmentDetails;

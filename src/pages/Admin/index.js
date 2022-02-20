import { Grid, Typography } from "@mui/material";

// my components
import AddProductForm from "./AddProductForm";
import AddCategoryForm from "./AddCategoryForm";
import ChangeUpcomingHoliday from "./ChangeUpcomingHoliday";

const AdminPage = () => {
	return (
		<Grid container sx={{ my: 2 }}>
			<Grid item xs={12}>
				<Typography variant="h2" sx={{ fontWeight: "medium", textAlign: "center" }}>
					Admin Panel
				</Typography>
			</Grid>

			<Grid item xs={12}>
				<AddProductForm />
			</Grid>

			<Grid item xs={12}>
				<AddCategoryForm />
			</Grid>

			<Grid item xs={12}>
				<ChangeUpcomingHoliday />
			</Grid>
		</Grid>
	);
};

export default AdminPage;

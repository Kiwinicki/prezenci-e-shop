import { Grid, Typography } from "@mui/material";

// my components
import AddProductForm from "./AddProductForm";
import AddCategoryForm from "./AddCategoryForm";

const AdminPage = () => {
	return (
		<Grid container sx={{ gap: 2, my: 2 }}>
			<Grid item xs={12} sx={{ px: 2 }}>
				<Typography variant="h2" sx={{ fontWeight: "medium", textAlign: "center" }}>
					Admin Panel
				</Typography>
			</Grid>

			<Grid item xs={12} sx={{ px: 2 }}>
				<AddProductForm />
			</Grid>

			<Grid item xs={12} sx={{ px: 2 }}>
				<AddCategoryForm />
			</Grid>
		</Grid>
	);
};

export default AdminPage;

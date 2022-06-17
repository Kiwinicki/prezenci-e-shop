import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { updateDoc, doc } from "@firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";

import { db } from "../../firebase-config";
// redux
import { getCategoriesList } from "../../features/Categories";

// my components
import FormContainer from "../../components/FormContainer";
import SelectComponent from "../../components/SelectComponent";
import SectionEndButton from "../../components/SectionEndButton";
import SectionWrapper from "../../components/SectionWrapper";
import SectionHeading from "../../components/SectionHeading";

const ChangeUpcomingHoliday = () => {
	const [updateSucces, setUpdateSuccess] = useState(null);

	const { control, handleSubmit, reset } = useForm({
		defaultValues: {
			holiday_key: "",
		},
	});

	const onSubmit = ({ holiday_key }) => {
		const holidayKeyRef = doc(db, "upcoming_holiday", "upcoming_holiday");

		async function updateHolidayKey() {
			let matchingCategory = categoriesList.find((cat) => cat.key === holiday_key);

			await updateDoc(holidayKeyRef, {
				key: holiday_key,
				name: matchingCategory.name,
				slug: matchingCategory.slug,
			});

			setUpdateSuccess(true);
			reset();
			setTimeout(() => setUpdateSuccess(null), 7500);
		}
		updateHolidayKey();
	};

	const categoriesList = useSelector((state) => state.categories.value);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCategoriesList());
	}, []);

	return (
		<SectionWrapper>
			<SectionHeading>Zmień nadchodzące okazję</SectionHeading>
			<FormContainer
				onSubmit={handleSubmit(onSubmit)}
				submitErrorText="Wystąpił błąd przy zmianie rekordu"
				submitSuccessText="Pomyślnie zaaktualizowano rekord"
				formSubmitState={updateSucces}
			>
				<Box sx={{ display: "flex", flexDirection: "column", gap: 2, px: 2, pb: 2 }}>
					<SelectComponent
						name="holiday_key"
						control={control}
						label="Kategoria zbliżającego się święta:"
						requiredAlert="Podanie kategorii jest wymagane"
						optionsArr={categoriesList}
					/>
				</Box>
				<SectionEndButton type="submit">Zmień okazję</SectionEndButton>
			</FormContainer>
		</SectionWrapper>
	);
};

export default ChangeUpcomingHoliday;

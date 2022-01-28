import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { updateDoc, doc } from "@firebase/firestore";
import { useDispatch, useSelector } from "react-redux";

import { db } from "../../firebase-config";
// redux
import { getCategoriesList } from "../../features/Categories";

// my components
import FormContainer from "../../components/FormContainer";
import SelectComponent from "../../components/SelectComponent";

const ChangeUpcomingHoliday = () => {
	const [updateSucces, setUpdateSuccess] = useState(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const onSubmit = ({ holiday_key }) => {
		const holidayKeyRef = doc(db, "upcoming_holiday", "upcoming_holiday");

		async function updateHolidayKey() {
			let matchingCategory = categoriesList.find((cat) => cat.key === holiday_key);

			await updateDoc(holidayKeyRef, {
				key: holiday_key,
				path: matchingCategory.path,
				name: matchingCategory.name,
			});

			setUpdateSuccess(true);
			reset();
		}

		updateHolidayKey();
	};

	// getting categories list from redux
	const categoriesList = useSelector((state) => state.categories.value);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCategoriesList());
	}, []);

	const commonInputsProps = {
		registerFn: register,
		errorsObj: errors,
		required: true,
	};

	return (
		<FormContainer
			submitHandler={handleSubmit(onSubmit)}
			formTitle="Zmień nadchodzące okazję"
			submitBtnText="Zmień okazję"
			submitErrorText="Wystąpił błąd przy zmianie rekordu"
			submitSuccessText="Pomyślnie zaaktualizowano rekord"
			formSubmitState={updateSucces}
		>
			{/* TODO: add observer to categories list changes */}
			<SelectComponent
				name="holiday_key"
				{...commonInputsProps}
				label="Kategoria zbliżającego się święta:"
				alertText="Podanie kategorii jest wymagane"
				optionsArr={categoriesList}
				defaultValue={""}
			/>
		</FormContainer>
	);
};

export default ChangeUpcomingHoliday;

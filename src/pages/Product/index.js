import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

import { db } from "../../firebase-config";

// custom components
import SectionWrapper from "../../components/SectionWrapper";
import SectionHeading from "../../components/SectionHeading";

const Product = () => {
	const urlParams = useParams();
	console.log(urlParams);

	const [productData, setProductData] = useState(null);

	const docRef = doc(db, "products", urlParams.productId);

	useEffect(() => {
		(async () => {
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				console.log(docSnap.data());
				setProductData(docSnap.data());
			} else {
				console.error("nie ma takiego produktu");
			}
		})();
	}, []);

	return (
		<SectionWrapper>
			<SectionHeading>Strona produktu(w budowie): {productData?.name}</SectionHeading>
			<Typography>kategoria: {urlParams.categorySlug}</Typography>
			<Typography>id produktu: {urlParams.productId}</Typography>
		</SectionWrapper>
	);
};

export default Product;

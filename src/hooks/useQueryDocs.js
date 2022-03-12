import { useState, useEffect } from "react";
import { getDocs, query, where, limit } from "@firebase/firestore";

const useQueryDocs = ({ ref, limitAmount, fieldName, comparsionStr = "==", value }) => {
	const [fetchedDocs, setFethedDocs] = useState([]);

	let q = limitAmount
		? query(ref, where(fieldName, comparsionStr, value), limit(limitAmount))
		: query(ref, where(fieldName, comparsionStr, value));

	useEffect(() => {
		// don't make request if there is no value
		if (value !== undefined) {
			console.log(`making request for ${fieldName}`);

			getDocs(q).then((querySnap) => {
				let tempArr = [];

				if (!querySnap.empty) {
					querySnap.forEach((el) => tempArr.push(el.data()));
					setFethedDocs(tempArr); // if successfully downloaded return array with item/s
				} else {
					setFethedDocs(null); // if there is no items return null
				}
			});
		}
	}, [value, fieldName, limitAmount, ref, comparsionStr]);

	return fetchedDocs;
};

export default useQueryDocs;

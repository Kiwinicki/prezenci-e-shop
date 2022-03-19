import { useState, useEffect } from "react";
import { getDocs, query, where, limit } from "@firebase/firestore";

import { states as loadingStates } from "./useLoadingStateMachine";

const useQueryDocs = ({
	ref,
	limitAmount,
	fieldName,
	comparsionStr = "==",
	value,
	updateLoadingStateFn,
}) => {
	const [fetchedDocs, setFethedDocs] = useState([]);

	let q = limitAmount
		? query(ref, where(fieldName, comparsionStr, value), limit(limitAmount))
		: query(ref, where(fieldName, comparsionStr, value));

	useEffect(() => {
		// don't make request if there is no value
		if (value !== undefined) {
			updateLoadingStateFn && updateLoadingStateFn(loadingStates.isLoading);
			getDocs(q)
				.then((querySnap) => {
					let tempArr = [];

					if (!querySnap.empty) {
						querySnap.forEach((el) => tempArr.push({ ...el.data(), id: el.id }));
						setFethedDocs(tempArr); // if successfully downloaded return array with item/s
						updateLoadingStateFn && updateLoadingStateFn(loadingStates.hasLoaded);
					} else {
						setFethedDocs(null); // if there is no items return null
						updateLoadingStateFn && updateLoadingStateFn(loadingStates.hasLoaded);
					}
				})
				.catch((err) => {
					console.error(err);
					updateLoadingStateFn && updateLoadingStateFn(loadingStates.hasError);
				});
		}
	}, [value, fieldName, limitAmount, ref, comparsionStr]);

	return fetchedDocs;
};

export default useQueryDocs;

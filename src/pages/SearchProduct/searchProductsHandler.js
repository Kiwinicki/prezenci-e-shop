import generateSearchKeywords from "../../utils/generateSearchKeywords";
import { getDocs, query, where } from "firebase/firestore";

import { prodRef } from "../../firebase-config";

import { states as loadingStates } from "../../hooks/useLoadingStateMachine";

const searchProductsHandler = ({ searchWord = "", category, setResp, updateLoadingState }) => {
	updateLoadingState(loadingStates.isLoading);

	const searchKeywordsArr = generateSearchKeywords(searchWord).slice(0, 10); // firebase support max 10 items array to searching

	// FIXME: nie dokońca działa np. gdy wpiszę frazę walentynki i kategorię inną to i tak wyskakują produkty na walentynki
	const keywordsCondition = where("keywords", "array-contains-any", searchKeywordsArr);
	const categoryCondition = where("category", "==", category || "");
	const q = query(
		prodRef,
		category && searchWord
			? (categoryCondition, keywordsCondition)
			: searchWord
			? keywordsCondition
			: categoryCondition
	);

	getDocs(q)
		.then((querySnap) => {
			let tempArr = [];

			if (!querySnap.empty) {
				querySnap.forEach((el) => tempArr.push({ ...el.data(), id: el.id }));
				setResp(tempArr); // if successfully downloaded set array with item/s
				updateLoadingState(loadingStates.hasLoaded);
			} else {
				console.log(querySnap);
				setResp([]);
				// firebase don't throw error when connection failed, so I must check if the data is from cache
				if (querySnap.metadata.fromCache) {
					updateLoadingState(loadingStates.hasError);
				} else {
					updateLoadingState(loadingStates.hasLoaded);
				}
			}
		})
		.catch((err) => {
			console.error(err);
			setResp([]);
			updateLoadingState(loadingStates.hasError);
		});
};

export default searchProductsHandler;

import generateSearchKeywords from "../../utils/generateSearchKeywords";
import { getDocs, query, where } from "firebase/firestore";

import { prodRef } from "../../firebase-config";

import { states as loadingStates } from "../../hooks/useLoadingStateMachine";

const searchProductsHandler = ({ searchWord = "", category, updateLoadingState, setResp }) => {
	// if searchWord is too short don't search and set loadnig state to empty
	if (searchWord.length > 0 && searchWord.length < 3) {
		updateLoadingState(loadingStates.empty);
		return;
	}

	updateLoadingState(loadingStates.isLoading);

	const searchKeywordsArr = generateSearchKeywords(searchWord).slice(0, 10); // firebase support max 10 items array to searching
	const keywordsCondition = where("keywords", "array-contains-any", searchKeywordsArr);
	const categoryCondition = where("category", "==", category || "");

	let q;
	if (searchWord && category) {
		q = query(prodRef, keywordsCondition, categoryCondition);
	} else if (category) {
		q = query(prodRef, categoryCondition);
	} else if (searchWord) {
		q = query(prodRef, keywordsCondition);
	}

	getDocs(q)
		.then((querySnap) => {
			let tempArr = [];

			if (!querySnap.empty) {
				querySnap.forEach((el) => tempArr.push({ ...el.data(), id: el.id }));
				updateLoadingState(loadingStates.hasLoaded);
				setResp(tempArr);
			} else {
				// firebase don't throw error when connection failed, so I must check if the data is from cache
				if (querySnap.metadata.fromCache) {
					updateLoadingState(loadingStates.hasError);
				} else {
					updateLoadingState(loadingStates.hasLoaded);
					setResp(tempArr);
				}
			}
		})
		.catch((err) => {
			console.error("Error with fetching products: ", err);
			updateLoadingState(loadingStates.hasError);
		});
};

export default searchProductsHandler;

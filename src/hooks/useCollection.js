// import { useEffect, useState } from 'react';
// import { query, onSnapshot, collection, where } from '@firebase/firestore';

// import { db } from '../firebase-config';

// const useCollection = ({ collectionName, queryConditions: { filterField, condition, value } = false }) => {
// 	const [collectionArr, setCollection] = useState([]);

// 	const collectionRef = collection(db, collectionName);
// 	let q = null;

// 	if (filterField && condition && value) {
// 		q = query(collectionRef, where(filterField, condition, value));
// 	} else {
// 		q = query(collectionRef);
// 	}

// 	useEffect(() => {
// 		onSnapshot(q, (snapshot) => {
// 			try {
// 				setCollection(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
// 			} catch (err) {
// 				console.error(err.message);
// 			}
// 		});
// 	}, []);

// 	return collectionArr;
// };

// export default useCollection;

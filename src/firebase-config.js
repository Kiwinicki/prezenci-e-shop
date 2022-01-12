import { initializeApp } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyADUftELX3KWBT3_BYHZzljd4_9fc7TvNs',
	authDomain: 'prezencik-e-shop.firebaseapp.com',
	projectId: 'prezencik-e-shop',
	storageBucket: 'prezencik-e-shop.appspot.com',
	messagingSenderId: '529149166969',
	appId: '1:529149166969:web:6445254940fd38fde45ba8',
};

// init firebase app
const app = initializeApp(firebaseConfig);

// init services
export const db = getFirestore(app);

// collection refs
export const prodRef = collection(db, 'products');
export const catRef = collection(db, 'categories');

//
export const storage = getStorage(app);

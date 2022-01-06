import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyADUftELX3KWBT3_BYHZzljd4_9fc7TvNs',
	authDomain: 'prezencik-e-shop.firebaseapp.com',
	projectId: 'prezencik-e-shop',
	storageBucket: 'prezencik-e-shop.appspot.com',
	messagingSenderId: '529149166969',
	appId: '1:529149166969:web:6445254940fd38fde45ba8',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const storage = getStorage(app);

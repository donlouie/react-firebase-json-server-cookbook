import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
	apiKey: '',
	authDomain: '',
	projectId: '',
	storageBucket: '',
	messagingSenderId: '',
	appId: '',
};

//* init firebase
firebase.initializeApp(firebaseConfig);

//* init services
const projectFirestore = firebase.firestore();

export { projectFirestore };

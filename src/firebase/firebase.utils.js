import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCu10OWXZk5DIWoeVPj9nHaW-hj-WlC0OY",
    authDomain: "viabijou-517b3.firebaseapp.com",
    projectId: "viabijou-517b3",
    storageBucket: "viabijou-517b3.appspot.com",
    messagingSenderId: "658269911329",
    appId: "1:658269911329:web:e3b4fae9cf47cc8d426660",
    measurementId: "G-012D3MDQE7"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;
    
    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch(error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ promt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
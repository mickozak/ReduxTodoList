import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyAB65ogdMEAipez0uauFtl5GDzgFfNT7CQ",
    authDomain: "todo-5cf01.firebaseapp.com",
    databaseURL: "https://todo-5cf01.firebaseio.com",
    projectId: "todo-5cf01",
    storageBucket: "todo-5cf01.appspot.com",
    messagingSenderId: "684777237082"
};
firebase.initializeApp(config);



export const auth = firebase.auth()
export const database = firebase.database()
export const googleProvider = new firebase.auth.GoogleAuthProvider()

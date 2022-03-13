import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyAYufU19v7GbcdH8zlSENpx_D_yslA-kR0",
  authDomain: "vuechat-9eb19.firebaseapp.com",
  databaseURL: "https://vuechat-9eb19-default-rtdb.firebaseio.com",
  projectId: "vuechat-9eb19",
  storageBucket: "vuechat-9eb19.appspot.com",
  messagingSenderId: "955052840025",
  appId: "1:955052840025:web:3318e575f5a103de72cd48"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider }
export default db
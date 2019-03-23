import Vue from 'vue'
import VueFire from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/functions'

Vue.use(VueFire)

var config = {
  apiKey: "AIzaSyAjWPhyynhGaw1ovDt9jSL2wVKjHruo9cA",
  authDomain: "firebrok.firebaseapp.com",
  databaseURL: "https://firebrok.firebaseio.com",
  projectId: "firebrok",
  storageBucket: "firebrok.appspot.com",
  messagingSenderId: "671125632036"
};
firebase.initializeApp(config)

export const fire = firebase
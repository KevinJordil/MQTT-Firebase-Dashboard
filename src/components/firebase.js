import Vue from 'vue'
import VueFire from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/functions'

Vue.use(VueFire)

var config = {
  // Firebase config here
  };
firebase.initializeApp(config)

export const fire = firebase
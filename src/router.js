import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Automatons from './views/automatons/Automatons.vue'
import NewAutomaton from './views/automatons/NewAutomaton.vue'
import Automaton from './views/automatons/Automaton.vue'
import Login from './views/Login.vue'
import Signin from './views/Signin.vue'

Vue.use(Router)

import { fire } from "./components/firebase.js";

const router = new Router({
  mode: 'history',
  base: 'MQTT-Firebase-Dashboard',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/automatons',
      name: 'automatons',
      component: Automatons,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/automatons/new',
      name: 'newautomaton',
      component: NewAutomaton,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/automatons/:automatonId',
      name: 'automaton',
      component: Automaton,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiresNotLogged: true
      }
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin,
      meta: {
        requiresNotLogged: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {



  
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiresNotLogged = to.matched.some(record => record.meta.requiresNotLogged)


  fire.auth().onAuthStateChanged( user =>{
    if(!user && requiresAuth){
      next('login')
    }
    else if (user && requiresNotLogged){
      next('home')
    }
    else{
      next()
    }
  })  
})

export default router
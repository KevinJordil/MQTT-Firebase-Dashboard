<template>
  <div>
    <NavLogged v-if="authenticated != null"></NavLogged>
    <NavNotLogged v-else></NavNotLogged>
    <router-view name="navbar"/>
    <router-view/>
  </div>
</template>

<script>
  import NavLogged from "./components/navbar/Logged"
  import NavNotLogged from "./components/navbar/NotLogged"
  import { fire } from "./components/firebase.js"

  export default {
    data(){
      return {
        authenticated: null
      }      
    },
    components: {
      NavLogged,
      NavNotLogged
    },
    mounted () {
      fire.auth().onAuthStateChanged(user => {
        this.authenticated = user
      })
    }
  }

</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  /*margin-top: 60px;*/
}
</style>

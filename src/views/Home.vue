<template>
  <div class="container home">
    <h1>Accueil</h1>
    <p>user : {{ user }}</p>
  </div>
</template>

<script>
import { fire } from "../components/firebase.js"

export default {
  name: "Home",
  data() {
    return{
      user: fire.auth().currentUser
    }
  }
};
</script>

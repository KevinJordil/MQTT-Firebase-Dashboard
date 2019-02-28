<template>
  <div class="container home">
    <h1 class="title">Accueil</h1>
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

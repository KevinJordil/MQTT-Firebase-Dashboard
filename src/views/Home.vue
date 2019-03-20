<template>
  <div class="container home">
    <h1 class="title"><img src="../assets/logo.svg" width="40" height="40">  Firebrok Dashboard</h1>
    <p>Firebrok Dashboard est une application developpée pour pouvoir visualiser les données du <a href="https://github.com/CPNV-ES/FireBrok">Broker FireBrok</a>.</p>
    <p>Cette application utilise <a href="https://vuejs.org/">Vue.js</a>.</p>
    <p>Le dépôt Github de cette application est disponible <a href="https://github.com/KevinJordil/MQTT-Firebase-Dashboard">ici</a>.</p>
    <br>
    <p v-if="!user">Pour commencer, il faut vous <router-link :to="{name: 'login'}"><strong>connecter</strong></router-link>. Si vous n'avez pas de compte, vous pouvez vous <router-link :to="{name: 'signin'}" ><strong>inscrire</strong></router-link>.</p>
  </div>
</template>

<script>
import { fire } from "../components/firebase.js";

export default {
  name: "Home",
  data() {
    return {
      user: fire.auth().currentUser
    };
  }
};
</script>

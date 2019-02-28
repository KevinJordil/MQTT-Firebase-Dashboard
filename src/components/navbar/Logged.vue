<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link :to="{name: 'home'}" class="navbar-item">
        <img src="../../assets/logo_text_black.svg" width="200" height="200">
      </router-link>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <router-link :to="{name: 'home'}" class="navbar-item">Accueil</router-link>
        <router-link :to="{name: 'automatons'}" class="navbar-item">Automates</router-link>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <button @click="SignOut" class="button is-light">
              Deconnexion
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { fire } from "../../components/firebase.js"

export default {
  name: "NavLogged",
  methods: {
    SignOut() {
      fire
        .auth()
        .signOut()
        .then(() => {});
    }
  }
};
</script>
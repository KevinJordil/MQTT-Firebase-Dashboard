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
          <b-dropdown aria-role="list" position="is-bottom-left">
            <a class="navbar-item" slot="trigger" role="button">
              <img :src="user.photoURL">
              {{ user.displayName }}
              <b-icon icon="menu-down"></b-icon>
            </a>
            <b-dropdown-item aria-role="listitem" @click="ShowId">Mon id</b-dropdown-item>
            <b-dropdown-item aria-role="listitem" @click="SignOut">Deconnexion</b-dropdown-item>
          </b-dropdown>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { fire } from "../../components/firebase.js";

export default {
  name: "NavLogged",
  data() {
    return {
      user: ""
    };
  },
  methods: {
    ShowId() {
      this.$dialog.alert({
        title: "Mon Id",
        message: `Mon identifiant est : <strong>${this.user.uid}</strong>`,
        confirmText: "OK, j'ai noté !"
      });
    },
    SignOut() {
      try {
        fire
          .auth()
          .signOut()
          .then(() => {});
      } catch (e) {
        // catch error
      }
    }
  },
  mounted: async function() {
    this.user = await fire.auth().currentUser;
  }
};
</script>
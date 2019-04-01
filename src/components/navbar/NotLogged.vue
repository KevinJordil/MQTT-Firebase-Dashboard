<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link :to="{name: 'home'}" class="navbar-item">
        <img src="../../assets/logo_text_black.svg" width="200" height="200">
      </router-link>
      <a
        role="button"
        class="navbar-burger burger"
        :class="{ 'is-active': toggle_burger }"
        data-target="navMenu"
        aria-label="menu"
        aria-expanded="false"
        @click="toggle_burger = !toggle_burger"
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu" :class="{ 'is-active': toggle_burger }">
      <div class="navbar-start">
        <router-link :to="{name: 'home'}" class="navbar-item">Accueil</router-link>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <router-link :to="{name: 'signin'}" class="button is-primary">
              <strong>Inscription</strong>
            </router-link>
            <router-link :to="{name: 'login'}" class="button is-light">Connexion</router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavNotLogged",
  data() {
    return {
      toggle_burger: false
    };
  },
};
</script>
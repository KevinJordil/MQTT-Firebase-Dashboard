<template>
  <div class="container login">
    <section class="column">
      <form @submit.prevent="validateBeforeSubmit">
        <b-field
          label="Adresse e-mail"
          :type="{'is-danger': errors.has('email')}"
          :message="errors.first('email')"
        >
          <b-input
            data-vv-as="Adresse e-mail"
            type="email"
            v-model="email"
            name="email"
            v-validate="'required'"
          />
        </b-field>

        <b-field
          label="Mot de passe"
          :type="{'is-danger': errors.has('password')}"
          :message="errors.first('password')"
        >
          <b-input
            data-vv-as="Mot de passe"
            type="password"
            v-model="password"
            name="password"
            v-validate="'required'"
            password-reveal
          />
        </b-field>
        <b-field grouped position="is-right">
          <button type="submit" class="button is-primary">Connexion</button>
        </b-field>
      </form>
    </section>
  </div>
</template>

<script>

import { fire } from "../components/firebase.js";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    async validateBeforeSubmit() {
      let result = await this.$validator.validateAll();
      if (result) {
        try {
          await fire
            .auth()
            .signInWithEmailAndPassword(this.email, this.password);
          this.$toast.open({
            message: "Authentification réussie",
            type: "is-success"
          });
          this.$router.push({name: 'automatons'})
        } catch (e) {
          this.$toast.open({
            message: "Erreur de connexion",
            type: "is-danger"
          });
        }
        return;
      }
      this.$toast.open({
        message: "Il y a des erreurs dans le formulaire",
        type: "is-danger"
      });
    }
  }
};
</script>
<template>
  <div class="container signin">
    <section class="column">
      <form @submit.prevent="validateBeforeSubmit">
        <b-field
          label="Prénom"
          :type="{'is-danger': errors.has('firstname')}"
          :message="errors.first('firstname')"
        >
          <b-input
            data-vv-as="Prénom"
            v-model="firstname"
            name="firstname"
            v-validate="'required'"
          />
        </b-field>

        <b-field
          label="Nom"
          :type="{'is-danger': errors.has('lastname')}"
          :message="errors.first('lastname')"
        >
          <b-input data-vv-as="Nom" v-model="lastname" name="lastname" v-validate="'required'"/>
        </b-field>

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
            v-validate="'required|min:8'"
            password-reveal
          />
        </b-field>

        <b-field
          label="Confirmer le mot de passe"
          :type="{'is-danger': errors.has('confirm-password')}"
          :message="[{ 'Le champ Confirmer le mot de passe est obligatoire.' : errors.firstByRule('confirm-password', 'required'), 'les mots de passe ne correspondent pas' : errors.firstByRule('confirm-password', 'is')}]"
        >
          <b-input
            data-vv-as="Confirmer le mot de passe"
            type="password"
            v-model="confirmPassword"
            name="confirm-password"
            v-validate="{ required: true, is: password }"
            password-reveal
          />
        </b-field>

        <b-field grouped position="is-right">
          <button type="submit" class="button is-primary">Inscription</button>
        </b-field>
      </form>
    </section>
  </div>
</template>

<script>
import { fire } from "../components/firebase.js";

export default {
  name: "Signin",
  data() {
    return {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
      submitted: false
    };
  },
  methods: {
    async validateBeforeSubmit() {
      let result = await this.$validator.validateAll();
      if (result) {
        try {
          await fire
            .auth()
            .createUserWithEmailAndPassword(this.email, this.password);
          let randNumb = Math.floor(Math.random() * 100) + 1 
          await fire.auth().currentUser.updateProfile({
            displayName: `${this.firstname} ${this.lastname}`,
            photoURL: `https://loremflickr.com/200/200/all?lock=${randNumb}`
          });
          this.$toast.open({
            message: "Inscription réussie",
            type: "is-success"
          });
          this.$router.push({ name: "automatons" });
        } catch (e) {
          this.$toast.open({
            message: "Erreur lors de l'inscription",
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
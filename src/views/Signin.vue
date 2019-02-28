<template>
  <div class="container signin">
    <section class="column">
      <form @submit.prevent="validateBeforeSubmit">
        <b-field label="Prénom" :type="{'is-danger': errors.has('firstname')}" :message="errors.first('firstname')">
          <b-input data-vv-as="Prénom" v-model="firstname" name="firstname" v-validate="'required'"/>
        </b-field>

        <b-field label="Nom" :type="{'is-danger': errors.has('lastname')}" :message="errors.first('lastname')">
          <b-input data-vv-as="Nom" v-model="lastname" name="lastname" v-validate="'required'"/>
        </b-field>

        <b-field label="Adresse e-mail" :type="{'is-danger': errors.has('email')}" :message="errors.first('email')">
          <b-input data-vv-as="Adresse e-mail" type="email" v-model="email" name="email" v-validate="'required'"/>
        </b-field>

        <b-field label="Mot de passe" :type="{'is-danger': errors.has('password')}" :message="errors.first('password')">
          <b-input data-vv-as="Mot de passe" type="password" v-model="password" name="password" v-validate="'required|min:8'" password-reveal/>
        </b-field>

        <b-field label="Confirmer le mot de passe" :type="{'is-danger': errors.has('confirm-password')}" :message="[{ 'Le champ Confirmer le mot de passe est obligatoire.' : errors.firstByRule('confirm-password', 'required'), 'les mots de passe ne correspondent pas' : errors.firstByRule('confirm-password', 'is')}]">
          <b-input data-vv-as="Confirmer le mot de passe" type="password" v-model="confirmPassword" name="confirm-password" v-validate="{ required: true, is: password }" password-reveal/>
        </b-field>

        <b-field grouped position="is-right">
          <button type="submit" class="button is-primary">Inscription</button>
        </b-field>
      </form>
    </section>
  </div>
</template>

<script>
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
    validateBeforeSubmit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$toast.open({
            message: "Form is valid!",
            type: "is-success",
            position: "is-bottom"
          });
          return;
        }
        this.$toast.open({
          message: "Form is not valid! Please check the fields.",
          type: "is-danger",
          position: "is-bottom"
        });
      });
    }
  }
};
</script>
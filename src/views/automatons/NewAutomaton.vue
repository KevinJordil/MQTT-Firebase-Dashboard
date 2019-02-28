<template>
  <div class="container">
    <br>
    <h1 class="title">Nouvel automate</h1>
    <form @submit.prevent="validateBeforeSubmit">
      <b-field
        label="Nom de l'automate"
        :type="{'is-danger': errors.has('name')}"
        :message="errors.first('name')"
      >
        <b-input data-vv-as="Nom de l'automate" v-model="name" name="name" v-validate="'required'"/>
      </b-field>

      <b-field
        label="Description"
        :type="{'is-danger': errors.has('description')}"
        :message="errors.first('description')"
      >
        <b-input
          data-vv-as="Mot de passe"
          v-model="description"
          type="textarea"
          name="description"
          v-validate="'required'"
        />
      </b-field>
      <b-field grouped position="is-right">
        <button type="submit" class="button is-primary">Création</button>
      </b-field>
    </form>
  </div>
</template>

<script>
import { fire } from "../../components/firebase.js";

export default {
  name: "NewAutomaton",
  data() {
    return {
      name: "",
      description: ""
    };
  },
  methods: {
    async createAutomaton() {
      fire
        .app()
        .functions("europe-west1")
        .httpsCallable("create_automaton")({
          name: this.name,
          description: this.description
        })
        .then(result => {
          this.$dialog.alert({
            title: "Votre automate a été créé",
            message: `Donnée de connexion pour l'automate :<br><strong>Utilisateur : </strong>${
              this.name
            }<br><strong>Mot de passe : </strong>${result.data.automatonId}`,
            confirmText: "OK, j'ai noté !"
          });
        });
    },
    async validateBeforeSubmit() {
      let result = await this.$validator.validateAll();
      if (result) {
        await this.createAutomaton();
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
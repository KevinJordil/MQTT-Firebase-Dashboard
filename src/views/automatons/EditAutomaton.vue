<template>
  <div class="container automatons">
    <br>
    <div v-if="!exist">
      <b-message title="Erreur" :closable="false" type="is-danger" has-icon>L'automate n'existe pas</b-message>
    </div>
    <div v-else-if="!automaton">
      <b-message
        title="Chargement"
        :closable="false"
        type="is-info"
        has-icon
      >L'automate est en cours de chargement ...</b-message>
    </div>
    <div v-else>
      <h1 class="title">Edition de l'automate</h1>
      <form @submit.prevent="validateBeforeSubmit(1)">
        <b-field
          label="Nom de l'automate"
          :type="{'is-danger': errors.has('name')}"
          :message="errors.first('name')"
        >
          <b-input
            data-vv-as="Nom de l'automate"
            v-model="automaton.name"
            name="name"
            v-validate="'required'"
          />
        </b-field>

        <b-field
          label="Description"
          :type="{'is-danger': errors.has('description')}"
          :message="errors.first('description')"
        >
          <b-input
            data-vv-as="Description"
            v-model="automaton.description"
            type="textarea"
            name="description"
            v-validate="'required'"
          />
        </b-field>
        <b-field grouped position="is-right">
          <button type="submit" class="button is-primary">Sauver</button>
        </b-field>
      </form>
      <h1 class="subtitle">Ajouter un utilisateur autorisé</h1>
      <form @submit.prevent="validateBeforeSubmit(2)">
        <b-field
          label="Id de l'utilisateur"
          :type="{'is-danger': errors.has('newUserId')}"
          :message="errors.first('newUserId')"
        >
          <b-input
            data-vv-as="Identifiant de l'utilisateur"
            v-model="newUserId"
            name="newUserId"
            v-validate="'required'"
          />
        </b-field>
        <b-field grouped position="is-right">
          <button type="submit" class="button is-primary">Ajouter</button>
        </b-field>
      </form>
    </div>
    <b-loading :is-full-page="true" :active.sync="isLoading" :can-cancel="false"></b-loading>
  </div>
</template>

<script>
import { fire } from "../../components/firebase.js";
import { Promise } from 'q';

export default {
  name: "EditAutomaton",
  data() {
    return {
      newUserId: "",
      isLoading: false,
      authorizedUsers: [],
      exist: true,
      automaton: ""
    };
  },
  methods: {
    openLoading() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 120 * 1000);
    },
    async validateBeforeSubmit(id) {
      let result = ''
      if(id == 1){
        result = Promise.all([
          this.$validator.validate('name', this.automaton.name),
          this.$validator.validate('description', this.automaton.description)
        ])
      }
      else if(id == 2){
        result = await this.$validator.validate('newUserId', this.newUserId);
      }
      
      if (result) {
        this.openLoading();
        if (id == 1) {
          await this.updateAutomaton();
        } else if (id == 2) {
          await this.addAuthorizedUser();
        }
        this.$router.push({name: 'automatons'}) 
        return;
      }
      this.$toast.open({
        message: "Il y a des erreurs dans le formulaire",
        type: "is-danger"
      });
    },
    async updateAutomaton() {
      fire
        .firestore()
        .collection("automatons")
        .doc(this.automaton.id)
        .set(
          {
            name: this.automaton.name,
            description: this.automaton.description
          },
          { merge: true }
        )
        .then(() => {
          this.$toast.open({
            message: "Automate mis à jour avec succès",
            type: "is-success"
          });
          this.isLoading = false;
        });
    },
    async addAuthorizedUser() {
      let newAuthorizedUsers = this.automaton.authorized_users;
      newAuthorizedUsers.push(this.newUserId);
      fire
        .firestore()
        .collection("automatons")
        .doc(this.automaton.id)
        .set(
          {
            authorized_users: newAuthorizedUsers
          },
          { merge: true }
        )
        .then(() => {
          this.$toast.open({
            message: "Utilisateur ajouté avec succès",
            type: "is-success"
          });
          this.isLoading = false;
        });
    }
  },
  watch: {},
  mounted: () => {
    fire
      .firestore()
      .collection("automatons")
      .doc(this.$route.params.automatonId)
      .get()
      .then(doc => {
        if (!doc.exists) {
          this.exist = false;
        }
      });
  },
  firestore() {
    return {
      automaton: fire
        .firestore()
        .collection("automatons")
        .doc(this.$route.params.automatonId)
    };
  }
};
</script>
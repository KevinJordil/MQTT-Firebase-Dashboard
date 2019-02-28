<template>
  <div class="container automatons">
    <br>
    <div v-if="!exist">
      <b-message title="Erreur" :closable="false" type="is-danger" has-icon>L'automate n'existe pas</b-message>
    </div>
    <div v-else-if="!automaton">
      <b-loading :is-full-page="true" :active.sync="isLoading" :can-cancel="false"></b-loading>
    </div>
    <div v-else>
      <h1 class="title">Automate {{ automaton.name }}</h1>
      <div>
        <strong>Utilisateur :</strong>
        {{ automaton.name }}
        <br>
        <strong>Mot de passe :</strong>
        {{ automaton.id }}
        <br>
        <br>
      </div>
      <b-table :data="topics">
        <template slot-scope="props">
          <b-table-column field="name" label="Nom du topic">
            <a @click="selectTopic(props.row.name)">{{ props.row.name }}</a>
          </b-table-column>
          <b-table-column
            field="created_at"
            label="Créé le"
            centered
          >{{ new Date(props.row.created_at.toDate()).toLocaleDateString() }}</b-table-column>
          <b-table-column
            field="updated_at"
            label="Dernière donnée reçue"
            centered
          >{{ new Date(props.row.updated_at.toDate()).toLocaleDateString() }}</b-table-column>
        </template>
      </b-table>
    <b-table v-if="fluxTopic" :data="fluxTopic">
        <template slot-scope="props">
          <b-table-column field="name" label="Nom du topic">
            {{ props.row.name }}
          </b-table-column>
          <b-table-column
            field="created_at"
            label="Créé le"
            centered
          >{{ new Date(props.row.created_at.toDate()).toLocaleDateString() }}</b-table-column>
          <b-table-column
            field="updated_at"
            label="Dernière donnée reçue"
            centered
          >{{ new Date(props.row.updated_at.toDate()).toLocaleDateString() }}</b-table-column>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import { fire } from "../../components/firebase.js";

export default {
  name: "Automaton",
  data() {
    return {
      isLoading: false,
      exist: true,
      automaton: "",
      topics: [],
      topic: '',
      fluxTopic: []
    };
  },
  methods:{
      selectTopic(name){
          this.topic = name
      }
  },
  mounted: function() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 60 * 1000);
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
        .doc(this.$route.params.automatonId),
      topics: fire
        .firestore()
        .collection("automatons")
        .doc(this.$route.params.automatonId)
        .collection("topics")
    };
  }
};
</script>
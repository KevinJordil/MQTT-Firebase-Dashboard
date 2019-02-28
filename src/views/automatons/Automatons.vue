<template>
  <div class="container automatons">
    <br>
    <h1 class="title">Listes des automates</h1>
      <b-table :data="automatons">
        <template slot-scope="props">
          <b-table-column field="name" label="Nom de l'automate"><router-link :to="{name: 'automaton', params : {automatonId: props.row.id}}">{{ props.row.name }}</router-link></b-table-column>
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
          <b-table-column field="connected" label="Connexion" centered>
            <b-icon
              pack="mdi"
              :type="props.row.connected === true ? 'is-success' : 'is-danger'"
              :icon="props.row.connected === true ? 'lan-connect' : 'lan-disconnect'"
            ></b-icon>
          </b-table-column>
        </template>
      </b-table>
      <br>
      <b-field grouped position="is-right">
        <router-link :to="{name: 'newautomaton'}" class="button is-primary">Nouvel automate</router-link>
      </b-field>
  </div>
</template>

<script>
import { fire } from "../../components/firebase.js"

export default {
  name: "Automatons",
  data() {
    return {
      automatons: []
    };
  },
  firestore() {
    return {
      automatons: fire.firestore().collection("automatons")
    };
  }
};
</script>
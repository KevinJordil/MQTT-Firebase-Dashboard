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
      <p v-if="topic.length == 0 && topics.length > 0" class="help has-text-grey is-italic">Cliquer sur un topic pour afficher ses valeurs</p>
      <div v-if="topic.length > 0">
        <br>
        <b-dropdown aria-role="list">
          <button class="button is-primary" slot="trigger">
            <span>Graphique</span>
            <b-icon icon="menu-down"></b-icon>
          </button>
          <b-dropdown-item aria-role="listitem" @click="selectGraph('graphbar')">Graphique en barres</b-dropdown-item>
          <b-dropdown-item
            aria-role="listitem"
            @click="selectGraph('graphline')"
          >Graphique en lignes</b-dropdown-item>
        </b-dropdown>
        <p v-if="!graphselected()" class="help has-text-grey is-italic">Choisissez un graphique via le menu déroulant ci-dessus</p>
        <br><br>
        <div v-if="graphselected()">    
          <p>Données affichées comprise entre le <strong>{{ sliderDate[1] }}</strong> et le <strong>{{ sliderDate[0] }}</strong></p><br>
          <p class="subtitle">Selection de la plage de données du topic <strong>{{ topic }}</strong></p>
          <vue-slider v-model="numberData" :min="0" :min-range="2" :max-range="200" :max="fluxTopic.length" :enable-cross="false" direction="rtl"></vue-slider>
        </div>
        <graph-bar
          v-if="graphbar"
          :height="400"
          :axis-min="0"
          :axis-max="Math.max.apply(null, fluxTopicGraphData)"
          :labels="labelsFluxTopic"
          :values="fluxTopicGraphData"
        >
          <tooltip :names="labelsFluxTopic" :position="'top'"></tooltip>
        </graph-bar>

        <graph-area
          v-if="graphline"
          :height="400"
          :shape="'normal'"
          :axis-min="0"
          :axis-max="Math.max.apply(null, fluxTopicGraphData)"
          :axis-full-mode="true"
          :labels="labelsFluxTopic"
          :values="fluxTopicGraphData"
        >
          <guideline :tooltip-y="true"></guideline>
        </graph-area>
      </div>
    </div>
  </div>
</template>

<script>
import { fire } from "../../components/firebase.js";

export default {
  name: "Automaton",
  data() {
    return {
      exist: true,
      automaton: "",
      topics: [],
      topic: "",
      graphbar: false,
      graphline: false,
      numberData: [0, 2],
      sliderDate: [],
      colors: () => {
        return "#7977C2";
      },
      styles: {
        titleFontSize: 15,
        titleFontWeight: "bold"
      },
      fluxTopic: [],
      labelsFluxTopic: [],
      fluxTopicGraphData: [],
    };
  },
  methods: {
    selectTopic(name) {
      this.numberData = [0, 2];
      this.topic = name;
      this.$bind(
        "fluxTopic",
        fire
          .firestore()
          .collection("automatons")
          .doc(this.$route.params.automatonId)
          .collection("topics")
          .doc(name)
          .collection("flux")
          .orderBy("timestamp", "desc")
      );
    },
    selectGraph(type) {
      this.graphbar = false;
      this.graphline = false;
      switch (type) {
        case "graphbar":
          this.graphbar = true;
          break;
        case "graphline":
          this.graphline = true;
          break;
        default:
        // Nothing
      }
    },
    setGraphData(data, numberData) {
      if (numberData) {
        this.fluxTopicGraphData = data
          .slice(numberData[0], numberData[1])
          .map(({ message }) => parseFloat(message))
          .reverse()
      } else {
        this.fluxTopicGraphData = data
          .map(({ message }) => parseFloat(message))
          .reverse();
      }

      let tempDate = new Date(data[numberData[0]].timestamp.toDate())
      this.sliderDate[0] = `${tempDate.getDate()}/${tempDate.getMonth()}/${tempDate.getFullYear()} ${tempDate.getHours()}:${tempDate.getMinutes()}:${tempDate.getSeconds()}`
      
      tempDate = new Date(data[numberData[1]].timestamp.toDate())
      this.sliderDate[1] = `${tempDate.getDate()}/${tempDate.getMonth()}/${tempDate.getFullYear()} ${tempDate.getHours()}:${tempDate.getMinutes()}:${tempDate.getSeconds()}`

      this.labelsFluxTopic = new Array(this.fluxTopicGraphData.length);
    },
    graphselected() {
      if (this.graphbar || this.graphline) {
        return true;
      } else {
        return false;
      }
    }
  },
  watch: {
    fluxTopic: function(data) {
      this.setGraphData(data, this.numberData);
    },
    numberData: function(numberData) {
      this.setGraphData(this.fluxTopic, numberData);
    }
  },
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
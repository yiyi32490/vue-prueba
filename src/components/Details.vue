<template>
  <v-card max-width="830" class="mx-auto">
    <v-card-title class="card-title">Detalles</v-card-title>
    <v-card-text>
      <p>
        <span>Nombre: </span>
        <span>{{personalInfo.name}}</span>
      </p>
      <p>
        <span>Apellidos: </span>
        <span>{{personalInfo.lastName}}</span>
      </p>
      <p>
        <span>G&eacute;nero: </span>
        <span>{{getGenders}}</span>
      </p>
      .
      .
      .
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      genders: this.$store.state.genders,
      personalInfo: this.$store.state.personalInfo
    }
  },
  computed: {
    getGenders() {
      return this.personalInfo.gender === -1 ? '' : this.genders[this.personalInfo.gender].type
    }
  }
};
</script>

<style scoped>

</style>


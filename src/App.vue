<template>
  <v-app>
    <v-content>
      <v-tabs>
        <v-tab>
          Informaci&oacute;n Personal
        </v-tab>
        <v-tab>
          Detalles
        </v-tab>
        <v-tab-item>
          <div class="padding-top30"></div>
          <Info />
        </v-tab-item>
        <v-tab-item>
          <div class="padding-top30"></div>
          <Details />
        </v-tab-item>
      </v-tabs>
    </v-content>
  </v-app>
</template>

<script>
import Info from './components/Info';
import Details from './components/Details';

export default {
  name: 'App',
  components: {
    Info,
    Details
  },
  data: () => ({
    //
  }),
  created() {
    this.$store.dispatch('getInfoFromLocalStorage')
  }
};
</script>

<style>
  /*@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons');*/
  .v-content__wrap {
    background-color: white !important;
  }
  .padding-top30 {
    padding-top: 30px;
  }
</style>
<template>
  <v-card max-width="830" class="mx-auto">
    <v-card-title class="card-title">Datos personales</v-card-title>
    <v-card-text>
      <v-form>
        <v-container>
          <v-row no-gutters>
            <v-col cols="12" md="1">
              <v-avatar color="rgb(38,198,218)" size="62">
                <span class="white--text headline"></span>
              </v-avatar>
              <v-icon class="camera-icon">fa-camera</v-icon>
            </v-col>
            <v-col cols="12" md="5">
              <v-text-field
                v-model="personalInfo.name"
                @change="updatePersonalInfo"
                label="Nombre*"
                class="name-input"
                single-line
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="personalInfo.lastName"
                @change="updatePersonalInfo"
                label="Apellidos"
                class="lastname-input"
                single-line
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="12" md="6">
              <v-sheet>
                <v-chip-group
                  v-model="personalInfo.gender"
                  @change="updatePersonalInfo"
                  class="gender-group"
                  column
                  mandatory
                  active-class="primary--text"
                >
                  <v-chip 
                    v-for="gender in genders" 
                    :key="gender.type"
                    :class="gender.type"
                    label>
                    <v-icon>{{gender.icon}}</v-icon>
                    {{ gender.type }}
                  </v-chip>
                </v-chip-group>
              </v-sheet>
            </v-col>
          </v-row>
          <v-row 
            v-for="(identification, index) in personalInfo.identifications" 
            :key="index"
            class="row3"
            no-gutters>
            <v-col class="d-flex" cols="12" md="6">
              <v-select
                :items="idTypes"
                v-model="identification.type"
                @change="updatePersonalInfo"
                class="id-select"
                label="Tipo de identificación"
              ></v-select>
            </v-col>
            <v-col class="d-flex" cols="12" md="6">
              <v-text-field
                v-model="identification.id"
                @change="updatePersonalInfo"
                class="id-input"
                label="Número de identificación"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row no-gutters class="row4">
            <v-col>
              <v-btn
                color="rgb(38,198,218)"
                elevation=0
                @click="addAnotherId"
                text
                class="add-button"
                >AGREGAR OTRA IDENTIFICACI&oacute;N
              </v-btn>
            </v-col>
          </v-row>
          <span class="subheading">Tipo de sangre</span>
          <v-row no-gutters>
            <v-col cols="12" md="12">
              <v-sheet>
                <v-chip-group
                  v-model="personalInfo.bloodType"
                  @change="updatePersonalInfo"
                  class="blood-group"
                  column
                  mandatory
                  active-class="primary--text"
                >
                  <v-chip 
                    v-for="type in bloodTypes" 
                    :key="type"
                    label>
                    {{ type }}
                  </v-chip>
                </v-chip-group>
              </v-sheet>
            </v-col>
          </v-row>
          <v-card-title class="card-title contact">Datos de contacto</v-card-title>
          <span class="phone-heading">Tel&eacute;fono</span>
          <v-row no-gutters class="row6">
            <v-col class="d-flex" cols="12" md="6">
              <v-select 
                :items="phoneTypes" 
                v-model="personalInfo.phones[0].type"
                class="phone-type-select"
                @change="updatePersonalInfo">
                <template slot="selection" slot-scope="data">
                  <v-icon>{{data.item}}</v-icon>
                </template>
                <template slot="item" slot-scope="data">
                  <v-icon>{{data.item}}</v-icon>
                </template>
              </v-select>
              <v-select
                :items="countryCodeDemo"
                class="phone-code-select"
                v-model="personalInfo.phones[0].code"
                @change="updatePersonalInfo"
              ></v-select>
              <v-text-field
                v-model="personalInfo.phones[0].number"
                :rules="phoneRules"
                class="phone-input"
                @change="updatePersonalInfo"
                label="Teléfono"
                single-line
              ></v-text-field>
            </v-col>
            <v-col class="d-flex email-col" cols="12" md="6">
              <v-text-field
                v-model="personalInfo.email"
                :rules="emailRules"
                @change="updatePersonalInfo"
                label="Correo electrónico"
                class="email-input"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row
            v-for="(phone, index) in anotherPhones" 
            :key="index + 1000"
            no-gutters
            class="row7">
            <v-col class="d-flex" cols="12" md="6">
              <v-select 
                :items="phoneTypes" 
                v-model="phone.type"
                class="phone-type-select"
                @change="updatePersonalInfo">
                <template slot="selection" slot-scope="data">
                  <v-icon>{{data.item}}</v-icon>
                </template>
                <template slot="item" slot-scope="data">
                  <v-icon>{{data.item}}</v-icon>
                </template>
              </v-select>
              <v-select
                :items="countryCodeDemo"
                class="phone-code-select"
                v-model="phone.code"
                @change="updatePersonalInfo"
              ></v-select>
              <v-text-field
                v-model="phone.number"
                :rules="phoneRules"
                class="phone-input"
                @change="updatePersonalInfo"
                label="Teléfono"
                single-line
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col>
              <v-btn
                color="rgb(38,198,218)"
                elevation=0
                @click="addAnotherPhone"
                text
                class="add-button"
                >AGREGAR OTRO TEL&eacute;FONO
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      genders: this.$store.state.genders,
      bloodTypes: this.$store.state.bloodTypes,
      idTypes: this.$store.state.idTypes,
      countryCodeDemo: this.$store.state.countryCodeDemo,
      phoneTypes: this.$store.state.phoneTypes,
      personalInfo: this.$store.state.personalInfo,
      emailRegex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      phoneRegex: /^\(?([0-9]{4})\)?[- ]?([0-9]{4})$/
    }
  },
  methods: {
    updatePersonalInfo() {
      var checkEmail = this.personalInfo.email === '' ? true : this.emailRegex.test(this.personalInfo.email);
      var checkPhones = true;
      for(var i = 0, l = this.personalInfo.phones.length; i < l; i++) {
        checkPhones = checkPhones && this.personalInfo.phones[i].number === '' ? true : this.phoneRegex.test(this.personalInfo.phones[i].number);
      }
      if(checkEmail && checkPhones) {
        console.log('guardar');
        this.$store.dispatch('updatePersonalInfo', this.personalInfo)
      }
    },
    addAnotherId() {
      this.personalInfo.identifications.push({
        type: '',
        id: ''
      })
    },
    addAnotherPhone() {
      this.personalInfo.phones.push({
        type: '',
        code: '',
        number: ''
      })
    }
  },
  computed: {
    emailRules() {
      return [(v) => this.emailRegex.test(v) || 'E-mail es inválido']
    },
    phoneRules() {
      return [(v) => this.phoneRegex.test(v) || 'Número de teléfono es inválido']
    },
    anotherPhones() {
      return this.personalInfo.phones.filter((item, index) => {
        return index > 0;
      })
    }
  }
};
</script>

<style scoped>
  .background-image {
    position: absolute;
    z-index: 2;
    opacity: 0.5;
    top: 0;
    left: -5px;
  }
  .card-title {
    font-size: 1rem;
    padding-top: 12px;
    padding-left: 24px;
    letter-spacing: 0.5px;
    padding-bottom: 0;
    color: black;
  }
  .container {
    padding-left: 7px;
    padding-right: 7px;
  }
  .camera-icon {
    position: absolute;
    top: 73px;
    left: 42px;
    z-index: 2;
    color: white !important;
  }
  .name-input {
    font-size: 1.6rem;
    margin-left: 22px;
  }
  .lastname-input {
    font-size: 1.6rem;
    margin-left: 8px;
  }
  .gender-group {
    margin-left: 88px;
  }
  .gender-group .v-chip {
    font-size: 0.8rem !important;
    padding: 0 15px;
    margin-right: 17px;
    background-color: transparent !important;
    border-color: #aaa !important;
    border: 1px solid;
  }
  .gender-group .v-chip.v-chip--active,
  .blood-group .v-chip.v-chip--active {
    background-color: rgb(38,198,218) !important;
    color: white !important;
    border-color: rgb(38,198,218) !important;
  }
  .gender-group .v-chip i {
    margin-right: 16px;
    font-size: 1.1rem;
  }
  .gender-group .v-chip.v-chip--active i {
    color: white !important;
  }
  .row3 {
    margin-top: 5px;
  }
  .id-input {
    margin-left: 8px;
    letter-spacing: 0.5px;
  }
  .id-select {
    letter-spacing: 0.5px;
  }
  .add-button {
    padding: 0 !important;
    letter-spacing: 0.5px;
  }
  .subheading {
    font-size: 0.8rem;
  }
  .blood-group .v-chip {
    padding: 0 10px;
    margin-right: 5px;
    font-size: 0.9rem !important;
    background-color: transparent !important;
    border-color: #aaa !important;
    border: 1px solid;
  }
  .card-title.contact {
    padding-left: 0;
    padding-top: 10px;
  }
  .phone-heading {
    font-size: 0.8rem;
    margin-top: 2px;
    display: block;
  }
  .row6 .v-input {
    padding-top: 0;
    margin: 0;
  }
  .phone-type-select {
    width: 1.2em;
  }
  .phone-code-select {
    width: 3em;
  }
  .email-input {
    margin-left: 8px !important;
  }
  
  @media (max-width: 959px) {
    .name-input,
    .lastname-input,
    .id-input {
      margin-left: 0;
    }
    .gender-group {
      margin-left: 0;
    }
    .phone-heading {
      margin-top: 70px;
    }
    .row6 {
      position: relative;
    }
    .email-col {
      position: absolute;
      top: -70px;
      left: -8px;
    }
  }
</style>

<style>
  .name-input .v-label,
  .lastname-input .v-label {
    font-size: 1.6rem;
  }
  .name-input > .v-input__control > .v-input__slot:before,
  .name-input > .v-input__control > .v-input__slot:after,
  .lastname-input > .v-input__control > .v-input__slot:before,
  .lastname-input > .v-input__control > .v-input__slot:after {
    bottom: -7px !important;
  }
  .row3 .v-text-field__details,
  .row6 .v-text-field__details,
  .row7 .v-text-field__details {
    position: absolute;
  }
  .row3 .v-input__slot,
  .row6 .v-input__slot,
  .row7 .v-input__slot {
    margin-bottom: 0;
  }
  .code-select .v-select__selection {
    padding-left: 27px;
  }
</style>

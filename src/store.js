import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  	personalInfo: {
  		name: '',
  		lastName: '',
  		gender: -1,
  		identifications: [{
  			type: '',
  			id: ''
  		}],
  		bloodType: -1,
  		email: '',
  		phones: [{
  			type: '',
  			code: '',
  			number: ''
  		}]
  	},
  	genders: [{
  		type: 'Femenino',
  		icon: 'fa-female'
  	},
  	{
  		type: 'Masculino',
  		icon: 'fa-male'
  	}],
  	bloodTypes: [
  		'O+',
  		'O-',
  		'A+',
  		'A-',
  		'B+',
  		'B-',
  		'AB+',
  		'AB-',
  		'Desconocido'
  	],
  	idTypes: [
  		'Cédula de identidad',
  		'Pasaporte',
  		'Dimex'
  	],
  	countryCodeDemo: [
  		'+506'
  	],
  	phoneTypes: [
  		'fa-mobile-alt',
  		'fa-home'
  	],
  },
  mutations: {
  	SET_PERSONAL_INFO(state, info) {
  		state.personalInfo = info
  	}
  },
  actions: {
  	updatePersonalInfo({commit}, info) {
  		window.localStorage.setItem('personalInfo', JSON.stringify(info));
  		commit('SET_PERSONAL_INFO', info);
  	},
  	getInfoFromLocalStorage({commit}) {
  		let info = JSON.parse(window.localStorage.getItem('personalInfo'));
  		console.log(info);
  		if(info) {
  			commit('SET_PERSONAL_INFO', info);
  		}
  	}
  },
  getters: {}
});

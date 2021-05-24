import Vue from 'vue';
import Vuex from 'vuex';
import scan from './modules/scan'
import modal from './modules/modal'
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    scan,
    modal
  }
});

export default store;

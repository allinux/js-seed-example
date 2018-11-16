// store.js
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  //
  state: {
    encryptedStr: ""
  },
  getters: {
    getEncryptedStr: function(state) {
      return state.encryptedStr;
    }
  },
  mutations: {
    setEncryptedStr: function(state, encryptedStr) {
      console.log(encryptedStr);
      state.encryptedStr = encryptedStr;
    }
  }
});

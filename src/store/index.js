import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    totalWordleCount: 0,
    totalWinCount: 0,
    tmpTime: 0,
    totalTrial: 0,
    wordles: {},
  },
  mutations: {
    addTotalWordleCount(state) {
      state.totalWordleCount += 1;
    },
    addTotalWinCount(state) {
      state.totalWinCount += 1;
    },
    setTmpTime(state, newTime) {
      state.tmpTime = newTime;
    },
    addTotalTrial(state, trial) {
      state.totalTrial += trial;
    },
  },
  actions: {
    patchTotalWordleCount({ commit }) {
      commit("addTotalWordleCount");
    },
    patchTotalWinCount({ commit }) {
      commit("addTotalWinCount");
    },
    patchTmpTime({ commit }, newTime) {
      commit("setTmpTime", newTime);
    },
    patchTotalTrial({ commit }, trial) {
      commit("addTotalTrial", trial);
    },
  },
  modules: {},
  plugins: [createPersistedState()],
});

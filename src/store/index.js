import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
// const hash = {
//   word: "",
//   trials: [""],
//   start: "",
//   end: "",
// },

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    totalWordleCount: 0,
    totalWinCount: 0,
    tmpTime: 0,
    totalTrial: 0,
    wordles: {
      113318802: {
        word: "world",
        trials: [],
        start: null,
        end: null,
      },
    },
    end: false,
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
    changeWordles(state, newWordles) {
      state.wordles = newWordles;
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
    patchWordles({ commit }, newWordles) {
      commit("changeWordles", newWordles);
    },
  },
  getters: {
    getTotalWordleCount(state) {
      return state.totalWordleCount;
    },
    getTotalWinCount(state) {
      return state.totalWinCount;
    },
    getTmpTime(state) {
      return state.tmpTime;
    },
    getTotalTrial(state) {
      return state.totalTrial;
    },
    getWordles(state) {
      return state.wordles;
    },
  },
  modules: {},
  plugins: [createPersistedState()],
});

export default {
  state: {
    saveRoute: null
  },
  getters: {
    saveRoute: state => state.saveRoute
  },
  mutations: {
    saveRoute (state, data) {
      state.saveRoute = data
    }
  }
}

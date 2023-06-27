import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'

import loading from './modules/loading'
import localStorage from './modules/localStorage'
import notify from './modules/notify'
import variables from './modules/variables'
// import example from './module-example'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      loading,
      localStorage,
      notify,
      variables
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store
})

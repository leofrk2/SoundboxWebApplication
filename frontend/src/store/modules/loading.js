import { Loading, QSpinnerFacebook } from 'quasar'

export default {
  actions: {
    loadingShow (context) {
      Loading.show({
        spinner: QSpinnerFacebook,
        spinnerColor: 'white',
        spinnerSize: 140,
        backgroundColor: 'primary'
      })
    },
    loadingStop (context) {
      Loading.hide()
    }
  }
}

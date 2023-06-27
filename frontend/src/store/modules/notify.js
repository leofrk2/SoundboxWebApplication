import { Notify } from 'quasar'

export default {
  actions: {
    notifyPositive (context, texte) {
      Notify.create({
        color: 'positive',
        type: 'positive',
        timeout: 2000,
        position: 'bottom',
        message: texte
      })
    },
    notifyNegative (context, texte) {
      Notify.create({
        type: 'negative',
        color: 'negative',
        timeout: 2000,
        position: 'bottom',
        message: texte
      })
    },
    notifyWarning (context, texte) {
      Notify.create({
        type: 'warning',
        color: 'warning',
        timeout: 5000,
        position: 'bottom',
        message: texte
      })
    }
  }
}

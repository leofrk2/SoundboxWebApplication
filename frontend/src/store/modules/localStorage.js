import { LocalStorage } from 'quasar'

export default {
  actions: {
    localStorageSet (context, data) {
      for (const value in data) {
        try {
          LocalStorage.set(value, data[value])
        } catch (e) {
          this.$store.dispatch('notifyNegative', 'Erreur lors de la requête ! Merci de réessayer !')
        }
      }
    },
    localStorageClear (context) {
      try {
        LocalStorage.clear()
      } catch (e) {
        this.$store.dispatch('notifyNegative', 'Erreur lors de la deconnexion ! Merci de réessayer !')
        this.$router.push({ name: 'TableauDeBords' })
      }
    }
  }
}

<template>
  <q-page class="flex flex-center">
    <div class="col-auto q-gutter-md" style="width: 400px">
      <q-form @submit="onSubmitLogin">
        <q-input
          filled
          v-model="dataLogin.username"
          label="Username"
          :rules="[val => !!val || 'Username is required']"
        />
        <q-input
          filled
          v-model="dataLogin.password"
          label="Password"
          :rules="[val => !!val || 'Password is required']"
        />
        <q-btn
          label="Login"
          type="submit"
        />
      </q-form>
    </div>
  </q-page>
</template>

<script>

import { defineComponent } from 'vue'
import { api } from 'boot/axios'

export default defineComponent({
  name: 'LoginPage',
  data () {
    return {
      dataLogin: {
        username: 'a',
        password: 'a'
      }
    }
  },
  methods: {
    onSubmitLogin () {
      this.$store.dispatch('loadingShow')
      api.post('/session/login', this.dataLogin)
        .then((response) => {
          this.$router.push({ name: 'IndexPage' })
        })
        .catch((xhr) => {
          this.$store.dispatch('notifyNegative', 'Identifiants incorrects')
        })
        .finally(() => {
          this.$store.dispatch('loadingStop')
        })
    }
  }
})

</script>

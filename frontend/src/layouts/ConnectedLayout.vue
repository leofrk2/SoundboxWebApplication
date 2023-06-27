<template>
  <q-layout view="lHh Lpr lFf">
    <div class="row">
      <q-btn
        class="q-ma-md bg-green text-white q-ml-auto"
        label="Se déconnecter"
        @click="onSubmitDisconnect()"
        />
    </div>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MainLayout',
  methods: {
    onSubmitDisconnect () {
      this.$router.push({ name: 'LoginPage' })
    }
  }
})
</script>

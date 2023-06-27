<template>
  <q-page class="flex flex-center">
    <q-table
      :rows="this.dataSound"
      title="Liste des sons"
      :columns="[
        { name: 'id', align: 'left', label: 'Numéro', field: 'id', sortable: true },
        { name: 'name', align: 'left', label: 'Nom', field: 'name', sortable: true }
      ]"
      >
      <template v-slot:top-right>
        <q-btn
          icon="add"
          round
          @click="this.params.showAddModal = true"
          dense
          class="bg-green text-white"
          />
      </template>
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width />
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props" >
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width>
            <q-btn
              icon="delete"
              @click="this.params.idToDelete = props.row.id; this.deleteSound()"
              round
              dense
              class="bg-red text-white"
              />
          </q-td>
          <q-td
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            {{ col.value }}
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-dialog
      v-model="this.params.showAddModal">
      <q-card>
        <q-card-section>
          <div class="text-h5">Ajouter un son</div>
        </q-card-section>
        <q-card-actions>
          <q-form @submit="onSubmitAddSound">
          <q-input
            label="Nom du son"
            v-model="this.params.nameToAdd"
            :rules="[val => !!val || 'Nom du son requis']"
            />
            <q-file
              v-model="this.params.fileToAdd"
              label="Fichier du son"
              :rules="[val => !!val || 'Fichier du son requis']"
              />
            <q-btn
              label="Ajouter"
              icon="check"
              class="bg-green text-white q-mt-md"
              type="submit"
              />
          </q-form>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { api } from 'boot/axios'

export default defineComponent({
  name: 'IndexPage',
  data () {
    return {
      dataSound: [],
      params: {
        showAddModal: false,
        nameToAdd: '',
        idToDelete: '',
        fileToAdd: ''
      }
    }
  },
  mounted () {
    this.loadingSounds()
  },
  methods: {
    onSubmitAddSound () {
      this.$store.dispatch('loadingShow')

      const formData = new FormData()
      formData.append('name', this.params.nameToAdd)
      formData.append('file', this.params.fileToAdd)

      api.post('/sound/add', formData)
        .then(response => {
          this.params.showAddModal = false
          this.params.nameToAdd = ''
          this.loadingSounds()
        })
        .catch(xhr => {
          this.$store.dispatch('notifyNegative', 'Erreur lors de l\'ajout du son')
        })
        .finally(() => {
          this.$store.dispatch('loadingStop')
        })
    },
    loadingSounds () {
      this.$store.dispatch('loadingShow')
      api.get('/sound/index')
        .then(response => {
          this.dataSound = response.data
        })
        .catch(xhr => {
          this.$store.dispatch('notifyNegative', 'Erreur lors du chargement des sons')
        })
        .finally(() => {
          this.$store.dispatch('loadingStop')
        })
    },
    deleteSound () {
      this.$store.dispatch('loadingShow')
      api.delete('/sound/delete/' + this.params.idToDelete)
        .then(() => {
          this.loadingSounds()
        })
        .catch(xhr => {
          this.$store.dispatch('notifyNegative', 'Erreur lors de la suppression du son')
        })
        .finally(() => {
          this.$store.dispatch('loadingStop')
        })
    }
  }
})
</script>

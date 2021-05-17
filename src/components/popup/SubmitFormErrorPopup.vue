<template>
  <v-dialog v-model="showPopup" persistent max-width="480">
    <v-card>
      <v-card-title
        class="headline d-flex justify-center modalTitle grey--text lighten-1--text"
        style="
              color: #919196 !important;
          "
      >{{title}}</v-card-title
      >
      <v-card-text
        class="text-center"
        style="
          font-size: 0.975rem;
          "
      >{{message}}</v-card-text
      >
      <v-card-actions class="text-xs-center justify-center">
        <v-btn
          color="#7972c0"
          depressed
          normal
          dark
          style="margin-right: 8px; width: 100px; text-transform: none"
          @click="ok"
        >Ok</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

import {
  MODULE_POPUP
} from '@/store/constant/mutation-types'

export default {
  name: 'SubmitFormErrorPopup',
  data() {
    return {
    }
  },
  computed: {
    showPopup() {
      return this.$store.getters[`${MODULE_POPUP}/showErrorSubmitFormPopup`]
    },
    title() {
      const data = this.$store.getters[`${MODULE_POPUP}/getErrorSubmitFormData`]
      return data.title
    },
    message() {
      const data = this.$store.getters[`${MODULE_POPUP}/getErrorSubmitFormData`]
      return data.message
    }
  },
  methods: {
    ok() {
      this.$store.dispatch('closeSubmitFormErrorPopup')
    }
  }
}
</script>

<style scoped>
</style>

<template>
  <v-dialog v-model="showConfirmPopup" persistent max-width="480">
    <v-card>
      <v-card-title
        class="headline d-flex justify-center modalTitle grey--text lighten-1--text"
        style="
              color: #919196 !important;
          "
      >{{title}}</v-card-title
      >
      <v-card-text
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
          @click="confirm"
        >Confirm</v-btn
        >
        <v-btn
          depressed
          normal
          color="white"
          @click="cancel"
          style="
              padding: 0 18.4444444444px;
              width: 100px;
              border: 1px solid rgb(121 114 192) !important;
              text-transform: none;
            "
        ><span style="color: rgb(121 114 192)">Cancel</span></v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

import { MODULE_POPUP } from '@/store/constant/mutation-types'

export default {
  name: 'ConfirmPopup',
  data() {
    return {
    }
  },
  computed: {
    showConfirmPopup() {
      return this.$store.getters[`${MODULE_POPUP}/showConfirmPopup`]
    },
    title() {
      const data = this.$store.getters[`${MODULE_POPUP}/getConfirmPopupData`]
      return data.title
    },
    message() {
      const data = this.$store.getters[`${MODULE_POPUP}/getConfirmPopupData`]
      return data.message
    }
  },
  methods: {
    confirm() {
      this.$store.dispatch('closeConfirmPopup')
    },
    cancel() {
      this.$store.dispatch('closeConfirmPopup')
    }
  }
}
</script>

<style scoped>

</style>

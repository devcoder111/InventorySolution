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
      <v-row no-gutters justify="center" align="center">
        <v-col cols="8">
          <v-file-input
            @change="selectFile"
            name="file"
            :accept=accept
            placeholder="Select CSV file for import"
          />
        </v-col>
      </v-row>
      <v-card-actions class="text-xs-center justify-center">
        <v-btn
          color="#7972c0"
          depressed
          normal
          dark
          style="margin-right: 8px; width: 100px; text-transform: none"
          @click="confirm"
        >Import</v-btn
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

import { MODULE_POPUP, SET_IMPORT_FILE } from '@/store/constant/mutation-types'
export default {
  name: 'ImportConfirmPopup',
  props: {
    accept: {
      type: String,
      default: '.csv'
    }
  },
  data() {
    return {
      selectedFile: undefined,
      progress: 0
    }
  },
  computed: {
    showConfirmPopup() {
      return this.$store.getters[`${MODULE_POPUP}/showImportConfirmPopup`]
    },
    title() {
      const data = this.$store.getters[`${MODULE_POPUP}/getImportConfirmPopupData`]
      return data.title
    },
    message() {
      const data = this.$store.getters[`${MODULE_POPUP}/getImportConfirmPopupData`]
      return data.message
    }
  },
  methods: {
    selectFile(file) {
      this.selectedFile = file
    },
    confirm() {
      if (!this.selectedFile) {
        return
      }
      this.$store.commit(`${MODULE_POPUP}/${SET_IMPORT_FILE}`, this.selectedFile)
      this.$store.dispatch('confirmImportConfirmPopup')
    },
    cancel() {
      this.$store.dispatch('cancelImportConfirmPopup')
    }
  }
}
</script>

<style scoped>

</style>

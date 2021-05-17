<template>
  <v-dialog v-model="showPopup" persistent max-width="480">
    <v-card>
      <v-card-title
        class="headline d-flex justify-center modalTitle grey--text lighten-1--text"
        style="
              color: #919196 !important;
          "
      >Unsaved Changes</v-card-title
      >
      <v-card-text
        style="
          font-size: 0.975rem;
          "
      >Are you sure you want to leave this page without saving your
        changes</v-card-text
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

import { MODULE_POPUP, SET_UNSAVED_CHANGES_POPUP_SHOW, MODULE_FORM, SET_FORM_DATA_ORIGIN, SET_FORM_DATA_NEW } from '@/store/constant/mutation-types'

export default {
  name: 'UnsavedChangesPopup',
  props: [],
  data() {
    return {
    }
  },
  computed: {
    showPopup() {
      return this.$store.getters[`${MODULE_POPUP}/showUnsavedChangesPopup`]
    }
  },
  methods: {
    confirm() {
      this.$store.commit(`${MODULE_FORM}/${SET_FORM_DATA_ORIGIN}`, {})
      this.$store.commit(`${MODULE_FORM}/${SET_FORM_DATA_NEW}`, {})
      this.$store.commit(`${MODULE_POPUP}/${SET_UNSAVED_CHANGES_POPUP_SHOW}`, false)
      this.$router.back()
    },
    cancel() {
      this.$store.commit(`${MODULE_POPUP}/${SET_UNSAVED_CHANGES_POPUP_SHOW}`, false)
    }
  }
}
</script>

<style scoped>

</style>

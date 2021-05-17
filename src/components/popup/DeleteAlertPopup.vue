<template>
  <v-dialog v-model="showDeleteAlertPopup" persistent max-width="720">
    <v-card>
      <v-card-title class="headline d-flex justify-center lighten-1--text"
        >Are you sure you want to archive the
        <span class="font-weight-bold mx-2"
          >"Quantity is {{ alertType }} to {{ alertValue }}"</span
        >
        alert for the
        <span class="font-weight-bold mx-2">"{{ itemName }}"</span>
        ?
      </v-card-title>
      <v-card-actions class="text-xs-center justify-center">
        <v-btn
          color="#7972c0"
          depressed
          normal
          dark
          style="margin-right: 8px; width: 100px; text-transform: none"
          @click="confirmDelete"
          >Delete</v-btn
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
import {
  MODULE_POPUP,
  SET_DELETE_ALERT_POPUP_SHOW
} from '@/store/constant/mutation-types'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ConfirmPopup',
  props: ['item'],
  data() {
    return {}
  },
  computed: {
    ...mapGetters('popup', ['alertPendingToSave']),
    showDeleteAlertPopup() {
      return this.$store.getters[`${MODULE_POPUP}/showDeleteAlertPopup`]
    },
    alertType() {
      const data = this.$store.getters[`${MODULE_POPUP}/alertPendingToSave`]
      return data === null ? '' : data.type
    },
    alertValue() {
      const data = this.$store.getters[`${MODULE_POPUP}/alertPendingToSave`]
      return data === null ? '' : data.value
    },
    itemName() {
      return this.item.name
    },
    alertId() {
      const data = this.$store.getters[`${MODULE_POPUP}/alertPendingToSave`]
      return data === null ? '' : data.id
    }
  },
  methods: {
    ...mapActions('alerts', ['deleteAlert']),
    hide() {
      this.$store.commit(
        `${MODULE_POPUP}/${SET_DELETE_ALERT_POPUP_SHOW}`,
        false
      )
    },
    confirmDelete() {
      const alertData = this.alertPendingToSave
      const payload = {
        alertId: alertData.id
      }
      this.deleteAlert(payload)
      this.hide()
    },
    cancel() {
      this.hide()
    }
  }
}
</script>

<style scoped></style>

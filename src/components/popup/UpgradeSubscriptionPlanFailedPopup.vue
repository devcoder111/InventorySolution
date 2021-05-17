<template>
  <v-dialog v-model="showPopup" persistent max-width="480">
    <v-card>
      <v-card-title
        class="headline d-flex justify-center modalTitle grey--text lighten-1--text"
        style="
              color: #919196 !important;
          "
      >Subscription Plan Upgrade</v-card-title
      >
      <v-card-text
        class="d-flex justify-center"
        style="
          font-size: 0.975rem;
          "
      >The Upgrade of your subscription plan was failed.</v-card-text
      >
      <v-card-actions class="text-xs-center justify-center">
        <v-btn
          depressed
          normal
          color="white"
          @click="ok"
          style="
              padding: 0 18.4444444444px;
              width: 100px;
              border: 1px solid rgb(121 114 192) !important;
              text-transform: none;
            "
        ><span style="color: rgb(121 114 192)">Ok</span></v-btn>
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
    showPopup() {
      return this.$store.getters[`${MODULE_POPUP}/showUpgradeSubscriptionPlanFailedPopup`]
    }
  },
  methods: {
    ok() {
      this.$store.dispatch('closeUpgradeSubscriptionPlanFailedPopup')
    }
  }
}
</script>

<style scoped>

</style>

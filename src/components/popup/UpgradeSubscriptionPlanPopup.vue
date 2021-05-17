<template>
  <v-dialog v-model="showPopup" persistent max-width="800">
    <v-card>
      <v-btn
          depressed
          class="close"
          @click="cancel"
        ><span>&times;</span></v-btn>
      <v-card-title
        class="headline d-flex justify-center modalTitle grey--text lighten-1--text"
        style="
              color: #919196 !important;
          "
      >{{title}}</v-card-title>
      <v-card-text
        class="text-center"
        style="
          font-size: 0.975rem;
          ">
        <PaymentPlans />
      </v-card-text>
      <v-card-actions class="text-xs-center justify-center">
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
        ><span style="color: rgb(121 114 192)">Cancel</span></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

import { MODULE_POPUP } from '@/store/constant/mutation-types'
import PaymentPlans from '../../components/subscription/PaymentPlans'

export default {
  name: 'UpgradeSubscriptionPlanPopup',
  components: { PaymentPlans },
  data() {
    return {
    }
  },
  computed: {
    showPopup() {
      return this.$store.getters[`${MODULE_POPUP}/showUpgradeSubscriptionPlanPopup`]
    },
    title() {
      return this.$store.getters[`${MODULE_POPUP}/getUpgradeSubscriptionPlanPopupTitle`]
    }
  },
  methods: {
    cancel() {
      this.$store.dispatch('closeUpgradeSubscriptionPlanPopup')
    }
  }
}
</script>

<style scoped>
.close {
  font-size: 40px;
  background: none !important;
  position: absolute;
  right: 0;
  color: #585858;
  opacity: 0.6;
  min-width: 30px!important;
  height: 30px!important;
  margin: 0;
  padding: 0 !important;
  right: 4px;
  top: 4px;
}
.close:hover {
  background: none !important;
  opacity: 1;
}
.close:not(.v-btn--text):not(.v-btn--outlined):hover:before {
    opacity: 0;
    background: none !important;
}
.theme--light.close:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
  background: none !important;
}
.close:not(.v-btn--text):not(.v-btn--outlined):focus:before {
    opacity: 0;
    background: none !important;
}
</style>

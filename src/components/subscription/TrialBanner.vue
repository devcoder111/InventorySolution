<template>
  <v-row
    class="justify-start align-start pa-0 mx-0 my-0"
    style="border-bottom: solid 1px #e099a3; background-color: #ffeae7"
  >
    <div class="mx-2 pl-3 py-3 d-flex" v-if="showTrialBanner">
      <div class="mr-4">
          <span>
            <div style="width: 38px !important; height: 38px !important; border-radius: 50%; background-color: #f61f3d; text-align: center; padding: 4px;">
            <v-img
              src="@/assets/icons/svg/alert-white.svg"
              style="width: 24px !important; height: 24px !important; display: inline-block;"
            ></v-img>
            </div>
          </span>
      </div>
      <div style="display: flex; align-items: center">
        <p
          style="
            font-size: 16px;
            font-weight: 500;
            margin: 0;
            text-transform: uppercase;
            letter-spacing: 0.7px;
            color: #bb0e26;
          "
        >
          {{ bannerText }}
          <a title="Upgrade" class="link-upgrade" @click="upgradeFreePlan"
            >Upgrade</a
          >
        </p>
      </div>
    </div>
  </v-row>
</template>

<script>
import moment from 'moment'
import { MODULE_USER } from '../../store/constant/mutation-types'
import { LENGTH_TRIAL_IN_DAYS, SUBSCRIPTION_PLAN_FREE_ID } from '../../constant'

export default {
  name: 'TrialBanner',
  data() {
    return {}
  },
  computed: {
    user() {
      return this.$store.getters[`${MODULE_USER}/user`]
    },
    showTrialBanner() {
      return !this.user.plan ||
        !this.user.plan.id ||
        this.user.plan.id === SUBSCRIPTION_PLAN_FREE_ID
    },
    bannerText() {
      if (!this.showTrialBanner) {
        return ''
      }
      const days = LENGTH_TRIAL_IN_DAYS - moment().diff(moment(new Date(this.user.createdAt)), 'days')
      if (days === 0) {
        return 'Today is Last day of Trial.'
      } else if (days === 1) {
        return `Left ${days} day to finish trial period.`
      } else if (days > 1) {
        return `Left ${days} days to finish trial period.`
      } else {
        return 'Your Trial has expired.'
      }
    }
  },
  methods: {
    upgradeFreePlan() {
      this.$store.dispatch('showUpgradeSubscriptionPlanPopup', { title: 'Upgrade FREE plan Now!' })
    }
  }
}
</script>

<style scoped>
  .link-upgrade {
    text-decoration: underline;
    color: #bb0e26 !important;
  }
  .link-upgrade:hover {
    color: #a63242 !important;
    text-decoration: none;
  }
</style>

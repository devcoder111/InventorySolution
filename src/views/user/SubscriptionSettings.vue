<template>
  <v-container
    class="px-8 lighten-5 home-content"
    style="
      max-width: 100%;
      background-color: #fbfbfb;
      padding-top: 0 !important;
    "
  >
    <v-row>
      <v-col cols="12">
        <v-breadcrumbs divider=">" class="px-0 pt-0 breadcrumbs">
          <v-breadcrumbs-item
            v-for="item in navSettingsOptions"
            :key="item.index"
          >
            <span class="text-breadcum-settings cursor-point"
              >{{ item.text }}
              <v-icon style="font-size: 1.2rem">mdi-chevron-right</v-icon></span
            >
          </v-breadcrumbs-item>
        </v-breadcrumbs>
      </v-col>
    </v-row>
    <v-card flat style="border: solid 1px #cdcdcd">
      <p class="ma-4" style="font-size: 26px">Subscription Details</p>
      <div
        v-if="isFreePlan"
        class="mx-4 mb-4 pl-4 py-1"
        :class="
          leftTrialDays > 10
            ? 'free-plan-grey'
            : leftTrialDays > 0
            ? 'free-plan-yellow'
            : 'free-plan-red'
        "
      >
        <p style="font-weight: 700; font-size: 18px">
          <span style="font-weight: 600">Current Plan:</span> FREE
        </p>
        <p class="trial-text" v-if="leftTrialDays > 0">
          {{ trialTex }}
        </p>
        <p class="trial-text-red" v-else>
          {{ trialTex }}
          <a title="Upgrade" @click="$emit('show-subscription-plans')"
            >UPGRADE</a
          >
        </p>
      </div>
      <div
        v-if="isBusinessPlan || isCompanyPlan"
        class="mx-4 mb-4 pl-4 py-1"
        style="border-left: solid 5px #7972c0; background-color: #f5f4fa"
      >
        <p style="font-weight: 700; font-size: 18px">
          <span style="font-weight: 600">Current Plan:</span>
          {{ user.plan.name }}
        </p>
        <p style="font-size: 16px; font-weight: 500">
          You were subscribed on {{ accountCreatedDate }}
        </p>
      </div>
      <p class="text-subtitle-1 font-weight-bold mx-4 mt-4">
        Do you want upgrade your account ?
      </p>
      <v-btn
        depressed
        style="
          background-color: #7972c0;
          color: white;
          min-width: 150px;
          font-size: 16px;
        "
        class="mx-4 mt-2 mb-8"
        @click="$emit('show-subscription-plans')"
        >Upgrade</v-btn
      >
      <v-btn
        v-if="user.plan.id === 'Business Plan'"
        depressed
        style="
          background-color: white;
          color: black;
          border: solid 1px black;
          font-size: 16px;
        "
        class="mx-4 mt-2 mb-8"
        @click="confirmDialog = true"
        >Unsubscribe</v-btn
      >
      <v-divider />
      <v-list style="max-height: 400px" class="overflow-y-auto">
        <v-list-item>
          <v-row class="px-4 py-2 align-center plan-option">
            <v-col cols="7">
              <span>Users</span>
            </v-col>
            <v-col cols="3" class="d-flex justify-center">
              <span class="used">used 1, left 2</span>
            </v-col>
            <v-col cols="2" class="d-flex justify-center">
              <span>5</span>
            </v-col>
          </v-row>
        </v-list-item>
        <v-divider />
        <v-list-item>
          <v-row class="px-4 py-2 align-center plan-option">
            <v-col cols="7">
              <span>Warehouses</span>
            </v-col>
            <v-col cols="3" class="d-flex justify-center">
              <span class="used">used 0, left 1</span>
            </v-col>
            <v-col cols="2" class="d-flex justify-center">
              <span>1</span>
            </v-col>
          </v-row>
        </v-list-item>
        <v-divider />
        <v-list-item>
          <v-row class="px-4 py-2 align-center plan-option">
            <v-col cols="7">
              <span>Barcodes</span>
            </v-col>
            <v-col cols="3" class="d-flex justify-center">
              <span class="used"></span>
            </v-col>
            <v-col cols="2" class="d-flex justify-center">
              <span>
                <v-img
                  src="@/assets/icons/svg/check-bold.svg"
                  style="width: 28px !important; height: 28px !important"
                ></v-img>
              </span>
            </v-col>
          </v-row>
        </v-list-item>
        <v-divider />
        <v-list-item>
          <v-row class="px-4 py-2 align-center plan-option">
            <v-col cols="7">
              <span>Items</span>
            </v-col>
            <v-col cols="3" class="d-flex justify-center">
              <span class="used">used 200, left 800</span>
            </v-col>
            <v-col cols="2" class="d-flex justify-center">
              <span>1000</span>
            </v-col>
          </v-row>
        </v-list-item>
        <v-divider />
        <v-list-item>
          <v-row class="px-4 py-2 align-center plan-option">
            <v-col cols="7">
              <span>CSV/PDF Reporting</span>
            </v-col>
            <v-col cols="3" class="d-flex justify-center">
              <span class="used"></span>
            </v-col>
            <v-col cols="2" class="d-flex justify-center">
              <span>
                <v-img
                  src="@/assets/icons/svg/check-bold.svg"
                  style="width: 28px !important; height: 28px !important"
                ></v-img>
              </span>
            </v-col>
          </v-row>
        </v-list-item>
        <v-divider />
        <v-list-item>
          <v-row class="px-4 py-2 align-center plan-option">
            <v-col cols="7">
              <span>Alerts</span>
            </v-col>
            <v-col cols="3" class="d-flex justify-center">
              <span class="used"></span>
            </v-col>
            <v-col cols="2" class="d-flex justify-center">
              <span>
                <v-img
                  src="@/assets/icons/svg/check-bold.svg"
                  style="width: 28px !important; height: 28px !important"
                ></v-img>
              </span>
            </v-col>
          </v-row>
        </v-list-item>
        <v-divider />
        <v-list-item>
          <v-row class="px-4 py-2 align-center plan-option">
            <v-col cols="7">
              <span>Custom Fields</span>
            </v-col>
            <v-col cols="3" class="d-flex justify-center">
              <span class="used">used 0, left 20</span>
            </v-col>
            <v-col cols="2" class="d-flex justify-center">
              <span>&mdash;</span>
            </v-col>
          </v-row>
        </v-list-item>
        <v-divider />
        <v-list-item>
          <v-row class="px-4 py-2 align-center plan-option">
            <v-col cols="7">
              <span>Integration</span>
            </v-col>
            <v-col cols="3" class="d-flex justify-center">
              <span class="used"></span>
            </v-col>
            <v-col cols="2" class="d-flex justify-center">
              <span>&mdash;</span>
            </v-col>
          </v-row>
        </v-list-item>
        <v-divider />
        <v-list-item>
          <v-row class="px-4 py-2 align-center plan-option">
            <v-col cols="7">
              <span>Assistance</span>
            </v-col>
            <v-col cols="3" class="d-flex justify-center">
              <span class="used"></span>
            </v-col>
            <v-col cols="2" class="d-flex justify-center">
              <span>&mdash;</span>
            </v-col>
          </v-row>
        </v-list-item>
        <v-divider />
        <v-list-item>
          <v-row class="px-4 py-2 align-center plan-option">
            <v-col cols="7">
              <span>Backup</span>
            </v-col>
            <v-col cols="3" class="d-flex justify-center">
              <span class="used"></span>
            </v-col>
            <v-col cols="2" class="d-flex justify-center">
              <span>&mdash;</span>
            </v-col>
          </v-row>
        </v-list-item>
        <v-divider />
        <v-list-item>
          <v-row class="px-4 py-2 align-center plan-option">
            <v-col cols="7">
              <span>User access rights</span>
            </v-col>
            <v-col cols="3" class="d-flex justify-center">
              <span class="used"></span>
            </v-col>
            <v-col cols="2" class="d-flex justify-center">
              <span>&mdash;</span>
            </v-col>
          </v-row>
        </v-list-item>
        <v-divider />
        <v-list-item>
          <v-row class="px-4 py-2 align-center plan-option">
            <v-col cols="7">
              <span>Phone/Email/Chat Support</span>
            </v-col>
            <v-col cols="3" class="d-flex justify-center">
              <span class="used"></span>
            </v-col>
            <v-col cols="2" class="d-flex justify-center">
              <span>&mdash;</span>
            </v-col>
          </v-row>
        </v-list-item>
        <v-divider />
        <v-list-item>
          <v-row class="px-4 py-2 align-center plan-option">
            <v-col cols="7">
              <span>API access for Integrations</span>
            </v-col>
            <v-col cols="3" class="d-flex justify-center">
              <span class="used"></span>
            </v-col>
            <v-col cols="2" class="d-flex justify-center">
              <span>&mdash;</span>
            </v-col>
          </v-row>
        </v-list-item>
        <v-divider />
        <v-list-item>
          <v-row class="px-4 pt-2 align-center plan-option">
            <v-col cols="7">
              <span>Single Sign On</span>
            </v-col>
            <v-col cols="3" class="d-flex justify-center">
              <span class="used"></span>
            </v-col>
            <v-col cols="2" class="d-flex justify-center">
              <span>&mdash;</span>
            </v-col>
          </v-row>
        </v-list-item>
      </v-list>
      <v-divider />
    </v-card>
    <v-dialog v-model="confirmDialog" persistent max-width="540">
      <v-card>
        <v-card-title class="d-flex justify-center pt-4 mb-4"
          ><span class="confirm-title">Unsubscribe</span></v-card-title
        >
        <v-card-text class="confirm-text"
          >Are you sure you want to unsubscribe from the BUSINESS plan
          ?</v-card-text
        >
        <v-card-text class="confirm-text"
          ><span style="font-weight: 700">Attention!</span> In this case, all
          function and features of the subscription will be automatically
          blocked.</v-card-text
        >
        <v-card-actions class="text-xs-center justify-center pb-8">
          <v-btn
            depressed
            small
            dark
            style="
              margin-right: 8px;
              width: 100px;
              text-transform: none;
              background-color: #7972c0;
              color: white;
              font-weight: 500;
            "
            @click="$emit('show-subscription-plans')"
            >Confirm</v-btn
          >
          <v-btn
            depressed
            small
            @click="confirmDialog = false"
            style="
              padding: 0 18.4444444444px;
              width: 100px;
              color: #7972c0;
              background-color: white;
              border: 1px solid #7972c0 !important;
              text-transform: none;
            "
            ><span>Cancel</span></v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <UpgradeSubscriptionPlanSuccessPopup />
    <UpgradeSubscriptionPlanFailedPopup />
  </v-container>
</template>

<script>
import moment from 'moment'
import { MODULE_USER } from '../../store/constant/mutation-types'
import {
  LENGTH_TRIAL_IN_DAYS,
  SUBSCRIPTION_PLAN_BUSINESS_MONTH_ID,
  SUBSCRIPTION_PLAN_BUSINESS_YEAR_ID,
  SUBSCRIPTION_PLAN_COMPANY_MONTH_ID,
  SUBSCRIPTION_PLAN_COMPANY_YEAR_ID,
  SUBSCRIPTION_PLAN_CORPORATE_YEAR_ID,
  SUBSCRIPTION_PLAN_FREE_ID
} from '../../constant'
import UpgradeSubscriptionPlanSuccessPopup from '@/components/popup/UpgradeSubscriptionPlanSuccessPopup'
import UpgradeSubscriptionPlanFailedPopup from '@/components/popup/UpgradeSubscriptionPlanFailedPopup'

export default {
  name: 'SubscriptionSettings',
  components: {
    UpgradeSubscriptionPlanSuccessPopup,
    UpgradeSubscriptionPlanFailedPopup
  },
  data() {
    return {
      subscriptionPlanFreeId: SUBSCRIPTION_PLAN_FREE_ID,
      subscriptionPlanBusinessMonthId: SUBSCRIPTION_PLAN_BUSINESS_MONTH_ID,
      subscriptionPlanBusinessYearId: SUBSCRIPTION_PLAN_BUSINESS_YEAR_ID,
      subscriptionPlanCompanyMonthId: SUBSCRIPTION_PLAN_COMPANY_MONTH_ID,
      subscriptionPlanCompanyYearId: SUBSCRIPTION_PLAN_COMPANY_YEAR_ID,
      subscriptionPlanCorporateYearId: SUBSCRIPTION_PLAN_CORPORATE_YEAR_ID,
      navSettingsOptions: [
        {
          index: 1,
          text: 'Settings'
        },
        {
          index: 2,
          text: 'Subscription'
        }
      ],
      confirmDialog: false,
      dateTimeFormat: ''
    }
  },
  computed: {
    user() {
      return this.$store.getters[`${MODULE_USER}/user`]
    },
    accountCreatedDate() {
      return moment.utc(this.user.createdAt).local().format('MM/DD/YYYY')
    },
    leftTrialDays() {
      return (
        LENGTH_TRIAL_IN_DAYS -
        moment().diff(moment(new Date(this.user.createdAt)), 'days')
      )
    },
    trialTex() {
      if (this.leftTrialDays === 0) {
        return 'Today is Last day of your Trial.'
      } else if (this.leftTrialDays === 1) {
        return `Left ${this.leftTrialDays} day to finish your Trial.`
      } else if (this.leftTrialDays > 1) {
        return `Left ${this.leftTrialDays} days to finish your Trial.`
      } else {
        return 'Your Trial has expired.'
      }
    },
    isFreePlan() {
      return (
        !this.user.plan || this.user.plan.id === this.subscriptionPlanFreeId
      )
    },
    isBusinessPlan() {
      return (
        this.user.plan &&
        (this.user.plan.id === this.subscriptionPlanBusinessMonthId ||
          this.user.plan.id === this.subscriptionPlanBusinessYearId)
      )
    },
    isCompanyPlan() {
      return (
        this.user.plan &&
        (this.user.plan.id === this.subscriptionPlanCompanyMonthId ||
          this.user.plan.id === this.subscriptionPlanCompanyYearId)
      )
    },
    isCorporatePlan() {
      return (
        this.user.plan &&
        this.user.plan.id === this.subscriptionPlanCorporateYearId
      )
    }
  },
  async created() {
    await this.$store.dispatch('user/profileSettings').then((res) => {
      this.dateTimeFormat = res.data.data.settings.dateTimeFormat.value
    })
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700;800;900&display=swap');
.change-font {
  font-family: 'Raleway', sans-serif;
}
.text-subtitle-1 {
  margin-bottom: 0;
}
.plan-option {
  color: #555555;
  font-size: 16px;
  font-weight: 500;
  .used {
    font-style: italic;
    font-weight: 400;
  }
  .confrim-title {
    font-style: bold;
  }
}
.free-plan-grey {
  border-left: solid 5px #7972c0;
  background-color: #f5f4fa;
}
.free-plan-yellow {
  border-left: solid 5px #eebf31;
  background-color: #fff5d8;
}
.free-plan-red {
  border-left: solid 5px #f61f3d;
  background-color: #ffeae7;
}
.free-plan-red a {
  text-decoration: underline;
}
.trial-text {
  font-size: 16px;
  font-weight: 500;
}
.trial-text-red {
  font-size: 16px;
  font-weight: 500;
  color: #f61f3d;
}
</style>

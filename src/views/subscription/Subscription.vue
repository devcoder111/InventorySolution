<template>
  <v-app>
    <NavBar />
    <v-main>
      <section style="background: #fff !important">
        <v-container class="sub-section">
          <v-row class="justify-center mt-8 main-title">
            <p id="content-t" class="change-font subs-title" style="z-index: 1">
              Select your {{ planName }} subscription
            </p>
          </v-row>
          <v-card class="mx-auto discount-block" max-width="700" elevation="8">
            <v-radio-group v-model="period">
              <div class="abs-disc">
                <span v-if="showOffBanner" class="off-text-yearly"
                  >40% <span>OFF</span>
                </span>
              </div>
              <v-card-text class="px-8" @click="setPeriod(YEAR)">
                <v-row class="flex-nowrap pay-block">
                  <v-radio
                    class="mr-4"
                    value="year"
                    color="#7261c9"
                    ref="RadioYear"
                  ></v-radio>
                  <span class="text-h6 font-weight-bold" style="width: 200px">
                    Pay Yearly </span
                  ><span class="text-h6 font-weight-bold"
                    >${{ yearlyPlanPrice }}</span
                  >
                </v-row>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-text
                class="px-8"
                v-if="monthlyPlan"
                @click="setPeriod(MONTH)"
              >
                <v-row class="flex-nowrap pay-block">
                  <v-radio
                    class="mr-4"
                    value="month"
                    color="#7261c9"
                    ref="RadioMonth"
                  ></v-radio>
                  <span class="text-h6 font-weight-bold" style="width: 200px">
                    Pay Monthly </span
                  ><span class="text-h6 font-weight-bold"
                    >${{ monthlyPlanPrice }}</span
                  >
                </v-row>
              </v-card-text>
            </v-radio-group>
          </v-card>
          <v-card class="mx-auto px-2 mt-8" max-width="700" flat>
            <v-row class="justify-space-between btn-block">
              <v-btn outlined color="#7671bd" @click="back">BACK</v-btn>
              <v-btn
                class="btn-buy"
                style="background-color: #7671bd; color: white"
                @click="buyNow"
                >BUY NOW</v-btn
              >
            </v-row>
          </v-card>
          <v-divider
            style="max-width: 900px"
            class="my-16 mx-auto divider-main"
          ></v-divider>
          <v-row class="justify-center information-dop">
            <v-col xs="12" sm="3" md="3" cols="12">
              <v-row class="flex-nowrap inf-block align-center">
                <p class="text-subtitle-1 font-weight-bold">WE ACCEPT</p>
              </v-row>
              <v-row class="flex-nowrap inf-imgcard" style="max-width: 280px">
                <v-col class="pa-0">
                  <v-img
                    max-width="50"
                    src="@/assets/icons/svg/visa.svg"
                  ></v-img>
                </v-col>
                <v-col class="pa-0">
                  <v-img
                    max-width="50"
                    src="@/assets/icons/svg/mastercard.svg"
                  ></v-img>
                </v-col>
                <v-col class="pa-0">
                  <v-img
                    max-width="50"
                    src="@/assets/icons/svg/amex.svg"
                  ></v-img>
                </v-col>
                <v-col class="pa-0">
                  <v-img
                    max-width="50"
                    src="@/assets/icons/svg/unionpay.svg"
                  ></v-img>
                </v-col>
                <v-col class="pa-0">
                  <v-img
                    max-width="50"
                    src="@/assets/icons/svg/diners.svg"
                  ></v-img>
                </v-col>
              </v-row>
            </v-col>
            <v-divider vertical class="my-8 mx-4"></v-divider>
            <v-col xs="12" sm="3" md="3" cols="12">
              <v-row class="flex-nowrap inf-block align-center">
                <v-img
                  max-width="40"
                  max-height="40"
                  src="@/assets/icons/svg/refund.svg"
                  class="mr-4"
                ></v-img>
                <span class="text-subtitle-1 font-weight-bold"
                  >15 DAY MONEY BACK GUARANTEE ON ALL PLANS</span
                >
              </v-row>
            </v-col>
            <v-divider vertical class="my-8 mx-4"></v-divider>
            <v-col xs="12" sm="3" md="3" cols="12">
              <v-row class="flex-nowrap inf-block align-center">
                <v-img
                  max-width="40"
                  max-height="40"
                  src="@/assets/icons/svg/insurance.svg"
                  class="mr-4"
                ></v-img>
                <span class="text-subtitle-1 font-weight-bold"
                  >SSL SECURE PAYMENTS</span
                >
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </section>
      <v-divider></v-divider>
      <div class="mt-8">
        <v-container>
          <v-row
            class="justify-center mt-2 mb-8"
            style="font-size: 14px; color: #a3a3a3"
          >
            <v-col cols="12" class="pa-0">
              <p class="change-font font-weight-medium text-center">
                © Copyright 2020-2021 BRITECHECK, All rights reserved
              </p>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-main>
  </v-app>
</template>

<script src="https://js.stripe.com/v3/"></script>
<script>
import NavBar from '@/views/NavBar'
import { mapActions } from 'vuex'
import { loadStripe } from '@stripe/stripe-js'
import {
  SETTINGS_PAGE_SUBSCRIPTION,
  SUBSCRIPTION_PLAN_BUSINESS_MONTH_ID,
  SUBSCRIPTION_PLAN_BUSINESS_YEAR_ID,
  SUBSCRIPTION_PLAN_COMPANY_MONTH_ID,
  SUBSCRIPTION_PLAN_COMPANY_YEAR_ID,
  SUBSCRIPTION_PLAN_CORPORATE_YEAR_ID
} from '../../constant'

export default {
  name: 'Subscription',
  components: {
    NavBar
  },
  data() {
    return {
      YEAR: 'year',
      MONTH: 'month',
      UPGRADE_SUCCESS: 'success',
      subscriptionPlanBusinessMonthId: SUBSCRIPTION_PLAN_BUSINESS_MONTH_ID,
      subscriptionPlanBusinessYearId: SUBSCRIPTION_PLAN_BUSINESS_YEAR_ID,
      subscriptionPlanCompanyMonthId: SUBSCRIPTION_PLAN_COMPANY_MONTH_ID,
      subscriptionPlanCompanyYearId: SUBSCRIPTION_PLAN_COMPANY_YEAR_ID,
      subscriptionPlanCorporateYearId: SUBSCRIPTION_PLAN_CORPORATE_YEAR_ID,
      scrolled: false,
      period: null,
      yearlyPlan: null,
      monthlyPlan: null
    }
  },
  computed: {
    yearlyPlanPrice() {
      return this.yearlyPlan ? this.yearlyPlan.price : ''
    },
    monthlyPlanPrice() {
      return this.monthlyPlan ? this.monthlyPlan.price : ''
    },
    showOffBanner() {
      return (
        this.period === this.YEAR &&
        this.yearlyPlan.id !== this.subscriptionPlanCorporateYearId
      )
    },
    planName() {
      return this.yearlyPlan
        ? this.yearlyPlan.name
        : this.monthlyPlan
        ? this.monthlyPlan
        : ''
    },
    isDesktop() {
      return this.$vuetify.breakpoint.mdAndUp
    }
  },
  created: async function () {
    let plans = []
    await this.$store.dispatch('user/getAllPlans').then((res) => {
      plans = res.data.data
    })

    let monthlyPlanId, yearlyPlanId
    switch (this.$route.params.plan) {
      case 'corporate':
        yearlyPlanId = this.subscriptionPlanCorporateYearId
        break
      case 'company':
        monthlyPlanId = this.subscriptionPlanCompanyMonthId
        yearlyPlanId = this.subscriptionPlanCompanyYearId
        break
      case 'business':
      default:
        monthlyPlanId = this.subscriptionPlanBusinessMonthId
        yearlyPlanId = this.subscriptionPlanBusinessYearId
    }
    if (monthlyPlanId)
      this.monthlyPlan = plans.find((plan) => plan.id === monthlyPlanId)
    if (yearlyPlanId)
      this.yearlyPlan = plans.find((plan) => plan.id === yearlyPlanId)
    this.period = this.YEAR
  },
  async mounted() {
    this.includeStripe('js.stripe.com/v3/')
    window.onscroll = () => {
      this.changeColor()
    }
  },
  methods: {
    ...mapActions('user', ['getAllPlans']),
    includeStripe(URL, callback) {
      const documentTag = document
      const tag = 'script'
      const object = documentTag.createElement(tag)
      const scriptTag = documentTag.getElementsByTagName(tag)[0]
      object.src = '//' + URL
      if (callback) {
        object.addEventListener(
          'load',
          function (e) {
            callback(null, e)
          },
          false
        )
      }
      scriptTag.parentNode.insertBefore(object, scriptTag)
    },
    async buyNow(id) {
      const payload = {
        subscriptionId:
          this.period === this.YEAR ? this.yearlyPlan.id : this.monthlyPlan.id
      }
      await this.$store
        .dispatch('user/checkoutsession', payload)
        .then(async (res) => {
          if (res && res.stripeRedirect) {
            const stripePromise = loadStripe(res.stripePublicKey)
            const stripe = await stripePromise
            const result = await stripe
              .redirectToCheckout({
                sessionId: res.stripeSessionId
              })
              .then((response) => {
                this.$store.dispatch({
                  subscriptionId: id,
                  stripeSubscription: response
                })
              })
          } else {
            this.$router.push(
              {
                name: 'UserSettings'
              },
              () => {
                this.$store.dispatch(
                  'setSettingsPageSection',
                  SETTINGS_PAGE_SUBSCRIPTION
                )
                if (res && res.result === this.UPGRADE_SUCCESS) {
                  this.$store.dispatch(
                    'showUpgradeSubscriptionPlanSuccessPopup'
                  )
                  this.$store.dispatch(
                    'user/getUserByToken',
                    localStorage.getItem('querytoken')
                  )
                } else {
                  this.$store.dispatch('showUpgradeSubscriptionPlanFailedPopup')
                }
              }
            )
          }
        })
    },
    checkout() {
      this.$refs.checkoutRef.redirectToCheckout()
    },
    changeColor() {
      if (
        document.body.scrollTop > 50 ||
        document.documentElement.scrollTop > 50
      ) {
        this.scrolled = true
      } else {
        this.scrolled = false
      }
    },
    back() {
      this.$router.go(-1)
    },
    setPeriod(period) {
      this.period = period
    }
  }
}
</script>

<style lang="scss">
.sub-section {
  margin-top: 60px;
}
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700;800;900&display=swap');
.v-application--wrap > .v-main {
  padding: 0 !important;
}
.subs-title {
  font-size: 35px;
  font-weight: 400;
  line-height: 3.3rem;
  text-align: center;
}
.v-application .information-dop .text-subtitle-1 {
  font-size: 13px !important;
  font-weight: normal;
  line-height: 1.3rem !important;
  letter-spacing: 0.03em !important;
  font-family: 'Roboto', sans-serif !important;
}
.btn-block {
  background-color: #fff;
}
.btn-block .v-btn {
  font-size: 16px;
  min-width: 140px !important;
}
.change-font {
  font-family: 'Raleway', sans-serif;
}
.card-title {
  background-color: #5a5d5f;
  color: white !important;
  font-weight: 900;
  font-size: 1.6em;
  letter-spacing: 0.1rem;
}
.card-price {
  font-size: 2.6em;
  font-weight: 600;
  font-family: sans-serif;
  color: black !important;
}
.card-price .period {
  font-size: 0.8rem;
}
.and-price {
  font-size: 18px;
  display: block;
  color: #b5b5b5 !important;
  font-weight: 700;
  font-family: sans-serif;
}
.price-button {
  font-size: 1.25em !important;
  border-radius: 4px;
  margin-bottom: 8px;
  letter-spacing: 0.1rem;
  font-weight: bold;
  opacity: 0.7;
  height: 45px !important;
  transition: all 0.2s;
  width: 225px;
  max-width: 100%;
  border-color: #524e86 !important;
  background-color: #585382 !important;
  color: white !important;
}
.durable-transition {
  transition: all 0.5s;
}
.nav-pricing {
  margin-left: 30px;
  font-weight: 700;
  font-size: 14px;
  margin-top: 8px;
  &:hover {
    .menu-before {
      position: relative;
      top: -12px;
      left: -15px;
      content: '';
      height: 3px;
      width: 12px;
      background-color: #5f55b8;
    }
  }
}
.off-text-yearly {
  background-color: #ff551f;
  color: white;
  position: relative;
  top: 10px;
  left: -140px;
  padding: 10px 16px 16px;
  border-radius: 8px;
  font-size: 30px !important;
  font-weight: 600;
  letter-spacing: 1px;
}
.off-text-yearly span,
.off-text-monthly span {
  font-size: 15px;
  font-weight: 400;
}
.off-text-yearly:after {
  content: '';
  position: absolute;
  top: 20%;
  left: 135%;
  margin-left: -50px;
  width: 0;
  height: 0;
  border-bottom: solid 20px transparent;
  border-top: solid 20px transparent;
  border-left: solid 20px #ff551f;
}
.off-text-monthly {
  background-color: #fff;
  color: #ff551f;
  position: relative;
  top: 10px;
  left: -143px;
  padding: 10px 16px 16px;
  border-radius: 8px;
  border: solid 1px #ff551f;
  font-size: 30px !important;
  font-weight: 600;
  letter-spacing: 1px;
}
.off-text-monthly:after {
  color: #7671bd;
  position: absolute;
  top: 34%;
  left: 100%;
  width: 20px;
  height: 20px;
  border-top: 1px solid #ff551f;
  border-right: 1px solid #ff551f;
  border-bottom: 0px solid blue;
  border-left: 0px solid blue;
  content: '';
  margin-left: -9px;
  transform: rotate(45deg);
  background-color: white;
}
.footer-nav a {
  text-decoration: none;
  color: #767676;
  font-size: 16px;
}
.footer-nav a:hover {
  color: #7671bd;
}
.nav-icon {
  display: none;
}
.main-subtitle {
  padding: 0 16px;
  text-align: center;
}
.abs-disc {
  position: absolute;
  top: 0px;
  left: 0px;
}
.v-application .discount-block {
  box-shadow: 0 0 0 1px rgb(0 0 0 / 5%), 0 7px 25px 0 rgb(0 0 0 / 3%),
    0 4px 12px 0 rgb(0 0 0 / 3%) !important;
}
.discount-block .v-input {
  box-shadow: 0 0 0 1px rgb(0 0 0 / 5%), 0 7px 25px 0 rgb(0 0 0 / 3%),
    0 4px 12px 0 rgb(0 0 0 / 3%);
  border-radius: 6px;
}
.pay-block .v-radio:not(:last-child):not(:only-child) {
  margin-bottom: 0;
}
@media (max-width: 1023px) {
  .information-dop .theme--light.v-divider {
    display: none;
  }
}
@media (max-width: 992px) {
  .abs-disc {
    text-align: right;
    position: absolute;
    right: 0;
    left: auto;
  }
  .off-text-yearly:after,
  .off-text-monthly:after {
    display: none;
  }
  .v-application .off-text-yearly,
  .v-application .off-text-monthly {
    font-size: 1rem !important;
  }
  .off-text-yearly,
  .off-text-monthly {
    font-size: 1rem !important;
    left: -15px;
    padding: 10px;
  }
  .main-title .change-font {
    font-size: 36px;
  }
  .main-subtitle .change-font {
    font-size: 22px !important;
  }
  .v-application--wrap > .v-main {
    padding-top: 62px !important;
  }
}
@media (max-width: 768px) {
  .main-title {
    padding: 0 16px;
  }
  .main-subtitle {
    padding: 0 16px;
  }
  .v-input--selection-controls {
    margin-top: 28px;
  }
  .main-title .change-font {
    font-size: 34px;
  }
  .discount-block .v-input {
    box-shadow: none !important;
  }
}
@media (max-width: 640px) {
  .v-sheet.discount-block:not(.v-sheet--outlined) {
    box-shadow: none !important;
    border: solid 1px #e2e4f9;
  }
  .v-application .select-plan-title p {
    font-size: 20px !important;
    line-height: 1.7rem;
  }
  .main-title {
    padding: 0;
  }
  .main-title .change-font {
    font-size: 30px;
    line-height: 2.5rem;
  }
  .information-dop .inf-block {
    justify-content: center;
    margin: 0 20px;
  }
  .inf-imgcard {
    margin: 0 auto;
  }
}
@media (max-width: 480px) {
  .pay-block .v-radio:not(:last-child):not(:only-child) {
    margin-bottom: 0;
  }
  .pay-block {
    justify-content: space-between;
  }
  .v-application .discount-block .v-radio {
    margin-right: 0px !important;
  }
  .btn-block {
    flex-direction: column-reverse;
  }
  .btn-block button {
    margin-bottom: 25px;
  }
  .v-input--selection-controls {
    margin-top: 5px;
  }
  .abs-disc {
    text-align: right;
    position: inherit;
    left: auto;
  }
  .v-application .divider-main {
    margin-top: 20px !important;
    margin-bottom: 40px !important;
  }
}
</style>

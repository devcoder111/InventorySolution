<template>
  <v-container
    class="px-8 lighten-5 home-content"
    style="max-width: 100%; background-color: #fbfbfb"
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
    <v-card flat style="border: solid 1px #cdcdcd" class="mb-8">
      <p class="main-title text-h5 ma-4">Manage Plan</p>
      <div>
        <PaymentPlans />
      </div>
    </v-card>
  </v-container>
</template>

<script>
import PaymentPlans from '../../components/subscription/PaymentPlans'
export default {
  name: 'SubscriptionManagePlan',
  components: { PaymentPlans },
  data() {
    return {
      curUserPlan: '',
      navSettingsOptions: [
        {
          index: 1,
          text: 'Settings'
        },
        {
          index: 2,
          text: 'Subscription'
        },
        {
          index: 3,
          text: 'Manage Plan'
        }
      ],
      valid: true,
      businessPlanBtn: false,
      companyPlanBtn: false,
      corporatePlanBtn: false
    }
  },
  computed: {
    errorsExist() {
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

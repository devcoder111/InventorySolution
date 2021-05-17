<template>
  <v-container class="px-4">
    <v-row class="justify-center mb-4">
      <v-col class="px-0">
        <div class="col-md-10 col-md-offset-1 col-xl-12">
          <table>
            <colgroup></colgroup>
            <colgroup></colgroup>
            <colgroup></colgroup>
            <colgroup></colgroup>
            <thead>
              <tr>
                <th>&nbsp;</th>
                <th>
                  <div style="height: 100px">
                    <h2>BUSINESS</h2>
                    <p class="price">
                      <span class="currency">$</span> 47.4
                      <span class="period">/month</span>
                    </p>
                    <p class="billed">Billed Annually</p>
                  </div>
                  <a
                    v-if="showBusinessPlanBtn"
                    class="table-btn mx-2"
                    href="/subscription/business"
                    >SELECT</a
                  >
                  <a
                    v-else
                    class="table-btn-current-plan mx-2"
                    @click="$emit('change-plan-to-business', 'business')"
                    >CURRENT PLAN</a
                  >
                </th>
                <th>
                  <div style="height: 100px">
                    <h2>COMPANY</h2>
                    <p class="price">
                      <span class="currency">$</span> 177
                      <span class="period">/month</span>
                    </p>
                    <p class="billed">Billed Annually</p>
                  </div>
                  <a
                    v-if="showCompanyPlanBtn"
                    class="table-btn mx-2"
                    href="/subscription/company"
                    >SELECT</a
                  >
                  <a v-else class="table-btn-current-plan mx-2"
                    >CURRENT PLAN</a
                  >
                </th>
                <th>
                  <div style="height: 100px">
                    <h2>CORPORATE</h2>
                    <p class="price">
                      <span class="currency">$</span> 7500
                      <span class="period">/year</span>
                    </p>
                  </div>
                  <div>
                    <a
                      v-if="showCorporatePlanBtn"
                      class="table-btn mx-2"
                      href="/subscription/corporate"
                      >select</a
                    >
                    <a v-else class="table-btn-current-plan mx-2"
                      >CURRENT PLAN</a
                    >
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Users</th>

                <td>5</td>
                <td>10</td>
                <td>30</td>
              </tr>
              <tr>
                <th>Warehouses</th>

                <td>1</td>
                <td>5</td>
                <td>unlimited</td>
              </tr>
              <tr>
                <th>Barcodes</th>

                <td>
                  <v-row class="justify-center align-center">
                    <span>
                      <v-img
                        src="@/assets/icons/svg/check-bold-black.svg"
                        style="
                          width: 24px !important;
                          height: 24px !important;
                        "
                      ></v-img>
                    </span>
                  </v-row>
                </td>
                <td>Custom barcode labels - Unlimited</td>
                <td>Custom barcode labels - Unlimited</td>
              </tr>
              <tr>
                <th>Items</th>

                <td>3000</td>
                <td>Unlimited</td>
                <td>Unlimited</td>
              </tr>
              <tr>
                <th>CSV/PDF Reporting</th>
                <td>
                  <v-row class="justify-center align-center">
                    <span>
                      <v-img
                        src="@/assets/icons/svg/check-bold-black.svg"
                        style="
                          width: 24px !important;
                          height: 24px !important;
                        "
                      ></v-img>
                    </span>
                  </v-row>
                </td>
                <td>
                  <v-row class="justify-center align-center">
                    <span>
                      <v-img
                        src="@/assets/icons/svg/check-bold-black.svg"
                        style="
                          width: 24px !important;
                          height: 24px !important;
                        "
                      ></v-img>
                    </span>
                  </v-row>
                </td>
                <td>
                  <v-row class="justify-center align-center">
                    <span>
                      <v-img
                        src="@/assets/icons/svg/check-bold-black.svg"
                        style="
                          width: 24px !important;
                          height: 24px !important;
                        "
                      ></v-img>
                    </span>
                  </v-row>
                </td>
              </tr>
              <tr>
                <th>Alerts</th>

                <td>
                  <v-row class="justify-center align-center">
                    <span>
                      <v-img
                        src="@/assets/icons/svg/check-bold-black.svg"
                        style="
                          width: 24px !important;
                          height: 24px !important;
                        "
                      ></v-img>
                    </span>
                  </v-row>
                </td>
                <td>
                  <v-row class="justify-center align-center">
                    <span>
                      <v-img
                        src="@/assets/icons/svg/check-bold-black.svg"
                        style="
                          width: 24px !important;
                          height: 24px !important;
                        "
                      ></v-img>
                    </span>
                  </v-row>
                </td>
                <td>Alerts - Custom</td>
              </tr>

              <tr>
                <th>Custom Fields</th>

                <td>20</td>
                <td>Unlimited</td>
                <td>Unlimited</td>
              </tr>

              <tr>
                <th>Integrations</th>

                <td>&mdash;</td>
                <td>10</td>
                <td>Unlimited</td>
              </tr>

              <tr>
                <th>Assistance</th>

                <td>&mdash;</td>
                <td>5 HOURS setup assistance</td>
                <td>20 HOURS setup assistance</td>
              </tr>

              <tr>
                <th>Backup</th>

                <td>&mdash;</td>
                <td>3 months</td>
                <td>6 months</td>
              </tr>

              <tr>
                <th>User access rights</th>

                <td>&mdash;</td>
                <td>
                  <v-row class="justify-center align-center">
                    <span>
                      <v-img
                        src="@/assets/icons/svg/check-bold-black.svg"
                        style="
                          width: 24px !important;
                          height: 24px !important;
                        "
                      ></v-img>
                    </span>
                  </v-row>
                </td>
                <td>
                  <v-row class="justify-center align-center">
                    <span>
                      <v-img
                        src="@/assets/icons/svg/check-bold-black.svg"
                        style="
                          width: 24px !important;
                          height: 24px !important;
                        "
                      ></v-img>
                    </span>
                  </v-row>
                </td>
              </tr>

              <tr>
                <th>Phone/Email/Chat Support</th>

                <td>&mdash;</td>
                <td>&mdash;</td>
                <td>Unlimited</td>
              </tr>

              <tr>
                <th>API access for Integrations</th>

                <td>&mdash;</td>
                <td>&mdash;</td>
                <td>
                  <v-row class="justify-center align-center">
                    <span>
                      <v-img
                        src="@/assets/icons/svg/check-bold-black.svg"
                        style="
                          width: 24px !important;
                          height: 24px !important;
                        "
                      ></v-img>
                    </span>
                  </v-row>
                </td>
              </tr>

              <tr>
                <th>Single Sign On</th>

                <td>&mdash;</td>
                <td>&mdash;</td>
                <td>
                  <v-row class="justify-center align-center">
                    <span>
                      <v-img
                        src="@/assets/icons/svg/check-bold-black.svg"
                        style="
                          width: 24px !important;
                          height: 24px !important;
                        "
                      ></v-img>
                    </span>
                  </v-row>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </v-col>
    </v-row>
    <v-row></v-row>
  </v-container>
</template>

<script>

import { MODULE_USER } from '@/store/constant/mutation-types'
import {
  SUBSCRIPTION_PLAN_FREE_ID,
  SUBSCRIPTION_PLAN_BUSINESS_MONTH_ID,
  SUBSCRIPTION_PLAN_BUSINESS_YEAR_ID,
  SUBSCRIPTION_PLAN_COMPANY_MONTH_ID,
  SUBSCRIPTION_PLAN_COMPANY_YEAR_ID
} from '../../constant'

export default {
  name: 'PaymentPlans',
  data() {
    return {
    }
  },
  computed: {
    userSubscriptionPlan() {
      const user = this.$store.getters[`${MODULE_USER}/user`]
      return user ? user.plan : null
    },
    showBusinessPlanBtn() {
      console.log('user subscription plan : ', this.userSubscriptionPlan)

      return this.userSubscriptionPlan &&
        (
          !this.userSubscriptionPlan.id ||
          this.userSubscriptionPlan.id === SUBSCRIPTION_PLAN_FREE_ID
        )
    },
    showCompanyPlanBtn() {
      return !this.userSubscriptionPlan ||
        (
          !this.userSubscriptionPlan.id ||
          this.userSubscriptionPlan.id === SUBSCRIPTION_PLAN_FREE_ID ||
          this.userSubscriptionPlan.id === SUBSCRIPTION_PLAN_BUSINESS_MONTH_ID ||
          this.userSubscriptionPlan.id === SUBSCRIPTION_PLAN_BUSINESS_YEAR_ID
        )
    },
    showCorporatePlanBtn() {
      return !this.userSubscriptionPlan ||
        (
          !this.userSubscriptionPlan.id ||
          this.userSubscriptionPlan.id === SUBSCRIPTION_PLAN_FREE_ID ||
          this.userSubscriptionPlan.id === SUBSCRIPTION_PLAN_BUSINESS_MONTH_ID ||
          this.userSubscriptionPlan.id === SUBSCRIPTION_PLAN_BUSINESS_YEAR_ID ||
          this.userSubscriptionPlan.id === SUBSCRIPTION_PLAN_COMPANY_MONTH_ID ||
          this.userSubscriptionPlan.id === SUBSCRIPTION_PLAN_COMPANY_YEAR_ID
        )
    }
  },
  methods: {
    validate() {}
  }
}
</script>

<style lang="scss" scoped>
table {
  width: 100%;
  text-align: left;
  border-spacing: 0;
  border-collapse: collapse;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

table tbody tr:hover td,
table tbody tr:hover th {
  background: #f1f3f6 !important;
}

th,
td {
  font-family: inherit;
  font-size: 14px;
  line-height: 1.45;
  color: #444;
  font-weight: 500;
  vertical-align: middle;
  padding: 1em;
}

th {
  font-weight: 600;
}

colgroup:nth-child(1) {
  width: 31%;
  border: 0 none;
}

colgroup:nth-child(2) {
  width: 22%;
  border: 1px solid #dfe5eb;
}

colgroup:nth-child(3) {
  width: 25%;
  border: 1px solid #dfe5eb;
}

colgroup:nth-child(4) {
  width: 22%;
  border: 1px solid #dfe5eb;
}

/* Tablehead */

thead th {
  vertical-align: top;
  background: #def4fe;
  background: -moz-linear-gradient(top, #ffffff 0%, #f5f5f5 100%);
  background: -webkit-linear-gradient(top, #ffffff 0%, #f5f5f5 100%);
  background: -o-linear-gradient(top, #ffffff 0%, #f5f5f5 100%);
  background: -ms-linear-gradient(top, #ffffff 0%, #f5f5f5 100%);
  background: linear-gradient(to bottom, #ffffff 0%, #f5f5f5 100%);
  text-align: center;
  position: relative;
  border-bottom: 1px solid #dfe5eb;
  padding: 1em;
  font-weight: 400;
  color: #999;
}

thead th:nth-child(1) {
  background: transparent;
}

thead th h2 {
  font-weight: 600;
  font-size: 24px;
  line-height: 1.2;
  color: #2c2c49;
  font-family: sans-serif;
}

thead th h2 + .price {
  font-weight: 600;
  font-size: 26px;
  line-height: 1.4;
  margin-bottom: 0;
  color: #383838;
}

thead th h2 + .price .period {
  font-weight: 400;
  font-size: 16px;
}

thead th h2 + .price .currency {
  font-weight: 500;
  font-size: 20px;
}

thead th .billed {
  font-size: 15px;
  color: #9fa1af;
  font-family: sans-serif;
  letter-spacing: 1px;
  font-weight: 600;
}

/* Tablebody */
tbody th {
  background: #fff;
  border-left: 1px solid #dfe5eb;
}

tbody td {
  background: #fff;
  text-align: center;
}

tbody tr:nth-child(even) th,
tbody tr:nth-child(even) td {
  background: #f9f9f9;
  border: 1px solid #dfe5eb;
  border-width: 1px 0 1px 1px;
}

tbody tr:last-child td {
  border-bottom: 0 none;
}

/* Tablefooter */
tfoot th {
  padding: 2em 1em;
  border-top: 1px solid #dfe5eb;
}

tfoot td {
  text-align: center;
  padding: 2em 1em;
  border-top: 1px solid #dfe5eb;
}

.table-btn {
  font-weight: bold;
  background: #7671bd;
  color: #fff !important;
  text-decoration: none;
  text-transform: uppercase;
  display: inline-block;
  padding: 10px;
  border-radius: 4px;
  min-width: 140px;
}
.table-btn-current-plan {
  background: #f8f8f8;
  font-weight: bold;
  color: #dadada !important;
  text-decoration: none;
  text-transform: uppercase;
  display: inline-block;
  border: solid 1px #dadada;
  padding: 10px;
  min-width: 140px;
  border-radius: 4px;
}
</style>

<template>
  <v-container>
    <PageTitle class="main-title pa-2" title="Reports" />

    <v-row class="align-center px-3 mb-2" v-if="breadcrumbs.length">
      <v-col class="py-0" cols="12" sm="6">
        <v-breadcrumbs divider=">" class="px-0 pt-2 breadcrumbs">
          <v-breadcrumbs-item
            v-for="(item, index) in breadcrumbs"
            :key="`bc` + index"
          >
            <span
              style="font-size: 1.3rem"
              class="cursor-point"
              @click="openRoute(item.route)"
            >
              {{ item.text }}
              <v-icon style="font-size: 1.3rem"> mdi-chevron-right </v-icon>
            </span>
          </v-breadcrumbs-item>
        </v-breadcrumbs>
      </v-col>
    </v-row>

    <v-row>
      <v-col v-if="selectReport" class="report-card">
        <v-card-title class="headline justify-center title-report">
          Select the Report:
        </v-card-title>
        <div class="reports-wrapper d-flex justify-center">
          <v-card
            class="report d-flex flex-column justify-center"
            @click="$router.push({ name: 'ReportStockBalancesDate' })"
          >
            <div class="report-icon d-flex justify-center">
              <v-img class="icon" src="@/assets/icons/svg/dossier.svg" />
            </div>
            <div class="report-content">
              <v-card-subtitle class="report-h">
                The stock balances for the Date
              </v-card-subtitle>
              <v-card-text class="report-text">
                Create the report "Stock balances" for the Date, view the report
                online or download in PDF
              </v-card-text>
            </div>
          </v-card>
          <v-card
            class="report d-flex flex-column justify-center"
            @click="$router.push({ name: 'ReportStockBalancesRange' })"
          >
            <div class="report-icon d-flex justify-center">
              <v-img class="icon" src="@/assets/icons/svg/file.svg" />
            </div>
            <div class="report-content">
              <v-card-subtitle class="report-h">
                The stock balances for the Range
              </v-card-subtitle>
              <v-card-text class="report-text">
                Create the report "Stock balances" for the Range, view the
                report online or download in PDF
              </v-card-text>
            </div>
          </v-card>
        </div>
      </v-col>
    </v-row>
    <router-view />
  </v-container>
</template>

<script>
import PageTitle from '../../components/page/PageTitle'
export default {
  name: 'Reports',
  components: { PageTitle },
  data() {
    return {
      selectReport: true,
      breadcrumbs: []
    }
  },
  methods: {
    openRoute(routeName) {
      if (this.$router.currentRoute.name !== routeName) {
        this.$router.push({ name: routeName })
      }
    },
    createBreadcrumbs(needBreadcrumbs, reportRoute) {
      this.breadcrumbs = []
      if (needBreadcrumbs) {
        this.breadcrumbs = [
          { text: 'Reports', route: 'Reports' },
          {
            text: reportRoute.meta.breadcrumbs[0].name,
            route: reportRoute.name
          }
        ]
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.selectReport = to.name === vm.$options.name
      vm.createBreadcrumbs(!vm.selectReport, to)
    })
  },
  beforeRouteUpdate(to, from, next) {
    this.selectReport = to.name === this.$options.name
    this.createBreadcrumbs(!this.selectReport, to)
    next()
  }
}
</script>

<style scoped>
.title-report {
  color: #34333d;
  font-size: 38px;
}
.report-card {
  border: none;
  box-shadow: none !important;
  border-radius: 0;
}
.report {
  max-width: 340px;
  margin: 30px 20px 0;
  min-height: 300px;
  text-align: center;
  box-shadow: none !important;
  border: solid 2px #e3e5e8;
  border-radius: 6px;
  transition: 0.3s;
  background: #fff;
}
.report:hover {
  background: #f8f8ff;
  border: solid 2px #7671bd;
}
.report .report-icon .icon {
  max-width: 60px !important;
  max-height: 60px !important;
}
.report .report-content {
  text-align: center;
  margin-top: 20px;
}
.report .report-content .report-h {
  color: #424050;
  text-transform: uppercase;
  font-size: 18px;
  transition: 0.3s;
}
.report .report-content .report-text {
  color: #3d3d3d;
  font-size: 14px;
  transition: 0.3s;
}
.report:hover .report-content .report-h {
  color: #7671bd;
}
.report:hover .report-content .report-text {
  color: #413e67;
}
</style>

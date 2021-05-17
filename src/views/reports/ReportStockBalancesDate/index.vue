<template>
  <div class="py-0">
    <div class="table-wrapper mx-4 mt-6 pa-4">
      <ControlPanel
        v-bind:filter="filter"
        v-bind:exportAvailable="exportAvailable"
        @on-change="loadData"
        @on-export="exportData"
      />

      <v-divider />

      <ReportTable
        v-bind:warehouse="warehouse"
        v-bind:report="report"
        v-bind:sort="sort"
        v-bind:pagination="pagination"
        @on-change-sort="loadData"
      />

      <Pagination v-bind:pagination="pagination" @on-change="loadData" />
    </div>
  </div>
</template>

<script>
import * as constant from '../constant'
import services from '../../../services'
import ControlPanel from './components/ControlPanel'
import ReportTable from './components/ReportTable'
import Pagination from './components/Pagination'
import { MODULE_USER } from '../../../store/constant/mutation-types'
import moment from 'moment'

export default {
  name: 'ReportStockBalancesDate',
  components: { ControlPanel, ReportTable, Pagination },
  data() {
    return {
      report: [],
      warehouse: null,
      size: 0,
      filter: {
        inventoryId: null,
        categoryId: null,
        date: null
      },
      sort: {
        field: constant.FIELD_NAME,
        order: constant.SORT_ORDER_ASC
      },
      pagination: {
        page: 1,
        pages: 1,
        itemsPerPage: 10
      }
    }
  },
  computed: {
    user() {
      return this.$store.getters[`${MODULE_USER}/user`]
    },
    exportAvailable() {
      return this.report.length > 0
    }
  },
  methods: {
    prepareReport(data) {
      const items = []
      if (!data?.categories) {
        return items
      }
      const inventoryName = data.name
      Object.keys(data.categories).forEach((key) => {
        const category = data.categories[key]
        const path = category.path ? category.path.substring(1) : ''
        items.push.apply(
          items,
          category.items.map((item, idx) => {
            return {
              uid: `${path}_${item.number}`,
              num: item.number,
              inventoryName: inventoryName,
              categoryName: `Folder: ${path}`,
              categoryQTY: category.quantity,
              categoryValue: category.value,
              itemName: item.name,
              itemPath: path,
              itemQTY: item.quantity,
              itemPrice: item.price,
              itemValue: item.value
            }
          })
        )
      })
      return items
    },
    loadData() {
      if (!this.filter.date) {
        this.report = []
        return
      }
      services.reports
        .getReportStockBalancesDate({
          pageNumber: this.pagination.page,
          pageSize: this.pagination.itemsPerPage,
          filter: this.filter,
          sort: this.sort
        })
        .then((res) => {
          this.warehouse = {
            name: res.name,
            qty: res.quantity,
            value: res.value
          }
          this.report = this.prepareReport(res)

          this.size = res.count
          this.pagination.pages = Math.ceil(
            this.size / this.pagination.itemsPerPage
          )
        })
    },
    exportData() {
      if (!this.filter.date) {
        return
      }
      services.reports
        .exportReportStockBalancesDate({
          filter: this.filter,
          sort: this.sort
        })
        .then((res) => {
          const url = window.URL.createObjectURL(new Blob([res.data]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute(
            'download',
            `StockBalancesDate_${this.formatDate(
              this.filter.dateStart || new Date()
            )}.pdf`
          )
          document.body.appendChild(link)
          link.click()
        })
    },
    formatDate(date) {
      return moment(date).format('YYYY-MM-DD').slice(0, 10)
    }
  },
  mounted() {
    this.filter.inventoryId = this.user.inventories[0]
    this.loadData()
  }
}
</script>
<style scoped>
</style>

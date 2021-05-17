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
  name: 'ReportStockBalancesRange',
  components: { ControlPanel, ReportTable, Pagination },
  data() {
    return {
      report: [],
      warehouse: null,
      size: 0,
      filter: {
        inventoryId: null,
        categoryId: null,
        dateStart: null,
        dateEnd: null
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
              categoryQtyOpen: category.open,
              categoryQtyShipments: category.ship,
              categoryQtyAjustments: category.adjust,
              categoryQtyClose: category.close,
              itemName: item.name,
              itemPath: path,
              itemQtyOpen: item.open,
              itemQtyShipments: item.ship,
              itemQtyAjustments: item.adjust,
              itemQtyClose: item.close
            }
          })
        )
      })
      return items
    },
    loadData() {
      if (!this.filter.dateStart && !this.filter.dateEnd) {
        this.report = []
        return
      }
      services.reports
        .getReportStockBalancesRange({
          pageNumber: this.pagination.page,
          pageSize: this.pagination.itemsPerPage,
          filter: this.filter,
          sort: this.sort
        })
        .then((res) => {
          this.warehouse = {
            name: res.name,
            qtyOpen: res.open,
            qtyShipments: res.ship,
            qtyAjustments: res.adjust,
            qtyClose: res.close
          }
          this.report = this.prepareReport(res)

          this.size = res.count
          this.pagination.pages = Math.ceil(
            this.size / this.pagination.itemsPerPage
          )
        })
    },
    exportData() {
      services.reports
        .exportReportStockBalancesRange({
          filter: this.filter,
          sort: this.sort
        })
        .then((res) => {
          const url = window.URL.createObjectURL(new Blob([res.data]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute(
            'download',
            `StockBalancesRange_${this.formatDate(
              this.filter.dateStart
            )}_${this.formatDate(this.filter.dateEnd)}.pdf`
          )
          document.body.appendChild(link)
          link.click()
        })
    },
    formatDate(date) {
      return moment(date || new Date())
        .format('YYYY-MM-DD')
        .slice(0, 10)
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

<template>
  <v-container class="main-wrapper">
    <ActivityHistoryPageTitle
      v-bind:filter="filter"
      @on-change="loadHistoryData"
    />

    <div class="mx-4 mt-6 pa-4 table-wrapper">
      <ActivityHistoryControlPanel
        v-bind:filter="filter"
        @on-change="loadHistoryData"
        @on-export="exportHistoryData"
      />

      <v-divider />

      <ActivityHistoryTable
        v-bind:history="history"
        v-bind:filter="filter"
        v-bind:sort="sort"
        v-bind:pagination="pagination"
        @on-change-sort="loadHistoryData"
      />

      <ActivityHistoryPagination
        v-bind:pagination="pagination"
        @on-change="loadHistoryData"
      />
    </div>
    <v-row class="footer">
      <span class="footer--text"
        >Copyright 2020-2021
        <span style="color: #7972c0"
          ><a href="/" target="_blank" title="BRITECHECK">BRITECHECK</a></span
        >, All rights reserved.</span
      >
    </v-row>
  </v-container>
</template>

<script>
import ActivityHistoryPageTitle from './components/ActivityHistoryPageTitle'
import ActivityHistoryControlPanel from './components/ActivityHistoryControlPanel'
import ActivityHistoryTable from './components/ActivityHistoryTable'
import ActivityHistoryPagination from './components/ActivityHistoryPagination'
import { MODULE_USER } from '../../store/constant/mutation-types'
import services from '../../services'
import * as constant from './constant'

export default {
  name: 'ActivityHistory',
  components: {
    ActivityHistoryPageTitle,
    ActivityHistoryControlPanel,
    ActivityHistoryTable,
    ActivityHistoryPagination
  },
  data() {
    return {
      size: 0,
      history: [],
      filter: {
        inventoryId: null,
        users: [],
        searchText: null,
        operationType: null,
        dateStart: null,
        dateEnd: null
      },
      sort: {
        field: constant.SORT_FIELD_CREATED_AT,
        order: constant.SORT_ORDER_DESC
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
    }
  },
  methods: {
    createPayload() {
      return {
        pageNumber: this.pagination.page,
        pageSize: this.pagination.itemsPerPage,
        filter: this.filter,
        sort: this.sort
      }
    },
    loadHistoryData() {
      services.history.getHistoryData(this.createPayload()).then((res) => {
        this.size = res.count
        this.pagination.pages = Math.ceil(
          this.size / this.pagination.itemsPerPage
        )
        this.history = Array.isArray(res.data) ? res.data : []
      })
    },
    exportHistoryData(exportType) {
      if (exportType === constant.EXPORT_CSV) {
        services.history.exportHistoryCSV(this.createPayload()).then((res) => {
          this.downloadFile(res, exportType)
        })
      } else if (exportType === constant.EXPORT_PDF) {
        services.history.exportHistoryPDF(this.createPayload()).then((res) => {
          this.downloadFile(res, exportType)
        })
      }
    },
    downloadFile(response, exportType) {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `history.${exportType}`)
      document.body.appendChild(link)
      link.click()
    }
  },
  created() {
    this.filter.inventoryId = this.user.inventories[0]
    this.loadHistoryData()
  }
}
</script>

<style scoped>
.main-title {
  margin: 0 -12px;
}
.v-application .primary--text {
  color: #7671bd !important;
  caret-color: #7671bd !important;
}
</style>

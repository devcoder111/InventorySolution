<template>
  <v-row class="px-4 items-center mb-4">
    <div class="d-flex">
      <v-img
        max-height="20"
        max-width="20"
        class="mr-2 cursor-point"
        src="@/assets/icons/svg/export.svg"
      ></v-img>
      <span
        class="text-subtitle-2 font-weight-bold cursor-point"
        style="color: #7972c0"
        @click="showExportDialog">
        Export
      </span>
    </div>
    <v-spacer />
    <div class="d-flex">
      <ActivityHistoryFilterByPeriod @on-change="filterByPeriod" />
    </div>
    <div class="d-flex">
      <ActivityHistoryFilterByUser @on-change="filterByUser" />
    </div>
    <div class="d-flex">
      <ActivityHistoryFilterByAction @on-change="filterByAction"/>
    </div>
    <ActivityHistoryExportDialog ref="exportDialog" @on-export="exportHistory" />
  </v-row>
</template>

<script>

import moment from 'moment'
import ActivityHistoryFilterByUser from './ActivityHistoryFilterByUser'
import ActivityHistoryFilterByPeriod from './ActivityHistoryFilterByPeriod'
import ActivityHistoryFilterByAction from './ActivityHistoryFilterByAction'
import ActivityHistoryExportDialog from './ActivityHistoryExportDialog'

export default {
  name: 'ActivityHistoryControlPanel',
  components: { ActivityHistoryExportDialog, ActivityHistoryFilterByPeriod, ActivityHistoryFilterByUser, ActivityHistoryFilterByAction },
  props: ['filter'],
  data() {
    return {
    }
  },
  methods: {
    filterByUser(users) {
      this.filter.users = Array.isArray(users) ? users : []
      this.$emit('on-change')
    },
    filterByPeriod(period) {
      this.filter.dateStart = period.dateFrom ? moment(period.dateFrom).utc(true).format() : null
      this.filter.dateEnd = period.dateTo ? moment(period.dateTo).add({ hours: 23, minutes: 59 }).utc(true).format() : null
      this.$emit('on-change')
    },
    filterByAction(action) {
      this.filter.operationType = action
      this.$emit('on-change')
    },
    showExportDialog() {
      this.$refs.exportDialog.showDialog()
    },
    exportHistory(exportType) {
      this.$emit('on-export', exportType)
    }
  },
  created() {
  }
}
</script>

<style scoped>
.cursor-point {
  cursor: pointer !important;
}
.cursor-point:hover {
  cursor: pointer !important;
}

</style>

<template>
  <v-row class="px-4 items-center mb-4">
    <div class="d-flex" v-if="exportAvailable">
      <v-img
        max-height="20"
        max-width="20"
        class="mr-2 cursor-point"
        src="@/assets/icons/svg/export.svg"
      ></v-img>
      <span
        class="text-subtitle-2 font-weight-bold cursor-point"
        style="color: #7972c0"
        @click="exportPDF">
      Download PDF
    </span>
    </div>
    <v-spacer />
    <div class="d-flex">
      <FilterByPeriod @on-change="filterByPeriod" />
    </div>
    <div class="d-flex">
      <FilterByFolder @on-change="filterByFolder" />
    </div>
  </v-row>
</template>

<script>

import moment from 'moment'
import FilterByFolder from './FilterByFolder'
import FilterByPeriod from './FilterByPeriod'

export default {
  name: 'ControlPanel',
  components: { FilterByFolder, FilterByPeriod },
  props: ['filter', 'exportAvailable'],
  data() {
    return {
    }
  },
  methods: {
    filterByFolder(folderId) {
      this.filter.categoryId = folderId
      this.$emit('on-change')
    },
    filterByPeriod(date) {
      this.filter.date = date ? moment(date).utc(true).format() : null
      this.$emit('on-change')
    },
    exportPDF() {
      this.$emit('on-export', this.exportType)
    }
  },
  created() {
  }
}
</script>

<style scoped>

</style>

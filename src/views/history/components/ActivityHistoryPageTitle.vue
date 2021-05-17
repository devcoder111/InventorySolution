<template>
  <v-row
    class="justify-start align-start pa-2"
    style="background-color: #efefef; position: relative; margin: 0 -12px"
  >
    <v-col class="py-0" cols="12" sm="4">
      <span class="text-h5 main-title">Activity History</span>
    </v-col>
    <v-col class="py-1" cols="12" sm="5" style="transform: translate(0, 50%)" />
    <v-col class="py-2 my-auto" cols="12" sm="3">
      <v-row class="flex-nowrap align-center">
        <v-text-field
          v-model="search"
          placeholder="Search activity..."
          dense
          filled
          Outlined
          single-line
          hide-details="auto"
          background-color="white"
          prepend-inner-icon="mdi-magnify"
        />
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'ActivityHistoryPageTitle',
  props: ['filter'],
  data() {
    return {
      search: ''
    }
  },
  watch: {
    search() {
      const searchText = this.search.trim()
      if (this.filter.searchText === null && searchText.length < 3) {
        return
      }
      if (this.search.trim().length < 3) {
        this.filter.searchText = null
      } else {
        this.filter.searchText = searchText
      }
      this.$emit('on-change')
    }
  }
}
</script>

<style scoped>
.v-application .primary--text {
  color: #7972c0 !important;
  caret-color: #7972c0 !important;
}
</style>

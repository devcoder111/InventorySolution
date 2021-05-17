<template>
  <v-row>
    <v-col v-if="pagination.pages" cols="3">
      <span class="text-subtitle-2 font-weight-medium mr-2">Showing</span>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            text
            outlined
            v-bind="attrs"
            v-on="on"
            style="padding: 0px; font-weight: 600"
          >
            {{ pagination.itemsPerPage }}
            <v-icon>mdi-menu-down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in itemsPerPageOptions"
            :key="index"
            link
            @click="changeItemsPerPage(item)"
          >
            <v-list-item-title>{{ item }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <span class="text-subtitle-2 font-weight-medium ml-2">Entries</span>
    </v-col>
    <v-col cols="9" class="d-flex justify-end">
      <v-pagination
        v-model="pagination.page"
        :length="pagination.pages"
        :total-visible="6"
        color="#7972C0"
        @input="changePage"
      ></v-pagination>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'ActivityHistoryPagination',
  props: {
    pagination: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
      itemsPerPageOptions: [5, 10, 20, 25, 50, 100]
    }
  },
  methods: {
    changePage() {
      this.$emit('on-change')
    },
    changeItemsPerPage(num) {
      this.pagination.page = 1
      this.pagination.itemsPerPage = num
      this.$emit('on-change')
    }
  }
}
</script>

<style scoped>

</style>

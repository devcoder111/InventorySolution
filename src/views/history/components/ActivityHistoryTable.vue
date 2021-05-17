<template>
  <v-row class="justify-space-between">
    <v-col cols="12" class="px-0">
      <v-data-table
        :headers="headers"
        :items="items"
        :items-per-page="pagination.itemsPerPage"
        :sort-by="['createdAt']"
        :sort-desc="sortDesc"
        item-key="id"
        hide-default-footer
        @update:sort-desc="changeSortOrder"
      >
        <template v-slot:no-results>
          <p class="text-h5 mt-16">No Activity</p>
        </template>

        <template v-slot:[`item.createdAt`]="{ item }">
              <span>{{item.createdAt}}</span>
        </template>

        <template v-slot:[`item.activity`]="{ item }">
          <span>{{ item.activity }}</span>
        </template>

        <template v-slot:[`item.description`]="{ item }">
              <span v-html="highlightSearchText(item.description)"></span>
        </template>

        <template v-slot:[`item.user`]="{ item }">
          <span>{{ item.user }}</span>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import moment from 'moment'
import * as constant from '../constant'

export default {
  name: 'ActivityHistoryTable',
  props: {
    history: {
      type: Array,
      required: true
    },
    filter: {
      type: Object,
      required: true
    },
    sort: {
      type: Object,
      required: true
    },
    pagination: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      format: null,
      headers: [
        {
          text: 'Date',
          value: 'createdAt',
          sortable: true,
          align: 'start'
        },
        {
          text: 'Activity',
          value: 'activity',
          sortable: false,
          align: 'start'
        },
        {
          text: 'Description',
          value: 'description',
          sortable: false,
          align: 'start'
        },
        {
          text: 'User',
          value: 'user',
          sortable: false,
          align: 'start'
        }
      ]
    }
  },
  computed: {
    items() {
      return this.history.map((item, index) => {
        return this.getActivity(item, index)
      })
    },
    sortDesc() {
      return this.sort.order === constant.SORT_ORDER_DESC
    }
  },
  methods: {
    formatDate(date) {
      if (!date || !this.format) {
        return ''
      }
      return moment(date).format(this.format).slice(0, 10)
    },
    capitalize(words) {
      return words.replace(/\b\w/g, l => l.toUpperCase())
    },
    getActivity(item, index) {
      if (item.operationType === 'DISABLE') {
        item.operationType = 'DELETE'
      }
      const quantityChangeActivity = this.getQuantityChangeActivity(item, index)
      if (quantityChangeActivity) {
        return quantityChangeActivity
      }
      return {
        id: index,
        createdAt: this.formatDate(item.createdAt),
        user: this.createUser(item),
        activity: this.capitalize((item.operationType + ' ' + item.object.type).toLowerCase()),
        description: this.createDescription(item)
      }
    },
    createDescription(item) {
      return this.capitalize(item.operationType.toLowerCase()) + 'd ' +
        item.object.type.toLowerCase() + ' "' + item.object.name + '" ' +
        (item.object.parent ? ' in "' + item.object.parent + '"' : '')
    },
    highlightSearchText(text) {
      const searchMask = (this.filter?.searchText || '').trim()
      if (searchMask.length === 0) {
        return text
      }
      const regEx = new RegExp(searchMask, 'ig')
      return text.replace(regEx, `<strong>${searchMask}</strong>`)
    },
    createUser(item) {
      if (!item.user) {
        return ''
      }
      return `${item.user.firstName} ${item.user.lastName}`
    },
    getQuantityChangeActivity(item, index) {
      if (item.object.type !== 'ITEM' || item.operationType !== 'UPDATE' || !Array.isArray(item.details)) {
        return null
      }
      const quantityChangeDetails = item.details.find(detail => detail.field === 'quantity' && detail.newValue !== detail.oldValue)
      if (!quantityChangeDetails) {
        return null
      }
      return {
        id: index,
        createdAt: this.formatDate(item.createdAt),
        user: this.createUser(item),
        activity: 'Change Quantity',
        description: `Changed quantity of item "${item.object.name}" \
        from ${(quantityChangeDetails.oldValue || 0)} to ${(quantityChangeDetails.newValue || 0)} \
        ${(item.object.parent ? ' in "' + item.object.parent + '"' : '')}`
      }
    },
    changeSortOrder(desc) {
      this.sort.order = desc ? constant.SORT_ORDER_DESC : constant.SORT_ORDER_ASC
      this.$emit('on-change-sort')
    }
  },
  created() {
    this.$store.dispatch('getGeneralSettings').then((settings) => {
      this.format = settings?.dateTimeFormat?.value
    })
  }
}
</script>

<style scoped>

</style>

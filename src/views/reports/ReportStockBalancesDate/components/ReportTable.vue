<template>
  <v-row class="justify-space-between">
    <v-col cols="12" class="px-0">
      <v-data-table
        :headers="headers"
        :items="report"
        :items-per-page="pagination.itemsPerPage"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :must-sort="true"
        item-key="uid"
        group-by="categoryName"
        show-group-by
        hide-default-footer
        class="elevation-1"
      >
        <template v-slot:no-results>
          <p class="text-h5 mt-16">No data for the report was found</p>
        </template>

        <template v-slot:body.prepend="" style="background: #dbe3ef">
          <tr class="war-row">
            <td colspan="3">
              <span class="font-weight-bold"> WAREHOUSE TOTAL </span>
            </td>
            <td>
              <span class="font-weight-bold">
                {{ warehouse ? warehouse.qty : '' }}
              </span>
            </td>
            <td>&nbsp;</td>
            <td>
              <span class="font-weight-bold">
                {{ warehouse ? warehouse.value : '' }}
              </span>
            </td>
          </tr>
        </template>
        <template v-slot:group="props" style="background: #f2f7ff">
          <tr class="folder-row" style="background: #f2f7ff">
            <td colspan="3">
              <span class="font-weight-bold">
                {{ props.group }}
              </span>
            </td>
            <td>
              <span class="font-weight-bold">
                {{ props.items[0].categoryQTY }}
              </span>
            </td>
            <td>&nbsp;</td>
            <td>
              <span class="font-weight-bold">
                {{ props.items[0].categoryValue }}
              </span>
            </td>
          </tr>
          <tr v-for="item in props.items" :key="item.uid">
            <td>{{ item.num }}</td>
            <td>{{ item.itemName }}</td>
            <td>{{ item.itemPath }}</td>
            <td>{{ item.itemQTY }}</td>
            <td>{{ item.itemPrice }}</td>
            <td>{{ item.itemValue }}</td>
          </tr>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import * as constant from '../../constant'

export default {
  name: 'ReportTable',
  props: {
    warehouse: {
      type: Object
    },
    report: {
      type: Array,
      required: true
    },
    pagination: {
      type: Object,
      required: true
    },
    sort: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      format: null,
      headers: [
        {
          text: '#',
          value: 'num',
          sortable: false,
          align: 'start',
          groupable: false
        },
        {
          text: 'Item',
          value: constant.FIELD_NAME,
          sortable: true,
          align: 'start',
          groupable: false
        },
        {
          text: 'Folder',
          value: 'itemPath',
          sortable: false,
          align: 'start',
          groupable: false
        },
        {
          text: 'QTY',
          value: constant.FIELD_QUANTITY,
          sortable: true,
          align: 'start',
          groupable: false
        },
        {
          text: 'Price',
          value: constant.FIELD_PRICE,
          sortable: true,
          align: 'start',
          groupable: false
        },
        {
          text: 'Value',
          value: constant.FIELD_VALUE,
          sortable: true,
          align: 'start',
          groupable: false
        }
      ]
    }
  },
  computed: {
    sortDesc: {
      get() {
        return this.sort.order === constant.SORT_ORDER_DESC
      },
      set(val) {
        this.sort.order = val ? constant.SORT_ORDER_DESC : constant.SORT_ORDER_ASC
        this.$emit('on-change-sort')
      }
    },
    sortBy: {
      get() {
        return this.sort.field
      },
      set(val) {
        this.sort.field = Array.isArray(val) ? val[0] : val
        this.$emit('on-change-sort')
      }
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
.war-row {
  background-color: #dbe3ef !important;
}
.folder-row {
  background-color: #f2f7ff !important;
}
</style>

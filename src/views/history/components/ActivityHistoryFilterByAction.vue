<template>
  <v-card
    flat
    style="width: 200px !important; background-color: #f5f5f5"
    class="d-flex"
  >
    <span class="text-body-1 mr-2">Show:</span>
    <v-select
      style="max-width: 160px;"
      v-model="action"
      outlined
      dense
      color="black"
      :items="actions"
      placeholder="All Alerts"
      hide-details
    ></v-select>
  </v-card>
</template>

<script>
export default {
  name: 'ActivityHistoryFilterByAction',
  data() {
    return {
      action: null,
      actions: [
        {
          text: 'All Activity',
          value: null
        },
        {
          text: 'Create Folder/Item',
          value: 'CREATE'
        },
        {
          text: 'Update Folder/Item',
          value: 'UPDATE'
        },
        {
          text: 'Delete Folder/Item',
          value: 'DELETE'
        }
      ]
    }
  },
  watch: {
    action() {
      this.$emit('on-change', this.action)
    }
  }
}
</script>

<style scoped>
.text-body-1 {
  line-height: 2.55rem;
  font-size: 0.95rem !important;
}

</style>

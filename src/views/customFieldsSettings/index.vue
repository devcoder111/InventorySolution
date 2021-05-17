<template>
  <component
    v-bind:is='type'
    @changeType='changeType'
    :editNumber='editNumber'
  />
</template>

<script>
import customFieldsTable from './customFieldsTable'
import customFieldsAdding from './customFieldsAdding'
import customFieldsEdit from './customFieldsEdit'

export default {
  data: function() {
    return {
      type: 'customFieldsTable',
      editNumber: null
    }
  },
  methods: {
    changeType(newType, editNumber) {
      this.type = newType
      this.editNumber = editNumber
    }
  },
  components: {
    customFieldsTable,
    customFieldsAdding,
    customFieldsEdit
  }
}
</script>

<template>
  <component
    :is='type'
    @changeType='changeType'
    @selfChange='selfChangeType'
    :addingType='addingType.type'
    :addingName='addingType.name'
  />
</template>

<script>
import addingList from './customFieldsAdding/addingList'
import addingWrapperBox from './customFieldsAdding/addingWrapperBox'

export default {
  name: 'customFieldsAdding',
  components: {
    addingList,
    addingWrapperBox
  },
  data: function() {
    return {
      type: 'addingList',
      addingType: {
        type: '',
        name: ''
      }
    }
  },
  methods: {
    changeType(type) {
      this.type = 'addingList'
      this.addingType = {
        type: '',
        name: ''
      }
      this.$emit('changeType', type, null)
    },
    selfChangeType(type, arg) {
      if (arg) {
        this.addingType = arg
      } else {
        this.addingType = {
          type: '',
          name: ''
        }
      }
      this.type = type
    }
  }
}
</script>

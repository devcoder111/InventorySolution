<template>
  <component
    :is="touch"
    :name="name"
    v-model="currValue"
    :placeholderContent='placeholderContent'
    :isEdit='isEdit'
    :editId='editId'
    :preloadedItem='preloadedItem'
    :letDelete='letDelete'
    @delete='()=>{$emit("delete")}'
    @exit='arg=>{$emit("exit", arg)}'
    @newInput="
      newVal => {
        $emit('newInput', newVal)
      }
    "
  />
</template>

<script>
import { indexBaseMixin } from '@/components/customFields/commonMixins/_helpers/indexBase.mixin'
import writingView from './writingView'
import addingPreview from './addingPreview'
import settingView from './settingView'

export default {
  mixins: [indexBaseMixin],
  name: 'Checkbox',
  props: {
    value: {
      type: [String, Boolean],
      default: ''
    },
    name: {
      type: String,
      default: 'Checkbox'
    }
  },
  computed: {
    currValue() {
      return this.value ? this.value === 'true' : false
    }
  },
  components: {
    writingView,
    addingPreview,
    settingView
  }
}
</script>

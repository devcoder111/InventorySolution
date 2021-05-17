<template>
  <component
    :is="touch"
    :name="name"
    v-model="value"
    :placeholderContent='placeholderContent'
    :defaultValues='defaultValues'
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
  name: 'Dropdown',
  props: {
    value: {
      type: [String, Array, null],
      default: ''
    },
    defaultValues: {
      type: Array,
      default: () => []
    },
    name: {
      type: String,
      default: 'Dropdown'
    }
  },
  components: {
    writingView,
    addingPreview,
    settingView
  }
}
</script>

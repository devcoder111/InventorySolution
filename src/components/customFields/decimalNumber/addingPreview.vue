<template>
  <customFieldsAddingPreview
    :icon='"number-seven.svg"'
    :name='currentName'
    :units='units'
  >
    <template :slot='"body"'>
      <v-text-field
        dense
        :placeholder="currentPlaceholder"
        v-model="exampleValue"
        :rules='nameRules'
        single-line
        color="#43425d"
        type="number"
        class="r-field item-name-field"
      />
    </template>
  </customFieldsAddingPreview>
</template>

<script>
import customFieldsAddingPreview from '../customFieldsAddingPreview'
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    placeholderContent: {
      type: String,
      default: 'Enter Item Name'
    },
    units: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    }
  },
  data: function() {
    return {
      thisValue: '',
      nameRules: [(value) => /^[+-]?((\d+(\.\d*)?)|(\.\d+))$/.test(value) || 'Number should be valid']
    }
  },
  computed: {
    exampleValue: {
      get() {
        return this.value ? +this.value : ''
      },
      set(value) {
        this.thisValue = value
      }
    },
    currentName() {
      return this.name.length ? this.name : 'Decimal Number'
    },
    currentPlaceholder() {
      return this.placeholderContent.length ? this.placeholderContent : 'Placeholder'
    }
  },
  components: {
    customFieldsAddingPreview
  }
}
</script>

<template>
  <customFieldsAddingPreview
    :icon='"checkbox.svg"'
    :name='currentName'
    :units='units'
  >
    <template :slot='"body"'>
      <v-checkbox
        v-model="exampleValue"
        :label="currentPlaceholder"
        color="#8074c2"
        class='mt-1'
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
      default: 'Label text'
    },
    units: {
      type: String,
      default: ''
    },
    value: {
      default: null
    }
  },
  data: function() {
    return {
      thisValue: false
    }
  },
  computed: {
    exampleValue: {
      get() {
        return typeof this.value === 'boolean' ? this.value : this.thisValue
      },
      set(value) {
        this.thisValue = value
      }
    },
    currentName() {
      return this.name.length ? this.name : 'Checkbox'
    },
    currentPlaceholder() {
      return this.placeholderContent.length ? this.placeholderContent : 'Label text'
    }
  },
  components: {
    customFieldsAddingPreview
  }
}
</script>

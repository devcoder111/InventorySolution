<template>
  <customFieldsAddingPreview
    :icon="'calendar.svg'"
    :name="currentName"
    :units="units"
  >
    <template :slot="'body'">
      <v-text-field
        dense
        :placeholder="currentPlacholder"
        v-model="exampleValue"
        color="#43425d"
        maxlength="128"
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
  data: function () {
    return {
      thisValue: ''
    }
  },
  computed: {
    exampleValue: {
      get() {
        return this.value ? this.value : ''
      },
      set(value) {
        this.thisValue = value
      }
    },
    currentName() {
      return this.name.length ? this.name : 'Small Text Box'
    },
    currentPlacholder() {
      return this.placeholderContent.length
        ? this.placeholderContent
        : 'Placeholder'
    }
  },
  components: {
    customFieldsAddingPreview
  }
}
</script>

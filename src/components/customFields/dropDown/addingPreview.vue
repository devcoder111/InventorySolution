<template>
  <customFieldsAddingPreview
    :icon='"dropdown.svg"'
    :name='currentName'
    :units='units'
  >
    <template :slot='"body"'>
      <div class="input-mb d-flex flex-nowrap">
        <v-select
          :items="currentItems"
          :placeholder="currentPlaceholder"
          v-model='currentValue'
        />
      </div>
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
      default: []
    }
  },
  data: function() {
    return {
      exampleValue: '',
      items: ['Select one', 'Select two', 'Select three', 'Select four']
    }
  },
  computed: {
    currentName() {
      return this.name.length ? this.name : 'Dropdown'
    },
    currentPlaceholder() {
      return this.placeholderContent.length ? this.placeholderContent : 'Placeholder'
    },
    currentItems() {
      if (this.value.length) {
        const newArr = []
        this.value.filter(item => !item.isDeleted).forEach(item => {
          newArr.push(item.value)
        })
        return newArr
      }
      return this.items
    },
    currentValue: {
      get() {
        if (this.value.length) {
          const defaultItem = this.value.find(item => item.isAsDefault)
          return defaultItem ? defaultItem.value : this.exampleValue
        }
        return this.exampleValue
      },
      set(v) {
        if (!this.value) this.exampleValue = v
      }
    }
  },
  components: {
    customFieldsAddingPreview
  }
}
</script>

<template>
  <customFieldsAddingPreview
    :icon='"browser.svg"'
    :name='currentName'
    :units='units'
  >
    <template :slot='"body"'>
      <v-text-field
        dense
        :placeholder="currentPlaceholder"
        v-model="exampleValue"
        :rules="webLinkRules"
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
  data: function() {
    return {
      thisValue: '',
      webLinkRules: [
        (v) => {
          if (v.length) {
            const validRegEx = /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/
            return validRegEx.test(v) || 'Please Enter current Web Link'
          }
          return true
        }
      ]
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
      return this.name.length ? this.name : 'Web Link'
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

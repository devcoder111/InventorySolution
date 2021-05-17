<template>
  <customFieldsAddingPreview
    :icon='"at.svg"'
    :name='currentName'
    :units='units'
  >
    <template :slot='"body"'>
      <v-text-field
        @blur="isValidatedEmailMethod"
        v-model="exampleValue"
        :rules="emailRules"
        :placeholder="currentPlaceholder"
        pt="5"
        :append-icon="isValidatedEmail ? 'mdi-checkbox-marked-circle' : ''"
        :append-outer-icon="
          emailErrCnt == 0 ? '' : isValidatedEmail ? '' : 'mdi-alert-circle'
        "
        @input='v=>{$emit("newInput", v)}'
        class="r-field item-name-field custom-field-email"
      ></v-text-field>
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
      emailErrCnt: 0,
      emailRules: [
        (v) => {
          if (v.length) {
            const reg = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i)
            return reg.test(v) || 'E-mail must be valid'
          }
          return true
        }
      ]
    }
  },
  computed: {
    isValidatedEmail() {
      const validRegEx = /\S+@\S+\.\S+/
      return this.thisValue !== null && validRegEx.test(this.thisValue)
    },
    exampleValue: {
      get() {
        return this.value ? this.value : ''
      },
      set(value) {
        this.thisValue = value
      }
    },
    currentName() {
      return this.name.length ? this.name : 'Email'
    },
    currentPlaceholder() {
      return this.placeholderContent.length ? this.placeholderContent : 'Placeholder'
    }
  },
  watch: {
    isValidatedEmail: {
      deep: true,
      handler: function (newVal) {
        this.emailErrCnt++
      }
    }
  },
  methods: {
    isValidatedEmailMethod() {
      const validRegEx = /.+@.+\..+/
      if (this.thisValue === '' || !validRegEx.test(this.thisValue)) {
        this.emailErrCnt++
      }
    }
  },
  components: {
    customFieldsAddingPreview
  }
}
</script>

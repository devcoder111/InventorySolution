<template>
  <customFieldsAddingPreview
    :icon='"phone-call.svg"'
    :name='currentName'
    :units='units'
  >
    <template :slot='"body"'>
      <v-text-field
        dense
        v-model="exampleValue"
        :placeholder="currentPlacholder"
        v-mask="'+1 (###) ### ##-##'"
        :rules='phoneRules'
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
      phoneRules: [
        v => {
          if (v.length) {
            return /1?\W*([2-9][0-8][0-9])\W*([2-9][0-9]{2})\W*([0-9]{4})(\se?x?t?(\d*))?/.test(v.split(/\D/).join('')) || 'Phone number is not valid'
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
      return this.name.length ? this.name : 'Phone Number'
    },
    currentPlacholder() {
      return this.placeholderContent.length ? this.placeholderContent : 'Placeholder'
    }
  },
  components: {
    customFieldsAddingPreview
  }
}
</script>

<style lang="scss">
  .flag-phone {
    display: none;
  }
  .wrraper-phone {
    display: flex;
    width: 100%;
  }
  .input-phone {
    width: 100%;
    height: 45px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.42);
    outline: none !important;
  }
  .input-phone:hover {
    border-bottom: 1px solid rgba(0, 0, 0, 0.87);
  }
  .input-phone:focus {
    border-bottom: 1px solid rgba(0, 0, 0, 0.87);
  }
</style>

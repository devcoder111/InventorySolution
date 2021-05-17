<template>
  <component
    :is="itemType"
    :touch="'addingPreview'"
    :name="name"
    :placeholderContent="placeholderContent"
    :units="units"
    v-model="defaultValue"
  />
</template>

<script>
import smallTextBox from '@/components/customFields/smallTextBox'
import largeTextBox from '@/components/customFields/largeTextBox'
import roundNumber from '@/components/customFields/roundNumber'
import decimalNumber from '@/components/customFields/decimalNumber'
import phoneNumber from '@/components/customFields/phoneNumber'
import email from '@/components/customFields/email'
import webLink from '@/components/customFields/webLink'
import dateField from '@/components/customFields/dateField'
import checkBox from '@/components/customFields/checkBox'
import dropDown from '@/components/customFields/dropDown'
import fileAttachment from '@/components/customFields/fileAttachment'
export default {
  name: 'fieldPreview',
  props: {
    itemType: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    placeholderContent: {
      type: String,
      default: ''
    },
    units: {
      type: String,
      default: ''
    },
    defaultValue: {
      default: ''
    }
  },
  data: function () {
    return {
      value: this.defaultValue
    }
  },
  components: {
    smallTextBox,
    largeTextBox,
    roundNumber,
    decimalNumber,
    phoneNumber,
    email,
    webLink,
    dateField,
    checkBox,
    dropDown,
    fileAttachment
  }
}
</script>

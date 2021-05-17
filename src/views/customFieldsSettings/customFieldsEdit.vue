<template>
  <v-container class="px-8 lighten-5 home-content" style="max-width: 100%">
    <v-row>
      <v-col>
        <v-breadcrumbs divider=">" class="px-0 pt-0">
          <v-breadcrumbs-item
            v-for="item in navSettingsOptions"
            :key="item.index"
          >
            <span
              class="text-breadcum-settings"
              :class='{
                "cursor-pointer":item.index===2
              }'
              @click='()=>{if (item.index === 2) changeType("customFieldsTable")}'
            >
              {{ item.text }}
              <v-icon style="font-size: 1.2rem">mdi-chevron-right</v-icon>
            </span>
          </v-breadcrumbs-item>
        </v-breadcrumbs>
      </v-col>
    </v-row>
    <component
      v-if='item'
      :is='addingType'
      :isEdit='true'
      :editId='editNumber'
      :preloadedItem='item'
      :touch='"settingView"'
      @changeItemProperty='(name, value)=>{item[name] = value}'
      @exit='changeType("customFieldsTable")'
    />
  </v-container>
</template>

<script>
import { fieldsNamesFromBE } from '@/utils/customFields'
import customFieldService from '@/services/customField.js'
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
  name: 'customFieldsEdit',
  props: {
    editNumber: {
      type: Number,
      required: true
    }
  },
  data: function() {
    return {
      addingType: 'smallTextBox',
      item: null,
      navSettingsOptions: [
        {
          index: 1,
          text: 'Settings'
        },
        {
          index: 2,
          text: 'Custom Fields'
        },
        {
          index: 3,
          text: 'Edit Custom Field'
        }
      ]
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
  },
  methods: {
    changeType(type) {
      this.$emit('changeType', type, null)
    }
  },
  async mounted() {
    const responsedItem = await customFieldService.getCustomField({ id: this.editNumber })
    const item = {
      value: responsedItem.data.data.defaultValue,
      name: responsedItem.data.data.name,
      placeholderContent: responsedItem.data.data.placeholder,
      applicableToAll: responsedItem.data.data.applyTo === 'ALL_ITEMS'
    }
    if (responsedItem.data.data.type === 'ARRAY') {
      item.defaultValues = []
      responsedItem.data.data.arrayValues.forEach(el => {
        item.defaultValues.push({
          value: el.value,
          isAsDefault: responsedItem.data.data.defaultValue === el.value
        })
      })
    }
    this.item = item
    this.addingType = fieldsNamesFromBE.get(responsedItem.data.data.fieldType).name
  }
}
</script>

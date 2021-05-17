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
                "cursor-pointer":item.index===2||item.index===3
              }'
              @click='handleBreadcrumbsClick(item.index)'
            >
              {{ item.text }}
              <v-icon style="font-size: 1.2rem">mdi-chevron-right</v-icon>
            </span>
          </v-breadcrumbs-item>
        </v-breadcrumbs>
      </v-col>
    </v-row>
    <p class="option-title">{{addingName}}</p>
    <keep-alive>
      <component :is='addingType' :touch='"settingView"' @exit='handleExit' />
    </keep-alive>
    <UnsavedChangesPopup
      :showPopup='showUnsavedChangesPopup'
      @doExit='handleBreadcrumbsClick(2)'
      @doCancel='()=>{showUnsavedChangesPopup=false}'
    />
  </v-container>
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
import UnsavedChangesPopup from '@/components/customFields/commonMixins/unsavedChangesPopup'

export default {
  name: 'addingWrapperBox',
  props: {
    addingType: {
      type: String,
      required: true
    },
    addingName: {
      type: String,
      required: true
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
    fileAttachment,
    UnsavedChangesPopup
  },
  data: function() {
    return {
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
          text: 'Adding Custom Field'
        }
      ],
      showUnsavedChangesPopup: false
    }
  },
  methods: {
    handleBreadcrumbsClick(index) {
      if (index === 3) this.$emit('selfChange', 'addingList', null)
      if (index === 2) this.$emit('changeType', 'customFieldsTable')
    },
    handleExit(arg) {
      if (arg) {
        this.showUnsavedChangesPopup = true
      } else {
        this.handleBreadcrumbsClick(2)
      }
    }
  },
  created() {
    this.navSettingsOptions.push({ index: 4, text: this.addingName })
  }
}
</script>

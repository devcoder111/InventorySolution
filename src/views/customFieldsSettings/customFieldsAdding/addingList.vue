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
              :class="{
                'cursor-pointer': item.index === 2
              }"
              @click="handleBreadcrumbsClick(item.index)"
            >
              {{ item.text }}
              <v-icon style="font-size: 1.2rem">mdi-chevron-right</v-icon>
            </span>
          </v-breadcrumbs-item>
        </v-breadcrumbs>
      </v-col>
    </v-row>
    <p class="option-title">Adding Custom Field</p>
    <v-row class="my-4 previews-box" cols="12">
      <customFieldsAddingPreview
        v-for="(item, index) in items"
        :key="index"
        :itemType="item.itemType"
        :name="item.name"
        :text="item.text"
        :index="index"
        :icon="item.icon"
        @goToItem.passive="handleClickToItem"
      />
    </v-row>
  </v-container>
</template>

<script>
import customFieldsAddingPreview from '@/components/customFieldsSettings/customFieldsAddingPreview'
export default {
  name: 'addingList',
  components: {
    customFieldsAddingPreview
  },
  data: function () {
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
      items: [
        {
          itemType: 'smallTextBox',
          name: 'Small Text Box',
          icon: 'pencil2.svg',
          text:
            'Small text box - (eg. Serial Number, Manufacturer Name, Customer ID, etc.)'
        },
        {
          itemType: 'largeTextBox',
          name: 'Large Text Box',
          icon: 'pencil2.svg',
          text:
            'Large Text Box - (eg. Address, Status, Instructions, Notes, Details, etc.)'
        },
        {
          itemType: 'roundNumber',
          name: 'Round Number',
          icon: 'number-seven.svg',
          text: 'Number without decimals (eg. Quality, Count, etc)'
        },
        {
          itemType: 'decimalNumber',
          name: 'Decimal Number',
          icon: 'number-seven.svg',
          text:
            'Decimal Number - (eg. Cost, Selling price, Measurements like Area, Length etc.)'
        },
        {
          itemType: 'phoneNumber',
          name: 'Phone Number',
          icon: 'phone-call.svg',
          text: 'Phone Number (eg. "+1 (123) 350-2345")'
        },
        {
          itemType: 'email',
          name: 'Email',
          icon: 'at.svg',
          text: 'Email Address (eg. email@host.com)'
        },
        {
          itemType: 'webLink',
          name: 'Web Link',
          icon: 'browser.svg',
          text: 'Link for website (eg. http://google.com)'
        },
        {
          itemType: 'dateField',
          name: 'Calendar',
          icon: 'date.svg',
          text: 'Date (eg. Expity Date, Purchase Date, etc.)'
        },
        {
          itemType: 'checkBox',
          name: 'Checkbox',
          icon: 'checkbox.svg',
          text: 'Yes or No status (eg. Damaged, Repaired, Lent, Sold)'
        },
        {
          itemType: 'dropDown',
          name: 'Dropdown',
          icon: 'dropdown.svg',
          text: 'Dropdown allows to choose one value from a list.'
        } /*,
        {
          itemType: 'fileAttachment',
          name: 'File Attachment',
          text: 'File Attachment'
        } */
      ]
    }
  },
  methods: {
    handleBreadcrumbsClick(index) {
      if (index === 2) {
        this.$emit('changeType', 'customFieldsTable')
      }
    },
    handleClickToItem(itemIndex) {
      this.$emit('selfChange', 'addingWrapperBox', {
        type: this.items[itemIndex].itemType,
        name: this.items[itemIndex].name
      })
    }
  }
}
</script>

<style lang='scss'>
.previews-box {
}
</style>

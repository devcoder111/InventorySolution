<template>
  <custom-fields-setting-component
    :name='name'
    :itemType='itemType'
    :placeholderContent='placeholderContent'
    :defaultValue='defaultValues'
    :key='iterator'
  >
    <template :slot="'body'">
      <v-form v-model='valid'>
        <v-row>
          <setting-field-row
            :cols='12'
            :name='"Field Name *"'
            :description='"The field name property sets the name of your custom field. This also an input label."'
            :placeholderContent='"Enter Field Name ..."'
            :fieldType='"text"'
            v-model='name'
            isName
            @inputEvent='newVal=>{name=newVal}'
          />
          <setting-field-row
            :cols='12'
            :name='"Placeholder text"'
            :description='"The Placeholder attribute specified a short hint that describes the expected value of an input field (e.g. a sample value or a short description of the expected format)"'
            :placeholderContent='"Enter Placeholder Text(optional) ..."'
            :fieldType='"text"'
            v-model='placeholderContent'
            @inputEvent='newVal=>{placeholderContent=newVal}'
          />
          <payAttention v-if='isEdit' />
          <v-col cols='12'>
            <div>
              <img
                :class="[$style['image-icon'], 'left']"
                src="@/assets/icons/svg/pencil2.svg"
              />
              <span :class="$style['label-text']">Default options</span>
            </div>
            <div class='mt-2 input-box'>
              <v-icon
                class="mr-1"
                style="color: #7d7d7d"
                size='20'
              >
                mdi-help-circle
              </v-icon>
              <span style="color: #7d7d7d">Add dropdown options to show in value selection</span>
            </div>
            <div class='mt-2 input-box'>
              <div v-if='defaultValues.length'>
                <settingViewAddingDefaultComponent
                  v-for='(item, index) in defaultValues'
                  :key='index'
                  :index='index'
                  v-model='item.value'
                  :isDeleted='item.isDeleted'
                  :isAsDefault='item.isAsDefault'
                  @newInput='v=>{defaultValues[index].value = v}'
                  @delete='deleteValue(index)'
                  @setDefault='setDefaultItem(index)'
                />
              </div>
              <span @click='addNewDefaultValue' class="cursor-pointer">
                <v-icon class='mr-1'>mdi-plus</v-icon>
                Add Options
              </span>
            </div>
          </v-col>
          <v-col cols='12'>
            <div>
              <img
                :class="[$style['image-icon'], 'left']"
                src="@/assets/icons/svg/checkbox.svg"
              />
              <span :class="$style['label-text']">Applicable to</span>
            </div>
            <div class='mt-2 input-box'>
              <v-icon
                class="mr-1"
                style="color: #7d7d7d"
                size='20'
              >
                mdi-help-circle
              </v-icon>
              <span style="color: #7d7d7d">Choose whether to apply the field to all elements or add the field to individual elements</span>
            </div>
            <div class='mt-2 input-box'>
              <v-checkbox
                v-model="applicableToAll"
                :label="applicableToCheckboxText"
                color="#8074c2"
                class='mt-1'
              />
            </div>
          </v-col>
          <v-col cols='12' class='mt-10'>
            <v-btn
              @click='save'
              depressed
              medium
              :disabled='!valid'
              :class="$style['save-item-btn']"
            >
              Save
            </v-btn>
            <v-btn
              @click='cancel'
              depressed
              medium
              :class="$style['cancel-btn']"
            >
              <span style="color: black">Cancel</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </template>
  </custom-fields-setting-component>
</template>

<script>
import customFieldsSettingComponent from '@/components/customFields/customFieldsSettingComponent'
import settingFieldRow from '@/components/customFields/commonMixins/settingFieldRow'
import settingViewAddingDefaultComponent from './settingViewAddingDefaultComponent'
import { saveNewItemMixin } from '@/components/customFields/commonMixins/_helpers/saveNewItem.mixin.js'
import { cancelNewItemMixin } from '@/components/customFields/commonMixins/_helpers/cancelNewItem.mixin.js'
import { applicableToCheckboxTextMixin } from '@/components/customFields/commonMixins/_helpers/applicableToCheckboxText.mixin.js'
import { settingViewBaseMixin } from '@/components/customFields/commonMixins/_helpers/settingViewBase.mixin.js'

let oldValues = []

export default {
  mixins: [saveNewItemMixin, cancelNewItemMixin, applicableToCheckboxTextMixin, settingViewBaseMixin],
  components: {
    customFieldsSettingComponent,
    settingFieldRow,
    settingViewAddingDefaultComponent
  },
  data: function() {
    return {
      name: this.preloadedItem.name || '',
      placeholderContent: this.preloadedItem.placeholderContent || '',
      itemType: 'dropDown',
      defaultValues: this.preloadedItem.defaultValues || [],
      applicableToAll: this.preloadedItem.applicableToAll || false,
      iterator: 0,
      valid: true
    }
  },
  watch: {
    defaultValues() {
      if (this.defaultValues.find(item => !item.value.length)) this.valid = false
    }
  },
  methods: {
    deleteValue(index) {
      if (this.isEdit) {
        this.defaultValues[index].isDeleted = true
        this.$emit('changeItemProperty', 'defaultValues', this.defaultValues)
      } else {
        this.defaultValues.splice(index, 1)
      }
      this.iterator++
    },
    addNewDefaultValue() {
      this.defaultValues.push({
        value: '',
        isAsDefault: false
      })
    },
    setDefaultItem(i) {
      this.defaultValues.forEach((item, index) => {
        item.isAsDefault = index === i ? !this.defaultValues[i].isAsDefault : false
      })
    },
    getOldValues() {
      return oldValues
    }
  },
  created() {
    if (this.isEdit) {
      oldValues = JSON.parse(JSON.stringify(this.preloadedItem.defaultValues))
    }
  }
}
</script>

<style lang='scss' module src='../commonStyles/index.module.scss'>
.cursor-pointer {
  &:hover {
    color: #8074c2;
  }
}
</style>

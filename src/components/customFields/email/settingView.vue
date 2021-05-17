<template>
  <custom-fields-setting-component
    :name='name'
    :itemType='itemType'
    :placeholderContent='placeholderContent'
    :defaultValue='defaultValue'
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
          <payAttention v-if='isEdit' />
          <v-col cols='12' class='mt-4'>
            <div>
              <img
                :class="[$style['image-icon'], 'left']"
                src="@/assets/icons/svg/pencil2.svg"
              />
              <span :class="$style['label-text']">Default Email</span>
            </div>
            <div class='mt-2 input-box'>
              <v-icon
                class="mr-1"
                style="color: #7d7d7d"
                size='20'
              >
                mdi-help-circle
              </v-icon>
              <span style="color: #7d7d7d">Set the default information to be shown for this field. This can be edited at any time.</span>
            </div>
            <div class='mt-2 input-box'>
              <v-text-field
                @blur="isValidatedEmailMethod"
                v-model="defaultValue"
                :rules="emailRules"
                placeholder="Enter Default Email(optional) ..."
                pt="5"
                class="r-field item-name-field custom-field-email"
              />
            </div>
          </v-col>
          <setting-field-row
            :cols='12'
            :name='"Placeholder text"'
            :description='"The Placeholder attribute specified a short hint that describes the expected value of an input field (e.g. a sample value or a short description of the expected format)"'
            :placeholderContent='"Enter Placeholder Text(optional) ..."'
            :fieldType='"text"'
            v-model='placeholderContent'
            @inputEvent='newVal=>{placeholderContent=newVal}'
          />
          <v-col cols='12'>
            <div>
              <img
                :class="[$style['image-icon'], 'left']"
                src="@/assets/icons/svg/checkbox.svg"
              />
              <span :class="$style['label-text']">Applicable to</span>
            </div>
            <div class='mt-2'>
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
import { saveNewItemMixin } from '@/components/customFields/commonMixins/_helpers/saveNewItem.mixin.js'
import { cancelNewItemMixin } from '@/components/customFields/commonMixins/_helpers/cancelNewItem.mixin.js'
import { applicableToCheckboxTextMixin } from '@/components/customFields/commonMixins/_helpers/applicableToCheckboxText.mixin.js'
import { settingViewBaseMixin } from '@/components/customFields/commonMixins/_helpers/settingViewBase.mixin.js'

export default {
  mixins: [saveNewItemMixin, cancelNewItemMixin, applicableToCheckboxTextMixin, settingViewBaseMixin],
  components: {
    customFieldsSettingComponent,
    settingFieldRow
  },
  data: function() {
    return {
      name: this.preloadedItem.name || '',
      placeholderContent: this.preloadedItem.placeholderContent || '',
      itemType: 'email',
      defaultValue: this.preloadedItem.value || '',
      emailErrCnt: 0,
      valid: true,
      emailRules: [
        (v) => {
          if (v.length) {
            const reg = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i)
            return reg.test(v) || 'E-mail must be valid'
          }
          return true
        }
      ],
      applicableToAll: this.preloadedItem.applicableToAll || false
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
  watch: {
    isValidatedEmail: {
      deep: true,
      handler: function (newVal) {
        this.emailErrCnt++
      }
    }
  },
  computed: {
    isValidatedEmail() {
      const validRegEx = /\S+@\S+\.\S+/
      return this.thisValue !== null && validRegEx.test(this.thisValue)
    }
  }
}
</script>

<style lang='scss' module src='../commonStyles/index.module.scss'></style>

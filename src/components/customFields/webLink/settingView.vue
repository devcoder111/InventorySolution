<template>
  <custom-fields-setting-component
    :name="name"
    :itemType="itemType"
    :placeholderContent="placeholderContent"
    :defaultValue="defaultValue"
  >
    <template :slot="'body'">
      <v-form v-model="valid">
        <v-row>
          <setting-field-row
            :cols="12"
            :name="'Field Name *'"
            :description="'The field name property sets the name of your custom field. This also an input label.'"
            :placeholderContent="'Enter Field Name ...'"
            :fieldType="'text'"
            v-model="name"
            isName
            @inputEvent="
              (newVal) => {
                name = newVal
              }
            "
          />
          <payAttention v-if="isEdit" />
          <v-col cols="12" class="mt-4">
            <div>
              <img
                :class="[$style['image-icon'], 'left']"
                src="@/assets/icons/svg/pencil2.svg"
              />
              <span :class="$style['label-text']">Default Web Link</span>
            </div>
            <div class="mt-2 input-box">
              <v-icon class="mr-1" style="color: #7d7d7d" size="20">
                mdi-help-circle
              </v-icon>
              <span style="color: #7d7d7d"
                >Set the default Web Link to be shown for this field. This can
                be edited at any time.</span
              >
            </div>
            <div class="mt-2 input-box">
              <v-text-field
                dense
                :placeholder="'Enter Default Web Link(optional) ...'"
                v-model="defaultValue"
                :rules="webLinkRules"
                maxlength="128"
                class="r-field item-name-field"
              />
            </div>
          </v-col>
          <setting-field-row
            :cols="12"
            :name="'Placeholder text'"
            :description="'The Placeholder attribute specified a short hint that describes the expected value of an input field (e.g. a sample value or a short description of the expected format)'"
            :placeholderContent="'Enter Placeholder Text(optional) ...'"
            :fieldType="'text'"
            v-model="placeholderContent"
            @inputEvent="
              (newVal) => {
                placeholderContent = newVal
              }
            "
          />
          <v-col cols="12">
            <div>
              <img
                :class="[$style['image-icon'], 'left']"
                src="@/assets/icons/svg/checkbox.svg"
              />
              <span :class="$style['label-text']">Applicable to</span>
            </div>
            <div class="mt-2 input-box input-box">
              <v-icon class="mr-1" style="color: #7d7d7d" size="20">
                mdi-help-circle
              </v-icon>
              <span style="color: #7d7d7d"
                >Choose whether to apply the field to all elements or add the
                field to individual elements</span
              >
            </div>
            <div class="mt-2 input-box">
              <v-checkbox
                v-model="applicableToAll"
                :label="applicableToCheckboxText"
                color="#8074c2"
                class="mt-1"
              />
            </div>
          </v-col>
          <v-col cols="12" class="mt-10">
            <v-btn
              @click="save"
              depressed
              medium
              :disabled="!valid"
              :class="$style['save-item-btn']"
            >
              Save
            </v-btn>
            <v-btn
              @click.stop="cancel"
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
  mixins: [
    saveNewItemMixin,
    cancelNewItemMixin,
    applicableToCheckboxTextMixin,
    settingViewBaseMixin
  ],
  components: {
    customFieldsSettingComponent,
    settingFieldRow
  },
  data: function () {
    return {
      name: this.preloadedItem.name || '',
      placeholderContent: this.preloadedItem.placeholderContent || '',
      itemType: 'webLink',
      defaultValue: this.preloadedItem.value || '',
      applicableToAll: this.preloadedItem.applicableToAll || false,
      webLinkRules: [
        (v) => {
          if (v.length) {
            const validRegEx = /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/
            return validRegEx.test(v) || 'Please Enter current Web Link'
          }
          return true
        }
      ],
      valid: true
    }
  }
}
</script>

<style lang='scss' module src='../commonStyles/index.module.scss'></style>

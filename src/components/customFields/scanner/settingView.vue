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
          <setting-field-row
            :cols="12"
            :name="'Default text'"
            :description="'Set the default information to be shown for this field. This can be edited at any time.'"
            :placeholderContent="'Enter Default Text(optional) ...'"
            :fieldType="'text'"
            v-model="defaultValue"
            @inputEvent="
              (newVal) => {
                defaultValue = newVal
              }
            "
          />
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
            <div class="mt-2 input-box">
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
              @click="cancel"
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
      itemType: 'scanner',
      defaultValue: this.preloadedItem.value || '',
      applicableToAll: this.preloadedItem.applicableToAll || false,
      valid: true
    }
  },
  computed: {
    applicableToCheckboxText() {
      return this.applicableToAll ? 'Individual Items' : 'All Items'
    }
  }
}
</script>

<style lang='scss' module src='../commonStyles/index.module.scss'></style>

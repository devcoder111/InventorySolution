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
              <span :class="$style['label-text']">Default Date</span>
            </div>
            <div class="mt-2 input-box">
              <v-icon class="mr-1" style="color: #7d7d7d" size="20">
                mdi-help-circle
              </v-icon>
              <span style="color: #7d7d7d"
                >Set the default Date to be shown for this field. This can be
                edited at any time.</span
              >
            </div>
            <div class="mt-2 input-box">
              <v-menu
                v-model="menu1"
                :close-on-content-click="false"
                max-width="290"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    :value="computedDateFormattedMomentjs"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    @click:clear="defaultValue = null"
                  >
                    <template v-slot:append>
                      <v-img
                        src="@/assets/icons/svg/date.svg"
                        height="20px"
                        width="20px"
                      ></v-img>
                    </template>
                  </v-text-field>
                </template>
                <v-date-picker
                  v-model="defaultValue"
                  @change="menu1 = false"
                ></v-date-picker>
              </v-menu>
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
            <v-btn @click="cancel" depressed :class="$style['cancel-btn']">
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
import moment from 'moment'
import { format, parseISO } from 'date-fns'
import { saveNewItemMixin } from '@/components/customFields/commonMixins/_helpers/saveNewItem.mixin.js'
import { cancelNewItemMixin } from '@/components/customFields/commonMixins/_helpers/cancelNewItem.mixin.js'
import { applicableToCheckboxTextMixin } from '@/components/customFields/commonMixins/_helpers/applicableToCheckboxText.mixin.js'
import { settingViewBaseMixin } from '@/components/customFields/commonMixins/_helpers/settingViewBase.mixin.js'
import { mapGetters } from 'vuex'

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
      itemType: 'dateField',
      defaultValue:
        this.preloadedItem.value ||
        format(parseISO(new Date().toISOString()), 'yyyy-MM-dd'),
      applicableToAll: this.preloadedItem.applicableToAll || false,
      menu1: false,
      menu2: false,
      isValidatedD: false,
      valid: true
    }
  },
  computed: {
    ...mapGetters('user', ['getDateTimeFormat']),
    computedDateFormattedMomentjs() {
      return this.defaultValue ? moment(this.defaultValue).format(this.getDateTimeFormat.split(' ')[0]) : ''
    }
  }
}
</script>

<style lang='scss' module src='../commonStyles/index.module.scss'></style>

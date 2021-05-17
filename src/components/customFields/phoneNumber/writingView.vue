<template>
  <div class="mb-5 phone-number-wrapper">
    <img
      :class="[$style['image-icon'], 'left']"
      src="@/assets/icons/svg/phone-call.svg"
    />
    <span :class="$style['label-text']">{{ name }}</span>
    <div class="input-mb d-flex flex-nowrap">
      <v-text-field
        dense
        v-model="thisValue"
        :placeholder="currentPlacholder"
        color="#43425d"
        :rules='phoneRules'
        v-mask="'+1 (###) ### ##-##'"
      >
        <template v-if='letDelete' slot='append'>
          <div
            :class='$style["delete-rounded-button"]'
            width='24'
            height='24'
            min-width='24'
            @click='$emit("delete")'
          >
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  color='#c3c3c3'
                  v-bind="attrs"
                  v-on="on"
                >
                  mdi-close-circle
                </v-icon>
              </template>
              <span>Remove custom field</span>
            </v-tooltip>
          </div>
        </template>
      </v-text-field>
    </div>
  </div>
</template>

<script>
import { writingViewBaseMixin } from '@/components/customFields/commonMixins/_helpers/writingViewBase.mixin'
export default {
  mixins: [writingViewBaseMixin],
  data: function () {
    return {
      thisValue: this.value,
      nameRules: [(value) => !!value || 'Please Enter Name'],
      isValidatedName: false,
      phoneRules: [
        v => {
          if (v.length) {
            return /1?\W*([2-9][0-8][0-9])\W*([2-9][0-9]{2})\W*([0-9]{4})(\se?x?t?(\d*))?/.test(v.split(/\D/).join('')) || 'Phone number is not valid'
          }
          return true
        }
      ]
    }
  }
}
</script>

<style lang="scss" module src="../commonStyles/index.module.scss"></style>
<style lang="scss">
.vue-tel-input-vuetify {
  width: 100%
}
</style>

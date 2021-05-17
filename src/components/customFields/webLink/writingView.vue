<template>
  <div class="mb-5">
    <img
      :class="[$style['image-icon'], 'left']"
      src="@/assets/icons/svg/browser.svg"
    />
    <span :class="$style['label-text']">{{ name }}</span>
    <div class="input-mb d-flex flex-nowrap">
      <v-text-field
        dense
        :placeholder="placeholderContent"
        v-model="currentValue"
        @input="
          (newVal) => {
            $emit('newInput', newVal)
          }
        "
        :rules="nameRules"
        color="#43425d"
        maxlength="128"
        class="r-field item-name-field"
        :append-icon="isValidatedName ? 'mdi-checkbox-marked-circle' : ''"
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
  data: function() {
    return {
      isValidatedName: false,
      nameRules: [
        (v) => {
          if (v.length) {
            const validRegEx = /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/
            return validRegEx.test(v) || 'Please Enter current Web Link'
          }
          return true
        }
      ]
    }
  }
}
</script>

<style lang="scss" module src="../commonStyles/index.module.scss"></style>

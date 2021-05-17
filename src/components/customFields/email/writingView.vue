<template>
  <div class="mb-5">
    <img
      :class="[$style['image-icon'], 'left']"
      src="@/assets/icons/svg/at.svg"
    />
    <span :class="$style['label-text']">{{ name }}</span>
    <div class="input-mb d-flex flex-nowrap">
      <v-text-field
        @blur="isValidatedEmailMethod"
        v-model="currentValue"
        :rules="emailRules"
        :placeholder="placeholderContent"
        pt="5"
        :append-icon="isValidatedEmail ? 'mdi-checkbox-marked-circle' : ''"
        class="r-field item-name-field custom-field-email"
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
      emailErrCnt: 0,
      emailRules: [
        (v) => {
          if (v.length) {
            const reg = /.+@.+\..+/
            return reg.test(v) || 'E-mail must be valid'
          }
          return true
        }
      ]
    }
  },
  computed: {
    isValidatedEmail() {
      const reg = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i)
      return this.thisValue !== null && reg.test(this.thisValue)
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
  methods: {
    isValidatedEmailMethod() {
      const validRegEx = /.+@.+\..+/
      if (this.thisValue === '' || !validRegEx.test(this.thisValue)) {
        this.emailErrCnt++
      }
    }
  }
}
</script>

<style lang="scss" module src="../commonStyles/index.module.scss"></style>
<style lang="scss">
.custom-field-email,
.mdi-checkbox-marked-circle {
  color: #12ba81 !important;
}
.custom-field-email:hover .custom-field-email .mdi-checkbox-marked-circle {
  color: #12ba81 !important;
}
</style>

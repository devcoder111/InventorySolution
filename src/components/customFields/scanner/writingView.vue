<template>
  <div class="mb-5">
    <img
      :class="[$style['image-icon'], 'left']"
      src="@/assets/icons/svg/scan-1.svg"
    />
    <span :class="$style['label-text']">{{ name }}</span>
    <div class="input-mb d-flex flex-nowrap">
      <v-btn
        height="40"
        class="scanner-btn"
        text
        @click.stop="editDialog = false"
        ><div class="d-flex">
          <v-img
            src="@/assets/icons/svg/scan-1.svg"
            style="width: 18px !important; height: 18px !important"
          ></v-img>
          <span class="scan-code">Scan Code</span>
        </div>
      </v-btn>
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
      isValidatedName: false
    }
  },
  methods: {
    isValidatedNameMethod() {
      const validRegEx = /\S+/
      this.isValidatedName = validRegEx.test(this.value)
    }
  }
}
</script>

<style lang="scss" module src="../commonStyles/index.module.scss"></style>
<style lang="scss">
.scanner-btn {
  width: 100%;
  border: 1px solid #6452a2;
  background-color: #f5f5f5 !important;
  color: #6452a2 !important;
  text-transform: capitalize;
  font-size: 1rem !important;
}
.scan-code {
  padding: 0 5px;
}
</style>

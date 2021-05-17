<template>
  <div class="mb-5">
    <img
      :class="[$style['image-icon'], 'left']"
      src="@/assets/icons/svg/checkbox.svg"
    />
    <span :class="$style['label-text']">{{ name }}</span>
    <div>
      <v-checkbox
        v-model="currentValue"
        :label="placeholderContent"
        color="#8074c2"
        class='mt-1'
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
      </v-checkbox>
    </div>
  </div>
</template>

<script>
import { writingViewBaseMixin } from '@/components/customFields/commonMixins/_helpers/writingViewBase.mixin'
export default {
  mixins: [writingViewBaseMixin]
}
</script>

<style lang="scss" module src="../commonStyles/index.module.scss"></style>

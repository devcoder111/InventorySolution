<template>
  <div class="mb-5">
    <img
      :class="[$style['image-icon'], 'left']"
      src="@/assets/icons/svg/dropdown.svg"
    />
    <span :class="$style['label-text']">{{ name }}</span>
    <div class="input-mb d-flex flex-nowrap">
      <v-select
        :items="currentItems"
        :placeholder='currentPlaceholder'
        v-model='currentValue'
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
      </v-select>
    </div>
  </div>
</template>

<script>
import { writingViewBaseMixin } from '@/components/customFields/commonMixins/_helpers/writingViewBase.mixin'
export default {
  mixins: [writingViewBaseMixin],
  props: {
    defaultValues: {
      type: Array,
      default: () => []
    }
  },
  data: function () {
    return {
      nameRules: [(value) => !!value || 'Please Enter Name'],
      isValidatedName: false,
      items: ['Select one', 'Select two', 'Select three', 'Select four']
    }
  },
  computed: {
    currentItems() {
      return this.defaultValues?.length ? this.defaultValues.map(item => item.value) : []
    },
    currentPlaceholder() {
      return this.placeholderContent?.length ? this.placeholderContent : 'Placeholder'
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

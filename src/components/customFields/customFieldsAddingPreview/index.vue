<template>
  <div :class="[$style['preview-box'], 'pa-4']">
    <v-row>
      <v-col cols="12">
        <img
          :class="[$style['image-icon'], 'left']"
          :src="require(`@/assets/icons/svg/${icon}`)"
        />
        <span :class="$style['label-text']"
          >{{ name }}{{ units ? `, ${units}` : '' }}</span
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12 input-box">
        <slot name="body"></slot>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    units: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" module src="../commonStyles/index.module.scss"></style>

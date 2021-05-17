<template>
  <v-col :cols="cols" class="mt-4">
    <div>
      <img
        :class="[$style['image-icon'], 'left']"
        src="@/assets/icons/svg/pencil2.svg"
      />
      <span :class="$style['label-text']">{{ name }}</span>
    </div>
    <div class="mt-2">
      <v-icon class="mr-1" style="color: #7d7d7d" size="20">
        mdi-help-circle
      </v-icon>
      <span style="color: #7d7d7d">{{ description }}</span>
    </div>
    <div class="mt-2 input-box">
      <v-text-field
        dense
        :rules="isName ? nameRules : undefined"
        :type="fieldType"
        :placeholder="placeholderContent"
        v-model="currentValue"
        @input="
          (newValue) => {
            $emit('inputEvent', newValue)
          }
        "
        color="#43425d"
        maxlength="128"
        class="r-field item-name-field"
      />
    </div>
  </v-col>
</template>

<script>
export default {
  props: {
    cols: {
      type: Number,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    placeholderContent: {
      type: String,
      required: true
    },
    fieldType: {
      type: String,
      required: true
    },
    isName: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      currentValue: this.value,
      nameRules: [v => !!v.length || 'Custom field name is required']
    }
  }
}
</script>

<style lang="scss" module src="../commonStyles/index.module.scss"></style>

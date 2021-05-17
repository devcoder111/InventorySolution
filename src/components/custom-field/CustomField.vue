<template>
  <div class="mb-5">
    <img class="image-icon left" src="@/assets/icons/svg/pencil2.svg" />
    <span class="label-text">{{ fieldName }} *</span>
    <div class="input-mb d-flex flex-nowrap">
      <v-text-field
        :value="value"
        dense
        :placeholder="fieldPlaceholder"
        color="#43425d"
        required
        maxlength="128"
        class="r-field item-name-field mr-2"
        @input="$emit('change-value', { value: $event, id: idField })"
      ></v-text-field>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CustomField',
  props: ['id', 'type', 'fieldName', 'fieldPlaceholder', 'value'],
  data() {
    return {}
  },
  computed: {
    fieldPlaceH() {
      if (this.fieldPlaceholder) {
        return this.fieldPlaceholder
      } else {
        return ''
      }
    },
    idField() {
      return this.id ? this.id : 0
    }
  }
}
</script>
<style lang="scss" scoped>
.label-text {
  color: #43425d;
  text-transform: uppercase;
  position: relative;
  font-size: 16px;
  letter-spacing: 0.75px;
  font-weight: 600;
  .label-value {
    position: absolute;
    bottom: 0;
    width: 100px;
  }
}
.input-mb {
  margin-top: 4px;
}
.image-icon {
  height: 18px;
  width: 18px;
  margin-right: 10px;
  fill: #43425d !important;
}
</style>

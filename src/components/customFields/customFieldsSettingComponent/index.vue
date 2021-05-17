<template>
  <div>
    <v-row class='mt-4'>
      <v-col cols='7'>
        <h5 class='setting-tigle mb-5'>Custom field details</h5>
        <slot name='body'></slot>
      </v-col>
      <v-col cols='5'>
        <h5 class='setting-tigle mb-5'>Custom field preview</h5>
        <fieldPreview
          tabindex='1'
          :itemType='itemType'
          :name='name'
          :placeholderContent='placeholderContent'
          :units='units'
          :defaultValue='defaultValue'
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'customFieldsSettingComponent',
  props: {
    itemType: {
      type: String,
      required: true,
      default: 'smallTextBox'
    },
    name: {
      type: String,
      required: true,
      default: 'Small Text Box'
    },
    placeholderContent: {
      type: String,
      default: ''
    },
    units: {
      type: String,
      default: ''
    },
    defaultValue: {
      default: ''
    }
  },
  components: {
    fieldPreview: () => import('@/components/customFields/commonMixins/fieldPreview')
  }
}
</script>

<style lang='scss'>
  .setting-tigle {
    color: #7d7d7d;
    font-weight: 600;
    font-size: 1.3rem;
  }
</style>

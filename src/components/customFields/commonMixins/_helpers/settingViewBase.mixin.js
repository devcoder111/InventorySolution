import payAttention from '@/components/customFields/commonMixins/attentionMessage.vue'
export const settingViewBaseMixin = {
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    editId: {
      type: Number,
      default: 0
    },
    preloadedItem: {
      type: Object
    }
  },
  components: {
    payAttention
  }
}

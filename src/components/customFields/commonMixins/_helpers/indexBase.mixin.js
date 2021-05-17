export const indexBaseMixin = {
  props: {
    touch: {
      type: String,
      default: 'writingView',
      required: true
    },
    placeholderContent: {
      type: String,
      default: ''
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    editId: {
      type: Number,
      default: 0
    },
    letDelete: {
      type: Boolean,
      default: false
    },
    preloadedItem: {
      type: Object,
      default: () => { return {} }
    }
  }
}

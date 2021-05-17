export const writingViewBaseMixin = {
  props: {
    name: {
      type: String,
      default: '',
      required: true
    },
    placeholderContent: {
      type: String,
      default: 'Enter Item Name'
    },
    value: {
      type: [String, Number, Boolean],
      required: true
    },
    letDelete: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    currentValue: {
      get() {
        return this.value === null ? '' : this.value
      },
      set(v) {
        this.$emit('newInput', v)
      }
    }
  }
}

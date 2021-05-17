export const cancelNewItemMixin = {
  computed: {
    haveUnsavedData() {
      const vm = this
      return (vm.name || vm.placeholderContent || vm.defaultValue)
    }
  },
  methods: {
    cancel() {
      if (this.haveUnsavedData) {
        this.$emit('exit', true)
      } else {
        this.$emit('exit', false)
      }
    }
  }
}

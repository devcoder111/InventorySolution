export const applicableToCheckboxTextMixin = {
  computed: {
    applicableToCheckboxText() {
      return !this.applicableToAll ? 'All Items' : 'All Items'
    }
  }
}

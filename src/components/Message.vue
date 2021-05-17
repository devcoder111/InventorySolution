<template>
  <div class="message__alert">
    <v-alert
      width="300"
      v-if="message"
      close-icon="mdi-close"
      dismissible
      align="left"
      :type="message.type"
      >{{ message.text }}</v-alert
    >
  </div>
</template>
<script>
export default {
  name: 'message',
  data() {
    return {
      dialog: false
    }
  },
  computed: {
    message() {
      if (this.error) {
        return {
          type: 'error',
          text: this.error
        }
      } else if (this.success) {
        return {
          type: 'success',
          text: this.success
        }
      }
      return null
    },
    error() {
      return this.$store.getters.errorMessage
    },
    success() {
      return this.$store.getters.successMessage
    }
  },
  methods: {
    clearMessage(type) {
      this.$store.dispatch('setMessage', { type: type, text: '' })
    }
  }
}
</script>

<style>
.message__alert {
  position: fixed;
  z-index: 990000000;
  top: 78px;
  border-radius: 0;
  right: 10px;
}
</style>

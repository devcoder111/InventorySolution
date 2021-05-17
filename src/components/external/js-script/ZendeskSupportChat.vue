<template>
  <div />
</template>

<script>
export default {
  name: 'ZendeskSupportChat',
  data() {
    return {
    }
  },
  methods: {
  },
  components: {
  },
  mounted: function () {
    // <!-- Start of britecheck Zendesk Widget script -->
    // <script id="ze-snippet" src="https://static.zdassets.com/ekr/snippet.js?key=4ac4f163-40c6-4897-bc40-f6c99ca2b51b" />
    // <!-- End of britecheck Zendesk Widget script -->

    const zendeskSupportChat = document.createElement('script')
    zendeskSupportChat.setAttribute('id', 'ze-snippet')
    zendeskSupportChat.setAttribute('src', 'https://static.zdassets.com/ekr/snippet.js?key=4ac4f163-40c6-4897-bc40-f6c99ca2b51b')
    document.head.appendChild(zendeskSupportChat)
  }
}
</script>
<style scoped>
</style>

<template>
  <v-app>
    <NavBar :is-white="false" />
    <v-main v-bind:class="{ 'pt-0': !isMobile }">
      <router-view></router-view>
      <Footer/>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from '@/views/NavBar'
import Footer from '@/components/dashboard/footer'
export default {
  name: 'ArticleLayout',
  components: { Footer, NavBar },
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown
    }
  }
}
</script>
<style scoped>
::v-deep .v-main {
  padding: 32px !important;
}
</style>

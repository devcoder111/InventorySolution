<template>
  <v-app>
    <TopBar @open-drawer="onOpenDrawer" style="left: 0px !important" />
    <!-- <NavBar style="left: 0px !important" class="defaultNavBar" /> -->
    <v-navigation-drawer
      app
      v-model="drawer"
      left
      @transitionend="onOpenDrawer"
      style="top: 62px; background: #f5f5f5; border-top: solid 1px #e4e5e7"
    >
      <SideMenu />
    </v-navigation-drawer>
    <div></div>
    <v-main style="padding-top: 0px">
      <v-container
        app
        background-color="grey lighten-2"
        class="default-container"
      >
        <Message />
        <TrialBanner />
        <router-view></router-view>
        <SubmitFormErrorPopup />
        <UpgradeSubscriptionPlanPopup />
        <ZendeskSupportChat />
      </v-container>
    </v-main>
    <v-footer app> </v-footer>
  </v-app>
</template>
<script>
import Message from '@/components/Message'
import SubmitFormErrorPopup from '@/components/popup/SubmitFormErrorPopup'
import UpgradeSubscriptionPlanPopup from '@/components/popup/UpgradeSubscriptionPlanPopup'
import TopBar from '@/components/top-bar/TopBar'
import SideMenu from '@/components/side-menu/SideMenu'
import TrialBanner from '@/components/subscription/TrialBanner'
import ZendeskSupportChat from '../components/external/js-script/ZendeskSupportChat'
export default {
  name: 'Default',
  components: {
    ZendeskSupportChat,
    TopBar,
    SideMenu,
    Message,
    SubmitFormErrorPopup,
    UpgradeSubscriptionPlanPopup,
    TrialBanner
  },
  data() {
    return {
      drawer: false,
      isMobile: false
    }
  },
  mounted() {
    this.onResize()
  },
  methods: {
    onOpenDrawer(isOpen) {
      this.drawer = !this.drawer
    },
    onResize() {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight }
      if (this.windowSize.x < 800) this.drawer = false
      else this.drawer = true
    }
  }
}
</script>
<style scoped>
.container {
  width: 100% !important;
  max-width: 100%;
}
::v-deep .defaultNavBar header {
  left: 0px !important;
  width: 100%;
}
</style>

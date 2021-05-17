<template>
  <div>
    <v-app-bar
      flat
      app
      color="#F5F5F5"
      style="
        border-bottom: 1px solid #e7e7e7;
        left: 0px !important;
        width: 100%;
        border-bottom-width: 2px;
      "
    >
      <v-row align="center">
        <v-app-bar-nav-icon
          class="nav-icon"
          @click.stop=";(drawer = !drawer), $emit('open-drawer', drawer)"
        ></v-app-bar-nav-icon>
        <a href="/" class="subtitle-2">
          <v-img
            src="@/assets/images/logo-britecheck-grey.png"
            style="max-width: 200px; height: auto"
          ></v-img>
        </a>
        <v-spacer></v-spacer>
        <v-avatar>
        </v-avatar>
        <UserTopMenu />
      </v-row>
    </v-app-bar>
  </div>
</template>

<script>
import UserTopMenu from '@/components/top-bar/UserTopMenu'
export default {
  name: 'Topbar',
  data() {
    return {
      drawer: false
    }
  },
  methods: {
    onSearch() {}
  },
  components: {
    UserTopMenu
  },
  mounted() {
    const curUserData = JSON.parse(localStorage.getItem('curUserData'))
    console.log(curUserData)
  }
}
</script>
<style scoped>
.header-logo {
  display: unset;
  font-size: 40px;
  font-weight: bold;
  color: #a3adb7;
  font-family: 'SCRIPTBL';
}
::v-deep .v-toolbar__content {
  padding: 4px 10px;
}
</style>

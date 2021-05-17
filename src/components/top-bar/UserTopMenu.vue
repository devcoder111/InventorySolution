<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <!-- <v-btn icon x-large v-on="on">
        <span>{{ curUserName }}</span>
      </v-btn> -->

      <span
        @click="toggleArrow"
        v-on="on"
        class="mx-3 cur-username font-weight-bold change-font"
        style="font-size: 1rem; color: #7671bd; line-height: 36px; letter-spacing: 0.03em;"
        >{{ curUserName
        }}<v-icon v-if="arrowFlag" style="font-size: 1.2rem"
          >mdi-chevron-down</v-icon
        >
        <v-icon v-else style="font-size: 1.2rem">mdi-chevron-up</v-icon>
      </span>
    </template>
    <v-list>
      <v-list-item class="profile-btn" @click="MyInventory">
        <v-list-item-title>My Inventory</v-list-item-title>
      </v-list-item>
      <v-list-item class="profile-btn" @click="EditProfile">
        <v-list-item-title>Edit Profile</v-list-item-title>
      </v-list-item>
      <v-list-item class="logout-btn" @click="logout">
        <v-list-item-title>Logout</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { MODULE_USER } from '../../store/constant/mutation-types'
import { SETTINGS_PAGE_USER_PROFILE } from '../../constant'

export default {
  name: 'UserTopMenu',
  data() {
    return {
      langs: [
        { title: 'My Inventory' },
        { title: 'Edit profile' },
        { title: 'Logout' }
      ],
      arrowFlag: true
    }
  },
  mounted() {
    const curUserData = JSON.parse(localStorage.getItem('curUserData'))
    this.$store.commit('user/set', {
      type: 'curUserData',
      val: curUserData
    })
    this.curUserName = curUserData.firstName + ' ' + curUserData.lastName
  },
  computed: {
    curUserName: {
      get() {
        const currentData = this.$store.getters[`${MODULE_USER}/user`]
        return currentData.firstName + ' ' + currentData.lastName
      },
      set() {}
    }
  },
  methods: {
    toggleArrow() {
      this.arrowFlag = !this.arrowFlag
    },
    logout() {
      this.$store.dispatch(`${MODULE_USER}/logout`).then(() => {
        document.location.href = '/'
      })
    },
    EditProfile: function () {
      this.$router.push({
        name: 'UserSettings'
      }, () => {
        this.$store.dispatch('setSettingsPageSection', SETTINGS_PAGE_USER_PROFILE)
      })
    },
    MyInventory: function () {
      this.$router.push('/inventory')
    }
  }
}
</script>
<style lang="css">
.profile-btn,
.logout-btn {
  cursor: pointer;
}
.profile-btn:hover,
.logout-btn:hover {
  background-color: darkgrey;
}
.cur-username {
  cursor: pointer;
}
</style>

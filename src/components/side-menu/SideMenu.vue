<template>
  <div class="left-menu">
    <img src="" />
    <v-list nav>
      <v-list-item-group active-class="text--accent-4">
        <v-list-item
          v-for="(item, i) in menuItems"
          :key="i"
          :to="item.path"
          @click="clickTag(item)"
          :class="item.hideFlag ? 'menu-item-hiden' : ''"
        >
          <v-list-item-title>
            <img :src="item.img" style="width: 16px" />
            {{ item.title }}
          </v-list-item-title>
          <br />
          <v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <div class="btn-upgrade">
      <v-btn
        depressed
        style="
          color: white;
          text-transform: uppercase;
          min-width: 140px;
          font-size: 16px;
        "
        class="mx-4 mt-4 mb-8"
        @click="upgradeSubscriptionPlan"
        >Upgrade</v-btn
      >
    </div>
    <div class="btn-block-menu">
      <a
        class="btn-app btn-google"
        href="https://apps.apple.com/ie/app/britecheck/id1540646868"
        target="_blank"
      >
        <img src="@/assets/apple-btn.jpg" />
      </a>
      <a
        class="btn-app btn-google"
        href="https://play.google.com/store/apps/details?id=com.britecheck.mobile"
        target="_blank"
      >
        <img src="@/assets/google-btn.jpg" />
      </a>
    </div>
  </div>
</template>

<script>
import {
  SETTINGS_PAGE_SUBSCRIPTION,
  SUBSCRIPTION_PLAN_FREE_ID
} from '../../constant'
import { MODULE_USER } from '../../store/constant/mutation-types'

export default {
  name: 'SideMenu',
  data() {
    return {
      menuItems: [
        {
          title: 'Inventory',
          icon: 'mdi-package-variant-closed',
          route: {
            name: 'Inventory'
          },
          img: require('@/assets/icons/svg/Inventory.svg'),
          hideFlag: false
        },
        {
          title: 'Activity History',
          icon: 'mdi-package-variant-closed',
          route: {
            name: 'ActivityHistory'
          },
          img: require('@/assets/icons/svg/history.svg'),
          hideFlag: false
        },
        {
          title: 'Users',
          icon: 'mdi-account-group-outline',
          route: {
            name: 'Users'
          },
          img: require('@/assets/icons/svg/users.svg'),
          hideFlag: false
        },
        {
          title: 'Alerts',
          icon: 'mdi-bell-outline',
          route: {
            name: 'Alerts'
          },
          img: require('@/assets/icons/svg/notification.svg'),
          hideFlag: false
        },
        {
          title: 'Reports',
          icon: 'mdi-package-variant-closed',
          route: {
            name: 'Reports'
          },
          img: require('@/assets/icons/svg/report-menu.svg'),
          hideFlag: false
        },
        {
          title: 'Settings',
          icon: 'mdi-account-cog-outline',
          route: {
            name: 'UserSettings'
          },
          path: '/usersettings',
          img: require('@/assets/icons/svg/settings.svg'),
          hideFlag: false
        },
        {
          title: 'Help Center',
          icon: 'mdi-help',
          img: require('@/assets/icons/svg/help.svg'),
          hideFlag: false
        }
      ]
    }
  },
  computed: {
    user() {
      return this.$store.getters[`${MODULE_USER}/user`]
    }
  },
  created() {
    if (this.user.role === 'user') {
      this.menuItems[1].hideFlag = true
    }
  },
  methods: {
    clickTag(item) {
      if (item.title === 'Help Center') {
        window.open('https://britecheck.zendesk.com/hc/en-us', '_blank')
      } else {
        this.$router.push(item.route, () => {
          this.$store.commit('inventory/set', {
            type: 'inventoryNavFlag',
            val: item.title === 'Inventory'
          })
        })
      }
    },
    upgradeSubscriptionPlan() {
      if (this.user.plan.id === SUBSCRIPTION_PLAN_FREE_ID) {
        this.$store.dispatch('showUpgradeSubscriptionPlanPopup', {
          title: 'Upgrade FREE plan Now!'
        })
      } else {
        this.$router.push(
          {
            name: 'UserSettings'
          },
          () =>
            this.$store.dispatch(
              'setSettingsPageSection',
              SETTINGS_PAGE_SUBSCRIPTION
            )
        )
      }
    }
  }
}
</script>
<style scoped>
</style>

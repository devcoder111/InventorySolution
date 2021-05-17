<template>
  <v-container style="padding-top: 0 !important">
    <v-row
      class="justify-start align-start pa-2"
      style="
        background-color: #efefef;
        position: relative;
        border-bottom: solid 1px #e5e6e8;
        margin-top: 0px;
      "
    >
      <v-col class="py-0" cols="12" sm="4">
        <span class="text-h5 main-title">Settings</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="2"
        style="background-color: #efefef; min-height: 100vh"
        class="pl-6 pt-6 settings-nav"
      >
        <p
          class="left-bar-option cursor-pointer"
          :class="{
            'left-bar-option-active':
              currentSettingsPageSection === settingsUserProfile
          }"
          @click="showUserProfileSection"
        >
          User Profile
        </p>
        <p
          class="left-bar-option cursor-pointer"
          :class="{
            'left-bar-option-active':
              currentSettingsPageSection === settingsSubscription
          }"
          @click="showSubscriptionSection"
        >
          Subscription
        </p>
        <p
          class="left-bar-option cursor-pointer"
          :class="{
            'left-bar-option-active':
              currentSettingsPageSection === settingsGeneralSettings
          }"
          @click="showGeneralSettingsSection"
        >
          General Settings
        </p>
        <p
          class="left-bar-option cursor-pointer"
          :class="{
            'left-bar-option-active':
              currentSettingsPageSection === settingsCustomFields
          }"
          @click="showCustomFieldsSection"
        >
          Custom Fields
        </p>
      </v-col>
      <v-col cols="10">
        <v-row>
          <SettingsUserProfile
            v-if="currentSettingsPageSection === settingsUserProfile"
          />
          <GeneralSettings
            v-if="currentSettingsPageSection === settingsGeneralSettings"
          />
          <SubscriptionSettings
            v-if="currentSettingsPageSection === settingsSubscription"
            @show-subscription-plans="showSubscriptionManagePlans"
          />
          <CustomFieldsSettings
            v-if="currentSettingsPageSection === settingsCustomFields"
          />
          <SubscriptionManagePlan
            v-if="
              currentSettingsPageSection === settingsSubscriptionManagePlans
            "
            @change-plan-to-business="openSubscription($event)"
          />
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SettingsUserProfile from '@/views/user/SettingsUserProfile'
import GeneralSettings from '@/views/user/GeneralSettings'
import SubscriptionSettings from '@/views/user/SubscriptionSettings'
import CustomFieldsSettings from '@/views/customFieldsSettings'
import SubscriptionManagePlan from '@/views/user/SubscriptionManagePlan'
import {
  SETTINGS_PAGE_GENERAL_SETTINGS,
  SETTINGS_PAGE_SUBSCRIPTION,
  SETTINGS_PAGE_CUSTOM_FIELDS,
  SETTINGS_PAGE_SUBSCRIPTION_MANAGE_PLANS,
  SETTINGS_PAGE_USER_PROFILE
} from '../../constant'
import {
  MODULE_SETTINGS,
  MODULE_USER
} from '../../store/constant/mutation-types'
export default {
  components: {
    SettingsUserProfile,
    GeneralSettings,
    SubscriptionSettings,
    SubscriptionManagePlan,
    CustomFieldsSettings
  },
  name: 'UserSettings',
  data() {
    return {
      settingsUserProfile: SETTINGS_PAGE_USER_PROFILE,
      settingsSubscription: SETTINGS_PAGE_SUBSCRIPTION,
      settingsCustomFields: SETTINGS_PAGE_CUSTOM_FIELDS,
      settingsGeneralSettings: SETTINGS_PAGE_GENERAL_SETTINGS,
      settingsSubscriptionManagePlans: SETTINGS_PAGE_SUBSCRIPTION_MANAGE_PLANS
    }
  },
  computed: {
    user() {
      return this.$store.getters[`${MODULE_USER}/user`]
    },
    currentSettingsPageSection() {
      return this.$store.getters[`${MODULE_SETTINGS}/getSettingsPageSection`]
    }
  },
  methods: {
    showUserProfileSection() {
      this.$store.dispatch('setSettingsPageSection', SETTINGS_PAGE_USER_PROFILE)
    },
    showSubscriptionSection() {
      this.$store.dispatch('setSettingsPageSection', SETTINGS_PAGE_SUBSCRIPTION)
    },
    showGeneralSettingsSection() {
      this.$store.dispatch(
        'setSettingsPageSection',
        SETTINGS_PAGE_GENERAL_SETTINGS
      )
    },
    showCustomFieldsSection() {
      this.$store.dispatch(
        'setSettingsPageSection',
        SETTINGS_PAGE_CUSTOM_FIELDS
      )
    },
    showSubscriptionManagePlans() {
      this.$store.dispatch(
        'setSettingsPageSection',
        SETTINGS_PAGE_SUBSCRIPTION_MANAGE_PLANS
      )
    }
  }
}
</script>

<style lang="scss">
.cursor-pointer {
  cursor: pointer;
}
.left-bar-option {
  color: #767676;
  font-family: 'Sourcesanspro' !important;
  font-size: 18px;
  cursor: pointer;
  &:hover {
    color: #958fcb;
  }
  .active {
    color: #958fcb;
  }
}
.left-bar-option-active {
  color: #958fcb;
}
</style>

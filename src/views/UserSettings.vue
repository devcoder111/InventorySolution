<template>
  <v-row justify="center" class="login-container">
    <v-col cols="12">
      <SettingHeader />
    </v-col>
    <v-col cols="12" md="3"></v-col>
    <v-col cols="12" md="5">
      <v-card style="border-radius: unset; box-shadow: unset">
        <v-card-title>General Info</v-card-title>
        <UserProfileForm class="user-profile" />
      </v-card>
    </v-col>
    <v-col cols="12" md="4"></v-col>
  </v-row>
</template>
<script>
import UserProfileForm from '@/components/user/UserProfileForm'
import SettingHeader from '@/components/user/SettingHeader'
export default {
  name: 'UserSettings',
  components: {
    UserProfileForm,
    SettingHeader
  }
}
</script>

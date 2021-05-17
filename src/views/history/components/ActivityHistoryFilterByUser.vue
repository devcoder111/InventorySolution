<template>
  <v-card-text
    class="d-flex justify-center"
  >
    <span class="text-body-1 mr-2">Users:</span>
    <v-select
      class="input-design"
      placeholder="All users"
      dense
      outlined
      multiple
      style="max-width: 260px; "
      :items="users"
      item-text="name"
      item-value="id"
      v-model="selectedUsers"
    >
      <template v-slot:prepend-item>
        <v-text-field
          dense
          :v-ripple="false"
          outlined
          placeholder="Search ..."
          class="mx-4"
          v-model="userSearchTerm"
        />
      </template>
    </v-select>
  </v-card-text>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ActivityHistoryFilterByUser',
  data() {
    return {
      userSearchTerm: '',
      selectedUsers: []
    }
  },
  watch: {
    selectedUsers() {
      this.$emit('on-change', this.selectedUsers)
    }
  },
  computed: {
    ...mapGetters('user', ['invitedUsers']),
    users() {
      if (!Array.isArray(this.invitedUsers)) {
        return []
      }
      return this.invitedUsers.map(user => {
        if (!this.userSearchTerm.trim() ||
          (user.firstName.toLowerCase().indexOf(this.userSearchTerm.toLowerCase()) === 0 ||
          user.lastName.toLowerCase().indexOf(this.userSearchTerm.toLowerCase()) === 0)
        ) {
          return {
            id: user.id,
            name: user.firstName + ' ' + user.lastName
          }
        }
      })
    }
  },
  methods: {
    ...mapActions('user', ['getInvitedUsers'])
  },
  created() {
    this.getInvitedUsers()
  }
}
</script>

<style scoped>
.text-body-1 {
  line-height: 2.55rem;
  font-size: 0.95rem !important;
}
.input-design {
    height: 37px;
}
.v-application .theme--light .v-list, .v-application .theme--light .primary--text {
    color: #7972c0 !important;
    caret-color: #7972c0 !important;
}
</style>

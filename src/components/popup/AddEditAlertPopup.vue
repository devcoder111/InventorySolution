<template>
  <v-dialog v-model="showPopup" persistent max-width="600">
    <v-card style="background-color: white" class="pb-4">
      <v-card-title
        line
        class="d-flex justify-center change-font mb-4"
        style="font-size: 24px"
        >Set Quantity Alert for Item
        <span
          v-if="item.name !== ''"
          class="ml-2"
          style="font-weight: 700; font-family: sans-serif"
          >"{{ item.name }}"</span
        ></v-card-title
      >
      <v-card-text class="d-flex justify-center text-h6 font-weight-bold pb-2">
        <span style="color: #514f6b">Alert when quantity is:</span>
      </v-card-text>
      <v-card-text class="d-flex no-wrap justify-center mb-4">
        <v-select
          class="mr-4"
          :items="alertsOptions"
          style="max-width: 175px"
          v-model="alertType"
          dense
          hide-details
        />
        <v-text-field
          outlined
          dense
          type="number"
          min="0"
          style="max-width: 75px"
          hide-details
          v-model="alertQuantity"
        />
      </v-card-text>
      <v-card-text class="d-flex justify-center text-h6 font-weight-bold pb-0">
        <span style="color: #514f6b">This alert will be sent to:</span>
      </v-card-text>
      <v-card-text class="d-flex no-wrap justify-center">
        <v-checkbox
          v-model="sendAlertToMembers"
          class="mr-6"
          color="#7972C1"
          label="Members"
          >Members</v-checkbox
        >
        <v-checkbox color="#7972C1" v-model="sendAlertToOwners" label="Owners"
          >Owners</v-checkbox
        >
      </v-card-text>
      <v-card-text
        class="d-flex justify-center"
        v-if="sendAlertToMembers === true"
      >
        <v-select
          placeholder="Select people manually"
          dense
          multiple
          style="max-width: 260px"
          :items="filteredinvitedUsers"
          item-text="name"
          item-value="id"
          v-model="alertSelectedPeoples"
        >
          <template v-slot:prepend-item>
            <v-text-field
              dense
              :v-ripple="false"
              outlined
              placeholder="Search ..."
              class="mx-4"
              v-model="searchUser"
            />
          </template>
        </v-select>
      </v-card-text>
      <v-card-actions class="text-xs-center justify-center">
        <v-btn
          color="#7972c0"
          depressed
          class="confirm-add-alert-btn"
          :disabled="!valid"
          normal
          dark
          style="
            margin-right: 8px;
            width: 100px;
            text-transform: none;
            font-weight: 600;
          "
          @click="confirmAddAlert"
          >Confirm</v-btn
        >
        <v-btn
          depressed
          normal
          color="white"
          style="
            padding: 0 18.4444444444px;
            width: 100px;
            border: 1px solid rgb(121 114 192) !important;
            text-transform: none;
            font-weight: 600;
          "
          @click="hide"
          ><span style="color: rgb(121 114 192)">Cancel</span></v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import {
  MODULE_POPUP,
  SET_ADD_EDIT_ALERT_POPUP_SHOW,
  SET_PENDING_ALERT_TO_SAVE,
  SET_DELETE_ALERT_POPUP_SHOW
} from '@/store/constant/mutation-types'
export default {
  name: 'AddEditAlertPopu',
  props: ['item'],
  data() {
    return {
      alertsOptions: [
        'GREATER_THEN',
        'GREATER_THEN_OR_EQUAL',
        'LESS_THEN',
        'LESS_THEN_OR_EQUAL'
      ],
      alertType: 'LESS_THEN',
      alertQuantity: 1,
      sendAlertToMembers: false,
      sendAlertToOwners: false,
      alertSelectedPeoples: [],
      itemId: '',
      searchUser: '',
      tmpUsers: []
    }
  },
  created() {
    this.getInvitedUsers()
    this.itemId = parseInt(this.$route.params.id)
  },
  computed: {
    ...mapGetters('user', ['invitedUsers', 'user']),
    ...mapGetters('popup', ['alertPendingToSave']),
    iUsers() {
      return this.invitedUsers
    },
    currentAlert() {
      return this.alertPendingToSave
    },
    valid() {
      if (
        (!this.sendAlertToMembers || this.alertSelectedPeoples.length === 0) &&
        !this.sendAlertToOwners
      ) {
        return false
      } else return true
    },

    showPopup() {
      return this.$store.getters[`${MODULE_POPUP}/showAddEditAlertPopup`]
    },
    filteredinvitedUsers() {
      if (this.searchUser.length === 0) {
        return this.tmpUsers
      } else {
        return this.tmpUsers.filter((el) =>
          el.name.toLowerCase().includes(this.searchUser.toLowerCase())
        )
      }
    }
  },
  watch: {
    currentAlert: function (val) {
      if (val) {
      }
    },
    iUsers: function (val) {
      if (val) {
        const members = this.invitedUsers.map((el) => {
          el.name = el.firstName + ' ' + el.lastName
          el.selected = false
          return el
        })
        members.shift()
        this.tmpUsers = JSON.parse(JSON.stringify(members))
        console.log('alertPendingToSave', this.alertPendingToSave)
        if (this.alertPendingToSave !== null) {
          this.alertType = JSON.parse(
            JSON.stringify(this.alertPendingToSave.type)
          )
          this.alertQuantity = JSON.parse(
            JSON.stringify(this.alertPendingToSave.value)
          )
          this.sendAlertToOwners =
            this.alertPendingToSave.users.filter((el) => el === this.user.id)
              .length > 0
          this.alertSelectedPeoples.splice(0, this.alertSelectedPeoples.length)
          if (this.tmpUsers.length > 0) {
            this.tmpUsers.forEach((el) => {
              const userSelected = this.alertPendingToSave.users.find(
                (u) => u === el.id
              )
              if (userSelected) {
                el.selected = true
                this.alertSelectedPeoples.push(userSelected)
              }
            })
          }
        }
        this.sendAlertToMembers =
          this.tmpUsers.filter((el) => el.selected).length > 0
      }
    }
  },
  methods: {
    ...mapActions('user', ['getInvitedUsers']),
    ...mapActions('alerts', ['addAlert', 'updateAlert']),
    deleteAlert() {
      this.hide()
      this.$store.commit(`${MODULE_POPUP}/${SET_DELETE_ALERT_POPUP_SHOW}`, true)
    },
    hide() {
      this.$store.commit(
        `${MODULE_POPUP}/${SET_ADD_EDIT_ALERT_POPUP_SHOW}`,
        false
      )
    },
    confirmAddAlert() {
      const payload = {
        itemId: this.itemId,
        type: this.alertType,
        value: parseInt(this.alertQuantity),
        users: this.alertSelectedPeoples,
        archived: this.alertPendingToSave
          ? this.alertPendingToSave.archived
          : true
      }
      if (this.sendAlertToMembers) {
        if (this.sendAlertToOwners) {
          const tmp = this.alertSelectedPeoples
          const user = this.$store.getters['user/user']
          tmp.push(user.id)
          payload.users = tmp
        } else payload.users = this.alertSelectedPeoples
      } else {
        if (this.sendAlertToOwners) {
          const owner = []
          const user = this.$store.getters['user/user']
          owner.push(user.id)
          payload.users = owner
        } else payload.users = ''
      }
      this.$store.commit(
        `${MODULE_POPUP}/${SET_PENDING_ALERT_TO_SAVE}`,
        payload
      )
      this.hide()
    }
  }
}
</script>

<style scoped>
.theme--dark.v-btn.v-btn--disabled:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined).confirm-add-alert-btn {
  background-color: #7972c1 !important;
}
.delete-alert-btn {
  margin: auto;
  display: block;
  text-align: center;
  margin-top: 30px;
}
.cursor-point {
  cursor: pointer;
}
</style>

<template>
  <v-container style="padding-top: 0 !important">
    <v-row
      class="justify-start align-start pa-2"
      style="background-color: #efefef; position: relative; margin: 0 -12px"
    >
      <v-col class="py-0" cols="12" sm="4">
        <span class="text-h5" style="font-weight: 500">Users</span>
      </v-col>
    </v-row>
    <v-row
      class="mx-4 mt-6"
      style="border: solid 1px #fec111; border-radius: 4px"
      v-if="
        currentUserPlan.name === 'Free' || currentUserPlan.name === 'No Plan'
      "
    >
      <v-col cols="1" class="pa-0" style="background-color: #fec111">
        <v-row class="justify-center align-center">
          <v-col cols="auto" class="my-2">
            <v-img
              width="24px"
              height="24px"
              src="@/assets/icons/svg/alert.svg"
            ></v-img>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="10" class="pa-0">
        <v-row class="align-center my-auto" style="height: 100%">
          <v-col cols="auto" class="py-0">
            <span
              class="ml-4"
              style="color: #505050; font-size: 16px; font-weight: 500"
            >
              You can invite up to 5 users with your current plan.
            </span>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <div class="mx-4 mt-6 pa-4 table-wrapper">
      <v-row class="align-center px-3 mb-4">
        <v-btn
          depressed
          style="
            background-color: #7972c0;
            color: white;
            font-weight: 600;
            text-transform: capitalize;
            font-size: 14px;
          "
          @click="inviteNewUser"
        >
          <span class="font-weight-bold mr-2" style="font-size: 20px">+</span>
          Add User
        </v-btn>
        <v-spacer />
        <span class="text-body-1 mr-2 font-weight-medium">Show:</span>
        <v-card
          flat
          class="v-flex"
          style="width: 200px !important; background-color: #efefef"
        >
          <v-select
            v-model="filterUsers"
            outlined
            dense
            color="black"
            :items="filterUsersOptiones"
            placeholder="All Users"
            hide-details
          ></v-select>
        </v-card>
      </v-row>
      <v-divider />
      <v-row class="justify-space-between">
        <v-col cols="12" class="px-0">
          <v-data-table
            :headers="headers"
            :items="items"
            :page.sync="page"
            :items-per-page="itemsPerPage"
            item-key="id"
            hide-default-footer
            @page-count="pageCount = $event"
          >
            <template v-slot:no-results>
              <p class="text-h5 mt-16">No Users</p>
            </template>
            <template v-slot:[`item.selected`]>
              <v-simple-checkbox
                color="#7972c0"
                :ripple="false"
              ></v-simple-checkbox>
            </template>
            <template v-slot:[`item.inviteStatus`]="{ item }">
              <span
                v-if="item.inviteStatus === 'accepted'"
                style="
                  background-color: #d6f7e2;
                  color: #3d654d;
                  border-radius: 4px;
                "
                class="pa-1"
                >{{ item.inviteStatus }}</span
              >
              <span
                v-else
                style="
                  background-color: #fff1d6;
                  color: #b67501;
                  border-radius: 4px;
                "
                class="pa-1"
                >{{ item.inviteStatus }}</span
              >
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-row class="flex-nowrap">
                <v-col cols="6" class="px-0">
                  <img
                    class="mr-1 cursor-point"
                    style="height: 16px; width: 16px"
                    src="@/assets/icons/svg/draw.svg"
                    v-if="
                      item.role !== 'admin' && item.inviteStatus !== 'accepted'
                    "
                    @click="editUser(item)"
                  />
                </v-col>
                <v-col cols="6" class="px-0">
                  <img
                    style="height: 16px; width: 16px"
                    src="@/assets/icons/svg/delete.svg"
                    @click="deleteUser(item.id)"
                    v-if="item.role != 'admin'"
                    class="cursor-point"
                  />
                </v-col>
              </v-row>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3">
          <span class="text-subtitle-2 font-weight-medium mr-2">Showing</span>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                text
                outlined
                v-bind="attrs"
                v-on="on"
                style="padding: 0px; font-weight: 600"
              >
                {{ itemsPerPage }}
                <v-icon>mdi-menu-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(item, index) in [5, 10, 15, 20, 25, 50, 100]"
                :key="index"
                link
                @click="itemsPerPage = item"
              >
                <v-list-item-title>{{ item }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <span class="text-subtitle-2 font-weight-medium ml-2">Entries</span>
        </v-col>
        <v-col cols="9" class="d-flex justify-end">
          <v-pagination
            v-model="page"
            :length="pageCount"
            :total-visible="6"
            color="#7972C0"
          ></v-pagination>
        </v-col>
      </v-row>
    </div>
    <edit-user
      v-model="showEditUser"
      :value="showEditUser"
      :user="tmpUserData"
      :id="tmpUserID"
    />
    <invite-user v-model="showInviteUser" :value="showInviteUser" />

    <v-dialog v-model="resendDialog" class="resendDialog" width="500">
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
          style="color: #919196 !important"
        >
          Invite User
        </v-card-title>

        <v-card-text class="mt-5">{{ resendMessage }} </v-card-text>
        <v-card-actions>
          <v-btn
            text
            height="40"
            @click="resendDialog = false"
            class="ma-auto resend-ok-btn"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- user delete modal -->
    <v-dialog v-model="userDeleteDialog" persistent max-width="768">
      <v-card style="padding: 30px">
        <v-card-title class="headline d-flex justify-center lighten-1--text"
          >Are you sure to delete this user?
        </v-card-title>
        <v-card-actions class="text-xs-center justify-center">
          <v-btn
            color="#7972c0"
            depressed
            normal
            dark
            style="margin-right: 8px; width: 100px; text-transform: none"
            @click="confirmDeleteuser"
            >Delete</v-btn
          >
          <v-btn
            depressed
            normal
            color="white"
            @click="userDeleteDialog = false"
            style="
              padding: 0 18.4444444444px;
              width: 100px;
              border: 1px solid rgb(121 114 192) !important;
              text-transform: none;
            "
            ><span style="color: rgb(121 114 192)">Cancel</span></v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-row class="footer">
      <span class="footer--text"
        >Copyright 2020-2021
        <span style="color: #7972c0"
          ><a href="/" target="_blank" title="BRITECHECK">BRITECHECK</a></span
        >, All rights reserved.</span
      >
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import EditUser from '@/components/manage-user/EditUser'
import InviteUser from '@/components/manage-user/InviteUser'
export default {
  components: {
    EditUser,
    InviteUser
  },
  data() {
    return {
      currentUserPlan: {},
      showEditUser: false,
      showInviteUser: false,
      resendDialog: false,
      tmpUserData: '',
      tmpUserID: '',
      resendMessage: '',
      filterUsers: '',
      filterUsersOptiones: [
        'All Users',
        'Confirmed Users',
        'Unconfirmed Users'
      ],
      headers: [
        {
          text: 'First Name',
          align: 'start',
          sortable: true,
          value: 'firstName'
        },
        {
          text: 'Last Name',
          value: 'lastName',
          sortable: true,
          align: 'start'
        },
        { text: 'Role', value: 'role', sortable: true, align: 'start' },
        { text: 'Email', value: 'email', sortable: true, align: 'start' },
        {
          text: 'Phone Number',
          value: 'phone',
          sortable: true,
          align: 'start'
        },
        { text: 'Created', value: 'dateAdded', sortable: true, align: 'start' },
        {
          text: 'Last Active',
          value: 'lastActive',
          sortable: true,
          align: 'start'
        },
        {
          text: 'Status',
          value: 'inviteStatus',
          sortable: true,
          align: 'start'
        },
        {
          text: '',
          value: 'actions',
          sortable: false,
          align: 'start'
        }
      ],
      itemsPerPage: 5,
      page: 1,
      pageCount: 0,
      userDeleteDialog: false,
      selectedUserId: ''
    }
  },
  mounted() {},
  created() {
    this.getInvitedUsers()
    this.currentUserPlan = JSON.parse(localStorage.getItem('curUserData')).plan
  },
  computed: {
    ...mapGetters('user', ['invitedUsers']),
    items() {
      if (this.filterUsers === 'Unconfirmed Users') {
        return JSON.parse(
          JSON.stringify(
            this.invitedUsers.filter((el) => el.inviteStatus === 'invited')
          )
        )
      } else if (this.filterUsers === 'Confirmed Users') {
        return JSON.parse(
          JSON.stringify(
            this.invitedUsers.filter((el) => el.inviteStatus !== 'invited')
          )
        )
      } else {
        return JSON.parse(JSON.stringify(this.invitedUsers))
      }
    }
  },
  methods: {
    ...mapActions('user', ['inviteUser', 'getInvitedUsers', 'delInvitedUser']),
    deleteUser(id) {
      this.userDeleteDialog = true
      this.selectedUserId = id
    },
    confirmDeleteuser() {
      this.userDeleteDialog = false
      this.delInvitedUser(this.selectedUserId).then((res) => {
        if (res.data.error.type === 200) {
          this.getInvitedUsers()
        }
      })
    },
    submitUser() {
      this.inviteUser(this.userToSubmit)
    },
    async resend(user) {
      await this.inviteUser(user).then((res) => {
        if (res.status === 200) {
          this.resendDialog = true
          this.resendMessage = `Invitation has been resent to email ${user.email} successful.`
        } else this.resendDialog = false
      })
    },
    modalEditUser(selectedUserData, index) {
      this.tmpUserData = selectedUserData
      this.tmpUserID = index
      this.showEditUser = true
    },
    inviteNewUser() {
      if (this.invitedUsers.length > this.currentUserPlan.limitUsers) {
        this.$toasted.error('You cannot add more than 3 users', {
          theme: 'toasted-primary',
          position: 'bottom-right',
          icon: {
            name: 'close'
          },
          duration: 5000
        })
      } else {
        this.$router.replace({ name: 'AddUser' })
      }
    },
    async editUser(user) {
      await this.$store.commit('user/set', {
        type: 'user',
        val: user
      })
      this.$router.push({ name: 'AddUser' })
    }
  }
}
</script>
<style lang="scss">
.theme--light.v-pagination .v-pagination__item {
  background: #f5f5f5;
  box-shadow: none;
  border: 1px solid #8a8a8a;
}
.theme--light.v-pagination .v-pagination__navigation {
  background: #f5f5f5;
  box-shadow: none;
  border: 1px solid #8a8a8a;
}
.eventHandle {
  visibility: hidden;
}
.eventHandle img {
  width: 25px;
  height: 25px;
}
.actionField:hover .eventHandle {
  visibility: inherit;
}
.userTable {
  width: 100%;
}
.userTable th {
  font-size: 12px;
  color: rgb(29, 34, 43);
}
.userTable td {
  height: 60px !important;
}
.invite-num-span {
  display: inline-block;
  font-style: normal;
  font-stretch: normal;
  word-break: break-word;
  color: rgb(29, 34, 43);
  font-family: HelveticaNeue, sans-serif;
  font-weight: bold;
  font-size: 18px;
  line-height: 1.33;
  letter-spacing: 0.2px;
  padding: 0px 0px 16px;
  display: block;
}
.invite-num-description {
  display: inline-block;
  font-style: normal;
  font-stretch: normal;
  word-break: break-word;
  color: rgb(29, 34, 43);
  font-family: HelveticaNeue, sans-serif;
  font-size: 14px;
  line-height: 1.43;
  letter-spacing: 0.2px;
  padding: 0px 0px 38px;
  display: block;
}
.username {
  display: inline-block;
  font-style: normal;
  font-stretch: normal;
  word-break: break-word;
  color: rgb(29, 34, 43);
  font-family: HelveticaNeue, sans-serif;
  font-weight: bold;
  font-size: 14px;
  line-height: 1.43;
  letter-spacing: 0.2px;
}
.useremail {
  display: inline-block;
  font-style: normal;
  font-stretch: normal;
  word-break: break-word;
  color: rgb(113, 117, 130);
  font-family: HelveticaNeue, sans-serif;
  font-size: 10px;
  line-height: 1.43;
  letter-spacing: 0.2px;
}
.inviteUser {
  color: rgb(0, 150, 188);
}
.invite-input > div > div > .mdi-alert-circle {
  color: red !important;
}
.invite-input > div > div > div > div > .mdi-checkbox-marked-circle {
  color: #22bb33 !important;
}
.r-field {
  padding-top: unset;
  margin-top: unset;
}
.userInfo {
  display: inline-block;
  font-style: normal;
  font-stretch: normal;
  word-break: break-word;
  color: rgb(29, 34, 43);
  font-weight: bold;
  font-family: HelveticaNeue, sans-serif;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: 0.2px;
}
.v-text-field--box .v-input__slot,
.v-text-field--outline .v-input__slot {
  min-height: 50px;
}
.invite-user-btn {
  width: 20%;
  /* background-color: #6452a2 !important; */
  background-image: linear-gradient(to right, #8074c2, #4c486b);
  color: white !important;
  font-weight: bold;
  text-transform: capitalize;
  font-size: 1rem !important;
  margin-right: 20px;
}
.invite-user-btn:hover {
  width: 20%;
  border: 2px solid #6452a2;
  background-color: #f5f5f5 !important;
  color: #f5f5f5 !important;
  font-weight: bold;
  text-transform: capitalize;
  font-size: 1rem !important;
}
.cancel-btn {
  width: 20%;
  border: 2px solid #6452a2;
  background-color: #f5f5f5 !important;
  color: #6452a2 !important;
  font-weight: bold;
  text-transform: capitalize;
  font-size: 1rem !important;
}
.cancel-btn:hover {
  /* background-color: #6452a2 !important; */
  background-image: linear-gradient(to right, #8074c2, #4c486b);
  color: white !important;
}
.label-field {
  font-size: 1rem !important;
  color: #413967;
  font-family: 'Sourcesanspro';
}
.resend-ok-btn {
  width: 20%;
  /* background-color: #6452a2 !important; */
  background-image: linear-gradient(to right, #8074c2, #4c486b);
  color: white !important;
  font-weight: bold;
  text-transform: capitalize;
  font-size: 1rem !important;
  margin-right: 20px;
}
.resend-ok-btn:hover {
  width: 20%;
  border: 2px solid #6452a2;
  background-color: #f5f5f5 !important;
  color: #f5f5f5 !important;
  font-weight: bold;
  text-transform: capitalize;
  font-size: 1rem !important;
}
.v-application,
.v-application .headline {
  font-family: 'Sourcesanspro' !important;
}
</style>

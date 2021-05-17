<template>
  <v-container>
    <v-row>
      <Header />
    </v-row>
    <v-row justify="center">
      <v-col sm="8">
        <v-row>
          <div class="invite-num-span">
            <span>{{ invitedUsers.length }} of 3 users invited.</span>
          </div>
        </v-row>
        <v-row>
          <div class="invite-num-description">
            <span>
              You can invite up to 3 users with your current plan. Additional
              users are $3/user/month
            </span>
          </div>
        </v-row>
        <v-row>
          <v-simple-table class="userTable">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">User</th>
                  <th class="text-left">Role</th>
                  <th class="text-left">Date Added</th>
                  <th class="text-left">Last Active</th>
                  <th class="text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in invitedUsers" :key="'A' + index">
                  <td>
                    <div class="d-flex justify-start flex-column flex-nowrap">
                      <span class="username"
                        >{{ item.firstName }} {{ item.lastName }}</span
                      >
                      <span class="useremail">{{ item.email }}</span>
                    </div>
                  </td>
                  <td>{{ item.role }}</td>
                  <td>{{ item.dateAdded }}</td>
                  <td>{{ item.lastActive }}</td>
                  <td class="actionField">
                    <div
                      class="d-flex justify-start flex-row flex-wrap align-center"
                    >
                      <div
                        class="sc-pjIPr bvPQT"
                        data-testid="resend-user-invite"
                      >
                        <a
                          v-if="item.inviteStatus != 'accepted'"
                          class=""
                          @click="resend(item)"
                          >Resend</a
                        >
                      </div>
                      <div class="eventHandle" style="margin: auto">
                        <a class="ml-1" @click="modalEditUser(item, index)">
                          <img src="../assets/edit.svg" />
                        </a>
                        <a class="ml-1" @click="delInvitedUser(item.id)">
                          <img src="../assets/delete.svg" />
                        </a>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr v-for="(n, index) in 3 - invitedUsers.length" :key="index">
                  <td>
                    <span class="inviteUser" @click="showInviteUser = true"
                      >Invite user</span
                    >
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td class="actionField">
                    <div class="eventHandle">
                      <a class="">
                        <!-- <img src="../assets/delete.svg" /> -->
                      </a>
                    </div>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-row>
      </v-col>
    </v-row>
    <edit-user
      v-model="showEditUser"
      :value="showEditUser"
      :user="tmpUserData"
      :id="tmpUserID"
    />
    <invite-user v-model="showInviteUser" :value="showInviteUser" />

    <v-dialog v-model="resendDialog" class="resendDialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title
        style="
              color: #919196 !important;
          "
        >Invite User
        </v-card-title>

        <v-card-text class="mt-5">{{ resendMessage }} </v-card-text>
        <v-divider></v-divider>
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
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import EditUser from '@/components/manage-user/EditUser'
import InviteUser from '@/components/manage-user/InviteUser'
import Header from '@/components/manage-user/Header'
export default {
  components: {
    EditUser,
    InviteUser,
    Header
  },
  data() {
    return {
      showEditUser: false,
      showInviteUser: false,
      resendDialog: false,
      tmpUserData: '',
      tmpUserID: '',
      resendMessage: ''
    }
  },
  mounted() {},
  created() {
    this.getInvitedUsers()
  },
  computed: {
    ...mapGetters('user', ['invitedUsers'])
  },
  methods: {
    ...mapActions('user', ['inviteUser', 'getInvitedUsers', 'delInvitedUser']),
    submitUser() {
      this.inviteUser(this.userToSubmit)
    },
    async resend(item) {
      console.log('item', item)
      await this.inviteUser(item).then((res) => {
        console.log('res', res)
        if (res.status === 200) {
          this.resendDialog = true
          this.resendMessage =
            'Invitation has been resent to email ' + item.email + ' successful.'
        } else this.resendDialog = false
      })
    },
    modalEditUser(selectedUserData, index) {
      this.tmpUserData = selectedUserData
      this.tmpUserID = index
      this.showEditUser = true
    }
  }
}
</script>
<style>
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

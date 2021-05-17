<template>
  <v-dialog v-model="showPopup" persistent max-width="600">
    <v-card style="background-color: white" class="pb-4">
      <v-card-title
        line
        class="d-flex justify-center change-font mb-4"
        style="font-size: 24px"
        >{{ this.alertData ? 'Edit Alert' : 'Add New Alert' }}
      </v-card-title>
      <v-card-text class="d-flex justify-center text-h6 font-weight-bold pb-0">
        <span style="color: #514f6b"
          >Folder with items for setting the alert:</span
        >
      </v-card-text>
      <v-card-text class="d-flex justify-center">
        <div style="position: relative" class="treeviewContainer">
          <v-text-field
            v-model="selectedFolder.name"
            style="min-width: 260px"
            placeholder="Select Folder"
            @click="testfunc"
            class="cursor-point"
            readonly
          >
          </v-text-field>
          <v-card
            v-if="showTreeview"
            id="date-period"
            class="select-period pa-1"
            style="
              min-width: 260px;
              z-index: 22222;
              position: absolute;
              max-height: 300px;
              overflow: scroll;
            "
            v-click-outside="onClickOutside"
          >
            <v-text-field
              v-model="searchFolderTerm"
              placeholder="Search..."
              outlined
              dense
              hide-details
              height="20"
              class="full-width px-2"
              :v-ripple="false"
            ></v-text-field>
            <v-treeview
              :active.sync="active"
              :items="foldersCopy"
              :search="searchFolderTerm"
              :filter="filter"
              :open.sync="open"
              item-children="categories"
              return-object
              activatable
              item-key="id"
              dense
              class="px-2 cursor-point"
              selection-type="independent"
            >
              {{ selected }}
              <template v-slot:prepend="{}">
                <div @click="selectFolder">
                  <v-img
                    max-height="20"
                    max-width="20"
                    class="mr-2 cursor-point"
                    src="@/assets/icons/svg/folder-color.svg"
                  ></v-img>
                </div>
              </template>
            </v-treeview>
          </v-card>
        </div>
      </v-card-text>

      <v-card-text class="d-flex justify-center text-h6 font-weight-bold pb-0">
        <span style="color: #514f6b"
          >The item for which the alert will be set:</span
        >
      </v-card-text>
      <v-card-text class="d-flex justify-center">
        <v-select
          v-model="selectedItem"
          :items="itemsPerFolder"
          item-text="name"
          item-value="id"
          attach
          label="Select Item"
          style="max-width: 260px"
        >
          <template v-slot:prepend-item>
            <v-list-item>
              <v-list-item-content>
                <v-text-field
                  v-model="searchItemTerm"
                  placeholder="Search..."
                  @input="searchItems"
                  outlined
                  dense
                  hide-details
                  :v-ripple="false"
                ></v-text-field>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-select>
      </v-card-text>
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
  SET_DELETE_ALERT_POPUP_SHOW,
  SET_ADD_NEW_ALERT_POPUP_SHOW
} from '@/store/constant/mutation-types'
export default {
  name: 'AddEditAlertPopu',
  props: ['item'],
  data() {
    return {
      showTreeview: false,
      tempData: 'adsfd',
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
      alertSelectedFolder: [],
      alertSelectedItem: [],
      itemId: '',
      searchUser: '',
      searchFolder: '',
      searchItem: '',
      tmpUsers: [],
      foldersCopy: [],
      itemsCopy: [],
      allCategories: [],
      totalFolders: [],
      itemsPerFolder: [],
      selectedFolder: {},
      selectedItem: '',
      searchFolderTerm: '',
      searchItemTerm: '',
      active: [],
      open: [],
      alertData: null
    }
  },
  created() {
    this.getInvitedUsers()
    this.itemId = parseInt(this.$route.params.id)
    this.showAllFolders()
  },
  computed: {
    ...mapGetters('user', ['invitedUsers', 'user']),
    ...mapGetters('popup', ['alertPendingToSave']),
    filter() {
      return this.caseSensitive
        ? (item, search, textKey) => item[textKey].indexOf(search) > -1
        : undefined
    },

    selected: {
      get: function () {
        const id = this.active[0]
        this.selectFunc(id)
        this.onClickOutside()
        return this.foldersCopy.find((folder) => folder.id === id)
      },
      set: function (val) {
        this.selectedFolder = val
      }
    },
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
      return this.$store.getters[`${MODULE_POPUP}/showAddNewAlertPopup`]
    },
    filteredinvitedUsers() {
      if (this.searchUser.length === 0) {
        return this.tmpUsers
      } else {
        return this.tmpUsers.filter((el) =>
          el.name.toLowerCase().includes(this.searchUser.toLowerCase())
        )
      }
    },
    filteredAllFolders() {
      if (this.searchFolder.length === 0) {
        return this.tmpFolders
      } else {
        return this.tmpFolders.filter((el) =>
          el.name.toLowerCase().includes(this.searchFolder.toLowerCase())
        )
      }
    }
  },
  watch: {
    currentAlert: function (val) {
      if (val) {
      }
    },
    selectedFolder: function (folder) {
      if (Object.keys(folder).length !== 0) {
        this.$store.dispatch('inventory/getCategory', folder.id).then((cat) => {
          this.itemsPerFolder = cat.items
          this.itemsCopy = cat.items
        })
      }
    },
    selectedItem: function (item) {
      if (item === '') {
        this.alertData = null
      } else {
        this.alertData = this.itemsCopy.filter((el) => el.id === item)[0].alert
        if (this.alertData) {
          this.alertType = this.alertData.type
          this.alertQuantity = this.alertData.value
          this.sendAlertToOwners =
            this.alertData.users.filter((el) => el.id === this.user.id).length >
            0
          this.alertSelectedPeoples.splice(0, this.alertSelectedPeoples.length)
          if (this.tmpUsers.length > 0) {
            this.tmpUsers.forEach((el) => {
              const userSelected = this.alertData.users.find(
                (u) => u.id === el.id
              )
              if (userSelected) {
                el.selected = true
                this.alertSelectedPeoples.push(userSelected.id)
              }
            })
          }
          this.sendAlertToMembers =
            this.tmpUsers.filter((el) => el.selected).length > 0
        }
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
    ...mapActions('inventory', ['getAllFolders']),
    ...mapActions('user', ['getInvitedUsers']),
    ...mapActions('alerts', ['addAlert', 'updateAlert']),
    hideTreview(event) {
      event.preventDefault()
      if (event.target === event.currentTarget) {
        this.showTreeview = false
      }
    },
    onClickOutside() {
      this.showTreeview = false
    },
    closeTreeview() {
      // this.showTreeview = false
      return this.showTreeview
    },
    testfunc() {
      this.showTreeview = true
    },
    selectFunc(id) {
      if (id !== undefined) this.selectedFolder = id
    },
    selectFolder() {},
    searchFolders(e) {
      if (!this.searchFolderTerm) {
        this.allCategories = this.foldersCopy
      }

      this.allCategories = this.foldersCopy.filter((folder) => {
        return (
          folder.name
            .toLowerCase()
            .indexOf(this.searchFolderTerm.toLowerCase()) > -1
        )
      })
    },
    searchItems(e) {
      if (!this.searchItemTerm) {
        this.itemsPerFolder = this.itemsCopy
      }

      this.itemsPerFolder = this.itemsCopy.filter((item) => {
        return (
          item.name.toLowerCase().indexOf(this.searchItemTerm.toLowerCase()) >
          -1
        )
      })
    },
    async showAllFolders() {
      const curUserData = this.$store.getters['user/user']
      const inventoryId = curUserData.inventories[0]
      const payload = {
        inventoryId: inventoryId
      }
      await this.getAllFolders(payload).then((folders) => {
        this.allCategories = folders
        this.foldersCopy = folders
      })
    },

    deleteAlert() {
      this.hide()
      this.$store.commit(`${MODULE_POPUP}/${SET_DELETE_ALERT_POPUP_SHOW}`, true)
    },
    hide() {
      this.$store.commit(
        `${MODULE_POPUP}/${SET_ADD_NEW_ALERT_POPUP_SHOW}`,
        false
      )
      this.cleanAlertData()
    },
    confirmAddAlert() {
      const payload = {
        itemId: this.selectedItem,
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
      if (this.alertData) {
        this.updateAlert(payload)
      } else {
        this.addAlert(payload)
      }
      this.cleanAlertData()
      this.hide()
    },
    cleanAlertData() {
      this.selectedFolder = {}
      this.selectedItem = ''
      this.alertData = null
      this.alertQuantity = 1
      this.alertType = 'LESS_THEN'
      this.sendAlertToMembers = false
      this.sendAlertToOwners = false
      this.alertSelectedPeoples = []
    }
  }
}
</script>

<style scoped>
::v-deep .v-treeview--dense .v-treeview-node__root {
  min-height: 35px;
}
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
.full-width {
  width: 100%;
}
</style>

<template>
  <v-container class="py-0">
    <v-row
      class="justify-start align-start pa-2"
      style="background-color: #efefef; position: relative; margin: 0 -12px"
    >
      <v-col class="py-0" cols="12" sm="4">
        <span class="text-h5 main-title">Alerts</span>
      </v-col>
    </v-row>
    <div class="table-wrapper mx-4 mt-6 pa-4">
      <v-row class="align-center px-3 mb-2">
        <v-col class="py-0" cols="12" sm="6">
          <v-breadcrumbs divider=">" class="pa-0 breadcrumbs">
            <v-breadcrumbs-item
              v-for="(item, index) in ['Alerts']"
              :key="`mi` + index"
            >
              <span style="font-size: 1.3rem" class="cursor-point"
                >{{ item }}
                <v-icon style="font-size: 1.3rem"
                  >mdi-chevron-right</v-icon
                ></span
              >
            </v-breadcrumbs-item>
          </v-breadcrumbs>
        </v-col>
        <v-col class="pr-1" cols="12" sm="6" style="position: relative">
          <v-btn
            depressed
            style="
              background-color: #7972c0;
              color: white;
              font-weight: 600;
              text-transform: capitalize;
              font-size: 16px;
              float: right;
            "
            @click="showAddNewAlertPopup"
          >
            <span class="font-weight-bold mr-2" style="font-size: 20px">+</span>
            Add/Edit Alert
          </v-btn>
          <AddNewAlertPopup class="testt" style="position: absolute" />
        </v-col>
      </v-row>
      <v-row class="px-4 items-center mb-4">
        <div class="d-flex" v-if="items.filter((el) => el.selected).length > 0">
          <v-img
            max-height="20"
            max-width="20"
            class="mr-2 cursor-point"
            @click="$router.push({ name: '' })"
            src="@/assets/icons/svg/vision.svg"
          ></v-img>
          <span
            class="text-subtitle-2 font-weight-bold cursor-point"
            style="color: #9e9bd2"
            @click="selectedAlertMark"
            >Mark as Read</span
          >
          <v-divider vertical class="mx-4 my-1" />
          <v-img
            max-height="20"
            max-width="20"
            class="mr-2 cursor-point"
            src="@/assets/icons/svg/cardboard-box.svg"
          ></v-img>
          <span
            class="text-subtitle-2 font-weight-bold cursor-point"
            style="color: #9e9bd2"
            @click="showArchiveDialog(true)"
            >Archive</span
          >
        </div>
        <v-spacer />
        <span class="text-body-1 mr-2 font-weight-medium">Period:</span>
        <v-card
          id="period"
          flat
          class="d-flex flex-nowrap items-center mr-4"
          width="300px !important;"
          style="
            background-color: #efefef;
            border: 1px solid #d1d0d5;
            position: relative;
          "
        >
          <v-text-field
            outlined
            hide-details
            dense
            readonly
            v-model="alertsPeriod"
            style="background-color: white; border-right: 1px solid #d1d0d5"
          ></v-text-field>
          <v-img
            max-height="20"
            max-width="20"
            class="ma-2 cursor-point"
            src="@/assets/icons/svg/date.svg"
            @click="showSelectPeriod = !showSelectPeriod"
          ></v-img>
          <v-card
            id="date-period"
            class="select-period d-flex flex-nowrap pa-1"
            style="min-width: 750px; z-index: 2"
            v-if="showSelectPeriod"
          >
            <v-col cols="5">
              <v-text-field
                outlined
                hide-details
                dense
                v-model="convertedFromDate"
                style="background-color: white"
                class="ml-4"
              ></v-text-field>
              <v-date-picker
                v-model="fromDate"
                no-title
                color="#7A71C0"
                :max="today"
              ></v-date-picker>
            </v-col>
            <v-col cols="5">
              <v-text-field
                outlined
                hide-details
                dense
                v-model="convertedToDate"
                style="background-color: white"
                class="ml-4"
              ></v-text-field>
              <v-date-picker
                v-model="toDate"
                no-title
                color="#7A71C0"
                :max="today"
              ></v-date-picker>
            </v-col>
            <v-col cols="2">
              <v-btn
                class="mb-2"
                color="#7972c0"
                depressed
                normal
                dark
                style="margin-right: 8px; width: 100px; text-transform: none"
                @click="changeAlertsPeriod"
                >Apply</v-btn
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
                "
                @click="showSelectPeriod = false"
                ><span style="color: rgb(121 114 192)">Cancel</span></v-btn
              >
            </v-col>
          </v-card>
        </v-card>
        <span class="text-body-1 mr-2 font-weight-medium">Show:</span>
        <v-card
          flat
          class="v-flex"
          style="width: 200px !important; background-color: #efefef"
        >
          <v-select
            v-model="filterAlerts"
            outlined
            dense
            color="black"
            :items="filterAlertsOptiones"
            placeholder="All Alerts"
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
            <template v-slot:[`item.selected`]="{ item }">
              <v-simple-checkbox
                v-model="item.selected"
                color="#7972c0"
                :ripple="false"
              ></v-simple-checkbox>
            </template>
            <template v-slot:[`item.item.name`]="{ item }">
              <span :class="item.isRead ? '' : 'font-bold'">
                {{ item.item.name }}
              </span>
            </template>
            <template v-slot:[`item.type`]="{ item }">
              <span :class="item.isRead ? '' : 'font-bold'"
                >Quantity is {{ item.type }} to {{ item.alertValue }}</span
              >
            </template>
            <template v-slot:[`item.createdAt`]="{ item }">
              <span :class="item.isRead ? '' : 'font-bold'">{{
                item.createdAt
              }}</span>
            </template>
            <template v-slot:[`item.isRead`]="{ item }">
              <span v-if="item.archived">archived</span>
              <span :class="item.isRead ? '' : 'font-bold'" v-else>
                <span v-if="item.isRead">read</span>
                <span v-else class="font-bold"> unread </span>
              </span>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-row v-if="!item.archived" class="flex-nowrap">
                <v-col cols="6" class="px-0">
                  <div
                    v-if="item.isRead"
                    style="position: relative"
                    id="markAsUnread"
                    @click="toggleMark(item)"
                  >
                    <img
                      class="mr-1 cursor-point"
                      style="height: 16px; width: 16px"
                      src="@/assets/icons/svg/hide-black.svg"
                    />
                    <span class="icon-hint"> mark as unread</span>
                    <span class="triangle"></span>
                  </div>
                  <div
                    v-else
                    style="position: relative"
                    class="markAsRead"
                    @click="toggleMark(item)"
                  >
                    <img
                      class="mr-1 cursor-point"
                      style="height: 16px; width: 16px"
                      src="@/assets/icons/svg/vision-grey.svg"
                    />
                    <span class="icon-hint"> mark as read</span>
                    <span class="triangle"></span>
                  </div>
                </v-col>
                <v-col cols="6" class="px-0">
                  <div style="position: relative" id="action-archive">
                    <img
                      style="height: 16px; width: 16px"
                      src="@/assets/icons/svg/cardboard-box.svg"
                      class="cursor-point"
                      @click="archiveAlert(item)"
                    />
                    <span class="icon-hint"> archive</span>
                    <span class="triangle"></span>
                  </div>
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
    <v-dialog v-model="showArchiveAlertsDialog" persistent max-width="768">
      <v-card style="padding: 15px">
        <v-card-title class="headline d-flex justify-center lighten-1--text">
          <span class="font-weight-bold mx-2"
            >All selected alerts will be moved to the archive
          </span>
        </v-card-title>
        <v-card-actions class="text-xs-center justify-center">
          <v-btn
            color="#7972c0"
            depressed
            normal
            dark
            style="margin-right: 8px; width: 100px; text-transform: none"
            @click="archiveSelectedAlerts()"
            >Archive</v-btn
          >
          <v-btn
            depressed
            normal
            color="white"
            @click="showArchiveDialog(false)"
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
    <!-- user delete modal -->
    <v-dialog v-model="alertDeleteDialog" persistent max-width="768">
      <v-card style="padding: 15px">
        <v-card-title class="headline d-flex justify-center lighten-1--text"
          >The alert
          <span class="font-weight-bold mx-2"
            >"Quantity is {{ this.currentAlertToDelete.type }} to
            {{ this.currentAlertToDelete.alertValue }}"</span
          >
          for
          <span class="font-weight-bold mx-2"
            >"{{ this.currentAlertToDelete.item.name }}"</span
          >
          will be moved to the archive" ?
        </v-card-title>
        <v-card-actions class="text-xs-center justify-center">
          <v-btn
            color="#7972c0"
            depressed
            normal
            dark
            style="margin-right: 8px; width: 100px; text-transform: none"
            @click="confirmDeleteAlert"
            >Archive</v-btn
          >
          <v-btn
            depressed
            normal
            color="white"
            @click="alertDeleteDialog = false"
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
    <!-- <AddNewAlertPopup /> -->
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
import moment from 'moment'
import { date } from 'quasar'
import AddNewAlertPopup from '@/components/popup/AddNewAlertPopup'
import {
  MODULE_POPUP,
  SET_ARCHIVE_ALERT_POPUP_SHOW,
  SET_ADD_NEW_ALERT_POPUP_SHOW
} from '@/store/constant/mutation-types'

const ALL_ALERTS = 'All Alerts'
const ONLY_READ_ALERTS = 'Only Read Alerts'
const ONLY_UNREAD_ALERTS = 'Only Unread Alerts'
const ARCHIVED_ALERTS = 'Archived Alerts'

export default {
  components: {
    AddNewAlertPopup
  },
  data() {
    return {
      today: '',
      alertsPeriod: '',
      showSelectPeriod: false,
      fromDate: '',
      toDate: '',
      currentAlertToDelete: { item: '' },
      filterAlerts: '',
      filterAlertsOptiones: [
        'All Alerts',
        'Only Read Alerts',
        'Only Unread Alerts',
        'Archived Alerts'
      ],
      headers: [
        {
          text: '',
          align: 'start',
          sortable: true,
          value: 'selected'
        },
        {
          text: 'Item Name',
          value: 'item.name',
          sortable: true,
          align: 'start'
        },
        { text: 'Alert', value: 'type', sortable: true, align: 'start' },
        { text: 'Date', value: 'createdAt', sortable: true, align: 'start' },
        {
          text: 'Status',
          value: 'isRead',
          sortable: true,
          align: 'start'
        },
        { text: '', value: 'actions', sortable: true, align: 'start' }
      ],
      itemsPerPage: 5,
      page: 1,
      pageCount: 0,
      alertDeleteDialog: false,
      dateTimeFormat: ''
    }
  },
  mounted() {},
  async created() {
    const payload = {}
    this.getAlerts(payload)
    this.today = moment().format('YYYY-MM-DD')
    await this.$store.dispatch('user/profileSettings').then((res) => {
      this.dateTimeFormat = res.data.data.settings.dateTimeFormat.value
    })
  },
  computed: {
    ...mapGetters('alerts', ['alerts']),
    ...mapGetters('popup', ['showArchiveAlertsDialog']),
    convertedFromDate: {
      get: function () {
        var dateTimeFormat = ''
        if (this.fromDate === '') {
          return ''
        } else {
          dateTimeFormat =
            this.dateTimeFormat === 'undefined' ? '' : this.dateTimeFormat
          const data = moment(this.fromDate).format(dateTimeFormat)
          return this.dateTimeFormat === 'undefined' ? '' : data.slice(0, 10)
        }
      },
      set: function (newVal) {
        this.fromDate = newVal
      }
    },
    convertedToDate: {
      get: function () {
        var dateTimeFormat = ''
        if (this.toDate === '') {
          return ''
        } else {
          dateTimeFormat =
            this.dateTimeFormat === 'undefined' ? '' : this.dateTimeFormat
          const data = moment(this.toDate).format(dateTimeFormat)
          return this.dateTimeFormat === 'undefined' ? '' : data.slice(0, 10)
        }
      },
      set: function (newVal) {
        this.toDate = newVal
      }
    },
    selectedAlerts() {
      return this.items.filter((alert) => alert.selected)
    },
    dataSelectedAlerts() {
      return this.selectedAlerts.map((s) => {
        return { id: s.id, name: s.name }
      })
    },
    items() {
      switch (this.filterAlerts) {
        case ALL_ALERTS:
          return this.alerts.filter((el) => true)
        case ONLY_READ_ALERTS:
          return this.alerts.filter((el) => el.isRead && !el.archived)
        case ONLY_UNREAD_ALERTS:
          return this.alerts.filter((el) => !el.isRead && !el.archived)
        case ARCHIVED_ALERTS:
          return this.alerts.filter((el) => el.archived)
        default:
          return this.alerts
      }
    },
    dateSeparator() {
      return this.fromDate.length > 0 || this.toDate.length > 0 ? ' ~ ' : ''
    }
  },
  methods: {
    ...mapActions('alerts', ['getAlerts', 'updateNotification']),
    showAddNewAlertPopup() {
      this.$store.commit(
        `${MODULE_POPUP}/${SET_ADD_NEW_ALERT_POPUP_SHOW}`,
        true
      )
    },

    showArchiveDialog(value) {
      if (value) {
        if (this.alerts.filter((el) => el.selected).length > 0) {
          this.$store.commit(
            `${MODULE_POPUP}/${SET_ARCHIVE_ALERT_POPUP_SHOW}`,
            value
          )
        }
      } else {
        this.$store.commit(
          `${MODULE_POPUP}/${SET_ARCHIVE_ALERT_POPUP_SHOW}`,
          value
        )
      }
    },
    confirmArhiveAlerts() {
      const selectedAlerts = this.items.filter((el) => el.selected)
      selectedAlerts.forEach((a) => {
        const payload = {
          id: a.id,
          isRead: a.isRead,
          archived: true
        }
        this.updateNotification(payload)
      })
      this.showArchiveDialog(false)
    },
    toggleMark(item) {
      const payload = {
        id: item.id,
        isRead: !item.isRead,
        archived: item.archived
      }
      this.updateNotification(payload)
    },
    selectedAlertMark() {
      const selectedAlerts = this.items.filter((el) => el.selected)
      selectedAlerts.forEach((a) => {
        const payload = {
          id: a.id,
          isRead: true,
          archived: a.archived
        }
        this.updateNotification(payload)
      })
    },
    async filterArchivedAlerts() {
      const payload = {}
      payload.filter = {
        archived: true,
        dateStart: this.fromDate,
        dateEnd: this.toDate
      }
      await this.getAlerts(payload)
    },
    changeAlertsPeriod() {
      this.alertsPeriod =
        this.convertedFromDate + this.dateSeparator + this.convertedToDate
      const payload = {}
      if (this.fromDate.length === 0 && this.toDate.length === 0) {
        this.getAlerts(payload)
        this.showSelectPeriod = false
      } else {
        payload.filter = {
          dateStart:
            this.fromDate.length === 0
              ? ''
              : date.extractDate(this.fromDate, 'YYYY-MM-DD'),
          dateEnd:
            this.toDate.length === 0
              ? ''
              : date.extractDate(this.toDate, 'YYYY-MM-DD')
        }
        switch (this.filterAlerts) {
          case ONLY_READ_ALERTS:
            payload.filter.isRead = true
            payload.filter.archived = false
            break
          case ONLY_UNREAD_ALERTS:
            payload.filter.isRead = false
            payload.filter.archived = false
            break
          case ARCHIVED_ALERTS:
            payload.filter.archived = true
            break
          default:
            break
        }
        this.getAlerts(payload)
        this.showSelectPeriod = false
      }
    },
    archiveAlert(alert) {
      this.alertDeleteDialog = true
      this.currentAlertToDelete = alert
    },
    confirmDeleteAlert() {
      const payload = {
        id: this.currentAlertToDelete.id,
        isRead: this.currentAlertToDelete.isRead,
        archived: true
      }
      this.updateNotification(payload)
      const index = this.alerts.findIndex(
        (el) => el.id === this.currentAlertToDelete.id
      )
      this.alerts.splice(index, 1)
      this.alertDeleteDialog = false
      // delete alert
    },
    archiveSelectedAlerts() {
      const aSelected = this.alerts.filter((el) => el.selected)
      aSelected.forEach((a) => {
        const payload = {
          id: a.id,
          isRead: a.isRead,
          archived: true
        }
        this.updateNotification(payload)
        const index = this.alerts.findIndex((el) => el.id === a.id)
        this.alerts.splice(index, 1)
      })
      this.showArchiveDialog(false)
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

    editUser(user) {
      this.$store.commit('user/set', {
        type: 'user',
        val: user
      })
      this.$router.push({ name: 'AddUser' })
    }
  }
}
</script>
<style lang="scss">
.select-period {
  position: absolute;
  top: 45px;
  right: 0px;
}
#action-archive {
  .icon-hint {
    display: none;
  }
  .triangle {
    display: none;
  }
  &:hover {
    .icon-hint {
      display: block;
      background-color: #313131;
      color: white;
      position: absolute;
      top: -35px;
      left: -50%;
      width: 50px;
      padding: 4px;
      border-radius: 4px;
    }
    .triangle {
      display: block;
      content: '';
      position: absolute;
      top: -40%;
      left: 0%;
      width: 0;
      height: 0;
      border-left: solid 10px transparent;
      border-right: solid 10px transparent;
      border-top: solid 10px #313131;
    }
  }
}
.markAsRead {
  .icon-hint {
    display: none;
  }
  .triangle {
    display: none;
  }
  &:hover {
    .icon-hint {
      display: block;
      background-color: #313131;
      color: white;
      position: absolute;
      top: -35px;
      left: -100%;
      width: 85px;
      padding: 4px;
      border-radius: 4px;
    }
    .triangle {
      display: block;
      content: '';
      position: absolute;
      top: -40%;
      left: 0%;
      width: 0;
      height: 0;
      border-left: solid 10px transparent;
      border-right: solid 10px transparent;
      border-top: solid 10px #313131;
    }
  }
}
#markAsUnread {
  .icon-hint {
    display: none;
  }
  .triangle {
    display: none;
  }
  &:hover {
    .icon-hint {
      display: block;
      background-color: #313131;
      color: white;
      position: absolute;
      top: -35px;
      left: -140%;
      width: 102px;
      padding: 4px;
      border-radius: 4px;
    }
    .triangle {
      display: block;
      content: '';
      position: absolute;
      top: -40%;
      left: 0%;
      width: 0;
      height: 0;
      border-left: solid 10px transparent;
      border-right: solid 10px transparent;
      border-top: solid 10px #313131;
    }
  }
}
#period > .v-text-field--outlined fieldset {
  color: white !important;
}
#date-period {
  .v-text-field--outlined fieldset {
    color: #d1d0d5 !important;
  }
  .v-btn--rounded {
    border-radius: 4px;
  }
  .v-date-picker-table--date .v-btn {
    height: 20px;
  }
  .v-date-picker-table .v-btn {
    font-size: 14px;
    font-weight: 600;
  }
  .v-date-picker-table {
    height: 175px;
  }
}
.cursor-point {
  cursor: pointer;
}
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
.font-bold {
  font-weight: bold;
}
</style>

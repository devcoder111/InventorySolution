<template>
  <v-container class="px-8 lighten-5 home-content" style="max-width: 100%">
    <v-row>
      <v-col cols="12">
        <v-breadcrumbs divider=">" class="px-0 pt-0 breadcrumbs">
          <v-breadcrumbs-item
            v-for="item in navSettingsOptions"
            :key="item.index"
          >
            <span class="text-breadcum-settings cursor-point"
              >{{ item.text }}
              <v-icon style="font-size: 1.2rem">mdi-chevron-right</v-icon></span
            >
          </v-breadcrumbs-item>
        </v-breadcrumbs>
      </v-col>
    </v-row>
    <p class="option-title">General Settings</p>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      @keydown.native.enter='validate'
      @submit.prevent="validate"
    >
      <v-row no-gutters class="pt-4">
        <v-col cols="12" md="8" style="padding-right: 45px">
          <div class="mb-4">
            <img
              class="image-icon left"
              src="@/assets/icons/svg/calendar.svg"
            />
            <span class="label-text">Date and Time Format</span>
            <div class="input-mb">
              <v-select
                tabindex='1'
                autofocus
                v-model="dateTimeFormat"
                :items="dateTimeFormats"
                item-text="value"
                item-value="id"
              >
              </v-select>
            </div>
            <div>
              <v-icon class="mr-2" style="color: #4b476d"
                >mdi-alert-circle</v-icon
              >
              <span style="color: #9089c6"
                >this date and time format will show up in your inventory
                system</span
              >
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="7">
          <div class="d-flex pt-10 justify-space-between">
            <v-btn
              @click="validate"
              depressed
              medium
              :disabled="errorsExist"
              dark
              class="save-folder-btn"
            >
              Save Changes
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import moment from 'moment'
export default {
  name: 'GeneralSettings',
  data() {
    return {
      navSettingsOptions: [
        {
          index: 1,
          text: 'Settings'
        },
        {
          index: 2,
          text: 'General Settings'
        }
      ],
      formats: [
        '25.01.2021 16:02 (DD.MM.YYYY HH:MI)',
        '25.01.2021 16,02 (DD.MM.YYYY HH,MI)',
        '01/25/2021 4:02 px (MM/DD/YYYY HH:MI A)',
        '25/01/2021 4:02:00 (DD/MM/YYYY HH:MI:SS)',
        '25-01-2021 4:02:00 (DD-MM-YYYY HH:MI:SS)',
        '25-01-2021 4.02.00 (DD-MM-YYYY HH.MI.SS)'
      ],
      dateTimeFormat: '',
      valid: true,
      dateTimeFormats: [],
      temp: [],
      tempDateTimeFormats: []
    }
  },
  computed: {
    errorsExist() {
      return false
    }
  },
  async created() {
    await this.$store.dispatch('user/profileSettings').then((res) => {
      console.log(res)
      this.tempDateTimeFormats =
        res.data.data.references.dateTimeFormat.availableValues
      this.dateTimeFormat = res.data.data.settings.dateTimeFormat.id
      console.log('TimeFormats', this.tempDateTimeFormats)
    })
    this.curDateTime()
  },

  methods: {
    ...mapActions('user', ['profileSettings']),
    validate() {
      const payload = {
        dateTimeFormat: this.dateTimeFormat,
        value: this.dateTimeFormats[this.dateTimeFormat - 1].value.match(/\((.+?)\)/)[1]
      }
      this.$store.dispatch('user/dateTimeFormatUpdate', payload).then((res) => {
        console.log('dd', res)
      })
    },
    curDateTime() {
      const now = Date.now()
      this.dateTimeFormats = []

      this.dateTimeFormats = this.tempDateTimeFormats
      console.log('curdatatime', this.dateTimeFormats)
      this.dateTimeFormats.map((dateTime, index) => {
        dateTime.value =
          moment.utc(now).local().format(dateTime.value) +
          ' (' +
          dateTime.value +
          ')'
      })
    }
  }
}
</script>

<style scoped></style>

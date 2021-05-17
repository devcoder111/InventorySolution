<template>
  <v-card
    id="period"
    flat
    class="d-flex flex-nowrap items-center mr-4"
    width="200px !important;"
    style="background-color: #f5f5f5; position: relative"
  >
    <span class="filter-title">Date:</span>
    <div
      class="calendar-input calendar-block d-flex flex-nowrap items-center mr-4"
    >
      <v-text-field
        class="calendar-input cursor-point"
        outlined
        hide-details
        dense
        readonly
        v-model="textDate"
        @click="showCalendar"
        @keyup.delete="clearPeriod"
        style="background-color: white"
      ></v-text-field>
      <div class="calendar-icon">
        <v-img
          max-height="20"
          max-width="20"
          class="ma-2 cursor-point"
          src="@/assets/icons/svg/date.svg"
          @click="showCalendar"
        ></v-img>
      </div>
    </div>
    <v-card
      id="date-period"
      class="select-period d-flex flex-nowrap pa-1"
      style="min-width: 350px; z-index: 2"
      v-if="visible"
    >
      <v-col cols="5">
        <v-date-picker
          v-model="calendarDate"
          no-title
          color="#7A71C0"
        ></v-date-picker>
        <v-btn
          class="mb-2"
          color="#7972c0"
          depressed
          normal
          dark
          style="margin-right: 8px; width: 100px; text-transform: none"
          @click="changePeriod"
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
          @click="hideCalendar"
          ><span style="color: rgb(121 114 192)">Cancel</span></v-btn
        >
      </v-col>
    </v-card>
  </v-card>
</template>

<script>
import moment from 'moment'
const CALENDAR_DATE_FORMAT = 'YYYY-MM-DD'
export default {
  name: 'FilterByPeriod',
  props: ['dateDefault'],
  data() {
    return {
      format: null,
      visible: false,
      date: this.dateDefault
        ? moment(this.dateDefault).format(CALENDAR_DATE_FORMAT)
        : null
    }
  },
  computed: {
    calendarDate: {
      get() {
        return this.date
      },
      set(value) {
        if (!this.date || moment(value).diff(moment(new Date())) <= 0) {
          this.date = value
        }
      }
    },
    textDate() {
      return this.formatDate(this.date, this.format)
    }
  },
  methods: {
    formatDate(date) {
      if (!date || !this.format) {
        return ''
      }
      return moment(date).format(this.format).slice(0, 10)
    },
    showCalendar() {
      this.visible = true
    },
    hideCalendar() {
      this.visible = false
    },
    clearPeriod() {
      this.date = null
      this.changePeriod()
    },
    changePeriod() {
      this.hideCalendar()
      this.$emit('on-change', this.date ? moment(this.date).toDate() : null)
    }
  },
  created() {
    this.$store.dispatch('getGeneralSettings').then((settings) => {
      this.format = settings?.dateTimeFormat?.value
      if (this.date) {
        this.changePeriod()
      }
    })
  }
}
</script>

<style scoped>
.v-text-field--outlined fieldset {
  color: red !important;
}
.cursor-point {
  cursor: pointer;
}
</style>

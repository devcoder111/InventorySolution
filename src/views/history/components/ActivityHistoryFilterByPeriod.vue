<template>
  <v-card
    id="period"
    flat
    class="d-flex flex-nowrap items-center mr-4"
    width="200px !important;"
    style="
            background-color: #f5f5f5;
            position: relative;
          "
  >
    <span class="text-body-1 mr-2 font-weight-medium" style="font-size: 0.95rem !important; font-weight: 400 !important;">Period:</span>
    <div class="calendar-block">
    <v-text-field
      class="calendar-input cursor-point"
      outlined
      hide-details
      dense
      readonly
      v-model="period"
      @click="showCalendar"
      @keyup.delete="clearPeriod"
      style="background-color: white;"
    ></v-text-field>
    <div class="calendar-icon">
    <v-img
      max-height="20"
      max-width="20"
      class="ma-2 cursor-point"
      src="@/assets/icons/svg/date.svg"
      @click="showCalendar"
    ></v-img></div>
    </div>
    <v-card
      id="date-period"
      class="select-period d-flex flex-nowrap pa-1"
      style="min-width: 750px; z-index: 9"
      v-if="visible"
    >
      <v-col cols="5">
        <v-text-field
          outlined
          hide-details
          dense
          v-model="textDateFrom"
          style="background-color: white"
          class="ml-4"
        ></v-text-field>
        <v-date-picker
          v-model="calendarDateFrom"
          no-title
          color="#7A71C0"
        ></v-date-picker>
      </v-col>
      <v-col cols="5">
        <v-text-field
          outlined
          hide-details
          dense
          v-model="textDateTo"
          style="background-color: white"
          class="ml-4"
        ></v-text-field>
        <v-date-picker
          v-model="calendarDateTo"
          no-title
          color="#7A71C0"
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
  name: 'ActivityHistoryFilterByPeriod',
  props: ['dateFromDefault', 'dateToDefault'],
  data() {
    return {
      format: null,
      period: '',
      visible: false,
      dateFrom: this.dateFromDefault ? moment(this.dateFromDefault).format(CALENDAR_DATE_FORMAT) : null,
      dateTo: this.dateToDefault ? moment(this.dateToDefault).format(CALENDAR_DATE_FORMAT) : null
    }
  },
  computed: {
    calendarDateFrom: {
      get() {
        return this.dateFrom
      },
      set(value) {
        if (!this.dateTo || moment(value).diff(moment(this.dateTo)) <= 0) {
          this.dateFrom = value
        }
      }
    },
    calendarDateTo: {
      get() {
        return this.dateTo
      },
      set(value) {
        if (!this.dateFrom || moment(value).diff(moment(this.dateFrom)) >= 0) {
          this.dateTo = value
        }
      }
    },
    textDateFrom() {
      return this.formatDate(this.dateFrom, this.format)
    },
    textDateTo() {
      return this.formatDate(this.dateTo, this.format)
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
      this.dateFrom = null
      this.dateTo = null
      this.changePeriod()
    },
    changePeriod() {
      if (this.textDateFrom === this.textDateTo) {
        this.period = this.textDateTo
      } else {
        this.period = (this.textDateFrom ? this.textDateFrom : '...') + ' - ' + (this.textDateTo ? this.textDateTo : '...')
      }
      this.hideCalendar()
      this.$emit('on-change', {
        dateFrom: this.dateFrom ? moment(this.dateFrom).toDate() : null,
        dateTo: this.dateTo ? moment(this.dateTo).toDate() : null
      })
    }
  },
  created() {
    this.$store.dispatch('getGeneralSettings').then((settings) => {
      this.format = settings?.dateTimeFormat?.value
      if (this.dateFrom || this.dateTo) {
        this.changePeriod()
      }
    })
  }
}
</script>

<style scoped>
  .calendar-block {
    position: relative;
    display: flex;
  }
  .calendar-block .calendar-icon {
    border: solid 1px #9e9e9e;
    border-radius: 0 3px 3px 0;
    border-left: none;
  }
  .calendar-input {
    cursor: pointer !important;
    border-radius: 3px 0 0 3px !important;
    border-color: rgb(239 239 239) !important;
  }
  .select-period {
    position: absolute;
    top: 45px;
    right: 0px;
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
  .v-application .primary--text {
    color: #7671bd !important;
    caret-color: #7671bd !important;
}
</style>

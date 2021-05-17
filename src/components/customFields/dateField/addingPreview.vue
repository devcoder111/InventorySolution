<template>
  <customFieldsAddingPreview
    :icon='"date.svg"'
    :name='currentName'
    :units='units'
  >
    <template :slot='"body"'>
      <div class="input-mb d-flex flex-nowrap">
        <v-menu v-model="menu1" :close-on-content-click="false" max-width="290">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              :value="computedDateFormattedMomentjs"
              readonly
              v-bind="attrs"
              v-on="on"
              @click:clear="exampleValue = null"
            >
              <template v-slot:append>
                <v-img
                  src="@/assets/icons/svg/date.svg"
                  height="20px"
                  width="20px"
                ></v-img>
              </template>
            </v-text-field>
          </template>
          <v-date-picker v-model="exampleValue" @change="menu1 = false"></v-date-picker>
        </v-menu>
      </div>
    </template>
  </customFieldsAddingPreview>
</template>

<script>
import moment from 'moment'
import { format, parseISO } from 'date-fns'
import customFieldsAddingPreview from '../customFieldsAddingPreview'
import { mapGetters } from 'vuex'
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    units: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    }
  },
  data: function() {
    return {
      exampleValue: format(parseISO(new Date().toISOString()), 'yyyy-MM-dd'),
      menu1: false,
      menu2: false,
      isValidatedD: false
    }
  },
  components: {
    customFieldsAddingPreview
  },
  computed: {
    ...mapGetters('user', ['getDateTimeFormat']),
    computedDateFormattedMomentjs() {
      if (this.value) return moment(this.value).format(this.getDateTimeFormat.split(' ')[0])
      return this.exampleValue ? moment(this.exampleValue).format(this.getDateTimeFormat.split(' ')[0]) : ''
    },
    currentName() {
      return this.name.length ? this.name : 'Calendar'
    }
  },
  methods: {
    isValidatedNameMethod() {
      const validRegEx = /\S+/
      this.isValidatedName = validRegEx.test(this.value)
    }
  }
}
</script>

<style lang="scss" module src="../commonStyles/index.module.scss"></style>

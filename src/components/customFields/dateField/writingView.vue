<template>
  <div class="mb-5">
    <img
      :class="[$style['image-icon'], 'left']"
      src="@/assets/icons/svg/date.svg"
    />
    <span :class="$style['label-text']">{{ name }}</span>

    <div class="input-mb d-flex flex-nowrap">
      <v-menu v-model="menu1" :close-on-content-click="false" max-width="290">
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            :value="computedDateFormattedMomentjs"
            readonly
            v-bind="attrs"
            v-on="on"
            @click:clear="date = null"
          >
            <template v-if='letDelete' slot='append'>
              <div
                :class='$style["delete-rounded-button"]'
                width='24'
                height='24'
                min-width='24'
                @click='$emit("delete")'
              >
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon
                      color='#c3c3c3'
                      v-bind="attrs"
                      v-on="on"
                    >
                      mdi-close-circle
                    </v-icon>
                  </template>
                  <span>Remove custom field</span>
                </v-tooltip>
              </div>
            </template>
          </v-text-field>
        </template>
        <v-date-picker v-model="date" @change="newVal=>{menu1 = false; $emit('newInput', newVal)}"></v-date-picker>
      </v-menu>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { format, parseISO } from 'date-fns'
import { writingViewBaseMixin } from '@/components/customFields/commonMixins/_helpers/writingViewBase.mixin'
import { mapGetters } from 'vuex'
export default {
  mixins: [writingViewBaseMixin],
  data: function () {
    return {
      nameRules: [(value) => !!value || 'Please Enter Date'],
      date: this.value || format(parseISO(new Date().toISOString()), 'yyyy-MM-dd'),
      menu1: false,
      menu2: false,
      isValidatedD: false
    }
  },
  computed: {
    ...mapGetters('user', ['getDateTimeFormat']),
    computedDateFormattedMomentjs() {
      return this.date ? moment(this.date).format(this.getDateTimeFormat.split(' ')[0]) : ''
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

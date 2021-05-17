<template>
  <v-dialog v-model="letShowPopup" persistent max-width="600">
    <v-card class="pa-4">
      <v-card-title
        class="headline d-flex pb-12 justify-center modalTitle grey--text lighten-1--text"
        style="color: #919196 !important"
        >Choose Custom Field</v-card-title
      >
      <v-row
        style="
          background-color: #f5f5f5;
          border: 1px solid #e7e7e7;
          border-radius: 8px;
        "
        class="mx-2 mb-8"
      >
        <v-col cols="12" class="pa-0">
          <v-data-table
            :headers="customFieldsTableHeaders"
            :items="filtredList"
            :page.sync="page"
            :items-per-page="5"
            item-key="id"
            hide-default-footer
            @page-count="pageCount = $event"
            class="cursor-point"
          >
            <template v-slot:[`item.selected`]="{ item }">
              <v-simple-checkbox
                v-model="item.selected"
                color="#7972c0"
                :ripple="false"
              ></v-simple-checkbox>
            </template>
            <template v-slot:[`item.name`]="{ item }">
              <div class="noteTruncate1">{{ item.name }}</div>
            </template>
            <template v-slot:[`item.description`]="{ item }">
              <div class="noteTruncate1">{{ item.fieldType }}</div>
            </template>
          </v-data-table>
        </v-col>
        <v-row class="justify-end">
          <v-col cols="auto">
            <v-pagination
              v-model="page"
              :length="pageCount"
              :total-visible="5"
              color="#7972C0"
            ></v-pagination>
          </v-col>
        </v-row>
      </v-row>
      <v-card-actions class="text-xs-center justify-center">
        <v-btn
          color="#7972c0"
          :disabled='!haveSelected'
          style="margin-right: 8px;
          width: 100px;
          text-transform: none;
          color:white;"
          @click="confirm"
          >Confirm</v-btn
        >
        <v-btn
          depressed
          normal
          color="white"
          @click="cancel"
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
</template>

<script>
import {
  MODULE_POPUP,
  MODULE_USER,
  SET_CUSTOM_FIELD_POPUP_SHOW
} from '@/store/constant/mutation-types'
import { mapActions } from 'vuex'

export default {
  name: 'ChooseCustomField',
  props: {
    haveItems: {
      type: Array
    }
  },
  data() {
    return {
      customFieldsList: [],
      customFieldsTableHeaders: [
        {
          text: '',
          align: 'start',
          sortable: false,
          value: 'selected'
        },
        { text: 'Name', value: 'name', sortable: true, align: 'start' },
        { text: 'Type', value: 'fieldType', sortable: true, align: 'start' }
      ],
      page: 1,
      pageCount: 0,
      letShowPopup: false
    }
  },
  async created() {
    const currentUserData = this.$store.getters[`${MODULE_USER}/user`]
    const inventoryId = currentUserData.inventories[0]
    const payload = {
      inventoryId: inventoryId
    }

    this.customFieldsList = await this.getCustomFieldsList(payload)
  },
  watch: {
    showPopup(v) {
      if (this.customFieldsList.length) {
        this.letShowPopup = v
      } else {
        this.letShowPopup = false
        this.$store.commit(
          `${MODULE_POPUP}/${SET_CUSTOM_FIELD_POPUP_SHOW}`,
          false
        )
        this.$store.dispatch('showSubmitFormErrorPopup', {
          title: 'Warning',
          message: "You're haven't added custom fields"
        })
      }
    }
  },
  computed: {
    showPopup() {
      return this.$store.getters[`${MODULE_POPUP}/showChooseCustomFieldPopup`]
    },
    filtredList() {
      return this.customFieldsList.filter((item) => {
        for (const el in this.haveItems) {
          if (this.haveItems[el] === item.id) return
        }
        return true
      })
    },
    haveSelected() {
      return !!this.customFieldsList.filter(item => item.selected).length
    }
  },
  methods: {
    ...mapActions('customField', ['getCustomFieldsList']),
    confirm() {
      const selectedCustomFields = this.customFieldsList.filter(
        (customField) => customField.selected
      )
      this.$emit('selected-fields', selectedCustomFields)
      this.$store.commit(
        `${MODULE_POPUP}/${SET_CUSTOM_FIELD_POPUP_SHOW}`,
        false
      )

      // this.$router.back()
    },
    cancel() {
      this.$store.commit(
        `${MODULE_POPUP}/${SET_CUSTOM_FIELD_POPUP_SHOW}`,
        false
      )
    }
  }
}
</script>

<style lang="stylus">
.v-data-table-header, .v-data-footer {
  background-color: #f5f5f5;
}
</style>

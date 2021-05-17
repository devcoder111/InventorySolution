<template>
  <v-container class="px-8 lighten-5 home-content" style="max-width: 100%;">
    <v-row>
      <v-col>
        <v-breadcrumbs divider=">" class="px-0 pt-0">
          <v-breadcrumbs-item
            v-for="item in navSettingsOptions"
            :key="item.index"
          >
            <span class="text-breadcum-settings cursor-point">
              {{ item.text }}
              <v-icon style="font-size: 1.2rem">mdi-chevron-right</v-icon>
            </span>
          </v-breadcrumbs-item>
        </v-breadcrumbs>
      </v-col>
    </v-row>
    <p class="option-title">Custom Fields</p>
    <v-row
      class="mx-0 my-4"
      style="border: solid 1px #fec111; border-radius: 4px"
      v-if="letShowUpdatePlanMessage"
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
              You can add 20 cusom fields on the {{currentUserPlan}} plan.
              <b>{{items.length}} of 20 custom fields added. </b>
              <span class='update-plan-link' @click='showUpgradeSubscriptionPlanPopup'>Update</span>
            </span>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <div class='table-wrapper'>
      <div class='my-0'>
        <v-col cols="12" class='py-0'>
          <v-card class="pa-4" style="background-color: #f5f5f5" flat>
            <v-row class="px-4 align-center" style='padding-top: 4px; padding-bottom: 4px'>
              <button
                role='button'
                class='delete-button'
                v-if='selectedItems.length'
                @click='customFieldsDeleteDialog=true'
              >
                <v-img
                  max-height="20"
                  max-width="20"
                  class="mr-2 cursor-pointer"
                  src="@/assets/icons/svg/delete.svg"
                />
                <span
                  class="text-subtitle-2 font-weight-bold cursor-pointer"
                  style="color: #9e9bd2"
                >
                Delete
              </span>
              </button>
              <v-spacer />
              <v-btn
                v-if='items.length<=20'
                @click='$emit("changeType", "customFieldsAdding", null)'
                depressed
                style="
                  background-color: #7972c0;
                  color: white;
                  font-weight: 600;
                  text-transform: capitalize;
                  font-size: 14px;
                "
              >
                <span class="font-weight-bold mr-2" style="font-size: 20px">+</span>
                Add Custom Field
              </v-btn>
            </v-row>
          </v-card>
        </v-col>
      </div>
      <v-divider />
      <div class="justify-space-between">
        <v-col cols='12' class="px-0">
          <v-data-table
            :headers="headers"
            :items="items"
            :page.sync="page"
            :items-per-page="itemsPerPage"
            :custom-filter="filterOneColumnTable"
            item-key="created"
            @page-count="pageCount = $event"
            class="cursor-point"
            hide-default-footer
          >
            <template v-slot:no-results>
              <p class="text-h5 mt-16">There is no custom fields created</p>
            </template>
            <template v-slot:[`item.selected`]="{ item }">
              <v-simple-checkbox
                v-model="item.selected"
                color="#7972c0"
                :ripple="false"
              ></v-simple-checkbox>
            </template>
            <template v-slot:[`item.visibility`]="{ item }">
              <v-icon
                medium
                light
                @click='changeActivityItem(item)'
                :class="{'visibility-item-hidden':!item.active}"
              >
                {{ item.active?"mdi-eye":"mdi-eye-off" }}
              </v-icon>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-row class="flex-nowrap">
                <v-col cols="4" class="px-0">
                  <img
                    class="mr-1 cursor-pointer"
                    style="height: 16px; width: 16px"
                    src="@/assets/icons/svg/draw.svg"
                    @click.passive='$emit("changeType", "customFieldsEdit", item.id)'
                  />
                </v-col>
                <v-col cols="4" class="px-0">
                  <img
                    style="height: 16px; width: 16px"
                    src="@/assets/icons/svg/delete.svg"
                    class="cursor-pointer"
                    @click.passive="manualDeleteItem(item)"
                  />
                </v-col>
              </v-row>
            </template>
          </v-data-table>
        </v-col>
      </div>
      <v-row class='pa-4'>
        <v-col cols="auto">
          <span
            class="text-subtitle-2 font-weight-medium mr-2"
          >
            Showing
          </span>
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
                v-for="(item, index) in itemsPerPageOptions"
                :key="index"
                link
                @click="itemsPerPage = item"
              >
                <v-list-item-title>{{ item }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <span class="text-subtitle-2 font-weight-medium ml-2"
          >Entries</span
          >
        </v-col>
        <v-spacer />
        <v-col cols="auto">
          <v-pagination
            v-model="page"
            :length="pageCount"
            :total-visible="5"
            color="#7972C0"
          ></v-pagination>
        </v-col>
      </v-row>
    </div>
    <!-- delete custom fields modal -->
    <v-dialog v-model="customFieldsDeleteDialog" persistent max-width="768">
      <v-card style="padding: 30px">
        <v-card-title
          class="headline d-flex justify-center lighten-1--text"
          style="color: #919196 !important"
        >Are you sure want to delete custom field
          "{{ selectedItems.length?selectedItems[0].name:'' }}"?
        </v-card-title>
        <v-card-text
          v-if="selectedItems.length && selectedItems[0].used"
          class="d-flex justify-center red--text"
          style="font-size: 20px"
        >
          Attention! This custom field is used in items. When a custom field is removed, it will also remove from items.
        </v-card-text>
        <v-card-actions class="text-xs-center justify-center">
          <v-btn
            @click='deleteItem'
            color="#7972c0"
            depressed
            normal
            dark
            style="margin-right: 8px; width: 100px; text-transform: none"
          >
            Delete
          </v-btn>
          <v-btn
            depressed
            normal
            color="white"
            @click="closeDeletingDialog"
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
  </v-container>
</template>
<script>
import { firstCharUppercase } from '@/utils'
import { mapActions } from 'vuex'
import services from '@/services/customField'

export default {
  name: 'customFieldsTable',
  data: function() {
    return {
      navSettingsOptions: [
        {
          index: 1,
          text: 'Settings'
        },
        {
          index: 2,
          text: 'Custom Fields'
        }
      ],
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      itemsPerPageOptions: [5, 10, 20, 25, 50],
      items: [],
      headers: [
        {
          text: '',
          align: 'start',
          sortable: false,
          value: 'selected'
        },
        {
          text: 'Name',
          value: 'name',
          sortable: true,
          align: 'start',
          width: 150
        },
        {
          text: 'Visible in List view',
          value: 'visibility',
          sortable: false,
          align: 'center',
          width: 150
        },
        { text: 'Type', value: 'fieldType', sortable: true, align: 'start' },
        { text: 'Applicable to', value: 'applyTo', sortable: true, align: 'start' },
        { text: '', value: 'actions', sortable: false, align: 'end' }
      ],
      manualDeletingItem: false,
      customFieldsDeleteDialog: false,
      currentUserPlan: '',
      UpgradePlanPopupIsOpen: false
    }
  },
  computed: {
    selectedItems() {
      return this.items?.filter(item => item.selected)
    },
    letShowUpdatePlanMessage() {
      const plan = this.currentUserPlan
      if (plan === 'Free' || plan === 'No Plan' || plan === 'Business') return true
      return false
    }
  },
  methods: {

    filterOneColumnTable(value, search, item) {
      return (
        value != null &&
        search != null &&
        typeof value === 'string' &&
        (item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.description.toLowerCase().includes(search.toLowerCase()))
      )
    },
    manualDeleteItem(item, i) {
      this.items.forEach(el => {
        el.selected = false
      })
      item.selected = true
      this.customFieldsDeleteDialog = true
      this.manualDeletingItem = true
    },
    closeDeletingDialog() {
      if (this.manualDeletingItem) {
        this.items.forEach(item => { if (item.selected) item.selected = false })
      }
      this.manualDeletingItem = false
      this.customFieldsDeleteDialog = false
    },
    async deleteItem() {
      const response = await services.deleteCustomField({ id: this.selectedItems[0].id })

      console.log(response, this.selectedItems[0])

      if (response.data.error.type === 200) {
        this.items.splice(this.items.findIndex(el => el.id === this.selectedItems[0].id), 1)
        if (this.selectedItems.length) {
          this.customFieldsDeleteDialog = false
          this.customFieldsDeleteDialog = true
        } else {
          this.customFieldsDeleteDialog = false
        }
      }
    },
    async changeActivityItem(item) {
      await services.changeCustomField({ id: item.id, active: !item.active })
      item.active = !item.active
    },
    ...mapActions([
      'showUpgradeSubscriptionPlanPopup'
    ])
  },
  created() {
    this.currentUserPlan = JSON.parse(localStorage.getItem('curUserData')).plan.name
  },
  async mounted() {
    const inventoryId = await this.$store.getters['user/usersInventories'][0]
    const result = await services.getCustomFieldsList({ inventoryId: inventoryId })
    const templates = result.data.data
    const resultArray = []
    for (let i = 0; i < templates.length; i++) {
      const currentItem = {
        active: templates[i].active,
        id: templates[i].id,
        selected: false,
        name: templates[i].name,
        fieldType: templates[i].fieldType,
        applyTo: firstCharUppercase(templates[i].applyTo.split('_').join(' ')),
        used: templates[i].used
      }
      resultArray.push(currentItem)
    }
    this.items = resultArray
  }
}
</script>

<style lang='scss'>
  .v-data-table-header{
    background-color: #f5f5f5;
  }
  .v-data-footer{
    background-color: #f5f5f5;
  }
  .theme--light .v-data-table__wrapper tbody tr:hover {
    background-color: rgba(121, 114, 192, 0.2);
  }
  .table-wrapper {
    border: 1px solid rgba(0, 0, 0, 0.12);
    border-radius: 5px;
  }
  .visibility-item-hidden {
    opacity: 0.5;
  }
  .delete-button {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    outline: none;
    padding: 5px;
    background-color: transparent;
    transition: 0.2s linear;
    border-radius: 3px;
    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }
  }
  .v-application .update-plan-link {
    display: inline-block;
    color: #fec111;
    text-decoration: underline;
    font-style: italic;
    text-transform: uppercase;
    cursor: pointer;
    &:hover {
      text-decoration: none;
    }
  }
</style>

<template>
  <v-container class="inventory-container">
    <v-row
      class="justify-start align-start pa-2"
      style="background-color: #efefef; position: relative; margin: 0 -12px"
    >
      <v-col class="py-0" cols="12" sm="4">
        <span class="text-h5 main-title">Inventory</span>
      </v-col>
      <v-col class="py-1" cols="12" sm="4" style="transform: translate(0, 50%)">
        <span class="mr-2" v-if="showSearchLabel" style="float: right">
          Folders:
          {{ filteredItems.filter((it) => it.type === 'folder').length }} |
          Items: {{ filteredItems.filter((it) => it.type === 'Item').length }}
        </span>
      </v-col>
      <v-col class="py-2 my-auto" cols="12" sm="4">
        <v-row class="flex-nowrap align-center">
          <v-text-field
            v-model="search"
            placeholder="Search folders and items..."
            dense
            filled
            Outlined
            single-line
            hide-details="auto"
            background-color="white"
            prepend-inner-icon="mdi-magnify"
          />
        </v-row>
      </v-col>
    </v-row>
    <v-card class="mx-4 mt-6 pa-4 table-wrapper" flat>
      <v-row class="px-4">
        <v-breadcrumbs divider=">" class="px-0 pt-0">
          <v-breadcrumbs-item
            v-for="item in navTableItems"
            :key="item.index"
            @click.native="clickBreadCum(item)"
          >
            <span
              class="font-weight-light cursor-point"
              style="font-size: 1.3rem"
              >{{ item.text }}
              <v-icon style="font-size: 1.3rem">mdi-chevron-right</v-icon></span
            >
          </v-breadcrumbs-item>
        </v-breadcrumbs>
      </v-row>
      <v-row class="px-4 align-center">
        <v-img
          max-height="20"
          max-width="20"
          class="mr-2 cursor-point"
          @click="$router.push({ name: 'CreateFolder' })"
          src="@/assets/icons/svg/add-folder.svg"
        ></v-img>
        <span
          class="text-subtitle-2 cursor-point"
          @click="$router.push({ name: 'CreateFolder' })"
          >Add Folder</span
        >
        <v-divider vertical class="mx-4 my-1" />
        <v-img
          max-height="20"
          max-width="20"
          class="mr-2 cursor-point"
          @click="$router.push({ name: 'CreateItem' })"
          src="@/assets/icons/svg/add-item.svg"
        ></v-img>
        <span
          class="text-subtitle-2 cursor-point"
          @click="$router.push({ name: 'CreateItem' })"
          >Add Item</span
        >
        <v-divider vertical class="mx-4 my-1" v-if="!isMobile" />
        <v-col class="col-12" v-if="isMobile"></v-col>
        <v-img
          max-height="20"
          max-width="20"
          class="mr-2 cursor-point"
          src="@/assets/icons/svg/export.svg"
        ></v-img>
        <span class="text-subtitle-2 cursor-point" @click="exportItems()"
          >Export</span
        >
        <v-divider vertical class="mx-4 my-1" />
        <v-img
          max-height="20"
          max-width="20"
          class="mr-2 cursor-point"
          src="@/assets/icons/svg/import2.svg"
        ></v-img>
        <span class="text-subtitle-2 cursor-point" @click="importItems()"
          >Import</span
        >
        <span v-if="items.filter((item) => item.selected).length > 0">
          <v-row
            class="flex-nowrap pa-0 align-center ml-0"
            :class="{ 'mt-4': isMobile }"
          >
            <v-divider vertical class="mx-4 my-1" v-if="!isMobile" />
            <v-img
              max-height="20"
              max-width="20"
              class="mr-2 cursor-point"
              src="@/assets/icons/svg/move.svg"
            ></v-img>
            <span
              class="text-subtitle-2 py-2 cursor-point"
              @click="moveToAnotherFolder()"
              >Move to folder</span
            >
            <v-divider vertical class="mx-4 my-1" />
            <v-img
              max-height="20"
              max-width="20"
              class="mr-2 cursor-point"
              @click="cloneMultiItemsDialog = true"
              src="@/assets/icons/svg/copy.svg"
            ></v-img>
            <span
              class="text-subtitle-2 cursor-point"
              @click="cloneMultiItemsDialog = true"
              >Clone</span
            >
            <v-divider vertical class="mx-4 my-1" />
            <v-img
              max-height="20"
              max-width="20"
              class="mr-2 cursor-point"
              @click="multiItemDelete"
              src="@/assets/icons/svg/delete.svg"
            ></v-img>
            <span class="text-subtitle-2 cursor-point" @click="multiItemDelete"
              >Delete</span
            >
          </v-row>
        </span>
        <v-spacer />
        <v-col class="col-12" v-if="isMobile"></v-col>
        <span class="text-body-1 mr-2 font-weight-medium">Show:</span>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              outlined
              v-bind="attrs"
              v-on="on"
              border-color="black"
              color="#7972c0"
              style="width: 200px !important"
            >
              <span style="color: #8a8a8a" v-if="selected_option">
                {{ selected_option }}
              </span>
              <span v-else style="color: #8a8a8a"> Items & Folders </span>

              <v-icon right> mdi-chevron-down </v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              link
              v-for="(item, index) in ['Items & Folders', 'Items', 'Folders']"
              :key="index"
              @click="filterItemsFolders(item)"
            >
              <v-list-item-title>{{ item }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-row>
      <v-divider class="mt-4" />
      <v-row class="justify-space-between">
        <v-col cols="12" class="px-0">
          <v-data-table
            :headers="headers"
            :items="items"
            :search="search"
            :page.sync="page"
            :items-per-page="itemsPerPage"
            :custom-filter="filterOneColumnTable"
            item-key="created"
            @current-items="getItemsFiltered($event)"
            hide-default-footer
            @page-count="pageCount = $event"
            @click:row="handleClickTable"
            class="cursor-point"
          >
            <template v-slot:no-results>
              <p class="text-h5 mt-16">No Items or Folders found</p>
            </template>
            <template
              v-if="filteringItemsTable"
              class="justify-center"
              v-slot:body
            >
              <div class="center-text text-h5">Searching...</div>
              <circle-progress class="mt-16" />
            </template>
            <template v-slot:[`item.name`]="{ item }">
              <span v-html="highlightText(item.name)"> </span>
            </template>
            <template v-slot:[`item.selected`]="{ item }">
              <v-simple-checkbox
                v-model="item.selected"
                color="#7972c0"
                :ripple="false"
              ></v-simple-checkbox>
            </template>
            <template v-slot:[`item.images`]="{ item }">
              <v-img
                v-if="item.type === 'folder'"
                style="height: 32px; width: 32px"
                src="@/assets/folder-color.svg"
              />
              <v-img
                v-else-if="item.type === 'Item' && item.images.length > 0"
                style="height: 32px; width: 32px; border-radius: 50%"
                :src="item.images[0]"
              />
              <v-img
                v-else-if="item.type === 'Item' && item.images.length === 0"
                style="height: 32px; width: 32px"
                src="@/assets/images/trolley-cart.png"
              />
            </template>
            <template v-slot:[`item.alerts`]="{ item }">
              <div style="position: relative" id="setAlertText">
                <v-img
                  v-if="
                    item.type === 'Item' &&
                    item.alert !== null &&
                    item.alert.fire !== null &&
                    item.alert.hasUnread
                  "
                  style="height: 24px; width: 24px"
                  src="@/assets/icons/svg/alert-unread.svg"
                  @click.stop="$router.push({ name: 'Alerts' })"
                />
                <span class="icon-hint">unread alert</span>
                <span class="triangle"></span>
              </div>
              <div style="position: relative" id="setAlertText">
                <v-img
                  v-if="
                    item.type === 'Item' &&
                    item.alert !== null &&
                    item.alert.fire !== null &&
                    !item.alert.hasUnread
                  "
                  style="height: 24px; width: 24px"
                  src="@/assets/icons/svg/alert-read.svg"
                  @click.stop="$router.push({ name: 'Alerts' })"
                />
                <span class="icon-hint">read alert</span>
                <span class="triangle"></span>
              </div>
              <div style="position: relative" id="setAlertText">
                <v-img
                  v-if="
                    item.type === 'Item' &&
                    item.alert !== null &&
                    item.alert.fire === null
                  "
                  style="height: 24px; width: 24px"
                  src="@/assets/icons/svg/alert-set.svg"
                  @click.stop="$router.push({ name: 'Alerts' })"
                />
                <span class="icon-hint">installed alert</span>
                <span class="triangle"></span>
              </div>
              <div style="position: relative" id="setAlertText">
                <v-img
                  v-if="item.alert === null"
                  style="height: 24px; width: 24px"
                  src="@/assets/icons/svg/alert-no-set.svg"
                />
                <span class="icon-hint"> alert not set</span>
                <span class="triangle"></span>
              </div>
            </template>
            <template v-slot:[`item.description`]="{ item }">
              <span
                class="noteTruncate"
                v-html="highlightText(item.description)"
              >
              </span>
              <!--                  <div class="noteTruncate">{{ item.description }}</div>-->
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-row class="flex-nowrap">
                <v-col cols="4" class="px-0">
                  <img
                    class="mr-1 cursor-point"
                    style="height: 16px; width: 16px"
                    src="@/assets/icons/svg/draw.svg"
                    @click.stop="editItemTable(item)"
                  />
                </v-col>
                <v-col cols="4" class="px-0">
                  <img
                    class="mr-1 cursor-point"
                    style="height: 16px; width: 16px"
                    src="@/assets/icons/svg/copy.svg"
                    @click.stop="copyItem(item)"
                  />
                </v-col>
                <v-col cols="4" class="px-0">
                  <img
                    style="height: 16px; width: 16px"
                    src="@/assets/icons/svg/delete.svg"
                    class="cursor-point"
                    @click.stop="deleteItem(item)"
                  />
                </v-col>
              </v-row>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="auto">
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
                v-for="(item, index) in itemsPerPageOptions"
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
    </v-card>
    <!-- clone items modal -->
    <v-dialog v-model="cloneItemDialog" persistent max-width="768">
      <v-form
        class="cloneItem-form"
        ref="cloneItemForm"
        v-model="quantityValid"
        lazy-validation
      >
        <v-card style="padding: 30px">
          <v-card-title
            class="headline d-flex justify-center lighten-1--text"
            style="color: #919196 !important"
            >Cloning an Item "{{ selectedItem.name }}"
          </v-card-title>
          <v-card-text class="d-flex justify-center" style="font-size: 20px"
            >How many clones you want to create? (max. 30)
          </v-card-text>
          <div style="width: 30%; margin: auto">
            <v-text-field
              dense
              @blur="isValidatedCountCloneMethod"
              :rules="countCloneRules"
              class="r-field item-name-field"
              v-model.number="quantity"
              single-line
              @keypress="isArrow($event)"
              type="number"
              :min="1"
              :max="30"
            ></v-text-field>
          </div>
          <v-card-actions class="text-xs-center justify-center">
            <v-btn
              color="#7972c0"
              depressed
              normal
              dark
              style="margin-right: 8px; width: 100px; text-transform: none"
              @click="cloneValidate"
              >Clone</v-btn
            >
            <v-btn
              depressed
              normal
              color="white"
              @click="cloneItemDialog = false"
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
      </v-form>
    </v-dialog>
    <!-- clone multi items and folders modal -->
    <v-dialog v-model="cloneMultiItemsDialog" persistent max-width="768">
      <v-form
        class="cloneItem-form"
        ref="cloneItemForm"
        v-model="quantityValid"
        lazy-validation
      >
        <v-card style="padding: 30px">
          <v-card-title
            class="headline d-flex justify-center lighten-1--text"
            style="color: #919196 !important"
            >Are you sure clone
            {{ selectedItems.filter((item) => item.type === 'folder').length }}
            folders and
            {{ selectedItems.filter((item) => item.type === 'Item').length }}
            items
          </v-card-title>
          <v-card-text class="d-flex justify-center" style="font-size: 20px"
            >How many clones you want to create? (max. 30) {{ quantity }}
          </v-card-text>
          <div style="width: 30%; margin: auto">
            <v-text-field
              dense
              @blur="isValidatedCountCloneMethod"
              :rules="countCloneRules"
              class="r-field item-name-field"
              v-model.number="quantity"
              single-line
              type="number"
              :min="1"
              :max="30"
            ></v-text-field>
          </div>
          <v-card-actions class="text-xs-center justify-center">
            <v-btn
              color="#7972c0"
              depressed
              normal
              dark
              :readonly="!quantity"
              style="margin-right: 8px; width: 100px; text-transform: none"
              @click="cloneValidate"
              >Clone</v-btn
            >
            <v-btn
              depressed
              normal
              color="white"
              @click="cloneMultiItemsDialog = false"
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
      </v-form>
    </v-dialog>
    <!-- delete multi folders and items -->
    <v-dialog v-model="multiItemDeleteDialog" persistent max-width="768">
      <v-card style="padding: 30px">
        <v-card-title
          class="headline d-flex justify-center lighten-1--text"
          style="color: #919196 !important"
          >Are you sure to delete selected Folders and Items
        </v-card-title>
        <v-card-text
          v-if="selectedItem.type == 'folder'"
          class="d-flex justify-center red--text"
          style="font-size: 20px"
          >Attention! All contents of the folder will be deleted</v-card-text
        >
        <v-card-actions class="text-xs-center justify-center">
          <v-btn
            color="#7972c0"
            depressed
            normal
            dark
            style="margin-right: 8px; width: 100px; text-transform: none"
            @click="deleteMultiItemModal"
            >Delete</v-btn
          >
          <v-btn
            depressed
            normal
            color="white"
            @click="multiItemDeleteDialog = false"
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
    <!-- delete folder or item modal -->
    <v-dialog v-model="folderDeleteDialog" persistent max-width="768">
      <v-card style="padding: 30px">
        <v-card-title
          class="headline d-flex justify-center lighten-1--text"
          style="color: #919196 !important"
          >Are you sure to delete
          {{ selectedItem.type == 'folder' ? 'Folder' : 'Item' }} "
          {{ selectedItem.name }} "?
        </v-card-title>
        <v-card-text
          v-if="selectedItem.type == 'folder'"
          class="d-flex justify-center red--text"
          style="font-size: 20px"
          >Attention! All contents of the folder will be deleted</v-card-text
        >
        <v-card-actions class="text-xs-center justify-center">
          <v-btn
            color="#7972c0"
            depressed
            normal
            dark
            style="margin-right: 8px; width: 100px; text-transform: none"
            @click="deleteItemModal"
            >Delete</v-btn
          >
          <v-btn
            depressed
            normal
            color="white"
            @click="folderDeleteDialog = false"
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
    <!-- List of folders -->
    <v-dialog v-model="moveDialog" width="650">
      <v-card class="pa-4">
        <v-row class="justify-center px-4">
          <v-col cols="auto" class="pa-0 mb-4">
            <span class="text-h5">
              <span v-if="dataSelectedItems.length < 2"
                >Moving an Folder [</span
              >
              <span v-else>Move the following folders [</span>
              <span
                v-for="(item, index) in dataSelectedItems"
                :key="`mf` + index"
                class="font-weight-medium"
              >
                {{ item.name }}
                <span v-if="dataSelectedItems[index + 1]">,</span> </span
              >]
            </span>
          </v-col>
        </v-row>
        <v-row class="justify-center">
          <v-col cols="auto" class="pa-0 mb-4">
            <span class="text-h5"
              >Choose destination folder
              <span v-if="currentFolderToMove">{{
                currentFolderToMove.name
              }}</span></span
            >
          </v-col>
        </v-row>
        <v-row
          style="
            background-color: #f5f5f5;
            border: 1px solid #e7e7e7;
            border-radius: 8px;
          "
          class="mx-2 mb-8"
        >
          <v-col
            cols="12"
            class="py-1 px-4"
            style="border-bottom: 1px solid #e7e7e7"
          >
            <v-breadcrumbs divider=">" class="pa-0 breadcrumbs">
              <v-breadcrumbs-item
                v-for="item in navMoveFolder"
                :key="`mi` + item.index"
                @click.native="clickMoveBreadCum(item)"
              >
                <span class="text-subtitle-1 cursor-point"
                  >{{ item.text }} ></span
                >
              </v-breadcrumbs-item>
            </v-breadcrumbs>
          </v-col>
          <v-col cols="12" class="pa-0">
            <v-data-table
              :headers="moveToFolderTableHeaders"
              :items="moveTableItems"
              :page.sync="page"
              :items-per-page="5"
              item-key="id"
              hide-default-footer
              @page-count="pageCount = $event"
              @click:row="handleClickMoveTable"
              class="cursor-point"
            >
              <template v-slot:[`item.selected`]="{}" />
              <template v-slot:[`item.images`]="{ item }">
                <v-img
                  v-if="item.type === 'folder'"
                  style="height: 32px; width: 32px"
                  src="@/assets/folder-color.svg"
                />
                <v-img
                  v-else
                  style="height: 32px; width: 32px"
                  :src="item.images[0]"
                />
              </template>
              <template v-slot:[`item.description`]="{ item }">
                <div class="noteTruncate1">{{ item.description }}</div>
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
        <v-row class="justify-center">
          <v-btn
            color="#7972c0"
            depressed
            normal
            dark
            style="margin-right: 8px; width: 100px; text-transform: none"
            @click="moveFolder"
          >
            Select
          </v-btn>
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
            @click="moveDialog = false"
          >
            Cancel
          </v-btn>
        </v-row>
      </v-card>
    </v-dialog>
    <ExportConfirmPopup />
    <ImportConfirmPopup />
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
import { mapActions } from 'vuex'
import CustomCircleProgressBar from '@/components/CustomCircleProgressBar'
import ExportConfirmPopup from '@/components/popup/ExportConfirmPopup'
import ImportConfirmPopup from '@/components/popup/ImportConfirmPopup'
import {
  MODULE_POPUP,
  SET_EXPORT_CONFIRM_POPUP_SHOW,
  SET_EXPORT_CONFIRM_POPUP_TITLE,
  SET_EXPORT_CONFIRM_POPUP_MESSAGE,
  SET_EXPORT_CONFIRM,
  SET_IMPORT_CONFIRM_POPUP_SHOW,
  SET_IMPORT_CONFIRM_POPUP_TITLE,
  SET_IMPORT_CONFIRM_POPUP_MESSAGE,
  SET_IMPORT_CONFIRM,
  SET_PENDING_ALERT_TO_SAVE,
  MODULE_INVENTORY
} from '@/store/constant/mutation-types'
export default {
  name: 'InventoryTest',
  components: {
    'circle-progress': CustomCircleProgressBar,
    ExportConfirmPopup,
    ImportConfirmPopup
  },
  data() {
    return {
      quantityValid: true,
      countCloneRules: [
        (v) => !!v || 'This field is Required',
        (v) => v > 0 || 'This field is not negotive',
        (v) => v <= 30 || 'Max is 30'
      ],
      itemOption: '',
      navTableItems: [
        {
          index: 1,
          text: 'Inventory',
          disabled: false
        }
      ],
      navMoveFolder: [
        {
          index: 1,
          text: 'Inventory',
          disabled: false
        }
      ],
      dropdown_options: ['Items & Folders', 'Items', 'Folders'],
      selected_option: '',
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      itemsPerPageOptions: [5, 10, 20, 25, 50],
      search: '',
      items: [],
      headers: [
        {
          text: '',
          align: 'start',
          sortable: false,
          value: 'selected'
        },
        { text: '', value: 'images', sortable: false, align: 'start' },
        { text: '', value: 'alerts', sortable: false, align: 'start' },
        {
          text: 'Name',
          value: 'name',
          sortable: true,
          align: 'start',
          width: 150
        },
        { text: 'Note', value: 'description', sortable: true, align: 'start' },
        { text: 'Type', value: 'type', sortable: true, align: 'start' },
        { text: 'Quantity', value: 'quantity', sortable: true, align: 'start' },
        { text: 'Price, $, ', value: 'price', sortable: true, align: 'start' },
        { text: 'Created', value: 'createdAt', sortable: true, align: 'start' },
        {
          text: 'Last Updated',
          value: 'updatedAt',
          sortable: true,
          align: 'start'
        },
        { text: '', value: 'actions', sortable: false, align: 'start' }
      ],
      moveTableItems: [],
      moveToFolderTableHeaders: [
        {
          text: '',
          align: 'start',
          sortable: false,
          value: 'selected'
        },
        { text: '', value: 'images', sortable: false, align: 'start' },
        { text: 'Name', value: 'name', sortable: true, align: 'start' },
        { text: 'Note', value: 'description', sortable: true, align: 'start' }
      ],
      filteredItems: [],
      savedItems: [],
      moveDialog: false,
      disabledCheckboxes: false,
      currentFolderToMove: null,
      loadingItemsTable: false,
      filteringItemsTable: false,
      showSearchLabel: false,
      folderDeleteDialog: false,
      multiItemDeleteDialog: false,
      cloneItemDialog: false,
      cloneMultiItemsDialog: false,
      selectedFolder: [],
      selectedItem: [],
      quantity: 1,
      inventoryFlag: false,
      quantityErrCnt: 0,
      itemToClone: null,
      dateTimeFormat: ''
    }
  },
  mounted() {},

  async created() {
    // await this.showAllCategories('general')
    await this.$store.dispatch('user/profileSettings').then((res) => {
      this.dateTimeFormat = res.data.data.settings.dateTimeFormat.value
    })
    await this.$store.commit(
      `${MODULE_POPUP}/${SET_PENDING_ALERT_TO_SAVE}`,
      null
    )
    this.items = []
    const ob = this.$store.state.inventory.navTableItems
    if (this.$store.state.inventory.inventoryNavFlag === true) {
      console.log('inventoryNavFlag is true')
      this.items = []
      this.showAllCategories('general')
      this.$store.commit('inventory/set', {
        type: 'inventoryNavFlag',
        val: false
      })
    } else if (ob.length > 1) {
      this.navTableItems = ob
      await this.showCategory(ob[ob.length - 1].categoryId, 'general')
      this.savedItems = []
    } else {
      this.showAllCategories('general')
      this.$store.commit('inventory/set', { type: 'currentFolder', val: null })
    }
  },
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown
    },
    tinySmall() {
      return this.$vuetify.breakpoint.xsOnly
    },
    tinyMedium() {
      return this.$vuetify.breakpoint.smOnly
    },
    tinyDesktop() {
      return this.$vuetify.breakpoint.mdAndUp
    },
    isValidatedCountClone() {
      const validRegEx = /\S+/
      return this.quantity !== null && validRegEx.test(this.quantity)
    },
    selectedItems() {
      return this.items.filter((item) => item.selected)
    },
    dataSelectedItems() {
      return this.selectedItems.map((s) => {
        return { id: s.id, name: s.name }
      })
    },
    noSelectedItems() {
      if (this.selected_option) {
        if (this.selected_option === 'Items') {
          return this.savedItems.filter((item) => item.type === 'folder')
        } else {
          return this.items.filter((item) => !item.selected)
        }
      } else {
        return this.items.filter((item) => !item.selected)
      }
    },
    destinationFolder() {
      return this.items.filter((item) => !item.selected)[0]
    },
    exportConfirm() {
      return this.$store.getters[`${MODULE_POPUP}/exportConfirm`]
    },
    importConfirm() {
      return this.$store.getters[`${MODULE_POPUP}/importConfirm`]
    }
  },
  watch: {
    isValidatedCountClone: {
      deep: true,
      handler: function (newVal) {
        this.quantityErrCnt++
      }
    },
    navTableItems: function (newValue, oldValue) {
      this.$store.commit('inventory/set', {
        type: 'navTableItems',
        val: newValue
      })
    },
    items: function (newValue, oldValue) {
      this.loadingItemsTable = false
    },
    loadingItemsTable: function (newValue, oldValue) {
      console.log('cargando table')
    },
    search: function (newValue, oldValue) {
      this.filteringItemsTable = true
      if (newValue.length > 0) {
        this.showSearchLabel = true
      } else {
        this.showSearchLabel = false
      }
    },
    quantity: function (newValue, oldValue) {
      if (newValue <= 0) {
        this.quantity = 1
      } else if (newValue > 30) {
        this.quantity = 30
      }
    },
    exportConfirm() {
      if (this.exportConfirm === true) {
        this.$store.commit(`${MODULE_POPUP}/${SET_EXPORT_CONFIRM}`, false)
        const curUserData = this.$store.getters['user/user']
        const inventoryId = curUserData.inventories[0]
        const exportData = this.$store.getters[`${MODULE_INVENTORY}/exportData`]
        this.$store.dispatch(`${MODULE_INVENTORY}/exportItems`, {
          inventoryId: inventoryId,
          categoryIds: exportData.categories,
          itemIds: exportData.items
        })
      }
    },
    importConfirm() {
      if (this.importConfirm === true) {
        this.$store.commit(`${MODULE_POPUP}/${SET_IMPORT_CONFIRM}`, false)
        const curUserData = this.$store.getters['user/user']
        const inventoryId = curUserData.inventories[0]
        const currentFolder = this.$store.getters[
          `${MODULE_INVENTORY}/currentFolder`
        ]
        const file = this.$store.getters[`${MODULE_POPUP}/importFile`]
        const formData = new FormData()
        formData.append('inventoryId', inventoryId)
        formData.append('categoryId', currentFolder)
        formData.append('file', file)
        this.$store
          .dispatch(`${MODULE_INVENTORY}/importItems`, formData)
          .then((res) => {
            if (currentFolder !== null) {
              this.showCategory(currentFolder, 'general')
            } else {
              this.items = []
              this.showAllCategories('general')
            }
          })
      }
    }
  },
  methods: {
    ...mapActions('inventory', [
      'getItems',
      'getCategories',
      'deleteFolder',
      'deleteItem',
      'editFolder',
      'editItem',
      'exportItems',
      'importItems'
    ]),
    isArrow($event) {
      var keyCode = $event.keyCode ? $event.keyCode : $event.which
      if (keyCode > 47 && keyCode < 58) {
        $event.preventDefault()
      }
    },
    filterOneColumnTable(value, search, item) {
      return (
        value != null &&
        search != null &&
        typeof value === 'string' &&
        (item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.description.toLowerCase().includes(search.toLowerCase()))
      )
    },
    cloneValidate() {
      if (this.$refs.cloneItemForm.validate()) {
        this.cloneItemModal()
      }
    },
    isValidatedCountCloneMethod() {
      const validRegEx = /\S+/
      if (this.quantity === '' && !validRegEx.test(this.quantity)) {
        this.quantityErrCnt = 1
      }
    },
    imprimir() {
      console.log('holah ohoal')
      this.filteringItemsTable = true
    },
    highlightText(value) {
      if (!this.search) {
        return value
      }
      const val = value.replace(new RegExp(this.search, 'gi'), (match) => {
        return `<span style="background-color: #D1FCFB"> ${match} </span>`
      })
      return `<span>${val}</span>`
    },
    async cloneItemModal() {
      const selectedItems = this.selectedItems
      const itemsArray = []
      const foldersArray = []
      if (this.itemToClone) {
        if (this.itemToClone.type === 'folder') {
          foldersArray.push({ id: this.itemToClone.id })
        } else {
          itemsArray.push({ id: this.itemToClone.id })
        }
      } else {
        selectedItems.forEach((e) => {
          if (e.type === 'Item') {
            itemsArray.push({ id: e.id })
          } else {
            foldersArray.push({ id: e.id })
          }
        })
      }
      var payload = {
        items: itemsArray,
        categories: foldersArray,
        numberOfClones: parseInt(this.quantity)
      }
      await this.$store
        .dispatch('inventory/cloneItems', payload)
        .then((res) => {
          if (this.itemToClone) {
            this.cloneItemDialog = false
          } else {
            this.cloneMultiItemsDialog = false
          }
          this.quantity = ''
          this.$refs.cloneItemForm.reset()
          let parentId = 0
          if (this.itemToClone) {
            parentId =
              this.itemToClone.type === 'folder'
                ? this.itemToClone.parentId
                : this.itemToClone.categoryId
            this.itemToClone = null
          } else {
            parentId =
              selectedItems[0].type === 'folder'
                ? this.selectedItems[0].parentId
                : this.selectedItems[0].categoryId
          }
          if (parentId) {
            this.items = []
            this.showCategory(parentId, 'general')
          } else {
            this.items = []
            this.showAllCategories('general')
          }
        })
    },
    async copyItem(item) {
      this.selectedItem = item
      this.itemToClone = item
      this.cloneItemDialog = true
    },
    async editItemTable(item) {
      console.log(JSON.stringify(item))
      if (item.type === 'folder') {
        this.$router.push('/editFolder/' + item.id)
      } else if (item.type === 'Item') {
        this.$router.push('/item/editItem/' + item.id)
      }
    },
    async deleteMultiItemModal() {
      await this.selectedItems.map(async (selectedItem, index) => {
        if (selectedItem.type === 'folder') {
          await this.$store.dispatch('inventory/deleteFolder', selectedItem.id)
        } else if (selectedItem.type === 'Item') {
          await this.$store.dispatch('inventory/deleteItem', selectedItem.id)
        }
      })
      console.log('dd', this.selectedItems)
      const parentId =
        this.selectedItems[0].type === 'folder'
          ? this.selectedItems[0].parentId
          : this.selectedItems[0].categoryId
      if (parentId) {
        this.items = []
        this.showCategory(parentId, 'general')
      } else {
        this.items = []
        this.showAllCategories('general')
      }
      this.multiItemDeleteDialog = false
    },
    async deleteItemModal() {
      const item = this.selectedItem
      console.log('item', item)
      if (item.type === 'folder') {
        await this.$store
          .dispatch('inventory/deleteFolder', item.id)
          .then((res) => {
            if (res.data.data.result === true) {
              this.showCategory(item.parentId, 'general')
            }
          })
      } else if (item.type === 'Item') {
        await this.$store
          .dispatch('inventory/deleteItem', item.id)
          .then((res) => {
            console.log('res', res)
            if (res.data.data.result === true) {
              if (item.categoryId !== null) {
                this.showCategory(item.categoryId, 'general')
              } else {
                this.items = []
                this.showAllCategories('general')
              }
            }
          })
      }
      this.folderDeleteDialog = false
      this.selectedItem = []
    },
    async deleteItem(item) {
      this.folderDeleteDialog = true
      this.selectedItem = item
    },
    async multiItemDelete() {
      console.log('multidelete', this.selectedItems)
      this.multiItemDeleteDialog = true
    },
    async multiItemCopy() {
      await this.selectedItems.map(async (selectedItem, index) => {
        if (selectedItem.type === 'folder') {
          await this.$store.dispatch('inventory/copyFolder', selectedItem)
        } else if (selectedItem.type === 'Item') {
          await this.$store.dispatch('inventory/copyItem', selectedItem)
        }
      })
      this.items = []
      this.showAllCategories('general')
    },
    async handleClickTable(row) {
      if (row.type !== 'folder') {
        return
      }

      this.savedItems = []
      this.items.splice(0, this.items.length)
      // this.filterItemsFolders('Items & Folders')
      this.filterItemsFolders(this.itemOption)

      this.showCategory(row.id, 'general')
      this.$store.commit('inventory/set', {
        type: 'currentFolder',
        val: row.id
      })
      this.navTableItems.push({
        index: this.navTableItems.length + 1,
        text: row.name,
        disabled: false,
        categoryId: row.id
      })
    },
    handleClickMoveTable(row) {
      if (row.type === 'folder') {
        this.navMoveFolder.push({
          index: this.navMoveFolder.length + 1,
          text: row.name,
          disabled: false,
          categoryId: row.id
        })
        this.moveTableItems.splice(0, this.moveTableItems.length)
        if (
          JSON.stringify(this.navTableItems) ===
          JSON.stringify(this.navMoveFolder)
        ) {
          this.moveTableItems = JSON.parse(JSON.stringify(this.noSelectedItems))
        } else {
          this.showCategory(row.id, 'move')
        }
        this.currentFolderToMove = { id: row.id, name: row.name }
      }
    },
    async showAllCategories(table) {
      await this.getCategories().then((cat) => {
        cat.forEach((c) => {
          c.type = 'folder'
          c.quantity = c.count.categories + c.count.items
          if (table === 'general') {
            this.savedItems.push(c)
            if (this.selected_option !== 'Items') {
              this.items.push(c)
            }
          } else if (table === 'move') {
            console.log('im here')
            this.moveTableItems.push(c)
          }
        })
        this.getItems().then((res) => {
          res.forEach((i) => {
            i.type = 'Item'
            if (table === 'general') {
              this.savedItems.push(i)
              if (this.selected_option !== 'Folders') {
                this.items.push(i)
              }
            } else if (table === 'move') {
              // this.moveTableItems.push(i)
            }
          })
        })
        // this.getQuantitiesForCategories(table)
        this.sortItems(table)
      })
    },
    async showCategory(id, table) {
      await this.$store.dispatch('inventory/getCategory', id).then((cat) => {
        cat.categories.forEach((c) => {
          c.type = 'folder'
          c.quantity = c.count.categories + c.count.items
          if (table === 'general') {
            this.savedItems.push(c)
            if (this.selected_option !== 'Items') {
              this.items.push(c)
            }
          } else if (table === 'move') {
            this.moveTableItems.push(c)
          }
        })
        cat.items.forEach((i) => {
          i.type = 'Item'
          console.log('item: ', JSON.stringify(i))
          if (table === 'general') {
            this.savedItems.push(i)
            if (this.selected_option !== 'Folders') {
              this.items.push(i)
            }
          } else if (table === 'move') {
            // this.moveTableItems.push(i)
          }
        })
        // this.getQuantitiesForCategories(table)
        this.sortItems(table)
      })
    },
    getQuantitiesForCategories() {
      this.items.forEach((item) => {
        if (item.type === 'folder') {
          this.$store.dispatch('inventory/getCategory', item.id).then((cat) => {
            const index = this.items.findIndex((it) => it.id === item.id)
            const categoriesLength = cat.categories ? cat.categories.length : 0
            const itemsLength = cat.items ? cat.items.length : 0
            item.quantity = categoriesLength + itemsLength
            this.items.splice(index, 1, item)
          })
        }
      })
    },
    sortItems(table) {
      if (table === 'general') {
        this.items.sort((a, b) => {
          if (a.name < b.name) {
            return -1
          } else if (a.name > b.name) {
            return 1
          } else {
            return 0
          }
        })
      } else if (table === 'move') {
        this.moveTableItems.sort((a, b) => {
          if (a.name < b.name) {
            return -1
          } else if (a.name > b.name) {
            return 1
          } else {
            return 0
          }
        })
      }
    },
    async clickBreadCum(e) {
      console.log('eee', e)
      if (e.categoryId) {
        this.navTableItems.splice(e.index)
        this.items.splice(0, this.items.length)
        this.$store.dispatch('inventory/resetCategoriesState')
        this.items = []
        await this.showCategory(e.categoryId, 'general')
        this.$store.commit('inventory/set', {
          type: 'currentFolder',
          val: e.categoryId
        })
      } else {
        this.navTableItems.splice(1)
        this.$store.dispatch('inventory/resetCategoriesState')
        this.items = []
        this.items.splice(0, this.items.length)
        this.showAllCategories('general')
        this.savedItems = []
        this.$store.commit('inventory/set', {
          type: 'currentFolder',
          val: null
        })
      }
      this.savedItems = []
      console.log('option', this.itemOption)
      this.filterItemsFolders(this.itemOption)
    },
    clickMoveBreadCum(e) {
      if (e.categoryId) {
        this.navMoveFolder.splice(e.index)
        this.moveTableItems.splice(0, this.moveTableItems.length)
        if (
          JSON.stringify(this.navTableItems) ===
          JSON.stringify(this.navMoveFolder)
        ) {
          this.moveTableItems = JSON.parse(JSON.stringify(this.noSelectedItems))
        } else {
          this.showCategory(e.categoryId, 'move')
        }
        this.currentFolderToMove = {
          id: e.categoryId,
          name: e.text
        }
      } else {
        this.navMoveFolder.splice(1)
        this.moveTableItems.splice(0, this.moveTableItems.length)
        if (
          JSON.stringify(this.navTableItems) ===
          JSON.stringify(this.navMoveFolder)
        ) {
          this.moveTableItems = JSON.parse(JSON.stringify(this.noSelectedItems))
        } else {
          this.showAllCategories('move')
        }
        this.savedItems = []
        this.currentFolderToMove = { id: null, name: 'Inventory' }
      }
      this.savedItems = []
    },
    filterItemsFolders(option) {
      this.selected_option = option
      console.log('savedItems', this.savedItems)
      console.log('items', this.items)
      if (this.savedItems.length > 0) {
        this.items = JSON.parse(JSON.stringify(this.savedItems))
      }
      this.savedItems = JSON.parse(JSON.stringify(this.items))
      this.itemOption = option
      // console.log('saveItem', this.savedItems)
      if (option === 'Folders') {
        console.log('option2222', this.items)
        this.items = this.items.filter((item) => item.type === 'folder')
        console.log('option0', this.items)
      } else if (option === 'Items') {
        this.items = this.items.filter((item) => item.type === 'Item')
        console.log('option1', this.items)
      } else {
        console.log('option2', option)
        this.items = this.items.filter((item) => true)
      }
    },
    moveToAnotherFolder() {
      this.moveDialog = true
      const moveTableItemsArr = JSON.parse(JSON.stringify(this.noSelectedItems))
      this.moveTableItems = moveTableItemsArr.filter(
        (item) => item.type === 'folder'
      )
      this.navMoveFolder = JSON.parse(JSON.stringify(this.navTableItems))
      this.currentFolderToMove = {
        id: this.navTableItems[this.navTableItems.length - 1].categoryId,
        name: this.navTableItems[this.navTableItems.length - 1].text
      }
    },
    handleMoveTableCheckClick(value, item) {
      this.disabledCheckboxes = value
      if (value) {
        this.currentFolderToMove = {
          id: item.id,
          name: item.name
        }
      } else {
        this.currentFolderToMove = {
          id: this.navMoveFolder[this.navMoveFolder.length - 1].categoryId,
          name: this.navMoveFolder[this.navMoveFolder.length - 1].text
        }
      }
    },
    moveFolder() {
      this.selectedItems.forEach((f) => {
        if (f.type === 'folder') {
          console.log('currentfoldertomove', this.currentFolderToMove)
          const payload = {
            id: f.id,
            inventoryId: f.inventoryId,
            name: f.name,
            parentId: this.currentFolderToMove.id,
            description: f.description
          }
          this.editFolder(payload)
          const index = this.items.findIndex((it) => it.id === f.id)
          this.items.splice(index, 1)
        } else {
          console.log('ITEM: ', JSON.stringify(f))
          const payload = {
            id: f.id,
            inventoryId: f.inventoryId,
            categoryId: this.currentFolderToMove.id,
            name: f.name,
            images: f.images,
            description: f.description,
            quantity: parseInt(f.quantity),
            price: parseInt(f.price)
          }
          this.editItem(payload)
          const index = this.items.findIndex((it) => it.id === f.id)
          this.items.splice(index, 1)
        }
      })
      this.moveDialog = false
    },
    stopShowSearching() {
      this.filteringItemsTable = false
    },
    getItemsFiltered(e) {
      this.filteredItems = e
      if (e.length > 0) {
        setTimeout(this.stopShowSearching, 500)
      } else {
        this.stopShowSearching()
      }
    },
    exportItems(option) {
      const selectedArr = this.selectedItems
      const selected = {
        categories: selectedArr
          .filter((item) => item.type === 'folder')
          .map((item) => item.id),
        items: selectedArr
          .filter((item) => item.type !== 'folder')
          .map((item) => item.id)
      }
      this.$store.commit(
        `${MODULE_POPUP}/${SET_EXPORT_CONFIRM_POPUP_TITLE}`,
        'Export'
      )
      this.$store.commit(
        `${MODULE_POPUP}/${SET_EXPORT_CONFIRM_POPUP_MESSAGE}`,
        'Are you sure you want to export selected Folders and Items?'
      )
      this.$store.commit(`${MODULE_INVENTORY}/exportData`, {
        categories: selected.categories,
        items: selected.items
      })
      this.$store.commit(
        `${MODULE_POPUP}/${SET_EXPORT_CONFIRM_POPUP_SHOW}`,
        true
      )
    },
    importItems(option) {
      this.$store.commit(
        `${MODULE_POPUP}/${SET_IMPORT_CONFIRM_POPUP_TITLE}`,
        'Import'
      )
      this.$store.commit(
        `${MODULE_POPUP}/${SET_IMPORT_CONFIRM_POPUP_MESSAGE}`,
        'Your data will be imported to the current folder.'
      )
      this.$store.commit(
        `${MODULE_POPUP}/${SET_IMPORT_CONFIRM_POPUP_SHOW}`,
        true
      )
    }
  }
}
</script>

<style lang="stylus">
.inventory-container {
  padding: 0 12px;
}

#setAlertText {
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
      left: -64%;
      width: 100px;
      padding: 4px;
      border-radius: 4px;
      text-align: center;
    }

    .triangle {
      display: block;
      content: '';
      position: absolute;
      top: -40%;
      left: 10%;
      width: 0;
      height: 0;
      border-left: solid 10px transparent;
      border-right: solid 10px transparent;
      border-top: solid 10px #313131;
    }
  }
}

.center-text {
  position: absolute;
  left: 45%;
  top: 40%;
}

.cursor-point {
  cursor: pointer;
}

::v-deep .inventory-container .theme--light.v-text-field > .v-input__control > .v-input__slot:before {
  border-color: none !important;
}

.noteTruncate {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  padding: 5px;
  width: 300px;
}

.noteTruncate1 {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 195px;
}

.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr:last-child > th {
  padding: 0 5px !important;
  // display: flex
}

.theme--light.v-data-table .v-data-table-header th.sortable.active .v-data-table-header__icon {
  font-size: 0.75rem !important;
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

.itemSelect {
  .toolbar__content {
    height: 42px !important;
  }

  .input-group {
    border-left: 1px solid rgba(0, 0, 0, 0.12);
    border-right: 1px solid rgba(0, 0, 0, 0.12);
  }

  .input-group > &__input, &__details &::before {
    display: none;
  }

  .btn--icon, .btn__content::before, .ripple__container {
    border-radius: 0;
  }

  .btn--icon {
    width: 42px;
    height: 42px;
    margin: 0 !important;
  }

  .highlightText {
    background: yellow;
  }
}

.v-data-table__mobile-row .v-data-table__mobile-row__cell .flex-nowrap {
  margin-right: 0px;
}

.v-data-table__mobile-row {
  border-style: solid;
  border-width: 1px 0;
  border-color: #eeeeee;
}
</style>

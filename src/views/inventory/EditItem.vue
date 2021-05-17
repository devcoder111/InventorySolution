<template>
  <v-app id="inspire" class="main-wrapper">
    <div>
      <div class="home-content">
        <v-container style="max-width: 100%; padding: 0px">
          <v-row class="main-title-box justify-start align-start pa-2 px-4">
            <v-col class="py-0" cols="12" sm="4">
              <span class="text-h5 main-title">Inventory</span>
            </v-col>
          </v-row>
          <v-row
            class="justify-start align-start pa-2 px-4"
            style="position: relative"
          >
            <v-col class="py-0" cols="12" sm="4">
              <span class="text-h6 sub-title">Edit Item</span>
            </v-col>
          </v-row>
          <v-form
            class="create-item--form"
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-row no-gutters class="pl-4 pt-4">
              <v-col style="padding-right: 45px">
                <div class="header-content">Default Information</div>
                <div class="mb-5">
                  <img
                    class="image-icon left"
                    src="@/assets/icons/svg/pencil2.svg"
                  />
                  <span class="label-text">Item Name *</span>
                  <div class="input-mb input-box d-flex flex-nowrap">
                    <v-text-field
                      @blur="isValidatedNameMethod"
                      dense
                      placeholder="Enter Item Name"
                      v-model="itemToSubmit.name"
                      :rules="nameRules"
                      required
                      maxlength="128"
                      class="r-field item-name-field mr-2"
                      :append-icon="
                        isValidatedName ? 'mdi-checkbox-marked-circle' : ''
                      "
                      :append-outer-icon="
                        nameErrCnt == 0
                          ? ''
                          : isValidatedName
                          ? ''
                          : 'mdi-alert-circle'
                      "
                    ></v-text-field>
                  </div>
                </div>

                <div class="mb-5 d-flex">
                  <div class="divide-equal" style="margin-right: 5px">
                    <div class="d-flex">
                      <img
                        class="image-icon"
                        src="@/assets/icons/svg/boxes.svg"
                      />

                      <div class="label-text">
                        <div class="label-value">QUANTITY</div>
                      </div>
                    </div>
                    <div class="input-mb input-box">
                      <v-text-field
                        @blur="isValidatedQuantifyMethod"
                        dense
                        class="r-field item-name-field"
                        placeholder="0"
                        v-model="itemToSubmit.quantity"
                        single-line
                        type="number"
                      ></v-text-field>
                    </div>
                  </div>
                  <div class="divide-equal" style="margin-right: 5px">
                    <div class="d-flex justify-end">
                      <img
                        class="image-icon"
                        src="@/assets/icons/svg/notificationItem.svg"
                      />

                      <div class="label-text label-value" style="bottom: 5px">
                        ALERT
                      </div>
                    </div>
                    <div class="d-flex justify-end" style="position: relative">
                      <v-switch
                        v-model="alertActive"
                        inset
                        style="right: 20px; position: absolute"
                        color="rgb(121, 114, 191)"
                      ></v-switch>
                      <div
                        :class="{
                          'd-flex flex-column switch-alert justify-end cursor-pointer': alertStatus,
                          '': alertActive && !alertStatus
                        }"
                        style="left: 24px"
                        @mouseover="bellHover"
                        :disabled="!alertActive"
                      >
                        <span class="off-alert-text">
                          {{ alertStatus ? 'Click to edit alert' : '' }}</span
                        >
                        <img
                          v-if="alertActive"
                          style="
                            padding: 6px;
                            background-color: #7972bf;
                            height: 28px;
                            width: 28px;
                            border-radius: 4px;
                          "
                          src="@/assets/icons/svg/bell-white.svg"
                          @click="showAddAlertDialog"
                        />
                        <img
                          v-else
                          style="
                            padding: 6px;
                            background-color: #dbdbdb;
                            height: 28px;
                            width: 28px;
                            border-radius: 4px;
                          "
                          src="@/assets/icons/svg/bell-no-white.svg"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="mb-5 d-flex">
                  <div class="divide-equal" style="margin-right: 5px">
                    <div class="d-flex">
                      <img
                        class="image-icon left"
                        src="@/assets/icons/svg/money.svg"
                      />

                      <div class="label-text">
                        <div class="label-value" style="padding-left: 1px">
                          PRICE, $
                        </div>
                      </div>
                    </div>
                    <div class="input-mb input-box" id="input-mb">
                      <v-text-field
                        dense
                        placeholder="Enter Price"
                        :hide-details="true"
                        v-model="itemToSubmit.price"
                        type="number"
                      ></v-text-field>
                    </div>
                  </div>

                  <div class="divide-equal" style="margin-left: 5px">
                    <div class="d-flex">
                      <img
                        class="image-icon"
                        src="@/assets/icons/svg/money.svg"
                      />

                      <div class="label-text">
                        <div class="label-value">VALUE, $</div>
                      </div>
                    </div>
                    <div class="input-mb input-box">
                      <v-text-field
                        dense
                        placeholder="0"
                        :hide-details="true"
                        v-model="value"
                      ></v-text-field>
                    </div>
                  </div>
                </div>

                <div class="mb-5">
                  <img
                    class="image-icon left"
                    src="@/assets/icons/svg/pencil2.svg"
                  />
                  <span class="label-text">NOTES</span>
                  <div class="input-mb input-box">
                    <v-textarea
                      name="input-7-4"
                      label="Enter Notes"
                      hide-details="true"
                      single-line
                      rows="5"
                      maxlength="255"
                      v-model="itemToSubmit.notes"
                    ></v-textarea>
                  </div>
                </div>

                <div class="header-content mb-5">Custom Fields</div>
                <component
                  v-for="(item, index) in customFields"
                  :key="index"
                  :is="item.fieldType"
                  :touch="'writingView'"
                  :name="item.name"
                  :placeholderContent="item.placeholder"
                  :value="item.value"
                  :defaultValues="
                    item.isAdded ? item.arrayValues : item.availableValues || []
                  "
                  :letDelete="item.applyTo !== 'ALL_ITEMS'"
                  @newInput="
                    (newVal) => {
                      item.value = newVal
                    }
                  "
                  @delete="deleteCustomField(index)"
                />
                <v-col>
                  <div class="d-flex justify-end">
                    <img
                      class="image-icon-small"
                      src="@/assets/icons/svg/plus.svg"
                    />

                    <div
                      tabindex='1'
                      class="label-text label-value cursor-pointer"
                      style="bottom: 5px; color: #8074c2"
                      @click="showChooseCustomFieldPopup"
                    >
                      ADD CUSTOM FIELD
                    </div>
                  </div>
                </v-col>

                <div class="text-left pt-10">
                  <v-btn
                    tabindex='1'
                    @click="validate"
                    depressed
                    medium
                    :disabled="!valid"
                    class="save-item-btn save-btn"
                  >
                    Save
                  </v-btn>
                  <v-btn
                    @click.stop="cancel"
                    depressed
                    medium
                    class="cancel-btn"
                  >
                    <span style="color: black">Cancel</span>
                  </v-btn>
                </div>
              </v-col>
              <v-col style="padding-left: 45px">
                <div class="header-content1">Photos</div>
                <div class="d-flex">
                  <div>
                    <div class="d-flex">
                      <img
                        class="image-icon left"
                        src="@/assets/icons/svg/image.svg"
                      />

                      <span class="label-text">Edit PHOTOS Folder</span>
                    </div>
                    <div class="input-mb input-box">
                      <div
                        id="my-strictly-unique-vue-upload-multiple-image"
                        style="
                          display: flex;
                          justify-content: left;
                          align-item: start;
                        "
                      >
                        <vue-upload-multiple-image
                          @upload-success="uploadImageSuccess"
                          @before-remove="beforeRemove($event)"
                          @edit-image="editImage"
                          @data-change="dataChange"
                          @update-images="updateImagesArray"
                          :multiple-flag="true"
                          :data-images="itemToSubmit.images"
                          v-model="itemToSubmit.images"
                        ></vue-upload-multiple-image>
                      </div>
                      <span
                        style="
                          color: red;
                          display: flex;
                          justify-content: center;
                        "
                        v-if="uploadingFailed"
                        >Error image uploading, try another image</span
                      >
                    </div>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-form>
          <v-row class="footer">
            <span class="footer--text"
              >Copyright 2020-2021
              <span
                ><a href="/" target="_blank" title="BRITECHECK"
                  >BRITECHECK</a
                ></span
              >, All rights reserved.</span
            >
          </v-row>
        </v-container>
      </div>
    </div>
    <UnsavedChangesPopup />
    <AddEditAlertPopu :item="itemToSubmit" />
    <DeleteAlertPopup :item="itemToSubmit" />
    <ChooseCustomFieldPopup
      @selected-fields="selectedFields"
      :haveItems="customFields.map((item) => item.customFieldId)"
    />
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import VueUploadMultipleImage from '@/components/upload-image/VueUploadMultipleImage'
import UnsavedChangesPopup from '@/components/popup/UnsavedChangesPopup'
import AddEditAlertPopu from '@/components/popup/AddEditAlertPopup'
import DeleteAlertPopup from '@/components/popup/DeleteAlertPopup'
import ChooseCustomFieldPopup from '@/components/popup/ChooseCustomField'
import {
  SET_ADD_EDIT_ALERT_POPUP_SHOW,
  MODULE_POPUP,
  SET_UNSAVED_CHANGES_POPUP_SHOW,
  MODULE_FORM,
  SET_FORM_DATA_ORIGIN,
  SET_FORM_DATA_NEW,
  SET_NEED_CHECK_FORM_OFF,
  SET_PENDING_ALERT_TO_SAVE,
  SET_CUSTOM_FIELD_POPUP_SHOW,
  SET_SUBMIT_FORM_ERROR_POPUP_SHOW,
  SET_SUBMIT_FORM_ERROR_POPUP_TITLE,
  SET_SUBMIT_FORM_ERROR_POPUP_MESSAGE
} from '@/store/constant/mutation-types'
import smallTextBox from '@/components/customFields/smallTextBox'
import largeTextBox from '@/components/customFields/largeTextBox'
import roundNumber from '@/components/customFields/roundNumber'
import decimalNumber from '@/components/customFields/decimalNumber'
import phoneNumber from '@/components/customFields/phoneNumber'
import email from '@/components/customFields/email'
import webLink from '@/components/customFields/webLink'
import dateField from '@/components/customFields/dateField'
import checkBox from '@/components/customFields/checkBox'
import dropDown from '@/components/customFields/dropDown'
import { fieldsNamesFromBE } from '@/utils/customFields'
import serviceCustomField from '@/services/customField'

export default {
  name: 'Home',
  components: {
    VueUploadMultipleImage,
    UnsavedChangesPopup,
    AddEditAlertPopu,
    DeleteAlertPopup,
    ChooseCustomFieldPopup,
    smallTextBox,
    largeTextBox,
    roundNumber,
    decimalNumber,
    phoneNumber,
    email,
    webLink,
    dateField,
    checkBox,
    dropDown
  },
  data() {
    return {
      alertStatus: false,
      notificationShowingTime: 5000,
      alertSelectedPeoples: '',
      alertType: '',
      alertQuantity: 100,
      searchUser: '',
      alertsOptions: [
        'GREATER_THEN',
        'GREATER_THEN_OR_EQUAL',
        'LESS_THEN',
        'LESS_THEN_OR_EQUAL'
      ],
      changedFlag: false,
      sendAlertToMembers: false,
      sendAlertToOwners: false,
      valid: true,
      nameErrCnt: 0,
      quantifyErrCnt: 0,
      value: '',
      params: [
        {
          foo: 0,
          placeholder: '',
          type: 0
        },
        {
          foo: '',
          placeholder: 'Enter Min Level',
          type: 1
        }
      ],
      customFields: [],
      itemToSubmit: {
        name: '',
        quantity: '',
        price: '',
        notes: '',
        images: [],
        folder: '',
        alert: {},
        customFields: []
      },
      chips: [],
      select: ['add-tags-with', 'enter', 'tab', 'paste'],
      folders: [],
      confirmDialog: false,
      nameRules: [(value) => !!value || 'Please Enter Name'],
      imageFormData: [],
      itemList: [],
      uploadingFailed: false,
      tmpItemId: '',
      tmpCategoryId: '',
      tmpInventoryId: '',
      itemId: '',
      tmpAlertActive: false,
      bellStatus: false
    }
  },
  computed: {
    ...mapGetters('user', ['invitedUsers']),
    ...mapGetters('inventory', ['categories']),
    ...mapGetters('popup', ['alertPendingToSave']),

    alertActive: {
      get: function () {
        return this.alertPendingToSave
          ? !this.alertPendingToSave.archived
          : false
      },
      set: function (newVal) {
        this.alertStatus = newVal

        const time = setTimeout(() => {
          this.alertStatus = false
          clearTimeout(time)
        }, 5000)
        const payload = {
          itemId: this.itemToSubmit.id,
          type: this.itemToSubmit.alert.type,
          value: this.itemToSubmit.alert.value,
          users: this.itemToSubmit.alert.users,
          archived: !newVal
        }
        this.$store.commit(
          `${MODULE_POPUP}/${SET_PENDING_ALERT_TO_SAVE}`,
          payload
        )
      }
    },
    isValidatedName() {
      const validRegEx = /\S+/
      return (
        this.itemToSubmit.name !== null &&
        validRegEx.test(this.itemToSubmit.name)
      )
    },
    isValidatedQuantify() {
      const validRegEx = /\S+/
      return (
        this.itemToSubmit.quantity !== null &&
        validRegEx.test(this.itemToSubmit.quantity)
      )
    }
  },
  watch: {
    isValidatedName: {
      deep: true,
      handler: function (newVal) {
        this.nameErrCnt++
      }
    },
    isValidatedQuantify: {
      deep: true,
      handler: function (newVal) {
        this.quantifyErrCnt++
      }
    },
    itemToSubmit: {
      deep: true,
      handler: function (val, newVal) {
        this.value = (this.itemToSubmit.quantity * this.itemToSubmit.price).toFixed(2)
        this.$store.commit(
          `${MODULE_FORM}/${SET_FORM_DATA_NEW}`,
          this.itemToSubmit
        )
      }
    }
  },
  mounted() {},
  beforeRouteLeave(to, from, next) {
    if (
      this.$store.getters[`${MODULE_FORM}/isNeedCheckForm`] &&
      this.$store.getters[`${MODULE_FORM}/isFormDataChanged`]
    ) {
      this.$store.commit(
        `${MODULE_POPUP}/${SET_UNSAVED_CHANGES_POPUP_SHOW}`,
        true
      )
      next(false)
    } else {
      next()
    }
  },
  async created() {
    this.getInvitedUsers()
    this.itemId = parseInt(this.$route.params.id)

    await this.getItemById(this.itemId).then((item) => {
      const currentItem = item
      this.tmpItemId = currentItem.id
      this.tmpInventoryId = currentItem.inventoryId
      this.tmpCategoryId = currentItem.categoryId
      this.itemToSubmit.id = currentItem.id
      this.itemToSubmit.name = currentItem.name
      this.itemToSubmit.notes = currentItem.description
      this.itemToSubmit.price = currentItem.price
      this.itemToSubmit.quantity = currentItem.quantity
      if (currentItem.customFields?.length) {
        currentItem.customFields.forEach((item) => {
          if (!this.customFields.find((el) => item.id === el.id)) {
            item.fieldType = fieldsNamesFromBE.get(item.fieldType).name
            this.customFields.push(item)
          }
        })
      }
      if (currentItem?.alert) {
        this.itemToSubmit.alert = currentItem.alert ? currentItem.alert : null
        this.itemToSubmit.alert.users = currentItem.alert.users.map(function (
          user
        ) {
          return user.id
        })
        const payload = {
          itemId: currentItem.id,
          type: currentItem.alert.type,
          value: currentItem.alert.value,
          users: this.itemToSubmit.alert.users,
          archived: this.itemToSubmit.alert.archived
        }
        this.$store.commit(
          `${MODULE_POPUP}/${SET_PENDING_ALERT_TO_SAVE}`,
          payload
        )
      }

      for (var i = 0; i < currentItem.images.length; i++) {
        this.itemToSubmit.images.push({
          path: currentItem.images[i],
          highlight: i === 0 ? 1 : 0
        })
      }
    })
    this.$store.commit(
      `${MODULE_FORM}/${SET_FORM_DATA_ORIGIN}`,
      this.itemToSubmit
    )
  },
  methods: {
    ...mapActions('user', ['getInvitedUsers']),
    ...mapActions('inventory', [
      'editItem',
      'getItemById',
      'getItems',
      'uploadImages'
    ]),
    ...mapActions('user', ['getInvitedUsers']),
    ...mapActions('alerts', ['addAlert', 'updateAlert', 'updateNotification']),
    selectedFields(data) {
      data.forEach((item) => {
        if (!this.customFields.find((el) => item.id === el.id)) {
          item.fieldType = fieldsNamesFromBE.get(item.fieldType).name
          item.value = item.defaultValue ? item.defaultValue : ''
          item.isAdded = true
          delete item.defaultValue
          this.customFields.push(item)
        }
      })
    },
    async deleteCustomField(index) {
      let result
      if (!this.customFields[index].isAdded) {
        result = await serviceCustomField.deleteCustomFieldFromItem({
          id: this.customFields[index].id
        })
        if (result.data.error.type === 200) {
          this.customFields.splice(index, 1)
        } else {
          this.$store.commit(
            `${MODULE_POPUP}/${SET_SUBMIT_FORM_ERROR_POPUP_SHOW}`,
            true
          )
          this.$store.commit(
            `${MODULE_POPUP}/${SET_SUBMIT_FORM_ERROR_POPUP_TITLE}`,
            'Error to delete custom field'
          )
          this.$store.commit(
            `${MODULE_POPUP}/${SET_SUBMIT_FORM_ERROR_POPUP_MESSAGE}`,
            result.data.error.message
          )
        }
      } else {
        this.customFields.splice(index, 1)
      }
    },
    bellHover() {
      this.bellStatus = !this.bellStatus
    },
    showChooseCustomFieldPopup() {
      this.$store.commit(`${MODULE_POPUP}/${SET_CUSTOM_FIELD_POPUP_SHOW}`, true)
    },
    showAddAlertDialog() {
      this.$store.commit(
        `${MODULE_POPUP}/${SET_ADD_EDIT_ALERT_POPUP_SHOW}`,
        true
      )
    },
    cancel() {
      this.$router.push('/inventory')
      this.$store.commit(`${MODULE_POPUP}/${SET_PENDING_ALERT_TO_SAVE}`, null)
    },
    uploadImageSuccess(formData, index, fileList) {
      this.uploadingFailed = false
      this.imageFormData.push(formData)
      this.changedFlag = true
    },
    updateImagesArray(formData, isCreatedImage, findingIndex) {
      if (isCreatedImage) {
        this.imageFormData[findingIndex] = formData
      } else {
        this.itemToSubmit.images.splice(findingIndex, 1)
        this.imageFormData.unshift(formData)
      }
      this.changedFlag = true
      this.uploadingFailed = false
    },
    beforeRemove(isCreatedImage, findingIndex) {
      if (isCreatedImage) {
        this.imageFormData.splice(findingIndex, 1)
      } else {
        this.itemToSubmit.images.splice(findingIndex, 1)
      }
      this.changedFlag = true
    },
    async validate() {
      this.customFields.forEach((item) => {
        const findingIndex = this.itemToSubmit.customFields.findIndex(
          (el) => el.id === item.id
        )
        if (findingIndex < 0) {
          const currObj = {
            value: '' + item.value,
            customFieldId: item.id
          }
          if (!item.isAdded) {
            currObj.id = item.id
          }
          this.itemToSubmit.customFields.push(currObj)
        } else {
          this.itemToSubmit.customFields[findingIndex].value = '' + item.value
        }
      })
      if (!this.$refs.form.validate()) {
        this.nameErrCnt = 1
        this.quantifyErrCnt = 1
        return
      }

      this.uploadingFailed = false
      if (this.imageFormData !== '') {
        await this.uploadImages(this.imageFormData).then((res) => {
          if (res === 'Uploaidng failed') {
            this.uploadingFailed = true
          } else {
            res.forEach((image) => {
              this.itemToSubmit.images.push(image)
            })
          }
        })
      }
      if (this.uploadingFailed) {
        return
      }

      if (this.itemToSubmit.images) {
        const onlyUrlImagesArray = []
        this.itemToSubmit.images.forEach((item) => {
          onlyUrlImagesArray.push(item.path || item)
        })
        this.itemToSubmit.images = onlyUrlImagesArray
      }
      const payload = {
        id: this.tmpItemId,
        inventoryId: this.tmpInventoryId,
        categoryId: this.tmpCategoryId,
        name: this.itemToSubmit.name,
        images: this.itemToSubmit.images ? this.itemToSubmit.images : '',
        description: this.itemToSubmit.notes,
        quantity: parseInt(this.itemToSubmit.quantity),
        price: parseFloat(this.itemToSubmit.price),
        customFields: this.itemToSubmit.customFields
      }
      this.$store.commit(`${MODULE_FORM}/${SET_NEED_CHECK_FORM_OFF}`)
      await this.editItem(payload)
      if (this.alertPendingToSave) {
        if (!this.itemToSubmit.alert) {
          await this.addAlert(this.alertPendingToSave)
        } else {
          await this.updateAlert(this.alertPendingToSave)
        }
      }
      await this.$store.commit(
        `${MODULE_POPUP}/${SET_PENDING_ALERT_TO_SAVE}`,
        null
      )
    },
    editImage(formData, index, fileList) {},
    dataChange(data) {},
    setQuantity(event) {
      this.itemToSubmit.quantity = event
    },
    isValidatedNameMethod() {
      const validRegEx = /\S+/
      if (
        this.itemToSubmit.name === '' &&
        !validRegEx.test(this.itemToSubmit.name)
      ) {
        this.nameErrCnt = 1
      }
    },
    isValidatedQuantifyMethod() {
      const validRegEx = /\S+/
      if (
        this.itemToSubmit.quantity === '' &&
        !validRegEx.test(this.itemToSubmit.quantity)
      ) {
        this.quantifyErrCnt = 1
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700;800;900&display=swap');
.change-font {
  font-family: 'Raleway', sans-serif;
}
::v-deep .v-textarea textarea {
  overflow: hidden !important;
}
$header-form-color: #efefef;
::v-deep .container {
  width: 100%;
  padding: 0 !important;
  margin-right: auto;
  /* margin-left: auto; */
}

.switch-alert {
  position: relative;
  left: -10px;
  top: -25px;
  height: 53px;
  width: 53px;
  .off-alert-text {
    display: none;
  }
  .off-alert-text {
    display: block;
    background-color: #383838;
    color: white;
    padding: 2px 8px;
    border-radius: 4px;
    position: relative;
    left: 0px;
    width: 143px;
    top: 64px;
    &:after {
      content: '';
      position: relative;
      top: -121%;
      left: -70%;
      width: 0;
      height: 0;
      border-left: solid 10px transparent;
      border-right: solid 10px transparent;
      border-bottom: solid 10px #383838;
      border-top: solid 10px transparent;
    }
  }
}

.set-alert {
  position: relative;
  left: -10px;
  top: -25px;
  height: 53px;
  width: 53px;
  .off-alert-text {
    display: none;
  }
  &:hover {
    .off-alert-text {
      display: block;
      background-color: #383838;
      color: white;
      padding: 2px 8px;
      border-radius: 4px;
      position: relative;
      left: 0px;
      width: 143px;
      top: 64px;
      &:after {
        content: '';
        position: relative;
        top: -121%;
        left: -70%;
        width: 0;
        height: 0;
        border-left: solid 10px transparent;
        border-right: solid 10px transparent;
        border-bottom: solid 10px #383838;
        border-top: solid 10px transparent;
      }
    }
  }
  .off-alert-text {
    background-color: #383838;
    color: white;
    padding: 2px 8px;
    border-radius: 4px;
    position: relative;
    left: 0px;
    width: 65px;
    top: -7px;
    &:after {
      content: '';
      position: relative;
      top: 130%;
      left: -70%;
      width: 0;
      height: 0;
      border-left: solid 10px transparent;
      border-right: solid 10px transparent;
      border-top: solid 10px #383838;
    }
  }
}

#inspire {
  font-family: 'Sourcesanspro';

  .home-content {
    padding: 0px;
    .header-content {
      color: #73727e;
      font-weight: 600;
      margin-bottom: 16px;
      font-size: 18px;
      letter-spacing: 0.5px;
    }
    .header-content1 {
      color: #798393;
      font-weight: 600;
      margin-bottom: 16px;
      font-size: 18px;
      letter-spacing: 0.5px;
    }
    .label-text {
      color: #43425d;
      text-transform: uppercase;
      position: relative;
      font-size: 16px;
      letter-spacing: 0.75px;
      font-weight: 600;
      .label-value {
        position: absolute;
        bottom: 0;
        width: 100px;
      }
    }
    .input-mb {
      margin-top: 4px;
    }

    .border-textfield {
      padding: 4px 8px;
      border: 1px solid #9ea3ac87;
      width: 100%;
      padding-left: 8px;
      outline: none;
      caret-color: #9ea3ac87;
      color: #798393;

      &::placeholder {
        /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: rgb(192, 189, 189);
        opacity: 1; /* Firefox */
        font-size: 0.35rem;
      }

      &:-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        color: rgb(192, 189, 189);
        font-size: 0.35rem;
      }

      &::-ms-input-placeholder {
        /* Microsoft Edge */
        color: rgb(192, 189, 189);
        font-size: 0.35rem;
      }
    }

    .image-icon {
      height: 18px;
      width: 18px;
      margin-right: 10px;
      fill: #43425d !important;
    }
    .image-icon-small {
      height: 14px;
      width: 14px;
      margin-right: 8px;
      fill: #43425d !important;
    }
    .divide-equal {
      flex-basis: 0;
      flex-grow: 1;
    }

    .modalTitle {
      color: #e0e0e0;
    }
    .r-field {
      padding-top: unset;
      margin-top: unset;
    }

    ::v-deep .item-name-field .mdi-checkbox-marked-circle {
      color: #22bb33 !important;
    }
    .item-name-field > div > div > .mdi-alert-circle {
      color: red !important;
    }
    // .item-name-field > div > div > div > div > .mdi-checkbox-marked-circle {
    //   color: #22bb33 !important;
    // }

    #my-strictly-unique-vue-upload-multiple-image {
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #2c3e50;
      margin-top: 3px;

      .image-container {
        width: 300px;
        height: 300px;
        border: 1px solid #d6d6d6;
        border-radius: 4px;
        background-color: #fff;
      }

      h1,
      h2 {
        font-weight: normal;
      }

      ul {
        list-style-type: none;
        padding: 0;
      }

      li {
        display: inline-block;
        margin: 0 10px;
      }

      a {
        color: #42b983;
      }
    }
  }
  ::v-deep .v-messages__message {
    color: red;
    font-style: italic;
    font-size: 15px;
    text-align: right;
  }

  .v-text-field--outlined {
    border-color: rgba(192, 0, 250, 0.986);
  }
  .v-input--selection-controls {
    margin-top: 0px !important;
  }
}
</style>

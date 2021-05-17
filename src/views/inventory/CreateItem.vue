<template>
  <v-container class="main-wrapper" id="inspire">
    <div>
      <div class="home-content">
        <v-container style="max-width: 100%; padding: 0">
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
              <span class="text-h6 sub-title">Add Item</span>
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
                  <div class="input-mb d-flex flex-nowrap input-box">
                    <v-text-field
                      @blur="isValidatedNameMethod"
                      dense
                      placeholder="Enter Item Name"
                      v-model="itemToSubmit.name"
                      :rules="nameRules"
                      required
                      maxlength="128"
                      class="r-field item-name-field"
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
                        color="#43425d"
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
                        light
                      />
                      <div
                        class="d-flex flex-column set-alert justify-end cursor-pointer"
                        style="left: 24px"
                      >
                        <span class="off-alert-text">
                          {{
                            alertPendingToSave
                              ? 'Alert installed'
                              : 'Alert is not set'
                          }}</span
                        >
                        <img
                          v-if="alertPendingToSave"
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
                          @click="showAddAlertDialog"
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
                        readonly
                        dense
                        placeholder="0"
                        v-model="value"
                        :hide-details="true"
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
                  v-for='(item, index) in customFields'
                  :key='index'
                  :is='item.fieldType'
                  :touch='"writingView"'
                  :name='item.name'
                  :placeholderContent='item.placeholder'
                  :value='item.value'
                  :defaultValues='item.arrayValues || ""'
                  @newInput='newVal=>{ item.value = newVal }'
                />
                <v-col>
                  <div class="d-flex justify-end">
                    <img
                      class="image-icon-small"
                      src="@/assets/icons/svg/plus.svg"
                    />

                    <div
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
                      <span class="label-text">ADD PHOTOS Folder</span>
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
                          @before-remove="beforeRemove"
                          @edit-image="editImage"
                          @data-change="dataChange"
                          @update-images="updateImagesArray"
                          :data-images="itemToSubmit.images"
                          :multiple-flag="true"
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
        </v-container>
      </div>
    </div>
    <UnsavedChangesPopup />
    <AddEditAlertPopu :item="itemToSubmit" />
    <ChooseCustomFieldPopup
      @selected-fields="selectedFields"
      :haveItems="customFields.map((item) => item.customFieldId)"
    />
    <v-row class="footer">
      <span class="footer--text"
        >Copyright 2020-2021
        <span
          ><a href="/" target="_blank" title="BRITECHECK">BRITECHECK</a></span
        >, All rights reserved.</span
      >
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import VueUploadMultipleImage from '@/components/upload-image/VueUploadMultipleImage'
import UnsavedChangesPopup from '@/components/popup/UnsavedChangesPopup'
import AddEditAlertPopu from '@/components/popup/AddEditAlertPopup'
import ChooseCustomFieldPopup from '@/components/popup/ChooseCustomField'
import {
  SET_ADD_EDIT_ALERT_POPUP_SHOW,
  MODULE_POPUP,
  MODULE_USER,
  SET_UNSAVED_CHANGES_POPUP_SHOW,
  MODULE_FORM,
  SET_FORM_DATA_ORIGIN,
  SET_FORM_DATA_NEW,
  SET_NEED_CHECK_FORM_OFF,
  // SET_PENDING_ALERT_TO_SAVE,
  SET_CUSTOM_FIELD_POPUP_SHOW
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

export default {
  name: 'Home',
  components: {
    VueUploadMultipleImage,
    UnsavedChangesPopup,
    AddEditAlertPopu,
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
      sendAlertToMembers: false,
      sendAlertToOwners: false,
      valid: true,
      nameErrCnt: 0,
      quantifyErrCnt: 0,
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
        price: 0,
        notes: '',
        images: [],
        folder: '',
        customFields: []
      },
      value: '',
      chips: [],
      select: ['add-tags-with', 'enter', 'tab', 'paste'],
      folders: [],
      nameRules: [(value) => !!value || 'Please Enter Name'],
      notesRules: [
        (v) =>
          (v && v.length <= 10) ||
          'Organization must be less than 50 characters'
      ],
      imageFormData: [],
      uploadingFailed: false,
      tmpAlertActive: false
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
        this.tmpAlertActive = !newVal
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
    },
    currentFolder: {
      get() {
        return this.$store.state.inventory.currentFolder
      }
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
    await this.getInvitedUsers()
    await this.getCategories()
    this.$store.commit(
      `${MODULE_FORM}/${SET_FORM_DATA_ORIGIN}`,
      this.itemToSubmit
    )
  },
  methods: {
    ...mapActions('user', ['getInvitedUsers']),
    ...mapActions('inventory', ['createItem', 'getCategories', 'uploadImages']),
    ...mapActions('alerts', ['addAlert', 'updateAlert']),
    selectedFields(data) {
      data.forEach((item) => {
        if (!this.customFields.find((el) => item.id === el.id)) {
          item.fieldType = fieldsNamesFromBE.get(item.fieldType).name
          item.value = item.defaultValue ? item.defaultValue : ''
          delete item.defaultValue
          this.customFields.push(item)
        }
      })
    },
    changeValueCustomField(data) {
      const indexCustomField = this.itemToSubmit.customFields.findIndex(
        (el) => el.customFieldId === data.id
      )
      if (indexCustomField > -1) {
        const cF = this.itemToSubmit.customFields.find(
          (el) => el.customFieldId === data.id
        )
        cF.value = data.value
        this.itemToSubmit.customFields.splice(indexCustomField, 1, cF)
      }
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
    },
    confirmAddAlert() {
      const payload = {
        itemId: this.itemId,
        type: this.alertType,
        value: parseInt(this.alertQuantity),
        users: this.alertSelectedPeoples
      }
      const currentUserData = this.$store.getters[`${MODULE_USER}/user`]
      if (this.sendAlertToMembers) {
        if (this.sendAlertToOwners) {
          const tmp = this.alertSelectedPeoples
          tmp.push(currentUserData.id)
          payload.users = tmp
        } else payload.users = this.alertSelectedPeoples
      } else {
        if (this.sendAlertToOwners) {
          const owner = []
          owner.push(currentUserData.id)
          payload.users = owner
        } else payload.users = ''
      }
    },
    uploadImageSuccess(formData, index, fileList) {
      this.uploadingFailed = false
      this.imageFormData.push(formData)
    },
    updateImagesArray(formData, index) {
      this.imageFormData[index] = formData
      this.changedFlag = true
    },
    beforeRemove(index) {
      this.changedFlag = true
      this.imageFormData.splice(index, 1)
    },
    async validate() {
      this.customFields.forEach((item) => {
        const findingIndex = this.itemToSubmit.customFields.findIndex(
          (el) => el.customFieldId === item.id
        )
        if (findingIndex < 0) {
          this.itemToSubmit.customFields.push({
            customFieldId: item.id,
            value: '' + item.value
          })
        } else {
          this.itemToSubmit.customFields[findingIndex].value = '' + item.value
        }
      })
      if (this.$refs.form.validate()) {
        this.nameErrCnt = 1
        this.quantifyErrCnt = 1
      }
      this.uploadingFailed = false
      if (this.imageFormData !== '') {
        await this.uploadImages(this.imageFormData).then((res) => {
          if (res === 'Uploaidng failed') {
            this.uploadingFailed = true
          } else {
            this.itemToSubmit.images = res
          }
        })
      }
      if (this.currentFolder) {
        this.itemToSubmit.folder = { id: this.currentFolder }
      }
      this.$store.commit(`${MODULE_FORM}/${SET_NEED_CHECK_FORM_OFF}`)
      var createdItem = {}
      createdItem = await this.createItem(this.itemToSubmit)
      console.log(createdItem)
      /* this.alertPendingToSave.itemId = createdItem.id
      this.alertPendingToSave.archived = this.tmpAlertActive
      this.addAlert(this.alertPendingToSave)
      this.$store.commit(`${MODULE_POPUP}/${SET_PENDING_ALERT_TO_SAVE}`, null) */
    },
    editImage(formData, file) {},
    onFileInfo(file) {
      console.log(file)
    },
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
<style lang="scss">
::v-deep .v-textarea textarea {
  overflow: hidden !important;
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
      width: 120px;
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
$header-form-color: #efefef;
::v-deep .container {
  width: 100%;
  padding: 0 !important;
  margin-right: auto;
  /* margin-left: auto; */
}
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
.image-icon-small {
  height: 14px;
  width: 14px;
  margin-right: 8px;
  fill: #43425d !important;
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
.mb-2 {
  // margin-top: 20px;
}
.image-icon {
  width: 18px;
  height: 18px;
  margin-right: 10px;
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
#inspire {
  font-family: 'Sourcesanspro';

  .image-icon-small {
    height: 14px;
    width: 14px;
    margin-right: 8px;
    fill: #43425d !important;
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
    .home-content {
      padding: 0px;
    }
  }
}
</style>

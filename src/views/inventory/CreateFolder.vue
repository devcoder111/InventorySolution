<template>
  <v-container id="inspire" class="main-wrapper">
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
              <span class="text-h6 sub-title">Add Folder</span>
            </v-col>
          </v-row>
          <v-form
            class="create-folder--form"
            ref="form"
            v-model="valid"
            lazy-validation
            @keydown.native.enter='validate'
          >
            <v-row no-gutters class="pl-4 pt-4">
              <v-col style="padding-right: 45px">
                <div class="header-content">Default Information</div>
                <div class="mb-4">
                  <img
                    class="image-icon left"
                    src="@/assets/icons/svg/pencil2.svg"
                  />
                  <span class="label-text">Folder Name *</span>
                  <div class="input-mb input-box">
                    <v-text-field
                      tabindex='1'
                      @blur="isValidatedNameMethod"
                      dense
                      placeholder="Enter Folder Name"
                      v-model="folderToSubmit.name"
                      class="r-field folder-name-field"
                      :rules="nameRules"
                      required
                      maxlength="128"
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
                <div class="mb-4">
                  <img
                    class="image-icon"
                    src="@/assets/icons/svg/pencil2.svg"
                  />
                  <span class="label-text">NOTES</span>
                  <div class="input-mb input-box">
                    <v-textarea
                      tabindex='1'
                      name="input-7-4"
                      label="Enter Notes..."
                      hide-details="true"
                      single-line
                      rows="5"
                      maxlength="255"
                      v-model="folderToSubmit.notes"
                    ></v-textarea>
                  </div>
                </div>

                <div class="text-left pt-10">
                  <v-btn
                    tabindex='1'
                    @click="validate"
                    depressed
                    medium
                    :disabled="!valid"
                    class="save-folder-btn save-btn"
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
                          :data-images="folderToSubmit.images"
                          :multiple-flag="false"
                          v-model="folderToSubmit.images"
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
import {
  MODULE_POPUP,
  SET_UNSAVED_CHANGES_POPUP_SHOW,
  MODULE_FORM,
  SET_FORM_DATA_ORIGIN,
  SET_FORM_DATA_NEW,
  SET_NEED_CHECK_FORM_OFF
} from '@/store/constant/mutation-types'

export default {
  name: 'Home',
  components: {
    VueUploadMultipleImage,
    UnsavedChangesPopup
  },
  data() {
    return {
      valid: true,
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
      folderToSubmit: {
        name: '',
        notes: '',
        images: [],
        folder: ''
      },
      chips: [],
      select: ['add-tags-with', 'enter', 'tab', 'paste'],
      folders: [],
      isFormDataChanged: false,
      nameErrCnt: 0,
      nameRules: [(value) => !!value || 'Please Enter Name'],
      imageFormData: '',
      uploadingFailed: false
    }
  },
  computed: {
    ...mapGetters('inventory', ['categories']),
    isValidatedName() {
      const validRegEx = /\S+/
      return (
        this.folderToSubmit.name !== null &&
        validRegEx.test(this.folderToSubmit.name)
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
    folderToSubmit: {
      deep: true,
      handler: function (val, newVal) {
        this.$store.commit(
          `${MODULE_FORM}/${SET_FORM_DATA_NEW}`,
          this.folderToSubmit
        )
      }
    }
  },
  mounted() {},
  async created() {
    await this.getCategories()
    this.$store.commit(
      `${MODULE_FORM}/${SET_FORM_DATA_ORIGIN}`,
      this.folderToSubmit
    )
  },
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
  methods: {
    ...mapActions('inventory', [
      'createFolder',
      'getCategories',
      'uploadImage'
    ]),
    cancel() {
      this.$router.push('/inventory')
    },
    uploadImageSuccess(formData, index, fileList) {
      console.log('dd', formData)
      this.imageFormData = formData
      this.uploadingFailed = false
    },
    beforeRemove(index, done, fileList) {
      done()
    },
    editImage(formData, index, fileList) {},
    dataChange(data) {},
    async validate() {
      if (!this.$refs.form.validate()) {
        this.nameErrCnt = 1
        return
      }

      this.uploadingFailed = false
      if (this.imageFormData !== '') {
        await this.uploadImage(this.imageFormData).then((res) => {
          if (res === 'Uploaidng failed') {
            this.uploadingFailed = true
          } else {
            this.folderToSubmit.images[0] = res[0]
          }
        })
      }
      if (this.uploadingFailed) {
        return
      }

      if (this.currentFolder) {
        this.folderToSubmit.folder = { id: this.currentFolder }
      }

      this.$store.commit(`${MODULE_FORM}/${SET_NEED_CHECK_FORM_OFF}`)
      await this.createFolder(this.folderToSubmit)
    },
    setQuantity(event) {
      console.log('dd', event)
      this.folderToSubmit.quantity = event
    },
    isValidatedNameMethod() {
      const validRegEx = /\S+/
      if (
        this.folderToSubmit.name === '' &&
        !validRegEx.test(this.folderToSubmit.name)
      ) {
        this.nameErrCnt = 1
      }
    }
  }
}
</script>
<style lang="scss" scoped>
$header-form-color: #efefef;
::v-deep .v-textarea textarea {
  overflow: hidden !important;
}
::v-deep .container {
  width: 100%;
  padding: 0 !important;
  margin-right: auto;
  /* margin-left: auto; */
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

    ::v-deep .folder-name-field .mdi-checkbox-marked-circle {
      color: #22bb33 !important;
    }
    .folder-name-field > div > div > .mdi-alert-circle {
      color: red !important;
    }
    // .folder-name-field > div > div > div > div > .mdi-checkbox-marked-circle {
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
    #my-strictly-unique-vue-upload-multiple-image
      > div
      >>> .image-list-container {
      visibility: hidden !important;
    }
  }
  ::v-deep .v-messages__message {
    color: red;
    font-style: italic;
    font-size: 15px;
    text-align: right;
  }
  ::v-deep .image-list-container {
    display: none;
  }
  .v-text-field--outlined {
    border-color: rgba(192, 0, 250, 0.986);
  }
}
</style>

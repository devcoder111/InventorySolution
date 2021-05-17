<template>
  <v-container class="main-wrapper">
    <v-row class="main-title-box justify-start align-start pa-2">
      <v-col class="py-0" cols="12" sm="4">
        <span class="text-h5 main-title">Users</span>
      </v-col>
    </v-row>
    <v-row
      class="justify-start align-start pa-2 px-4"
      style="position: relative"
    >
      <v-col class="py-0" cols="12" sm="4" style="padding: 0 !important">
        <span class="text-h6 sub-title">{{ actionTitle }}</span>
      </v-col>
    </v-row>
    <v-row>
      <v-container class="lighten-5 home-content" style="max-width: 100%">
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          @keydown.native.enter='validate'
          @submit.prevent="validate"
        >
          <v-row no-gutters class="pl-4 pt-4">
            <v-col cols="12" md="7" style="padding-right: 45px">
              <div class="mb-4">
                <img
                  class="image-icon left"
                  src="@/assets/icons/svg/pencil2.svg"
                />
                <span class="label-text">First Name *</span>
                <div class="input-mb input-box">
                  <v-text-field
                    tabindex='1'
                    @blur="isValidatedNameMethod"
                    dense
                    placeholder="Enter First Name ..."
                    v-model="newUser.firstName"
                    class="r-field folder-name-field"
                    required
                    maxlength="128"
                  >
                    <template v-slot:append-outer>
                      <v-img
                        v-if="isValidatedFirstName"
                        src="@/assets/icons/svg/check-bold.svg"
                        height="28px"
                        width="28px"
                      ></v-img>
                      <v-icon
                        v-if="!isValidatedFirstName && firstNameErrCnt > 0"
                        style="color: #fe4a38"
                        >mdi-alert-circle</v-icon
                      >
                    </template>
                    <template v-slot:append>
                      <span
                        v-if="!isValidatedFirstName && firstNameErrCnt > 0"
                        class="text-subtitle2"
                        style="color: #fe4a38"
                        >Please Enter First Name</span
                      >
                    </template>
                  </v-text-field>
                </div>
              </div>
            </v-col>
            <v-col
              cols="12"
              md="7"
              style="padding-right: 45px"
              class="align-self-start"
            >
              <div class="mb-4">
                <img
                  class="image-icon left"
                  src="@/assets/icons/svg/pencil2.svg"
                />
                <span class="label-text">Last Name *</span>
                <div class="input-mb input-box">
                  <v-text-field
                    tabindex='1'
                    @blur="isValidatedLastNameMethod"
                    dense
                    placeholder="Enter Last Name ..."
                    v-model="newUser.lastName"
                    class="r-field folder-name-field"
                    required
                    maxlength="128"
                  >
                    <template v-slot:append-outer>
                      <v-img
                        v-if="isValidatedLastName"
                        src="@/assets/icons/svg/check-bold.svg"
                        height="28px"
                        width="28px"
                      ></v-img>
                      <v-icon
                        v-if="!isValidatedLastName && lastNameErrCnt > 0"
                        style="color: #fe4a38"
                        >mdi-alert-circle</v-icon
                      >
                    </template>
                    <template v-slot:append>
                      <span
                        v-if="!isValidatedLastName && lastNameErrCnt > 0"
                        class="text-subtitle2"
                        style="color: #fe4a38"
                        >Please Enter Last Name</span
                      >
                    </template>
                  </v-text-field>
                </div>
              </div>
            </v-col>

            <v-col cols="12" md="7" style="padding-right: 45px">
              <div class="mb-4">
                <img
                  class="image-icon left"
                  src="@/assets/icons/svg/email.svg"
                />
                <span class="label-text">Email *</span>
                <div class="input-mb input-box">
                  <v-text-field
                    tabindex='1'
                    @blur="isValidatedEmailMethod"
                    dense
                    placeholder="Enter Email ..."
                    v-model="newUser.email"
                    class="r-field folder-name-field"
                    required
                    maxlength="128"
                  >
                    <template v-slot:append-outer>
                      <v-img
                        v-if="isValidatedEmail"
                        src="@/assets/icons/svg/check-bold.svg"
                        height="28px"
                        width="28px"
                      ></v-img>
                      <v-icon
                        v-if="!isValidatedEmail && emailErrCnt > 0"
                        style="color: #fe4a38"
                        >mdi-alert-circle</v-icon
                      >
                    </template>
                    <template v-slot:append>
                      <span
                        v-if="!isValidatedEmail && emailErrCnt > 0"
                        class="text-subtitle2"
                        style="color: #fe4a38"
                        >Please Enter Email</span
                      >
                    </template>
                  </v-text-field>
                </div>
              </div>
            </v-col>
            <v-col cols="12" md="7" style="padding-right: 45px">
              <div class="input-box">
                <div class="mb-4 v-input" style="display: block">
                  <img
                    class="image-icon left"
                    src="@/assets/icons/svg/smartphone-call.svg"
                  />
                  <span class="label-text">Phone Number</span>
                  <phone-mask-input
                    v-model="newUser.phone"
                    defaultCountry="us"
                    showFlag
                    @onValidate="isValidatedPhoneNumberMethod"
                    wrapperClass="wrraper-phone "
                    inputClass="input-phone"
                    flagClass="flag-phone"
                  />
                </div>
              </div>
            </v-col>
            <v-col cols="12">
              <div class="text-left pt-10">
                <v-btn
                  tabindex='1'
                  @click="validate"
                  depressed
                  medium
                  :disabled="errorsExist"
                  class="save-folder-btn save-btn"
                >
                  Save User
                </v-btn>
                <v-btn
                  @click.stop="confirmDialog = true"
                  depressed
                  medium
                  class="cancel-btn"
                >
                  <span style="color: black">Cancel</span>
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </v-row>
    <v-dialog v-model="confirmDialog" persistent max-width="480">
      <v-card>
        <v-card-title
          class="headline d-flex justify-center modalTitle grey--text lighten-1--text"
          style="color: #919196 !important"
          >Unsaved Changes</v-card-title
        >
        <v-card-text style="font-size: 0.975rem"
          >Are you sure you want to leave this page without saving your
          changes</v-card-text
        >
        <v-card-actions class="text-xs-center justify-center">
          <v-btn
            color="#7972c0"
            depressed
            normal
            dark
            style="margin-right: 8px; width: 100px; text-transform: none"
            @click="confirmCancel"
            >Confirm</v-btn
          >
          <v-btn
            depressed
            normal
            color="white"
            @click="confirmDialog = false"
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
import { mapActions, mapGetters } from 'vuex'
import PhoneMaskInput from 'vue-phone-mask-input'
export default {
  component: {
    PhoneMaskInput
  },
  name: 'InviteUsers',
  data() {
    return {
      valid: true,
      firstNameErrCnt: 0,
      lastNameErrCnt: 0,
      emailErrCnt: 0,
      phoneNumberErrCnt: 0,
      confirmDialog: false,
      newUser: {
        firstName: '',
        lastName: '',
        role: 'member',
        email: '',
        phone: ''
      },
      roles: ['member', 'owner', 'user'],
      addFlag: false,
      saveBtnFlag: false
    }
  },
  computed: {
    ...mapGetters('user', ['selectedInviteUser']),
    errorsExist() {
      return !(
        this.isValidatedFirstName &&
        this.isValidatedLastName &
          this.isValidatedEmail &
          this.isValidatedPhoneNumber
      )
    },
    actionTitle() {
      return this.selectedInviteUser.firstName ? 'Edit User' : 'Add New User'
    },
    isValidatedFirstName() {
      const validRegEx = /\S+/
      return (
        this.newUser.firstName !== null &&
        validRegEx.test(this.newUser.firstName)
      )
    },
    isValidatedLastName() {
      const validRegEx = /\S+/
      return (
        this.newUser.lastName !== null && validRegEx.test(this.newUser.lastName)
      )
    },
    isValidatedEmail() {
      const validRegEx = /.+@.+\..+/
      return this.newUser.email !== null && validRegEx.test(this.newUser.email)
    },
    isValidatedPhoneNumber() {
      const validRegEx = /\+[0-9]+/
      const condition = validRegEx.test('+' + this.newUser.phone)
      console.log('condition: ' + condition)
      return (
        this.newUser.phone !== null && validRegEx.test('+' + this.newUser.phone)
      )
    }
  },
  created() {
    this.newUser = this.selectedInviteUser
  },
  mounted() {
    if (this.selectedInviteUser.firstName) {
      this.newUser = JSON.parse(JSON.stringify(this.selectedInviteUser))
      console.log('newuser', this.newUser)
      this.addFlag = false
    } else {
      this.addFlag = true
    }
    this.saveBtnFlag = false
  },
  beforeDestroy() {
    this.$store.commit('user/set', {
      type: 'user',
      val: {}
    })
  },
  beforeRouteLeave(to, from, next) {
    if (this.saveBtnFlag) {
      console.log('e')
      next()
    } else this.confirmDialog = true
  },
  methods: {
    ...mapActions('user', ['inviteUser', 'updateUser']),
    isValidatedNameMethod() {
      const validRegEx = /\S+/
      if (
        this.newUser.firstName === '' &&
        !validRegEx.test(this.newUser.firstName)
      ) {
        this.firstNameErrCnt = 1
      }
    },
    isValidatedLastNameMethod() {
      const validRegEx = /\S+/
      if (
        this.newUser.lastName === '' &&
        !validRegEx.test(this.newUser.lastName)
      ) {
        this.lastNameErrCnt = 1
      }
    },
    isValidatedEmailMethod() {
      const validRegEx = /.+@.+\..+/
      if (this.newUser.email === '' || !validRegEx.test(this.newUser.email)) {
        this.emailErrCnt = 1
      }
    },
    isValidatedPhoneNumberMethod() {
      const validRegEx = /\+[0-9]+/
      if (!validRegEx.test('+' + this.newUser.phone)) {
        this.phoneNumberErrCnt = 1
      }
    },
    async validate() {
      this.saveBtnFlag = true
      if (!this.$refs.form.validate()) {
        this.firstNameErrCnt = 1
        this.lastNameErrCnt = 1
        this.emailErrCnt = 1
        this.phoneNumberErrCnt = 1
      }

      if (this.addFlag) {
        this.inviteUser(this.newUser)
      } else {
        this.newUser.userId = this.newUser.id
        delete this.newUser.id
        this.updateUser(this.newUser)
      }
    },
    confirmCancel() {
      this.saveBtnFlag = true
      this.confirmDialog = false
      this.$router.push({ name: 'Users' })
    }
  }
}
</script>

<style lang="scss">
.home-content {
  padding: 0px;
  .header-content {
    color: #73727e;
    font-weight: 600;
    margin-bottom: 16px;
    font-size: 20px;
  }
  .header-content1 {
    color: #798393;
    font-weight: 600;
    margin-bottom: 16px;
    font-size: 20px;
  }
  .label-text {
    color: #43425d;
    text-transform: uppercase;
    position: relative;
    font-size: 18px;
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
.v-input
  .v-input__control
  .v-input__slot
  .v-text-field__slot
  input::-webkit-outer-spin-button,
.v-input
  .v-input__control
  .v-input__slot
  .v-text-field__slot
  input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.wrraper-phone {
  display: flex;
}
.input-phone {
  width: 100%;
  height: 45px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.42);
  outline: none !important;
}
.input-phone:hover {
  border-bottom: 1px solid rgba(0, 0, 0, 0.87);
}
.input-phone:focus {
  border-bottom: 1px solid rgba(0, 0, 0, 0.87);
}
.flag-phone {
  vertical-align: middle;
}
</style>

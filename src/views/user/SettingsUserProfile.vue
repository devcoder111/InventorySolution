<template>
  <v-container class="px-8 lighten-5 home-content" style="max-width: 100%">
    <v-row>
      <v-col cols="12">
        <v-breadcrumbs divider=">" class="px-0 pt-0 breadcrumbs">
          <v-breadcrumbs-item
            v-for="item in navSettingsOptions"
            :key="item.index"
          >
            <span class="text-breadcum-settings cursor-point"
              >{{ item.text }}
              <v-icon style="font-size: 1.2rem">mdi-chevron-right</v-icon>
            </span>
          </v-breadcrumbs-item>
        </v-breadcrumbs>
      </v-col>
    </v-row>
    <p class="option-title">Personal Information</p>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      @submit.prevent="validate"
      @keydown.native.enter='validate'
    >
      <v-row no-gutters class="pt-4">
        <v-col cols="12" md="7" style="padding-right: 45px">
          <div class="mb-4">
            <img class="image-icon left" src="@/assets/icons/svg/pencil2.svg" />
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
                    style="
                      color: #fe4a38;
                      position: relative;
                      top: 25px;
                      left: 0px;
                    "
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
            <img class="image-icon left" src="@/assets/icons/svg/pencil2.svg" />
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
                    style="
                      color: #fe4a38;
                      position: relative;
                      top: 25px;
                      left: 0px;
                    "
                    >Please Enter Last Name</span
                  >
                </template>
              </v-text-field>
            </div>
          </div>
        </v-col>
        <!-- <v-col cols="12" md="7" style="padding-right: 45px">
          <div class="mb-4">
            <img
              class="image-icon left"
              src="@/assets/icons/svg/businessman.svg"
            />
            <span class="label-text">Role</span>
            <div class="input-mb input-box">
              <v-select v-model="newUser.role" :items="roles"> </v-select>
            </div>
          </div>
        </v-col> -->
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
                wrapperClass="wrraper-phone"
                inputClass="input-phone"
                flagClass="flag-phone"
              />
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="7" style="padding-right: 45px">
          <div class="mb-4">
            <img class="image-icon left" src="@/assets/icons/svg/email.svg" />
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
                readonly
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
                    style="
                      color: #fe4a38;
                      position: relative;
                      top: 25px;
                      left: 0px;
                    "
                    >Please Enter Email</span
                  >
                </template>
              </v-text-field>
            </div>
          </div>
        </v-col>
        <v-row v-if="changingPassword">
          <v-col cols="12" md="7" style="padding-right: 45px">
            <p class="option-title">Change Password</p>
          </v-col>
          <v-col cols="12" md="7" style="padding-right: 45px">
            <div class="mb-4">
              <img
                class="image-icon left"
                src="@/assets/icons/svg/pencil2.svg"
              />
              <span class="label-text">Current Password *</span>
              <div class="input-mb input-box">
                <v-text-field
                  tabindex='1'
                  @blur="isValidatedCurrentPasswordMethod"
                  dense
                  type="password"
                  placeholder="Current Password ..."
                  v-model="newUser.password"
                  class="r-field folder-name-field"
                  required
                  maxlength="36"
                >
                  <template v-slot:append-outer>
                    <v-img
                      v-if="isValidatedCurrentPassword"
                      src="@/assets/icons/svg/check-bold.svg"
                      height="28px"
                      width="28px"
                    ></v-img>
                    <v-icon
                      v-if="
                        !isValidatedCurrentPassword && currentPasswordErrCnt > 0
                      "
                      style="color: #fe4a38"
                      >mdi-alert-circle</v-icon
                    >
                  </template>
                  <template v-slot:append>
                    <span
                      v-if="
                        !isValidatedCurrentPassword && currentPasswordErrCnt > 0
                      "
                      class="text-subtitle2"
                      style="
                        color: #fe4a38;
                        position: relative;
                        top: 25px;
                        left: 0px;
                      "
                      >Invalid Password</span
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
                src="@/assets/icons/svg/pencil2.svg"
              />
              <span class="label-text">New Password *</span>
              <div class="input-mb input-box">
                <v-text-field
                  tabindex='1'
                  @blur="isValidatedNewPasswordMethod"
                  dense
                  type="password"
                  placeholder="New Password ..."
                  v-model="newUser.newPassword"
                  class="r-field folder-name-field"
                  required
                  maxlength="36"
                >
                  <template v-slot:append-outer>
                    <v-img
                      v-if="isValidatedNewPassword"
                      src="@/assets/icons/svg/check-bold.svg"
                      height="28px"
                      width="28px"
                    ></v-img>
                    <v-icon
                      v-if="!isValidatedNewPassword && newPasswordErrCnt > 0"
                      style="color: #fe4a38"
                      >mdi-alert-circle</v-icon
                    >
                  </template>
                  <template v-slot:append>
                    <span
                      v-if="!isValidatedNewPassword && newPasswordErrCnt > 0"
                      class="text-subtitle2"
                      style="
                        color: #fe4a38;
                        position: relative;
                        top: 25px;
                        left: 0px;
                      "
                      >Invalid Password</span
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
                src="@/assets/icons/svg/pencil2.svg"
              />
              <span class="label-text">Password Confirmation *</span>
              <div class="input-mb input-box">
                <v-text-field
                  tabindex='1'
                  @blur="isValidatedPasswordConfirmationMethod"
                  dense
                  type="password"
                  :rules="passwordRules"
                  placeholder="Password Confirmation ..."
                  v-model="newUser.passwordConfirmation"
                  class="r-field folder-name-field"
                  required
                  maxlength="36"
                >
                  <template v-slot:append-outer>
                    <v-img
                      v-if="isValidatedPasswordConfirmation"
                      src="@/assets/icons/svg/check-bold.svg"
                      height="28px"
                      width="28px"
                    ></v-img>
                    <v-icon
                      v-if="
                        !isValidatedPasswordConfirmation &&
                        passwordConfirmationErrCnt > 0
                      "
                      style="color: #fe4a38"
                      >mdi-alert-circle</v-icon
                    >
                  </template>
                  <template v-slot:append>
                    <span
                      v-if="
                        !isValidatedPasswordConfirmation &&
                        passwordConfirmationErrCnt > 0
                      "
                      class="text-subtitle2"
                      style="
                        color: #fe4a38;
                        position: relative;
                        top: 25px;
                        left: 0px;
                      "
                      >Invalid Password</span
                    >
                  </template>
                </v-text-field>
              </div>
            </div>
          </v-col>
        </v-row>
        <v-col cols="12" md="7" style="padding-right: 45px">
          <div class="d-flex pt-10 justify-space-between">
            <v-btn
              tabindex='1'
              @click="validate"
              depressed
              medium
              :disabled="errorsExist"
              dark
              class="save-folder-btn"
            >
              Save Changes
            </v-btn>
            <span
              tabindex='1'
              v-if="!changingPassword"
              class="cursor-point"
              style="
                color: #7971c4;
                text-decoration: underline;
                font-size: 16px;
              "
              @click="changingPassword = true"
            >
              Change Password
            </span>
          </div>
        </v-col>
      </v-row>
    </v-form>
    <v-dialog v-model="confirmDialog" persistent max-width="480">
      <v-card>
        <v-card-title class="d-flex justify-center mb-8"
          ><span class="confirm-title" style="color: #919196 !important"
            >Unsaved Changes</span
          ></v-card-title
        >
        <v-card-text class="confirm-text mb-8" style="font-size: 0.975rem"
          >Are you sure you want to leave this page without saving your
          changes</v-card-text
        >
        <v-card-actions class="text-xs-center justify-center">
          <v-btn
            depressed
            normal
            dark
            style="
              margin-right: 8px;
              width: 100px;
              text-transform: none;
              background-color: #7972c0;
              color: white;
              font-weight: 500;
            "
            @click="confirmCancel"
            >Confirm</v-btn
          >
          <v-btn
            depressed
            normal
            @click="confirmDialog = false"
            style="
              padding: 0 18.4444444444px;
              width: 100px;
              color: #7972c0;
              background-color: white;
              border: 1px solid #7972c0 !important;
              text-transform: none;
            "
            ><span>Cancel</span></v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import PhoneMaskInput from 'vue-phone-mask-input'
export default {
  name: 'SettingsUserProfile',
  components: {
    PhoneMaskInput
  },
  data() {
    return {
      changingPassword: false,
      navSettingsOptions: [
        {
          index: 1,
          text: 'Settings'
        },
        {
          index: 2,
          text: 'User Profile'
        }
      ],
      valid: true,
      firstNameErrCnt: 0,
      lastNameErrCnt: 0,
      emailErrCnt: 0,
      phoneNumberErrCnt: 0,
      currentPasswordErrCnt: 0,
      newPasswordErrCnt: 0,
      passwordConfirmationErrCnt: 0,
      confirmDialog: false,
      newUser: {
        firstName: '',
        lastName: '',
        role: 'member',
        email: '',
        phone: '',
        password: '',
        newPassword: '',
        passwordConfirmation: ''
      },
      roles: ['member', 'owner', 'user'],
      passwordRules: [
        (value) => !!value || 'This field is Required',
        (v) => v.length >= 6 || 'Min 6 characters',
        (v) =>
          (!!v && v) === this.newUser.newPassword || 'Passwords do not match'
      ],
      addFlag: false,
      saveBtnFlag: false
    }
  },
  computed: {
    ...mapGetters('user', ['user']),
    errorsExist() {
      if (this.changingPassword) {
        return !(
          this.isValidatedFirstName &&
          this.isValidatedLastName &&
          this.isValidatedEmail &&
          this.isValidatedPhoneNumber &&
          this.isValidatedCurrentPassword &&
          this.isValidatedNewPassword &&
          this.isValidatedPasswordConfirmation
        )
      } else {
        return !(
          this.isValidatedFirstName &&
          this.isValidatedLastName &&
          this.isValidatedEmail &&
          this.isValidatedPhoneNumber
        )
      }
    },
    actionTitle() {
      return this.user.firstName ? 'Edit User' : 'Add New User'
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
    },
    isValidatedCurrentPassword() {
      return this.newUser.password !== null && this.newUser.password.length > 4
    },
    isValidatedNewPassword() {
      return (
        this.newUser.newPassword !== null && this.newUser.newPassword.length > 4
      )
    },
    isValidatedPasswordConfirmation() {
      return (
        this.newUser.passwordConfirmation !== null &&
        this.newUser.passwordConfirmation.length > 4 &&
        this.newUser.passwordConfirmation === this.newUser.newPassword
      )
    }
  },
  created() {
    const curUserData = JSON.parse(localStorage.getItem('curUserData'))
    this.newUser.firstName = curUserData.firstName
    this.newUser.lastName = curUserData.lastName
    this.newUser.email = curUserData.email
    this.newUser.phone = curUserData.phone
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
    isValidatedCurrentPasswordMethod() {
      if (!this.newUser.password.length > 0) {
        this.currentPasswordErrCnt = 1
      }
    },
    isValidatedNewPasswordMethod() {
      if (this.newUser.newPassword.length <= 4) {
        this.newPasswordErrCnt = 1
      }
    },
    isValidatedPasswordConfirmationMethod() {
      if (
        !this.newUser.passwordConfirmation.length > 0 ||
        this.newUser.passwordConfirmation !== this.newUser.newPassword
      ) {
        this.passwordConfirmationErrCnt = 1
      }
    },
    async validate() {
      this.update()
      console.log('changingpassword', this.changingPassword)
      if (this.changingPassword) this.changePassword()
    },
    update() {
      const curUserData = JSON.parse(localStorage.getItem('curUserData'))
      this.$store.dispatch('user/update', {
        userId: curUserData.id,
        firstName: this.newUser.firstName,
        lastName: this.newUser.lastName,
        email: this.newUser.email,
        phone: this.newUser.phone
      })
    },
    changePassword() {
      // const curUserData = JSON.parse(localStorage.getItem('curUserData'))
      this.$store
        .dispatch('user/changePassword', {
          oldPassword: this.newUser.password,
          password: this.newUser.newPassword
        })
        .then((res) => {
          console.log('res', res)
          if (res.data.error.type === 200) {
            this.$toasted.error(res.data.data, {
              theme: 'toasted-primary',
              position: 'bottom-right',
              duration: 5000
            })
            this.$router.push({ name: 'Users' })
          } else {
            this.$toasted.error('Incorrect Password', {
              theme: 'toasted-primary',
              position: 'bottom-right',
              duration: 5000
            })
          }
        })
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
.confirm-title {
  font-family: 'Sourcesanspro' !important;
  color: #b2b2b2;
  font-size: 28px;
  font-weight: 500;
}
.confirm-text {
  font-size: 20px;
  color: #979797;
  font-weight: 500;
  font-family: 'Sourcesanspro' !important;
}

.option-title {
  font-size: 26px;
  font-weight: 500;
  font-family: 'Sourcesanspro' !important;
}
.save-folder-btn {
  width: 140px;
  background-image: linear-gradient(to right, #8074c2, #4c486b);
  color: white !important;
  text-transform: capitalize;
  font-size: 1rem !important;
}
.cancel-btn {
  width: 120px;
  margin-left: 15px;
  border: 1px solid #6452a2;
  background-color: #f5f5f5 !important;
  color: #6452a2 !important;
  text-transform: capitalize;
  font-size: 1rem !important;
}
.save-folder-btn:hover {
  background-color: #f5f5f5 !important;
  color: white !important;
}
.cancel-btn:hover {
  color: white !important;
  background-image: linear-gradient(to right, #8074c2, #4c486b);
  -webkit-text-fill-color: white;
}

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
.flag-phone {
  vertical-align: middle;
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
</style>

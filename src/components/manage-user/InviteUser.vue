<template>
  <v-row>
    <v-dialog v-model="inviteDialog" persistent max-width="600px">
      <v-card>
        <v-form ref="form" @submit.prevent="validate">
          <v-card-title class="headline grey lighten-2" primary-title>
            <span class="headline" style="color: #919196 !important"
              >Invite User</span
            >
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12"><span class="userInfo">User Info</span></v-col>
                <v-col cols="12" sm="6" md="4" align="left">
                  <span style="font-weight: 600" class="label-field"
                    >First name</span
                  >
                  <v-text-field
                    @blur="isValidatedFirstNameMethod"
                    v-model="userToSubmit.firstName"
                    :rules="nameRules"
                    placeholder="First Name"
                    required
                    class="r-field invite-input"
                    :append-icon="
                      isValidatedFirstName ? 'mdi-checkbox-marked-circle' : ''
                    "
                    :append-outer-icon="
                      firstNameErrCnt == 0
                        ? ''
                        : isValidatedFirstName
                        ? ''
                        : 'mdi-alert-circle'
                    "
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4" align="left">
                  <span style="font-weight: 600" class="label-field"
                    >Last name</span
                  >
                  <v-text-field
                    @blur="isValidatedLastNameMethod"
                    v-model="userToSubmit.lastName"
                    :rules="nameRules"
                    placeholder="Last Name"
                    required
                    :append-icon="
                      isValidatedLastName ? 'mdi-checkbox-marked-circle' : ''
                    "
                    :append-outer-icon="
                      lastNameErrCnt == 0
                        ? ''
                        : isValidatedLastName
                        ? ''
                        : 'mdi-alert-circle'
                    "
                    class="r-field invite-input"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4" align="left">
                  <span style="font-weight: 600" class="label-field"
                    >Phone Number</span
                  >
                  <!-- <v-text-field
                    @blur="isValidatedPhoneMethod"
                    v-model="userToSubmit.phone"
                    :rules="phoneRules"
                    placeholder="Phone Number"
                    required
                    :append-icon="
                      isValidatedPhone ? 'mdi-checkbox-marked-circle' : ''
                    "
                    :append-outer-icon="
                      phoneErrCnt == 0
                        ? ''
                        : isValidatedPhone
                        ? ''
                        : 'mdi-alert-circle'
                    "
                    class="r-field invite-input"
                  ></v-text-field> -->
                  <phone-mask-input
                    v-model="userToSubmit.phone"
                    defaultCountry="us"
                    showFlag
                    @onValidate="isValidatedPhoneMethod"
                    wrapperClass="wrraper-example"
                    inputClass="input-example"
                    flagClass="flag-example"
                  />
                </v-col>
                <v-col cols="12" sm="8" align="left">
                  <span style="font-weight: 600" class="label-field"
                    >Email</span
                  >
                  <v-text-field
                    @blur="isValidatedEmailMethod"
                    v-model="userToSubmit.email"
                    :rules="emailRules"
                    placeholder="Email"
                    required
                    class="r-field invite-input"
                    :append-icon="
                      isValidatedEmail ? 'mdi-checkbox-marked-circle' : ''
                    "
                    :append-outer-icon="
                      emailErrCnt == 0
                        ? ''
                        : isValidatedEmail
                        ? ''
                        : 'mdi-alert-circle'
                    "
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" align="role">
                  <span style="font-weight: 600" class="label-field">Role</span>
                  <v-select
                    :items="roles"
                    v-model="userToSubmit.role"
                    placeholder="Role"
                    required
                    class="r-field invite-input"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row class="footer">
                <span class="footer--text"
                  >Copyright 2020-2021 <span style="color: #7972c0"><a href="/" target="_blank" title="BRITECHECK">BRITECHECK</a></span>,
                  All rights reserved.</span
                >
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              class="cancel-btn"
              height="40"
              text
              @click.stop="inviteDialog = false"
            >
              Cancel
            </v-btn>
            <v-btn
              text
              height="40"
              @click="closeDialog"
              class="invite-user-btn"
              type="submit"
            >
              Invite User
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { mapActions } from 'vuex'
import PhoneMaskInput from 'vue-phone-mask-input'

export default {
  component: {
    PhoneMaskInput
  },
  props: ['value'],
  data() {
    return {
      nameRules: [(value) => !!value || 'This field is Required'],
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      phoneRules: [
        (v) =>
          /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/.test(v) ||
          'Number should be valid'
      ],
      roles: ['user'],
      users: [],
      showEditUser: false,
      userToSubmit: {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        role: ''
      },
      firstNameErrCnt: 0,
      lastNameErrCnt: 0,
      emailErrCnt: 0,
      phoneErrCnt: 0,
      roleErrCnt: 0
    }
  },
  mounted() {
    console.log('invite user mounted')
  },
  created() {
    console.log('invite user created')
  },
  computed: {
    inviteDialog: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    },
    isValidatedFirstName() {
      const validRegEx = /\S+/
      return (
        this.userToSubmit.firstName !== null &&
        validRegEx.test(this.userToSubmit.firstName)
      )
    },
    isValidatedLastName() {
      const validRegEx = /\S+/
      return (
        this.userToSubmit.lastName !== null &&
        validRegEx.test(this.userToSubmit.lastName)
      )
    },
    isValidatedPhone() {
      const validRegEx = /^([+]\d{11,14})|(\d{11,14})$/
      return (
        this.userToSubmit.phone !== null &&
        validRegEx.test(this.userToSubmit.phone)
      )
    },
    isValidatedEmail() {
      const validRegEx = /\S+@\S+\.\S+/
      return (
        this.userToSubmit.email !== null &&
        validRegEx.test(this.userToSubmit.email)
      )
    }
  },
  methods: {
    ...mapActions('user', ['inviteUser']),
    submitUser() {
      this.inviteUser(this.userToSubmit)
      this.resetForm()
    },
    validate() {
      if (
        this.isValidatedFirstName &&
        this.isValidatedLastName &&
        this.isValidatedPhone &&
        this.isValidatedEmail
      ) {
        this.submitUser()
        setTimeout(
          function () {
            // this.userToSubmit.firstName = ''
            // this.userToSubmit.lastName = ''
            // this.userToSubmit.email = ''
            // this.userToSubmit.phone = ''
            // this.userToSubmit.role = ''
            this.firstNameErrCnt = 0
            this.lastNameErrCnt = 0
            this.emailErrCnt = 0
            this.phoneErrCnt = 0
          }.bind(this),
          2000
        )
      }
    },
    closeDialog() {
      if (
        this.isValidatedFirstName &&
        this.isValidatedLastName &&
        this.isValidatedPhone &&
        this.isValidatedEmail
      ) {
        this.inviteDialog = false
      }
    },
    resetForm() {
      this.$refs.form.reset()
      this.$refs.form.resetValidation()
      this.userToSubmit.firstName = ''
      this.userToSubmit.lastName = ''
      this.firstNameErrCnt = 0
      this.lastNameErrCnt = 0
      this.emailErrCnt = 0
      this.phoneErrCnt = 0
    },
    isValidatedFirstNameMethod() {
      const validRegEx = /\S+/
      if (
        this.userToSubmit.firstName === '' &&
        !validRegEx.test(this.userToSubmit.firstName)
      ) {
        this.firstNameErrCnt = 1
      }
    },
    isValidatedLastNameMethod() {
      const validRegEx = /\S+/
      if (
        this.userToSubmit.lastName === '' &&
        !validRegEx.test(this.userToSubmit.lastName)
      ) {
        this.lastNameErrCnt = 1
      }
    },
    isValidatedEmailMethod() {
      const validRegEx = /\S+@\S+\.\S+/
      if (
        this.userToSubmit.email === '' &&
        !validRegEx.test(this.userToSubmit.email)
      ) {
        this.emailErrCnt = 1
      }
    },
    isValidatedPhoneMethod() {
      const validRegEx = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/
      if (
        this.userToSubmit.phone === '' &&
        !validRegEx.test(this.userToSubmit.phone)
      ) {
        this.phoneErrCnt = 1
      }
    }
  },
  watch: {
    isValidatedFirstName: {
      deep: true,
      handler: function (newVal) {
        if (this.firstNameErrCnt !== 0) this.firstNameErrCnt++
      }
    },
    isValidatedLastName: {
      deep: true,
      handler: function (newVal) {
        this.lastNameErrCnt++
      }
    },
    isValidatedEmail: {
      deep: true,
      handler: function (newVal) {
        this.emailErrCnt++
      }
    },
    isValidatedPhone: {
      deep: true,
      handler: function (newVal) {
        this.phoneErrCnt++
      }
    }
  }
}
</script>
<style scoped>
.wrraper-example {
  display: inline-flex;
}
</style>

<template>
  <v-card flat>
    <v-form class="signup-form" ref="form" v-model="valid" lazy-validation @keydown.native.enter='validate'>
      <v-card-text align="left">
        <div class="row">
          <v-col cols="12" v-if="errMsg" class="signup-errMsg">
            This email address is already in use.
          </v-col>
        </div>
        <v-text-field
          tabindex='1'
          @blur="isValidatedFirstNameMethod"
          v-model="firstName"
          :rules="nameRules"
          placeholder="First Name"
          required
          class="r-field register-input login-input"
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
        <v-text-field
          tabindex='1'
          @blur="isValidatedLastNameMethod"
          v-model="lastName"
          :rules="nameRules"
          placeholder="Last Name"
          required
          :append-icon="isValidatedLastName ? 'mdi-checkbox-marked-circle' : ''"
          :append-outer-icon="
            lastNameErrCnt == 0
              ? ''
              : isValidatedLastName
              ? ''
              : 'mdi-alert-circle'
          "
          class="r-field register-input login-input"
        ></v-text-field>
        <v-text-field
          tabindex='1'
          @blur="isValidatedEmailMethod"
          v-model="email"
          :rules="emailRules"
          placeholder="Email address"
          required
          class="r-field register-input login-input"
          :append-icon="isValidatedEmail ? 'mdi-checkbox-marked-circle' : ''"
          :append-outer-icon="
            emailErrCnt == 0 ? '' : isValidatedEmail ? '' : 'mdi-alert-circle'
          "
        ></v-text-field>
        <v-text-field
          tabindex='1'
          @blur="isValidatedPassMethod"
          v-model="password"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="passwordRules"
          :type="showPassword ? 'text' : 'password'"
          name="password"
          placeholder="Enter a password"
          hint=""
          required
          @click:append="showPassword = !showPassword"
          :append-outer-icon="
            pwdErrCnt == 0
              ? ''
              : isValidatedPass
              ? 'mdi-checkbox-marked-circle'
              : 'mdi-alert-circle'
          "
          class="r-field register-pass login-input"
        ></v-text-field>
        <v-text-field
          tabindex='1'
          @blur="isValidatedConfirmPassMethod"
          v-model="confirmPassword"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="passwordRules"
          :type="showPassword ? 'text' : 'password'"
          name="password"
          placeholder="Confirm password"
          hint=""
          required
          @click:append="showPassword = !showPassword"
          :append-outer-icon="
            pwdConfirmErrCnt == 0
              ? ''
              : isValidatedConfirmPass
              ? 'mdi-checkbox-marked-circle'
              : 'mdi-alert-circle'
          "
          class="r-field register-pass login-input"
        ></v-text-field>
        <div class="d-flex align-center">
          <v-checkbox
            tabindex='1'
            v-model="agreement"
            value="1"
            label="I agree with terms and conditions"
            type="checkbox"
            color="#12ba81"
            class="agree-label"
            :rules="[(v) => !!v || 'You must agree before submitting']"
            @click.native="changecolor"
            required
            ><template v-slot:label>
              <div class="white" style="padding-left: 7px">
                <span
                  class="agree-terms"
                  :style="[
                    color_checkbox ? { color: '#413967' } : { color: '#12ba81' }
                  ]"
                >
                  I agree with terms and conditions
                </span>
              </div>
            </template>
          </v-checkbox>
          <v-spacer></v-spacer>
        </div>
      </v-card-text>
      <v-card-text class="btn-block">
        <div
          cols="12"
          md="6"
          class="d-flex justify-end flex-row"
          style="display: flex; justify-content: flex-start"
        >
          <v-btn
            tabindex='1'
            :disabled="!valid"
            @click="validate"
            class="signup-submit"
            height="42"
            >Sign Up</v-btn
          >
        </div>
      </v-card-text>
    </v-form>
  </v-card>
</template>
<script>
export default {
  name: 'RegisterForm',
  data() {
    return {
      agreement: false,
      firstName: '',
      lastName: '',
      userName: '',
      showPassword: false,
      valid: true,
      email: '',
      password: '',
      errMsg: false,
      firstNameErrCnt: 0,
      lastNameErrCnt: 0,
      emailErrCnt: 0,
      pwdErrCnt: 0,
      pwdConfirmErrCnt: 0,
      nameRules: [(value) => !!value || 'This field is Required'],
      passwordRules: [
        (value) => !!value || 'This field is Required',
        (v) => v.length >= 6 || 'Min 6 characters',
        (v) => (!!v && v) === this.password || 'Passwords do not match'
      ],
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      validPassRegEx: /^.{6,}$/,
      color_checkbox: true
    }
  },
  computed: {
    isValidatedFirstName() {
      const validRegEx = /\S+/
      return this.firstName !== null && validRegEx.test(this.firstName)
    },
    isValidatedLastName() {
      const validRegEx = /\S+/
      return this.lastName !== null && validRegEx.test(this.lastName)
    },
    isValidatedUserName() {
      const validRegEx = /\S+/
      return this.userName !== null && validRegEx.test(this.userName)
    },
    isValidatedEmail() {
      const validRegEx = /\S+@\S+\.\S+/
      return this.email !== null && validRegEx.test(this.email)
    },
    isValidatedPass() {
      return this.password !== null && this.validPassRegEx.test(this.password)
    }
  },
  watch: {
    isValidatedFirstName: {
      deep: true,
      handler: function (newVal) {
        this.firstNameErrCnt++
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
    isValidatedPass: {
      deep: true,
      handler: function (newVal) {
        this.pwdErrCnt++
      }
    }
  },
  methods: {
    changecolor() {
      this.color_checkbox = !this.color_checkbox
    },
    isValidatedFirstNameMethod() {
      const validRegEx = /\S+/
      if (this.firstName === '' && !validRegEx.test(this.firstName)) {
        this.firstNameErrCnt = 1
      }
    },
    isValidatedLastNameMethod() {
      const validRegEx = /\S+/
      if (this.lastName === '' && !validRegEx.test(this.lastName)) {
        this.lastNameErrCnt = 1
      }
    },
    isValidatedEmailMethod() {
      const validRegEx = /\S+@\S+\.\S+/
      if (this.email === '' && !validRegEx.test(this.email)) {
        this.emailErrCnt = 1
      }
    },
    isValidatedPassMethod() {
      const validRegEx = /^.{1,}$/
      if (this.password === '' && !validRegEx.test(this.password)) {
        this.pwdErrCnt = 1
      }
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.register()
      }
    },
    async register() {
      await this.$store
        .dispatch('user/register', {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password
        })
        .then((res) => {
          if (res === undefined) this.errMsg = true
          else this.errMsg = false
        })
    }
  }
}
</script>
<style lang="css">
.btn-block {
  padding: 0 16px !important;
}
.login-input::placeholder {
  color: #333 !important;
}
.login-input {
  font-size: 1.1rem !important;
}
.forgot-link {
  color: #7671bd !important;
  font-weight: 500;
  font-size: 1.1rem !important;
  margin-top: 20px;
  font-family: 'Sourcesanspro';
  text-decoration: none;
}
.forgot-link:hover {
  text-decoration: underline;
}
.signup-form {
  font-size: 1.2rem !important;
  color: #413967;
  font-family: 'Sourcesanspro';
}
.label-field {
  font-size: 1.2rem !important;
}
.signup-submit {
  font-weight: 500;
  width: 160px !important;
  width: 80%;
  background-color: #7671bd !important;
  color: white !important;
  font-weight: 500;
  text-transform: uppercase;
  font-size: 1rem !important;
  transition: 0.3s;
}
.theme--light.v-btn.v-btn--disabled:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
  background-color: #584c8e !important;
}
.signup-submit:hover {
  width: 80%;
  background-color: #534f8c !important;
  color: white !important;
  font-weight: 500;
  font-size: 1rem !important;
}
.v-textfield {
  margin-top: 0px;
  padding-top: unset;
}
.r-field {
  padding-top: unset;
  margin-top: unset;
}
.register-input > div > div > .mdi-alert-circle,
.register-pass > div > div > .mdi-alert-circle {
  color: #f54646 !important;
}
.register-input > div > div > div > div > .mdi-checkbox-marked-circle,
.register-pass > div > div > .mdi-checkbox-marked-circle {
  color: #12ba81 !important;
}
.v-icon.v-icon.v-icon--link {
  color: #9a97a7 !important;
}
.terms-policy {
  margin-top: 50px;
}
.terms-policy .subtitle-2 {
  color: #414c6c;
  font-size: 16px !important;
  text-decoration: none;
  font-weight: bold;
  margin-left: 0.5em;
}
.already-account {
  color: #343235 !important;
  font-weight: bold;
  font-size: 1rem;
}
.already-account a {
  text-decoration: underline;
  color: #354d7d;
}
.v-messages__message {
  color: #df3030;
  font-size: 13px;
}
.signup-errMsg {
  padding: 0;
  font-size: 18px;
  color: #df3030;
  text-align: center;
  margin-bottom: 20px;
}
.agree-terms {
  font-weight: 500;
  font-size: 1rem;
  font-family: 'Sourcesanspro';
}
.agree-label .v-input__slot i {
  font-size: 20px;
  font-family: 'Sourcesanspro';
}
.already-account a {
  cursor: pointer;
}
.v-text-field > .v-input__control > .v-input__slot:after {
  border-color: #7671bd !important;
}
.theme--light.v-btn.v-btn--disabled:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
  color: #dfddec !important;
}
</style>

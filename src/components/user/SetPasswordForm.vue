<template>
  <v-card flat>
    <v-form class="resetPwd-form" ref="form" v-model="valid" lazy-validation>
      <v-card-text align="left">
        <v-text-field
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
          class="r-field register-pass"
        ></v-text-field>
        <v-text-field
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
          class="r-field register-pass"
        ></v-text-field>
      </v-card-text>
      <v-row>
        <v-col cols="12" md="3"></v-col>
        <v-col cols="12" md="6">
          <v-btn
            :disabled="!valid"
            @click="validate"
            class="resetPwd-submit"
            height="48"
            >Set Password</v-btn
          >
        </v-col>
        <v-col cols="12" md="3"></v-col>
      </v-row>
      <v-row style="display: flex; justify-content: center">
        <p class="text-center reset-notification" v-if="notifyMsg">
          Password has been set successfully.
          <br>
          You will be redirected to <a class="mx-1" small depressed @click="$router.push({ name: 'Login' })">Sign In</a> within few seconds.
        </p>
      </v-row>
      <v-card-text class="text-center terms-policy">
        <a class="subtitle-2" href="terms-of-use.html">Term of use</a> &
        <a class="subtitle-2" href="privacy-policy.html">Privacy policy</a>
      </v-card-text>
    </v-form>
  </v-card>
</template>
<script>
export default {
  name: 'ResetPasswordForm',
  data() {
    return {
      showPassword: false,
      valid: true,
      password: '',
      confirmPassword: '',
      errMsg: false,
      pwdErrCnt: 0,
      pwdConfirmErrCnt: 0,
      passwordRules: [
        (value) => !!value || 'This field is Required',
        (v) => v.length >= 6 || 'Min 6 characters',
        (v) => (!!v && v) === this.password || 'Passwords do not match'
      ],
      validPassRegEx: /^.{6,}$/,
      notifyMsg: false
    }
  },
  computed: {
    isValidatedPass() {
      return this.password !== null && this.validPassRegEx.test(this.password)
    },
    isValidatedConfirmPass() {
      return (
        this.confirmPassword !== null &&
        this.validPassRegEx.test(this.confirmPassword) &&
        this.confirmPassword === this.password
      )
    }
  },
  watch: {
    isValidatedPass: {
      deep: true,
      handler: function (newVal) {
        this.pwdErrCnt++
      }
    },
    isValidatedConfirmPass: {
      deep: true,
      handler: function (newVal) {
        this.pwdConfirmErrCnt++
      }
    }
  },
  methods: {
    isValidatedPassMethod() {
      const validRegEx = /^.{1,}$/
      if (this.password === '' && !validRegEx.test(this.password)) {
        this.pwdErrCnt = 1
      }
    },
    isValidatedConfirmPassMethod() {
      const validRegEx = /^.{1,}$/
      if (
        this.confirmPassword === '' &&
        !validRegEx.test(this.confirmPassword)
      ) {
        this.pwdConfirmErrCnt = 1
      }
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.setPassword()
      }
    },
    async setPassword() {
      const verificationData = JSON.parse(
        localStorage.getItem('verificationData1')
      )
      console.log('verificationData', verificationData)
      await this.$store
        .dispatch('user/resetPassword', {
          email: verificationData.email,
          token: verificationData.token,
          password: this.password
        })
        .then((res) => {
          localStorage.removeItem('verificationData1')
          if (res.data.error.type === 200) {
            this.notifyMsg = true
            setTimeout(() => {
              this.$router.push({ name: 'Login' })
            }, 7000)
          } else {
            this.notifyMsg = false
          }
        })
    }
  }
}
</script>
<style lang="css">
.register-pass {
  font-size: 1.1rem !important;
}
.resetPwd-form {
  font-size: 1.2rem !important;
  color: #413967;
  font-family: 'Sourcesanspro';
}
.label-field {
  font-size: 1.2rem !important;
}
.resetPwd-submit {
  font-weight: 500;
  width: 180px !important;
  background-color: #7671bd !important;
  color: white !important;
  font-weight: 500;
  text-transform: uppercase;
  font-size: 1rem !important;
  transition: .3s;
}
.resetPwd-submit:hover {
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
  color: red !important;
}
.register-input > div > div > div > div > .mdi-checkbox-marked-circle,
.register-pass > div > div > .mdi-checkbox-marked-circle {
  color: #22bb33 !important;
}
.terms-policy {
  margin-top: 50px;
}
.terms-policy .subtitle-2 {
  color: #7671bd;
  font-size: 15px !important;
  font-weight: 400;
  margin-left: .5em;
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
  color: red;
}
.resetPwd-errMsg {
  padding: 0;
  font-size: 18px;
  color: red;
}
.agree-terms {
  font-weight: bold;
  font-size: 1rem;
  font-family: 'Sourcesanspro';
  padding-left: 5px;
}
.agree-label .v-input__slot i {
  font-size: 20px;
  font-family: 'Sourcesanspro';
}
.reset-notification {
  color: #0b9b55;
  font-size: 18px;
  font-family: 'Sourcesanspro';
  margin-top: 20px;
}
.reset-notification .mx-1 {
  color: #7671bd !important;
  text-decoration: underline;
}
.reset-notification .mx-1:hover {
  cursor: pointer;
}
.terms-policy {
  margin-top: 20px;
}
.subtitle-2 {
  text-decoration: none;
  color: #414c6c;
  margin-top: 20px;
  font-size: 16px !important;
}
.register-input > div > div > .mdi-alert-circle, .register-pass > div > div > .mdi-alert-circle {
    color: #f54646 !important;
}
.v-messages__message {
    color: #df3030;
    font-size: 13px;
}
.v-text-field > .v-input__control > .v-input__slot:after {
border-color: #7671bd!important;
}
</style>

<template>
  <v-card flat>
    <v-form class="resetPwd-form" ref="form" v-model="valid" lazy-validation>
      <p class="mt-10">Reset your password</p>
      <v-card-text align="left">
        <span style="font-weight: 600" class="label-field">New Password</span>
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
        <span style="font-weight: 600" class="label-field"
          >Confirm Password</span
        >
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
            >Reset Password</v-btn
          >
        </v-col>
        <v-col cols="12" md="3"></v-col>
      </v-row>
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
      validPassRegEx: /^.{6,}$/
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
        this.resetPassword()
      }
    },
    async resetPassword() {
      const curUserData = JSON.parse(localStorage.getItem('curUserData'))
      this.$store.dispatch('user/changePassword', {
        userId: curUserData.id,
        currentPassword: this.currentPassword,
        newPassword: this.newPassword
      })
    }
  }
}
</script>
<style lang="css">
.resetPwd-form {
  font-size: 1.2rem !important;
  color: #413967;
  font-family: 'Sourcesanspro';
  width: 50%;
  margin: auto;
  margin-top: 150px;
}
.label-field {
  font-size: 1.2rem !important;
}
.resetPwd-submit {
  width: 80%;
  /* background-color: #6452a2 !important; */
  background-image: linear-gradient(to right, #8074c2, #4c486b);
  color: white !important;
  font-weight: bold;
  text-transform: capitalize;
  font-size: 1.2rem !important;
}
.resetPwd-submit:hover {
  background-color: #6452a2 !important;
  color: white !important;
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
  color: #414c6c;
  font-size: 16px !important;
  text-decoration: none;
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
</style>

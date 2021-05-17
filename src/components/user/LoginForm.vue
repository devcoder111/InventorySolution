<template>
  <v-card flat>
    <v-form class="login--form" ref="form" v-model="valid" lazy-validation @keydown.native.enter='validate'>
      <v-card-text>
        <div class="row">
          <v-col cols="12" v-if="errMsg" class="login-errMsg">
            Login failed. Please try again.
          </v-col>
        </div>
        <div align="left">
          <v-text-field
            @blur="isValidatedEmailMethod"
            v-model="email"
            :rules="emailRules"
            placeholder="Email address"
            pt="5"
            required
            :append-icon="isValidatedEmail ? 'mdi-checkbox-marked-circle' : ''"
            tabindex='1'
            :append-outer-icon="
              emailErrCnt == 0 ? '' : isValidatedEmail ? '' : 'mdi-alert-circle'
            "
            class="login-email-input login-input"
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-text-field
            @blur="isValidatedPassMethod"
            v-model="password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[passwordRules.required]"
            :type="showPassword ? 'text' : 'password'"
            name="password"
            hint=""
            placeholder="Password"
            required
            tabindex='1'
            :append-outer-icon="
              pwdErrCnt == 0
                ? ''
                : isValidatedPass
                ? 'mdi-checkbox-marked-circle'
                : 'mdi-alert-circle'
            "
            @click:append="showPassword = !showPassword"
            class="login-pass-input login-input"
          ></v-text-field>
        </div>
        <div class="remember-forgot">
          <v-checkbox
            v-model="rememberMe"
            value="1"
            label="Remember Me"
            color="#12ba81"
            type="checkbox"
            class="rememeber-label"
            tabindex='1'
            @click.native="changecolor"
          >
            <template v-slot:label>
              <div class="white">
                <span
                  class="rememberMe"
                  :style="[
                    color_checkbox ? { color: '#413967' } : { color: '#12ba81' }
                  ]"
                >
                  Remember me
                </span>
              </div>
            </template>
          </v-checkbox>
          <v-spacer></v-spacer>
          <router-link class="forgot-link" to="/resetpassword"
            >Forgot password?</router-link
          >
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
            :loading="loading"
            :disabled="!valid"
            @click="validate"
            class="login-btn"
            height="42"
            tabindex='1'
            >Sign In</v-btn
          >
        </div>
      </v-card-text>
      <v-spacer></v-spacer>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      rememberMe: false,
      showPassword: false,
      valid: true,
      errMsg: false,
      emailErrCnt: 0,
      pwdErrCnt: 0,
      email: '',
      password: '',
      color_checkbox: true,
      passwordRules: {
        required: (value) => !!value || 'Required',
        min: (v) => v.length >= 6 || 'Min 6 characters'
      },
      nameRules: [(value) => !!value || 'This field is Required'],
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ]
    }
  },
  computed: {
    loading() {
      return this.$store.getters.loading
    },
    errors() {
      return this.$store.getters.error
    },
    isError() {
      if (this.$store.getters.error) {
        console.log('isError', this.$store.getters)
        return true
      } else {
        return false
      }
    },
    isValidatedEmail() {
      const validRegEx = /\S+@\S+\.\S+/
      return this.email !== null && validRegEx.test(this.email)
    },
    isValidatedPass() {
      const validRegEx = /^.{1,}$/
      return this.password !== null && validRegEx.test(this.password)
    }
  },
  mounted() {
    setInterval(this.removeErrors, 5000)
  },
  watch: {
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
    isValidatedEmailMethod() {
      const validRegEx = /\S+@\S+\.\S+/
      if (this.email === '' && !validRegEx.test(this.email)) {
        this.emailErrCnt++
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
        this.login()
      }
    },
    changecolor() {
      this.color_checkbox = !this.color_checkbox
    },
    async login() {
      await this.$store
        .dispatch('user/login', {
          email: this.email,
          password: this.password
        })
        .then((res) => {
          if (res === undefined) this.errMsg = true
          else this.errMsg = false
        })
    },
    removeErrors() {
      this.$store.dispatch('user/removeErrors')
    }
  }
}
</script>
<style scoped lang="css">
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
.remember-forgot {
  display: flex;
  justify-content: space-between;
}
.label-field {
  font-size: 1.2rem !important;
}
.login--form {
  font-size: 1.2rem !important;
  color: #fff !important;
  font-family: 'Sourcesanspro';
}
.subtitle-2 {
  margin-top: 20px;
  text-decoration: none;
  color: #413967;
  font-family: 'Sourcesanspro';
  font-weight: bold;
  font-size: 1.2rem !important;
}

.v-input__slot label {
  font-size: 1.2rem !important;
  color: #413967 !important;
  font-weight: 600;
  font-family: 'Sourcesanspro';
  padding-left: 10px;
}

.login-btn {
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
.signup-btn {
  width: 80%;
  border: 2px solid #6452a2;
  background-color: #f5f5f5 !important;
  color: #6452a2 !important;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 1rem !important;
}
.login-btn:hover {
  width: 80%;
  background-color: #534f8c !important;
  color: white !important;
  font-weight: 500;
  font-size: 1rem !important;
}
.v-btn__content {
  color: #fff !important;
}
.signup-btn:hover {
  background-image: linear-gradient(to right, #8074c2, #4c486b);
  color: white !important;
}
.login-errMsg {
  padding: 0;
  font-size: 18px;
  color: #df3030;
  text-align: center;
  margin-bottom: 20px;
}
.error-alert {
  background-color: orange !important;
  color: white;
}
.error-alert i {
  border: 1px solid white;
}
.login-email-input,
.login-pass-input {
  padding-top: 0;
}
.login--form >>> .login-email-input > div > div > .mdi-alert-circle,
.login--form >>> .login-pass-input > div > div > .mdi-alert-circle {
  color: #f54646 !important;
}
.login--form
  >>> .login-email-input
  > div
  > div
  > div
  > div
  > .mdi-checkbox-marked-circle,
.login--form >>> .login-pass-input > div > div > .mdi-checkbox-marked-circle {
  color: #12ba81 !important;
}
.login--form >>> .v-messages__message {
  color: #df3030;
  font-size: 13px;
}
.v-icon.v-icon.v-icon--link {
  color: #9a97a7 !important;
}
.rememeber-label >>> .v-input__slot i {
  font-size: 20px;
  font-family: 'Sourcesanspro';
}
.rememberMe {
  font-weight: 500;
  font-size: 1.1rem;
  font-family: 'Sourcesanspro';
  padding-left: 5px;
}
.v-text-field > .v-input__control > .v-input__slot:after {
  border-color: #7671bd !important;
}
.theme--light.v-btn.v-btn--disabled:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
  color: #dfddec !important;
}
</style>

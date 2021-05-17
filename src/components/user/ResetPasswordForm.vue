<template>
  <v-card flat>
    <v-form ref="form" class="reset--form" v-model="valid" lazy-validation @keydown.native.enter='validate'>
      <v-card-text>
        <div align="left">
          <v-text-field
            tabindex='1'
            @blur="isValidatedEmailMethod"
            v-model="email"
            :rules="emailRules"
            placeholder="Email Adress"
            pt="5"
            required
            :append-icon="isValidatedEmail ? 'mdi-checkbox-marked-circle' : ''"
            :append-outer-icon="
              emailErrCnt == 0 ? '' : isValidatedEmail ? '' : 'mdi-alert-circle'
            "
            class="reset-email-input"
          ></v-text-field>
        </div>
      </v-card-text>
      <div class="row">
        <v-col cols="12" v-if="errMsg" class="reset-pwd-errMsg">
          User not Found
        </v-col>
      </div>
      <v-card-actions class="d-flex justify-center">
        <v-spacer></v-spacer>
        <v-btn
          tabindex='1'
          color="error"
          @click="validate"
          class="send-btn ml-5 mr-5"
          height="42"
          >Send Request</v-btn
        >
        <v-spacer></v-spacer>
      </v-card-actions>
      <p class="text-center reset-notification" v-if="notifyMsg">
        You will receive an email with instructions on how to reset your
        password in a few minutes
      </p>
      <v-card-text class="text-center terms-policy">
        <a class="subtitle-2" href="terms-of-use.html">Term of use</a> &<a
          class="subtitle-2"
          href="privacy-policy.html"
          >Privacy policy</a
        >
      </v-card-text>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      valid: true,
      email: '',
      emailErrCnt: 0,
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      notifyMsg: false,
      errMsg: false
    }
  },
  computed: {
    isValidatedEmail() {
      const validRegEx = /\S+@\S+\.\S+/
      return this.email !== null && validRegEx.test(this.email)
    }
  },
  watch: {
    isValidatedEmail: {
      deep: true,
      handler: function (newVal) {
        this.emailErrCnt++
      }
    }
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.resetPwdRequest()
      }
    },
    async resetPwdRequest() {
      await this.$store
        .dispatch('user/resetPwdReq', {
          email: this.email
        })
        .then((res) => {
          console.log('res', res)
          if (res === undefined) {
            this.errMsg = true
            this.notifyMsg = false
          } else if (res.data.error.type === 200) {
            this.notifyMsg = true
            this.errMsg = false
          }
        })
    },
    isValidatedEmailMethod() {
      const validRegEx = /\S+@\S+\.\S+/
      if (this.email === '' && !validRegEx.test(this.email)) {
        this.emailErrCnt = 1
      }
    }
  }
}
</script>
<style lang="css">
.reset-pwd-errMsg {
  padding: 0;
  font-size: 18px;
  color: #df3030;
}
.reset-email-input {
  font-size: 1.1rem !important;
}
.reset--form {
  font-size: 1.2rem !important;
  color: #413967;
  font-family: 'Sourcesanspro';
}
.send-btn {
  font-weight: 500;
  width: 180px !important;
  background-color: #7671bd !important;
  color: white !important;
  font-weight: 500;
  text-transform: uppercase;
  font-size: 1rem !important;
  transition: 0.3s;
}
.send-btn:hover {
  background-color: #534f8c !important;
  color: white !important;
  font-weight: 500;
  font-size: 1rem !important;
}
.label-field {
  font-size: 1.2rem;
}
.login-title {
  display: unset;
  padding: 30px 60px;
  margin-bottom: 20px;
  font-size: 45px;
  font-weight: bold;
  color: #413967 !important;
  font-family: 'SCRIPTBL';
}
.subtitle-2 {
  text-decoration: none;
  color: #414c6c;
  margin-top: 20px;
  font-size: 16px !important;
}
.terms-policy {
  margin-top: 20px;
  font-size: 15px !important;
  font-weight: 400;
  color: #413967;
}
.terms-policy .subtitle-2 {
  color: #7671bd;
  font-size: 15px !important;
  font-weight: 400;
  margin-left: 0.5em;
}
.login-main .terms-policy .subtitle-2:hover {
  text-decoration: underline;
}
.v-messages__message {
  color: #df3030;
  font-size: 13px;
}
.reset-email-input {
  padding-top: unset;
  margin-top: unset;
}
.reset-email-input > div > div > .mdi-alert-circle,
.reset-email-input > div > div > .mdi-alert-circle {
  color: #f54646 !important;
}
.reset-email-input > div > div > div > div > .mdi-checkbox-marked-circle,
.reset-email-input > div > div > .mdi-checkbox-marked-circle {
  color: #12ba81 !important;
}
.reset-notification {
  color: #0b9b55;
  font-size: 18px;
  font-family: 'Sourcesanspro';
  margin-top: 20px;
}
.v-text-field > .v-input__control > .v-input__slot:after {
  border-color: #7671bd !important;
}
.theme--light.v-btn.v-btn--disabled:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
  color: #dfddec !important;
}
</style>

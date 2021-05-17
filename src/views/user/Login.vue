<template>
  <v-container fluid class="sign-form">
    <v-row>
      <v-col sm="12" md="4" cols="12" style="padding: unset">
        <v-card align="center" class="login-card">
          <a class="subtitle-2" href="/">
            <v-card-title class="login-title">Britecheck</v-card-title>
          </a>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="login-main">
      <v-col sm="12" md="12" cols="12">
        <v-row justify="center">
          <v-col sm="12" md="12" cols="12" style="padding: unset">
            <v-card-subtitle align="center" class="login-subtitle"
              >Sign In</v-card-subtitle
            >
            <v-card-text align="center" class="login-welcome"
              >Don't have an account yet?
              <a
                depressed
                class="link-sign"
                @click="$router.push({ name: 'Register' })"
                >Sign Up Now</a
              >
            </v-card-text>
          </v-col>
        </v-row>
        <v-row justify="center" class="login-container">
          <v-col sm="12" md="5" lg="3" cols="12">
            <v-card align="center" class="login-card">
              <LoginForm class="login-form" />
            </v-card>
          </v-col>
          <v-col
            sm="12"
            md="5"
            lg="3"
            cols="12"
          >
            <v-card class="login-card">
              <div class="social_block_sign">
                <div class="social-button" style="display: none !important;">
                  <v-btn class="button_login_new fb_button_login_new">
                    <div class="buttonIcon">
                      <div class="buttonSvgImage"></div>
                    </div>
                    <span class="fb_button_text_new">
                      Sign In with Facebook</span
                    >
                  </v-btn>
                </div>
                <div class="social-button">
                  <a href="/auth/google"
                    class="button_login_new google_button_login_new">
                    <div class="buttonIcon">
                      <div class="buttonSvgImage"></div>
                    </div>
                    <span class="google_button_text_new">
                      Sign In with Google
                    </span>
                  </a>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col sm="12" md="12" cols="12" style="padding: unset">
            <v-card align="center" class="login-card">
              <v-card-text class="text-center terms-policy">
                By signing in you agree to our
                <a class="subtitle-2" href="privacy-policy.html"
                  >Privacy policy</a
                >
                &<a class="subtitle-2" href="terms-of-use.html">Term of use</a>.
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import LoginForm from '@/components/user/LoginForm'
export default {
  name: 'Login',
  components: {
    LoginForm
  },
  mounted() {
    if (!localStorage.getItem('curUserData') && !!localStorage.getItem('querytoken')) {
      this.$store.dispatch('user/getUserByToken', localStorage.getItem('querytoken')).then((response) => {
        if (response) {
          localStorage.removeItem('querytoken')
          this.$router.go('/inventory')
        }
      })
    }
  }
}
</script>
<style lang="css">
.body--light {
  background: whitesmoke;
}
.social-button {
  height: 56px;
  width: 338px;
  padding: 4px;
  border-radius: 1px;
  box-sizing: border-box;
  background-image: none;
  color: #262626;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  margin-bottom: 10px;
}
.button_login_new .v-btn__content {
  display: block !important;
  line-height: 48px;
  text-transform: none;
  font-weight: 400;
}
.button_login_new .buttonIcon {
  float: left;
  background-color: #fff;
  border-radius: 1px;
  padding: 12px 15px 11px 16px;
}
.social-button .google_button_login_new .buttonIcon {
  padding: 13px;
}
.fb_button_login_new .buttonIcon .buttonSvgImage {
  background-image: url(/static/src/images/facebook-logo.svg);
  width: 15px;
  height: 23px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
.google_button_login_new .buttonIcon .buttonSvgImage {
  background-image: url(/static/src/images/google-logo.svg);
  width: 20px;
  height: 20px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
.social-button .fb_button_login_new {
  background-color: #3b5998 !important;
}
.social-button .google_button_login_new {
  background-color: #4285f4 !important;
}
.social-button .google_button_login_new:hover {
  background-color: #649fff !important;
}
.login-card .social-button .button_login_new {
  display: block !important;
  cursor: pointer;
  padding: 0 !important;
  border: 1px solid transparent;
  color: #fff;
  height: 100%;
  width: 100%;
  transition: 0.3s;
  border-radius: 0;
  box-shadow: none !important;
  text-decoration: none;
}
.login-card .social-button .button_login_new span {
    line-height: 48px;
    letter-spacing: 1px;
    font-size: 1rem;
    text-decoration: none;
}
.login-main {
  padding: 5% 15px 50px !important;
}
.login-container {
  position: relative;
}
.login-container:after {
  content: '';
  display: block;
  width: 1px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
}
.login-main .terms-policy {
  margin-top: 30px;
  font-size: 15px !important;
  font-weight: 400;
  color: #413967;
}
.login-main .terms-policy .subtitle-2:hover {
  text-decoration: underline;
}
.login-main .terms-policy .subtitle-2 {
  color: #7671bd;
  font-size: 15px !important;
  font-weight: 400;
  margin-left: 0.5em;
}
.sign-form {
  background-color: #f5f5f5 !important;
  min-height: 100vh;
}
.link-sign {
  color: #7671bd;
  transition: 0.3s;
}
.link-sign:hover {
  cursor: pointer;
  text-decoration: underline;
  transition: 0.3s;
}
.sign-img .v-image__image--cover {
  background-size: 100% !important;
}
.login-title {
  display: unset;
  padding: 30px 60px;
  margin-bottom: 20px;
  font-size: 45px;
  font-weight: bold;
  color: #413967 !important;
  text-decoration: none;
  font-family: 'SCRIPTBL';
}
.subtitle-2 {
  text-decoration: none;
}
.login-subtitle {
  margin-top: 20px !important;
  margin-bottom: 40px;
  font-size: 56px;
  letter-spacing: 0.05em;
  font-weight: 300;
  color: #302d3e !important;
  text-decoration: none;
}
.login-card {
  height: 100%;
  margin: unset;
  border-radius: unset !important;
  background-color: #f5f5f5 !important;
  box-shadow: none !important;
}
.login-form {
  background-color: #f5f5f5 !important;
}
.login-welcome {
  margin-top: 10px;
  font-size: 18px;
  font-weight: 500;
  font-family: 'Sourcesanspro';
  color: #413967 !important;
}
.v-text-field > .v-input__control > .v-input__slot:after {
  border-color: #7671bd !important;
}
@media screen and (max-width: 1023px) {
  .login-container:after {
    display: none;
  }
}
@media screen and (max-width: 768px) {
  .login-card {
    padding-left: 2px;
    padding-right: 2px;
  }
  .login-welcome {
    margin-top: 10px;
    font-size: 18px;
    font-weight: 500;
    font-family: 'Sourcesanspro';
    color: #413967 !important;
    padding-bottom: 0;
}
}
@media screen and (max-width: 540px) {
  .login-main {
    padding: 5% 20px 50px !important;
  }
  .login-subtitle {
    font-size: 46px;
  }
  .login-title {
    padding: 30px 0px;
  }
}
</style>

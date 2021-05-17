<template>
<v-container fluid class="sign-form">
  <v-row>
    <v-col sm="12" md="4" cols="12" style="padding: unset">
      <v-card align="center" class="signup-card">
        <a class="subtitle-2" href="/">
          <v-card-title class="login-title">Britecheck</v-card-title>
        </a>
      </v-card>
    </v-col>
  </v-row>
  <v-row class="login-main">
    <v-col sm="12" md="12" cols="12">
      <v-row justify="center">
        <v-col sm="12" md="4" lg="4" cols="12" style="padding: unset">
          <v-card-subtitle align="center" class="login-subtitle"
            >Set Password</v-card-subtitle
            >
            <v-card-text align="center" class="login-welcome"
            >Please set your password
            </v-card-text>
        </v-col>
      </v-row>
      <v-row justify="center" id="reset-container">
        <v-col sm="12" md="5" lg="4" cols="12" style="padding: unset">
          <v-card align="center">
            <SetPasswordForm class="signup-form" />
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</v-container>
</template>
<script>
import SetPasswordForm from '@/components/user/SetPasswordForm'
export default {
  name: 'SetPassword',
  components: {
    SetPasswordForm
  }
}
</script>
<style lang="css">
.login-main {
    padding: 5% 60px 50px!important;
}
.login-welcome {
    margin-top: 10px;
    font-size: 20px;
    font-weight: 500;
    font-family: 'Sourcesanspro';
    color: #413967 !important;
    line-height: 1.8rem;
  }
  .login-subtitle {
    margin-top: 20px !important;
    margin-bottom: 40px;
    font-size: 46px;
    letter-spacing: 0.05em;
    font-weight: 300;
    color: #302d3e !important;
    text-decoration: none;
    line-height: 2.9rem;
  }
  .signup-card {
    height: 100%;
    margin: unset;
    border-radius: unset !important;
    background-color: #f5f5f5 !important;
    box-shadow: none !important;;
  }
.body--light {
    background: whitesmoke;
  }
.signup-form {
  background-color: #f5f5f5 !important;
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
#resetpass-card {
    height: 100%;
    margin: unset;
    border-radius: unset !important;
    background-color: #f5f5f5 !important;
    box-shadow: none !important;
}
#reset-title {
  display: unset;
  padding: 30px 60px;
  margin-bottom: 20px;
  font-size: 50px;
  color: #413967 !important;
  font-family: 'SCRIPTBL';
}
.subtitle-2 {
  text-decoration: none;
}
#reset-subtitle {
  margin-top: 20px;
  font-size: 20px;
  font-weight: 500;
  font-family: 'Sourcesanspro';
  color: #302d3e;
}
.v-sheet.v-card:not(.v-sheet--outlined) {
    box-shadow: none !important;
}
@media screen and (max-width: 540px) {
    .login-main {
      padding: 5% 20px 50px!important;
    }
    .login-subtitle {
      font-size: 46px;
    }
    .login-title {
      padding: 30px 0px;
    }
  }
@media screen and (max-width: 768px) {
  .signup-card {
    padding-left: 2%;
    padding-right: 2%;
  }
  .signup-img {
    display: none;
  }
}
</style>

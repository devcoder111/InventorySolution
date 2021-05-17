<template>
  <div>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="firstName"
        :rules="nameRules"
        label="First Name*"
        required
        outlined
      ></v-text-field>
      <v-text-field
        v-model="lastName"
        :rules="nameRules"
        label="Last Name*"
        required
        outlined
      ></v-text-field>
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="Email*"
        required
        outlined
      ></v-text-field>
      <v-text-field
        v-model="phone"
        label="Phone Number"
        required
        outlined
      ></v-text-field>
      <v-row>
        <v-col cols="12" md="6">
          <v-btn color="success" @click="validate" class="save-btn">Save</v-btn>
        </v-col>
        <v-col cols="12" md="6">
          <v-dialog v-model="dialog" persistent max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" class="change-pass"
                >CHANGE OR RESET PASSWORD</v-btn
              >
            </template>
            <v-card>
              <v-card-title>
                <span class="headline" style="color: #919196 !important"
                  >Change Password</span
                >
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="currentPassword"
                        :append-icon="showPassword1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="curPasswordRules"
                        :type="showPassword1 ? 'text' : 'password'"
                        name="password"
                        label="Current Password"
                        required
                        outlined
                        @click:append="showPassword1 = !showPassword1"
                        class="r-field"
                      ></v-text-field>
                    </v-col>
                    <span class="ml-3">
                      Forgot password? You can
                      <span
                        @click=";(dialog = false), (dialog2 = true)"
                        style="
                          text-decoration: underline;
                          cursor: pointer;
                          color: #00c19e;
                        "
                        >reset it</span
                      >
                    </span>
                    <v-col cols="12">
                      <v-text-field
                        v-model="newPassword"
                        :append-icon="showPassword2 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="passwordRules"
                        :type="showPassword2 ? 'text' : 'password'"
                        label="New Password"
                        hint="At least 6 characters"
                        required
                        outlined
                        @click:append="showPassword2 = !showPassword2"
                        class="r-field"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="confirmPassword"
                        :append-icon="showPassword3 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="passwordRules"
                        :type="showPassword3 ? 'text' : 'password'"
                        name="password"
                        label="Confirm password"
                        hint="At least 6 characters"
                        required
                        outlined
                        @click:append="showPassword3 = !showPassword3"
                        class="r-field"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions class="action-wrapper">
                <v-col cols="12" md="4"></v-col>
                <v-col cols="12" md="4">
                  <v-btn color=" " @click="dialog = false" class="cancel-btn"
                    >Cancel</v-btn
                  >
                </v-col>
                <v-col cols="12" md="4">
                  <v-btn
                    color=" "
                    @click="changePassword"
                    class="change-pwd-btn"
                    >Save</v-btn
                  >
                </v-col>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialog2" max-width="500px">
            <v-card>
              <v-container>
                <v-card-subtitle
                  color="blue"
                  @click=";(dialog2 = false), (dialog = true)"
                  style="
                    text-decoration: underline;
                    color: blue;
                    cursor: pointer;
                  "
                  >back</v-card-subtitle
                >
                <v-card-title style="color: #919196 !important"
                  >Reset Password</v-card-title
                >
                <v-card-text>
                  <v-row style="border-bottom: 1px solid gray">
                    <v-col cols="12">
                      <span>
                        We will send instruction to your email
                        <br />
                      </span>
                      <p>
                        <strong>{{ email }}</strong>
                      </p>
                    </v-col>
                    <v-col cols="12">
                      <span>
                        If you have any problems, please contact
                        <router-link to="/support">Support</router-link>
                      </span>
                    </v-col>
                  </v-row>
                  <v-row class="mt-8">
                    <v-spacer></v-spacer>
                    <v-col cols="12" md="2"></v-col>
                    <v-col cols="12" md="4">
                      <v-btn color @click="dialog2 = false">Cancel</v-btn>
                    </v-col>
                    <v-col cols="12" md="5">
                      <v-btn color="error " @click="reset">Reset</v-btn>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-container>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>
<script>
export default {
  name: 'UserProfileForm',
  data() {
    return {
      agreement: false,
      dialog: false,
      dialog2: false,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      showPassword1: false,
      showPassword2: false,
      showPassword3: false,
      valid: true,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      nameRules: [(value) => !!value || 'This field is Required'],
      curPasswordRules: [
        (value) => !!value || 'This field is Required',
        (v) => v.length >= 6 || 'Min 6 characters'
      ],
      passwordRules: [
        (value) => !!value || 'This field is Required',
        (v) => v.length >= 6 || 'Min 6 characters',
        (v) => (!!v && v) === this.newPassword || 'Passwords do not match'
      ],
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ]
    }
  },
  created() {
    // this.lastName = localStorage.getItem('curUserData').lastName
    // this.email = localStorage.getItem('curUserData').email
  },
  mounted() {
    const curUserData = JSON.parse(localStorage.getItem('curUserData'))
    this.firstName = curUserData.firstName
    this.lastName = curUserData.lastName
    this.email = curUserData.email
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.update()
      }
    },
    update() {
      const curUserData = JSON.parse(localStorage.getItem('curUserData'))
      this.$store.dispatch('user/update', {
        userId: curUserData.id,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phone: this.phone
      })
    },
    reset() {},
    changePassword() {
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
.save-btn {
  width: 90%;
  /* border: 1px solid #00c19e;
  background-color: #00c19e !important; */
  color: white;
}
.save-btn:hover {
  background-color: #00c19e !important;
}
.change-pass > span {
  font-size: 14px;
}
.change-pass {
  box-shadow: unset;
  letter-spacing: unset;
  background-color: white !important;
}
.change-pass:hover {
  background-color: white !important;
}
.change-pwd-btn {
  width: 100%;
  background-color: #00c19e !important;
  color: white !important;
  font-weight: bold;
  text-transform: capitalize;
  font-size: 1rem !important;
}
.change-pwd-btn:hover {
  width: 100%;
  border: 2px solid#00c19e;
  background-color: #f5f5f5 !important;
  color: #00c19e !important;
  font-weight: bold;
  text-transform: capitalize;
  font-size: 1rem !important;
}
.cancel-btn {
  width: 100%;
  border: 2px solid #00c19e;
  background-color: #f5f5f5 !important;
  color: #00c19e !important;
  font-weight: bold;
  text-transform: capitalize;
  font-size: 1rem !important;
}
.cancel-btn:hover {
  background-color: #00c19e !important;
  color: white !important;
}
.action-wrapper {
  border-top: 1px solid #b5b5b5;
}
</style>

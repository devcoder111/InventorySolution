<template>
  <v-row>
    <v-dialog v-model="editDialog" persistent max-width="600px">
      <v-card>
        <form @submit.prevent="validate">
          <v-card-title class="headline grey lighten-2" primary-title>
            <span class="headline"
            style="
              color: #919196 !important;
          "
            >Edit User</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12"><span class="userInfo">User Info</span></v-col>
                <v-col cols="12" sm="6" md="4" align="left">
                  <span style="font-weight: 600" class="label-field"
                    >First Name</span
                  >
                  <v-text-field
                    v-model="userToSubmit.firstName"
                    :rules="nameRules"
                    placeholder="First Name"
                    required
                    class="r-field invite-input"
                    :append-icon="
                      isValidatedFirstName ? 'mdi-checkbox-marked-circle' : ''
                    "
                    :append-outer-icon="
                      isValidatedFirstName ? '' : 'mdi-alert-circle'
                    "
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4" align="left">
                  <span style="font-weight: 600" class="label-field"
                    >Last Name</span
                  >
                  <v-text-field
                    v-model="userToSubmit.lastName"
                    :rules="nameRules"
                    placeholder="Last Name"
                    required
                    :append-icon="
                      isValidatedLastName ? 'mdi-checkbox-marked-circle' : ''
                    "
                    :append-outer-icon="
                      isValidatedLastName ? '' : 'mdi-alert-circle'
                    "
                    class="r-field invite-input"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4" align="left">
                  <span style="font-weight: 600" class="label-field"
                    >Phone Number</span
                  >
                  <v-text-field
                    v-model="userToSubmit.phone"
                    :rules="phoneRules"
                    placeholder="Phone Number"
                    required
                    :append-icon="
                      isValidatedPhone ? 'mdi-checkbox-marked-circle' : ''
                    "
                    :append-outer-icon="
                      isValidatedPhone ? '' : 'mdi-alert-circle'
                    "
                    class="r-field invite-input"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="8" align="left">
                  <span style="font-weight: 600" class="label-field"
                    >Email</span
                  >
                  <v-text-field
                    v-model="userToSubmit.email"
                    :rules="emailRules"
                    placeholder="Email"
                    required
                    class="r-field invite-input"
                    :append-icon="
                      isValidatedEmail ? 'mdi-checkbox-marked-circle' : ''
                    "
                    :append-outer-icon="
                      isValidatedEmail ? '' : 'mdi-alert-circle'
                    "
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" align="left">
                  <span style="font-weight: 600" class="label-field">Role</span>
                  <v-select
                    :items="roles"
                    v-model="userToSubmit.role"
                    value="optionsRole"
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
              height="40"
              class="cancel-btn"
              text
              @click.stop="editDialog = false"
            >
              Cancel
            </v-btn>
            <v-btn
              text
              height="40"
              @click="closeDialog()"
              class="invite-user-btn"
              type="submit"
            >
              Save
            </v-btn>
          </v-card-actions>
        </form>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  props: ['value', 'user', 'id'],
  computed: {
    editDialog: {
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
      const validRegEx = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/
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
      optionsRole: '',
      userToSubmit: {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        role: ''
      }
    }
  },
  mounted() {},
  watch: {
    user(data) {
      console.log('user', data)
      this.userToSubmit.firstName = data.firstName
      this.userToSubmit.lastName = data.lastName
      this.userToSubmit.email = data.email
      this.userToSubmit.phone = ''
      this.userToSubmit.role = data.role
      this.userToSubmit.userId = data.id
      this.optionsRole = data.role
    }
  },
  methods: {
    ...mapActions('user', ['updateUser']),
    submitUser() {
      this.updateUser(this.userToSubmit)
      this.$emit('close')
    },
    validate() {
      if (
        this.isValidatedFirstName &&
        this.isValidatedLastName &&
        this.isValidatedPhone &&
        this.isValidatedEmail
      ) {
        this.submitUser()
      }
    },
    closeDialog() {
      if (
        this.isValidatedFirstName &&
        this.isValidatedLastName &&
        this.isValidatedPhone &&
        this.isValidatedEmail
      ) {
        this.editDialog = false
      }
    }
  }
}
</script>

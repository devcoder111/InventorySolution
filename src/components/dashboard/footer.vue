<template>
  <v-container>
    <v-row class="justify-center">
      <v-col cols="auto" class="change-font font-weight-medium footer-nav"
        ><a href="https://britecheck.zendesk.com" target="_blank"
          >Support</a
        ></v-col
      >
      <v-col cols="auto" class="change-font font-weight-medium footer-nav"
        ><a href="./blog/index.html">Blog</a></v-col
      >
      <v-col cols="auto" class="change-font font-weight-medium footer-nav"
        ><a href="contactus.html">Contact Us</a></v-col
      >
      <v-col cols="auto" class="change-font font-weight-medium footer-nav"
        ><a href="pricing">Pricing</a></v-col
      >
    </v-row>
    <v-divider class="mt-4"></v-divider>
    <v-row class="justify-center mt-6">
      <v-col cols="auto" class="change-font font-weight-medium footer-nav">
        <a href="terms-of-use.html">Terms or Service</a>
      </v-col>
      <v-col cols="auto" class="change-font font-weight-medium footer-nav">
        <a href="privacy-policy.html">Privacy Policy</a>
      </v-col>
    </v-row>
    <v-row
      class="justify-center mt-10 mb-8 copyright"
      style="font-size: 14px; color: #a3a3a3"
    >
      <v-col cols="12" class="pa-0">
        <p class="font-weight-medium text-center">
          © Copyright 2020-2021 BRITECHECK
        </p>
      </v-col>
      <v-col cols="12" class="pa-0">
        <p class="change-font font-weight-medium text-center">
          All other logos and trademarks are the property of their respective
          owners.
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {}
  }
}
</script>

<style>
.footer-nav a {
  text-decoration: none;
  color: #767676;
  font-size: 16px;
}
.footer-nav a:hover {
  color: #7671bd;
}
.copyright p {
  color: #a3a3a3;
  font-size: 14px;
}
</style>

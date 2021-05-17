<template>
  <v-app>
    <NavBar />
    <section style="background: #e8eaff; padding-top: 50px">
      <v-row class="justify-center mt-16" style="margin-left:0 !important; margin-right:0 !important;">
        <v-col cols="10" xs="8" sm="8" md="6" class="text-center title-main">
          <img
            class="image-subscription left"
            src="@/assets/images/subscription/warning.svg"
          />
          <p
            id="content-t"
            class="change-font font-weight-bold title"
            style="z-index: 1"
          >
            Sorry, payment failed!
          </p>
          <p class="change-font grey-color subtitle" style="z-index: 1">
            Looks like we encountered an error Pleas try again. If you continue
            to have issues, try another payment method
          </p>
          <div>
            <v-btn class="ok-btn" width="180" depressed large to="/pricing">
              <span style="color: white; font-size: 20px">TRY AGAIN</span>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </section>
    <Footer />
  </v-app>
</template>

<script>
import NavBar from '@/views/NavBar'
import Footer from '@/components/dashboard/footer'
export default {
  name: 'Failed',
  components: {
    NavBar,
    Footer
  },
  data() {
    return {}
  },
  computed: {
    isDesktop() {
      return this.$vuetify.breakpoint.mdAndUp
    }
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700;800;900&display=swap');
.change-font {
  font-family: 'Raleway', sans-serif;
}
.ok-btn {
  background: #7261c9 !important;
}
.image-subscription {
  widows: 10%;
  height: 10%;
}
.grey-color {
  color: #474749;
}

.title-main .title{
  font-size: 42px !important;
  line-height: 3.5rem;
}
.title-main .subtitle{
  font-size: 30px !important;
}

@media (max-width: 640px) {
  .title-main .title{
    font-size: 36px !important;
    line-height: 3rem;
  }
  .title-main .subtitle{
    font-size: 24px !important;
    line-height: 2rem;
  }
}
</style>

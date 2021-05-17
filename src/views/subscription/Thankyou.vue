<template>
  <v-app>
    <NavBar />
    <section style="background: #e8eaff; padding-top: 50px">
      <v-row class="justify-center mt-16" style="margin-left:0 !important; margin-right:0 !important;">
        <v-col cols="10" xs="8" sm="8" md="6" class="text-center title-main">
          <p
            id="content-t"
            class="change-font font-weight-bold title"
            style="z-index: 1"
          >
            Thank you for your payment
          </p>
          <p class="change-font grey-color subtitle" style="z-index: 1">
            Your transaction has been completed and receipt for your purchase
            has been emailed to you
          </p>
          <img
            class="image-subscription left"
            src="@/assets/images/subscription/message.svg"
          />
          <div>
            <v-btn class="ok-btn" width="180" depressed large @click="ok">
              <span style="color: white; font-size: 20px">OK</span>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </section>
    <Footer />
    <CapterraTrackerPixel />
  </v-app>
</template>

<script>
import NavBar from '@/views/NavBar'
import Footer from '@/components/dashboard/footer'
import CapterraTrackerPixel from '../../components/external/pixel/CapterraTrackerPixel'
export default {
  name: 'Thankyou',
  components: {
    CapterraTrackerPixel,
    NavBar,
    Footer
  },
  data() {
    return {}
  },
  mounted() {
    // eslint-disable-next-line no-undef
    if (gtag) {
      // eslint-disable-next-line no-undef
      gtag('event', 'conversion', {
        send_to: 'AW-408788746/41PsCNWHuvkBEIq-9sIB',
        transaction_id: ''
      })
    }
  },
  computed: {
    isDesktop() {
      return this.$vuetify.breakpoint.mdAndUp
    }
  },
  methods: {
    ok() {
      this.$store.dispatch('user/getUserByToken', localStorage.getItem('querytoken'))
      this.$router.push({ name: 'Inventory' })
    }
  }
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
  widows: 15%;
  height: 15%;
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

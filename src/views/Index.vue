<template>
  <v-app>
    <NavBar :is-white="true" />
    <v-main class="main-screen">
      <v-container>
        <v-row class="main-screen-row" style="min-height: calc(100vh - 96px); align-items: center;">
          <v-col sm="12" md="5" xs="12" col="12 ">
            <v-card flat class="content-info">
              <h1 class="font-weight-bold change-font text-center">
                Try BRITECHECK Inventory Management Software Now
              </h1>
              <h2
                class="text-center change-font font-weight-bold"
                :class="{ 'mt-12': !isMobile, 'mt-8': isMobile }"
              >
                Scan QR Codes With Your Phone
              </h2>
              <v-card-actions
                class="justify-center"
                :class="{ 'mt-12': !isMobile, 'mt-6': isMobile }"
              >
                <v-btn
                  class="change-font font-weight-bold try-button"
                  style="font-size: 20px"
                  to="tryNowLink"
                >
                  TRY NOW
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col xs="12" sm="12" md="7" col="12" :class="{ 'pa-12': isMobile }">
            <v-img
              src="@/assets/images/index/iba-scan-1.png"
            >
            </v-img>
          </v-col>
        </v-row>
      </v-container>
      <section class="bg-grey section-wrapper">
        <v-container
          fluid
          style="background-color: #f5f5f5"
          :class="{ 'px-16': !isMobile }"
        >
          <v-row>
            <v-col sm="12" md="7" :class="{ 'pa-4': isMobile }">
              <v-img src="@/assets/images/index/iba-scan-4.png"></v-img>
            </v-col>
            <v-col sm="12" md="5">
              <v-card
                flat
                style="background-color: #f5f5f5"
                class="content-wrapper"
              >
                <h3
                  class="change-font"
                  :class="{
                    'text-right': !isMobile,
                    'text-center': isMobile,
                    'title-section': !isMobile,
                    'small-title-section': isMobile
                  }"
                  style="font-weight: 600"
                >
                  Easily manage inventory on a phone or tablet
                </h3>
                <p
                  class="mt-8 font-weight-medium"
                  :class="{ 'text-center': isMobile, 'text-right': !isMobile }"
                  style="font-size: 18px; line-height: 38px"
                >
                  Britecheck’s app offers easy-to-use barcode scanning—no
                  additional equipment required! Your smartphone is the scanner.
                  That makes BRITECHECK the perfect app to help all businesses
                  save time and reduce costs.
                </p>
                <v-card-actions
                  :class="{
                    'justify-end': !isMobile,
                    'justify-center': isMobile
                  }"
                >
                  <v-btn
                    depressed
                    class="change-font outlined-button textCapitalize tryNow"
                    to="tryNowLink"
                  >
                    Try Now
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </section>
      <section class="section-wrapper">
        <v-container>
          <v-row>
            <v-col sm="12" md="5">
              <v-card flat>
                <p
                  class="change-font"
                  :class="{
                    'text-left': !isMobile,
                    'text-center': isMobile,
                    'title-section': !isMobile,
                    'small-title-section': isMobile
                  }"
                  style="font-weight: 600"
                >
                  Generate inventory reports
                </p>
                <p
                  class="change-font mt-8 font-weight-medium"
                  :class="{ 'text-left:': !isMobile, 'text-center': isMobile }"
                  style="font-size: 18px; line-height: 38px"
                >
                  Britecheck’s inventory management software easily generates
                  professional reports that help you gain real-time insights,
                  understand what you’ve got on hand, forecast with clarity and
                  order with confidence
                </p>
                <v-card-actions
                  :class="{
                    'justify-start: ': !isMobile,
                    'justify-center': isMobile
                  }"
                >
                  <v-btn
                    depressed
                    class="outlined-button textCapitalize"
                    to="tryNowLink"
                  >
                    Try Now
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col sm="12" md="7" :class="{ 'pa-4': isMobile }">
              <v-img src="@/assets/images/index/iba-scan-2.png"></v-img>
            </v-col>
          </v-row>
        </v-container>
      </section>
      <section class="bg-grey section-wrapper">
        <v-container
          fluid
          style="background-color: #f5f5f5"
          :class="{ 'px-16': !isMobile }"
        >
          <v-row>
            <v-col sm="12" md="7" :class="{ 'pa-4': isMobile }">
              <v-img src="@/assets/images/index/iba-scan-3.png"></v-img>
            </v-col>
            <v-col sm="12" md="5" :class="{ 'pa-12': !isMobile }">
              <v-card flat style="background-color: #f5f5f5">
                <h3
                  class="change-font"
                  :class="{
                    'text-right': !isMobile,
                    'text-center': isMobile,
                    'title-section': !isMobile,
                    'small-title-section': isMobile
                  }"
                  style="font-weight: 600"
                >
                  Manage inventory on the go
                </h3>
                <p
                  :class="{ 'text-right': !isMobile, 'text-center': isMobile }"
                  style="font-size: 18px; line-height: 38px"
                >
                  Our iOS and Android apps make both on-site and off-site asset
                  tracking quick and easy. Users can quickly transfer stock, add
                  and remove inventory, perform cycle counts and access
                  information about every product instantly.
                </p>
                <v-card-actions
                  :class="{
                    'justify-end ': !isMobile,
                    'justify-center': isMobile
                  }"
                >
                  <v-btn
                    depressed
                    class="change-font outlined-button textCapitalize"
                    to="tryNowLink"
                  >
                    Try Now
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </section>
      <section class="section-wrapper">
        <v-container>
          <v-row class="justify-center">
            <p
              class="text-center change-font font-weight-bold"
              style="font-size: 32px"
            >
              More than 10,000 businesses, large and small, choose BRITECHECK
            </p>
          </v-row>
          <v-row class="justify-center">
            <v-col cols="12" id="tiny-container">
              <!-- see https://github.com/viktorlarsson/vue-tiny-slider -->
              <tiny-slider
                container="#tiny-container"
                :mouse-drag="true"
                :rewind="true"
                :items="itemsTiny"
                :controls="false"
                gutter="10"
                :autoplay="true"
                :autoplayButtonOutput="false"
                :autoplayTimeout="3000"
              >
                <div
                  v-for="(client, index) in clients"
                  :key="index"
                  :class="{
                    'padding-tiny-xs': tinySmall,
                    'padding-tiny-sm': tinyMedium,
                    'padding-tiny-md': tinyDesktop
                  }"
                >
                  <v-img
                    class="pa-2"
                    height="100"
                    width="100"
                    eager
                    :src="client"
                  ></v-img>
                </div>
              </tiny-slider>
            </v-col>
          </v-row>
        </v-container>
      </section>
      <section style="background-color: #313439">
        <v-container style="background-color: #313439" fluid>
          <v-row class="justify-center py-8 promo-block">
            <v-card flat style="background-color: #313439">
              <p
                class="text-center change-font font-weight-bold"
              >
                Try Britecheck Inventory Management <br />
                Now!
              </p>
              <v-card-actions class="justify-center">
                <v-btn
                  class="change-font font-weight-bold try-button textCapitalize"
                  style="font-size: 20px"
                  to="tryNowLink"
                >
                  Try Now
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-row>
        </v-container>
      </section>
      <Footer />
    </v-main>
  </v-app>
</template>
<script>
import NavBar from '@/views/NavBar'
import Footer from '@/components/dashboard/footer'
import VueTinySlider from 'vue-tiny-slider'
export default {
  name: 'Index',
  components: {
    NavBar,
    Footer,
    'tiny-slider': VueTinySlider
  },
  data() {
    return {
      drawer: null,
      clients: [
        require('@/assets/images/clients/amazon.png'),
        require('@/assets/images/clients/emory.png'),
        require('@/assets/images/clients/hawaii.png'),
        require('@/assets/images/clients/MinnesotaStateSystems.png'),
        require('@/assets/images/clients/navy_logo.jpg'),
        require('@/assets/images/clients/NYC_DOE.png'),
        require('@/assets/images/clients/seal_of_minnesota_logo.png'),
        require('@/assets/images/clients/sega.png'),
        require('@/assets/images/clients/tahn-logo.png'),
        require('@/assets/images/clients/tesla.png'),
        require('@/assets/images/clients/ucla2.png'),
        require('@/assets/images/clients/unilever_logo.png'),
        require('@/assets/images/clients/us_state_department.png'),
        require('@/assets/images/clients/whole_foods_logo.png')
      ],
      currentCarouselImage: 0,
      isLoggedIn: false,
      tryNowLink: ''
    }
  },
  mounted() {
    const curUserData = JSON.parse(localStorage.getItem('curUserData'))
    this.isLoggedIn = !!curUserData
    this.tryNowLink = this.isLoggedIn ? '/inventory' : '/login'
  },
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown
    },
    tinySmall() {
      return this.$vuetify.breakpoint.xsOnly
    },
    tinyMedium() {
      return this.$vuetify.breakpoint.smOnly
    },
    tinyDesktop() {
      return this.$vuetify.breakpoint.mdAndUp
    },
    itemsTiny() {
      if (this.tinySmall) {
        return 3
      } else if (this.tinyMedium) {
        return 4
      } else if (this.tinyDesktop) {
        return 6
      } else {
        return 0
      }
    }
  },
  created() {
    this.moveSlide()
  },
  methods: {
    moveSlide() {
      setInterval(() => {
        if (this.currentCarouselImage < 6) {
          this.currentCarouselImage += 1
        } else {
          this.currentCarouselImage = 1
        }
      }, 1500)
    }
  }
}
</script>

<style lang="scss">
@import 'tiny-slider/src/tiny-slider';
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700;800;900&display=swap');
.main-screen {
  padding: 0 !important;
}
.main-screen .content-info .v-btn{
  min-width: 240px !important
}
.main-screen .v-main__wrap{
  background: #fff !important;
}
.change-font {
  font-family: 'Raleway', sans-serif;
}
.try-button {
  background: linear-gradient(
    45deg,
    rgba(82, 79, 117, 1) 0%,
    rgba(119, 114, 181, 1) 100%
  );
  color: white !important;
  width: 200px;
  height: 50px !important;
}
.content-info h1 {
  font-size: 55px;
  line-height: 65px;
  margin-bottom: 1em;
  font-weight: 600;
  color: #3e3d52;
}
.content-info h2 {
  line-height: 60px;
  font-weight: 500;
  font-size: 28px;
  margin-bottom: 1.6em;
}
.content-wrapper h3 {
  font-size: 41px;
  font-weight: 500;
  margin: 0.9em 0 1.2em;
}
.content-wrapper p {
  margin-bottom: 2.6em;
}
.promo-block p {
  font-size: 48px;
  line-height: 60px;
  color: #fff;
}
p,
li {
  font-size: 18px;
  font-weight: 500;
  font-family: 'ptsanscaption', sans-serif;
  color: #383838;
  line-height: 1.8;
  margin-bottom: 15px;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: 700;
  font-family: 'Raleway', sans-serif;
  color: #3e3d52;
  line-height: 1.4;
  margin: 0 0 15px;
}
.outlined-button {
  background-color: #f5f5f5;
  color: #7671bd !important;
  border: 2px solid #7671bd;
  width: 100%;
  max-width: 250px;
  line-height: 34px;
  font-size: 20px !important;
  height: 53px !important;
  padding: 9px 30px;
  font-family: 'Raleway', sans-serif;
  border-radius: 4px;
  font-weight: 600;
  &:hover {
    background-color: #7671bd !important;
    color: white !important;
  }
}
.textCapitalize {
  text-transform: none !important;
}
.tryNow {
  color: #7671bd;
}
.title-section {
  font-size: 38px;
  line-height: 46px;
}
.small-title-section {
  font-size: 30px;
  line-height: 36px;
}
.section-wrapper {
  padding: 80px 0 80px;
}
.padding-tiny-xs {
  padding-left: 20px !important;
}
.padding-tiny-sm {
  padding-left: 30px !important;
}
.padding-tiny-md {
  padding-left: 40px !important;
}

@media (min-width: 1904px) {
  .container {
    max-width: 1380px;
  }
}
li.tns-item {
  text-align: center;
}

@media (max-width: 991px) {
  .content-info h1 {
        font-size: 45px;
  }
  .main-screen {
    padding: 64px 0px 0px !important;
  }
  .promo-block p {
    font-size: 44px;
  }
}

@media (max-width: 768px) {
  .main-screen-row {
    flex-direction: column !important;
  }
  .section-wrapper .row {
    flex-direction: column !important;
  }
}

@media (min-width: 1370px) {
  .container {
      max-width: 1370px;
  }
}

@media (max-width: 640px) {
  .content-info h1 {
    font-size: 38px;
    line-height: 48px;
  }
  .content-info h2 {
    line-height: 42px;
  }
}

@media (max-width: 480px) {
  .content-info h1 {
    font-size: 32px;
    line-height: 48px;
  }
  .content-info h2 {
    font-size: 22px;
  }
  .content-wrapper h3 {
    font-size: 28px;
  }
  .section-wrapper p {
    line-height: 32px !important;
  }
  .promo-block p {
    font-size: 38px;
    line-height: 46px;
  }
}
</style>

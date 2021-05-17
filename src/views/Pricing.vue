<template>
  <v-app>
    <NavBar :is-white="true" />
    <v-content>
      <Pricing v-if="!isMobile" />
      <PricingMobile v-if="isMobile" />
    </v-content>
  </v-app>
</template>

<script>
import NavBar from '@/views/NavBar'
import Pricing from '@/components/pricing/Pricing'
import PricingMobile from '@/components/pricing/PricingMobile'
export default {
  components: {
    NavBar,
    Pricing,
    PricingMobile
  },
  name: 'Princing',
  data() {
    return {
      pricingElevation: 4,
      collapseOnScroll: true,
      bg: '',
      appbarElevation: 0,
      scrolled: false,
      isLoggedIn: false,
      isMobile: false
    }
  },
  computed: {
    // test () {
    //   return this.$vuetify.breakpoint.width
    // }
  },
  mounted() {
    const curUserData = JSON.parse(localStorage.getItem('curUserData'))
    this.isLoggedIn = !!curUserData
    window.onscroll = () => {
      this.changeColor()
    }
    this.isMobile = document.documentElement.clientWidth < 600
    window.addEventListener('resize', this.onResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    onResize(event) {
      this.isMobile = document.documentElement.clientWidth < 600
    },
    changeColor() {
      if (
        document.body.scrollTop > 50 ||
        document.documentElement.scrollTop > 50
      ) {
        this.scrolled = true
      } else {
        this.scrolled = false
      }
    }
  }
}
</script>

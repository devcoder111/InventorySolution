<template>
  <div>
    <v-app-bar
      v-if="isDesktop"
      app
      fixed
      height="64px"
      :elevation="scrolled ? 4 : 0"
      :color="navBarColol"
      class="durable-transition"
      style="padding-left: 64px; padding-right: 80px"
    >
      <v-img
        v-if="!scrolled"
        src="@/assets/images/logo-britecheck.png"
        style="max-width: 220px; height: auto"
      ></v-img>
      <v-img
        v-else
        src="@/assets/images/logo-britecheck-grey.png"
        style="max-width: 220px; height: auto"
      ></v-img>
      <v-spacer></v-spacer>

      <div>
        <div v-if="isDesktop">
          <v-btn
            v-for="link in links"
            :key="link.route"
            link
            text
            class="link-navbar"
            :to="link.route"
            :href="link.href"
            :target="link.target"
          >
            <span class="change-font font-weight-bold"
              ><div class="link-before"></div>
              {{ link.text }}</span
            >
          </v-btn>
          <div class="d-inline" v-if="!isLoggedIn">
            <v-btn to="/login" text class="link-navbar">
              <span class="change-font font-weight-bold"
                ><div class="link-before"></div>
                SIGN IN</span
              >
            </v-btn>
            <v-btn
              to="/register"
              style="background-color: #7972c0; color: white"
            >
              <span class="change-font font-weight-bold">SIGN UP</span>
            </v-btn>
          </div>
          <div v-else class="d-inline"><UserTopMenu /></div>
        </div>
        <v-icon v-else color="#118BBB" @click="handleResponsiveMenu()"
          >mdi-format-align-left</v-icon
        >
      </div>
    </v-app-bar>
    <v-app-bar
      v-else
      app
      fixed
      height="64px"
      :elevation="4"
      :color="navBarColol"
      class="durable-transition"
    >
      <v-row class="flex-nowrap align-center" :class="{ 'px-8': isMobile }">
        <v-img
          v-if="!scrolled"
          src="@/assets/images/logo-britecheck.png"
          style="max-width: 220px; height: auto"
        ></v-img>
        <v-img
          v-else
          src="@/assets/images/logo-britecheck-grey.png"
          style="max-width: 220px; height: auto"
        ></v-img>
        <v-spacer></v-spacer>
        <v-icon color="#118BBB" @click="handleResponsiveMenu()"
          >mdi-format-align-left</v-icon
        >
      </v-row>
      <v-expansion-panels
        flat
        v-model="showResponsiveNav"
        style="position: absolute; top: 98%; left: 0px"
      >
        <v-expansion-panel>
          <v-expansion-panel-content>
            <v-card :class="{ 'px-8': isMobile }" flat>
              <v-list flat>
                <v-list-item-group>
                  <v-list-item
                    :ripple="false"
                    v-for="link in links"
                    :key="link.route"
                  >
                    <v-list-item-content>
                      <div class="link-before"></div>
                      <span
                        class="change-font font-weight-bold responsive-link-navbar"
                        >{{ link.text }}</span
                      >
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
              <v-btn
                style="background-color: #7972c0; color: white; width: 200px"
              >
                <span class="change-font font-weight-bold">SIGN UP</span>
              </v-btn>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-app-bar>
  </div>
  <!--  <div>-->
  <!--    <nav v-if="isDesktop">-->
  <!--      &lt;!&ndash; <TopBar v-if="isLoggedIn" /> &ndash;&gt;-->
  <!--      -->
  <!--      <v-main> </v-main>-->
  <!--    </nav>-->
  <!--    <nav v-else>-->
  <!--      -->
  <!--    </nav>-->
  <!--  </div>-->
</template>

<script>
// import TopBar from '@/components/top-bar/TopBar'
import UserTopMenu from '@/components/top-bar/UserTopMenu'
export default {
  components: {
    // TopBar
    UserTopMenu
  },
  name: 'NavBar',
  props: ['isWhite'],
  data() {
    return {
      scrolled: false,
      links: [
        { icon: 'mdi-link', text: 'HOME', route: '/index' },
        { icon: 'mdi-link', text: 'PRICING', route: '/pricing' },
        {
          icon: 'mdi-link',
          text: 'SUPPORT',
          href: 'https://britecheck.zendesk.com',
          target: '_blank'
        }
      ],
      showResponsiveNav: -1,
      isLoggedIn: false
    }
  },
  computed: {
    isDesktop() {
      return this.$vuetify.breakpoint.mdAndUp
    },
    isMobile() {
      return this.$vuetify.breakpoint.smOnly
    },
    navBarColol() {
      if (this.scrolled) {
        return 'white'
      } else {
        if (this.isWhite) {
          return 'white'
        } else {
          return '#f5f5f5'
        }
      }
    }
  },
  mounted() {
    if (!localStorage.getItem('curUserData') && !!localStorage.getItem('querytoken')) {
      this.$store.dispatch('user/getUserByToken', localStorage.getItem('querytoken')).then((response) => {
        if (response) {
          localStorage.removeItem('querytoken')
          this.$router.go(this.$router.currentRoute)
        }
      })
    }
    const curUserData = JSON.parse(localStorage.getItem('curUserData'))
    console.log('cUser', curUserData)
    if (curUserData !== null) this.isLoggedIn = true
    else this.isLoggedIn = false
    console.log('isloggedin', this.isLoggedIn)
    window.onscroll = () => {
      this.changeColor()
    }
  },
  methods: {
    changeColor() {
      if (
        document.body.scrollTop > 50 ||
        document.documentElement.scrollTop > 50
      ) {
        this.scrolled = true
        this.showResponsiveNav = -1
      } else {
        this.scrolled = false
      }
    },
    handleResponsiveMenu() {
      if (this.showResponsiveNav < 0) {
        this.showResponsiveNav = 0
      } else {
        this.showResponsiveNav = -1
      }
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700;800;900&display=swap');
.change-font {
  font-family: 'Raleway', sans-serif;
}
.durable-transition {
  transition: all 0.5s;
}
.try-button {
  background: linear-gradient(
    45deg,
    rgba(82, 79, 117, 1) 0%,
    rgba(119, 114, 181, 1) 100%
  );
  color: white !important;
  width: 200px;
  height: 35px !important;
}
.responsive-link-navbar {
  &:hover {
    &:before {
      content: '';
      height: 2px;
      width: 10px;
      background-color: #5f55b8;
      position: absolute;
      top: 50%;
      left: 0px;
    }
  }
}
.link-navbar {
  &:hover {
    .link-before {
      height: 3px;
      width: 10px;
      content: '';
      position: absolute;
      top: 6px;
      left: -13px;
      background-color: #5f55b8;
    }
  }
}

// header .v-toolbar__content {
//   width: 70%;
//   margin: auto;
// }
.signinup {
  display: inline-block;
}
.theme--light.v-btn--active:hover::before,
.theme--light.v-btn--active::before {
  opacity: 0;
}
.theme--light.v-btn:hover::before {
  opacity: 0;
}
</style>

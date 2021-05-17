<template>
  <div class="header-demo">
    <v-app-bar color="#f5f5f5" flat>
      <i class="logo" src="@/assets/glumlist.png" />
      <div class="d-flex align-center" style="width: 100%">
        <div class="d-flex">
          <img class="search-icon" src="@/assets/search.png" />
          <input class="search-input" placeholder="Search now..." />
        </div>
        <div class="ml-auto">
          <div>footer</div>
        </div>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: 'Header',

  data: () => ({
    ecosystem: [
      {
        text: 'vuetify-loader',
        href: 'https://github.com/vuetifyjs/vuetify-loader'
      },
      {
        text: 'github',
        href: 'https://github.com/vuetifyjs/vuetify'
      },
      {
        text: 'awesome-vuetify',
        href: 'https://github.com/vuetifyjs/awesome-vuetify'
      }
    ],
    importantLinks: [
      {
        text: 'Documentation',
        href: 'https://vuetifyjs.com'
      },
      {
        text: 'Chat',
        href: 'https://community.vuetifyjs.com'
      },
      {
        text: 'Made with Vuetify',
        href: 'https://madewithvuejs.com/vuetify'
      },
      {
        text: 'Twitter',
        href: 'https://twitter.com/vuetifyjs'
      },
      {
        text: 'Articles',
        href: 'https://medium.com/vuetify'
      }
    ],
    whatsNext: [
      {
        text: 'Explore components',
        href: 'https://vuetifyjs.com/components/api-explorer'
      },
      {
        text: 'Select a layout',
        href: 'https://vuetifyjs.com/getting-started/pre-made-layouts'
      },
      {
        text: 'Frequently Asked Questions',
        href: 'https://vuetifyjs.com/getting-started/frequently-asked-questions'
      }
    ]
  })
}
</script>
<style lang="scss">
.v-toolbar__content {
  border-bottom: 1px solid #e2e2e2;
}
.header-demo {
  .logo {
    width: 120px;
  }

  .search-icon {
    width: 25px;
    margin-left: 40px;
  }

  .search-input {
    margin-left: 10px;
    outline: none;
    font-size: 0.8rem;
  }
}
</style>

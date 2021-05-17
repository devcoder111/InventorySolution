<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style>
@font-face {
  font-family: 'Sourcesanspro';
  src: local('Sourcesanspro'),
    url(./fonts/sourcesanspro/sourcesanspro.ttf) format('truetype');
}

#app #inspire .home-content .label-text {
  font-size: 16px;
  letter-spacing: 0.75px;
}
#app #inspire .home-content .header-content {
}
.v-application, .v-application .headline {
    font-family: "Sourcesanspro" !important;
}
.v-main__wrap {
    background: #fafafa !important;
}
</style>

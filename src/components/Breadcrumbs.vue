<template>
  <v-row class="breadcrumbs">
    <v-col class="mb-1 pa-0 mt-1 " :class="{'flex-grow-0' : !isLast(i) }" v-for="(item, i) in items" :key="i">
      <span class="d-flex" :class="{ disabled: isLast(i) }" @click="routeTo(i)">
        {{ item && item.name }}
        <span class="mx-1" v-if="!isLast(i)">/</span>
      </span>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Breadcrumbs',
  data() {
    return {
      items: [
        {
          name: 'Home',
          path: ''
        }
      ]
    }
  },
  mounted() {
    this.updateList()
  },
  watch: {
    $route(val) {
      this.updateList(val)
    }
  },
  methods: {
    isLast(i) {
      return i === this.items.length - 1
    },
    routeTo(pRouteTo) {
      if (this.items[pRouteTo].path) {
        this.$router.push(this.items[pRouteTo].path)
      }
    },
    updateList() {
      var items = [
        {
          name: 'Home',
          path: '/'
        }
      ]
      if (this.$route.params.id) {
        var breadcrumbsMetaArr = this.$route.meta.breadcrumbs
        var lastEl = breadcrumbsMetaArr.length - 1
        this.$route.meta.breadcrumbs[lastEl].name = decodeURI(
          this.$route.params.id
        )
      }
      if (this.$route.name !== 'home') {
        this.items = items.concat(this.$route.meta.breadcrumbs)
      } else {
        this.items = []
      }
    }
  }
}
</script>

<style>
.breadcrumbs .disabled {
  cursor: default;
  color: #a4a4a4;
}
.breadcrumbs span {
  cursor: pointer;
}
</style>

<template>
  <div>
    <div class="headline">All items</div>
    <v-row>
      <v-col
        class="col-lg-4 col-xs-12"
        v-for="category in categories"
        :key="category.name"
      >
        <CategoryItem :category="category" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import CategoryItem from '@/components/inventory/CategoryItem'

export default {
  name: 'Categories',
  computed: {
    categories() {
      return this.$store.getters.categories
    }
  },
  components: {
    CategoryItem
  }
}
</script>

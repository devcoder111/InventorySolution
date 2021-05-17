<template>
  <div>
    <!--    <div class="title">{{ category.name }}</div>-->
    <v-row>
      <v-col
        class="col-lg-4 col-xs-12"
        v-for="category in category.categories"
        :key="category.name"
      >
        <CategoryItem :category="category" />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        class="col-lg-4 col-xs-12"
        v-for="item in category.items"
        :key="item.name"
      >
        <Item :item="item" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import CategoryItem from '@/components/inventory/CategoryItem'
import Item from '@/components/inventory/Item'

export default {
  name: 'Category',
  computed: {
    category() {
      const categories = this.$store.getters.categoryById(
        Number(this.$route.params.id)
      )
      return categories
    }
  },
  components: {
    CategoryItem,
    Item
  }
}
</script>

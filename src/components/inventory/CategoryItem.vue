<template>
  <v-card hover>
    <div @click="openCategory(category.id)">
      <v-img height="150" :src="categoryImage"></v-img>
      <v-card-title> {{ category.name }} </v-card-title>
      <v-card-text class="caption">
        <v-icon class="px-2">mdi-package-variant-closed</v-icon
        ><b>{{ totalItems }}</b> |
        <v-icon class="px-2">mdi-folder</v-icon>
        <b>{{ subCategoriesCount }}</b>
      </v-card-text>
    </div>
    <v-divider />
    <v-card-actions class="justify-center">
      <v-btn small color="blue lighten-2" text>
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
      <v-btn small color="red lighten-2" text>
        <v-icon>mdi-delete</v-icon>
      </v-btn>
      <v-btn small text>
        <v-icon>mdi-history</v-icon>
      </v-btn>
      <v-menu open-on-hover>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" small text>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, index) in actions" :key="index" ss>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'Category',
  data() {
    return {
      actions: [{ title: 'Clone' }, { title: 'Create alert' }]
    }
  },
  props: {
    category: Object
  },
  computed: {
    categoryImage() {
      if (this.category.image) {
        return require(this.category.image)
      } else {
        return require('../../assets/folder.svg')
      }
    },
    totalItems() {
      let itemsInSubCategories = 0
      if (this.category.items || itemsInSubCategories) {
        for (const i in this.subCategories) {
          const subCategory = this.subCategories[i]
          if (this.subCategories && subCategory.items) {
            itemsInSubCategories += subCategory.items.length
          }
        }
        return this.category.items.length + itemsInSubCategories
      }
      return 0
    },
    subCategories() {
      return this.category.categories ? this.category.categories : null
    },
    subCategoriesCount() {
      return this.subCategories ? this.subCategories.length : 0
    }
  },
  methods: {
    openCategory(id) {
      this.$router
        .push({
          name: 'Category',
          params: { id: id }
        })
        .catch(() => {})
    }
  }
}
</script>

<style>
.v-image__image--cover {
  background-size: 30%;
}
</style>

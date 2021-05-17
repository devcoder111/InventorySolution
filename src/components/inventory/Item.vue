<template>
  <v-card hover>
    <div @click="openItem(item.id)">
      <v-img
        :src="itemImage || ''"
        style="background: #d3d3d3"
        class="justify-center align-center"
        height="150"
      >
        <v-row class="justify-center align-center">
          <v-icon>mdi-image</v-icon>
        </v-row>
      </v-img>
      <v-card-title> {{ item.name }} </v-card-title>
      <v-card-text class="caption">
        <span>Price: </span><b>{{ item.price }}</b> |
        <span>Qty: </span>
        <b>{{ item.quantity }}</b>
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
        <v-icon>mdi-plus-minus-variant</v-icon>
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
    item: Object
  },
  computed: {
    itemImage() {
      if (this.item.images?.length) {
        return require(this.item.images[0])
      }
      return ''
    }
  },
  methods: {
    openItem(id) {
      this.$router
        .push({
          name: 'Item',
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

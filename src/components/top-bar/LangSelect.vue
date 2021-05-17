<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn small text depressed v-bind="attrs" v-on="on">
        <v-icon>mdi-translate</v-icon>Lang</v-btn
      >
    </template>
    <v-list>
      <v-list-item v-for="(item, index) in langs" :key="index" ss>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: 'LangSelect',
  data() {
    return {
      langs: [{ title: 'En' }, { title: 'Ru' }]
    }
  }
}
</script>

<template>
  <v-row
    class="justify-start align-start pa-2"
    style="background-color: #efefef; position: relative"
  >
    <v-col class="py-0" cols="12" sm="4">
      <span class="text-h5">{{title}}</span>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'PageTitle',
  props: ['title']
}
</script>

<style scoped>
.text-h5 {
  font-weight: 500 !important;
}
</style>

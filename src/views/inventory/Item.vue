<template>
  <div>
    <div class="headline">View item</div>
    <v-row>
      <v-col>
        <div class="subtitle-1">Default Information</div>
        Id: {{ item.id }}
      </v-col>
      <div class="subtitle">Photos</div>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'Item',
  props: {
    item: Object
  }
}
</script>

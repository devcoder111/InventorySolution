<template>
  <v-col cols="4">
    <div
      class="item-preview-box"
      @click="handleItemClick(index)"
      ref="addingBox"
    >
      <v-row>
        <v-col cols="2">
          <!-- <img src="/img/pencil2.0f2d205c.svg" class="preview-icon" /> -->
          <img
            :src="require(`@/assets/icons/svg/${icon}`)"
            class="preview-icon"
          />
        </v-col>
        <v-col cols="10">
          <h5>{{ name }}</h5>
          <p class="description-text mt-2 mb-2">{{ text }}</p>
        </v-col>
      </v-row>
    </div>
  </v-col>
</template>

<script>
import { isTarget } from '@/utils'

export default {
  name: 'customFieldsAddingPreview',
  props: {
    icon: {
      type: String,
      required: true
    },
    itemType: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    defaultValue: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleItemClick(index) {
      if (
        !isTarget(this.$refs.addingPreview, event.target, this.$refs.addingBox)
      ) {
        this.$emit('goToItem', index)
      }
    }
  }
}
</script>

<style lang='scss'>
.item-preview-box {
  border: 1px solid rgb(218, 221, 227);
  border-radius: 4px;
  background-color: rgb(255, 255, 255);
  padding: 20px 20px 10px;
  min-height: 140px;
  transition: 0.3s;
  .description-text {
    font-size: 14px;
    line-height: 1.5em;
    color: #67676a;
  }
  h5 {
    transition: 0.3s;
    font-size: 22px;
  }
  &:hover {
    background-color: rgba(#958fcb, 0.07);
    cursor: pointer;
    border: 1px solid #bfbed1;
    box-shadow: rgb(23 31 45 / 12%) 0px 4px 8px 0px;
    h5 {
      color: #7671bd;
    }
  }
  .preview-icon {
    width: 22px;
    height: 22px;
    fill: #7671bd !important;
    margin-top: 6px;
  }
}
.description-text {
  font-size: 16px;
}
</style>

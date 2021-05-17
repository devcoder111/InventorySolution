<template>
  <div class="mt-2" v-if="!isDeleted">
    <div class="inputBox">
      <v-text-field
        dense
        v-model="thisValue"
        color="#43425d"
        maxlength="128"
        :readonly="!isEditMode"
        class="r-field item-name-field"
        ref="textField"
        :rules="nameRules"
      />
      <div class="controls-placement">
        <span
          v-if="!isEditMode"
          class="setDefaultBtn"
          @click="$emit('setDefault')"
        >
          {{ isAsDefault ? 'Unset as default' : 'Set as default' }}
        </span>
        <v-btn
          @click="$emit('delete', index)"
          depressed
          class="px-1"
          color="transparent"
          min-width="0"
        >
          <v-icon color="#7671bd">mdi-close</v-icon>
        </v-btn>
        <v-btn
          v-if="!isEditMode"
          @click="doEditAndFocus"
          depressed
          class="px-1"
          color="transparent"
          min-width="0"
        >
          <v-icon color="#7671bd">mdi-pencil</v-icon>
        </v-btn>
        <v-btn
          v-else
          @click="isEditMode = false"
          depressed
          class="px-1"
          color="transparent"
          min-width="0"
        >
          <v-icon color="#7671bd">mdi-check</v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    index: {
      type: Number,
      required: true
    },
    value: {
      type: String,
      default: ''
    },
    isAsDefault: {
      type: Boolean,
      default: false
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    thisValue: {
      get() {
        return this.value
      },
      set(v) {
        this.$emit('newInput', v)
      }
    }
  },
  data: function () {
    return {
      isEditMode: true,
      nameRules: [(v) => v.length || "This field shouldn't be empty"]
    }
  },
  methods: {
    doEditAndFocus() {
      this.isEditMode = true
      this.$refs.textField.focus()
    }
  }
}
</script>

<style lang='scss'>
.inputBox {
  position: relative;
  padding-top: 14px;
  .controls-placement {
    position: absolute;
    bottom: 0;
    right: 0;
    height: 25px;
    top: 10px;
  }
  .setDefaultBtn {
    cursor: pointer;
    user-select: none;
    transition: 0.2s linear;
    color: #7671bd;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      width: 0px;
      height: 1px;
      bottom: -1px;
      left: 50%;
      transform: translateX(-50%);
      transition: 0.2s linear;
      background-color: darken(#7671bd, 10%);
    }
    &:hover {
      color: darken(#7671bd, 10%);
      &::before {
        width: 100%;
      }
    }
  }
}
</style>

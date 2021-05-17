<template>
  <div :id="id" class="dropdown">
    <div class="dropdown-header">
      <div class="slot"><slot /></div>
      <div class="showentries">{{ entriesselected }}</div>
      <img
        src="@/assets/filter/dropdownsolid.png"
        class="icondropdown"
        @click="isOpen = !isOpen"
        :class="{ isActive: isOpen }"
      />
    </div>

    <div class="dropdown-list" v-if="isOpen">
      <div v-for="(item, index) in arrays" :key="index" :item="item">
        <div class="item" @click="selected(index)">
          {{ item.text }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'DropdownMenu',
  components: {},
  data() {
    return {
      isOpen: false
    }
  },
  props: {
    arrays: {
      type: Array,
      default: () => []
    },
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    entriesselected() {
      let value = '1'
      this.arrays.map((x) => {
        if (x.selected) {
          value = x.text
        }
      })
      return value
    }
  },
  methods: {
    callToClose() {
      this.isOpen = false
    },
    selected(index) {
      this.arrays.map((x, index1) => {
        if (index !== index1) {
          x.selected = false
        } else {
          x.selected = true
        }
      })
      this.callToClose()
    }
  },
  created() {
    console.log('create')
  },
  mounted() {
    console.log('mounted')
  },
  unmouned() {
    console.log('unmounted')
  }
}
</script>
<style lang="scss" scoped>
button {
  position: relative;
  padding: 10px 20px;
  background-color: white;
  border: 1px solid black;
  cursor: pointer;
  transition: 0.3s;

  &:focus {
    outline: 0px;
  }

  &:hover {
    background: #000;
    color: white;
  }

  &.isActive {
    background: #000;
    color: white;
  }
}

.dropdown {
  position: relative;
  width: fit-content;
  .dropdown-header {
    display: inline-flex;
    align-items: center;
    border: 1px solid #a0979747;
    padding: 3px 6px;
    font-size: 12px;
    .slot {
    }
    .showentries {
      margin-right: 10px;
    }
    .icondropdown {
      width: 8px;
      height: 4px;
    }
  }

  &-list {
    background: white;
    margin-top: 5px;
    position: absolute;
    z-index: 10;
    width: 100%;
    border: 1px solid black;
    border-radius: 4px;
    .item {
      display: block;
      width: 100%;
      padding: 5px 10px;
      transition: 0.3s;
      position: relative;

      &:hover {
        background: black;
        color: white;
      }
    }
  }
}
</style>

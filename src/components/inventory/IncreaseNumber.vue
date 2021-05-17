<template>
  <div class="input-increase">
    <input
      class="input-inside"
      type="number"
      v-model="foo1"
      :placeholder="placeholder1"
    />
    <div class="icon-input">
      <div class="wrap-arrow-up" @click="increment">
        <img class="arrow-up" src="@/assets/arrow-up.png" />
      </div>
      <div class="wrap-arrow-down" @click="decrement">
        <img class="arrow-down" src="@/assets/arrow-down.png" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IncreaseNumber',
  props: ['foo', 'placeholder', 'type'],
  data: function () {
    return { foo1: this.foo, placeholder1: this.placeholder, type1: this.type }
  },
  watch: {
    foo1(data) {
      this.$emit('update', data)
      // this.model= this.editCompName      // put the selected option value on edit table
    }
  },

  computed: {
    // getDataFoo() {}
  },
  methods: {
    increment() {
      this.foo1 = parseInt(this.foo1) + 1
    },
    decrement() {
      if (parseInt(this.foo1) - 1 >= 0) this.foo1 = parseInt(this.foo1) - 1
    }
  }
}
</script>
<style lang="scss">
.input-increase {
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid rgba(0, 0, 0, 0.38);

  padding-left: 8px;
  padding-right: 5px;

  height: 40px;
  border-radius: 5px;
  .input-inside {
    border: none;
    width: 95%;
    outline: none;
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    -moz-appearance: textfield;

    &::placeholder {
      /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: rgb(192, 189, 189);
      opacity: 1; /* Firefox */
    }
  }
  .icon-input {
    width: 5%;
    flex-direction: column;
    height: 100%;
    display: block;
    text-align: center;
    .wrap-arrow-up {
      height: 50%;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      padding-top: 3px;
      .arrow-up {
        width: 12px;
      }
    }
    .wrap-arrow-down {
      height: 50%;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      padding-bottom: 3px;
      .arrow-down {
        width: 12px;
      }
    }
  }
}
</style>

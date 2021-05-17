<template>
  <div class="wrapper-taginput">
    <div class="tag-input" v-bind:style="{ height: getHeight }">
      <div v-for="(tag, index) in tags" :key="index" class="tag-input__tag">
        {{ tag }}
      </div>
      <input
        type="text"
        placeholder="Search Tags"
        class="tag-input__text"
        @keydown.enter="addTag"
        @keydown.188="addTag"
        @keydown.delete="removeLastTag"
      />
    </div>
    <div class="delete-all" @click="deleteall()">
      <img src="@/assets/filter/deleteall.png" class="xicon" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'Tags',
  data() {
    return {
      tags: ['']
    }
  },
  computed: {
    getHeight() {
      return '24px'
    }
  },
  methods: {
    addTag(event) {
      event.preventDefault()
      var val = event.target.value.trim()
      if (val.length > 0) {
        this.tags.push(val)
        event.target.value = ''
      }
    },
    removeTag(index) {
      this.tags.splice(index, 1)
    },
    removeLastTag(event) {
      if (event.target.value.length === 0) {
        this.removeTag(this.tags.length - 1)
      }
    },
    deleteall() {
      this.tags = []
    }
  }
}
</script>
<style lang="scss" scoped>
.wrapper-taginput {
  width: 100%;
  clear: both;
  .tag-input {
    width: 90%;
    border: 1px solid #a09797bf;
    font-size: 12px;
    height: 24px;
    box-sizing: border-box;
    padding: 1px 5px;
    float: left;
    border-radius: 5px;
    .tag-input__tag {
      height: 20px;
      float: left;
      margin-right: 5px;
      background-color: #eee;
      margin-top: 1px;
      line-height: 20px;
      padding: 0 5px;
      border-radius: 5px;
      > span {
        cursor: pointer;
        opacity: 0.75;
      }
    }
    .tag-input__text {
      border: none;
      outline: none;
      font-size: 12px;
      line-height: 20px;
      background: none;
      float: left;
    }
  }
  .delete-all {
    height: 20px;
    float: left;
    width: 10%;
    margin-top: 1px;
    line-height: 20px;
    padding: 0 5px;
    border-radius: 5px;
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;
    .xicon {
      width: 15px;
      height: 15px;
    }
  }
}
</style>

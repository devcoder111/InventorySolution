<template>
  <customFieldsAddingPreview
    :icon='"attached-file.svg"'
    :name='name'
  >
    <template :slot='"body"'>
      <div class="d-flex">
        <v-file-input
          ref='fileInput'
          hint='Attach File'
          label='Attach File'
          truncate-length="11"
        ></v-file-input>
      </div>
    </template>
  </customFieldsAddingPreview>
</template>

<script>
import customFieldsAddingPreview from '../customFieldsAddingPreview'
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data: function() {
    return {
      exampleValue: '',
      dialogIsOpened: false
    }
  },
  components: {
    customFieldsAddingPreview
  }
}
</script>

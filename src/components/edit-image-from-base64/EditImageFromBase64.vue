<template>

  <div>

    <v-dialog
      v-model='dialogModel'
      max-width='500'
    >
      <v-card class='base64PicEditorDialog'>
        <v-card-text>
          <v-row>
            <v-col>
              <v-image-input
                v-model='valueToInput'
                :image-quality="1"
                :debounce="250"
                ref='imageEditorRef'
              />
            </v-col>
          </v-row>
        </v-card-text>
          <v-divider></v-divider>
        <v-card-actions>
          <v-row>
            <v-col>
              <v-btn
                color="green darken-1"
                text
                @click="$emit('cancel')"
              >
                Cancel
              </v-btn>
              <v-btn
                color="green darken-1"
                text
                @click="handleSave"
              >
                Save Changes
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>

</template>

<script>
import VImageInput from 'vuetify-image-input'
export default {
  props: {
    imageToEditData: {
      type: String,
      default: '',
      required: true
    }
  },
  data: function() {
    return {
      dialogModel: this.imageToEditData,
      valueToInput: this.imageToEditData
    }
  },
  components: {
    [VImageInput.name]: VImageInput
  },
  methods: {
    handleSave() {
      this.$emit('save', this.$refs.imageEditorRef.imageData)
      this.$refs.imageEditorRef.clear()
    }
  },
  async mounted() {
    await this.$refs.dia
    this.$refs.imageEditorRef.load({ file: null, base64: this.imageToEditData })
  }
}
</script>
<style lang='scss' scoped>
  .base64PicEditorDialog {
    padding: 20px 0;
  }
</style>

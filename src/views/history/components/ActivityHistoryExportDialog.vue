<template>
  <v-dialog v-model="visible" persistent max-width="768">
    <v-card style="padding: 15px">
      <v-card-title class="headline d-flex justify-center popup-title"
      > Export Activity History
      </v-card-title>
      <v-card-text>
        <v-col cols="12" class="text-xs-center text-center">
          <v-btn-toggle
            class="btn-block-exp"
            v-model="toggle"
          >
            <v-btn class="btn-exp">
              <v-img src="@/assets/icons/svg/csv-file.svg" height="46px" width="46px" />
            </v-btn>
            <v-btn class="btn-exp">
              <v-img src="@/assets/icons/svg/pdf-file.svg" height="46px" width="46px" />
            </v-btn>
          </v-btn-toggle>
        </v-col>
      </v-card-text>
      <v-card-actions class="text-xs-center justify-center">
        <v-btn
          color="#7972c0"
          depressed
          normal
          dark
          style="margin-right: 8px; width: 100px; text-transform: none"
          @click="startExport"
        >Export</v-btn
        >
        <v-btn
          depressed
          normal
          color="white"
          @click="hideDialog"
          style="
              padding: 0 18.4444444444px;
              width: 100px;
              border: 1px solid rgb(121 114 192) !important;
              text-transform: none;
            "
        ><span style="color: rgb(121 114 192)">Cancel</span></v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import * as constant from '../constant'

export default {
  name: 'ActivityHistoryExportDialog',
  data() {
    return {
      visible: false,
      toggle: null
    }
  },
  computed: {
    exportType() {
      switch (this.toggle) {
        case 0:
          return constant.EXPORT_CSV
        case 1:
          return constant.EXPORT_PDF
        default:
          return null
      }
    }
  },
  methods: {
    startExport() {
      this.$emit('on-export', this.exportType)
      this.hideDialog()
    },
    showDialog() {
      this.toggle = null
      this.visible = true
    },
    hideDialog() {
      this.visible = false
    }
  }
}
</script>

<style scoped>
.btn-block-exp .btn-exp {
  margin: 0 9px;
}
.v-btn-toggle > .v-btn.btn-exp,
.theme--light.v-btn-toggle:not(.v-btn-toggle--group) .v-btn.btn-exp {
  border: solid 1px #efefef;
  border-color: #efefef !important;
  border-radius: 3px;
  background-color: #fff;
  box-shadow: 3px 3px 7px #a9a2a2db;
}
.v-btn-toggle > .v-btn.btn-exp:hover,
.theme--light.v-btn-toggle:not(.v-btn-toggle--group) .v-btn.btn-exp:hover {
  background-color: #f7f7f7;
  box-shadow: none;
}
.v-btn-toggle > .v-btn.v-btn--active[data-v-7eabbac6],
.theme--light.v-btn-toggle:not(.v-btn-toggle--group) .v-btn.v-btn--active[data-v-7eabbac6] {
  border-color: #7972c0 !important;
  box-shadow: none !important;
  background-color: #f4f3fe;
}
.v-btn:before {
  display: none;
}
.v-btn-toggle:not(.v-btn-toggle--dense) .v-btn.v-btn.v-size--default {
    height: 66px;
    min-height: 0;
    min-width: 66px;
}
.v-btn-toggle > .v-btn.v-btn {
  padding: 0 16px;
}
.popup-title {
  margin-bottom: 10px;
  color: #363636;
}
</style>

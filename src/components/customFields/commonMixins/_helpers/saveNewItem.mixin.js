import customFieldService from '@/services/customField'
import { fieldsNamesToBE } from '@/utils/customFields'
import {
  MODULE_POPUP,
  SET_SUBMIT_FORM_ERROR_POPUP_SHOW,
  SET_SUBMIT_FORM_ERROR_POPUP_TITLE,
  SET_SUBMIT_FORM_ERROR_POPUP_MESSAGE
} from '@/store/constant/mutation-types'

export const saveNewItemMixin = {
  data: function() {
    return {
      nameRules: [(v) => !!v.length || 'Please Enter Name'],
      saveErrors: 0
    }
  },
  computed: {
    haveErrors() {
      return Boolean(this.saveErrors)
    }
  },
  methods: {
    validate() {
      this.saveErrors = 0
      if (!this.name.length) this.saveErrors++
    },
    async save() {
      this.validate()
      if (!this.saveErrors) {
        const basePayload = {
          inventoryId: await this.$store.getters['user/usersInventories'][0],
          name: this.name,
          placeholder: this.placeholderContent,
          fieldType: fieldsNamesToBE.get(this.itemType).name,
          type: fieldsNamesToBE.get(this.itemType).type,
          defaultValue: this.defaultValue,
          applyTo: this.applicableToAll ? 'ALL_ITEMS' : 'ITEMS'
        }
        if (this.isEdit) basePayload.id = this.editId
        if (this.units) basePayload.units = this.units

        if (this.itemType !== 'dropDown') {
          basePayload.defaultValue = '' + this.defaultValue
        } else {
          if (this.isEdit) {
            basePayload.oldValues = this.getOldValues().map(el => el.value)
            basePayload.newValues = this.defaultValues.map(el => {
              if (el.isDeleted) {
                el = null
              } else {
                el = el.value
              }
              return el
            })
          } else {
            basePayload.values = this.defaultValues.map(el => el.value)
          }

          const haveDefault = this.defaultValues.find(item => item.isAsDefault)
          basePayload.defaultValue = haveDefault
            ? haveDefault.value
            : ''
        }

        let result
        if (this.isEdit) {
          result = await customFieldService.changeCustomField(basePayload)
        } else {
          result = await customFieldService.addCustomField(basePayload)
        }

        if (result.data.error.type === 200) {
          this.$emit('exit', false)
        } else {
          this.$store.commit(`${MODULE_POPUP}/${SET_SUBMIT_FORM_ERROR_POPUP_SHOW}`, true)
          this.$store.commit(`${MODULE_POPUP}/${SET_SUBMIT_FORM_ERROR_POPUP_TITLE}`, 'Error to save')
          this.$store.commit(`${MODULE_POPUP}/${SET_SUBMIT_FORM_ERROR_POPUP_MESSAGE}`, result.data.error.message)
        }
      }
    }
  }
}

<template>
  <v-card id="filter-by-folder-wrapper" flat class="items-center filter-select">
    <v-card-text class="filter-title">
      <span>Folder:</span>
    </v-card-text>
    <v-card-text class="d-flex justify-center filter-select--input">
      <div style="position: relative" class="treeviewContainer">
        <v-text-field
          v-model="folderName"
          placeholder="Select Folder"
          @click="showDropdown"
          @keyup.delete="clearFilterByFolder"
          class="cursor-point"
          readonly
        >
        </v-text-field>
        <v-card
          v-if="visible"
          class="filter-select--dropdown"
          id="filer-by-folder-dropdown"
          v-click-outside="hideDropdown"
        >
          <v-text-field
            v-model="searchTerm"
            placeholder="Search..."
            outlined
            dense
            hide-details
            height="20"
            class="full-width px-2"
            :v-ripple="false"
          ></v-text-field>
          <v-treeview
            :active.sync="active"
            :items="items"
            :search="searchTerm"
            item-children="categories"
            return-object
            activatable
            item-key="id"
            dense
            class="px-2 cursor-point"
            selection-type="independent"
          >
            <template v-slot:prepend="{}">
              <div>
                <v-img
                  max-height="20"
                  max-width="20"
                  class="mr-2 cursor-point"
                  src="@/assets/icons/svg/folder-color.svg"
                ></v-img>
              </div>
            </template>
          </v-treeview>
        </v-card>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'FilterByFolder',
  props: [],
  data() {
    return {
      visible: false,
      folders: [],
      searchTerm: '',
      active: []
    }
  },
  watch: {
    folder() {
      this.hideDropdown()
      this.$emit('on-change', this.folder?.id || null)
    }
  },
  computed: {
    user() {
      return this.$store.getters['user/user']
    },
    inventory() {
      return this.user?.inventories[0]
    },
    items() {
      const search = this.searchTerm.trim()
      if (search.length === 0) {
        return this.folders
      }
      return this.folders.filter((folder) => {
        return folder.name.toLowerCase().indexOf(search) === 0
      })
    },
    folder() {
      return this.active[0] || null
    },
    folderName() {
      return this.folder?.name || ''
    }
  },
  methods: {
    ...mapActions('inventory', ['getAllFolders']),
    showDropdown() {
      this.visible = true
    },
    hideDropdown() {
      this.visible = false
    },
    clearFilterByFolder() {
      this.active = []
    }
  },
  mounted() {
    this.getAllFolders({ inventoryId: this.inventory }).then((folders) => {
      this.folders = folders
    })
  }
}
</script>

<style scoped>
::v-deep .v-treeview--dense .v-treeview-node__root {
  min-height: 35px;
}
#filter-by-folder-wrapper {
  width: 240px !important;
  background-color: #f5f5f5;
  position: relative;
}
.cursor-point {
  cursor: pointer;
}
</style>

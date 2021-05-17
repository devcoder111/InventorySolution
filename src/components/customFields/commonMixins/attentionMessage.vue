<template>
  <v-col cols='12'>
    <v-row
      class="mx-0 my-4"
      style="border: solid 1px #fec111; border-radius: 4px"
    >
      <v-col cols="1" class="pa-0" style="background-color: #fec111">
        <v-row class="justify-center align-center">
          <v-col cols="auto" class="my-2">
            <v-img
              width="24px"
              height="24px"
              src="@/assets/icons/svg/alert.svg"
            ></v-img>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="11" class="pa-0 pl-4">
        <v-row class="align-center my-auto" style="height: 100%">
          <v-col cols="auto" class="py-0">
              <span
                style="color: #505050; font-size: 16px; font-weight: 500"
              >
                <b>Pay attention!</b> All changes will apply to the items where the custom field is used
              </span>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-col>
</template>

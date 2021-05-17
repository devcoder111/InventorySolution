<template>
  <v-row
    class="d-flex justify-start flex-row flex-wrap align-center header-container"
  >
    <v-col cols="12" sm="6" md="6">
      <div
        class="back-button d-inline-flex flex-row flex-nowrap justify-start align-center"
      >
        <div>
          <span class="isvg loaded pr-2"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="7"
              height="10"
              viewBox="0 0 7 10"
            >
              <path
                fill="#0096BC"
                fill-rule="evenodd"
                d="M6.102,1.22 C6.2470788,1.35833074 6.32917518,1.55004239 6.32917518,1.7505 C6.32917518,1.95095761 6.2470788,2.14266926 6.102,2.281 L2.202,5.998 L6.102,9.718 C6.24739796,9.85636079 6.32970009,10.0482906 6.32970009,10.249 C6.32970009,10.4497094 6.24739796,10.6416392 6.102,10.78 C5.79034477,11.0767619 5.30065523,11.0767619 4.989,10.78 L0.564,6.559 C0.410058087,6.41218105 0.322949718,6.20872968 0.322949718,5.996 C0.322949718,5.78327032 0.410058087,5.57981895 0.564,5.433 L4.989,1.22 C5.30099104,0.923110985 5.79100896,0.923110985 6.103,1.22 L6.102,1.22 Z"
                transform="translate(0 -1)"
              ></path>
            </svg>
          </span>
        </div>
        <span>Back</span>
      </div>
      <div>
        <span class="header-title">User Profile</span>
      </div>
    </v-col>
  </v-row>
</template>
<script>
export default {
  data() {
    return {}
  }
}
</script>
<style scoped>
.header-container {
  border-bottom: 1px solid rgb(218, 221, 227);
}
.back-button span {
  font-weight: bold;
  font-family: HelveticaNeue, sans-serif;
  font-size: 12px;
  line-height: 1.43;
  letter-spacing: 0.2px;
  color: rgb(0, 150, 188);
}
.header-title {
  color: rgb(29, 34, 43);
  font-weight: bold;
  font-family: HelveticaNeue, sans-serif;
  font-size: 22px;
  line-height: 1.43;
  letter-spacing: 0.2px;
}
.add-subscription-btn {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  background-color: rgb(230, 246, 250);
}
.isvg {
  width: 16px;
  height: 16px !important;
}
</style>

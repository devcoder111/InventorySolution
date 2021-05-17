<template>
  <div>
    <Slider />
    <div style="background-color: #f5f5f5; padding: 64px 0">
      <v-container class="py-0">
        <v-row style="min-height: calc(100vh - 96px)">
          <v-col xs="12" sm="6" md="4" class="pt-0">
            <v-card flat style="background-color: #f5f5f5">
              <div class="img-hover-zoom">
                <div class="middle">
                  <p style="color: white; font-size: 20px">Read More</p>
                </div>
                <v-img
                  transition="scale-transition"
                  class="zoom-image"
                  src="@/assets/images/blog_post/image-post28122020.jpg"
                ></v-img>
              </div>
              <p class="date-post">DEC 28TH 2020</p>
              <p class="title-post">
                Top Inventory Management ecel Templates to Make Your Inventoryng
                Easier
              </p>
              <v-btn
                text
                class="link-post"
                style="font-size: 18px !important"
                to="/blog/how-your-business-can-benefit-from-an-inventory-management-software.html"
              >
                Read More >
              </v-btn>
              <v-divider />
            </v-card>
          </v-col>
          <v-col xs="12" sm="6" md="4" class="pt-0">
            <v-card flat style="background-color: #f5f5f5">
              <div class="img-hover-zoom">
                <div class="middle">
                  <p style="color: white; font-size: 20px">Read More</p>
                </div>
                <v-img
                  class="zoom-image"
                  src="@/assets/images/blog_post/image-post16122020.jpg"
                ></v-img>
              </div>
              <p class="date-post">DEC 16th 2020</p>
              <p class="title-post">
                How an Inventory Barcode Scanner App Works
              </p>
              <v-btn
                text
                class="link-post"
                style="font-size: 18px !important"
                to="/blog/how-an-inventory-barcode-scanner-works.html"
              >
                Read More >
              </v-btn>
              <v-divider />
            </v-card>
          </v-col>
          <v-col xs="12" sm="6" md="4" class="pt-0">
            <v-card flat style="background-color: #f5f5f5">
              <div class="img-hover-zoom">
                <div class="middle">
                  <p style="color: white; font-size: 20px">Read More</p>
                </div>
                <v-img
                  class="zoom-image"
                  src="@/assets/images/blog_post/image_2020_11_19T10_04_35_314Z.png"
                ></v-img>
              </div>
              <p class="date-post">NOV 20th 2020</p>
              <p class="title-post">
                The Best Inventory Management Software for Simplicity and Peace
                of Mind
              </p>
              <v-btn
                text
                class="link-post"
                style="font-size: 18px !important"
                to="/blog/the-best-inventory-management-software-for-simplicity-and-peace-of-mind.html"
              >
                Read More >
              </v-btn>
              <v-divider />
            </v-card>
          </v-col>
          <v-col xs="12" sm="6" md="4" class="pt-0">
            <v-card flat style="background-color: #f5f5f5">
              <div class="img-hover-zoom">
                <div class="middle">
                  <p style="color: white; font-size: 20px">Read More</p>
                </div>
                <v-img
                  class="zoom-image"
                  src="@/assets/images/blog_post/image_2020_11_19T10_02_58_740Z.png"
                ></v-img>
              </div>
              <p class="date-post">OCT 12th 2020</p>
              <p class="title-post">
                The Different Types of Inventory and How to Manage Each One
              </p>
              <v-btn
                text
                class="link-post"
                style="font-size: 18px !important"
                to="/blog/the-different-types-of-inventory-and-how-to-manage-each-one.html"
              >
                Read More >
              </v-btn>
              <v-divider />
            </v-card>
          </v-col>
          <v-col xs="12" sm="6" md="4" class="pt-0">
            <v-card flat style="background-color: #f5f5f5">
              <div class="img-hover-zoom">
                <div class="middle">
                  <p style="color: white; font-size: 20px">Read More</p>
                </div>
                <v-img
                  class="zoom-image"
                  src="@/assets/images/blog_post/hospital_inventory_managment.png"
                ></v-img>
              </div>
              <p class="date-post">SEPT 15th 2020</p>
              <p class="title-post">
                Create An Inventory Management Software For Your Hospital with
                iBuildApp
              </p>
              <v-btn
                text
                class="link-post"
                style="font-size: 18px !important"
                to="/blog/create-an-inventory-management-software-for-your-hospital-with-ibuildapp.html"
              >
                Read More >
              </v-btn>
              <v-divider />
            </v-card>
          </v-col>
          <v-col xs="12" sm="6" md="4" class="pt-0">
            <v-card flat style="background-color: #f5f5f5">
              <div class="img-hover-zoom">
                <div class="middle">
                  <p style="color: white; font-size: 20px">Read More</p>
                </div>
                <v-img
                  class="zoom-image"
                  src="@/assets/images/blog_post/story_ser_27.jpg"
                ></v-img>
              </div>
              <p class="date-post">AUG 23th 2020</p>
              <p class="title-post">
                How your Business can Benefit from an Inventory Management
                Software
              </p>
              <v-btn
                text
                class="link-post"
                style="font-size: 18px !important"
                to="/blog/how-your-business-can-benefit-from-an-inventory-management-software.html"
              >
                Read More >
              </v-btn>
              <v-divider />
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>
<script>
import Slider from '@/views/blog/Slider'
export default {
  name: 'App',
  components: {
    Slider
  },
  data: function () {
    return {}
  },
  methods: {
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
.date-post {
  margin-top: 16px;
  font-size: 14px;
  color: #2a2939;
}
.title-post {
  font-size: 20px;
  font-weight: 400;
  font-family: 'Poppins', sans-serif;
  min-height: 80px;
  margin-bottom: 20px;
  line-height: 1.6;
}
.link-post {
  font-size: 18px;
  text-transform: capitalize;
  color: #2a2939;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
}
.theme--light.v-divider {
  border-color: black !important;
}
.img-hover-zoom {
  overflow: hidden;
}
.zoom-image {
  transition: transform 0.5s ease;
}
.img-hover-zoom {
  &:hover {
    background-color: #0d88e2;
    .zoom-image {
      opacity: 0.5;
      transform: scale(1.2);
    }
    .middle {
      opacity: 0.8;
    }
  }
}
.middle {
  transition: 0.5s ease;
  opacity: 0;
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
@media (min-width: 1370px) {
  .container {
    width: 1370px;
  }
}
</style>

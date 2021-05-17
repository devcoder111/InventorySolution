<template>
  <v-container>
    <v-row>
      <v-carousel v-model="model" :show-arrows="false" :hide-delimiters="true">
        <v-carousel-item v-for="(slide, index) in slides" :key="index">
          <v-row>
            <v-col cols="4" class="pr-0">
              <v-card flat style="background-color: white; color: black">
                <p class="slider-text">
                  {{ slide.text }}
                </p>
                <router-link :to="slide.link" style="text-decoration: none;"><p class="slider-link mt-8">read more ></p></router-link>
              </v-card>
            </v-col>
            <v-col cols="8" class="pl-0">
              <v-img :src="slide.image"></v-img>
            </v-col>
          </v-row>
        </v-carousel-item>
      </v-carousel>
    </v-row>
    <v-row>
      <v-icon @click="previousSlide">mdi-arrow-left</v-icon>
      <span class="slide-indicator px-4">{{ model + 1 }} / 4</span>
      <v-icon @click="nextSlide">mdi-arrow-right</v-icon>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'App',
  data: function () {
    return {
      model: 0,
      slides: [
        {
          text:
            'How your Business can Benefit from an Inventory Management Software',
          image: require('@/assets/images/blog_slider/iStock-1085831886.jpg'),
          link: '/blog/1'
        },
        {
          text:
            'Create An Inventory Management Software For Your Hospital with iBuildApp',
          image: require('@/assets/images/blog_slider/iStock-1126458618.jpg'),
          link: '/blog/2'
        },
        {
          text: 'The Different Types of Inventory and How to Manage Each One',
          image: require('@/assets/images/blog_slider/iStock-1198941896.jpg'),
          link: '/blog/3'
        },
        {
          text:
            'The Best Inventory Management Software for Simplicity and Peace of Mind',
          image: require('@/assets/images/blog_slider/iStock-480425860.jpg'),
          link: '/blog/4'
        }
      ]
    }
  },
  mounted() {
    setInterval(this.nextSlide, 5000)
  },
  methods: {
    nextSlide() {
      if (this.model < 4) {
        this.model++
      } else {
        this.model = 0
      }
    },
    previousSlide() {
      if (this.model > 0) {
        this.model--
      } else {
        this.model = 4
      }
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
.slider-text {
  font-size: 42px;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
  text-overflow: ellipsis;
  &:hover {
    color: rgba(82, 79, 117, 1);
  }
}
.slide-indicator {
  font-family: 'Poppins', sans-serif;
  font-style: italic;
}
.slider-link {
  font-size: 20px;
  color: rgba(119, 114, 181, 1);
}
</style>

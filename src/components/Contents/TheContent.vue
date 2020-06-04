<template>
  <div class="main">
    <section class="content">
      <div class="body">
        <h2>{{ content.title }}</h2>
        <div class="virtical-line"></div>
        <div class="body-main">
          <TheWork v-if="content.name === menu[1].name" />
          <TheProfile v-if="content.name === menu[2].name" />
          <TheBlog v-if="content.name === menu[3].name" />
        </div>
      </div>
    </section>
    <font-awesome-icon
      ref="up"
      data-lax-preset="blurIn"
      :icon="['fas', 'chevron-circle-up']"
      @click="scrollTop"
    />
    <TheFooter />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import TheWork from '@/components/Contents/TheWork.vue'
import TheProfile from '@/components/Contents/TheProfile.vue'
import TheBlog from '@/components/Contents/TheBlog.vue'
import TheFooter from '@/components/Navigation/TheFooter.vue'
import { Content } from '@/types/content'
const lax = require('lax.js')

@Component({ components: { TheWork, TheProfile, TheBlog, TheFooter } })
export default class TheContent extends Vue {
  @Prop(Array) menu!: Content[]
  @Prop(Object) content!: Content
  showIcon = false

  mounted() {
    lax.addElement(this.$refs.up)
  }

  created() {
    lax.setup()

    document.addEventListener(
      'scroll',
      () => {
        lax.update(window.scrollY)
      },
      false
    )
  }

  scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
</script>

<style lang="scss" scoped>
.main {
  .content {
    display: flex;
    justify-content: center;
    margin-right: $width-side;
    .body {
      width: $width-main;
      h2 {
        margin: {
          top: 200px;
          bottom: 60px;
        }
        font-size: 72px;
        &::first-letter {
          color: $color-font-sub;
        }
      }
      .virtical-line {
        margin: {
          left: 50px;
        }
        width: 0.5px;
        height: 50px;
        background-color: $color-bar;
      }
      &-main {
        margin-top: 150px;
      }
    }
    @include media(m) {
      margin-right: 0;
      text-align: left;
      .body {
        width: $width-mobile-main;
        h2 {
          margin: {
            top: 140px;
            bottom: 20px;
          }
          font-size: 45px;
        }
        .virtical-line {
          height: 25px;
          margin-left: 90px;
        }
        &-main {
          margin-top: 40px;
        }
      }
    }
  }
  .fa-chevron-circle-up {
    position: fixed;
    right: $width-side;
    bottom: $height-footer + 30px;
    font-size: 30px;
    margin-right: 20px;
  }

  @include media(m) {
    .fa-chevron-circle-up {
      right: 0px;
    }
  }
}
</style>

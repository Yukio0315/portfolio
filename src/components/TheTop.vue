<template>
  <section class="top">
    <h3>DEVELOPER</h3>
    <h2>{{ title }}</h2>
    <div class="cursor"></div>
    <div class="rectangle"></div>
  </section>
</template>

<script lang="ts">
import { Component, Prop, mixins } from 'nuxt-property-decorator'
import anime from 'animejs'
import { Content } from '@/types/content'
import Mixin from '@/mixins/Mixin'

@Component
export default class TheTop extends mixins(Mixin) {
  @Prop(Object) content!: Content
  title = ''

  async mounted() {
    this.showCursor()
    await this.delay(3000)
    this.moveCursor()
    await this.showTitle()
    this.removeCursor()
    this.showRectangle()
    this.showSubtitle()
  }

  showCursor(): anime.AnimeInstance {
    return anime({
      targets: '.cursor',
      keyframes: [
        { opacity: 1 },
        { opacity: 0 },
        { opacity: 1 },
        { opacity: 0 },
        { opacity: 1 },
        { opacity: 0 },
        { opacity: 1 }
      ],
      duration: 3000,
      delay: 200
    })
  }

  moveCursor(): anime.AnimeInstance {
    return anime({
      targets: '.cursor',
      translateX: 350,
      easing: 'steps(10)'
    })
  }

  removeCursor(): anime.AnimeInstance {
    return anime({
      targets: '.cursor',
      opacity: 0
    })
  }

  showRectangle(): anime.AnimeInstance {
    return anime({
      targets: '.rectangle',
      keyframes: [
        { opacity: 1, width: 250 },
        { translateX: 250, width: 0 }
      ],
      dulation: 3000,
      delay: 500,
      easing: 'linear'
    })
  }

  removeRectangle(): anime.AnimeInstance {
    return anime({
      targets: '.rectangle',
      width: 0,
      dulation: 2000,
      delay: 6000,
      transitionX: 250,
      easing: 'linear'
    })
  }

  showSubtitle(): anime.AnimeInstance {
    return anime({
      targets: 'h3',
      opacity: 1,
      delay: 1000
    })
  }

  async showTitle() {
    for (let i = 0; i < this.content.title.length; i++) {
      this.title += this.content.title[i]
      await this.delay(100)
    }
  }
}
</script>

<style lang="scss" scoped>
.top {
  display: grid;
  grid-template-rows: 1fr 50px 100px 1fr;
  height: 100vh;
  margin-left: 10%;
  h3 {
    grid-row: 2 / 3;
    font-size: 30px;
    letter-spacing: 0.2em;
    opacity: 0;
  }
  h2 {
    margin-top: 50px;
    grid-row: 3 / 4;
    font-size: 40px;
    letter-spacing: 0.2em;
  }
  .cursor {
    width: 3px;
    height: 35px;
    background-color: $color-font;
    top: 50%;
    margin-top: 30px;
    position: absolute;
  }
  .rectangle {
    width: 3px;
    height: 24px;
    background-color: $color-font;
    top: 50%;
    margin-top: -41px;
    position: absolute;
    opacity: 0;
  }
  @include media(m) {
    $title-width: 358.4px;
    margin-left: 0;
    h3 {
      text-align: center;
    }
    h2 {
      width: $title-width;
      text-align: left;
      margin: 50px auto 0px auto;
    }
    .cursor {
      position: absolute;
      margin-left: calc((100% - 358.4px) / 2);
    }
    .rectangle {
      margin-left: 50%;
      left: -130px;
    }
  }
}
</style>

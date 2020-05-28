<template>
  <section class="content">
    <div class="content-body">
      <h2>{{ content.title }}</h2>
      <div class="content-body-virtical-line"></div>
      <div class="content-body-main">
        <TheWork v-if="content.name === menu[1].name" />
        <TheProfile v-if="content.name === menu[2].name" />
        <TheBlog v-if="content.name === menu[3].name" />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import TheWork from '@/components/Contents/TheWork.vue'
import TheProfile from '@/components/Contents/TheProfile.vue'
import TheBlog from '@/components/Contents/TheBlog.vue'
import { Content } from '@/types/content'

@Component({ components: { TheWork, TheProfile, TheBlog } })
export default class TheContent extends Vue {
  @Prop(Array) menu!: Content[]
  @Prop(Object) content!: Content
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  justify-content: center;
  &-body {
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
    &-virtical-line {
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
}
</style>

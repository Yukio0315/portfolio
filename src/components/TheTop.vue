<template>
  <section class="top">
    <h3>DEVELOPER</h3>
    <h2>{{ content.title }}</h2>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { Content } from '@/types/content'

@Component({})
export default class TheTop extends Vue {
  @Prop(Object) content!: Content
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
  }
  h2 {
    margin-top: 50px;
    grid-row: 3 / 4;
    font-size: 40px;
    letter-spacing: 0.2em;
  }
}
</style>

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
  h3 {
  }
}
</style>

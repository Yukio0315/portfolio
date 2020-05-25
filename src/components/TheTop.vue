<template>
  <section class="top">
    <h3>DEVELOPER</h3>
    <h2>Yukio Ueda</h2>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component({})
export default class TheTop extends Vue {}
</script>

<style lang="scss" scoped>
.top {
  display: grid;
  h3 {
  }
}
</style>

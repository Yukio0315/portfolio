<template>
  <footer class="footer">
    <hr />
    <div class="copyRight">&copy;2020 All Right Reserved</div>
  </footer>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
@Component({})
export default class Footer extends Vue {}
</script>

<style lang="scss" scoped>
.footer {
  hr {
    border: 0.01px solid $color-bar;
  }
  .copyRight {
    height: $height-footer;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: {
      right: $width-side;
    }
    font-size: 15px;
    color: $color-bar;
  }
}
</style>

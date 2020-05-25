<template>
  <main class="main">
    <TheSideMenu :menu="menu" @choose-menu="chooseMenu" />
    <TheTop v-if="now === menu[0].name" :content="chosenContent" />
    <TheContent v-else :content="chosenContent" :menu="menu" />
  </main>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import TheTop from '@/components/TheTop.vue'
import TheContent from '@/components/Contents/TheContent.vue'
import TheSideMenu from '@/components/Navigation/TheSideMenu.vue'

@Component({
  components: { TheTop, TheSideMenu, TheContent }
})
export default class MyPage extends Vue {
  menu = [
    { id: 1, name: 'HOME', title: 'Yukio Ueda' },
    { id: 2, name: 'WORK', title: 'Works' },
    { id: 3, name: 'PROFILE', title: 'Who I am' },
    { id: 4, name: 'BLOG', title: 'Tech Blog' }
  ]

  now = this.menu[0].name

  get chosenContent() {
    return this.menu.find((item) => item.name === this.now)
  }

  chooseMenu(item: string) {
    this.now = item
  }
}
</script>

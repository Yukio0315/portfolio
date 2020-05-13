<template>
  <main class="main">
    <TheTop v-if="isNow === menu[0].name" />
    <TheWork v-if="isNow === menu[1].name" />
    <TheProfile v-if="isNow === menu[2].name" />
    <TheBlog v-if="isNow === menu[3].name" />
    <TheSideMenu :menu="menu" @choose-menu="chooseMenu" />
  </main>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import TheTop from '@/components/TheTop.vue'
import TheWork from '@/components/TheWork.vue'
import TheProfile from '@/components/TheProfile.vue'
import TheBlog from '@/components/TheBlog.vue'
import TheSideMenu from '@/components/Navigation/TheSideMenu.vue'

@Component({
  components: { TheTop, TheSideMenu, TheWork, TheProfile, TheBlog }
})
export default class MyPage extends Vue {
  menu = [
    { id: 1, name: 'HOME' },
    { id: 2, name: 'WORK' },
    { id: 3, name: 'PROFILE' },
    { id: 4, name: 'BLOG' }
  ]

  isNow = this.menu[0].name

  chooseMenu(item: string) {
    this.isNow = item
  }
}
</script>

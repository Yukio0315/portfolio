<template>
  <main class="main">
    <TheSideMenu :menu="menu" @choose-menu="chooseMenu" />
    <TheTop v-if="now === menu[0].name" />
    <TheWork v-if="now === menu[1].name" :works="works" />
    <TheProfile v-if="now === menu[2].name" :profile="profile" />
    <TheBlog v-if="now === menu[3].name" :blogs="blogs" />
  </main>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import TheTop from '@/components/TheTop.vue'
import TheWork from '@/components/TheWork.vue'
import TheProfile from '@/components/TheProfile.vue'
import TheBlog from '@/components/TheBlog.vue'
import TheSideMenu from '@/components/Navigation/TheSideMenu.vue'
import { Work } from '@/types/work'
import { Profile } from '@/types/profile'
import { Blog } from '@/types/blog'

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

  now = this.menu[0].name
  works: Work[] = []
  profile = {} as Profile
  blogs: Blog[] = []

  created() {
    this.profile = JSON.parse(require('@/static/data/profile.json'))
    this.works = JSON.parse(require('../static/data/works.json'))
    this.blogs = JSON.parse(require('@/static/data/blogs.json'))
  }

  chooseMenu(item: string) {
    this.now = item
  }
}
</script>

<template>
  <nav @mouseover="toggleMenu" @mouseleave="toggleMenu">
    <font-awesome-icon v-if="isClose" icon="bars" />
    <ul v-else>
      <li v-for="item in menu" :key="item.id" @click="chooseMenu(item.name)">
        {{ item.name }}
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'nuxt-property-decorator'

type Menu = [
  {
    id: number
    name: string
  }
]

@Component({})
export default class TheSideMenu extends Vue {
  @Prop(Array) menu!: Menu
  isClose = true
  toggleMenu() {
    this.isClose = !this.isClose
  }

  @Emit()
  chooseMenu(name: string) {
    return name
  }
}
</script>

<template>
  <nav class="nav" @mouseover="openMenu" @mouseleave="closeMenu">
    <font-awesome-icon
      v-if="isClose"
      class="nav-icon"
      icon="bars"
      @click="openMenu"
    />
    <div v-else>
      <ul class="nav-list">
        <li v-for="item in menu" :key="item.id" @click="chooseMenu(item.name)">
          {{ item.name }}
        </li>
      </ul>
      <font-awesome-icon class="nav-icon" icon="times" @click="closeMenu" />
    </div>
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

  closeMenu() {
    this.isClose = true
  }

  openMenu() {
    this.isClose = false
  }

  @Emit()
  chooseMenu(name: string) {
    this.closeMenu()
    return name
  }
}
</script>

<style lang="scss" scoped>
.nav {
  $block: &;
  $icon-size: 15%;
  display: grid;
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  color: $color-main;
  background-color: $color-font;
  width: 10%;
  &-icon {
    height: 100%;
    width: $icon-size;
    margin: {
      left: (100%-$icon-size)/2;
      right: (100%-$icon-size)/2;
    }
  }
  &:hover {
    width: 30%;
    #{$block}-icon {
      color: red;
    }
  }
}
</style>

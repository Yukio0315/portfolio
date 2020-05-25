<template>
  <nav class="menu" @mouseover="openMenu" @mouseleave="closeMenu">
    <div class="menu-bar">
      <font-awesome-icon
        class="menu-bar-icon"
        :icon="isClose ? 'bars' : 'times'"
        @click="closeMenu"
      />
    </div>
    <div v-if="!isClose" class="menu-open">
      <ul class="menu-open-list">
        <li v-for="item in menu" :key="item.id" @click="chooseMenu(item.name)">
          {{ item.name }}
        </li>
      </ul>
      <a :href="`mailto:${email}`"
        ><font-awesome-icon
          class="menu-open-envelope"
          :icon="['far', 'envelope']"
      /></a>
      <a :href="github"
        ><font-awesome-icon class="menu-open-github" :icon="['fab', 'github']"
      /></a>
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
  github = process.env.GITHUB
  email = process.env.EMAIL

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
.menu {
  display: flex;
  flex-direction: row-reverse;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  color: $color-main;
  background-color: $color-font;
  &-list {
    width: 300px;
  }
  &-bar {
    $block: &;
    $icon-size: 15%;
    width: 200px;
    &-icon {
      height: 100%;
      width: $icon-size;
      margin: {
        left: (100%-$icon-size)/2;
        right: (100%-$icon-size)/2;
      }
    }
  }
}
</style>

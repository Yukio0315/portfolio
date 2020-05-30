<template>
  <nav class="menu" @mouseover="openMenu" @mouseleave="closeMenu">
    <div class="menu-bar">
      <font-awesome-icon
        class="menu-bar-icon"
        :icon="isClose ? 'bars' : 'times'"
        @click="toggleMenu"
      />
    </div>
    <div v-if="!isClose" class="menu-open">
      <ul class="menu-open-list">
        <li v-for="item in menu" :key="item.id" @click="chooseMenu(item.name)">
          {{ item.name }}
        </li>
      </ul>
      <div class="menu-open-icon">
        <a :href="`mailto:${email}`"
          ><font-awesome-icon
            class="menu-open-icon-envelope"
            :icon="['far', 'envelope']"
        /></a>
        <a :href="github"
          ><font-awesome-icon
            class="menu-open-icon-github"
            :icon="['fab', 'github']"
        /></a>
      </div>
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

  toggleMenu() {
    this.isClose = !this.isClose
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
  position: fixed;
  top: 0;
  right: 0;
  color: $color-main;
  background-color: $color-font;
  &-open {
    display: grid;
    grid-template-rows: 80% 20%;
    width: $width-side-open;
    margin: {
      top: 40%;
      left: 50px;
    }
    &-list {
      grid-row: 1 / 2;
      font-size: 26px;
      list-style-type: none;
      align-self: center;
      li {
        margin-top: 40px;
        cursor: pointer;
      }
    }
    &-icon {
      grid-row: 2 / 3;
      width: 200%;
      &-envelope,
      &-github {
        margin-left: 40px;
        font-size: 40px;
        color: $color-main;
      }
    }
  }
  &-bar {
    display: flex;
    $icon-size: 15%;
    width: $width-side;
    justify-content: center;
    &-icon {
      height: 100%;
      width: $icon-size;
      cursor: pointer;
    }
  }
}
</style>

<template>
  <nav class="menu" @mouseover="openMenu" @mouseleave="closeMenu">
    <div class="bar">
      <font-awesome-icon
        class="icon"
        :icon="isClose ? 'bars' : 'times'"
        @click="toggleMenu"
      />
    </div>
    <div class="menu__open">
      <ul v-show="!isClose" class="list">
        <li v-for="item in menu" :key="item.id" @click="chooseMenu(item.name)">
          {{ item.name }}
        </li>
      </ul>
      <div v-show="!isClose">
        <div class="social-icons">
          <a :href="`mailto:${email}`"
            ><font-awesome-icon class="envelope" :icon="['far', 'envelope']"
          /></a>
          <a :href="github"
            ><font-awesome-icon class="github" :icon="['fab', 'github']"
          /></a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'nuxt-property-decorator'
import anime from 'animejs'

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
    this.fadeMenu()
    this.hideItem('.list')
    this.hideItem('.social-icons')
  }

  openMenu() {
    this.isClose = false
    this.drawMenu()
    this.showItem('.list')
    this.showItem('.social-icons')
  }

  toggleMenu() {
    this.isClose = !this.isClose
    if (this.isClose) this.fadeMenu()
    else this.openMenu()
  }

  drawMenu() {
    anime({
      targets: '.menu__open',
      width: '150px',
      duration: 500,
      easing: 'easeInOutExpo'
    })
  }

  fadeMenu() {
    anime({
      targets: '.menu__open',
      width: '0px',
      duration: 500,
      easing: 'easeInOutExpo'
    })
  }

  showItem(targets: string) {
    anime({
      targets,
      opacity: 1,
      duration: 500,
      delay: 500
    })
  }

  hideItem(targets: string) {
    anime({
      targets,
      opacity: 0
    })
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
  .bar {
    display: flex;
    $icon-size: 15%;
    width: $width-side;
    justify-content: center;
    .icon {
      height: 100%;
      width: $icon-size;
      cursor: pointer;
    }
  }
  &__open {
    display: grid;
    grid-template-rows: 80% 20%;
    width: 0;
    .list {
      grid-row: 1 / 2;
      font-size: 26px;
      list-style-type: none;
      align-self: center;
      opacity: 0;
      li {
        margin-top: 40px;
        cursor: pointer;
      }
    }
    .social-icons {
      grid-row: 2 / 3;
      width: 200%;
      opacity: 0;
      .envelope,
      .github {
        margin-left: 40px;
        font-size: 40px;
        color: $color-main;
      }
    }
  }
}
</style>

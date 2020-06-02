<template src="./template.html" />

<script lang="ts">
import { Component, Prop, Emit, mixins } from 'nuxt-property-decorator'
import anime from 'animejs'
import Mixin from '@/mixins/Mixin'

type Menu = [
  {
    id: number
    name: string
  }
]

@Component
export default class TheSideMenu extends mixins(Mixin) {
  @Prop(Array) menu!: Menu
  isClose = true
  isMouseOver = false
  isToggling = false
  isMobile = false
  github = process.env.GITHUB
  email = process.env.EMAIL

  mounted() {
    this.isMobile = window.innerWidth <= 1024
    window.addEventListener('resize', this.handleResize)
  }

  destroyed() {
    window.addEventListener('resize', this.handleResize)
  }

  handleResize() {
    this.isMobile = window.innerWidth <= 1024
  }

  async closeMenu() {
    if (!this.isToggling) {
      this.closeAnime()
      await this.delay(300)
      this.isClose = true
      this.isMouseOver = false
    } else {
      this.isMouseOver = false
    }
  }

  openMenu() {
    if (!this.isMouseOver) {
      this.isMouseOver = true
      this.isClose = false
      this.openAnime()
    }
  }

  async toggleMenu() {
    if (this.isClose) {
      this.isMouseOver = false
      this.openAnime()
      this.isClose = false
    } else {
      this.isMouseOver = true
      this.closeAnime()
      this.isToggling = true
      await this.delay(300)
      this.isClose = true
      this.isToggling = false
    }
  }

  openAnime() {
    this.isMobile ? this.drawMenuAnimeMobile() : this.drawMenuAnimePC()
    this.showItem('.list')
    this.showItem('.social-icons')
  }

  closeAnime() {
    this.hideItem('.list')
    this.hideItem('.social-icons')
    this.isMobile ? this.fadeMenuAnimeMobile() : this.fadeMenuAnimePC()
  }

  drawMenuAnimePC() {
    anime({
      targets: '.menu__open',
      width: 150,
      duration: 500,
      easing: 'easeInOutQuad'
    })
  }

  fadeMenuAnimePC() {
    anime({
      targets: '.menu__open',
      width: 0,
      duration: 200,
      easing: 'easeInOutQuad'
    })
  }

  drawMenuAnimeMobile() {
    anime({
      targets: '.menu__open',
      height: 500,
      duration: 500,
      easing: 'easeInOutQuad'
    })
  }

  fadeMenuAnimeMobile() {
    anime({
      targets: '.menu__open',
      height: 0,
      duration: 200,
      easing: 'easeInOutQuad'
    })
  }

  showItem(targets: string) {
    anime({
      targets,
      opacity: 1,
      duration: 500,
      delay: 400
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
    return name
  }
}
</script>

<style src="./style.scss" lang="scss" scoped />

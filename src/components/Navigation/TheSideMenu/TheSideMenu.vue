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

@Component({})
export default class TheSideMenu extends mixins(Mixin) {
  @Prop(Array) menu!: Menu
  isClose = true
  isMouseOver = false
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
    this.closeDrawer()
    await this.delay(500)
    this.isClose = true
    this.isMouseOver = false
  }

  openMenu() {
    if (!this.isMouseOver) {
      this.isMouseOver = true
      this.isClose = false
      this.openDrawer()
    }
  }

  toggleMenu() {
    if (this.isClose) {
      this.isMouseOver = false
      this.openMenu()
    } else {
      this.closeMenu()
      this.isMouseOver = true
    }
  }

  openDrawer() {
    this.isMobile ? this.drawMenuMobile() : this.drawMenuPC()
    this.showItem('.list')
    this.showItem('.social-icons')
  }

  closeDrawer() {
    this.hideItem('.list')
    this.hideItem('.social-icons')
    this.isMobile ? this.fadeMenuMobile() : this.fadeMenuPC()
  }

  drawMenuPC() {
    anime({
      targets: '.menu__open',
      width: 150,
      duration: 500,
      easing: 'easeInOutQuad'
    })
  }

  fadeMenuPC() {
    anime({
      targets: '.menu__open',
      width: 0,
      duration: 200,
      easing: 'easeInOutQuad'
    })
  }

  drawMenuMobile() {
    anime({
      targets: '.menu__open',
      height: 500,
      duration: 500,
      easing: 'easeInOutQuad'
    })
  }

  fadeMenuMobile() {
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
    this.isClose = true
    this.isMouseOver = false
    return name
  }
}
</script>

<style src="./style.scss" lang="scss" scoped />

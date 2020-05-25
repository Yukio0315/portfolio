<template>
  <section class="content">
    <h2>{{ content.title }}</h2>
    <TheWork v-if="content.name === menu[1].name" />
    <TheProfile v-if="content.name === menu[2].name" />
    <TheBlog v-if="content.name === menu[3].name" />
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import TheWork from '@/components/Contents/TheWork.vue'
import TheProfile from '@/components/Contents/TheProfile.vue'
import TheBlog from '@/components/Contents/TheBlog.vue'
import { Content } from '@/types/content'

@Component({ components: { TheWork, TheProfile, TheBlog } })
export default class TheContent extends Vue {
  @Prop(Array) menu!: Content[]
  @Prop(Object) content!: Content
}
</script>

<style lang="scss" scoped>
.content {
  display: grid;
}
</style>

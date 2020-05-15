<template>
  <section>
    <h2>Works</h2>
    <Project v-for="work in works" :key="work.id" :work="work" />
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { Work } from '@/types/work'
import Project from '@/components/Project.vue'

@Component({ components: { Project } })
export default class TheWork extends Vue {
  @Prop(Array) works!: Work[]
}
</script>

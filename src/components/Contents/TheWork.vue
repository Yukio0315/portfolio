<template>
  <section>
    <Project v-for="work in works" :key="work.id" :work="work" />
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Work } from '@/types/work'
import Project from '@/components/Contents/Project.vue'

@Component({ components: { Project } })
export default class TheWork extends Vue {
  works: Work[] = []

  created() {
    this.works = JSON.parse(require('@/static/data/works.json'))
  }
}
</script>

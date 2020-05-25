<template>
  <section>
    <article v-for="work in works" :key="work.id">
      <h3>{{ work.title }}</h3>
      <h4>{{ work.definitions }}</h4>
      <p>{{ work.body }}</p>
      <img :src="work.image" />
      <ul v-for="tech in work.technologies" :key="tech">
        <li>{{ tech }}</li>
      </ul>
      <p>{{ work.created }}</p>
      <a :href="work.github">Github</a>
      <p>{{ `${work.period} ${work.unit}` }}</p>
      <a v-if="work.url" :href="work.url">View Website</a>
    </article>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Work } from '@/types/work'

@Component({})
export default class TheWork extends Vue {
  works: Work[] = []

  created() {
    this.works = JSON.parse(require('@/static/data/works.json'))
  }
}
</script>

<template>
  <section>
    <article v-for="post in blogs" :key="post.title">
      <a :href="post.url">
        <img :src="post.image" />
        <h3>{{ post.title }}</h3>
        <p>{{ post.pubDate }}</p>
      </a>
    </article>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Blog } from '@/types/blog'

@Component({})
export default class TheBlog extends Vue {
  blogs: Blog[] = []
  created() {
    this.blogs = JSON.parse(require('@/static/data/blogs.json'))
  }
}
</script>

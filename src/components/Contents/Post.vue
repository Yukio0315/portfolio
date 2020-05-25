<template>
  <section>
    <a :href="post.url">
      <img :src="post.image" />
      <h3>{{ post.title }}</h3>
      <p>{{ post.pubDate }}</p>
    </a>
  </section>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'nuxt-property-decorator'
import { Blog } from '@/types/blog'

@Component({})
export default class Post extends Vue {
  @Prop(Object) post!: Blog
}
</script>

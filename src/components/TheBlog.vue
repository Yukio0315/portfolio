<template>
  <section>
    <h2>Tech Blog</h2>
    <Post v-for="post in blogs" :key="post.title" :post="post" />
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { Blog } from '../types/blog'
import Post from '@/components/Post.vue'

@Component({ components: { Post } })
export default class TheBlog extends Vue {
  @Prop(Array) blogs!: Blog
}
</script>

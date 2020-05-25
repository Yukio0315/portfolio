<template>
  <section>
    <Post v-for="post in blogs" :key="post.title" :post="post" />
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Blog } from '@/types/blog'
import Post from '@/components/Contents/Post.vue'

@Component({ components: { Post } })
export default class TheBlog extends Vue {
  blogs: Blog[] = []
  created() {
    this.blogs = JSON.parse(require('@/static/data/blogs.json'))
  }
}
</script>

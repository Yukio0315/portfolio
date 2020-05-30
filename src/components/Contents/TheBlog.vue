<template>
  <section class="blogs">
    <article v-for="post in blogs" :key="post.title" class="blog">
      <a :href="post.url">
        <img :src="post.image" />
        <h3>{{ post.title }}</h3>
        <p class="date">{{ post.pubDate }}</p>
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

<style lang="scss" scoped>
.blogs {
  $blog-width: 250px;
  display: flex;
  justify-content: space-between;
  .blog {
    width: $blog-width;
    a {
      text-decoration: none;
      color: $color-font;
      &:hover {
        color: $color-font-sub;
      }
      img {
        width: $blog-width;
        height: 170px;
        object-fit: cover;
      }
      h3 {
        height: 70px;
      }
      .date {
        @include montserrat-medium(14px);
      }
    }
  }
}
</style>

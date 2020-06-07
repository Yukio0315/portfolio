<template>
  <section>
    <article v-for="work in works" :key="work.id" class="article">
      <div class="article-content">
        <h3>{{ work.title }}</h3>
        <h4>{{ work.definition }}</h4>
        <img class="image" :src="work.image" />
        <p>{{ work.body }}</p>
        <div class="article-content-footer">
          <hr />
          <ul class="tech">
            <li v-for="tech in work.technologies" :key="tech" class="tech-item">
              {{ tech }}
            </li>
          </ul>
          <time>{{
            `${formatDate(work.created)}  ${work.period}${work.unit}`
          }}</time>
          <p v-if="work.github">
            <a :href="work.github" class="github"
              ><font-awesome-icon :icon="['fab', 'github']" />Github</a
            >
          </p>
          <a v-if="work.url" :href="work.url">View Website</a>
        </div>
      </div>
    </article>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import moment from 'moment-mini'
import { Work } from '@/types/work'

@Component
export default class TheWork extends Vue {
  works: Work[] = []

  created() {
    this.works = JSON.parse(require('@/static/data/works.json'))
  }

  formatDate(date: string) {
    return moment(date).format('MMM, YYYY')
  }
}
</script>

<style lang="scss" scoped>
.article {
  $column-width: 400px;
  $column-space: $width-main - $column-width * 2;
  display: flex;
  align-content: center;
  margin-bottom: 130px;
  width: $width-main;
  .article-content {
    display: grid;
    grid-template-columns: $column-width $column-space $column-width;
    grid-template-rows: 70px 30px auto 200px;
    h3 {
      grid-row: 1 / 2;
      grid-column: 1 / 2;
      margin-top: 0px;
      color: $color-font-sub;
      @include montserrat-medium;
    }
    .image {
      grid-column: 3 / 4;
      width: $column-width;
    }
    p {
      grid-row: 3 / 4;
      line-height: 25px;
    }
    &-footer {
      grid-row: 4 / 5;
      hr {
        margin-bottom: 0px;
        border: 1px solid $color-bar;
      }
      .tech {
        display: flex;
        list-style-type: none;
        flex-wrap: wrap;
        padding-left: 0px;
        &-item {
          &:not(:first-child) {
            margin-left: 5px;
          }
          &:not(:last-child)::after {
            content: '/';
          }
        }
      }
      .github {
        margin-top: 10px;
        color: $color-font;
        text-decoration: none;
      }
    }
  }
  @include media(m) {
    width: $width-medium-main;
    .article-content {
      $column-width-medium: 290px;
      $column-width-medium-space: $width-medium-main - $column-width-medium * 2;
      grid-template-columns: $column-width-medium $column-width-medium-space $column-width-medium;
      .image {
        width: $column-width-medium;
      }
    }
  }
  @include media(s) {
    width: $width-mobile-main;
    margin: 0 auto;
    .article-content {
      display: inline;
      .image {
        width: $width-mobile-main;
      }
    }
  }
}
</style>

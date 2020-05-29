<template>
  <section>
    <article v-for="work in works" :key="work.id" class="article">
      <div class="content">
        <h3>{{ work.title }}</h3>
        <h4>{{ work.definitions }}</h4>
        <p>{{ work.body }}</p>
        <hr />
        <div class="footer">
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
      <img class="image" :src="work.image" />
    </article>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import moment from 'moment-mini'
import { Work } from '@/types/work'

@Component({})
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
  $column-width: 450px;
  display: grid;
  grid-template: 300px 400px / $column-width $column-width;
  margin-bottom: 130px;
  .content {
    grid-row: 1 / 2;
    grid-column: 1 / 2;
    margin-right: $width-main - $column-width * 2;
    h3 {
      margin-top: 0px;
      color: $color-font-sub;
      font: {
        family: 'Montserrat:500';
        weight: normal;
        size: 27px;
      }
    }
    p {
      line-height: 25px;
    }
    hr {
      margin-bottom: 0px;
    }
    .footer {
      grid-row: 2 / 3;
      grid-column: 1 / 2;
      .tech {
        display: flex;
        list-style-type: none;
        flex-wrap: wrap;
        justify-content: space-between;
        width: $column-width;
        padding-left: 0px;
        &-item {
          &:not(:last-child)::after {
            content: '/';
          }
        }
      }
      .github {
        color: $color-font;
        text-decoration: none;
      }
    }
  }
  .image {
    grid-row: 1 / 2;
    grid-column: 2 / 3;
    width: $column-width;
  }
}
</style>

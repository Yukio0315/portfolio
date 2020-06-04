<template>
  <section class="profile">
    <section class="overview">
      <h3>{{ profile.name }}</h3>
      <p>{{ profile.description }}</p>
      <table class="companies">
        <tr v-for="pro in profile.professional" :key="pro.id">
          <td>{{ `${pro.start} - ${pro.end}` }}</td>
          <td class="companies-name">{{ pro.company }}</td>
        </tr>
      </table>
    </section>

    <section class="skills">
      <h3>Skills</h3>
      <div class="images">
        <img
          v-for="skill in profile.skills"
          :key="skill.name"
          :src="skill.url"
        />
      </div>
    </section>
    <section class="account">
      <h3>Account</h3>
      <ul class="fa-ul">
        <li v-for="account in profile.accounts" :key="account.id" class="item">
          <span class="fa-li"
            ><font-awesome-icon :icon="['fas', 'chevron-right']"/></span
          ><a :href="account.url" class="name">{{ account.name }}</a>
        </li>
      </ul>
    </section>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Profile } from '@/types/profile'

@Component({})
export default class TheProfile extends Vue {
  profile = {} as Profile

  created() {
    this.profile = JSON.parse(require('@/static/data/profile.json'))
  }
}
</script>

<style lang="scss" scoped>
.profile {
  $spacer: 30px;
  $large-spacer: 60px;
  h3 {
    @include montserrat-medium;
    margin-bottom: 0px;
  }
  p {
    @include body-font;
    line-height: 1.7em;
    max-width: 640px;
  }
  .companies {
    @include body-font;
    margin-top: $spacer;
    border-spacing: 0px 20px;
    &-name {
      padding-left: $spacer;
    }
  }
  .skills {
    @include montserrat-medium;
    margin-top: $large-spacer;
    .images {
      text-align: center;
      background-color: $color-font;
      margin-top: $spacer;
      img {
        vertical-align: middle;
        margin: 10px;
        width: 80px;
      }
    }
  }
  .account {
    margin-top: $large-spacer;
    h3 {
      @include montserrat-medium;
    }
    .fa-ul {
      margin-left: 22px;
      .item {
        &:not(:first-child) {
          margin-top: 20px;
        }
        .fa-li {
          .fa-chevron-right {
            font-size: 10px;
            margin-bottom: 3px;
          }
        }
        .name {
          text-decoration: none;
          color: $color-font;
          @include body-font;
        }
      }
    }
  }
}
</style>

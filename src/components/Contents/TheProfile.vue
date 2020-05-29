<template>
  <section>
    <h3>{{ profile.name }}</h3>
    <p>{{ profile.description }}</p>
    <table>
      <tr v-for="pro in profile.professional" :key="pro.id">
        <td>{{ `${pro.start} - ${pro.end}` }}</td>
        <td>{{ pro.company }}</td>
      </tr>
    </table>

    <div class="skills">
      <img v-for="skill in profile.skills" :key="skill.name" :src="skill.url" />
    </div>
    <ul v-for="account in profile.accounts" :key="account.id">
      <li>
        <a :href="account.url">{{ account.name }}</a>
      </li>
    </ul>
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

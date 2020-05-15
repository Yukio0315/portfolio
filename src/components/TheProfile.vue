<template>
  <section>
    <h2>Who I am</h2>
    <p>|</p>
    <h3>{{ profile.name }}</h3>
    <p>{{ profile.description }}</p>
    <table>
      <tr v-for="pro in profile.professional" :key="pro.id">
        <td>{{ `${pro.start} - ${pro.end}` }}</td>
        <td>{{ pro.company }}</td>
      </tr>
    </table>

    <!-- <div v-for="skill in skills" :key="skill.name">
      <img :url="skill.url" />
    </div> -->

    <ul v-for="account in profile.accounts" :key="account.id">
      <li>
        <a :href="account.url">{{ account.name }}</a>
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { Profile } from '@/types/profile'

@Component({})
export default class TheProfile extends Vue {
  @Prop(Object) profile!: Profile
}
</script>

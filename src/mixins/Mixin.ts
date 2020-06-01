import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class Mixin extends Vue {
  public delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
}

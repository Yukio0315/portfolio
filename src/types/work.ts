export type Work = {
  id: string
  title: string
  definition: string
  image: string
  body: string
  technologies: string[]
  created: string
  url: string
  github: string[]
  period: string
  unit: 'day' | 'month' | 'year'
}

export interface Url {
  'en-US': string
}

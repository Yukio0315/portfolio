export type Work = {
  id: string
  title: string
  definitions: string
  image: string
  body: string
  technologies: string[]
  created: string
  url?: string
  github: string[]
  period: string
  unit: 'day' | 'month' | 'year'
}

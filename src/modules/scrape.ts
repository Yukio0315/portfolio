import fs from 'fs-extra'
import axios from 'axios'
import moment from 'moment-mini'
import { Module } from '@nuxt/types'
import isObject from 'lodash/isObject'
import { createClient } from 'contentful-management'
import { Work, Url } from '@/types/work'
import { Blog, PostFeed } from '@/types/blog'
import { Profile, Asset } from '@/types/profile'

const writeData = async (path: string, content: string) => {
  await fs.ensureFile(path)
  await fs.writeJson(path, content)
}

const getContentfulEnvironment = async () => {
  const client = createClient({
    accessToken: process.env.CTF_CDA_ACCESS_TOKEN
  })
  const space = await client.getSpace(process.env.CTF_SPACE_ID)
  return space.getEnvironment(process.env.CTF_ENVIRONMENT)
}

const fetchWorks = async (): Promise<Work[]> => {
  const environment = await getContentfulEnvironment()
  const worksEntries = await environment.getEntries({ content_type: 'works' })
  const works: Work[] = []
  worksEntries.items
    .sort((a, b) =>
      moment(b.fields.created['en-US']).diff(moment(a.fields.created['en-US']))
    )
    .forEach(async (entry) => {
      const asset = await environment.getAsset(
        entry.fields.image['en-US'].sys.id
      )

      const url: Url = isObject(entry.fields.url)
        ? (entry.fields.url as Url)
        : { 'en-US': '' }

      works.push({
        id: entry.sys.id,
        title: entry.fields.title['en-US'],
        definition: entry.fields.definition['en-US'],
        image: asset.fields.file['en-US'].url!,
        body: entry.fields.body['en-US'],
        technologies: entry.fields.technologies['en-US'],
        created: entry.fields.created['en-US'],
        url: url['en-US']!,
        github: entry.fields.github['en-US'],
        period: entry.fields.period['en-US'],
        unit: entry.fields.unit['en-US']
      })
    })

  return works
}

const fetchProfile = async (): Promise<Profile> => {
  const environment = await getContentfulEnvironment()
  const profileEntry = await environment.getEntry(
    process.env.CTF_PROFILE_ENTRY_ID
  )

  const profile: Profile = {
    name: profileEntry.fields.name['en-US'],
    description: profileEntry.fields.description['en-US'],
    professional: profileEntry.fields.professional['en-US'],
    skills: profileEntry.fields.skills['en-US'].map(async (skill: Asset) => {
      const photo = await environment.getAsset(skill.sys.id)

      return {
        name: photo.fields.title['en-US'],
        url: photo.fields.file['en-US'].url!
      }
    }),
    accounts: profileEntry.fields.accounts['en-US']
  }

  return profile
}

const fetchMedium = async (): Promise<Blog[]> => {
  const postsFeed = await axios.get(process.env.BLOG_URL)
  const posts: Blog[] = []
  postsFeed.data.items
    .sort((a: PostFeed, b: PostFeed) =>
      moment(b.pubDate).diff(moment(a.pubDate))
    )
    .forEach((item: PostFeed) => {
      posts.push({
        title: item.title,
        image: item.thumbnail,
        pubDate: moment(item.pubDate).format('YYYY-MM-DD'),
        url: item.link
      })
    })

  return posts
}

const scraper: Module = function() {
  this.nuxt.hook('build:before', async () => {
    await fs.emptyDir('../static/data')

    const scraper: Promise<void>[] = []

    const works = await fetchWorks()
    scraper.push(writeData('src/static/data/works.json', JSON.stringify(works)))

    const profile = await fetchProfile()
    scraper.push(
      writeData('src/static/data/profile.json', JSON.stringify(profile))
    )

    const posts = await fetchMedium()
    scraper.push(writeData('src/static/data/blogs.json', JSON.stringify(posts)))

    return Promise.all(scraper)
  })
}

export default scraper

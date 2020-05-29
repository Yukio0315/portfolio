import axios from 'axios'
import fs from 'fs-extra'
import moment from 'moment-mini'
import { createClient } from '../plugins/contentful'
import ctfConfig from '../lib/config'

export default function scraper() {
  const writeData = async (path, content) => {
    await fs.ensureFile(path)
    await fs.writeJson(path, content)
  }
  this.nuxt.hook('build:before', async () => {
    await fs.emptyDir('../static/data')

    const scraper = []

    const worksEntries = await createClient(ctfConfig).getEntries({
      content_type: ctfConfig.CTF_WORKS_TYPE_ID
    })
    const works = []
    worksEntries.items
      .sort((a, b) => moment(b.fields.created).diff(moment(a.fields.created)))
      .forEach((entry) => {
        works.push({
          id: entry.sys.id,
          title: entry.fields.title,
          definition: entry.fields.definition,
          image: entry.fields.image.fields.file.url,
          body: entry.fields.body,
          technologies: entry.fields.technologies,
          created: entry.fields.created,
          url: entry.fields.url,
          github: entry.fields.github,
          period: entry.fields.period,
          unit: entry.fields.unit
        })
      })
    scraper.push(writeData('src/static/data/works.json', JSON.stringify(works)))

    const profileEntry = await createClient(ctfConfig).getEntry(
      ctfConfig.CTF_PROFILE_ENTRY_ID
    )
    const profile = {
      name: profileEntry.fields.name,
      description: profileEntry.fields.description,
      professional: profileEntry.fields.professional,
      skills: profileEntry.fields.skills.map((skill) => {
        return {
          name: skill.fields.title,
          url: skill.fields.file.url
        }
      }),
      accounts: profileEntry.fields.accounts
    }
    scraper.push(
      writeData('src/static/data/profile.json', JSON.stringify(profile))
    )

    const postsFeed = await axios.get(process.env.BLOG_URL)
    const posts = []
    postsFeed.data.items
      .sort((a, b) => moment(b.pubDate).diff(moment(a.pubDate)))
      .forEach((item) => {
        posts.push({
          title: item.title,
          image: item.thumbnail,
          pubDate: moment(item.pubDate).format('YYYY-MM-DD'),
          url: item.link
        })
      })

    scraper.push(writeData('src/static/data/blogs.json', JSON.stringify(posts)))

    return Promise.all(scraper)
  })
}

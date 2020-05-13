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
    const entries = await createClient(ctfConfig).getEntries({
      content_type: ctfConfig.CTF_BLOG_POST_TYPE_ID
    })

    const posts = []
    entries.items
      .sort((a, b) =>
        moment(b.fields.publishDate).diff(moment(a.fields.publishDate))
      )
      .forEach((entry) => {
        posts.push({
          id: entry.sys.id,
          title: entry.fields.title,
          image: entry.fields.heroImage.fields.file.url,
          overview: entry.fields.overview,
          tags: entry.fields.tags,
          date: moment(entry.fields.publishDate).format('YYYY-MM-DD'),
          slug: entry.fields.slug
        })
        scraper.push(writeData('src/static/data/works.json', posts))
      })

    return Promise.all(scraper)
  })
}

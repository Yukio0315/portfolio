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
          created: moment(entry.fields.created).format('YYYY-MM-DD'),
          url: entry.fields.url,
          github: entry.fields.github,
          period: entry.fields.period,
          unit: entry.fields.unit
        })
      })
    scraper.push(writeData('src/static/data/works.json', works))

    const profileEntry = await createClient(ctfConfig).getEntry(
      ctfConfig.CTF_PROFILE_ENTRY_ID
    )
    const profile = {
      name: profileEntry.fields.name,
      description: profileEntry.fields.description,
      professional: profileEntry.fields.professional,
      skills: profileEntry.fields.skills,
      accounts: profileEntry.fields.accounts
    }
    scraper.push(writeData('src/static/data/profile.json', profile))

    return Promise.all(scraper)
  })
}

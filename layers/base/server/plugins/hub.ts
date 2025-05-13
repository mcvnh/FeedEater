import fs from 'fs'
import yaml from 'js-yaml'

export default defineNitroPlugin(() => {
  hubHooks.hook('bindings:ready', () => {
    const docs = yaml.load(fs.readFileSync('feeds.yml', 'utf8'))
    console.log(docs)
  })
})
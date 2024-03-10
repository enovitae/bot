import { getInput } from '@actions/core'

export const BOT_USERNAME = process.env.BOT_USERNAME || getInput('username')
export const MAINTAINERS_TEAM = 'enovitae/maintainers'
export const CHANNELS = ['whatsapp', 'telegram', 'pinterest']

import { getInput } from '@actions/core'

export const BOT_USERNAME = process.env.BOT_USERNAME || getInput('username')
export const MAINTAINERS_TEAM = 'enovitae/maintainers'
export const CHANNELS = ['whatsapp', 'telegram', 'pinterest'] as const
export const API_URL = process.env.API_URL || 'https://api.example.org'

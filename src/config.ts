import { getInput } from '@actions/core'

export const BOT_USERNAME = process.env.BOT_USERNAME || getInput('username')
export const CODE_PATH = '/home/runner/work/test-bot/test-bot/code'
export const MAINTAINERS_TEAM = 'enovitae/maintainers'
export const CHANNELS = ['whatsapp', 'telegram', 'pinterest', 'zapier'] as const
export const ENABLED_CHANNELS = ['zapier'] as const
export const ZAPIER_API_URL =
  process.env.ZAPIER_API_URL || 'https://api.example.org'

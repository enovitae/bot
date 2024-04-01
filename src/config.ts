import { getInput } from '@actions/core'

export const BOT_USERNAME = process.env.BOT_USERNAME || getInput('username')
export const CODE_PATH =
  '/home/runner/work/test-bot/test-bot/code' || getInput('code_path')
export const CONTENT_PATH =
  `${CODE_PATH}/src/content` || getInput('content_path')
export const DB_FILE = 'public/db.json' || getInput('db_file')
export const MAINTAINERS_TEAM = 'enovitae/maintainers'
export const CHANNELS = ['whatsapp', 'telegram', 'pinterest', 'zapier'] as const
export const ENABLED_CHANNELS = ['zapier'] as const
export const ZAPIER_API_URL =
  process.env.ZAPIER_API_URL || 'https://api.example.org'

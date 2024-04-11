import { getInput } from '@actions/core'

export const BOT_USERNAME = process.env.BOT_USERNAME || getInput('username')
export const CODE_PATH =
  '/home/runner/work/test-bot/test-bot/code' || getInput('code_path')
export const CONTENT_PATH = `src/content` || getInput('content_path')
export const DB_FILE = 'public/db.json' || getInput('db_file')
export const MAINTAINERS_TEAM = 'enovitae/maintainers'
export const CHANNELS = ['whatsapp', 'telegram', 'pinterest', 'zapier'] as const
export const ENABLED_CHANNELS = ['zapier', 'telegram'] as const
export const ZAPIER_API_URL =
  process.env.ZAPIER_API_URL || 'https://api.zapier.org'
// eg: https://api.telegram.org/botXXXXXXXXX:YYYYYYYYYYYYYYYYYYYYYYYYYYY/sendMessage
export const TELEGRAM_API_URL =
  process.env.TELEGRAM_API_URL || 'https://api.telegram.org/botXXXXX'
export const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '-999999999999'

import { context } from '@actions/github'
import { BOT_USERNAME } from './config'
import { getCommandsFromComment, isMaintainer } from './bot'
import { runCommand } from './commands'

export async function run(): Promise<undefined> {
  // TODO: wrap all of those exceptions and comment?

  // TODO: intercept merge PR event on main branch when content dir has edits
  // run polling command, update database
  // create a PR using https://github.com/peter-evans/create-pull-request
  // in this new PR you can issue @bot preview and @bot publish
  // remember: git checkout in gh action must be based on main branch
  // in order to be able to compare stable (old) db with new content

  const { comment } = context.payload
  if (!comment) {
    console.error('No comment object found')
    return
  }
  const commenter = comment.user?.login
  if (!commenter) {
    console.error(`Can't get commenter username in message ${comment.html_url}`)
    return
  }

  if (commenter === BOT_USERNAME) {
    console.error(`Skipping bot comment in message ${comment.html_url}`)
    return
  }

  if (!(await isMaintainer(context.repo.owner, commenter))) {
    console.log(
      `User '${commenter}' can't run commands in message ${comment.html_url}, exiting`
    )
    return
  }

  const commands = getCommandsFromComment(comment.body)
  if (commands.length === 0) {
    console.log(`No commands in message ${comment.html_url}`)
    return
  }

  // this bot runs only in PR environment
  if (!context.payload?.issue?.node_id.startsWith('PR')) {
    // TODO comment the issue, saying that
    console.log(
      'skipping issues, context should be a PR',
      context.payload?.issue
    )
    return
  }

  await Promise.all(commands.map(async cmd => runCommand(context, cmd)))
}

run()

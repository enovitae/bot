import { Context } from '@actions/github/lib/context'

export const context: Context = {
  payload: {
    action: 'created',
    comment: {
      author_association: 'CONTRIBUTOR',
      body: '@enovitae-bot publish',
      created_at: '2024-03-10T23:01:50Z',
      html_url:
        'https://github.com/enovitae/test-bot/pull/2#issuecomment-1987394055',
      id: 1987394055,
      issue_url: 'https://api.github.com/repos/enovitae/test-bot/issues/2',
      node_id: 'IC_kwDOLeTEOc52dToH',
      performed_via_github_app: null,
      reactions: [Object],
      updated_at: '2024-03-10T23:01:50Z',
      url: 'https://api.github.com/repos/enovitae/test-bot/issues/comments/1987394055',
      user: [Object]
    },
    issue: {
      active_lock_reason: null,
      assignee: null,
      assignees: [],
      author_association: 'CONTRIBUTOR',
      body: '',
      closed_at: null,
      comments: 3,
      comments_url:
        'https://api.github.com/repos/enovitae/test-bot/issues/2/comments',
      created_at: '2024-03-10T21:50:00Z',
      draft: false,
      events_url:
        'https://api.github.com/repos/enovitae/test-bot/issues/2/events',
      html_url: 'https://github.com/enovitae/test-bot/pull/2',
      id: 2177920167,
      labels: [Array],
      labels_url:
        'https://api.github.com/repos/enovitae/test-bot/issues/2/labels{/name}',
      locked: false,
      milestone: null,
      node_id: 'PR_kwDOLeTEOc5pLcnS',
      number: 2,
      performed_via_github_app: null,
      pull_request: [Object],
      reactions: [Object],
      repository_url: 'https://api.github.com/repos/enovitae/test-bot',
      state: 'open',
      watchers_count: 0,
      web_commit_signoff_required: false
    },
    sender: {
      avatar_url: 'https://avatars.githubusercontent.com/u/11008116?v=4',
      events_url: 'https://api.github.com/users/sebbalex/events{/privacy}',
      followers_url: 'https://api.github.com/users/sebbalex/followers',
      following_url:
        'https://api.github.com/users/sebbalex/following{/other_user}',
      gists_url: 'https://api.github.com/users/sebbalex/gists{/gist_id}',
      gravatar_id: '',
      html_url: 'https://github.com/sebbalex',
      id: 11008116,
      login: 'sebbalex',
      node_id: 'MDQ6VXNlcjExMDA4MTE2',
      organizations_url: 'https://api.github.com/users/sebbalex/orgs',
      received_events_url:
        'https://api.github.com/users/sebbalex/received_events',
      repos_url: 'https://api.github.com/users/sebbalex/repos',
      site_admin: false,
      starred_url:
        'https://api.github.com/users/sebbalex/starred{/owner}{/repo}',
      subscriptions_url: 'https://api.github.com/users/sebbalex/subscriptions',
      type: 'User',
      url: 'https://api.github.com/users/sebbalex'
    }
  },
  eventName: 'issue_comment',
  sha: '5d6f8fd1c188cb29aea55e0f058785ee72f64c90',
  ref: 'refs/heads/main',
  workflow: '.github/workflows/bot.yml',
  action: '__enovitae_bot',
  actor: 'sebbalex',
  job: 'bot',
  runNumber: 15,
  runId: 8225359082,
  apiUrl: 'https://api.github.com',
  serverUrl: 'https://github.com',
  graphqlUrl: 'https://api.github.com/graphql',
  repo: {
    owner: 'enovitae',
    repo: 'https://github.com/enovitae/test-bot'
  },
  issue: {
    owner: 'enovitae',
    repo: 'https://github.com/enovitae/test-bot',
    number: 2
  }
}

  ),
  http.post(
    'https://api.github.com/repos/enovitae/https%3A%2F%2Fgithub.com%2Fenovitae%2Ftest-bot/issues/2/comments',
    () => {
      return HttpResponse.json({})
    }
  ),
  http.post(
    'https://api.github.com/repos/enovitae/https%3A%2F%2Fgithub.com%2Fenovitae%2Ftest-bot/issues/2/labels',
    () => {
      return HttpResponse.json({})
    }
  ),
  http.post('https://api.example.org', () => {
    return HttpResponse.json({
      attempt: '018e4eaa-4364-3c25-a3f5-49d29a5b5595',
      id: '018e4eaa-4364-3c25-a3f5-49d29a5b5595',
      request_id: '018e4eaa-4364-3c25-a3f5-49d29a5b5595',
      status: 'success'
    })
  })
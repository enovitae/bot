import { Context } from '@actions/github/lib/context'
import { HttpResponse, http } from 'msw'

export const diffJSON = {
  status: 200,
  url: 'https://api.github.com/repos/enovitae/test-bot/pulls/2',
  headers: {
    'access-control-allow-origin': '*',
    'access-control-expose-headers':
      'ETag, Link, Location, Retry-After, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Used, X-RateLimit-Resource, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval, X-GitHub-Media-Type, X-GitHub-SSO, X-GitHub-Request-Id, Deprecation, Sunset',
    'cache-control': 'private, max-age=60, s-maxage=60',
    'content-length': '135',
    'content-security-policy': "default-src 'none'",
    'content-type': 'application/vnd.github.v3.diff; charset=utf-8',
    date: 'Sun, 10 Mar 2024 23:01:59 GMT',
    etag: '"4dc21fff5f2348e414662b45a872ecd744e82251b93786232864246b81b04f37"',
    'github-authentication-token-expiration': '2024-04-09 16:00:28 UTC',
    'last-modified': 'Sun, 10 Mar 2024 23:01:50 GMT',
    'referrer-policy':
      'origin-when-cross-origin, strict-origin-when-cross-origin',
    server: 'GitHub.com',
    'strict-transport-security': 'max-age=31536000; includeSubdomains; preload',
    vary: 'Accept, Authorization, Cookie, X-GitHub-OTP, Accept-Encoding, Accept, X-Requested-With',
    'x-accepted-oauth-scopes': '',
    'x-content-type-options': 'nosniff',
    'x-frame-options': 'deny',
    'x-github-api-version-selected': '2022-11-28',
    'x-github-media-type': 'github.v3; param=diff',
    'x-github-request-id': '0402:1B88:64CE7E:BC2685:65EE3BE7',
    'x-oauth-scopes': 'admin:org, repo, user, workflow',
    'x-ratelimit-limit': '5000',
    'x-ratelimit-remaining': '4984',
    'x-ratelimit-reset': '1710114902',
    'x-ratelimit-resource': 'core',
    'x-ratelimit-used': '16',
    'x-xss-protection': '0'
  },
  data:
    'diff --git a/README.md b/README.md\n' +
    'new file mode 100644\n' +
    'index 0000000..441f977\n' +
    '--- /dev/null\n' +
    '+++ b/README.md\n' +
    '@@ -0,0 +1 @@\n' +
    '+dev branch\n'
}

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

export const dittTextMock = 'dev branch'
export const diffJSONResponse = {
  data: diffJSON,
  headers: { 'content-length': '1736', 'content-type': 'application/json' },
  status: 200,
  url: 'https://api.github.com/repos/enovitae/https%3A%2F%2Fgithub.com%2Fenovitae%2Ftest-bot/pulls/2'
}

export const handlers = [
  http.get(
    'https://api.github.com/repos/enovitae/https%3A%2F%2Fgithub.com%2Fenovitae%2Ftest-bot/pulls/2',
    () => {
      return HttpResponse.json(diffJSON)
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
  http.post(
    'https://api.github.com/repos/enovitae/https%3A%2F%2Fgithub.com%2Fenovitae%2Ftest-bot/issues/comments/1987394055/reactions',
    () => {
      return HttpResponse.json({})
    }
  ),
  http.post('https://api.zapier.org', () => {
    return HttpResponse.json({
      attempt: '018e4eaa-4364-3c25-a3f5-49d29a5b5595',
      id: '018e4eaa-4364-3c25-a3f5-49d29a5b5595',
      request_id: '018e4eaa-4364-3c25-a3f5-49d29a5b5595',
      status: 'success'
    })
  }),
  http.post('https://api.telegram.org/botXXXXX', () => {
    return HttpResponse.json({
      ok: true,
      result: {
        message_id: 12,
        sender_chat: { id: -99999999999, title: '99999999999', type: 'channel' },
        chat: { id: -99999999999, title: '99999999999', type: 'channel' },
        date: 1712831817,
        text: 'ciao'
      }
    })
  })
]

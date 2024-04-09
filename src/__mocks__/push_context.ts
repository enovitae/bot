import { Context } from '@actions/github/lib/context'

export const pushContext: Context = {
  payload: {
    after: '6579c7bbc7501f87f8f54d496db080de19065e70',
    base_ref: null,
    before: '40e3e8c06bab6116a83e95abd515ddf95b5e3f8d',
    commits: [[Object], [Object]],
    compare:
      'https://github.com/enovitae/test-bot/compare/40e3e8c06bab...6579c7bbc750',
    created: false,
    deleted: false,
    forced: false,
    head_commit: {
      author: [Object],
      committer: [Object],
      distinct: true,
      id: '6579c7bbc7501f87f8f54d496db080de19065e70',
      message:
        'Merge pull request #4 from enovitae/sebbalex-patch-1\n' +
        '\n' +
        'Update 08022024_Caratteristiche_champagne.mdx',
      timestamp: '2024-04-03T23:58:20+02:00',
      tree_id: '5c1c313fcbf4f9a76ed72d55ade92ee39564ce3c',
      url: 'https://github.com/enovitae/test-bot/commit/6579c7bbc7501f87f8f54d496db080de19065e70'
    },
    organization: {
      avatar_url: 'https://avatars.githubusercontent.com/u/139454510?v=4',
      description: null,
      events_url: 'https://api.github.com/orgs/enovitae/events',
      hooks_url: 'https://api.github.com/orgs/enovitae/hooks',
      id: 139454510,
      issues_url: 'https://api.github.com/orgs/enovitae/issues',
      login: 'enovitae',
      members_url: 'https://api.github.com/orgs/enovitae/members{/member}',
      node_id: 'O_kgDOCE_oLg',
      public_members_url:
        'https://api.github.com/orgs/enovitae/public_members{/member}',
      repos_url: 'https://api.github.com/orgs/enovitae/repos',
      url: 'https://api.github.com/orgs/enovitae'
    },
    pusher: { email: 'sebbalex@users.noreply.github.com', name: 'sebbalex' },
    ref: 'refs/heads/main',
    repository: {
      merges_url: 'https://api.github.com/repos/enovitae/test-bot/merges',
      milestones_url:
        'https://api.github.com/repos/enovitae/test-bot/milestones{/number}',
      mirror_url: null,
      name: 'test-bot',
      node_id: 'R_kgDOLeTEOQ',
      notifications_url:
        'https://api.github.com/repos/enovitae/test-bot/notifications{?since,all,participating}',
      open_issues: 1,
      open_issues_count: 1,
      organization: 'enovitae',
      owner: { login: 'sebbalex' },
      private: true,
      pulls_url:
        'https://api.github.com/repos/enovitae/test-bot/pulls{/number}',
      pushed_at: 1712181500,
      releases_url:
        'https://api.github.com/repos/enovitae/test-bot/releases{/id}',
      size: 42284,
      ssh_url: 'git@github.com:enovitae/test-bot.git',
      stargazers: 0,
      stargazers_count: 0,
      stargazers_url:
        'https://api.github.com/repos/enovitae/test-bot/stargazers',
      statuses_url:
        'https://api.github.com/repos/enovitae/test-bot/statuses/{sha}',
      subscribers_url:
        'https://api.github.com/repos/enovitae/test-bot/subscribers',
      subscription_url:
        'https://api.github.com/repos/enovitae/test-bot/subscription',
      svn_url: 'https://github.com/enovitae/test-bot',
      tags_url: 'https://api.github.com/repos/enovitae/test-bot/tags',
      teams_url: 'https://api.github.com/repos/enovitae/test-bot/teams',
      topics: [],
      trees_url:
        'https://api.github.com/repos/enovitae/test-bot/git/trees{/sha}',
      updated_at: '2024-03-27T18:09:42Z',
      url: 'https://github.com/enovitae/test-bot',
      visibility: 'private',
      watchers: 0,
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
  eventName: 'push',
  sha: '6579c7bbc7501f87f8f54d496db080de19065e70',
  ref: 'refs/heads/main',
  workflow: '.github/workflows/bot.yml',
  action: '__enovitae_bot',
  actor: 'sebbalex',
  job: 'bot',
  runNumber: 93,
  runId: 8546032664,
  apiUrl: 'https://api.github.com',
  serverUrl: 'https://github.com',
  graphqlUrl: 'https://api.github.com/graphql',
  issue: {
    owner: '',
    repo: '',
    number: 0
  },
  repo: {
    owner: '',
    repo: ''
  }
}

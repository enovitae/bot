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
  )
]

# enovitae-bot

The bot automating the enovitae organization publications

## Commands

The bot is instructed to perform tasks using its tag (fe. @bot) in PR comments
followed by the command.

- `@bot publish preview`: will show a preview of the message will be published
  in selected channel

- `@bot publish [channel]`: will send publication to selected channel

- `@bot publish test`: will send publication as a direct message to maintainers

- `@bot publish all`: will send publication all over preconfigured channels

Use the following inputs in the GitHub action via `with`:

- `username` [**Optional**] - GitHub repository to fetch (default `bot`)
- `github_token` [**Optional**] - GitHub token to interact with GitHub API
  (default `${{ github.token }}`).

  If the environment `GITHUB_TOKEN` variable is set, it takes precedence over
  the input.

## Examples

Include this action in your repo by creating
`.github/workflows/enovitae-bot.yml`and edit where needed:

[Reference here](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#pull_request_comment-use-issue_comment)

```yml
on:
  issue_comment:
    types: [created]

jobs:
  examplejob:
    runs-on: ubuntu-latest
    steps:
      - uses: enovitae/bot@v1
        with:
          username: bot
        env:
          GITHUB_TOKEN: ${{ secrets.BOT_TOKEN }}
```

## Build the action

Install dependencies

```sh
npm i
```

Build the action

```sh
npm run bundle
```

## Remarks

This GitHub Action is published in the Github Marketplace. As such, you can find
the
[Terms of Service here](https://docs.github.com/en/free-pro-team@latest/github/site-policy/github-marketplace-terms-of-service).
Also,
[here](https://docs.github.com/en/free-pro-team@latest/github/site-policy/github-marketplace-developer-agreement)
you can find the GitHub Marketplace Developer Agreement.

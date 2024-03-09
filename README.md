# GitHub action to publish npm packages with semanantic versioning rules

[![CI](https://github.com/iuccio/npm-semantic-publish-action/actions/workflows/ci.yml/badge.svg)](https://github.com/iuccio/npm-semantic-publish-action/actions/workflows/ci.yml)
[![CodeQL](https://github.com/iuccio/npm-semantic-publish-action/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/iuccio/npm-semantic-publish-action/actions/workflows/codeql-analysis.yml)
[![Lint Codebase](https://github.com/iuccio/npm-semantic-publish-action/actions/workflows/linter.yml/badge.svg)](https://github.com/iuccio/npm-semantic-publish-action/actions/workflows/linter.yml)
[![Check Transpiled JavaScript](https://github.com/iuccio/npm-semantic-publish-action/actions/workflows/check-dist.yml/badge.svg)](https://github.com/iuccio/npm-semantic-publish-action/actions/workflows/check-dist.yml)
[![NPM Version](https://img.shields.io/npm/v/npm-semantic-publish-action.svg)](https://npmjs.org/package/npm-semantic-publish-action)
[![Downloads](https://img.shields.io/npm/dm/npm-semantic-publish-action.svg)](https://npmjs.org/package/npm-semantic-publish-action)

## Table of Contents

<!-- toc -->

- [GitHub action to publish npm packages with semanantic versioning rules](#github-action-to-publish-npm-packages-with-semanantic-versioning-rules)
  - [Table of Contents](#table-of-contents)
  - [Action Usage](#action-usage)
    - [Action Parameters](#action-parameters)
  - [Development](#development)
  - [How to develop the GitHub Action](#how-to-develop-the-github-action)
  - [Validate the Action](#validate-the-action)
  - [License](#license)
  - [Buy me a Coffee](#buy-me-a-coffee)

<!-- tocstop -->

## Action Usage

1. generate an access token able to make commits, tags and push them (see
   [Managing your personal access tokens](https://docs.github.com/en/enterprise-server@3.9/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens))
1. add the above generated token in the secret **ACTION_TOKEN** (see
   [Using secrets in GitHub Actions](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions))
1. generate a new npm token able to publish
   [Creating and viewing access tokens](https://docs.npmjs.com/creating-and-viewing-access-tokens)
1. add the above generated token in the secret **NPM_TOKEN** (see
   [Using secrets in GitHub Actions](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions))

After generating and storing the above tokens, to include the
**npm-semver-publish-action** in your workflow in your repository, simply add
the following script in your action yaml file:

```yaml
steps:
  - name: Checkout
    id: checkout
    uses: actions/checkout@v4
    with:
      token: ${{ secrets.ACTION_TOKEN }}
  - uses: fregante/setup-git-user@v2 #used to add to git config user and mail
    uses: actions/setup-node@v4
    with:
      node-version: 20.x
      registry-url: 'https://registry.npmjs.org'
  - name: Run my Action
    id: run-action
    uses: actions/npm-semver-publish-action@v1
    with:
      target-branch: 'master'
    env:
      NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

Below a complete job example:

```yaml
on:
  push:
    branches: main

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
      id: checkout
      uses: actions/checkout@v4
      with:
        token: ${{ secrets.ACTION_TOKEN }}
    - uses: fregante/setup-git-user@v2
      uses: actions/setup-node@v4
      with:
        node-version: 20.x
        registry-url: 'https://registry.npmjs.org'
    - name: Run my Action
      id: run-action
      uses: actions/npm-semver-publish-action@v1
      with:
        target-branch: 'master'
      env:
        NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### Action Parameters

See [action metadata file](action.yml)

|     Name      |  Type  | Default |                                                Description                                                |
| :-----------: | :----: | :-----: | :-------------------------------------------------------------------------------------------------------: |
| target-branch | string | master  | Branch name where npm publish with semanantic versioning should be applied to the GitHub Action execution |

## Development

1. :hammer_and_wrench: Install the dependencies

   ```bash
   npm install
   ```

1. :building_construction: Package the JavaScript for distribution

   ```bash
   npm run bundle
   ```

1. :white_check_mark: Run the tests

   ```bash
   npm test
   ```

## How to develop the GitHub Action

[GitHub Actions Toolkit documentation](https://github.com/actions/toolkit/blob/master/README.md).

1. Create a new branch
1. Update the contents of `src/`
1. Add tests to `__tests__/`
1. Format, test, and build the action

   ```bash
   npm run all
   ```

   > [!WARNING]
   >
   > This step is important! It will run [`ncc`](https://github.com/vercel/ncc)
   > to build the final JavaScript action code with all dependencies included.
   > If you do not run this step, your action will not work correctly when it is
   > used in a workflow. This step also includes the `--license` option for
   > `ncc`, which will create a license file for all of the production node
   > modules used in your project.

1. Commit your changes

   ```bash
   git add .
   git commit -m "My first action is ready!"
   ```

1. Push them to your repository

   ```bash
   git push -u origin releases/v1
   ```

1. Create a pull request and get feedback on your action
1. Merge the pull request into the `main` branch

## Validate the Action

You can now validate the action by referencing it in a workflow file. For
example, [`ci.yml`](./.github/workflows/ci.yml) demonstrates how to reference an
action in the same repository.

```yaml
steps:
  - name: Checkout
    id: checkout
    uses: actions/checkout@v3

  - name: Test Local Action
    id: test-action
    uses: ./
    with:
      target-branch: 'release'

  - name: Print Output
    id: output
    run: echo "${{ steps.test-action.outputs.version }}"
```

## License

CSVtoJSON is licensed under the GNU General Public License v3.0
[License](LICENSE).

## Buy me a Coffee

Just if you want to support this repository:

- **BTC** tip address: 37vdjQhbaR7k7XzhMKWzMcnqUxfw1njBNk

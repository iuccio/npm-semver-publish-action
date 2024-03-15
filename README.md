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
    - [Secrets Configuration](#secrets-configuration)
    - [Action configuration](#action-configuration)
    - [Complete job example](#complete-job-example)
    - [Action Parameters](#action-parameters)
  - [Development](#development)
  - [How to develop the GitHub Action](#how-to-develop-the-github-action)
  - [Validate the Action](#validate-the-action)
  - [License](#license)
  - [Buy me a Coffee](#buy-me-a-coffee)

<!-- tocstop -->

This action allow your project to create a new release, based on
[semantic versionig](https://semver.org/) principles, and publish it to your npm
registry.

Once your repository is configured with this action, to generate a new version
you have just to add to the commit message one of the following string:

- **[MAJOR]** or **[major]**: new major relase, e.g. v1.0.0 -> v2.0.0
- **[PATCH]** or **[patch]**: new patch relase, e.g. v1.0.0 -> v1.0.1
- without any of the above keywords a new minor relase will be applied, e.g.
  v1.0.0 -> v1.1.0

An new release is only exeuted on the defined **target-branch** (see **Action
Usage**)

## Action Usage

### Secrets Configuration

This action requires the following Secrets:

1. **ACTION_TOKEN**:
   1. generate an access token able to make commits, tags and push them (see
      [Managing your personal access tokens](https://docs.github.com/en/enterprise-server@3.9/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens))
   1. add the above generated token in the secret **ACTION_TOKEN** (see
      [Using secrets in GitHub Actions](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions))
1. **NPM_TOKEN**:
   1. generate a new npm token able to publish
      [Creating and viewing access tokens](https://docs.npmjs.com/creating-and-viewing-access-tokens)
   1. add the above generated token in the secret **NPM_TOKEN** (see
      [Using secrets in GitHub Actions](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions))

### Action configuration

1. Add to the checkout action the **ACTION_TOKEN** secret:

```yaml
uses: actions/checkout@v4
    with:
      token: ${{ secrets.ACTION_TOKEN }}
```

1. Add an [actions/setup-node](https://github.com/actions/setup-node) step to
   your workflow. If you have one already, ensure that the registry-url input is
   set (e.g. to https://registry.npmjs.org) so that this action can populate
   your .npmrc with authentication info:

```yaml
uses: actions/setup-node@v4
with:
  node-version: 20.x
  registry-url: 'https://registry.npmjs.org'
```

1. populate git config with user and mail:

```yaml
uses: fregante/setup-git-user@v2
```

1. add **actions/npm-semver-publish-action** step:

```yaml
name: Run my Action
id: run-action
uses: actions/npm-semver-publish-action@v1
with:
  target-branch: 'master' #where a new release is applied
env:
  NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

That's it!

### Complete job example

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

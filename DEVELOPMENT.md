# For Developer

## Table of Contents

<!-- toc -->

- [For Developer](#for-developer)
  - [Table of Contents](#table-of-contents)
  - [Development](#development)
  - [How to develop the GitHub Action](#how-to-develop-the-github-action)
  - [Validate the Action](#validate-the-action)

<!-- tocstop -->

## Development

1. Install the dependencies

   ```bash
   npm install
   ```

1. Package the JavaScript for distribution

   ```bash
   npm run bundle
   ```

1. Run the tests

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

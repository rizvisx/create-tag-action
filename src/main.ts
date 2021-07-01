import * as core from '@actions/core'
import * as github from '@actions/github'

async function run(): Promise<void> {
  try {
    const token = core.getInput('repo-token')
    const tag = core.getInput('tag')
    const repo = core.getInput('repo')
    // const sha = core.getInput("commit-sha", { required: false }) || github.context.sha
    const octokit = github.getOctokit(token)

    await octokit.rest.git.createRef({
      owner: github.context.repo.owner,
      repo: `${repo}`,
      ref: `refs/tags/${tag}`,
      sha: github.context.sha
    })
  } catch (error) {
    core.error(error)
    core.setFailed(error.message)
  }
}

run()

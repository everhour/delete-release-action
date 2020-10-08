const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
    try {
        const tag = core.getInput('tag_name');
        const octokit = github.getOctokit(process.env.GITHUB_TOKEN);
        const repo = github.context.repo;

        const release = await octokit.repos.getReleaseByTag({...repo, tag});

        if (release) {
            await octokit.repos.deleteRelease({...repo, release_id: release.id});
            await octokit.git.deleteRef({...repo, ref: 'tags/' + tag});
        }
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();

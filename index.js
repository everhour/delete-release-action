const core = require('@actions/core');
const {GitHub, context} = require('@actions/github');

async function run() {
    try {
        const tag = core.getInput('tag_name');
        const github = new GitHub(process.env.GITHUB_TOKEN);
        const { owner: currentOwner, repo: currentRepo } = context.repo;

        const release = await github.repos.getReleaseByTag({owner, repo, tag});

        if (release) {
            await github.repos.deleteRelease({owner, repo, release_id: release.id});
            await github.git.deleteRef({owner, repo,ref: 'tags/' + tag});

        }
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();

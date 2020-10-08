const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
    try {
        const tag = core.getInput('tag_name');

        console.log('Searching release by tag `' + tag + '`');

        const octokit = github.getOctokit(process.env.GITHUB_TOKEN);
        const repo = github.context.repo;

        const release = await octokit.repos.getReleaseByTag({...repo, tag})
            .catch(err => {
                if (err.status !== 404) {
                    throw err
                }

                return null;
            });

        if (release) {
            console.log('Deleting release #' + release.data.id);
            await octokit.repos.deleteRelease({...repo, release_id: release.data.id});

            console.log('Deleting tag `' + release.data.tag_name + '`');
            await octokit.git.deleteRef({...repo, ref: 'tags/' + release.data.tag_name});
        } else {
            console.log('Release not found');
        }
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();

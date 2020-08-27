const core = require('@actions/core');
const github = require('@actions/github');

//const readmeBox = require('readme-box');
const fs = require('fs');
const path = require('path');


(async () => {
    try {
        // `who-to-greet` input defined in action metadata file
        const githubToken = core.getInput('github-token');
        const filepath = fs.readFileSync(path.join(process.env.GITHUB_WORKSPACE, core.getInput('json-file-path')));
        const data = fs.readFileSync(filepath, 'utf8');
        console.log('GITHUB REF', process.env.GITHUB_REF.split('/')[2]);

        await updateSection(data, {
            owner: process.env.GITHUB_REPOSITORY.split('/')[0],
            repo: process.env.GITHUB_REPOSITORY.split('/')[1],
            branch: process.env.GITHUB_REF.split('/')[2],
            token: githubToken,
            section: 'data-section',
        });

    } catch (error) {
        core.setFailed(JSON.stringify(error));
    }
})();
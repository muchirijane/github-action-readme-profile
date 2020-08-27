const core = require('@actions/core');
const github = require('@actions/github');

const fs = require('fs');
const path = require('path');

try {
    // `who-to-greet` input defined in action metadata file
    const jsonPath = core.getInput('json-file-path');
    const content = fs.readFileSync(path.join(process.env.GITHUB_WORRKSPACE, jsonPath));
    console.log(JSON.parse(content));
    console.log(content);
    const time = (new Date()).toTimeString();
    core.setOutput("time", time);
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);
} catch (error) {
    core.setFailed(error.message);
}
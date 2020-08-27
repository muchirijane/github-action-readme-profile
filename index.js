const core = require('@actions/core');
const github = require('@actions/github');

const fs = require('fs');
const path = require('path');

try {
    // `who-to-greet` input defined in action metadata file
    const jsonPath = core.getInput('json-file-path');
    const content = fs.readFileSync(path.join(process.env.GITHUB_WORKSPACE, jsonPath));
    console.log(JSON.parse(content));
    console.log(content);


    const readmeContent = fs.readFileSync("./README.md", "utf-8").split("\n");
    // Find the index corresponding to <!--START_SECTION:data--> comment
    let startIdx = readmeContent.findIndex(
        (content) => content.trim() === "<!--START_SECTION:data-->"
    );

    // Find the index corresponding to <!--END_SECTION:data--> comment
    const endIdx = readmeContent.findIndex(
        (content) => content.trim() === "<!--END_SECTION:data-->"
    );

    const time = (new Date()).toTimeString();
    core.setOutput("time", time);
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);
} catch (error) {
    core.setFailed(error.message);
}
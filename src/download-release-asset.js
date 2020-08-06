const core = require('@actions/core');
const { getOctokit } = require('@actions/github');
const request = require('request');
const fs = require('fs');

async function run() {
  try {
    // Get authenticated GitHub client (Ocktokit): https://github.com/actions/toolkit/tree/master/packages/github#usage
    const octokit = getOctokit(process.env.GITHUB_TOKEN);

    // Get the inputs from the workflow file: https://github.com/actions/toolkit/tree/master/packages/core#inputsoutputs
    const tag = core.getInput('release_tag', { required: true });
    const assetName = core.getInput('asset_name', { required: true });
    const owner = process.env.GITHUB_ACTOR;
    const repo = process.env.GITHUB_REPOSITORY.replace(`${owner}/`, "");

    console.log(`owner:${owner}`)
    console.log(`repo:${repo}`)

    // find asset
    const releaseResponse = tag == "latest" ?
      await octokit.repos.getRelease({ owner, repo, release_id: "latest" })
      : await octokit.repos.getReleaseByTag({ owner, repo, tag });
    const asset = releaseResponse.data.assets.find(e => e.name == assetName);

    // download 
    const file = fs.createWriteStream(assetName);
    const downloadRquest = request.get(asset.url, {
      headers: {
        "Accept": "application/octet-stream",
        "User-Agent": "download-release-asset",
        "Authorization": `token ${process.env.GITHUB_TOKEN}`
      }
    });
    downloadRquest.pipe(file);

    const done = new Promise(function (resolve, reject) {
      file.on('finish', () => { resolve(file.path) });
      file.on('error', reject);
      downloadRquest.on('error', reject);
    });
    const path = await done;

    // Set the output variable for use by other actions: https://github.com/actions/toolkit/tree/master/packages/core#inputsoutputs
    core.setOutput('file_path', path);
  } catch (error) {
    core.setFailed(error.message);
  }
}

module.exports = run;

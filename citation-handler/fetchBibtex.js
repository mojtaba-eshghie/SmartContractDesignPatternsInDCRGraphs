const { Octokit } = require("@octokit/rest");

async function fetchBibtexFromGitHub(username, token, repo, path) {
  const octokit = new Octokit({
    auth: token,
  });

  try {
    const response = await octokit.repos.getContent({
      owner: username,
      repo: repo,
      path: path,
    });

    // Convert the content from base64 to string
    const bibtexContent = Buffer.from(response.data.content, 'base64').toString('utf-8');
    return bibtexContent;
  } catch (error) {
    console.error("Error fetching the file:", error);
    return null;
  }
}

module.exports = fetchBibtexFromGitHub;

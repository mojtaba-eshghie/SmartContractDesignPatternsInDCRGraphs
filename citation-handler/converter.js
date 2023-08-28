const Cite = require('citation-js');
const fs = require('fs');
require('@citation-js/plugin-bibtex');
const fetchBibtexFromGitHub = require('./fetchBibtex');


async function main() {
  const GITHUB_USERNAME = "mojtaba-eshghie";
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  console.log(GITHUB_TOKEN);
  const repo = "Capturing-Smart-Contract-Design-with-DCR-Graphs";
  const path = "refs.bib";

  const bibtexContent = await fetchBibtexFromGitHub(GITHUB_USERNAME, GITHUB_TOKEN, repo, path);
  console.log(bibtexContent);
  
  if (bibtexContent) {
    // Parse the BibTeX data
    const cite = new Cite(bibtexContent);

    // Convert to CFF format
    const cffOutput = cite.format('data', {
      format: 'object',
      type: 'cff'
    });

    console.log(cffOutput);
    // Save the CFF output to a file
    const outputPath = '../references.cff';  // You can change the filename if needed
    fs.writeFileSync(outputPath, JSON.stringify(cffOutput, null, 2));  // The third argument formats the JSON with 2-space indentation
    console.log(`CFF output saved to ${outputPath}`);
  }
}

main();

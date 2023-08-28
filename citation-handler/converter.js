const Cite = require('citation-js');

// Load the BibTeX plugin
require('@citation-js/plugin-bibtex');

// Your BibTeX data
const bibtexData = `
@article{sample,
  title={Sample Title},
  author={Doe, John},
  year={2023},
  journal={Sample Journal}
}
`;

// Parse the BibTeX data
const cite = new Cite(bibtexData);

// Convert to CFF format
const cffOutput = cite.format('data', {
  format: 'object',
  type: 'cff'
});

console.log(cffOutput);


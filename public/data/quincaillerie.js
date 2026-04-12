const getNode = $('Get a file').first().json;
const currentFile = Buffer.from(getNode.content, 'base64').toString('utf8');
const tool = $('Code in JavaScript1').first().json;

const newEntry = `  {
    id          : ${Date.now()},
    category    : 'Quincaillerie',
    subcategory : '${(tool.category || 'Outils').replace(/'/g, "\\'")}',
    brand       : '${tool.name.split(' ')[0].replace(/'/g, "\\'")}',
    title       : '${tool.name.replace(/'/g, "\\'")}',
    description_fr: '${(tool.description || '').replace(/'/g, "\\'")}',
    price_MAD   : 0,
    images      : [
      '${tool.img1Path.replace('public/', '/')}',
      '${tool.img2Path.replace('public/', '/')}',
    ],
    in_stock    : true,
    ref         : 'VT-AUTO-${Date.now().toString().slice(-4)}',
  }`;

const updated = currentFile.replace(/\]\s*\)\s*;\s*$/, '  ' + newEntry + ',\n]);');

return [{
  json: {
    fileContent: updated,
    sha: getNode.sha
  }
}];

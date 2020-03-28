const path = require('path');

console.log('__filename: ', __filename);
path.basename('basename: ', __filename);

console.log(path.dirname(__filename).split(path.sep).pop());
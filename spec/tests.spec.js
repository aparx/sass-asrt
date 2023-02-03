const path = require('path');
const sassTrue = require('sass-true');

const sassFile = path.join(__dirname, 'true-sass/tests.scss');
sassTrue.runSass({ describe, it }, sassFile);
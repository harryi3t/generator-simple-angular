
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-simple-angular:app', () => {
  beforeAll(() => helpers.run(path.join(__dirname, '../generators/app'))
    .withPrompts({ someAnswer: true }));

  it('creates files', () => {
    assert.file([
      'app.html',
      'app.js',
      'app.css'
    ]);
  });
});


const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-simple-angular:app', () => {
  beforeAll(() => helpers.run(path.join(__dirname, '../generators/app'))
    .withPrompts({
      angularVersion: '1.7.1',
      author_name: 'testUser',
      author_email: 'test@gmail.com',
      author_url: 'https://domain.com/123'
    })
  );

  it('should create all files', () => {
    assert.file([
      'app/index.html',
      'app/app.js',
      'app/app.css',
      'package.json',
      'gulpfile.js',
      '.gitignore'
    ]);
  });

  it('should take correct angular version from user', () => {
    assert.fileContent('app/index.html', /angular.js\/1\.7\.1\/angular.min.js/);
  });

  it('should put author info in package.json', () => {
    assert.fileContent('package.json', /testUser <test@gmail.com> \(https:\/\/domain.com\/123\)/);
  });
});

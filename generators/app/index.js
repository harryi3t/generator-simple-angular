const chalk = require('chalk');
const Generator = require('yeoman-generator');
const mkdirp = require('mkdirp');
const path = require('path');
const yosay = require('yosay');

module.exports =  Generator.extend({
  initializing() {
    this.props = {};
  },

  prompting: {

    welcome() {
      this.log(yosay(
        'Welcome to the doozie ' + chalk.red('simple angular') +
        ' generator!'
      ));
    },

    ask() {
      return this.prompt([{
        name   : 'name',
        type   : 'input',
        message: 'Application Name:',
        store  : true,
        default: 'simple-angular-app'
      }, {
        name   : 'angularVersion',
        type   : 'input',
        message: 'Angular Version:',
        default: '1.6.0'
      }, {
        name   : 'author_name',
        type   : 'input',
        message: 'Your Name:',
        store  : true
      }, {
        name   : 'author_email',
        type   : 'input',
        message: 'Your email:',
        store  : true
      }, {
        name   : 'author_url',
        type   : 'input',
        message: 'Your home page:',
        store  : true
      }]).then((answers) => {
        this.props.angularVersion = answers.angularVersion;
        this.props.name = answers.name;
        this.props.author_info = '';
        if (answers.author_name)
          this.props.author_info = `${answers.author_name} `;
        if (answers.author_email)
          this.props.author_info += `<${answers.author_email}> `;
        if (answers.author_url)
          this.props.author_info += `(${answers.author_url})`;
      });
    }
  },

  configuring: {},

  default: {},

  writing: {
    folder() {
      if (path.basename(this.destinationPath()) !== this.props.name) {
        this.log(
          `Your generator must be inside a folder named ${this.props.name}
          I'll automatically create this folder.`
        );
        mkdirp(this.props.name);
        this.destinationRoot(this.destinationPath(this.props.name));
      }
    },

    config() {
      this.fs.copyTpl(
        this.templatePath('app/_index.html'),
        this.destinationPath('app/index.html'), {
          angularVersion: this.props.angularVersion
        }
      );
      this.fs.copy(
        this.templatePath('app/app.js'),
        this.destinationPath('app/app.js')
      );
      this.fs.copy(
        this.templatePath('app/app.css'),
        this.destinationPath('app/app.css')
      );
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'), {
          author_info: this.props.author_info
        }
      );
      this.fs.copy(
        this.templatePath('_gulpfile.js'),
        this.destinationPath('gulpfile.js')
      );
      this.fs.copy(
        this.templatePath('.gitignore'),
        this.destinationPath('.gitignore')
      );
    },

    install() {
      this.installDependencies();
    }
  },

  conflicts: {},

  end: {
    goodbye() {
      this.log(yosay(
        'Congratulations! Your simple angular app is ready to use.'
      ));
      this.prompt({
        name   : 'launch',
        type   : 'confirm',
        message: 'Do you want to launch the app now?',
        default: true
      }).then((answer) => {
        if (answer.launch)
          this.spawnCommand('gulp', ['serve']);
      });
    }
  }
});

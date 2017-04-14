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
        store  : true,
        default: '1.6.0'
      }]).then((answers) => {
        this.props.angularVersion = answers.angularVersion;
        this.props.name = answers.name;
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
        this.templatePath('app.html'),
        this.destinationPath('app.html'), {
          angularVersion: this.props.angularVersion
        }
      );
      this.fs.copy(
        this.templatePath('app.js'),
        this.destinationPath('app.js')
      );
      this.fs.copy(
        this.templatePath('app.css'),
        this.destinationPath('app.css')
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
    }
  }
});

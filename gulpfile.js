"use strict";

require('colors');

const
  fs = require('fs'),

  del = require('del'),
  gulp = require('gulp'),
  bump = require('gulp-bump'),

  program = require('commander'),
  semver = require('semver');

function log() {
  if (!program.silent) {
    console.log.apply(console, arguments);
  }
}

function die(message, cmd) {
  cmd = cmd || program;
  log('  Fatal'.red + ':', cmd.name().yellow + ':', message);
  cmd.help();
}

function determineVersion() {
  return JSON.parse(fs.readFileSync('./package.json')).version;
}

program
  .version(determineVersion(), '-V')
  .option('--no-color', 'No colors in output')
  .option('--silent', 'Disable output')
  .option(
    '-e, --env <environment>',
    'Set environment (standalone|production) [env.NODE_ENV || standalone]',
    (value) => {
      if (!/^(?:standalone|production)$/.test(value)) {
        die(`invalid environment`);
      }

      return value;
    },
    process.env.NODE_ENV || 'standalone'
  )
  .allowUnknownOption();

const bumpConfig = {
  types: ['major', 'minor', 'patch'],
  default: 'patch',
  type: null,
  value: null
};

const bumpCommand = program
  .command('bump [type]')
  .description(`Bump version (${'major|minor|patch'.yellow}) [${'patch'.yellow}]`)
  .action((type) => {
    if (type && ['major', 'minor', 'patch'].indexOf(type) === -1) {
      die(`invalid type "${type.yellow}"`, bumpCommand);
    }

    bumpCommand.type = type || 'patch';

    gulp.task(bumpCommand.type, [bumpCommand.name()]);
  })
  .option('-x, --exactly <version>', 'specify the exact version', (value) => {
    if (!semver.valid(value)) {
      die(`${value.yellow} is not valid semantic version`, bumpCommand);
    }

    return value.replace(/^[^0-9]*/, '');
  });

/*---------- BUILD ----------*/

const buildCommand = program
  .command('build')
  .description('Build project, if environment is standalone run watcher')
  .option(
    '-w, --watcher [boolean]',
    'exactly enable or disable running of watcher [true|false] (true)',
    (value) => {
      // Использование без значения принудительно включает вотчер
      if (value === null) {
        value = 'true';
      }

      if (!/^(true|false)$/.test(value)) {
        die(`Invalid value for --watcher option: ${value.yellow}`, buildCommand);
      }

      return JSON.parse(value);
    },
    null
  )
  .action(() => {});

program.parse(process.argv);

process.env.NODE_ENV = program.env;
log(`Environment mode: ${program.env.yellow}`);

/*---------- TASK BUMP ----------*/

gulp.task(bumpCommand.name(), (ignore) => {
  log(`Current version is ${program.version().yellow}`);

  const config = {};

  if (bumpCommand.exactly) {
    config.version = bumpCommand.exactly;
    log(`Bump to version ${config.version.yellow}`);
  } else {
    config.type = bumpCommand.type;
    log(`Bump ${config.type.yellow} version`);
  }

  gulp.src('./*.json')
    .pipe(bump(config))
    .pipe(gulp.dest('./'))
    .on('end', () => {
      log(`Done, new version is ${determineVersion().yellow}`);
    })
});

/*---------- TASK BUMP END ----------*/
